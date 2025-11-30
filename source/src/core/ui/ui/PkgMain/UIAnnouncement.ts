/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIAnnouncement extends fgui.GComponent {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b66ktwpob9v";

	public static createInstance(): UIAnnouncement {
		return <UIAnnouncement>(fgui.UIPackage.createObject("PkgMain", "UIAnnouncement"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}