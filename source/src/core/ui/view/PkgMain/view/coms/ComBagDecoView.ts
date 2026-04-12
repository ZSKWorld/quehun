import ComBagDeco from "../../../../ui/PkgMain/ComBagDeco";
import { RenderBagItemView } from "../renders/RenderBagItemView";

export const enum EComBagDecoMsg {

}

export class ComBagDecoView extends ExtensionClass<IView, ComBagDeco>(ComBagDeco) implements IView {
	private _items: ProtoObject<IItem>[];
	private _showItems: ProtoObject<IItem>[] = [];
	private _showTypes: number[] = [
		-1, EItemCommonType.HuPaiEffect, EItemCommonType.LiZhiEffect, EItemCommonType.LiZhiBang,
		EItemCommonType.TableCloth, EItemCommonType.MjpBack, EItemCommonType.MjpFront,
		EItemCommonType.HeadFrame, EItemCommonType.MingPaiZhiShi, EItemCommonType.HandStyle,
		EItemCommonType.DaTingBeiJing, EItemCommonType.BeiJingYinYue, EItemCommonType.LiZhiMusic
	];
	private _typeSort: ReadonlyArray<number> = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11
	];
	private _typeStr: string[] = [
		3889, 3890, 3891, 3892, 3893, 3894, 3917, 3895, 3896, 3897, 3898, 3899
	].map(v => $lang(v));

	override onCreate() {
		$uiUtil.setList(this.list_item, true, this, this.onListItemRender, this.onListItemClick);
		$uiUtil.setCombox(this.cmb_type, this._typeStr, this._showTypes, this, this.refreshListItem);
	}

	override onEnable() {
		this.cmb_type.selectedIndex = 0;
		this.updateShowItems();
	}

	private updateShowItems() {
		const items = this._items = $userData.bag.getItemByCategory(EItemCategory.Common);
		const { _showTypes, _typeSort } = this;
		items.sort((a, b) => {
			const cfgItemA = $cfgMgr.item_definition.item[a.item_id];
			const cfgItemB = $cfgMgr.item_definition.item[b.item_id];
			const itemTypeA = cfgItemA.type;
			const itemTypeB = cfgItemB.type;
			const sortA = _typeSort[_showTypes.indexOf(itemTypeA)];
			const sortB = _typeSort[_showTypes.indexOf(itemTypeB)];
			if (sortA != sortB) return sortA - sortB;
			if (sortA != 11) return cfgItemA.sort - cfgItemB.sort;
			if (itemTypeA != itemTypeB) return itemTypeA - itemTypeB;
			if (itemTypeA != EItemCommonType.BeiJingYinYue) return cfgItemA.sort - cfgItemB.sort;
			const typeA = $cfgMgr.audio.bgm[a.item_id].type == 'lobby' ? 1 : 0;
			const typeB = $cfgMgr.audio.bgm[b.item_id].type == 'lobby' ? 1 : 0;
			return typeB - typeA;
		});
		this.refreshListItem();
	}

	private refreshListItem() {
		const { _items, _showItems, cmb_type, list_item } = this;
		_showItems.length = 0;
		const selectType = cmb_type.value as unknown as number;
		if (selectType == -1) _showItems.push(..._items);
		else {
			const isMusic = selectType == EItemCommonType.BeiJingYinYue;
			_showItems.push(..._items.filter(v => {
				const itemType = $cfgMgr.item_definition.item[v.item_id].type;
				return itemType == selectType || (isMusic && itemType == EItemCommonType.LiZhiMusic);
			}));
		}
		list_item.numItems = _showItems.length;
	}

	private onListItemRender(index: number, item: RenderBagItemView) {
		const info = this._showItems[index];
		item.refreshWithoutCount(info.item_id);
	}

	private onListItemClick(item: RenderBagItemView, _, index: number) {
		const info = this._showItems[index];
		this.openView<IUIItemDetailData>(EViewID.UIItemDetailView, { id: info.item_id, from: 1 });
	}
}

