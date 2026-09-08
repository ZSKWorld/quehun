import UITestMain from "../../../../ui/PkgTest/UITestMain";

export const enum EUITestMainMsg {

}

export class UITestMainView extends UITestMain {

	override onCreate() {
		const { btn_close, btn_spineTest, btn_bezierTest } = this;
		btn_close.onClick(this, this.closeSelf);
		btn_spineTest.onClick(this, this.openView, [EViewID.UITestSpineView]);
		btn_bezierTest.onClick(this, this.openView, [EViewID.UITestBezierView]);
	}

}
