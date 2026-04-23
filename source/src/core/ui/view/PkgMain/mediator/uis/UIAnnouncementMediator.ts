import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIAnnounceEvent } from "../../Definition";
import { UIAnnouncementView } from "../../view/uis/UIAnnouncementView";

export interface IUIAnnouncementData {

}

export class UIAnnouncementMediator extends MediatorBase<UIAnnouncementView, IUIAnnouncementData> {
	private _curAnnouncement: ProtoObject<IAnnouncement>;

	override onAwake() {
		this.addEvent(EUIAnnounceEvent.OnTabSelectChanged, this.onTabSelectChanged);
	}

	override onEnable() {
		this.refreshAnnouncements();
	}

	override onDisable() {
		this._curAnnouncement = null;
	}

	@InterestUserEvent(EUserEvent.OnAnnouncementChanged)
	private refreshAnnouncements() {
		const announcementId = this._curAnnouncement?.id || 0;
		this.view.refreshTab($user.announcement.announcements, announcementId);
	}

	private onTabSelectChanged(index: number) {
		const curAnn = $user.announcement.announcements[index];
		this._curAnnouncement = curAnn;
		if (!$user.announcement.isRead(curAnn.id)) {
			$netMgr.requests.readAnnouncement({ announcement_id: curAnn.id });
		}
		this.view.refreshContent(curAnn);
	}
}