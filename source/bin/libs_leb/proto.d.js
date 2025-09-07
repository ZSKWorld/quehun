/** 网络通知 */
ENotify = {
    /**
     *@description 通知新的一场游戏开始了
     *@description res: {@link INotifyNewGame}
     */
    NotifyNewGame: "NotifyNewGame",
    /**
     *@description 通知玩家进入游戏的准备就绪
     *@description res: {@link INotifyPlayerLoadGameReady}
     */
    NotifyPlayerLoadGameReady: "NotifyPlayerLoadGameReady",
    /**
     *@description 玩家游戏内广播
     *@description res: {@link INotifyGameBroadcast}
     */
    NotifyGameBroadcast: "NotifyGameBroadcast",
    /**
     *@description 发送整场游戏结束信息
     *@description res: {@link INotifyGameEndResult}
     */
    NotifyGameEndResult: "NotifyGameEndResult",
    /**
     *@description 通知游戏中断
     *@description res: {@link INotifyGameTerminate}
     */
    NotifyGameTerminate: "NotifyGameTerminate",
    /**
     *@description 广播玩家连接状态变化
     *@description res: {@link INotifyPlayerConnectionState}
     */
    NotifyPlayerConnectionState: "NotifyPlayerConnectionState",
    /**
     *@description 通知玩家段位变化
     *@description res: {@link INotifyAccountLevelChange}
     */
    NotifyAccountLevelChange: "NotifyAccountLevelChange",
    /**
     *@description 比赛结束奖励
     *@description res: {@link INotifyGameFinishReward}
     */
    NotifyGameFinishReward: "NotifyGameFinishReward",
    /** @description res: {@link INotifyActivityReward} */
    NotifyActivityReward: "NotifyActivityReward",
    /** @description res: {@link INotifyActivityPoint} */
    NotifyActivityPoint: "NotifyActivityPoint",
    /** @description res: {@link INotifyLeaderboardPoint} */
    NotifyLeaderboardPoint: "NotifyLeaderboardPoint",
    /**
     *@description 比赛暂停通知
     *@description res: {@link INotifyGamePause}
     */
    NotifyGamePause: "NotifyGamePause",
    /**
     *@description 比赛退出投票通知
     *@description res: {@link INotifyEndGameVote}
     */
    NotifyEndGameVote: "NotifyEndGameVote",
    /**
     *@description 通知观战数据
     *@description res: {@link INotifyObserveData}
     */
    NotifyObserveData: "NotifyObserveData",
    /**
     *@description 通知房间游戏开始了
     *@description res: {@link INotifyRoomGameStart}
     */
    NotifyRoomGameStart: "NotifyRoomGameStart",
    /**
     *@description 通知匹配场游戏开始了
     *@description res: {@link INotifyMatchGameStart}
     */
    NotifyMatchGameStart: "NotifyMatchGameStart",
    /**
     *@description 通知玩家就绪
     *@description res: {@link INotifyRoomPlayerReady}
     */
    NotifyRoomPlayerReady: "NotifyRoomPlayerReady",
    /**
     *@description 通知玩家装扮状态
     *@description res: {@link INotifyRoomPlayerDressing}
     */
    NotifyRoomPlayerDressing: "NotifyRoomPlayerDressing",
    /**
     *@description 通知玩家变化
     *@description res: {@link INotifyRoomPlayerUpdate}
     */
    NotifyRoomPlayerUpdate: "NotifyRoomPlayerUpdate",
    /**
     *@description 通知玩家被踢出
     *@description res: {@link INotifyRoomKickOut}
     */
    NotifyRoomKickOut: "NotifyRoomKickOut",
    /**
     *@description 通知好友状态变化
     *@description res: {@link INotifyFriendStateChange}
     */
    NotifyFriendStateChange: "NotifyFriendStateChange",
    /**
     *@description 通知好友展示信息变化
     *@description res: {@link INotifyFriendViewChange}
     */
    NotifyFriendViewChange: "NotifyFriendViewChange",
    /**
     *@description 通知好友变化
     *@description res: {@link INotifyFriendChange}
     */
    NotifyFriendChange: "NotifyFriendChange",
    /**
     *@description 新的好友申请
     *@description res: {@link INotifyNewFriendApply}
     */
    NotifyNewFriendApply: "NotifyNewFriendApply",
    /**
     *@description 发送一条单方面消息
     *@description res: {@link INotifyClientMessage}
     */
    NotifyClientMessage: "NotifyClientMessage",
    /**
     *@description 人物数据更新
     *@description res: {@link INotifyAccountUpdate}
     */
    NotifyAccountUpdate: "NotifyAccountUpdate",
    /**
     *@description 提示有另一处登录
     *@description res: {@link INotifyAnotherLogin}
     */
    NotifyAnotherLogin: "NotifyAnotherLogin",
    /**
     *@description 提示玩家需要登出
     *@description res: {@link INotifyAccountLogout}
     */
    NotifyAccountLogout: "NotifyAccountLogout",
    /**
     *@description 公告更新
     *@description yaya(2020-07-29): 现在不放具体内容，只进行通知（消息体内容除lang外为空），客户端在收到通知后随机延迟（五分钟内）重新调用获取通知接口进行更新
     *@description yaya(2021-12-09): 改成以列表形式通知
     *@description res: {@link INotifyAnnouncementUpdate}
     */
    NotifyAnnouncementUpdate: "NotifyAnnouncementUpdate",
    /**
     *@description 通知新邮件
     *@description res: {@link INotifyNewMail}
     */
    NotifyNewMail: "NotifyNewMail",
    /**
     *@description 通知删除邮件
     *@description res: {@link INotifyDeleteMail}
     */
    NotifyDeleteMail: "NotifyDeleteMail",
    /**
     *@description 通知复活币更新
     *@description res: {@link INotifyReviveCoinUpdate}
     */
    NotifyReviveCoinUpdate: "NotifyReviveCoinUpdate",
    /**
     *@description 每日任务刷新推送
     *@description res: {@link INotifyDailyTaskUpdate}
     */
    NotifyDailyTaskUpdate: "NotifyDailyTaskUpdate",
    /**
     *@description 每日活动任务刷新推送
     *@description res: {@link INotifyActivityTaskUpdate}
     */
    NotifyActivityTaskUpdate: "NotifyActivityTaskUpdate",
    /**
     *@description 长期活动任务刷新推送
     *@description res: {@link INotifyActivityPeriodTaskUpdate}
     */
    NotifyActivityPeriodTaskUpdate: "NotifyActivityPeriodTaskUpdate",
    /**
     *@description 随机活动任务刷新推送
     *@description res: {@link INotifyAccountRandomTaskUpdate}
     */
    NotifyAccountRandomTaskUpdate: "NotifyAccountRandomTaskUpdate",
    /** @description res: {@link INotifyActivitySegmentTaskUpdate} */
    NotifyActivitySegmentTaskUpdate: "NotifyActivitySegmentTaskUpdate",
    /** @description res: {@link INotifyActivityUpdate} */
    NotifyActivityUpdate: "NotifyActivityUpdate",
    /**
     *@description 试炼赛更新推送
     *@description res: {@link INotifyAccountChallengeTaskUpdate}
     */
    NotifyAccountChallengeTaskUpdate: "NotifyAccountChallengeTaskUpdate",
    /**
     *@description 通知：有新的留言
     *@description res: {@link INotifyNewComment}
     */
    NotifyNewComment: "NotifyNewComment",
    /**
     *@description 通知：新滚动公告
     *@description res: {@link INotifyRollingNotice}
     */
    NotifyRollingNotice: "NotifyRollingNotice",
    /**
     *@description 通知：新维护公告
     *@description res: {@link INotifyMaintainNotice}
     */
    NotifyMaintainNotice: "NotifyMaintainNotice",
    /**
     *@description 通知：每日送礼次数刷新
     *@description res: {@link INotifyGiftSendRefresh}
     */
    NotifyGiftSendRefresh: "NotifyGiftSendRefresh",
    /**
     *@description 通知：商店更新
     *@description res: {@link INotifyShopUpdate}
     */
    NotifyShopUpdate: "NotifyShopUpdate",
    /**
     *@description 通知：轮换商店/活动发生改变
     *@description res: {@link INotifyIntervalUpdate}
     */
    NotifyIntervalUpdate: "NotifyIntervalUpdate",
    /**
     *@description 通知：VIP等级变化
     *@description res: {@link INotifyVipLevelChange}
     */
    NotifyVipLevelChange: "NotifyVipLevelChange",
    /**
     *@description 服务器设置
     *@description res: {@link INotifyServerSetting}
     */
    NotifyServerSetting: "NotifyServerSetting",
    /**
     *@description 通知：充值结果
     *@description res: {@link INotifyPayResult}
     */
    NotifyPayResult: "NotifyPayResult",
    /**
     *@description 通知：比赛聊天消息
     *@description res: {@link INotifyCustomContestAccountMsg}
     */
    NotifyCustomContestAccountMsg: "NotifyCustomContestAccountMsg",
    /**
     *@description 通知：比赛系统消息
     *@description res: {@link INotifyCustomContestSystemMsg}
     */
    NotifyCustomContestSystemMsg: "NotifyCustomContestSystemMsg",
    /**
     *@description 通知：匹配超时通知
     *@description res: {@link INotifyMatchTimeout}
     */
    NotifyMatchTimeout: "NotifyMatchTimeout",
    /**
     *@description 通知：匹配出错
     *@description res: {@link INotifyMatchFailed}
     */
    NotifyMatchFailed: "NotifyMatchFailed",
    /**
     *@description 通知：自定义比赛状态变化
     *@description res: {@link INotifyCustomContestState}
     */
    NotifyCustomContestState: "NotifyCustomContestState",
    /**
     *@description 通知：活动变化
     *@description res: {@link INotifyActivityChange}
     */
    NotifyActivityChange: "NotifyActivityChange",
    /**
     *@description 通知：挂机惩罚
     *@description res: {@link INotifyAFKResult}
     */
    NotifyAFKResult: "NotifyAFKResult",
    /**
     *@description 通知：登录排队完成
     *@description res: {@link INotifyLoginQueueFinished}
     */
    NotifyLoginQueueFinished: "NotifyLoginQueueFinished",
    /**
     *@description 比赛结束奖励
     *@description res: {@link INotifyGameFinishRewardV2}
     */
    NotifyGameFinishRewardV2: "NotifyGameFinishRewardV2",
    /** @description res: {@link INotifyActivityRewardV2} */
    NotifyActivityRewardV2: "NotifyActivityRewardV2",
    /** @description res: {@link INotifyActivityPointV2} */
    NotifyActivityPointV2: "NotifyActivityPointV2",
    /** @description res: {@link INotifyLeaderboardPointV2} */
    NotifyLeaderboardPointV2: "NotifyLeaderboardPointV2",
    /** @description res: {@link INotifySeerReport} */
    NotifySeerReport: "NotifySeerReport",
    /**
     *@description 服务端主动断开
     *@description res: {@link INotifyConnectionShutdown}
     */
    NotifyConnectionShutdown: "NotifyConnectionShutdown",
}

