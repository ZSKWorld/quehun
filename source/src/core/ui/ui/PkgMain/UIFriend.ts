/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIFriend extends fgui.GComponent {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b66qke2ob9m";

	public static createInstance(): UIFriend {
		return <UIFriend>(fgui.UIPackage.createObject("PkgMain", "UIFriend"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}