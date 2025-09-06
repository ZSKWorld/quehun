module net {

    export class NetRouteGroup {
        static Inst: NetRouteGroup | null = null;
        public routes: { [routeID: string]: NetRoute } = {};
        public routeMain: NetRoute | null = null;
        public routeStandby: NetRoute | null = null;
        public routeDetect: NetRoute | null = null;
        private routeMainStartTime: number = 0;
        private routeMainEndTime: number = 0;
        private routeStandbyStartTime: number = 0;
        private routeDetectStartTime: number = 0;
        private lastDetectTime: number = 0;
        private closed: boolean = true;
        private stopAutoSwitchTags: string[] = [];
        private sendHistory: { rpcName: string, timeStamp: number }[] = [];
        public eventHandler: Laya.EventDispatcher;
        private notifyHander: NotifyHandler;
        public state: game.EConnectState = game.EConnectState.none;
        public duringReconnect: boolean = false;
        public reconnectCounter: number = 0;
        public initedFromEntrance: boolean = false;
        private lastReconnectTime: number = 0;
        public _TickCheckMainRouteRet: string = '';
        public _TickCheckDetectRet: string = '';
        public _DoDetectRet: string = '';
        public handStepTick: boolean = false;

        private static reconnectSpans = [300, 1000, 3000, 6000, 10000, 15000];

        constructor() {
            this.routes = {};
            this.routeMain = null;
            this.routeStandby = null;
            this.routeDetect = null;
            this.routeMainStartTime = 0;
            this.routeMainEndTime = 0;
            this.routeStandbyStartTime = 0;
            this.routeDetectStartTime = 0;
            this.lastDetectTime = 0;
            this.closed = true;
            this.stopAutoSwitchTags = [];
            this.sendHistory = [];
            this.eventHandler = new Laya.EventDispatcher();
            this.notifyHander = new NotifyHandler();
            this.state = game.EConnectState.none;
            this.duringReconnect = false;
            this.reconnectCounter = 0;
            this.initedFromEntrance = false;
            this.lastReconnectTime = 0;
            this._TickCheckMainRouteRet = '';
            this._TickCheckDetectRet = '';
            this._DoDetectRet = '';

            GatewayFetcher.eventHandler.on('OnFetchEnd', this, (data: any) => {
                if (!this.initedFromEntrance) return;
                if (data.open) {
                    this._onGatewayInfo();
                }
            });
            Laya.timer.loop(1000, this, () => {
                if (!this.initedFromEntrance) return;
                this._tick();
            });
        }

        private _onGatewayInfo() {
            if (!this.initedFromEntrance) return;
            const routeInfos = GatewayFetcher.getRoutes();
            this._logInfo('_OnGatewayInfo routes: ' + JSON.stringify(routeInfos));
            for (const id in routeInfos) {
                if (!this.routes[id]) {
                    const route = new NetRoute(id, routeInfos[id].domain, 'gateway', routeInfos[id].ssl, ['Lobby', 'Route']);
                    this._onAddRoute(route);
                    route.busyState = routeInfos[id].state;
                    route.level = routeInfos[id].level;
                    route.order = routeInfos[id].order || 1000;
                    route.name = routeInfos[id].name;
                    this.routes[id] = route;
                } else {
                    const route = this.routes[id];
                    route.busyState = routeInfos[id].state;
                    route.level = routeInfos[id].level;
                    route.order = routeInfos[id].order || 1000;
                    route.name = routeInfos[id].name;
                    if (route !== this.routeMain) {
                        if (!route.busyStateCanUse()) {
                            route.close();
                        }
                    }
                }
            }
        }

        private _onAddRoute(route: NetRoute) {
            route.clearListeners();
            route.addListener('OnOpen', this, (data: any) => {
                this._onRouteOpen(route);
            });
            route.addListener('OnUseable', this, (data: any) => {
                this._onRouteUseable(route);
            });
            route.addListener('OnClose', this, (data: any) => {
                this._onRouteClose(route, data.msg);
            });
            route.addListener('OnError', this, (data: any) => {
                this._onRouteError(route, data.msg);
            });
            route.addListener('OnNotify', this, (data: any) => {
                this._onRouteNotifyProto(route, data.name, data.data);
            });
        }

        private _checkSendSpeed(rpcName: string): boolean {
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
                this._logError('糟了，在一秒内出现了大喷发, count1Sec: ' + count1Sec + ', history: ' + this.sendHistory);
                return false;
            }
            if (count10Sec > 100) {
                this._logError('糟了，在十秒内出现了大喷发, count10Sec: ' +  count10Sec + ', totalCount: ' + this.sendHistory.length + ', history: ' + this.sendHistory);
                return false;
            }
            return true;
        }

        // #region ------------------- 主备切换 -----------------------------------------

        private _tick() {
            if (this.closed) return;
            if (!this.initedFromEntrance) return;
            if (this.handStepTick) return;

            this._TickCheckMainRouteRet = this._tickCheckMainRoute();
            this._TickCheckDetectRet = this._tickCheckDetect();
        }

        private _tickCheckMainRoute(): string {
            if (this.handStepTick) {
                this._logInfo('_TickCheckMainRoute start');
            }
            if (this.stopAutoSwitchTags.length > 0) {
                return 'autoSwitch关闭，存在外部不方便切换的原因, 原因: ' + this.stopAutoSwitchTags.join(',');
            }
            const nowTime = Laya.timer.currTimer / 1000;
            if (nowTime < this.lastReconnectTime + 30) {
                return '距离上次重连/切换为' + Math.floor(nowTime - this.lastReconnectTime) + 's，不足30s，禁止切换';
            }

            let routeMainQuility = DELAY_INF;
            if (this.routeMain) {
                routeMainQuility = this.routeMain.getQualityGrade();
                if (this.routeMain.locked) {
                    return '主线路被锁定，可能在切换中';
                }
                if (this.routeMain.duringDetect) {
                    return '主线路正在检测中，禁止切换';
                }
                if (nowTime < this.routeMain.openStartTime + 10) {
                    return '主线路刚打开' + Math.floor(nowTime - this.routeMain.openStartTime) + 's，不足10s，禁止切换';
                }
                if (this.routeMain.waitingRpcCount > 0) {
                    return '主线路正在等待RPC回包，禁止切换';
                }
            }
            let routeStandbyQuility = DELAY_INF;
            if (this.routeStandby) {
                routeStandbyQuility = this.routeStandby.getQualityGrade();
                if (this.routeStandby.locked) {
                    return '备用线路被锁定，可能正在切换中';
                }
                if (this.routeStandby.duringDetect) {
                    return '备用线路正在检测中，禁止切换';
                }
                if (nowTime < this.routeStandby.openStartTime + 3) {
                    return '备用线路刚打开' + Math.floor(nowTime - this.routeStandby.openStartTime) + 's，不足3s，禁止切换';
                }
            } else {
                return '备用线路不存在';
            }

            if (this.handStepTick) {
                this._logInfo('主线路质量: ' + routeMainQuility + ', 备用线路质量: ' + routeStandbyQuility);
            }

            if (routeStandbyQuility > DELAY_BAD_THRESHOLD) {
                return '备选线路质量太差，放弃切换';
            } else if (routeStandbyQuility + 0.5 < routeMainQuility) {
                if (this.handStepTick) {
                    this._logInfo('备选线路质量足够强，体验好多了，强制切换到备选线路， routeStandbyQuility: ' + routeStandbyQuility + ', routeMainQuility: ' + routeMainQuility);
                }
                if (this.routeStandby.needDetect()) {
                    this.routeStandby.detect();
                    return '备用线路质量很好，可以强制切换，但是很久没探测了，要先检测一下';
                } else {
                    this._switchStandby2Main();
                    return '触发强制主备切换';
                }
            } else if (routeMainQuility > DELAY_GOOD_THRESHOLD && routeStandbyQuility + 0.25 < routeMainQuility) {
                if (this.handStepTick) {
                    this._logInfo('备选线路质量略好，切换权力交给玩家，routeStandbyQuility: ' + routeStandbyQuility + ', routeMainQuility: ' + routeMainQuility);
                }
                if (this.routeStandby.needDetect()) {
                    if (this.handStepTick) {
                        this._logInfo('备用线路很久没探测了，选择备用线路前要先检测一下');
                    }
                    this.routeStandby.detect();
                    return '备用线路质量好一些，可以手动切换，但是很久没探测了，要先检测一下';
                } else {
                    this._showSwitchToStandbyRouteUI();
                    return '备用线路质量好一些，可以手动切换，显示手动切换按钮';
                }
            } else {
                if (this.handStepTick) {
                    this._logInfo('不满足切换条件，不进行线路切换');
                }
                return '备用线路质量不满足切换条件，不进行线路切换';
            }
        }

        private _tickCheckDetect(): string {
            if (this.handStepTick) {
                this._logInfo('_TickCheckDetect start');
            }
            const nowTime = Laya.timer.currTimer / 1000;

            let routeStandbyQuility = DELAY_INF;
            if (this.routeStandby) {
                routeStandbyQuility = this.routeStandby.getQualityGrade();
                if (this.routeStandby.locked) {
                    return '备用线路被锁定，可能正在切换中';
                }
                if (this.routeStandby.duringDetect) {
                    return '备用线路正在检测中，禁止切换';
                }
                if (nowTime < this.routeStandby.openStartTime + 3) {
                    return '备用线路刚打开' + Math.floor(nowTime - this.routeStandby.openStartTime) + 's，不足3s，禁止切换';
                }
            }

            if (this.routeDetect) {
                if (this.handStepTick) {
                    this._logInfo('存在探测线路，判断是否要替换掉备用线路');
                }
                if (this.routeDetect.state === game.EConnectState.tryconnect || this.routeDetect.state === game.EConnectState.connecting) {
                    return '备用线路正在连接，不切换';
                }
                if (this.routeDetect.locked) {
                    return '备用线路被锁定，可能正在切换中';
                }
                if (this.routeDetect.duringDetect) {
                    return '备用线路正在探测，继续等待探测完成';
                }
                if (nowTime < this.routeDetect.openStartTime + 3) {
                    return '备用线路刚打开' + Math.floor(nowTime - this.routeDetect.openStartTime) + 's，不足3s，禁止切换';
                }
                const routeDetectQuility = this.routeDetect.getQualityGrade();
                if (routeDetectQuility + 0.1 < routeStandbyQuility) {
                    if (this.handStepTick) {
                        this._logInfo('探测线路比备用线路质量好，进行切换');
                    }
                    this._switchDetect2Standby();
                    return '触发备用线路和探测线路的切换';
                } else {
                    this._logInfo('探测线路不比备用线路质量好多，不进行切换，关闭探测线路');
                    if (routeDetectQuility > DELAY_BAD_THRESHOLD) {
                        this.routeDetect.bannedTimestamp = nowTime + 10 * 60;
                    } else {
                        this.routeDetect.bannedTimestamp = nowTime + 3 * 60;
                    }
                    this.routeDetect.close();
                    this.routeDetect = null;
                    return '探测线路不满足比备用线路质量好100ms的条件，关闭探测线路';
                }
            } else {
                if (this.handStepTick) {
                    this._logInfo('不存在探测线路，检查是否要探测');
                }
                this._DoDetectRet = this._doDetect(routeStandbyQuility);
                return '不存在探测线路，尝试检查是否可以探测';
            }
        }

        private _switchStandby2Main() {
            this._logInfo('_SwitchStandby2Main');
            let IDBefore = 'unknown';
            if (this.routeMain) {
                IDBefore = this.routeMain.routeID;
            }
            let IDAfter = 'unknown';
            if (this.routeStandby) {
                IDAfter = this.routeStandby.routeID;
            }
            this._logInfo('OnChangeMainRouteBegin IDBefore: ' + IDBefore + ', IDAfter: ' + IDAfter);
            this.eventHandler.event('OnChangeMainRouteBegin', { IDBefore: IDBefore, IDAfter: IDAfter });
            this._switchRoute(this.routeMain, this.routeStandby, RouteType.Main, (success: boolean) => {
                if (success) {
                    Laya.LocalStorage.setItem('routeID', this.routeMain.routeID);
                    this.routeMain.sendRequest('Lobby', 'fastLogin', {}, (err: any, res: any) => {
                        if (err) {
                            this._logError("快速登录失败 1, err:", err);
                            this.routeMain.close();
                            this.routeMain = null;
                        } else {
                            if (res.error && res.error.code !== 0) {
                                this._logError("快速登录失败  2, res.error:", res.error);
                                this.routeMain.close();
                                this.routeMain = null;
                            } else {
                                this._logInfo("快速登录成功");
                                this.state = game.EConnectState.usable;
                                if (this.duringReconnect) {
                                    this._onReconnectSuccess(this.routeMain, true);
                                } else {
                                    this.lastReconnectTime = Laya.timer.currTimer / 1000;
                                }
                                this._logInfo('OnChangeMainRouteEnd IDBefore: ' + IDBefore + ', IDAfter: ' + IDAfter);
                                this.eventHandler.event('OnChangeMainRouteEnd', { IDBefore: IDBefore, IDAfter: IDAfter });
                                game.LoginMgr.onFastLogin(res);
                            }
                        }
                    });
                }
            });
        }

        private _switchRoute(routeBefore: NetRoute | null, routeAfter: NetRoute, routeType: RouteType, callback: (success: boolean) => void) {
            if (routeType !== RouteType.Main && routeType !== RouteType.Standby) return;
            if (!routeAfter) return;

            let routeBeforeID = '';
            if (routeBefore) {
                routeBefore.locked = true;
                routeBeforeID = routeBefore.routeID;
            }
            this._logInfo("进行线路切换, 切换类型：" + routeType + ", beforeID: " + routeBeforeID + ", afterID:" + routeAfter.routeID);

            const serviceName = 'Route';
            const methodName = 'requestRouteChange';
            const request: any = {};
            request.before = routeBeforeID;
            request.route_id = routeAfter.routeID;
            request.type = routeType;
            routeAfter.locked = true;
            routeAfter.sendRequest(serviceName, methodName, request, (err: any, res: any) => {
                let success = false;
                if (err) {
                    this._logError("线路切换失败 1, err:" + err);
                    success = false;
                } else {
                    if (res.error && res.error.code !== 0) {
                        this._logError("线路切换失败  2, res.error:" + JSON.stringify(res.error));
                        success = false;
                    } else {
                        if (res.result === 1) {
                            this._logInfo("线路切换成功");
                            success = true;
                        } else {
                            this._logError("线路切换失败  3, res.result:" + res.result);
                            success = false;
                        }
                    }
                }
                if (success) {
                    if (routeBefore) {
                        routeBefore.locked = false;
                        routeBefore.close();
                        routeBefore.routeType = RouteType.None;
                        routeBefore.bannedTimestamp = Laya.timer.currTimer / 1000 + 1 * 60;
                    }
                    routeAfter.routeType = routeType;
                    routeAfter.locked = false;
                    if (routeType === RouteType.Main) {
                        this.routeMain = routeAfter;
                        this.routeStandby = null;
                    } else if (routeType === RouteType.Standby) {
                        this.routeStandby = routeAfter;
                        this.routeDetect = null;
                    }
                } else {
                    if (routeBefore) {
                        routeBefore.locked = false;
                    }
                    routeAfter.locked = false;
                    routeAfter.close();
                    routeAfter.bannedTimestamp = Laya.timer.currTimer / 1000 + 5 * 60;
                }
                if (callback) {
                    callback(success);
                }
            });
        }

        private _showSwitchToStandbyRouteUI() {
            this._logInfo("显示切换线路的提示UI, 原线路：" + this.routeMain?.routeID + ", 备选线路：" + this.routeStandby?.routeID);
            this.eventHandler.event('OnStandbyRouteBetter', { routeMain: this.routeMain, routeStandby: this.routeStandby });
        }

        private _routeCanDetect(route: NetRoute): boolean {
            if (route === this.routeMain || route === this.routeStandby) return false;
            if (route.state !== game.EConnectState.disconnect && route.state !== game.EConnectState.none) return false;
            if (route.busyState !== 'idle') return false;
            if (Laya.timer.currTimer / 1000 < route.bannedTimestamp) return false;
            return true;
        }

        private _doDetect(routeStandbyQuility: number): string {
            routeStandbyQuility = routeStandbyQuility || DELAY_INF;
            if (routeStandbyQuility <= DELAY_GOOD_THRESHOLD - 0.05) {
                return '备用线路质量足够高，无需探测';
            }
            const cd0 = 3 * 60;
            const cd1 = 3;
            const t0 = DELAY_GOOD_THRESHOLD - 0.1;
            const t1 = DELAY_BAD_THRESHOLD;
            let cd = 30;
            if (routeStandbyQuility > t1) {
                cd = cd1;
            } else {
                const rate = (routeStandbyQuility - t0) / (t1 - t0);
                cd = cd0 * (1 - rate) + cd1 * rate;
            }

            const nowTime = Laya.timer.currTimer / 1000;
            const dt = nowTime - this.lastDetectTime;
            if (dt < cd) {
                return '探测未到冷却时间，暂不探测，距离上次探测过去' + Math.floor(dt) + '秒， 冷却时间: ' + Math.floor(cd) + '秒';
            }
            if (GatewayFetcher.checkFetch()) {
                return 'Gateway信息需要更新，等待更新完成';
            }

            const betterRoutes: NetRoute[] = [];
            const worseRoutes: NetRoute[] = [];
            for (const id in this.routes) {
                const route = this.routes[id];
                if (this._routeCanDetect(route)) {
                    if (!route.connected) {
                        betterRoutes.push(route);
                    } else {
                        if (route.lastDetectQuilty < routeStandbyQuility) {
                            betterRoutes.push(route);
                        } else {
                            worseRoutes.push(route);
                        }
                    }
                }
            }

            if (betterRoutes.length + worseRoutes.length === 0) {
                return '所有线路都在禁用中，无法进行探测';
            }

            if (betterRoutes.length > 0) {
                this.lastDetectTime = nowTime;
                const betterRoute = betterRoutes[Math.floor(Math.random() * betterRoutes.length)];
                betterRoute.connect();
                this._logInfo("从betterRoute中, 进行线路探测 routeID:" + betterRoute.routeID);
                return '进行线路探测 routeID:' + betterRoute.routeID;
            }
            if (worseRoutes.length > 0) {
                this.lastDetectTime = nowTime;
                const worseRoute = worseRoutes[Math.floor(Math.random() * worseRoutes.length)];
                worseRoute.connect();
                this._logInfo("从worseRoute中, 进行线路探测 routeID:" + worseRoute.routeID);
                return '进行线路探测 routeID:' + worseRoute.routeID;
            }
            return '';
        }

        private _switchDetect2Standby() {
            this._switchRoute(this.routeStandby, this.routeDetect!, RouteType.Standby, (success: boolean) => {
                this._logInfo('探测线路替换备用线路, success: ' + success);
                if (success) {
                    this._standbyPrepareLogin();
                }
            });
        }

        private _reconnectRouteMain() {
            const route = this.routeMain;
            Laya.timer.once(NetRouteGroup.reconnectSpans[this.reconnectCounter], this, () => {
                if (this.closed || !this.duringReconnect || this.routeMain !== route) {
                    return;
                }
                this._logInfo("断线重连，尝试次数:" + this.reconnectCounter);
                route!.connect();
            });
        }

        private _onReconnectSuccess(route: NetRoute, changed: boolean) {
            this._logInfo("重连成功，线路:" + route.routeID + ', changed: ' + changed);
            this.duringReconnect = false;
            this.reconnectCounter = 0;
            this.lastReconnectTime = Laya.timer.currTimer / 1000;
            this.eventHandler.event('OnReconnectSuccess', { routeID: route.routeID, changed: changed });
        }

        private _standbyPrepareLogin() {
            this._logInfo("备用线路进行预登录 start");
            this.routeStandby!.locked = true;
            const request: any = {};
            request.access_token = game.LoginMgr.access_token;
            request.type = game.LoginMgr.sociotype;
            this.routeStandby.sendRequest('Lobby', 'prepareLogin', request, (err: any, res: any) => {
                this.routeStandby!.locked = false;
                if (err) {
                    this._logError("备用线路预登录失败 1, err:" + err);
                    this.routeStandby.close();
                    this.routeStandby.bannedTimestamp = Laya.timer.currTimer / 1000 + 5 * 60;
                    this.routeStandby = null;
                } else {
                    if (res.error && res.error.code !== 0) {
                        this._logError("备用线路预登录失败  2, res.error:" + JSON.stringify(res.error));
                        this.routeStandby.close();
                        this.routeStandby.bannedTimestamp = Laya.timer.currTimer / 1000 + 5 * 60;
                        this.routeStandby = null;
                    } else {
                        this._logInfo("备用线路预登录成功");
                    }
                }
            });
        }

        // #endregion

        // #region ---------------- 子线路事件处理 -----------------------------------------

        private _onRouteOpen(route: NetRoute) {
            this._logInfo("OnRouteOpen:" + route.routeID);
            if (this.closed) {
                route.close();
                return;
            }

            if (!this.routeMain || this.routeMain === route) {
                this.routeMain = route;
                this.routeMainStartTime = Laya.timer.currTimer / 1000;
                route.routeType = RouteType.Main;
                Laya.LocalStorage.setItem('routeID', this.routeMain.routeID);
                this.state = game.EConnectState.connecting;
            } else if (!this.routeStandby || this.routeStandby === route) {
                this.routeStandby = route;
                this.routeStandbyStartTime = Laya.timer.currTimer / 1000;
                route.routeType = RouteType.Standby;
                route.locked = true;
            } else if (!this.routeDetect || this.routeDetect === route) {
                this.routeDetect = route;
                this.routeDetectStartTime = Laya.timer.currTimer / 1000;
                route.routeType = RouteType.Detect;
            } else {
                route.routeType = RouteType.None;
                route.close();
            }
        }

        private _onRouteUseable(route: NetRoute) {
            this._logInfo("OnRouteUseable:" + route.routeID);
            if (this.closed) {
                route.close();
                return;
            }
            if (route === this.routeMain) {
                this.state = game.EConnectState.usable;
                this.eventHandler.event("OnRouteUseable", { routeID: route.routeID });
                if (this.duringReconnect) {
                    this._onReconnectSuccess(route, false);
                }
            } else if (route === this.routeStandby) {
                this._standbyPrepareLogin();
                route.detect();
            } else if (route === this.routeDetect) {
                route.detect();
            } else {
                route.close();
            }
        }

        private _onRouteClose(route: NetRoute, msg: string) {
            this._logInfo("OnRouteClose:" + route.routeID + ", msg:" + msg);
            if (route === this.routeMain) {
                if (this.closed) {
                    this.routeMain = null;
                } else {
                    if (this.duringReconnect) {
                        this.reconnectCounter++;
                        if (this.reconnectCounter >= NetRouteGroup.reconnectSpans.length) {
                            this.duringReconnect = false;
                            this.routeMain = null;
                            this.close();
                            this._logInfo('OnReconnectFailed');
                            this.eventHandler.event("OnReconnectFailed", {});
                        } else {
                            this._reconnectRouteMain();
                        }
                    } else {
                        this.state = game.EConnectState.reconnecting;
                        this.duringReconnect = true;
                        this.reconnectCounter = 0;
                        this._reconnectRouteMain();
                        this._logInfo('OnReconnectStarted');
                        this.eventHandler.event("OnReconnectStarted", {});
                    }
                }
            } else if (route === this.routeStandby) {
                this.routeStandby = null;
            } else if (route === this.routeDetect) {
                this.routeDetect = null;
            }
        }

        private _onRouteError(route: NetRoute, msg: string) {
            this._logInfo("OnRouteError:" + route.routeID + ", msg:" + msg);
            if (route === this.routeMain) {
                // 主线路错误，等待Close信息来进行重连
            } else if (route === this.routeStandby) {
                this.routeStandby = null;
            } else if (route === this.routeDetect) {
                this.routeDetect = null;
                route.bannedTimestamp = Laya.timer.currTimer / 1000 + 5 * 60;
            } else {
                route.bannedTimestamp = Laya.timer.currTimer / 1000 + 3 * 60;
            }
        }

        private _onRouteNotifyProto(route: NetRoute, name: string, msg: any) {
            if (route !== this.routeMain) {
                this._logError("收到通知消息:" + name + "，但不是主线路");
                return;
            }
            if (this.notifyHander.hasHandler(name)) {
                this.notifyHander.dispatch(name, msg);
            } else {
                this._logError('消息：' + name + '未被监听');
            }
        }

        // #endregion

        // #region ------------------- public api ------------------------------------------

        public initFromEntrance() {
            this._logInfo('InitFromEntrance start');
            // Toto
            this.routes = {};
            for (const routeID in NetRouteGroup_Entrance.Inst.routeInfos) {
                const route = NetRouteGroup_Entrance.Inst.routeInfos[routeID].route;
                this._onAddRoute(route);
                this.routes[routeID] = route;
            }
            this.routeMain = NetRouteGroup_Entrance.Inst.routeMain;
            for (const id in this.routes) {
                const route = this.routes[id];
                if (route !== this.routeMain) {
                    route.close();
                }
            }
            this.routeMainStartTime = Laya.timer.currTimer / 1000;
            this.state = this.routeMain?.state || game.EConnectState.none;
            this.closed = false;
            this.initedFromEntrance = true;
            NetRouteGroup_Entrance.Inst.disposeSelf();
        }

        public close() {
            this.closed = true;
            this.state = game.EConnectState.disconnect;
            this.eventHandler.event("OnClose", {});
            if (this.routeMain) {
                this.routeMain.close();
                this.routeMain = null;
            }
            if (this.routeStandby) {
                this.routeStandby.close();
                this.routeStandby = null;
            }
            if (this.routeDetect) {
                this.routeDetect.close();
                this.routeDetect = null;
            }
            Laya.timer.clearAll(this);
        }

        public getDelay(): number {
            if (this.closed || !this.routeMain) return 100;
            return this.routeMain.getDelay();
        }

        public getMainRouteID(): string {
            if (this.routeMain) return this.routeMain.routeID;
            return '';
        }

        public getQualityGrade(): number {
            if (this.closed || !this.routeMain) return DELAY_INF;
            return this.routeMain.getQualityGrade();
        }

        public getConnectState(): game.EConnectState {
            return this.state;
        }

        public sendRequest(serviceName: string, methodName: string, request: any, callback: (err: any, res: any) => void) {
            this._logInfo("发送业务请求, Service Name: " + serviceName + ", Method Name: " + methodName + ", request: " + request);
            if (!this._checkSendSpeed(methodName)) {
                callback('send too fast', null);
                this._logError('由于发送太快， rpcName: ' + methodName + '发送失败');
                return;
            }
            if (this.getConnectState() !== game.EConnectState.usable) {
                callback('no open', null);
                this._logError('连接没打开， rpcName: ' + methodName + '发送失败');
                return;
            }
            this.routeMain.sendRequest(serviceName, methodName, request, callback);
        }

        addMsgListener(msg_name: string, handler: Laya.Handler) {
            this.notifyHander.addHandler(msg_name, handler);
        }

        removeMsgListener(msg_name: string, handler: Laya.Handler) {
            this.notifyHander.removeHandler(msg_name, handler);
        }

        getChoosedUrl(): string {
            if (!this.routeMain) return '';
            return this.routeMain.url;
        }

        getRoute(routeID: string): NetRoute | undefined {
            return this.routes[routeID];
        }

        handChangeMainRoute(): boolean {
            let qualityMainRoute = DELAY_INF;
            if (this.routeMain) {
                qualityMainRoute = this.routeMain.getQualityGrade();
            }
            let qualityStandbyRoute = DELAY_INF;
            if (this.routeStandby) {
                qualityStandbyRoute = this.routeStandby.getQualityGrade();
            }
            this._logInfo("NetRouteGroup" + "HandChangeMainRoute, qualityMainRoute:" + qualityMainRoute + " qualityStandbyRoute:" + qualityStandbyRoute);
            if (qualityStandbyRoute < qualityMainRoute) {
                this._logInfo("HandChangeMainRoute: success");
                this._switchStandby2Main();
                return true;
            }
            this._logInfo("HandChangeMainRoute: fail");
            return false;
        }

        public addStopAutoSwitchTag(tag: string) {
            if (this.stopAutoSwitchTags.indexOf(tag) === -1) {
                this.stopAutoSwitchTags.push(tag);
                this._logInfo("addStopAutoSwitchTag:" + tag);
            }
        }

        public removeStopAutoSwitchTag(tag: string) {
            while (this.stopAutoSwitchTags.indexOf(tag) !== -1) {
                this.stopAutoSwitchTags.splice(this.stopAutoSwitchTags.indexOf(tag), 1);
                this._logInfo("removeStopAutoSwitchTag:" + tag);
            }
        }

        // #endregion

        // #region private methods

        private _logInfo(msg: string) {
            app.Log.info_net_t(`NetRouteGroup`, msg);
        }

        private _logError(msg: string) {
            app.Log.error_net_t(`NetRouteGroup`, msg);
        }

        // #endregion

    }
}