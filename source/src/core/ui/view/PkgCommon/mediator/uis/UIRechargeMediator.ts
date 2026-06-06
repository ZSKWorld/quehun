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
		const payOpen = !!$gameMgr.config.goods_sheleve_id && $user.recharge.payOpen;
		const enables: Record<EUIRechargeTabType, boolean> = {
			[EUIRechargeTabType.HY]: payOpen,
			[EUIRechargeTabType.FSQ]: payOpen,
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

	private onRecharge(id: number) {
		this.openView<IUIPaymentData>(EViewID.UIPaymentView, { id });
	}

	private onRechargeHY(id: number) {
		const cfgExchange = $cfgMgr.exchange.fushiquanexchange[id];
		this.openView<IUIBuyGoodsData>(EViewID.UIBuyGoodsView, {
			type: 2,
			id: cfgExchange.target_currency,
			currencyId: cfgExchange.source_currency,
			price: cfgExchange.source_value,
			priceCount: cfgExchange.target_value,
			showOwn: true,
			title: cfgExchange.langField(ECfgLangField.name),
			onBuy: count => {
				$confirmSma(3, $lang(3910, count * cfgExchange.target_value)).then(success => {
					success && $netMgr.requests.exchangeDiamond({ id, count });
				});
			},
		});
	}

	@InterestMessage(ENetMessage.exchangeDiamond)
	private onExchangeDiamond(_, req: IReqExchangeCurrency) {
		const cfgExchange = $cfgMgr.exchange.fushiquanexchange[req.id];
		const cfgCurrency = $cfgMgr.item_definition.currency[cfgExchange.target_currency];
		$tipMgr.showTip($lang(2231, cfgCurrency.langField(ECfgLangField.name)));
	}

	private onRechargeTB(id: number) {
		const cfgExchange = $cfgMgr.exchange.exchange[id];
		this.openView<IUIBuyGoodsData>(EViewID.UIBuyGoodsView, {
			type: 0,
			id: cfgExchange.target_currency,
			currencyId: cfgExchange.source_currency,
			price: cfgExchange.source_value,
			title: cfgExchange.langField(ECfgLangField.name),
			onBuy: count => {
				$netMgr.requests.exchangeCurrency({ id, count });
			},
		});
	}

	private onRechargeHS(id: number) {
		const cfgSearchExchange = $cfgMgr.exchange.searchexchange[id];
		this.openView<IUIBuyGoodsData>(EViewID.UIBuyGoodsView, {
			type: 0,
			id: cfgSearchExchange.target_currency,
			currencyId: cfgSearchExchange.source_currency,
			price: cfgSearchExchange.source_value,
			title: cfgSearchExchange.langField(ECfgLangField.name),
			onBuy: count => {
				$netMgr.requests.exchangeChestStone({ id, count });
			},
		});
	}
	
	@InterestMessage(ENetMessage.exchangeCurrency)
	@InterestMessage(ENetMessage.exchangeChestStone)
	private onExchangeCurrencyOrChestStone() {
		$tipMgr.showTip($lang(2191));
	}
}