import ComBagItem from "../../../../ui/PkgMain/ComBagItem";
import { RenderBagItemView } from "../renders/RenderBagItemView";

export const enum EComBagItemMsg {

}

export class ComBagItemView extends ExtensionClass<IView, ComBagItem>(ComBagItem) implements IView {
	private _items: ProtoObject<IItem>[];
	override onCreate() {
		this.displayObject.onEnable = this.onEnable.bind(this);
		$uiUtil.setList(this.list_item, true, this, this.onListItemRender, this.onListItemClick);
	}

	private onEnable() {
		this._items = $userData.bag.getItemByCategory(EItemCategory.Item, true);
		this.list_item.numItems = this._items.length;
	}

	private onListItemRender(index: number, item: RenderBagItemView) {
		const info = this._items[index];
		item.refreshWithCount(info.item_id, info.stack);
	}

	private onListItemClick(index: number, item: RenderBagItemView) {

	}
}
