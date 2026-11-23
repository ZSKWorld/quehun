import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIInfoView } from "../../view/uis/UIInfoView";

export class UIInfoMediator extends MediatorBase<UIInfoView, string> {

	override onEnable() {
		this.view.refresh(this.data);
	}
}