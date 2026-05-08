import ComRechargeItem from "../../../../ui/PkgCommon/ComRechargeItem";
import { EUIRechargeTabType } from "../../../PkgMain/Definition";

export class ComRechargeItemView extends ExtensionClass<IView, ComRechargeItem>(ComRechargeItem) implements IView {

	private _itemType: EUIRechargeTabType;
	private _itemId: number;

	override onCreate() {
		const { btn_buy1, btn_buy2 } = this;
		btn_buy1.onClick(this, this.onBtnBuy);
		btn_buy2.onClick(this, this.onBtnBuy);
	}

	refresh(type: EUIRechargeTabType, id: number) {
		this._itemType = type;
		this._itemId = id;
		this.img_first.visible = false;
		this.btn_buy1.visible = false;
		this.btn_buy2.visible = false;
		this.txt_desc.visible = false;
		switch (type) {
			case EUIRechargeTabType.HY: this.refreshHY_FSQ(); break;
			case EUIRechargeTabType.FSQ: this.refreshHY_FSQ(); break;
			case EUIRechargeTabType.TB: this.refreshTB(); break;
			case EUIRechargeTabType.HS: this.refreshHS(); break;
		}
	}

	private refreshHY_FSQ() {
		const { _itemId, _itemType, img_first, txt_title, txt_desc, com_item, btn_buy1, btn_buy2 } = this;

		if (_itemType == EUIRechargeTabType.FSQ && _itemId == 4001) {
			btn_buy1.visible = true;
			const cfgGoods = $cfgMgr.exchange.fushiquanexchange[_itemId];
			txt_title.text = $langCfg(cfgGoods, "name");
			com_item.refreshSkin($langRes(cfgGoods.icon));
			btn_buy1.title = cfgGoods.source_value.toString();
			btn_buy1.icon = $langRes($cfgMgr.item_definition.currency[cfgGoods.source_currency].icon);
		} else {
			txt_desc.visible = true;
			btn_buy2.visible = true;
			const cfgGoodsShelves = $cfgMgr.mall.goods_shelves[$user.recharge.shelevesId].find(v => v.goods_id == _itemId);
			if (cfgGoodsShelves.is_monthcard) {
				const cfgGoods = $cfgMgr.mall.month_ticket[_itemId];
				txt_title.text = $langCfg(cfgGoods, "name");
				com_item.refreshSkin($langRes(cfgGoods.icon));
				txt_desc.text = $langCfg(cfgGoods, "desc");
				txt_desc.color = "#f56aff";
				//TODO vip剩余天数显示
			} else {
				const cfgGoods = $cfgMgr.mall.goods[_itemId];
				const firstRecharge = cfgGoods.first_extend_add && $user.recharge.isFirstRecharge(cfgGoods.cny);
				img_first.visible = firstRecharge;
				txt_title.text = $langCfg(cfgGoods, "name");
				com_item.refreshSkin($langRes(cfgGoods.icon));
				txt_desc.text = $langCfg(cfgGoods, firstRecharge ? "first_desc" : "normal_desc");
				txt_desc.color = firstRecharge ? "#f56aff" : "#f17828";
			}
			btn_buy2.title = cfgGoodsShelves.price;
		}
	}

	private refreshTB() {
		const { _itemId, txt_title, com_item, btn_buy1 } = this;

		btn_buy1.visible = true;

		const cfgExchange = $cfgMgr.exchange.exchange[_itemId];
		txt_title.text = $langCfg(cfgExchange, "name");
		com_item.refreshSkin($langRes(cfgExchange.icon));
		btn_buy1.title = cfgExchange.source_value.toString();
		btn_buy1.icon = $langRes($cfgMgr.item_definition.currency[cfgExchange.source_currency].icon);
	}

	private refreshHS() {
		const { _itemId, txt_title, com_item, btn_buy1 } = this;

		btn_buy1.visible = true;

		const cfgSearchExchange = $cfgMgr.exchange.searchexchange[_itemId];
		txt_title.text = $langCfg(cfgSearchExchange, "name");
		com_item.refreshSkin($langRes(cfgSearchExchange.icon));
		btn_buy1.title = cfgSearchExchange.source_value.toString();
		btn_buy1.icon = $langRes($cfgMgr.item_definition.currency[cfgSearchExchange.source_currency].icon);
	}

	private onBtnBuy() {

	}
}
