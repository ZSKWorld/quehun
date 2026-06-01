import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIPaymentMsg, UIPaymentView } from "../../view/uis/UIPaymentView";

export class UIPaymentMediator extends MediatorBase<UIPaymentView, IUIPaymentData> {
	override onAwake() {
		this.addEvent(EUIPaymentMsg.OnListPaymentClick, this.onListPaymentClick);
	}

	override onEnable() {
		this.view.refresh(this.data.id, this.data.debtId);
	}

	private onListPaymentClick(type: EPaymentType) {
	}
}