/** 网络请求协议 */
ERequest = {
    /**
     *@description 验证游戏口令
     *@description req: {@link IReqAuthGame}, res: {@link IResAuthGame}
     */
    authGame: "authGame",
    /**
     *@description 客户端资源加载完毕，可以进入游戏
     *@description req: {@link IReqCommon}, res: {@link IResEnterGame}
     */
    enterGame: "enterGame",
    /**
     *@description 同步游戏
     *@description req: {@link IReqSyncGame}, res: {@link IResSyncGame}
     */
    syncGame: "syncGame",
    /**
     *@description 完成同步游戏
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    finishSyncGame: "finishSyncGame",
    /**
     *@description 中断游戏（仅1个人模式有效）
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    terminateGame: "terminateGame",
    /**
     *@description 输入基本操作
     *@description req: {@link IReqSelfOperation}, res: {@link IResCommon}
     */
    inputOperation: "inputOperation",
    /**
     *@description 输入吃碰胡
     *@description req: {@link IReqChiPengGang}, res: {@link IResCommon}
     */
    inputChiPengGang: "inputChiPengGang",
    /**
     *@description 确认新的回合
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    confirmNewRound: "confirmNewRound",
    /**
     *@description 玩家游戏内广播
     *@description req: {@link IReqBroadcastInGame}, res: {@link IResCommon}
     */
    broadcastInGame: "broadcastInGame",
    /**
     *@description 玩家游戏内Gm指令
     *@description deprecated
     *@description req: {@link IReqGMCommandInGaming}, res: {@link IResCommon}
     */
    inputGameGMCommand: "inputGameGMCommand",
    /**
     *@description 获取对局玩家状态
     *@description req: {@link IReqCommon}, res: {@link IResGamePlayerState}
     */
    fetchGamePlayerState: "fetchGamePlayerState",
    /**
     *@description 客户端定时刷新网络延迟
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    checkNetworkDelay: "checkNetworkDelay",
    /**
     *@description 清除玩家自身的离开状态
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    clearLeaving: "clearLeaving",
    /**
     *@description 开始投票退出游戏
     *@description req: {@link IReqVoteGameEnd}, res: {@link IResGameEndVote}
     */
    voteGameEnd: "voteGameEnd",
    /**
     *@description 实时观战验证
     *@description req: {@link IReqAuthObserve}, res: {@link IResCommon}
     */
    authObserve: "authObserve",
    /**
     *@description 开始实时观战
     *@description req: {@link IReqCommon}, res: {@link IResStartObserve}
     */
    startObserve: "startObserve",
    /**
     *@description 停止实时观战
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    stopObserve: "stopObserve",
    /**
     *@description 获取连接相关信息
     *@description req: {@link IReqCommon}, res: {@link IResConnectionInfo}
     */
    fetchConnectionInfo: "fetchConnectionInfo",
    /**
     *@description 获取排队信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchQueueInfo}
     */
    fetchQueueInfo: "fetchQueueInfo",
    /** @description req: {@link IReqCommon}, res: {@link IResCommon} */
    cancelQueue: "cancelQueue",
    /** @description req: {@link IReqOpenidCheck}, res: {@link IResOauth2Check} */
    openidCheck: "openidCheck",
    /**
     *@description 注册账号
     *@description req: {@link IReqSignupAccount}, res: {@link IResSignupAccount}
     */
    signup: "signup",
    /**
     *@description 登录账号
     *@description req: {@link IReqLogin}, res: {@link IResLogin}
     */
    login: "login",
    /**
     *@description 备线半登录状态
     *@description req: {@link IReqPrepareLogin}, res: {@link IResCommon}
     */
    prepareLogin: "prepareLogin",
    /**
     *@description 备线切换主线快速登录
     *@description req: {@link IReqCommon}, res: {@link IResFastLogin}
     */
    fastLogin: "fastLogin",
    /**
     *@description 登录后获取信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchInfo}
     */
    fetchInfo: "fetchInfo",
    /**
     *@description 登录成功后摇
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    loginSuccess: "loginSuccess",
    /**
     *@description 获取服务器维护信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchServerMaintenanceInfo}
     */
    fetchServerMaintenanceInfo: "fetchServerMaintenanceInfo",
    /** @description req: {@link IReqEmailLogin}, res: {@link IResLogin} */
    emailLogin: "emailLogin",
    /**
     *@description oauth2 方式登录授权
     *@description req: {@link IReqOauth2Auth}, res: {@link IResOauth2Auth}
     */
    oauth2Auth: "oauth2Auth",
    /**
     *@description oauth2 验证是否已经注册过账号
     *@description req: {@link IReqOauth2Check}, res: {@link IResOauth2Check}
     */
    oauth2Check: "oauth2Check",
    /**
     *@description oauth2 注册
     *@description req: {@link IReqOauth2Signup}, res: {@link IResOauth2Signup}
     */
    oauth2Signup: "oauth2Signup",
    /**
     *@description oauth2 登录
     *@description req: {@link IReqOauth2Login}, res: {@link IResLogin}
     */
    oauth2Login: "oauth2Login",
    /**
     *@description dmm 获取登录参数
     *@description req: {@link IReqDMMPreLogin}, res: {@link IResDMMPreLogin}
     */
    dmmPreLogin: "dmmPreLogin",
    /**
     *@description 获取手机验证码（已登录的情况下）
     *@description req: {@link IReqCreatePhoneVerifyCode}, res: {@link IResCommon}
     */
    createPhoneVerifyCode: "createPhoneVerifyCode",
    /**
     *@description 获取邮箱验证码
     *@description req: {@link IReqCreateEmailVerifyCode}, res: {@link IResCommon}
     */
    createEmailVerifyCode: "createEmailVerifyCode",
    /**
     *@description 验证码获取安全权限
     *@description req: {@link IReqVerifyCodeForSecure}, res: {@link IResVerfiyCodeForSecure}
     */
    verfifyCodeForSecure: "verfifyCodeForSecure",
    /**
     *@description 绑定手机号
     *@description req: {@link IReqBindPhoneNumber}, res: {@link IResCommon}
     */
    bindPhoneNumber: "bindPhoneNumber",
    /**
     *@description 解绑手机号
     *@description req: {@link IReqUnbindPhoneNumber}, res: {@link IResCommon}
     */
    unbindPhoneNumber: "unbindPhoneNumber",
    /**
     *@description 查询已绑定手机是否有登录绑定
     *@description req: {@link IReqCommon}, res: {@link IResFetchPhoneLoginBind}
     */
    fetchPhoneLoginBind: "fetchPhoneLoginBind",
    /**
     *@description 生成手机登录绑定
     *@description req: {@link IReqCreatePhoneLoginBind}, res: {@link IResCommon}
     */
    createPhoneLoginBind: "createPhoneLoginBind",
    /**
     *@description 绑定邮箱
     *@description req: {@link IReqBindEmail}, res: {@link IResCommon}
     */
    bindEmail: "bindEmail",
    /**
     *@description 修改密码
     *@description req: {@link IReqModifyPassword}, res: {@link IResCommon}
     */
    modifyPassword: "modifyPassword",
    /**
     *@description 绑定账号密码（Oauth2注册的账号使用，只有一次机会）
     *@description req: {@link IReqBindAccount}, res: {@link IResCommon}
     */
    bindAccount: "bindAccount",
    /**
     *@description 注销账号
     *@description req: {@link IReqLogout}, res: {@link IResLogout}
     */
    logout: "logout",
    /**
     *@description 心跳
     *@description req: {@link IReqHeatBeat}, res: {@link IResCommon}
     */
    heatbeat: "heatbeat",
    /**
     *@description 通过Eid获取账号ID
     *@description req: {@link IReqSearchAccountByEidLobby}, res: {@link IResSearchAccountbyEidLobby}
     */
    searchAccountByEid: "searchAccountByEid",
    /**
     *@description 登录心跳（用于防止第三方客户端，登录后不调用该接口无法进行匹配游戏）
     *@description req: {@link IReqLoginBeat}, res: {@link IResCommon}
     */
    loginBeat: "loginBeat",
    /**
     *@description 创建昵称
     *@description req: {@link IReqCreateNickname}, res: {@link IResCommon}
     */
    createNickname: "createNickname",
    /**
     *@description 修改昵称
     *@description req: {@link IReqModifyNickname}, res: {@link IResCommon}
     */
    modifyNickname: "modifyNickname",
    /**
     *@description 修改生日
     *@description req: {@link IReqModifyBirthday}, res: {@link IResCommon}
     */
    modifyBirthday: "modifyBirthday",
    /**
     *@description 请求自己的房间信息
     *@description req: {@link IReqCommon}, res: {@link IResSelfRoom}
     */
    fetchRoom: "fetchRoom",
    /**
     *@description 请求自己的对局信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchGamingInfo}
     */
    fetchGamingInfo: "fetchGamingInfo",
    /**
     *@description 创建房间
     *@description req: {@link IReqCreateRoom}, res: {@link IResCreateRoom}
     */
    createRoom: "createRoom",
    /**
     *@description 加入房间
     *@description req: {@link IReqJoinRoom}, res: {@link IResJoinRoom}
     */
    joinRoom: "joinRoom",
    /**
     *@description 离开房间
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    leaveRoom: "leaveRoom",
    /**
     *@description 准备
     *@description req: {@link IReqRoomReady}, res: {@link IResCommon}
     */
    readyPlay: "readyPlay",
    /**
     *@description 切换装扮状态
     *@description req: {@link IReqRoomDressing}, res: {@link IResCommon}
     */
    dressingStatus: "dressingStatus",
    /**
     *@description 开始
     *@description req: {@link IReqRoomStart}, res: {@link IResCommon}
     */
    startRoom: "startRoom",
    /**
     *@description 踢出玩家
     *@description req: {@link IReqRoomKickPlayer}, res: {@link IResCommon}
     */
    roomKickPlayer: "roomKickPlayer",
    /**
     *@description 修改房间
     *@description req: {@link IReqModifyRoom}, res: {@link IResCommon}
     */
    modifyRoom: "modifyRoom",
    /**
     *@description 添加好友房机器人
     *@description req: {@link IReqAddRoomRobot}, res: {@link IResCommon}
     */
    addRoomRobot: "addRoomRobot",
    /**
     *@description 加入匹配
     *@description req: {@link IReqJoinMatchQueue}, res: {@link IResCommon}
     */
    matchGame: "matchGame",
    /**
     *@description 取消匹配
     *@description req: {@link IReqCancelMatchQueue}, res: {@link IResCommon}
     */
    cancelMatch: "cancelMatch",
    /**
     *@description 请求账号信息
     *@description req: {@link IReqAccountInfo}, res: {@link IResAccountInfo}
     */
    fetchAccountInfo: "fetchAccountInfo",
    /**
     *@description 修改头像
     *@description req: {@link IReqChangeAvatar}, res: {@link IResCommon}
     */
    changeAvatar: "changeAvatar",
    /**
     *@description 领取更新礼包
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    receiveVersionReward: "receiveVersionReward",
    /**
     *@description 请求账号统计信息
     *@description req: {@link IReqAccountStatisticInfo}, res: {@link IResAccountStatisticInfo}
     */
    fetchAccountStatisticInfo: "fetchAccountStatisticInfo",
    /**
     *@description 获取试炼赛赛季排名信息
     *@description req: {@link IReqAccountInfo}, res: {@link IResAccountChallengeRankInfo}
     */
    fetchAccountChallengeRankInfo: "fetchAccountChallengeRankInfo",
    /**
     *@description 获取账号人物信息
     *@description req: {@link IReqCommon}, res: {@link IResAccountCharacterInfo}
     */
    fetchAccountCharacterInfo: "fetchAccountCharacterInfo",
    /**
     *@description 商店购买
     *@description req: {@link IReqShopPurchase}, res: {@link IResShopPurchase}
     */
    shopPurchase: "shopPurchase",
    /**
     *@description 获取单场牌谱记录
     *@description req: {@link IReqGameRecord}, res: {@link IResGameRecord}
     */
    fetchGameRecord: "fetchGameRecord",
    /**
     *@description 添加查看牌谱记录
     *@description req: {@link IReqGameRecord}, res: {@link IResCommon}
     */
    readGameRecord: "readGameRecord",
    /**
     *@description 获取牌谱列表
     *@description 20240820更新之前的牌谱通过这个接口获取
     *@description req: {@link IReqGameRecordList}, res: {@link IResGameRecordList}
     */
    fetchGameRecordList: "fetchGameRecordList",
    /**
     *@description 获取牌谱列表V2
     *@description 202408新版牌谱功能使用（基于迭代器）
     *@description 2024.08.20 06:33 停服  07:40 国服启动
     *@description 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
     *@description req: {@link IReqGameRecordListV2}, res: {@link IResGameRecordListV2}
     */
    fetchGameRecordListV2: "fetchGameRecordListV2",
    /**
     *@description 获取后续牌谱列表内容
     *@description 基于 fetchGameRecordListV2 协议返回结果使用
     *@description 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
     *@description req: {@link IReqNextGameRecordList}, res: {@link IResNextGameRecordList}
     */
    fetchNextGameRecordList: "fetchNextGameRecordList",
    /**
     *@description 获得收藏的牌谱列表（简要信息）
     *@description req: {@link IReqCommon}, res: {@link IResCollectedGameRecordList}
     */
    fetchCollectedGameRecordList: "fetchCollectedGameRecordList",
    /**
     *@description 获取牌谱列表的详细信息
     *@description req: {@link IReqGameRecordsDetail}, res: {@link IResGameRecordsDetail}
     */
    fetchGameRecordsDetail: "fetchGameRecordsDetail",
    /**
     *@description 获取牌谱列表的详细信息 （新版）
     *@description req: {@link IReqGameRecordsDetailV2}, res: {@link IResGameRecordsDetailV2}
     */
    fetchGameRecordsDetailV2: "fetchGameRecordsDetailV2",
    /**
     *@description 添加牌谱收藏
     *@description req: {@link IReqAddCollectedGameRecord}, res: {@link IResAddCollectedGameRecord}
     */
    addCollectedGameRecord: "addCollectedGameRecord",
    /**
     *@description 移除牌谱收藏
     *@description req: {@link IReqRemoveCollectedGameRecord}, res: {@link IResRemoveCollectedGameRecord}
     */
    removeCollectedGameRecord: "removeCollectedGameRecord",
    /**
     *@description 修改牌谱备注
     *@description req: {@link IReqChangeCollectedGameRecordRemarks}, res: {@link IResChangeCollectedGameRecordRemarks}
     */
    changeCollectedGameRecordRemarks: "changeCollectedGameRecordRemarks",
    /**
     *@description 获取排行榜
     *@description req: {@link IReqLevelLeaderboard}, res: {@link IResLevelLeaderboard}
     */
    fetchLevelLeaderboard: "fetchLevelLeaderboard",
    /**
     *@description 获取试炼赛排行榜
     *@description req: {@link IReqChallangeLeaderboard}, res: {@link IResChallengeLeaderboard}
     */
    fetchChallengeLeaderboard: "fetchChallengeLeaderboard",
    /**
     *@description 获取多人试炼赛等级信息
     *@description req: {@link IReqMutiChallengeLevel}, res: {@link IResMutiChallengeLevel}
     */
    fetchMutiChallengeLevel: "fetchMutiChallengeLevel",
    /**
     *@description 获取多人简要信息
     *@description req: {@link IReqMultiAccountId}, res: {@link IResMultiAccountBrief}
     */
    fetchMultiAccountBrief: "fetchMultiAccountBrief",
    /**
     *@description 获取好友列表
     *@description req: {@link IReqCommon}, res: {@link IResFriendList}
     */
    fetchFriendList: "fetchFriendList",
    /**
     *@description 获取好友申请列表
     *@description req: {@link IReqCommon}, res: {@link IResFriendApplyList}
     */
    fetchFriendApplyList: "fetchFriendApplyList",
    /**
     *@description 申请好友
     *@description req: {@link IReqApplyFriend}, res: {@link IResCommon}
     */
    applyFriend: "applyFriend",
    /**
     *@description 处理好友申请
     *@description req: {@link IReqHandleFriendApply}, res: {@link IResCommon}
     */
    handleFriendApply: "handleFriendApply",
    /**
     *@description 删除好友
     *@description req: {@link IReqRemoveFriend}, res: {@link IResCommon}
     */
    removeFriend: "removeFriend",
    /**
     *@description 查询单个玩家
     *@description req: {@link IReqSearchAccountById}, res: {@link IResSearchAccountById}
     */
    searchAccountById: "searchAccountById",
    /**
     *@description 模糊查询玩家
     *@description req: {@link IReqSearchAccountByPattern}, res: {@link IResSearchAccountByPattern}
     */
    searchAccountByPattern: "searchAccountByPattern",
    /**
     *@description 查询玩家状态
     *@description req: {@link IReqAccountList}, res: {@link IResAccountStates}
     */
    fetchAccountState: "fetchAccountState",
    /**
     *@description 请求背包信息
     *@description req: {@link IReqCommon}, res: {@link IResBagInfo}
     */
    fetchBagInfo: "fetchBagInfo",
    /**
     *@description 使用背包道具
     *@description req: {@link IReqUseBagItem}, res: {@link IResCommon}
     */
    useBagItem: "useBagItem",
    /**
     *@description 使用手选道具物品
     *@description req: {@link IReqOpenManualItem}, res: {@link IResCommon}
     */
    openManualItem: "openManualItem",
    /**
     *@description 使用随机道具物品
     *@description req: {@link IReqOpenRandomRewardItem}, res: {@link IResOpenRandomRewardItem}
     */
    openRandomRewardItem: "openRandomRewardItem",
    /**
     *@description 使用全领礼包物品
     *@description req: {@link IReqOpenAllRewardItem}, res: {@link IResOpenAllRewardItem}
     */
    openAllRewardItem: "openAllRewardItem",
    /**
     *@description 合成碎片
     *@description req: {@link IReqComposeShard}, res: {@link IResCommon}
     */
    composeShard: "composeShard",
    /**
     *@description 获取公告
     *@description req: {@link IReqFetchAnnouncement}, res: {@link IResAnnouncement}
     */
    fetchAnnouncement: "fetchAnnouncement",
    /**
     *@description 阅读公告
     *@description req: {@link IReqReadAnnouncement}, res: {@link IResCommon}
     */
    readAnnouncement: "readAnnouncement",
    /**
     *@description 获取邮件列表
     *@description req: {@link IReqCommon}, res: {@link IResMailInfo}
     */
    fetchMailInfo: "fetchMailInfo",
    /**
     *@description 阅读邮件
     *@description req: {@link IReqReadMail}, res: {@link IResCommon}
     */
    readMail: "readMail",
    /**
     *@description 删除邮件
     *@description req: {@link IReqDeleteMail}, res: {@link IResCommon}
     */
    deleteMail: "deleteMail",
    /**
     *@description 拿取邮件附件
     *@description req: {@link IReqTakeAttachment}, res: {@link IResCommon}
     */
    takeAttachmentFromMail: "takeAttachmentFromMail",
    /**
     *@description 领取成就奖励
     *@description req: {@link IReqReceiveAchievementReward}, res: {@link IResReceiveAchievementReward}
     */
    receiveAchievementReward: "receiveAchievementReward",
    /**
     *@description 领取成就大组奖励
     *@description req: {@link IReqReceiveAchievementGroupReward}, res: {@link IResReceiveAchievementGroupReward}
     */
    receiveAchievementGroupReward: "receiveAchievementGroupReward",
    /**
     *@description 获取全服成就完成率
     *@description req: {@link IReqCommon}, res: {@link IResFetchAchievementRate}
     */
    fetchAchievementRate: "fetchAchievementRate",
    /**
     *@description 获取成就
     *@description req: {@link IReqCommon}, res: {@link IResAchievement}
     */
    fetchAchievement: "fetchAchievement",
    /**
     *@description 购买试炼资格
     *@description req: {@link IReqBuyShiLian}, res: {@link IResCommon}
     */
    buyShiLian: "buyShiLian",
    /**
     *@description 试炼匹配
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    matchShiLian: "matchShiLian",
    /**
     *@description 继续下一阶段试炼
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    goNextShiLian: "goNextShiLian",
    /**
     *@description 更新客户端数据
     *@description req: {@link IReqUpdateClientValue}, res: {@link IResCommon}
     */
    updateClientValue: "updateClientValue",
    /**
     *@description 获取客户端数据
     *@description req: {@link IReqCommon}, res: {@link IResClientValue}
     */
    fetchClientValue: "fetchClientValue",
    /**
     *@description 客户端信息
     *@description req: {@link IReqClientMessage}, res: {@link IResCommon}
     */
    clientMessage: "clientMessage",
    /**
     *@description 请求当前匹配模式信息
     *@description req: {@link IReqCurrentMatchInfo}, res: {@link IResCurrentMatchInfo}
     */
    fetchCurrentMatchInfo: "fetchCurrentMatchInfo",
    /**
     *@description 用户举报
     *@description req: {@link IReqUserComplain}, res: {@link IResCommon}
     */
    userComplain: "userComplain",
    /**
     *@description ------ 复活币 -------- //
     *@description 获取复活币信息
     *@description req: {@link IReqCommon}, res: {@link IResReviveCoinInfo}
     */
    fetchReviveCoinInfo: "fetchReviveCoinInfo",
    /**
     *@description 领取复活币
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    gainReviveCoin: "gainReviveCoin",
    /**
     *@description 获取每日任务
     *@description req: {@link IReqCommon}, res: {@link IResDailyTask}
     */
    fetchDailyTask: "fetchDailyTask",
    /**
     *@description 刷新每日任务
     *@description req: {@link IReqRefreshDailyTask}, res: {@link IResRefreshDailyTask}
     */
    refreshDailyTask: "refreshDailyTask",
    /**
     *@description 使用礼品码
     *@description req: {@link IReqUseGiftCode}, res: {@link IResUseGiftCode}
     */
    useGiftCode: "useGiftCode",
    /**
     *@description 使用特殊礼品码
     *@description req: {@link IReqUseGiftCode}, res: {@link IResUseSpecialGiftCode}
     */
    useSpecialGiftCode: "useSpecialGiftCode",
    /**
     *@description 获取称号列表
     *@description req: {@link IReqCommon}, res: {@link IResTitleList}
     */
    fetchTitleList: "fetchTitleList",
    /**
     *@description 使用称号
     *@description req: {@link IReqUseTitle}, res: {@link IResCommon}
     */
    useTitle: "useTitle",
    /**
     *@description 发送给其他玩家自定义消息
     *@description req: {@link IReqSendClientMessage}, res: {@link IResCommon}
     */
    sendClientMessage: "sendClientMessage",
    /**
     *@description 获取游戏直播信息（全视角）
     *@description req: {@link IReqGameLiveInfo}, res: {@link IResGameLiveInfo}
     */
    fetchGameLiveInfo: "fetchGameLiveInfo",
    /**
     *@description 获取游戏直播剩余分片信息（增量）
     *@description req: {@link IReqGameLiveLeftSegment}, res: {@link IResGameLiveLeftSegment}
     */
    fetchGameLiveLeftSegment: "fetchGameLiveLeftSegment",
    /**
     *@description 获取正在直播的游戏列表
     *@description req: {@link IReqGameLiveList}, res: {@link IResGameLiveList}
     */
    fetchGameLiveList: "fetchGameLiveList",
    /**
     *@description 留言板设置信息
     *@description req: {@link IReqCommon}, res: {@link IResCommentSetting}
     */
    fetchCommentSetting: "fetchCommentSetting",
    /**
     *@description 更新留言板设置
     *@description req: {@link IReqUpdateCommentSetting}, res: {@link IResCommon}
     */
    updateCommentSetting: "updateCommentSetting",
    /**
     *@description 获取留言板列表
     *@description req: {@link IReqFetchCommentList}, res: {@link IResFetchCommentList}
     */
    fetchCommentList: "fetchCommentList",
    /**
     *@description 获取留言板内容
     *@description req: {@link IReqFetchCommentContent}, res: {@link IResFetchCommentContent}
     */
    fetchCommentContent: "fetchCommentContent",
    /**
     *@description 发送留言
     *@description req: {@link IReqLeaveComment}, res: {@link IResCommon}
     */
    leaveComment: "leaveComment",
    /**
     *@description 删除留言
     *@description req: {@link IReqDeleteComment}, res: {@link IResCommon}
     */
    deleteComment: "deleteComment",
    /**
     *@description 更新留言阅读记录
     *@description req: {@link IReqUpdateReadComment}, res: {@link IResCommon}
     */
    updateReadComment: "updateReadComment",
    /**
     *@description 获取滚动公告
     *@description req: {@link IReqFetchRollingNotice}, res: {@link IResFetchRollingNotice}
     */
    fetchRollingNotice: "fetchRollingNotice",
    /**
     *@description 获取维护公告
     *@description req: {@link IReqCommon}, res: {@link IResFetchMaintainNotice}
     */
    fetchMaintainNotice: "fetchMaintainNotice",
    /**
     *@description 获取服务器时间
     *@description req: {@link IReqCommon}, res: {@link IResServerTime}
     */
    fetchServerTime: "fetchServerTime",
    /**
     *@description 获取对应平台的商品列表
     *@description req: {@link IReqPlatformBillingProducts}, res: {@link IResPlatformBillingProducts}
     */
    fetchPlatformProducts: "fetchPlatformProducts",
    /**
     *@description 获取角色随机池信息
     *@description req: {@link IReqCommon}, res: {@link IResRandomCharacter}
     */
    fetchRandomCharacter: "fetchRandomCharacter",
    /**
     *@description 设置随机角色池
     *@description req: {@link IReqRandomCharacter}, res: {@link IResCommon}
     */
    setRandomCharacter: "setRandomCharacter",
    /**
     *@description 取消 Google Play 订单
     *@description req: {@link IReqCancelGooglePlayOrder}, res: {@link IResCommon}
     */
    cancelGooglePlayOrder: "cancelGooglePlayOrder",
    /**
     *@description 抽宝箱
     *@description req: {@link IReqOpenChest}, res: {@link IResOpenChest}
     */
    openChest: "openChest",
    /**
     *@description 宝箱商店购买商品
     *@description req: {@link IReqBuyFromChestShop}, res: {@link IResBuyFromChestShop}
     */
    buyFromChestShop: "buyFromChestShop",
    /**
     *@description 获取每日签到信息
     *@description req: {@link IReqCommon}, res: {@link IResDailySignInInfo}
     */
    fetchDailySignInInfo: "fetchDailySignInInfo",
    /**
     *@description 签到
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    doDailySignIn: "doDailySignIn",
    /** @description req: {@link IReqDoActivitySignIn}, res: {@link IResDoActivitySignIn} */
    doActivitySignIn: "doActivitySignIn",
    /**
     *@description 获取角色信息
     *@description req: {@link IReqCommon}, res: {@link IResCharacterInfo}
     */
    fetchCharacterInfo: "fetchCharacterInfo",
    /**
     *@description 更新角色排序
     *@description req: {@link IReqUpdateCharacterSort}, res: {@link IResCommon}
     */
    updateCharacterSort: "updateCharacterSort",
    /**
     *@description 切换主角色
     *@description req: {@link IReqChangeMainCharacter}, res: {@link IResCommon}
     */
    changeMainCharacter: "changeMainCharacter",
    /**
     *@description 切换角色皮肤
     *@description req: {@link IReqChangeCharacterSkin}, res: {@link IResCommon}
     */
    changeCharacterSkin: "changeCharacterSkin",
    /**
     *@description 设置角色外观
     *@description req: {@link IReqChangeCharacterView}, res: {@link IResCommon}
     */
    changeCharacterView: "changeCharacterView",
    /**
     *@description 设置隐藏角色
     *@description req: {@link IReqSetHiddenCharacter}, res: {@link IResSetHiddenCharacter}
     */
    setHiddenCharacter: "setHiddenCharacter",
    /**
     *@description 赠送礼物给角色
     *@description req: {@link IReqSendGiftToCharacter}, res: {@link IResSendGiftToCharacter}
     */
    sendGiftToCharacter: "sendGiftToCharacter",
    /**
     *@description 出售道具（目前只有礼物可以出售）
     *@description req: {@link IReqSellItem}, res: {@link IResCommon}
     */
    sellItem: "sellItem",
    /**
     *@description 获取通用外观
     *@description req: {@link IReqCommon}, res: {@link IResCommonView}
     */
    fetchCommonView: "fetchCommonView",
    /**
     *@description 切换通用外观（牌桌，牌背等）
     *@description req: {@link IReqChangeCommonView}, res: {@link IResCommon}
     */
    changeCommonView: "changeCommonView",
    /**
     *@description 保存通用外观方案
     *@description req: {@link IReqSaveCommonViews}, res: {@link IResCommon}
     */
    saveCommonViews: "saveCommonViews",
    /**
     *@description 获取通用外观方案
     *@description req: {@link IReqCommonViews}, res: {@link IResCommonViews}
     */
    fetchCommonViews: "fetchCommonViews",
    /**
     *@description 获取所有通用外观方案
     *@description req: {@link IReqCommon}, res: {@link IResAllcommonViews}
     */
    fetchAllCommonViews: "fetchAllCommonViews",
    /** @description req: {@link IReqUseCommonView}, res: {@link IResCommon} */
    useCommonView: "useCommonView",
    /**
     *@description 突破角色
     *@description req: {@link IReqUpgradeCharacter}, res: {@link IResUpgradeCharacter}
     */
    upgradeCharacter: "upgradeCharacter",
    /**
     *@description ::::角色传记相关::::
     *@description 完成结局
     *@description req: {@link IReqFinishedEnding}, res: {@link IResCommon}
     */
    addFinishedEnding: "addFinishedEnding",
    /**
     *@description 领取结局奖励
     *@description req: {@link IReqFinishedEnding}, res: {@link IResCommon}
     */
    receiveEndingReward: "receiveEndingReward",
    /**
     *@description GM指令
     *@description req: {@link IReqGMCommand}, res: {@link IResCommon}
     */
    gameMasterCommand: "gameMasterCommand",
    /**
     *@description 获取商店信息
     *@description req: {@link IReqCommon}, res: {@link IResShopInfo}
     */
    fetchShopInfo: "fetchShopInfo",
    /**
     *@description 普通商店购买
     *@description req: {@link IReqBuyFromShop}, res: {@link IResBuyFromShop}
     */
    buyFromShop: "buyFromShop",
    /**
     *@description 杂货铺购买
     *@description req: {@link IReqBuyFromZHP}, res: {@link IResCommon}
     */
    buyFromZHP: "buyFromZHP",
    /**
     *@description 刷新杂货铺商店
     *@description req: {@link IReqReshZHPShop}, res: {@link IResRefreshZHPShop}
     */
    refreshZHPShop: "refreshZHPShop",
    /**
     *@description 获取账号月卡信息
     *@description req: {@link IReqCommon}, res: {@link IResMonthTicketInfo}
     */
    fetchMonthTicketInfo: "fetchMonthTicketInfo",
    /**
     *@description 领取月卡工资
     *@description req: {@link IReqCommon}, res: {@link IResPayMonthTicket}
     */
    payMonthTicket: "payMonthTicket",
    /**
     *@description 兑换货币
     *@description req: {@link IReqExchangeCurrency}, res: {@link IResCommon}
     */
    exchangeCurrency: "exchangeCurrency",
    /**
     *@description 兑换寻觅石头
     *@description req: {@link IReqExchangeCurrency}, res: {@link IResCommon}
     */
    exchangeChestStone: "exchangeChestStone",
    /**
     *@description 皮肤券兑换辉玉
     *@description req: {@link IReqExchangeCurrency}, res: {@link IResCommon}
     */
    exchangeDiamond: "exchangeDiamond",
    /**
     *@description 获取服务器设置
     *@description req: {@link IReqCommon}, res: {@link IResServerSettings}
     */
    fetchServerSettings: "fetchServerSettings",
    /**
     *@description 账户设置
     *@description req: {@link IReqCommon}, res: {@link IResAccountSettings}
     */
    fetchAccountSettings: "fetchAccountSettings",
    /**
     *@description 更新账号设置
     *@description req: {@link IReqUpdateAccountSettings}, res: {@link IResCommon}
     */
    updateAccountSettings: "updateAccountSettings",
    /**
     *@description 获取改名时间
     *@description req: {@link IReqCommon}, res: {@link IResModNicknameTime}
     */
    fetchModNicknameTime: "fetchModNicknameTime",
    /**
     *@description 创建微信支付（扫码支付）订单
     *@description req: {@link IReqCreateWechatNativeOrder}, res: {@link IResCreateWechatNativeOrder}
     */
    createWechatNativeOrder: "createWechatNativeOrder",
    /**
     *@description 创建微信支付（App支付）订单
     *@description req: {@link IReqCreateWechatAppOrder}, res: {@link IResCreateWechatAppOrder}
     */
    createWechatAppOrder: "createWechatAppOrder",
    /**
     *@description 创建支付宝（链接地址）订单
     *@description req: {@link IReqCreateAlipayOrder}, res: {@link IResCreateAlipayOrder}
     */
    createAlipayOrder: "createAlipayOrder",
    /**
     *@description 创建支付宝（扫码支付）订单
     *@description req: {@link IReqCreateAlipayScanOrder}, res: {@link IResCreateAlipayScanOrder}
     */
    createAlipayScanOrder: "createAlipayScanOrder",
    /**
     *@description 创建支付宝（App支付）订单
     *@description req: {@link IReqCreateAlipayAppOrder}, res: {@link IResCreateAlipayAppOrder}
     */
    createAlipayAppOrder: "createAlipayAppOrder",
    /**
     *@description 创建日服-CreditCard订单
     *@description req: {@link IReqCreateJPCreditCardOrder}, res: {@link IResCreateJPCreditCardOrder}
     */
    createJPCreditCardOrder: "createJPCreditCardOrder",
    /**
     *@description 创建日服-Paypal订单
     *@description req: {@link IReqCreateJPPaypalOrder}, res: {@link IResCreateJPPaypalOrder}
     */
    createJPPaypalOrder: "createJPPaypalOrder",
    /**
     *@description 创建日服-Au订单
     *@description req: {@link IReqCreateJPAuOrder}, res: {@link IResCreateJPAuOrder}
     */
    createJPAuOrder: "createJPAuOrder",
    /**
     *@description 创建日服-Docomo订单
     *@description req: {@link IReqCreateJPDocomoOrder}, res: {@link IResCreateJPDocomoOrder}
     */
    createJPDocomoOrder: "createJPDocomoOrder",
    /**
     *@description 创建日服-WebMoney订单
     *@description req: {@link IReqCreateJPWebMoneyOrder}, res: {@link IResCreateJPWebMoneyOrder}
     */
    createJPWebMoneyOrder: "createJPWebMoneyOrder",
    /**
     *@description 创建日服-Softbank订单
     *@description req: {@link IReqCreateJPSoftbankOrder}, res: {@link IResCreateJPSoftbankOrder}
     */
    createJPSoftbankOrder: "createJPSoftbankOrder",
    /**
     *@description 创建日服-Paypay订单
     *@description req: {@link IReqCreateJPPayPayOrder}, res: {@link IResCreateJPPayPayOrder}
     */
    createJPPayPayOrder: "createJPPayPayOrder",
    /**
     *@description 获取日服信用卡订单信息
     *@description req: {@link IReqFetchJPCommonCreditCardOrder}, res: {@link IResFetchJPCommonCreditCardOrder}
     */
    fetchJPCommonCreditCardOrder: "fetchJPCommonCreditCardOrder",
    /**
     *@description 创建日服-GMO订单
     *@description req: {@link IReqCreateJPGMOOrder}, res: {@link IResCreateJPGMOOrder}
     */
    createJPGMOOrder: "createJPGMOOrder",
    /**
     *@description 创建美服-Paypal订单
     *@description req: {@link IReqCreateENPaypalOrder}, res: {@link IResCreateENPaypalOrder}
     */
    createENPaypalOrder: "createENPaypalOrder",
    /**
     *@description 创建美服-MasterCard订单
     *@description req: {@link IReqCreateENMasterCardOrder}, res: {@link IResCreateENMasterCardOrder}
     */
    createENMasterCardOrder: "createENMasterCardOrder",
    /**
     *@description 创建美服-Visa订单
     *@description req: {@link IReqCreateENVisaOrder}, res: {@link IResCreateENVisaOrder}
     */
    createENVisaOrder: "createENVisaOrder",
    /**
     *@description 创建美服-JCB订单
     *@description req: {@link IReqCreateENJCBOrder}, res: {@link IResCreateENJCBOrder}
     */
    createENJCBOrder: "createENJCBOrder",
    /**
     *@description 创建美服-Alipay订单
     *@description req: {@link IReqCreateENAlipayOrder}, res: {@link IResCreateENAlipayOrder}
     */
    createENAlipayOrder: "createENAlipayOrder",
    /**
     *@description 创建韩服-Paypal订单
     *@description req: {@link IReqCreateKRPaypalOrder}, res: {@link IResCreateKRPaypalOrder}
     */
    createKRPaypalOrder: "createKRPaypalOrder",
    /**
     *@description 创建韩服-MasterCard订单
     *@description req: {@link IReqCreateKRMasterCardOrder}, res: {@link IResCreateKRMasterCardOrder}
     */
    createKRMasterCardOrder: "createKRMasterCardOrder",
    /**
     *@description 创建韩服-Visa订单
     *@description req: {@link IReqCreateKRVisaOrder}, res: {@link IResCreateKRVisaOrder}
     */
    createKRVisaOrder: "createKRVisaOrder",
    /**
     *@description 创建韩服-JCB订单
     *@description req: {@link IReqCreateKRJCBOrder}, res: {@link IResCreateKRJCBOrder}
     */
    createKRJCBOrder: "createKRJCBOrder",
    /**
     *@description 创建韩服-Alipay订单
     *@description req: {@link IReqCreateKRAlipayOrder}, res: {@link IResCreateKRAlipayOrder}
     */
    createKRAlipayOrder: "createKRAlipayOrder",
    /**
     *@description 创建DMM订单
     *@description req: {@link IReqCreateDMMOrder}, res: {@link IResCreateDmmOrder}
     */
    createDMMOrder: "createDMMOrder",
    /**
     *@description 创建苹果内购订单
     *@description req: {@link IReqCreateIAPOrder}, res: {@link IResCreateIAPOrder}
     */
    createIAPOrder: "createIAPOrder",
    /**
     *@description 创建Steam订单
     *@description req: {@link IReqCreateSteamOrder}, res: {@link IResCreateSteamOrder}
     */
    createSteamOrder: "createSteamOrder",
    /**
     *@description Steam验单
     *@description req: {@link IReqVerifySteamOrder}, res: {@link IResCommon}
     */
    verifySteamOrder: "verifySteamOrder",
    /**
     *@description 创建MyCard Android订单
     *@description req: {@link IReqCreateMyCardOrder}, res: {@link IResCreateMyCardOrder}
     */
    createMyCardAndroidOrder: "createMyCardAndroidOrder",
    /**
     *@description 创建MyCard Web订单
     *@description req: {@link IReqCreateMyCardOrder}, res: {@link IResCreateMyCardOrder}
     */
    createMyCardWebOrder: "createMyCardWebOrder",
    /**
     *@description 创建Paypal订单
     *@description req: {@link IReqCreatePaypalOrder}, res: {@link IResCreatePaypalOrder}
     */
    createPaypalOrder: "createPaypalOrder",
    /**
     *@description 创建Xsolla订单
     *@description req: {@link IReqCreateXsollaOrder}, res: {@link IResCreateXsollaOrder}
     */
    createXsollaOrder: "createXsollaOrder",
    /**
     *@description 创建XsollaV4订单
     *@description req: {@link IReqCreateXsollaOrder}, res: {@link IResCreateXsollaOrder}
     */
    createXsollaV4Order: "createXsollaV4Order",
    /**
     *@description MyCard验单
     *@description req: {@link IReqVerifyMyCardOrder}, res: {@link IResCommon}
     */
    verifyMyCardOrder: "verifyMyCardOrder",
    /**
     *@description 验证苹果内购订单
     *@description req: {@link IReqVerificationIAPOrder}, res: {@link IResVerificationIAPOrder}
     */
    verificationIAPOrder: "verificationIAPOrder",
    /**
     *@description 创建Yostar-SDK订单
     *@description req: {@link IReqCreateYostarOrder}, res: {@link IResCreateYostarOrder}
     */
    createYostarSDKOrder: "createYostarSDKOrder",
    /**
     *@description 创建支付订单
     *@description req: {@link IReqCreateBillingOrder}, res: {@link IResCreateBillingOrder}
     */
    createBillingOrder: "createBillingOrder",
    /**
     *@description 处理 Google Play 订单支付结果
     *@description req: {@link IReqSolveGooglePlayOrder}, res: {@link IResCommon}
     */
    solveGooglePlayOrder: "solveGooglePlayOrder",
    /** @description req: {@link IReqSolveGooglePlayOrderV3}, res: {@link IResCommon} */
    solveGooglePayOrderV3: "solveGooglePayOrderV3",
    /**
     *@description 处理 AA32 订单
     *@description req: {@link IReqDeliverAA32Order}, res: {@link IResCommon}
     */
    deliverAA32Order: "deliverAA32Order",
    /**
     *@description 获取账号杂七杂八的数据
     *@description req: {@link IReqCommon}, res: {@link IResMisc}
     */
    fetchMisc: "fetchMisc",
    /**
     *@description 修改签名
     *@description req: {@link IReqModifySignature}, res: {@link IResCommon}
     */
    modifySignature: "modifySignature",
    /**
     *@description 获取实名认证信息
     *@description req: {@link IReqCommon}, res: {@link IResIDCardInfo}
     */
    fetchIDCardInfo: "fetchIDCardInfo",
    /**
     *@description 进行实名认证
     *@description req: {@link IReqUpdateIDCardInfo}, res: {@link IResCommon}
     */
    updateIDCardInfo: "updateIDCardInfo",
    /**
     *@description 获取vip奖励领取状态
     *@description req: {@link IReqCommon}, res: {@link IResVipReward}
     */
    fetchVipReward: "fetchVipReward",
    /**
     *@description 领取vip奖励
     *@description req: {@link IReqGainVipReward}, res: {@link IResCommon}
     */
    gainVipReward: "gainVipReward",
    /**
     *@description 获取需要补单的订单信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchRefundOrder}
     */
    fetchRefundOrder: "fetchRefundOrder",
    /**
     *@description 获取赛事列表
     *@description req: {@link IReqFetchCustomizedContestList}, res: {@link IResFetchCustomizedContestList}
     */
    fetchCustomizedContestList: "fetchCustomizedContestList",
    /**
     *@description 获取赛事权限相关信息
     *@description req: {@link IReqFetchCustomizedContestAuthInfo}, res: {@link IResFetchCustomizedContestAuthInfo}
     */
    fetchCustomizedContestAuthInfo: "fetchCustomizedContestAuthInfo",
    /**
     *@description 进入赛事
     *@description req: {@link IReqEnterCustomizedContest}, res: {@link IResEnterCustomizedContest}
     */
    enterCustomizedContest: "enterCustomizedContest",
    /**
     *@description 退出赛事
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    leaveCustomizedContest: "leaveCustomizedContest",
    /**
     *@description 请求比赛在线信息
     *@description req: {@link IReqFetchCustomizedContestOnlineInfo}, res: {@link IResFetchCustomizedContestOnlineInfo}
     */
    fetchCustomizedContestOnlineInfo: "fetchCustomizedContestOnlineInfo",
    /**
     *@description 获取赛事基本信息（通过赛事ID）
     *@description req: {@link IReqFetchCustomizedContestByContestId}, res: {@link IResFetchCustomizedContestByContestId}
     */
    fetchCustomizedContestByContestId: "fetchCustomizedContestByContestId",
    /**
     *@description 报名比赛
     *@description req: {@link IReqSignupCustomizedContest}, res: {@link IResSignupCustomizedContest}
     */
    signupCustomizedContest: "signupCustomizedContest",
    /**
     *@description 开始比赛匹配
     *@description req: {@link IReqStartCustomizedContest}, res: {@link IResCommon}
     */
    startCustomizedContest: "startCustomizedContest",
    /**
     *@description 停止比赛匹配
     *@description req: {@link IReqStopCustomizedContest}, res: {@link IResCommon}
     */
    stopCustomizedContest: "stopCustomizedContest",
    /**
     *@description 进入比赛聊天室
     *@description req: {@link IReqJoinCustomizedContestChatRoom}, res: {@link IResJoinCustomizedContestChatRoom}
     */
    joinCustomizedContestChatRoom: "joinCustomizedContestChatRoom",
    /**
     *@description 退出比赛聊天室
     *@description req: {@link IReqCommon}, res: {@link IResCommon}
     */
    leaveCustomizedContestChatRoom: "leaveCustomizedContestChatRoom",
    /**
     *@description 发送聊天消息
     *@description req: {@link IReqSayChatMessage}, res: {@link IResCommon}
     */
    sayChatMessage: "sayChatMessage",
    /**
     *@description 查询赛事牌谱列表
     *@description req: {@link IReqFetchCustomizedContestGameRecords}, res: {@link IResFetchCustomizedContestGameRecords}
     */
    fetchCustomizedContestGameRecords: "fetchCustomizedContestGameRecords",
    /**
     *@description 获取正在直播的比赛游戏列表
     *@description req: {@link IReqFetchCustomizedContestGameLiveList}, res: {@link IResFetchCustomizedContestGameLiveList}
     */
    fetchCustomizedContestGameLiveList: "fetchCustomizedContestGameLiveList",
    /**
     *@description 关注自定义比赛
     *@description req: {@link IReqTargetCustomizedContest}, res: {@link IResCommon}
     */
    followCustomizedContest: "followCustomizedContest",
    /**
     *@description 取消关注自定义比赛
     *@description req: {@link IReqTargetCustomizedContest}, res: {@link IResCommon}
     */
    unfollowCustomizedContest: "unfollowCustomizedContest",
    /**
     *@description 获取活动列表
     *@description req: {@link IReqCommon}, res: {@link IResActivityList}
     */
    fetchActivityList: "fetchActivityList",
    /**
     *@description 获取玩家活动数据
     *@description req: {@link IReqCommon}, res: {@link IResAccountActivityData}
     */
    fetchAccountActivityData: "fetchAccountActivityData",
    /**
     *@description 兑换活动
     *@description req: {@link IReqExchangeActivityItem}, res: {@link IResExchangeActivityItem}
     */
    exchangeActivityItem: "exchangeActivityItem",
    /**
     *@description 领取活动任务奖励
     *@description req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
     */
    completeActivityTask: "completeActivityTask",
    /** @description req: {@link IReqCompleteActivityTaskBatch}, res: {@link IResCommon} */
    completeActivityTaskBatch: "completeActivityTaskBatch",
    /**
     *@description 领取翻牌牌任务奖励
     *@description req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
     */
    completeActivityFlipTask: "completeActivityFlipTask",
    /**
     *@description 领取长期任务奖励
     *@description req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
     */
    completePeriodActivityTask: "completePeriodActivityTask",
    /** @description req: {@link IReqCompletePeriodActivityTaskBatch}, res: {@link IResCommon} */
    completePeriodActivityTaskBatch: "completePeriodActivityTaskBatch",
    /**
     *@description 领取随机任务奖励
     *@description req: {@link IReqCompleteActivityTask}, res: {@link IResCommon}
     */
    completeRandomActivityTask: "completeRandomActivityTask",
    /** @description req: {@link IReqCompleteActivityTaskBatch}, res: {@link IResCommon} */
    completeRandomActivityTaskBatch: "completeRandomActivityTaskBatch",
    /**
     *@description 翻牌牌领任务
     *@description req: {@link IReqReceiveActivityFlipTask}, res: {@link IResReceiveActivityFlipTask}
     */
    receiveActivityFlipTask: "receiveActivityFlipTask",
    /**
     *@description 领取分段任务奖励
     *@description req: {@link IReqCompleteSegmentTaskReward}, res: {@link IResCompleteSegmentTaskReward}
     */
    completeSegmentTaskReward: "completeSegmentTaskReward",
    /**
     *@description 获取翻牌牌任务信息
     *@description req: {@link IReqFetchActivityFlipInfo}, res: {@link IResFetchActivityFlipInfo}
     */
    fetchActivityFlipInfo: "fetchActivityFlipInfo",
    /**
     *@description 领取得点活动奖励
     *@description req: {@link IReqGainAccumulatedPointActivityReward}, res: {@link IResCommon}
     */
    gainAccumulatedPointActivityReward: "gainAccumulatedPointActivityReward",
    /**
     *@description 批量领取得点活动奖励
     *@description req: {@link IReqGainMultiPointActivityReward}, res: {@link IResCommon}
     */
    gainMultiPointActivityReward: "gainMultiPointActivityReward",
    /**
     *@description 获取得分排行榜数据
     *@description req: {@link IReqFetchRankPointLeaderboard}, res: {@link IResFetchRankPointLeaderboard}
     */
    fetchRankPointLeaderboard: "fetchRankPointLeaderboard",
    /**
     *@description 领取得分排行奖励
     *@description req: {@link IReqGainRankPointReward}, res: {@link IResCommon}
     */
    gainRankPointReward: "gainRankPointReward",
    /**
     *@description 大富翁投骰子
     *@description req: {@link IReqRichmanNextMove}, res: {@link IResRichmanNextMove}
     */
    richmanActivityNextMove: "richmanActivityNextMove",
    /**
     *@description 大富翁遥控骰子
     *@description req: {@link IReqRichmanSpecialMove}, res: {@link IResRichmanNextMove}
     */
    richmanAcitivitySpecialMove: "richmanAcitivitySpecialMove",
    /**
     *@description 大富翁宝箱信息
     *@description req: {@link IReqRichmanChestInfo}, res: {@link IResRichmanChestInfo}
     */
    richmanActivityChestInfo: "richmanActivityChestInfo",
    /**
     *@description 创建实时OB权限
     *@description req: {@link IReqCreateGameObserveAuth}, res: {@link IResCreateGameObserveAuth}
     */
    createGameObserveAuth: "createGameObserveAuth",
    /**
     *@description 刷新实时OB权限时长
     *@description req: {@link IReqRefreshGameObserveAuth}, res: {@link IResRefreshGameObserveAuth}
     */
    refreshGameObserveAuth: "refreshGameObserveAuth",
    /**
     *@description 获取活动buff信息
     *@description req: {@link IReqCommon}, res: {@link IResActivityBuff}
     */
    fetchActivityBuff: "fetchActivityBuff",
    /**
     *@description 升级活动buff
     *@description req: {@link IReqUpgradeActivityBuff}, res: {@link IResActivityBuff}
     */
    upgradeActivityBuff: "upgradeActivityBuff",
    /**
     *@description 升级活动升级
     *@description req: {@link IReqUpgradeActivityLevel}, res: {@link IResUpgradeActivityLevel}
     */
    upgradeActivityLevel: "upgradeActivityLevel",
    /**
     *@description 获取总等级奖励
     *@description req: {@link IReqReceiveUpgradeActivityReward}, res: {@link IResReceiveUpgradeActivityReward}
     */
    receiveUpgradeActivityReward: "receiveUpgradeActivityReward",
    /**
     *@description 试炼赛升级
     *@description req: {@link IReqCommon}, res: {@link IResUpgradeChallenge}
     */
    upgradeChallenge: "upgradeChallenge",
    /**
     *@description 再发行
     *@description req: {@link IReqCommon}, res: {@link IResRefreshChallenge}
     */
    refreshChallenge: "refreshChallenge",
    /**
     *@description 获取试炼赛信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchChallengeInfo}
     */
    fetchChallengeInfo: "fetchChallengeInfo",
    /**
     *@description 盖章完成试炼任务
     *@description req: {@link IReqForceCompleteChallengeTask}, res: {@link IResCommon}
     */
    forceCompleteChallengeTask: "forceCompleteChallengeTask",
    /**
     *@description 获取当前试炼赛信息
     *@description req: {@link IReqCommon}, res: {@link IResChallengeSeasonInfo}
     */
    fetchChallengeSeason: "fetchChallengeSeason",
    /**
     *@description 获取试炼赛排名奖励
     *@description req: {@link IReqReceiveChallengeRankReward}, res: {@link IResReceiveChallengeRankReward}
     */
    receiveChallengeRankReward: "receiveChallengeRankReward",
    /**
     *@description AB赛
     *@description req: {@link IReqCommon}, res: {@link IResFetchABMatch}
     */
    fetchABMatchInfo: "fetchABMatchInfo",
    /** @description req: {@link IReqBuyInABMatch}, res: {@link IResCommon} */
    buyInABMatch: "buyInABMatch",
    /** @description req: {@link IReqCommon}, res: {@link IResCommon} */
    receiveABMatchReward: "receiveABMatchReward",
    /** @description req: {@link IReqCommon}, res: {@link IResCommon} */
    quitABMatch: "quitABMatch",
    /** @description req: {@link IReqStartUnifiedMatch}, res: {@link IResCommon} */
    startUnifiedMatch: "startUnifiedMatch",
    /** @description req: {@link IReqCancelUnifiedMatch}, res: {@link IResCommon} */
    cancelUnifiedMatch: "cancelUnifiedMatch",
    /** @description req: {@link IReqGamePointRank}, res: {@link IResGamePointRank} */
    fetchGamePointRank: "fetchGamePointRank",
    /** @description req: {@link IReqGamePointRank}, res: {@link IResFetchSelfGamePointRank} */
    fetchSelfGamePointRank: "fetchSelfGamePointRank",
    /**
     *@description SNS活动
     *@description req: {@link IReqReadSNS}, res: {@link IResReadSNS}
     */
    readSNS: "readSNS",
    /** @description req: {@link IReqReplySNS}, res: {@link IResReplySNS} */
    replySNS: "replySNS",
    /** @description req: {@link IReqLikeSNS}, res: {@link IResLikeSNS} */
    likeSNS: "likeSNS",
    /**
     *@description 挖矿活动
     *@description req: {@link IReqDigMine}, res: {@link IResDigMine}
     */
    digMine: "digMine",
    /**
     *@description 用户协议
     *@description req: {@link IReqFetchLastPrivacy}, res: {@link IResFetchLastPrivacy}
     */
    fetchLastPrivacy: "fetchLastPrivacy",
    /** @description req: {@link IReqCheckPrivacy}, res: {@link IResCommon} */
    checkPrivacy: "checkPrivacy",
    /**
     *@description rpg活动
     *@description req: {@link IReqFetchRPGBattleHistory}, res: {@link IResFetchRPGBattleHistory}
     */
    fetchRPGBattleHistory: "fetchRPGBattleHistory",
    /** @description req: {@link IReqFetchRPGBattleHistory}, res: {@link IResFetchRPGBattleHistoryV2} */
    fetchRPGBattleHistoryV2: "fetchRPGBattleHistoryV2",
    /** @description req: {@link IReqReceiveRPGRewards}, res: {@link IResReceiveRPGRewards} */
    receiveRPGRewards: "receiveRPGRewards",
    /** @description req: {@link IReqReceiveRPGReward}, res: {@link IResReceiveRPGRewards} */
    receiveRPGReward: "receiveRPGReward",
    /**
     *@description 竞技场活动
     *@description req: {@link IReqBuyArenaTicket}, res: {@link IResCommon}
     */
    buyArenaTicket: "buyArenaTicket",
    /** @description req: {@link IReqEnterArena}, res: {@link IResCommon} */
    enterArena: "enterArena",
    /** @description req: {@link IReqArenaReward}, res: {@link IResArenaReward} */
    receiveArenaReward: "receiveArenaReward",
    /**
     *@description 观战
     *@description req: {@link IReqFetchOBToken}, res: {@link IResFetchOBToken}
     */
    fetchOBToken: "fetchOBToken",
    /**
     *@description 角色好感度
     *@description req: {@link IReqReceiveCharacterRewards}, res: {@link IResReceiveCharacterRewards}
     */
    receiveCharacterRewards: "receiveCharacterRewards",
    /**
     *@description 喂年兽活动 -> 已经拆分成 friend-gift 与 upgrade 活动，这个协议不再使用
     *@description req: {@link IReqFeedActivityFeed}, res: {@link IResFeedActivityFeed}
     */
    feedActivityFeed: "feedActivityFeed",
    /**
     *@description 送礼活动
     *@description req: {@link IReqSendActivityGiftToFriend}, res: {@link IResSendActivityGiftToFriend}
     */
    sendActivityGiftToFriend: "sendActivityGiftToFriend",
    /** @description req: {@link IReqReceiveActivityGift}, res: {@link IResCommon} */
    receiveActivityGift: "receiveActivityGift",
    /** @description req: {@link IReqReceiveAllActivityGift}, res: {@link IResReceiveAllActivityGift} */
    receiveAllActivityGift: "receiveAllActivityGift",
    /** @description req: {@link IReqFetchFriendGiftActivityData}, res: {@link IResFetchFriendGiftActivityData} */
    fetchFriendGiftActivityData: "fetchFriendGiftActivityData",
    /**
     *@description 自选卡池
     *@description req: {@link IReqOpenPreChestItem}, res: {@link IResOpenPreChestItem}
     */
    openPreChestItem: "openPreChestItem",
    /**
     *@description 投票活动
     *@description req: {@link IReqFetchVoteActivity}, res: {@link IResFetchVoteActivity}
     */
    fetchVoteActivity: "fetchVoteActivity",
    /** @description req: {@link IReqVoteActivity}, res: {@link IResVoteActivity} */
    voteActivity: "voteActivity",
    /**
     *@description 剧情活动
     *@description req: {@link IReqUnlockActivitySpot}, res: {@link IResCommon}
     */
    unlockActivitySpot: "unlockActivitySpot",
    /** @description req: {@link IReqUnlockActivitySpotEnding}, res: {@link IResCommon} */
    unlockActivitySpotEnding: "unlockActivitySpotEnding",
    /** @description req: {@link IReqReceiveActivitySpotReward}, res: {@link IResReceiveActivitySpotReward} */
    receiveActivitySpotReward: "receiveActivitySpotReward",
    /**
     *@description 删除账号接口
     *@description req: {@link IReqCommon}, res: {@link IResDeleteAccount}
     */
    deleteAccount: "deleteAccount",
    /** @description req: {@link IReqCommon}, res: {@link IResCommon} */
    cancelDeleteAccount: "cancelDeleteAccount",
    /** @description req: {@link IReqLogReport}, res: {@link IResCommon} */
    logReport: "logReport",
    /**
     *@description oauth2
     *@description req: {@link IReqBindOauth2}, res: {@link IResCommon}
     */
    bindOauth2: "bindOauth2",
    /** @description req: {@link IReqFetchOauth2}, res: {@link IResFetchOauth2} */
    fetchOauth2Info: "fetchOauth2Info",
    /**
     *@description loading图
     *@description req: {@link IReqSetLoadingImage}, res: {@link IResCommon}
     */
    setLoadingImage: "setLoadingImage",
    /**
     *@description 获取商店信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchShopInterval}
     */
    fetchShopInterval: "fetchShopInterval",
    /**
     *@description 获取活动轮换信息
     *@description req: {@link IReqCommon}, res: {@link IResFetchActivityInterval}
     */
    fetchActivityInterval: "fetchActivityInterval",
    /**
     *@description 获取最近对战玩家
     *@description req: {@link IReqCommon}, res: {@link IResFetchrecentFriend}
     */
    fetchRecentFriend: "fetchRecentFriend",
    /**
     *@description 扭蛋活动
     *@description req: {@link IReqOpenGacha}, res: {@link IResOpenGacha}
     */
    openGacha: "openGacha",
    /**
     *@description 前端完成任务
     *@description req: {@link IReqTaskRequest}, res: {@link IResCommon}
     */
    taskRequest: "taskRequest",
    /**
     *@description 养成活动
     *@description req: {@link IReqSimulationActivityTrain}, res: {@link IResSimulationActivityTrain}
     */
    simulationActivityTrain: "simulationActivityTrain",
    /** @description req: {@link IReqFetchSimulationGameRecord}, res: {@link IResFetchSimulationGameRecord} */
    fetchSimulationGameRecord: "fetchSimulationGameRecord",
    /** @description req: {@link IReqStartSimulationActivityGame}, res: {@link IResStartSimulationActivityGame} */
    startSimulationActivityGame: "startSimulationActivityGame",
    /** @description req: {@link IReqFetchSimulationGameRank}, res: {@link IResFetchSimulationGameRank} */
    fetchSimulationGameRank: "fetchSimulationGameRank",
    /**
     *@description 合成活动
     *@description req: {@link IReqGenerateCombiningCraft}, res: {@link IResGenerateCombiningCraft}
     */
    generateCombiningCraft: "generateCombiningCraft",
    /** @description req: {@link IReqMoveCombiningCraft}, res: {@link IResMoveCombiningCraft} */
    moveCombiningCraft: "moveCombiningCraft",
    /** @description req: {@link IReqCombiningRecycleCraft}, res: {@link IResCombiningRecycleCraft} */
    combiningRecycleCraft: "combiningRecycleCraft",
    /** @description req: {@link IReqRecoverCombiningRecycle}, res: {@link IResRecoverCombiningRecycle} */
    recoverCombiningRecycle: "recoverCombiningRecycle",
    /** @description req: {@link IReqFinishCombiningOrder}, res: {@link IResFinishCombiningOrder} */
    finishCombiningOrder: "finishCombiningOrder",
    /**
     *@description 小村活动
     *@description req: {@link IReqUpgradeVillageBuilding}, res: {@link IResCommon}
     */
    upgradeVillageBuilding: "upgradeVillageBuilding",
    /** @description req: {@link IReqReceiveVillageBuildingReward}, res: {@link IResReceiveVillageBuildingReward} */
    receiveVillageBuildingReward: "receiveVillageBuildingReward",
    /** @description req: {@link IReqStartVillageTrip}, res: {@link IResCommon} */
    startVillageTrip: "startVillageTrip",
    /** @description req: {@link IReqReceiveVillageTripReward}, res: {@link IResReceiveVillageTripReward} */
    receiveVillageTripReward: "receiveVillageTripReward",
    /** @description req: {@link IReqCompleteVillageTask}, res: {@link IResCompleteVillageTask} */
    completeVillageTask: "completeVillageTask",
    /** @description req: {@link IReqGetFriendVillageData}, res: {@link IResGetFriendVillageData} */
    getFriendVillageData: "getFriendVillageData",
    /** @description req: {@link IReqSetVillageWorker}, res: {@link IResSetVillageWorker} */
    setVillageWorker: "setVillageWorker",
    /**
     *@description 下一个丰收季
     *@description req: {@link IReqNextRoundVillage}, res: {@link IResNextRoundVillage}
     */
    nextRoundVillage: "nextRoundVillage",
    /**
     *@description 庆典活动
     *@description req: {@link IReqResolveFestivalActivityProposal}, res: {@link IResResolveFestivalActivityProposal}
     */
    resolveFestivalActivityProposal: "resolveFestivalActivityProposal",
    /** @description req: {@link IReqResolveFestivalActivityEvent}, res: {@link IResResolveFestivalActivityEvent} */
    resolveFestivalActivityEvent: "resolveFestivalActivityEvent",
    /** @description req: {@link IReqBuyFestivalProposal}, res: {@link IResBuyFestivalProposal} */
    buyFestivalProposal: "buyFestivalProposal",
    /**
     *@description ::DevDebug Start::
     *@description debug 协议在正式版本删除
     *@description req: {@link IReqFestivalFetchDebug}, res: {@link IResFestivalFetchDebug}
     */
    festivalActivityFetchDebug: "festivalActivityFetchDebug",
    /** @description req: {@link IReqFestivalDebug}, res: {@link IResCommon} */
    festivalActivityDebug: "festivalActivityDebug",
    /**
     *@description 海岛活动
     *@description req: {@link IReqIslandActivityMove}, res: {@link IResCommon}
     */
    islandActivityMove: "islandActivityMove",
    /** @description req: {@link IReqIslandActivityBuy}, res: {@link IResCommon} */
    islandActivityBuy: "islandActivityBuy",
    /** @description req: {@link IReqIslandActivitySell}, res: {@link IResCommon} */
    islandActivitySell: "islandActivitySell",
    /** @description req: {@link IReqIslandActivityTidyBag}, res: {@link IResCommon} */
    islandActivityTidyBag: "islandActivityTidyBag",
    /** @description req: {@link IReqIslandActivityUnlockBagGrid}, res: {@link IResCommon} */
    islandActivityUnlockBagGrid: "islandActivityUnlockBagGrid",
    /**
     *@description 大会室管理相关
     *@description req: {@link IReqCreateCustomizedContest}, res: {@link IResCreateCustomizedContest}
     */
    createCustomizedContest: "createCustomizedContest",
    /** @description req: {@link IReqFetchmanagerCustomizedContestList}, res: {@link IResFetchManagerCustomizedContestList} */
    fetchManagerCustomizedContestList: "fetchManagerCustomizedContestList",
    /** @description req: {@link IReqFetchManagerCustomizedContest}, res: {@link IResFetchManagerCustomizedContest} */
    fetchManagerCustomizedContest: "fetchManagerCustomizedContest",
    /** @description req: {@link IReqUpdateManagerCustomizedContest}, res: {@link IResCommon} */
    updateManagerCustomizedContest: "updateManagerCustomizedContest",
    /** @description req: {@link IReqFetchContestPlayerRank}, res: {@link IResFetchContestPlayerRank} */
    fetchContestPlayerRank: "fetchContestPlayerRank",
    /** @description req: {@link IReqFetchReadyPlayerList}, res: {@link IResFetchReadyPlayerList} */
    fetchReadyPlayerList: "fetchReadyPlayerList",
    /** @description req: {@link IReqCreateGamePlan}, res: {@link IResCommon} */
    createGamePlan: "createGamePlan",
    /** @description req: {@link IReqCommon}, res: {@link IResGenerateContestManagerLoginCode} */
    generateContestManagerLoginCode: "generateContestManagerLoginCode",
    /** @description req: {@link IReqFetchContestTeamRank}, res: {@link IResFetchContestTeamRank} */
    fetchContestTeamRank: "fetchContestTeamRank",
    /** @description req: {@link IReqFetchContestTeamMember}, res: {@link IResFetchContestTeamMember} */
    fetchContestTeamMember: "fetchContestTeamMember",
    /**
     *@description 获取青云之志活动数据
     *@description req: {@link IReqFetchAmuletActivityData}, res: {@link IResFetchAmuletActivityData}
     */
    fetchAmuletActivityData: "fetchAmuletActivityData",
    /**
     *@description 获取挑战任务与收藏数据
     *@description req: {@link IReqAmuletActivityFetchBrief}, res: {@link IResAmuletActivityFetchBrief}
     */
    amuletActivityFetchBrief: "amuletActivityFetchBrief",
    /**
     *@description 开始游戏
     *@description req: {@link IReqAmuletActivityStartGame}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityStartGame: "amuletActivityStartGame",
    /**
     *@description 换牌/打牌/开杠/和牌/模切/结束换牌 操作
     *@description req: {@link IReqAmuletActivityOperate}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityOperate: "amuletActivityOperate",
    /**
     *@description 下一关
     *@description req: {@link IReqAmuletActivityUpgrade}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityUpgrade: "amuletActivityUpgrade",
    /**
     *@description 购买卡包
     *@description req: {@link IReqAmuletActivityBuy}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityBuy: "amuletActivityBuy",
    /**
     *@description 选择卡包护身符
     *@description req: {@link IReqAmuletActivitySelectPack}, res: {@link IResAmuletEventResponse}
     */
    amuletActivitySelectPack: "amuletActivitySelectPack",
    /**
     *@description 出售护身符
     *@description req: {@link IReqAmuletActivitySellEffect}, res: {@link IResAmuletEventResponse}
     */
    amuletActivitySellEffect: "amuletActivitySellEffect",
    /**
     *@description 护身符排序
     *@description req: {@link IReqAmuletActivityEffectSort}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityEffectSort: "amuletActivityEffectSort",
    /**
     *@description 放弃当前对局
     *@description req: {@link IReqAmuletActivityGiveup}, res: {@link IResCommon}
     */
    amuletActivityGiveup: "amuletActivityGiveup",
    /**
     *@description 刷新商店
     *@description req: {@link IReqAmuletActivityRefreshShop}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityRefreshShop: "amuletActivityRefreshShop",
    /**
     *@description 选择开局免费护身符
     *@description req: {@link IReqAmuletActivitySelectFreeEffect}, res: {@link IResAmuletEventResponse}
     */
    amuletActivitySelectFreeEffect: "amuletActivitySelectFreeEffect",
    /**
     *@description 商店升级buff
     *@description req: {@link IReqAmuletActivityUpgradeShopBuff}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityUpgradeShopBuff: "amuletActivityUpgradeShopBuff",
    /**
     *@description 退出商店，进入选关
     *@description req: {@link IReqAmuletActivityEndShopping}, res: {@link IResAmuletEventResponse}
     */
    amuletActivityEndShopping: "amuletActivityEndShopping",
    /**
     *@description 设置场外增强
     *@description req: {@link IReqAmuletActivitySetSkillLevel}, res: {@link IResCommon}
     */
    amuletActivitySetSkillLevel: "amuletActivitySetSkillLevel",
    /**
     *@description 获取青云之志维护信息
     *@description req: {@link IReqCommon}, res: {@link IResAmuletActivityMaintainInfo}
     */
    amuletActivityMaintainInfo: "amuletActivityMaintainInfo",
    /** @description req: {@link IReqAmuletActivitySelectRewardPack}, res: {@link IResAmuletEventResponse} */
    amuletActivitySelectRewardPack: "amuletActivitySelectRewardPack",
    /**
     *@description 设置青云之志钦定护身符
     *@description req: {@link IReqAmuletActivitySelectBookEffect}, res: {@link IResCommon}
     */
    amuletActivitySelectBookEffect: "amuletActivitySelectBookEffect",
    /**
     *@description ::DevDebug Start::
     *@description debug 协议在正式版本删除
     *@description req: {@link IReqAmuletActivityDebug}, res: {@link IResCommon}
     */
    amuletActivityDebug: "amuletActivityDebug",
    /** @description req: {@link IReqAmuletActivityFetchDebug}, res: {@link IResFetchAmuletActivityDebug} */
    amuletActivityFetchDebug: "amuletActivityFetchDebug",
    /**
     *@description 解锁剧情
     *@description req: {@link IReqStoryActivityUnlock}, res: {@link IResCommon}
     */
    storyActivityUnlock: "storyActivityUnlock",
    /**
     *@description 解锁结局
     *@description req: {@link IReqStoryActivityUnlockEnding}, res: {@link IResCommon}
     */
    storyActivityUnlockEnding: "storyActivityUnlockEnding",
    /**
     *@description 领取结局奖励
     *@description req: {@link IReqStoryActivityReceiveEndingReward}, res: {@link IResStoryReward}
     */
    storyActivityReceiveEndingReward: "storyActivityReceiveEndingReward",
    /**
     *@description 领取剧情通关奖励（完成剧情任一结局）
     *@description req: {@link IReqStoryActivityReceiveFinishReward}, res: {@link IResStoryReward}
     */
    storyActivityReceiveFinishReward: "storyActivityReceiveFinishReward",
    /**
     *@description 领取剧情全通奖励（完成所有结局）
     *@description req: {@link IReqStoryActivityReceiveAllFinishReward}, res: {@link IResStoryReward}
     */
    storyActivityReceiveAllFinishReward: "storyActivityReceiveAllFinishReward",
    /**
     *@description 解锁结局并领取结局奖励
     *@description req: {@link IReqStoryActivityUnlockEndingAndReceive}, res: {@link IResStoryActivityUnlockEndingAndReceive}
     */
    storyActivityUnlockEndingAndReceive: "storyActivityUnlockEndingAndReceive",
    /**
     *@description 获取活动排名
     *@description req: {@link IReqFetchActivityRank}, res: {@link IResFetchActivityRank}
     */
    fetchActivityRank: "fetchActivityRank",
    /**
     *@description 玩家职业/主播标识开关
     *@description req: {@link IReqSetVerifiedHidden}, res: {@link IResCommon}
     */
    setVerifiedHidden: "setVerifiedHidden",
    /**
     *@description 获取问卷列表
     *@description req: {@link IReqFetchQuestionnaireList}, res: {@link IResFetchQuestionnaireList}
     */
    fetchQuestionnaireList: "fetchQuestionnaireList",
    /**
     *@description 获取问卷详情
     *@description req: {@link IReqFetchQuestionnaireDetail}, res: {@link IResFetchQuestionnaireDetail}
     */
    fetchQuestionnaireDetail: "fetchQuestionnaireDetail",
    /**
     *@description 提交调查问卷结果
     *@description req: {@link IReqSubmitQuestionnaire}, res: {@link IResCommon}
     */
    submitQuestionnaire: "submitQuestionnaire",
    /**
     *@description 好友房随机机器人角色开关
     *@description req: {@link IReqSetFriendRoomRandomBotChar}, res: {@link IResCommon}
     */
    setFriendRoomRandomBotChar: "setFriendRoomRandomBotChar",
    /** @description req: {@link IReqFetchAccountGameHuRecords}, res: {@link IResFetchAccountGameHuRecords} */
    fetchAccountGameHuRecords: "fetchAccountGameHuRecords",
    /** @description req: {@link IReqFetchAccountInfoExtra}, res: {@link IResFetchAccountInfoExtra} */
    fetchAccountInfoExtra: "fetchAccountInfoExtra",
    /** @description req: {@link IReqSetAccountFavoriteHu}, res: {@link IResCommon} */
    setAccountFavoriteHu: "setAccountFavoriteHu",
    /**
     *@description seer 报告
     *@description req: {@link IReqFetchSeerReport}, res: {@link IResFetchSeerReport}
     */
    fetchSeerReport: "fetchSeerReport",
    /** @description req: {@link IReqCreateSeerReport}, res: {@link IResCreateSeerReport} */
    createSeerReport: "createSeerReport",
    /**
     *@description 获取当前 seer 报告状态（只返回分析中和未过期的）
     *@description req: {@link IReqCommon}, res: {@link IResFetchSeerReportList}
     */
    fetchSeerReportList: "fetchSeerReportList",
    /** @description req: {@link IReqCommon}, res: {@link IResFetchSeerInfo} */
    fetchSeerInfo: "fetchSeerInfo",
    /**
     *@description 可选up卡池活动
     *@description req: {@link IReqSelectChestChooseUp}, res: {@link IReqCommon}
     */
    selectChestChooseUpActivity: "selectChestChooseUpActivity",
    /**
     *@description 年度报告
     *@description req: {@link IReqGenerateAnnualReportToken}, res: {@link IResGenerateAnnualReportToken}
     */
    generateAnnualReportToken: "generateAnnualReportToken",
    /** @description req: {@link IReqCommon}, res: {@link IResFetchAnnualReportInfo} */
    fetchAnnualReportInfo: "fetchAnnualReportInfo",
    /**
     *@description 好友备注
     *@description req: {@link IReqRemarkFriend}, res: {@link IResCommon}
     */
    remarkFriend: "remarkFriend",
    /**
     *@description 雀斗大会
     *@description req: {@link IReqSimV2ActivityFetchInfo}, res: {@link IResSimV2ActivityFetchInfo}
     */
    simV2ActivityFetchInfo: "simV2ActivityFetchInfo",
    /** @description req: {@link IReqSimV2ActivityStartSeason}, res: {@link IResSimV2ActivityStartSeason} */
    simV2ActivityStartSeason: "simV2ActivityStartSeason",
    /** @description req: {@link IReqSimV2ActivityTrain}, res: {@link IResSimV2ActivityTrain} */
    simV2ActivityTrain: "simV2ActivityTrain",
    /** @description req: {@link IReqSimV2ActivitySelectEvent}, res: {@link IResSimV2ActivitySelectEvent} */
    simV2ActivitySelectEvent: "simV2ActivitySelectEvent",
    /** @description req: {@link IReqSimV2ActivityStartMatch}, res: {@link IResSimV2ActivityStartMatch} */
    simV2ActivityStartMatch: "simV2ActivityStartMatch",
    /** @description req: {@link IReqSimV2ActivityEndMatch}, res: {@link IResSimV2ActivityEndMatch} */
    simV2ActivityEndMatch: "simV2ActivityEndMatch",
    /** @description req: {@link IReqSimV2ActivityGiveUp}, res: {@link IResCommon} */
    simV2ActivityGiveUp: "simV2ActivityGiveUp",
    /** @description req: {@link IReqSimV2ActivitySetUpgrade}, res: {@link IResCommon} */
    simV2ActivitySetUpgrade: "simV2ActivitySetUpgrade",
    /**
     *@description ::DevDebug Start::
     *@description debug 协议在正式版本删除
     *@description req: {@link IReqSimV2ActivityDebug}, res: {@link IResCommon}
     */
    simV2ActivityDebug: "simV2ActivityDebug",
    /** @description req: {@link IReqSimV2ActivityFetchDebug}, res: {@link IResSimV2ActivityFetchDebug} */
    simV2ActivityFetchDebug: "simV2ActivityFetchDebug",
    /**
     *@description 进度奖励活动
     *@description req: {@link IReqProgressRewardActivityReceive}, res: {@link IResProgressRewardActivityReceive}
     */
    progressRewardActivityReceive: "progressRewardActivityReceive",
    /** @description req: {@link IReqFetchProgressRewardActivityInfo}, res: {@link IResFetchProgressRewardActivityInfo} */
    fetchProgressRewardActivityInfo: "fetchProgressRewardActivityInfo",
    /**
     *@description 主备线路功能
     *@description req: {@link IReqRequestConnection}, res: {@link IResRequestConnection}
     */
    requestConnection: "requestConnection",
    /** @description req: {@link IReqRequestRouteChange}, res: {@link IResRequestRouteChange} */
    requestRouteChange: "requestRouteChange",
    /** @description req: {@link IReqHeartbeat}, res: {@link IResHeartbeat} */
    heartbeat: "heartbeat",
}