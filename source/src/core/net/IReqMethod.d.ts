/** This script is generated automatically, Please do not any modify! */

declare interface IReqMethod {
	/**
	 ** 获取连接相关信息
	 ** res: {@link IResConnectionInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchConnectionInfo}
	 */
	fetchConnectionInfo(data?: IReqCommon): Promise<IResConnectionInfo>;
	/**
	 ** 获取排队信息
	 ** res: {@link IResFetchQueueInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchQueueInfo}
	 */
	fetchQueueInfo(data?: IReqCommon): Promise<IResFetchQueueInfo>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.cancelQueue}
	 */
	cancelQueue(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** res: {@link IResOauth2Check}, req: {@link IReqOpenidCheck}
	 ** msgId: {@link ENetMessage.openidCheck}
	 */
	openidCheck(data?: IReqOpenidCheck): Promise<IResOauth2Check>;
	/**
	 ** 注册账号
	 ** res: {@link IResSignupAccount}, req: {@link IReqSignupAccount}
	 ** msgId: {@link ENetMessage.signup}
	 */
	signup(data?: IReqSignupAccount): Promise<IResSignupAccount>;
	/**
	 ** 登录账号
	 ** res: {@link IResLogin}, req: {@link IReqLogin}
	 ** msgId: {@link ENetMessage.login}
	 */
	login(data?: IReqLogin): Promise<IResLogin>;
	/**
	 ** 备线半登录状态
	 ** res: {@link IResCommon}, req: {@link IReqPrepareLogin}
	 ** msgId: {@link ENetMessage.prepareLogin}
	 */
	prepareLogin(data?: IReqPrepareLogin): Promise<IResCommon>;
	/**
	 ** 备线切换主线快速登录
	 ** res: {@link IResFastLogin}, req: {@link IReqFastLogin}
	 ** msgId: {@link ENetMessage.fastLogin}
	 */
	fastLogin(data?: IReqFastLogin): Promise<IResFastLogin>;
	/**
	 ** 登录后获取信息
	 ** res: {@link IResFetchInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchInfo}
	 */
	fetchInfo(data?: IReqCommon): Promise<IResFetchInfo>;
	/**
	 ** 登录成功后摇
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.loginSuccess}
	 */
	loginSuccess(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 获取服务器维护信息
	 ** res: {@link IResFetchServerMaintenanceInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchServerMaintenanceInfo}
	 */
	fetchServerMaintenanceInfo(data?: IReqCommon): Promise<IResFetchServerMaintenanceInfo>;
	/**
	 ** res: {@link IResLogin}, req: {@link IReqEmailLogin}
	 ** msgId: {@link ENetMessage.emailLogin}
	 */
	emailLogin(data?: IReqEmailLogin): Promise<IResLogin>;
	/**
	 ** oauth2 方式登录授权
	 ** res: {@link IResOauth2Auth}, req: {@link IReqOauth2Auth}
	 ** msgId: {@link ENetMessage.oauth2Auth}
	 */
	oauth2Auth(data?: IReqOauth2Auth): Promise<IResOauth2Auth>;
	/**
	 ** oauth2 验证是否已经注册过账号
	 ** res: {@link IResOauth2Check}, req: {@link IReqOauth2Check}
	 ** msgId: {@link ENetMessage.oauth2Check}
	 */
	oauth2Check(data?: IReqOauth2Check): Promise<IResOauth2Check>;
	/**
	 ** oauth2 注册
	 ** res: {@link IResOauth2Signup}, req: {@link IReqOauth2Signup}
	 ** msgId: {@link ENetMessage.oauth2Signup}
	 */
	oauth2Signup(data?: IReqOauth2Signup): Promise<IResOauth2Signup>;
	/**
	 ** oauth2 登录
	 ** res: {@link IResLogin}, req: {@link IReqOauth2Login}
	 ** msgId: {@link ENetMessage.oauth2Login}
	 */
	oauth2Login(data?: IReqOauth2Login): Promise<IResLogin>;
	/**
	 ** dmm 获取登录参数
	 ** res: {@link IResDMMPreLogin}, req: {@link IReqDMMPreLogin}
	 ** msgId: {@link ENetMessage.dmmPreLogin}
	 */
	dmmPreLogin(data?: IReqDMMPreLogin): Promise<IResDMMPreLogin>;
	/**
	 ** 获取手机验证码（已登录的情况下）
	 ** res: {@link IResCommon}, req: {@link IReqCreatePhoneVerifyCode}
	 ** msgId: {@link ENetMessage.createPhoneVerifyCode}
	 */
	createPhoneVerifyCode(data?: IReqCreatePhoneVerifyCode): Promise<IResCommon>;
	/**
	 ** 获取邮箱验证码
	 ** res: {@link IResCommon}, req: {@link IReqCreateEmailVerifyCode}
	 ** msgId: {@link ENetMessage.createEmailVerifyCode}
	 */
	createEmailVerifyCode(data?: IReqCreateEmailVerifyCode): Promise<IResCommon>;
	/**
	 ** 验证码获取安全权限
	 ** res: {@link IResVerfiyCodeForSecure}, req: {@link IReqVerifyCodeForSecure}
	 ** msgId: {@link ENetMessage.verfifyCodeForSecure}
	 */
	verfifyCodeForSecure(data?: IReqVerifyCodeForSecure): Promise<IResVerfiyCodeForSecure>;
	/**
	 ** 绑定手机号
	 ** res: {@link IResCommon}, req: {@link IReqBindPhoneNumber}
	 ** msgId: {@link ENetMessage.bindPhoneNumber}
	 */
	bindPhoneNumber(data?: IReqBindPhoneNumber): Promise<IResCommon>;
	/**
	 ** 解绑手机号
	 ** res: {@link IResCommon}, req: {@link IReqUnbindPhoneNumber}
	 ** msgId: {@link ENetMessage.unbindPhoneNumber}
	 */
	unbindPhoneNumber(data?: IReqUnbindPhoneNumber): Promise<IResCommon>;
	/**
	 ** 查询已绑定手机是否有登录绑定
	 ** res: {@link IResFetchPhoneLoginBind}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchPhoneLoginBind}
	 */
	fetchPhoneLoginBind(data?: IReqCommon): Promise<IResFetchPhoneLoginBind>;
	/**
	 ** 生成手机登录绑定
	 ** res: {@link IResCommon}, req: {@link IReqCreatePhoneLoginBind}
	 ** msgId: {@link ENetMessage.createPhoneLoginBind}
	 */
	createPhoneLoginBind(data?: IReqCreatePhoneLoginBind): Promise<IResCommon>;
	/**
	 ** 绑定邮箱
	 ** res: {@link IResCommon}, req: {@link IReqBindEmail}
	 ** msgId: {@link ENetMessage.bindEmail}
	 */
	bindEmail(data?: IReqBindEmail): Promise<IResCommon>;
	/**
	 ** 修改密码
	 ** res: {@link IResCommon}, req: {@link IReqModifyPassword}
	 ** msgId: {@link ENetMessage.modifyPassword}
	 */
	modifyPassword(data?: IReqModifyPassword): Promise<IResCommon>;
	/**
	 ** 绑定账号密码（Oauth2注册的账号使用，只有一次机会）
	 ** res: {@link IResCommon}, req: {@link IReqBindAccount}
	 ** msgId: {@link ENetMessage.bindAccount}
	 */
	bindAccount(data?: IReqBindAccount): Promise<IResCommon>;
	/**
	 ** 注销账号
	 ** res: {@link IResLogout}, req: {@link IReqLogout}
	 ** msgId: {@link ENetMessage.logout}
	 */
	logout(data?: IReqLogout): Promise<IResLogout>;
	/**
	 ** 心跳
	 ** res: {@link IResCommon}, req: {@link IReqHeatBeat}
	 ** msgId: {@link ENetMessage.heatbeat}
	 */
	heatbeat(data?: IReqHeatBeat): Promise<IResCommon>;
	/**
	 ** 通过Eid获取账号ID
	 ** res: {@link IResSearchAccountbyEidLobby}, req: {@link IReqSearchAccountByEidLobby}
	 ** msgId: {@link ENetMessage.searchAccountByEid}
	 */
	searchAccountByEid(data?: IReqSearchAccountByEidLobby): Promise<IResSearchAccountbyEidLobby>;
	/**
	 ** 登录心跳（用于防止第三方客户端，登录后不调用该接口无法进行匹配游戏）
	 ** res: {@link IResCommon}, req: {@link IReqLoginBeat}
	 ** msgId: {@link ENetMessage.loginBeat}
	 */
	loginBeat(data?: IReqLoginBeat): Promise<IResCommon>;
	/**
	 ** 创建昵称
	 ** res: {@link IResCommon}, req: {@link IReqCreateNickname}
	 ** msgId: {@link ENetMessage.createNickname}
	 */
	createNickname(data?: IReqCreateNickname): Promise<IResCommon>;
	/**
	 ** 修改昵称
	 ** res: {@link IResCommon}, req: {@link IReqModifyNickname}
	 ** msgId: {@link ENetMessage.modifyNickname}
	 */
	modifyNickname(data?: IReqModifyNickname): Promise<IResCommon>;
	/**
	 ** 修改生日
	 ** res: {@link IResCommon}, req: {@link IReqModifyBirthday}
	 ** msgId: {@link ENetMessage.modifyBirthday}
	 */
	modifyBirthday(data?: IReqModifyBirthday): Promise<IResCommon>;
	/**
	 ** 请求自己的房间信息
	 ** res: {@link IResSelfRoom}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchRoom}
	 */
	fetchRoom(data?: IReqCommon): Promise<IResSelfRoom>;
	/**
	 ** 请求自己的对局信息
	 ** res: {@link IResFetchGamingInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchGamingInfo}
	 */
	fetchGamingInfo(data?: IReqCommon): Promise<IResFetchGamingInfo>;
	/**
	 ** 创建房间
	 ** res: {@link IResCreateRoom}, req: {@link IReqCreateRoom}
	 ** msgId: {@link ENetMessage.createRoom}
	 */
	createRoom(data?: IReqCreateRoom): Promise<IResCreateRoom>;
	/**
	 ** 加入房间
	 ** res: {@link IResJoinRoom}, req: {@link IReqJoinRoom}
	 ** msgId: {@link ENetMessage.joinRoom}
	 */
	joinRoom(data?: IReqJoinRoom): Promise<IResJoinRoom>;
	/**
	 ** 离开房间
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.leaveRoom}
	 */
	leaveRoom(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 准备
	 ** res: {@link IResCommon}, req: {@link IReqRoomReady}
	 ** msgId: {@link ENetMessage.readyPlay}
	 */
	readyPlay(data?: IReqRoomReady): Promise<IResCommon>;
	/**
	 ** 切换装扮状态
	 ** res: {@link IResCommon}, req: {@link IReqRoomDressing}
	 ** msgId: {@link ENetMessage.dressingStatus}
	 */
	dressingStatus(data?: IReqRoomDressing): Promise<IResCommon>;
	/**
	 ** 开始
	 ** res: {@link IResCommon}, req: {@link IReqRoomStart}
	 ** msgId: {@link ENetMessage.startRoom}
	 */
	startRoom(data?: IReqRoomStart): Promise<IResCommon>;
	/**
	 ** 踢出玩家
	 ** res: {@link IResCommon}, req: {@link IReqRoomKickPlayer}
	 ** msgId: {@link ENetMessage.roomKickPlayer}
	 */
	roomKickPlayer(data?: IReqRoomKickPlayer): Promise<IResCommon>;
	/**
	 ** 修改房间
	 ** res: {@link IResCommon}, req: {@link IReqModifyRoom}
	 ** msgId: {@link ENetMessage.modifyRoom}
	 */
	modifyRoom(data?: IReqModifyRoom): Promise<IResCommon>;
	/**
	 ** 添加好友房机器人
	 ** res: {@link IResCommon}, req: {@link IReqAddRoomRobot}
	 ** msgId: {@link ENetMessage.addRoomRobot}
	 */
	addRoomRobot(data?: IReqAddRoomRobot): Promise<IResCommon>;
	/**
	 ** 加入匹配
	 ** res: {@link IResCommon}, req: {@link IReqJoinMatchQueue}
	 ** msgId: {@link ENetMessage.matchGame}
	 */
	matchGame(data?: IReqJoinMatchQueue): Promise<IResCommon>;
	/**
	 ** 取消匹配
	 ** res: {@link IResCommon}, req: {@link IReqCancelMatchQueue}
	 ** msgId: {@link ENetMessage.cancelMatch}
	 */
	cancelMatch(data?: IReqCancelMatchQueue): Promise<IResCommon>;
	/**
	 ** 请求账号信息
	 ** res: {@link IResAccountInfo}, req: {@link IReqAccountInfo}
	 ** msgId: {@link ENetMessage.fetchAccountInfo}
	 */
	fetchAccountInfo(data?: IReqAccountInfo): Promise<IResAccountInfo>;
	/**
	 ** 修改头像
	 ** res: {@link IResCommon}, req: {@link IReqChangeAvatar}
	 ** msgId: {@link ENetMessage.changeAvatar}
	 */
	changeAvatar(data?: IReqChangeAvatar): Promise<IResCommon>;
	/**
	 ** 领取更新礼包
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.receiveVersionReward}
	 */
	receiveVersionReward(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 请求账号统计信息
	 ** res: {@link IResAccountStatisticInfo}, req: {@link IReqAccountStatisticInfo}
	 ** msgId: {@link ENetMessage.fetchAccountStatisticInfo}
	 */
	fetchAccountStatisticInfo(data?: IReqAccountStatisticInfo): Promise<IResAccountStatisticInfo>;
	/**
	 ** 获取试炼赛赛季排名信息
	 ** res: {@link IResAccountChallengeRankInfo}, req: {@link IReqAccountInfo}
	 ** msgId: {@link ENetMessage.fetchAccountChallengeRankInfo}
	 */
	fetchAccountChallengeRankInfo(data?: IReqAccountInfo): Promise<IResAccountChallengeRankInfo>;
	/**
	 ** 获取账号人物信息
	 ** res: {@link IResAccountCharacterInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAccountCharacterInfo}
	 */
	fetchAccountCharacterInfo(data?: IReqCommon): Promise<IResAccountCharacterInfo>;
	/**
	 ** 商店购买
	 ** res: {@link IResShopPurchase}, req: {@link IReqShopPurchase}
	 ** msgId: {@link ENetMessage.shopPurchase}
	 */
	shopPurchase(data?: IReqShopPurchase): Promise<IResShopPurchase>;
	/**
	 ** 获取单场牌谱记录
	 ** res: {@link IResGameRecord}, req: {@link IReqGameRecord}
	 ** msgId: {@link ENetMessage.fetchGameRecord}
	 */
	fetchGameRecord(data?: IReqGameRecord): Promise<IResGameRecord>;
	/**
	 ** 添加查看牌谱记录
	 ** res: {@link IResCommon}, req: {@link IReqGameRecord}
	 ** msgId: {@link ENetMessage.readGameRecord}
	 */
	readGameRecord(data?: IReqGameRecord): Promise<IResCommon>;
	/**
	 ** 获取牌谱列表
	 ** 20240820更新之前的牌谱通过这个接口获取
	 ** res: {@link IResGameRecordList}, req: {@link IReqGameRecordList}
	 ** msgId: {@link ENetMessage.fetchGameRecordList}
	 */
	fetchGameRecordList(data?: IReqGameRecordList): Promise<IResGameRecordList>;
	/**
	 ** 获取牌谱列表V2
	 ** 202408新版牌谱功能使用（基于迭代器）
	 ** 2024.08.20 06:33 停服  07:40 国服启动
	 ** 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 ** res: {@link IResGameRecordListV2}, req: {@link IReqGameRecordListV2}
	 ** msgId: {@link ENetMessage.fetchGameRecordListV2}
	 */
	fetchGameRecordListV2(data?: IReqGameRecordListV2): Promise<IResGameRecordListV2>;
	/**
	 ** 获取后续牌谱列表内容
	 ** 基于 fetchGameRecordListV2 协议返回结果使用
	 ** 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 ** res: {@link IResNextGameRecordList}, req: {@link IReqNextGameRecordList}
	 ** msgId: {@link ENetMessage.fetchNextGameRecordList}
	 */
	fetchNextGameRecordList(data?: IReqNextGameRecordList): Promise<IResNextGameRecordList>;
	/**
	 ** 获得收藏的牌谱列表（简要信息）
	 ** res: {@link IResCollectedGameRecordList}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchCollectedGameRecordList}
	 */
	fetchCollectedGameRecordList(data?: IReqCommon): Promise<IResCollectedGameRecordList>;
	/**
	 ** 获取牌谱列表的详细信息
	 ** res: {@link IResGameRecordsDetail}, req: {@link IReqGameRecordsDetail}
	 ** msgId: {@link ENetMessage.fetchGameRecordsDetail}
	 */
	fetchGameRecordsDetail(data?: IReqGameRecordsDetail): Promise<IResGameRecordsDetail>;
	/**
	 ** 获取牌谱列表的详细信息 （新版）
	 ** res: {@link IResGameRecordsDetailV2}, req: {@link IReqGameRecordsDetailV2}
	 ** msgId: {@link ENetMessage.fetchGameRecordsDetailV2}
	 */
	fetchGameRecordsDetailV2(data?: IReqGameRecordsDetailV2): Promise<IResGameRecordsDetailV2>;
	/**
	 ** 添加牌谱收藏
	 ** res: {@link IResAddCollectedGameRecord}, req: {@link IReqAddCollectedGameRecord}
	 ** msgId: {@link ENetMessage.addCollectedGameRecord}
	 */
	addCollectedGameRecord(data?: IReqAddCollectedGameRecord): Promise<IResAddCollectedGameRecord>;
	/**
	 ** 移除牌谱收藏
	 ** res: {@link IResRemoveCollectedGameRecord}, req: {@link IReqRemoveCollectedGameRecord}
	 ** msgId: {@link ENetMessage.removeCollectedGameRecord}
	 */
	removeCollectedGameRecord(data?: IReqRemoveCollectedGameRecord): Promise<IResRemoveCollectedGameRecord>;
	/**
	 ** 修改牌谱备注
	 ** res: {@link IResChangeCollectedGameRecordRemarks}, req: {@link IReqChangeCollectedGameRecordRemarks}
	 ** msgId: {@link ENetMessage.changeCollectedGameRecordRemarks}
	 */
	changeCollectedGameRecordRemarks(data?: IReqChangeCollectedGameRecordRemarks): Promise<IResChangeCollectedGameRecordRemarks>;
	/**
	 ** 获取排行榜
	 ** res: {@link IResLevelLeaderboard}, req: {@link IReqLevelLeaderboard}
	 ** msgId: {@link ENetMessage.fetchLevelLeaderboard}
	 */
	fetchLevelLeaderboard(data?: IReqLevelLeaderboard): Promise<IResLevelLeaderboard>;
	/**
	 ** 获取试炼赛排行榜
	 ** res: {@link IResChallengeLeaderboard}, req: {@link IReqChallangeLeaderboard}
	 ** msgId: {@link ENetMessage.fetchChallengeLeaderboard}
	 */
	fetchChallengeLeaderboard(data?: IReqChallangeLeaderboard): Promise<IResChallengeLeaderboard>;
	/**
	 ** 获取多人试炼赛等级信息
	 ** res: {@link IResMutiChallengeLevel}, req: {@link IReqMutiChallengeLevel}
	 ** msgId: {@link ENetMessage.fetchMutiChallengeLevel}
	 */
	fetchMutiChallengeLevel(data?: IReqMutiChallengeLevel): Promise<IResMutiChallengeLevel>;
	/**
	 ** 获取多人简要信息
	 ** res: {@link IResMultiAccountBrief}, req: {@link IReqMultiAccountId}
	 ** msgId: {@link ENetMessage.fetchMultiAccountBrief}
	 */
	fetchMultiAccountBrief(data?: IReqMultiAccountId): Promise<IResMultiAccountBrief>;
	/**
	 ** 获取好友列表
	 ** res: {@link IResFriendList}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchFriendList}
	 */
	fetchFriendList(data?: IReqCommon): Promise<IResFriendList>;
	/**
	 ** 获取好友申请列表
	 ** res: {@link IResFriendApplyList}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchFriendApplyList}
	 */
	fetchFriendApplyList(data?: IReqCommon): Promise<IResFriendApplyList>;
	/**
	 ** 申请好友
	 ** res: {@link IResCommon}, req: {@link IReqApplyFriend}
	 ** msgId: {@link ENetMessage.applyFriend}
	 */
	applyFriend(data?: IReqApplyFriend): Promise<IResCommon>;
	/**
	 ** 处理好友申请
	 ** res: {@link IResCommon}, req: {@link IReqHandleFriendApply}
	 ** msgId: {@link ENetMessage.handleFriendApply}
	 */
	handleFriendApply(data?: IReqHandleFriendApply): Promise<IResCommon>;
	/**
	 ** 删除好友
	 ** res: {@link IResCommon}, req: {@link IReqRemoveFriend}
	 ** msgId: {@link ENetMessage.removeFriend}
	 */
	removeFriend(data?: IReqRemoveFriend): Promise<IResCommon>;
	/**
	 ** 查询单个玩家
	 ** res: {@link IResSearchAccountById}, req: {@link IReqSearchAccountById}
	 ** msgId: {@link ENetMessage.searchAccountById}
	 */
	searchAccountById(data?: IReqSearchAccountById): Promise<IResSearchAccountById>;
	/**
	 ** 模糊查询玩家
	 ** res: {@link IResSearchAccountByPattern}, req: {@link IReqSearchAccountByPattern}
	 ** msgId: {@link ENetMessage.searchAccountByPattern}
	 */
	searchAccountByPattern(data?: IReqSearchAccountByPattern): Promise<IResSearchAccountByPattern>;
	/**
	 ** 查询玩家状态
	 ** res: {@link IResAccountStates}, req: {@link IReqAccountList}
	 ** msgId: {@link ENetMessage.fetchAccountState}
	 */
	fetchAccountState(data?: IReqAccountList): Promise<IResAccountStates>;
	/**
	 ** 请求背包信息
	 ** res: {@link IResBagInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchBagInfo}
	 */
	fetchBagInfo(data?: IReqCommon): Promise<IResBagInfo>;
	/**
	 ** 使用背包道具
	 ** res: {@link IResCommon}, req: {@link IReqUseBagItem}
	 ** msgId: {@link ENetMessage.useBagItem}
	 */
	useBagItem(data?: IReqUseBagItem): Promise<IResCommon>;
	/**
	 ** 使用手选道具物品
	 ** res: {@link IResCommon}, req: {@link IReqOpenManualItem}
	 ** msgId: {@link ENetMessage.openManualItem}
	 */
	openManualItem(data?: IReqOpenManualItem): Promise<IResCommon>;
	/**
	 ** 使用随机道具物品
	 ** res: {@link IResOpenRandomRewardItem}, req: {@link IReqOpenRandomRewardItem}
	 ** msgId: {@link ENetMessage.openRandomRewardItem}
	 */
	openRandomRewardItem(data?: IReqOpenRandomRewardItem): Promise<IResOpenRandomRewardItem>;
	/**
	 ** 使用全领礼包物品
	 ** res: {@link IResOpenAllRewardItem}, req: {@link IReqOpenAllRewardItem}
	 ** msgId: {@link ENetMessage.openAllRewardItem}
	 */
	openAllRewardItem(data?: IReqOpenAllRewardItem): Promise<IResOpenAllRewardItem>;
	/**
	 ** 合成碎片
	 ** res: {@link IResCommon}, req: {@link IReqComposeShard}
	 ** msgId: {@link ENetMessage.composeShard}
	 */
	composeShard(data?: IReqComposeShard): Promise<IResCommon>;
	/**
	 ** 获取公告
	 ** res: {@link IResAnnouncement}, req: {@link IReqFetchAnnouncement}
	 ** msgId: {@link ENetMessage.fetchAnnouncement}
	 */
	fetchAnnouncement(data?: IReqFetchAnnouncement): Promise<IResAnnouncement>;
	/**
	 ** 阅读公告
	 ** res: {@link IResCommon}, req: {@link IReqReadAnnouncement}
	 ** msgId: {@link ENetMessage.readAnnouncement}
	 */
	readAnnouncement(data?: IReqReadAnnouncement): Promise<IResCommon>;
	/**
	 ** 获取邮件列表
	 ** res: {@link IResMailInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchMailInfo}
	 */
	fetchMailInfo(data?: IReqCommon): Promise<IResMailInfo>;
	/**
	 ** 阅读邮件
	 ** res: {@link IResCommon}, req: {@link IReqReadMail}
	 ** msgId: {@link ENetMessage.readMail}
	 */
	readMail(data?: IReqReadMail): Promise<IResCommon>;
	/**
	 ** 删除邮件
	 ** res: {@link IResCommon}, req: {@link IReqDeleteMail}
	 ** msgId: {@link ENetMessage.deleteMail}
	 */
	deleteMail(data?: IReqDeleteMail): Promise<IResCommon>;
	/**
	 ** 拿取邮件附件
	 ** res: {@link IResCommon}, req: {@link IReqTakeAttachment}
	 ** msgId: {@link ENetMessage.takeAttachmentFromMail}
	 */
	takeAttachmentFromMail(data?: IReqTakeAttachment): Promise<IResCommon>;
	/**
	 ** 领取成就奖励
	 ** res: {@link IResReceiveAchievementReward}, req: {@link IReqReceiveAchievementReward}
	 ** msgId: {@link ENetMessage.receiveAchievementReward}
	 */
	receiveAchievementReward(data?: IReqReceiveAchievementReward): Promise<IResReceiveAchievementReward>;
	/**
	 ** 领取成就大组奖励
	 ** res: {@link IResReceiveAchievementGroupReward}, req: {@link IReqReceiveAchievementGroupReward}
	 ** msgId: {@link ENetMessage.receiveAchievementGroupReward}
	 */
	receiveAchievementGroupReward(data?: IReqReceiveAchievementGroupReward): Promise<IResReceiveAchievementGroupReward>;
	/**
	 ** 获取全服成就完成率
	 ** res: {@link IResFetchAchievementRate}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAchievementRate}
	 */
	fetchAchievementRate(data?: IReqCommon): Promise<IResFetchAchievementRate>;
	/**
	 ** 获取成就
	 ** res: {@link IResAchievement}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAchievement}
	 */
	fetchAchievement(data?: IReqCommon): Promise<IResAchievement>;
	/**
	 ** 购买试炼资格
	 ** res: {@link IResCommon}, req: {@link IReqBuyShiLian}
	 ** msgId: {@link ENetMessage.buyShiLian}
	 */
	buyShiLian(data?: IReqBuyShiLian): Promise<IResCommon>;
	/**
	 ** 试炼匹配
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.matchShiLian}
	 */
	matchShiLian(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 继续下一阶段试炼
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.goNextShiLian}
	 */
	goNextShiLian(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 更新客户端数据
	 ** res: {@link IResCommon}, req: {@link IReqUpdateClientValue}
	 ** msgId: {@link ENetMessage.updateClientValue}
	 */
	updateClientValue(data?: IReqUpdateClientValue): Promise<IResCommon>;
	/**
	 ** 获取客户端数据
	 ** res: {@link IResClientValue}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchClientValue}
	 */
	fetchClientValue(data?: IReqCommon): Promise<IResClientValue>;
	/**
	 ** 客户端信息
	 ** res: {@link IResCommon}, req: {@link IReqClientMessage}
	 ** msgId: {@link ENetMessage.clientMessage}
	 */
	clientMessage(data?: IReqClientMessage): Promise<IResCommon>;
	/**
	 ** 请求当前匹配模式信息
	 ** res: {@link IResCurrentMatchInfo}, req: {@link IReqCurrentMatchInfo}
	 ** msgId: {@link ENetMessage.fetchCurrentMatchInfo}
	 */
	fetchCurrentMatchInfo(data?: IReqCurrentMatchInfo): Promise<IResCurrentMatchInfo>;
	/**
	 ** 用户举报
	 ** res: {@link IResCommon}, req: {@link IReqUserComplain}
	 ** msgId: {@link ENetMessage.userComplain}
	 */
	userComplain(data?: IReqUserComplain): Promise<IResCommon>;
	/**
	 ** ------ 复活币 -------- //
	 ** 获取复活币信息
	 ** res: {@link IResReviveCoinInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchReviveCoinInfo}
	 */
	fetchReviveCoinInfo(data?: IReqCommon): Promise<IResReviveCoinInfo>;
	/**
	 ** 领取复活币
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.gainReviveCoin}
	 */
	gainReviveCoin(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 获取每日任务
	 ** res: {@link IResDailyTask}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchDailyTask}
	 */
	fetchDailyTask(data?: IReqCommon): Promise<IResDailyTask>;
	/**
	 ** 刷新每日任务
	 ** res: {@link IResRefreshDailyTask}, req: {@link IReqRefreshDailyTask}
	 ** msgId: {@link ENetMessage.refreshDailyTask}
	 */
	refreshDailyTask(data?: IReqRefreshDailyTask): Promise<IResRefreshDailyTask>;
	/**
	 ** 使用礼品码
	 ** res: {@link IResUseGiftCode}, req: {@link IReqUseGiftCode}
	 ** msgId: {@link ENetMessage.useGiftCode}
	 */
	useGiftCode(data?: IReqUseGiftCode): Promise<IResUseGiftCode>;
	/**
	 ** 使用特殊礼品码
	 ** res: {@link IResUseSpecialGiftCode}, req: {@link IReqUseGiftCode}
	 ** msgId: {@link ENetMessage.useSpecialGiftCode}
	 */
	useSpecialGiftCode(data?: IReqUseGiftCode): Promise<IResUseSpecialGiftCode>;
	/**
	 ** 获取称号列表
	 ** res: {@link IResTitleList}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchTitleList}
	 */
	fetchTitleList(data?: IReqCommon): Promise<IResTitleList>;
	/**
	 ** 使用称号
	 ** res: {@link IResCommon}, req: {@link IReqUseTitle}
	 ** msgId: {@link ENetMessage.useTitle}
	 */
	useTitle(data?: IReqUseTitle): Promise<IResCommon>;
	/**
	 ** 发送给其他玩家自定义消息
	 ** res: {@link IResCommon}, req: {@link IReqSendClientMessage}
	 ** msgId: {@link ENetMessage.sendClientMessage}
	 */
	sendClientMessage(data?: IReqSendClientMessage): Promise<IResCommon>;
	/**
	 ** 获取游戏直播信息（全视角）
	 ** res: {@link IResGameLiveInfo}, req: {@link IReqGameLiveInfo}
	 ** msgId: {@link ENetMessage.fetchGameLiveInfo}
	 */
	fetchGameLiveInfo(data?: IReqGameLiveInfo): Promise<IResGameLiveInfo>;
	/**
	 ** 获取游戏直播剩余分片信息（增量）
	 ** res: {@link IResGameLiveLeftSegment}, req: {@link IReqGameLiveLeftSegment}
	 ** msgId: {@link ENetMessage.fetchGameLiveLeftSegment}
	 */
	fetchGameLiveLeftSegment(data?: IReqGameLiveLeftSegment): Promise<IResGameLiveLeftSegment>;
	/**
	 ** 获取正在直播的游戏列表
	 ** res: {@link IResGameLiveList}, req: {@link IReqGameLiveList}
	 ** msgId: {@link ENetMessage.fetchGameLiveList}
	 */
	fetchGameLiveList(data?: IReqGameLiveList): Promise<IResGameLiveList>;
	/**
	 ** 留言板设置信息
	 ** res: {@link IResCommentSetting}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchCommentSetting}
	 */
	fetchCommentSetting(data?: IReqCommon): Promise<IResCommentSetting>;
	/**
	 ** 更新留言板设置
	 ** res: {@link IResCommon}, req: {@link IReqUpdateCommentSetting}
	 ** msgId: {@link ENetMessage.updateCommentSetting}
	 */
	updateCommentSetting(data?: IReqUpdateCommentSetting): Promise<IResCommon>;
	/**
	 ** 获取留言板列表
	 ** res: {@link IResFetchCommentList}, req: {@link IReqFetchCommentList}
	 ** msgId: {@link ENetMessage.fetchCommentList}
	 */
	fetchCommentList(data?: IReqFetchCommentList): Promise<IResFetchCommentList>;
	/**
	 ** 获取留言板内容
	 ** res: {@link IResFetchCommentContent}, req: {@link IReqFetchCommentContent}
	 ** msgId: {@link ENetMessage.fetchCommentContent}
	 */
	fetchCommentContent(data?: IReqFetchCommentContent): Promise<IResFetchCommentContent>;
	/**
	 ** 发送留言
	 ** res: {@link IResCommon}, req: {@link IReqLeaveComment}
	 ** msgId: {@link ENetMessage.leaveComment}
	 */
	leaveComment(data?: IReqLeaveComment): Promise<IResCommon>;
	/**
	 ** 删除留言
	 ** res: {@link IResCommon}, req: {@link IReqDeleteComment}
	 ** msgId: {@link ENetMessage.deleteComment}
	 */
	deleteComment(data?: IReqDeleteComment): Promise<IResCommon>;
	/**
	 ** 更新留言阅读记录
	 ** res: {@link IResCommon}, req: {@link IReqUpdateReadComment}
	 ** msgId: {@link ENetMessage.updateReadComment}
	 */
	updateReadComment(data?: IReqUpdateReadComment): Promise<IResCommon>;
	/**
	 ** 获取滚动公告
	 ** res: {@link IResFetchRollingNotice}, req: {@link IReqFetchRollingNotice}
	 ** msgId: {@link ENetMessage.fetchRollingNotice}
	 */
	fetchRollingNotice(data?: IReqFetchRollingNotice): Promise<IResFetchRollingNotice>;
	/**
	 ** 获取维护公告
	 ** res: {@link IResFetchMaintainNotice}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchMaintainNotice}
	 */
	fetchMaintainNotice(data?: IReqCommon): Promise<IResFetchMaintainNotice>;
	/**
	 ** 获取服务器时间
	 ** res: {@link IResServerTime}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchServerTime}
	 */
	fetchServerTime(data?: IReqCommon): Promise<IResServerTime>;
	/**
	 ** 获取对应平台的商品列表
	 ** res: {@link IResPlatformBillingProducts}, req: {@link IReqPlatformBillingProducts}
	 ** msgId: {@link ENetMessage.fetchPlatformProducts}
	 */
	fetchPlatformProducts(data?: IReqPlatformBillingProducts): Promise<IResPlatformBillingProducts>;
	/**
	 ** 获取角色随机池信息
	 ** res: {@link IResRandomCharacter}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchRandomCharacter}
	 */
	fetchRandomCharacter(data?: IReqCommon): Promise<IResRandomCharacter>;
	/**
	 ** 设置随机角色池
	 ** res: {@link IResCommon}, req: {@link IReqRandomCharacter}
	 ** msgId: {@link ENetMessage.setRandomCharacter}
	 */
	setRandomCharacter(data?: IReqRandomCharacter): Promise<IResCommon>;
	/**
	 ** 取消 Google Play 订单
	 ** res: {@link IResCommon}, req: {@link IReqCancelGooglePlayOrder}
	 ** msgId: {@link ENetMessage.cancelGooglePlayOrder}
	 */
	cancelGooglePlayOrder(data?: IReqCancelGooglePlayOrder): Promise<IResCommon>;
	/**
	 ** 抽宝箱
	 ** res: {@link IResOpenChest}, req: {@link IReqOpenChest}
	 ** msgId: {@link ENetMessage.openChest}
	 */
	openChest(data?: IReqOpenChest): Promise<IResOpenChest>;
	/**
	 ** 宝箱商店购买商品
	 ** res: {@link IResBuyFromChestShop}, req: {@link IReqBuyFromChestShop}
	 ** msgId: {@link ENetMessage.buyFromChestShop}
	 */
	buyFromChestShop(data?: IReqBuyFromChestShop): Promise<IResBuyFromChestShop>;
	/**
	 ** 获取每日签到信息
	 ** res: {@link IResDailySignInInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchDailySignInInfo}
	 */
	fetchDailySignInInfo(data?: IReqCommon): Promise<IResDailySignInInfo>;
	/**
	 ** 签到
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.doDailySignIn}
	 */
	doDailySignIn(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** res: {@link IResDoActivitySignIn}, req: {@link IReqDoActivitySignIn}
	 ** msgId: {@link ENetMessage.doActivitySignIn}
	 */
	doActivitySignIn(data?: IReqDoActivitySignIn): Promise<IResDoActivitySignIn>;
	/**
	 ** 获取角色信息
	 ** res: {@link IResCharacterInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchCharacterInfo}
	 */
	fetchCharacterInfo(data?: IReqCommon): Promise<IResCharacterInfo>;
	/**
	 ** 更新角色排序
	 ** res: {@link IResCommon}, req: {@link IReqUpdateCharacterSort}
	 ** msgId: {@link ENetMessage.updateCharacterSort}
	 */
	updateCharacterSort(data?: IReqUpdateCharacterSort): Promise<IResCommon>;
	/**
	 ** 切换主角色
	 ** res: {@link IResCommon}, req: {@link IReqChangeMainCharacter}
	 ** msgId: {@link ENetMessage.changeMainCharacter}
	 */
	changeMainCharacter(data?: IReqChangeMainCharacter): Promise<IResCommon>;
	/**
	 ** 切换角色皮肤
	 ** res: {@link IResCommon}, req: {@link IReqChangeCharacterSkin}
	 ** msgId: {@link ENetMessage.changeCharacterSkin}
	 */
	changeCharacterSkin(data?: IReqChangeCharacterSkin): Promise<IResCommon>;
	/**
	 ** 设置角色外观
	 ** res: {@link IResCommon}, req: {@link IReqChangeCharacterView}
	 ** msgId: {@link ENetMessage.changeCharacterView}
	 */
	changeCharacterView(data?: IReqChangeCharacterView): Promise<IResCommon>;
	/**
	 ** 设置隐藏角色
	 ** res: {@link IResSetHiddenCharacter}, req: {@link IReqSetHiddenCharacter}
	 ** msgId: {@link ENetMessage.setHiddenCharacter}
	 */
	setHiddenCharacter(data?: IReqSetHiddenCharacter): Promise<IResSetHiddenCharacter>;
	/**
	 ** 赠送礼物给角色
	 ** res: {@link IResSendGiftToCharacter}, req: {@link IReqSendGiftToCharacter}
	 ** msgId: {@link ENetMessage.sendGiftToCharacter}
	 */
	sendGiftToCharacter(data?: IReqSendGiftToCharacter): Promise<IResSendGiftToCharacter>;
	/**
	 ** 出售道具（目前只有礼物可以出售）
	 ** res: {@link IResCommon}, req: {@link IReqSellItem}
	 ** msgId: {@link ENetMessage.sellItem}
	 */
	sellItem(data?: IReqSellItem): Promise<IResCommon>;
	/**
	 ** 获取通用外观
	 ** res: {@link IResCommonView}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchCommonView}
	 */
	fetchCommonView(data?: IReqCommon): Promise<IResCommonView>;
	/**
	 ** 切换通用外观（牌桌，牌背等）
	 ** res: {@link IResCommon}, req: {@link IReqChangeCommonView}
	 ** msgId: {@link ENetMessage.changeCommonView}
	 */
	changeCommonView(data?: IReqChangeCommonView): Promise<IResCommon>;
	/**
	 ** 保存通用外观方案
	 ** res: {@link IResCommon}, req: {@link IReqSaveCommonViews}
	 ** msgId: {@link ENetMessage.saveCommonViews}
	 */
	saveCommonViews(data?: IReqSaveCommonViews): Promise<IResCommon>;
	/**
	 ** 获取通用外观方案
	 ** res: {@link IResCommonViews}, req: {@link IReqCommonViews}
	 ** msgId: {@link ENetMessage.fetchCommonViews}
	 */
	fetchCommonViews(data?: IReqCommonViews): Promise<IResCommonViews>;
	/**
	 ** 获取所有通用外观方案
	 ** res: {@link IResAllcommonViews}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAllCommonViews}
	 */
	fetchAllCommonViews(data?: IReqCommon): Promise<IResAllcommonViews>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqUseCommonView}
	 ** msgId: {@link ENetMessage.useCommonView}
	 */
	useCommonView(data?: IReqUseCommonView): Promise<IResCommon>;
	/**
	 ** 突破角色
	 ** res: {@link IResUpgradeCharacter}, req: {@link IReqUpgradeCharacter}
	 ** msgId: {@link ENetMessage.upgradeCharacter}
	 */
	upgradeCharacter(data?: IReqUpgradeCharacter): Promise<IResUpgradeCharacter>;
	/**
	 ** ====角色传记相关====
	 ** 完成结局
	 ** res: {@link IResCommon}, req: {@link IReqFinishedEnding}
	 ** msgId: {@link ENetMessage.addFinishedEnding}
	 */
	addFinishedEnding(data?: IReqFinishedEnding): Promise<IResCommon>;
	/**
	 ** 领取结局奖励
	 ** res: {@link IResCommon}, req: {@link IReqFinishedEnding}
	 ** msgId: {@link ENetMessage.receiveEndingReward}
	 */
	receiveEndingReward(data?: IReqFinishedEnding): Promise<IResCommon>;
	/**
	 ** GM指令
	 ** res: {@link IResCommon}, req: {@link IReqGMCommand}
	 ** msgId: {@link ENetMessage.gameMasterCommand}
	 */
	gameMasterCommand(data?: IReqGMCommand): Promise<IResCommon>;
	/**
	 ** 获取商店信息
	 ** res: {@link IResShopInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchShopInfo}
	 */
	fetchShopInfo(data?: IReqCommon): Promise<IResShopInfo>;
	/**
	 ** 普通商店购买
	 ** res: {@link IResBuyFromShop}, req: {@link IReqBuyFromShop}
	 ** msgId: {@link ENetMessage.buyFromShop}
	 */
	buyFromShop(data?: IReqBuyFromShop): Promise<IResBuyFromShop>;
	/**
	 ** 杂货铺购买
	 ** res: {@link IResCommon}, req: {@link IReqBuyFromZHP}
	 ** msgId: {@link ENetMessage.buyFromZHP}
	 */
	buyFromZHP(data?: IReqBuyFromZHP): Promise<IResCommon>;
	/**
	 ** 刷新杂货铺商店
	 ** res: {@link IResRefreshZHPShop}, req: {@link IReqReshZHPShop}
	 ** msgId: {@link ENetMessage.refreshZHPShop}
	 */
	refreshZHPShop(data?: IReqReshZHPShop): Promise<IResRefreshZHPShop>;
	/**
	 ** 获取账号月卡信息
	 ** res: {@link IResMonthTicketInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchMonthTicketInfo}
	 */
	fetchMonthTicketInfo(data?: IReqCommon): Promise<IResMonthTicketInfo>;
	/**
	 ** 领取月卡工资
	 ** res: {@link IResPayMonthTicket}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.payMonthTicket}
	 */
	payMonthTicket(data?: IReqCommon): Promise<IResPayMonthTicket>;
	/**
	 ** 兑换货币
	 ** res: {@link IResCommon}, req: {@link IReqExchangeCurrency}
	 ** msgId: {@link ENetMessage.exchangeCurrency}
	 */
	exchangeCurrency(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 兑换寻觅石头
	 ** res: {@link IResCommon}, req: {@link IReqExchangeCurrency}
	 ** msgId: {@link ENetMessage.exchangeChestStone}
	 */
	exchangeChestStone(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 皮肤券兑换辉玉
	 ** res: {@link IResCommon}, req: {@link IReqExchangeCurrency}
	 ** msgId: {@link ENetMessage.exchangeDiamond}
	 */
	exchangeDiamond(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 获取服务器设置
	 ** res: {@link IResServerSettings}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchServerSettings}
	 */
	fetchServerSettings(data?: IReqCommon): Promise<IResServerSettings>;
	/**
	 ** 账户设置
	 ** res: {@link IResAccountSettings}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAccountSettings}
	 */
	fetchAccountSettings(data?: IReqCommon): Promise<IResAccountSettings>;
	/**
	 ** 更新账号设置
	 ** res: {@link IResCommon}, req: {@link IReqUpdateAccountSettings}
	 ** msgId: {@link ENetMessage.updateAccountSettings}
	 */
	updateAccountSettings(data?: IReqUpdateAccountSettings): Promise<IResCommon>;
	/**
	 ** 获取改名时间
	 ** res: {@link IResModNicknameTime}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchModNicknameTime}
	 */
	fetchModNicknameTime(data?: IReqCommon): Promise<IResModNicknameTime>;
	/**
	 ** 创建微信支付（扫码支付）订单
	 ** res: {@link IResCreateWechatNativeOrder}, req: {@link IReqCreateWechatNativeOrder}
	 ** msgId: {@link ENetMessage.createWechatNativeOrder}
	 */
	createWechatNativeOrder(data?: IReqCreateWechatNativeOrder): Promise<IResCreateWechatNativeOrder>;
	/**
	 ** 创建微信支付（App支付）订单
	 ** res: {@link IResCreateWechatAppOrder}, req: {@link IReqCreateWechatAppOrder}
	 ** msgId: {@link ENetMessage.createWechatAppOrder}
	 */
	createWechatAppOrder(data?: IReqCreateWechatAppOrder): Promise<IResCreateWechatAppOrder>;
	/**
	 ** 创建支付宝（链接地址）订单
	 ** res: {@link IResCreateAlipayOrder}, req: {@link IReqCreateAlipayOrder}
	 ** msgId: {@link ENetMessage.createAlipayOrder}
	 */
	createAlipayOrder(data?: IReqCreateAlipayOrder): Promise<IResCreateAlipayOrder>;
	/**
	 ** 创建支付宝（扫码支付）订单
	 ** res: {@link IResCreateAlipayScanOrder}, req: {@link IReqCreateAlipayScanOrder}
	 ** msgId: {@link ENetMessage.createAlipayScanOrder}
	 */
	createAlipayScanOrder(data?: IReqCreateAlipayScanOrder): Promise<IResCreateAlipayScanOrder>;
	/**
	 ** 创建支付宝（App支付）订单
	 ** res: {@link IResCreateAlipayAppOrder}, req: {@link IReqCreateAlipayAppOrder}
	 ** msgId: {@link ENetMessage.createAlipayAppOrder}
	 */
	createAlipayAppOrder(data?: IReqCreateAlipayAppOrder): Promise<IResCreateAlipayAppOrder>;
	/**
	 ** 创建日服-CreditCard订单
	 ** res: {@link IResCreateJPCreditCardOrder}, req: {@link IReqCreateJPCreditCardOrder}
	 ** msgId: {@link ENetMessage.createJPCreditCardOrder}
	 */
	createJPCreditCardOrder(data?: IReqCreateJPCreditCardOrder): Promise<IResCreateJPCreditCardOrder>;
	/**
	 ** 创建日服-Paypal订单
	 ** res: {@link IResCreateJPPaypalOrder}, req: {@link IReqCreateJPPaypalOrder}
	 ** msgId: {@link ENetMessage.createJPPaypalOrder}
	 */
	createJPPaypalOrder(data?: IReqCreateJPPaypalOrder): Promise<IResCreateJPPaypalOrder>;
	/**
	 ** 创建日服-Au订单
	 ** res: {@link IResCreateJPAuOrder}, req: {@link IReqCreateJPAuOrder}
	 ** msgId: {@link ENetMessage.createJPAuOrder}
	 */
	createJPAuOrder(data?: IReqCreateJPAuOrder): Promise<IResCreateJPAuOrder>;
	/**
	 ** 创建日服-Docomo订单
	 ** res: {@link IResCreateJPDocomoOrder}, req: {@link IReqCreateJPDocomoOrder}
	 ** msgId: {@link ENetMessage.createJPDocomoOrder}
	 */
	createJPDocomoOrder(data?: IReqCreateJPDocomoOrder): Promise<IResCreateJPDocomoOrder>;
	/**
	 ** 创建日服-WebMoney订单
	 ** res: {@link IResCreateJPWebMoneyOrder}, req: {@link IReqCreateJPWebMoneyOrder}
	 ** msgId: {@link ENetMessage.createJPWebMoneyOrder}
	 */
	createJPWebMoneyOrder(data?: IReqCreateJPWebMoneyOrder): Promise<IResCreateJPWebMoneyOrder>;
	/**
	 ** 创建日服-Softbank订单
	 ** res: {@link IResCreateJPSoftbankOrder}, req: {@link IReqCreateJPSoftbankOrder}
	 ** msgId: {@link ENetMessage.createJPSoftbankOrder}
	 */
	createJPSoftbankOrder(data?: IReqCreateJPSoftbankOrder): Promise<IResCreateJPSoftbankOrder>;
	/**
	 ** 创建日服-Paypay订单
	 ** res: {@link IResCreateJPPayPayOrder}, req: {@link IReqCreateJPPayPayOrder}
	 ** msgId: {@link ENetMessage.createJPPayPayOrder}
	 */
	createJPPayPayOrder(data?: IReqCreateJPPayPayOrder): Promise<IResCreateJPPayPayOrder>;
	/**
	 ** 获取日服信用卡订单信息
	 ** res: {@link IResFetchJPCommonCreditCardOrder}, req: {@link IReqFetchJPCommonCreditCardOrder}
	 ** msgId: {@link ENetMessage.fetchJPCommonCreditCardOrder}
	 */
	fetchJPCommonCreditCardOrder(data?: IReqFetchJPCommonCreditCardOrder): Promise<IResFetchJPCommonCreditCardOrder>;
	/**
	 ** 创建日服-GMO订单
	 ** res: {@link IResCreateJPGMOOrder}, req: {@link IReqCreateJPGMOOrder}
	 ** msgId: {@link ENetMessage.createJPGMOOrder}
	 */
	createJPGMOOrder(data?: IReqCreateJPGMOOrder): Promise<IResCreateJPGMOOrder>;
	/**
	 ** 创建美服-Paypal订单
	 ** res: {@link IResCreateENPaypalOrder}, req: {@link IReqCreateENPaypalOrder}
	 ** msgId: {@link ENetMessage.createENPaypalOrder}
	 */
	createENPaypalOrder(data?: IReqCreateENPaypalOrder): Promise<IResCreateENPaypalOrder>;
	/**
	 ** 创建美服-MasterCard订单
	 ** res: {@link IResCreateENMasterCardOrder}, req: {@link IReqCreateENMasterCardOrder}
	 ** msgId: {@link ENetMessage.createENMasterCardOrder}
	 */
	createENMasterCardOrder(data?: IReqCreateENMasterCardOrder): Promise<IResCreateENMasterCardOrder>;
	/**
	 ** 创建美服-Visa订单
	 ** res: {@link IResCreateENVisaOrder}, req: {@link IReqCreateENVisaOrder}
	 ** msgId: {@link ENetMessage.createENVisaOrder}
	 */
	createENVisaOrder(data?: IReqCreateENVisaOrder): Promise<IResCreateENVisaOrder>;
	/**
	 ** 创建美服-JCB订单
	 ** res: {@link IResCreateENJCBOrder}, req: {@link IReqCreateENJCBOrder}
	 ** msgId: {@link ENetMessage.createENJCBOrder}
	 */
	createENJCBOrder(data?: IReqCreateENJCBOrder): Promise<IResCreateENJCBOrder>;
	/**
	 ** 创建美服-Alipay订单
	 ** res: {@link IResCreateENAlipayOrder}, req: {@link IReqCreateENAlipayOrder}
	 ** msgId: {@link ENetMessage.createENAlipayOrder}
	 */
	createENAlipayOrder(data?: IReqCreateENAlipayOrder): Promise<IResCreateENAlipayOrder>;
	/**
	 ** 创建韩服-Paypal订单
	 ** res: {@link IResCreateKRPaypalOrder}, req: {@link IReqCreateKRPaypalOrder}
	 ** msgId: {@link ENetMessage.createKRPaypalOrder}
	 */
	createKRPaypalOrder(data?: IReqCreateKRPaypalOrder): Promise<IResCreateKRPaypalOrder>;
	/**
	 ** 创建韩服-MasterCard订单
	 ** res: {@link IResCreateKRMasterCardOrder}, req: {@link IReqCreateKRMasterCardOrder}
	 ** msgId: {@link ENetMessage.createKRMasterCardOrder}
	 */
	createKRMasterCardOrder(data?: IReqCreateKRMasterCardOrder): Promise<IResCreateKRMasterCardOrder>;
	/**
	 ** 创建韩服-Visa订单
	 ** res: {@link IResCreateKRVisaOrder}, req: {@link IReqCreateKRVisaOrder}
	 ** msgId: {@link ENetMessage.createKRVisaOrder}
	 */
	createKRVisaOrder(data?: IReqCreateKRVisaOrder): Promise<IResCreateKRVisaOrder>;
	/**
	 ** 创建韩服-JCB订单
	 ** res: {@link IResCreateKRJCBOrder}, req: {@link IReqCreateKRJCBOrder}
	 ** msgId: {@link ENetMessage.createKRJCBOrder}
	 */
	createKRJCBOrder(data?: IReqCreateKRJCBOrder): Promise<IResCreateKRJCBOrder>;
	/**
	 ** 创建韩服-Alipay订单
	 ** res: {@link IResCreateKRAlipayOrder}, req: {@link IReqCreateKRAlipayOrder}
	 ** msgId: {@link ENetMessage.createKRAlipayOrder}
	 */
	createKRAlipayOrder(data?: IReqCreateKRAlipayOrder): Promise<IResCreateKRAlipayOrder>;
	/**
	 ** 创建DMM订单
	 ** res: {@link IResCreateDmmOrder}, req: {@link IReqCreateDMMOrder}
	 ** msgId: {@link ENetMessage.createDMMOrder}
	 */
	createDMMOrder(data?: IReqCreateDMMOrder): Promise<IResCreateDmmOrder>;
	/**
	 ** 创建苹果内购订单
	 ** res: {@link IResCreateIAPOrder}, req: {@link IReqCreateIAPOrder}
	 ** msgId: {@link ENetMessage.createIAPOrder}
	 */
	createIAPOrder(data?: IReqCreateIAPOrder): Promise<IResCreateIAPOrder>;
	/**
	 ** 创建Steam订单
	 ** res: {@link IResCreateSteamOrder}, req: {@link IReqCreateSteamOrder}
	 ** msgId: {@link ENetMessage.createSteamOrder}
	 */
	createSteamOrder(data?: IReqCreateSteamOrder): Promise<IResCreateSteamOrder>;
	/**
	 ** Steam验单
	 ** res: {@link IResCommon}, req: {@link IReqVerifySteamOrder}
	 ** msgId: {@link ENetMessage.verifySteamOrder}
	 */
	verifySteamOrder(data?: IReqVerifySteamOrder): Promise<IResCommon>;
	/**
	 ** 创建MyCard Android订单
	 ** res: {@link IResCreateMyCardOrder}, req: {@link IReqCreateMyCardOrder}
	 ** msgId: {@link ENetMessage.createMyCardAndroidOrder}
	 */
	createMyCardAndroidOrder(data?: IReqCreateMyCardOrder): Promise<IResCreateMyCardOrder>;
	/**
	 ** 创建MyCard Web订单
	 ** res: {@link IResCreateMyCardOrder}, req: {@link IReqCreateMyCardOrder}
	 ** msgId: {@link ENetMessage.createMyCardWebOrder}
	 */
	createMyCardWebOrder(data?: IReqCreateMyCardOrder): Promise<IResCreateMyCardOrder>;
	/**
	 ** 创建Paypal订单
	 ** res: {@link IResCreatePaypalOrder}, req: {@link IReqCreatePaypalOrder}
	 ** msgId: {@link ENetMessage.createPaypalOrder}
	 */
	createPaypalOrder(data?: IReqCreatePaypalOrder): Promise<IResCreatePaypalOrder>;
	/**
	 ** 创建Xsolla订单
	 ** res: {@link IResCreateXsollaOrder}, req: {@link IReqCreateXsollaOrder}
	 ** msgId: {@link ENetMessage.createXsollaOrder}
	 */
	createXsollaOrder(data?: IReqCreateXsollaOrder): Promise<IResCreateXsollaOrder>;
	/**
	 ** 创建XsollaV4订单
	 ** res: {@link IResCreateXsollaOrder}, req: {@link IReqCreateXsollaOrder}
	 ** msgId: {@link ENetMessage.createXsollaV4Order}
	 */
	createXsollaV4Order(data?: IReqCreateXsollaOrder): Promise<IResCreateXsollaOrder>;
	/**
	 ** MyCard验单
	 ** res: {@link IResCommon}, req: {@link IReqVerifyMyCardOrder}
	 ** msgId: {@link ENetMessage.verifyMyCardOrder}
	 */
	verifyMyCardOrder(data?: IReqVerifyMyCardOrder): Promise<IResCommon>;
	/**
	 ** 验证苹果内购订单
	 ** res: {@link IResVerificationIAPOrder}, req: {@link IReqVerificationIAPOrder}
	 ** msgId: {@link ENetMessage.verificationIAPOrder}
	 */
	verificationIAPOrder(data?: IReqVerificationIAPOrder): Promise<IResVerificationIAPOrder>;
	/**
	 ** 创建Yostar-SDK订单
	 ** res: {@link IResCreateYostarOrder}, req: {@link IReqCreateYostarOrder}
	 ** msgId: {@link ENetMessage.createYostarSDKOrder}
	 */
	createYostarSDKOrder(data?: IReqCreateYostarOrder): Promise<IResCreateYostarOrder>;
	/**
	 ** res: {@link IResCreateYostarV4SDKOrder}, req: {@link IReqCreateYostarV4SDKOrder}
	 ** msgId: {@link ENetMessage.createYostarV4SDKOrder}
	 */
	createYostarV4SDKOrder(data?: IReqCreateYostarV4SDKOrder): Promise<IResCreateYostarV4SDKOrder>;
	/**
	 ** 创建支付订单
	 ** res: {@link IResCreateBillingOrder}, req: {@link IReqCreateBillingOrder}
	 ** msgId: {@link ENetMessage.createBillingOrder}
	 */
	createBillingOrder(data?: IReqCreateBillingOrder): Promise<IResCreateBillingOrder>;
	/**
	 ** 处理 Google Play 订单支付结果
	 ** res: {@link IResCommon}, req: {@link IReqSolveGooglePlayOrder}
	 ** msgId: {@link ENetMessage.solveGooglePlayOrder}
	 */
	solveGooglePlayOrder(data?: IReqSolveGooglePlayOrder): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqSolveGooglePlayOrderV3}
	 ** msgId: {@link ENetMessage.solveGooglePayOrderV3}
	 */
	solveGooglePayOrderV3(data?: IReqSolveGooglePlayOrderV3): Promise<IResCommon>;
	/**
	 ** 处理 AA32 订单
	 ** res: {@link IResCommon}, req: {@link IReqDeliverAA32Order}
	 ** msgId: {@link ENetMessage.deliverAA32Order}
	 */
	deliverAA32Order(data?: IReqDeliverAA32Order): Promise<IResCommon>;
	/**
	 ** 获取账号杂七杂八的数据
	 ** res: {@link IResMisc}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchMisc}
	 */
	fetchMisc(data?: IReqCommon): Promise<IResMisc>;
	/**
	 ** 修改签名
	 ** res: {@link IResCommon}, req: {@link IReqModifySignature}
	 ** msgId: {@link ENetMessage.modifySignature}
	 */
	modifySignature(data?: IReqModifySignature): Promise<IResCommon>;
	/**
	 ** 获取实名认证信息
	 ** res: {@link IResIDCardInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchIDCardInfo}
	 */
	fetchIDCardInfo(data?: IReqCommon): Promise<IResIDCardInfo>;
	/**
	 ** 进行实名认证
	 ** res: {@link IResCommon}, req: {@link IReqUpdateIDCardInfo}
	 ** msgId: {@link ENetMessage.updateIDCardInfo}
	 */
	updateIDCardInfo(data?: IReqUpdateIDCardInfo): Promise<IResCommon>;
	/**
	 ** 获取vip奖励领取状态
	 ** res: {@link IResVipReward}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchVipReward}
	 */
	fetchVipReward(data?: IReqCommon): Promise<IResVipReward>;
	/**
	 ** 领取vip奖励
	 ** res: {@link IResCommon}, req: {@link IReqGainVipReward}
	 ** msgId: {@link ENetMessage.gainVipReward}
	 */
	gainVipReward(data?: IReqGainVipReward): Promise<IResCommon>;
	/**
	 ** 获取需要补单的订单信息
	 ** res: {@link IResFetchRefundOrder}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchRefundOrder}
	 */
	fetchRefundOrder(data?: IReqCommon): Promise<IResFetchRefundOrder>;
	/**
	 ** 获取赛事列表
	 ** res: {@link IResFetchCustomizedContestList}, req: {@link IReqFetchCustomizedContestList}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestList}
	 */
	fetchCustomizedContestList(data?: IReqFetchCustomizedContestList): Promise<IResFetchCustomizedContestList>;
	/**
	 ** 获取赛事权限相关信息
	 ** res: {@link IResFetchCustomizedContestAuthInfo}, req: {@link IReqFetchCustomizedContestAuthInfo}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestAuthInfo}
	 */
	fetchCustomizedContestAuthInfo(data?: IReqFetchCustomizedContestAuthInfo): Promise<IResFetchCustomizedContestAuthInfo>;
	/**
	 ** 进入赛事
	 ** res: {@link IResEnterCustomizedContest}, req: {@link IReqEnterCustomizedContest}
	 ** msgId: {@link ENetMessage.enterCustomizedContest}
	 */
	enterCustomizedContest(data?: IReqEnterCustomizedContest): Promise<IResEnterCustomizedContest>;
	/**
	 ** 退出赛事
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.leaveCustomizedContest}
	 */
	leaveCustomizedContest(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 请求比赛在线信息
	 ** res: {@link IResFetchCustomizedContestOnlineInfo}, req: {@link IReqFetchCustomizedContestOnlineInfo}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestOnlineInfo}
	 */
	fetchCustomizedContestOnlineInfo(data?: IReqFetchCustomizedContestOnlineInfo): Promise<IResFetchCustomizedContestOnlineInfo>;
	/**
	 ** 获取赛事基本信息（通过赛事ID）
	 ** res: {@link IResFetchCustomizedContestByContestId}, req: {@link IReqFetchCustomizedContestByContestId}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestByContestId}
	 */
	fetchCustomizedContestByContestId(data?: IReqFetchCustomizedContestByContestId): Promise<IResFetchCustomizedContestByContestId>;
	/**
	 ** 报名比赛
	 ** res: {@link IResSignupCustomizedContest}, req: {@link IReqSignupCustomizedContest}
	 ** msgId: {@link ENetMessage.signupCustomizedContest}
	 */
	signupCustomizedContest(data?: IReqSignupCustomizedContest): Promise<IResSignupCustomizedContest>;
	/**
	 ** 开始比赛匹配
	 ** res: {@link IResCommon}, req: {@link IReqStartCustomizedContest}
	 ** msgId: {@link ENetMessage.startCustomizedContest}
	 */
	startCustomizedContest(data?: IReqStartCustomizedContest): Promise<IResCommon>;
	/**
	 ** 停止比赛匹配
	 ** res: {@link IResCommon}, req: {@link IReqStopCustomizedContest}
	 ** msgId: {@link ENetMessage.stopCustomizedContest}
	 */
	stopCustomizedContest(data?: IReqStopCustomizedContest): Promise<IResCommon>;
	/**
	 ** 进入比赛聊天室
	 ** res: {@link IResJoinCustomizedContestChatRoom}, req: {@link IReqJoinCustomizedContestChatRoom}
	 ** msgId: {@link ENetMessage.joinCustomizedContestChatRoom}
	 */
	joinCustomizedContestChatRoom(data?: IReqJoinCustomizedContestChatRoom): Promise<IResJoinCustomizedContestChatRoom>;
	/**
	 ** 退出比赛聊天室
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.leaveCustomizedContestChatRoom}
	 */
	leaveCustomizedContestChatRoom(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 发送聊天消息
	 ** res: {@link IResCommon}, req: {@link IReqSayChatMessage}
	 ** msgId: {@link ENetMessage.sayChatMessage}
	 */
	sayChatMessage(data?: IReqSayChatMessage): Promise<IResCommon>;
	/**
	 ** 查询赛事牌谱列表
	 ** res: {@link IResFetchCustomizedContestGameRecords}, req: {@link IReqFetchCustomizedContestGameRecords}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestGameRecords}
	 */
	fetchCustomizedContestGameRecords(data?: IReqFetchCustomizedContestGameRecords): Promise<IResFetchCustomizedContestGameRecords>;
	/**
	 ** 获取正在直播的比赛游戏列表
	 ** res: {@link IResFetchCustomizedContestGameLiveList}, req: {@link IReqFetchCustomizedContestGameLiveList}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestGameLiveList}
	 */
	fetchCustomizedContestGameLiveList(data?: IReqFetchCustomizedContestGameLiveList): Promise<IResFetchCustomizedContestGameLiveList>;
	/**
	 ** 关注自定义比赛
	 ** res: {@link IResCommon}, req: {@link IReqTargetCustomizedContest}
	 ** msgId: {@link ENetMessage.followCustomizedContest}
	 */
	followCustomizedContest(data?: IReqTargetCustomizedContest): Promise<IResCommon>;
	/**
	 ** 取消关注自定义比赛
	 ** res: {@link IResCommon}, req: {@link IReqTargetCustomizedContest}
	 ** msgId: {@link ENetMessage.unfollowCustomizedContest}
	 */
	unfollowCustomizedContest(data?: IReqTargetCustomizedContest): Promise<IResCommon>;
	/**
	 ** 获取大会室队伍排名
	 ** res: {@link IResFetchContestTeamRank}, req: {@link IReqFetchContestTeamRank}
	 ** msgId: {@link ENetMessage.fetchContestTeamRank}
	 */
	fetchContestTeamRank(data?: IReqFetchContestTeamRank): Promise<IResFetchContestTeamRank>;
	/**
	 ** 获取大会室队伍成员
	 ** res: {@link IResFetchContestTeamMember}, req: {@link IReqFetchContestTeamMember}
	 ** msgId: {@link ENetMessage.fetchContestTeamMember}
	 */
	fetchContestTeamMember(data?: IReqFetchContestTeamMember): Promise<IResFetchContestTeamMember>;
	/**
	 ** 获取大会室队伍成员排名
	 ** res: {@link IResFetchContestPlayerRank}, req: {@link IReqFetchContestTeamPlayerRank}
	 ** msgId: {@link ENetMessage.fetchContestTeamPlayerRank}
	 */
	fetchContestTeamPlayerRank(data?: IReqFetchContestTeamPlayerRank): Promise<IResFetchContestPlayerRank>;
	/**
	 ** 获取大会室玩家排名
	 ** res: {@link IResFetchContestPlayerRank}, req: {@link IReqFetchContestPlayerRank}
	 ** msgId: {@link ENetMessage.fetchContestPlayerRank}
	 */
	fetchContestPlayerRank(data?: IReqFetchContestPlayerRank): Promise<IResFetchContestPlayerRank>;
	/**
	 ** 获取活动列表
	 ** res: {@link IResActivityList}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchActivityList}
	 */
	fetchActivityList(data?: IReqCommon): Promise<IResActivityList>;
	/**
	 ** 获取玩家活动数据
	 ** res: {@link IResAccountActivityData}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAccountActivityData}
	 */
	fetchAccountActivityData(data?: IReqCommon): Promise<IResAccountActivityData>;
	/**
	 ** 兑换活动
	 ** res: {@link IResExchangeActivityItem}, req: {@link IReqExchangeActivityItem}
	 ** msgId: {@link ENetMessage.exchangeActivityItem}
	 */
	exchangeActivityItem(data?: IReqExchangeActivityItem): Promise<IResExchangeActivityItem>;
	/**
	 ** 领取活动任务奖励
	 ** res: {@link IResCommon}, req: {@link IReqCompleteActivityTask}
	 ** msgId: {@link ENetMessage.completeActivityTask}
	 */
	completeActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCompleteActivityTaskBatch}
	 ** msgId: {@link ENetMessage.completeActivityTaskBatch}
	 */
	completeActivityTaskBatch(data?: IReqCompleteActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 领取翻牌牌任务奖励
	 ** res: {@link IResCommon}, req: {@link IReqCompleteActivityTask}
	 ** msgId: {@link ENetMessage.completeActivityFlipTask}
	 */
	completeActivityFlipTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** res: {@link IResCompleteActivityFlipTaskBatch}, req: {@link IReqCompleteActivityFlipTaskBatch}
	 ** msgId: {@link ENetMessage.completeActivityFlipTaskBatch}
	 */
	completeActivityFlipTaskBatch(data?: IReqCompleteActivityFlipTaskBatch): Promise<IResCompleteActivityFlipTaskBatch>;
	/**
	 ** 领取长期任务奖励
	 ** res: {@link IResCommon}, req: {@link IReqCompleteActivityTask}
	 ** msgId: {@link ENetMessage.completePeriodActivityTask}
	 */
	completePeriodActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCompletePeriodActivityTaskBatch}
	 ** msgId: {@link ENetMessage.completePeriodActivityTaskBatch}
	 */
	completePeriodActivityTaskBatch(data?: IReqCompletePeriodActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 领取随机任务奖励
	 ** res: {@link IResCommon}, req: {@link IReqCompleteActivityTask}
	 ** msgId: {@link ENetMessage.completeRandomActivityTask}
	 */
	completeRandomActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCompleteActivityTaskBatch}
	 ** msgId: {@link ENetMessage.completeRandomActivityTaskBatch}
	 */
	completeRandomActivityTaskBatch(data?: IReqCompleteActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 翻牌牌领任务
	 ** res: {@link IResReceiveActivityFlipTask}, req: {@link IReqReceiveActivityFlipTask}
	 ** msgId: {@link ENetMessage.receiveActivityFlipTask}
	 */
	receiveActivityFlipTask(data?: IReqReceiveActivityFlipTask): Promise<IResReceiveActivityFlipTask>;
	/**
	 ** res: {@link IResReceiveActivityFlipTaskBatch}, req: {@link IReqReceiveActivityFlipTaskBatch}
	 ** msgId: {@link ENetMessage.receiveActivityFlipTaskBatch}
	 */
	receiveActivityFlipTaskBatch(data?: IReqReceiveActivityFlipTaskBatch): Promise<IResReceiveActivityFlipTaskBatch>;
	/**
	 ** 领取分段任务奖励
	 ** res: {@link IResCompleteSegmentTaskReward}, req: {@link IReqCompleteSegmentTaskReward}
	 ** msgId: {@link ENetMessage.completeSegmentTaskReward}
	 */
	completeSegmentTaskReward(data?: IReqCompleteSegmentTaskReward): Promise<IResCompleteSegmentTaskReward>;
	/**
	 ** 获取翻牌牌任务信息
	 ** res: {@link IResFetchActivityFlipInfo}, req: {@link IReqFetchActivityFlipInfo}
	 ** msgId: {@link ENetMessage.fetchActivityFlipInfo}
	 */
	fetchActivityFlipInfo(data?: IReqFetchActivityFlipInfo): Promise<IResFetchActivityFlipInfo>;
	/**
	 ** 领取得点活动奖励
	 ** res: {@link IResCommon}, req: {@link IReqGainAccumulatedPointActivityReward}
	 ** msgId: {@link ENetMessage.gainAccumulatedPointActivityReward}
	 */
	gainAccumulatedPointActivityReward(data?: IReqGainAccumulatedPointActivityReward): Promise<IResCommon>;
	/**
	 ** 批量领取得点活动奖励
	 ** res: {@link IResCommon}, req: {@link IReqGainMultiPointActivityReward}
	 ** msgId: {@link ENetMessage.gainMultiPointActivityReward}
	 */
	gainMultiPointActivityReward(data?: IReqGainMultiPointActivityReward): Promise<IResCommon>;
	/**
	 ** 获取得分排行榜数据
	 ** res: {@link IResFetchRankPointLeaderboard}, req: {@link IReqFetchRankPointLeaderboard}
	 ** msgId: {@link ENetMessage.fetchRankPointLeaderboard}
	 */
	fetchRankPointLeaderboard(data?: IReqFetchRankPointLeaderboard): Promise<IResFetchRankPointLeaderboard>;
	/**
	 ** 领取得分排行奖励
	 ** res: {@link IResCommon}, req: {@link IReqGainRankPointReward}
	 ** msgId: {@link ENetMessage.gainRankPointReward}
	 */
	gainRankPointReward(data?: IReqGainRankPointReward): Promise<IResCommon>;
	/**
	 ** 大富翁投骰子
	 ** res: {@link IResRichmanNextMove}, req: {@link IReqRichmanNextMove}
	 ** msgId: {@link ENetMessage.richmanActivityNextMove}
	 */
	richmanActivityNextMove(data?: IReqRichmanNextMove): Promise<IResRichmanNextMove>;
	/**
	 ** 大富翁遥控骰子
	 ** res: {@link IResRichmanNextMove}, req: {@link IReqRichmanSpecialMove}
	 ** msgId: {@link ENetMessage.richmanAcitivitySpecialMove}
	 */
	richmanAcitivitySpecialMove(data?: IReqRichmanSpecialMove): Promise<IResRichmanNextMove>;
	/**
	 ** 大富翁宝箱信息
	 ** res: {@link IResRichmanChestInfo}, req: {@link IReqRichmanChestInfo}
	 ** msgId: {@link ENetMessage.richmanActivityChestInfo}
	 */
	richmanActivityChestInfo(data?: IReqRichmanChestInfo): Promise<IResRichmanChestInfo>;
	/**
	 ** 创建实时OB权限
	 ** res: {@link IResCreateGameObserveAuth}, req: {@link IReqCreateGameObserveAuth}
	 ** msgId: {@link ENetMessage.createGameObserveAuth}
	 */
	createGameObserveAuth(data?: IReqCreateGameObserveAuth): Promise<IResCreateGameObserveAuth>;
	/**
	 ** 刷新实时OB权限时长
	 ** res: {@link IResRefreshGameObserveAuth}, req: {@link IReqRefreshGameObserveAuth}
	 ** msgId: {@link ENetMessage.refreshGameObserveAuth}
	 */
	refreshGameObserveAuth(data?: IReqRefreshGameObserveAuth): Promise<IResRefreshGameObserveAuth>;
	/**
	 ** 获取活动buff信息
	 ** res: {@link IResActivityBuff}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchActivityBuff}
	 */
	fetchActivityBuff(data?: IReqCommon): Promise<IResActivityBuff>;
	/**
	 ** 升级活动buff
	 ** res: {@link IResActivityBuff}, req: {@link IReqUpgradeActivityBuff}
	 ** msgId: {@link ENetMessage.upgradeActivityBuff}
	 */
	upgradeActivityBuff(data?: IReqUpgradeActivityBuff): Promise<IResActivityBuff>;
	/**
	 ** res: {@link IResActivityBuff}, req: {@link IReqSetActivityBuff}
	 ** msgId: {@link ENetMessage.setActivityBuff}
	 */
	setActivityBuff(data?: IReqSetActivityBuff): Promise<IResActivityBuff>;
	/**
	 ** 升级活动升级
	 ** res: {@link IResUpgradeActivityLevel}, req: {@link IReqUpgradeActivityLevel}
	 ** msgId: {@link ENetMessage.upgradeActivityLevel}
	 */
	upgradeActivityLevel(data?: IReqUpgradeActivityLevel): Promise<IResUpgradeActivityLevel>;
	/**
	 ** 获取总等级奖励
	 ** res: {@link IResReceiveUpgradeActivityReward}, req: {@link IReqReceiveUpgradeActivityReward}
	 ** msgId: {@link ENetMessage.receiveUpgradeActivityReward}
	 */
	receiveUpgradeActivityReward(data?: IReqReceiveUpgradeActivityReward): Promise<IResReceiveUpgradeActivityReward>;
	/**
	 ** 试炼赛升级
	 ** res: {@link IResUpgradeChallenge}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.upgradeChallenge}
	 */
	upgradeChallenge(data?: IReqCommon): Promise<IResUpgradeChallenge>;
	/**
	 ** 再发行
	 ** res: {@link IResRefreshChallenge}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.refreshChallenge}
	 */
	refreshChallenge(data?: IReqCommon): Promise<IResRefreshChallenge>;
	/**
	 ** 获取试炼赛信息
	 ** res: {@link IResFetchChallengeInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchChallengeInfo}
	 */
	fetchChallengeInfo(data?: IReqCommon): Promise<IResFetchChallengeInfo>;
	/**
	 ** 盖章完成试炼任务
	 ** res: {@link IResCommon}, req: {@link IReqForceCompleteChallengeTask}
	 ** msgId: {@link ENetMessage.forceCompleteChallengeTask}
	 */
	forceCompleteChallengeTask(data?: IReqForceCompleteChallengeTask): Promise<IResCommon>;
	/**
	 ** 获取当前试炼赛信息
	 ** res: {@link IResChallengeSeasonInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchChallengeSeason}
	 */
	fetchChallengeSeason(data?: IReqCommon): Promise<IResChallengeSeasonInfo>;
	/**
	 ** 获取试炼赛排名奖励
	 ** res: {@link IResReceiveChallengeRankReward}, req: {@link IReqReceiveChallengeRankReward}
	 ** msgId: {@link ENetMessage.receiveChallengeRankReward}
	 */
	receiveChallengeRankReward(data?: IReqReceiveChallengeRankReward): Promise<IResReceiveChallengeRankReward>;
	/**
	 ** AB赛
	 ** res: {@link IResFetchABMatch}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchABMatchInfo}
	 */
	fetchABMatchInfo(data?: IReqCommon): Promise<IResFetchABMatch>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqBuyInABMatch}
	 ** msgId: {@link ENetMessage.buyInABMatch}
	 */
	buyInABMatch(data?: IReqBuyInABMatch): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.receiveABMatchReward}
	 */
	receiveABMatchReward(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.quitABMatch}
	 */
	quitABMatch(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqStartUnifiedMatch}
	 ** msgId: {@link ENetMessage.startUnifiedMatch}
	 */
	startUnifiedMatch(data?: IReqStartUnifiedMatch): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCancelUnifiedMatch}
	 ** msgId: {@link ENetMessage.cancelUnifiedMatch}
	 */
	cancelUnifiedMatch(data?: IReqCancelUnifiedMatch): Promise<IResCommon>;
	/**
	 ** res: {@link IResGamePointRank}, req: {@link IReqGamePointRank}
	 ** msgId: {@link ENetMessage.fetchGamePointRank}
	 */
	fetchGamePointRank(data?: IReqGamePointRank): Promise<IResGamePointRank>;
	/**
	 ** res: {@link IResFetchSelfGamePointRank}, req: {@link IReqGamePointRank}
	 ** msgId: {@link ENetMessage.fetchSelfGamePointRank}
	 */
	fetchSelfGamePointRank(data?: IReqGamePointRank): Promise<IResFetchSelfGamePointRank>;
	/**
	 ** SNS活动
	 ** res: {@link IResReadSNS}, req: {@link IReqReadSNS}
	 ** msgId: {@link ENetMessage.readSNS}
	 */
	readSNS(data?: IReqReadSNS): Promise<IResReadSNS>;
	/**
	 ** res: {@link IResReplySNS}, req: {@link IReqReplySNS}
	 ** msgId: {@link ENetMessage.replySNS}
	 */
	replySNS(data?: IReqReplySNS): Promise<IResReplySNS>;
	/**
	 ** res: {@link IResLikeSNS}, req: {@link IReqLikeSNS}
	 ** msgId: {@link ENetMessage.likeSNS}
	 */
	likeSNS(data?: IReqLikeSNS): Promise<IResLikeSNS>;
	/**
	 ** 挖矿活动
	 ** res: {@link IResDigMine}, req: {@link IReqDigMine}
	 ** msgId: {@link ENetMessage.digMine}
	 */
	digMine(data?: IReqDigMine): Promise<IResDigMine>;
	/**
	 ** 用户协议
	 ** res: {@link IResFetchLastPrivacy}, req: {@link IReqFetchLastPrivacy}
	 ** msgId: {@link ENetMessage.fetchLastPrivacy}
	 */
	fetchLastPrivacy(data?: IReqFetchLastPrivacy): Promise<IResFetchLastPrivacy>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCheckPrivacy}
	 ** msgId: {@link ENetMessage.checkPrivacy}
	 */
	checkPrivacy(data?: IReqCheckPrivacy): Promise<IResCommon>;
	/**
	 ** rpg活动
	 ** res: {@link IResFetchRPGBattleHistory}, req: {@link IReqFetchRPGBattleHistory}
	 ** msgId: {@link ENetMessage.fetchRPGBattleHistory}
	 */
	fetchRPGBattleHistory(data?: IReqFetchRPGBattleHistory): Promise<IResFetchRPGBattleHistory>;
	/**
	 ** res: {@link IResFetchRPGBattleHistoryV2}, req: {@link IReqFetchRPGBattleHistory}
	 ** msgId: {@link ENetMessage.fetchRPGBattleHistoryV2}
	 */
	fetchRPGBattleHistoryV2(data?: IReqFetchRPGBattleHistory): Promise<IResFetchRPGBattleHistoryV2>;
	/**
	 ** res: {@link IResReceiveRPGRewards}, req: {@link IReqReceiveRPGRewards}
	 ** msgId: {@link ENetMessage.receiveRPGRewards}
	 */
	receiveRPGRewards(data?: IReqReceiveRPGRewards): Promise<IResReceiveRPGRewards>;
	/**
	 ** res: {@link IResReceiveRPGRewards}, req: {@link IReqReceiveRPGReward}
	 ** msgId: {@link ENetMessage.receiveRPGReward}
	 */
	receiveRPGReward(data?: IReqReceiveRPGReward): Promise<IResReceiveRPGRewards>;
	/**
	 ** 竞技场活动
	 ** res: {@link IResCommon}, req: {@link IReqBuyArenaTicket}
	 ** msgId: {@link ENetMessage.buyArenaTicket}
	 */
	buyArenaTicket(data?: IReqBuyArenaTicket): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqEnterArena}
	 ** msgId: {@link ENetMessage.enterArena}
	 */
	enterArena(data?: IReqEnterArena): Promise<IResCommon>;
	/**
	 ** res: {@link IResArenaReward}, req: {@link IReqArenaReward}
	 ** msgId: {@link ENetMessage.receiveArenaReward}
	 */
	receiveArenaReward(data?: IReqArenaReward): Promise<IResArenaReward>;
	/**
	 ** 观战
	 ** res: {@link IResFetchOBToken}, req: {@link IReqFetchOBToken}
	 ** msgId: {@link ENetMessage.fetchOBToken}
	 */
	fetchOBToken(data?: IReqFetchOBToken): Promise<IResFetchOBToken>;
	/**
	 ** 角色好感度
	 ** res: {@link IResReceiveCharacterRewards}, req: {@link IReqReceiveCharacterRewards}
	 ** msgId: {@link ENetMessage.receiveCharacterRewards}
	 */
	receiveCharacterRewards(data?: IReqReceiveCharacterRewards): Promise<IResReceiveCharacterRewards>;
	/**
	 ** 喂年兽活动 -> 已经拆分成 friend-gift 与 upgrade 活动，这个协议不再使用
	 ** res: {@link IResFeedActivityFeed}, req: {@link IReqFeedActivityFeed}
	 ** msgId: {@link ENetMessage.feedActivityFeed}
	 */
	feedActivityFeed(data?: IReqFeedActivityFeed): Promise<IResFeedActivityFeed>;
	/**
	 ** 送礼活动
	 ** res: {@link IResSendActivityGiftToFriend}, req: {@link IReqSendActivityGiftToFriend}
	 ** msgId: {@link ENetMessage.sendActivityGiftToFriend}
	 */
	sendActivityGiftToFriend(data?: IReqSendActivityGiftToFriend): Promise<IResSendActivityGiftToFriend>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqReceiveActivityGift}
	 ** msgId: {@link ENetMessage.receiveActivityGift}
	 */
	receiveActivityGift(data?: IReqReceiveActivityGift): Promise<IResCommon>;
	/**
	 ** res: {@link IResReceiveAllActivityGift}, req: {@link IReqReceiveAllActivityGift}
	 ** msgId: {@link ENetMessage.receiveAllActivityGift}
	 */
	receiveAllActivityGift(data?: IReqReceiveAllActivityGift): Promise<IResReceiveAllActivityGift>;
	/**
	 ** res: {@link IResFetchFriendGiftActivityData}, req: {@link IReqFetchFriendGiftActivityData}
	 ** msgId: {@link ENetMessage.fetchFriendGiftActivityData}
	 */
	fetchFriendGiftActivityData(data?: IReqFetchFriendGiftActivityData): Promise<IResFetchFriendGiftActivityData>;
	/**
	 ** 自选卡池
	 ** res: {@link IResOpenPreChestItem}, req: {@link IReqOpenPreChestItem}
	 ** msgId: {@link ENetMessage.openPreChestItem}
	 */
	openPreChestItem(data?: IReqOpenPreChestItem): Promise<IResOpenPreChestItem>;
	/**
	 ** 投票活动
	 ** res: {@link IResFetchVoteActivity}, req: {@link IReqFetchVoteActivity}
	 ** msgId: {@link ENetMessage.fetchVoteActivity}
	 */
	fetchVoteActivity(data?: IReqFetchVoteActivity): Promise<IResFetchVoteActivity>;
	/**
	 ** res: {@link IResVoteActivity}, req: {@link IReqVoteActivity}
	 ** msgId: {@link ENetMessage.voteActivity}
	 */
	voteActivity(data?: IReqVoteActivity): Promise<IResVoteActivity>;
	/**
	 ** 剧情活动
	 ** res: {@link IResCommon}, req: {@link IReqUnlockActivitySpot}
	 ** msgId: {@link ENetMessage.unlockActivitySpot}
	 */
	unlockActivitySpot(data?: IReqUnlockActivitySpot): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqUnlockActivitySpotEnding}
	 ** msgId: {@link ENetMessage.unlockActivitySpotEnding}
	 */
	unlockActivitySpotEnding(data?: IReqUnlockActivitySpotEnding): Promise<IResCommon>;
	/**
	 ** res: {@link IResReceiveActivitySpotReward}, req: {@link IReqReceiveActivitySpotReward}
	 ** msgId: {@link ENetMessage.receiveActivitySpotReward}
	 */
	receiveActivitySpotReward(data?: IReqReceiveActivitySpotReward): Promise<IResReceiveActivitySpotReward>;
	/**
	 ** 删除账号接口
	 ** res: {@link IResDeleteAccount}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.deleteAccount}
	 */
	deleteAccount(data?: IReqCommon): Promise<IResDeleteAccount>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.cancelDeleteAccount}
	 */
	cancelDeleteAccount(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqLogReport}
	 ** msgId: {@link ENetMessage.logReport}
	 */
	logReport(data?: IReqLogReport): Promise<IResCommon>;
	/**
	 ** oauth2
	 ** res: {@link IResCommon}, req: {@link IReqBindOauth2}
	 ** msgId: {@link ENetMessage.bindOauth2}
	 */
	bindOauth2(data?: IReqBindOauth2): Promise<IResCommon>;
	/**
	 ** res: {@link IResFetchOauth2}, req: {@link IReqFetchOauth2}
	 ** msgId: {@link ENetMessage.fetchOauth2Info}
	 */
	fetchOauth2Info(data?: IReqFetchOauth2): Promise<IResFetchOauth2>;
	/**
	 ** loading图
	 ** res: {@link IResCommon}, req: {@link IReqSetLoadingImage}
	 ** msgId: {@link ENetMessage.setLoadingImage}
	 */
	setLoadingImage(data?: IReqSetLoadingImage): Promise<IResCommon>;
	/**
	 ** 获取商店信息
	 ** res: {@link IResFetchShopInterval}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchShopInterval}
	 */
	fetchShopInterval(data?: IReqCommon): Promise<IResFetchShopInterval>;
	/**
	 ** 获取活动轮换信息
	 ** res: {@link IResFetchActivityInterval}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchActivityInterval}
	 */
	fetchActivityInterval(data?: IReqCommon): Promise<IResFetchActivityInterval>;
	/**
	 ** 获取最近对战玩家
	 ** res: {@link IResFetchrecentFriend}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchRecentFriend}
	 */
	fetchRecentFriend(data?: IReqCommon): Promise<IResFetchrecentFriend>;
	/**
	 ** 扭蛋活动
	 ** res: {@link IResOpenGacha}, req: {@link IReqOpenGacha}
	 ** msgId: {@link ENetMessage.openGacha}
	 */
	openGacha(data?: IReqOpenGacha): Promise<IResOpenGacha>;
	/**
	 ** 前端完成任务
	 ** res: {@link IResCommon}, req: {@link IReqTaskRequest}
	 ** msgId: {@link ENetMessage.taskRequest}
	 */
	taskRequest(data?: IReqTaskRequest): Promise<IResCommon>;
	/**
	 ** 悠星删除账号请求
	 ** res: {@link IResYostarDeleteAccount}, req: {@link IReqYostarDeleteAccount}
	 ** msgId: {@link ENetMessage.yostarDeleteAccount}
	 */
	yostarDeleteAccount(data?: IReqYostarDeleteAccount): Promise<IResYostarDeleteAccount>;
	/**
	 ** 养成活动
	 ** res: {@link IResSimulationActivityTrain}, req: {@link IReqSimulationActivityTrain}
	 ** msgId: {@link ENetMessage.simulationActivityTrain}
	 */
	simulationActivityTrain(data?: IReqSimulationActivityTrain): Promise<IResSimulationActivityTrain>;
	/**
	 ** res: {@link IResFetchSimulationGameRecord}, req: {@link IReqFetchSimulationGameRecord}
	 ** msgId: {@link ENetMessage.fetchSimulationGameRecord}
	 */
	fetchSimulationGameRecord(data?: IReqFetchSimulationGameRecord): Promise<IResFetchSimulationGameRecord>;
	/**
	 ** res: {@link IResStartSimulationActivityGame}, req: {@link IReqStartSimulationActivityGame}
	 ** msgId: {@link ENetMessage.startSimulationActivityGame}
	 */
	startSimulationActivityGame(data?: IReqStartSimulationActivityGame): Promise<IResStartSimulationActivityGame>;
	/**
	 ** res: {@link IResFetchSimulationGameRank}, req: {@link IReqFetchSimulationGameRank}
	 ** msgId: {@link ENetMessage.fetchSimulationGameRank}
	 */
	fetchSimulationGameRank(data?: IReqFetchSimulationGameRank): Promise<IResFetchSimulationGameRank>;
	/**
	 ** 合成活动
	 ** res: {@link IResGenerateCombiningCraft}, req: {@link IReqGenerateCombiningCraft}
	 ** msgId: {@link ENetMessage.generateCombiningCraft}
	 */
	generateCombiningCraft(data?: IReqGenerateCombiningCraft): Promise<IResGenerateCombiningCraft>;
	/**
	 ** res: {@link IResMoveCombiningCraft}, req: {@link IReqMoveCombiningCraft}
	 ** msgId: {@link ENetMessage.moveCombiningCraft}
	 */
	moveCombiningCraft(data?: IReqMoveCombiningCraft): Promise<IResMoveCombiningCraft>;
	/**
	 ** res: {@link IResCombiningRecycleCraft}, req: {@link IReqCombiningRecycleCraft}
	 ** msgId: {@link ENetMessage.combiningRecycleCraft}
	 */
	combiningRecycleCraft(data?: IReqCombiningRecycleCraft): Promise<IResCombiningRecycleCraft>;
	/**
	 ** res: {@link IResRecoverCombiningRecycle}, req: {@link IReqRecoverCombiningRecycle}
	 ** msgId: {@link ENetMessage.recoverCombiningRecycle}
	 */
	recoverCombiningRecycle(data?: IReqRecoverCombiningRecycle): Promise<IResRecoverCombiningRecycle>;
	/**
	 ** res: {@link IResFinishCombiningOrder}, req: {@link IReqFinishCombiningOrder}
	 ** msgId: {@link ENetMessage.finishCombiningOrder}
	 */
	finishCombiningOrder(data?: IReqFinishCombiningOrder): Promise<IResFinishCombiningOrder>;
	/**
	 ** 小村活动
	 ** res: {@link IResCommon}, req: {@link IReqUpgradeVillageBuilding}
	 ** msgId: {@link ENetMessage.upgradeVillageBuilding}
	 */
	upgradeVillageBuilding(data?: IReqUpgradeVillageBuilding): Promise<IResCommon>;
	/**
	 ** res: {@link IResReceiveVillageBuildingReward}, req: {@link IReqReceiveVillageBuildingReward}
	 ** msgId: {@link ENetMessage.receiveVillageBuildingReward}
	 */
	receiveVillageBuildingReward(data?: IReqReceiveVillageBuildingReward): Promise<IResReceiveVillageBuildingReward>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqStartVillageTrip}
	 ** msgId: {@link ENetMessage.startVillageTrip}
	 */
	startVillageTrip(data?: IReqStartVillageTrip): Promise<IResCommon>;
	/**
	 ** res: {@link IResReceiveVillageTripReward}, req: {@link IReqReceiveVillageTripReward}
	 ** msgId: {@link ENetMessage.receiveVillageTripReward}
	 */
	receiveVillageTripReward(data?: IReqReceiveVillageTripReward): Promise<IResReceiveVillageTripReward>;
	/**
	 ** res: {@link IResCompleteVillageTask}, req: {@link IReqCompleteVillageTask}
	 ** msgId: {@link ENetMessage.completeVillageTask}
	 */
	completeVillageTask(data?: IReqCompleteVillageTask): Promise<IResCompleteVillageTask>;
	/**
	 ** res: {@link IResGetFriendVillageData}, req: {@link IReqGetFriendVillageData}
	 ** msgId: {@link ENetMessage.getFriendVillageData}
	 */
	getFriendVillageData(data?: IReqGetFriendVillageData): Promise<IResGetFriendVillageData>;
	/**
	 ** res: {@link IResSetVillageWorker}, req: {@link IReqSetVillageWorker}
	 ** msgId: {@link ENetMessage.setVillageWorker}
	 */
	setVillageWorker(data?: IReqSetVillageWorker): Promise<IResSetVillageWorker>;
	/**
	 ** 下一个丰收季
	 ** res: {@link IResNextRoundVillage}, req: {@link IReqNextRoundVillage}
	 ** msgId: {@link ENetMessage.nextRoundVillage}
	 */
	nextRoundVillage(data?: IReqNextRoundVillage): Promise<IResNextRoundVillage>;
	/**
	 ** 射击活动
	 ** res: {@link IResShootActivityAttackEnemies}, req: {@link IReqShootActivityAttackEnemies}
	 ** msgId: {@link ENetMessage.shootActivityAttackEnemies}
	 */
	shootActivityAttackEnemies(data?: IReqShootActivityAttackEnemies): Promise<IResShootActivityAttackEnemies>;
	/**
	 ** 庆典活动
	 ** res: {@link IResResolveFestivalActivityProposal}, req: {@link IReqResolveFestivalActivityProposal}
	 ** msgId: {@link ENetMessage.resolveFestivalActivityProposal}
	 */
	resolveFestivalActivityProposal(data?: IReqResolveFestivalActivityProposal): Promise<IResResolveFestivalActivityProposal>;
	/**
	 ** res: {@link IResResolveFestivalActivityEvent}, req: {@link IReqResolveFestivalActivityEvent}
	 ** msgId: {@link ENetMessage.resolveFestivalActivityEvent}
	 */
	resolveFestivalActivityEvent(data?: IReqResolveFestivalActivityEvent): Promise<IResResolveFestivalActivityEvent>;
	/**
	 ** res: {@link IResBuyFestivalProposal}, req: {@link IReqBuyFestivalProposal}
	 ** msgId: {@link ENetMessage.buyFestivalProposal}
	 */
	buyFestivalProposal(data?: IReqBuyFestivalProposal): Promise<IResBuyFestivalProposal>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** res: {@link IResFestivalFetchDebug}, req: {@link IReqFestivalFetchDebug}
	 ** msgId: {@link ENetMessage.festivalActivityFetchDebug}
	 */
	festivalActivityFetchDebug(data?: IReqFestivalFetchDebug): Promise<IResFestivalFetchDebug>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqFestivalDebug}
	 ** msgId: {@link ENetMessage.festivalActivityDebug}
	 */
	festivalActivityDebug(data?: IReqFestivalDebug): Promise<IResCommon>;
	/**
	 ** 海岛活动
	 ** res: {@link IResCommon}, req: {@link IReqIslandActivityMove}
	 ** msgId: {@link ENetMessage.islandActivityMove}
	 */
	islandActivityMove(data?: IReqIslandActivityMove): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqIslandActivityBuy}
	 ** msgId: {@link ENetMessage.islandActivityBuy}
	 */
	islandActivityBuy(data?: IReqIslandActivityBuy): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqIslandActivitySell}
	 ** msgId: {@link ENetMessage.islandActivitySell}
	 */
	islandActivitySell(data?: IReqIslandActivitySell): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqIslandActivityTidyBag}
	 ** msgId: {@link ENetMessage.islandActivityTidyBag}
	 */
	islandActivityTidyBag(data?: IReqIslandActivityTidyBag): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqIslandActivityUnlockBagGrid}
	 ** msgId: {@link ENetMessage.islandActivityUnlockBagGrid}
	 */
	islandActivityUnlockBagGrid(data?: IReqIslandActivityUnlockBagGrid): Promise<IResCommon>;
	/**
	 ** 大会室管理相关
	 ** res: {@link IResCreateCustomizedContest}, req: {@link IReqCreateCustomizedContest}
	 ** msgId: {@link ENetMessage.createCustomizedContest}
	 */
	createCustomizedContest(data?: IReqCreateCustomizedContest): Promise<IResCreateCustomizedContest>;
	/**
	 ** res: {@link IResFetchManagerCustomizedContestList}, req: {@link IReqFetchmanagerCustomizedContestList}
	 ** msgId: {@link ENetMessage.fetchManagerCustomizedContestList}
	 */
	fetchManagerCustomizedContestList(data?: IReqFetchmanagerCustomizedContestList): Promise<IResFetchManagerCustomizedContestList>;
	/**
	 ** res: {@link IResFetchManagerCustomizedContest}, req: {@link IReqFetchManagerCustomizedContest}
	 ** msgId: {@link ENetMessage.fetchManagerCustomizedContest}
	 */
	fetchManagerCustomizedContest(data?: IReqFetchManagerCustomizedContest): Promise<IResFetchManagerCustomizedContest>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqUpdateManagerCustomizedContest}
	 ** msgId: {@link ENetMessage.updateManagerCustomizedContest}
	 */
	updateManagerCustomizedContest(data?: IReqUpdateManagerCustomizedContest): Promise<IResCommon>;
	/**
	 ** res: {@link IResFetchReadyPlayerList}, req: {@link IReqFetchReadyPlayerList}
	 ** msgId: {@link ENetMessage.fetchReadyPlayerList}
	 */
	fetchReadyPlayerList(data?: IReqFetchReadyPlayerList): Promise<IResFetchReadyPlayerList>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqCreateGamePlan}
	 ** msgId: {@link ENetMessage.createGamePlan}
	 */
	createGamePlan(data?: IReqCreateGamePlan): Promise<IResCommon>;
	/**
	 ** res: {@link IResGenerateContestManagerLoginCode}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.generateContestManagerLoginCode}
	 */
	generateContestManagerLoginCode(data?: IReqCommon): Promise<IResGenerateContestManagerLoginCode>;
	/**
	 ** 获取青云之志活动数据
	 ** res: {@link IResFetchAmuletActivityData}, req: {@link IReqFetchAmuletActivityData}
	 ** msgId: {@link ENetMessage.fetchAmuletActivityData}
	 */
	fetchAmuletActivityData(data?: IReqFetchAmuletActivityData): Promise<IResFetchAmuletActivityData>;
	/**
	 ** 获取挑战任务与收藏数据
	 ** res: {@link IResAmuletActivityFetchBrief}, req: {@link IReqAmuletActivityFetchBrief}
	 ** msgId: {@link ENetMessage.amuletActivityFetchBrief}
	 */
	amuletActivityFetchBrief(data?: IReqAmuletActivityFetchBrief): Promise<IResAmuletActivityFetchBrief>;
	/**
	 ** 开始游戏
	 ** res: {@link IResAmuletEventResponse}, req: {@link IReqAmuletActivityStartGame}
	 ** msgId: {@link ENetMessage.amuletActivityStartGame}
	 */
	amuletActivityStartGame(data?: IReqAmuletActivityStartGame): Promise<IResAmuletEventResponse>;
	/**
	 ** 换牌/打牌/开杠/和牌/模切/结束换牌 操作
	 ** res: {@link IResAmuletEventResponse}, req: {@link IReqAmuletActivityGameOperate}
	 ** msgId: {@link ENetMessage.amuletActivityGameOperate}
	 */
	amuletActivityGameOperate(data?: IReqAmuletActivityGameOperate): Promise<IResAmuletEventResponse>;
	/**
	 ** 对局外的其他操作
	 ** res: {@link IResAmuletEventResponse}, req: {@link IReqAmuletActivityOperate}
	 ** msgId: {@link ENetMessage.amuletActivityOperate}
	 */
	amuletActivityOperate(data?: IReqAmuletActivityOperate): Promise<IResAmuletEventResponse>;
	/**
	 ** 放弃当前对局
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityGiveup}
	 ** msgId: {@link ENetMessage.amuletActivityGiveup}
	 */
	amuletActivityGiveup(data?: IReqAmuletActivityGiveup): Promise<IResCommon>;
	/**
	 ** 设置场外增强
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivitySetSkillLevel}
	 ** msgId: {@link ENetMessage.amuletActivitySetSkillLevel}
	 */
	amuletActivitySetSkillLevel(data?: IReqAmuletActivitySetSkillLevel): Promise<IResCommon>;
	/**
	 ** 获取青云之志维护信息
	 ** res: {@link IResAmuletActivityMaintainInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.amuletActivityMaintainInfo}
	 */
	amuletActivityMaintainInfo(data?: IReqCommon): Promise<IResAmuletActivityMaintainInfo>;
	/**
	 ** 设置青云之志钦定护身符
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivitySelectBookEffect}
	 ** msgId: {@link ENetMessage.amuletActivitySelectBookEffect}
	 */
	amuletActivitySelectBookEffect(data?: IReqAmuletActivitySelectBookEffect): Promise<IResCommon>;
	/**
	 ** 设置青云之志完整数据
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityDebug}
	 ** msgId: {@link ENetMessage.amuletActivityDebug}
	 */
	amuletActivityDebug(data?: IReqAmuletActivityDebug): Promise<IResCommon>;
	/**
	 ** 获取青云之志完整数据
	 ** res: {@link IResFetchAmuletActivityDebug}, req: {@link IReqAmuletActivityFetchDebug}
	 ** msgId: {@link ENetMessage.amuletActivityFetchDebug}
	 */
	amuletActivityFetchDebug(data?: IReqAmuletActivityFetchDebug): Promise<IResFetchAmuletActivityDebug>;
	/**
	 ** 青云之志添加护身符
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityAddEffect}
	 ** msgId: {@link ENetMessage.amuletActivityAddEffect}
	 */
	amuletActivityAddEffect(data?: IReqAmuletActivityAddEffect): Promise<IResCommon>;
	/**
	 ** 青云之志移除护身符
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityRemoveEffect}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveEffect}
	 */
	amuletActivityRemoveEffect(data?: IReqAmuletActivityRemoveEffect): Promise<IResCommon>;
	/**
	 ** 青云之志添加符文石
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityAddRuneStone}
	 ** msgId: {@link ENetMessage.amuletActivityAddRuneStone}
	 */
	amuletActivityAddRuneStone(data?: IReqAmuletActivityAddRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志移除符文石
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityRemoveRuneStone}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveRuneStone}
	 */
	amuletActivityRemoveRuneStone(data?: IReqAmuletActivityRemoveRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志移除所有护身符
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityRemoveAllEffect}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveAllEffect}
	 */
	amuletActivityRemoveAllEffect(data?: IReqAmuletActivityRemoveAllEffect): Promise<IResCommon>;
	/**
	 ** 青云之志添加所有符文石
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityAddAllRuneStone}
	 ** msgId: {@link ENetMessage.amuletActivityAddAllRuneStone}
	 */
	amuletActivityAddAllRuneStone(data?: IReqAmuletActivityAddAllRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志移除所有符文石
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityRemoveAllRuneStone}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveAllRuneStone}
	 */
	amuletActivityRemoveAllRuneStone(data?: IReqAmuletActivityRemoveAllRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志设置玩家生命值
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivitySetHp}
	 ** msgId: {@link ENetMessage.amuletActivitySetHp}
	 */
	amuletActivitySetHp(data?: IReqAmuletActivitySetHp): Promise<IResCommon>;
	/**
	 ** 青云之志修改换牌次数
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivitySetChangeTileCount}
	 ** msgId: {@link ENetMessage.amuletActivitySetChangeTileCount}
	 */
	amuletActivitySetChangeTileCount(data?: IReqAmuletActivitySetChangeTileCount): Promise<IResCommon>;
	/**
	 ** 青云之志获取debug数据
	 ** res: {@link IResFetchAmuletActivityDebugData}, req: {@link IReqAmuletActivityFetchDebugData}
	 ** msgId: {@link ENetMessage.amuletActivityFetchDebugData}
	 */
	amuletActivityFetchDebugData(data?: IReqAmuletActivityFetchDebugData): Promise<IResFetchAmuletActivityDebugData>;
	/**
	 ** 青云之志设置debug数据
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivitySetDebugData}
	 ** msgId: {@link ENetMessage.amuletActivitySetDebugData}
	 */
	amuletActivitySetDebugData(data?: IReqAmuletActivitySetDebugData): Promise<IResCommon>;
	/**
	 ** 青云之志刷新听牌列表和下一步操作
	 ** res: {@link IResCommon}, req: {@link IReqAmuletActivityRefreshTingListAndNextOperation}
	 ** msgId: {@link ENetMessage.amuletActivityRefreshTingListAndNextOperation}
	 */
	amuletActivityRefreshTingListAndNextOperation(data?: IReqAmuletActivityRefreshTingListAndNextOperation): Promise<IResCommon>;
	/**
	 ** 解锁剧情
	 ** res: {@link IResCommon}, req: {@link IReqStoryActivityUnlock}
	 ** msgId: {@link ENetMessage.storyActivityUnlock}
	 */
	storyActivityUnlock(data?: IReqStoryActivityUnlock): Promise<IResCommon>;
	/**
	 ** 解锁结局
	 ** res: {@link IResCommon}, req: {@link IReqStoryActivityUnlockEnding}
	 ** msgId: {@link ENetMessage.storyActivityUnlockEnding}
	 */
	storyActivityUnlockEnding(data?: IReqStoryActivityUnlockEnding): Promise<IResCommon>;
	/**
	 ** 领取结局奖励
	 ** res: {@link IResStoryReward}, req: {@link IReqStoryActivityReceiveEndingReward}
	 ** msgId: {@link ENetMessage.storyActivityReceiveEndingReward}
	 */
	storyActivityReceiveEndingReward(data?: IReqStoryActivityReceiveEndingReward): Promise<IResStoryReward>;
	/**
	 ** 领取剧情通关奖励（完成剧情任一结局）
	 ** res: {@link IResStoryReward}, req: {@link IReqStoryActivityReceiveFinishReward}
	 ** msgId: {@link ENetMessage.storyActivityReceiveFinishReward}
	 */
	storyActivityReceiveFinishReward(data?: IReqStoryActivityReceiveFinishReward): Promise<IResStoryReward>;
	/**
	 ** 领取剧情全通奖励（完成所有结局）
	 ** res: {@link IResStoryReward}, req: {@link IReqStoryActivityReceiveAllFinishReward}
	 ** msgId: {@link ENetMessage.storyActivityReceiveAllFinishReward}
	 */
	storyActivityReceiveAllFinishReward(data?: IReqStoryActivityReceiveAllFinishReward): Promise<IResStoryReward>;
	/**
	 ** 解锁结局并领取结局奖励
	 ** res: {@link IResStoryActivityUnlockEndingAndReceive}, req: {@link IReqStoryActivityUnlockEndingAndReceive}
	 ** msgId: {@link ENetMessage.storyActivityUnlockEndingAndReceive}
	 */
	storyActivityUnlockEndingAndReceive(data?: IReqStoryActivityUnlockEndingAndReceive): Promise<IResStoryActivityUnlockEndingAndReceive>;
	/**
	 ** 获取活动排名
	 ** res: {@link IResFetchActivityRank}, req: {@link IReqFetchActivityRank}
	 ** msgId: {@link ENetMessage.fetchActivityRank}
	 */
	fetchActivityRank(data?: IReqFetchActivityRank): Promise<IResFetchActivityRank>;
	/**
	 ** 玩家职业/主播标识开关
	 ** res: {@link IResCommon}, req: {@link IReqSetVerifiedHidden}
	 ** msgId: {@link ENetMessage.setVerifiedHidden}
	 */
	setVerifiedHidden(data?: IReqSetVerifiedHidden): Promise<IResCommon>;
	/**
	 ** 获取问卷列表
	 ** res: {@link IResFetchQuestionnaireList}, req: {@link IReqFetchQuestionnaireList}
	 ** msgId: {@link ENetMessage.fetchQuestionnaireList}
	 */
	fetchQuestionnaireList(data?: IReqFetchQuestionnaireList): Promise<IResFetchQuestionnaireList>;
	/**
	 ** 获取问卷详情
	 ** res: {@link IResFetchQuestionnaireDetail}, req: {@link IReqFetchQuestionnaireDetail}
	 ** msgId: {@link ENetMessage.fetchQuestionnaireDetail}
	 */
	fetchQuestionnaireDetail(data?: IReqFetchQuestionnaireDetail): Promise<IResFetchQuestionnaireDetail>;
	/**
	 ** 提交调查问卷结果
	 ** res: {@link IResCommon}, req: {@link IReqSubmitQuestionnaire}
	 ** msgId: {@link ENetMessage.submitQuestionnaire}
	 */
	submitQuestionnaire(data?: IReqSubmitQuestionnaire): Promise<IResCommon>;
	/**
	 ** 好友房随机机器人角色开关
	 ** res: {@link IResCommon}, req: {@link IReqSetFriendRoomRandomBotChar}
	 ** msgId: {@link ENetMessage.setFriendRoomRandomBotChar}
	 */
	setFriendRoomRandomBotChar(data?: IReqSetFriendRoomRandomBotChar): Promise<IResCommon>;
	/**
	 ** res: {@link IResFetchAccountGameHuRecords}, req: {@link IReqFetchAccountGameHuRecords}
	 ** msgId: {@link ENetMessage.fetchAccountGameHuRecords}
	 */
	fetchAccountGameHuRecords(data?: IReqFetchAccountGameHuRecords): Promise<IResFetchAccountGameHuRecords>;
	/**
	 ** res: {@link IResFetchAccountInfoExtra}, req: {@link IReqFetchAccountInfoExtra}
	 ** msgId: {@link ENetMessage.fetchAccountInfoExtra}
	 */
	fetchAccountInfoExtra(data?: IReqFetchAccountInfoExtra): Promise<IResFetchAccountInfoExtra>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqSetAccountFavoriteHu}
	 ** msgId: {@link ENetMessage.setAccountFavoriteHu}
	 */
	setAccountFavoriteHu(data?: IReqSetAccountFavoriteHu): Promise<IResCommon>;
	/**
	 ** seer 报告
	 ** res: {@link IResFetchSeerReport}, req: {@link IReqFetchSeerReport}
	 ** msgId: {@link ENetMessage.fetchSeerReport}
	 */
	fetchSeerReport(data?: IReqFetchSeerReport): Promise<IResFetchSeerReport>;
	/**
	 ** res: {@link IResCreateSeerReport}, req: {@link IReqCreateSeerReport}
	 ** msgId: {@link ENetMessage.createSeerReport}
	 */
	createSeerReport(data?: IReqCreateSeerReport): Promise<IResCreateSeerReport>;
	/**
	 ** 获取当前 seer 报告状态（只返回分析中和未过期的）
	 ** res: {@link IResFetchSeerReportList}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchSeerReportList}
	 */
	fetchSeerReportList(data?: IReqCommon): Promise<IResFetchSeerReportList>;
	/**
	 ** res: {@link IResFetchSeerInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchSeerInfo}
	 */
	fetchSeerInfo(data?: IReqCommon): Promise<IResFetchSeerInfo>;
	/**
	 ** 可选up卡池活动
	 ** res: {@link IResCommon}, req: {@link IReqSelectChestChooseUp}
	 ** msgId: {@link ENetMessage.selectChestChooseUpActivity}
	 */
	selectChestChooseUpActivity(data?: IReqSelectChestChooseUp): Promise<IResCommon>;
	/**
	 ** 可选up组活动
	 ** res: {@link IResCommon}, req: {@link IReqSelectChestChooseGroupActivity}
	 ** msgId: {@link ENetMessage.selectChestChooseGroupActivity}
	 */
	selectChestChooseGroupActivity(data?: IReqSelectChestChooseGroupActivity): Promise<IResCommon>;
	/**
	 ** 年度报告
	 ** res: {@link IResGenerateAnnualReportToken}, req: {@link IReqGenerateAnnualReportToken}
	 ** msgId: {@link ENetMessage.generateAnnualReportToken}
	 */
	generateAnnualReportToken(data?: IReqGenerateAnnualReportToken): Promise<IResGenerateAnnualReportToken>;
	/**
	 ** res: {@link IResFetchAnnualReportInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchAnnualReportInfo}
	 */
	fetchAnnualReportInfo(data?: IReqCommon): Promise<IResFetchAnnualReportInfo>;
	/**
	 ** 好友备注
	 ** res: {@link IResCommon}, req: {@link IReqRemarkFriend}
	 ** msgId: {@link ENetMessage.remarkFriend}
	 */
	remarkFriend(data?: IReqRemarkFriend): Promise<IResCommon>;
	/**
	 ** 雀斗大会
	 ** res: {@link IResSimV2ActivityFetchInfo}, req: {@link IReqSimV2ActivityFetchInfo}
	 ** msgId: {@link ENetMessage.simV2ActivityFetchInfo}
	 */
	simV2ActivityFetchInfo(data?: IReqSimV2ActivityFetchInfo): Promise<IResSimV2ActivityFetchInfo>;
	/**
	 ** res: {@link IResSimV2ActivityStartSeason}, req: {@link IReqSimV2ActivityStartSeason}
	 ** msgId: {@link ENetMessage.simV2ActivityStartSeason}
	 */
	simV2ActivityStartSeason(data?: IReqSimV2ActivityStartSeason): Promise<IResSimV2ActivityStartSeason>;
	/**
	 ** res: {@link IResSimV2ActivityTrain}, req: {@link IReqSimV2ActivityTrain}
	 ** msgId: {@link ENetMessage.simV2ActivityTrain}
	 */
	simV2ActivityTrain(data?: IReqSimV2ActivityTrain): Promise<IResSimV2ActivityTrain>;
	/**
	 ** res: {@link IResSimV2ActivitySelectEvent}, req: {@link IReqSimV2ActivitySelectEvent}
	 ** msgId: {@link ENetMessage.simV2ActivitySelectEvent}
	 */
	simV2ActivitySelectEvent(data?: IReqSimV2ActivitySelectEvent): Promise<IResSimV2ActivitySelectEvent>;
	/**
	 ** res: {@link IResSimV2ActivityStartMatch}, req: {@link IReqSimV2ActivityStartMatch}
	 ** msgId: {@link ENetMessage.simV2ActivityStartMatch}
	 */
	simV2ActivityStartMatch(data?: IReqSimV2ActivityStartMatch): Promise<IResSimV2ActivityStartMatch>;
	/**
	 ** res: {@link IResSimV2ActivityEndMatch}, req: {@link IReqSimV2ActivityEndMatch}
	 ** msgId: {@link ENetMessage.simV2ActivityEndMatch}
	 */
	simV2ActivityEndMatch(data?: IReqSimV2ActivityEndMatch): Promise<IResSimV2ActivityEndMatch>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqSimV2ActivityGiveUp}
	 ** msgId: {@link ENetMessage.simV2ActivityGiveUp}
	 */
	simV2ActivityGiveUp(data?: IReqSimV2ActivityGiveUp): Promise<IResCommon>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqSimV2ActivitySetUpgrade}
	 ** msgId: {@link ENetMessage.simV2ActivitySetUpgrade}
	 */
	simV2ActivitySetUpgrade(data?: IReqSimV2ActivitySetUpgrade): Promise<IResCommon>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** res: {@link IResCommon}, req: {@link IReqSimV2ActivityDebug}
	 ** msgId: {@link ENetMessage.simV2ActivityDebug}
	 */
	simV2ActivityDebug(data?: IReqSimV2ActivityDebug): Promise<IResCommon>;
	/**
	 ** res: {@link IResSimV2ActivityFetchDebug}, req: {@link IReqSimV2ActivityFetchDebug}
	 ** msgId: {@link ENetMessage.simV2ActivityFetchDebug}
	 */
	simV2ActivityFetchDebug(data?: IReqSimV2ActivityFetchDebug): Promise<IResSimV2ActivityFetchDebug>;
	/**
	 ** 进度奖励活动
	 ** res: {@link IResProgressRewardActivityReceive}, req: {@link IReqProgressRewardActivityReceive}
	 ** msgId: {@link ENetMessage.progressRewardActivityReceive}
	 */
	progressRewardActivityReceive(data?: IReqProgressRewardActivityReceive): Promise<IResProgressRewardActivityReceive>;
	/**
	 ** res: {@link IResFetchProgressRewardActivityInfo}, req: {@link IReqFetchProgressRewardActivityInfo}
	 ** msgId: {@link ENetMessage.fetchProgressRewardActivityInfo}
	 */
	fetchProgressRewardActivityInfo(data?: IReqFetchProgressRewardActivityInfo): Promise<IResFetchProgressRewardActivityInfo>;
	/**
	 ** 万事屋活动
	 ** res: {@link IResQuestCrewActivityStartQuest}, req: {@link IReqQuestCrewActivityStartQuest}
	 ** msgId: {@link ENetMessage.questCrewActivityStartQuest}
	 */
	questCrewActivityStartQuest(data?: IReqQuestCrewActivityStartQuest): Promise<IResQuestCrewActivityStartQuest>;
	/**
	 ** res: {@link IResQuestCrewActivityHire}, req: {@link IReqQuestCrewActivityHire}
	 ** msgId: {@link ENetMessage.questCrewActivityHire}
	 */
	questCrewActivityHire(data?: IReqQuestCrewActivityHire): Promise<IResQuestCrewActivityHire>;
	/**
	 ** res: {@link IResQuestCrewActivityFeed}, req: {@link IReqQuestCrewActivityFeed}
	 ** msgId: {@link ENetMessage.questCrewActivityFeed}
	 */
	questCrewActivityFeed(data?: IReqQuestCrewActivityFeed): Promise<IResQuestCrewActivityFeed>;
	/**
	 ** res: {@link IResQuestCrewActivityRefreshMarket}, req: {@link IReqQuestCrewActivityRefreshMarket}
	 ** msgId: {@link ENetMessage.questCrewActivityRefreshMarket}
	 */
	questCrewActivityRefreshMarket(data?: IReqQuestCrewActivityRefreshMarket): Promise<IResQuestCrewActivityRefreshMarket>;
	/**
	 ** 冰菓活动
	 ** res: {@link IResBingoActivityReceiveReward}, req: {@link IReqBingoActivityReceiveReward}
	 ** msgId: {@link ENetMessage.bingoActivityReceiveReward}
	 */
	bingoActivityReceiveReward(data?: IReqBingoActivityReceiveReward): Promise<IResBingoActivityReceiveReward>;
	/**
	 ** res: {@link IResFetchBingoActivityData}, req: {@link IReqFetchBingoActivityData}
	 ** msgId: {@link ENetMessage.fetchBingoActivityData}
	 */
	fetchBingoActivityData(data?: IReqFetchBingoActivityData): Promise<IResFetchBingoActivityData>;
	/**
	 ** 雪球活动
	 ** res: {@link IResSnowballActivityStartBattle}, req: {@link IReqSnowballActivityStartBattle}
	 ** msgId: {@link ENetMessage.snowballActivityStartBattle}
	 */
	snowballActivityStartBattle(data?: IReqSnowballActivityStartBattle): Promise<IResSnowballActivityStartBattle>;
	/**
	 ** res: {@link IResSnowballActivityFinishBattle}, req: {@link IReqSnowballActivityFinishBattle}
	 ** msgId: {@link ENetMessage.snowballActivityFinishBattle}
	 */
	snowballActivityFinishBattle(data?: IReqSnowballActivityFinishBattle): Promise<IResSnowballActivityFinishBattle>;
	/**
	 ** res: {@link IResSnowballActivityUpgrade}, req: {@link IReqSnowballActivityUpgrade}
	 ** msgId: {@link ENetMessage.snowballActivityUpgrade}
	 */
	snowballActivityUpgrade(data?: IReqSnowballActivityUpgrade): Promise<IResSnowballActivityUpgrade>;
	/**
	 ** res: {@link IResSnowballActivityReceiveReward}, req: {@link IReqSnowballActivityReceiveReward}
	 ** msgId: {@link ENetMessage.snowballActivityReceiveReward}
	 */
	snowballActivityReceiveReward(data?: IReqSnowballActivityReceiveReward): Promise<IResSnowballActivityReceiveReward>;
	/**
	 ** 获取Banner活动详细信息
	 ** res: {@link IResFetchBannerActivityData}, req: {@link IReqFetchBannerActivityData}
	 ** msgId: {@link ENetMessage.fetchBannerActivityData}
	 */
	fetchBannerActivityData(data?: IReqFetchBannerActivityData): Promise<IResFetchBannerActivityData>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** res: {@link IResCommon}, req: {@link IReqSnowballActivityDebug}
	 ** msgId: {@link ENetMessage.snowballActivityDebug}
	 */
	snowballActivityDebug(data?: IReqSnowballActivityDebug): Promise<IResCommon>;
	/**
	 ** res: {@link IResSnowballActivityFetchDebug}, req: {@link IReqSnowballActivityFetchDebug}
	 ** msgId: {@link ENetMessage.snowballActivityFetchDebug}
	 */
	snowballActivityFetchDebug(data?: IReqSnowballActivityFetchDebug): Promise<IResSnowballActivityFetchDebug>;
	/**
	 ** 马拉松活动
	 ** res: {@link IResMarathonActivityStartRace}, req: {@link IReqMarathonActivityStartRace}
	 ** msgId: {@link ENetMessage.marathonActivityStartRace}
	 */
	marathonActivityStartRace(data?: IReqMarathonActivityStartRace): Promise<IResMarathonActivityStartRace>;
	/**
	 ** res: {@link IResMarathonActivityFinishRace}, req: {@link IReqMarathonActivityFinishRace}
	 ** msgId: {@link ENetMessage.marathonActivityFinishRace}
	 */
	marathonActivityFinishRace(data?: IReqMarathonActivityFinishRace): Promise<IResMarathonActivityFinishRace>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** res: {@link IResMarathonActivityTest}, req: {@link IReqMarathonActivityTest}
	 ** msgId: {@link ENetMessage.marathonActivityTest}
	 */
	marathonActivityTest(data?: IReqMarathonActivityTest): Promise<IResMarathonActivityTest>;
	/**
	 ** mmo活动
	 ** res: {@link IResMMOActivityFetchData}, req: {@link IReqMMOActivityFetchData}
	 ** msgId: {@link ENetMessage.mmoActivityFetchData}
	 */
	mmoActivityFetchData(data?: IReqMMOActivityFetchData): Promise<IResMMOActivityFetchData>;
	/**
	 ** res: {@link IResMMOActivityEquipFusion}, req: {@link IReqMMOActivityEquipFusion}
	 ** msgId: {@link ENetMessage.mmoActivityEquipFusion}
	 */
	mmoActivityEquipFusion(data?: IReqMMOActivityEquipFusion): Promise<IResMMOActivityEquipFusion>;
	/**
	 ** res: {@link IResMMOActivitySetCharacter}, req: {@link IReqMMOActivitySetCharacter}
	 ** msgId: {@link ENetMessage.mmoActivitySetCharacter}
	 */
	mmoActivitySetCharacter(data?: IReqMMOActivitySetCharacter): Promise<IResMMOActivitySetCharacter>;
	/**
	 ** res: {@link IResMMOActivitySetTeamMember}, req: {@link IReqMMOActivitySetTeamMember}
	 ** msgId: {@link ENetMessage.mmoActivitySetTeamMember}
	 */
	mmoActivitySetTeamMember(data?: IReqMMOActivitySetTeamMember): Promise<IResMMOActivitySetTeamMember>;
	/**
	 ** res: {@link IResMMOActivityStartBattle}, req: {@link IReqMMOActivityStartBattle}
	 ** msgId: {@link ENetMessage.mmoActivityStartBattle}
	 */
	mmoActivityStartBattle(data?: IReqMMOActivityStartBattle): Promise<IResMMOActivityStartBattle>;
	/**
	 ** res: {@link IResMMOActivityFinishBattle}, req: {@link IReqMMOActivityFinishBattle}
	 ** msgId: {@link ENetMessage.mmoActivityFinishBattle}
	 */
	mmoActivityFinishBattle(data?: IReqMMOActivityFinishBattle): Promise<IResMMOActivityFinishBattle>;
	/**
	 ** res: {@link IResMMOActivitySetEquip}, req: {@link IReqMMOActivitySetEquip}
	 ** msgId: {@link ENetMessage.mmoActivitySetEquip}
	 */
	mmoActivitySetEquip(data?: IReqMMOActivitySetEquip): Promise<IResMMOActivitySetEquip>;
	/**
	 ** res: {@link IResMMOActivityUpdatehFriendList}, req: {@link IReqMMOActivityUpdatehFriendList}
	 ** msgId: {@link ENetMessage.mmoActivityUpdateFriendList}
	 */
	mmoActivityUpdateFriendList(data?: IReqMMOActivityUpdatehFriendList): Promise<IResMMOActivityUpdatehFriendList>;
	/**
	 ** res: {@link IResMMOActivityReceiveSupportReward}, req: {@link IReqMMOActivityReceiveSupportReward}
	 ** msgId: {@link ENetMessage.mmoActivityReceiveSupportReward}
	 */
	mmoActivityReceiveSupportReward(data?: IReqMMOActivityReceiveSupportReward): Promise<IResMMOActivityReceiveSupportReward>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** res: {@link IResMMOActivityDebugSetTeamCandidate}, req: {@link IReqMMOActivityDebugSetTeamCandidate}
	 ** msgId: {@link ENetMessage.mmoActivityDebugSetTeamCandidate}
	 */
	mmoActivityDebugSetTeamCandidate(data?: IReqMMOActivityDebugSetTeamCandidate): Promise<IResMMOActivityDebugSetTeamCandidate>;
	/**
	 ** 获取签到活动详情
	 ** res: {@link IResFetchDailySignActivityData}, req: {@link IReqFetchDailySignActivityData}
	 ** msgId: {@link ENetMessage.fetchDailySignActivityData}
	 */
	fetchDailySignActivityData(data?: IReqFetchDailySignActivityData): Promise<IResFetchDailySignActivityData>;
	/**
	 ** 麻将快闪店
	 ** res: {@link IResMajClubActivityFetchData}, req: {@link IReqMajClubActivityFetchData}
	 ** msgId: {@link ENetMessage.majClubActivityFetchData}
	 */
	majClubActivityFetchData(data?: IReqMajClubActivityFetchData): Promise<IResMajClubActivityFetchData>;
	/**
	 ** res: {@link IResMajClubActivityStartDay}, req: {@link IReqMajClubActivityStartDay}
	 ** msgId: {@link ENetMessage.majClubActivityStartDay}
	 */
	majClubActivityStartDay(data?: IReqMajClubActivityStartDay): Promise<IResMajClubActivityStartDay>;
	/**
	 ** res: {@link IResMajClubActivityFinishDay}, req: {@link IReqMajClubActivityFinishDay}
	 ** msgId: {@link ENetMessage.majClubActivityFinishDay}
	 */
	majClubActivityFinishDay(data?: IReqMajClubActivityFinishDay): Promise<IResMajClubActivityFinishDay>;
	/**
	 ** 解锁房间
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivityUnlockRoom}
	 ** msgId: {@link ENetMessage.majClubActivityUnlockRoom}
	 */
	majClubActivityUnlockRoom(data?: IReqMajClubActivityUnlockRoom): Promise<IResMajClubActivityCommon>;
	/**
	 ** 解锁房间麻将桌
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivityUnlockDesktop}
	 ** msgId: {@link ENetMessage.majClubActivityUnlockDesktop}
	 */
	majClubActivityUnlockDesktop(data?: IReqMajClubActivityUnlockDesktop): Promise<IResMajClubActivityCommon>;
	/**
	 ** 升级房间桌位费
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivityUpgradeRoomFee}
	 ** msgId: {@link ENetMessage.majClubActivityUpgradeRoomFee}
	 */
	majClubActivityUpgradeRoomFee(data?: IReqMajClubActivityUpgradeRoomFee): Promise<IResMajClubActivityCommon>;
	/**
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivityUpgradeCharacterPower}
	 ** msgId: {@link ENetMessage.majClubActivityUpgradeCharacterPower}
	 */
	majClubActivityUpgradeCharacterPower(data?: IReqMajClubActivityUpgradeCharacterPower): Promise<IResMajClubActivityCommon>;
	/**
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivityUpgradeCharacterTag}
	 ** msgId: {@link ENetMessage.majClubActivityUpgradeCharacterTag}
	 */
	majClubActivityUpgradeCharacterTag(data?: IReqMajClubActivityUpgradeCharacterTag): Promise<IResMajClubActivityCommon>;
	/**
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivityUpgradeWaiting}
	 ** msgId: {@link ENetMessage.majClubActivityUpgradeWaiting}
	 */
	majClubActivityUpgradeWaiting(data?: IReqMajClubActivityUpgradeWaiting): Promise<IResMajClubActivityCommon>;
	/**
	 ** res: {@link IResMajClubActivityCommon}, req: {@link IReqMajClubActivitySaveRoomData}
	 ** msgId: {@link ENetMessage.majClubActivitySaveRoomData}
	 */
	majClubActivitySaveRoomData(data?: IReqMajClubActivitySaveRoomData): Promise<IResMajClubActivityCommon>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** res: {@link IResMajClubActivityFetchDebugData}, req: {@link IReqMajClubActivityFetchDebugData}
	 ** msgId: {@link ENetMessage.majClubActivityFetchDebugData}
	 */
	majClubActivityFetchDebugData(data?: IReqMajClubActivityFetchDebugData): Promise<IResMajClubActivityFetchDebugData>;
	/**
	 ** res: {@link IResCommon}, req: {@link IReqMajClubActivityDebug}
	 ** msgId: {@link ENetMessage.majClubActivityDebug}
	 */
	majClubActivityDebug(data?: IReqMajClubActivityDebug): Promise<IResCommon>;
	/**
	 ** 首充时间范围
	 ** res: {@link IResFetchRechargeInfo}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchRechargeInfo}
	 */
	fetchRechargeInfo(data?: IReqCommon): Promise<IResFetchRechargeInfo>;
	/**
	 ** 验证游戏口令
	 ** res: {@link IResAuthGame}, req: {@link IReqAuthGame}
	 ** msgId: {@link ENetMessage.authGame}
	 */
	authGame(data?: IReqAuthGame): Promise<IResAuthGame>;
	/**
	 ** 客户端资源加载完毕，可以进入游戏
	 ** res: {@link IResEnterGame}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.enterGame}
	 */
	enterGame(data?: IReqCommon): Promise<IResEnterGame>;
	/**
	 ** 同步游戏
	 ** res: {@link IResSyncGame}, req: {@link IReqSyncGame}
	 ** msgId: {@link ENetMessage.syncGame}
	 */
	syncGame(data?: IReqSyncGame): Promise<IResSyncGame>;
	/**
	 ** 完成同步游戏
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.finishSyncGame}
	 */
	finishSyncGame(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 中断游戏（仅1个人模式有效）
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.terminateGame}
	 */
	terminateGame(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 输入基本操作
	 ** res: {@link IResCommon}, req: {@link IReqSelfOperation}
	 ** msgId: {@link ENetMessage.inputOperation}
	 */
	inputOperation(data?: IReqSelfOperation): Promise<IResCommon>;
	/**
	 ** 输入吃碰胡
	 ** res: {@link IResCommon}, req: {@link IReqChiPengGang}
	 ** msgId: {@link ENetMessage.inputChiPengGang}
	 */
	inputChiPengGang(data?: IReqChiPengGang): Promise<IResCommon>;
	/**
	 ** 确认新的回合
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.confirmNewRound}
	 */
	confirmNewRound(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 玩家游戏内广播
	 ** res: {@link IResCommon}, req: {@link IReqBroadcastInGame}
	 ** msgId: {@link ENetMessage.broadcastInGame}
	 */
	broadcastInGame(data?: IReqBroadcastInGame): Promise<IResCommon>;
	/**
	 ** 玩家游戏内Gm指令
	 ** deprecated
	 ** res: {@link IResCommon}, req: {@link IReqGMCommandInGaming}
	 ** msgId: {@link ENetMessage.inputGameGMCommand}
	 */
	inputGameGMCommand(data?: IReqGMCommandInGaming): Promise<IResCommon>;
	/**
	 ** 获取对局玩家状态
	 ** res: {@link IResGamePlayerState}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.fetchGamePlayerState}
	 */
	fetchGamePlayerState(data?: IReqCommon): Promise<IResGamePlayerState>;
	/**
	 ** 客户端定时刷新网络延迟
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.checkNetworkDelay}
	 */
	checkNetworkDelay(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 清除玩家自身的离开状态
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.clearLeaving}
	 */
	clearLeaving(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 开始投票退出游戏
	 ** res: {@link IResGameEndVote}, req: {@link IReqVoteGameEnd}
	 ** msgId: {@link ENetMessage.voteGameEnd}
	 */
	voteGameEnd(data?: IReqVoteGameEnd): Promise<IResGameEndVote>;
	/**
	 ** 实时观战验证
	 ** res: {@link IResCommon}, req: {@link IReqAuthObserve}
	 ** msgId: {@link ENetMessage.authObserve}
	 */
	authObserve(data?: IReqAuthObserve): Promise<IResCommon>;
	/**
	 ** 开始实时观战
	 ** res: {@link IResStartObserve}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.startObserve}
	 */
	startObserve(data?: IReqCommon): Promise<IResStartObserve>;
	/**
	 ** 停止实时观战
	 ** res: {@link IResCommon}, req: {@link IReqCommon}
	 ** msgId: {@link ENetMessage.stopObserve}
	 */
	stopObserve(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 主备线路功能
	 ** res: {@link IResRequestConnection}, req: {@link IReqRequestConnection}
	 ** msgId: {@link ENetMessage.requestConnection}
	 */
	requestConnection(data?: IReqRequestConnection): Promise<IResRequestConnection>;
	/**
	 ** res: {@link IResRequestRouteChange}, req: {@link IReqRequestRouteChange}
	 ** msgId: {@link ENetMessage.requestRouteChange}
	 */
	requestRouteChange(data?: IReqRequestRouteChange): Promise<IResRequestRouteChange>;
	/**
	 ** res: {@link IResHeartbeat}, req: {@link IReqHeartbeat}
	 ** msgId: {@link ENetMessage.heartbeat}
	 */
	heartbeat(data?: IReqHeartbeat): Promise<IResHeartbeat>;
}
