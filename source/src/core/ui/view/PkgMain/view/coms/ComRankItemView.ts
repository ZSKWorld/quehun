import ComRankItem from "../../../../ui/PkgMain/ComRankItem";
import { EUIRankType } from "../../define/MainDefine";

export const enum EComRankItemMsg {

}

export class ComRankItemView extends ExtensionClass<IView, ComRankItem>(ComRankItem) implements IView {

	override onCreate() {

	}

	refresh(rank: number, type: EUIRankType, data: IPlayerBaseView) {
		const { com_head, com_name, com_title, com_level, loader_top3, txt_rank } = this;
		const top3 = rank < 3;
		loader_top3.visible = top3;
		txt_rank.visible = !top3;
		top3 && (loader_top3.icon = `ui://PkgCommon/img_${ 1689 + rank }`);
		!top3 && (txt_rank.text = String(rank + 1));
		// com_head.refresh(data.head_icon, data.head_frame);
		com_name.refresh(data);
		com_title.refresh(data);
		com_level.refresh(type == EUIRankType.SiMa ? data.level : data.level3);
	}
}
