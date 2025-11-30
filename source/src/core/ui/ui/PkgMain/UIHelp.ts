/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIHelp extends fgui.GComponent {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b66ktwpob9x";

	public static createInstance(): UIHelp {
		return <UIHelp>(fgui.UIPackage.createObject("PkgMain", "UIHelp"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}