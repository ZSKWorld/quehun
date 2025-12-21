import ComBagIllust from "../../../../ui/PkgMain/ComBagIllust";
import { RenderBagIllustItemView } from "../renders/RenderBagIllustItemView";

export const enum EComBagIllustMsg {

}

export class ComBagIllustView extends ExtensionClass<IView, ComBagIllust>(ComBagIllust) implements IView {
	private _items: ProtoObject<IItem>[];
	override onCreate() {
		const { displayObject, list_illust } = this;
		displayObject.onEnable = this.onEnable.bind(this);
		$uiUtil.setList(list_illust, true, this, this.onListIllustItemRenderer, this.onListIllustItemClick);
	}

	private onEnable() {
		this._items = $userData.bag.getItemByCategoryType(EItemCategory.Common, EItemCommonType.ChaHuaLoadingTu);
		this.list_illust.numItems = this._items.length;
	}

	private onListIllustItemRenderer(index: number, item: RenderBagIllustItemView) {

	}

	private onListIllustItemClick(item: RenderBagIllustItemView, _, index: number) {

	}
}
