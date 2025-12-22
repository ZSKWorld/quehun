/** 用户数据变化事件 */
export const enum EUserEvent {
	//#region 邮件相关
	OnMailChanged = "EUserEvent_OnMailChanged",
	//#endregion


	//#region 好友相关
	OnFriendsChanged = "EUserEvent_OnFriendsChanged",
	OnFriendMaxCountChanged = "EUserEvent_OnFriendMaxCountChanged",
	OnFriendApplyChanged = "EUserEvent_OnFriendApplyChanged",
	OnFriendRecentChanged = "EUserEvent_OnFriendRecentChanged",
	//#endregion

	//#region 背包相关
	OnBagItemsChanged = "EUserEvent_OnBagItemsChanged",
	OnBagDailyGainRecordChanged = "EUserEvent_OnBagDailyGainRecordChanged",
	OnCGUsingChanged = "EUserEvent_OnCGUsingChanged",
	//#endregion
}
