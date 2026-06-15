import UISetting from "../../../../ui/PkgCommon/UISetting";

export const enum EUISettingMsg {

}

export class UISettingView extends ExtendClass<IView, UISetting>(UISetting) implements IView {

	override onCreate() {
		const { btn_mask, btn_close } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
