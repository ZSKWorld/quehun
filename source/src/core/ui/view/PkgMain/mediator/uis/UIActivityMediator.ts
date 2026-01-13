import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIActivityMsg, UIActivityView } from "../../view/uis/UIActivityView";

export interface IUIActivityData {

}

export class UIActivityMediator extends MediatorBase<UIActivityView, IUIActivityData> {

	override onAwake() {
		this.addEvent(EUIActivityMsg.OnBtnBackClick, this.onBtnBackClick);
	}

	private onBtnBackClick() {
		this.closeSelf();
	}

}