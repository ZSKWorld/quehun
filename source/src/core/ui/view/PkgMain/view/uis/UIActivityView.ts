import UIActivity from "../../../../ui/PkgMain/UIActivity";

export const enum EUIActivityMsg {
	OnBtnBackClick = "UIActivity_OnBtnBackClick",
}

export class UIActivityView extends ExtensionClass<IView, UIActivity>(UIActivity) implements IView {

	override onCreate() {
		const { btn_back } = this;
		btn_back.onClick(this, this.sendEvent, [EUIActivityMsg.OnBtnBackClick]);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4188);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
