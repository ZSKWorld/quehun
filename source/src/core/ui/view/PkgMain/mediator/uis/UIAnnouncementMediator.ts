import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIAnnouncementMsg, UIAnnouncementView } from "../../view/uis/UIAnnouncementView";

export interface IUIAnnouncementData {

}

export class UIAnnouncementMediator extends MediatorBase<UIAnnouncementView, IUIAnnouncementData> {
	private _selectIndex = 0;

	override onAwake() {
		this.addEvent(EUIAnnouncementMsg.OnTabSelectChanged, this.onTabSelectChanged);
	}

	override onEnable() {
		this._selectIndex = 0;
		this.onAnnouncementChanged();
	}

	@InterestUserEvent(EUserEvent.OnAnnouncementChanged)
	private onAnnouncementChanged() {
		const announcement = $userData.announcement;
		const tabData: [string, boolean][] = announcement.announcements.map(v => [v.title, announcement.isRead(v.id)]);
		this._selectIndex = $mathUtil.clamp(this._selectIndex, 0, tabData.length - 1);
		this.view.refreshTab(tabData, this._selectIndex);
	}

	private onTabSelectChanged(index: number) {
		this._selectIndex = index;
		this.view.refreshContent($userData.announcement.announcements[index]);
	}
}