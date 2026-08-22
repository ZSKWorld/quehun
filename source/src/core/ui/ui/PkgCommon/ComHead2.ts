/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComHeadView } from "../../view/PkgCommon/view/coms/ComHeadView";
import { ComHeadFrameView } from "../../view/PkgCommon/view/coms/ComHeadFrameView";

export default class ComHead2 extends GComponentView {

	protected com_head: ComHeadView;
	protected com_frame: ComHeadFrameView;
	public static url: string = "ui://vx9zwserhdeoobbn";

	public static createInstance(): ComHead2 {
		return <ComHead2>(fgui.UIPackage.createObject("PkgCommon", "ComHead2"));
	}

	protected override onConstruct(): void {
		this.com_head = <ComHeadView>(this.getChildAt(1));
		this.com_frame = <ComHeadFrameView>(this.getChildAt(2));
	}
}