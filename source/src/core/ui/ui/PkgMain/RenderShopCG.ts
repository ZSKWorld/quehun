/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderShopCG extends fgui.GComponent {

	protected com_item: ComItemView;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vith2b66fpd2obgw";

	public static createInstance(): RenderShopCG {
		return <RenderShopCG>(fgui.UIPackage.createObject("PkgMain", "RenderShopCG"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(0));
		this.txt_name = <fgui.GTextField>(this.getChildAt(8));
	}
}