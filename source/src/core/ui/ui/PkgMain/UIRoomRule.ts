/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIRoomRule extends GComponentView {

	protected btn_bg: fgui.GButton;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b669r5pobjq";

	public static createInstance(): UIRoomRule {
		return <UIRoomRule>(fgui.UIPackage.createObject("PkgMain", "UIRoomRule"));
	}

	protected override onConstruct(): void {
		this.btn_bg = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
	}
}