import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUITextInputMsg, UITextInputView } from "../../view/uis/UITextInputView";

export class UITextInputMediator extends MediatorBase<UITextInputView, IUITextInputData> {

	override onAwake() {
		this.addEvent(EUITextInputMsg.OnBtnClick, this.onBtnClick);
	}

	override onEnable() {
		this.view.refresh(this.data);
	}

	private onBtnClick(text: string) {
		const callback = this.data.callback;
		if (callback instanceof Laya.Handler) {
			callback.runWith(text);
		} else if (typeof callback == "function") {
			callback(text);
		}
		this.closeSelf();
	}

}