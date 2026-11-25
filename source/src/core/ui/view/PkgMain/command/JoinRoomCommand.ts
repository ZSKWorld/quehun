import { Command } from "../../../../mvc/controller/Command";

export class JoinRoomCommand extends Command {
	override async execute(notifyName: string) {
		if ($sceneMgr.curScene != ESceneType.MainScene) {
			$sceneMgr.enterScene(ESceneType.MainScene).then(() => {
				$uiMgr.openView(EViewID.UIFriendRoomView, null, EViewOpenType.Hide);
			});
		} else {
			$uiMgr.openView(EViewID.UIFriendRoomView, null, EViewOpenType.Hide);
		}

	}
}
