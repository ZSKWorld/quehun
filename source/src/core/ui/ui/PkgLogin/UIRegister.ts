/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnCheckView } from "../../view/PkgCommon/view/btns/BtnCheckView";

export default class UIRegister extends fgui.GComponent {

	public btn_close: fgui.GButton;
	public btn_back: fgui.GButton;
	public btn_agreement: BtnCheckView;
	public txt_protocol: fgui.GRichTextField;
	public static url: string = "ui://vs9845atmj5kb6u";

	public static createInstance(): UIRegister {
		return <UIRegister>(fgui.UIPackage.createObject("PkgLogin", "UIRegister"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(3));
		this.btn_back = <fgui.GButton>(this.getChildAt(4));
		this.btn_agreement = <BtnCheckView>(this.getChildAt(5));
		this.txt_protocol = <fgui.GRichTextField>(this.getChildAt(28));
	}
}