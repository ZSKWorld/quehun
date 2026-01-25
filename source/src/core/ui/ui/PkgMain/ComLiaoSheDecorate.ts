/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnSwitch1View } from "../../view/PkgCommon/view/btns/BtnSwitch1View";

export default class ComLiaoSheDecorate extends fgui.GComponent {

	protected list_tab: fgui.GList;
	protected list_view: fgui.GList;
	protected btn_save: fgui.GButton;
	protected btn_preview: fgui.GButton;
	protected btn_random: BtnSwitch1View;
	protected btn_closePreview: fgui.GButton;
	protected btn_editViewName: fgui.GButton;
	protected txt_viewName: fgui.GTextField;
	protected txt_title: fgui.GTextField;
	public static url: string = "ui://vith2b66glpbobfu";

	public static createInstance(): ComLiaoSheDecorate {
		return <ComLiaoSheDecorate>(fgui.UIPackage.createObject("PkgMain", "ComLiaoSheDecorate"));
	}

	protected override onConstruct(): void {
		this.list_tab = <fgui.GList>(this.getChildAt(0));
		this.list_view = <fgui.GList>(this.getChildAt(1));
		this.btn_save = <fgui.GButton>(this.getChildAt(4));
		this.btn_preview = <fgui.GButton>(this.getChildAt(6));
		this.btn_random = <BtnSwitch1View>(this.getChildAt(7));
		this.btn_closePreview = <fgui.GButton>(this.getChildAt(8));
		this.btn_editViewName = <fgui.GButton>(this.getChildAt(9));
		this.txt_viewName = <fgui.GTextField>(this.getChildAt(10));
		this.txt_title = <fgui.GTextField>(this.getChildAt(11));
	}
}