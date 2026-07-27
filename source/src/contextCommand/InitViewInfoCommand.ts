import { Command } from "../core/mvc/controller/Command";

export class InitViewInfoCommand extends Command {
	override execute(notifyName: string, data?: any) {
		const { Scene, UIBottom, UIMiddle, UITop } = ELayer;
		const { Popup } = EViewCategory;
		const registerViewInfo = $facade.registerViewInfo.bind($facade) as typeof $facade.registerViewInfo;
		const viewMap: { [key in EUIViewID]: [ELayer?, EViewCategory?] } = {
			[EViewID.UIConfirmBigView]: [UIBottom, Popup],
			[EViewID.UIConfirmMiddleView]: [UIBottom, Popup],
			[EViewID.UIConfirmSmallView]: [UIBottom, Popup],
			[EViewID.UIGetRewardView]: [UIBottom, Popup],
			[EViewID.UIItemDetailView]: [UIBottom, Popup],
			[EViewID.UILoadingView]: [UITop],
			[EViewID.UILoading2View]: [UITop],
			[EViewID.UITestView]: [],
			[EViewID.UIChooseServerView]: [],
			[EViewID.UIEntranceView]: [],
			[EViewID.UIBindPhoneView]: [],
			[EViewID.UILoginView]: [],
			[EViewID.UILoginQueueView]: [],
			[EViewID.UIAchievementView]: [],
			[EViewID.UIActivityView]: [UIBottom, Popup],
			[EViewID.UIAnnouncementView]: [UIBottom, Popup],
			[EViewID.UIBagView]: [],
			[EViewID.UICameraView]: [],
			[EViewID.UIFriendView]: [],
			[EViewID.UIGuideView]: [UIBottom, Popup],
			[EViewID.UIHelpView]: [UIBottom, Popup],
			[EViewID.UILiaoSheView]: [],
			[EViewID.UIMailView]: [UIBottom, Popup],
			[EViewID.UIMainView]: [],
			[EViewID.UIObserverView]: [],
			[EViewID.UIPaipuView]: [],
			[EViewID.UIRankView]: [UIBottom, Popup],
			[EViewID.UIRechargeView]: [],
			[EViewID.UISettingView]: [UIBottom, Popup],
			[EViewID.UISevenDayView]: [UIBottom, Popup],
			[EViewID.UIShopView]: [],
			[EViewID.UITreasureView]: [],
			[EViewID.UIVideoView]: [],
			[EViewID.UIBuyGoodsView]: [UIBottom, Popup],
			[EViewID.UIPaymentView]: [UIBottom, Popup],
			[EViewID.UICheckCurrencyView]: [UIBottom, Popup],
			[EViewID.UITextInputView]: [UIBottom, Popup],
			[EViewID.UIAchievementDetailView]: [],
			[EViewID.UIChangeSkinView]: [],
			[EViewID.UIVisitView]: []
		};
		for (const viewId in viewMap) {
			const [layer, category] = viewMap[viewId];
			registerViewInfo(viewId as EUIViewID, layer, category);
		}
	}
}
