import { ConfirmBaseMediator } from "../../script/ConfirmBaseMediator";
import { EUIConfirmSmallMsg, UIConfirmSmallView } from "../../view/uis/UIConfirmSmallView";

export class UIConfirmSmallMediator extends ConfirmBaseMediator<UIConfirmSmallView> {

	override onAwake() {
		this.addEvent(EUIConfirmSmallMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}
}