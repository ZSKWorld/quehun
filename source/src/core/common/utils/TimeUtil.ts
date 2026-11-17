const MinSec = 60;
const HourSec = MinSec * 60;
const DaySec = HourSec * 24;
const WeekSec = DaySec * 7;
const MonthSec = DaySec * 30;
const YearSec = MonthSec * 12;

@Singleton
export class TimeUtil implements ITimeUtil {
	private _date = new Date();
	private _passDaySec: number = 0;
	private _serverDelta: number = 0;

	readonly MinSec = MinSec;
	readonly HourSec = HourSec;
	readonly DaySec = DaySec;
	readonly WeekSec = WeekSec;
	readonly MonthSec = MonthSec;
	readonly YearSec = YearSec;

	get milliSecond() { return Date.now() + this._serverDelta; }
	get second() { return ~~(this.milliSecond / 1000); }
	get year() { return this._date.setTime(this.milliSecond), this._date.getFullYear(); }
	get month() { return this._date.setTime(this.milliSecond), this._date.getMonth() + 1; }
	get date() { return this._date.setTime(this.milliSecond), this._date.getDate(); }
	get day() {
		this._date.setTime(this.milliSecond);
		const day = this._date.getDay();
		if (day == 0) return EWeekDay.Sunday;
		else return (day - 1) as EWeekDay;
	}

	setServerTime(time: number) {
		this._serverDelta = time - Date.now();
		this._passDaySec = this.second;
		Laya.timer.loop(1000, this, this.loopPassDay);
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

	dateFormat3(timestamp: number, split?: string) {
		this._date.setTime(timestamp);
		const d = this._date;
		const hh = String(d.getHours()).padStart(2, '0');
		const mm = String(d.getMinutes()).padStart(2, '0');
		return `${ hh }${ split || ":" }${ mm }`;
	}

	timeFormat1(timestamp: number, keepSec: boolean = true) {
		this._date.setTime(timestamp);
		const str = this._date.toLocaleString();
		if (keepSec) return str;
		return str.substring(0, str.lastIndexOf(":"));
	}

	timeFormat2(second: number) {
		const h = ~~(second / HourSec);
		const m = ~~(second % HourSec / MinSec);
		const s = second % MinSec;

		let str = "";
		if (h) str += `${ h.toString().padStart(2, "0") }:`;
		if (h || m) str += `${ m.toString().padStart(2, "0") }:`;
		if (s) str += `${ s.toString().padStart(2, "0") }`;
		return str;
	}

	timeFormat3(second: number) {
		const h = ~~(second / HourSec);
		const m = ~~(second % HourSec / MinSec);
		const s = second % MinSec;

		let str = "";
		if (h) str += h + $lang(2021);
		if (h || m) str += m + $lang(2020);
		if (s) str += s + $lang(2019);
		return str;
	}

	timeFormat4(second: number) {
		if (second >= DaySec) return ~~(second / DaySec) + $lang(2022);
		if (second >= HourSec) return ~~(second / HourSec) + $lang(2021);
		if (second >= MinSec) return ~~(second / MinSec) + $lang(2020);
		return ~~(second) + $lang(2019);
	}

	timeFormat5(second: number) {
		const delta = this.second - second; // 防止服务器时间差导致负数

		// 10分钟以内：刚刚
		if (delta < 10 * MinSec) {
			return $lang(2013);
		}

		// 1小时以内：10, 20...50分钟前
		if (delta < HourSec) {
			const tensOfMinutes = ~~(delta / (10 * MinSec));
			return `${ tensOfMinutes }0${ $lang(2014) }`;
		}

		// 24小时以内：X小时前
		if (delta < DaySec) {
			return ~~(delta / HourSec) + $lang(2015);
		}

		// 7天以内：X天前
		if (delta < WeekSec) {
			return ~~(delta / DaySec) + $lang(2016);
		}

		// 4周以内：X周前
		if (delta < MonthSec) {
			return ~~(delta / WeekSec) + $lang(2017);
		}

		// 超过4周：x个月前
		return ~~(delta / MonthSec) + $lang(2018);
	}

	wait(milSec: number) {
		return new Promise<void>(resolve => {
			Laya.timer.once(milSec, null, resolve);
		});
	}

	waitFrame(frame: number) {
		return new Promise<void>(resolve => {
			Laya.timer.frameOnce(frame, null, resolve);
		});
	}

	private loopPassDay() {
		const curSec = this.second;
		const passed = ~~((this._passDaySec + 3 * 3600) / 86400) != ~~((curSec + 3 * 3600) / 86400);
		if (passed) {
			this._passDaySec = curSec;
			$facade.dispatch(EGlobalEvent.OnPassDay);
		}
	}
}
