import UIRecordRemarks from "../../../../ui/PkgCommon/UIRecordRemarks";

export const enum EUIRecordRemarksMsg {
	OnBtnConfirmClick = "UIRecordRemarks_OnBtnConfirmClick",
}

export class UIRecordRemarksView extends UIRecordRemarks {
	get inputText() { return this.itxt_input.text; }

	override onCreate() {
		const { btn_mask, btn_close, btn_confirm, itxt_input } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_confirm.onClick(this, this.event, [EUIRecordRemarksMsg.OnBtnConfirmClick]);
		itxt_input.on(Laya.Event.INPUT, this, this.onITxtInput);
	}

	protected override onEnable() {
		this.itxt_input.text = "";
		this.onITxtInput();
	}

	private onITxtInput() {
		const { btn_confirm, inputText, txt_tip } = this;
		const txt = this.inputText;
		const tooLong = $uiUtil.getWordsLen(txt) > 30;
		btn_confirm.enabled = !tooLong;
		txt_tip.visible = tooLong;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
