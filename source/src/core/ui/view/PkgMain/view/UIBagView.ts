import UIBag from "../../../ui/PkgMain/UIBag";

export const enum EUIBagMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIBagView extends ExtensionClass<IView, UIBag>(UIBag) implements IView {
	get tabBtns() {
		return [this.btn_daoJu, this.btn_liWu, this.btn_zhuangBan, this.btn_fuShi, this.btn_chaHua];
	}

	override onCreate() {
		const { com_back, btn_daoJu, btn_liWu, btn_zhuangBan, btn_fuShi, btn_chaHua } = this;
		btn_daoJu.mode = btn_liWu.mode = btn_zhuangBan.mode = btn_fuShi.mode = btn_chaHua.mode = fgui.ButtonMode.Radio;
		com_back.onBackClick(this, this.sendEvent, [EUIBagMsg.OnComBackClick]);
	}

	refreshPage(index: number) {
		this.ctrl_type.selectedIndex = index;
		if(index == 0) this.refreshItem();
		else if(index == 1) this.refreshGift();
		else if(index == 2) this.refreshDeco();
		else if(index == 3) this.refreshSkin();
		else if(index == 4) this.refreshIllust();
	}

	refreshItem() { }

	refreshGift() { }

	refreshDeco() { }

	refreshSkin() { }

	refreshIllust() { }

	onOpenAni() {
		return Promise.all([
			this.com_back.mediator.onOpenAni(),
			$uiUtil.playTrans(this.trans_t0),
		]) as unknown as Promise<void>;
	}

	onCloseAni() {
		return Promise.all([
			this.com_back.mediator.onCloseAni(),
			$uiUtil.playTrans(this.trans_t1),
		]) as unknown as Promise<void>;
	}

}
