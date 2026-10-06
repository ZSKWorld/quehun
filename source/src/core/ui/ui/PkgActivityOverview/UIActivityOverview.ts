/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIActivityOverview extends GComponentView {

	protected btn_mask: fgui.GButton;
	protected loader_bg: fgui.GLoader;
	protected btn_back: fgui.GButton;
	protected list_list: fgui.GList;
	protected com_content: fgui.GComponent;
	public static url: string = "ui://iooyyksiktwpob9s";

	public static createInstance(): UIActivityOverview {
		return <UIActivityOverview>(fgui.UIPackage.createObject("PkgActivityOverview", "UIActivityOverview"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.loader_bg = <fgui.GLoader>(this.getChildAt(2));
		this.btn_back = <fgui.GButton>(this.getChildAt(3));
		this.list_list = <fgui.GList>(this.getChildAt(7));
		this.com_content = <fgui.GComponent>(this.getChildAt(8));
	}
}