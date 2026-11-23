import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIRoomRuleMsg, UIRoomRuleView } from "../../view/uis/UIRoomRuleView";

export interface IUIRoomRuleData {

}

export class UIRoomRuleMediator extends MediatorBase<UIRoomRuleView, IUIRoomRuleData> {

	override onAwake() {
		this.addEvent(EUIRoomRuleMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addEvent(EUIRoomRuleMsg.OnBtnCloseClick, this.onBtnCloseClick);
	}

	private onBtnBgClick() {

	}

	private onBtnCloseClick() {

	}

}