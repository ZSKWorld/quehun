import ComDecorate from "../../../../ui/PkgMain/ComDecorate";

export const enum EComDecorateMsg {
	OnBtnCloseClick = "ComDecorate_OnBtnCloseClick",
}

export class ComDecorateView extends ExtensionClass<IView, ComDecorate>(ComDecorate) implements IView {

	override onCreate() {
		const { btn_closePreview } = this;
		btn_closePreview.onClick(this, this.sendEvent, [EComDecorateMsg.OnBtnCloseClick]);
	}

	override onEnable() {
		
	}
}
