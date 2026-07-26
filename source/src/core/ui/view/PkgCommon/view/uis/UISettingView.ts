import UISetting from "../../../../ui/PkgCommon/UISetting";


export class UISettingView extends ExtendClass<IView, UISetting>(UISetting) implements IView {
	override onCreate() {
		const { btn_mask, btn_close, btn_logout, txt_version } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_logout.onClick(this, () => {
			$confirmSma(3, $lang(2718)).then(v => {
				if (!v) return;
				$gameMgr.logout();
			});
		});

		const { resourceVersion, platform, packageVersion } = $gameMgr;
		txt_version.text = $lang(2040) + "v" + resourceVersion + "." + platform[0] + "." + packageVersion;
	}

	refresh(type: 0 | 1 | 2 | 3 | 4) {
		this.ctrl_type.selectedIndex = type;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
