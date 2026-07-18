const MinSec = 60;
const HourSec = MinSec * 60;
const DaySec = HourSec * 24;
const WeekSec = DaySec * 7;
const MonthSec = WeekSec * 30;
const YearSec = MonthSec * 12;

@Singleton
export class TimeUtil implements ITimeUtil {
	private _date = new Date();
	private _serverDelta: number = 0;

	readonly MinSec = MinSec;
	readonly HourSec = HourSec;
	readonly DaySec = DaySec;
	readonly WeekSec = WeekSec;
	readonly MonthSec = MonthSec;
	readonly YearSec = YearSec;

	get milliSecond() { return Date.now() + this._serverDelta; }
	get second() { return Math.floor(this.milliSecond / 1000); }
	get year() { return this._date.setTime(this.milliSecond), this._date.getFullYear(); }
	get month() { return this._date.setTime(this.milliSecond), this._date.getMonth() + 1; }
	get date() { return this._date.setTime(this.milliSecond), this._date.getDate(); }
	get day() { return this._date.setTime(this.milliSecond), this._date.getDay(); }

	setServerTime(time: number) {
		this._serverDelta = time - Date.now();
	}

	getTimeByString(timeStr: string) {
		const regStr = timeStr.replace(/-/g, '/');
		const result = new Date(regStr).getTime();
		if (result) return result;
		return new Date(regStr.replace('+', ' utc+')).getTime();
	}

	dateFormat1(timestamp: number, split?: string) {
		this._date.setTime(timestamp);
		const str = this._date.toLocaleDateString();
		return str.split("/").map(v => v.padStart(2, "0")).join(split || "/");
	}

	dateFormat2(timestamp: number, split?: string) {
		this._date.setTime(timestamp);
		const str = this._date.toLocaleTimeString();
		if (!split || split == ":")
			return str;
		return str.replaceAll(":", split);
	}

	timeFormat1(timestamp: number) {
		this._date.setTime(timestamp);
		return this._date.toLocaleString();
	}

	timeFormat2(second: number) {
		const h = Math.floor(second / HourSec);
		const m = Math.floor(second % HourSec / MinSec);
		const s = second % MinSec;

		let str = "";
		if (h) str += `${ h.toString().padStart(2, "0") }:`;
		if (h || m) str += `${ m.toString().padStart(2, "0") }:`;
		if (s) str += `${ s.toString().padStart(2, "0") }`;
		return str;
	}

	timeFormat3(second: number) {
		const h = Math.floor(second / HourSec);
		const m = Math.floor(second % HourSec / MinSec);
		const s = second % MinSec;

		let str = "";
		if (h) str += h + $lang(2021);
		if (h || m) str += m + $lang(2020);
		if (s) str += s + $lang(2019);
		return str;
	}

	timeFormat4(second: number) {
		if (second >= DaySec) return Math.floor(second / DaySec) + $lang(2022);
		if (second >= HourSec) return Math.floor(second / HourSec) + $lang(2021);
		if (second >= MinSec) return Math.floor(second / MinSec) + $lang(2020);
		return Math.floor(second) + $lang(2019);
	}

	timeFormat5(second: number) {
		const delta = this.second - second; // 防止服务器时间差导致负数

		// 10分钟以内：刚刚
		if (delta < 10 * MinSec) {
			return $lang(2013);
		}

		// 1小时以内：10, 20...50分钟前
		if (delta < HourSec) {
			const tensOfMinutes = Math.floor(delta / (10 * MinSec));
			return `${ tensOfMinutes }0${ $lang(2014) }`;
		}

		// 24小时以内：X小时前
		if (delta < DaySec) {
			return Math.floor(delta / HourSec) + $lang(2015);
		}

		// 7天以内：X天前
		if (delta < WeekSec) {
			return Math.floor(delta / DaySec) + $lang(2016);
		}

		// 4周以内：X周前
		if (delta < MonthSec) {
			return Math.floor(delta / WeekSec) + $lang(2017);
		}

		// 超过4周：x个月前
		return Math.floor(delta / MonthSec) + $lang(2018);
	}

	wait(milSec: number) {
		return new Promise<void>(resolve => {
			Laya.timer.once(milSec, null, resolve);
		});
	}
}
