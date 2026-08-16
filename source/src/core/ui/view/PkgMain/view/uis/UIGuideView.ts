import UIGuide from "../../../../ui/PkgMain/UIGuide";

export const enum EUIGuideMsg {
}

export class UIGuideView extends UIGuide {

	override onCreate() {
		const { btn_bg, btn_close } = this;
		btn_bg.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
