import { Command } from "../core/mvc/controller/Command";
import { MainPopCheckCommand } from "../core/ui/view/PkgMain/command/MainPopCheckCommand";

export class InitCommandCommand extends Command {
	override execute(notifyName: string, data?: any) {
		const registerCommand = $facade.registerCommand.bind($facade) as typeof $facade.registerCommand;

		registerCommand(ENotifyConst.OnViewOpenEnd, MainPopCheckCommand);
	}
}