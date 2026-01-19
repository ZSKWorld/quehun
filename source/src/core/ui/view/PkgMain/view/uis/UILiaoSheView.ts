import UILiaoShe from "../../../../ui/PkgMain/UILiaoShe";

export const enum EUILiaoSheMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UILiaoSheView extends ExtensionClass<IView, UILiaoShe>(UILiaoShe) implements IView {
	get btnChar() { return this.btn_char; }
	get btnDeco() { return this.btn_deco; }

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUILiaoSheMsg.OnComBackClick]);
	}

	playCharDecoAnim(showChar: boolean) {

	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
