import UITestSnake from "../../../../ui/PkgTest/UITestSnake";

export class UITestSnakeView extends UITestSnake {

	override onCreate() {
		const { btn_close, btn_resetObs } = this;
		btn_close.onClick(this, this.closeSelf);
	}

}
