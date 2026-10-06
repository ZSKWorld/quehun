import { Command } from "../../../../mvc/controller/Command";
import { ActivityOverviewInitCommand } from "./ActivityOverviewInitCommand";


export class PkgActivityOverviewCommand extends Command {
	override execute() {
		const registerCommand = $facade.registerCommand.bind($facade) as typeof $facade.registerCommand;
		registerCommand(EGlobalEvent.LoginSuccess, ActivityOverviewInitCommand);
	}
}
