/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIChangeSkin extends GComponentView {

	protected com_back: ComBackView;
	public static url: string = "ui://vith2b669c0bobio";

	public static createInstance(): UIChangeSkin {
		return <UIChangeSkin>(fgui.UIPackage.createObject("PkgMain", "UIChangeSkin"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
	}
}