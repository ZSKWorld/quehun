import UIPaipu from "../../../ui/PkgMain/UIPaipu";

export const enum EUIPaipuMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIPaipuView extends ExtensionClass<IView, UIPaipu>(UIPaipu) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUIPaipuMsg.OnComBackClick]);
	}

	onOpenAni() {
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		return this.com_back.mediator.onCloseAni();
	}
}
