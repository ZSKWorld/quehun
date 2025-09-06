

// 给登录界面用到NetRouteGroup，不进行主备和重连，适配多线路探测和线路手动选择
// 线路在运行期间只增不减，老的线路，运行状态会被改为removed，下次重连就不准用了
module net {
    export class NetRouteGroup_Entrance {
        public static Inst: NetRouteGroup_Entrance | null = null;
        public routeInfos: { [routeID: string]: any} = {};
        public routeCount: number = 0;
        public eventHandler: Laya.EventDispatcher;
        public notifyHander: NotifyHandler;
        public choosedRouteID: string = '';
        public routeMain: NetRoute | null = null;
        private openListener: ((data: { open: boolean, info?: string }) => void) | null = null;
        private duringMaintance: boolean = false;

        public constructor() {
            this.routeInfos = {};
            this.routeCount = 0;
            this.eventHandler = new Laya.EventDispatcher();
            this.notifyHander = new NotifyHandler();
            this.choosedRouteID = '';
            this.routeMain = null;
            this.openListener = null;
            this._onGatewayInfo();
            this._onFirstConnect();
            GatewayFetcher.eventHandler.on('OnFetchEnd', this, this._onGatewayInfo);
            Laya.timer.loop(200, this, this._loop);
        }

        private _onGatewayInfo() {
            const routeInfos = GatewayFetcher.getRoutes();
            this._logInfo(`_OnGatewayInfo routes: ${JSON.stringify(routeInfos)}`);
            for (const id in routeInfos) {
                const routeInfo = routeInfos[id];
                if (!this.routeInfos[id]) {
                    // 新线路，创建并添加到路由组中
                    const route = new NetRoute(id, routeInfo.domain, 'gateway', routeInfo.ssl, ['Lobby', 'Route']);
                    route.addListener('OnOpen', this, (data) => {
                        this._onRouteOpen(route);
                    });
                    route.addListener('OnUseable', this, (data) => {
                        this._onRouteUseable(route);
                    });
                    route.addListener('OnClose', this, (data) => {
                        this._onRouteClose(route, data.msg);
                    });
                    route.addListener('OnError', this, (data) => {
                        this._onRouteError(route, data.msg);
                    });
                    route.addListener('OnNotify', this, (data) => {
                        this._onRouteNotifyProto(route, data.name, data.data);
                    });
                    route.busyState = routeInfo.state;
                    route.level = routeInfo.level;
                    route.order = routeInfo.order || 1000;
                    route.name = routeInfo.name;
                    this.routeInfos[id] = {
                        route: route,
                        duringDetect: false,
                        lastDetectTime: -10000,
                        state: game.EConnectState.disconnect,
                        delay: -1
                    };
                    this.routeCount++;
                } else {
                    this.routeInfos[id].route.busyState = routeInfo.state;
                    this.routeInfos[id].route.level = routeInfo.level;
                    this.routeInfos[id].route.order = routeInfo.order || 1000;
                    this.routeInfos[id].route.name = routeInfo.name;
                    if (!this.routeInfos[id].route.busyStateCanUse()) {
                        this.routeInfos[id].route.close();
                    }
                }
            }
            for (const id in this.routeInfos) {
                if (!routeInfos[id]) {
                    this.routeInfos[id].route.close();
                    this.routeInfos[id].route.busyState = 'removed';
                    this.routeInfos[id].route.dispose();
                }
            }
            if (this.duringMaintance) {
                if (!GatewayFetcher.getMaintenance()) {
                    this.duringMaintance = false;
                    if (this.routeMain && this.routeMain.busyStateCanUse()) {
                        this.routeMain.connect();
                    }
                }
            }
        }

