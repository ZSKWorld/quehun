import { ConfirmBaseMediator } from "../../script/ConfirmBaseMediator";
import { EUIConfirmMiddleMsg, UIConfirmMiddleView } from "../../view/uis/UIConfirmMiddleView";

export class UIConfirmMiddleMediator extends ConfirmBaseMediator<UIConfirmMiddleView> {

	override onAwake() {
		this.addEvent(EUIConfirmMiddleMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}
}