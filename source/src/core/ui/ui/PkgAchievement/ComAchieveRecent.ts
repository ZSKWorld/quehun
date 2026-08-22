/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComAchieveRecent extends GComponentView {

	protected img_arrow: fgui.GImage;
	public static url: string = "ui://ko8zynrwcd64x";

	public static createInstance(): ComAchieveRecent {
		return <ComAchieveRecent>(fgui.UIPackage.createObject("PkgAchievement", "ComAchieveRecent"));
	}

	protected override onConstruct(): void {
		this.img_arrow = <fgui.GImage>(this.getChildAt(2));
	}
}