        private _onFirstConnect() {
            this.choosedRouteID = Laya.LocalStorage.getItem("routeID") || '';
            const routeMainInfo = this.routeInfos[this.choosedRouteID];
            if (routeMainInfo) {
                this.routeMain = routeMainInfo.route;
            } else {
                this.routeMain = null;
            }

            if (!this.routeMain || !this.routeMain.busyStateCanUse()) {
                // 之前的线路不可用，只能剩下的随机找一个了
                const routes: NetRoute[] = [];
                let maxLevel = -1;
                for (const id in this.routeInfos) {
                    const routeInfo = this.routeInfos[id];
                    if (routeInfo.route.busyStateCanUse()) {
                        if (routeInfo.route.level >= maxLevel) {
                            if (routeInfo.route.level > maxLevel) {
                                routes.length = 0;
                            }
                            routes.push(routeInfo.route);
                            maxLevel = routeInfo.route.level;
                        }
                    }
                }
                if (routes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * routes.length);
                    const route = routes[randomIndex];
                    this.routeMain = route;
                    this.choosedRouteID = this.routeMain.routeID;
                }
            }
            if (GatewayFetcher.getMaintenance()) {
                this.duringMaintance = true;
            } else {
                if (this.routeMain && this.routeMain.busyStateCanUse()) {
                    this.routeMain.connect();
                }
            }
        }

        private _loop() {
            const nowTime = Laya.timer.currTimer / 1000;
            for (const id in this.routeInfos) {
                const routeInfo = this.routeInfos[id];
                if (routeInfo.route.busyStateCanUse()) {
                    if (routeInfo.duringDetect || routeInfo.route.state === game.EConnectState.connecting || routeInfo.route.state === game.EConnectState.usable) {
                        routeInfo.state = routeInfo.route.state; // 缓存下来，关闭后短时间内都认为是这个值了
                        routeInfo.delay = routeInfo.route.getDelay(); // 缓存下来，关闭后时间内都认为是这个值了
                        if (nowTime > routeInfo.lastDetectTime + 40) {
                            routeInfo.duringDetect = false;
                            if (id !== this.choosedRouteID) {
                                routeInfo.route.close();
                            }
                        }
                    }
                }
            }
        }

        // #region ---------------- 子线路事件处理 -----------------------------------------

        private _onRouteOpen(route: NetRoute) {
            this._logInfo(`_OnRouteOpen: ${route.routeID}`);
            route.routeType = RouteType.Main;
        }

        private _onRouteUseable(route: NetRoute) {
            this._logInfo(`OnRouteUseable: ${route.routeID}`);
            route.detect();
            if (route === this.routeMain) {
                if (this.openListener) {
                    this.openListener({ open: true });
                    this.openListener = null;
                }
            }
        }

        private _onRouteClose(route: NetRoute, msg: string) {
            this._logInfo(`OnRouteClose: ${route.routeID}, msg: ${msg}`);
            this.routeInfos[route.routeID].duringDetect = false;
            if (route === this.routeMain) {
                if (this.openListener) {
                    this.openListener({ open: false, info: game.Tools.strOfLocalization(61) });
                    this.openListener = null;
                }
            }
        }

        private _onRouteError(route: NetRoute, msg: string) {
            this._logInfo(`OnRouteError: ${route.routeID}, msg: ${msg}`);
        }

        private _onRouteNotifyProto(route: NetRoute, name: string, msg: any) {
            if (route !== this.routeMain) {
                this._logError(`收到通知消息: ${name}，但不是主线路`);
                return;
            }
            if (this.notifyHander.hasHandler(name)) {
                this._logInfo(`收到通知消息: ${name}`);
                this.notifyHander.dispatch(name, msg);
            } else {
                this._logError(`消息：${name}未被监听`);
            }
        }

        // #endregion

        // #region ------------------- public api ------------------------------------------

        public isOK():boolean {
            return this.routeMain !== null && this.routeMain.state === game.EConnectState.usable;
        }

        public connect(callback: (data: { open: boolean; info?: string; maintenance?: string }) => void) {
            if (this.isOK()) {
                if (callback) callback({ open: true });
                return;
            }
            if (this.routeCount === 0) {
                // 对局服务器列表空，无法正常连接
                GatewayFetcher.checkFetch();
                if (callback) callback({ open: false, info: game.Tools.strOfLocalization(60) });
            } else if (this.routeMain === null) {
                // 您的连接状况不太好，请检查网络代理设置，或点击右侧线路进行切换
                GatewayFetcher.checkFetch();
                if (callback) callback({ open: false, info: game.Tools.strOfLocalization(61) });
            } else if (GatewayFetcher.getMaintenance()) {
                // 维护中
                GatewayFetcher.checkFetch();
                if (callback) callback({ open: false, maintenance: GatewayFetcher.getMaintenance() });
            } else if (this.routeMain.busyState === 'busy') {
                // 线路繁忙
                GatewayFetcher.checkFetch();
                if (callback) callback({ open: false, info: game.Tools.strOfLocalization(65) });
            } else if (this.routeMain.busyState === 'removed') {
                // 线路被移除，不可用
                if (callback) callback({ open: false, info: `${game.Tools.strOfLocalization(66)}(1)` });
            } else if (this.routeMain.busyState === 'rejected') {
                // 线路链接被拒绝过，不可用
                GatewayFetcher.checkFetch();
                if (callback) callback({ open: false, info: `${game.Tools.strOfLocalization(66)}(2)` });
            } else if (this.routeMain.busyStateCanUse()) {
                // 正常可连接
                this.openListener = callback;
                this.routeMain.connect();
            } else {
                // 未知情况，不可用
                GatewayFetcher.checkFetch();
                if (callback) callback({ open: false, info: `${game.Tools.strOfLocalization(66)}(3)` });
            }
        }

