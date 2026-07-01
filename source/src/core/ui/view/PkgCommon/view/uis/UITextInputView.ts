import UITextInput from "../../../../ui/PkgCommon/UITextInput";

export const enum EUITextInputMsg {
	OnBtnClick = "UITextInput_OnBtnClick",
}

export class UITextInputView extends ExtendClass<IView, UITextInput>(UITextInput) implements IView {

	override onCreate() {
		const { btn_mask, btn_close, btn_confirm } = this;
		btn_mask.onClick(this, this.onBtnClick);
		btn_close.onClick(this, this.onBtnClick);
		btn_confirm.onClick(this, this.onBtnClick);
	}

	refresh(data: IUITextInputData) {
		const { txt_title, itxt_input } = this;
		txt_title.text = data.title;
		itxt_input.text = data.text;
		itxt_input.promptText = data.placeholder || "";
		itxt_input.maxLength = data.maxLength || 0;
		this.itxt_input.restrict = data.restrict || "";
	}

	private onBtnClick() {
		this.sendEvent(EUITextInputMsg.OnBtnClick, this.itxt_input.text);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
