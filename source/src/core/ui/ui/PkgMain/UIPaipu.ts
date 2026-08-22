/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIPaipu extends GComponentView {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b66qke2ob9o";

	public static createInstance(): UIPaipu {
		return <UIPaipu>(fgui.UIPackage.createObject("PkgMain", "UIPaipu"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}