import UISetting from "../../../../ui/PkgCommon/UISetting";


export class UISettingView extends UISetting {
	override onCreate() {
		const { btn_mask, btn_close, btn_logout, txt_version } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_logout.onClick(this, this.onBtnLogoutClick);

		txt_version.text = $lang(2040) + $gameMgr.displayVersionStr;
	}

	refresh(type: 0 | 1 | 2 | 3 | 4) {
		this.ctrl_type.selectedIndex = type;
	}

	private onBtnLogoutClick() {
		$confirmSma(3, $lang(2718)).then(v => {
			if (!v) return;
			$gameMgr.exitGame(true);
		});
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
