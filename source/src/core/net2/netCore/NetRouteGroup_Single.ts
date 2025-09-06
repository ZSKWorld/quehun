module net {
    // 单线路的NetRouteGroup实现。连接时候要等大厅连上，url走大厅的url，没有主备
    export class NetRouteGroup_Single {
        public route: NetRoute = null;
        // { rpcName, timeStamp } 发送请求的历史，当发送太快，会被屏蔽
        private sendHistory: { rpcName: string; timeStamp: number }[] = [];
        public closed: boolean = true;
        public eventHandler: Laya.EventDispatcher;
        private notifyHander: NotifyHandler;
        private state: game.EConnectState = game.EConnectState.none;
        // 是否在自动重连主线路中
        private duringReconnect: boolean = false;
        // 主线路重连次数
        private reconnectCounter: number = 0;
        // 等待大厅连接上，再执行连接
        private connectWaitingForLobby: boolean = false;
        private tail: string = '';

        private static reconnectSpans: number[] = [500, 1000, 3000, 6000, 10000, 15000];

        constructor() {
            this.eventHandler = new Laya.EventDispatcher();
            this.notifyHander = new NotifyHandler();
        }

        private onAddRoute(route: NetRoute) {
            route.clearListeners();
            route.addListener('OnOpen', this, (data: any) => {
                this.onRouteOpen(route);
            });
            route.addListener('OnUseable', this, (data: any) => {
                this.onRouteUseable(route);
            });
            route.addListener('OnClose', this, (data: any) => {
                this.onRouteClose(route, data.msg);
            });
            route.addListener('OnError', this, (data: any) => {
                this.onRouteError(route, data.msg);
            });
            route.addListener('OnNotify', this, (data: any) => {
                this.onRouteNotifyProto(route, data.name, data.data);
            });
        }

        // 检查发送速度，true：在合理发送速度内，false：发送太快了，要采取措施
        private checkSendSpeed(rpcName: string): boolean {
            const nowTime = Laya.timer.currTimer / 1000;
            this.sendHistory.push({
                rpcName: rpcName,
                timeStamp: nowTime
            });
            let index = 0;
            let count1Sec = 0;
            let count10Sec = 0;

            while (index < this.sendHistory.length) {
                const interval = nowTime - this.sendHistory[index].timeStamp;
                if (interval > 10) {
                    this.sendHistory.splice(index, 1);
                } else {
                    if (interval < 1) {
                        count1Sec++;
                    }
                    if (interval < 10) {
                        count10Sec++;
                    }
                    index++;
                }
            }

            if (count1Sec > 50) {
                this._logError('糟了，在一秒内出现了大喷发, count1Sec: ' + count1Sec + ', history: ' + JSON.stringify(this.sendHistory));
                return false;
            }
            if (count10Sec > 100) {
                this._logError('糟了，在十秒内出现了大喷发, count10Sec: ' + count10Sec + ', totalCount: ' + this.sendHistory.length + ', history: ' + JSON.stringify(this.sendHistory));
                return false;
            }
            return true;
        }

        private loop() {
            if (this.closed) return;
            if (this.connectWaitingForLobby) {
                this.ensureConnect();
            }
        }

        // 大厅连上了，才开始连接。否则等待大厅连接
        private ensureConnect() {
            // Todo
            if (game.LobbyNetMgr.Inst.isOK && GameMgr.Inst.logined) {
                this.connectWaitingForLobby = false;
                const routeMain = NetRouteGroup.Inst.routeMain;
                if (this.route === null) {
                    this.route = new NetRoute(routeMain.routeID, routeMain.url, this.tail, routeMain.ssl, ['FastTest', 'Route']);
                    this.onAddRoute(this.route);
                } else {
                    this.route.routeID = routeMain.routeID;
                    this.route.url = routeMain.url;
                    this.route.tail = this.tail;
                    this.route.ssl = routeMain.ssl;
                }
                this.route.connect();
            } else {
                this.connectWaitingForLobby = true;
            }
        }

        // 主线路进行断线重连
        private reconnectRoute() {
            const route = this.route;
            Laya.timer.once(NetRouteGroup_Single.reconnectSpans[this.reconnectCounter], this, () => {
                if (this.closed || !this.duringReconnect) {
                    return;
                }
                this._logInfo("断线重连，尝试次数:" + this.reconnectCounter);
                this.ensureConnect();
            });
        }

        // 重连成功
        private onReconnectSuccess() {
            this._logInfo("重连成功，线路:" + this.route.routeID);
            this.duringReconnect = false;
            this.reconnectCounter = 0;
            this.eventHandler.event('OnReconnectSuccess', {});
        }

        // 主线路切换事件处理
        private onChangeMainRoute(data: any) {
            if (this.closed) return;
            if (data.IDAfter !== this.route.routeID) {
                this.route.close();
            }
        }

        // #region ---------------- 子线路事件处理 -----------------------------------------

        private onRouteOpen(route: NetRoute) {
            this._logInfo("OnRouteOpen:" + route.routeID);
            if (this.closed) {
                route.close();
                return;
            }
            route.routeType = RouteType.Main;
            this.state = game.EConnectState.connecting;
        }

        private onRouteUseable(route: NetRoute) {
            this._logInfo("OnRouteUseable:" + route.routeID);
            this.state = game.EConnectState.usable;
            this.eventHandler.event("OnRouteUseable", { routeID: route.routeID });
            if (this.duringReconnect) {
                this.onReconnectSuccess();
            }
        }

        private onRouteClose(route: NetRoute, msg: string) {
            this._logInfo("OnRouteClose:" + route.routeID + ", msg:" + msg);
            if (this.closed) {
                return;
            }

            if (this.duringReconnect) {
                this.reconnectCounter++;
                if (this.reconnectCounter >= NetRouteGroup_Single.reconnectSpans.length) {
                    // 重连失败
                    this.duringReconnect = false;
                    this.close();
                    this.eventHandler.event("OnReconnectFailed", {});
                } else {
                    this.reconnectRoute();
                }
            } else {
                // 进入重连
                this.state = game.EConnectState.reconnecting;
                this.duringReconnect = true;
                this.reconnectCounter = 0;
                this.reconnectRoute();
                this.eventHandler.event("OnReconnectStarted", {});
            }
        }

        private onRouteError(route: NetRoute, msg: string) {
            this._logInfo("OnRouteError:" + route.routeID + ", msg:" + msg);
            if (this.closed) {
                return;
            }
        }

        private onRouteNotifyProto(route: NetRoute, name: string, msg: any) {
            if (route !== this.route) {
                this._logError("收到通知消息:" + name + "，但不是主线路");
                return;
            }
            if (this.notifyHander.hasHandler(name)) {
                this._logInfo("收到通知消息:" + name);
                this.notifyHander.dispatch(name, msg);
            } else {
                this._logError('消息：' + name + '未被监听');
            }
        }

        // #endregion

        // #region ------------------- public api ------------------------------------------

        public connect(tail: string) {
            this.closed = false;
            this.state = game.EConnectState.tryconnect;
            this.tail = tail;
            this.ensureConnect();
            Laya.timer.clearAll(this);
            Laya.timer.loop(1000, -1, () => {
                this.loop();
            });
            NetRouteGroup.Inst.eventHandler.off('OnChangeMainRouteEnd', this, this.onChangeMainRoute);
            NetRouteGroup.Inst.eventHandler.on('OnChangeMainRouteEnd', this, this.onChangeMainRoute);
        }

        // 关闭连接，释放资源
        public close() {
            if (this.closed) return;
            this.closed = true;
            this.state = game.EConnectState.disconnect;
            this.eventHandler.event("OnClose", {});
            if (this.route) {
                this.route.close();
            }
            Laya.timer.clearAll(this);
            NetRouteGroup.Inst.eventHandler.off('OnChangeMainRouteEnd', this, this.onChangeMainRoute);
        }

        // 获取当前的延迟时间，单位为秒
        public getDelay(): number {
            if (this.closed || this.route === null) return 100;
            return this.route.getDelay();
        }

        // 获取当前的连接状态
        public getConnectState(): game.EConnectState {
            return this.state;
        }

        // 对业务接口，调用远程rpc
        public sendRequest(serviceName: string, methodName: string, request: any, callback: (error: string | null, response: any) => void) {
            this._logInfo("发送业务请求, Service Name: " + serviceName + ", Method Name: " + methodName + ", request: " + JSON.stringify(request));
            if (!this.checkSendSpeed(methodName)) {
                callback('发送太快，请等一等', null);
                this._logError('由于发送太快， rpcName: ' + methodName + '发送失败');
                return;
            }
            if (this.getConnectState() != game.EConnectState.usable) {
                callback('no open', null);
                this._logError('连接没打开， rpcName: ' + methodName + '发送失败');
                return;
            }
            this.route.sendRequest(serviceName, methodName, request, callback);
        }

        // 对业务接口，监听Notify消息
        public addMsgListener(msg_name: string, handler: Laya.Handler) {
            this.notifyHander.addHandler(msg_name, handler);
        }

        // 对业务接口，移除Notify监听
        public removeMsgListener(msg_name: string, handler: Laya.Handler) {
            this.notifyHander.removeHandler(msg_name, handler);
        }

        // #endregion

        private _logInfo(msg: string) {
            app.Log.info_net_t(`NetRouteGroup_Single`, msg);
        }

        private _logError(msg: string) {
            app.Log.error_net_t(`NetRouteGroup_Single`, msg);
        }
    }
}