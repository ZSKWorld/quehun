const Colors = {
	["Log" /* ELogLevel.Log */]: ["#FFFFFF", "#00AAFF", "#FF0000"],
	["Warn" /* ELogLevel.Warn */]: ["#000080", "#FFC900", "#FF0000"],
	["Error" /* ELogLevel.Error */]: ["#FF0000", "#FFC8C8", "#FF0000"],
	["Assert" /* ELogLevel.Assert */]: ["#FF0000", "#FFC8C8", "#FF0000"],
};
/** 日志打印工具 */
class Logger {
	constructor(_name, _enable = true) {
		this._name = _name;
		this._enable = _enable;
	}
	/** 创建日志打印器 */
	static create(name, enable = true) {
		if (!this._loggerMap[name])
			this._loggerMap[name] = new Logger(name);
		return this._loggerMap[name].setEnable(enable);
	}
	/** 全局开关 */
	static setEnable(enable) { this._globalEnable = enable; }
	static log(...args) { this._default.log(...args); }
	static warn(...args) { this._default.warn(...args); }
	static error(...args) { this._default.error(...args); }
	static assert(assert, tip) { this._default.assert(assert, tip); }
	log(...args) { this.emit("Log" /* ELogLevel.Log */, ...args); }
	warn(...args) { this.emit("Warn" /* ELogLevel.Warn */, ...args); }
	error(...args) { this.emit("Error" /* ELogLevel.Error */, ...args); }
	assert(assert, tip = "assert failed !") {
		!assert && this.emit("Assert" /* ELogLevel.Assert */, tip);
	}
	setEnable(enable) { this._enable = enable; return this; }
	emit(type, ...args) {
		if (!this._enable || !Logger._globalEnable)
			return;
		const params = this.processingLogParam(type, this._name, ...args);
		const methodName = type == "Assert" /* ELogLevel.Assert */ ? "error" : type.toLowerCase();
		const consoleMethod = (console[methodName] || console.error);
		consoleMethod(...params);
	}
	processingLogParam(type, name, ...args) {
		return args;
		const borderRadius = 7;
		const color = Colors[type];
		name += name ? ":" : "";
		const logParams = ["%c" + name + type, `color:${color[0]};border-radius:${borderRadius}px 0px 0px ${borderRadius}px;background:#66CCFF;padding:5px;`];
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
				logParams.push(`color:${color[0]};padding:5px;background:${color[1]};font-weight:bold;${lastIsStr ? "border-left:2px solid #ffffff;border-top:1px solid #ffffff;" : ""}`);
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
}
Logger._loggerMap = {};
Logger._globalEnable = true;
Logger._default = new Logger("Default", true);
