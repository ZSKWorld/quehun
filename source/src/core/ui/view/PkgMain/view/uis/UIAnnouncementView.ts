import UIAnnouncement from "../../../../ui/PkgMain/UIAnnouncement";
import { EUIAnnounceEvent } from "../../Definition";

export class UIAnnouncementView extends ExtensionClass<IView, UIAnnouncement>(UIAnnouncement) implements IView {
	private _announcements: ProtoObject<IAnnouncement>[];

	override onCreate() {
		const { btn_mask, btn_close, com_tab } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		com_tab.on(EUIAnnounceEvent.OnTabSelectChanged, this, this.onTabSelectChanged);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4140);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	refreshTab(announcements: ProtoObject<IAnnouncement>[], selectAnnouncementId: number) {
		this._announcements = announcements;
		this.ctrl_empty.selectedIndex = announcements.length > 0 ? 0 : 1;
		if (announcements.length > 0) {
			const tabData: [number, string, boolean][] = announcements.map(v => [v.id, v.title, $user.announcement.isRead(v.id)]);
			this.com_tab.refresh(tabData, selectAnnouncementId);
		}
	}

	refreshContent(announcement: ProtoObject<IAnnouncement>) {
		this.com_content.refresh(announcement);
	}

	private onTabSelectChanged(index: number) {
		this.sendEvent(EUIAnnounceEvent.OnTabSelectChanged, index);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
