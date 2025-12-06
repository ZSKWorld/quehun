import { ConfirmBaseMediator } from "../../script/ConfirmBaseMediator";
import { EUIConfirmSmallMsg, UIConfirmSmallView } from "../../view/uis/UIConfirmSmallView";

export class UIConfirmSmallMediator extends ConfirmBaseMediator<UIConfirmSmallView> {

	override onAwake() {
		this.addEvent(EUIConfirmSmallMsg.OnBtnCloseClick, this.onBtnCancelClick);
		this.addEvent(EUIConfirmSmallMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(EUIConfirmSmallMsg.OnBtnCancelClick, this.onBtnCancelClick);
	}
}