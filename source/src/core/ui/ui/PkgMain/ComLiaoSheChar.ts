/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComLiaoSheChar extends ViewBase(fgui.GComponent) {

	protected list_chars: fgui.GList;
	protected btn_sort: fgui.GButton;
	protected btn_filter: fgui.GButton;
	protected btn_star: fgui.GButton;
	public static url: string = "ui://vith2b66k5qeobge";

	public static createInstance(): ComLiaoSheChar {
		return <ComLiaoSheChar>(fgui.UIPackage.createObject("PkgMain", "ComLiaoSheChar"));
	}

	protected override onConstruct(): void {
		this.list_chars = <fgui.GList>(this.getChildAt(0));
		this.btn_sort = <fgui.GButton>(this.getChildAt(1));
		this.btn_filter = <fgui.GButton>(this.getChildAt(2));
		this.btn_star = <fgui.GButton>(this.getChildAt(3));
	}
}