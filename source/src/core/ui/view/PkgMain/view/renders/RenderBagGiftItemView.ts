import RenderBagGiftItem from "../../../../ui/PkgMain/RenderBagGiftItem";

export const enum ERenderBagGiftItemMsg {

}

export class RenderBagGiftItemView extends RenderBagGiftItem {

	override onCreate() {

	}

	onDeleteClick(caller: any, listener: Function, index: number) {
		this.btn_delete.onClick(caller, listener, [this, index]);
	}

	refresh(id: number, count: number, sellCount: number, selling: boolean) {
		const cfgItem = $cfgMgr.item_definition.item[id];
		const { ctrl_type, btn_item, txt_count } = this;
		ctrl_type.selectedIndex = !selling ? 0 : (cfgItem.can_sell ? (sellCount > 0 ? 1 : 0) : 2);
		btn_item.refreshWithCount(id, count - sellCount);
		txt_count.text = String(sellCount);
		const scale = selling ? 0.82 : 1;
		this.setScale(scale, scale);
		this.touchable = !selling || !!cfgItem.can_sell;
	}
}
