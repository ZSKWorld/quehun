/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UILiaoShe extends fgui.GComponent {

	public com_back: ComBackView;
	public static url: string = "ui://vith2b66co9gob9l";

	public static createInstance(): UILiaoShe {
		return <UILiaoShe>(fgui.UIPackage.createObject("PkgMain", "UILiaoShe"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}