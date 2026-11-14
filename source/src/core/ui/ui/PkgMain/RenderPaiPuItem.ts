/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { RenderPaiPuItem2View } from "../../view/PkgMain/view/renders/RenderPaiPuItem2View";

export default class RenderPaiPuItem extends GComponentView {

	protected ctrl_fold: fgui.Controller;
	protected ctrl_siMa: fgui.Controller;
	protected btn_rename: fgui.GButton;
	protected btn_collect: fgui.GButton;
	protected btn_share: fgui.GButton;
	protected btn_maka: fgui.GButton;
	protected btn_look: fgui.GButton;
	protected com_info0: RenderPaiPuItem2View;
	protected com_info1: RenderPaiPuItem2View;
	protected com_info2: RenderPaiPuItem2View;
	protected com_info3: RenderPaiPuItem2View;
	protected txt_name: fgui.GTextField;
	protected txt_time: fgui.GTextField;
	public static url: string = "ui://vith2b66ftegobjf";

	public static createInstance(): RenderPaiPuItem {
		return <RenderPaiPuItem>(fgui.UIPackage.createObject("PkgMain", "RenderPaiPuItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_fold = this.getControllerAt(0);
		this.ctrl_siMa = this.getControllerAt(1);
		this.btn_rename = <fgui.GButton>(this.getChildAt(1));
		this.btn_collect = <fgui.GButton>(this.getChildAt(2));
		this.btn_share = <fgui.GButton>(this.getChildAt(3));
		this.btn_maka = <fgui.GButton>(this.getChildAt(4));
		this.btn_look = <fgui.GButton>(this.getChildAt(5));
		this.com_info0 = <RenderPaiPuItem2View>(this.getChildAt(8));
		this.com_info1 = <RenderPaiPuItem2View>(this.getChildAt(9));
		this.com_info2 = <RenderPaiPuItem2View>(this.getChildAt(10));
		this.com_info3 = <RenderPaiPuItem2View>(this.getChildAt(11));
		this.txt_name = <fgui.GTextField>(this.getChildAt(12));
		this.txt_time = <fgui.GTextField>(this.getChildAt(13));
	}
}