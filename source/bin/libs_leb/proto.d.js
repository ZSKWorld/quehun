
/** 网络通知 */
ENotify = {
	/**
	 * * 通知房间游戏开始了
	 * * res: {@link INotifyRoomGameStart}
	 */
	NotifyRoomGameStart : "NotifyRoomGameStart",
	/**
	 * * 通知匹配场游戏开始了
	 * * res: {@link INotifyMatchGameStart}
	 */
	NotifyMatchGameStart : "NotifyMatchGameStart",
	/**
	 * * 通知玩家就绪
	 * * res: {@link INotifyRoomPlayerReady}
	 */
	NotifyRoomPlayerReady : "NotifyRoomPlayerReady",
	/**
	 * * 通知玩家装扮状态
	 * * res: {@link INotifyRoomPlayerDressing}
	 */
	NotifyRoomPlayerDressing : "NotifyRoomPlayerDressing",
	/**
	 * * 通知玩家变化
	 * * res: {@link INotifyRoomPlayerUpdate}
	 */
	NotifyRoomPlayerUpdate : "NotifyRoomPlayerUpdate",
	/**
	 * * 通知玩家被踢出
	 * * res: {@link INotifyRoomKickOut}
	 */
	NotifyRoomKickOut : "NotifyRoomKickOut",
	/**
	 * * 通知好友状态变化
	 * * res: {@link INotifyFriendStateChange}
	 */
	NotifyFriendStateChange : "NotifyFriendStateChange",
	/**
	 * * 通知好友展示信息变化
	 * * res: {@link INotifyFriendViewChange}
	 */
	NotifyFriendViewChange : "NotifyFriendViewChange",
	/**
	 * * 通知好友变化
	 * * res: {@link INotifyFriendChange}
	 */
	NotifyFriendChange : "NotifyFriendChange",
	/**
	 * * 新的好友申请
	 * * res: {@link INotifyNewFriendApply}
	 */
	NotifyNewFriendApply : "NotifyNewFriendApply",
	/**
	 * * 发送一条单方面消息
	 * * res: {@link INotifyClientMessage}
	 */
	NotifyClientMessage : "NotifyClientMessage",
	/**
	 * * 人物数据更新
	 * * res: {@link INotifyAccountUpdate}
	 */
	NotifyAccountUpdate : "NotifyAccountUpdate",
	/**
	 * * 提示有另一处登录
	 * * res: {@link INotifyAnotherLogin}
	 */
	NotifyAnotherLogin : "NotifyAnotherLogin",
	/**
	 * * 提示玩家需要登出
	 * * res: {@link INotifyAccountLogout}
	 */
	NotifyAccountLogout : "NotifyAccountLogout",
	/**
	 * * 公告更新
	 * * yaya(2020-07-29): 现在不放具体内容，只进行通知（消息体内容除lang外为空），客户端在收到通知后随机延迟（五分钟内）重新调用获取通知接口进行更新
	 * * yaya(2021-12-09): 改成以列表形式通知
	 * * res: {@link INotifyAnnouncementUpdate}
	 */
	NotifyAnnouncementUpdate : "NotifyAnnouncementUpdate",
	/**
	 * * 通知新邮件
	 * * res: {@link INotifyNewMail}
	 */
	NotifyNewMail : "NotifyNewMail",
	/**
	 * * 通知删除邮件
	 * * res: {@link INotifyDeleteMail}
	 */
	NotifyDeleteMail : "NotifyDeleteMail",
	/**
	 * * 通知复活币更新
	 * * res: {@link INotifyReviveCoinUpdate}
	 */
	NotifyReviveCoinUpdate : "NotifyReviveCoinUpdate",
	/**
	 * * 每日任务刷新推送
	 * * res: {@link INotifyDailyTaskUpdate}
	 */
	NotifyDailyTaskUpdate : "NotifyDailyTaskUpdate",
	/**
	 * * 每日活动任务刷新推送
	 * * res: {@link INotifyActivityTaskUpdate}
	 */
	NotifyActivityTaskUpdate : "NotifyActivityTaskUpdate",
	/**
	 * * 长期活动任务刷新推送
	 * * res: {@link INotifyActivityPeriodTaskUpdate}
	 */
	NotifyActivityPeriodTaskUpdate : "NotifyActivityPeriodTaskUpdate",
	/**
	 * * 随机活动任务刷新推送
	 * * res: {@link INotifyAccountRandomTaskUpdate}
	 */
	NotifyAccountRandomTaskUpdate : "NotifyAccountRandomTaskUpdate",
	/** res: {@link INotifyActivitySegmentTaskUpdate} */
	NotifyActivitySegmentTaskUpdate : "NotifyActivitySegmentTaskUpdate",
	/** res: {@link INotifyActivityUpdate} */
	NotifyActivityUpdate : "NotifyActivityUpdate",
	/**
	 * * 试炼赛更新推送
	 * * res: {@link INotifyAccountChallengeTaskUpdate}
	 */
	NotifyAccountChallengeTaskUpdate : "NotifyAccountChallengeTaskUpdate",
	/**
	 * * 通知：有新的留言
	 * * res: {@link INotifyNewComment}
	 */
	NotifyNewComment : "NotifyNewComment",
	/**
	 * * 通知：新滚动公告
	 * * res: {@link INotifyRollingNotice}
	 */
	NotifyRollingNotice : "NotifyRollingNotice",
	/**
	 * * 通知：新维护公告
	 * * res: {@link INotifyMaintainNotice}
	 */
	NotifyMaintainNotice : "NotifyMaintainNotice",
	/**
	 * * 通知：每日送礼次数刷新
	 * * res: {@link INotifyGiftSendRefresh}
	 */
	NotifyGiftSendRefresh : "NotifyGiftSendRefresh",
	/**
	 * * 通知：商店更新
	 * * res: {@link INotifyShopUpdate}
	 */
	NotifyShopUpdate : "NotifyShopUpdate",
	/**
	 * * 通知：轮换商店/活动发生改变
	 * * res: {@link INotifyIntervalUpdate}
	 */
	NotifyIntervalUpdate : "NotifyIntervalUpdate",
	/**
	 * * 通知：VIP等级变化
	 * * res: {@link INotifyVipLevelChange}
	 */
	NotifyVipLevelChange : "NotifyVipLevelChange",
	/**
	 * * 服务器设置
	 * * res: {@link INotifyServerSetting}
	 */
	NotifyServerSetting : "NotifyServerSetting",
	/**
	 * * 通知：充值结果
	 * * res: {@link INotifyPayResult}
	 */
	NotifyPayResult : "NotifyPayResult",
	/**
	 * * 通知：比赛聊天消息
	 * * res: {@link INotifyCustomContestAccountMsg}
	 */
	NotifyCustomContestAccountMsg : "NotifyCustomContestAccountMsg",
	/**
	 * * 通知：比赛系统消息
	 * * res: {@link INotifyCustomContestSystemMsg}
	 */
	NotifyCustomContestSystemMsg : "NotifyCustomContestSystemMsg",
	/**
	 * * 通知：匹配超时通知
	 * * res: {@link INotifyMatchTimeout}
	 */
	NotifyMatchTimeout : "NotifyMatchTimeout",
	/**
	 * * 通知：匹配出错
	 * * res: {@link INotifyMatchFailed}
	 */
	NotifyMatchFailed : "NotifyMatchFailed",
	/**
	 * * 通知：自定义比赛状态变化
	 * * res: {@link INotifyCustomContestState}
	 */
	NotifyCustomContestState : "NotifyCustomContestState",
	/**
	 * * 通知：活动变化
	 * * res: {@link INotifyActivityChange}
	 */
	NotifyActivityChange : "NotifyActivityChange",
	/**
	 * * 通知：挂机惩罚
	 * * res: {@link INotifyAFKResult}
	 */
	NotifyAFKResult : "NotifyAFKResult",
	/**
	 * * 通知：登录排队完成
	 * * res: {@link INotifyLoginQueueFinished}
	 */
	NotifyLoginQueueFinished : "NotifyLoginQueueFinished",
	/**
	 * * 比赛结束奖励
	 * * res: {@link INotifyGameFinishRewardV2}
	 */
	NotifyGameFinishRewardV2 : "NotifyGameFinishRewardV2",
	/** res: {@link INotifyActivityRewardV2} */
	NotifyActivityRewardV2 : "NotifyActivityRewardV2",
	/** res: {@link INotifyActivityPointV2} */
	NotifyActivityPointV2 : "NotifyActivityPointV2",
	/** res: {@link INotifyLeaderboardPointV2} */
	NotifyLeaderboardPointV2 : "NotifyLeaderboardPointV2",
	/** res: {@link INotifySeerReport} */
	NotifySeerReport : "NotifySeerReport",
	/**
	 * * 服务端主动断开
	 * * res: {@link INotifyConnectionShutdown}
	 */
	NotifyConnectionShutdown : "NotifyConnectionShutdown",
	/**
	 * * 通知新的一场游戏开始了
	 * * res: {@link INotifyNewGame}
	 */
	NotifyNewGame : "NotifyNewGame",
	/**
	 * * 通知玩家进入游戏的准备就绪
	 * * res: {@link INotifyPlayerLoadGameReady}
	 */
	NotifyPlayerLoadGameReady : "NotifyPlayerLoadGameReady",
	/**
	 * * 玩家游戏内广播
	 * * res: {@link INotifyGameBroadcast}
	 */
	NotifyGameBroadcast : "NotifyGameBroadcast",
	/**
	 * * 发送整场游戏结束信息
	 * * res: {@link INotifyGameEndResult}
	 */
	NotifyGameEndResult : "NotifyGameEndResult",
	/**
	 * * 通知游戏中断
	 * * res: {@link INotifyGameTerminate}
	 */
	NotifyGameTerminate : "NotifyGameTerminate",
	/**
	 * * 广播玩家连接状态变化
	 * * res: {@link INotifyPlayerConnectionState}
	 */
	NotifyPlayerConnectionState : "NotifyPlayerConnectionState",
	/**
	 * * 通知玩家段位变化
	 * * res: {@link INotifyAccountLevelChange}
	 */
	NotifyAccountLevelChange : "NotifyAccountLevelChange",
	/**
	 * * 比赛结束奖励
	 * * res: {@link INotifyGameFinishReward}
	 */
	NotifyGameFinishReward : "NotifyGameFinishReward",
	/** res: {@link INotifyActivityReward} */
	NotifyActivityReward : "NotifyActivityReward",
	/** res: {@link INotifyActivityPoint} */
	NotifyActivityPoint : "NotifyActivityPoint",
	/** res: {@link INotifyLeaderboardPoint} */
	NotifyLeaderboardPoint : "NotifyLeaderboardPoint",
	/**
	 * * 比赛暂停通知
	 * * res: {@link INotifyGamePause}
	 */
	NotifyGamePause : "NotifyGamePause",
	/**
	 * * 比赛退出投票通知
	 * * res: {@link INotifyEndGameVote}
	 */
	NotifyEndGameVote : "NotifyEndGameVote",
	/**
	 * * 通知观战数据
	 * * res: {@link INotifyObserveData}
	 */
	NotifyObserveData : "NotifyObserveData",
}

