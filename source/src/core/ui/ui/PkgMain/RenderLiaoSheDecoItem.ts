/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderLiaoSheDecoItem extends fgui.GButton {

	protected ctrl_type: fgui.Controller;
	protected com_item: ComItem1View;
	protected img_select: fgui.GImage;
	protected img_selected: fgui.GImage;
	protected btn_play: fgui.GButton;
	protected txt_bgmName: fgui.GTextField;
	public static url: string = "ui://vith2b66lswhobie";

	public static createInstance(): RenderLiaoSheDecoItem {
		return <RenderLiaoSheDecoItem>(fgui.UIPackage.createObject("PkgMain", "RenderLiaoSheDecoItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_item = <ComItem1View>(this.getChildAt(1));
		this.img_select = <fgui.GImage>(this.getChildAt(3));
		this.img_selected = <fgui.GImage>(this.getChildAt(4));
		this.btn_play = <fgui.GButton>(this.getChildAt(10));
		this.txt_bgmName = <fgui.GTextField>(this.getChildAt(11));
	}
}