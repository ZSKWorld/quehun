import UIBag from "../../../../ui/PkgMain/UIBag";

export const enum EUIBagMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIBagView extends ExtensionClass<IView, UIBag>(UIBag) implements IView {
	get tabBtns() {
		return [this.btn_daoJu, this.btn_liWu, this.btn_zhuangBan, this.btn_fuShi, this.btn_chaHua];
	}

	override onCreate() {
		const { com_back, btn_daoJu, btn_liWu, btn_zhuangBan, btn_fuShi, btn_chaHua } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	refreshPage(index: number) {
		this.ctrl_type.selectedIndex = index;
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_t0);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_t0, true);
		return this.com_back.onCloseAni();
	}

	override onDisable() {
		const anis = [this.trans_t0];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
	}
}
