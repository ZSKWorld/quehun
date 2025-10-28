/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComMatchItem extends fgui.GComponent {

	public loader_bg: fgui.GLoader;
	public loader_icon: fgui.GLoader;
	public btn_info: fgui.GButton;
	public txt_time: fgui.GTextField;
	public txt_name: fgui.GTextField;
	public img_delete: fgui.GImage;
	public trans_modeIn: fgui.Transition;
	public trans_modeOut: fgui.Transition;
	public trans_titleIn: fgui.Transition;
	public trans_titleOut: fgui.Transition;
	public static url: string = "ui://vith2b66gnjqob9j";

	public static createInstance(): ComMatchItem {
		return <ComMatchItem>(fgui.UIPackage.createObject("PkgMain", "ComMatchItem"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.btn_info = <fgui.GButton>(this.getChildAt(2));
		this.txt_time = <fgui.GTextField>(this.getChildAt(3));
		this.txt_name = <fgui.GTextField>(this.getChildAt(4));
		this.img_delete = <fgui.GImage>(this.getChildAt(5));
		this.trans_modeIn = this.getTransitionAt(0);
		this.trans_modeOut = this.getTransitionAt(1);
		this.trans_titleIn = this.getTransitionAt(2);
		this.trans_titleOut = this.getTransitionAt(3);
	}
}