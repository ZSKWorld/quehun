import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUILiaoSheMsg, UILiaoSheView } from "../../view/uis/UILiaoSheView";

export interface IUILiaoSheData {

}

export class UILiaoSheMediator extends MediatorBase<UILiaoSheView, IUILiaoSheData> {
	private _typeTab = new RadioGroup();

	override onAwake() {
		this.addEvent(EUILiaoSheMsg.OnComBackClick, this.onComBackClick);

		this._typeTab.init([this.view.btnChar, this.view.btnDeco], this, this.onTypeTabChanged);
	}

	override onEnable() {
		this._typeTab.selectIndex = 0;
	}

	private onTypeTabChanged(index: number) {
		this.view.refreshContent(index);
	}

	private onComBackClick() {
		this.closeSelf();
	}
}