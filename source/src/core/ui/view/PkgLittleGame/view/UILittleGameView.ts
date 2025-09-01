import UILittleGame from "../../../ui/PkgLittleGame/UILittleGame";

export const enum UILittleGameMsg {
	OnBtnBackClick = "UILittleGame_OnBtnBackClick",
	OnBtn2048Click = "UILittleGame_OnBtn2048Click",
}

export class UILittleGameView extends ExtensionClass<IView, UILittleGame>(UILittleGame) implements IView {

	override onCreate() {
		const { btn_back, btn_2048 } = this;
		btn_back.onClick(this, this.sendEvent, [UILittleGameMsg.OnBtnBackClick]);
		btn_2048.onClick(this, this.sendEvent, [UILittleGameMsg.OnBtn2048Click]);
	}

}
