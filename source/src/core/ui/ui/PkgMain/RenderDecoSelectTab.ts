/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderDecoSelectTab extends fgui.GButton {

	protected img_using: fgui.GImage;
	public static url: string = "ui://vith2b66ik7bobfl";

	public static createInstance(): RenderDecoSelectTab {
		return <RenderDecoSelectTab>(fgui.UIPackage.createObject("PkgMain", "RenderDecoSelectTab"));
	}

	protected override onConstruct(): void {
		this.img_using = <fgui.GImage>(this.getChildAt(2));
	}
}