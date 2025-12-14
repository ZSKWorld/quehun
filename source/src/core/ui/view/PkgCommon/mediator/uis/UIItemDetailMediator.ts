import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIItemDetailMsg, UIItemDetailView } from "../../view/uis/UIItemDetailView";


export class UIItemDetailMediator extends MediatorBase<UIItemDetailView, number> {

	override onAwake() {
		this.addEvent(EUIItemDetailMsg.OnGraphBgClick, this.closeSelf);
		this.addEvent(EUIItemDetailMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(EUIItemDetailMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	override onEnable() {
		this.view.refresh(this.data);
	}

	private onBtnConfirmClick() {

	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}