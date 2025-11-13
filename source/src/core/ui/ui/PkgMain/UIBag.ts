/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIBag extends fgui.GComponent {

	public com_back: ComBackView;
	public btn_test: fgui.GButton;
	public static url: string = "ui://vith2b66qke2ob9p";

	public static createInstance(): UIBag {
		return <UIBag>(fgui.UIPackage.createObject("PkgMain", "UIBag"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_test = <fgui.GButton>(this.getChildAt(1));
	}
}