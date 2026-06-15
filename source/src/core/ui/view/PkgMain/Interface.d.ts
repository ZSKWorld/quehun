declare interface IComMatchItemData {

}

declare interface IComMatchModeData {

}

declare interface IUIAchievementData {

}

declare interface IUIActivityData {

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

declare interface IUIPaipuData {

}

declare type IUIRankData = any;

declare interface IUISettingData {

}

declare interface IUIShopData {
	currencyType?: ECurrencyType;
}

declare interface IUIShopData {

}

declare interface IUITreasureData {

}

declare interface IUIVideoData {
	skinId: number;
	characterId?: number;
	callback?: SimpleHandler;
}

