/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComLiaoSheCharView } from "../../view/PkgMain/view/coms/ComLiaoSheCharView";
import { ComLiaoSheDecorateView } from "../../view/PkgMain/view/coms/ComLiaoSheDecorateView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UILiaoShe extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_skin: fgui.GButton;
	protected btn_look: fgui.GButton;
	protected btn_dynamic: fgui.GButton;
	protected btn_char: fgui.GButton;
	protected btn_deco: fgui.GButton;
	protected com_character: ComLiaoSheCharView;
	protected com_decorate: ComLiaoSheDecorateView;
	protected trans_show1: fgui.Transition;
	protected trans_show2: fgui.Transition;
	protected trans_close1: fgui.Transition;
	protected trans_close2: fgui.Transition;
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
		this.btn_char = <fgui.GButton>(this.getChildAt(6));
		this.btn_deco = <fgui.GButton>(this.getChildAt(7));
		this.com_character = <ComLiaoSheCharView>(this.getChildAt(9));
		this.com_decorate = <ComLiaoSheDecorateView>(this.getChildAt(10));
		this.trans_show1 = this.getTransitionAt(0);
		this.trans_show2 = this.getTransitionAt(1);
		this.trans_close1 = this.getTransitionAt(2);
		this.trans_close2 = this.getTransitionAt(3);
		this.trans_toChar = this.getTransitionAt(4);
		this.trans_toDeco = this.getTransitionAt(5);
	}
}