import { Singleton } from "../../common/Singleton";

export class Controller extends Singleton<Controller>() {
    private _commandMap: { [key: string]: ICommandClass[]; } = {};

    register(notifyName: string, cls: ICommandClass) {
        if (!cls) {
            Logger.error("cls 不能为空", notifyName, cls);
        }
        if (this._commandMap[notifyName]) {
            const commandCls = this._commandMap[notifyName].find(v => v == cls);
            if (commandCls) {
                Logger.error("重复注册command", notifyName, cls);
                return;
            }
        }
        this._commandMap[notifyName] = this._commandMap[notifyName] || [];
        this._commandMap[notifyName].push(cls);
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
        this._commandMap[notifyName].forEach(v => new v().execute(notifyName, data));
    }
}