/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIEmail extends fgui.GComponent {

	public ctrl_head: fgui.Controller;
	public ctrl_body: fgui.Controller;
	public ctrl_empty: fgui.Controller;
	public btn_back: fgui.GButton;
	public list_tab: fgui.GList;
	public list_reward: fgui.GList;
	public label_content: fgui.GLabel;
	public btn_getReward: fgui.GButton;
	public btn_delete: fgui.GButton;
	public txt_title: fgui.GTextField;
	public txt_expire: fgui.GTextField;
	public static url: string = "ui://vith2b66ktwpob9t";

	public static createInstance(): UIEmail {
		return <UIEmail>(fgui.UIPackage.createObject("PkgMain", "UIEmail"));
	}

	protected override onConstruct(): void {
		this.ctrl_head = this.getControllerAt(0);
		this.ctrl_body = this.getControllerAt(1);
		this.ctrl_empty = this.getControllerAt(2);
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