/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnBagSkinCheckView } from "../../view/PkgMain/view/btns/BtnBagSkinCheckView";

export default class ComBagSkin extends fgui.GComponent {

	protected list_skin: fgui.GList;
	protected btn_own: BtnBagSkinCheckView;
	protected btn_filter: fgui.GButton;
	public static url: string = "ui://vith2b66rpakobc0";

	public static createInstance(): ComBagSkin {
		return <ComBagSkin>(fgui.UIPackage.createObject("PkgMain", "ComBagSkin"));
	}

	protected override onConstruct(): void {
		this.list_skin = <fgui.GList>(this.getChildAt(0));
		this.btn_own = <BtnBagSkinCheckView>(this.getChildAt(1));
		this.btn_filter = <fgui.GButton>(this.getChildAt(2));
	}
}