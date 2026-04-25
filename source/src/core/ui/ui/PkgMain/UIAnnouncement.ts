/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComAnnounceLeftView } from "../../view/PkgMain/view/coms/ComAnnounceLeftView";
import { ComAnnounceContentView } from "../../view/PkgMain/view/coms/ComAnnounceContentView";

export default class UIAnnouncement extends fgui.GComponent {

	protected ctrl_empty: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected loader_bg: fgui.GLoader;
	protected btn_close: fgui.GButton;
	protected com_tab: ComAnnounceLeftView;
	protected com_content: ComAnnounceContentView;
	public static url: string = "ui://vith2b66ktwpob9v";

	public static createInstance(): UIAnnouncement {
		return <UIAnnouncement>(fgui.UIPackage.createObject("PkgMain", "UIAnnouncement"));
	}

	protected override onConstruct(): void {
		this.ctrl_empty = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.loader_bg = <fgui.GLoader>(this.getChildAt(2));
		this.btn_close = <fgui.GButton>(this.getChildAt(3));
		this.com_tab = <ComAnnounceLeftView>(this.getChildAt(4));
		this.com_content = <ComAnnounceContentView>(this.getChildAt(5));
	}
}