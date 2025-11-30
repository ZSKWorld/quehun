/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComMatchItem extends fgui.GComponent {

	protected btn_bg: fgui.GButton;
	protected loader_icon: fgui.GLoader;
	protected btn_info: fgui.GButton;
	protected txt_time: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	protected img_delete: fgui.GImage;
	protected trans_modeIn: fgui.Transition;
	protected trans_modeOut: fgui.Transition;
	protected trans_titleIn: fgui.Transition;
	protected trans_titleOut: fgui.Transition;
	public static url: string = "ui://vith2b66gnjqob9j";

	public static createInstance(): ComMatchItem {
		return <ComMatchItem>(fgui.UIPackage.createObject("PkgMain", "ComMatchItem"));
	}

	protected override onConstruct(): void {
		this.btn_bg = <fgui.GButton>(this.getChildAt(0));
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