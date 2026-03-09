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

	override onEnable() {
		this.refreshCurrency();
		$facade.on(EUserEvent.OnBagItemsChanged, this, this.refreshCurrency);
	}

	override onDisable() {
		$facade.off(EUserEvent.OnBagItemsChanged, this, this.refreshCurrency);
	}

	private refreshCurrency() {
		switch (this.ctrl_type.selectedIndex) {
			// 金币
			case 0: this.txt_count.text = $userData.bag.getItemCount(100002).toString(); break;
			// 魂玉
			case 1: this.txt_count.text = $userData.bag.getItemCount(100001).toString();break;
			// 皮肤券
			case 2: this.txt_count.text = $userData.bag.getItemCount(100004).toString();break;
			// 寻觅卷轴
			case 3: this.txt_count.text = $userData.bag.getItemCount(301001).toString();break;
			// 信仰值
			case 4: this.txt_count.text = $userData.bag.getItemCount(100001).toString();break;
		}
	}
}
