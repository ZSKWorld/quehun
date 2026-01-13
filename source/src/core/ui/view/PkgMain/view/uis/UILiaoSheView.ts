import UILiaoShe from "../../../../ui/PkgMain/UILiaoShe";

export const enum EUILiaoSheMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UILiaoSheView extends ExtensionClass<IView, UILiaoShe>(UILiaoShe) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUILiaoSheMsg.OnComBackClick]);
	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
