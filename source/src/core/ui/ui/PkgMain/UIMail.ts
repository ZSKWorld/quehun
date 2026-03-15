/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIMail extends fgui.GComponent {

	protected ctrl_head: fgui.Controller;
	protected ctrl_body: fgui.Controller;
	protected ctrl_empty: fgui.Controller;
	protected loader_bg: fgui.GLoader;
	protected btn_back: fgui.GButton;
	protected list_tab: fgui.GList;
	protected list_reward: fgui.GList;
	protected label_content: fgui.GLabel;
	protected btn_getReward: fgui.GButton;
	protected btn_delete: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_expire: fgui.GTextField;
	public static url: string = "ui://vith2b66ktwpob9t";

	public static createInstance(): UIMail {
		return <UIMail>(fgui.UIPackage.createObject("PkgMain", "UIMail"));
	}

	protected override onConstruct(): void {
		this.ctrl_head = this.getControllerAt(0);
		this.ctrl_body = this.getControllerAt(1);
		this.ctrl_empty = this.getControllerAt(2);
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.btn_back = <fgui.GButton>(this.getChildAt(3));
		this.list_tab = <fgui.GList>(this.getChildAt(11));
		this.list_reward = <fgui.GList>(this.getChildAt(12));
		this.label_content = <fgui.GLabel>(this.getChildAt(13));
		this.btn_getReward = <fgui.GButton>(this.getChildAt(14));
		this.btn_delete = <fgui.GButton>(this.getChildAt(15));
		this.txt_title = <fgui.GTextField>(this.getChildAt(16));
		this.txt_expire = <fgui.GTextField>(this.getChildAt(17));
	}
}