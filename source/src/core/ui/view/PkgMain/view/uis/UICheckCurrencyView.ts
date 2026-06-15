import UICheckCurrency from "../../../../ui/PkgMain/UICheckCurrency";

export const enum EUICheckCurrencyMsg {
	OnBtnBuyClick = "UICheckCurrency_OnBtnBuyClick",
	OnBtnConfirmClick = "UICheckCurrency_OnBtnConfirmClick",
}

export class UICheckCurrencyView extends ExtendClass<IView, UICheckCurrency>(UICheckCurrency) implements IView {

	override onCreate() {
		const { btn_mask, btn_close, btn_buy, btn_confirm } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_buy.onClick(this, this.sendEvent, [EUICheckCurrencyMsg.OnBtnBuyClick]);
		btn_confirm.onClick(this, this.closeSelf);
	}

	refresh(type: ECurrencyType) {
		const { txt_title, txt_paid, txt_free, txt_total } = this;
		switch (type) {
			case ECurrencyType.Diamond:
				txt_title.langText(2713);
				txt_paid.text = $user.bag.paidDiamonds.toString();
				txt_free.text = $user.bag.freeDiamonds.toString();
				txt_total.text = $user.bag.diamonds.toString();
				break;
			case ECurrencyType.SkinTicket:
				txt_title.langText(2859);
				txt_paid.text = $user.bag.paidSkinTickets.toString();
				txt_free.text = $user.bag.freeSkinTickets.toString();
				txt_total.text = $user.bag.skinTickets.toString();
				break;
		}
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
