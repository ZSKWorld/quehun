/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComName2 extends fgui.GComponent {

	protected txt_name: fgui.GTextField;
	protected img_vip: fgui.GImage;
	public static url: string = "ui://vx9zwserpuubobfa";

	public static createInstance(): ComName2 {
		return <ComName2>(fgui.UIPackage.createObject("PkgCommon", "ComName2"));
	}

	protected override onConstruct(): void {
		this.txt_name = <fgui.GTextField>(this.getChildAt(0));
		this.img_vip = <fgui.GImage>(this.getChildAt(1));
	}
}