/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class ComSevenDayItem1 extends fgui.GComponent {

	protected com_item: ComItemView;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66afneobi1";

	public static createInstance(): ComSevenDayItem1 {
		return <ComSevenDayItem1>(fgui.UIPackage.createObject("PkgMain", "ComSevenDayItem1"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(0));
		this.txt_count = <fgui.GTextField>(this.getChildAt(3));
	}
}