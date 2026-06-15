import ComCurrency from "../../../../ui/PkgCommon/ComCurrency";

export class ComCurrencyView extends ExtendClass<IView, ComCurrency>(ComCurrency) implements IView {
	private _currencyType: ECurrencyType;

	override onCreate() {
		const { btn_add, btn_currency } = this;
		btn_add.onClick(this, this.onBtnAddClick);
		btn_currency.onClick(this, this.onBtnCurrencyClick);
	}

	override onEnable() {
		this.refreshCurrency();
		$facade.on(EUserEvent.OnBagItemsChanged, this, this.refreshCurrency);
	}

	override onDisable() {
		$facade.off(EUserEvent.OnBagItemsChanged, this, this.refreshCurrency);
	}

	private refreshCurrency() {
		let currencyType: ECurrencyType;
		switch (this.ctrl_type.selectedIndex) {
			case 0: currencyType = ECurrencyType.Gold; break;
			case 1: currencyType = ECurrencyType.Diamond; break;
			case 2: currencyType = ECurrencyType.SkinTicket; break;
			case 3: currencyType = ECurrencyType.SeekTicket; break;
			case 4: currencyType = ECurrencyType.FaithValue; break;
		}

		this._currencyType = currencyType;
		this.txt_count.text = $user.bag.getItemCount(currencyType).toString();
	}

	private onBtnAddClick() {
		let viewId: EViewID;
		switch (this._currencyType) {
			case ECurrencyType.Gold: viewId = EViewID.UIRechargeView; break;
			case ECurrencyType.Diamond: viewId = EViewID.UIRechargeView; break;
			case ECurrencyType.SkinTicket: viewId = EViewID.UIRechargeView; break;
			case ECurrencyType.SeekTicket: viewId = EViewID.UIShopView; break;
			// case ECurrencyType.FaithValue: break;
		}
		if (!viewId) return;
		this.openView<IUIShopData | IUIRechargeData>(viewId, { currencyType: this._currencyType }, EViewOpenType.Hide);
	}

	private onBtnCurrencyClick() {
		switch (this._currencyType) {
			case ECurrencyType.Diamond:
			case ECurrencyType.SkinTicket: break;
			default: return;
		}
		this.openView(EViewID.UICheckCurrencyView, this._currencyType);
	}
}
