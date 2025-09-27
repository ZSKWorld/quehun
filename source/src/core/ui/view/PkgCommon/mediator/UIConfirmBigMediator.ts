import { ConfirmBaseMediator } from "../script/ConfirmBaseMediator";
import { UIConfirmBigMsg, UIConfirmBigView } from "../view/UIConfirmBigView";

export class UIConfirmBigMediator extends ConfirmBaseMediator<UIConfirmBigView> {

	override onAwake() {
		this.addEvent(UIConfirmBigMsg.OnBtnCloseClick, this.onBtnCancelClick);
		this.addEvent(UIConfirmBigMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(UIConfirmBigMsg.OnBtnCancelClick, this.onBtnCancelClick);
	}
}