import ComCurrency from "../../../../ui/PkgCommon/ComCurrency";

export const enum EComCurrencyMsg {
	OnBtnAddClick = "ComCurrency_OnBtnAddClick",
	OnBtnCurrencyClick = "ComCurrency_OnBtnCurrencyClick",
}

export class ComCurrencyView extends ExtensionClass<IView, ComCurrency>(ComCurrency) implements IView {

	override onCreate() {
		const { btn_add, btn_currency, ctrl_type } = this;
		btn_add.onClick(this, this.sendEvent, [EComCurrencyMsg.OnBtnAddClick]);
		btn_currency.onClick(this, this.sendEvent, [EComCurrencyMsg.OnBtnCurrencyClick]);
		switch (ctrl_type.selectedIndex) {
			// 金币
			case 0: break;
			// 魂玉
			case 1: break;
			// 皮肤券
			case 2: break;
			// 寻觅券
			case 3: break;
			// 信仰值
			case 4: break;
		}
	}
}
