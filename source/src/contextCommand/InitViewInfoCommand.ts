import { Command } from "../core/mvc/controller/Command";

export class InitViewInfoCommand extends Command {
	override execute(notifyName: string, data?: any) {
		const { Scene, UIBottom, UIMiddle, UITop } = ELayer;
		const { Popup } = EViewCategory;
		const registerViewInfo = $facade.registerViewInfo.bind($facade) as typeof $facade.registerViewInfo;
		registerViewInfo(EViewID.UIConfirmBigView, UIBottom, Popup);
		registerViewInfo(EViewID.UIConfirmMiddleView, UIBottom, Popup);
		registerViewInfo(EViewID.UIConfirmSmallView, UIBottom, Popup);
		registerViewInfo(EViewID.UIItemDetailView, UIBottom, Popup);
		registerViewInfo(EViewID.UILoadingView, UITop);
		registerViewInfo(EViewID.UILoading2View, UITop);
		registerViewInfo(EViewID.UITestView);
		registerViewInfo(EViewID.UIChooseServerView);
		registerViewInfo(EViewID.UIEntranceView);
		registerViewInfo(EViewID.UIBindPhoneView);
		registerViewInfo(EViewID.UILoginView);
		registerViewInfo(EViewID.UILoginQueueView);
		registerViewInfo(EViewID.UIAchievementView);
		registerViewInfo(EViewID.UIActivityView, UIBottom, Popup);
		registerViewInfo(EViewID.UIAnnouncementView, UIBottom, Popup);
		registerViewInfo(EViewID.UIBagView);
		registerViewInfo(EViewID.UICameraView);
		registerViewInfo(EViewID.UIFriendView);
		registerViewInfo(EViewID.UIHelpView, UIBottom, Popup);
		registerViewInfo(EViewID.UILiaoSheView);
		registerViewInfo(EViewID.UIMailView, UIBottom, Popup);
		registerViewInfo(EViewID.UIMainView);
		registerViewInfo(EViewID.UIObserverView);
		registerViewInfo(EViewID.UIPaipuView);
		registerViewInfo(EViewID.UIRankView, UIBottom, Popup);
		registerViewInfo(EViewID.UIRechargeView);
		registerViewInfo(EViewID.UISettingView, UIBottom, Popup);
		registerViewInfo(EViewID.UIShopView);
		registerViewInfo(EViewID.UITreasureView);
		registerViewInfo(EViewID.UIVideoView);
	}
}
