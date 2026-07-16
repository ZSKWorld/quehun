import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UISettingView } from "../../view/uis/UISettingView";

export class UISettingMediator extends MediatorBase<UISettingView, IUISettingData> {

	override onAwake() {

	}

	override onEnable() {
		this.view.refresh(this.data || 0);
	}
}