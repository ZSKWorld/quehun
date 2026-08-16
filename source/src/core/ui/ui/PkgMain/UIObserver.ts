/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIObserver extends ViewBase(fgui.GComponent) {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b66qke2ob9n";

	public static createInstance(): UIObserver {
		return <UIObserver>(fgui.UIPackage.createObject("PkgMain", "UIObserver"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}