import ComRechargeItem from "../../../../ui/PkgCommon/ComRechargeItem";
import { EUIRechargeEvent, EUIRechargeTabType } from "../../Definition";

export class ComRechargeItemView extends ExtendClass<IView, ComRechargeItem>(ComRechargeItem) implements IView {

	private _rechargeEvent: EUIRechargeEvent;

	get rechargeEvent() { return this._rechargeEvent; }

	refresh(type: EUIRechargeTabType, id: number) {
		this._rechargeEvent = null;
		this.img_first.visible = false;
		this.txt_desc.visible = false;
		switch (type) {
			case EUIRechargeTabType.HY: this.refreshHY_FSQ(type, id); break;
			case EUIRechargeTabType.FSQ: this.refreshHY_FSQ(type, id); break;
			case EUIRechargeTabType.TB: this.refreshTB(type, id); break;
			case EUIRechargeTabType.HS: this.refreshHS(type, id); break;
		}
	}

	private refreshHY_FSQ(type: EUIRechargeTabType, id: number) {
		const { ctrl_type, img_first, txt_desc, com_item, txt_cost, loader_currency } = this;

		if (type == EUIRechargeTabType.FSQ && id == 4001) {
			ctrl_type.selectedIndex = 1;
			this._rechargeEvent = EUIRechargeEvent.OnRechargeHY;
			const cfgGoods = $cfgMgr.exchange.fushiquanexchange[id];
			this.title = cfgGoods.langField(ECfgLangField.name);
			com_item.refreshSkin($langRes(cfgGoods.icon));
			txt_cost.text = cfgGoods.source_value.toString();
			const icon = $langRes($cfgMgr.item_definition.currency[cfgGoods.source_currency].icon);
			$dynamicResMgr.setLoader(loader_currency, icon);
		} else {
			txt_desc.visible = true;
			ctrl_type.selectedIndex = 0;
			this._rechargeEvent = EUIRechargeEvent.OnRecharge;
			const cfgGoodsShelves = $cfgMgr.mall.goods_shelves[$user.recharge.shelevesId].find(v => v.goods_id == id);
			if (cfgGoodsShelves.is_monthcard) {
				const cfgGoods = $cfgMgr.mall.month_ticket[id];
				this.title = cfgGoods.langField(ECfgLangField.name);
				com_item.refreshSkin($langRes(cfgGoods.icon));
				txt_desc.text = cfgGoods.langField(ECfgLangField.desc);
				txt_desc.color = EColorString._f56aff;
				//TODO vip剩余天数显示
			} else {
				const cfgGoods = $cfgMgr.mall.goods[id];
				const firstRecharge = cfgGoods.first_extend_add && $user.recharge.isFirstRecharge(cfgGoods.cny);
				img_first.visible = firstRecharge;
				this.title = cfgGoods.langField(ECfgLangField.name);
				com_item.refreshSkin($langRes(cfgGoods.icon));
				txt_desc.text = cfgGoods.langField(firstRecharge ? ECfgLangField.first_desc : ECfgLangField.normal_desc);
				txt_desc.color = firstRecharge ? EColorString._f56aff : EColorString._f17828;
			}
			txt_cost.text = cfgGoodsShelves.price;
		}
	}

	private refreshTB(type: EUIRechargeTabType, id: number) {
		const { ctrl_type, com_item, txt_cost, loader_currency } = this;

		ctrl_type.selectedIndex = 1;
		this._rechargeEvent = EUIRechargeEvent.OnRechargeTB;
		const cfgExchange = $cfgMgr.exchange.exchange[id];
		this.title = cfgExchange.langField(ECfgLangField.name);
		com_item.refreshSkin($langRes(cfgExchange.icon));
		txt_cost.text = cfgExchange.source_value.toString();
		const icon = $langRes($cfgMgr.item_definition.currency[cfgExchange.source_currency].icon);
		$dynamicResMgr.setLoader(loader_currency, icon);
	}

	private refreshHS(type: EUIRechargeTabType, id: number) {
		const { ctrl_type, com_item, txt_cost, loader_currency } = this;

		ctrl_type.selectedIndex = 1;
		this._rechargeEvent = EUIRechargeEvent.OnRechargeHS;
		const cfgSearchExchange = $cfgMgr.exchange.searchexchange[id];
		this.title = cfgSearchExchange.langField(ECfgLangField.name);
		com_item.refreshSkin($langRes(cfgSearchExchange.icon));
		txt_cost.text = cfgSearchExchange.source_value.toString();
		const icon = $langRes($cfgMgr.item_definition.currency[cfgSearchExchange.source_currency].icon);
		$dynamicResMgr.setLoader(loader_currency, icon);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_currency);
	}
}
