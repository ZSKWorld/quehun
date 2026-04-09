import UIAnnouncement from "../../../../ui/PkgMain/UIAnnouncement";
import { EUIAnnounceEvent } from "../../Definition";

export const enum EUIAnnouncementMsg {
	OnTabSelectChanged = "UIAnnouncement_OnTabSelectChanged",
}

export class UIAnnouncementView extends ExtensionClass<IView, UIAnnouncement>(UIAnnouncement) implements IView {

	override onCreate() {
		const { btn_close, com_tab } = this;
		btn_close.onClick(this, this.closeSelf);
		com_tab.on(EUIAnnounceEvent.OnTabSelectChanged, this, this.sendEvent, [EUIAnnouncementMsg.OnTabSelectChanged]);
	}

	refreshTab(data: [string, boolean][], index:number) {
		this.com_tab.refresh(data, index);
	}

	refreshContent(data: ProtoObject<IAnnouncement>) {
		this.com_content.refresh(data);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4140);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
