module net {
    export class RouteDelayWatcher {
        waitingRequests: { [requestID: number]: number } = {};
        waitingRequestArray: number[] = [];
        preResponseDelays: { delay: number; timestamp: number }[] = [];
        qualityAnalyzer: NetworkQualityAnalyzer = new NetworkQualityAnalyzer();
        nowTime: number = 0;
        delay: number = 0;
        quality: number = 0;
        funcRequestTimeOut: (requestID: number) => void;

        constructor(funcRequestTimeOut: (requestID: number) => void) {
            this.funcRequestTimeOut = funcRequestTimeOut;
            Laya.timer.loop(500, this, this._loop);
            var lastTime = Date.now() / 1000;
            Laya.timer.frameLoop(1, this, () => { 
                var nowTime = Date.now() / 1000;
                var delay = nowTime - lastTime;
                delay = Math.min(delay, 0.033);
                lastTime = nowTime;
                this.nowTime = this.nowTime + delay;
            });
        }

        public clear() {
            this.waitingRequests = {};
            this.waitingRequestArray = [];
            this.preResponseDelays = [];
            this.qualityAnalyzer.clear();
            this.delay = 0;
            this.quality = 0;
        }

        // 单位（秒）
        public getDelay() {
            return this.delay;
        }

        public getQualityGrade() {
            return this.quality;
        }

        public addNewWaiting(requestID: number) {
            this.waitingRequests[requestID] = this.nowTime;
            this.waitingRequestArray.push(requestID);
        }

        public receiveResponse(requestID: number) {
            const requestTime = this.waitingRequests[requestID];
            if (!requestTime) {
                return;
            }
            delete this.waitingRequests[requestID];
            const now = this.nowTime;
            this.preResponseDelays.push({
                delay: Math.max(now - requestTime, 0.01), // 保持最低显示10ms
                timestamp: now
            });
        }

        private _loop() {
            const nowTime = this.nowTime;
            let delay0 = this._calcuPreResponseDelay(nowTime);
            let delay1 = this._checkWaitingResponse(nowTime);
            let _delay = 0;
            let _count = 0;
            if (delay0 >= 0) {
                _delay += delay0 * 0.3;
                _count += 0.3;
            }
            if (delay1 >= 0) {
                if (this.delay < net.DELAY_INF) {
                    delay1 = Math.max(delay1, this.delay);
                }
                _delay += delay1;
                _count += 1;
            }
            if (_count > 0) {
                _delay = _delay / _count;
                this.delay = _delay;
                this.qualityAnalyzer.add_latency_sample(nowTime, _delay);
                this.quality = this.qualityAnalyzer.get_network_quality();
            } else if (this.delay > 0 && this.delay < net.DELAY_INF) {
                this.qualityAnalyzer.add_latency_sample(nowTime, this.delay);
                this.quality = this.qualityAnalyzer.get_network_quality();
            }
        }

        private _calcuPreResponseDelay(nowTime: number) {
            let delay_total = 0;
            let count = 0;
            let invalid_count = 0;
            for (let i = 0; i < this.preResponseDelays.length; i++) {
                const d = this.preResponseDelays[i];
                if (d.timestamp + 2 < nowTime) {
                    invalid_count++;
                } else {
                    delay_total += d.delay;
                    count++;
                }
            }
            if (invalid_count > 0) {
                this.preResponseDelays.splice(0, invalid_count);
            }
            if (count > 0) {
                return delay_total / count;
            } else {
                return -1;
            }
        }

        private _checkWaitingResponse(nowTime: number) {
            let waitingTime = -1;
            let indexCheckArray = 0;
            while (indexCheckArray < this.waitingRequestArray.length) {
                const requestID = this.waitingRequestArray[indexCheckArray];
                const requestTime = this.waitingRequests[requestID];
                if (!requestTime) {
                    this.waitingRequestArray.splice(indexCheckArray, 1);
                } else {
                    if (nowTime < requestTime + 10) {
                        return nowTime - requestTime;
                    } else {
                        delete this.waitingRequests[requestID];
                        waitingTime = 2;
                        this.preResponseDelays.push({
                            delay: 10,
                            timestamp: nowTime
                        });
                        this.funcRequestTimeOut(requestID);
                    }
                }
            }
            return waitingTime;
        }
    }
}