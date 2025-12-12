/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead1View } from "../../view/PkgCommon/view/coms/ComHead1View";

export default class RenderBagSkinItem1 extends fgui.GButton {

	protected com_head: ComHead1View;
	public static url: string = "ui://vith2b66gsi2obbq";

	public static createInstance(): RenderBagSkinItem1 {
		return <RenderBagSkinItem1>(fgui.UIPackage.createObject("PkgMain", "RenderBagSkinItem1"));
	}

	protected override onConstruct(): void {
		this.com_head = <ComHead1View>(this.getChildAt(0));
	}
}