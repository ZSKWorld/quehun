import UIObserver from "../../../ui/PkgMain/UIObserver";

export const enum EUIObserverMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIObserverView extends ExtensionClass<IView, UIObserver>(UIObserver) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUIObserverMsg.OnComBackClick]);
	}

	onOpenAni() {
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		return this.com_back.mediator.onCloseAni();
	}
}
