/** This script is generated automatically, Please do not any modify! */

declare interface IReqMethod {
	/**
	 ** 获取连接相关信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResConnectionInfo}
	 ** msgId: {@link ENetMessage.fetchConnectionInfo}
	 */
	fetchConnectionInfo(data?: IReqCommon): Promise<IResConnectionInfo>;
	/**
	 ** 获取排队信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchQueueInfo}
	 ** msgId: {@link ENetMessage.fetchQueueInfo}
	 */
	fetchQueueInfo(data?: IReqCommon): Promise<IResFetchQueueInfo>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.cancelQueue}
	 */
	cancelQueue(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqOpenidCheck}
	 ** res: {@link IResOauth2Check}
	 ** msgId: {@link ENetMessage.openidCheck}
	 */
	openidCheck(data?: IReqOpenidCheck): Promise<IResOauth2Check>;
	/**
	 ** 注册账号
	 ** req: {@link IReqSignupAccount}
	 ** res: {@link IResSignupAccount}
	 ** msgId: {@link ENetMessage.signup}
	 */
	signup(data?: IReqSignupAccount): Promise<IResSignupAccount>;
	/**
	 ** 登录账号
	 ** req: {@link IReqLogin}
	 ** res: {@link IResLogin}
	 ** msgId: {@link ENetMessage.login}
	 */
	login(data?: IReqLogin): Promise<IResLogin>;
	/**
	 ** 备线半登录状态
	 ** req: {@link IReqPrepareLogin}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.prepareLogin}
	 */
	prepareLogin(data?: IReqPrepareLogin): Promise<IResCommon>;
	/**
	 ** 备线切换主线快速登录
	 ** req: {@link IReqFastLogin}
	 ** res: {@link IResFastLogin}
	 ** msgId: {@link ENetMessage.fastLogin}
	 */
	fastLogin(data?: IReqFastLogin): Promise<IResFastLogin>;
	/**
	 ** 登录后获取信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchInfo}
	 ** msgId: {@link ENetMessage.fetchInfo}
	 */
	fetchInfo(data?: IReqCommon): Promise<IResFetchInfo>;
	/**
	 ** 登录成功后摇
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.loginSuccess}
	 */
	loginSuccess(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 获取服务器维护信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchServerMaintenanceInfo}
	 ** msgId: {@link ENetMessage.fetchServerMaintenanceInfo}
	 */
	fetchServerMaintenanceInfo(data?: IReqCommon): Promise<IResFetchServerMaintenanceInfo>;
	/**
	 ** req: {@link IReqEmailLogin}
	 ** res: {@link IResLogin}
	 ** msgId: {@link ENetMessage.emailLogin}
	 */
	emailLogin(data?: IReqEmailLogin): Promise<IResLogin>;
	/**
	 ** oauth2 方式登录授权
	 ** req: {@link IReqOauth2Auth}
	 ** res: {@link IResOauth2Auth}
	 ** msgId: {@link ENetMessage.oauth2Auth}
	 */
	oauth2Auth(data?: IReqOauth2Auth): Promise<IResOauth2Auth>;
	/**
	 ** oauth2 验证是否已经注册过账号
	 ** req: {@link IReqOauth2Check}
	 ** res: {@link IResOauth2Check}
	 ** msgId: {@link ENetMessage.oauth2Check}
	 */
	oauth2Check(data?: IReqOauth2Check): Promise<IResOauth2Check>;
	/**
	 ** oauth2 注册
	 ** req: {@link IReqOauth2Signup}
	 ** res: {@link IResOauth2Signup}
	 ** msgId: {@link ENetMessage.oauth2Signup}
	 */
	oauth2Signup(data?: IReqOauth2Signup): Promise<IResOauth2Signup>;
	/**
	 ** oauth2 登录
	 ** req: {@link IReqOauth2Login}
	 ** res: {@link IResLogin}
	 ** msgId: {@link ENetMessage.oauth2Login}
	 */
	oauth2Login(data?: IReqOauth2Login): Promise<IResLogin>;
	/**
	 ** dmm 获取登录参数
	 ** req: {@link IReqDMMPreLogin}
	 ** res: {@link IResDMMPreLogin}
	 ** msgId: {@link ENetMessage.dmmPreLogin}
	 */
	dmmPreLogin(data?: IReqDMMPreLogin): Promise<IResDMMPreLogin>;
	/**
	 ** 获取手机验证码（已登录的情况下）
	 ** req: {@link IReqCreatePhoneVerifyCode}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.createPhoneVerifyCode}
	 */
	createPhoneVerifyCode(data?: IReqCreatePhoneVerifyCode): Promise<IResCommon>;
	/**
	 ** 获取邮箱验证码
	 ** req: {@link IReqCreateEmailVerifyCode}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.createEmailVerifyCode}
	 */
	createEmailVerifyCode(data?: IReqCreateEmailVerifyCode): Promise<IResCommon>;
	/**
	 ** 验证码获取安全权限
	 ** req: {@link IReqVerifyCodeForSecure}
	 ** res: {@link IResVerfiyCodeForSecure}
	 ** msgId: {@link ENetMessage.verfifyCodeForSecure}
	 */
	verfifyCodeForSecure(data?: IReqVerifyCodeForSecure): Promise<IResVerfiyCodeForSecure>;
	/**
	 ** 绑定手机号
	 ** req: {@link IReqBindPhoneNumber}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.bindPhoneNumber}
	 */
	bindPhoneNumber(data?: IReqBindPhoneNumber): Promise<IResCommon>;
	/**
	 ** 解绑手机号
	 ** req: {@link IReqUnbindPhoneNumber}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.unbindPhoneNumber}
	 */
	unbindPhoneNumber(data?: IReqUnbindPhoneNumber): Promise<IResCommon>;
	/**
	 ** 查询已绑定手机是否有登录绑定
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchPhoneLoginBind}
	 ** msgId: {@link ENetMessage.fetchPhoneLoginBind}
	 */
	fetchPhoneLoginBind(data?: IReqCommon): Promise<IResFetchPhoneLoginBind>;
	/**
	 ** 生成手机登录绑定
	 ** req: {@link IReqCreatePhoneLoginBind}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.createPhoneLoginBind}
	 */
	createPhoneLoginBind(data?: IReqCreatePhoneLoginBind): Promise<IResCommon>;
	/**
	 ** 绑定邮箱
	 ** req: {@link IReqBindEmail}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.bindEmail}
	 */
	bindEmail(data?: IReqBindEmail): Promise<IResCommon>;
	/**
	 ** 修改密码
	 ** req: {@link IReqModifyPassword}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.modifyPassword}
	 */
	modifyPassword(data?: IReqModifyPassword): Promise<IResCommon>;
	/**
	 ** 绑定账号密码（Oauth2注册的账号使用，只有一次机会）
	 ** req: {@link IReqBindAccount}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.bindAccount}
	 */
	bindAccount(data?: IReqBindAccount): Promise<IResCommon>;
	/**
	 ** 注销账号
	 ** req: {@link IReqLogout}
	 ** res: {@link IResLogout}
	 ** msgId: {@link ENetMessage.logout}
	 */
	logout(data?: IReqLogout): Promise<IResLogout>;
	/**
	 ** 心跳
	 ** req: {@link IReqHeatBeat}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.heatbeat}
	 */
	heatbeat(data?: IReqHeatBeat): Promise<IResCommon>;
	/**
	 ** 通过Eid获取账号ID
	 ** req: {@link IReqSearchAccountByEidLobby}
	 ** res: {@link IResSearchAccountbyEidLobby}
	 ** msgId: {@link ENetMessage.searchAccountByEid}
	 */
	searchAccountByEid(data?: IReqSearchAccountByEidLobby): Promise<IResSearchAccountbyEidLobby>;
	/**
	 ** 登录心跳（用于防止第三方客户端，登录后不调用该接口无法进行匹配游戏）
	 ** req: {@link IReqLoginBeat}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.loginBeat}
	 */
	loginBeat(data?: IReqLoginBeat): Promise<IResCommon>;
	/**
	 ** 创建昵称
	 ** req: {@link IReqCreateNickname}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.createNickname}
	 */
	createNickname(data?: IReqCreateNickname): Promise<IResCommon>;
	/**
	 ** 修改昵称
	 ** req: {@link IReqModifyNickname}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.modifyNickname}
	 */
	modifyNickname(data?: IReqModifyNickname): Promise<IResCommon>;
	/**
	 ** 修改生日
	 ** req: {@link IReqModifyBirthday}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.modifyBirthday}
	 */
	modifyBirthday(data?: IReqModifyBirthday): Promise<IResCommon>;
	/**
	 ** 请求自己的房间信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResSelfRoom}
	 ** msgId: {@link ENetMessage.fetchRoom}
	 */
	fetchRoom(data?: IReqCommon): Promise<IResSelfRoom>;
	/**
	 ** 请求自己的对局信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchGamingInfo}
	 ** msgId: {@link ENetMessage.fetchGamingInfo}
	 */
	fetchGamingInfo(data?: IReqCommon): Promise<IResFetchGamingInfo>;
	/**
	 ** 创建房间
	 ** req: {@link IReqCreateRoom}
	 ** res: {@link IResCreateRoom}
	 ** msgId: {@link ENetMessage.createRoom}
	 */
	createRoom(data?: IReqCreateRoom): Promise<IResCreateRoom>;
	/**
	 ** 加入房间
	 ** req: {@link IReqJoinRoom}
	 ** res: {@link IResJoinRoom}
	 ** msgId: {@link ENetMessage.joinRoom}
	 */
	joinRoom(data?: IReqJoinRoom): Promise<IResJoinRoom>;
	/**
	 ** 离开房间
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.leaveRoom}
	 */
	leaveRoom(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 准备
	 ** req: {@link IReqRoomReady}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.readyPlay}
	 */
	readyPlay(data?: IReqRoomReady): Promise<IResCommon>;
	/**
	 ** 切换装扮状态
	 ** req: {@link IReqRoomDressing}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.dressingStatus}
	 */
	dressingStatus(data?: IReqRoomDressing): Promise<IResCommon>;
	/**
	 ** 开始
	 ** req: {@link IReqRoomStart}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.startRoom}
	 */
	startRoom(data?: IReqRoomStart): Promise<IResCommon>;
	/**
	 ** 踢出玩家
	 ** req: {@link IReqRoomKickPlayer}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.roomKickPlayer}
	 */
	roomKickPlayer(data?: IReqRoomKickPlayer): Promise<IResCommon>;
	/**
	 ** 修改房间
	 ** req: {@link IReqModifyRoom}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.modifyRoom}
	 */
	modifyRoom(data?: IReqModifyRoom): Promise<IResCommon>;
	/**
	 ** 添加好友房机器人
	 ** req: {@link IReqAddRoomRobot}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.addRoomRobot}
	 */
	addRoomRobot(data?: IReqAddRoomRobot): Promise<IResCommon>;
	/**
	 ** 加入匹配
	 ** req: {@link IReqJoinMatchQueue}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.matchGame}
	 */
	matchGame(data?: IReqJoinMatchQueue): Promise<IResCommon>;
	/**
	 ** 取消匹配
	 ** req: {@link IReqCancelMatchQueue}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.cancelMatch}
	 */
	cancelMatch(data?: IReqCancelMatchQueue): Promise<IResCommon>;
	/**
	 ** 请求账号信息
	 ** req: {@link IReqAccountInfo}
	 ** res: {@link IResAccountInfo}
	 ** msgId: {@link ENetMessage.fetchAccountInfo}
	 */
	fetchAccountInfo(data?: IReqAccountInfo): Promise<IResAccountInfo>;
	/**
	 ** 修改头像
	 ** req: {@link IReqChangeAvatar}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.changeAvatar}
	 */
	changeAvatar(data?: IReqChangeAvatar): Promise<IResCommon>;
	/**
	 ** 领取更新礼包
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.receiveVersionReward}
	 */
	receiveVersionReward(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 请求账号统计信息
	 ** req: {@link IReqAccountStatisticInfo}
	 ** res: {@link IResAccountStatisticInfo}
	 ** msgId: {@link ENetMessage.fetchAccountStatisticInfo}
	 */
	fetchAccountStatisticInfo(data?: IReqAccountStatisticInfo): Promise<IResAccountStatisticInfo>;
	/**
	 ** 获取试炼赛赛季排名信息
	 ** req: {@link IReqAccountInfo}
	 ** res: {@link IResAccountChallengeRankInfo}
	 ** msgId: {@link ENetMessage.fetchAccountChallengeRankInfo}
	 */
	fetchAccountChallengeRankInfo(data?: IReqAccountInfo): Promise<IResAccountChallengeRankInfo>;
	/**
	 ** 获取账号人物信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAccountCharacterInfo}
	 ** msgId: {@link ENetMessage.fetchAccountCharacterInfo}
	 */
	fetchAccountCharacterInfo(data?: IReqCommon): Promise<IResAccountCharacterInfo>;
	/**
	 ** 商店购买
	 ** req: {@link IReqShopPurchase}
	 ** res: {@link IResShopPurchase}
	 ** msgId: {@link ENetMessage.shopPurchase}
	 */
	shopPurchase(data?: IReqShopPurchase): Promise<IResShopPurchase>;
	/**
	 ** 获取单场牌谱记录
	 ** req: {@link IReqGameRecord}
	 ** res: {@link IResGameRecord}
	 ** msgId: {@link ENetMessage.fetchGameRecord}
	 */
	fetchGameRecord(data?: IReqGameRecord): Promise<IResGameRecord>;
	/**
	 ** 添加查看牌谱记录
	 ** req: {@link IReqGameRecord}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.readGameRecord}
	 */
	readGameRecord(data?: IReqGameRecord): Promise<IResCommon>;
	/**
	 ** 获取牌谱列表
	 ** 20240820更新之前的牌谱通过这个接口获取
	 ** req: {@link IReqGameRecordList}
	 ** res: {@link IResGameRecordList}
	 ** msgId: {@link ENetMessage.fetchGameRecordList}
	 */
	fetchGameRecordList(data?: IReqGameRecordList): Promise<IResGameRecordList>;
	/**
	 ** 获取牌谱列表V2
	 ** 202408新版牌谱功能使用（基于迭代器）
	 ** 2024.08.20 06:33 停服  07:40 国服启动
	 ** 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 ** req: {@link IReqGameRecordListV2}
	 ** res: {@link IResGameRecordListV2}
	 ** msgId: {@link ENetMessage.fetchGameRecordListV2}
	 */
	fetchGameRecordListV2(data?: IReqGameRecordListV2): Promise<IResGameRecordListV2>;
	/**
	 ** 获取后续牌谱列表内容
	 ** 基于 fetchGameRecordListV2 协议返回结果使用
	 ** 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 ** req: {@link IReqNextGameRecordList}
	 ** res: {@link IResNextGameRecordList}
	 ** msgId: {@link ENetMessage.fetchNextGameRecordList}
	 */
	fetchNextGameRecordList(data?: IReqNextGameRecordList): Promise<IResNextGameRecordList>;
	/**
	 ** 获得收藏的牌谱列表（简要信息）
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCollectedGameRecordList}
	 ** msgId: {@link ENetMessage.fetchCollectedGameRecordList}
	 */
	fetchCollectedGameRecordList(data?: IReqCommon): Promise<IResCollectedGameRecordList>;
	/**
	 ** 获取牌谱列表的详细信息
	 ** req: {@link IReqGameRecordsDetail}
	 ** res: {@link IResGameRecordsDetail}
	 ** msgId: {@link ENetMessage.fetchGameRecordsDetail}
	 */
	fetchGameRecordsDetail(data?: IReqGameRecordsDetail): Promise<IResGameRecordsDetail>;
	/**
	 ** 获取牌谱列表的详细信息 （新版）
	 ** req: {@link IReqGameRecordsDetailV2}
	 ** res: {@link IResGameRecordsDetailV2}
	 ** msgId: {@link ENetMessage.fetchGameRecordsDetailV2}
	 */
	fetchGameRecordsDetailV2(data?: IReqGameRecordsDetailV2): Promise<IResGameRecordsDetailV2>;
	/**
	 ** 添加牌谱收藏
	 ** req: {@link IReqAddCollectedGameRecord}
	 ** res: {@link IResAddCollectedGameRecord}
	 ** msgId: {@link ENetMessage.addCollectedGameRecord}
	 */
	addCollectedGameRecord(data?: IReqAddCollectedGameRecord): Promise<IResAddCollectedGameRecord>;
	/**
	 ** 移除牌谱收藏
	 ** req: {@link IReqRemoveCollectedGameRecord}
	 ** res: {@link IResRemoveCollectedGameRecord}
	 ** msgId: {@link ENetMessage.removeCollectedGameRecord}
	 */
	removeCollectedGameRecord(data?: IReqRemoveCollectedGameRecord): Promise<IResRemoveCollectedGameRecord>;
	/**
	 ** 修改牌谱备注
	 ** req: {@link IReqChangeCollectedGameRecordRemarks}
	 ** res: {@link IResChangeCollectedGameRecordRemarks}
	 ** msgId: {@link ENetMessage.changeCollectedGameRecordRemarks}
	 */
	changeCollectedGameRecordRemarks(data?: IReqChangeCollectedGameRecordRemarks): Promise<IResChangeCollectedGameRecordRemarks>;
	/**
	 ** 获取排行榜
	 ** req: {@link IReqLevelLeaderboard}
	 ** res: {@link IResLevelLeaderboard}
	 ** msgId: {@link ENetMessage.fetchLevelLeaderboard}
	 */
	fetchLevelLeaderboard(data?: IReqLevelLeaderboard): Promise<IResLevelLeaderboard>;
	/**
	 ** 获取试炼赛排行榜
	 ** req: {@link IReqChallangeLeaderboard}
	 ** res: {@link IResChallengeLeaderboard}
	 ** msgId: {@link ENetMessage.fetchChallengeLeaderboard}
	 */
	fetchChallengeLeaderboard(data?: IReqChallangeLeaderboard): Promise<IResChallengeLeaderboard>;
	/**
	 ** 获取多人试炼赛等级信息
	 ** req: {@link IReqMutiChallengeLevel}
	 ** res: {@link IResMutiChallengeLevel}
	 ** msgId: {@link ENetMessage.fetchMutiChallengeLevel}
	 */
	fetchMutiChallengeLevel(data?: IReqMutiChallengeLevel): Promise<IResMutiChallengeLevel>;
	/**
	 ** 获取多人简要信息
	 ** req: {@link IReqMultiAccountId}
	 ** res: {@link IResMultiAccountBrief}
	 ** msgId: {@link ENetMessage.fetchMultiAccountBrief}
	 */
	fetchMultiAccountBrief(data?: IReqMultiAccountId): Promise<IResMultiAccountBrief>;
	/**
	 ** 获取好友列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFriendList}
	 ** msgId: {@link ENetMessage.fetchFriendList}
	 */
	fetchFriendList(data?: IReqCommon): Promise<IResFriendList>;
	/**
	 ** 获取好友申请列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFriendApplyList}
	 ** msgId: {@link ENetMessage.fetchFriendApplyList}
	 */
	fetchFriendApplyList(data?: IReqCommon): Promise<IResFriendApplyList>;
	/**
	 ** 申请好友
	 ** req: {@link IReqApplyFriend}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.applyFriend}
	 */
	applyFriend(data?: IReqApplyFriend): Promise<IResCommon>;
	/**
	 ** 处理好友申请
	 ** req: {@link IReqHandleFriendApply}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.handleFriendApply}
	 */
	handleFriendApply(data?: IReqHandleFriendApply): Promise<IResCommon>;
	/**
	 ** 删除好友
	 ** req: {@link IReqRemoveFriend}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.removeFriend}
	 */
	removeFriend(data?: IReqRemoveFriend): Promise<IResCommon>;
	/**
	 ** 查询单个玩家
	 ** req: {@link IReqSearchAccountById}
	 ** res: {@link IResSearchAccountById}
	 ** msgId: {@link ENetMessage.searchAccountById}
	 */
	searchAccountById(data?: IReqSearchAccountById): Promise<IResSearchAccountById>;
	/**
	 ** 模糊查询玩家
	 ** req: {@link IReqSearchAccountByPattern}
	 ** res: {@link IResSearchAccountByPattern}
	 ** msgId: {@link ENetMessage.searchAccountByPattern}
	 */
	searchAccountByPattern(data?: IReqSearchAccountByPattern): Promise<IResSearchAccountByPattern>;
	/**
	 ** 查询玩家状态
	 ** req: {@link IReqAccountList}
	 ** res: {@link IResAccountStates}
	 ** msgId: {@link ENetMessage.fetchAccountState}
	 */
	fetchAccountState(data?: IReqAccountList): Promise<IResAccountStates>;
	/**
	 ** 请求背包信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResBagInfo}
	 ** msgId: {@link ENetMessage.fetchBagInfo}
	 */
	fetchBagInfo(data?: IReqCommon): Promise<IResBagInfo>;
	/**
	 ** 使用背包道具
	 ** req: {@link IReqUseBagItem}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.useBagItem}
	 */
	useBagItem(data?: IReqUseBagItem): Promise<IResCommon>;
	/**
	 ** 使用手选道具物品
	 ** req: {@link IReqOpenManualItem}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.openManualItem}
	 */
	openManualItem(data?: IReqOpenManualItem): Promise<IResCommon>;
	/**
	 ** 使用随机道具物品
	 ** req: {@link IReqOpenRandomRewardItem}
	 ** res: {@link IResOpenRandomRewardItem}
	 ** msgId: {@link ENetMessage.openRandomRewardItem}
	 */
	openRandomRewardItem(data?: IReqOpenRandomRewardItem): Promise<IResOpenRandomRewardItem>;
	/**
	 ** 使用全领礼包物品
	 ** req: {@link IReqOpenAllRewardItem}
	 ** res: {@link IResOpenAllRewardItem}
	 ** msgId: {@link ENetMessage.openAllRewardItem}
	 */
	openAllRewardItem(data?: IReqOpenAllRewardItem): Promise<IResOpenAllRewardItem>;
	/**
	 ** 合成碎片
	 ** req: {@link IReqComposeShard}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.composeShard}
	 */
	composeShard(data?: IReqComposeShard): Promise<IResCommon>;
	/**
	 ** 获取公告
	 ** req: {@link IReqFetchAnnouncement}
	 ** res: {@link IResAnnouncement}
	 ** msgId: {@link ENetMessage.fetchAnnouncement}
	 */
	fetchAnnouncement(data?: IReqFetchAnnouncement): Promise<IResAnnouncement>;
	/**
	 ** 阅读公告
	 ** req: {@link IReqReadAnnouncement}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.readAnnouncement}
	 */
	readAnnouncement(data?: IReqReadAnnouncement): Promise<IResCommon>;
	/**
	 ** 获取邮件列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResMailInfo}
	 ** msgId: {@link ENetMessage.fetchMailInfo}
	 */
	fetchMailInfo(data?: IReqCommon): Promise<IResMailInfo>;
	/**
	 ** 阅读邮件
	 ** req: {@link IReqReadMail}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.readMail}
	 */
	readMail(data?: IReqReadMail): Promise<IResCommon>;
	/**
	 ** 删除邮件
	 ** req: {@link IReqDeleteMail}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.deleteMail}
	 */
	deleteMail(data?: IReqDeleteMail): Promise<IResCommon>;
	/**
	 ** 拿取邮件附件
	 ** req: {@link IReqTakeAttachment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.takeAttachmentFromMail}
	 */
	takeAttachmentFromMail(data?: IReqTakeAttachment): Promise<IResCommon>;
	/**
	 ** 领取成就奖励
	 ** req: {@link IReqReceiveAchievementReward}
	 ** res: {@link IResReceiveAchievementReward}
	 ** msgId: {@link ENetMessage.receiveAchievementReward}
	 */
	receiveAchievementReward(data?: IReqReceiveAchievementReward): Promise<IResReceiveAchievementReward>;
	/**
	 ** 领取成就大组奖励
	 ** req: {@link IReqReceiveAchievementGroupReward}
	 ** res: {@link IResReceiveAchievementGroupReward}
	 ** msgId: {@link ENetMessage.receiveAchievementGroupReward}
	 */
	receiveAchievementGroupReward(data?: IReqReceiveAchievementGroupReward): Promise<IResReceiveAchievementGroupReward>;
	/**
	 ** 获取全服成就完成率
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchAchievementRate}
	 ** msgId: {@link ENetMessage.fetchAchievementRate}
	 */
	fetchAchievementRate(data?: IReqCommon): Promise<IResFetchAchievementRate>;
	/**
	 ** 获取成就
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAchievement}
	 ** msgId: {@link ENetMessage.fetchAchievement}
	 */
	fetchAchievement(data?: IReqCommon): Promise<IResAchievement>;
	/**
	 ** 购买试炼资格
	 ** req: {@link IReqBuyShiLian}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.buyShiLian}
	 */
	buyShiLian(data?: IReqBuyShiLian): Promise<IResCommon>;
	/**
	 ** 试炼匹配
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.matchShiLian}
	 */
	matchShiLian(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 继续下一阶段试炼
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.goNextShiLian}
	 */
	goNextShiLian(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 更新客户端数据
	 ** req: {@link IReqUpdateClientValue}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateClientValue}
	 */
	updateClientValue(data?: IReqUpdateClientValue): Promise<IResCommon>;
	/**
	 ** 获取客户端数据
	 ** req: {@link IReqCommon}
	 ** res: {@link IResClientValue}
	 ** msgId: {@link ENetMessage.fetchClientValue}
	 */
	fetchClientValue(data?: IReqCommon): Promise<IResClientValue>;
	/**
	 ** 客户端信息
	 ** req: {@link IReqClientMessage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.clientMessage}
	 */
	clientMessage(data?: IReqClientMessage): Promise<IResCommon>;
	/**
	 ** 请求当前匹配模式信息
	 ** req: {@link IReqCurrentMatchInfo}
	 ** res: {@link IResCurrentMatchInfo}
	 ** msgId: {@link ENetMessage.fetchCurrentMatchInfo}
	 */
	fetchCurrentMatchInfo(data?: IReqCurrentMatchInfo): Promise<IResCurrentMatchInfo>;
	/**
	 ** 用户举报
	 ** req: {@link IReqUserComplain}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.userComplain}
	 */
	userComplain(data?: IReqUserComplain): Promise<IResCommon>;
	/**
	 ** ------ 复活币 -------- //
	 ** 获取复活币信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResReviveCoinInfo}
	 ** msgId: {@link ENetMessage.fetchReviveCoinInfo}
	 */
	fetchReviveCoinInfo(data?: IReqCommon): Promise<IResReviveCoinInfo>;
	/**
	 ** 领取复活币
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.gainReviveCoin}
	 */
	gainReviveCoin(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 获取每日任务
	 ** req: {@link IReqCommon}
	 ** res: {@link IResDailyTask}
	 ** msgId: {@link ENetMessage.fetchDailyTask}
	 */
	fetchDailyTask(data?: IReqCommon): Promise<IResDailyTask>;
	/**
	 ** 刷新每日任务
	 ** req: {@link IReqRefreshDailyTask}
	 ** res: {@link IResRefreshDailyTask}
	 ** msgId: {@link ENetMessage.refreshDailyTask}
	 */
	refreshDailyTask(data?: IReqRefreshDailyTask): Promise<IResRefreshDailyTask>;
	/**
	 ** 使用礼品码
	 ** req: {@link IReqUseGiftCode}
	 ** res: {@link IResUseGiftCode}
	 ** msgId: {@link ENetMessage.useGiftCode}
	 */
	useGiftCode(data?: IReqUseGiftCode): Promise<IResUseGiftCode>;
	/**
	 ** 使用特殊礼品码
	 ** req: {@link IReqUseGiftCode}
	 ** res: {@link IResUseSpecialGiftCode}
	 ** msgId: {@link ENetMessage.useSpecialGiftCode}
	 */
	useSpecialGiftCode(data?: IReqUseGiftCode): Promise<IResUseSpecialGiftCode>;
	/**
	 ** 获取称号列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResTitleList}
	 ** msgId: {@link ENetMessage.fetchTitleList}
	 */
	fetchTitleList(data?: IReqCommon): Promise<IResTitleList>;
	/**
	 ** 使用称号
	 ** req: {@link IReqUseTitle}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.useTitle}
	 */
	useTitle(data?: IReqUseTitle): Promise<IResCommon>;
	/**
	 ** 发送给其他玩家自定义消息
	 ** req: {@link IReqSendClientMessage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.sendClientMessage}
	 */
	sendClientMessage(data?: IReqSendClientMessage): Promise<IResCommon>;
	/**
	 ** 获取游戏直播信息（全视角）
	 ** req: {@link IReqGameLiveInfo}
	 ** res: {@link IResGameLiveInfo}
	 ** msgId: {@link ENetMessage.fetchGameLiveInfo}
	 */
	fetchGameLiveInfo(data?: IReqGameLiveInfo): Promise<IResGameLiveInfo>;
	/**
	 ** 获取游戏直播剩余分片信息（增量）
	 ** req: {@link IReqGameLiveLeftSegment}
	 ** res: {@link IResGameLiveLeftSegment}
	 ** msgId: {@link ENetMessage.fetchGameLiveLeftSegment}
	 */
	fetchGameLiveLeftSegment(data?: IReqGameLiveLeftSegment): Promise<IResGameLiveLeftSegment>;
	/**
	 ** 获取正在直播的游戏列表
	 ** req: {@link IReqGameLiveList}
	 ** res: {@link IResGameLiveList}
	 ** msgId: {@link ENetMessage.fetchGameLiveList}
	 */
	fetchGameLiveList(data?: IReqGameLiveList): Promise<IResGameLiveList>;
	/**
	 ** 留言板设置信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommentSetting}
	 ** msgId: {@link ENetMessage.fetchCommentSetting}
	 */
	fetchCommentSetting(data?: IReqCommon): Promise<IResCommentSetting>;
	/**
	 ** 更新留言板设置
	 ** req: {@link IReqUpdateCommentSetting}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateCommentSetting}
	 */
	updateCommentSetting(data?: IReqUpdateCommentSetting): Promise<IResCommon>;
	/**
	 ** 获取留言板列表
	 ** req: {@link IReqFetchCommentList}
	 ** res: {@link IResFetchCommentList}
	 ** msgId: {@link ENetMessage.fetchCommentList}
	 */
	fetchCommentList(data?: IReqFetchCommentList): Promise<IResFetchCommentList>;
	/**
	 ** 获取留言板内容
	 ** req: {@link IReqFetchCommentContent}
	 ** res: {@link IResFetchCommentContent}
	 ** msgId: {@link ENetMessage.fetchCommentContent}
	 */
	fetchCommentContent(data?: IReqFetchCommentContent): Promise<IResFetchCommentContent>;
	/**
	 ** 发送留言
	 ** req: {@link IReqLeaveComment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.leaveComment}
	 */
	leaveComment(data?: IReqLeaveComment): Promise<IResCommon>;
	/**
	 ** 删除留言
	 ** req: {@link IReqDeleteComment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.deleteComment}
	 */
	deleteComment(data?: IReqDeleteComment): Promise<IResCommon>;
	/**
	 ** 更新留言阅读记录
	 ** req: {@link IReqUpdateReadComment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateReadComment}
	 */
	updateReadComment(data?: IReqUpdateReadComment): Promise<IResCommon>;
	/**
	 ** 获取滚动公告
	 ** req: {@link IReqFetchRollingNotice}
	 ** res: {@link IResFetchRollingNotice}
	 ** msgId: {@link ENetMessage.fetchRollingNotice}
	 */
	fetchRollingNotice(data?: IReqFetchRollingNotice): Promise<IResFetchRollingNotice>;
	/**
	 ** 获取维护公告
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchMaintainNotice}
	 ** msgId: {@link ENetMessage.fetchMaintainNotice}
	 */
	fetchMaintainNotice(data?: IReqCommon): Promise<IResFetchMaintainNotice>;
	/**
	 ** 获取服务器时间
	 ** req: {@link IReqCommon}
	 ** res: {@link IResServerTime}
	 ** msgId: {@link ENetMessage.fetchServerTime}
	 */
	fetchServerTime(data?: IReqCommon): Promise<IResServerTime>;
	/**
	 ** 获取对应平台的商品列表
	 ** req: {@link IReqPlatformBillingProducts}
	 ** res: {@link IResPlatformBillingProducts}
	 ** msgId: {@link ENetMessage.fetchPlatformProducts}
	 */
	fetchPlatformProducts(data?: IReqPlatformBillingProducts): Promise<IResPlatformBillingProducts>;
	/**
	 ** 获取角色随机池信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResRandomCharacter}
	 ** msgId: {@link ENetMessage.fetchRandomCharacter}
	 */
	fetchRandomCharacter(data?: IReqCommon): Promise<IResRandomCharacter>;
	/**
	 ** 设置随机角色池
	 ** req: {@link IReqRandomCharacter}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.setRandomCharacter}
	 */
	setRandomCharacter(data?: IReqRandomCharacter): Promise<IResCommon>;
	/**
	 ** 取消 Google Play 订单
	 ** req: {@link IReqCancelGooglePlayOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.cancelGooglePlayOrder}
	 */
	cancelGooglePlayOrder(data?: IReqCancelGooglePlayOrder): Promise<IResCommon>;
	/**
	 ** 抽宝箱
	 ** req: {@link IReqOpenChest}
	 ** res: {@link IResOpenChest}
	 ** msgId: {@link ENetMessage.openChest}
	 */
	openChest(data?: IReqOpenChest): Promise<IResOpenChest>;
	/**
	 ** 宝箱商店购买商品
	 ** req: {@link IReqBuyFromChestShop}
	 ** res: {@link IResBuyFromChestShop}
	 ** msgId: {@link ENetMessage.buyFromChestShop}
	 */
	buyFromChestShop(data?: IReqBuyFromChestShop): Promise<IResBuyFromChestShop>;
	/**
	 ** 获取每日签到信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResDailySignInInfo}
	 ** msgId: {@link ENetMessage.fetchDailySignInInfo}
	 */
	fetchDailySignInInfo(data?: IReqCommon): Promise<IResDailySignInInfo>;
	/**
	 ** 签到
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.doDailySignIn}
	 */
	doDailySignIn(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqDoActivitySignIn}
	 ** res: {@link IResDoActivitySignIn}
	 ** msgId: {@link ENetMessage.doActivitySignIn}
	 */
	doActivitySignIn(data?: IReqDoActivitySignIn): Promise<IResDoActivitySignIn>;
	/**
	 ** 获取角色信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCharacterInfo}
	 ** msgId: {@link ENetMessage.fetchCharacterInfo}
	 */
	fetchCharacterInfo(data?: IReqCommon): Promise<IResCharacterInfo>;
	/**
	 ** 更新角色排序
	 ** req: {@link IReqUpdateCharacterSort}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateCharacterSort}
	 */
	updateCharacterSort(data?: IReqUpdateCharacterSort): Promise<IResCommon>;
	/**
	 ** 切换主角色
	 ** req: {@link IReqChangeMainCharacter}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.changeMainCharacter}
	 */
	changeMainCharacter(data?: IReqChangeMainCharacter): Promise<IResCommon>;
	/**
	 ** 切换角色皮肤
	 ** req: {@link IReqChangeCharacterSkin}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.changeCharacterSkin}
	 */
	changeCharacterSkin(data?: IReqChangeCharacterSkin): Promise<IResCommon>;
	/**
	 ** 设置角色外观
	 ** req: {@link IReqChangeCharacterView}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.changeCharacterView}
	 */
	changeCharacterView(data?: IReqChangeCharacterView): Promise<IResCommon>;
	/**
	 ** 设置隐藏角色
	 ** req: {@link IReqSetHiddenCharacter}
	 ** res: {@link IResSetHiddenCharacter}
	 ** msgId: {@link ENetMessage.setHiddenCharacter}
	 */
	setHiddenCharacter(data?: IReqSetHiddenCharacter): Promise<IResSetHiddenCharacter>;
	/**
	 ** 赠送礼物给角色
	 ** req: {@link IReqSendGiftToCharacter}
	 ** res: {@link IResSendGiftToCharacter}
	 ** msgId: {@link ENetMessage.sendGiftToCharacter}
	 */
	sendGiftToCharacter(data?: IReqSendGiftToCharacter): Promise<IResSendGiftToCharacter>;
	/**
	 ** 出售道具（目前只有礼物可以出售）
	 ** req: {@link IReqSellItem}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.sellItem}
	 */
	sellItem(data?: IReqSellItem): Promise<IResCommon>;
	/**
	 ** 获取通用外观
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommonView}
	 ** msgId: {@link ENetMessage.fetchCommonView}
	 */
	fetchCommonView(data?: IReqCommon): Promise<IResCommonView>;
	/**
	 ** 切换通用外观（牌桌，牌背等）
	 ** req: {@link IReqChangeCommonView}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.changeCommonView}
	 */
	changeCommonView(data?: IReqChangeCommonView): Promise<IResCommon>;
	/**
	 ** 保存通用外观方案
	 ** req: {@link IReqSaveCommonViews}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.saveCommonViews}
	 */
	saveCommonViews(data?: IReqSaveCommonViews): Promise<IResCommon>;
	/**
	 ** 获取通用外观方案
	 ** req: {@link IReqCommonViews}
	 ** res: {@link IResCommonViews}
	 ** msgId: {@link ENetMessage.fetchCommonViews}
	 */
	fetchCommonViews(data?: IReqCommonViews): Promise<IResCommonViews>;
	/**
	 ** 获取所有通用外观方案
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAllcommonViews}
	 ** msgId: {@link ENetMessage.fetchAllCommonViews}
	 */
	fetchAllCommonViews(data?: IReqCommon): Promise<IResAllcommonViews>;
	/**
	 ** req: {@link IReqUseCommonView}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.useCommonView}
	 */
	useCommonView(data?: IReqUseCommonView): Promise<IResCommon>;
	/**
	 ** 突破角色
	 ** req: {@link IReqUpgradeCharacter}
	 ** res: {@link IResUpgradeCharacter}
	 ** msgId: {@link ENetMessage.upgradeCharacter}
	 */
	upgradeCharacter(data?: IReqUpgradeCharacter): Promise<IResUpgradeCharacter>;
	/**
	 ** ====角色传记相关====
	 ** 完成结局
	 ** req: {@link IReqFinishedEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.addFinishedEnding}
	 */
	addFinishedEnding(data?: IReqFinishedEnding): Promise<IResCommon>;
	/**
	 ** 领取结局奖励
	 ** req: {@link IReqFinishedEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.receiveEndingReward}
	 */
	receiveEndingReward(data?: IReqFinishedEnding): Promise<IResCommon>;
	/**
	 ** GM指令
	 ** req: {@link IReqGMCommand}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.gameMasterCommand}
	 */
	gameMasterCommand(data?: IReqGMCommand): Promise<IResCommon>;
	/**
	 ** 获取商店信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResShopInfo}
	 ** msgId: {@link ENetMessage.fetchShopInfo}
	 */
	fetchShopInfo(data?: IReqCommon): Promise<IResShopInfo>;
	/**
	 ** 普通商店购买
	 ** req: {@link IReqBuyFromShop}
	 ** res: {@link IResBuyFromShop}
	 ** msgId: {@link ENetMessage.buyFromShop}
	 */
	buyFromShop(data?: IReqBuyFromShop): Promise<IResBuyFromShop>;
	/**
	 ** 杂货铺购买
	 ** req: {@link IReqBuyFromZHP}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.buyFromZHP}
	 */
	buyFromZHP(data?: IReqBuyFromZHP): Promise<IResCommon>;
	/**
	 ** 刷新杂货铺商店
	 ** req: {@link IReqReshZHPShop}
	 ** res: {@link IResRefreshZHPShop}
	 ** msgId: {@link ENetMessage.refreshZHPShop}
	 */
	refreshZHPShop(data?: IReqReshZHPShop): Promise<IResRefreshZHPShop>;
	/**
	 ** 获取账号月卡信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResMonthTicketInfo}
	 ** msgId: {@link ENetMessage.fetchMonthTicketInfo}
	 */
	fetchMonthTicketInfo(data?: IReqCommon): Promise<IResMonthTicketInfo>;
	/**
	 ** 领取月卡工资
	 ** req: {@link IReqCommon}
	 ** res: {@link IResPayMonthTicket}
	 ** msgId: {@link ENetMessage.payMonthTicket}
	 */
	payMonthTicket(data?: IReqCommon): Promise<IResPayMonthTicket>;
	/**
	 ** 兑换货币
	 ** req: {@link IReqExchangeCurrency}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.exchangeCurrency}
	 */
	exchangeCurrency(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 兑换寻觅石头
	 ** req: {@link IReqExchangeCurrency}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.exchangeChestStone}
	 */
	exchangeChestStone(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 皮肤券兑换辉玉
	 ** req: {@link IReqExchangeCurrency}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.exchangeDiamond}
	 */
	exchangeDiamond(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 获取服务器设置
	 ** req: {@link IReqCommon}
	 ** res: {@link IResServerSettings}
	 ** msgId: {@link ENetMessage.fetchServerSettings}
	 */
	fetchServerSettings(data?: IReqCommon): Promise<IResServerSettings>;
	/**
	 ** 账户设置
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAccountSettings}
	 ** msgId: {@link ENetMessage.fetchAccountSettings}
	 */
	fetchAccountSettings(data?: IReqCommon): Promise<IResAccountSettings>;
	/**
	 ** 更新账号设置
	 ** req: {@link IReqUpdateAccountSettings}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateAccountSettings}
	 */
	updateAccountSettings(data?: IReqUpdateAccountSettings): Promise<IResCommon>;
	/**
	 ** 获取改名时间
	 ** req: {@link IReqCommon}
	 ** res: {@link IResModNicknameTime}
	 ** msgId: {@link ENetMessage.fetchModNicknameTime}
	 */
	fetchModNicknameTime(data?: IReqCommon): Promise<IResModNicknameTime>;
	/**
	 ** 创建微信支付（扫码支付）订单
	 ** req: {@link IReqCreateWechatNativeOrder}
	 ** res: {@link IResCreateWechatNativeOrder}
	 ** msgId: {@link ENetMessage.createWechatNativeOrder}
	 */
	createWechatNativeOrder(data?: IReqCreateWechatNativeOrder): Promise<IResCreateWechatNativeOrder>;
	/**
	 ** 创建微信支付（App支付）订单
	 ** req: {@link IReqCreateWechatAppOrder}
	 ** res: {@link IResCreateWechatAppOrder}
	 ** msgId: {@link ENetMessage.createWechatAppOrder}
	 */
	createWechatAppOrder(data?: IReqCreateWechatAppOrder): Promise<IResCreateWechatAppOrder>;
	/**
	 ** 创建支付宝（链接地址）订单
	 ** req: {@link IReqCreateAlipayOrder}
	 ** res: {@link IResCreateAlipayOrder}
	 ** msgId: {@link ENetMessage.createAlipayOrder}
	 */
	createAlipayOrder(data?: IReqCreateAlipayOrder): Promise<IResCreateAlipayOrder>;
	/**
	 ** 创建支付宝（扫码支付）订单
	 ** req: {@link IReqCreateAlipayScanOrder}
	 ** res: {@link IResCreateAlipayScanOrder}
	 ** msgId: {@link ENetMessage.createAlipayScanOrder}
	 */
	createAlipayScanOrder(data?: IReqCreateAlipayScanOrder): Promise<IResCreateAlipayScanOrder>;
	/**
	 ** 创建支付宝（App支付）订单
	 ** req: {@link IReqCreateAlipayAppOrder}
	 ** res: {@link IResCreateAlipayAppOrder}
	 ** msgId: {@link ENetMessage.createAlipayAppOrder}
	 */
	createAlipayAppOrder(data?: IReqCreateAlipayAppOrder): Promise<IResCreateAlipayAppOrder>;
	/**
	 ** 创建日服-CreditCard订单
	 ** req: {@link IReqCreateJPCreditCardOrder}
	 ** res: {@link IResCreateJPCreditCardOrder}
	 ** msgId: {@link ENetMessage.createJPCreditCardOrder}
	 */
	createJPCreditCardOrder(data?: IReqCreateJPCreditCardOrder): Promise<IResCreateJPCreditCardOrder>;
	/**
	 ** 创建日服-Paypal订单
	 ** req: {@link IReqCreateJPPaypalOrder}
	 ** res: {@link IResCreateJPPaypalOrder}
	 ** msgId: {@link ENetMessage.createJPPaypalOrder}
	 */
	createJPPaypalOrder(data?: IReqCreateJPPaypalOrder): Promise<IResCreateJPPaypalOrder>;
	/**
	 ** 创建日服-Au订单
	 ** req: {@link IReqCreateJPAuOrder}
	 ** res: {@link IResCreateJPAuOrder}
	 ** msgId: {@link ENetMessage.createJPAuOrder}
	 */
	createJPAuOrder(data?: IReqCreateJPAuOrder): Promise<IResCreateJPAuOrder>;
	/**
	 ** 创建日服-Docomo订单
	 ** req: {@link IReqCreateJPDocomoOrder}
	 ** res: {@link IResCreateJPDocomoOrder}
	 ** msgId: {@link ENetMessage.createJPDocomoOrder}
	 */
	createJPDocomoOrder(data?: IReqCreateJPDocomoOrder): Promise<IResCreateJPDocomoOrder>;
	/**
	 ** 创建日服-WebMoney订单
	 ** req: {@link IReqCreateJPWebMoneyOrder}
	 ** res: {@link IResCreateJPWebMoneyOrder}
	 ** msgId: {@link ENetMessage.createJPWebMoneyOrder}
	 */
	createJPWebMoneyOrder(data?: IReqCreateJPWebMoneyOrder): Promise<IResCreateJPWebMoneyOrder>;
	/**
	 ** 创建日服-Softbank订单
	 ** req: {@link IReqCreateJPSoftbankOrder}
	 ** res: {@link IResCreateJPSoftbankOrder}
	 ** msgId: {@link ENetMessage.createJPSoftbankOrder}
	 */
	createJPSoftbankOrder(data?: IReqCreateJPSoftbankOrder): Promise<IResCreateJPSoftbankOrder>;
	/**
	 ** 创建日服-Paypay订单
	 ** req: {@link IReqCreateJPPayPayOrder}
	 ** res: {@link IResCreateJPPayPayOrder}
	 ** msgId: {@link ENetMessage.createJPPayPayOrder}
	 */
	createJPPayPayOrder(data?: IReqCreateJPPayPayOrder): Promise<IResCreateJPPayPayOrder>;
	/**
	 ** 获取日服信用卡订单信息
	 ** req: {@link IReqFetchJPCommonCreditCardOrder}
	 ** res: {@link IResFetchJPCommonCreditCardOrder}
	 ** msgId: {@link ENetMessage.fetchJPCommonCreditCardOrder}
	 */
	fetchJPCommonCreditCardOrder(data?: IReqFetchJPCommonCreditCardOrder): Promise<IResFetchJPCommonCreditCardOrder>;
	/**
	 ** 创建日服-GMO订单
	 ** req: {@link IReqCreateJPGMOOrder}
	 ** res: {@link IResCreateJPGMOOrder}
	 ** msgId: {@link ENetMessage.createJPGMOOrder}
	 */
	createJPGMOOrder(data?: IReqCreateJPGMOOrder): Promise<IResCreateJPGMOOrder>;
	/**
	 ** 创建美服-Paypal订单
	 ** req: {@link IReqCreateENPaypalOrder}
	 ** res: {@link IResCreateENPaypalOrder}
	 ** msgId: {@link ENetMessage.createENPaypalOrder}
	 */
	createENPaypalOrder(data?: IReqCreateENPaypalOrder): Promise<IResCreateENPaypalOrder>;
	/**
	 ** 创建美服-MasterCard订单
	 ** req: {@link IReqCreateENMasterCardOrder}
	 ** res: {@link IResCreateENMasterCardOrder}
	 ** msgId: {@link ENetMessage.createENMasterCardOrder}
	 */
	createENMasterCardOrder(data?: IReqCreateENMasterCardOrder): Promise<IResCreateENMasterCardOrder>;
	/**
	 ** 创建美服-Visa订单
	 ** req: {@link IReqCreateENVisaOrder}
	 ** res: {@link IResCreateENVisaOrder}
	 ** msgId: {@link ENetMessage.createENVisaOrder}
	 */
	createENVisaOrder(data?: IReqCreateENVisaOrder): Promise<IResCreateENVisaOrder>;
	/**
	 ** 创建美服-JCB订单
	 ** req: {@link IReqCreateENJCBOrder}
	 ** res: {@link IResCreateENJCBOrder}
	 ** msgId: {@link ENetMessage.createENJCBOrder}
	 */
	createENJCBOrder(data?: IReqCreateENJCBOrder): Promise<IResCreateENJCBOrder>;
	/**
	 ** 创建美服-Alipay订单
	 ** req: {@link IReqCreateENAlipayOrder}
	 ** res: {@link IResCreateENAlipayOrder}
	 ** msgId: {@link ENetMessage.createENAlipayOrder}
	 */
	createENAlipayOrder(data?: IReqCreateENAlipayOrder): Promise<IResCreateENAlipayOrder>;
	/**
	 ** 创建韩服-Paypal订单
	 ** req: {@link IReqCreateKRPaypalOrder}
	 ** res: {@link IResCreateKRPaypalOrder}
	 ** msgId: {@link ENetMessage.createKRPaypalOrder}
	 */
	createKRPaypalOrder(data?: IReqCreateKRPaypalOrder): Promise<IResCreateKRPaypalOrder>;
	/**
	 ** 创建韩服-MasterCard订单
	 ** req: {@link IReqCreateKRMasterCardOrder}
	 ** res: {@link IResCreateKRMasterCardOrder}
	 ** msgId: {@link ENetMessage.createKRMasterCardOrder}
	 */
	createKRMasterCardOrder(data?: IReqCreateKRMasterCardOrder): Promise<IResCreateKRMasterCardOrder>;
	/**
	 ** 创建韩服-Visa订单
	 ** req: {@link IReqCreateKRVisaOrder}
	 ** res: {@link IResCreateKRVisaOrder}
	 ** msgId: {@link ENetMessage.createKRVisaOrder}
	 */
	createKRVisaOrder(data?: IReqCreateKRVisaOrder): Promise<IResCreateKRVisaOrder>;
	/**
	 ** 创建韩服-JCB订单
	 ** req: {@link IReqCreateKRJCBOrder}
	 ** res: {@link IResCreateKRJCBOrder}
	 ** msgId: {@link ENetMessage.createKRJCBOrder}
	 */
	createKRJCBOrder(data?: IReqCreateKRJCBOrder): Promise<IResCreateKRJCBOrder>;
	/**
	 ** 创建韩服-Alipay订单
	 ** req: {@link IReqCreateKRAlipayOrder}
	 ** res: {@link IResCreateKRAlipayOrder}
	 ** msgId: {@link ENetMessage.createKRAlipayOrder}
	 */
	createKRAlipayOrder(data?: IReqCreateKRAlipayOrder): Promise<IResCreateKRAlipayOrder>;
	/**
	 ** 创建DMM订单
	 ** req: {@link IReqCreateDMMOrder}
	 ** res: {@link IResCreateDmmOrder}
	 ** msgId: {@link ENetMessage.createDMMOrder}
	 */
	createDMMOrder(data?: IReqCreateDMMOrder): Promise<IResCreateDmmOrder>;
	/**
	 ** 创建苹果内购订单
	 ** req: {@link IReqCreateIAPOrder}
	 ** res: {@link IResCreateIAPOrder}
	 ** msgId: {@link ENetMessage.createIAPOrder}
	 */
	createIAPOrder(data?: IReqCreateIAPOrder): Promise<IResCreateIAPOrder>;
	/**
	 ** 创建Steam订单
	 ** req: {@link IReqCreateSteamOrder}
	 ** res: {@link IResCreateSteamOrder}
	 ** msgId: {@link ENetMessage.createSteamOrder}
	 */
	createSteamOrder(data?: IReqCreateSteamOrder): Promise<IResCreateSteamOrder>;
	/**
	 ** Steam验单
	 ** req: {@link IReqVerifySteamOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.verifySteamOrder}
	 */
	verifySteamOrder(data?: IReqVerifySteamOrder): Promise<IResCommon>;
	/**
	 ** 创建MyCard Android订单
	 ** req: {@link IReqCreateMyCardOrder}
	 ** res: {@link IResCreateMyCardOrder}
	 ** msgId: {@link ENetMessage.createMyCardAndroidOrder}
	 */
	createMyCardAndroidOrder(data?: IReqCreateMyCardOrder): Promise<IResCreateMyCardOrder>;
	/**
	 ** 创建MyCard Web订单
	 ** req: {@link IReqCreateMyCardOrder}
	 ** res: {@link IResCreateMyCardOrder}
	 ** msgId: {@link ENetMessage.createMyCardWebOrder}
	 */
	createMyCardWebOrder(data?: IReqCreateMyCardOrder): Promise<IResCreateMyCardOrder>;
	/**
	 ** 创建Paypal订单
	 ** req: {@link IReqCreatePaypalOrder}
	 ** res: {@link IResCreatePaypalOrder}
	 ** msgId: {@link ENetMessage.createPaypalOrder}
	 */
	createPaypalOrder(data?: IReqCreatePaypalOrder): Promise<IResCreatePaypalOrder>;
	/**
	 ** 创建Xsolla订单
	 ** req: {@link IReqCreateXsollaOrder}
	 ** res: {@link IResCreateXsollaOrder}
	 ** msgId: {@link ENetMessage.createXsollaOrder}
	 */
	createXsollaOrder(data?: IReqCreateXsollaOrder): Promise<IResCreateXsollaOrder>;
	/**
	 ** 创建XsollaV4订单
	 ** req: {@link IReqCreateXsollaOrder}
	 ** res: {@link IResCreateXsollaOrder}
	 ** msgId: {@link ENetMessage.createXsollaV4Order}
	 */
	createXsollaV4Order(data?: IReqCreateXsollaOrder): Promise<IResCreateXsollaOrder>;
	/**
	 ** MyCard验单
	 ** req: {@link IReqVerifyMyCardOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.verifyMyCardOrder}
	 */
	verifyMyCardOrder(data?: IReqVerifyMyCardOrder): Promise<IResCommon>;
	/**
	 ** 验证苹果内购订单
	 ** req: {@link IReqVerificationIAPOrder}
	 ** res: {@link IResVerificationIAPOrder}
	 ** msgId: {@link ENetMessage.verificationIAPOrder}
	 */
	verificationIAPOrder(data?: IReqVerificationIAPOrder): Promise<IResVerificationIAPOrder>;
	/**
	 ** 创建Yostar-SDK订单
	 ** req: {@link IReqCreateYostarOrder}
	 ** res: {@link IResCreateYostarOrder}
	 ** msgId: {@link ENetMessage.createYostarSDKOrder}
	 */
	createYostarSDKOrder(data?: IReqCreateYostarOrder): Promise<IResCreateYostarOrder>;
	/**
	 ** req: {@link IReqCreateYostarV4SDKOrder}
	 ** res: {@link IResCreateYostarV4SDKOrder}
	 ** msgId: {@link ENetMessage.createYostarV4SDKOrder}
	 */
	createYostarV4SDKOrder(data?: IReqCreateYostarV4SDKOrder): Promise<IResCreateYostarV4SDKOrder>;
	/**
	 ** 创建支付订单
	 ** req: {@link IReqCreateBillingOrder}
	 ** res: {@link IResCreateBillingOrder}
	 ** msgId: {@link ENetMessage.createBillingOrder}
	 */
	createBillingOrder(data?: IReqCreateBillingOrder): Promise<IResCreateBillingOrder>;
	/**
	 ** 处理 Google Play 订单支付结果
	 ** req: {@link IReqSolveGooglePlayOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.solveGooglePlayOrder}
	 */
	solveGooglePlayOrder(data?: IReqSolveGooglePlayOrder): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSolveGooglePlayOrderV3}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.solveGooglePayOrderV3}
	 */
	solveGooglePayOrderV3(data?: IReqSolveGooglePlayOrderV3): Promise<IResCommon>;
	/**
	 ** 处理 AA32 订单
	 ** req: {@link IReqDeliverAA32Order}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.deliverAA32Order}
	 */
	deliverAA32Order(data?: IReqDeliverAA32Order): Promise<IResCommon>;
	/**
	 ** 获取账号杂七杂八的数据
	 ** req: {@link IReqCommon}
	 ** res: {@link IResMisc}
	 ** msgId: {@link ENetMessage.fetchMisc}
	 */
	fetchMisc(data?: IReqCommon): Promise<IResMisc>;
	/**
	 ** 修改签名
	 ** req: {@link IReqModifySignature}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.modifySignature}
	 */
	modifySignature(data?: IReqModifySignature): Promise<IResCommon>;
	/**
	 ** 获取实名认证信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResIDCardInfo}
	 ** msgId: {@link ENetMessage.fetchIDCardInfo}
	 */
	fetchIDCardInfo(data?: IReqCommon): Promise<IResIDCardInfo>;
	/**
	 ** 进行实名认证
	 ** req: {@link IReqUpdateIDCardInfo}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateIDCardInfo}
	 */
	updateIDCardInfo(data?: IReqUpdateIDCardInfo): Promise<IResCommon>;
	/**
	 ** 获取vip奖励领取状态
	 ** req: {@link IReqCommon}
	 ** res: {@link IResVipReward}
	 ** msgId: {@link ENetMessage.fetchVipReward}
	 */
	fetchVipReward(data?: IReqCommon): Promise<IResVipReward>;
	/**
	 ** 领取vip奖励
	 ** req: {@link IReqGainVipReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.gainVipReward}
	 */
	gainVipReward(data?: IReqGainVipReward): Promise<IResCommon>;
	/**
	 ** 获取需要补单的订单信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchRefundOrder}
	 ** msgId: {@link ENetMessage.fetchRefundOrder}
	 */
	fetchRefundOrder(data?: IReqCommon): Promise<IResFetchRefundOrder>;
	/**
	 ** 获取赛事列表
	 ** req: {@link IReqFetchCustomizedContestList}
	 ** res: {@link IResFetchCustomizedContestList}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestList}
	 */
	fetchCustomizedContestList(data?: IReqFetchCustomizedContestList): Promise<IResFetchCustomizedContestList>;
	/**
	 ** 获取赛事权限相关信息
	 ** req: {@link IReqFetchCustomizedContestAuthInfo}
	 ** res: {@link IResFetchCustomizedContestAuthInfo}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestAuthInfo}
	 */
	fetchCustomizedContestAuthInfo(data?: IReqFetchCustomizedContestAuthInfo): Promise<IResFetchCustomizedContestAuthInfo>;
	/**
	 ** 进入赛事
	 ** req: {@link IReqEnterCustomizedContest}
	 ** res: {@link IResEnterCustomizedContest}
	 ** msgId: {@link ENetMessage.enterCustomizedContest}
	 */
	enterCustomizedContest(data?: IReqEnterCustomizedContest): Promise<IResEnterCustomizedContest>;
	/**
	 ** 退出赛事
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.leaveCustomizedContest}
	 */
	leaveCustomizedContest(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 请求比赛在线信息
	 ** req: {@link IReqFetchCustomizedContestOnlineInfo}
	 ** res: {@link IResFetchCustomizedContestOnlineInfo}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestOnlineInfo}
	 */
	fetchCustomizedContestOnlineInfo(data?: IReqFetchCustomizedContestOnlineInfo): Promise<IResFetchCustomizedContestOnlineInfo>;
	/**
	 ** 获取赛事基本信息（通过赛事ID）
	 ** req: {@link IReqFetchCustomizedContestByContestId}
	 ** res: {@link IResFetchCustomizedContestByContestId}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestByContestId}
	 */
	fetchCustomizedContestByContestId(data?: IReqFetchCustomizedContestByContestId): Promise<IResFetchCustomizedContestByContestId>;
	/**
	 ** 报名比赛
	 ** req: {@link IReqSignupCustomizedContest}
	 ** res: {@link IResSignupCustomizedContest}
	 ** msgId: {@link ENetMessage.signupCustomizedContest}
	 */
	signupCustomizedContest(data?: IReqSignupCustomizedContest): Promise<IResSignupCustomizedContest>;
	/**
	 ** 开始比赛匹配
	 ** req: {@link IReqStartCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.startCustomizedContest}
	 */
	startCustomizedContest(data?: IReqStartCustomizedContest): Promise<IResCommon>;
	/**
	 ** 停止比赛匹配
	 ** req: {@link IReqStopCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.stopCustomizedContest}
	 */
	stopCustomizedContest(data?: IReqStopCustomizedContest): Promise<IResCommon>;
	/**
	 ** 进入比赛聊天室
	 ** req: {@link IReqJoinCustomizedContestChatRoom}
	 ** res: {@link IResJoinCustomizedContestChatRoom}
	 ** msgId: {@link ENetMessage.joinCustomizedContestChatRoom}
	 */
	joinCustomizedContestChatRoom(data?: IReqJoinCustomizedContestChatRoom): Promise<IResJoinCustomizedContestChatRoom>;
	/**
	 ** 退出比赛聊天室
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.leaveCustomizedContestChatRoom}
	 */
	leaveCustomizedContestChatRoom(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 发送聊天消息
	 ** req: {@link IReqSayChatMessage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.sayChatMessage}
	 */
	sayChatMessage(data?: IReqSayChatMessage): Promise<IResCommon>;
	/**
	 ** 查询赛事牌谱列表
	 ** req: {@link IReqFetchCustomizedContestGameRecords}
	 ** res: {@link IResFetchCustomizedContestGameRecords}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestGameRecords}
	 */
	fetchCustomizedContestGameRecords(data?: IReqFetchCustomizedContestGameRecords): Promise<IResFetchCustomizedContestGameRecords>;
	/**
	 ** 获取正在直播的比赛游戏列表
	 ** req: {@link IReqFetchCustomizedContestGameLiveList}
	 ** res: {@link IResFetchCustomizedContestGameLiveList}
	 ** msgId: {@link ENetMessage.fetchCustomizedContestGameLiveList}
	 */
	fetchCustomizedContestGameLiveList(data?: IReqFetchCustomizedContestGameLiveList): Promise<IResFetchCustomizedContestGameLiveList>;
	/**
	 ** 关注自定义比赛
	 ** req: {@link IReqTargetCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.followCustomizedContest}
	 */
	followCustomizedContest(data?: IReqTargetCustomizedContest): Promise<IResCommon>;
	/**
	 ** 取消关注自定义比赛
	 ** req: {@link IReqTargetCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.unfollowCustomizedContest}
	 */
	unfollowCustomizedContest(data?: IReqTargetCustomizedContest): Promise<IResCommon>;
	/**
	 ** 获取大会室队伍排名
	 ** req: {@link IReqFetchContestTeamRank}
	 ** res: {@link IResFetchContestTeamRank}
	 ** msgId: {@link ENetMessage.fetchContestTeamRank}
	 */
	fetchContestTeamRank(data?: IReqFetchContestTeamRank): Promise<IResFetchContestTeamRank>;
	/**
	 ** 获取大会室队伍成员
	 ** req: {@link IReqFetchContestTeamMember}
	 ** res: {@link IResFetchContestTeamMember}
	 ** msgId: {@link ENetMessage.fetchContestTeamMember}
	 */
	fetchContestTeamMember(data?: IReqFetchContestTeamMember): Promise<IResFetchContestTeamMember>;
	/**
	 ** 获取大会室队伍成员排名
	 ** req: {@link IReqFetchContestTeamPlayerRank}
	 ** res: {@link IResFetchContestPlayerRank}
	 ** msgId: {@link ENetMessage.fetchContestTeamPlayerRank}
	 */
	fetchContestTeamPlayerRank(data?: IReqFetchContestTeamPlayerRank): Promise<IResFetchContestPlayerRank>;
	/**
	 ** 获取大会室玩家排名
	 ** req: {@link IReqFetchContestPlayerRank}
	 ** res: {@link IResFetchContestPlayerRank}
	 ** msgId: {@link ENetMessage.fetchContestPlayerRank}
	 */
	fetchContestPlayerRank(data?: IReqFetchContestPlayerRank): Promise<IResFetchContestPlayerRank>;
	/**
	 ** 获取活动列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResActivityList}
	 ** msgId: {@link ENetMessage.fetchActivityList}
	 */
	fetchActivityList(data?: IReqCommon): Promise<IResActivityList>;
	/**
	 ** 获取玩家活动数据
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAccountActivityData}
	 ** msgId: {@link ENetMessage.fetchAccountActivityData}
	 */
	fetchAccountActivityData(data?: IReqCommon): Promise<IResAccountActivityData>;
	/**
	 ** 兑换活动
	 ** req: {@link IReqExchangeActivityItem}
	 ** res: {@link IResExchangeActivityItem}
	 ** msgId: {@link ENetMessage.exchangeActivityItem}
	 */
	exchangeActivityItem(data?: IReqExchangeActivityItem): Promise<IResExchangeActivityItem>;
	/**
	 ** 领取活动任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completeActivityTask}
	 */
	completeActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompleteActivityTaskBatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completeActivityTaskBatch}
	 */
	completeActivityTaskBatch(data?: IReqCompleteActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 领取翻牌牌任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completeActivityFlipTask}
	 */
	completeActivityFlipTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompleteActivityFlipTaskBatch}
	 ** res: {@link IResCompleteActivityFlipTaskBatch}
	 ** msgId: {@link ENetMessage.completeActivityFlipTaskBatch}
	 */
	completeActivityFlipTaskBatch(data?: IReqCompleteActivityFlipTaskBatch): Promise<IResCompleteActivityFlipTaskBatch>;
	/**
	 ** 领取长期任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completePeriodActivityTask}
	 */
	completePeriodActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompletePeriodActivityTaskBatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completePeriodActivityTaskBatch}
	 */
	completePeriodActivityTaskBatch(data?: IReqCompletePeriodActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 领取随机任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completeRandomActivityTask}
	 */
	completeRandomActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompleteActivityTaskBatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.completeRandomActivityTaskBatch}
	 */
	completeRandomActivityTaskBatch(data?: IReqCompleteActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 翻牌牌领任务
	 ** req: {@link IReqReceiveActivityFlipTask}
	 ** res: {@link IResReceiveActivityFlipTask}
	 ** msgId: {@link ENetMessage.receiveActivityFlipTask}
	 */
	receiveActivityFlipTask(data?: IReqReceiveActivityFlipTask): Promise<IResReceiveActivityFlipTask>;
	/**
	 ** req: {@link IReqReceiveActivityFlipTaskBatch}
	 ** res: {@link IResReceiveActivityFlipTaskBatch}
	 ** msgId: {@link ENetMessage.receiveActivityFlipTaskBatch}
	 */
	receiveActivityFlipTaskBatch(data?: IReqReceiveActivityFlipTaskBatch): Promise<IResReceiveActivityFlipTaskBatch>;
	/**
	 ** 领取分段任务奖励
	 ** req: {@link IReqCompleteSegmentTaskReward}
	 ** res: {@link IResCompleteSegmentTaskReward}
	 ** msgId: {@link ENetMessage.completeSegmentTaskReward}
	 */
	completeSegmentTaskReward(data?: IReqCompleteSegmentTaskReward): Promise<IResCompleteSegmentTaskReward>;
	/**
	 ** 获取翻牌牌任务信息
	 ** req: {@link IReqFetchActivityFlipInfo}
	 ** res: {@link IResFetchActivityFlipInfo}
	 ** msgId: {@link ENetMessage.fetchActivityFlipInfo}
	 */
	fetchActivityFlipInfo(data?: IReqFetchActivityFlipInfo): Promise<IResFetchActivityFlipInfo>;
	/**
	 ** 领取得点活动奖励
	 ** req: {@link IReqGainAccumulatedPointActivityReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.gainAccumulatedPointActivityReward}
	 */
	gainAccumulatedPointActivityReward(data?: IReqGainAccumulatedPointActivityReward): Promise<IResCommon>;
	/**
	 ** 批量领取得点活动奖励
	 ** req: {@link IReqGainMultiPointActivityReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.gainMultiPointActivityReward}
	 */
	gainMultiPointActivityReward(data?: IReqGainMultiPointActivityReward): Promise<IResCommon>;
	/**
	 ** 获取得分排行榜数据
	 ** req: {@link IReqFetchRankPointLeaderboard}
	 ** res: {@link IResFetchRankPointLeaderboard}
	 ** msgId: {@link ENetMessage.fetchRankPointLeaderboard}
	 */
	fetchRankPointLeaderboard(data?: IReqFetchRankPointLeaderboard): Promise<IResFetchRankPointLeaderboard>;
	/**
	 ** 领取得分排行奖励
	 ** req: {@link IReqGainRankPointReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.gainRankPointReward}
	 */
	gainRankPointReward(data?: IReqGainRankPointReward): Promise<IResCommon>;
	/**
	 ** 大富翁投骰子
	 ** req: {@link IReqRichmanNextMove}
	 ** res: {@link IResRichmanNextMove}
	 ** msgId: {@link ENetMessage.richmanActivityNextMove}
	 */
	richmanActivityNextMove(data?: IReqRichmanNextMove): Promise<IResRichmanNextMove>;
	/**
	 ** 大富翁遥控骰子
	 ** req: {@link IReqRichmanSpecialMove}
	 ** res: {@link IResRichmanNextMove}
	 ** msgId: {@link ENetMessage.richmanAcitivitySpecialMove}
	 */
	richmanAcitivitySpecialMove(data?: IReqRichmanSpecialMove): Promise<IResRichmanNextMove>;
	/**
	 ** 大富翁宝箱信息
	 ** req: {@link IReqRichmanChestInfo}
	 ** res: {@link IResRichmanChestInfo}
	 ** msgId: {@link ENetMessage.richmanActivityChestInfo}
	 */
	richmanActivityChestInfo(data?: IReqRichmanChestInfo): Promise<IResRichmanChestInfo>;
	/**
	 ** 创建实时OB权限
	 ** req: {@link IReqCreateGameObserveAuth}
	 ** res: {@link IResCreateGameObserveAuth}
	 ** msgId: {@link ENetMessage.createGameObserveAuth}
	 */
	createGameObserveAuth(data?: IReqCreateGameObserveAuth): Promise<IResCreateGameObserveAuth>;
	/**
	 ** 刷新实时OB权限时长
	 ** req: {@link IReqRefreshGameObserveAuth}
	 ** res: {@link IResRefreshGameObserveAuth}
	 ** msgId: {@link ENetMessage.refreshGameObserveAuth}
	 */
	refreshGameObserveAuth(data?: IReqRefreshGameObserveAuth): Promise<IResRefreshGameObserveAuth>;
	/**
	 ** 获取活动buff信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResActivityBuff}
	 ** msgId: {@link ENetMessage.fetchActivityBuff}
	 */
	fetchActivityBuff(data?: IReqCommon): Promise<IResActivityBuff>;
	/**
	 ** 升级活动buff
	 ** req: {@link IReqUpgradeActivityBuff}
	 ** res: {@link IResActivityBuff}
	 ** msgId: {@link ENetMessage.upgradeActivityBuff}
	 */
	upgradeActivityBuff(data?: IReqUpgradeActivityBuff): Promise<IResActivityBuff>;
	/**
	 ** req: {@link IReqSetActivityBuff}
	 ** res: {@link IResActivityBuff}
	 ** msgId: {@link ENetMessage.setActivityBuff}
	 */
	setActivityBuff(data?: IReqSetActivityBuff): Promise<IResActivityBuff>;
	/**
	 ** 升级活动升级
	 ** req: {@link IReqUpgradeActivityLevel}
	 ** res: {@link IResUpgradeActivityLevel}
	 ** msgId: {@link ENetMessage.upgradeActivityLevel}
	 */
	upgradeActivityLevel(data?: IReqUpgradeActivityLevel): Promise<IResUpgradeActivityLevel>;
	/**
	 ** 获取总等级奖励
	 ** req: {@link IReqReceiveUpgradeActivityReward}
	 ** res: {@link IResReceiveUpgradeActivityReward}
	 ** msgId: {@link ENetMessage.receiveUpgradeActivityReward}
	 */
	receiveUpgradeActivityReward(data?: IReqReceiveUpgradeActivityReward): Promise<IResReceiveUpgradeActivityReward>;
	/**
	 ** 试炼赛升级
	 ** req: {@link IReqCommon}
	 ** res: {@link IResUpgradeChallenge}
	 ** msgId: {@link ENetMessage.upgradeChallenge}
	 */
	upgradeChallenge(data?: IReqCommon): Promise<IResUpgradeChallenge>;
	/**
	 ** 再发行
	 ** req: {@link IReqCommon}
	 ** res: {@link IResRefreshChallenge}
	 ** msgId: {@link ENetMessage.refreshChallenge}
	 */
	refreshChallenge(data?: IReqCommon): Promise<IResRefreshChallenge>;
	/**
	 ** 获取试炼赛信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchChallengeInfo}
	 ** msgId: {@link ENetMessage.fetchChallengeInfo}
	 */
	fetchChallengeInfo(data?: IReqCommon): Promise<IResFetchChallengeInfo>;
	/**
	 ** 盖章完成试炼任务
	 ** req: {@link IReqForceCompleteChallengeTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.forceCompleteChallengeTask}
	 */
	forceCompleteChallengeTask(data?: IReqForceCompleteChallengeTask): Promise<IResCommon>;
	/**
	 ** 获取当前试炼赛信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResChallengeSeasonInfo}
	 ** msgId: {@link ENetMessage.fetchChallengeSeason}
	 */
	fetchChallengeSeason(data?: IReqCommon): Promise<IResChallengeSeasonInfo>;
	/**
	 ** 获取试炼赛排名奖励
	 ** req: {@link IReqReceiveChallengeRankReward}
	 ** res: {@link IResReceiveChallengeRankReward}
	 ** msgId: {@link ENetMessage.receiveChallengeRankReward}
	 */
	receiveChallengeRankReward(data?: IReqReceiveChallengeRankReward): Promise<IResReceiveChallengeRankReward>;
	/**
	 ** AB赛
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchABMatch}
	 ** msgId: {@link ENetMessage.fetchABMatchInfo}
	 */
	fetchABMatchInfo(data?: IReqCommon): Promise<IResFetchABMatch>;
	/**
	 ** req: {@link IReqBuyInABMatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.buyInABMatch}
	 */
	buyInABMatch(data?: IReqBuyInABMatch): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.receiveABMatchReward}
	 */
	receiveABMatchReward(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.quitABMatch}
	 */
	quitABMatch(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqStartUnifiedMatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.startUnifiedMatch}
	 */
	startUnifiedMatch(data?: IReqStartUnifiedMatch): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCancelUnifiedMatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.cancelUnifiedMatch}
	 */
	cancelUnifiedMatch(data?: IReqCancelUnifiedMatch): Promise<IResCommon>;
	/**
	 ** req: {@link IReqGamePointRank}
	 ** res: {@link IResGamePointRank}
	 ** msgId: {@link ENetMessage.fetchGamePointRank}
	 */
	fetchGamePointRank(data?: IReqGamePointRank): Promise<IResGamePointRank>;
	/**
	 ** req: {@link IReqGamePointRank}
	 ** res: {@link IResFetchSelfGamePointRank}
	 ** msgId: {@link ENetMessage.fetchSelfGamePointRank}
	 */
	fetchSelfGamePointRank(data?: IReqGamePointRank): Promise<IResFetchSelfGamePointRank>;
	/**
	 ** SNS活动
	 ** req: {@link IReqReadSNS}
	 ** res: {@link IResReadSNS}
	 ** msgId: {@link ENetMessage.readSNS}
	 */
	readSNS(data?: IReqReadSNS): Promise<IResReadSNS>;
	/**
	 ** req: {@link IReqReplySNS}
	 ** res: {@link IResReplySNS}
	 ** msgId: {@link ENetMessage.replySNS}
	 */
	replySNS(data?: IReqReplySNS): Promise<IResReplySNS>;
	/**
	 ** req: {@link IReqLikeSNS}
	 ** res: {@link IResLikeSNS}
	 ** msgId: {@link ENetMessage.likeSNS}
	 */
	likeSNS(data?: IReqLikeSNS): Promise<IResLikeSNS>;
	/**
	 ** 挖矿活动
	 ** req: {@link IReqDigMine}
	 ** res: {@link IResDigMine}
	 ** msgId: {@link ENetMessage.digMine}
	 */
	digMine(data?: IReqDigMine): Promise<IResDigMine>;
	/**
	 ** 用户协议
	 ** req: {@link IReqFetchLastPrivacy}
	 ** res: {@link IResFetchLastPrivacy}
	 ** msgId: {@link ENetMessage.fetchLastPrivacy}
	 */
	fetchLastPrivacy(data?: IReqFetchLastPrivacy): Promise<IResFetchLastPrivacy>;
	/**
	 ** req: {@link IReqCheckPrivacy}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.checkPrivacy}
	 */
	checkPrivacy(data?: IReqCheckPrivacy): Promise<IResCommon>;
	/**
	 ** rpg活动
	 ** req: {@link IReqFetchRPGBattleHistory}
	 ** res: {@link IResFetchRPGBattleHistory}
	 ** msgId: {@link ENetMessage.fetchRPGBattleHistory}
	 */
	fetchRPGBattleHistory(data?: IReqFetchRPGBattleHistory): Promise<IResFetchRPGBattleHistory>;
	/**
	 ** req: {@link IReqFetchRPGBattleHistory}
	 ** res: {@link IResFetchRPGBattleHistoryV2}
	 ** msgId: {@link ENetMessage.fetchRPGBattleHistoryV2}
	 */
	fetchRPGBattleHistoryV2(data?: IReqFetchRPGBattleHistory): Promise<IResFetchRPGBattleHistoryV2>;
	/**
	 ** req: {@link IReqReceiveRPGRewards}
	 ** res: {@link IResReceiveRPGRewards}
	 ** msgId: {@link ENetMessage.receiveRPGRewards}
	 */
	receiveRPGRewards(data?: IReqReceiveRPGRewards): Promise<IResReceiveRPGRewards>;
	/**
	 ** req: {@link IReqReceiveRPGReward}
	 ** res: {@link IResReceiveRPGRewards}
	 ** msgId: {@link ENetMessage.receiveRPGReward}
	 */
	receiveRPGReward(data?: IReqReceiveRPGReward): Promise<IResReceiveRPGRewards>;
	/**
	 ** 竞技场活动
	 ** req: {@link IReqBuyArenaTicket}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.buyArenaTicket}
	 */
	buyArenaTicket(data?: IReqBuyArenaTicket): Promise<IResCommon>;
	/**
	 ** req: {@link IReqEnterArena}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.enterArena}
	 */
	enterArena(data?: IReqEnterArena): Promise<IResCommon>;
	/**
	 ** req: {@link IReqArenaReward}
	 ** res: {@link IResArenaReward}
	 ** msgId: {@link ENetMessage.receiveArenaReward}
	 */
	receiveArenaReward(data?: IReqArenaReward): Promise<IResArenaReward>;
	/**
	 ** 观战
	 ** req: {@link IReqFetchOBToken}
	 ** res: {@link IResFetchOBToken}
	 ** msgId: {@link ENetMessage.fetchOBToken}
	 */
	fetchOBToken(data?: IReqFetchOBToken): Promise<IResFetchOBToken>;
	/**
	 ** 角色好感度
	 ** req: {@link IReqReceiveCharacterRewards}
	 ** res: {@link IResReceiveCharacterRewards}
	 ** msgId: {@link ENetMessage.receiveCharacterRewards}
	 */
	receiveCharacterRewards(data?: IReqReceiveCharacterRewards): Promise<IResReceiveCharacterRewards>;
	/**
	 ** 喂年兽活动 -> 已经拆分成 friend-gift 与 upgrade 活动，这个协议不再使用
	 ** req: {@link IReqFeedActivityFeed}
	 ** res: {@link IResFeedActivityFeed}
	 ** msgId: {@link ENetMessage.feedActivityFeed}
	 */
	feedActivityFeed(data?: IReqFeedActivityFeed): Promise<IResFeedActivityFeed>;
	/**
	 ** 送礼活动
	 ** req: {@link IReqSendActivityGiftToFriend}
	 ** res: {@link IResSendActivityGiftToFriend}
	 ** msgId: {@link ENetMessage.sendActivityGiftToFriend}
	 */
	sendActivityGiftToFriend(data?: IReqSendActivityGiftToFriend): Promise<IResSendActivityGiftToFriend>;
	/**
	 ** req: {@link IReqReceiveActivityGift}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.receiveActivityGift}
	 */
	receiveActivityGift(data?: IReqReceiveActivityGift): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveAllActivityGift}
	 ** res: {@link IResReceiveAllActivityGift}
	 ** msgId: {@link ENetMessage.receiveAllActivityGift}
	 */
	receiveAllActivityGift(data?: IReqReceiveAllActivityGift): Promise<IResReceiveAllActivityGift>;
	/**
	 ** req: {@link IReqFetchFriendGiftActivityData}
	 ** res: {@link IResFetchFriendGiftActivityData}
	 ** msgId: {@link ENetMessage.fetchFriendGiftActivityData}
	 */
	fetchFriendGiftActivityData(data?: IReqFetchFriendGiftActivityData): Promise<IResFetchFriendGiftActivityData>;
	/**
	 ** 自选卡池
	 ** req: {@link IReqOpenPreChestItem}
	 ** res: {@link IResOpenPreChestItem}
	 ** msgId: {@link ENetMessage.openPreChestItem}
	 */
	openPreChestItem(data?: IReqOpenPreChestItem): Promise<IResOpenPreChestItem>;
	/**
	 ** 投票活动
	 ** req: {@link IReqFetchVoteActivity}
	 ** res: {@link IResFetchVoteActivity}
	 ** msgId: {@link ENetMessage.fetchVoteActivity}
	 */
	fetchVoteActivity(data?: IReqFetchVoteActivity): Promise<IResFetchVoteActivity>;
	/**
	 ** req: {@link IReqVoteActivity}
	 ** res: {@link IResVoteActivity}
	 ** msgId: {@link ENetMessage.voteActivity}
	 */
	voteActivity(data?: IReqVoteActivity): Promise<IResVoteActivity>;
	/**
	 ** 剧情活动
	 ** req: {@link IReqUnlockActivitySpot}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.unlockActivitySpot}
	 */
	unlockActivitySpot(data?: IReqUnlockActivitySpot): Promise<IResCommon>;
	/**
	 ** req: {@link IReqUnlockActivitySpotEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.unlockActivitySpotEnding}
	 */
	unlockActivitySpotEnding(data?: IReqUnlockActivitySpotEnding): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveActivitySpotReward}
	 ** res: {@link IResReceiveActivitySpotReward}
	 ** msgId: {@link ENetMessage.receiveActivitySpotReward}
	 */
	receiveActivitySpotReward(data?: IReqReceiveActivitySpotReward): Promise<IResReceiveActivitySpotReward>;
	/**
	 ** 删除账号接口
	 ** req: {@link IReqCommon}
	 ** res: {@link IResDeleteAccount}
	 ** msgId: {@link ENetMessage.deleteAccount}
	 */
	deleteAccount(data?: IReqCommon): Promise<IResDeleteAccount>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.cancelDeleteAccount}
	 */
	cancelDeleteAccount(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqLogReport}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.logReport}
	 */
	logReport(data?: IReqLogReport): Promise<IResCommon>;
	/**
	 ** oauth2
	 ** req: {@link IReqBindOauth2}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.bindOauth2}
	 */
	bindOauth2(data?: IReqBindOauth2): Promise<IResCommon>;
	/**
	 ** req: {@link IReqFetchOauth2}
	 ** res: {@link IResFetchOauth2}
	 ** msgId: {@link ENetMessage.fetchOauth2Info}
	 */
	fetchOauth2Info(data?: IReqFetchOauth2): Promise<IResFetchOauth2>;
	/**
	 ** loading图
	 ** req: {@link IReqSetLoadingImage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.setLoadingImage}
	 */
	setLoadingImage(data?: IReqSetLoadingImage): Promise<IResCommon>;
	/**
	 ** 获取商店信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchShopInterval}
	 ** msgId: {@link ENetMessage.fetchShopInterval}
	 */
	fetchShopInterval(data?: IReqCommon): Promise<IResFetchShopInterval>;
	/**
	 ** 获取活动轮换信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchActivityInterval}
	 ** msgId: {@link ENetMessage.fetchActivityInterval}
	 */
	fetchActivityInterval(data?: IReqCommon): Promise<IResFetchActivityInterval>;
	/**
	 ** 获取最近对战玩家
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchrecentFriend}
	 ** msgId: {@link ENetMessage.fetchRecentFriend}
	 */
	fetchRecentFriend(data?: IReqCommon): Promise<IResFetchrecentFriend>;
	/**
	 ** 扭蛋活动
	 ** req: {@link IReqOpenGacha}
	 ** res: {@link IResOpenGacha}
	 ** msgId: {@link ENetMessage.openGacha}
	 */
	openGacha(data?: IReqOpenGacha): Promise<IResOpenGacha>;
	/**
	 ** 前端完成任务
	 ** req: {@link IReqTaskRequest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.taskRequest}
	 */
	taskRequest(data?: IReqTaskRequest): Promise<IResCommon>;
	/**
	 ** 悠星删除账号请求
	 ** req: {@link IReqYostarDeleteAccount}
	 ** res: {@link IResYostarDeleteAccount}
	 ** msgId: {@link ENetMessage.yostarDeleteAccount}
	 */
	yostarDeleteAccount(data?: IReqYostarDeleteAccount): Promise<IResYostarDeleteAccount>;
	/**
	 ** 养成活动
	 ** req: {@link IReqSimulationActivityTrain}
	 ** res: {@link IResSimulationActivityTrain}
	 ** msgId: {@link ENetMessage.simulationActivityTrain}
	 */
	simulationActivityTrain(data?: IReqSimulationActivityTrain): Promise<IResSimulationActivityTrain>;
	/**
	 ** req: {@link IReqFetchSimulationGameRecord}
	 ** res: {@link IResFetchSimulationGameRecord}
	 ** msgId: {@link ENetMessage.fetchSimulationGameRecord}
	 */
	fetchSimulationGameRecord(data?: IReqFetchSimulationGameRecord): Promise<IResFetchSimulationGameRecord>;
	/**
	 ** req: {@link IReqStartSimulationActivityGame}
	 ** res: {@link IResStartSimulationActivityGame}
	 ** msgId: {@link ENetMessage.startSimulationActivityGame}
	 */
	startSimulationActivityGame(data?: IReqStartSimulationActivityGame): Promise<IResStartSimulationActivityGame>;
	/**
	 ** req: {@link IReqFetchSimulationGameRank}
	 ** res: {@link IResFetchSimulationGameRank}
	 ** msgId: {@link ENetMessage.fetchSimulationGameRank}
	 */
	fetchSimulationGameRank(data?: IReqFetchSimulationGameRank): Promise<IResFetchSimulationGameRank>;
	/**
	 ** 合成活动
	 ** req: {@link IReqGenerateCombiningCraft}
	 ** res: {@link IResGenerateCombiningCraft}
	 ** msgId: {@link ENetMessage.generateCombiningCraft}
	 */
	generateCombiningCraft(data?: IReqGenerateCombiningCraft): Promise<IResGenerateCombiningCraft>;
	/**
	 ** req: {@link IReqMoveCombiningCraft}
	 ** res: {@link IResMoveCombiningCraft}
	 ** msgId: {@link ENetMessage.moveCombiningCraft}
	 */
	moveCombiningCraft(data?: IReqMoveCombiningCraft): Promise<IResMoveCombiningCraft>;
	/**
	 ** req: {@link IReqCombiningRecycleCraft}
	 ** res: {@link IResCombiningRecycleCraft}
	 ** msgId: {@link ENetMessage.combiningRecycleCraft}
	 */
	combiningRecycleCraft(data?: IReqCombiningRecycleCraft): Promise<IResCombiningRecycleCraft>;
	/**
	 ** req: {@link IReqRecoverCombiningRecycle}
	 ** res: {@link IResRecoverCombiningRecycle}
	 ** msgId: {@link ENetMessage.recoverCombiningRecycle}
	 */
	recoverCombiningRecycle(data?: IReqRecoverCombiningRecycle): Promise<IResRecoverCombiningRecycle>;
	/**
	 ** req: {@link IReqFinishCombiningOrder}
	 ** res: {@link IResFinishCombiningOrder}
	 ** msgId: {@link ENetMessage.finishCombiningOrder}
	 */
	finishCombiningOrder(data?: IReqFinishCombiningOrder): Promise<IResFinishCombiningOrder>;
	/**
	 ** 小村活动
	 ** req: {@link IReqUpgradeVillageBuilding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.upgradeVillageBuilding}
	 */
	upgradeVillageBuilding(data?: IReqUpgradeVillageBuilding): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveVillageBuildingReward}
	 ** res: {@link IResReceiveVillageBuildingReward}
	 ** msgId: {@link ENetMessage.receiveVillageBuildingReward}
	 */
	receiveVillageBuildingReward(data?: IReqReceiveVillageBuildingReward): Promise<IResReceiveVillageBuildingReward>;
	/**
	 ** req: {@link IReqStartVillageTrip}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.startVillageTrip}
	 */
	startVillageTrip(data?: IReqStartVillageTrip): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveVillageTripReward}
	 ** res: {@link IResReceiveVillageTripReward}
	 ** msgId: {@link ENetMessage.receiveVillageTripReward}
	 */
	receiveVillageTripReward(data?: IReqReceiveVillageTripReward): Promise<IResReceiveVillageTripReward>;
	/**
	 ** req: {@link IReqCompleteVillageTask}
	 ** res: {@link IResCompleteVillageTask}
	 ** msgId: {@link ENetMessage.completeVillageTask}
	 */
	completeVillageTask(data?: IReqCompleteVillageTask): Promise<IResCompleteVillageTask>;
	/**
	 ** req: {@link IReqGetFriendVillageData}
	 ** res: {@link IResGetFriendVillageData}
	 ** msgId: {@link ENetMessage.getFriendVillageData}
	 */
	getFriendVillageData(data?: IReqGetFriendVillageData): Promise<IResGetFriendVillageData>;
	/**
	 ** req: {@link IReqSetVillageWorker}
	 ** res: {@link IResSetVillageWorker}
	 ** msgId: {@link ENetMessage.setVillageWorker}
	 */
	setVillageWorker(data?: IReqSetVillageWorker): Promise<IResSetVillageWorker>;
	/**
	 ** 下一个丰收季
	 ** req: {@link IReqNextRoundVillage}
	 ** res: {@link IResNextRoundVillage}
	 ** msgId: {@link ENetMessage.nextRoundVillage}
	 */
	nextRoundVillage(data?: IReqNextRoundVillage): Promise<IResNextRoundVillage>;
	/**
	 ** 射击活动
	 ** req: {@link IReqShootActivityAttackEnemies}
	 ** res: {@link IResShootActivityAttackEnemies}
	 ** msgId: {@link ENetMessage.shootActivityAttackEnemies}
	 */
	shootActivityAttackEnemies(data?: IReqShootActivityAttackEnemies): Promise<IResShootActivityAttackEnemies>;
	/**
	 ** 庆典活动
	 ** req: {@link IReqResolveFestivalActivityProposal}
	 ** res: {@link IResResolveFestivalActivityProposal}
	 ** msgId: {@link ENetMessage.resolveFestivalActivityProposal}
	 */
	resolveFestivalActivityProposal(data?: IReqResolveFestivalActivityProposal): Promise<IResResolveFestivalActivityProposal>;
	/**
	 ** req: {@link IReqResolveFestivalActivityEvent}
	 ** res: {@link IResResolveFestivalActivityEvent}
	 ** msgId: {@link ENetMessage.resolveFestivalActivityEvent}
	 */
	resolveFestivalActivityEvent(data?: IReqResolveFestivalActivityEvent): Promise<IResResolveFestivalActivityEvent>;
	/**
	 ** req: {@link IReqBuyFestivalProposal}
	 ** res: {@link IResBuyFestivalProposal}
	 ** msgId: {@link ENetMessage.buyFestivalProposal}
	 */
	buyFestivalProposal(data?: IReqBuyFestivalProposal): Promise<IResBuyFestivalProposal>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqFestivalFetchDebug}
	 ** res: {@link IResFestivalFetchDebug}
	 ** msgId: {@link ENetMessage.festivalActivityFetchDebug}
	 */
	festivalActivityFetchDebug(data?: IReqFestivalFetchDebug): Promise<IResFestivalFetchDebug>;
	/**
	 ** req: {@link IReqFestivalDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.festivalActivityDebug}
	 */
	festivalActivityDebug(data?: IReqFestivalDebug): Promise<IResCommon>;
	/**
	 ** 海岛活动
	 ** req: {@link IReqIslandActivityMove}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.islandActivityMove}
	 */
	islandActivityMove(data?: IReqIslandActivityMove): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivityBuy}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.islandActivityBuy}
	 */
	islandActivityBuy(data?: IReqIslandActivityBuy): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivitySell}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.islandActivitySell}
	 */
	islandActivitySell(data?: IReqIslandActivitySell): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivityTidyBag}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.islandActivityTidyBag}
	 */
	islandActivityTidyBag(data?: IReqIslandActivityTidyBag): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivityUnlockBagGrid}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.islandActivityUnlockBagGrid}
	 */
	islandActivityUnlockBagGrid(data?: IReqIslandActivityUnlockBagGrid): Promise<IResCommon>;
	/**
	 ** 大会室管理相关
	 ** req: {@link IReqCreateCustomizedContest}
	 ** res: {@link IResCreateCustomizedContest}
	 ** msgId: {@link ENetMessage.createCustomizedContest}
	 */
	createCustomizedContest(data?: IReqCreateCustomizedContest): Promise<IResCreateCustomizedContest>;
	/**
	 ** req: {@link IReqFetchmanagerCustomizedContestList}
	 ** res: {@link IResFetchManagerCustomizedContestList}
	 ** msgId: {@link ENetMessage.fetchManagerCustomizedContestList}
	 */
	fetchManagerCustomizedContestList(data?: IReqFetchmanagerCustomizedContestList): Promise<IResFetchManagerCustomizedContestList>;
	/**
	 ** req: {@link IReqFetchManagerCustomizedContest}
	 ** res: {@link IResFetchManagerCustomizedContest}
	 ** msgId: {@link ENetMessage.fetchManagerCustomizedContest}
	 */
	fetchManagerCustomizedContest(data?: IReqFetchManagerCustomizedContest): Promise<IResFetchManagerCustomizedContest>;
	/**
	 ** req: {@link IReqUpdateManagerCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.updateManagerCustomizedContest}
	 */
	updateManagerCustomizedContest(data?: IReqUpdateManagerCustomizedContest): Promise<IResCommon>;
	/**
	 ** req: {@link IReqFetchReadyPlayerList}
	 ** res: {@link IResFetchReadyPlayerList}
	 ** msgId: {@link ENetMessage.fetchReadyPlayerList}
	 */
	fetchReadyPlayerList(data?: IReqFetchReadyPlayerList): Promise<IResFetchReadyPlayerList>;
	/**
	 ** req: {@link IReqCreateGamePlan}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.createGamePlan}
	 */
	createGamePlan(data?: IReqCreateGamePlan): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResGenerateContestManagerLoginCode}
	 ** msgId: {@link ENetMessage.generateContestManagerLoginCode}
	 */
	generateContestManagerLoginCode(data?: IReqCommon): Promise<IResGenerateContestManagerLoginCode>;
	/**
	 ** 获取青云之志活动数据
	 ** req: {@link IReqFetchAmuletActivityData}
	 ** res: {@link IResFetchAmuletActivityData}
	 ** msgId: {@link ENetMessage.fetchAmuletActivityData}
	 */
	fetchAmuletActivityData(data?: IReqFetchAmuletActivityData): Promise<IResFetchAmuletActivityData>;
	/**
	 ** 获取挑战任务与收藏数据
	 ** req: {@link IReqAmuletActivityFetchBrief}
	 ** res: {@link IResAmuletActivityFetchBrief}
	 ** msgId: {@link ENetMessage.amuletActivityFetchBrief}
	 */
	amuletActivityFetchBrief(data?: IReqAmuletActivityFetchBrief): Promise<IResAmuletActivityFetchBrief>;
	/**
	 ** 开始游戏
	 ** req: {@link IReqAmuletActivityStartGame}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link ENetMessage.amuletActivityStartGame}
	 */
	amuletActivityStartGame(data?: IReqAmuletActivityStartGame): Promise<IResAmuletEventResponse>;
	/**
	 ** 换牌/打牌/开杠/和牌/模切/结束换牌 操作
	 ** req: {@link IReqAmuletActivityGameOperate}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link ENetMessage.amuletActivityGameOperate}
	 */
	amuletActivityGameOperate(data?: IReqAmuletActivityGameOperate): Promise<IResAmuletEventResponse>;
	/**
	 ** 对局外的其他操作
	 ** req: {@link IReqAmuletActivityOperate}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link ENetMessage.amuletActivityOperate}
	 */
	amuletActivityOperate(data?: IReqAmuletActivityOperate): Promise<IResAmuletEventResponse>;
	/**
	 ** 放弃当前对局
	 ** req: {@link IReqAmuletActivityGiveup}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityGiveup}
	 */
	amuletActivityGiveup(data?: IReqAmuletActivityGiveup): Promise<IResCommon>;
	/**
	 ** 设置场外增强
	 ** req: {@link IReqAmuletActivitySetSkillLevel}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivitySetSkillLevel}
	 */
	amuletActivitySetSkillLevel(data?: IReqAmuletActivitySetSkillLevel): Promise<IResCommon>;
	/**
	 ** 获取青云之志维护信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAmuletActivityMaintainInfo}
	 ** msgId: {@link ENetMessage.amuletActivityMaintainInfo}
	 */
	amuletActivityMaintainInfo(data?: IReqCommon): Promise<IResAmuletActivityMaintainInfo>;
	/**
	 ** 设置青云之志钦定护身符
	 ** req: {@link IReqAmuletActivitySelectBookEffect}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivitySelectBookEffect}
	 */
	amuletActivitySelectBookEffect(data?: IReqAmuletActivitySelectBookEffect): Promise<IResCommon>;
	/**
	 ** 设置青云之志完整数据
	 ** req: {@link IReqAmuletActivityDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityDebug}
	 */
	amuletActivityDebug(data?: IReqAmuletActivityDebug): Promise<IResCommon>;
	/**
	 ** 获取青云之志完整数据
	 ** req: {@link IReqAmuletActivityFetchDebug}
	 ** res: {@link IResFetchAmuletActivityDebug}
	 ** msgId: {@link ENetMessage.amuletActivityFetchDebug}
	 */
	amuletActivityFetchDebug(data?: IReqAmuletActivityFetchDebug): Promise<IResFetchAmuletActivityDebug>;
	/**
	 ** 青云之志添加护身符
	 ** req: {@link IReqAmuletActivityAddEffect}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityAddEffect}
	 */
	amuletActivityAddEffect(data?: IReqAmuletActivityAddEffect): Promise<IResCommon>;
	/**
	 ** 青云之志移除护身符
	 ** req: {@link IReqAmuletActivityRemoveEffect}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveEffect}
	 */
	amuletActivityRemoveEffect(data?: IReqAmuletActivityRemoveEffect): Promise<IResCommon>;
	/**
	 ** 青云之志添加符文石
	 ** req: {@link IReqAmuletActivityAddRuneStone}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityAddRuneStone}
	 */
	amuletActivityAddRuneStone(data?: IReqAmuletActivityAddRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志移除符文石
	 ** req: {@link IReqAmuletActivityRemoveRuneStone}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveRuneStone}
	 */
	amuletActivityRemoveRuneStone(data?: IReqAmuletActivityRemoveRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志移除所有护身符
	 ** req: {@link IReqAmuletActivityRemoveAllEffect}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveAllEffect}
	 */
	amuletActivityRemoveAllEffect(data?: IReqAmuletActivityRemoveAllEffect): Promise<IResCommon>;
	/**
	 ** 青云之志添加所有符文石
	 ** req: {@link IReqAmuletActivityAddAllRuneStone}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityAddAllRuneStone}
	 */
	amuletActivityAddAllRuneStone(data?: IReqAmuletActivityAddAllRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志移除所有符文石
	 ** req: {@link IReqAmuletActivityRemoveAllRuneStone}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityRemoveAllRuneStone}
	 */
	amuletActivityRemoveAllRuneStone(data?: IReqAmuletActivityRemoveAllRuneStone): Promise<IResCommon>;
	/**
	 ** 青云之志设置玩家生命值
	 ** req: {@link IReqAmuletActivitySetHp}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivitySetHp}
	 */
	amuletActivitySetHp(data?: IReqAmuletActivitySetHp): Promise<IResCommon>;
	/**
	 ** 青云之志修改换牌次数
	 ** req: {@link IReqAmuletActivitySetChangeTileCount}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivitySetChangeTileCount}
	 */
	amuletActivitySetChangeTileCount(data?: IReqAmuletActivitySetChangeTileCount): Promise<IResCommon>;
	/**
	 ** 青云之志获取debug数据
	 ** req: {@link IReqAmuletActivityFetchDebugData}
	 ** res: {@link IResFetchAmuletActivityDebugData}
	 ** msgId: {@link ENetMessage.amuletActivityFetchDebugData}
	 */
	amuletActivityFetchDebugData(data?: IReqAmuletActivityFetchDebugData): Promise<IResFetchAmuletActivityDebugData>;
	/**
	 ** 青云之志设置debug数据
	 ** req: {@link IReqAmuletActivitySetDebugData}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivitySetDebugData}
	 */
	amuletActivitySetDebugData(data?: IReqAmuletActivitySetDebugData): Promise<IResCommon>;
	/**
	 ** 青云之志刷新听牌列表和下一步操作
	 ** req: {@link IReqAmuletActivityRefreshTingListAndNextOperation}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.amuletActivityRefreshTingListAndNextOperation}
	 */
	amuletActivityRefreshTingListAndNextOperation(data?: IReqAmuletActivityRefreshTingListAndNextOperation): Promise<IResCommon>;
	/**
	 ** 解锁剧情
	 ** req: {@link IReqStoryActivityUnlock}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.storyActivityUnlock}
	 */
	storyActivityUnlock(data?: IReqStoryActivityUnlock): Promise<IResCommon>;
	/**
	 ** 解锁结局
	 ** req: {@link IReqStoryActivityUnlockEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.storyActivityUnlockEnding}
	 */
	storyActivityUnlockEnding(data?: IReqStoryActivityUnlockEnding): Promise<IResCommon>;
	/**
	 ** 领取结局奖励
	 ** req: {@link IReqStoryActivityReceiveEndingReward}
	 ** res: {@link IResStoryReward}
	 ** msgId: {@link ENetMessage.storyActivityReceiveEndingReward}
	 */
	storyActivityReceiveEndingReward(data?: IReqStoryActivityReceiveEndingReward): Promise<IResStoryReward>;
	/**
	 ** 领取剧情通关奖励（完成剧情任一结局）
	 ** req: {@link IReqStoryActivityReceiveFinishReward}
	 ** res: {@link IResStoryReward}
	 ** msgId: {@link ENetMessage.storyActivityReceiveFinishReward}
	 */
	storyActivityReceiveFinishReward(data?: IReqStoryActivityReceiveFinishReward): Promise<IResStoryReward>;
	/**
	 ** 领取剧情全通奖励（完成所有结局）
	 ** req: {@link IReqStoryActivityReceiveAllFinishReward}
	 ** res: {@link IResStoryReward}
	 ** msgId: {@link ENetMessage.storyActivityReceiveAllFinishReward}
	 */
	storyActivityReceiveAllFinishReward(data?: IReqStoryActivityReceiveAllFinishReward): Promise<IResStoryReward>;
	/**
	 ** 解锁结局并领取结局奖励
	 ** req: {@link IReqStoryActivityUnlockEndingAndReceive}
	 ** res: {@link IResStoryActivityUnlockEndingAndReceive}
	 ** msgId: {@link ENetMessage.storyActivityUnlockEndingAndReceive}
	 */
	storyActivityUnlockEndingAndReceive(data?: IReqStoryActivityUnlockEndingAndReceive): Promise<IResStoryActivityUnlockEndingAndReceive>;
	/**
	 ** 获取活动排名
	 ** req: {@link IReqFetchActivityRank}
	 ** res: {@link IResFetchActivityRank}
	 ** msgId: {@link ENetMessage.fetchActivityRank}
	 */
	fetchActivityRank(data?: IReqFetchActivityRank): Promise<IResFetchActivityRank>;
	/**
	 ** 玩家职业/主播标识开关
	 ** req: {@link IReqSetVerifiedHidden}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.setVerifiedHidden}
	 */
	setVerifiedHidden(data?: IReqSetVerifiedHidden): Promise<IResCommon>;
	/**
	 ** 获取问卷列表
	 ** req: {@link IReqFetchQuestionnaireList}
	 ** res: {@link IResFetchQuestionnaireList}
	 ** msgId: {@link ENetMessage.fetchQuestionnaireList}
	 */
	fetchQuestionnaireList(data?: IReqFetchQuestionnaireList): Promise<IResFetchQuestionnaireList>;
	/**
	 ** 获取问卷详情
	 ** req: {@link IReqFetchQuestionnaireDetail}
	 ** res: {@link IResFetchQuestionnaireDetail}
	 ** msgId: {@link ENetMessage.fetchQuestionnaireDetail}
	 */
	fetchQuestionnaireDetail(data?: IReqFetchQuestionnaireDetail): Promise<IResFetchQuestionnaireDetail>;
	/**
	 ** 提交调查问卷结果
	 ** req: {@link IReqSubmitQuestionnaire}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.submitQuestionnaire}
	 */
	submitQuestionnaire(data?: IReqSubmitQuestionnaire): Promise<IResCommon>;
	/**
	 ** 好友房随机机器人角色开关
	 ** req: {@link IReqSetFriendRoomRandomBotChar}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.setFriendRoomRandomBotChar}
	 */
	setFriendRoomRandomBotChar(data?: IReqSetFriendRoomRandomBotChar): Promise<IResCommon>;
	/**
	 ** req: {@link IReqFetchAccountGameHuRecords}
	 ** res: {@link IResFetchAccountGameHuRecords}
	 ** msgId: {@link ENetMessage.fetchAccountGameHuRecords}
	 */
	fetchAccountGameHuRecords(data?: IReqFetchAccountGameHuRecords): Promise<IResFetchAccountGameHuRecords>;
	/**
	 ** req: {@link IReqFetchAccountInfoExtra}
	 ** res: {@link IResFetchAccountInfoExtra}
	 ** msgId: {@link ENetMessage.fetchAccountInfoExtra}
	 */
	fetchAccountInfoExtra(data?: IReqFetchAccountInfoExtra): Promise<IResFetchAccountInfoExtra>;
	/**
	 ** req: {@link IReqSetAccountFavoriteHu}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.setAccountFavoriteHu}
	 */
	setAccountFavoriteHu(data?: IReqSetAccountFavoriteHu): Promise<IResCommon>;
	/**
	 ** seer 报告
	 ** req: {@link IReqFetchSeerReport}
	 ** res: {@link IResFetchSeerReport}
	 ** msgId: {@link ENetMessage.fetchSeerReport}
	 */
	fetchSeerReport(data?: IReqFetchSeerReport): Promise<IResFetchSeerReport>;
	/**
	 ** req: {@link IReqCreateSeerReport}
	 ** res: {@link IResCreateSeerReport}
	 ** msgId: {@link ENetMessage.createSeerReport}
	 */
	createSeerReport(data?: IReqCreateSeerReport): Promise<IResCreateSeerReport>;
	/**
	 ** 获取当前 seer 报告状态（只返回分析中和未过期的）
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchSeerReportList}
	 ** msgId: {@link ENetMessage.fetchSeerReportList}
	 */
	fetchSeerReportList(data?: IReqCommon): Promise<IResFetchSeerReportList>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchSeerInfo}
	 ** msgId: {@link ENetMessage.fetchSeerInfo}
	 */
	fetchSeerInfo(data?: IReqCommon): Promise<IResFetchSeerInfo>;
	/**
	 ** 可选up卡池活动
	 ** req: {@link IReqSelectChestChooseUp}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.selectChestChooseUpActivity}
	 */
	selectChestChooseUpActivity(data?: IReqSelectChestChooseUp): Promise<IResCommon>;
	/**
	 ** 可选up组活动
	 ** req: {@link IReqSelectChestChooseGroupActivity}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.selectChestChooseGroupActivity}
	 */
	selectChestChooseGroupActivity(data?: IReqSelectChestChooseGroupActivity): Promise<IResCommon>;
	/**
	 ** 年度报告
	 ** req: {@link IReqGenerateAnnualReportToken}
	 ** res: {@link IResGenerateAnnualReportToken}
	 ** msgId: {@link ENetMessage.generateAnnualReportToken}
	 */
	generateAnnualReportToken(data?: IReqGenerateAnnualReportToken): Promise<IResGenerateAnnualReportToken>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchAnnualReportInfo}
	 ** msgId: {@link ENetMessage.fetchAnnualReportInfo}
	 */
	fetchAnnualReportInfo(data?: IReqCommon): Promise<IResFetchAnnualReportInfo>;
	/**
	 ** 好友备注
	 ** req: {@link IReqRemarkFriend}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.remarkFriend}
	 */
	remarkFriend(data?: IReqRemarkFriend): Promise<IResCommon>;
	/**
	 ** 雀斗大会
	 ** req: {@link IReqSimV2ActivityFetchInfo}
	 ** res: {@link IResSimV2ActivityFetchInfo}
	 ** msgId: {@link ENetMessage.simV2ActivityFetchInfo}
	 */
	simV2ActivityFetchInfo(data?: IReqSimV2ActivityFetchInfo): Promise<IResSimV2ActivityFetchInfo>;
	/**
	 ** req: {@link IReqSimV2ActivityStartSeason}
	 ** res: {@link IResSimV2ActivityStartSeason}
	 ** msgId: {@link ENetMessage.simV2ActivityStartSeason}
	 */
	simV2ActivityStartSeason(data?: IReqSimV2ActivityStartSeason): Promise<IResSimV2ActivityStartSeason>;
	/**
	 ** req: {@link IReqSimV2ActivityTrain}
	 ** res: {@link IResSimV2ActivityTrain}
	 ** msgId: {@link ENetMessage.simV2ActivityTrain}
	 */
	simV2ActivityTrain(data?: IReqSimV2ActivityTrain): Promise<IResSimV2ActivityTrain>;
	/**
	 ** req: {@link IReqSimV2ActivitySelectEvent}
	 ** res: {@link IResSimV2ActivitySelectEvent}
	 ** msgId: {@link ENetMessage.simV2ActivitySelectEvent}
	 */
	simV2ActivitySelectEvent(data?: IReqSimV2ActivitySelectEvent): Promise<IResSimV2ActivitySelectEvent>;
	/**
	 ** req: {@link IReqSimV2ActivityStartMatch}
	 ** res: {@link IResSimV2ActivityStartMatch}
	 ** msgId: {@link ENetMessage.simV2ActivityStartMatch}
	 */
	simV2ActivityStartMatch(data?: IReqSimV2ActivityStartMatch): Promise<IResSimV2ActivityStartMatch>;
	/**
	 ** req: {@link IReqSimV2ActivityEndMatch}
	 ** res: {@link IResSimV2ActivityEndMatch}
	 ** msgId: {@link ENetMessage.simV2ActivityEndMatch}
	 */
	simV2ActivityEndMatch(data?: IReqSimV2ActivityEndMatch): Promise<IResSimV2ActivityEndMatch>;
	/**
	 ** req: {@link IReqSimV2ActivityGiveUp}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.simV2ActivityGiveUp}
	 */
	simV2ActivityGiveUp(data?: IReqSimV2ActivityGiveUp): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSimV2ActivitySetUpgrade}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.simV2ActivitySetUpgrade}
	 */
	simV2ActivitySetUpgrade(data?: IReqSimV2ActivitySetUpgrade): Promise<IResCommon>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqSimV2ActivityDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.simV2ActivityDebug}
	 */
	simV2ActivityDebug(data?: IReqSimV2ActivityDebug): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSimV2ActivityFetchDebug}
	 ** res: {@link IResSimV2ActivityFetchDebug}
	 ** msgId: {@link ENetMessage.simV2ActivityFetchDebug}
	 */
	simV2ActivityFetchDebug(data?: IReqSimV2ActivityFetchDebug): Promise<IResSimV2ActivityFetchDebug>;
	/**
	 ** 进度奖励活动
	 ** req: {@link IReqProgressRewardActivityReceive}
	 ** res: {@link IResProgressRewardActivityReceive}
	 ** msgId: {@link ENetMessage.progressRewardActivityReceive}
	 */
	progressRewardActivityReceive(data?: IReqProgressRewardActivityReceive): Promise<IResProgressRewardActivityReceive>;
	/**
	 ** req: {@link IReqFetchProgressRewardActivityInfo}
	 ** res: {@link IResFetchProgressRewardActivityInfo}
	 ** msgId: {@link ENetMessage.fetchProgressRewardActivityInfo}
	 */
	fetchProgressRewardActivityInfo(data?: IReqFetchProgressRewardActivityInfo): Promise<IResFetchProgressRewardActivityInfo>;
	/**
	 ** 万事屋活动
	 ** req: {@link IReqQuestCrewActivityStartQuest}
	 ** res: {@link IResQuestCrewActivityStartQuest}
	 ** msgId: {@link ENetMessage.questCrewActivityStartQuest}
	 */
	questCrewActivityStartQuest(data?: IReqQuestCrewActivityStartQuest): Promise<IResQuestCrewActivityStartQuest>;
	/**
	 ** req: {@link IReqQuestCrewActivityHire}
	 ** res: {@link IResQuestCrewActivityHire}
	 ** msgId: {@link ENetMessage.questCrewActivityHire}
	 */
	questCrewActivityHire(data?: IReqQuestCrewActivityHire): Promise<IResQuestCrewActivityHire>;
	/**
	 ** req: {@link IReqQuestCrewActivityFeed}
	 ** res: {@link IResQuestCrewActivityFeed}
	 ** msgId: {@link ENetMessage.questCrewActivityFeed}
	 */
	questCrewActivityFeed(data?: IReqQuestCrewActivityFeed): Promise<IResQuestCrewActivityFeed>;
	/**
	 ** req: {@link IReqQuestCrewActivityRefreshMarket}
	 ** res: {@link IResQuestCrewActivityRefreshMarket}
	 ** msgId: {@link ENetMessage.questCrewActivityRefreshMarket}
	 */
	questCrewActivityRefreshMarket(data?: IReqQuestCrewActivityRefreshMarket): Promise<IResQuestCrewActivityRefreshMarket>;
	/**
	 ** 冰菓活动
	 ** req: {@link IReqBingoActivityReceiveReward}
	 ** res: {@link IResBingoActivityReceiveReward}
	 ** msgId: {@link ENetMessage.bingoActivityReceiveReward}
	 */
	bingoActivityReceiveReward(data?: IReqBingoActivityReceiveReward): Promise<IResBingoActivityReceiveReward>;
	/**
	 ** req: {@link IReqFetchBingoActivityData}
	 ** res: {@link IResFetchBingoActivityData}
	 ** msgId: {@link ENetMessage.fetchBingoActivityData}
	 */
	fetchBingoActivityData(data?: IReqFetchBingoActivityData): Promise<IResFetchBingoActivityData>;
	/**
	 ** 雪球活动
	 ** req: {@link IReqSnowballActivityStartBattle}
	 ** res: {@link IResSnowballActivityStartBattle}
	 ** msgId: {@link ENetMessage.snowballActivityStartBattle}
	 */
	snowballActivityStartBattle(data?: IReqSnowballActivityStartBattle): Promise<IResSnowballActivityStartBattle>;
	/**
	 ** req: {@link IReqSnowballActivityFinishBattle}
	 ** res: {@link IResSnowballActivityFinishBattle}
	 ** msgId: {@link ENetMessage.snowballActivityFinishBattle}
	 */
	snowballActivityFinishBattle(data?: IReqSnowballActivityFinishBattle): Promise<IResSnowballActivityFinishBattle>;
	/**
	 ** req: {@link IReqSnowballActivityUpgrade}
	 ** res: {@link IResSnowballActivityUpgrade}
	 ** msgId: {@link ENetMessage.snowballActivityUpgrade}
	 */
	snowballActivityUpgrade(data?: IReqSnowballActivityUpgrade): Promise<IResSnowballActivityUpgrade>;
	/**
	 ** req: {@link IReqSnowballActivityReceiveReward}
	 ** res: {@link IResSnowballActivityReceiveReward}
	 ** msgId: {@link ENetMessage.snowballActivityReceiveReward}
	 */
	snowballActivityReceiveReward(data?: IReqSnowballActivityReceiveReward): Promise<IResSnowballActivityReceiveReward>;
	/**
	 ** 获取Banner活动详细信息
	 ** req: {@link IReqFetchBannerActivityData}
	 ** res: {@link IResFetchBannerActivityData}
	 ** msgId: {@link ENetMessage.fetchBannerActivityData}
	 */
	fetchBannerActivityData(data?: IReqFetchBannerActivityData): Promise<IResFetchBannerActivityData>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqSnowballActivityDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.snowballActivityDebug}
	 */
	snowballActivityDebug(data?: IReqSnowballActivityDebug): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSnowballActivityFetchDebug}
	 ** res: {@link IResSnowballActivityFetchDebug}
	 ** msgId: {@link ENetMessage.snowballActivityFetchDebug}
	 */
	snowballActivityFetchDebug(data?: IReqSnowballActivityFetchDebug): Promise<IResSnowballActivityFetchDebug>;
	/**
	 ** 马拉松活动
	 ** req: {@link IReqMarathonActivityStartRace}
	 ** res: {@link IResMarathonActivityStartRace}
	 ** msgId: {@link ENetMessage.marathonActivityStartRace}
	 */
	marathonActivityStartRace(data?: IReqMarathonActivityStartRace): Promise<IResMarathonActivityStartRace>;
	/**
	 ** req: {@link IReqMarathonActivityFinishRace}
	 ** res: {@link IResMarathonActivityFinishRace}
	 ** msgId: {@link ENetMessage.marathonActivityFinishRace}
	 */
	marathonActivityFinishRace(data?: IReqMarathonActivityFinishRace): Promise<IResMarathonActivityFinishRace>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqMarathonActivityTest}
	 ** res: {@link IResMarathonActivityTest}
	 ** msgId: {@link ENetMessage.marathonActivityTest}
	 */
	marathonActivityTest(data?: IReqMarathonActivityTest): Promise<IResMarathonActivityTest>;
	/**
	 ** mmo活动
	 ** req: {@link IReqMMOActivityFetchData}
	 ** res: {@link IResMMOActivityFetchData}
	 ** msgId: {@link ENetMessage.mmoActivityFetchData}
	 */
	mmoActivityFetchData(data?: IReqMMOActivityFetchData): Promise<IResMMOActivityFetchData>;
	/**
	 ** req: {@link IReqMMOActivityEquipFusion}
	 ** res: {@link IResMMOActivityEquipFusion}
	 ** msgId: {@link ENetMessage.mmoActivityEquipFusion}
	 */
	mmoActivityEquipFusion(data?: IReqMMOActivityEquipFusion): Promise<IResMMOActivityEquipFusion>;
	/**
	 ** req: {@link IReqMMOActivitySetCharacter}
	 ** res: {@link IResMMOActivitySetCharacter}
	 ** msgId: {@link ENetMessage.mmoActivitySetCharacter}
	 */
	mmoActivitySetCharacter(data?: IReqMMOActivitySetCharacter): Promise<IResMMOActivitySetCharacter>;
	/**
	 ** req: {@link IReqMMOActivitySetTeamMember}
	 ** res: {@link IResMMOActivitySetTeamMember}
	 ** msgId: {@link ENetMessage.mmoActivitySetTeamMember}
	 */
	mmoActivitySetTeamMember(data?: IReqMMOActivitySetTeamMember): Promise<IResMMOActivitySetTeamMember>;
	/**
	 ** req: {@link IReqMMOActivityStartBattle}
	 ** res: {@link IResMMOActivityStartBattle}
	 ** msgId: {@link ENetMessage.mmoActivityStartBattle}
	 */
	mmoActivityStartBattle(data?: IReqMMOActivityStartBattle): Promise<IResMMOActivityStartBattle>;
	/**
	 ** req: {@link IReqMMOActivityFinishBattle}
	 ** res: {@link IResMMOActivityFinishBattle}
	 ** msgId: {@link ENetMessage.mmoActivityFinishBattle}
	 */
	mmoActivityFinishBattle(data?: IReqMMOActivityFinishBattle): Promise<IResMMOActivityFinishBattle>;
	/**
	 ** req: {@link IReqMMOActivitySetEquip}
	 ** res: {@link IResMMOActivitySetEquip}
	 ** msgId: {@link ENetMessage.mmoActivitySetEquip}
	 */
	mmoActivitySetEquip(data?: IReqMMOActivitySetEquip): Promise<IResMMOActivitySetEquip>;
	/**
	 ** req: {@link IReqMMOActivityUpdatehFriendList}
	 ** res: {@link IResMMOActivityUpdatehFriendList}
	 ** msgId: {@link ENetMessage.mmoActivityUpdateFriendList}
	 */
	mmoActivityUpdateFriendList(data?: IReqMMOActivityUpdatehFriendList): Promise<IResMMOActivityUpdatehFriendList>;
	/**
	 ** req: {@link IReqMMOActivityReceiveSupportReward}
	 ** res: {@link IResMMOActivityReceiveSupportReward}
	 ** msgId: {@link ENetMessage.mmoActivityReceiveSupportReward}
	 */
	mmoActivityReceiveSupportReward(data?: IReqMMOActivityReceiveSupportReward): Promise<IResMMOActivityReceiveSupportReward>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqMMOActivityDebugSetTeamCandidate}
	 ** res: {@link IResMMOActivityDebugSetTeamCandidate}
	 ** msgId: {@link ENetMessage.mmoActivityDebugSetTeamCandidate}
	 */
	mmoActivityDebugSetTeamCandidate(data?: IReqMMOActivityDebugSetTeamCandidate): Promise<IResMMOActivityDebugSetTeamCandidate>;
	/**
	 ** 获取签到活动详情
	 ** req: {@link IReqFetchDailySignActivityData}
	 ** res: {@link IResFetchDailySignActivityData}
	 ** msgId: {@link ENetMessage.fetchDailySignActivityData}
	 */
	fetchDailySignActivityData(data?: IReqFetchDailySignActivityData): Promise<IResFetchDailySignActivityData>;
	/**
	 ** 验证游戏口令
	 ** req: {@link IReqAuthGame}
	 ** res: {@link IResAuthGame}
	 ** msgId: {@link ENetMessage.authGame}
	 */
	authGame(data?: IReqAuthGame): Promise<IResAuthGame>;
	/**
	 ** 客户端资源加载完毕，可以进入游戏
	 ** req: {@link IReqCommon}
	 ** res: {@link IResEnterGame}
	 ** msgId: {@link ENetMessage.enterGame}
	 */
	enterGame(data?: IReqCommon): Promise<IResEnterGame>;
	/**
	 ** 同步游戏
	 ** req: {@link IReqSyncGame}
	 ** res: {@link IResSyncGame}
	 ** msgId: {@link ENetMessage.syncGame}
	 */
	syncGame(data?: IReqSyncGame): Promise<IResSyncGame>;
	/**
	 ** 完成同步游戏
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.finishSyncGame}
	 */
	finishSyncGame(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 中断游戏（仅1个人模式有效）
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.terminateGame}
	 */
	terminateGame(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 输入基本操作
	 ** req: {@link IReqSelfOperation}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.inputOperation}
	 */
	inputOperation(data?: IReqSelfOperation): Promise<IResCommon>;
	/**
	 ** 输入吃碰胡
	 ** req: {@link IReqChiPengGang}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.inputChiPengGang}
	 */
	inputChiPengGang(data?: IReqChiPengGang): Promise<IResCommon>;
	/**
	 ** 确认新的回合
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.confirmNewRound}
	 */
	confirmNewRound(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 玩家游戏内广播
	 ** req: {@link IReqBroadcastInGame}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.broadcastInGame}
	 */
	broadcastInGame(data?: IReqBroadcastInGame): Promise<IResCommon>;
	/**
	 ** 玩家游戏内Gm指令
	 ** deprecated
	 ** req: {@link IReqGMCommandInGaming}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.inputGameGMCommand}
	 */
	inputGameGMCommand(data?: IReqGMCommandInGaming): Promise<IResCommon>;
	/**
	 ** 获取对局玩家状态
	 ** req: {@link IReqCommon}
	 ** res: {@link IResGamePlayerState}
	 ** msgId: {@link ENetMessage.fetchGamePlayerState}
	 */
	fetchGamePlayerState(data?: IReqCommon): Promise<IResGamePlayerState>;
	/**
	 ** 客户端定时刷新网络延迟
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.checkNetworkDelay}
	 */
	checkNetworkDelay(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 清除玩家自身的离开状态
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.clearLeaving}
	 */
	clearLeaving(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 开始投票退出游戏
	 ** req: {@link IReqVoteGameEnd}
	 ** res: {@link IResGameEndVote}
	 ** msgId: {@link ENetMessage.voteGameEnd}
	 */
	voteGameEnd(data?: IReqVoteGameEnd): Promise<IResGameEndVote>;
	/**
	 ** 实时观战验证
	 ** req: {@link IReqAuthObserve}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.authObserve}
	 */
	authObserve(data?: IReqAuthObserve): Promise<IResCommon>;
	/**
	 ** 开始实时观战
	 ** req: {@link IReqCommon}
	 ** res: {@link IResStartObserve}
	 ** msgId: {@link ENetMessage.startObserve}
	 */
	startObserve(data?: IReqCommon): Promise<IResStartObserve>;
	/**
	 ** 停止实时观战
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link ENetMessage.stopObserve}
	 */
	stopObserve(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 主备线路功能
	 ** req: {@link IReqRequestConnection}
	 ** res: {@link IResRequestConnection}
	 ** msgId: {@link ENetMessage.requestConnection}
	 */
	requestConnection(data?: IReqRequestConnection): Promise<IResRequestConnection>;
	/**
	 ** req: {@link IReqRequestRouteChange}
	 ** res: {@link IResRequestRouteChange}
	 ** msgId: {@link ENetMessage.requestRouteChange}
	 */
	requestRouteChange(data?: IReqRequestRouteChange): Promise<IResRequestRouteChange>;
	/**
	 ** req: {@link IReqHeartbeat}
	 ** res: {@link IResHeartbeat}
	 ** msgId: {@link ENetMessage.heartbeat}
	 */
	heartbeat(data?: IReqHeartbeat): Promise<IResHeartbeat>;
}
