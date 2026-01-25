/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderLiaoSheDecoItem extends fgui.GButton {

	protected com_item: ComItemView;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vith2b66glpbobfo";

	public static createInstance(): RenderLiaoSheDecoItem {
		return <RenderLiaoSheDecoItem>(fgui.UIPackage.createObject("PkgMain", "RenderLiaoSheDecoItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(3));
		this.txt_name = <fgui.GTextField>(this.getChildAt(5));
	}
}