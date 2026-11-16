import UIRecordShare from "../../../../ui/PkgMain/UIRecordShare";

export const enum EUIRecordShareMsg {
	OnBtnHideNameClick = "UIRecordShare_OnBtnHideNameClick",
	OnBtnCopyClick = "UIRecordShare_OnBtnCopyClick",
	OnBtnConfirmClick = "UIRecordShare_OnBtnConfirmClick",
}

export class UIRecordShareView extends UIRecordShare {
	get inputText() { return this.itxt_input.text; }

	override onCreate() {
		const { btn_mask, btn_close, btn_hideId, btn_copy, btn_confirm, itxt_input } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_hideId.onClick(this, this.event, [EUIRecordShareMsg.OnBtnHideNameClick]);
		btn_copy.onClick(this, this.event, [EUIRecordShareMsg.OnBtnCopyClick]);
		btn_confirm.onClick(this, this.event, [EUIRecordShareMsg.OnBtnConfirmClick]);
	}

	refreshShare(uuid: string) {
		this.ctrl_type.selectedIndex = 0;
		this.itxt_input.editable = false;
		this.itxt_input.text = $uiUtil.getRecordShareUrl(uuid, this.btn_hideId.selected);
	}

	refreshLook() {
		this.ctrl_type.selectedIndex = 1;
		this.itxt_input.editable = true;
		this.itxt_input.text = "";
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
