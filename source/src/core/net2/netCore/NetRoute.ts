//!!! NetRoute 不要引用其他模块，包括NetRouteGroup，保持独立性。如登录界面的线路列表也是可以用这个线路的。
module net {
    export class NetRoute {
        public routeID: string;
        public url: string;
        public tail: string;
        public ssl: boolean;
        private ws: Laya.Socket;
        public state: game.EConnectState = game.EConnectState.none;
        public eventHandler: Laya.EventDispatcher = new Laya.EventDispatcher();
        private waitingRequests: { [requestID: number]: { serviceName: string; methodName: string; callback: (err: any, res: any) => void } } = {};
        public waitingRpcCount: number = 0;        // 当前线路等待的RPC数量
        private delayWatcher: RouteDelayWatcher;
        private delayWatcherAll: RouteDelayWatcher;
        public lastPingTime: number = 0;           // 上次发送ping的时间
        public duringDetect: boolean = false;      // 是否正在进行检测
        public openStartTime: number = -1;         // 连接建立成功的时间戳
        public detectStartTime: number = 0;        // 检测开始的时间戳
        public detectEndTime: number = -1000;      // 检测结束的时间戳
        public lastDetectQuilty: number = DELAY_INF;   // 上次检测的网络质量等级，长期保存，当前连接关了，也保存了之前的
        public bannedTimestamp: number = 0;        // 被禁用的时间，禁用一段时间
        public routeType: RouteType = RouteType.None;
        public name: string = '';          // 线路名称，一般是1、2、3、4、5这样，客户端自己加上“线路”的本地化
        public busyState: 'idle' | 'normal' | 'busy' | 'removed' | 'rejected' = 'idle'; // 当前线路的繁忙状态，idle/normal/busy/removed/rejected，分别表示空闲/正常/忙碌/维护/移除/拒绝
        public level: number = 0;  // 当前线路的优先级，跟运营协商确定
        public order: number = 1000;       // 当前线路的序号，用于显示顺序，序号越小优先级越高
        public locked: boolean = false;    // 是否正在进行线路切换、登录等，禁止同时操作
        public connected: boolean = false;     // 是否已经连接过，未连接过的线路会优先连接，连接过而没连上的，说明实在太差
        public clientPlatformID: number;
        public session_id: string = '';

        private _version: number = 0;

        private messages_: Uint8Array[] = [];
        private workingMessage_: Uint8Array = null;
        private requestIndex_: number = 0;
        private services_: any = {};

        constructor(routeID: string, url: string, tail: string, ssl:boolean, service_list: Array<string>) {
            this.routeID = routeID;
            this.url = url;
            this.tail = tail || '';
            this.ssl = ssl;
            this.delayWatcher = new RouteDelayWatcher((requestID) => {
            });
            this.delayWatcherAll = new RouteDelayWatcher((requestID) => {
                this._onRequestTimeOut(requestID);
            });
            if (service_list) {
                for (let i: number = 0; i < service_list.length; i++) {
                    this._registerService(service_list[i]);
                }
            }
        }

        connect() {
            if (this.state === game.EConnectState.tryconnect || this.state === game.EConnectState.connecting || this.state === game.EConnectState.usable) {
                return;
            }
            this._logInfo(`开始建立连接, url: ${this.url}, tail: ${this.tail}`);

            if (!this.ws) {
                this.ws = new Laya.Socket();
                this.ws.endian = Laya.Byte.LITTLE_ENDIAN;
                this.ws.on(Laya.Event.OPEN, this, this._onOpen);
                this.ws.on(Laya.Event.MESSAGE, this, this._onMessage);
                this.ws.on(Laya.Event.CLOSE, this, this._onClose);
                this.ws.on(Laya.Event.ERROR, this, this._onError);
            }
            this.state = game.EConnectState.tryconnect;
            this.connected = true;
            this.delayWatcher.clear();
            this.delayWatcherAll.clear();
            this.waitingRequests = {};
            this.waitingRpcCount = 0;
            this._version++;
            const version = this._version;
            this.ws.connectByUrl(`${((this.ssl || GameMgr.inHttps) ? 'wss://' : 'ws://')}${this.url}/${this.tail}`);
            Laya.timer.once(10 * 1000, this, () => {
                if (version !== this._version) return;
                this.close();
                this.bannedTimestamp = Math.max(this.bannedTimestamp, Laya.timer.currTimer / 1000 + 5 * 60);
            });
        }

