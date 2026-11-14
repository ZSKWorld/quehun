/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { BtnBagSkinCheckView } from "../../view/PkgMain/view/btns/BtnBagSkinCheckView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIObserver extends GComponentView {

	protected com_back: ComBackView;
	protected cmb_model: fgui.GComboBox;
	protected cmb_type: fgui.GComboBox;
	protected btn_onlyFriend: BtnBagSkinCheckView;
	protected btn_refresh: fgui.GButton;
	protected list_ob: fgui.GList;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66qke2ob9n";

	public static createInstance(): UIObserver {
		return <UIObserver>(fgui.UIPackage.createObject("PkgMain", "UIObserver"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.cmb_model = <fgui.GComboBox>(this.getChildAt(2));
		this.cmb_type = <fgui.GComboBox>(this.getChildAt(3));
		this.btn_onlyFriend = <BtnBagSkinCheckView>(this.getChildAt(4));
		this.btn_refresh = <fgui.GButton>(this.getChildAt(5));
		this.list_ob = <fgui.GList>(this.getChildAt(6));
		this.trans_show = this.getTransitionAt(0);
	}
}