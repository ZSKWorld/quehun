/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderBagIllustItem extends fgui.GComponent {

	protected com_item: ComItemView;
	protected img_choose: fgui.GImage;
	protected txt_time: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vith2b66rpakobc1";

	public static createInstance(): RenderBagIllustItem {
		return <RenderBagIllustItem>(fgui.UIPackage.createObject("PkgMain", "RenderBagIllustItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(2));
		this.img_choose = <fgui.GImage>(this.getChildAt(5));
		this.txt_time = <fgui.GTextField>(this.getChildAt(6));
		this.txt_name = <fgui.GTextField>(this.getChildAt(7));
	}
}