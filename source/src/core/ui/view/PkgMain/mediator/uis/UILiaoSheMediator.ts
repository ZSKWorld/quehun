import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUILiaoSheMsg, UILiaoSheView } from "../../view/uis/UILiaoSheView";

export class UILiaoSheMediator extends MediatorBase<UILiaoSheView, IUILiaoSheData> {

	override onAwake() {

	}

	override onEnable() {
		const index = this.data?.type || 0;
		this.view.refreshContent(index, false);
	}
}