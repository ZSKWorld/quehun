import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIRoomRuleView } from "../../view/uis/UIRoomRuleView";

export class UIRoomRuleMediator extends MediatorBase<UIRoomRuleView, IUIRoomRuleData> {

	override onAwake() {
	}

	override onEnable() {
		this.view.refresh(this.data?.targetId, this.data?.modeIds);
	}

}