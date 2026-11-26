import UINumberInput from "../../../../ui/PkgMain/UINumberInput";

export const enum EUINumberInputMsg {
	OnBtnConfirmClick = "UINumberInput_OnBtnConfirmClick",
}

export class UINumberInputView extends UINumberInput {

	get inputNum() { return +this.itxt_input.text; }

	override onCreate() {
		const {
			btn_mask, btn_close, btn_confirm, itxt_input, btn_num0, btn_num1, btn_num2, btn_num3, btn_num4, btn_num5, btn_num6,
			btn_num7, btn_num8, btn_num9, btn_clear, btn_delete,
		} = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_confirm.onClick(this, this.event, [EUINumberInputMsg.OnBtnConfirmClick]);

		(itxt_input.displayObject as Laya.Input).promptColor = "#999999";
		const addNum = (num: number) => (itxt_input.text.length < itxt_input.maxLength && (itxt_input.text += num.toString()));
		[
			btn_num0, btn_num1, btn_num2, btn_num3, btn_num4, btn_num5, btn_num6, btn_num7, btn_num8, btn_num9
		].forEach((v, i) => v.onClick(this, addNum, [i]));
		btn_clear.onClick(this, () => itxt_input.text = "");
		btn_delete.onClick(this, () => itxt_input.text = itxt_input.text.substring(0, itxt_input.text.length - 1));
	}

	refresh(maxLen: number) {
		this.itxt_input.text = "";
		this.itxt_input.maxLength = maxLen ?? 5;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
