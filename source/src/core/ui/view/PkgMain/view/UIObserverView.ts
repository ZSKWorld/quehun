import UIObserver from "../../../ui/PkgMain/UIObserver";

export const enum EUIObserverMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIObserverView extends ExtensionClass<IView, UIObserver>(UIObserver) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.btn_back.onClick(this, this.sendEvent, [EUIObserverMsg.OnComBackClick]);
	}

}
