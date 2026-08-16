/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComHead1View } from "../../view/PkgCommon/view/coms/ComHead1View";

export default class ComVisitCharInfo extends ViewBase(fgui.GComponent) {

	protected txt_height: fgui.GTextField;
	protected txt_birthday: fgui.GTextField;
	protected txt_age: fgui.GTextField;
	protected txt_blood: fgui.GTextField;
	protected txt_cv: fgui.GTextField;
	protected txt_hobby: fgui.GTextField;
	protected txt_brief: fgui.GTextField;
	protected list_emo: fgui.GList;
	protected com_head: ComHead1View;
	protected btn_skin: fgui.GButton;
	public static url: string = "ui://vith2b669c0bobj4";

	public static createInstance(): ComVisitCharInfo {
		return <ComVisitCharInfo>(fgui.UIPackage.createObject("PkgMain", "ComVisitCharInfo"));
	}

	protected override onConstruct(): void {
		this.txt_height = <fgui.GTextField>(this.getChildAt(11));
		this.txt_birthday = <fgui.GTextField>(this.getChildAt(12));
		this.txt_age = <fgui.GTextField>(this.getChildAt(13));
		this.txt_blood = <fgui.GTextField>(this.getChildAt(14));
		this.txt_cv = <fgui.GTextField>(this.getChildAt(15));
		this.txt_hobby = <fgui.GTextField>(this.getChildAt(16));
		this.txt_brief = <fgui.GTextField>(this.getChildAt(17));
		this.list_emo = <fgui.GList>(this.getChildAt(18));
		this.com_head = <ComHead1View>(this.getChildAt(19));
		this.btn_skin = <fgui.GButton>(this.getChildAt(20));
	}
}