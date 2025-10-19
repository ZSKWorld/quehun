/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComMatchModeView } from "../../view/PkgMain/view/coms/ComMatchModeView";
import { BtnXunMiView } from "../../view/PkgMain/view/btns/BtnXunMiView";

export default class UIMain extends fgui.GComponent {

	public com_matchMode: ComMatchModeView;
	public btn_liaoShe: fgui.GButton;
	public btn_friend: fgui.GButton;
	public btn_observe: fgui.GButton;
	public btn_paiPu: fgui.GButton;
	public btn_cangKu: fgui.GButton;
	public btn_shop: fgui.GButton;
	public btn_xunMi: BtnXunMiView;
	public group_rightBottom: fgui.GGroup;
	public btn_setting: fgui.GButton;
	public btn_help: fgui.GButton;
	public btn_guide: fgui.GButton;
	public btn_camera: fgui.GButton;
	public btn_achieve: fgui.GButton;
	public btn_activity: fgui.GButton;
	public btn_email: fgui.GButton;
	public btn_rank: fgui.GButton;
	public btn_announcement: fgui.GButton;
	public static url: string = "ui://vith2b66vwgm0";

	public static createInstance(): UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected override onConstruct(): void {
		this.com_matchMode = <ComMatchModeView>(this.getChildAt(0));
		this.btn_liaoShe = <fgui.GButton>(this.getChildAt(1));
		this.btn_friend = <fgui.GButton>(this.getChildAt(2));
		this.btn_observe = <fgui.GButton>(this.getChildAt(3));
		this.btn_paiPu = <fgui.GButton>(this.getChildAt(4));
		this.btn_cangKu = <fgui.GButton>(this.getChildAt(5));
		this.btn_shop = <fgui.GButton>(this.getChildAt(6));
		this.btn_xunMi = <BtnXunMiView>(this.getChildAt(7));
		this.group_rightBottom = <fgui.GGroup>(this.getChildAt(8));
		this.btn_setting = <fgui.GButton>(this.getChildAt(9));
		this.btn_help = <fgui.GButton>(this.getChildAt(10));
		this.btn_guide = <fgui.GButton>(this.getChildAt(11));
		this.btn_camera = <fgui.GButton>(this.getChildAt(12));
		this.btn_achieve = <fgui.GButton>(this.getChildAt(13));
		this.btn_activity = <fgui.GButton>(this.getChildAt(14));
		this.btn_email = <fgui.GButton>(this.getChildAt(15));
		this.btn_rank = <fgui.GButton>(this.getChildAt(16));
		this.btn_announcement = <fgui.GButton>(this.getChildAt(17));
	}
}