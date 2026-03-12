import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EComMatchModeShowType } from "../../MainDefine";
import { ComMatchModeView, EComMatchModeMsg } from "../../view/coms/ComMatchModeView";

export class ComMatchModeMediator extends MediatorBase<ComMatchModeView, IComMatchModeData> {
	private _curMode = EComMatchModeShowType.Mode;

	override onAwake() {
		this.addEvent(EComMatchModeMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addEvent(EComMatchModeMsg.OnBtnRankModeClick, this.setShowType, [EComMatchModeShowType.RankMode1]);
		this.addEvent(EComMatchModeMsg.OnBtnMatchModeClick, this.setShowType, [EComMatchModeShowType.MatchMode1]);
		this.addEvent(EComMatchModeMsg.OnBtnFriendModeClick, this.setShowType, [EComMatchModeShowType.FriendMode]);
	}

	private onBtnBackClick() {
		this.setShowType(this.getBackMode());
	}

	private setShowType(type: EComMatchModeShowType) {
		const lastType = this._curMode;
		if (type == lastType) return;
		this._curMode = type;
		this.view.setShowType(type, lastType);
	}

	private getBackMode() {
		const type = this._curMode;
		switch (type) {
			case EComMatchModeShowType.RankMode2: return EComMatchModeShowType.RankMode1;
			case EComMatchModeShowType.MatchMode2: return EComMatchModeShowType.MatchMode2;
			case EComMatchModeShowType.Mode:
			case EComMatchModeShowType.RankMode1:
			case EComMatchModeShowType.MatchMode1:
			case EComMatchModeShowType.FriendMode:
			default: return EComMatchModeShowType.Mode;
		}
	}
}