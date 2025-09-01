import { GameUtil } from "../../../../common/utils/GameUtil";
import UIBattle from "../../../ui/PkgBattle/UIBattle";

export const enum UIBattleMsg {
	OnBtnOfflineClick = "UIBattle_OnBtnOfflineClick",
	OnBtnEnemyInfoClick = "UIBattle_OnBtnEnemyInfoClick",
	OnBtnExitClick = "UIBattle_OnBtnExitClick",
}

export class UIBattleView extends ExtensionClass<IView, UIBattle>(UIBattle) implements IView {

	override onCreate() {
		const { btn_offline, btn_enemyInfo, btn_exit, graph_enemyInfoBg, ctrlState } = this;
		btn_offline.onClick(this, this.sendEvent, [UIBattleMsg.OnBtnOfflineClick]);
		btn_enemyInfo.onClick(this, this.sendEvent, [UIBattleMsg.OnBtnEnemyInfoClick]);
		btn_exit.onClick(this, this.sendEvent, [UIBattleMsg.OnBtnExitClick]);
		graph_enemyInfoBg.onClick(this, () => ctrlState.selectedIndex = 0);
	}

	refreshTitle(data: BattleCfgData) {
		data = data as Exclude<BattleCfgData, CfgGatherData>;
		const { txt_title } = this;
		const dropStr = GameUtil.getItemString(data.randomDrapOut ? data.baseDrapOut.concat(data.randomDrapOut) : data.baseDrapOut, false);
		txt_title.text = `消耗：${ data.vigorCost }精力<br/>掉落：${ dropStr }${ data.desc }`;
	}

	clearContent() {
		const { ctrlState, txt_title, pro_wave, pro_exp, txt_userName, txt_enemyName, pro_userHp, pro_enemyHp, list_log, txt_enemyInfo } = this;
		ctrlState.selectedIndex = 0;
		txt_title.text = "";
		pro_wave.max = pro_wave.value = 0;
		pro_exp.max = pro_exp.value = 0;
		txt_userName.text = "";
		txt_enemyName.text = "";
		pro_userHp.max = pro_userHp.value = 0;
		pro_enemyHp.max = pro_enemyHp.value = 0;
		list_log.numItems = 0;
		txt_enemyInfo.text = "";
	}
}
