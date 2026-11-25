/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class RenderFriendRoomItem extends GComponentView {

	protected txt_title: fgui.GTextField;
	protected txt_value: fgui.GTextField;
	public static url: string = "ui://vith2b66fewxobk0";

	public static createInstance(): RenderFriendRoomItem {
		return <RenderFriendRoomItem>(fgui.UIPackage.createObject("PkgMain", "RenderFriendRoomItem"));
	}

	protected override onConstruct(): void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(1));
		this.txt_value = <fgui.GTextField>(this.getChildAt(2));
	}
}