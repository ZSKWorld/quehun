/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHeadView } from "../../view/PkgCommon/view/coms/ComHeadView";

export default class RenderLiaoSheChar extends fgui.GButton {

	protected loader_bg: fgui.GLoader;
	protected com_head: ComHeadView;
	protected loader_border: fgui.GLoader;
	protected loader_nameBg: fgui.GLoader;
	protected btn_star: fgui.GButton;
	protected img_using: fgui.GImage;
	protected img_redDot: fgui.GImage;
	protected img_new: fgui.GImage;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vith2b66s5z8obfv";

	public static createInstance(): RenderLiaoSheChar {
		return <RenderLiaoSheChar>(fgui.UIPackage.createObject("PkgMain", "RenderLiaoSheChar"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(1));
		this.com_head = <ComHeadView>(this.getChildAt(2));
		this.loader_border = <fgui.GLoader>(this.getChildAt(3));
		this.loader_nameBg = <fgui.GLoader>(this.getChildAt(4));
		this.btn_star = <fgui.GButton>(this.getChildAt(5));
		this.img_using = <fgui.GImage>(this.getChildAt(6));
		this.img_redDot = <fgui.GImage>(this.getChildAt(7));
		this.img_new = <fgui.GImage>(this.getChildAt(8));
		this.txt_name = <fgui.GTextField>(this.getChildAt(9));
	}
}