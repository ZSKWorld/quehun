/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIMain extends fgui.GComponent {

	public ctrlShow: fgui.Controller;
	public com_train: fgui.GComponent;
	public com_char: fgui.GComponent;
	public com_goods: fgui.GComponent;
	public com_shop: fgui.GComponent;
	public com_abode: fgui.GComponent;
	public btn_train: fgui.GComponent;
	public btn_char: fgui.GComponent;
	public btn_goods: fgui.GComponent;
	public btn_shop: fgui.GComponent;
	public btn_abode: fgui.GComponent;
	public btn_chat: fgui.GComponent;
	public graph_info: fgui.GGraph;
	public txt_nickname: fgui.GTextField;
	public txt_level: fgui.GTextField;
	public txt_exp: fgui.GTextField;
	public txt_sect: fgui.GTextField;
	public txt_coin: fgui.GTextField;
	public txt_ingot: fgui.GTextField;
	public loader_head: fgui.GLoader;
	public btn_setting: fgui.GComponent;
	public btn_rank: fgui.GComponent;
	public btn_sphere: fgui.GComponent;
	public static url: string = "ui://vith2b66qjdo0";

	public static createInstance(): UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected override onConstruct(): void {
		this.ctrlShow = this.getControllerAt(0);
		this.com_train = <fgui.GComponent>(this.getChildAt(2));
		this.com_char = <fgui.GComponent>(this.getChildAt(3));
		this.com_goods = <fgui.GComponent>(this.getChildAt(4));
		this.com_shop = <fgui.GComponent>(this.getChildAt(5));
		this.com_abode = <fgui.GComponent>(this.getChildAt(6));
		this.btn_train = <fgui.GComponent>(this.getChildAt(7));
		this.btn_char = <fgui.GComponent>(this.getChildAt(8));
		this.btn_goods = <fgui.GComponent>(this.getChildAt(9));
		this.btn_shop = <fgui.GComponent>(this.getChildAt(10));
		this.btn_abode = <fgui.GComponent>(this.getChildAt(11));
		this.btn_chat = <fgui.GComponent>(this.getChildAt(12));
		this.graph_info = <fgui.GGraph>(this.getChildAt(14));
		this.txt_nickname = <fgui.GTextField>(this.getChildAt(17));
		this.txt_level = <fgui.GTextField>(this.getChildAt(19));
		this.txt_exp = <fgui.GTextField>(this.getChildAt(20));
		this.txt_sect = <fgui.GTextField>(this.getChildAt(21));
		this.txt_coin = <fgui.GTextField>(this.getChildAt(23));
		this.txt_ingot = <fgui.GTextField>(this.getChildAt(24));
		this.loader_head = <fgui.GLoader>(this.getChildAt(25));
		this.btn_setting = <fgui.GComponent>(this.getChildAt(26));
		this.btn_rank = <fgui.GComponent>(this.getChildAt(27));
		this.btn_sphere = <fgui.GComponent>(this.getChildAt(29));
	}
}