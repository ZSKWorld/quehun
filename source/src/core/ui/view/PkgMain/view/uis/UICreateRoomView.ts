import UICreateRoom from "../../../../ui/PkgMain/UICreateRoom";

export const enum EUICreateRoomMsg {
	OnBtnRuleClick = "UICreateRoom_OnBtnRuleClick",
	OnBtnCreateClick = "UICreateRoom_OnBtnCreateClick",
}

export class UICreateRoomView extends UICreateRoom {

	override onCreate() {
		const { com_back, btn_rule, btn_create } = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_rule.onClick(this, this.event, [EUICreateRoomMsg.OnBtnRuleClick]);
		btn_create.onClick(this, this.event, [EUICreateRoomMsg.OnBtnCreateClick]);
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}
}
