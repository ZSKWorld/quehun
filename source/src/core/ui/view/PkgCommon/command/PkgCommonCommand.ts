import { Command } from "../../../../mvc/controller/Command";


export class PkgCommonCommand extends Command {
	override execute() {
		const registerCommand = $facade.registerCommand.bind($facade) as typeof $facade.registerCommand;
	}
}
