import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIAchievementDetailView } from "../../view/uis/UIAchievementDetailView";

export class UIAchievementDetailMediator extends MediatorBase<UIAchievementDetailView, IUIAchievementDetailData> {

	override onAwake() {

	}

	override onEnable() {
		this.view.refresh(this.data.groupId, this.data.achieveId);
	}

}