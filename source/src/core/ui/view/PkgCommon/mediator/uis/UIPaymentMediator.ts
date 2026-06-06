import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIPaymentMsg, UIPaymentView } from "../../view/uis/UIPaymentView";

const enum EPaymentMethod {
	None = 0,
	YinLian = 2580,
	WeChat = 3215,
	AliPay = 3323,
	XinYongKa = 1380,
	AliPayV4 = 3623,
}

export class UIPaymentMediator extends MediatorBase<UIPaymentView, IUIPaymentData> {
	override onAwake() {
		this.addEvent(EUIPaymentMsg.OnListPaymentClick, this.onListPaymentClick);
	}

	override onEnable() {
		this.view.refresh(this.data.id, this.data.debtId);
	}

	private onListPaymentClick(type: EPaymentType) {
		let method = EPaymentMethod.None;
		let rpcName: ENetMessage;
		switch (type) {
			case EPaymentType.MyCard:
				rpcName = ENetMessage.createMyCardWebOrder;
				break;
			case EPaymentType.PayPal:
				rpcName = ENetMessage.createPaypalOrder;
				break;
			case EPaymentType.XSolla:
				break;
			case EPaymentType.YinLian:
				method = EPaymentMethod.YinLian;
				break;
			case EPaymentType.WeChat:
				method = EPaymentMethod.WeChat;
				break;
			case EPaymentType.AliPay:
				const openV4 = $user.recharge.isFirstRecharge
				method = EPaymentMethod.AliPay;
				break;
			case EPaymentType.XinYongKa:
				method = EPaymentMethod.XinYongKa;
				break;
			default: return;
		}
	}
}