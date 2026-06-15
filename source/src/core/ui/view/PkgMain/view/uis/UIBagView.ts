import { RadioGroup } from "../../../../extention/RadioGroup";
import UIBag from "../../../../ui/PkgMain/UIBag";

export const enum EUIBagMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIBagView extends ExtendClass<IView, UIBag>(UIBag) implements IView {
	private _tabGroup = new RadioGroup();
	get tabBtns() {
		return [this.btn_daoJu, this.btn_liWu, this.btn_zhuangBan, this.btn_fuShi, this.btn_chaHua];
	}

	override onCreate() {
		const { _tabGroup, com_back, btn_daoJu, btn_liWu, btn_zhuangBan, btn_fuShi, btn_chaHua } = this;
		com_back.onBackClick(this, this.closeSelf);
		_tabGroup.init([btn_daoJu, btn_liWu, btn_zhuangBan, btn_fuShi, btn_chaHua], this, this.onTabGroupChanged);
	}

	refresh(index: number) {
		this._tabGroup.selectIndex = index;
	}

	private onTabGroupChanged(index: number) {
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
		this._tabGroup.clearSelection();
	}
}
