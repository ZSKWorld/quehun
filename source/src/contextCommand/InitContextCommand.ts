import { CommandQueue } from "../core/mvc/controller/CommandQueue";
import { InitGameCommand } from "./InitGameCommand";
import { InitGlobalCommand } from "./InitGlobalCommand";
import { InitSceneCommand } from "./InitSceneCommand";
import { InitViewCommand } from "./InitViewCommand";
import { InitViewInfoCommand } from "./InitViewInfoCommand";

export class InitContextCommand extends CommandQueue {
	protected override initialize() {
		this.addSubCommand(InitGlobalCommand);
		this.addSubCommand(InitViewCommand);
		this.addSubCommand(InitViewInfoCommand);
		this.addSubCommand(InitSceneCommand);
		this.addSubCommand(InitGameCommand);
	}
}