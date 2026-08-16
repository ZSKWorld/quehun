import UIGetReward from "../../../../ui/PkgCommon/UIGetReward";

export const enum EUIGetRewardMsg {
	OnBtnBgClick = "UIGetReward_OnBtnBgClick",
}

export class UIGetRewardView extends UIGetReward {

	override onCreate() {
		const { btn_bg } = this;
		btn_bg.onClick(this, this.sendEvent, [EUIGetRewardMsg.OnBtnBgClick]);
	}

	async showRewards(rewards: IRewardSlot[]) {
		this.btn_bg.visible = false;
		await this.com_content.showRewards(rewards);
		this.btn_bg.visible = true;
	}

	override async onCloseAni() {
		this.btn_bg.visible = false;
		await this.com_content.hideRewards();
		this.btn_bg.visible = true;
	}
}
