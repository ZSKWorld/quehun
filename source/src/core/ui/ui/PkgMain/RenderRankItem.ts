/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";
import { ComName1View } from "../../view/PkgCommon/view/coms/ComName1View";
import { ComTitle1View } from "../../view/PkgCommon/view/coms/ComTitle1View";
import { ComLevel1View } from "../../view/PkgCommon/view/coms/ComLevel1View";

export default class RenderRankItem extends fgui.GComponent {

	protected loader_top3: fgui.GLoader;
	protected com_head: ComHead2View;
	protected com_name: ComName1View;
	protected com_title: ComTitle1View;
	protected com_level: ComLevel1View;
	protected txt_rank: fgui.GTextField;
	public static url: string = "ui://vith2b66hdeoobb2";

	public static createInstance(): RenderRankItem {
		return <RenderRankItem>(fgui.UIPackage.createObject("PkgMain", "RenderRankItem"));
	}

	protected override onConstruct(): void {
		this.loader_top3 = <fgui.GLoader>(this.getChildAt(1));
		this.com_head = <ComHead2View>(this.getChildAt(2));
		this.com_name = <ComName1View>(this.getChildAt(3));
		this.com_title = <ComTitle1View>(this.getChildAt(4));
		this.com_level = <ComLevel1View>(this.getChildAt(5));
		this.txt_rank = <fgui.GTextField>(this.getChildAt(6));
	}
}