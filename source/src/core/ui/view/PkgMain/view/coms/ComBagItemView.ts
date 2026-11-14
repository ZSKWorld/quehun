import ComBagItem from "../../../../ui/PkgMain/ComBagItem";
import { RenderBagItemView } from "../renders/RenderBagItemView";

export const enum EComBagItemMsg {

}

export class ComBagItemView extends ComBagItem {
	private _items: ProtoObject<IItem>[];
	override onCreate() {
		$uiUtil.initList<RenderBagItemView>(
			this.list_item, true, this,
			(index, item) => {
				const info = this._items[index];
				item.refreshWithCount(info.item_id, info.stack);
			},
			(item, e, index) => {
				const info = this._items[index];
				this.openView<IUIItemDetailData>(EViewID.UIItemDetailView, { id: info.item_id, from: 1 });
			}
		);
	}

	override onEnable() {
		$facade.on(EUserEvent.OnBagItemsChanged, this, this.refresh);
		this.refresh();
	}

	override onDisable() {
		$facade.offAllCaller(this);
	}

	private refresh() {
		this._items = $user.bag.getItemByCategory(EItemCategory.Item, true);
		this.list_item.numItems = this._items.length;
	}
}
