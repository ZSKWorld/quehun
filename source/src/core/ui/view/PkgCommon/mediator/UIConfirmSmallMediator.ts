import { ConfirmBaseMediator } from "../script/ConfirmBaseMediator";
import { UIConfirmSmallMsg, UIConfirmSmallView } from "../view/UIConfirmSmallView";

export class UIConfirmSmallMediator extends ConfirmBaseMediator<UIConfirmSmallView> {

	override onAwake() {
		this.addEvent(UIConfirmSmallMsg.OnBtnCloseClick, this.onBtnCancelClick);
		this.addEvent(UIConfirmSmallMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(UIConfirmSmallMsg.OnBtnCancelClick, this.onBtnCancelClick);
	}
}