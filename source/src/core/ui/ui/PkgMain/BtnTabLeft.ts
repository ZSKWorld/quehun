/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnTabLeft extends fgui.GButton {

	protected img_using: fgui.GImage;
	public static url: string = "ui://vith2b66ik7bobfl";

	public static createInstance(): BtnTabLeft {
		return <BtnTabLeft>(fgui.UIPackage.createObject("PkgMain", "BtnTabLeft"));
	}

	protected override onConstruct(): void {
		this.img_using = <fgui.GImage>(this.getChildAt(2));
	}
}