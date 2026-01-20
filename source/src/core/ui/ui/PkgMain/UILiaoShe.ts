/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComDecorateView } from "../../view/PkgMain/view/coms/ComDecorateView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UILiaoShe extends fgui.GComponent {

	protected com_back: ComBackView;
	protected btn_char: fgui.GButton;
	protected btn_deco: fgui.GButton;
	protected com_decorate: ComDecorateView;
	public static url: string = "ui://vith2b66co9gob9l";

	public static createInstance(): UILiaoShe {
		return <UILiaoShe>(fgui.UIPackage.createObject("PkgMain", "UILiaoShe"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_char = <fgui.GButton>(this.getChildAt(2));
		this.btn_deco = <fgui.GButton>(this.getChildAt(3));
		this.com_decorate = <ComDecorateView>(this.getChildAt(4));
	}
}