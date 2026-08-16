import UITest from "../../../../ui/PkgCommon/UITest";

export const enum EUITestMsg {
}

export class UITestView extends UITest {

	override onCreate() {
		const { btn_close } = this;
		btn_close.onClick(this, this.closeSelf);
	}

}
