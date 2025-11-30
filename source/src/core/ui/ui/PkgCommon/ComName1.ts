/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComName1 extends fgui.GComponent {

	protected txt_name: fgui.GTextField;
	protected img_vip: fgui.GImage;
	public static url: string = "ui://vx9zwserhdeoobbp";

	public static createInstance(): ComName1 {
		return <ComName1>(fgui.UIPackage.createObject("PkgCommon", "ComName1"));
	}

	protected override onConstruct(): void {
		this.txt_name = <fgui.GTextField>(this.getChildAt(0));
		this.img_vip = <fgui.GImage>(this.getChildAt(1));
	}
}