import { Command } from "../core/mvc/controller/Command";

export class InitViewInfoCommand extends Command {
	override execute(notifyName: string, data?: any) {
		const { Scene, UIBottom, UIMiddle, UITop, Popup, Loading } = ELayer;
		const { FullScreen, Popup: CPopup } = EViewCategory;
		const registerViewInfo = $facade.registerViewInfo.bind($facade) as typeof $facade.registerViewInfo;
		const viewMap: { [key in EUIViewID]: [ELayer?, EViewCategory?] } = {
			[EViewID.UIChooseServerView]: [],
			[EViewID.UIEntranceView]: [],
			[EViewID.UIBindPhoneView]: [],
			[EViewID.UILoginView]: [],
			[EViewID.UILoginQueueView]: [],
			[EViewID.UIAchievementView]: [],
			[EViewID.UIBagView]: [],
			[EViewID.UICameraView]: [],
			[EViewID.UIFriendView]: [],
			[EViewID.UILiaoSheView]: [],
			[EViewID.UIMainView]: [],
			[EViewID.UIObserverView]: [],
			[EViewID.UIRecordView]: [],
			[EViewID.UIRechargeView]: [],
			[EViewID.UIShopView]: [],
			[EViewID.UITreasureView]: [],
			[EViewID.UIVideoView]: [],
			[EViewID.UIAchievementDetailView]: [],
			[EViewID.UIChangeSkinView]: [],
			[EViewID.UIVisitView]: [],
			[EViewID.UICreateRoomView]: [],
			[EViewID.UIFriendRoomView]: [],

			[EViewID.UIGetRewardView]: [UIMiddle, CPopup],
			[EViewID.UIItemDetailView]: [UIMiddle, CPopup],
			[EViewID.UIActivityOverviewView]: [UIMiddle, CPopup],
			[EViewID.UIAnnouncementView]: [UIMiddle, CPopup],
			[EViewID.UIGuideView]: [UIMiddle, CPopup],
			[EViewID.UIHelpView]: [UIMiddle, CPopup],
			[EViewID.UIMailView]: [UIMiddle, CPopup],
			[EViewID.UIRankView]: [UIMiddle, CPopup],
			[EViewID.UISettingView]: [UIMiddle, CPopup],
			[EViewID.UISevenDayView]: [UIMiddle, CPopup],
			[EViewID.UIBuyGoodsView]: [UIMiddle, CPopup],
			[EViewID.UIPaymentView]: [UIMiddle, CPopup],
			[EViewID.UICheckCurrencyView]: [UIMiddle, CPopup],
			[EViewID.UITextInputView]: [UIMiddle, CPopup],
			[EViewID.UIRecordRemarksView]: [UIMiddle, CPopup],
			[EViewID.UIMakaAnalysisView]: [UIMiddle, CPopup],
			[EViewID.UIRecordShareView]: [UIMiddle, CPopup],
			[EViewID.UIRoomRuleView]: [UIMiddle, CPopup],
			[EViewID.UINumberInputView]: [UIMiddle, CPopup],

			[EViewID.UITestBezierView]: [UITop],
			[EViewID.UITestMainView]: [UITop],
			[EViewID.UITestSpineView]: [UITop],
			[EViewID.UITestAStarView]: [UITop],
			[EViewID.UITestSnakeView]: [UITop],

			[EViewID.UIConfirmBigView]: [Popup, CPopup],
			[EViewID.UIConfirmMiddleView]: [Popup, CPopup],
			[EViewID.UIConfirmSmallView]: [Popup, CPopup],
			[EViewID.UIInfoView]: [Popup, CPopup],

			[EViewID.UILoadingView]: [Loading],
			[EViewID.UILoading2View]: [Loading],
		};
		for (const viewId in viewMap) {
			const [layer, category] = viewMap[viewId];
			registerViewInfo(viewId as EUIViewID, layer, category);
		}
	}
}
