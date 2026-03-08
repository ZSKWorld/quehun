import ComCurrency from "../../../../ui/PkgCommon/ComCurrency";

export const enum EComCurrencyMsg {
	OnBtnAddClick = "ComCurrency_OnBtnAddClick",
	OnBtnCurrencyClick = "ComCurrency_OnBtnCurrencyClick",
}

export class ComCurrencyView extends ExtensionClass<IView, ComCurrency>(ComCurrency) implements IView {

	override onCreate() {
		const { btn_add, btn_currency } = this;
		btn_add.onClick(this, this.sendEvent, [EComCurrencyMsg.OnBtnAddClick]);
		btn_currency.onClick(this, this.sendEvent, [EComCurrencyMsg.OnBtnCurrencyClick]);
	}

	/**
	 * 设置货币类型
	 * @param type 货币类型
	 * - 0:金币
	 * - 1:辉玉
	 * - 2:皮肤券
	 * - 3:寻觅券
	 * - 4:信仰值
	 */
	setCurrencyType(type: 0 | 1 | 2 | 3 | 4) {
		this.ctrl_type.selectedIndex = type;
	}
}
