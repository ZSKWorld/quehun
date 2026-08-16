import RenderRankItem from "../../../../ui/PkgMain/RenderRankItem";
import { EUIRankType } from "../../Definition";

export const enum ERenderRankItemMsg {

}

export class RenderRankItemView extends RenderRankItem {

	override onCreate() {

	}

	refresh(rank: number, type: EUIRankType, data: IPlayerBaseView) {
		const { com_head, label_name, com_title, com_level, loader_top3, txt_rank } = this;
		const top3 = rank < 3;
		loader_top3.visible = top3;
		txt_rank.visible = !top3;
		top3 && (loader_top3.icon = `ui://PkgCommon/img_${ 1689 + rank }`);
		!top3 && (txt_rank.text = String(rank + 1));
		com_head.refresh(data.avatar_id, data.avatar_frame);
		label_name.refresh(data);
		com_title.refreshIcon(data.title);
		com_level.refresh(type == EUIRankType.SiMa ? data.level : data.level3);
	}
}
