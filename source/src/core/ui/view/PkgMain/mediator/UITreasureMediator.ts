import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUITreasureMsg, UITreasureView } from "../view/UITreasureView";

export interface IUITreasureData {

}

export class UITreasureMediator extends MediatorBase<UITreasureView, IUITreasureData> {

	override onAwake() {
		this.addEvent(EUITreasureMsg.OnComBackClick, this.onComBackClick);
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	override onOpenAni() {
		return this.view.onOpenAni();
	}

	override onCloseAni() {
		return this.view.onCloseAni();
	}
}