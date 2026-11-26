import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUINumberInputMsg, UINumberInputView } from "../../view/uis/UINumberInputView";

export class UINumberInputMediator extends MediatorBase<UINumberInputView, IUINumberInputData> {
	private _inputNum: number;

	override onAwake() {
		this.addEvent(EUINumberInputMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	override onEnable() {
		this._inputNum = null;
		this.view.refresh(this.data?.maxLen);
	}

	override onDisable() {
		$gameUtil.safeCall(this.data?.callback, this._inputNum);
	}

	private onBtnConfirmClick() {
		this._inputNum = this.view.inputNum;
		this.closeSelf();
	}

}