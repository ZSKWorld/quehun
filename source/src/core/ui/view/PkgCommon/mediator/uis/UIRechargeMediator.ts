import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIRechargeEvent, EUIRechargeTabType } from "../../Definition";
import { UIRechargeView } from "../../view/uis/UIRechargeView";

export class UIRechargeMediator extends MediatorBase<UIRechargeView, IUIRechargeData> {

	override onAdded() {
		this.addEvent(EUIRechargeEvent.OnTabSelectChanged, this.onTabSelectChanged);
		this.addEvent(EUIRechargeEvent.OnRecharge, this.onRecharge);
		this.addEvent(EUIRechargeEvent.OnRechargeHY, this.onRechargeHY);
		this.addEvent(EUIRechargeEvent.OnRechargeTB, this.onRechargeTB);
		this.addEvent(EUIRechargeEvent.OnRechargeHS, this.onRechargeHS);
	}

	protected override onDataChanged(data: IUIRechargeData) {
		let type = this.view.tabIndex;
		switch (data?.currencyType) {
			case ECurrencyType.Gold: type = EUIRechargeTabType.TB; break;
			case ECurrencyType.Diamond: type = EUIRechargeTabType.HY; break;
			case ECurrencyType.SkinTicket: type = EUIRechargeTabType.FSQ; break;
			default:
				if (type < 0)
					type = EUIRechargeTabType.HY;
				break;
		}
		const paymentOpen = !!$gameMgr.config.goods_sheleve_id && $user.recharge.paymentOpen;
		const enables: Record<EUIRechargeTabType, boolean> = {
			[EUIRechargeTabType.HY]: paymentOpen,
			[EUIRechargeTabType.FSQ]: paymentOpen,
			[EUIRechargeTabType.TB]: true,
			[EUIRechargeTabType.QYDJ]: $gameMgr.clientType != EClientType.CHS,
			[EUIRechargeTabType.HS]: $gameMgr.clientType == EClientType.CHS,
		};
		this.view.refreshTab(type, enables);
	}

	private onTabSelectChanged(type: EUIRechargeTabType) {
		let items: number[];
		const { shelevesId } = $user.recharge;
		switch (type) {
			case EUIRechargeTabType.HY:
				items = $cfgMgr.mall.goods_shelves[shelevesId].filter(v => {
					return v.is_monthcard || $cfgMgr.mall.goods[v.goods_id].type != 2;
				}).map(v => v.goods_id);
				this.view.refreshItems(items);
				break;
			case EUIRechargeTabType.FSQ:
				items = $cfgMgr.mall.goods_shelves[shelevesId].filter(v => {
					return !v.is_monthcard && $cfgMgr.mall.goods[v.goods_id].type != 1;
				}).map(v => v.goods_id);
				items.push(4001);
				this.view.refreshItems(items);
				break;
			case EUIRechargeTabType.TB:
				items = $cfgMgr.exchange.exchange.map(v => v.id);
				this.view.refreshItems(items);
				break;
			case EUIRechargeTabType.QYDJ:
				this.view.refreshQYDJ();
				break;
			case EUIRechargeTabType.HS:
				items = $cfgMgr.exchange.searchexchange.map(v => v.id);
				this.view.refreshItems(items);
				break;
		}
	}

	private onRecharge(goodsId: number) {

	}

	private onRechargeHY(id: number) {
		const cfgGoods = $cfgMgr.exchange.fushiquanexchange[id];
		this.openView<IUIBuyGoodsData>(EViewID.UIBuyGoodsView, {
			type: 2,
			id: 100001,
			currencyId: 100004,
			price: cfgGoods.source_value,
			priceCount: cfgGoods.source_value,
			max: -1,
			showOwn: true,
			title: cfgGoods.langField(ECfgLangField.name),
		});
	}

	private onRechargeTB(goodsId: number) {

	}

	private onRechargeHS(goodsId: number) {

	}
}