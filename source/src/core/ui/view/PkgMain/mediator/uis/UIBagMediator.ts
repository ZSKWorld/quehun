import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUIBagMsg, UIBagView } from "../../view/uis/UIBagView";

export interface IUIBagData {
	index?: number
}

export class UIBagMediator extends MediatorBase<UIBagView, IUIBagData> {
	private _tabGroup = new RadioGroup();

	override onAwake() {
		this.addEvent(EUIBagMsg.OnComBackClick, this.onComBackClick);
		const { view, _tabGroup } = this;
		_tabGroup.init(view.tabBtns, view, view.refreshPage);
	}

	override onEnable() {
		this._tabGroup.selectIndex = this.data?.index || 0;
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	override onOpenAni() {
		return this.view.onOpenAni();
	}

	override onCloseAni() {
		return this.view.onCloseAni();
	}
}