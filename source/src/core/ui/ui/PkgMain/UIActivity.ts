/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class UIActivity extends ViewBase(fgui.GComponent) {

	protected loader_bg: fgui.GLoader;
	protected btn_back: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9s";

	public static createInstance(): UIActivity {
		return <UIActivity>(fgui.UIPackage.createObject("PkgMain", "UIActivity"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.btn_back = <fgui.GButton>(this.getChildAt(1));
	}
}