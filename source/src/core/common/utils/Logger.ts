const enum ELogLevel {
	Log = "Log",
	Warn = "Warn",
	Error = "Error",
	Assert = "Assert",
}

/** 日志打印工具 */
@Singleton
export class Logger implements ILogger {
	private _enable = false;

	log(...args: any[]) { this.emit(ELogLevel.Log, ...args); }
	warn(...args: any[]) { this.emit(ELogLevel.Warn, ...args); }
	error(...args: any[]) { this.emit(ELogLevel.Error, ...args); }
	assert(assert: boolean, tip: string = "assert failed !") {
		!assert && this.emit(ELogLevel.Assert, tip);
	}
	setEnable(enable: boolean) { this._enable = enable; }

	private emit(type: ELogLevel, ...args: any[]) {
		if (!this._enable) return;

		const params = args;

		const methodName = type == ELogLevel.Assert ? "error" : type.toLowerCase();
		const consoleMethod = (console[methodName] || console.error) as Function;
		consoleMethod(...params);
	}
}