import ComBagIllust from "../../../../ui/PkgMain/ComBagIllust";
import { RenderBagIllustItemView } from "../renders/RenderBagIllustItemView";

export const enum EComBagIllustMsg {

}

export class ComBagIllustView extends ExtensionClass<IView, ComBagIllust>(ComBagIllust) implements IView {
	private _items: ISheetData_ItemDefinition_LoadingImage[];
	override onCreate() {
		const { list_illust } = this;
		$uiUtil.setList(list_illust, true, this, this.onListIllustItemRenderer, this.onListIllustItemClick);
		$facade.on(EUserEvent.OnCGUsingChanged, this, this.refresh);
	}

	override onEnable() {
		const items = $cfgMgr.item_definition.loading_image.filter(v => {
			return v.unlock_items.some(id => id && $user.bag.getItemCount(id) > 0);
		});
		items.sort((a, b) => b.sort - a.sort);
		this._items = items;
		this.list_illust.numItems = this._items.length;
	}

	private refresh() {
		this.list_illust.refreshVirtualList();
	}

	private onListIllustItemRenderer(index: number, item: RenderBagIllustItemView) {
		const itemData = this._items[index];
		item.refresh(itemData, $user.bag.isUsingCG(itemData.id));
	}

	private onListIllustItemClick(item: RenderBagIllustItemView, _, index: number) {
		$user.bag.changeCGUsing(this._items[index].id);
	}
}
