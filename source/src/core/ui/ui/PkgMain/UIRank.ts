/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIRank extends fgui.GComponent {

	public com_back: ComBackView;
	public static url: string = "ui://vith2b66ktwpob9u";

	public static createInstance(): UIRank {
		return <UIRank>(fgui.UIPackage.createObject("PkgMain", "UIRank"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}