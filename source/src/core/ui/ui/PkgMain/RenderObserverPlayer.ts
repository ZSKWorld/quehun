/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { ComLevelView } from "../../view/PkgCommon/view/coms/ComLevelView";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";

export default class RenderObserverPlayer extends GComponentView {

	protected ctrl_sima: fgui.Controller;
	protected com_title: ComTitleView;
	protected com_level4: ComLevelView;
	protected com_level3: ComLevelView;
	protected label_name: LabelNameView;
	public static url: string = "ui://vith2b66h3ufobja";

	public static createInstance(): RenderObserverPlayer {
		return <RenderObserverPlayer>(fgui.UIPackage.createObject("PkgMain", "RenderObserverPlayer"));
	}

	protected override onConstruct(): void {
		this.ctrl_sima = this.getControllerAt(0);
		this.com_title = <ComTitleView>(this.getChildAt(0));
		this.com_level4 = <ComLevelView>(this.getChildAt(1));
		this.com_level3 = <ComLevelView>(this.getChildAt(2));
		this.label_name = <LabelNameView>(this.getChildAt(3));
	}
}