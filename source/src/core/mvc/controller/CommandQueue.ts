import { Command } from "./Command";

export abstract class CommandQueue extends Command {
    private _queue: ICommandClass[] = [];
    constructor() {
        super();
        this.initialize();
    }

    protected initialize() {

    }

    protected addSubCommand(commandCls: ICommandClass) {
        if (this._queue.find(v => v == commandCls)) return;
        this._queue.push(commandCls);
    }

    override execute(notifyName: string, data?: any): void {
        this._queue.forEach(v => new v().execute(notifyName, data));
    }
}