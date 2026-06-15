@Singleton
export class Controller {

	private _commandMap: { [key: string]: ICommandClass[]; } = {};

	register(notifyName: string, cls: ICommandClass) {
		if (!cls) {
			Logger.error("cls 不能为空", notifyName, cls);
			return;
		}
		const commandMap = this._commandMap;

		if (commandMap[notifyName]?.includes(cls)) {
			Logger.error("重复注册command", notifyName, cls);
			return;
		}

		commandMap[notifyName] = commandMap[notifyName] || [];
		commandMap[notifyName].push(cls);
	}

	has(notifyName: string) {
		return this._commandMap[notifyName] && this._commandMap[notifyName].length > 0;
	}

	remove(notifyName: string, cls?: ICommandClass) {
		if (!this.has(notifyName)) return;

		if (cls) {
			const commandClses = this._commandMap[notifyName];
			const index = commandClses.findIndex(v => v == cls);
			if (index >= 0)
				commandClses.splice(index, 1);
		} else {
			delete this._commandMap[notifyName];
		}
	}

	execute(notifyName: string, data?: any) {
		if (!this.has(notifyName)) return;

		const commandClses = this._commandMap[notifyName];
		for (let i = 0, n = commandClses.length; i < n; i++) {
			const commandCls = commandClses[i];
			new commandCls().execute(notifyName, data);
		}
	}
}