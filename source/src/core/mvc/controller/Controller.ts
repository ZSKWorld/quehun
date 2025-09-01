import { Singleton } from "../../common/Singleton";

export class Controller extends Singleton<Controller>() {
    private _commandMap: { [key: string]: ICommand[]; } = {};

    register(notifyName: string, cls: ICommandClass) {
        if (!cls) {
            Logger.error("cls 不能为空", notifyName, cls);
        }
        if (this._commandMap[notifyName]) {
            const command = this._commandMap[notifyName].find(v => v instanceof cls);
            if (command) {
                Logger.error("重复注册command", notifyName, cls);
                return;
            }
        }
        this._commandMap[notifyName] = this._commandMap[notifyName] || [];
        this._commandMap[notifyName].push(new cls());
    }

    has(notifyName: string) {
        return this._commandMap[notifyName] && this._commandMap[notifyName].length > 0;
    }

    remove(notifyName: string, cls?: ICommandClass) {
        if (!this.has(notifyName)) return;
        if (cls) {
            const commands = this._commandMap[notifyName];
            const index = commands.findIndex(v => v instanceof cls);
            if (index >= 0)
                commands.splice(index, 1);
        } else {
            delete this._commandMap[notifyName];
        }
    }

    execute(notifyName: string, data?: any) {
        if (!this.has(notifyName)) return;
        this._commandMap[notifyName].forEach(v => v.execute(data));
    }
}