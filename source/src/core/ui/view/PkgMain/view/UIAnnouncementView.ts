import UIAnnouncement from "../../../ui/PkgMain/UIAnnouncement";

export const enum EUIAnnouncementMsg {

}

export class UIAnnouncementView extends ExtensionClass<IView, UIAnnouncement>(UIAnnouncement) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		
	}

}
