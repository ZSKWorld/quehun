/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHeadView } from "../../view/PkgCommon/view/coms/ComHeadView";

export default class RenderBagSkinItem2 extends fgui.GButton {

	protected ctrl_lock: fgui.Controller;
	protected ctrl_dynamic: fgui.Controller;
	protected img_bg: fgui.GImage;
	protected com_head: ComHeadView;
	protected img_bound: fgui.GImage;
	protected txt_desc: fgui.GTextField;
	public static url: string = "ui://vith2b66gsi2obbz";

	public static createInstance(): RenderBagSkinItem2 {
		return <RenderBagSkinItem2>(fgui.UIPackage.createObject("PkgMain", "RenderBagSkinItem2"));
	}

	protected override onConstruct(): void {
		this.ctrl_lock = this.getControllerAt(0);
		this.ctrl_dynamic = this.getControllerAt(1);
		this.img_bg = <fgui.GImage>(this.getChildAt(0));
		this.com_head = <ComHeadView>(this.getChildAt(1));
		this.img_bound = <fgui.GImage>(this.getChildAt(7));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(8));
	}
}