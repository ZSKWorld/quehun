/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { ComName2View } from "../../view/PkgCommon/view/coms/ComName2View";

export default class RenderFriendRecent extends fgui.GComponent {

	protected com_head: ComHead2View;
	protected com_title: ComTitleView;
	protected com_name: ComName2View;
	protected btn_add: fgui.GButton;
	public static url: string = "ui://vith2b66jcnmobfd";

	public static createInstance(): RenderFriendRecent {
		return <RenderFriendRecent>(fgui.UIPackage.createObject("PkgMain", "RenderFriendRecent"));
	}

	protected override onConstruct(): void {
		this.com_head = <ComHead2View>(this.getChildAt(1));
		this.com_title = <ComTitleView>(this.getChildAt(2));
		this.com_name = <ComName2View>(this.getChildAt(3));
		this.btn_add = <fgui.GButton>(this.getChildAt(4));
	}
}