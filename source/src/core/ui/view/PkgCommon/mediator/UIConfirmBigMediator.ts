import { ConfirmBaseMediator } from "../script/ConfirmBaseMediator";
import { EUIConfirmBigMsg, UIConfirmBigView } from "../view/UIConfirmBigView";

export class UIConfirmBigMediator extends ConfirmBaseMediator<UIConfirmBigView> {

	override onAwake() {
		this.addEvent(EUIConfirmBigMsg.OnBtnCloseClick, this.onBtnCancelClick);
		this.addEvent(EUIConfirmBigMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(EUIConfirmBigMsg.OnBtnCancelClick, this.onBtnCancelClick);
	}
}