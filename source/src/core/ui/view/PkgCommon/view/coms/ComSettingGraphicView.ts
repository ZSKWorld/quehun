import ComSettingGraphic from "../../../../ui/PkgCommon/ComSettingGraphic";

export const enum EComSettingGraphicMsg {
	OnBtnBgMuteOnClick = "ComSettingGraphic_OnBtnBgMuteOnClick",
}

export class ComSettingGraphicView extends ExtendClass<IView, ComSettingGraphic>(ComSettingGraphic) implements IView {

	override onCreate() {
		const { btn_bgMuteOn } = this;
		btn_bgMuteOn.onClick(this, this.sendEvent, [EComSettingGraphicMsg.OnBtnBgMuteOnClick]);
	}

}
