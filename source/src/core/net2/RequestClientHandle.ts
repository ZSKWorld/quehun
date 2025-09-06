

module net {

  export class WaitingEvent {
    method: string;
    index: number;
    requestTime: number;
    cb: (err: Error, res?: any) => void;
  }


  /**
   * 作为客户端请求事件处理
   */
  export class RequestClientHandle {

    private waitingData: Object;
    private checkArray: { timeout: number, index: number }[];
    private delayLst: { delay: number, timestamp: number }[];
    private _delay:number = 0;

    // 回包运行出错处理
    private _responseErrorHandler:Laya.Handler;
    // 网络延迟计算
    private _networkDelayHandler:Laya.Handler;

    constructor(responseErrorHandler:Laya.Handler, networkDelayHandler:Laya.Handler) {
      this.waitingData = {};
      this.checkArray = [];
      this.delayLst = [];
      this._responseErrorHandler = responseErrorHandler;
      this._networkDelayHandler = networkDelayHandler;
      Laya.timer.loop(500, this, this.loop);
    }

    emitResponse(index: number, res: any) {
      const waitingEvent: WaitingEvent = this.waitingData[index];
      // app.Log.info_net('emitResponse index:' + index + ', waitingEvent:' + (waitingEvent == null));
      if (!waitingEvent)
        return;

      const now = Date.now();
      this.delayLst.push({
        timestamp: now,
        delay: now - waitingEvent.requestTime
      });
      this.waitingData[index] = null;

      // console.log(`emitResponse, index=${index}`);
      if (GameMgr.inRelease) {
        try {
          waitingEvent.cb(null, res);
        } catch (err) {
          app.Log.Error('net request handle error:' + err);
          if (this._responseErrorHandler) this._responseErrorHandler.runWith({method: waitingEvent.method, info: err});
        }
      } else {
        waitingEvent.cb(null, res);
      }
    }

    waitResponseCb(method:string, index: number, cb: (err: Error, res: any) => void): void {
      const data = {
        method: method,
        index: index,
        requestTime: Date.now(),
        cb: cb
      };

      this.waitingData[index] = data;

      this.checkArray.push({
        timeout: data.requestTime + 15000,
        index: data.index
      });

      // console.log(`requestTime=${data.requestTime}, timeout=${data.requestTime + 10000}`);
    }

    private loop() {
      let delay0 = this.calcu_preresponse_delay();
      let delay1 = this.check_waiting_response();
      let _delay = 0;
      let _count = 0;
      //两秒内的回包的延迟参考和等待回包的延迟参考的加权平均
      if (delay0 >= 0) {
        _delay += delay0 * 0.3;
        _count += 0.3;
      }
      if (delay1 >= 0) {
        _delay += delay1;
        _count += 1;
      }
      if (_count > 0) {
        _delay /= _count;
        this._delay = _delay;
      }
      if (this._networkDelayHandler) this._networkDelayHandler.runWith(this._delay);
    }

    //计算近两秒内所有通信的平均延迟
    private calcu_preresponse_delay():number {
      const now = Date.now();
      let delay_total = 0;
      let count = 0;
      let invalid_count = 0;

      for (let i = 0; i < this.delayLst.length; i++) {
        if (this.delayLst[i].timestamp + 2000 < now) {
          invalid_count++;
        } else {
          delay_total += this.delayLst[i].delay;
          count++;
        }
      }

      if (invalid_count > 0) {
        if (invalid_count == this.delayLst.length) {
          this.delayLst = [];
        } else {
          this.delayLst.slice(invalid_count);
        }
      }

      return count > 0 ? delay_total / count : -1;
    }

    //计算等待中的回包的延迟和超时
    private check_waiting_response():number {
      const now = Date.now();
      let count = 0;
      let waiting_time = -1;
      for (let i = 0; i < this.checkArray.length; i++) {
        const data = this.checkArray[i];

        if (!this.waitingData[data.index]) {
          count += 1;
          continue;
        }

        if (now < data.timeout) {
          if (waiting_time < 0) {
            waiting_time = now - this.waitingData[data.index].requestTime;
          }
          break;
        }

        count += 1;
        // console.log(`now=${now}, data.timeout=${data.timeout}`);

        {
          const waitingEvent: WaitingEvent = this.waitingData[data.index];
          this.waitingData[data.index] = null;
          waiting_time = 5000;
          this.delayLst.push({
            delay: 10000,
            timestamp: now
          });
  
          waitingEvent.cb(new Error(`TIMEOUT`));
        }
      }

      if (count > 0) {
        if (count == this.checkArray.length) {
          this.checkArray = [];
        } else {
          this.checkArray = this.checkArray.slice(count);
        }
      }
      return waiting_time;
    }

    public onClose() {
      this.waitingData = {};
      this.checkArray = [];
      this.delayLst = [];
    }
  }
}