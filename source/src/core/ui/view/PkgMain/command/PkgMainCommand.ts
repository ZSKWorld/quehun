import { Command } from "../../../../mvc/controller/Command";
import { MainPopCheckCommand } from "./MainPopCheckCommand";


export class PkgMainCommand extends Command {
	override execute() {
		const registerCommand = $facade.registerCommand.bind($facade) as typeof $facade.registerCommand;
		registerCommand(EGlobalEvent.OnViewOpenEnd, MainPopCheckCommand);
	}
}
