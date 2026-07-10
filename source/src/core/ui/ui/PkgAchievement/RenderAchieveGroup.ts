/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderAchieveGroup extends fgui.GLabel {

	protected ctrl_type: fgui.Controller;
	protected txt_percent: fgui.GTextField;
	protected img_proBar: fgui.GImage;
	protected img_redDot: fgui.GImage;
	public static url: string = "ui://ko8zynrwcd64u";

	public static createInstance(): RenderAchieveGroup {
		return <RenderAchieveGroup>(fgui.UIPackage.createObject("PkgAchievement", "RenderAchieveGroup"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.txt_percent = <fgui.GTextField>(this.getChildAt(4));
		this.img_proBar = <fgui.GImage>(this.getChildAt(6));
		this.img_redDot = <fgui.GImage>(this.getChildAt(7));
	}
}