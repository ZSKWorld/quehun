import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIGetRewardMsg, UIGetRewardView } from "../../view/uis/UIGetRewardView";


export class UIGetRewardMediator extends MediatorBase<UIGetRewardView, IUIGetRewardData> {
	private readonly _step = 8;
	private _showIndex: number = 0;

	override onAwake() {
		this.addEvent(EUIGetRewardMsg.OnBtnBgClick, this.onBtnBgClick);
	}

	override onEnable() {
		this._showIndex = 0;
		this.showNextReward();
	}

	private showNextReward() {
		const { data, _step, _showIndex } = this;
		const rewards = data.rewards.slice(_showIndex, _showIndex + _step);
		this._showIndex += _step;
		this.view.showRewards(rewards);
	}

	private async onBtnBgClick() {
		if (this._showIndex >= this.data.rewards.length) {
			this.closeSelf();
		} else {
			await this.view.onCloseAni();
			this.showNextReward();
		}
	}
}