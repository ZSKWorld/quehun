import ComBagDeco from "../../../../ui/PkgMain/ComBagDeco";
import { RenderBagItemView } from "../renders/RenderBagItemView";

export const enum EComBagDecoMsg {

}

export class ComBagDecoView extends ExtensionClass<IView, ComBagDeco>(ComBagDeco) implements IView {
	private _items: ProtoObject<IItem>[];
	private _showItems: ProtoObject<IItem>[] = [];
	private _showTypes: number[] = [
		-1, EItemCommonType.HuPaiEffect, EItemCommonType.LiZhiEffect, EItemCommonType.LiZhiBang,
		EItemCommonType.ZhuoBo, EItemCommonType.PaiBei, EItemCommonType.MaJiangPaiZhengMian,
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
		this.displayObject.onEnable = this.onEnable.bind(this);
		$uiUtil.setList(this.list_item, true, this, this.onListItemRender, this.onListItemClick);
		$uiUtil.setCombox(this.cmb_type, this._typeStr, this._showTypes, this, this.onCmbTypeChanged);
	}

	private onEnable() {
		const items = this._items = $userData.bag.getItemByCategory(EItemCategory.Common);
		// items.sort((a, b) => {
		// 	let sort_a = a.sort;
		// 	let sort_b = b.sort;
		// 	if (sort_a == sort_b) {
		// 		let _data_a = cfg.item_definition.item.get(a.info.item_id);
		// 		let _data_b = cfg.item_definition.item.get(b.info.item_id);

		// 		if (sort_a == 10) {

		// 			let _item_type_a = _data_a.type;
		// 			let _item_type_b = _data_b.type;
		// 			if (_item_type_a == _item_type_b && _item_type_b == 9) {
		// 				let _type_a = cfg.audio.bgm.get(a.info.item_id).type == 'lobby' ? 1 : 0;
		// 				let _type_b = cfg.audio.bgm.get(b.info.item_id).type == 'lobby' ? 1 : 0;
		// 				return _type_b - _type_a;

		// 			} else if (_item_type_a != _item_type_b) {
		// 				return _item_type_b - _item_type_a;
		// 			} else {
		// 				return _data_a.sort - _data_b.sort;
		// 			}

		// 		} else {
		// 			return _data_a.sort - _data_b.sort;
		// 		}

		// 	} else {
		// 		return sort_a - sort_b;
		// 	}

		// })
		this.list_item.numItems = this._items.length;
	}

	private onCmbTypeChanged() {
		Logger.error(this.cmb_type.value, this.cmb_type.selectedIndex)
	}

	private onListItemRender(index: number, item: RenderBagItemView) {
		const info = this._items[index];
		item.refreshWithoutCount(info.item_id);
	}

	private onListItemClick(index: number, item: RenderBagItemView) {

	}
}
