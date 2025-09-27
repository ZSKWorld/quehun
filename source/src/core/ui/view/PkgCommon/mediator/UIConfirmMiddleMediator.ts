import { ConfirmBaseMediator } from "../script/ConfirmBaseMediator";
import { UIConfirmMiddleMsg, UIConfirmMiddleView } from "../view/UIConfirmMiddleView";

export class UIConfirmMiddleMediator extends ConfirmBaseMediator<UIConfirmMiddleView> {

	override onAwake() {
		this.addEvent(UIConfirmMiddleMsg.OnBtnCloseClick, this.onBtnCancelClick);
		this.addEvent(UIConfirmMiddleMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(UIConfirmMiddleMsg.OnBtnCancelClick, this.onBtnCancelClick);
	}
}