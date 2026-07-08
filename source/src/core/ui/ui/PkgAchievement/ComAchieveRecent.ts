/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComAchieveRecent extends fgui.GComponent {

	protected img_arrow: fgui.GImage;
	public static url: string = "ui://ko8zynrwcd64x";

	public static createInstance(): ComAchieveRecent {
		return <ComAchieveRecent>(fgui.UIPackage.createObject("PkgAchievement", "ComAchieveRecent"));
	}

	protected override onConstruct(): void {
		this.img_arrow = <fgui.GImage>(this.getChildAt(2));
	}
}