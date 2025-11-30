/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIActivity extends fgui.GComponent {

	protected btn_back: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9s";

	public static createInstance(): UIActivity {
		return <UIActivity>(fgui.UIPackage.createObject("PkgMain", "UIActivity"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(1));
	}
}