import UIAchievementDetail from "../../../../ui/PkgAchievement/UIAchievementDetail";
import { RenderAchieveDetailGroupView } from "../renders/RenderAchieveDetailGroupView";

export const enum EUIAchievementDetailMsg {

}

export class UIAchievementDetailView extends ExtendClass<IView, UIAchievementDetail>(UIAchievementDetail) implements IView {
	private _selectItem: RenderAchieveDetailGroupView;

	override onCreate() {
		const { com_back, list_list } = this;
		com_back.onBackClick(this, this.closeSelf);
		$uiUtil.setList(list_list, true, this, (index, item: RenderAchieveDetailGroupView) => {
			const data = $user.achievement.statisticsInfo.groups[index];
			item.refresh(data.id, data.progress, data.haveReward);
		}, (item: RenderAchieveDetailGroupView, _, index) => {
			if (item == this._selectItem) return;
			item.setSelect(true, true);
			this._selectItem.setSelect(false, true);
			this._selectItem = item;
		});
		list_list.on(fgui.Events.SCROLL, this, this.onListScrolled);
	}

	refresh(index: number) {
		const { com_stat, list_list } = this;
		const { gold, silver, copper, total, groups } = $user.achievement.statisticsInfo;
		com_stat.refresh(gold, silver, copper, total);
		list_list.numItems = groups.length;
		if (index < 0 || index >= groups.length) index = 0;
		this.list_list.scrollPane.setPosY(0);
		list_list.scrollToView(index, false);
		list_list.selectedIndex = index;
		this._selectItem?.setSelect(false, false);
		const item = this._selectItem = list_list.getChildAt(list_list.itemIndexToChildIndex(index)) as RenderAchieveDetailGroupView;
		item && item.setSelect(true, false);
		this.onListScrolled();
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}

	private onListScrolled() {
		const { list_list, img_top, img_bottom } = this;
		const { viewHeight, contentHeight, percY } = list_list.scrollPane;
		img_top.visible = contentHeight > viewHeight && percY > 0;
		img_bottom.visible = contentHeight > viewHeight && percY < 1;
	}
}
