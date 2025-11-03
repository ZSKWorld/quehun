import { ObserverAll } from "../../mvc/provider/ObserverAll";

export class TimeUtil extends ObserverAll implements ITimeUtil {
	private _date = new Date();
	private _serverDelta: number = 0;

	readonly MinSec = 60;
	readonly HourSec = this.MinSec * 60;
	readonly DaySec = this.HourSec * 24;
	readonly WeekSec = this.DaySec * 7;
	readonly MonthSec = this.WeekSec * 30;
	readonly YearSec = this.MonthSec * 12;

	get milliSecond() {
		return Date.now() + this._serverDelta;
	}

	get second() {
		return Math.floor(this.milliSecond / 1000);
	}

	milliSecond2YMDHMS(milliSecond: number) {
		this._date.setTime(milliSecond);
		return this._date.toLocaleString();
	}

	timeFormat(second: number, keepHour: boolean = true) {
		const hours = Math.floor(second / 3600);
		const mins = Math.floor((second - hours * 3600) / 60);
		const secs = second - hours * 3600 - mins * 60;
		const hoursStr = hours > 9 ? hours : "0" + hours;
		const minsStr = mins > 9 ? mins : "0" + mins;
		const secsStr = secs > 9 ? secs : "0" + secs;
		if (keepHour || hours > 0)
			return hoursStr + ":" + minsStr + ":" + secsStr;
		else if (mins > 0)
			return minsStr + ":" + secsStr;
		else
			return "00:" + secsStr;
	}

	timeFormatChinese(second: number) {
		const hours = Math.floor(second / 3600);
		const mins = Math.floor((second - hours * 3600) / 60);
		const secs = second - hours * 3600 - mins * 60;
		return (hours ? `${ hours }小时` : "") + ((hours || mins) ? `${ mins }分钟` : "") + `${ secs }秒`;
	}

	wait(milSec: number) {
		return new Promise<void>(resolve => {
			Laya.timer.once(milSec, null, resolve);
		});
	}

	@InterestMessage(EMessageID.fetchServerTime)
	private onFetchServerTime(res: IResServerTime) {
		this._serverDelta = res.server_time * 1000 - Date.now();
	}
}