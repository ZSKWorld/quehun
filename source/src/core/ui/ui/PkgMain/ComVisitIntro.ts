/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComVisitCharInfoView } from "../../view/PkgMain/view/coms/ComVisitCharInfoView";
import { BtnVisitHeartView } from "../../view/PkgMain/view/btns/BtnVisitHeartView";

export default class ComVisitIntro extends fgui.GComponent {

	protected ctrl_char: fgui.Controller;
	protected ctrl_gift: fgui.Controller;
	protected com_charInfo: ComVisitCharInfoView;
	protected btn_close: fgui.GButton;
	protected btn_heart0: BtnVisitHeartView;
	protected btn_heart1: BtnVisitHeartView;
	protected btn_heart2: BtnVisitHeartView;
	protected btn_heart3: BtnVisitHeartView;
	protected btn_heart4: BtnVisitHeartView;
	protected btn_qiyue: fgui.GButton;
	protected btn_zengli: fgui.GButton;
	public static url: string = "ui://vith2b669c0bobj7";

	public static createInstance(): ComVisitIntro {
		return <ComVisitIntro>(fgui.UIPackage.createObject("PkgMain", "ComVisitIntro"));
	}

	protected override onConstruct(): void {
		this.ctrl_char = this.getControllerAt(0);
		this.ctrl_gift = this.getControllerAt(1);
		this.com_charInfo = <ComVisitCharInfoView>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_heart0 = <BtnVisitHeartView>(this.getChildAt(7));
		this.btn_heart1 = <BtnVisitHeartView>(this.getChildAt(8));
		this.btn_heart2 = <BtnVisitHeartView>(this.getChildAt(9));
		this.btn_heart3 = <BtnVisitHeartView>(this.getChildAt(10));
		this.btn_heart4 = <BtnVisitHeartView>(this.getChildAt(11));
		this.btn_qiyue = <fgui.GButton>(this.getChildAt(12));
		this.btn_zengli = <fgui.GButton>(this.getChildAt(13));
	}
}