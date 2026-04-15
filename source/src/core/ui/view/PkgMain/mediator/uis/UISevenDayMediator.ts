import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUISevenDayMsg, UISevenDayView } from "../../view/uis/UISevenDayView";

export interface IUISevenDayData {

}

export class UISevenDayMediator extends MediatorBase<UISevenDayView, IUISevenDayData> {

	override onAwake() {
		this.addEvent(EUISevenDayMsg.OnTabSelectChanged, this.onTabSelectChanged);
	}

	override onEnable() {
		this.view.refreshTab(0);
	}

	private onTabSelectChanged(index) {
		this.view.refreshContent();
	}
}