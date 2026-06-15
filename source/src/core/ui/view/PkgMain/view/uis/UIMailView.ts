import UIMail from "../../../../ui/PkgMain/UIMail";
import { BtnMailTabView } from "../btns/BtnMailTabView";
import { RenderMailItemView } from "../renders/RenderMailItemView";

export const enum EUIMailMsg {
	OnTabSelectChanged = "UIMail_OnTabSelectChanged",
	OnBtnGetRewardClick = "UIMail_OnBtnGetRewardClick",
	OnBtnDeleteClick = "UIMail_OnBtnDeleteClick",
}

export class UIMailView extends ExtendClass<IView, UIMail>(UIMail) implements IView {

	private _mails: ProtoObject<IMail>[];

	private get curMail() { return this._mails[this.list_tab.selectedIndex]; }

	override onCreate() {
		const { btn_mask, btn_back, btn_getReward, btn_delete, list_tab, list_reward } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_back.onClick(this, this.closeSelf);
		btn_getReward.onClick(this, this.sendEvent, [EUIMailMsg.OnBtnGetRewardClick]);
		btn_delete.onClick(this, this.sendEvent, [EUIMailMsg.OnBtnDeleteClick]);

		$uiUtil.setList(list_tab, true, this, this.onListTabRender, this.onListTabItemClick);
		$uiUtil.setList(list_reward, true, this, this.onListRewardRender);
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4209);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	refreshTab(mails: ProtoObject<IMail>[], selectMailId: number) {
		this._mails = mails;
		const { ctrl_head, ctrl_empty, list_tab } = this;
		ctrl_head.selectedIndex = mails.length > 0 ? 1 : 0;
		ctrl_empty.selectedIndex = mails.length > 0 ? 0 : 1;
		if (mails.length > 0) {
			list_tab.numItems = mails.length;
			const index = Math.max(mails.findIndex(v => v.mail_id == selectMailId), 0);
			list_tab.selectedIndex = index;
			this.onListTabItemClick(null, null, index);
		}
	}

	private onListTabRender(index: number, item: BtnMailTabView) {
		item.refresh(this._mails[index]);
	}

	private onListTabItemClick(_, __, index: number) {
		const data = this.curMail;
		const { ctrl_body, txt_title, label_content, list_reward, txt_expire, img_time } = this;
		ctrl_body.selectedIndex = data.attachments.length > 0 ? (data.take_attachment ? 2 : 1) : 0;
		txt_title.text = $gameUtil.getI18nContext(data.title_i18n, data.title);
		label_content.text = $gameUtil.getI18nContext(data.content_i18n, data.content);
		list_reward.numItems = data.attachments.length;
		img_time.visible = txt_expire.visible = data.expire_time > 0;
		txt_expire.text = this.getExpireDesc(data.expire_time - $timeUtil.second);

		this.sendEvent(EUIMailMsg.OnTabSelectChanged, index);
	}

	private onListRewardRender(index: number, item: RenderMailItemView) {
		const { attachments, take_attachment } = this.curMail;
		const reward = attachments[index];
		item.refresh(reward.id, reward.count, take_attachment, true);
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
		if (!str) str = "1" + $lang(2020);
		return $lang(3754, str);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
