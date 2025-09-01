import { NotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { BattleType } from "../../../../userData/const/BattleEnums";
import { UIBattleMsg, UIBattleView } from "../view/UIBattleView";

export interface UIBattleData {
	id: number;
	type: BattleType;
}

export class UIBattleMediator extends MediatorBase<UIBattleView, UIBattleData> {
	private _battleCfg: BattleCfgData;
	override onAwake() {
		this.addEvent(UIBattleMsg.OnBtnOfflineClick, this.onBtnOfflineClick);
		this.addEvent(UIBattleMsg.OnBtnEnemyInfoClick, this.onBtnEnemyInfoClick);
		this.addEvent(UIBattleMsg.OnBtnExitClick, this.onBtnExitClick);
	}

	override onEnable() {
		const { data, view } = this;
		view.clearContent();
		switch (this.data.type) {
			case BattleType.Level: this._battleCfg = cfgMgr.Level[data.id]; break;
			case BattleType.Copy: this._battleCfg = cfgMgr.Copy[data.id]; break;
			case BattleType.Secret: this._battleCfg = cfgMgr.Secret[data.id]; break;
			case BattleType.Boss: this._battleCfg = cfgMgr.Boss[data.id]; break;
		}
		view.refreshTitle(this._battleCfg);
	}

	private onBtnOfflineClick() {

	}

	private onBtnEnemyInfoClick() {

	}

	@ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
	private onBtnExitClick() {
		netService.exitBattle({});
	}

	@InterestNotify(NotifyConst.ExitBattle)
	private onExitBattle() {
		this.closeSelf();
	}
}