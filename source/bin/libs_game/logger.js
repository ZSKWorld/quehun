/** 日志打印工具 */
class Logger {
    constructor(_name,
        /** 是否开启打印日志，实例开关 */
        _enable = true) {
        this._name = _name;
        this._enable = _enable;
    }
    /**
     * 创建日志打印器
     * @param name 名称
     * @param enable 是否开启日志打印，默认true
     */
    static create(name, enable = true) {
        if (!this._enable)
            return this._default;
        let logger = this._loggerMap[name];
        if (!logger)
            this._loggerMap[name] = logger = new Logger(name);
        return logger.setEnable(enable);
    }
    /** 设置全局开关 */
    static setEnable(enable) { this._enable = enable; }
    static log(...args) { this._default.log(...args); }
    static warn(...args) { this._default.warn(...args); }
    static error(...args) { this._default.error(...args); }
    static assert(assert, tipText) { this._default.assert(assert, tipText); }
    /** 处理日志参数
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    static processingLogParam(type, name, ...args) {
        return args;
        const borderRadius = 7;
        name += name ? ":" : "";
        const logParams = ["%c" + name + type, `color:${this._color[type][0]};border-radius:${borderRadius}px 0px 0px ${borderRadius}px;background:#66CCFF;padding:5px;`];
        const len = args.length;
        let lastIsStr = false;
        let lastStrIndex = 1;
        for (let i = 0; i < len; i++) {
            const msg = args[i];
            if (typeof msg == "object") {
                logParams[0] += "%o";
                logParams.push(msg);
                lastIsStr = false;
            }
            else {
                logParams[0] += "%c" + String(msg);
                logParams.push(`color:${this._color[type][0]};padding:5px;background:${this._color[type][1]};font-weight:bold;${lastIsStr ? "border-left:2px solid #ffffff;border-top:1px solid #ffffff;" : ""}`);
                lastIsStr = true;
                lastStrIndex = logParams.length - 1;
            }
        }
        if (lastStrIndex == 1)
            logParams[lastStrIndex] = logParams[lastStrIndex].replace(`border-radius:${borderRadius}px 0px 0px ${borderRadius}px`, `border-radius:${borderRadius}px`);
        else
            logParams[lastStrIndex] += `border-radius:0px ${borderRadius}px ${borderRadius}px 0px;`;
        return logParams;
    }
    /** 打印日志
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    static doLog(type, name, ...args) {
        if (!this._enable)
            return;
        const logArr = this.processingLogParam(type, name, ...args);
        switch (type) {
            case "Log" /* Log */:
                this._consoleMap.log.call(console, ...logArr);
                break;
            case "Warn" /* Warn */:
                this._consoleMap.warn.call(console, ...logArr);
                break;
            case "Error" /* Error */:
                this._consoleMap.error.call(console, ...logArr);
                break;
            case "Assert" /* Assert */:
                this._consoleMap.error.call(console, ...logArr);
                break;
            default: break;
        }
    }
    log(...args) { this._enable && Logger.doLog("Log" /* Log */, this._name, ...args); }
    warn(...args) { this._enable && Logger.doLog("Warn" /* Warn */, this._name, ...args); }
    error(...args) { this._enable && Logger.doLog("Error" /* Error */, this._name, ...args); }
    assert(assert, tipText) { this._enable && !assert && Logger.doLog("Assert" /* Assert */, this._name, tipText || "assert failed !"); }
    setEnable(enable) { this._enable = enable; return this; }
}
Logger._consoleMap = {
    log: console.log,
    warn: console.warn,
    error: console.error,
};
/** 默认日志打印器 */
Logger._default = new Logger("Default", true);
Logger._loggerMap = {};
/** 是否开启日志打印，全局开关 */
Logger._enable = true;
/** 各类型日志 字体颜色和背景色 */
Logger._color = {
    ["Log" /* Log */]: ["#FFFFFF", "#00AAFF", "#FF0000"],
    ["Warn" /* Warn */]: ["#000080", "#FFC900", "#FF0000"],
    ["Error" /* Error */]: ["#FF0000", "#FFC8C8", "#FF0000"],
    ["Assert" /* Assert */]: ["#FF0000", "#FFC8C8", "#FF0000"],
};