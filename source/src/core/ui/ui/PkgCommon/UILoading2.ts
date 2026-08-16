/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComFlowerLoadingView } from "../../view/PkgCommon/view/coms/ComFlowerLoadingView";

export default class UILoading2 extends ViewBase(fgui.GComponent) {

	protected com_loading: ComFlowerLoadingView;
	public static url: string = "ui://vx9zwserghrrobg9";

	public static createInstance(): UILoading2 {
		return <UILoading2>(fgui.UIPackage.createObject("PkgCommon", "UILoading2"));
	}

	protected override onConstruct(): void {
		this.com_loading = <ComFlowerLoadingView>(this.getChildAt(0));
	}
}