import RenderObserverItem from "../../../../ui/PkgMain/RenderObserverItem";

export const enum ERenderObserverItemMsg {

}

export class RenderObserverItemView extends RenderObserverItem {

	refresh(data: IGameLiveHead, name: string, siMa: boolean) {
		const { txt_name, txt_time, com_player0, com_player1, com_player2, com_player3, ctrl_sima } = this;
		txt_name.text = name;
		txt_time.text = $timeUtil.dateFormat3(data.start_time * 1000);
		ctrl_sima.selectedIndex = siMa ? 1 : 0;
		[com_player0, com_player1, com_player2, com_player3].forEach((v, i) => {
			v.refresh(data.players[i], siMa);
		});
	}

	getPlayerIndexByPoint(x: number, y: number) {
		const { com_player0, com_player1, com_player2, com_player3 } = this;
		if ($uiUtil.checkPointInGobject(x, y, com_player0)) return 0;
		if ($uiUtil.checkPointInGobject(x, y, com_player1)) return 1;
		if ($uiUtil.checkPointInGobject(x, y, com_player2)) return 2;
		if ($uiUtil.checkPointInGobject(x, y, com_player3)) return 3;
		return 0;
	}
}
