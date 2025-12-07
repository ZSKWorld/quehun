/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class BtnItem1 extends fgui.GButton {

	protected com_item: ComItemView;
	public static url: string = "ui://vx9zwserq5yiobc2";

	public static createInstance(): BtnItem1 {
		return <BtnItem1>(fgui.UIPackage.createObject("PkgCommon", "BtnItem1"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(1));
	}
}