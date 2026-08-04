/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderVisitVoiceInfo extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected ctrl_playing: fgui.Controller;
	protected btn_play: fgui.GButton;
	protected txt_name: fgui.GTextField;
	protected txt_lock: fgui.GTextField;
	public static url: string = "ui://vith2b66efxiobj8";

	public static createInstance(): RenderVisitVoiceInfo {
		return <RenderVisitVoiceInfo>(fgui.UIPackage.createObject("PkgMain", "RenderVisitVoiceInfo"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.ctrl_playing = this.getControllerAt(1);
		this.btn_play = <fgui.GButton>(this.getChildAt(2));
		this.txt_name = <fgui.GTextField>(this.getChildAt(3));
		this.txt_lock = <fgui.GTextField>(this.getChildAt(4));
	}
}