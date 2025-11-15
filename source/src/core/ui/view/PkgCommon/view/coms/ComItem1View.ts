import ComItem1 from "../../../../ui/PkgCommon/ComItem1";

export const enum EComItem1Msg {

}

export class ComItem1View extends ExtensionClass<IView, ComItem1>(ComItem1) implements IView {
	private _itemId: number;

	override onCreate() {
		this.onClick(this, this.onItemClick);
	}

	refresh1(id: number, count: number, gotReward: boolean, clickShowDetail: boolean) {
		this._itemId = id;
		this.touchable = !!clickShowDetail;
		const { loader_icon, txt_count, img_gotReward } = this;
		txt_count.text = count.toString();
		img_gotReward.visible = !!gotReward;
	}

	private onItemClick() {

	}
}
