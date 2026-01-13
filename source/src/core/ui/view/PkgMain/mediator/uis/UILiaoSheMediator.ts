import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUILiaoSheMsg, UILiaoSheView } from "../../view/uis/UILiaoSheView";

export interface IUILiaoSheData {

}

export class UILiaoSheMediator extends MediatorBase<UILiaoSheView, IUILiaoSheData> {

	override onAwake() {
		this.addEvent(EUILiaoSheMsg.OnComBackClick, this.onComBackClick);
	}

	private async onComBackClick() {
		this.closeSelf();
	}
}