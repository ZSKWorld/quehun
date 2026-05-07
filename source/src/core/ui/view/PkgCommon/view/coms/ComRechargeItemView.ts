import ComRechargeItem from "../../../../ui/PkgCommon/ComRechargeItem";
import { EUIRechargeTabType } from "../../../PkgMain/Definition";

export class ComRechargeItemView extends ExtensionClass<IView, ComRechargeItem>(ComRechargeItem) implements IView {

	private _itemType: EUIRechargeTabType;
	private _itemId: number;
	private _itemIndex: number;

	override onCreate() {
		const { btn_buy1, btn_buy2 } = this;
		btn_buy1.onClick(this, this.onBtnBuy);
		btn_buy2.onClick(this, this.onBtnBuy);
	}

	refresh(type: EUIRechargeTabType, id: number, index: number) {
		this._itemType = type;
		this._itemId = id;
		this._itemIndex = index;
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
		const { _itemId, _itemIndex, txt_title, txt_desc, com_item, btn_buy2 } = this;

		const cfgGoodsShelves = $cfgMgr.mall.goods_shelves[$user.recharge.shelevesId].find(v => v.goods_id == _itemId);
		if (cfgGoodsShelves.is_monthcard) {
			const cfgGoods = $cfgMgr.mall.month_ticket[_itemId];
			txt_title.text = $langCfg(cfgGoods, "name");
			com_item.refreshSkin($langRes(cfgGoods.icon));
		} else {
			const cfgGoods = $cfgMgr.mall.goods[_itemId];
			txt_title.text = $langCfg(cfgGoods, "name");
			com_item.refreshSkin($langRes(cfgGoods.icon));
		}
	}

	private refreshTB() {
		const { _itemId, _itemIndex, txt_title, txt_desc, com_item, btn_buy2 } = this;

		const cfgExchange = $cfgMgr.exchange.exchange[_itemId];

		txt_title.text = $langCfg(cfgExchange, "name");
		com_item.refreshSkin($langRes(cfgExchange.icon));
	}

	private refreshHS() {

	}

	private onBtnBuy() {

	}
}
