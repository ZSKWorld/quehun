/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import Pro1 from "../PkgCommon/Pro1";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";
import CmbDongFu from "../PkgMain/CmbDongFu";

export default class UIBattle extends fgui.GComponent {

	public ctrlState: fgui.Controller;
	public pro_wave: Pro1;
	public pro_exp: Pro1;
	public pro_userHp: Pro1;
	public pro_enemyHp: Pro1;
	public list_log: fgui.GList;
	public btn_offline: BtnTxtView;
	public btn_enemyInfo: BtnTxtView;
	public btn_exit: BtnTxtView;
	public cmb_battleSpeed: CmbDongFu;
	public txt_userName: fgui.GTextField;
	public txt_enemyName: fgui.GTextField;
	public txt_title: fgui.GRichTextField;
	public graph_enemyInfoBg: fgui.GGraph;
	public txt_enemyInfo: fgui.GTextField;
	public static url: string = "ui://va1qbl3hsbd00";

	public static createInstance(): UIBattle {
		return <UIBattle>(fgui.UIPackage.createObject("PkgBattle", "UIBattle"));
	}

	protected override onConstruct(): void {
		this.ctrlState = this.getControllerAt(0);
		this.pro_wave = <Pro1>(this.getChildAt(3));
		this.pro_exp = <Pro1>(this.getChildAt(4));
		this.pro_userHp = <Pro1>(this.getChildAt(5));
		this.pro_enemyHp = <Pro1>(this.getChildAt(6));
		this.list_log = <fgui.GList>(this.getChildAt(7));
		this.btn_offline = <BtnTxtView>(this.getChildAt(8));
		this.btn_enemyInfo = <BtnTxtView>(this.getChildAt(9));
		this.btn_exit = <BtnTxtView>(this.getChildAt(10));
		this.cmb_battleSpeed = <CmbDongFu>(this.getChildAt(11));
		this.txt_userName = <fgui.GTextField>(this.getChildAt(12));
		this.txt_enemyName = <fgui.GTextField>(this.getChildAt(13));
		this.txt_title = <fgui.GRichTextField>(this.getChildAt(14));
		this.graph_enemyInfoBg = <fgui.GGraph>(this.getChildAt(15));
		this.txt_enemyInfo = <fgui.GTextField>(this.getChildAt(16));
	}
}