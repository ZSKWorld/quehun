import { LocalData, LocalDataKey } from "../../../../common/LocalData";
import { NotifyConst } from "../../../../common/NotifyConst";
import { TimeUtil } from "../../../../common/utils/TimeUtil";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIMainMsg, UIMainView } from "../view/UIMainView";

export interface UIMainData {

}

export class UIMainMediator extends MediatorBase<UIMainView, UIMainData> {
	/** 悬浮球拖拽中 */
	private _sphereDragged: boolean;

	override onAwake() {
		this.addEvent(UIMainMsg.OnBtnTrainClick, this.onBtnTrainClick);
		this.addEvent(UIMainMsg.OnBtnCharClick, this.onBtnCharClick);
		this.addEvent(UIMainMsg.OnBtnGoodsClick, this.onBtnGoodsClick);
		this.addEvent(UIMainMsg.OnBtnShopClick, this.onBtnShopClick);
		this.addEvent(UIMainMsg.OnBtnAbodeClick, this.onBtnAbodeClick);
		this.addEvent(UIMainMsg.OnBtnChatClick, this.openView, [ViewID.UIChatView]);
		this.addEvent(UIMainMsg.OnBtnSettingClick, this.openView, [ViewID.UISettingView]);
		this.addEvent(UIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addEvent(UIMainMsg.OnBtnSphereClick, this.onBtnSphereClick);
		this.addEvent(UIMainMsg.OnBtnSphereDraged, this.onBtnSphereDraged);

		const { offline, account } = userData;
		const txt = $richText("正在构建游戏世界").break()
			.append("正在计算离线收益").break()
			.append("初始化完毕").break();

		const offlineConfirmTxt = $richText("欢迎回来").break()
			.append(`你最后一次在线时间为:${ TimeUtil.milliSecond2YMDHMS(account.lastOnlineTime) }`).break();
		if (offline) {
			offlineConfirmTxt.append(`离线时长${ TimeUtil.timeFormatChinese(offline.offlineTime) }`).break()
				.append(`获得精力${ offline.vigor }点`);
			Laya.timer.callLater(null, $confirm, ["离线详情", offlineConfirmTxt.text, false]);
			offlineConfirmTxt.break();
		}
		txt.append(offlineConfirmTxt.end());
		const battleSpeed = LocalData.get(LocalDataKey.BattleSpeed) || 1;
		LocalData.set(LocalDataKey.BattleSpeed, battleSpeed);
		txt.append($richText("放置游戏，资源全开放，所有道具货币都可获取").size(60).color("#FFFFFF").end()).break()
			.append($richText("熬死大佬，你就是大佬!").size(60).color("#FF842E").end()).break()
			.append(`战斗速度调整为${ battleSpeed }倍速`);
		this.dispatch(NotifyConst.AddGameLog, txt.end());
	}

	override onEnable() {
		this.setSphereDraged(false);
		this.refreshPlayerInfo();
	}

	private onBtnTrainClick() {

	}

	private onBtnCharClick() {

	}

	private onBtnGoodsClick() {

	}

	private onBtnShopClick() {

	}

	private onBtnAbodeClick() {

	}

	private onBtnRankClick() {

	}

	private onBtnSphereClick() {
		if (this._sphereDragged) return;
		this.openView(ViewID.UISphereToolView);
	}

	private onBtnSphereDraged(draged: boolean) {
		if (!!draged) this.setSphereDraged(true);
		else Laya.timer.frameOnce(1, this, this.setSphereDraged, [false]);
	}

	private setSphereDraged(value: boolean) {
		this._sphereDragged = value;
	}

	private refreshPlayerInfo() {
		this.view.refreshPlayerInfo();
	}
}