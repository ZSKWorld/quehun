/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIInfo extends GComponentView {

	protected com_mask: fgui.GComponent;
	protected btn_close: fgui.GButton;
	protected label_content: fgui.GLabel;
	protected btn_confirm: fgui.GButton;
	public static url: string = "ui://vx9zwserz3vjobns";

	public static createInstance(): UIInfo {
		return <UIInfo>(fgui.UIPackage.createObject("PkgCommon", "UIInfo"));
	}

	protected override onConstruct(): void {
		this.com_mask = <fgui.GComponent>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.label_content = <fgui.GLabel>(this.getChildAt(3));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(4));
	}
}