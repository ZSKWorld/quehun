import { Command } from "../../../../mvc/controller/Command";
import { FriendInviteCommand } from "./FriendInviteCommand";
import { JoinRoomCommand } from "./JoinRoomCommand";
import { MainPopCheckCommand } from "./MainPopCheckCommand";


export class PkgMainCommand extends Command {
	override execute() {
		const registerCommand = $facade.registerCommand.bind($facade) as typeof $facade.registerCommand;
		registerCommand(EGlobalEvent.OnViewOpenEnd, MainPopCheckCommand);

		registerCommand(EGlobalEvent.OnFriendInvite, FriendInviteCommand);
		registerCommand(EGlobalEvent.OnJoinRoom, JoinRoomCommand);
	}
}
