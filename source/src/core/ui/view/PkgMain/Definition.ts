export const enum EUIMainEvent {
}

export const enum EComMatchModeType {
	/** 主页 */
	Mode,
	/** 段位场 */
	RankMode,
	/** 比赛场 */
	MatchMode,
	/** 友人场 */
	FriendMode,
	/** 段位场1 */
	RankMode1,
	/** 比赛场1 */
	MatchMode1,
}

export const enum EUIRankType {
	SiMa = 1,
	SanMa = 2,
}

export const enum EUIShopTabType {
	/** 服饰屋 */
	FSW,
	/** 杂货屋 */
	ZHW,
	/** 背景屋 */
	BJW,
	/** 祈愿屋 */
	QYW,
	/** 星之屋 */
	XZW,
	/** 插画屋 */
	CHW,
	/** 福袋屋 */
	FDW,
}

export const enum EUIAnnounceEvent {
	OnTabSelectChanged = "EUIAnnounceEvent_OnTabSelectChanged",
}

export const enum EUISevenDayRenderClickEvent {
	Question = -2,
	Reward = -1,
	JumpUIHelp = 1,
	JumpUILiaoShe,
	JumpUIShop,
	JumpUIRecord,
	JumpUIObserver,
	JumpUIAchievement,
	JumpUICreateRoom = 11,
	JumpUILobby,
	JumpUIBag,
}

export const enum EUISevenDayEvent {
	OnTabSelectChanged = "EUISevenDayEvent_OnTabSelectChanged",
	OnTaskBtnClick = "EUISevenDayEvent_OnTaskBtnClick",
	OnQABtnCloseClick = "EUISevenDayEvent_OnQABtnCloseClick",
	OnQABtnAnswerClick = "EUISevenDayEvent_OnQABtnAnswerClick",
	OnQABtnSkipClick = "EUISevenDayEvent_OnQABtnSkipClick",
}

export const enum EUILiaoSheEvent {
	OnLiaoSheCharSelected = "EUILiaoSheEvent_OnLiaoSheCharSelected",
}

export const enum EUIVisitEvent {

}