        public close() {
            this.openListener = null;
            if (this.routeMain) {
                this.routeMain.close();
            }
        }

        public disposeSelf() {
            Laya.timer.clearAll(this);
            this.eventHandler.offAll();
            this.notifyHander.clear();
            GatewayFetcher.eventHandler.off('OnFetchEnd', this, this._onGatewayInfo);
            NetRouteGroup_Entrance.Inst = null;
        }

        public detectAll() {
            if (GatewayFetcher.getMaintenance()) return;
            const nowTime = Laya.timer.currTimer / 1000;
            for (const id in this.routeInfos) {
                const routeInfo = this.routeInfos[id];
                if (routeInfo.route.busyStateCanUse()) {
                    if (nowTime > routeInfo.lastDetectTime + 2 * 60) {
                        routeInfo.duringDetect = true;
                        routeInfo.lastDetectTime = nowTime;
                        if (routeInfo.route.state === game.EConnectState.connecting || routeInfo.route.state === game.EConnectState.usable) {
                            routeInfo.route.detect();
                        } else {
                            routeInfo.route.connect();
                        }
                    }
                }
            }
        }

        public setMainRoute(routeID: string) {
            if (routeID === this.choosedRouteID) return;
            const routeInfo = this.routeInfos[routeID];
            if (!routeInfo) return;

            if (this.routeMain && !this.routeInfos[this.choosedRouteID].duringDetect && (this.routeMain.state === game.EConnectState.connecting || this.routeMain.state === game.EConnectState.usable)) {
                this.routeMain.close();
            }
            this.routeMain = routeInfo.route;
            this.choosedRouteID = routeID;
            Laya.LocalStorage.setItem('routeID', routeID);
            if (!GatewayFetcher.getMaintenance()) {
                if (this.routeMain.state !== game.EConnectState.connecting && this.routeMain.state !== game.EConnectState.usable) {
                    this.routeMain.connect();
                }
            }
        }

        public getRouteInfo(routeID: string): {busyState: string, state?: game.EConnectState, delay?: number} {
            const routeInfo = this.routeInfos[routeID];
            if (!routeInfo) return { busyState: 'removed' };
            const route = routeInfo.route;
            if (!route.busyStateCanUse()) {
                return { busyState: route.busyState };
            }
            if (route.state === game.EConnectState.tryconnect || route.state === game.EConnectState.connecting) {
                return { busyState: route.busyState, state: route.state };
            } else if (route.state === game.EConnectState.usable) {
                return { busyState: route.busyState, state: route.state, delay: route.getDelay() };
            } else {
                return { busyState: routeInfo.route.busyState, state: routeInfo.state, delay: routeInfo.delay };
            }
        }

        // 对业务接口，调用远程rpc
        public sendRequest(serviceName: string, methodName: string, request: any, callback: (error: string | null, response: any) => void) {
            this._logInfo(`发送业务请求, Service Name: ${serviceName}, Method Name: ${methodName}, request: ${JSON.stringify(request)}`);
            if (!this.isOK()) {
                callback('no open', null);
                this._logError(`连接没打开， rpcName: ${methodName}发送失败`);
                return;
            }
            this.routeMain!.sendRequest(serviceName, methodName, request, callback);
        }

        // #endregion

        private _logInfo(msg: string) {
            app.Log.info_net_t(`NetRouteGroup_Entrance`, msg);
        }

        private _logError(msg: string) {
            app.Log.error_net_t(`NetRouteGroup_Entrance`, msg);
        }
    }
}