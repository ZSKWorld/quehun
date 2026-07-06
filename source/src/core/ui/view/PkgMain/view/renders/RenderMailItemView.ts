import RenderMailItem from "../../../../ui/PkgMain/RenderMailItem";

export const enum ERenderMailItemMsg {

}

export class RenderMailItemView extends ExtendClass<IView, RenderMailItem>(RenderMailItem) implements IView {

	override onCreate() {

	}

	refresh(id: number, count: number, gotReward: boolean, clickShowDetail: boolean) {
		this.touchable = !!clickShowDetail;
		const { com_item, txt_count, img_gotReward } = this;
		com_item.refreshItemIcon(id);
		txt_count.text = count.toString();
		img_gotReward.visible = !!gotReward;
	}

}
