import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../extention/RadioGroup";
import { EUIBagMsg, UIBagView } from "../view/UIBagView";

export interface IUIBagData {

}

export class UIBagMediator extends MediatorBase<UIBagView, IUIBagData> {
	private _tabGroup = new RadioGroup();

	override onAwake() {
		this.addEvent(EUIBagMsg.OnComBackClick, this.onComBackClick);
		this._tabGroup.init(this.view.tabBtns, null);
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
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