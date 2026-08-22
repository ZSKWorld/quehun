/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComBagItem extends GComponentView {

	protected list_item: fgui.GList;
	public static url: string = "ui://vith2b66gsi2obbt";

	public static createInstance(): ComBagItem {
		return <ComBagItem>(fgui.UIPackage.createObject("PkgMain", "ComBagItem"));
	}

	protected override onConstruct(): void {
		this.list_item = <fgui.GList>(this.getChildAt(0));
	}
}