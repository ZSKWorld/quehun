/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIEmail extends fgui.GComponent {

	public com_back: ComBackView;
	public static url: string = "ui://vith2b66ktwpob9t";

	public static createInstance(): UIEmail {
		return <UIEmail>(fgui.UIPackage.createObject("PkgMain", "UIEmail"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}