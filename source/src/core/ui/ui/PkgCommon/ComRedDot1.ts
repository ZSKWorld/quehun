/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComRedDot1 extends GComponentView {

	protected loader_icon: fgui.GLoader;
	protected trans_t0: fgui.Transition;
	public static url: string = "ui://vx9zwserea8nobfg";

	public static createInstance(): ComRedDot1 {
		return <ComRedDot1>(fgui.UIPackage.createObject("PkgCommon", "ComRedDot1"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
		this.trans_t0 = this.getTransitionAt(0);
	}
}