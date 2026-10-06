import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIActivityOverviewMsg, UIActivityOverviewView } from "../../view/uis/UIActivityOverviewView";

export interface IUIActivityOverviewData {

}

export class UIActivityOverviewMediator extends MediatorBase<UIActivityOverviewView, IUIActivityOverviewData> {

	override onAwake() {
		this.addEvent(EUIActivityOverviewMsg.OnBtnMaskClick, this.onBtnMaskClick);
		this.addEvent(EUIActivityOverviewMsg.OnBtnBackClick, this.onBtnBackClick);
	}

	private onBtnMaskClick() {

	}

	private onBtnBackClick() {

	}

}