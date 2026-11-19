import { Command } from "../core/mvc/controller/Command";

export class InitViewInfoCommand extends Command {
	override execute(notifyName: string, data?: any) {
		const { Scene, UIBottom, UIMiddle, UITop, Popup, Loading } = ELayer;
		const { FullScreen, Popup: CPopup } = EViewCategory;
		const registerViewInfo = $facade.registerViewInfo.bind($facade) as typeof $facade.registerViewInfo;
		const viewMap: { [key in EUIViewID]: [ELayer?, EViewCategory?] } = {
			[EViewID.UIConfirmBigView]: [Popup, CPopup],
			[EViewID.UIConfirmMiddleView]: [Popup, CPopup],
			[EViewID.UIConfirmSmallView]: [Popup, CPopup],
			[EViewID.UIGetRewardView]: [UIMiddle, CPopup],
			[EViewID.UIItemDetailView]: [UIMiddle, CPopup],
			[EViewID.UILoadingView]: [Loading],
			[EViewID.UILoading2View]: [Loading],
			[EViewID.UIChooseServerView]: [],
			[EViewID.UIEntranceView]: [],
			[EViewID.UIBindPhoneView]: [],
			[EViewID.UILoginView]: [],
			[EViewID.UILoginQueueView]: [],
			[EViewID.UIAchievementView]: [],
			[EViewID.UIActivityOverviewView]: [UIMiddle, CPopup],
			[EViewID.UIAnnouncementView]: [UIMiddle, CPopup],
			[EViewID.UIBagView]: [],
			[EViewID.UICameraView]: [],
			[EViewID.UIFriendView]: [],
			[EViewID.UIGuideView]: [UIMiddle, CPopup],
			[EViewID.UIHelpView]: [UIMiddle, CPopup],
			[EViewID.UILiaoSheView]: [],
			[EViewID.UIMailView]: [UIMiddle, CPopup],
			[EViewID.UIMainView]: [],
			[EViewID.UIObserverView]: [],
			[EViewID.UIRecordView]: [],
			[EViewID.UIRankView]: [UIMiddle, CPopup],
			[EViewID.UIRechargeView]: [],
			[EViewID.UISettingView]: [UIMiddle, CPopup],
			[EViewID.UISevenDayView]: [UIMiddle, CPopup],
			[EViewID.UIShopView]: [],
			[EViewID.UITreasureView]: [],
			[EViewID.UIVideoView]: [],
			[EViewID.UIBuyGoodsView]: [UIMiddle, CPopup],
			[EViewID.UIPaymentView]: [UIMiddle, CPopup],
			[EViewID.UICheckCurrencyView]: [UIMiddle, CPopup],
			[EViewID.UITextInputView]: [UIMiddle, CPopup],
			[EViewID.UIAchievementDetailView]: [],
			[EViewID.UIChangeSkinView]: [],
			[EViewID.UIVisitView]: [],
			[EViewID.UIRecordRemarksView]: [UIMiddle, CPopup],
			[EViewID.UIMakaAnalysisView]: [UIMiddle, CPopup],
			[EViewID.UIRecordShareView]: [UIMiddle, CPopup],

			[EViewID.UITestBezierView]: [UITop],
			[EViewID.UITestMainView]: [UITop],
			[EViewID.UITestSpineView]: [UITop],
			[EViewID.UITestAStarView]: [UITop],
			[EViewID.UITestSnakeView]: [UITop],
		};
		for (const viewId in viewMap) {
			const [layer, category] = viewMap[viewId];
			registerViewInfo(viewId as EUIViewID, layer, category);
		}
	}
}
