const enum ELogLevel {
	Log = "Log",
	Warn = "Warn",
	Error = "Error",
	Assert = "Assert",
}

const Colors: { [key in ELogLevel]: [string, string, string] } = {
	[ELogLevel.Log]: [EColorString._ffffff, EColorString._00aaff, EColorString._ff0000],
	[ELogLevel.Warn]: [EColorString._000080, EColorString._ffc900, EColorString._ff0000],
	[ELogLevel.Error]: [EColorString._ff0000, EColorString._ffc8c8, EColorString._ff0000],
	[ELogLevel.Assert]: [EColorString._ff0000, EColorString._ffc8c8, EColorString._ff0000],
};

/** 日志打印工具 */
export class Logger {
	private static _loggerMap: { [name: string]: Logger; } = {};
	private static _globalEnable = true;
	private static readonly _default = new Logger("Default", true);

	private constructor(
		private _name: string,
		private _enable: boolean = true,
	) { }

	/** 创建日志打印器 */
	static create(name: string, enable = true) {
		if (!this._loggerMap[name])
			this._loggerMap[name] = new Logger(name);
		return this._loggerMap[name].setEnable(enable);
	}

	/** 全局开关 */
	static setEnable(enable: boolean) { this._globalEnable = enable; }

	static log(...args: any[]) { this._default.log(...args); }
	static warn(...args: any[]) { this._default.warn(...args); }
	static error(...args: any[]) { this._default.error(...args); }
	static assert(assert: boolean, tip?: string) { this._default.assert(assert, tip); }

	log(...args: any[]) { this.emit(ELogLevel.Log, ...args); }
	warn(...args: any[]) { this.emit(ELogLevel.Warn, ...args); }
	error(...args: any[]) { this.emit(ELogLevel.Error, ...args); }
	assert(assert: boolean, tip: string = "assert failed !") {
		!assert && this.emit(ELogLevel.Assert, tip);
	}

	private setEnable(enable: boolean) { this._enable = enable; return this; }

	private emit(type: ELogLevel, ...args: any[]) {
		if (!this._enable || !Logger._globalEnable) return;

		const params = this.processingLogParam(type, this._name, ...args);

		const methodName = type == ELogLevel.Assert ? "error" : type.toLowerCase();
		const consoleMethod = (console[methodName] || console.error) as Function;
		consoleMethod(...params);
	}

	private processingLogParam(type: ELogLevel, name: string, ...args: any[]) {
		return args;
		const borderRadius = 7;
		const color = Colors[type];
		name += name ? ":" : "";
		const logParams = ["%c" + name + type, `color:${ color[0] };border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px;background:${ EColorString._66ccff };padding:5px;`];
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
				logParams.push(`color:${ color[0] };padding:5px;background:${ color[1] };font-weight:bold;${ lastIsStr ? `border-left:2px solid ${ EColorString._ffffff };border-top:1px solid ${ EColorString._ffffff };` : "" }`);
				lastIsStr = true;
				lastStrIndex = logParams.length - 1;
			}
		}
		if (lastStrIndex == 1) logParams[lastStrIndex] = logParams[lastStrIndex].replace(`border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px`, `border-radius:${ borderRadius }px`);
		else logParams[lastStrIndex] += `border-radius:0px ${ borderRadius }px ${ borderRadius }px 0px;`;
		return logParams;
	}
}