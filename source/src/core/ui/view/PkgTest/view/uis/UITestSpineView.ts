import UITestSpine from "../../../../ui/PkgTest/UITestSpine";

export const enum EUITestSpineMsg {

}

export class UITestSpineView extends UITestSpine {

	override onCreate() {
		const { btn_close } = this;
		btn_close.onClick(this, this.closeSelf);
	}

}
