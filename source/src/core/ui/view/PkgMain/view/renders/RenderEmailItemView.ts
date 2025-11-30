import RenderEmailItem from "../../../../ui/PkgMain/RenderEmailItem";

export const enum ERenderEmailItemMsg {

}

export class RenderEmailItemView extends ExtensionClass<IView, RenderEmailItem>(RenderEmailItem) implements IView {

	override onCreate() {
		
	}

	refresh(id: number, count: number, gotReward: boolean, clickShowDetail: boolean) {
		this.touchable = !!clickShowDetail;
		const { com_item, txt_count, img_gotReward } = this;
		com_item.refresh(id);
		txt_count.text = count.toString();
		img_gotReward.visible = !!gotReward;
	}

}
