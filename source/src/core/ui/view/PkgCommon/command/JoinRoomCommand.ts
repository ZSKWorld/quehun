import { Command } from "../../../../mvc/controller/Command";

export class JoinRoomCommand extends Command {
	override execute(notifyName: string): void {
		if ($sceneMgr.curScene != ESceneType.MainScene) {
			$sceneMgr.enterScene(ESceneType.MainScene).then(() => {
				// $uiMgr.openView(EViewID.)
			});
		} else {
			while (!$uiMgr.isTopStackView(EViewID.UIMainView)) {
				$uiMgr.closeView($uiMgr.topStackViewId);
			}
			// $uiMgr.openView();
		}

	}
}
