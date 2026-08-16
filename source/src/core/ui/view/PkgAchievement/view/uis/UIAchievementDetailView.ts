import UIAchievementDetail from "../../../../ui/PkgAchievement/UIAchievementDetail";
import { RenderAchieveDetailGroupView } from "../renders/RenderAchieveDetailGroupView";
import { RenderAchieveDetailItemView } from "../renders/RenderAchieveDetailItemView";

export const enum EUIAchievementDetailMsg {

}

export class UIAchievementDetailView extends UIAchievementDetail {
	private _selectItem: RenderAchieveDetailGroupView;

	override onCreate() {
		const { com_back, list_group, list_item } = this;
		com_back.onBackClick(this, this.closeSelf);
		$uiUtil.setList(list_group, true, this, (index, item: RenderAchieveDetailGroupView) => {
			item.refresh($user.achievement.statisticsInfo.groups[index]);
		}, (item: RenderAchieveDetailGroupView, _, index) => {
			if (item == this._selectItem) return;
			item.setSelect(true, true);
			this._selectItem.setSelect(false, true);
			this._selectItem = item;
			this.refreshItem(index);
		});
		list_group.on(fgui.Events.SCROLL, this, this.onListGroupScrolled);

		$uiUtil.setList(list_item, true, this, (index, item: RenderAchieveDetailItemView) => {
			const groupData = $user.achievement.statisticsInfo.groups[list_group.selectedIndex];
			const id = groupData.achievements[index];
			item.refresh(id, $user.achievement.getProgress(id));
		});
	}

	refresh(groupId: number, achieveId: number) {
		const { list_group } = this;
		const { groups } = $user.achievement.statisticsInfo;
		list_group.numItems = groups.length;
		list_group.scrollPane.setPosY(0);
		const index = groups.findIndex(v => v.id == groupId);
		list_group.scrollToView(index, false);
		list_group.selectedIndex = index;
		this._selectItem?.setSelect(false, false);
		const item = this._selectItem = list_group.getChildAt(list_group.itemIndexToChildIndex(index)) as RenderAchieveDetailGroupView;
		item && item.setSelect(true, false);
		this.onListGroupScrolled();
		this.refreshItem(index, achieveId);
	}

	private refreshItem(index: number, achieveId?: number) {
		const data = $user.achievement.statisticsInfo.groups[index];
		const { ctrl_type, list_item, com_itemTop } = this;
		ctrl_type.selectedIndex = data.percentage ? 0 : 1;
		data.percentage && com_itemTop.refresh(data);
		list_item.numItems = data.achievements.length;
		list_item.scrollPane.setPosY(0);
		const achieveIndex = data.achievements.indexOf(achieveId);
		if (achieveIndex >= 0) {
			list_item.scrollToView(achieveIndex, false, true);
		}
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}

	private onListGroupScrolled() {
		const { list_group, img_top, img_bottom } = this;
		const { viewHeight, contentHeight, percY } = list_group.scrollPane;
		img_top.visible = contentHeight > viewHeight && percY > 0;
		img_bottom.visible = contentHeight > viewHeight && percY < 1;
	}
}
