import UILiaoShe from "../../../../ui/PkgMain/UILiaoShe";

export const enum EUILiaoSheMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UILiaoSheView extends ExtensionClass<IView, UILiaoShe>(UILiaoShe) implements IView {

	override onCreate() {
		const { com_back, btn_char, btn_deco } = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_char.onClick(this, this.refreshContent, [0, true]);
		btn_deco.onClick(this, this.refreshContent, [1, true]);
	}

	refreshContent(type: 0 | 1, anim: boolean) {
		if(anim && this.ctrl_type.selectedIndex == type) return;
		const showChar = type == 0;
		const { ctrl_type, img_bg, btn_char, btn_deco, trans_toChar, trans_toDeco, com_character, com_decorate } = this;
		btn_char.selected = showChar;
		btn_deco.selected = !showChar;
		btn_char.sortingOrder = +showChar;
		btn_deco.sortingOrder = +!showChar;
		ctrl_type.selectedIndex = type;
		fgui.GTween.kill(img_bg);
		const imgBgTargetWidth = showChar ? 764 : 1580;
		if (anim) img_bg.tweenWidth(imgBgTargetWidth, 0.2);
		else img_bg.width = imgBgTargetWidth;
		const trans = showChar ? trans_toChar : trans_toDeco;
		trans.play(null, 1, 0, anim ? 0 : trans.totalDuration);
		type == 0 ? com_character.refresh(!anim) : com_decorate.refresh();
	}

	override onOpenAni() {
		if (this.ctrl_type.selectedIndex == 0) {
			this.trans_show1.play();
		} else {
			this.trans_show2.play();
		}
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		if (this.ctrl_type.selectedIndex == 0) {
			this.trans_close1.play();
		} else {
			this.trans_close2.play();
		}
		return this.com_back.onCloseAni();
	}
}
