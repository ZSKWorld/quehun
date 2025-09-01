import { Command } from "./Command";

export abstract class CommandQueue extends Command {
    private _queue: ICommand[] = [];
    constructor() {
        super();
        this.initialize();
    }

    protected initialize() {

    }

    protected addSubCommand(commandCls: ICommandClass) {
        if (this._queue.find(v => v instanceof commandCls)) return;
        this._queue.push(new commandCls());
    }

    override execute(notifyName: string, data?: any): void {
        this._queue.forEach(v => v.execute(notifyName, data));
    }
}