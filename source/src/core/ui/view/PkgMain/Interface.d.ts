declare interface IComMatchItemData {

}

declare interface IComMatchModeData {

}

declare interface IUIAchievementData {

}

declare interface IUIActivityOverviewData {

}

declare interface IUIAnnouncementData {

}

declare interface IUIBagData {
	index?: number;
}

declare type IUICheckCurrencyData = ECurrencyType;

declare interface IUICameraData {

}

declare interface IUIFriendData {

}

declare interface IUIHelpData {

}

declare interface IUILiaoSheData {
	/** 0:角色，1:装扮 */
	type: 0 | 1,
}

declare interface IUIMailData {

}

declare interface IUIMainData {

}

declare interface IUIObserverData {

}

declare interface IUIRecordData {

}

declare type IUIRankData = any;

declare type IUISettingData = 0 | 1 | 2 | 3 | 4;

declare interface IUIShopData {
	currencyType?: ECurrencyType;
}

declare interface IUITreasureData {

}

declare interface IUIVideoData {
	skinId: number;
	characterId?: number;
	callback?: SimpleHandler;
}

declare interface IUIVisitData {
	charId: number;
}

declare interface IUIChangeSkinData {
	charId: number;
}

declare interface IUIRecordShareData {
	/** 0-分享牌谱，1-查看其他牌谱 */
	type: 0 | 1,
	uuid?: string;
}
