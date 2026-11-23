import UIRoomRule from "../../../../ui/PkgMain/UIRoomRule";

export const enum EUIRoomRuleMsg {
	OnBtnBgClick = "UIRoomRule_OnBtnBgClick",
	OnBtnCloseClick = "UIRoomRule_OnBtnCloseClick",
}

export class UIRoomRuleView extends UIRoomRule {

	override onCreate() {
		const { btn_bg, btn_close } = this;
		btn_bg.onClick(this, this.event, [EUIRoomRuleMsg.OnBtnBgClick]);
		btn_close.onClick(this, this.event, [EUIRoomRuleMsg.OnBtnCloseClick]);
	}

}
