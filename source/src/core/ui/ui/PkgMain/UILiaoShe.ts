/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComDecorateView } from "../../view/PkgMain/view/coms/ComDecorateView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UILiaoShe extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_char: fgui.GButton;
	protected btn_deco: fgui.GButton;
	protected com_decorate: ComDecorateView;
	protected list_chars: fgui.GList;
	protected btn_sort: fgui.GButton;
	protected btn_filter: fgui.GButton;
	protected btn_star: fgui.GButton;
	protected trans_showDeco: fgui.Transition;
	protected trans_showChar: fgui.Transition;
	public static url: string = "ui://vith2b66co9gob9l";

	public static createInstance(): UILiaoShe {
		return <UILiaoShe>(fgui.UIPackage.createObject("PkgMain", "UILiaoShe"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_char = <fgui.GButton>(this.getChildAt(3));
		this.btn_deco = <fgui.GButton>(this.getChildAt(4));
		this.com_decorate = <ComDecorateView>(this.getChildAt(5));
		this.list_chars = <fgui.GList>(this.getChildAt(6));
		this.btn_sort = <fgui.GButton>(this.getChildAt(7));
		this.btn_filter = <fgui.GButton>(this.getChildAt(8));
		this.btn_star = <fgui.GButton>(this.getChildAt(9));
		this.trans_showDeco = this.getTransitionAt(0);
		this.trans_showChar = this.getTransitionAt(1);
	}
}