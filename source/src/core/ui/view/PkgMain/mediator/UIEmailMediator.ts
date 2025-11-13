import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUIEmailMsg, UIEmailView } from "../view/UIEmailView";

export interface IUIEmailData {

}

export class UIEmailMediator extends MediatorBase<UIEmailView, IUIEmailData> {

	override onAwake() {
		this.addEvent(EUIEmailMsg.OnBtnBackClick, this.onBtnBackClick);
	}
	
	private onBtnBackClick() {
		this.closeSelf();
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}