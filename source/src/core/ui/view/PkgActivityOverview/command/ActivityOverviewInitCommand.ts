import { Command } from "../../../../mvc/controller/Command";
import { ActivityOverviewManager } from "../script/ActivityOverviewManager";
import { ComMatchRotView } from "../view/coms/ComMatchRotView";
import { ComNiuDanView } from "../view/coms/ComNiuDanView";
import { ComOfferRewardTaskView } from "../view/coms/ComOfferRewardTaskView";
import { ComQingYunView } from "../view/coms/ComQingYunView";
import { ComQuestionairView } from "../view/coms/ComQuestionairView";
import { ComResureCoinView } from "../view/coms/ComResureCoinView";
import { ComYueKaView } from "../view/coms/ComYueKaView";

export class ActivityOverviewInitCommand extends Command {
	override execute() {
		const inst = ActivityOverviewManager.Inst;
		const initActivityView = inst.initActivityView.bind(inst) as typeof inst.initActivityView;

		initActivityView(260511, $cfgMgr.activity.activity[260511].langField(ECfgLangField.name), ComQingYunView);
		initActivityView(230143, $cfgMgr.activity.activity[230143].langField(ECfgLangField.name), ComMatchRotView);
		initActivityView(260901, $cfgMgr.activity.activity[260901].langField(ECfgLangField.name), ComNiuDanView);

		initActivityView(1, 2235, ComOfferRewardTaskView);
		initActivityView(3, 2232, ComResureCoinView);
		initActivityView(4, 2839, ComYueKaView);
		let quest = $user.questionnaire.getBrief(EQuestionnaireType.Normal);
		quest && initActivityView(5, quest.title || "", ComQuestionairView);
		quest = $user.questionnaire.getBrief(EQuestionnaireType.Official);
		quest && initActivityView(6, quest.title || "", ComQuestionairView);
		quest = $user.questionnaire.getBrief(EQuestionnaireType.SiXiang);
		quest && initActivityView(7, quest.title || "", ComQuestionairView);
	}
}
