/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class ComItem1 extends ViewBase(fgui.GComponent) {

	protected com_item: ComItemView;
	public static url: string = "ui://vx9zwserq5yiobc2";

	public static createInstance(): ComItem1 {
		return <ComItem1>(fgui.UIPackage.createObject("PkgCommon", "ComItem1"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(1));
	}
}