import RenderAchieveGroup from "../../../../ui/PkgAchievement/RenderAchieveGroup";

export class RenderAchieveGroupView extends ExtendClass<IView, RenderAchieveGroup>(RenderAchieveGroup) implements IView {

	private _groupCfg: ISheetData_Achievement_AchievementGroup;

	override onCreate() {
		this.onClick(this, this.openView, [EViewID.UIAchievementDetailView, null, EViewOpenType.Hide]);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.asLoader, $langRes("myres/achievement/" + this._groupCfg.img));
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.asLoader);
	}

	init(cfg: ISheetData_Achievement_AchievementGroup) {
		this._groupCfg = cfg;
		this.title = cfg.langField(ECfgLangField.name);
		const percentage = !!cfg.percentage;
		this._titleObject.y = percentage ? 305 : 325;
		this.txt_percent.visible = percentage;
		this.img_proBg.visible = percentage;
		this.img_proBar.visible = percentage;
	}

	refresh(percent: number, haveReward: boolean) {
		this.img_redDot.visible = haveReward;
		if (!this._groupCfg.percentage) return;
		percent = $mathUtil.clamp01(percent);
		this._iconObject.asCom._children[0].visible = percent >= 1;
		this.txt_percent.text = `${ (percent * 100).toFixed(1) }%`;
		this.img_proBar.fillAmount = percent * 0.94 + 0.03;
	}
}
