import { ConfirmBaseMediator } from "../script/ConfirmBaseMediator";
import { EUIConfirmMiddleMsg, UIConfirmMiddleView } from "../view/UIConfirmMiddleView";

export class UIConfirmMiddleMediator extends ConfirmBaseMediator<UIConfirmMiddleView> {

	override onAwake() {
		this.addEvent(EUIConfirmMiddleMsg.OnBtnCloseClick, this.onBtnCancelClick);
		this.addEvent(EUIConfirmMiddleMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(EUIConfirmMiddleMsg.OnBtnCancelClick, this.onBtnCancelClick);
	}
}