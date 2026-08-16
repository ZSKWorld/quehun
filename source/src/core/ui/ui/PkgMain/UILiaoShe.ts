/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComLiaoSheCharView } from "../../view/PkgMain/view/coms/ComLiaoSheCharView";
import { ComLiaoSheDecorateView } from "../../view/PkgMain/view/coms/ComLiaoSheDecorateView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UILiaoShe extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_skin: fgui.GButton;
	protected btn_look: fgui.GButton;
	protected btn_dynamic: fgui.GButton;
	protected btn_visit: fgui.GButton;
	protected txt_name: fgui.GTextField;
	protected txt_cvName: fgui.GTextField;
	protected btn_char: fgui.GButton;
	protected btn_deco: fgui.GButton;
	protected com_character: ComLiaoSheCharView;
	protected com_decorate: ComLiaoSheDecorateView;
	protected trans_show: fgui.Transition;
	protected trans_close: fgui.Transition;
	protected trans_toChar: fgui.Transition;
	protected trans_toDeco: fgui.Transition;
	public static url: string = "ui://vith2b66co9gob9l";

	public static createInstance(): UILiaoShe {
		return <UILiaoShe>(fgui.UIPackage.createObject("PkgMain", "UILiaoShe"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_skin = <fgui.GButton>(this.getChildAt(2));
		this.btn_look = <fgui.GButton>(this.getChildAt(3));
		this.btn_dynamic = <fgui.GButton>(this.getChildAt(4));
		this.btn_visit = <fgui.GButton>(this.getChildAt(7));
		this.txt_name = <fgui.GTextField>(this.getChildAt(8));
		this.txt_cvName = <fgui.GTextField>(this.getChildAt(9));
		this.btn_char = <fgui.GButton>(this.getChildAt(11));
		this.btn_deco = <fgui.GButton>(this.getChildAt(12));
		this.com_character = <ComLiaoSheCharView>(this.getChildAt(14));
		this.com_decorate = <ComLiaoSheDecorateView>(this.getChildAt(15));
		this.trans_show = this.getTransitionAt(0);
		this.trans_close = this.getTransitionAt(1);
		this.trans_toChar = this.getTransitionAt(2);
		this.trans_toDeco = this.getTransitionAt(3);
	}
}