import { ObserverAll } from "../../mvc/provider/ObserverAll";

const MinSec = 60;
const HourSec = MinSec * 60;
const DaySec = HourSec * 24;
const WeekSec = DaySec * 7;
const MonthSec = WeekSec * 30;
const YearSec = MonthSec * 12;

export class TimeUtil extends ObserverAll implements ITimeUtil {
	private _date = new Date();
	private _serverDelta: number = 0;

	get milliSecond() {
		return Date.now() + this._serverDelta;
	}

	get second() {
		return Math.floor(this.milliSecond / 1000);
	}

	getTimeByString(timeStr: string) {
		const regStr = timeStr.replace(/-/g, '/');
		const result = new Date(regStr).getTime();
		if (result) return result;
		return new Date(regStr.replace('+', ' utc+')).getTime();
	}

	timeFormat1(timestamp: number) {
		this._date.setTime(timestamp);
		return this._date.toLocaleString();
	}

	timeFormat2(second: number) {
		const hours = Math.floor(second / HourSec);
		const mins = Math.floor((second - hours * HourSec) / MinSec);
		const secs = second - hours * HourSec - mins * MinSec;
		return (hours ? `${ String(hours).padStart(2, "0") }:` : "")
			+ ((hours || mins) ? `${ String(mins).padStart(2, "0") }:` : "")
			+ `${ String(secs).padStart(2, "0") }`;
	}

	timeFormat3(second: number) {
		const hours = Math.floor(second / HourSec);
		const mins = Math.floor((second - hours * HourSec) / MinSec);
		const secs = second - hours * HourSec - mins * MinSec;
		return (hours ? `${ hours }小时` : "") + ((hours || mins) ? `${ mins }分` : "") + `${ secs }秒`;
	}

	timeFormat4(second: number) {
		const day = Math.floor(second / DaySec);
		if (day > 0) return `${ day }天`;
		const hours = Math.floor(second / HourSec);
		if (hours > 0) return `${ hours }小时`;
		const mins = Math.floor(second / MinSec);
		if (mins > 0) return `${ mins }分`;
		return `${ second }秒`;
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