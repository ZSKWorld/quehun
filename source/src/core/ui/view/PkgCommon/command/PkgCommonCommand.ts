import { Command } from "../../../../mvc/controller/Command";
import { FriendInviteCommand } from "./FriendInviteCommand";
import { JoinRoomCommand } from "./JoinRoomCommand";


export class PkgCommonCommand extends Command {
	override execute() {
		const registerCommand = $facade.registerCommand.bind($facade) as typeof $facade.registerCommand;
		registerCommand(EGlobalEvent.OnFriendInvite, FriendInviteCommand);
		registerCommand(EGlobalEvent.OnJoinRoom, JoinRoomCommand);
	}
}