/** 网络请求协议 */
EMessageID = {
	/**
	 * * 获取连接相关信息
	 * * req: {@link IReqCommon}, res: {@link IResConnectionInfo}
	 */
	fetchConnectionInfo : "fetchConnectionInfo",
	/**
	 * * 获取排队信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchQueueInfo}
	 */
	fetchQueueInfo : "fetchQueueInfo",
	/** req: {@link IReqCommon}, res: {@link IResCommon} */
	cancelQueue : "cancelQueue",
	/** req: {@link IReqOpenidCheck}, res: {@link IResOauth2Check} */
	openidCheck : "openidCheck",
	/**
	 * * 注册账号
	 * * req: {@link IReqSignupAccount}, res: {@link IResSignupAccount}
	 */
	signup : "signup",
	/**
	 * * 登录账号
	 * * req: {@link IReqLogin}, res: {@link IResLogin}
	 */
	login : "login",
	/**
	 * * 备线半登录状态
	 * * req: {@link IReqPrepareLogin}, res: {@link IResCommon}
	 */
	prepareLogin : "prepareLogin",
	/**
	 * * 备线切换主线快速登录
	 * * req: {@link IReqCommon}, res: {@link IResFastLogin}
	 */
	fastLogin : "fastLogin",
	/**
	 * * 登录后获取信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchInfo}
	 */
	fetchInfo : "fetchInfo",
	/**
	 * * 登录成功后摇
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	loginSuccess : "loginSuccess",
	/**
	 * * 获取服务器维护信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchServerMaintenanceInfo}
	 */
	fetchServerMaintenanceInfo : "fetchServerMaintenanceInfo",
	/** req: {@link IReqEmailLogin}, res: {@link IResLogin} */
	emailLogin : "emailLogin",
	/**
	 * * oauth2 方式登录授权
	 * * req: {@link IReqOauth2Auth}, res: {@link IResOauth2Auth}
	 */
	oauth2Auth : "oauth2Auth",
	/**
	 * * oauth2 验证是否已经注册过账号
	 * * req: {@link IReqOauth2Check}, res: {@link IResOauth2Check}
	 */
	oauth2Check : "oauth2Check",
	/**
	 * * oauth2 注册
	 * * req: {@link IReqOauth2Signup}, res: {@link IResOauth2Signup}
	 */
	oauth2Signup : "oauth2Signup",
	/**
	 * * oauth2 登录
	 * * req: {@link IReqOauth2Login}, res: {@link IResLogin}
	 */
	oauth2Login : "oauth2Login",
	/**
	 * * dmm 获取登录参数
	 * * req: {@link IReqDMMPreLogin}, res: {@link IResDMMPreLogin}
	 */
	dmmPreLogin : "dmmPreLogin",
	/**
	 * * 获取手机验证码（已登录的情况下）
	 * * req: {@link IReqCreatePhoneVerifyCode}, res: {@link IResCommon}
	 */
	createPhoneVerifyCode : "createPhoneVerifyCode",
	/**
	 * * 获取邮箱验证码
	 * * req: {@link IReqCreateEmailVerifyCode}, res: {@link IResCommon}
	 */
	createEmailVerifyCode : "createEmailVerifyCode",
	/**
	 * * 验证码获取安全权限
	 * * req: {@link IReqVerifyCodeForSecure}, res: {@link IResVerfiyCodeForSecure}
	 */
	verfifyCodeForSecure : "verfifyCodeForSecure",
	/**
	 * * 绑定手机号
	 * * req: {@link IReqBindPhoneNumber}, res: {@link IResCommon}
	 */
	bindPhoneNumber : "bindPhoneNumber",
	/**
	 * * 解绑手机号
	 * * req: {@link IReqUnbindPhoneNumber}, res: {@link IResCommon}
	 */
	unbindPhoneNumber : "unbindPhoneNumber",
	/**
	 * * 查询已绑定手机是否有登录绑定
	 * * req: {@link IReqCommon}, res: {@link IResFetchPhoneLoginBind}
	 */
	fetchPhoneLoginBind : "fetchPhoneLoginBind",
	/**
	 * * 生成手机登录绑定
	 * * req: {@link IReqCreatePhoneLoginBind}, res: {@link IResCommon}
	 */
	createPhoneLoginBind : "createPhoneLoginBind",
	/**
	 * * 绑定邮箱
	 * * req: {@link IReqBindEmail}, res: {@link IResCommon}
	 */
	bindEmail : "bindEmail",
	/**
	 * * 修改密码
	 * * req: {@link IReqModifyPassword}, res: {@link IResCommon}
	 */
	modifyPassword : "modifyPassword",
	/**
	 * * 绑定账号密码（Oauth2注册的账号使用，只有一次机会）
	 * * req: {@link IReqBindAccount}, res: {@link IResCommon}
	 */
	bindAccount : "bindAccount",
	/**
	 * * 注销账号
	 * * req: {@link IReqLogout}, res: {@link IResLogout}
	 */
	logout : "logout",
	/**
	 * * 心跳
	 * * req: {@link IReqHeatBeat}, res: {@link IResCommon}
	 */
	heatbeat : "heatbeat",
	/**
	 * * 通过Eid获取账号ID
	 * * req: {@link IReqSearchAccountByEidLobby}, res: {@link IResSearchAccountbyEidLobby}
	 */
	searchAccountByEid : "searchAccountByEid",
	/**
	 * * 登录心跳（用于防止第三方客户端，登录后不调用该接口无法进行匹配游戏）
	 * * req: {@link IReqLoginBeat}, res: {@link IResCommon}
	 */
	loginBeat : "loginBeat",
	/**
	 * * 创建昵称
	 * * req: {@link IReqCreateNickname}, res: {@link IResCommon}
	 */
	createNickname : "createNickname",
	/**
	 * * 修改昵称
	 * * req: {@link IReqModifyNickname}, res: {@link IResCommon}
	 */
	modifyNickname : "modifyNickname",
	/**
	 * * 修改生日
	 * * req: {@link IReqModifyBirthday}, res: {@link IResCommon}
	 */
	modifyBirthday : "modifyBirthday",
	/**
	 * * 请求自己的房间信息
	 * * req: {@link IReqCommon}, res: {@link IResSelfRoom}
	 */
	fetchRoom : "fetchRoom",
	/**
	 * * 请求自己的对局信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchGamingInfo}
	 */
	fetchGamingInfo : "fetchGamingInfo",
	/**
	 * * 创建房间
	 * * req: {@link IReqCreateRoom}, res: {@link IResCreateRoom}
	 */
	createRoom : "createRoom",
	/**
	 * * 加入房间
	 * * req: {@link IReqJoinRoom}, res: {@link IResJoinRoom}
	 */
	joinRoom : "joinRoom",
	/**
	 * * 离开房间
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	leaveRoom : "leaveRoom",
	/**
	 * * 准备
	 * * req: {@link IReqRoomReady}, res: {@link IResCommon}
	 */
	readyPlay : "readyPlay",
	/**
	 * * 切换装扮状态
	 * * req: {@link IReqRoomDressing}, res: {@link IResCommon}
	 */
	dressingStatus : "dressingStatus",
	/**
	 * * 开始
	 * * req: {@link IReqRoomStart}, res: {@link IResCommon}
	 */
	startRoom : "startRoom",
	/**
	 * * 踢出玩家
	 * * req: {@link IReqRoomKickPlayer}, res: {@link IResCommon}
	 */
	roomKickPlayer : "roomKickPlayer",
	/**
	 * * 修改房间
	 * * req: {@link IReqModifyRoom}, res: {@link IResCommon}
	 */
	modifyRoom : "modifyRoom",
	/**
	 * * 添加好友房机器人
	 * * req: {@link IReqAddRoomRobot}, res: {@link IResCommon}
	 */
	addRoomRobot : "addRoomRobot",
	/**
	 * * 加入匹配
	 * * req: {@link IReqJoinMatchQueue}, res: {@link IResCommon}
	 */
	matchGame : "matchGame",
	/**
	 * * 取消匹配
	 * * req: {@link IReqCancelMatchQueue}, res: {@link IResCommon}
	 */
	cancelMatch : "cancelMatch",
	/**
	 * * 请求账号信息
	 * * req: {@link IReqAccountInfo}, res: {@link IResAccountInfo}
	 */
	fetchAccountInfo : "fetchAccountInfo",
	/**
	 * * 修改头像
	 * * req: {@link IReqChangeAvatar}, res: {@link IResCommon}
	 */
	changeAvatar : "changeAvatar",
	/**
	 * * 领取更新礼包
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	receiveVersionReward : "receiveVersionReward",
	/**
	 * * 请求账号统计信息
	 * * req: {@link IReqAccountStatisticInfo}, res: {@link IResAccountStatisticInfo}
	 */
	fetchAccountStatisticInfo : "fetchAccountStatisticInfo",
	/**
	 * * 获取试炼赛赛季排名信息
	 * * req: {@link IReqAccountInfo}, res: {@link IResAccountChallengeRankInfo}
	 */
	fetchAccountChallengeRankInfo : "fetchAccountChallengeRankInfo",
	/**
	 * * 获取账号人物信息
	 * * req: {@link IReqCommon}, res: {@link IResAccountCharacterInfo}
	 */
	fetchAccountCharacterInfo : "fetchAccountCharacterInfo",
	/**
	 * * 商店购买
	 * * req: {@link IReqShopPurchase}, res: {@link IResShopPurchase}
	 */
	shopPurchase : "shopPurchase",
	/**
	 * * 获取单场牌谱记录
	 * * req: {@link IReqGameRecord}, res: {@link IResGameRecord}
	 */
	fetchGameRecord : "fetchGameRecord",
	/**
	 * * 添加查看牌谱记录
	 * * req: {@link IReqGameRecord}, res: {@link IResCommon}
	 */
	readGameRecord : "readGameRecord",
	/**
	 * * 获取牌谱列表
	 * * 20240820更新之前的牌谱通过这个接口获取
	 * * req: {@link IReqGameRecordList}, res: {@link IResGameRecordList}
	 */
	fetchGameRecordList : "fetchGameRecordList",
	/**
	 * * 获取牌谱列表V2
	 * * 202408新版牌谱功能使用（基于迭代器）
	 * * 2024.08.20 06:33 停服  07:40 国服启动
	 * * 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 * * req: {@link IReqGameRecordListV2}, res: {@link IResGameRecordListV2}
	 */
	fetchGameRecordListV2 : "fetchGameRecordListV2",
	/**
	 * * 获取后续牌谱列表内容
	 * * 基于 fetchGameRecordListV2 协议返回结果使用
	 * * 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 * * req: {@link IReqNextGameRecordList}, res: {@link IResNextGameRecordList}
	 */
	fetchNextGameRecordList : "fetchNextGameRecordList",
	/**
	 * * 获得收藏的牌谱列表（简要信息）
	 * * req: {@link IReqCommon}, res: {@link IResCollectedGameRecordList}
	 */
	fetchCollectedGameRecordList : "fetchCollectedGameRecordList",
	/**
	 * * 获取牌谱列表的详细信息
	 * * req: {@link IReqGameRecordsDetail}, res: {@link IResGameRecordsDetail}
	 */
	fetchGameRecordsDetail : "fetchGameRecordsDetail",
	/**
	 * * 获取牌谱列表的详细信息 （新版）
	 * * req: {@link IReqGameRecordsDetailV2}, res: {@link IResGameRecordsDetailV2}
	 */
	fetchGameRecordsDetailV2 : "fetchGameRecordsDetailV2",
	/**
	 * * 添加牌谱收藏
	 * * req: {@link IReqAddCollectedGameRecord}, res: {@link IResAddCollectedGameRecord}
	 */
	addCollectedGameRecord : "addCollectedGameRecord",
	/**
	 * * 移除牌谱收藏
	 * * req: {@link IReqRemoveCollectedGameRecord}, res: {@link IResRemoveCollectedGameRecord}
	 */
	removeCollectedGameRecord : "removeCollectedGameRecord",
	/**
	 * * 修改牌谱备注
	 * * req: {@link IReqChangeCollectedGameRecordRemarks}, res: {@link IResChangeCollectedGameRecordRemarks}
	 */
	changeCollectedGameRecordRemarks : "changeCollectedGameRecordRemarks",
	/**
	 * * 获取排行榜
	 * * req: {@link IReqLevelLeaderboard}, res: {@link IResLevelLeaderboard}
	 */
	fetchLevelLeaderboard : "fetchLevelLeaderboard",
	/**
	 * * 获取试炼赛排行榜
	 * * req: {@link IReqChallangeLeaderboard}, res: {@link IResChallengeLeaderboard}
	 */
	fetchChallengeLeaderboard : "fetchChallengeLeaderboard",
	/**
	 * * 获取多人试炼赛等级信息
	 * * req: {@link IReqMutiChallengeLevel}, res: {@link IResMutiChallengeLevel}
	 */
	fetchMutiChallengeLevel : "fetchMutiChallengeLevel",
	/**
	 * * 获取多人简要信息
	 * * req: {@link IReqMultiAccountId}, res: {@link IResMultiAccountBrief}
	 */
	fetchMultiAccountBrief : "fetchMultiAccountBrief",
	/**
	 * * 获取好友列表
	 * * req: {@link IReqCommon}, res: {@link IResFriendList}
	 */
	fetchFriendList : "fetchFriendList",
	/**
	 * * 获取好友申请列表
	 * * req: {@link IReqCommon}, res: {@link IResFriendApplyList}
	 */
	fetchFriendApplyList : "fetchFriendApplyList",
	/**
	 * * 申请好友
	 * * req: {@link IReqApplyFriend}, res: {@link IResCommon}
	 */
	applyFriend : "applyFriend",
	/**
	 * * 处理好友申请
	 * * req: {@link IReqHandleFriendApply}, res: {@link IResCommon}
	 */
	handleFriendApply : "handleFriendApply",
	/**
	 * * 删除好友
	 * * req: {@link IReqRemoveFriend}, res: {@link IResCommon}
	 */
	removeFriend : "removeFriend",
	/**
	 * * 查询单个玩家
	 * * req: {@link IReqSearchAccountById}, res: {@link IResSearchAccountById}
	 */
	searchAccountById : "searchAccountById",
	/**
	 * * 模糊查询玩家
	 * * req: {@link IReqSearchAccountByPattern}, res: {@link IResSearchAccountByPattern}
	 */
	searchAccountByPattern : "searchAccountByPattern",
	/**
	 * * 查询玩家状态
	 * * req: {@link IReqAccountList}, res: {@link IResAccountStates}
	 */
	fetchAccountState : "fetchAccountState",
	/**
	 * * 请求背包信息
	 * * req: {@link IReqCommon}, res: {@link IResBagInfo}
	 */
	fetchBagInfo : "fetchBagInfo",
	/**
	 * * 使用背包道具
	 * * req: {@link IReqUseBagItem}, res: {@link IResCommon}
	 */
	useBagItem : "useBagItem",
	/**
	 * * 使用手选道具物品
	 * * req: {@link IReqOpenManualItem}, res: {@link IResCommon}
	 */
	openManualItem : "openManualItem",
	/**
	 * * 使用随机道具物品
	 * * req: {@link IReqOpenRandomRewardItem}, res: {@link IResOpenRandomRewardItem}
	 */
	openRandomRewardItem : "openRandomRewardItem",
	/**
	 * * 使用全领礼包物品
	 * * req: {@link IReqOpenAllRewardItem}, res: {@link IResOpenAllRewardItem}
	 */
	openAllRewardItem : "openAllRewardItem",
	/**
	 * * 合成碎片
	 * * req: {@link IReqComposeShard}, res: {@link IResCommon}
	 */
	composeShard : "composeShard",
	/**
	 * * 获取公告
	 * * req: {@link IReqFetchAnnouncement}, res: {@link IResAnnouncement}
	 */
	fetchAnnouncement : "fetchAnnouncement",
	/**
	 * * 阅读公告
	 * * req: {@link IReqReadAnnouncement}, res: {@link IResCommon}
	 */
	readAnnouncement : "readAnnouncement",
	/**
	 * * 获取邮件列表
	 * * req: {@link IReqCommon}, res: {@link IResMailInfo}
	 */
	fetchMailInfo : "fetchMailInfo",
	/**
	 * * 阅读邮件
	 * * req: {@link IReqReadMail}, res: {@link IResCommon}
	 */
	readMail : "readMail",
	/**
	 * * 删除邮件
	 * * req: {@link IReqDeleteMail}, res: {@link IResCommon}
	 */
	deleteMail : "deleteMail",
	/**
	 * * 拿取邮件附件
	 * * req: {@link IReqTakeAttachment}, res: {@link IResCommon}
	 */
	takeAttachmentFromMail : "takeAttachmentFromMail",
	/**
	 * * 领取成就奖励
	 * * req: {@link IReqReceiveAchievementReward}, res: {@link IResReceiveAchievementReward}
	 */
	receiveAchievementReward : "receiveAchievementReward",
	/**
	 * * 领取成就大组奖励
	 * * req: {@link IReqReceiveAchievementGroupReward}, res: {@link IResReceiveAchievementGroupReward}
	 */
	receiveAchievementGroupReward : "receiveAchievementGroupReward",
	/**
	 * * 获取全服成就完成率
	 * * req: {@link IReqCommon}, res: {@link IResFetchAchievementRate}
	 */
	fetchAchievementRate : "fetchAchievementRate",
	/**
	 * * 获取成就
	 * * req: {@link IReqCommon}, res: {@link IResAchievement}
	 */
	fetchAchievement : "fetchAchievement",
	/**
	 * * 购买试炼资格
	 * * req: {@link IReqBuyShiLian}, res: {@link IResCommon}
	 */
	buyShiLian : "buyShiLian",
	/**
	 * * 试炼匹配
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	matchShiLian : "matchShiLian",
	/**
	 * * 继续下一阶段试炼
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	goNextShiLian : "goNextShiLian",
	/**
	 * * 更新客户端数据
	 * * req: {@link IReqUpdateClientValue}, res: {@link IResCommon}
	 */
	updateClientValue : "updateClientValue",
	/**
	 * * 获取客户端数据
	 * * req: {@link IReqCommon}, res: {@link IResClientValue}
	 */
	fetchClientValue : "fetchClientValue",
	/**
	 * * 客户端信息
	 * * req: {@link IReqClientMessage}, res: {@link IResCommon}
	 */
	clientMessage : "clientMessage",
	/**
	 * * 请求当前匹配模式信息
	 * * req: {@link IReqCurrentMatchInfo}, res: {@link IResCurrentMatchInfo}
	 */
	fetchCurrentMatchInfo : "fetchCurrentMatchInfo",
	/**
	 * * 用户举报
	 * * req: {@link IReqUserComplain}, res: {@link IResCommon}
	 */
	userComplain : "userComplain",
	/**
	 * * ------ 复活币 -------- //
	 * * 获取复活币信息
	 * * req: {@link IReqCommon}, res: {@link IResReviveCoinInfo}
	 */
	fetchReviveCoinInfo : "fetchReviveCoinInfo",
	/**
	 * * 领取复活币
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	gainReviveCoin : "gainReviveCoin",
	/**
	 * * 获取每日任务
	 * * req: {@link IReqCommon}, res: {@link IResDailyTask}
	 */
	fetchDailyTask : "fetchDailyTask",
	/**
	 * * 刷新每日任务
	 * * req: {@link IReqRefreshDailyTask}, res: {@link IResRefreshDailyTask}
	 */
	refreshDailyTask : "refreshDailyTask",
	/**
	 * * 使用礼品码
	 * * req: {@link IReqUseGiftCode}, res: {@link IResUseGiftCode}
	 */
	useGiftCode : "useGiftCode",
	/**
	 * * 使用特殊礼品码
	 * * req: {@link IReqUseGiftCode}, res: {@link IResUseSpecialGiftCode}
	 */
	useSpecialGiftCode : "useSpecialGiftCode",
	/**
	 * * 获取称号列表
	 * * req: {@link IReqCommon}, res: {@link IResTitleList}
	 */
	fetchTitleList : "fetchTitleList",
	/**
	 * * 使用称号
	 * * req: {@link IReqUseTitle}, res: {@link IResCommon}
	 */
	useTitle : "useTitle",
	/**
	 * * 发送给其他玩家自定义消息
	 * * req: {@link IReqSendClientMessage}, res: {@link IResCommon}
	 */
	sendClientMessage : "sendClientMessage",
	/**
	 * * 获取游戏直播信息（全视角）
	 * * req: {@link IReqGameLiveInfo}, res: {@link IResGameLiveInfo}
	 */
	fetchGameLiveInfo : "fetchGameLiveInfo",
	/**
	 * * 获取游戏直播剩余分片信息（增量）
	 * * req: {@link IReqGameLiveLeftSegment}, res: {@link IResGameLiveLeftSegment}
	 */
	fetchGameLiveLeftSegment : "fetchGameLiveLeftSegment",
	/**
	 * * 获取正在直播的游戏列表
	 * * req: {@link IReqGameLiveList}, res: {@link IResGameLiveList}
	 */
	fetchGameLiveList : "fetchGameLiveList",
	/**
	 * * 留言板设置信息
	 * * req: {@link IReqCommon}, res: {@link IResCommentSetting}
	 */
	fetchCommentSetting : "fetchCommentSetting",
	/**
	 * * 更新留言板设置
	 * * req: {@link IReqUpdateCommentSetting}, res: {@link IResCommon}
	 */
	updateCommentSetting : "updateCommentSetting",
	/**
	 * * 获取留言板列表
	 * * req: {@link IReqFetchCommentList}, res: {@link IResFetchCommentList}
	 */
	fetchCommentList : "fetchCommentList",
	/**
	 * * 获取留言板内容
	 * * req: {@link IReqFetchCommentContent}, res: {@link IResFetchCommentContent}
	 */
	fetchCommentContent : "fetchCommentContent",
	/**
	 * * 发送留言
	 * * req: {@link IReqLeaveComment}, res: {@link IResCommon}
	 */
	leaveComment : "leaveComment",
	/**
	 * * 删除留言
	 * * req: {@link IReqDeleteComment}, res: {@link IResCommon}
	 */
	deleteComment : "deleteComment",
	/**
	 * * 更新留言阅读记录
	 * * req: {@link IReqUpdateReadComment}, res: {@link IResCommon}
	 */
	updateReadComment : "updateReadComment",
	/**
	 * * 获取滚动公告
	 * * req: {@link IReqFetchRollingNotice}, res: {@link IResFetchRollingNotice}
	 */
	fetchRollingNotice : "fetchRollingNotice",
	/**
	 * * 获取维护公告
	 * * req: {@link IReqCommon}, res: {@link IResFetchMaintainNotice}
	 */
	fetchMaintainNotice : "fetchMaintainNotice",
	/**
	 * * 获取服务器时间
	 * * req: {@link IReqCommon}, res: {@link IResServerTime}
	 */
	fetchServerTime : "fetchServerTime",
	/**
	 * * 获取对应平台的商品列表
	 * * req: {@link IReqPlatformBillingProducts}, res: {@link IResPlatformBillingProducts}
	 */
	fetchPlatformProducts : "fetchPlatformProducts",
	/**
	 * * 获取角色随机池信息
	 * * req: {@link IReqCommon}, res: {@link IResRandomCharacter}
	 */
	fetchRandomCharacter : "fetchRandomCharacter",
	/**
	 * * 设置随机角色池
	 * * req: {@link IReqRandomCharacter}, res: {@link IResCommon}
	 */
	setRandomCharacter : "setRandomCharacter",
	/**
	 * * 取消 Google Play 订单
	 * * req: {@link IReqCancelGooglePlayOrder}, res: {@link IResCommon}
	 */
	cancelGooglePlayOrder : "cancelGooglePlayOrder",
	/**
	 * * 抽宝箱
	 * * req: {@link IReqOpenChest}, res: {@link IResOpenChest}
	 */
	openChest : "openChest",
	/**
	 * * 宝箱商店购买商品
	 * * req: {@link IReqBuyFromChestShop}, res: {@link IResBuyFromChestShop}
	 */
	buyFromChestShop : "buyFromChestShop",
	/**
	 * * 获取每日签到信息
	 * * req: {@link IReqCommon}, res: {@link IResDailySignInInfo}
	 */
	fetchDailySignInInfo : "fetchDailySignInInfo",
	/**
	 * * 签到
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	doDailySignIn : "doDailySignIn",
	/** req: {@link IReqDoActivitySignIn}, res: {@link IResDoActivitySignIn} */
	doActivitySignIn : "doActivitySignIn",
	/**
	 * * 获取角色信息
	 * * req: {@link IReqCommon}, res: {@link IResCharacterInfo}
	 */
	fetchCharacterInfo : "fetchCharacterInfo",
	/**
	 * * 更新角色排序
	 * * req: {@link IReqUpdateCharacterSort}, res: {@link IResCommon}
	 */
	updateCharacterSort : "updateCharacterSort",
	/**
	 * * 切换主角色
	 * * req: {@link IReqChangeMainCharacter}, res: {@link IResCommon}
	 */
	changeMainCharacter : "changeMainCharacter",
	/**
	 * * 切换角色皮肤
	 * * req: {@link IReqChangeCharacterSkin}, res: {@link IResCommon}
	 */
	changeCharacterSkin : "changeCharacterSkin",
	/**
	 * * 设置角色外观
	 * * req: {@link IReqChangeCharacterView}, res: {@link IResCommon}
	 */
	changeCharacterView : "changeCharacterView",
	/**
	 * * 设置隐藏角色
	 * * req: {@link IReqSetHiddenCharacter}, res: {@link IResSetHiddenCharacter}
	 */
	setHiddenCharacter : "setHiddenCharacter",
	/**
	 * * 赠送礼物给角色
	 * * req: {@link IReqSendGiftToCharacter}, res: {@link IResSendGiftToCharacter}
	 */
	sendGiftToCharacter : "sendGiftToCharacter",
	/**
	 * * 出售道具（目前只有礼物可以出售）
	 * * req: {@link IReqSellItem}, res: {@link IResCommon}
	 */
	sellItem : "sellItem",
	/**
	 * * 获取通用外观
	 * * req: {@link IReqCommon}, res: {@link IResCommonView}
	 */
	fetchCommonView : "fetchCommonView",
	/**
	 * * 切换通用外观（牌桌，牌背等）
	 * * req: {@link IReqChangeCommonView}, res: {@link IResCommon}
	 */
	changeCommonView : "changeCommonView",
	/**
	 * * 保存通用外观方案
	 * * req: {@link IReqSaveCommonViews}, res: {@link IResCommon}
	 */
	saveCommonViews : "saveCommonViews",
	/**
	 * * 获取通用外观方案
	 * * req: {@link IReqCommonViews}, res: {@link IResCommonViews}
	 */
	fetchCommonViews : "fetchCommonViews",
	/**
	 * * 获取所有通用外观方案
	 * * req: {@link IReqCommon}, res: {@link IResAllcommonViews}
	 */
	fetchAllCommonViews : "fetchAllCommonViews",
	/** req: {@link IReqUseCommonView}, res: {@link IResCommon} */
	useCommonView : "useCommonView",
	/**
	 * * 突破角色
	 * * req: {@link IReqUpgradeCharacter}, res: {@link IResUpgradeCharacter}
	 */
	upgradeCharacter : "upgradeCharacter",
	/**
	 * * ::::角色传记相关::::
	 * * 完成结局
	 * * req: {@link IReqFinishedEnding}, res: {@link IResCommon}
	 */
	addFinishedEnding : "addFinishedEnding",
	/**
	 * * 领取结局奖励
	 * * req: {@link IReqFinishedEnding}, res: {@link IResCommon}
	 */
	receiveEndingReward : "receiveEndingReward",
	/**
	 * * GM指令
	 * * req: {@link IReqGMCommand}, res: {@link IResCommon}
	 */
	gameMasterCommand : "gameMasterCommand",
	/**
	 * * 获取商店信息
	 * * req: {@link IReqCommon}, res: {@link IResShopInfo}
	 */
	fetchShopInfo : "fetchShopInfo",
	/**
	 * * 普通商店购买
	 * * req: {@link IReqBuyFromShop}, res: {@link IResBuyFromShop}
	 */
	buyFromShop : "buyFromShop",
	/**
	 * * 杂货铺购买
	 * * req: {@link IReqBuyFromZHP}, res: {@link IResCommon}
	 */
	buyFromZHP : "buyFromZHP",
	/**
	 * * 刷新杂货铺商店
	 * * req: {@link IReqReshZHPShop}, res: {@link IResRefreshZHPShop}
	 */
	refreshZHPShop : "refreshZHPShop",
	/**
	 * * 获取账号月卡信息
	 * * req: {@link IReqCommon}, res: {@link IResMonthTicketInfo}
	 */
	fetchMonthTicketInfo : "fetchMonthTicketInfo",
	/**
	 * * 领取月卡工资
	 * * req: {@link IReqCommon}, res: {@link IResPayMonthTicket}
	 */
	payMonthTicket : "payMonthTicket",
	/**
	 * * 兑换货币
	 * * req: {@link IReqExchangeCurrency}, res: {@link IResCommon}
	 */
	exchangeCurrency : "exchangeCurrency",
	/**
	 * * 兑换寻觅石头
	 * * req: {@link IReqExchangeCurrency}, res: {@link IResCommon}
	 */
	exchangeChestStone : "exchangeChestStone",
	/**
	 * * 皮肤券兑换辉玉
	 * * req: {@link IReqExchangeCurrency}, res: {@link IResCommon}
	 */
	exchangeDiamond : "exchangeDiamond",
	/**
	 * * 获取服务器设置
	 * * req: {@link IReqCommon}, res: {@link IResServerSettings}
	 */
	fetchServerSettings : "fetchServerSettings",
	/**
	 * * 账户设置
	 * * req: {@link IReqCommon}, res: {@link IResAccountSettings}
	 */
	fetchAccountSettings : "fetchAccountSettings",
	/**
	 * * 更新账号设置
	 * * req: {@link IReqUpdateAccountSettings}, res: {@link IResCommon}
	 */
	updateAccountSettings : "updateAccountSettings",
	/**
	 * * 获取改名时间
	 * * req: {@link IReqCommon}, res: {@link IResModNicknameTime}
	 */
	fetchModNicknameTime : "fetchModNicknameTime",
	/**
	 * * 创建微信支付（扫码支付）订单
	 * * req: {@link IReqCreateWechatNativeOrder}, res: {@link IResCreateWechatNativeOrder}
	 */
	createWechatNativeOrder : "createWechatNativeOrder",
	/**
	 * * 创建微信支付（App支付）订单
	 * * req: {@link IReqCreateWechatAppOrder}, res: {@link IResCreateWechatAppOrder}
	 */
	createWechatAppOrder : "createWechatAppOrder",
	/**
	 * * 创建支付宝（链接地址）订单
	 * * req: {@link IReqCreateAlipayOrder}, res: {@link IResCreateAlipayOrder}
	 */
	createAlipayOrder : "createAlipayOrder",
	/**
	 * * 创建支付宝（扫码支付）订单
	 * * req: {@link IReqCreateAlipayScanOrder}, res: {@link IResCreateAlipayScanOrder}
	 */
	createAlipayScanOrder : "createAlipayScanOrder",
	/**
	 * * 创建支付宝（App支付）订单
	 * * req: {@link IReqCreateAlipayAppOrder}, res: {@link IResCreateAlipayAppOrder}
	 */
	createAlipayAppOrder : "createAlipayAppOrder",
	/**
	 * * 创建日服-CreditCard订单
	 * * req: {@link IReqCreateJPCreditCardOrder}, res: {@link IResCreateJPCreditCardOrder}
	 */
	createJPCreditCardOrder : "createJPCreditCardOrder",
	/**
	 * * 创建日服-Paypal订单
	 * * req: {@link IReqCreateJPPaypalOrder}, res: {@link IResCreateJPPaypalOrder}
	 */
	createJPPaypalOrder : "createJPPaypalOrder",
	/**
	 * * 创建日服-Au订单
	 * * req: {@link IReqCreateJPAuOrder}, res: {@link IResCreateJPAuOrder}
	 */
	createJPAuOrder : "createJPAuOrder",
	/**
	 * * 创建日服-Docomo订单
	 * * req: {@link IReqCreateJPDocomoOrder}, res: {@link IResCreateJPDocomoOrder}
	 */
	createJPDocomoOrder : "createJPDocomoOrder",
	/**
	 * * 创建日服-WebMoney订单
	 * * req: {@link IReqCreateJPWebMoneyOrder}, res: {@link IResCreateJPWebMoneyOrder}
	 */
	createJPWebMoneyOrder : "createJPWebMoneyOrder",
	/**
	 * * 创建日服-Softbank订单
	 * * req: {@link IReqCreateJPSoftbankOrder}, res: {@link IResCreateJPSoftbankOrder}
	 */
	createJPSoftbankOrder : "createJPSoftbankOrder",
	/**
	 * * 创建日服-Paypay订单
	 * * req: {@link IReqCreateJPPayPayOrder}, res: {@link IResCreateJPPayPayOrder}
	 */
	createJPPayPayOrder : "createJPPayPayOrder",
	/**
	 * * 获取日服信用卡订单信息
	 * * req: {@link IReqFetchJPCommonCreditCardOrder}, res: {@link IResFetchJPCommonCreditCardOrder}
	 */
	fetchJPCommonCreditCardOrder : "fetchJPCommonCreditCardOrder",
	/**
	 * * 创建日服-GMO订单
	 * * req: {@link IReqCreateJPGMOOrder}, res: {@link IResCreateJPGMOOrder}
	 */
	createJPGMOOrder : "createJPGMOOrder",
	/**
	 * * 创建美服-Paypal订单
	 * * req: {@link IReqCreateENPaypalOrder}, res: {@link IResCreateENPaypalOrder}
	 */
	createENPaypalOrder : "createENPaypalOrder",
	/**
	 * * 创建美服-MasterCard订单
	 * * req: {@link IReqCreateENMasterCardOrder}, res: {@link IResCreateENMasterCardOrder}
	 */
	createENMasterCardOrder : "createENMasterCardOrder",
	/**
	 * * 创建美服-Visa订单
	 * * req: {@link IReqCreateENVisaOrder}, res: {@link IResCreateENVisaOrder}
	 */
	createENVisaOrder : "createENVisaOrder",
	/**
	 * * 创建美服-JCB订单
	 * * req: {@link IReqCreateENJCBOrder}, res: {@link IResCreateENJCBOrder}
	 */
	createENJCBOrder : "createENJCBOrder",
	/**
	 * * 创建美服-Alipay订单
	 * * req: {@link IReqCreateENAlipayOrder}, res: {@link IResCreateENAlipayOrder}
	 */
	createENAlipayOrder : "createENAlipayOrder",
	/**
	 * * 创建韩服-Paypal订单
	 * * req: {@link IReqCreateKRPaypalOrder}, res: {@link IResCreateKRPaypalOrder}
	 */
	createKRPaypalOrder : "createKRPaypalOrder",
	/**
	 * * 创建韩服-MasterCard订单
	 * * req: {@link IReqCreateKRMasterCardOrder}, res: {@link IResCreateKRMasterCardOrder}
	 */
	createKRMasterCardOrder : "createKRMasterCardOrder",
	/**
	 * * 创建韩服-Visa订单
	 * * req: {@link IReqCreateKRVisaOrder}, res: {@link IResCreateKRVisaOrder}
	 */
	createKRVisaOrder : "createKRVisaOrder",
	/**
	 * * 创建韩服-JCB订单
	 * * req: {@link IReqCreateKRJCBOrder}, res: {@link IResCreateKRJCBOrder}
	 */
	createKRJCBOrder : "createKRJCBOrder",
	/**
	 * * 创建韩服-Alipay订单
	 * * req: {@link IReqCreateKRAlipayOrder}, res: {@link IResCreateKRAlipayOrder}
	 */
	createKRAlipayOrder : "createKRAlipayOrder",
	/**
	 * * 创建DMM订单
	 * * req: {@link IReqCreateDMMOrder}, res: {@link IResCreateDmmOrder}
	 */
	createDMMOrder : "createDMMOrder",
	/**
	 * * 创建苹果内购订单
	 * * req: {@link IReqCreateIAPOrder}, res: {@link IResCreateIAPOrder}
	 */
	createIAPOrder : "createIAPOrder",
	/**
	 * * 创建Steam订单
	 * * req: {@link IReqCreateSteamOrder}, res: {@link IResCreateSteamOrder}
	 */
	createSteamOrder : "createSteamOrder",
	/**
	 * * Steam验单
	 * * req: {@link IReqVerifySteamOrder}, res: {@link IResCommon}
	 */
	verifySteamOrder : "verifySteamOrder",
	/**
	 * * 创建MyCard Android订单
	 * * req: {@link IReqCreateMyCardOrder}, res: {@link IResCreateMyCardOrder}
	 */
	createMyCardAndroidOrder : "createMyCardAndroidOrder",
	/**
	 * * 创建MyCard Web订单
	 * * req: {@link IReqCreateMyCardOrder}, res: {@link IResCreateMyCardOrder}
	 */
	createMyCardWebOrder : "createMyCardWebOrder",
	/**
	 * * 创建Paypal订单
	 * * req: {@link IReqCreatePaypalOrder}, res: {@link IResCreatePaypalOrder}
	 */
	createPaypalOrder : "createPaypalOrder",
	/**
	 * * 创建Xsolla订单
	 * * req: {@link IReqCreateXsollaOrder}, res: {@link IResCreateXsollaOrder}
	 */
	createXsollaOrder : "createXsollaOrder",
	/**
	 * * 创建XsollaV4订单
	 * * req: {@link IReqCreateXsollaOrder}, res: {@link IResCreateXsollaOrder}
	 */
	createXsollaV4Order : "createXsollaV4Order",
	/**
	 * * MyCard验单
	 * * req: {@link IReqVerifyMyCardOrder}, res: {@link IResCommon}
	 */
	verifyMyCardOrder : "verifyMyCardOrder",
	/**
	 * * 验证苹果内购订单
	 * * req: {@link IReqVerificationIAPOrder}, res: {@link IResVerificationIAPOrder}
	 */
	verificationIAPOrder : "verificationIAPOrder",
	/**
	 * * 创建Yostar-SDK订单
	 * * req: {@link IReqCreateYostarOrder}, res: {@link IResCreateYostarOrder}
	 */
	createYostarSDKOrder : "createYostarSDKOrder",
	/**
	 * * 创建支付订单
	 * * req: {@link IReqCreateBillingOrder}, res: {@link IResCreateBillingOrder}
	 */
	createBillingOrder : "createBillingOrder",
	/**
	 * * 处理 Google Play 订单支付结果
	 * * req: {@link IReqSolveGooglePlayOrder}, res: {@link IResCommon}
	 */
	solveGooglePlayOrder : "solveGooglePlayOrder",
	/** req: {@link IReqSolveGooglePlayOrderV3}, res: {@link IResCommon} */
	solveGooglePayOrderV3 : "solveGooglePayOrderV3",
	/**
	 * * 处理 AA32 订单
	 * * req: {@link IReqDeliverAA32Order}, res: {@link IResCommon}
	 */
	deliverAA32Order : "deliverAA32Order",
	/**
	 * * 获取账号杂七杂八的数据
	 * * req: {@link IReqCommon}, res: {@link IResMisc}
	 */
	fetchMisc : "fetchMisc",
	/**
	 * * 修改签名
	 * * req: {@link IReqModifySignature}, res: {@link IResCommon}
	 */
	modifySignature : "modifySignature",
	/**
	 * * 获取实名认证信息
	 * * req: {@link IReqCommon}, res: {@link IResIDCardInfo}
	 */
	fetchIDCardInfo : "fetchIDCardInfo",
	/**
	 * * 进行实名认证
	 * * req: {@link IReqUpdateIDCardInfo}, res: {@link IResCommon}
	 */
	updateIDCardInfo : "updateIDCardInfo",
	/**
	 * * 获取vip奖励领取状态
	 * * req: {@link IReqCommon}, res: {@link IResVipReward}
	 */
	fetchVipReward : "fetchVipReward",
	/**
	 * * 领取vip奖励
	 * * req: {@link IReqGainVipReward}, res: {@link IResCommon}
	 */
	gainVipReward : "gainVipReward",
	/**
	 * * 获取需要补单的订单信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchRefundOrder}
	 */
	fetchRefundOrder : "fetchRefundOrder",
	/**
	 * * 获取赛事列表
	 * * req: {@link IReqFetchCustomizedContestList}, res: {@link IResFetchCustomizedContestList}
	 */
	fetchCustomizedContestList : "fetchCustomizedContestList",
	/**
	 * * 获取赛事权限相关信息
	 * * req: {@link IReqFetchCustomizedContestAuthInfo}, res: {@link IResFetchCustomizedContestAuthInfo}
	 */
	fetchCustomizedContestAuthInfo : "fetchCustomizedContestAuthInfo",
	/**
	 * * 进入赛事
	 * * req: {@link IReqEnterCustomizedContest}, res: {@link IResEnterCustomizedContest}
	 */
	enterCustomizedContest : "enterCustomizedContest",
	/**
	 * * 退出赛事
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	leaveCustomizedContest : "leaveCustomizedContest",
	/**
	 * * 请求比赛在线信息
	 * * req: {@link IReqFetchCustomizedContestOnlineInfo}, res: {@link IResFetchCustomizedContestOnlineInfo}
	 */
	fetchCustomizedContestOnlineInfo : "fetchCustomizedContestOnlineInfo",
	/**
	 * * 获取赛事基本信息（通过赛事ID）
	 * * req: {@link IReqFetchCustomizedContestByContestId}, res: {@link IResFetchCustomizedContestByContestId}
	 */
	fetchCustomizedContestByContestId : "fetchCustomizedContestByContestId",
	/**
	 * * 报名比赛
	 * * req: {@link IReqSignupCustomizedContest}, res: {@link IResSignupCustomizedContest}
	 */
	signupCustomizedContest : "signupCustomizedContest",
	/**
	 * * 开始比赛匹配
	 * * req: {@link IReqStartCustomizedContest}, res: {@link IResCommon}
	 */
	startCustomizedContest : "startCustomizedContest",
	/**
	 * * 停止比赛匹配
	 * * req: {@link IReqStopCustomizedContest}, res: {@link IResCommon}
	 */
	stopCustomizedContest : "stopCustomizedContest",
	/**
	 * * 进入比赛聊天室
	 * * req: {@link IReqJoinCustomizedContestChatRoom}, res: {@link IResJoinCustomizedContestChatRoom}
	 */
	joinCustomizedContestChatRoom : "joinCustomizedContestChatRoom",
	/**
	 * * 退出比赛聊天室
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	leaveCustomizedContestChatRoom : "leaveCustomizedContestChatRoom",
	/**
	 * * 发送聊天消息
	 * * req: {@link IReqSayChatMessage}, res: {@link IResCommon}
	 */
	sayChatMessage : "sayChatMessage",
	/**
	 * * 查询赛事牌谱列表
	 * * req: {@link IReqFetchCustomizedContestGameRecords}, res: {@link IResFetchCustomizedContestGameRecords}
	 */
	fetchCustomizedContestGameRecords : "fetchCustomizedContestGameRecords",
	/**
	 * * 获取正在直播的比赛游戏列表
	 * * req: {@link IReqFetchCustomizedContestGameLiveList}, res: {@link IResFetchCustomizedContestGameLiveList}
	 */
	fetchCustomizedContestGameLiveList : "fetchCustomizedContestGameLiveList",
	/**
	 * * 关注自定义比赛
	 * * req: {@link IReqTargetCustomizedContest}, res: {@link IResCommon}
	 */
	followCustomizedContest : "followCustomizedContest",
	/**
	 * * 取消关注自定义比赛
	 * * req: {@link IReqTargetCustomizedContest}, res: {@link IResCommon}
	 */
	unfollowCustomizedContest : "unfollowCustomizedContest",
	/**
	 * * 获取活动列表
	 * * req: {@link IReqCommon}, res: {@link IResActivityList}
	 */
	fetchActivityList : "fetchActivityList",
	/**
	 * * 获取玩家活动数据
	 * * req: {@link IReqCommon}, res: {@link IResAccountActivityData}
	 */
	fetchAccountActivityData : "fetchAccountActivityData",
	/**
	 * * 兑换活动
	 * * req: {@link IReqExchangeActivityItem}, res: {@link IResExchangeActivityItem}
	 */
	exchangeActivityItem : "exchangeActivityItem",
	/**
	 * * 领取活动任务奖励
	 * * req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
	 */
	completeActivityTask : "completeActivityTask",
	/** req: {@link IReqCompleteActivityTaskBatch}, res: {@link IResCommon} */
	completeActivityTaskBatch : "completeActivityTaskBatch",
	/**
	 * * 领取翻牌牌任务奖励
	 * * req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
	 */
	completeActivityFlipTask : "completeActivityFlipTask",
	/**
	 * * 领取长期任务奖励
	 * * req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
	 */
	completePeriodActivityTask : "completePeriodActivityTask",
	/** req: {@link IReqCompletePeriodActivityTaskBatch}, res: {@link IResCommon} */
	completePeriodActivityTaskBatch : "completePeriodActivityTaskBatch",
	/**
	 * * 领取随机任务奖励
	 * * req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
	 */
	completeRandomActivityTask : "completeRandomActivityTask",
	/** req: {@link IReqCompleteActivityTaskBatch}, res: {@link IResCommon} */
	completeRandomActivityTaskBatch : "completeRandomActivityTaskBatch",
	/**
	 * * 翻牌牌领任务
	 * * req: {@link IReqReceiveActivityFlipTask}, res: {@link IResReceiveActivityFlipTask}
	 */
	receiveActivityFlipTask : "receiveActivityFlipTask",
	/**
	 * * 领取分段任务奖励
	 * * req: {@link IReqCompleteSegmentTaskReward}, res: {@link IResCompleteSegmentTaskReward}
	 */
	completeSegmentTaskReward : "completeSegmentTaskReward",
	/**
	 * * 获取翻牌牌任务信息
	 * * req: {@link IReqFetchActivityFlipInfo}, res: {@link IResFetchActivityFlipInfo}
	 */
	fetchActivityFlipInfo : "fetchActivityFlipInfo",
	/**
	 * * 领取得点活动奖励
	 * * req: {@link IReqGainAccumulatedPointActivityReward}, res: {@link IResCommon}
	 */
	gainAccumulatedPointActivityReward : "gainAccumulatedPointActivityReward",
	/**
	 * * 批量领取得点活动奖励
	 * * req: {@link IReqGainMultiPointActivityReward}, res: {@link IResCommon}
	 */
	gainMultiPointActivityReward : "gainMultiPointActivityReward",
	/**
	 * * 获取得分排行榜数据
	 * * req: {@link IReqFetchRankPointLeaderboard}, res: {@link IResFetchRankPointLeaderboard}
	 */
	fetchRankPointLeaderboard : "fetchRankPointLeaderboard",
	/**
	 * * 领取得分排行奖励
	 * * req: {@link IReqGainRankPointReward}, res: {@link IResCommon}
	 */
	gainRankPointReward : "gainRankPointReward",
	/**
	 * * 大富翁投骰子
	 * * req: {@link IReqRichmanNextMove}, res: {@link IResRichmanNextMove}
	 */
	richmanActivityNextMove : "richmanActivityNextMove",
	/**
	 * * 大富翁遥控骰子
	 * * req: {@link IReqRichmanSpecialMove}, res: {@link IResRichmanNextMove}
	 */
	richmanAcitivitySpecialMove : "richmanAcitivitySpecialMove",
	/**
	 * * 大富翁宝箱信息
	 * * req: {@link IReqRichmanChestInfo}, res: {@link IResRichmanChestInfo}
	 */
	richmanActivityChestInfo : "richmanActivityChestInfo",
	/**
	 * * 创建实时OB权限
	 * * req: {@link IReqCreateGameObserveAuth}, res: {@link IResCreateGameObserveAuth}
	 */
	createGameObserveAuth : "createGameObserveAuth",
	/**
	 * * 刷新实时OB权限时长
	 * * req: {@link IReqRefreshGameObserveAuth}, res: {@link IResRefreshGameObserveAuth}
	 */
	refreshGameObserveAuth : "refreshGameObserveAuth",
	/**
	 * * 获取活动buff信息
	 * * req: {@link IReqCommon}, res: {@link IResActivityBuff}
	 */
	fetchActivityBuff : "fetchActivityBuff",
	/**
	 * * 升级活动buff
	 * * req: {@link IReqUpgradeActivityBuff}, res: {@link IResActivityBuff}
	 */
	upgradeActivityBuff : "upgradeActivityBuff",
	/**
	 * * 升级活动升级
	 * * req: {@link IReqUpgradeActivityLevel}, res: {@link IResUpgradeActivityLevel}
	 */
	upgradeActivityLevel : "upgradeActivityLevel",
	/**
	 * * 获取总等级奖励
	 * * req: {@link IReqReceiveUpgradeActivityReward}, res: {@link IResReceiveUpgradeActivityReward}
	 */
	receiveUpgradeActivityReward : "receiveUpgradeActivityReward",
	/**
	 * * 试炼赛升级
	 * * req: {@link IReqCommon}, res: {@link IResUpgradeChallenge}
	 */
	upgradeChallenge : "upgradeChallenge",
	/**
	 * * 再发行
	 * * req: {@link IReqCommon}, res: {@link IResRefreshChallenge}
	 */
	refreshChallenge : "refreshChallenge",
	/**
	 * * 获取试炼赛信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchChallengeInfo}
	 */
	fetchChallengeInfo : "fetchChallengeInfo",
	/**
	 * * 盖章完成试炼任务
	 * * req: {@link IReqForceCompleteChallengeTask}, res: {@link IResCommon}
	 */
	forceCompleteChallengeTask : "forceCompleteChallengeTask",
	/**
	 * * 获取当前试炼赛信息
	 * * req: {@link IReqCommon}, res: {@link IResChallengeSeasonInfo}
	 */
	fetchChallengeSeason : "fetchChallengeSeason",
	/**
	 * * 获取试炼赛排名奖励
	 * * req: {@link IReqReceiveChallengeRankReward}, res: {@link IResReceiveChallengeRankReward}
	 */
	receiveChallengeRankReward : "receiveChallengeRankReward",
	/**
	 * * AB赛
	 * * req: {@link IReqCommon}, res: {@link IResFetchABMatch}
	 */
	fetchABMatchInfo : "fetchABMatchInfo",
	/** req: {@link IReqBuyInABMatch}, res: {@link IResCommon} */
	buyInABMatch : "buyInABMatch",
	/** req: {@link IReqCommon}, res: {@link IResCommon} */
	receiveABMatchReward : "receiveABMatchReward",
	/** req: {@link IReqCommon}, res: {@link IResCommon} */
	quitABMatch : "quitABMatch",
	/** req: {@link IReqStartUnifiedMatch}, res: {@link IResCommon} */
	startUnifiedMatch : "startUnifiedMatch",
	/** req: {@link IReqCancelUnifiedMatch}, res: {@link IResCommon} */
	cancelUnifiedMatch : "cancelUnifiedMatch",
	/** req: {@link IReqGamePointRank}, res: {@link IResGamePointRank} */
	fetchGamePointRank : "fetchGamePointRank",
	/** req: {@link IReqGamePointRank}, res: {@link IResFetchSelfGamePointRank} */
	fetchSelfGamePointRank : "fetchSelfGamePointRank",
	/**
	 * * SNS活动
	 * * req: {@link IReqReadSNS}, res: {@link IResReadSNS}
	 */
	readSNS : "readSNS",
	/** req: {@link IReqReplySNS}, res: {@link IResReplySNS} */
	replySNS : "replySNS",
	/** req: {@link IReqLikeSNS}, res: {@link IResLikeSNS} */
	likeSNS : "likeSNS",
	/**
	 * * 挖矿活动
	 * * req: {@link IReqDigMine}, res: {@link IResDigMine}
	 */
	digMine : "digMine",
	/**
	 * * 用户协议
	 * * req: {@link IReqFetchLastPrivacy}, res: {@link IResFetchLastPrivacy}
	 */
	fetchLastPrivacy : "fetchLastPrivacy",
	/** req: {@link IReqCheckPrivacy}, res: {@link IResCommon} */
	checkPrivacy : "checkPrivacy",
	/**
	 * * rpg活动
	 * * req: {@link IReqFetchRPGBattleHistory}, res: {@link IResFetchRPGBattleHistory}
	 */
	fetchRPGBattleHistory : "fetchRPGBattleHistory",
	/** req: {@link IReqFetchRPGBattleHistory}, res: {@link IResFetchRPGBattleHistoryV2} */
	fetchRPGBattleHistoryV2 : "fetchRPGBattleHistoryV2",
	/** req: {@link IReqReceiveRPGRewards}, res: {@link IResReceiveRPGRewards} */
	receiveRPGRewards : "receiveRPGRewards",
	/** req: {@link IReqReceiveRPGReward}, res: {@link IResReceiveRPGRewards} */
	receiveRPGReward : "receiveRPGReward",
	/**
	 * * 竞技场活动
	 * * req: {@link IReqBuyArenaTicket}, res: {@link IResCommon}
	 */
	buyArenaTicket : "buyArenaTicket",
	/** req: {@link IReqEnterArena}, res: {@link IResCommon} */
	enterArena : "enterArena",
	/** req: {@link IReqArenaReward}, res: {@link IResArenaReward} */
	receiveArenaReward : "receiveArenaReward",
	/**
	 * * 观战
	 * * req: {@link IReqFetchOBToken}, res: {@link IResFetchOBToken}
	 */
	fetchOBToken : "fetchOBToken",
	/**
	 * * 角色好感度
	 * * req: {@link IReqReceiveCharacterRewards}, res: {@link IResReceiveCharacterRewards}
	 */
	receiveCharacterRewards : "receiveCharacterRewards",
	/**
	 * * 喂年兽活动 -> 已经拆分成 friend-gift 与 upgrade 活动，这个协议不再使用
	 * * req: {@link IReqFeedActivityFeed}, res: {@link IResFeedActivityFeed}
	 */
	feedActivityFeed : "feedActivityFeed",
	/**
	 * * 送礼活动
	 * * req: {@link IReqSendActivityGiftToFriend}, res: {@link IResSendActivityGiftToFriend}
	 */
	sendActivityGiftToFriend : "sendActivityGiftToFriend",
	/** req: {@link IReqReceiveActivityGift}, res: {@link IResCommon} */
	receiveActivityGift : "receiveActivityGift",
	/** req: {@link IReqReceiveAllActivityGift}, res: {@link IResReceiveAllActivityGift} */
	receiveAllActivityGift : "receiveAllActivityGift",
	/** req: {@link IReqFetchFriendGiftActivityData}, res: {@link IResFetchFriendGiftActivityData} */
	fetchFriendGiftActivityData : "fetchFriendGiftActivityData",
	/**
	 * * 自选卡池
	 * * req: {@link IReqOpenPreChestItem}, res: {@link IResOpenPreChestItem}
	 */
	openPreChestItem : "openPreChestItem",
	/**
	 * * 投票活动
	 * * req: {@link IReqFetchVoteActivity}, res: {@link IResFetchVoteActivity}
	 */
	fetchVoteActivity : "fetchVoteActivity",
	/** req: {@link IReqVoteActivity}, res: {@link IResVoteActivity} */
	voteActivity : "voteActivity",
	/**
	 * * 剧情活动
	 * * req: {@link IReqUnlockActivitySpot}, res: {@link IResCommon}
	 */
	unlockActivitySpot : "unlockActivitySpot",
	/** req: {@link IReqUnlockActivitySpotEnding}, res: {@link IResCommon} */
	unlockActivitySpotEnding : "unlockActivitySpotEnding",
	/** req: {@link IReqReceiveActivitySpotReward}, res: {@link IResReceiveActivitySpotReward} */
	receiveActivitySpotReward : "receiveActivitySpotReward",
	/**
	 * * 删除账号接口
	 * * req: {@link IReqCommon}, res: {@link IResDeleteAccount}
	 */
	deleteAccount : "deleteAccount",
	/** req: {@link IReqCommon}, res: {@link IResCommon} */
	cancelDeleteAccount : "cancelDeleteAccount",
	/** req: {@link IReqLogReport}, res: {@link IResCommon} */
	logReport : "logReport",
	/**
	 * * oauth2
	 * * req: {@link IReqBindOauth2}, res: {@link IResCommon}
	 */
	bindOauth2 : "bindOauth2",
	/** req: {@link IReqFetchOauth2}, res: {@link IResFetchOauth2} */
	fetchOauth2Info : "fetchOauth2Info",
	/**
	 * * loading图
	 * * req: {@link IReqSetLoadingImage}, res: {@link IResCommon}
	 */
	setLoadingImage : "setLoadingImage",
	/**
	 * * 获取商店信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchShopInterval}
	 */
	fetchShopInterval : "fetchShopInterval",
	/**
	 * * 获取活动轮换信息
	 * * req: {@link IReqCommon}, res: {@link IResFetchActivityInterval}
	 */
	fetchActivityInterval : "fetchActivityInterval",
	/**
	 * * 获取最近对战玩家
	 * * req: {@link IReqCommon}, res: {@link IResFetchrecentFriend}
	 */
	fetchRecentFriend : "fetchRecentFriend",
	/**
	 * * 扭蛋活动
	 * * req: {@link IReqOpenGacha}, res: {@link IResOpenGacha}
	 */
	openGacha : "openGacha",
	/**
	 * * 前端完成任务
	 * * req: {@link IReqTaskRequest}, res: {@link IResCommon}
	 */
	taskRequest : "taskRequest",
	/**
	 * * 养成活动
	 * * req: {@link IReqSimulationActivityTrain}, res: {@link IResSimulationActivityTrain}
	 */
	simulationActivityTrain : "simulationActivityTrain",
	/** req: {@link IReqFetchSimulationGameRecord}, res: {@link IResFetchSimulationGameRecord} */
	fetchSimulationGameRecord : "fetchSimulationGameRecord",
	/** req: {@link IReqStartSimulationActivityGame}, res: {@link IResStartSimulationActivityGame} */
	startSimulationActivityGame : "startSimulationActivityGame",
	/** req: {@link IReqFetchSimulationGameRank}, res: {@link IResFetchSimulationGameRank} */
	fetchSimulationGameRank : "fetchSimulationGameRank",
	/**
	 * * 合成活动
	 * * req: {@link IReqGenerateCombiningCraft}, res: {@link IResGenerateCombiningCraft}
	 */
	generateCombiningCraft : "generateCombiningCraft",
	/** req: {@link IReqMoveCombiningCraft}, res: {@link IResMoveCombiningCraft} */
	moveCombiningCraft : "moveCombiningCraft",
	/** req: {@link IReqCombiningRecycleCraft}, res: {@link IResCombiningRecycleCraft} */
	combiningRecycleCraft : "combiningRecycleCraft",
	/** req: {@link IReqRecoverCombiningRecycle}, res: {@link IResRecoverCombiningRecycle} */
	recoverCombiningRecycle : "recoverCombiningRecycle",
	/** req: {@link IReqFinishCombiningOrder}, res: {@link IResFinishCombiningOrder} */
	finishCombiningOrder : "finishCombiningOrder",
	/**
	 * * 小村活动
	 * * req: {@link IReqUpgradeVillageBuilding}, res: {@link IResCommon}
	 */
	upgradeVillageBuilding : "upgradeVillageBuilding",
	/** req: {@link IReqReceiveVillageBuildingReward}, res: {@link IResReceiveVillageBuildingReward} */
	receiveVillageBuildingReward : "receiveVillageBuildingReward",
	/** req: {@link IReqStartVillageTrip}, res: {@link IResCommon} */
	startVillageTrip : "startVillageTrip",
	/** req: {@link IReqReceiveVillageTripReward}, res: {@link IResReceiveVillageTripReward} */
	receiveVillageTripReward : "receiveVillageTripReward",
	/** req: {@link IReqCompleteVillageTask}, res: {@link IResCompleteVillageTask} */
	completeVillageTask : "completeVillageTask",
	/** req: {@link IReqGetFriendVillageData}, res: {@link IResGetFriendVillageData} */
	getFriendVillageData : "getFriendVillageData",
	/** req: {@link IReqSetVillageWorker}, res: {@link IResSetVillageWorker} */
	setVillageWorker : "setVillageWorker",
	/**
	 * * 下一个丰收季
	 * * req: {@link IReqNextRoundVillage}, res: {@link IResNextRoundVillage}
	 */
	nextRoundVillage : "nextRoundVillage",
	/**
	 * * 庆典活动
	 * * req: {@link IReqResolveFestivalActivityProposal}, res: {@link IResResolveFestivalActivityProposal}
	 */
	resolveFestivalActivityProposal : "resolveFestivalActivityProposal",
	/** req: {@link IReqResolveFestivalActivityEvent}, res: {@link IResResolveFestivalActivityEvent} */
	resolveFestivalActivityEvent : "resolveFestivalActivityEvent",
	/** req: {@link IReqBuyFestivalProposal}, res: {@link IResBuyFestivalProposal} */
	buyFestivalProposal : "buyFestivalProposal",
	/**
	 * * ::DevDebug Start::
	 * * debug 协议在正式版本删除
	 * * req: {@link IReqFestivalFetchDebug}, res: {@link IResFestivalFetchDebug}
	 */
	festivalActivityFetchDebug : "festivalActivityFetchDebug",
	/** req: {@link IReqFestivalDebug}, res: {@link IResCommon} */
	festivalActivityDebug : "festivalActivityDebug",
	/**
	 * * 海岛活动
	 * * req: {@link IReqIslandActivityMove}, res: {@link IResCommon}
	 */
	islandActivityMove : "islandActivityMove",
	/** req: {@link IReqIslandActivityBuy}, res: {@link IResCommon} */
	islandActivityBuy : "islandActivityBuy",
	/** req: {@link IReqIslandActivitySell}, res: {@link IResCommon} */
	islandActivitySell : "islandActivitySell",
	/** req: {@link IReqIslandActivityTidyBag}, res: {@link IResCommon} */
	islandActivityTidyBag : "islandActivityTidyBag",
	/** req: {@link IReqIslandActivityUnlockBagGrid}, res: {@link IResCommon} */
	islandActivityUnlockBagGrid : "islandActivityUnlockBagGrid",
	/**
	 * * 大会室管理相关
	 * * req: {@link IReqCreateCustomizedContest}, res: {@link IResCreateCustomizedContest}
	 */
	createCustomizedContest : "createCustomizedContest",
	/** req: {@link IReqFetchmanagerCustomizedContestList}, res: {@link IResFetchManagerCustomizedContestList} */
	fetchManagerCustomizedContestList : "fetchManagerCustomizedContestList",
	/** req: {@link IReqFetchManagerCustomizedContest}, res: {@link IResFetchManagerCustomizedContest} */
	fetchManagerCustomizedContest : "fetchManagerCustomizedContest",
	/** req: {@link IReqUpdateManagerCustomizedContest}, res: {@link IResCommon} */
	updateManagerCustomizedContest : "updateManagerCustomizedContest",
	/** req: {@link IReqFetchContestPlayerRank}, res: {@link IResFetchContestPlayerRank} */
	fetchContestPlayerRank : "fetchContestPlayerRank",
	/** req: {@link IReqFetchReadyPlayerList}, res: {@link IResFetchReadyPlayerList} */
	fetchReadyPlayerList : "fetchReadyPlayerList",
	/** req: {@link IReqCreateGamePlan}, res: {@link IResCommon} */
	createGamePlan : "createGamePlan",
	/** req: {@link IReqCommon}, res: {@link IResGenerateContestManagerLoginCode} */
	generateContestManagerLoginCode : "generateContestManagerLoginCode",
	/** req: {@link IReqFetchContestTeamRank}, res: {@link IResFetchContestTeamRank} */
	fetchContestTeamRank : "fetchContestTeamRank",
	/** req: {@link IReqFetchContestTeamMember}, res: {@link IResFetchContestTeamMember} */
	fetchContestTeamMember : "fetchContestTeamMember",
	/** req: {@link IReqFetchContestTeamPlayerRank}, res: {@link IResFetchContestTeamPlayerRank} */
	fetchContestTeamPlayerRank : "fetchContestTeamPlayerRank",
	/**
	 * * 获取青云之志活动数据
	 * * req: {@link IReqFetchAmuletActivityData}, res: {@link IResFetchAmuletActivityData}
	 */
	fetchAmuletActivityData : "fetchAmuletActivityData",
	/**
	 * * 获取挑战任务与收藏数据
	 * * req: {@link IReqAmuletActivityFetchBrief}, res: {@link IResAmuletActivityFetchBrief}
	 */
	amuletActivityFetchBrief : "amuletActivityFetchBrief",
	/**
	 * * 开始游戏
	 * * req: {@link IReqAmuletActivityStartGame}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityStartGame : "amuletActivityStartGame",
	/**
	 * * 换牌/打牌/开杠/和牌/模切/结束换牌 操作
	 * * req: {@link IReqAmuletActivityOperate}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityOperate : "amuletActivityOperate",
	/**
	 * * 下一关
	 * * req: {@link IReqAmuletActivityUpgrade}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityUpgrade : "amuletActivityUpgrade",
	/**
	 * * 购买卡包
	 * * req: {@link IReqAmuletActivityBuy}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityBuy : "amuletActivityBuy",
	/**
	 * * 选择卡包护身符
	 * * req: {@link IReqAmuletActivitySelectPack}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivitySelectPack : "amuletActivitySelectPack",
	/**
	 * * 出售护身符
	 * * req: {@link IReqAmuletActivitySellEffect}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivitySellEffect : "amuletActivitySellEffect",
	/**
	 * * 护身符排序
	 * * req: {@link IReqAmuletActivityEffectSort}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityEffectSort : "amuletActivityEffectSort",
	/**
	 * * 放弃当前对局
	 * * req: {@link IReqAmuletActivityGiveup}, res: {@link IResCommon}
	 */
	amuletActivityGiveup : "amuletActivityGiveup",
	/**
	 * * 刷新商店
	 * * req: {@link IReqAmuletActivityRefreshShop}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityRefreshShop : "amuletActivityRefreshShop",
	/**
	 * * 选择开局免费护身符
	 * * req: {@link IReqAmuletActivitySelectFreeEffect}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivitySelectFreeEffect : "amuletActivitySelectFreeEffect",
	/**
	 * * 商店升级buff
	 * * req: {@link IReqAmuletActivityUpgradeShopBuff}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityUpgradeShopBuff : "amuletActivityUpgradeShopBuff",
	/**
	 * * 退出商店，进入选关
	 * * req: {@link IReqAmuletActivityEndShopping}, res: {@link IResAmuletEventResponse}
	 */
	amuletActivityEndShopping : "amuletActivityEndShopping",
	/**
	 * * 设置场外增强
	 * * req: {@link IReqAmuletActivitySetSkillLevel}, res: {@link IResCommon}
	 */
	amuletActivitySetSkillLevel : "amuletActivitySetSkillLevel",
	/**
	 * * 获取青云之志维护信息
	 * * req: {@link IReqCommon}, res: {@link IResAmuletActivityMaintainInfo}
	 */
	amuletActivityMaintainInfo : "amuletActivityMaintainInfo",
	/** req: {@link IReqAmuletActivitySelectRewardPack}, res: {@link IResAmuletEventResponse} */
	amuletActivitySelectRewardPack : "amuletActivitySelectRewardPack",
	/**
	 * * 设置青云之志钦定护身符
	 * * req: {@link IReqAmuletActivitySelectBookEffect}, res: {@link IResCommon}
	 */
	amuletActivitySelectBookEffect : "amuletActivitySelectBookEffect",
	/**
	 * * ::DevDebug Start::
	 * * debug 协议在正式版本删除
	 * * req: {@link IReqAmuletActivityDebug}, res: {@link IResCommon}
	 */
	amuletActivityDebug : "amuletActivityDebug",
	/** req: {@link IReqAmuletActivityFetchDebug}, res: {@link IResFetchAmuletActivityDebug} */
	amuletActivityFetchDebug : "amuletActivityFetchDebug",
	/**
	 * * 解锁剧情
	 * * req: {@link IReqStoryActivityUnlock}, res: {@link IResCommon}
	 */
	storyActivityUnlock : "storyActivityUnlock",
	/**
	 * * 解锁结局
	 * * req: {@link IReqStoryActivityUnlockEnding}, res: {@link IResCommon}
	 */
	storyActivityUnlockEnding : "storyActivityUnlockEnding",
	/**
	 * * 领取结局奖励
	 * * req: {@link IReqStoryActivityReceiveEndingReward}, res: {@link IResStoryReward}
	 */
	storyActivityReceiveEndingReward : "storyActivityReceiveEndingReward",
	/**
	 * * 领取剧情通关奖励（完成剧情任一结局）
	 * * req: {@link IReqStoryActivityReceiveFinishReward}, res: {@link IResStoryReward}
	 */
	storyActivityReceiveFinishReward : "storyActivityReceiveFinishReward",
	/**
	 * * 领取剧情全通奖励（完成所有结局）
	 * * req: {@link IReqStoryActivityReceiveAllFinishReward}, res: {@link IResStoryReward}
	 */
	storyActivityReceiveAllFinishReward : "storyActivityReceiveAllFinishReward",
	/**
	 * * 解锁结局并领取结局奖励
	 * * req: {@link IReqStoryActivityUnlockEndingAndReceive}, res: {@link IResStoryActivityUnlockEndingAndReceive}
	 */
	storyActivityUnlockEndingAndReceive : "storyActivityUnlockEndingAndReceive",
	/**
	 * * 获取活动排名
	 * * req: {@link IReqFetchActivityRank}, res: {@link IResFetchActivityRank}
	 */
	fetchActivityRank : "fetchActivityRank",
	/**
	 * * 玩家职业/主播标识开关
	 * * req: {@link IReqSetVerifiedHidden}, res: {@link IResCommon}
	 */
	setVerifiedHidden : "setVerifiedHidden",
	/**
	 * * 获取问卷列表
	 * * req: {@link IReqFetchQuestionnaireList}, res: {@link IResFetchQuestionnaireList}
	 */
	fetchQuestionnaireList : "fetchQuestionnaireList",
	/**
	 * * 获取问卷详情
	 * * req: {@link IReqFetchQuestionnaireDetail}, res: {@link IResFetchQuestionnaireDetail}
	 */
	fetchQuestionnaireDetail : "fetchQuestionnaireDetail",
	/**
	 * * 提交调查问卷结果
	 * * req: {@link IReqSubmitQuestionnaire}, res: {@link IResCommon}
	 */
	submitQuestionnaire : "submitQuestionnaire",
	/**
	 * * 好友房随机机器人角色开关
	 * * req: {@link IReqSetFriendRoomRandomBotChar}, res: {@link IResCommon}
	 */
	setFriendRoomRandomBotChar : "setFriendRoomRandomBotChar",
	/** req: {@link IReqFetchAccountGameHuRecords}, res: {@link IResFetchAccountGameHuRecords} */
	fetchAccountGameHuRecords : "fetchAccountGameHuRecords",
	/** req: {@link IReqFetchAccountInfoExtra}, res: {@link IResFetchAccountInfoExtra} */
	fetchAccountInfoExtra : "fetchAccountInfoExtra",
	/** req: {@link IReqSetAccountFavoriteHu}, res: {@link IResCommon} */
	setAccountFavoriteHu : "setAccountFavoriteHu",
	/**
	 * * seer 报告
	 * * req: {@link IReqFetchSeerReport}, res: {@link IResFetchSeerReport}
	 */
	fetchSeerReport : "fetchSeerReport",
	/** req: {@link IReqCreateSeerReport}, res: {@link IResCreateSeerReport} */
	createSeerReport : "createSeerReport",
	/**
	 * * 获取当前 seer 报告状态（只返回分析中和未过期的）
	 * * req: {@link IReqCommon}, res: {@link IResFetchSeerReportList}
	 */
	fetchSeerReportList : "fetchSeerReportList",
	/** req: {@link IReqCommon}, res: {@link IResFetchSeerInfo} */
	fetchSeerInfo : "fetchSeerInfo",
	/**
	 * * 可选up卡池活动
	 * * req: {@link IReqSelectChestChooseUp}, res: {@link IReqCommon}
	 */
	selectChestChooseUpActivity : "selectChestChooseUpActivity",
	/**
	 * * 年度报告
	 * * req: {@link IReqGenerateAnnualReportToken}, res: {@link IResGenerateAnnualReportToken}
	 */
	generateAnnualReportToken : "generateAnnualReportToken",
	/** req: {@link IReqCommon}, res: {@link IResFetchAnnualReportInfo} */
	fetchAnnualReportInfo : "fetchAnnualReportInfo",
	/**
	 * * 好友备注
	 * * req: {@link IReqRemarkFriend}, res: {@link IResCommon}
	 */
	remarkFriend : "remarkFriend",
	/**
	 * * 雀斗大会
	 * * req: {@link IReqSimV2ActivityFetchInfo}, res: {@link IResSimV2ActivityFetchInfo}
	 */
	simV2ActivityFetchInfo : "simV2ActivityFetchInfo",
	/** req: {@link IReqSimV2ActivityStartSeason}, res: {@link IResSimV2ActivityStartSeason} */
	simV2ActivityStartSeason : "simV2ActivityStartSeason",
	/** req: {@link IReqSimV2ActivityTrain}, res: {@link IResSimV2ActivityTrain} */
	simV2ActivityTrain : "simV2ActivityTrain",
	/** req: {@link IReqSimV2ActivitySelectEvent}, res: {@link IResSimV2ActivitySelectEvent} */
	simV2ActivitySelectEvent : "simV2ActivitySelectEvent",
	/** req: {@link IReqSimV2ActivityStartMatch}, res: {@link IResSimV2ActivityStartMatch} */
	simV2ActivityStartMatch : "simV2ActivityStartMatch",
	/** req: {@link IReqSimV2ActivityEndMatch}, res: {@link IResSimV2ActivityEndMatch} */
	simV2ActivityEndMatch : "simV2ActivityEndMatch",
	/** req: {@link IReqSimV2ActivityGiveUp}, res: {@link IResCommon} */
	simV2ActivityGiveUp : "simV2ActivityGiveUp",
	/** req: {@link IReqSimV2ActivitySetUpgrade}, res: {@link IResCommon} */
	simV2ActivitySetUpgrade : "simV2ActivitySetUpgrade",
	/**
	 * * ::DevDebug Start::
	 * * debug 协议在正式版本删除
	 * * req: {@link IReqSimV2ActivityDebug}, res: {@link IResCommon}
	 */
	simV2ActivityDebug : "simV2ActivityDebug",
	/** req: {@link IReqSimV2ActivityFetchDebug}, res: {@link IResSimV2ActivityFetchDebug} */
	simV2ActivityFetchDebug : "simV2ActivityFetchDebug",
	/**
	 * * 进度奖励活动
	 * * req: {@link IReqProgressRewardActivityReceive}, res: {@link IResProgressRewardActivityReceive}
	 */
	progressRewardActivityReceive : "progressRewardActivityReceive",
	/** req: {@link IReqFetchProgressRewardActivityInfo}, res: {@link IResFetchProgressRewardActivityInfo} */
	fetchProgressRewardActivityInfo : "fetchProgressRewardActivityInfo",
	/**
	 * * 验证游戏口令
	 * * req: {@link IReqAuthGame}, res: {@link IResAuthGame}
	 */
	authGame : "authGame",
	/**
	 * * 客户端资源加载完毕，可以进入游戏
	 * * req: {@link IReqCommon}, res: {@link IResEnterGame}
	 */
	enterGame : "enterGame",
	/**
	 * * 同步游戏
	 * * req: {@link IReqSyncGame}, res: {@link IResSyncGame}
	 */
	syncGame : "syncGame",
	/**
	 * * 完成同步游戏
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	finishSyncGame : "finishSyncGame",
	/**
	 * * 中断游戏（仅1个人模式有效）
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	terminateGame : "terminateGame",
	/**
	 * * 输入基本操作
	 * * req: {@link IReqSelfOperation}, res: {@link IResCommon}
	 */
	inputOperation : "inputOperation",
	/**
	 * * 输入吃碰胡
	 * * req: {@link IReqChiPengGang}, res: {@link IResCommon}
	 */
	inputChiPengGang : "inputChiPengGang",
	/**
	 * * 确认新的回合
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	confirmNewRound : "confirmNewRound",
	/**
	 * * 玩家游戏内广播
	 * * req: {@link IReqBroadcastInGame}, res: {@link IResCommon}
	 */
	broadcastInGame : "broadcastInGame",
	/**
	 * * 玩家游戏内Gm指令
	 * * deprecated
	 * * req: {@link IReqGMCommandInGaming}, res: {@link IResCommon}
	 */
	inputGameGMCommand : "inputGameGMCommand",
	/**
	 * * 获取对局玩家状态
	 * * req: {@link IReqCommon}, res: {@link IResGamePlayerState}
	 */
	fetchGamePlayerState : "fetchGamePlayerState",
	/**
	 * * 客户端定时刷新网络延迟
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	checkNetworkDelay : "checkNetworkDelay",
	/**
	 * * 清除玩家自身的离开状态
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	clearLeaving : "clearLeaving",
	/**
	 * * 开始投票退出游戏
	 * * req: {@link IReqVoteGameEnd}, res: {@link IResGameEndVote}
	 */
	voteGameEnd : "voteGameEnd",
	/**
	 * * 实时观战验证
	 * * req: {@link IReqAuthObserve}, res: {@link IResCommon}
	 */
	authObserve : "authObserve",
	/**
	 * * 开始实时观战
	 * * req: {@link IReqCommon}, res: {@link IResStartObserve}
	 */
	startObserve : "startObserve",
	/**
	 * * 停止实时观战
	 * * req: {@link IReqCommon}, res: {@link IResCommon}
	 */
	stopObserve : "stopObserve",
	/**
	 * * 主备线路功能
	 * * req: {@link IReqRequestConnection}, res: {@link IResRequestConnection}
	 */
	requestConnection : "requestConnection",
	/** req: {@link IReqRequestRouteChange}, res: {@link IResRequestRouteChange} */
	requestRouteChange : "requestRouteChange",
	/** req: {@link IReqHeartbeat}, res: {@link IResHeartbeat} */
	heartbeat : "heartbeat",
}