/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIEntrance extends GComponentView {

	protected trans_t0: fgui.Transition;
	public static url: string = "ui://8tw6j59fnrcf0";

	public static createInstance(): UIEntrance {
		return <UIEntrance>(fgui.UIPackage.createObject("PkgEntrance", "UIEntrance"));
	}

	protected override onConstruct(): void {
		this.trans_t0 = this.getTransitionAt(0);
	}
}