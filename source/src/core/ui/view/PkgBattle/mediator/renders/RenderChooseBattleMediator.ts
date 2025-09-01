import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { BattleType } from "../../../../../userData/const/BattleEnums";
import { RenderChooseBattleMsg, RenderChooseBattleView } from "../../view/renders/RenderChooseBattleView";
import { UIBattleConfirmData } from "../UIBattleConfirmMediator";

export class RenderChooseBattleMediator extends MediatorBase<RenderChooseBattleView, BattleType> {
	private _cfgData: BattleCfgData;
	private _time: number = 0;

	override onAwake() {
		this.addEvent(RenderChooseBattleMsg.OnGraphTouchClick, this.onGraphBgClick);
		this.addEvent(RenderChooseBattleMsg.OnBtnBreakClick, this.onBtnBreakClick);
	}

	override onUpdate() {
		this._time += Laya.timer.delta;
		if (this._time >= 1000) {
			this._time = 0;
			const { _cfgData, data, view } = this;
			switch (data) {
				case BattleType.Boss: view.refreshBossCool(_cfgData as CfgBossData); break;
				case BattleType.Gather: view.refreshGatherCool(_cfgData as CfgGatherData); break;
			}
		}
	}

	setData(data: BattleType, cfgData: BattleCfgData) {
		this.data = data;
		this._cfgData = cfgData;
		this.view.refreshByType(this.data, cfgData);
	}

	override onDisable() {
		this._cfgData = null;
	}

	private onGraphBgClick() {
		this.openView<UIBattleConfirmData>(ViewID.UIBattleConfirmView, { type: this.data, data: this._cfgData });
	}

	private onBtnBreakClick() {
		netService.breakOffGather({ id: this._cfgData.id });
	}

}