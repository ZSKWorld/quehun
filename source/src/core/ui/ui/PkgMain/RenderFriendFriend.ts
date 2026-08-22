/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";
import { ComLevelView } from "../../view/PkgCommon/view/coms/ComLevelView";

export default class RenderFriendFriend extends GComponentView {

	protected txt_offlineTime: fgui.GTextField;
	protected com_head: ComHead2View;
	protected com_title: ComTitleView;
	protected label_name: LabelNameView;
	protected com_level4: ComLevelView;
	protected com_level3: ComLevelView;
	protected btn_look: fgui.GButton;
	protected btn_ob: fgui.GButton;
	protected btn_delete: fgui.GButton;
	public static url: string = "ui://vith2b66puubobfa";

	public static createInstance(): RenderFriendFriend {
		return <RenderFriendFriend>(fgui.UIPackage.createObject("PkgMain", "RenderFriendFriend"));
	}

	protected override onConstruct(): void {
		this.txt_offlineTime = <fgui.GTextField>(this.getChildAt(1));
		this.com_head = <ComHead2View>(this.getChildAt(2));
		this.com_title = <ComTitleView>(this.getChildAt(3));
		this.label_name = <LabelNameView>(this.getChildAt(4));
		this.com_level4 = <ComLevelView>(this.getChildAt(5));
		this.com_level3 = <ComLevelView>(this.getChildAt(6));
		this.btn_look = <fgui.GButton>(this.getChildAt(7));
		this.btn_ob = <fgui.GButton>(this.getChildAt(8));
		this.btn_delete = <fgui.GButton>(this.getChildAt(9));
	}
}