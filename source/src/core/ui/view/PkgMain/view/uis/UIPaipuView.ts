import UIPaipu from "../../../../ui/PkgMain/UIPaipu";

export const enum EUIPaipuMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIPaipuView extends ExtendClass<IView, UIPaipu>(UIPaipu) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
