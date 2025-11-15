/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComItem1 extends fgui.GComponent {

	public loader_icon: fgui.GLoader;
	public img_gotReward: fgui.GImage;
	public txt_count: fgui.GTextField;
	public static url: string = "ui://vx9zwserhk7robax";

	public static createInstance(): ComItem1 {
		return <ComItem1>(fgui.UIPackage.createObject("PkgCommon", "ComItem1"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
		this.img_gotReward = <fgui.GImage>(this.getChildAt(2));
		this.txt_count = <fgui.GTextField>(this.getChildAt(3));
	}
}