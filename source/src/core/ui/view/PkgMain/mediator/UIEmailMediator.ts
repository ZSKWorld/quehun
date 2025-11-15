import { ENotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { ComItem1View } from "../../PkgCommon/view/coms/ComItem1View";
import { BtnEmailTabView } from "../view/btns/BtnEmailTabView";
import { EUIEmailMsg, UIEmailView } from "../view/UIEmailView";

export interface IUIEmailData {

}

export class UIEmailMediator extends MediatorBase<UIEmailView, IUIEmailData> {
	private _lastTabClickItem: BtnEmailTabView;

	private get curMail() { return $userData.mail.mails[this.view.list_tab.selectedIndex]; }

	override onAwake() {
		this.addEvent(EUIEmailMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addEvent(EUIEmailMsg.OnBtnGetRewardClick, this.onBtnGetRewardClick);
		this.addEvent(EUIEmailMsg.OnBtnDeleteClick, this.onBtnDeleteClick);
		$uiUtil.setList(this.view.list_tab, true, this, this.onListTabRender, this.onListTabItemClick);
		$uiUtil.setList(this.view.list_reward, true, this, this.onListRewardRender);
	}

	override onEnable() {
		this.setTabIndex(0);
	}

	@InterestNotify(ENotifyConst.OnMailDataChanged)
	private setTabIndex(index: number) {
		const { view } = this;
		index = index ?? view.list_tab.selectedIndex;
		view.refreshTab($userData.mail.mails.length, 0);
		const item = view.list_tab.getChildAt<BtnEmailTabView>(0);
		item && this.onListTabItemClick(item);
	}

	private onListTabRender(index: number, item: BtnEmailTabView) {
		item.refresh($userData.mail.mails[index]);
	}

	private onListTabItemClick(item: BtnEmailTabView) {
		if (this._lastTabClickItem == item) return;
		this._lastTabClickItem = item;
		const { view, curMail } = this;
		view.refreshContent(curMail);
		if (curMail.state == 0)
			$netMgr.requests.readMail({ mail_id: curMail.mail_id });
	}

	private onListRewardRender(index: number, item: ComItem1View) {
		const data = this.curMail;
		const reward = data.attachments[index];
		item.refresh1(reward.id, reward.count, data.take_attachment, true);
	}

	private onBtnBackClick() {
		this.closeSelf();
	}

	private onBtnGetRewardClick() {
		$netMgr.requests.takeAttachmentFromMail({ mail_id: this.curMail.mail_id });
	}

	private onBtnDeleteClick() {
		$netMgr.requests.deleteMail({ mail_id: this.curMail.mail_id });
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}