/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderBagItem extends fgui.GComponent {

	protected com_item: ComItemView;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66q5yiobbn";

	public static createInstance(): RenderBagItem {
		return <RenderBagItem>(fgui.UIPackage.createObject("PkgMain", "RenderBagItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(0));
		this.txt_count = <fgui.GTextField>(this.getChildAt(1));
	}
}