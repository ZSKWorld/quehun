import ComBagIllust from "../../../../ui/PkgMain/ComBagIllust";
import { RenderBagIllustItemView } from "../renders/RenderBagIllustItemView";

export const enum EComBagIllustMsg {

}

export class ComBagIllustView extends ComBagIllust {
	private _items: ISheetData_ItemDefinition_LoadingImage[];
	override onCreate() {
		const { list_illust } = this;
		$uiUtil.initList<RenderBagIllustItemView>(
			list_illust, true, this,
			(index, item) => {
				const itemData = this._items[index];
				item.refresh(itemData, $user.bag.isUsingCG(itemData.id));
			},
			(item, e, index) => {
				$user.bag.changeCGUsing(this._items[index].id);
			}
		);
	}

	override onEnable() {
		$facade.on(EUserEvent.OnCGUsingChanged, this, this.onCGUsingChanged);
		const items = $cfgMgr.item_definition.loading_image.filter(v => {
			return v.unlock_items.some(id => id && $user.bag.getItemCount(id) > 0);
		});
		items.sort((a, b) => b.sort - a.sort);
		this._items = items;
		this.list_illust.numItems = this._items.length;
	}

	override onDisable() {
		$facade.offAllCaller(this);
	}

	private onCGUsingChanged() {
		this.list_illust.refreshVirtualList();
	}
}
