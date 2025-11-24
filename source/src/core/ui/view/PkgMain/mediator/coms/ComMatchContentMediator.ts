import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EComMatchModeShowType } from "../../define/MainDefine";
import { ComMatchContentView } from "../../view/coms/ComMatchContentView";


export class ComMatchContentMediator extends MediatorBase<ComMatchContentView, EComMatchModeShowType> {

	override onAwake() {

	}

	protected override onDataChanged(data: EComMatchModeShowType) {
		switch (data) {
			case EComMatchModeShowType.RankMode1: this.view.refreshRankMode1(); break;
			case EComMatchModeShowType.MatchMode1: this.view.refreshMatchMode1(); break;
			case EComMatchModeShowType.FriendMode: this.view.refreshFriendMode(); break;
			case EComMatchModeShowType.RankMode2: this.view.refreshRankMode2(); break;
			case EComMatchModeShowType.MatchMode2: this.view.refreshMatchMode2(); break;
		}
	}
}