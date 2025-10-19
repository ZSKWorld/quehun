import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EComMatchModeShowType } from "../../event/MainDefine";
import { ComMatchModeView, EComMatchModeMsg } from "../../view/coms/ComMatchModeView";

export interface IComMatchModeData {

}

export class ComMatchModeMediator extends MediatorBase<ComMatchModeView, IComMatchModeData> {


	override onAwake() {
		this.addEvent(EComMatchModeMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addEvent(EComMatchModeMsg.OnBtnRankModeClick, this.setShowType, [EComMatchModeShowType.RankMode1]);
		this.addEvent(EComMatchModeMsg.OnBtnMatchModeClick, this.setShowType, [EComMatchModeShowType.MatchMode1]);
		this.addEvent(EComMatchModeMsg.OnBtnFriendModeClick, this.setShowType, [EComMatchModeShowType.FriendMode]);
	}

	private setShowType(type: EComMatchModeShowType) {
		this.view.setShowType(type);
	}

	private onBtnBackClick() {
		this.view.setShowType(this.view.lastMode);
	}
}