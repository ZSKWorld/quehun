/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComYueKa extends GComponentView {

	protected ctrl_state: fgui.Controller;
	protected ctrl_reward: fgui.Controller;
	protected loader_bg: fgui.GLoader;
	protected btn_buy: fgui.GButton;
	protected btn_get: fgui.GButton;
	protected txt_lastTime: fgui.GTextField;
	public static url: string = "ui://iooyyksi9vb30";

	public static createInstance(): ComYueKa {
		return <ComYueKa>(fgui.UIPackage.createObject("PkgActivityOverview", "ComYueKa"));
	}

	protected override onConstruct(): void {
		this.ctrl_state = this.getControllerAt(0);
		this.ctrl_reward = this.getControllerAt(1);
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.btn_buy = <fgui.GButton>(this.getChildAt(6));
		this.btn_get = <fgui.GButton>(this.getChildAt(9));
		this.txt_lastTime = <fgui.GTextField>(this.getChildAt(10));
	}
}