/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderLiaoSheDecoItem extends fgui.GButton {

	protected ctrl_type: fgui.Controller;
	public static url: string = "ui://vith2b66lswhobie";

	public static createInstance(): RenderLiaoSheDecoItem {
		return <RenderLiaoSheDecoItem>(fgui.UIPackage.createObject("PkgMain", "RenderLiaoSheDecoItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
	}
}