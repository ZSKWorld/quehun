import UIObserver from "../../../../ui/PkgMain/UIObserver";

export const enum EUIObserverMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIObserverView extends ExtensionClass<IView, UIObserver>(UIObserver) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
