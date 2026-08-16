import UIChangeSkin from "../../../../ui/PkgMain/UIChangeSkin";

export const enum EUIChangeSkinMsg {

}

export class UIChangeSkinView extends UIChangeSkin {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}


	override onOpenAni() {
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		return this.com_back.onCloseAni();
	}
}
