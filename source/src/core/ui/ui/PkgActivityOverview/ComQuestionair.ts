/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComQuestionair extends GComponentView {

	protected txt_title: fgui.GTextField;
	public static url: string = "ui://iooyyksi9vb34";

	public static createInstance(): ComQuestionair {
		return <ComQuestionair>(fgui.UIPackage.createObject("PkgActivityOverview", "ComQuestionair"));
	}

	protected override onConstruct(): void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(0));
	}
}