import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUILiaoSheMsg, UILiaoSheView } from "../../view/uis/UILiaoSheView";

export interface IUILiaoSheData {
	type: 0 | 1,
}

export class UILiaoSheMediator extends MediatorBase<UILiaoSheView, IUILiaoSheData> {

	override onAwake() {
		this.addEvent(EUILiaoSheMsg.OnComBackClick, this.onComBackClick);

	}

	override onEnable() {
		this.view.refreshContent(0, false);
	}

	private onComBackClick() {
		this.closeSelf();
	}
}