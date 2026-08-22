/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComSettingLang extends GComponentView {

	protected btn_langSet: fgui.GButton;
	public static url: string = "ui://vx9zwserfip2oblg";

	public static createInstance(): ComSettingLang {
		return <ComSettingLang>(fgui.UIPackage.createObject("PkgCommon", "ComSettingLang"));
	}

	protected override onConstruct(): void {
		this.btn_langSet = <fgui.GButton>(this.getChildAt(2));
	}
}