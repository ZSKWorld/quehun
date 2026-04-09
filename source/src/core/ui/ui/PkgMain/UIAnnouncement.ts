/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComAnnounceLeftView } from "../../view/PkgMain/view/coms/ComAnnounceLeftView";
import { ComAnnounceContentView } from "../../view/PkgMain/view/coms/ComAnnounceContentView";

export default class UIAnnouncement extends fgui.GComponent {

	protected loader_bg: fgui.GLoader;
	protected com_tab: ComAnnounceLeftView;
	protected com_content: ComAnnounceContentView;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9v";

	public static createInstance(): UIAnnouncement {
		return <UIAnnouncement>(fgui.UIPackage.createObject("PkgMain", "UIAnnouncement"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.com_tab = <ComAnnounceLeftView>(this.getChildAt(1));
		this.com_content = <ComAnnounceContentView>(this.getChildAt(2));
		this.btn_close = <fgui.GButton>(this.getChildAt(3));
	}
}