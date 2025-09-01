export class TimeUtil {
    private static _date = new Date();
    static milliSecond() {
        return Date.now();
    }

    static second() {
        return Math.floor(Date.now() / 1000);
    }

    static milliSecond2YMDHMS(milliSecond: number) {
        this._date.setTime(milliSecond);
        return this._date.toLocaleString();
    }

    static timeFormat(seconds: number, keepHour: boolean = true) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - hours * 3600) / 60);
        const secs = seconds - hours * 3600 - mins * 60;
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

    static timeFormatChinese(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - hours * 3600) / 60);
        const secs = seconds - hours * 3600 - mins * 60;
        return (hours ? `${ hours }小时` : "") + ((hours || mins) ? `${ mins }分钟` : "") + `${ secs }秒`;
    }
}