        close() {
            if (this.state === game.EConnectState.tryconnect || this.state === game.EConnectState.connecting || this.state === game.EConnectState.usable) {
                this._logInfo(`执行主动关闭, url: ${this.url}, tail: ${this.tail}`);
                this.state = game.EConnectState.closing;
                this.delayWatcher.clear();
                this.delayWatcherAll.clear();
                this.waitingRequests = {};
                this.waitingRpcCount = 0;
                if (this.ws) {
                    this.ws.close();
                    this._version++;
                    const version = this._version;
                    Laya.timer.once(5000, this, () => {
                        if (version !== this._version) return;
                        this._onClose('Close and Timeout');
                    });
                }
            }
        }

        dispose() {
            if (this.ws) {
                this.ws.cleanSocket();
            }
        }

        private _registerService(service: string) {
            const Service = ProtobufManager.lookupService(`lq.${service}`);
            if (!Service)
                throw new Error(`ERR_SERVICE_NOT_FOUND, name=${service}`);

            const serv = Service.create((method, requestData, callback) => {
                // console.log(`method=${method.fullName}, request=${JSON.stringify(requestData)}`);
                this._sendRpc(service, method.fullName, requestData, callback);
            });

            this.services_[service] = serv;
        }

        private _sendRpc(service: string, method: string, request: any, cb) {
            this.requestIndex_ = (this.requestIndex_ + 1) % 60007;
            const requestID = this.requestIndex_;
            const header = MessageWrapper.encodeHeaderData({ type: HeaderType.REQUEST, reqIndex: requestID });
            const packet = MessageWrapper.encodeRpc(method, request);

            this.delayWatcherAll.addNewWaiting(requestID);
            this.waitingRequests[requestID] = { serviceName: service, methodName: method, callback: cb };
            if (method !== '.lq.Route.heartbeat') {
                // this._logInfo('socket _sendRpc: ' + method);
                this.waitingRpcCount++;
            } else { 
                this.delayWatcher.addNewWaiting(requestID);
            }
            const by: Laya.Byte = new Laya.Byte();
            by.writeArrayBuffer(header);
            by.writeArrayBuffer(packet);
            this.ws.send(by.buffer);
        }

        public sendRequest(service_name: string, rpc_name: string, data: any, func_response: (error, res) => void) {
            if (rpc_name !== 'heartbeat') {
                this._logInfo(`发送业务请求, Service Name: ${service_name}, Method Name: ${rpc_name}, request: ${JSON.stringify(data)}`);
            }

            if (this.state !== game.EConnectState.connecting && this.state !== game.EConnectState.usable) {
                func_response('no open', null);
                return;
            }

            const _service = this.services_[service_name];
            if (!_service) {
                throw new Error(`ERR_SERVICE_NOT_FOUND, name=FastTest`);
            }
            _service[rpc_name](data, func_response);
        }

        private _onOpen() {
            this._logInfo(`连接建立成功 OnOpen, url: ${this.url}, tail: ${this.tail}`);
            this._version++;
            this.session_id = game.Tools.generateUUID();
            this.state = game.EConnectState.connecting;
            this.openStartTime = Laya.timer.currTimer / 1000;
            this.locked = false;
            this.duringDetect = false;
            this.eventHandler.event('OnOpen', { route: this, routeID: this.routeID });
            Laya.timer.clearAll(this);
            Laya.timer.loop(500, this, this._loop);
            Laya.timer.once(200, this, () => {
                this._checkConnectAvalible();
            });
        }

