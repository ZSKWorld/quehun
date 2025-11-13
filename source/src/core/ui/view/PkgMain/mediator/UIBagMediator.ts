import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUIBagMsg, UIBagView } from "../view/UIBagView";

export interface IUIBagData {

}

export class UIBagMediator extends MediatorBase<UIBagView, IUIBagData> {

	override onAwake() {
		this.addEvent(EUIBagMsg.OnComBackClick, this.onComBackClick);
		this.addEvent(EUIBagMsg.OnBtnTestClick, this.onBtnTestClick);
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	private onBtnTestClick() {
		this.openView(EViewID.UILiaoSheView, null, EViewOpenType.Hide);
	}

	override onOpenAni() {
		return this.view.com_back.mediator.onOpenAni();
	}

	override onCloseAni() {
		return this.view.com_back.mediator.onCloseAni();
	}
}