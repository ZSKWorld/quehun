/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UITreasure extends ViewBase(fgui.GComponent) {

	protected com_back: ComBackView;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66qke2ob9r";

	public static createInstance(): UITreasure {
		return <UITreasure>(fgui.UIPackage.createObject("PkgMain", "UITreasure"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.trans_show = this.getTransitionAt(0);
	}
}