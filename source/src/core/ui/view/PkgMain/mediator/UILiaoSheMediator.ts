import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUILiaoSheMsg, UILiaoSheView } from "../view/UILiaoSheView";

export interface IUILiaoSheData {

}

export class UILiaoSheMediator extends MediatorBase<UILiaoSheView, IUILiaoSheData> {

	override onAwake() {
		this.addEvent(EUILiaoSheMsg.OnComBackClick, this.onComBackClick);
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	override onOpenAni() {
		return this.view.com_back.mediator.onOpenAni();
	}

	override onCloseAni() {
		return this.view.com_back.mediator.onCloseAni();
	}
}