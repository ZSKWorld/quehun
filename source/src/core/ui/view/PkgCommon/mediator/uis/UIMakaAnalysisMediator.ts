import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIMakaAnalysisView } from "../../view/uis/UIMakaAnalysisView";

export class UIMakaAnalysisMediator extends MediatorBase<UIMakaAnalysisView, string> {

	override onAwake() {

	}

	@InjectUserEvent(EUserEvent.OnRecordMakaChanged)
	override onEnable() {
		this.view.refresh(this.data);
	}
}