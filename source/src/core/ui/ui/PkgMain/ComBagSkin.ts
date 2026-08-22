/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { BtnBagSkinCheckView } from "../../view/PkgMain/view/btns/BtnBagSkinCheckView";
import { RenderBagSkinItem1View } from "../../view/PkgMain/view/renders/RenderBagSkinItem1View";

export default class ComBagSkin extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected list_char: fgui.GList;
	protected list_skin: fgui.GList;
	protected btn_own: BtnBagSkinCheckView;
	protected btn_filter: fgui.GButton;
	protected btn_choosedChar: RenderBagSkinItem1View;
	protected btn_back: fgui.GButton;
	protected btn_toRight: fgui.GButton;
	protected btn_toLeft: fgui.GButton;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vith2b66rpakobc0";

	public static createInstance(): ComBagSkin {
		return <ComBagSkin>(fgui.UIPackage.createObject("PkgMain", "ComBagSkin"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.list_char = <fgui.GList>(this.getChildAt(1));
		this.list_skin = <fgui.GList>(this.getChildAt(2));
		this.btn_own = <BtnBagSkinCheckView>(this.getChildAt(3));
		this.btn_filter = <fgui.GButton>(this.getChildAt(4));
		this.btn_choosedChar = <RenderBagSkinItem1View>(this.getChildAt(5));
		this.btn_back = <fgui.GButton>(this.getChildAt(6));
		this.btn_toRight = <fgui.GButton>(this.getChildAt(7));
		this.btn_toLeft = <fgui.GButton>(this.getChildAt(8));
		this.txt_name = <fgui.GTextField>(this.getChildAt(9));
	}
}