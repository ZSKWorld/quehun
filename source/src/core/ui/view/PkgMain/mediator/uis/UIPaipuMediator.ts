import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIPaipuMsg, UIPaipuView } from "../../view/uis/UIPaipuView";

export interface IUIPaipuData {

}

export class UIPaipuMediator extends MediatorBase<UIPaipuView, IUIPaipuData> {

	override onAwake() {
		this.addEvent(EUIPaipuMsg.OnComBackClick, this.onComBackClick);
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