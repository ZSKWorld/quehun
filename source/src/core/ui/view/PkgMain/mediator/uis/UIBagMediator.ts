import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { UIBagView } from "../../view/uis/UIBagView";

export class UIBagMediator extends MediatorBase<UIBagView, IUIBagData> {
	private _tabGroup = new RadioGroup();

	override onAwake() {
		const { view, _tabGroup } = this;
		_tabGroup.init(view.tabBtns, view, view.refreshPage);
	}

	override onEnable() {
		this._tabGroup.selectIndex = this.data?.index || 0;
	}

	override onDisable() {
		this._tabGroup.clearSelection();
	}
}