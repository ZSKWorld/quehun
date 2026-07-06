import { RadioGroup } from "../../../../extention/RadioGroup";
import UISevenDay from "../../../../ui/PkgMain/UISevenDay";
import { EUISevenDayEvent, EUISevenDayRenderClickEvent } from "../../Definition";

export class UISevenDayView extends ExtendClass<IView, UISevenDay>(UISevenDay) implements IView {
	private _tabGroup = new RadioGroup();

	override onCreate() {
		const {
			btn_mask, btn_close, btn_day0, btn_day1, btn_day2, btn_day3, btn_day4,
			btn_day5, btn_day6, com_task0, com_task1, com_task2, btn_qaClose,
			btn_answer0, btn_answer1, btn_answer2, btn_qaSkip, _tabGroup
		} = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);

		btn_qaClose.onClick(this, this.sendEvent, [EUISevenDayEvent.OnQABtnCloseClick]);
		btn_qaSkip.onClick(this, this.sendEvent, [EUISevenDayEvent.OnQABtnSkipClick]);
		[btn_answer0, btn_answer1, btn_answer2].forEach((v, i) => v.onClick(this, this.sendEvent, [EUISevenDayEvent.OnQABtnAnswerClick, i]));
		[com_task0, com_task1, com_task2].forEach(v => v.on(EUISevenDayEvent.OnTaskBtnClick, this, this.onTaskBtnClick));

		_tabGroup.init([
			btn_day0, btn_day1, btn_day2, btn_day3, btn_day4, btn_day5, btn_day6
		], this, this.onTabSelectChanged, EColorString._d4815c, EColorString._8d6f61);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, $langRes("myres/activity_qiri/img_4160.png"));
		$dynamicResMgr.setLoader(this.loader_char, $langRes("myres/activity_qiri/img_4207.png"));
		$dynamicResMgr.setLoader(this.loader_title, $langRes("myres/activity_qiri/img_3826.png"));
		$dynamicResMgr.setLoader(this.loader_qaTitle, $langRes("myres/activity_qiri/img_3717.png"));
	}

	setShowType(type: 0 | 1) {
		this.ctrl_type.selectedIndex = type;
	}

	refreshTask(index: number, finishDays: boolean[]) {
		const { _tabGroup, img_finishDay0, img_finishDay1, img_finishDay2, img_finishDay3, img_finishDay4, img_finishDay5, img_finishDay6 } = this;
		[img_finishDay0, img_finishDay1, img_finishDay2, img_finishDay3, img_finishDay4, img_finishDay5, img_finishDay6].forEach((v, i) => v.visible = finishDays[i]);
		if (index == _tabGroup.selectIndex)
			this.onTabSelectChanged(index);
		else
			_tabGroup.selectIndex = index;
	}

	refreshQuestion(data: ISheetData_Activity_TaskDisplay, answer: number, correct: boolean) {
		const { loader_qaBg, loader_qaChar, btn_answer0, btn_answer1, btn_answer2, btn_qaSkip, txt_qaTip } = this;
		$dynamicResMgr.setLoader(loader_qaBg, $langRes(`myres/activity_qiri/QA_${ data.day }.png`));
		$dynamicResMgr.setLoader(loader_qaChar, $langRes(`extendRes/emo/e200001/l_${ answer >= 0 ? (correct ? 4 : 3) : 1 }.png`));
		btn_answer0.refresh(answer == 0 ? (correct ? 1 : 2) : 0);
		btn_answer1.refresh(answer == 1 ? (correct ? 1 : 2) : 0);
		btn_answer2.refresh(answer == 2 ? (correct ? 1 : 2) : 0);
		btn_answer0.touchable = btn_answer1.touchable = btn_answer2.touchable = !correct;
		btn_qaSkip.visible = answer >= 0 && correct;
		txt_qaTip.visible = answer >= 0;
		txt_qaTip.langText(correct ? data.right_str : data.wrong_str);
	}

	refreshTaskItem(data: ISheetData_Activity_TaskDisplay[]) {
		this.com_task0.refresh(data[0]);
		this.com_task1.refresh(data[1]);
		this.com_task2.refresh(data[2]);
	}

	refreshRewards(rewardIds: number[]) {
		[this.com_reward0, this.com_reward1, this.com_reward2].forEach((v, i) => {
			const id = rewardIds[i];
			v.visible = !!id;
			v.visible && v.refreshItemIcon(id);
			v.visible && v.onClick(this, this.openView, [EViewID.UIItemDetailView, { id }]);
		});
	}

	private onTabSelectChanged(index: number) {
		this.sendEvent(EUISevenDayEvent.OnTabSelectChanged, index);
	}

	private onTaskBtnClick(event: EUISevenDayRenderClickEvent, data: ISheetData_Activity_TaskDisplay) {
		this.sendEvent(EUISevenDayEvent.OnTaskBtnClick, [event, data]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }

	override onDisable() {
		this._tabGroup.clearSelection();
		$dynamicResMgr.clearLoaders(this.loader_bg, this.loader_char, this.loader_title, this.loader_qaTitle, this.loader_qaBg, this.loader_qaChar);
	}
}
