import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUICheckCurrencyMsg, UICheckCurrencyView } from "../../view/uis/UICheckCurrencyView";

export class UICheckCurrencyMediator extends MediatorBase<UICheckCurrencyView, ECurrencyType> {

	override onAwake() {
		this.addEvent(EUICheckCurrencyMsg.OnBtnBuyClick, this.onBtnBuyClick);
	}

	override onEnable() {
		this.view.refresh(this.data);
	}

	private onBtnBuyClick() {
		let viewId: EUIViewID;
		switch (this.data) {
			case ECurrencyType.Diamond:
				viewId = EViewID.UIRechargeView;
				break;
			case ECurrencyType.SkinTicket:
				viewId = EViewID.UIRechargeView;
				break;
			default: this.closeSelf(); return;
		}
		this.openView<IUIRechargeData>(viewId, { currencyType: this.data }, EViewOpenType.Hide);
	}

}