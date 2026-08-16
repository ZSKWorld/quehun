import UITreasure from "../../../../ui/PkgMain/UITreasure";

export const enum EUITreasureMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UITreasureView extends UITreasure {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}

	override onDisable() {
		const anis = [this.trans_show];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
	}
}
