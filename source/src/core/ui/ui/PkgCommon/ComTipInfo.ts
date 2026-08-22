/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComTipInfo extends GComponentView {

	protected rtxt_content: fgui.GRichTextField;
	public static url: string = "ui://vx9zwserq4bcobfi";

	public static createInstance(): ComTipInfo {
		return <ComTipInfo>(fgui.UIPackage.createObject("PkgCommon", "ComTipInfo"));
	}

	protected override onConstruct(): void {
		this.rtxt_content = <fgui.GRichTextField>(this.getChildAt(1));
	}
}