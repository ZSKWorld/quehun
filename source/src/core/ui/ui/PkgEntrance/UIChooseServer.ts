/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class UIChooseServer extends ViewBase(fgui.GComponent) {

	protected list_server: fgui.GList;
	protected btn_enterGame: fgui.GButton;
	protected btn_lastServer: fgui.GButton;
	public static url: string = "ui://8tw6j59fhrq54";

	public static createInstance(): UIChooseServer {
		return <UIChooseServer>(fgui.UIPackage.createObject("PkgEntrance", "UIChooseServer"));
	}

	protected override onConstruct(): void {
		this.list_server = <fgui.GList>(this.getChildAt(1));
		this.btn_enterGame = <fgui.GButton>(this.getChildAt(6));
		this.btn_lastServer = <fgui.GButton>(this.getChildAt(7));
	}
}