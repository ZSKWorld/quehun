import RenderEmailItem from "../../../../ui/PkgMain/RenderEmailItem";

export const enum ERenderEmailItemMsg {

}

export class RenderEmailItemView extends ExtensionClass<IView, RenderEmailItem>(RenderEmailItem) implements IView {

	override onCreate() {

	}

	refresh(id: number, count: number, gotReward: boolean, clickShowDetail: boolean) {
		this.touchable = !!clickShowDetail;
		const { btn_item, txt_count, img_gotReward } = this;
		btn_item.refreshDownScale(id);
		txt_count.text = count.toString();
		img_gotReward.visible = !!gotReward;
	}

}
