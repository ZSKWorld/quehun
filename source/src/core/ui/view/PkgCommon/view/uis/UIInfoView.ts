import UIInfo from "../../../../ui/PkgCommon/UIInfo";

export class UIInfoView extends UIInfo {

	override onCreate() {
		const { btn_close, btn_confirm, com_mask } = this;
		btn_close.onClick(this, this.closeSelf);
		btn_confirm.onClick(this, this.closeSelf);
		com_mask.onClick(this, this.closeSelf);
	}

	refresh(text: string) {
		this.label_content.text = text;
		this.label_content.scrollPane.setPosY(0);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
