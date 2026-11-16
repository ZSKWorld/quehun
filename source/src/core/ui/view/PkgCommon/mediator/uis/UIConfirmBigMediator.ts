import { ConfirmBaseMediator } from "../../script/ConfirmBaseMediator";
import { EUIConfirmBigMsg, UIConfirmBigView } from "../../view/uis/UIConfirmBigView";

export class UIConfirmBigMediator extends ConfirmBaseMediator<UIConfirmBigView> {

	override onAwake() {
		this.addEvent(EUIConfirmBigMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}
}