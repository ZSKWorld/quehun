import ComGetReward from "../../../../ui/PkgCommon/ComGetReward";

export const enum EComGetRewardMsg {

}

export class ComGetRewardView extends ExtensionClass<IView, ComGetReward>(ComGetReward) implements IView {

	async showRewards(rewards: IRewardSlot[]) {
		const {
			com_reward0, com_reward1, com_reward2, com_reward3, com_reward4,
			com_reward5, com_reward6, com_reward7
		} = this;
		const startX = this.width / 2 - (rewards.length - 1) / 2 * 210;
		const comRewards = [com_reward0, com_reward1, com_reward2, com_reward3, com_reward4, com_reward5, com_reward6, com_reward7];
		for (let i = 0; i < comRewards.length; i++) {
			comRewards[i].refresh(rewards[i]);
			comRewards[i].x = startX + i * 210;
			comRewards[i].alpha = 0;
		}
		await $uiUtil.playTrans(this.trans_show);
		for (let i = 0; i < rewards.length; i++) {
			$uiUtil.popAlphaIn(comRewards[i]);
			await $timeUtil.wait(100);
		}
		await $timeUtil.wait(100);
	}

	hideRewards() { 
		return $uiUtil.playTrans(this.trans_hide);
	}
}
