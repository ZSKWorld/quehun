import UIMail from "../../../../ui/PkgMain/UIMail";

export const enum EUIMailMsg {
	OnBtnBackClick = "UIMail_OnBtnBackClick",
	OnBtnGetRewardClick = "UIMail_OnBtnGetRewardClick",
	OnBtnDeleteClick = "UIMail_OnBtnDeleteClick",
}

export class UIMailView extends ExtensionClass<IView, UIMail>(UIMail) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	get listTab() { return this.list_tab; }
	get listReward() { return this.list_reward; }

	override onCreate() {
		const { btn_back, btn_getReward, btn_delete, list_tab } = this;
		btn_back.onClick(this, this.sendEvent, [EUIMailMsg.OnBtnBackClick]);
		btn_getReward.onClick(this, this.sendEvent, [EUIMailMsg.OnBtnGetRewardClick]);
		btn_delete.onClick(this, this.sendEvent, [EUIMailMsg.OnBtnDeleteClick]);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4209);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	refreshEmail(count: number) {
		const { list_tab, ctrl_empty } = this;
		ctrl_empty.selectedIndex = count > 0 ? 0 : 1;
		list_tab.numItems = count;
	}

	refreshContent(data: ProtoObject<IMail>) {
		const { ctrl_body, txt_title, label_content, list_reward, txt_expire } = this;
		ctrl_body.selectedIndex = data.attachments.length > 0 ? (data.take_attachment ? 2 : 1) : 0;
		txt_title.text = $gameUtil.getI18nContext(data.title_i18n, data.title);
		label_content.text = $gameUtil.getI18nContext(data.content_i18n, data.content);
		list_reward.numItems = data.attachments.length;
		txt_expire.visible = data.expire_time > 0;
		txt_expire.text = this.getExpireDesc(data.expire_time - $timeUtil.second);
	}

	private getExpireDesc(second: number) {
		if (second <= 0) return $lang(3755);
		const { MinSec, HourSec, DaySec } = $timeUtil;
		const d = Math.floor(second / $timeUtil.DaySec);
		const h = Math.floor(second % DaySec / HourSec);
		const m = Math.floor(second % HourSec / MinSec);

		let str = "";
		if (d) str += d + $lang(2022);
		if (h) str += h + $lang(2021);
		if (m) str += m + $lang(2020);
		return str;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
