/** 用户数据变化事件 */
declare const enum EUserEvent {
	//#region 邮件相关
	OnMailChanged = "EUserEvent_OnMailChanged",
	//#endregion


	//#region 好友相关
	OnFriendsChanged = "EUserEvent_OnFriendsChanged",
	OnFriendMaxCountChanged = "EUserEvent_OnFriendMaxCountChanged",
	OnFriendApplyChanged = "EUserEvent_OnFriendApplyChanged",
	//#endregion

	//#region 背包相关
	OnBagItemsChanged = "EUserEvent_OnBagItemsChanged",
	OnBagDailyGainRecordChanged = "EUserEvent_OnBagDailyGainRecordChanged",
	OnCGUsingChanged = "EUserEvent_OnCGUsingChanged",
	//#endregion

	//#region 角色相关
	OnMainCharacterChanged = "EUserEvent_OnMainCharacterChanged",
	OnCharacterChanged = "EUserEvent_OnCharacterChanged",
	OnCharacterSortChanged = "EUserEvent_OnCharacterSortChanged",
	//#endregion

	//#region client_value相关
	OnClientValueChanged = "EUserEvent_OnClientValueChanged",
	//#endregion
}
