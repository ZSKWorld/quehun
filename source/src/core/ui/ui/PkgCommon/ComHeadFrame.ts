/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComHeadFrame extends GComponentView {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserc6l6obf8";

	public static createInstance(): ComHeadFrame {
		return <ComHeadFrame>(fgui.UIPackage.createObject("PkgCommon", "ComHeadFrame"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}