import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { UIBagView } from "../../view/uis/UIBagView";

export class UIBagMediator extends MediatorBase<UIBagView, IUIBagData> {

	override onAwake() {
		
	}

	override onEnable() {
		this.view.refresh(this.data?.index || 0)
	}
}