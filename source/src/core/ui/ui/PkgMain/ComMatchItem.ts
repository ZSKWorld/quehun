/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComMatchItem extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected btn_bg: fgui.GButton;
	protected loader_icon: fgui.GLoader;
	protected btn_info: fgui.GButton;
	protected img_rest: fgui.GImage;
	protected img_unmet1: fgui.GImage;
	protected img_unmet2: fgui.GImage;
	protected txt_time: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	protected img_delete: fgui.GImage;
	public static url: string = "ui://vith2b66gnjqob9j";

	public static createInstance(): ComMatchItem {
		return <ComMatchItem>(fgui.UIPackage.createObject("PkgMain", "ComMatchItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_bg = <fgui.GButton>(this.getChildAt(0));
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.btn_info = <fgui.GButton>(this.getChildAt(2));
		this.img_rest = <fgui.GImage>(this.getChildAt(3));
		this.img_unmet1 = <fgui.GImage>(this.getChildAt(4));
		this.img_unmet2 = <fgui.GImage>(this.getChildAt(5));
		this.txt_time = <fgui.GTextField>(this.getChildAt(6));
		this.txt_name = <fgui.GTextField>(this.getChildAt(7));
		this.img_delete = <fgui.GImage>(this.getChildAt(8));
	}
}