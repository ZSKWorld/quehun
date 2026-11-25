/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComLevelView } from "../../view/PkgCommon/view/coms/ComLevelView";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";

export default class ComFriendRoomItem extends GComponentView {

	protected loader_bg: fgui.GLoader;
	protected loader_bound: fgui.GLoader;
	protected img_owner: fgui.GImage;
	protected img_ready: fgui.GImage;
	protected img_nameBg: fgui.GImage;
	protected com_level: ComLevelView;
	protected com_title: ComTitleView;
	protected label_name: LabelNameView;
	protected btn_inviteFriend: fgui.GButton;
	protected btn_addRobot: fgui.GButton;
	protected btn_kick: fgui.GButton;
	public static url: string = "ui://vith2b66il8eobju";

	public static createInstance(): ComFriendRoomItem {
		return <ComFriendRoomItem>(fgui.UIPackage.createObject("PkgMain", "ComFriendRoomItem"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.loader_bound = <fgui.GLoader>(this.getChildAt(1));
		this.img_owner = <fgui.GImage>(this.getChildAt(2));
		this.img_ready = <fgui.GImage>(this.getChildAt(3));
		this.img_nameBg = <fgui.GImage>(this.getChildAt(4));
		this.com_level = <ComLevelView>(this.getChildAt(5));
		this.com_title = <ComTitleView>(this.getChildAt(6));
		this.label_name = <LabelNameView>(this.getChildAt(7));
		this.btn_inviteFriend = <fgui.GButton>(this.getChildAt(8));
		this.btn_addRobot = <fgui.GButton>(this.getChildAt(9));
		this.btn_kick = <fgui.GButton>(this.getChildAt(10));
	}
}