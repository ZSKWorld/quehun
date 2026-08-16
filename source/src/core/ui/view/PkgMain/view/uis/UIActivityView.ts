import UIActivity from "../../../../ui/PkgMain/UIActivity";

export const enum EUIActivityMsg {

}

export class UIActivityView extends UIActivity {

	override onCreate() {
		const { btn_back } = this;
		btn_back.onClick(this, this.closeSelf);
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
