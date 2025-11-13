/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UICamera extends fgui.GComponent {

	public com_back: ComBackView;
	public static url: string = "ui://vith2b66ktwpob9y";

	public static createInstance(): UICamera {
		return <UICamera>(fgui.UIPackage.createObject("PkgMain", "UICamera"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}