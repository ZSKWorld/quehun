import BtnSwitch1 from "../../../../ui/PkgCommon/BtnSwitch1";

export const enum EBtnSwitch1Msg {

}

export class BtnSwitch1View extends ExtendClass<IView, BtnSwitch1>(BtnSwitch1) implements IView {

	override get selected() { return super.selected; }
	override set selected(v) {
		if (!!super.selected == v) return;
		super.selected = v;
		this.onStateChanged();
	}

	private onStateChanged() {
		const { selected, txt_title1, txt_title2, img_bar } = this;
		fgui.GTween.kill(txt_title1);
		fgui.GTween.kill(txt_title2);
		fgui.GTween.kill(img_bar);
		const targetTxt1Alpha = selected ? 1 : 0;
		const targetTxt2Alpha = selected ? 0 : 1;
		const targetImgX = selected ? 77 : -4;
		txt_title1.tweenFade(targetTxt1Alpha, Math.abs(targetTxt1Alpha - txt_title1.alpha) * 0.1);
		txt_title2.tweenFade(targetTxt2Alpha, Math.abs(targetTxt2Alpha - txt_title2.alpha) * 0.1);
		img_bar.tweenMoveX(targetImgX, Math.abs(targetImgX - img_bar.x) / 81 * 0.1);
	}
}
