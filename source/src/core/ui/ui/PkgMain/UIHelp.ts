/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIHelp extends fgui.GComponent {

	protected ctrl_tab: fgui.Controller;
	protected btn_bg: fgui.GButton;
	protected btn_tab0: fgui.GButton;
	protected btn_tab1: fgui.GButton;
	protected btn_tab2: fgui.GButton;
	protected btn_fanTab0: fgui.GButton;
	protected btn_fanTab1: fgui.GButton;
	protected btn_fanTab2: fgui.GButton;
	protected btn_fanTab3: fgui.GButton;
	protected btn_fanTab4: fgui.GButton;
	protected btn_fanTab5: fgui.GButton;
	protected btn_fanTab6: fgui.GButton;
	protected btn_fanTab7: fgui.GButton;
	protected list_fan: fgui.GList;
	protected loader_courseIcon: fgui.GLoader;
	protected btn_preCourse: fgui.GButton;
	protected btn_nextCourse: fgui.GButton;
	protected txt_coursePage: fgui.GTextField;
	protected btn_pointTab0: fgui.GButton;
	protected btn_pointTab1: fgui.GButton;
	protected btn_pointTab2: fgui.GButton;
	protected loader_pointIcon0: fgui.GLoader;
	protected loader_pointIcon1: fgui.GLoader;
	protected loader_pointIcon2: fgui.GLoader;
	protected btn_pointLink0: fgui.GButton;
	protected btn_pointLink1: fgui.GButton;
	protected btn_pointLink2: fgui.GButton;
	protected btn_pointLink3: fgui.GButton;
	protected btn_pointLink4: fgui.GButton;
	protected btn_pointLink5: fgui.GButton;
	protected btn_pointLink6: fgui.GButton;
	protected btn_pointLink7: fgui.GButton;
	protected btn_pointLink8: fgui.GButton;
	protected btn_pointLink9: fgui.GButton;
	protected loader_pointPop: fgui.GLoader;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9x";

	public static createInstance(): UIHelp {
		return <UIHelp>(fgui.UIPackage.createObject("PkgMain", "UIHelp"));
	}

	protected override onConstruct(): void {
		this.ctrl_tab = this.getControllerAt(0);
		this.btn_bg = <fgui.GButton>(this.getChildAt(0));
		this.btn_tab0 = <fgui.GButton>(this.getChildAt(2));
		this.btn_tab1 = <fgui.GButton>(this.getChildAt(3));
		this.btn_tab2 = <fgui.GButton>(this.getChildAt(4));
		this.btn_fanTab0 = <fgui.GButton>(this.getChildAt(5));
		this.btn_fanTab1 = <fgui.GButton>(this.getChildAt(6));
		this.btn_fanTab2 = <fgui.GButton>(this.getChildAt(7));
		this.btn_fanTab3 = <fgui.GButton>(this.getChildAt(8));
		this.btn_fanTab4 = <fgui.GButton>(this.getChildAt(9));
		this.btn_fanTab5 = <fgui.GButton>(this.getChildAt(10));
		this.btn_fanTab6 = <fgui.GButton>(this.getChildAt(11));
		this.btn_fanTab7 = <fgui.GButton>(this.getChildAt(12));
		this.list_fan = <fgui.GList>(this.getChildAt(13));
		this.loader_courseIcon = <fgui.GLoader>(this.getChildAt(15));
		this.btn_preCourse = <fgui.GButton>(this.getChildAt(16));
		this.btn_nextCourse = <fgui.GButton>(this.getChildAt(17));
		this.txt_coursePage = <fgui.GTextField>(this.getChildAt(18));
		this.btn_pointTab0 = <fgui.GButton>(this.getChildAt(20));
		this.btn_pointTab1 = <fgui.GButton>(this.getChildAt(21));
		this.btn_pointTab2 = <fgui.GButton>(this.getChildAt(22));
		this.loader_pointIcon0 = <fgui.GLoader>(this.getChildAt(23));
		this.loader_pointIcon1 = <fgui.GLoader>(this.getChildAt(24));
		this.loader_pointIcon2 = <fgui.GLoader>(this.getChildAt(25));
		this.btn_pointLink0 = <fgui.GButton>(this.getChildAt(26));
		this.btn_pointLink1 = <fgui.GButton>(this.getChildAt(27));
		this.btn_pointLink2 = <fgui.GButton>(this.getChildAt(28));
		this.btn_pointLink3 = <fgui.GButton>(this.getChildAt(29));
		this.btn_pointLink4 = <fgui.GButton>(this.getChildAt(30));
		this.btn_pointLink5 = <fgui.GButton>(this.getChildAt(31));
		this.btn_pointLink6 = <fgui.GButton>(this.getChildAt(32));
		this.btn_pointLink7 = <fgui.GButton>(this.getChildAt(33));
		this.btn_pointLink8 = <fgui.GButton>(this.getChildAt(34));
		this.btn_pointLink9 = <fgui.GButton>(this.getChildAt(35));
		this.loader_pointPop = <fgui.GLoader>(this.getChildAt(36));
		this.btn_close = <fgui.GButton>(this.getChildAt(38));
	}
}