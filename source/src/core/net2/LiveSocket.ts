
module net {
    // 纯观战socket
    export class LiveSocket {
        public routeID: string;
        public url:string;

        private socket_: Laya.Socket;

        private messages_: any[];
        private workingMessage_: any;

        private requestIndex_: number; // request index
        private requestClientHandle_: RequestClientHandle;

        private handler_: Laya.Handler; // notify处理
        private services_: any;

        private when_socket_event: Laya.Handler;
        private code_error_handler: Laya.Handler; //当客户端trycatch出错的时候的处理
        private network_delay: number = 0; //粗略的网络延时
        
		private _sendRetryCount: number = 3; //  发送协议超过3次失败则无事发生


        constructor(code_error_handler: Laya.Handler) {
            this.socket_ = new Laya.Socket();
            this.socket_.endian = Laya.Byte.LITTLE_ENDIAN;
            this.messages_ = [];
            this.workingMessage_ = null;
            this.requestIndex_ = 0;
            this.requestClientHandle_ = new RequestClientHandle(code_error_handler, new Laya.Handler(this, delay => {
                this.network_delay = delay;
            }));

            this.handler_ = null;

            //注册回调
            this.socket_.on(Laya.Event.OPEN, this, this._onOpen);
            this.socket_.on(Laya.Event.MESSAGE, this, this._onReceiveMsg);
            this.socket_.on(Laya.Event.CLOSE, this, this._onClose);
            this.socket_.on(Laya.Event.ERROR, this, this._onError);

        }

        public connect(routeID:string, url: string) {
            this.routeID = routeID;
            this.url = (GameMgr.inHttps ? 'wss://' : 'ws://') + url;
            this.socket_.connectByUrl(this.url);
        }

        get connected(): boolean {
            return this.socket_.connected;
        }

        private _onOpen(event: any = null): void {
            app.Log_OB.log('obsocket open success');
            if (this.when_socket_event) this.when_socket_event.runWith(Laya.Event.OPEN);
        }

        private _onReceiveMsg(data: any = null): void {
            // console.log(`接收到数据触发函数`);

            if (!data || data.length === 0) {
                // app.Log_OB.Error(`!data || data.length === 0`);
                // app.Log_OB.info_net('error receive msg: !data || data.length === 0');
                return;
            }

            // app.Log_OB.info_net('receive msg data.length:' + data.length);
            this.messages_.push(data);
            this._checkMessage();
        }

        private _onClose(e: any = null): void {
            app.Log_OB.log(`socket关闭 e:` + e);
            // console.log(e);
            if (this.when_socket_event) this.when_socket_event.runWith(Laya.Event.CLOSE);
        }
        private _onError(e: any = null): void {
            app.Log_OB.log('socket错误 e:' + e);
            // console.log(e);
            if (this.when_socket_event) this.when_socket_event.runWith(Laya.Event.ERROR);
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

        private _handleMsg(data: any) {
            let type = 0;
            if (typeof data == 'string') {
                if (data.indexOf('<=') == 0) {
                    type = HeaderType.REQUEST;
                } else {
                    type = HeaderType.RESPONSE;
                }
                let list = [];
                for (let i = 0; i< 2; i++) {
                    let index = data.indexOf(' ');
                    if (index != -1) {
                        list.push(data.substring(0, index));
                        data = data.substring(index+ 1);
                    } else {
                        break;
                    }
                }
                list.push(data);
                data = list;
            } else {
                type = HeaderType.NOTIFY;
            }
            const header: HeaderData = {
                type: type
            };

            // console.log(`handleMsg: type=${header.type}, data=${data}`);

            // handle header
            switch (type) {

                case HeaderType.REQUEST:
                case HeaderType.RESPONSE: {

                    if (data.length < 3) {
                        throw new Error(`ERR_INVALID_MESSAGE_LENGTH`);
                    }
                    header.reqIndex = data[1];
                    data = JSON.parse(data[2]);
                    break;
                }

                case HeaderType.NOTIFY:
                    break;

                default:
                    console.error('net', `unknown headerType: ${header.type}`);
                    return;
            }

            // app.Log_OB.info_net('socket _handleMsg0 header.type:' + header.type + ', data.length:' + data.length);

            // handle data
            switch (header.type) {

                case HeaderType.REQUEST: {
                    throw new Error(`ERR_CLIENT_UNABLE_TO_HANDLE_REQUEST`);
                }

                case HeaderType.RESPONSE: {
                    // console.log('net', `handle RESPONSE: index=${header.reqIndex}`);
                    return this.requestClientHandle_.emitResponse(header.reqIndex, data);
                }

                case HeaderType.NOTIFY: {
                    let msg = new Uint8Array(data);
                    let final = {};
                    final['seq'] = msg[0] + (msg[1] << 8);
                    final['offsetTime'] = msg[2] + (msg[3] << 8) + (msg[4] << 16) + (msg[5] << 24);
                    final['end'] = msg[6] + (msg[7] << 8);
                    final['category'] = msg[8] + (msg[9] << 8);
                    final['length'] = msg[10] + (msg[11] << 8) + (msg[12] << 16) + (msg[13] << 24);
                    
                    msg = msg.slice(14);
                    const message = MessageWrapper.decodeMessage(msg);
                    final['data'] = message;
                    final['name'] = message.$type.name;
                    if (this.handler_) {
                        try {
                            this.handler_.runWith(final);
                        } catch (err) {
                            app.Log_OB.Error('message ' + message.$type.fullName + ' handle error info:' + err);
                            if (this.code_error_handler) this.code_error_handler.runWith({ method: message.$type.fullName, info: err });
                        }
                    }
                    
                    return;
                }

                default:
                    console.error('net', `unknown headerType: ${header.type}`);
                    return;
            }
        }

        private _sendRpc(method: string, message: any, retryCount: number = 0) {
            if (!this.socket_)
                throw new Error('ERR_SOCKET_NOT_CONNECT');

            let str = '<= ' + method + ' ' + message;

            if (this.socket_.readystate == 1) {
                try {
                    this.socket_.send(str);
                } catch (e) {
                   app.Log.Error('chat socket _sendRpc Error:' + e); 
                }
                app.Log.log('chat socket _sendRpc' + str);
            } else if (retryCount < this._sendRetryCount) { 
                Laya.timer.once(100, this, function () {
                    this._sendRpc(method, message, retryCount + 1);
                });
            }
        }


        public sendRequest(method: string, request: any, cb: (error, res) => void) {
            this.requestIndex_ = (this.requestIndex_ + 1) % 60007;
            app.Log_OB.info_net('_requestMessage method:' + method + ', index:' + this.requestIndex_);

            this._sendRpc(method, this.requestIndex_ + ' ' + JSON.stringify(request));
            this.requestClientHandle_.waitResponseCb(method, this.requestIndex_, cb);
        }

    

        public addSocketLister(cb: Laya.Handler) {
            this.when_socket_event = cb;
        }

        public close() {
            app.Log_OB.info('socket close');
            if (this.socket_) this.socket_.close();
            if (this.requestClientHandle_) this.requestClientHandle_.onClose();
        }

        //网络延时
        public getNetworkDelay(): number {
            return this.network_delay;
        }

        public setNotifyHandler(handler:Laya.Handler) {
            this.handler_ = handler;
        }
    }
}