        private _onUseable() {
            if (this.state !== game.EConnectState.connecting) return;
            this._logInfo(`服务器接受连接 OnUseable, url: ${this.url}, tail: ${this.tail}`);
            this.state = game.EConnectState.usable;
            this.eventHandler.event('OnUseable', { route: this, routeID: this.routeID });
        }

        private _onClose(msg: any) {
            if (this.state === game.EConnectState.disconnect) return;
            msg = msg || {};
            this._logInfo(`链接被关闭 OnClose, url: ${this.url}, tail: ${this.tail}, msg: ${JSON.stringify(msg)}`);
            this._version++;
            this.state = game.EConnectState.disconnect;
            this.eventHandler.event('OnClose', { route: this, routeID: this.routeID, msg: msg });
            Laya.timer.clearAll(this);
            this.delayWatcher.clear();
            this.waitingRequests = {};
            this.waitingRpcCount = 0;
            this.locked = false;
            this.duringDetect = false;
            this.routeType = RouteType.None;
        }

        private _onError(msg: any) {
            if (this.state === game.EConnectState.disconnect) return;
            msg = msg || {};
            this._logInfo(`链接产生错误 OnError, url: ${this.url}, tail: ${this.tail}, msg: ${JSON.stringify(msg)}`);
            this.state = game.EConnectState.disconnect;
            this.eventHandler.event('OnError', { route: this, routeID: this.routeID, msg: msg });
            this.eventHandler.event('OnClose', { route: this, routeID: this.routeID, msg: msg });
            Laya.timer.clearAll(this);
            this.delayWatcher.clear();
            this.waitingRequests = {};
            this.waitingRpcCount = 0;
            this.locked = false;
            this.duringDetect = false;
            this.routeType = RouteType.None;
        }

        private _onMessage(msg: any) {
            if (this.state !== game.EConnectState.connecting && this.state !== game.EConnectState.usable) return;
            this._onReceiveMsg(msg);
        }

        private _onReceiveMsg(data: any = null): void {
            // console.log(`接收到数据触发函数`);

            if (!data || data.length === 0) {
                app.Log.Error(`!data || data.length === 0`);
                app.Log.info_net('error receive msg: !data || data.length === 0');
                return;
            }

            // app.Log.info_net('receive msg data.length:' + data.length);
            this.messages_.push(new Uint8Array(data));
            this._checkMessage();
        }

        //收到消息后，拆包循环
        private _checkMessage() {
            if (this.workingMessage_)
                return;

            if (this.messages_.length === 0)
                return;

            this.workingMessage_ = this.messages_.shift();

            this._handleMsg(this.workingMessage_);
            this.workingMessage_ = null;

            return this._checkMessage();
        }

