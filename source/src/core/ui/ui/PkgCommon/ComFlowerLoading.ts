/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComFlowerLoading extends GComponentView {

	protected trans_t0: fgui.Transition;
	public static url: string = "ui://vx9zwserghrrobg8";

	public static createInstance(): ComFlowerLoading {
		return <ComFlowerLoading>(fgui.UIPackage.createObject("PkgCommon", "ComFlowerLoading"));
	}

	protected override onConstruct(): void {
		this.trans_t0 = this.getTransitionAt(0);
	}
}