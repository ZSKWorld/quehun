import { Command } from "./Command";

export abstract class CommandQueue extends Command {
	private _queue: ICommandClass[] = [];
	constructor() {
		super();
		this.initialize();
	}

	protected abstract initialize(): void;

	protected addSubCommand(commandCls: ICommandClass) {
		if (this._queue.includes(commandCls)) return;
		this._queue.push(commandCls);
	}

	override execute(notifyName: string, data?: any): void {
		const queue = this._queue;
		for (let i = 0, n = queue.length; i < n; i++) {
			const commandCls = queue[i];
			new commandCls().execute(notifyName, data);
		}
	}
}