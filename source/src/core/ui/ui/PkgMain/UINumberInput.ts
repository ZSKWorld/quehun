/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UINumberInput extends GComponentView {

	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected itxt_input: fgui.GTextInput;
	protected btn_num0: fgui.GButton;
	protected btn_num1: fgui.GButton;
	protected btn_num2: fgui.GButton;
	protected btn_num3: fgui.GButton;
	protected btn_num4: fgui.GButton;
	protected btn_num5: fgui.GButton;
	protected btn_num6: fgui.GButton;
	protected btn_num7: fgui.GButton;
	protected btn_num8: fgui.GButton;
	protected btn_num9: fgui.GButton;
	protected btn_clear: fgui.GButton;
	protected btn_delete: fgui.GButton;
	public static url: string = "ui://vith2b66fewxobk1";

	public static createInstance(): UINumberInput {
		return <UINumberInput>(fgui.UIPackage.createObject("PkgMain", "UINumberInput"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(3));
		this.itxt_input = <fgui.GTextInput>(this.getChildAt(30));
		this.btn_num0 = <fgui.GButton>(this.getChildAt(31));
		this.btn_num1 = <fgui.GButton>(this.getChildAt(32));
		this.btn_num2 = <fgui.GButton>(this.getChildAt(33));
		this.btn_num3 = <fgui.GButton>(this.getChildAt(34));
		this.btn_num4 = <fgui.GButton>(this.getChildAt(35));
		this.btn_num5 = <fgui.GButton>(this.getChildAt(36));
		this.btn_num6 = <fgui.GButton>(this.getChildAt(37));
		this.btn_num7 = <fgui.GButton>(this.getChildAt(38));
		this.btn_num8 = <fgui.GButton>(this.getChildAt(39));
		this.btn_num9 = <fgui.GButton>(this.getChildAt(40));
		this.btn_clear = <fgui.GButton>(this.getChildAt(41));
		this.btn_delete = <fgui.GButton>(this.getChildAt(42));
	}
}