import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIVisitView } from "../../view/uis/UIVisitView";

export class UIVisitMediator extends MediatorBase<UIVisitView, IUIVisitData> {

	override onAwake() {
	}

	override onEnable() {
		this.view.refresh(this.data.charId);
	}
}