        private _handleMsg(data: Uint8Array) {
            const header: HeaderData = {
                type: data[0]
            };
            // console.log(`handleMsg: type=${header.type}, data=${data}`);
            // handle header
            switch (header.type) {
                case HeaderType.REQUEST:
                case HeaderType.RESPONSE: {
                    if (data.length < 3) {
                        throw new Error(`ERR_INVALID_MESSAGE_LENGTH`);
                    }
                    header.reqIndex = data[1] + (data[2] << 8);
                    data = data.slice(3);
                    break;
                }
                case HeaderType.NOTIFY:
                    data = data.slice(1);
                    break;
                default:
                    console.error('net', `unknown headerType: ${header.type}`);
                    return;
            }
            // app.Log.info_net('socket _handleMsg0 header.type:' + header.type + ', data.length:' + data.length);
            // handle data
            switch (header.type) {
                case HeaderType.REQUEST: {
                    throw new Error(`ERR_CLIENT_UNABLE_TO_HANDLE_REQUEST`);
                }
                case HeaderType.RESPONSE: {
                    const requestID = header.reqIndex;
                    const request = this.waitingRequests[requestID];
                    if (!request) {
                        this._logError(`收到不存在的requestID: ${requestID}, routeID:${this.routeID}`);
                        return;
                    }
                    delete this.waitingRequests[requestID];
                    if (request.methodName !== '.lq.Route.heartbeat') {
                        this.waitingRpcCount--;
                    }
                    this.delayWatcher.receiveResponse(requestID);
                    const wrapper = MessageWrapper.decodeRpc(data);
                    const _msg = wrapper.data;

                    if (request.methodName !== '.lq.Route.heartbeat') {
                        this._logInfo(`接收到业务请求返回, Service Name: ${request.serviceName}, Method Name: ${request.methodName}, Msg: ${JSON.stringify(_msg)}`);
                    }
                    try {
                        request.callback(null, _msg);
                    } catch (err) {
                        this._logError(`处理回调时出错: ${JSON.stringify(err)}`);
                    }
                    break;
                }
                case HeaderType.NOTIFY: {
                    const message = MessageWrapper.decodeMessage(data);
                    let msgName: string = message.$type.fullName;
                    this._logInfo(`收到服务器通知, name: ${msgName}, msg: ${JSON.stringify(message)}`);
                    if (msgName === 'NotifyConnectionShutdown') {
                        this.close();
                    } else {
                        this.eventHandler.event('OnNotify', { route: this, routeID: this.routeID, name: msgName, data: message });
                    }
                    return;
                }
                default:
                    console.error('net', `unknown headerType: ${header.type}`);
                    return;
            }
        }

        // 发送心跳包，历史原因，心跳包是用rpc的方式发送的
        private _ping() {
            this.lastPingTime = Laya.timer.currTimer / 1000;
            let request: any = {};
            request.delay = Math.max(0, Math.min(Math.floor(this.getDelay() * 1000), 5000));
            request.platform = this.clientPlatformID;
            request.network_quality = Math.max(0, Math.min(Math.floor(this.getQualityGrade() * 1000), 5000));
            request.no_operation_counter = 0;
            this.sendRequest('Route', 'heartbeat', request, () => { });
        }

        // 在Open后，检查服务器是否接受连接
        private _checkConnectAvalible() {
            this._logInfo('_CheckConnectAvalible start');
            if (this.routeType === RouteType.None) {
                this._logError('未指定线路类型，线路关闭');
                this.close();
                return;
            }
            const serviceName = 'Route';
            const methodName = 'requestConnection';
            const request: any = {};
            request.type = this.routeType;
            request.route_id = this.routeID;
            request.timestamp = Date.now();
            this.sendRequest(serviceName, methodName, request, (err, res) => {
                let success = false;
                if (err) {
                    this._logError(`_CheckConnectAvalible, 连接失败1, err: ${JSON.stringify(err)}`);
                    success = false;
                } else if (res) {
                    if (res.error && res.error.code !== 0) {
                        this._logError(`_CheckConnectAvalible, 连接失败2, error: ${JSON.stringify(res.error)}`);
                        success = false;
                    } else {
                        if (res.result === 1) {
                            this._logInfo('_CheckConnectAvalible, 连接成功');
                            success = true;
                        } else {
                            this._logError(`_CheckConnectAvalible, 连接失败3, result: ${res.result}`);
                            success = false;
                            // GatewayFetcher.CheckFetch();
                            this.busyState = 'rejected';
                        }
                    }
                }
                if (success) {
                    this._onUseable();
                } else {
                    this.close();
                }
            });
        }

