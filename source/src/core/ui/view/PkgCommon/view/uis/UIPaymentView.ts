import UIPayment from "../../../../ui/PkgCommon/UIPayment";

export const enum EUIPaymentMsg {
	OnListPaymentClick = "EUIPaymentMsg_OnListPaymentClick",
}

const paymentIconMap: Record<EPaymentType, string> = {
	[EPaymentType.MyCard]: "ui://vx9zwserq9u3obj6",
	[EPaymentType.PayPal]: "ui://vx9zwserq9u3obj7",
	[EPaymentType.XSolla]: "ui://vx9zwserq9u3obja",
	[EPaymentType.YinLian]: "ui://vx9zwserq9u3obj8",
	[EPaymentType.WeChat]: "ui://vx9zwserlkqmobjc",
	[EPaymentType.AliPay]: "ui://vx9zwserlkqmobjb",
	[EPaymentType.XinYongKa]: "ui://vx9zwserq9u3obj9",
};

export class UIPaymentView extends ExtensionClass<IView, UIPayment>(UIPayment) implements IView {
	private _paymentTypes: EPaymentType[];

	override onCreate() {
		const { btn_mask, btn_close, list_payment } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		$uiUtil.setList(list_payment, false, this, this.onListPaymentRender, this.onListPaymentClick);
	}

	refresh(id: number) {
		this._paymentTypes = [
			EPaymentType.YinLian,
			EPaymentType.XinYongKa,
			EPaymentType.PayPal,
			EPaymentType.MyCard,
			EPaymentType.XSolla,
		];
		this.list_payment.numItems = this._paymentTypes.length;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }

	private onListPaymentRender(index: number, item: fgui.GButton) {
		item.icon = paymentIconMap[this._paymentTypes[index]];
	}

	private onListPaymentClick(_, __, index: number) {
		this.sendEvent(EUIPaymentMsg.OnListPaymentClick, this._paymentTypes[index]);
	}
}
