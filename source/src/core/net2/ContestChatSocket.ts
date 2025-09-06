
module net {
    // 大会室聊天socket
    export class ContestChatSocket {
        public routeID: string;
        public url: string;

        private socket_: Laya.Socket;
        private messages_: any[];
        private workingMessage_: any;

        private requestIndex_: number; // request index
        private requestClientHandle_: RequestClientHandle;

        private handler_: any; // notify处理
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

            this.handler_ = {};

            //注册回调
            this.socket_.on(Laya.Event.OPEN, this, this._onOpen);
            this.socket_.on(Laya.Event.MESSAGE, this, this._onReceiveMsg);
            this.socket_.on(Laya.Event.CLOSE, this, this._onClose);
            this.socket_.on(Laya.Event.ERROR, this, this._onError);
        }

        public connect(routeID: string, url: string) {
            this.routeID = routeID;
            this.url = (GameMgr.inHttps ? 'wss://' : 'ws://') + url;
            this.socket_.connectByUrl(this.url);
        }

        get connected(): boolean {
            return this.socket_.connected;
        }

        private _onOpen(event: any = null): void {
            app.Log.log('chat socket open success');
            if (this.when_socket_event) this.when_socket_event.runWith(Laya.Event.OPEN);
            Laya.timer.clearAll(this);
            Laya.timer.loop(20000, this, () => {
                this.sendHeartBeat();
            })
        }

        private _onReceiveMsg(data: any = null): void {
            // console.log(`接收到数据触发函数`);

            if (!data || data.length === 0) {
                app.Log.Error('chat error receive msg: !data || data.length === 0');
                return;
            }

            // app.Log.log('chat receive msg data.length:' + data.length);
            this.messages_.push(data);
            this._checkMessage();
        }

        private _onClose(e: any = null): void {
            app.Log.log(`chat socket关闭 e:` + e);
            if (this.when_socket_event) this.when_socket_event.runWith(Laya.Event.CLOSE);
            Laya.timer.clearAll(this);
        }
        private _onError(e: any = null): void {
            app.Log.log('chat socket错误 e:' + e);
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
                for (let i = 0; i < 2; i++) {
                    let index = data.indexOf(' ');
                    if (index != -1) {
                        list.push(data.substring(0, index));
                        data = data.substring(index + 1);
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

            app.Log.info_net('chat socket _handleMsg0 header.type:' + header.type + ', data.length:' + data.length);

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

                    // const message = MessageWrapper.decodeMessage(data);
                    // const handler = this.handler_[message.$type.fullName];
                    // // console.log('socket _handleMsg1 fullName:' + message.$type.fullName);
                    // if (!handler) {
                    //     app.Log.Error('消息:' + message.$type.fullName + '未被监听');
                    //     return;
                    // }
                    // for (let i: number = 0; i < handler.length; i++) {
                    //     try {
                    //         handler[i].runWith(message);
                    //     } catch (err) {
                    //         app.Log.Error('message ' + message.$type.fullName + ' handle error info:' + err);
                    //         if (this.code_error_handler) this.code_error_handler.runWith({ method: message.$type.fullName, info: err });
                    //     }
                    // }
                    const binary = new Uint8Array(data); // 二进制数据
                    const decoder = new TextDecoder(); // 创建一个TextDecoder实例
                    let str = decoder.decode(binary);

                    let strs = str.replace('=>', '').split(' ');
                    let serializedData = {};
                    if(!strs || strs.length < 3){
                        return app.Log.Error('ContestChatSocket NOTIFY Err message ======' + str);
                    }
                    let content: string = '';
                    for(let i = 3; i< strs.length; i++){
                        content += strs[i];
                    }
                    serializedData['content'] = JSON.parse(content);
                    serializedData['type'] = strs[1];
                    serializedData['id'] = strs[2];
                    //限流控制不展示
                    if (serializedData['content'].limit) {
                        return app.Log.Error('ContestChatSocket content limit ======' + serializedData['content'].limit);
                    }
                    let handler = this.handler_['chatupdate'];
                    if (handler) {
                        for (let i: number = 0; i < handler.length; i++) {
                            try {
                                handler[i].runWith(serializedData);
                            } catch (err) {
                                app.Log.Error('chat message  handle error info:');
                            }
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
            var len = str.length;
            var msg = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                msg[i] = str.charCodeAt(i);
            }
            if (this.socket_.readystate == 1) {
                try {
                    this.socket_.send(msg.buffer);
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


        public sendMessage(request: any, cb: (error, res) => void) {
            if (!this.socket_)
                throw new Error('ERR_SOCKET_NOT_CONNECT');
            // this.requestIndex_ = (this.requestIndex_ + 1) % 60007;
            let info = JSON.stringify(request);
            this._sendRpc('message', JSON.stringify(request));
            // this.requestClientHandle_.waitResponseCb(method, this.requestIndex_, cb);
        }

        public sendHeartBeat() {
            if (!this.socket_)
                throw new Error('ERR_SOCKET_NOT_CONNECT');
            let str = '<= heartbeat -';
            var len = str.length;
            var msg = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                msg[i] = str.charCodeAt(i);
            }
            // 心跳如果发不了就不发了
            if (this.socket_.readystate == 1) { 
                try {
                    this.socket_.send(msg.buffer);
                } catch (e) { 

                }
                
            }
            
        }


        public addSocketLister(cb: Laya.Handler) {
            this.when_socket_event = cb;
        }

        public close() {
            app.Log.info('chat socket close');
            if (this.socket_) this.socket_.close();
            if (this.requestClientHandle_) this.requestClientHandle_.onClose();
        }

        //网络延时
        public getNetworkDelay(): number {
            return this.network_delay;
        }

        public addMsgListener(name: string, cb: Laya.Handler) {
            if (!this.handler_[name]) this.handler_[name] = [];
            this.handler_[name].push(cb);
            //this.handler_[name] = cb;
        }

        public removeMsgListener(name: string, cb: Laya.Handler) {
            if (!this.handler_[name]) return;
            let lst = this.handler_[name];
            let new_lst = [];
            for (let i: number = 0; i < lst.length; i++) {
                if (lst[i] !== cb) {
                    new_lst.push(cb);
                }
            }
            this.handler_[name] = new_lst;
        }

        public sendSystemMsg(msg: any) {
            let handler = this.handler_['chatupdate'];
            if (handler) {
                for (let i: number = 0; i < handler.length; i++) {
                    try {
                        handler[i].runWith(msg);
                    } catch (err) {
                        app.Log.Error('chat sendSystemMsg message  handle error info:');
                    }
                }
            }
        }
    }
}