        private _loop() {
            if (this.state !== game.EConnectState.connecting && this.state !== game.EConnectState.usable) {
                return;
            }
            const nowTime = Laya.timer.currTimer / 1000;
            if (!this.duringDetect) {
                var pingCD = 15
                if (Math.abs(this.delayWatcherAll.getQualityGrade() - this.delayWatcher.getQualityGrade()) > 0.1) { 
                    pingCD = 5
                }
            
                if (nowTime - this.lastPingTime >= pingCD) {
                    this._ping();
                }
            }
            if (this.routeType === RouteType.Standby) {
                if (!this.locked && nowTime - this.openStartTime >= 20 * 60) {
                    this.close();
                }
            } else if (this.routeType === RouteType.Detect) {
                if (!this.locked && nowTime - this.openStartTime >= 40) {
                    this.close();
                }
            } else if (this.routeType === RouteType.None) {
                if (nowTime - this.openStartTime >= 20) {
                    this.close();
                }
            }
        }

        private _onRequestTimeOut(requestID: number) {
            const data = this.waitingRequests[requestID];
            if (data) {
                if (data.methodName !== '.lq.Route.heartbeat') {
                    this.waitingRpcCount--;
                    this._logError(`收到超时消息, routeID: ${this.routeID}, requestID:${requestID}，服务名：${data.serviceName}, methodName: ${data.methodName}`);
                }
                delete this.waitingRequests[requestID];
                if (data.callback) {
                    data.callback('TIMEOUT', null);
                }
            }
        }

        busyStateCanUse() {
            return this.busyState === 'idle' || this.busyState === 'normal';
        }

        // 获取当前的延迟时间，单位为秒
        getDelay() {
            if (this.state !== game.EConnectState.connecting && this.state !== game.EConnectState.usable) {
                return DELAY_INF;
            }
            return this.delayWatcher.getDelay();
        }

        // 获取当前的线路质量等级
        getQualityGrade() {
            if (this.state !== game.EConnectState.connecting && this.state !== game.EConnectState.usable) {
                return DELAY_INF;
            }
            this.lastDetectQuilty = this.delayWatcher.getQualityGrade();
            return this.lastDetectQuilty;
        }

        getConnectState() {
            return this.state;
        }

        addListener(eventName: string, caller: any, func: (data: any) => void) {
            this.eventHandler.on(eventName, caller, func);
        }

        removeListener(eventName: string, caller: any, func: (data: any) => void) {
            this.eventHandler.off(eventName, caller, func);
        }

        // 清理所有事件监听
        clearListeners() {
            this.eventHandler.offAll();
        }

        // 30s内不需要再次检测，信任度较高，直接信任this.lastDetectQuilty
        needDetect() {
            return Laya.timer.currTimer / 1000 > this.detectEndTime + 30;
        }

        // 检测网络状况，连续ping几次，确保目前线路数据比较及时
        detect() {
            if (this.duringDetect || !this.needDetect()) {
                return;
            }
            this._logInfo('高频探测开始');
            this.duringDetect = true;
            this.detectStartTime = Laya.timer.currTimer / 1000;
            this.lastDetectQuilty = DELAY_INF;
            let pingCount = 2;
            const nowTime = Laya.timer.currTimer / 1000;
            if (nowTime - this.detectEndTime < 120) {
                pingCount = 2 + Math.floor((nowTime - this.detectEndTime - 30) / 90 * 3);
            } else {
                pingCount = 5;
            }
            for (let i = 1; i <= pingCount; i++) {
                Laya.timer.once((0.5 * (i - 1) + 0.2) * 1000, this, () => {
                    this._ping();
                });
            }
            Laya.timer.once((0.5 * (pingCount + 1)) * 1000, this, () => {
                this._logInfo('高频探测结束');
                this.detectEndTime = Laya.timer.currTimer / 1000;
                this.duringDetect = false;
                this.lastDetectQuilty = this.getQualityGrade();
                this.eventHandler.event('OnDetectEnd', { route: this, quality: this.lastDetectQuilty });
            });
        }

        private _logInfo(msg: string) {
            app.Log.info_net_t(`NetRoute: ${this.routeID}`, msg);
        }

        private _logError(msg: string) {
            app.Log.error_net_t(`NetRoute: ${this.routeID}`, msg);
        }
    }
}