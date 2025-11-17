/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead1View } from "../../view/PkgCommon/view/coms/ComHead1View";
import { ComName1View } from "../../view/PkgCommon/view/coms/ComName1View";
import { ComTitle1View } from "../../view/PkgCommon/view/coms/ComTitle1View";
import { ComLevel1View } from "../../view/PkgCommon/view/coms/ComLevel1View";

export default class ComRankItem extends fgui.GComponent {

	public com_head: ComHead1View;
	public com_name: ComName1View;
	public com_title: ComTitle1View;
	public com_level: ComLevel1View;
	public txt_score: fgui.GTextField;
	public static url: string = "ui://vith2b66hdeoobb2";

	public static createInstance(): ComRankItem {
		return <ComRankItem>(fgui.UIPackage.createObject("PkgMain", "ComRankItem"));
	}

	protected override onConstruct(): void {
		this.com_head = <ComHead1View>(this.getChildAt(2));
		this.com_name = <ComName1View>(this.getChildAt(3));
		this.com_title = <ComTitle1View>(this.getChildAt(4));
		this.com_level = <ComLevel1View>(this.getChildAt(5));
		this.txt_score = <fgui.GTextField>(this.getChildAt(7));
	}
}