import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIItemDetailMsg, UIItemDetailView } from "../../view/uis/UIItemDetailView";

export interface IUIItemDetailData {

}

export class UIItemDetailMediator extends MediatorBase<UIItemDetailView, IUIItemDetailData> {

	override onAwake() {
		this.addEvent(EUIItemDetailMsg.OnGraphBgClick, this.closeSelf);
		this.addEvent(EUIItemDetailMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(EUIItemDetailMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	private onBtnConfirmClick() {

	}

}