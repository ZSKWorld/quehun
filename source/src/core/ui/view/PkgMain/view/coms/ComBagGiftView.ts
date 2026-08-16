import ComBagGift from "../../../../ui/PkgMain/ComBagGift";
import { RenderBagGiftItemView } from "../renders/RenderBagGiftItemView";

export const enum EComBagGiftMsg {

}

export class ComBagGiftView extends ComBagGift {
	private _items: ProtoObject<IItem>[];
	private _selling = false;
	private _sells = new Map<number, number>();
	override onCreate() {
		const { list_item, btn_start, btn_clear, btn_sell, btn_back } = this;
		btn_start.onClick(this, this.changeSelling, [true]);
		btn_clear.onClick(this, this.onBtnClear);
		btn_sell.onClick(this, this.onBtnSell);
		btn_back.onClick(this, this.changeSelling, [false]);
		$uiUtil.setList(list_item, true, this, this.onListItemRender, this.onListItemClick);
	}

	override onEnable() {
		$facade.on(EUserEvent.OnBagItemsChanged, this, this.refresh);
		this.refresh();
		this.changeSelling(false);
		this.com_icon.refreshIcon(302004);
	}

	override onDisable() {
		$facade.offAllCaller(this);
	}

	private refresh() {
		this.txt_count.text = "x" + $user.bag.getItemCount(302004);
		this._items = $user.bag.getItemByCategory(EItemCategory.Gift, true);
		this.list_item.numItems = this._items.length;
	}

	private changeSelling(selling: boolean) {
		this._selling = selling;
		const { _sells, list_item } = this;
		list_item.refreshVirtualList();
		if (!selling) _sells.clear();
		this.onChooseSellChanged();
	}

	private onBtnClear() {
		this._sells.clear();
		this.changeSelling(true);
	}

	private onBtnSell() {
		$confirmSma(3, $lang(2036)).then(v => {
			if (!v) return;
			const req: IReqSellItem = { sells: [] };
			for (const [item_id, count] of this._sells) {
				req.sells.push({ item_id, count });
			}
			$netMgr.requests.sellItem(req);
			this._sells.clear();
			this.changeSelling(false);
		});
	}

	private onListItemRender(index: number, item: RenderBagGiftItemView) {
		item.onDeleteClick(this, this.onListItemDeleteClick, index);
		this.refreshItem(item, index);
	}

	private onListItemClick(item: RenderBagGiftItemView, _, index: number) {
		const info = this._items[index];
		if (this._selling) {
			this.changeSellCount(info, 1);
			this.refreshItem(item, index);
		} else {
			this.openView<IUIItemDetailData>(EViewID.UIItemDetailView, { id: info.item_id, from: 1 });
		}
	}

	private onListItemDeleteClick(item: RenderBagGiftItemView, index: number, evt: Laya.Event) {
		this.changeSellCount(this._items[index], -1);
		this.refreshItem(item, index);
		evt.stopPropagation();
	}

	private refreshItem(item: RenderBagGiftItemView, index: number) {
		const data = this._items[index];
		const sellCount = this._sells.get(data.item_id) || 0;
		item.refresh(data.item_id, data.stack, sellCount, this._selling);
	}

	private changeSellCount(info: ProtoObject<IItem>, count: number) {
		const sells = this._sells;
		const id = info.item_id;
		if (!sells.has(id))
			sells.set(id, count);
		else
			sells.set(id, Math.min(sells.get(id) + count, info.stack));
		if (sells.get(id) <= 0)
			sells.delete(id);
		this.onChooseSellChanged();
	}

	private onChooseSellChanged() {
		const { _selling, _sells, ctrl_type, txt_add } = this;
		ctrl_type.selectedIndex = _selling ? (_sells.size > 0 ? 2 : 1) : 0;
		let addCount = 0;
		for (const [id, count] of _sells) {
			const cfgItem = $cfgMgr.item_definition.item[id];
			addCount += count * cfgItem.sell_reward_count;
		}
		txt_add.text = "+" + addCount;
	}
}
