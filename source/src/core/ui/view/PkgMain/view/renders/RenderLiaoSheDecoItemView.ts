import RenderLiaoSheDecoItem from "../../../../ui/PkgMain/RenderLiaoSheDecoItem";

export const enum ERenderLiaoSheDecoItemMsg {

}

export class RenderLiaoSheDecoItemView extends ExtendClass<IView, RenderLiaoSheDecoItem>(RenderLiaoSheDecoItem) implements IView {

	override onCreate() {

	}

	refresh(id: number, random: boolean, selected: boolean, isBgm: boolean) {
		const { ctrl_type, com_item, img_select, img_selected, txt_bgmName } = this;
		ctrl_type.selectedIndex = isBgm ? 1 : 0;
		com_item.refreshItemIcon(id);
		img_select.visible = random;
		img_selected.visible = random && selected;
		txt_bgmName.text = $itemUtil.getItemInfo(id).name;
	}
}
