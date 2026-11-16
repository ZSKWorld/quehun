import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIRecordRemarksMsg, UIRecordRemarksView } from "../../view/uis/UIRecordRemarksView";

export class UIRecordRemarksMediator extends MediatorBase<UIRecordRemarksView, IUIRecordRemarksData> {
	private _cancled: boolean;

	override onAwake() {
		this.addEvent(EUIRecordRemarksMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	override onEnable() {
		this._cancled = true;
	}

	override onDisable() {
		const txt = this.view.inputText;
		$gameUtil.safeCall(this.data.callback, this._cancled, txt);
	}

	private onBtnConfirmClick() {
		this._cancled = false;
		this.closeSelf();
	}
}