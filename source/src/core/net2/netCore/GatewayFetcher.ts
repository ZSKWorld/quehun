module net {

    export interface Gateway {
        id: string;
        url: string;
    }

    export class GatewayFetcher {
        private static gateways: Gateway[];
        public static eventHandler: Laya.EventDispatcher = new Laya.EventDispatcher();
        private static fetchID: number = 1;
        private static preFetchSuccessed: boolean = false;
        private static fetchFailedCount: number = 0;
        private static gatewayInfo: Object = null;
        private static maintenance: string = null;
        private static routes: Object = {};
        private static preGatewayID: string = '';
        private static preGatewayUrl: string = '';
        private static waitingFetchCount: number = 0;
        private static duringFetching: boolean = false;
        private static lastFetchTime: number = -10000;
        private static _inHttps: boolean = false;
        private static regionLang: string = '';

        private static _logInfo(msg: string) {
            app.Log.info_net_t('GatewayFetcher', msg);
        }

        private static _logError(msg: string) {
            app.Log.error_net_t('GatewayFetcher', msg);
        }

        private static initLang() {
            if (GameMgr.client_type === 'chs_t') {
				if (navigator.language.toLowerCase() == 'zh-cn') {
					this.regionLang = 'chs';
				} else {
					this.regionLang = 'chst';
				}
            } else {
                this.regionLang = GameMgr.client_type;
            }
        }

        public static init(_gateways: Gateway[]) {
            this._logInfo(`Init _gateways: ${JSON.stringify(_gateways)}`);
            this.gateways = _gateways;
            this.initLang();
        }

        private static fetch() {
            if (this.duringFetching) return;
            this.fetchID++;
            this._logInfo(`Fetch, fetchID: ${this.fetchID}`);
            const fetchID = this.fetchID;

            let preIndex = -1;
            for (let i = 0; i < this.gateways.length; i++) {
                if (this.gateways[i].id === this.preGatewayID) {
                    preIndex = i;
                    break;
                }
            }

            this.duringFetching = true;
            this.waitingFetchCount = this.gateways.length;
            Laya.timer.clearAll(this);
            let delayFetchOther = 0.1;
            if (preIndex !== -1) {
                const gateway = this.gateways[preIndex];
                this._tryFetchOne(gateway.id, gateway.url, fetchID);
                delayFetchOther = 3;
            }
            Laya.timer.once(delayFetchOther * 1000, this, () => {
                if (fetchID !== this.fetchID) return;
                for (let i = 0; i < this.gateways.length; i++) {
                    if (i !== preIndex) {
                        const gateway = this.gateways[i];
                        this._tryFetchOne(gateway.id, gateway.url, fetchID);
                        break;
                    }
                }
            });
        }

        public static checkFetch(force: boolean = false): boolean {
            if (this.duringFetching) return true;
            let cd = 60 * 2;
            if (!this.preFetchSuccessed) cd = 1 + this.fetchFailedCount * 2;
            if (this.fetchFailedCount > 10) cd = 20;
            if (this.maintenance) cd = Math.min(cd, 30);

            if (force || Laya.timer.currTimer / 1000 > this.lastFetchTime + cd) {
                this.fetch();
                return true;
            }
            return false;
        }

        public static getMaintenance(): string | null {
            return this.maintenance;
        }

        public static getRoutes(): Object {
            return this.routes;
        }

        public static inHttps(): boolean {
            return this._inHttps;
        }

        private static _httpGet(url: string, callback: (res: string, err: any) => void, timeout: number = 10000) {
            let waiting = true;
            game.LoadMgr.httpload(url, "text", true, Laya.Handler.create(this, d => {
                if (!waiting) return;
                waiting = false;
                if (d.success) {
                    callback(d.data, null);
                } else {
                    callback(null, d.error);
                }
            }));
            Laya.timer.once(timeout, this, () => {
                if (!waiting) return;
                waiting = false;
                callback(null, 'TIMEOUT');
            });
        }

        private static _tryFetchOne(gatewayID: string, url: string, fetchID: number) {
            if (fetchID !== this.fetchID) return;
            let _url:string = url + `/api/clientgate/routes?platform=Web&version=${game.ResourceVersion.version}&lang=${this.regionLang}`;
            this._logInfo(`_TryFetchOne gatewayID: ${gatewayID}, url: ${_url}`);
            this._httpGet(_url, (res, err) => {
                this._onGetGatewayInfo(gatewayID, url, res, err, fetchID);
            });
        }

        private static _onGetGatewayInfo(gatewayID: string, url: string, res: string, err: any, fetchID: number) {
            if (fetchID !== this.fetchID) return;
            this.waitingFetchCount--;
            if (err) {
                this._onFetchError(gatewayID, err);
            } else {
                if (res && res !== '') {
                    const d = JSON.parse(res);
                    this._onFetchRoutes(gatewayID, url, d?.data);
                } else {
                    this._onFetchError(gatewayID, game.Tools.strOfLocalization(62));
                }
            }
        }

        private static _onFetchError(gatewayID: string, err: any) {
            this._logError(`_OnFetchError! gatewayID: ${gatewayID}, error: ${JSON.stringify(err)}`);
            if (this.waitingFetchCount > 0) {
                return;
            }
            Laya.timer.clearAll(this)
            this.maintenance = null;
            this.routes = {};
            this.preFetchSuccessed = false;
            this.duringFetching = false;
            this.fetchFailedCount++;
            this._logError(`GetGatewayInfo 全体失败, count: ${this.fetchFailedCount}`);
            this.lastFetchTime = Laya.timer.currTimer / 1000;
            this.fetchID++;
            if (this.fetchFailedCount <= 2) {
                this._logError('继续重试');
                Laya.timer.once((2 + this.fetchFailedCount * 2) * 1000, this, () => {
                    this.checkFetch();
                });
            } else {
                this._logError('次数太多, 不再重试。OnFetchEnd false');
                this.eventHandler.event('OnFetchEnd', { open: false, error: err });
            }
        }

        private static _onFetchRoutes(gatewayID: string, url: string, gatewayInfo: any) {
            this.gatewayInfo = gatewayInfo;
            this._logInfo(`_OnFetchRoutes 正常获取路由信息 gatewayID: ${gatewayID}, gatewayInfo: ${JSON.stringify(gatewayInfo)}`);
            this.maintenance = null;
            if (this.gatewayInfo['maintenance']) {
                this.maintenance = 'maintenancing';
                let maintenance = this.gatewayInfo['maintenance']
                for (let msg of maintenance) {
                    if(msg['lang'] == GameMgr.client_language) {
                        this.maintenance = msg['content'];
                        break;
                    }
                }
            }
            let _routes: any = this.gatewayInfo['routes'];
            if (!_routes || this.gatewayInfo['routes'].length <= 0) {
                this._onFetchError(gatewayID, game.Tools.strOfLocalization(62));
                return;
            }

            Laya.timer.clearAll(this);
            this.preFetchSuccessed = true;
            this.fetchFailedCount = 0;
            this.duringFetching = false;
            this.lastFetchTime = Laya.timer.currTimer / 1000;
            this.preGatewayID = gatewayID;
            this.preGatewayUrl = url;
            this._inHttps = this.preGatewayUrl.match(/https/) !== null;
            this.fetchID++;
            for (const id in this.routes) {
                this.routes[id].state = 'removed';
            }
            for (const info of _routes) {
                const routeID = info.id;
                this.routes[routeID] = info;
            }
            this.eventHandler.event('OnFetchEnd', { open: true });
        }

        public static fetchAnnounceList(callback: Laya.Handler) {
            if (this.preGatewayUrl === '') {
                this._logError('FetchAnnounceList preGatewayUrl不存在');
                return;
            }
            let lang = GameMgr.client_language;
            if (GameMgr.client_type === 'en' && GameMgr.client_language === 'kr') {
                lang = 'us-kr';
            }
            const url = this.preGatewayUrl + `/api/clientgate/announce_list?platform=Web&lang=${lang}`;
            app.Log.log_t('GatewayFetcher', 'fetchAnnounceList, url: ' + url);

            this._httpGet(url, (res, err) => {
                if (err) {
                    this._logError(`FetchAnnounceList err: ${JSON.stringify(err)}`);
                    callback.runWith({err: err});
                    return;
                }
                this._logInfo('FetchAnnounceList success, res: ' + res);
                callback.runWith({res: res});
            });
        }
    }
}