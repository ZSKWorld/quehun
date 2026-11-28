import UICreateRoom from "../../../../ui/PkgMain/UICreateRoom";

export const enum EUICreateRoomMsg {
	OnBtnCreateClick = "UICreateRoom_OnBtnCreateClick",
}

export class UICreateRoomView extends UICreateRoom {
	get createData() { return this.com_content.createData; }

	override onCreate() {
		const { com_back, btn_rule, btn_create } = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_rule.onClick(this, () => this.openView(EViewID.UIRoomRuleView, { targetId: this.com_content.selectedModeId }));
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
