/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { ComName2View } from "../../view/PkgCommon/view/coms/ComName2View";
import { ComLevelView } from "../../view/PkgCommon/view/coms/ComLevelView";

export default class RenderFriendApply extends fgui.GComponent {

	protected txt_offlineTime: fgui.GTextField;
	protected com_head: ComHead2View;
	protected com_title: ComTitleView;
	protected com_name: ComName2View;
	protected com_level4: ComLevelView;
	protected com_level3: ComLevelView;
	protected btn_look: fgui.GButton;
	protected btn_agree: fgui.GButton;
	protected btn_reject: fgui.GButton;
	public static url: string = "ui://vith2b66puubobfb";

	public static createInstance(): RenderFriendApply {
		return <RenderFriendApply>(fgui.UIPackage.createObject("PkgMain", "RenderFriendApply"));
	}

	protected override onConstruct(): void {
		this.txt_offlineTime = <fgui.GTextField>(this.getChildAt(1));
		this.com_head = <ComHead2View>(this.getChildAt(2));
		this.com_title = <ComTitleView>(this.getChildAt(3));
		this.com_name = <ComName2View>(this.getChildAt(4));
		this.com_level4 = <ComLevelView>(this.getChildAt(5));
		this.com_level3 = <ComLevelView>(this.getChildAt(6));
		this.btn_look = <fgui.GButton>(this.getChildAt(7));
		this.btn_agree = <fgui.GButton>(this.getChildAt(8));
		this.btn_reject = <fgui.GButton>(this.getChildAt(9));
	}
}