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

	refreshContent(index: number) {
		const showChar = index == 0;
		const { btn_char, btn_deco, ctrl_type, trans_showChar, trans_showDeco} = this;
		btn_char.sortingOrder = +showChar;
		btn_deco.sortingOrder = +!showChar;
		ctrl_type.selectedIndex = +!showChar;
		showChar ? trans_showChar.play() : trans_showDeco.play();
	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
