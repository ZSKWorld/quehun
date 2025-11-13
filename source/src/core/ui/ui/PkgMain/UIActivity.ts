/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIActivity extends fgui.GComponent {

	public com_back: ComBackView;
	public static url: string = "ui://vith2b66ktwpob9s";

	public static createInstance(): UIActivity {
		return <UIActivity>(fgui.UIPackage.createObject("PkgMain", "UIActivity"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}