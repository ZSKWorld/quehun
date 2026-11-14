import RenderObserverPlayer from "../../../../ui/PkgMain/RenderObserverPlayer";

export const enum ERenderObserverPlayerMsg {

}

export class RenderObserverPlayerView extends RenderObserverPlayer {

	refresh(player: IPlayerGameView, siMa: Boolean) {
		if (!player) return;
		const { account_id, title, level, level3 } = player;
		const { ctrl_sima, com_title, label_name, com_level3, com_level4 } = this;
		ctrl_sima.selectedIndex = siMa ? 1 : 0;

		com_title.refreshIcon($itemUtil.zoneTitle(account_id, title));
		label_name.refresh(player);
		siMa && com_level4.refresh(level);
		!siMa && com_level3.refresh(level3);
	}

}
