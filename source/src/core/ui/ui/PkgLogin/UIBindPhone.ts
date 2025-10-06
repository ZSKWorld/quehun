/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIBindPhone extends fgui.GComponent {

	public txt_title: fgui.GTextField;
	public static url: string = "ui://vs9845atieavb8e";

	public static createInstance(): UIBindPhone {
		return <UIBindPhone>(fgui.UIPackage.createObject("PkgLogin", "UIBindPhone"));
	}

	protected override onConstruct(): void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(1));
	}
}