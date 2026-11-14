/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { RenderObserverPlayerView } from "../../view/PkgMain/view/renders/RenderObserverPlayerView";

export default class RenderObserverItem extends GComponentView {

	protected ctrl_sima: fgui.Controller;
	protected com_player0: RenderObserverPlayerView;
	protected com_player1: RenderObserverPlayerView;
	protected com_player2: RenderObserverPlayerView;
	protected com_player3: RenderObserverPlayerView;
	protected txt_name: fgui.GTextField;
	protected txt_time: fgui.GTextField;
	public static url: string = "ui://vith2b66h3ufobj9";

	public static createInstance(): RenderObserverItem {
		return <RenderObserverItem>(fgui.UIPackage.createObject("PkgMain", "RenderObserverItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_sima = this.getControllerAt(0);
		this.com_player0 = <RenderObserverPlayerView>(this.getChildAt(1));
		this.com_player1 = <RenderObserverPlayerView>(this.getChildAt(2));
		this.com_player2 = <RenderObserverPlayerView>(this.getChildAt(3));
		this.com_player3 = <RenderObserverPlayerView>(this.getChildAt(4));
		this.txt_name = <fgui.GTextField>(this.getChildAt(5));
		this.txt_time = <fgui.GTextField>(this.getChildAt(6));
	}
}