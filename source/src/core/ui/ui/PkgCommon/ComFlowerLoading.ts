/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComFlowerLoading extends ViewBase(fgui.GComponent) {

	protected trans_t0: fgui.Transition;
	public static url: string = "ui://vx9zwserghrrobg8";

	public static createInstance(): ComFlowerLoading {
		return <ComFlowerLoading>(fgui.UIPackage.createObject("PkgCommon", "ComFlowerLoading"));
	}

	protected override onConstruct(): void {
		this.trans_t0 = this.getTransitionAt(0);
	}
}