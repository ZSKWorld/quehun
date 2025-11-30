/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIShop extends fgui.GComponent {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b66qke2ob9q";

	public static createInstance(): UIShop {
		return <UIShop>(fgui.UIPackage.createObject("PkgMain", "UIShop"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}