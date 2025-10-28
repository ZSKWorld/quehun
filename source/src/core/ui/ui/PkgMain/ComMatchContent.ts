/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComMatchItemView } from "../../view/PkgMain/view/coms/ComMatchItemView";

export default class ComMatchContent extends fgui.GComponent {

	public com_item0: ComMatchItemView;
	public com_item1: ComMatchItemView;
	public com_item2: ComMatchItemView;
	public com_item3: ComMatchItemView;
	public com_item4: ComMatchItemView;
	public trans_out: fgui.Transition;
	public trans_in: fgui.Transition;
	public static url: string = "ui://vith2b66z63pob9k";

	public static createInstance(): ComMatchContent {
		return <ComMatchContent>(fgui.UIPackage.createObject("PkgMain", "ComMatchContent"));
	}

	protected override onConstruct(): void {
		this.com_item0 = <ComMatchItemView>(this.getChildAt(0));
		this.com_item1 = <ComMatchItemView>(this.getChildAt(1));
		this.com_item2 = <ComMatchItemView>(this.getChildAt(2));
		this.com_item3 = <ComMatchItemView>(this.getChildAt(3));
		this.com_item4 = <ComMatchItemView>(this.getChildAt(4));
		this.trans_out = this.getTransitionAt(0);
		this.trans_in = this.getTransitionAt(1);
	}
}