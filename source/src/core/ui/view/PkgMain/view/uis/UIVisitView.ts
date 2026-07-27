import UIVisit from "../../../../ui/PkgMain/UIVisit";

export const enum EUIVisitMsg {
}

export class UIVisitView extends ExtendClass<IView, UIVisit>(UIVisit) implements IView {

	override onCreate() {
		const { com_back, btn_tab0, btn_tab1, btn_tab2 } = this;
		com_back.onClick(this, this.closeSelf);
	}

	refresh(charId: number) {
		this.ctrl_type.selectedIndex = 0;
		this.com_intro.refresh(charId);
	}

	override onOpenAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_show),
			this.com_back.onOpenAni(),
		]);
	}

	override onCloseAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_show, true),
			this.com_back.onCloseAni(),
		]);
	}
}
