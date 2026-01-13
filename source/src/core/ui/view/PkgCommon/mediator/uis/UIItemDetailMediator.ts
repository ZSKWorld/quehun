import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIItemDetailMsg, UIItemDetailView } from "../../view/uis/UIItemDetailView";

export class UIItemDetailMediator extends MediatorBase<UIItemDetailView, IUIItemDetailData> {

	override onAwake() {
		this.addEvent(EUIItemDetailMsg.OnGraphBgClick, this.closeSelf);
		this.addEvent(EUIItemDetailMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(EUIItemDetailMsg.OnBtnOpen1Click, this.onBtnOpen1Click);
	}

	override onEnable() {
		this.view.refresh(this.data.id, this.data.from);
	}

	private onBtnOpen1Click() {

	}
}