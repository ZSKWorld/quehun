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
		$gameUtil.safeCall(this.data.callback, text);
		this.closeSelf();
	}

}