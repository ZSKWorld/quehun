import ComVisitIntro from "../../../../ui/PkgMain/ComVisitIntro";

export const enum EComVisitIntroMsg {
}

export class ComVisitIntroView extends ExtendClass<IView, ComVisitIntro>(ComVisitIntro) implements IView {

	override onCreate() {
		const { btn_qiyue, btn_zengli, btn_close, ctrl_gift } = this;
		btn_qiyue.mode = btn_zengli.mode = fgui.ButtonMode.Radio;
		btn_close.onClick(this, () => ctrl_gift.selectedIndex = 0);
	}

	refresh(charId: number) {
		this.ctrl_gift.selectedIndex = 0;
		this.com_charInfo.refresh(charId);
	}
}
