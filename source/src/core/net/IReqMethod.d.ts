/** This script is generated automatically, Please do not any modify! */

declare interface IReqMethod {
	/**
	 ** 获取连接相关信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResConnectionInfo}
	 ** msgId: {@link EMessageID.fetchConnectionInfo}
	 */
	fetchConnectionInfo(data?: IReqCommon): Promise<IResConnectionInfo>;
	/**
	 ** 获取排队信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchQueueInfo}
	 ** msgId: {@link EMessageID.fetchQueueInfo}
	 */
	fetchQueueInfo(data?: IReqCommon): Promise<IResFetchQueueInfo>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.cancelQueue}
	 */
	cancelQueue(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqOpenidCheck}
	 ** res: {@link IResOauth2Check}
	 ** msgId: {@link EMessageID.openidCheck}
	 */
	openidCheck(data?: IReqOpenidCheck): Promise<IResOauth2Check>;
	/**
	 ** 注册账号
	 ** req: {@link IReqSignupAccount}
	 ** res: {@link IResSignupAccount}
	 ** msgId: {@link EMessageID.signup}
	 */
	signup(data?: IReqSignupAccount): Promise<IResSignupAccount>;
	/**
	 ** 登录账号
	 ** req: {@link IReqLogin}
	 ** res: {@link IResLogin}
	 ** msgId: {@link EMessageID.login}
	 */
	login(data?: IReqLogin): Promise<IResLogin>;
	/**
	 ** 备线半登录状态
	 ** req: {@link IReqPrepareLogin}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.prepareLogin}
	 */
	prepareLogin(data?: IReqPrepareLogin): Promise<IResCommon>;
	/**
	 ** 备线切换主线快速登录
	 ** req: {@link IReqFastLogin}
	 ** res: {@link IResFastLogin}
	 ** msgId: {@link EMessageID.fastLogin}
	 */
	fastLogin(data?: IReqFastLogin): Promise<IResFastLogin>;
	/**
	 ** 登录后获取信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchInfo}
	 ** msgId: {@link EMessageID.fetchInfo}
	 */
	fetchInfo(data?: IReqCommon): Promise<IResFetchInfo>;
	/**
	 ** 登录成功后摇
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.loginSuccess}
	 */
	loginSuccess(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 获取服务器维护信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchServerMaintenanceInfo}
	 ** msgId: {@link EMessageID.fetchServerMaintenanceInfo}
	 */
	fetchServerMaintenanceInfo(data?: IReqCommon): Promise<IResFetchServerMaintenanceInfo>;
	/**
	 ** req: {@link IReqEmailLogin}
	 ** res: {@link IResLogin}
	 ** msgId: {@link EMessageID.emailLogin}
	 */
	emailLogin(data?: IReqEmailLogin): Promise<IResLogin>;
	/**
	 ** oauth2 方式登录授权
	 ** req: {@link IReqOauth2Auth}
	 ** res: {@link IResOauth2Auth}
	 ** msgId: {@link EMessageID.oauth2Auth}
	 */
	oauth2Auth(data?: IReqOauth2Auth): Promise<IResOauth2Auth>;
	/**
	 ** oauth2 验证是否已经注册过账号
	 ** req: {@link IReqOauth2Check}
	 ** res: {@link IResOauth2Check}
	 ** msgId: {@link EMessageID.oauth2Check}
	 */
	oauth2Check(data?: IReqOauth2Check): Promise<IResOauth2Check>;
	/**
	 ** oauth2 注册
	 ** req: {@link IReqOauth2Signup}
	 ** res: {@link IResOauth2Signup}
	 ** msgId: {@link EMessageID.oauth2Signup}
	 */
	oauth2Signup(data?: IReqOauth2Signup): Promise<IResOauth2Signup>;
	/**
	 ** oauth2 登录
	 ** req: {@link IReqOauth2Login}
	 ** res: {@link IResLogin}
	 ** msgId: {@link EMessageID.oauth2Login}
	 */
	oauth2Login(data?: IReqOauth2Login): Promise<IResLogin>;
	/**
	 ** dmm 获取登录参数
	 ** req: {@link IReqDMMPreLogin}
	 ** res: {@link IResDMMPreLogin}
	 ** msgId: {@link EMessageID.dmmPreLogin}
	 */
	dmmPreLogin(data?: IReqDMMPreLogin): Promise<IResDMMPreLogin>;
	/**
	 ** 获取手机验证码（已登录的情况下）
	 ** req: {@link IReqCreatePhoneVerifyCode}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.createPhoneVerifyCode}
	 */
	createPhoneVerifyCode(data?: IReqCreatePhoneVerifyCode): Promise<IResCommon>;
	/**
	 ** 获取邮箱验证码
	 ** req: {@link IReqCreateEmailVerifyCode}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.createEmailVerifyCode}
	 */
	createEmailVerifyCode(data?: IReqCreateEmailVerifyCode): Promise<IResCommon>;
	/**
	 ** 验证码获取安全权限
	 ** req: {@link IReqVerifyCodeForSecure}
	 ** res: {@link IResVerfiyCodeForSecure}
	 ** msgId: {@link EMessageID.verfifyCodeForSecure}
	 */
	verfifyCodeForSecure(data?: IReqVerifyCodeForSecure): Promise<IResVerfiyCodeForSecure>;
	/**
	 ** 绑定手机号
	 ** req: {@link IReqBindPhoneNumber}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.bindPhoneNumber}
	 */
	bindPhoneNumber(data?: IReqBindPhoneNumber): Promise<IResCommon>;
	/**
	 ** 解绑手机号
	 ** req: {@link IReqUnbindPhoneNumber}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.unbindPhoneNumber}
	 */
	unbindPhoneNumber(data?: IReqUnbindPhoneNumber): Promise<IResCommon>;
	/**
	 ** 查询已绑定手机是否有登录绑定
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchPhoneLoginBind}
	 ** msgId: {@link EMessageID.fetchPhoneLoginBind}
	 */
	fetchPhoneLoginBind(data?: IReqCommon): Promise<IResFetchPhoneLoginBind>;
	/**
	 ** 生成手机登录绑定
	 ** req: {@link IReqCreatePhoneLoginBind}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.createPhoneLoginBind}
	 */
	createPhoneLoginBind(data?: IReqCreatePhoneLoginBind): Promise<IResCommon>;
	/**
	 ** 绑定邮箱
	 ** req: {@link IReqBindEmail}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.bindEmail}
	 */
	bindEmail(data?: IReqBindEmail): Promise<IResCommon>;
	/**
	 ** 修改密码
	 ** req: {@link IReqModifyPassword}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.modifyPassword}
	 */
	modifyPassword(data?: IReqModifyPassword): Promise<IResCommon>;
	/**
	 ** 绑定账号密码（Oauth2注册的账号使用，只有一次机会）
	 ** req: {@link IReqBindAccount}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.bindAccount}
	 */
	bindAccount(data?: IReqBindAccount): Promise<IResCommon>;
	/**
	 ** 注销账号
	 ** req: {@link IReqLogout}
	 ** res: {@link IResLogout}
	 ** msgId: {@link EMessageID.logout}
	 */
	logout(data?: IReqLogout): Promise<IResLogout>;
	/**
	 ** 心跳
	 ** req: {@link IReqHeatBeat}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.heatbeat}
	 */
	heatbeat(data?: IReqHeatBeat): Promise<IResCommon>;
	/**
	 ** 通过Eid获取账号ID
	 ** req: {@link IReqSearchAccountByEidLobby}
	 ** res: {@link IResSearchAccountbyEidLobby}
	 ** msgId: {@link EMessageID.searchAccountByEid}
	 */
	searchAccountByEid(data?: IReqSearchAccountByEidLobby): Promise<IResSearchAccountbyEidLobby>;
	/**
	 ** 登录心跳（用于防止第三方客户端，登录后不调用该接口无法进行匹配游戏）
	 ** req: {@link IReqLoginBeat}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.loginBeat}
	 */
	loginBeat(data?: IReqLoginBeat): Promise<IResCommon>;
	/**
	 ** 创建昵称
	 ** req: {@link IReqCreateNickname}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.createNickname}
	 */
	createNickname(data?: IReqCreateNickname): Promise<IResCommon>;
	/**
	 ** 修改昵称
	 ** req: {@link IReqModifyNickname}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.modifyNickname}
	 */
	modifyNickname(data?: IReqModifyNickname): Promise<IResCommon>;
	/**
	 ** 修改生日
	 ** req: {@link IReqModifyBirthday}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.modifyBirthday}
	 */
	modifyBirthday(data?: IReqModifyBirthday): Promise<IResCommon>;
	/**
	 ** 请求自己的房间信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResSelfRoom}
	 ** msgId: {@link EMessageID.fetchRoom}
	 */
	fetchRoom(data?: IReqCommon): Promise<IResSelfRoom>;
	/**
	 ** 请求自己的对局信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchGamingInfo}
	 ** msgId: {@link EMessageID.fetchGamingInfo}
	 */
	fetchGamingInfo(data?: IReqCommon): Promise<IResFetchGamingInfo>;
	/**
	 ** 创建房间
	 ** req: {@link IReqCreateRoom}
	 ** res: {@link IResCreateRoom}
	 ** msgId: {@link EMessageID.createRoom}
	 */
	createRoom(data?: IReqCreateRoom): Promise<IResCreateRoom>;
	/**
	 ** 加入房间
	 ** req: {@link IReqJoinRoom}
	 ** res: {@link IResJoinRoom}
	 ** msgId: {@link EMessageID.joinRoom}
	 */
	joinRoom(data?: IReqJoinRoom): Promise<IResJoinRoom>;
	/**
	 ** 离开房间
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.leaveRoom}
	 */
	leaveRoom(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 准备
	 ** req: {@link IReqRoomReady}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.readyPlay}
	 */
	readyPlay(data?: IReqRoomReady): Promise<IResCommon>;
	/**
	 ** 切换装扮状态
	 ** req: {@link IReqRoomDressing}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.dressingStatus}
	 */
	dressingStatus(data?: IReqRoomDressing): Promise<IResCommon>;
	/**
	 ** 开始
	 ** req: {@link IReqRoomStart}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.startRoom}
	 */
	startRoom(data?: IReqRoomStart): Promise<IResCommon>;
	/**
	 ** 踢出玩家
	 ** req: {@link IReqRoomKickPlayer}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.roomKickPlayer}
	 */
	roomKickPlayer(data?: IReqRoomKickPlayer): Promise<IResCommon>;
	/**
	 ** 修改房间
	 ** req: {@link IReqModifyRoom}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.modifyRoom}
	 */
	modifyRoom(data?: IReqModifyRoom): Promise<IResCommon>;
	/**
	 ** 添加好友房机器人
	 ** req: {@link IReqAddRoomRobot}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.addRoomRobot}
	 */
	addRoomRobot(data?: IReqAddRoomRobot): Promise<IResCommon>;
	/**
	 ** 加入匹配
	 ** req: {@link IReqJoinMatchQueue}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.matchGame}
	 */
	matchGame(data?: IReqJoinMatchQueue): Promise<IResCommon>;
	/**
	 ** 取消匹配
	 ** req: {@link IReqCancelMatchQueue}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.cancelMatch}
	 */
	cancelMatch(data?: IReqCancelMatchQueue): Promise<IResCommon>;
	/**
	 ** 请求账号信息
	 ** req: {@link IReqAccountInfo}
	 ** res: {@link IResAccountInfo}
	 ** msgId: {@link EMessageID.fetchAccountInfo}
	 */
	fetchAccountInfo(data?: IReqAccountInfo): Promise<IResAccountInfo>;
	/**
	 ** 修改头像
	 ** req: {@link IReqChangeAvatar}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.changeAvatar}
	 */
	changeAvatar(data?: IReqChangeAvatar): Promise<IResCommon>;
	/**
	 ** 领取更新礼包
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.receiveVersionReward}
	 */
	receiveVersionReward(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 请求账号统计信息
	 ** req: {@link IReqAccountStatisticInfo}
	 ** res: {@link IResAccountStatisticInfo}
	 ** msgId: {@link EMessageID.fetchAccountStatisticInfo}
	 */
	fetchAccountStatisticInfo(data?: IReqAccountStatisticInfo): Promise<IResAccountStatisticInfo>;
	/**
	 ** 获取试炼赛赛季排名信息
	 ** req: {@link IReqAccountInfo}
	 ** res: {@link IResAccountChallengeRankInfo}
	 ** msgId: {@link EMessageID.fetchAccountChallengeRankInfo}
	 */
	fetchAccountChallengeRankInfo(data?: IReqAccountInfo): Promise<IResAccountChallengeRankInfo>;
	/**
	 ** 获取账号人物信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAccountCharacterInfo}
	 ** msgId: {@link EMessageID.fetchAccountCharacterInfo}
	 */
	fetchAccountCharacterInfo(data?: IReqCommon): Promise<IResAccountCharacterInfo>;
	/**
	 ** 商店购买
	 ** req: {@link IReqShopPurchase}
	 ** res: {@link IResShopPurchase}
	 ** msgId: {@link EMessageID.shopPurchase}
	 */
	shopPurchase(data?: IReqShopPurchase): Promise<IResShopPurchase>;
	/**
	 ** 获取单场牌谱记录
	 ** req: {@link IReqGameRecord}
	 ** res: {@link IResGameRecord}
	 ** msgId: {@link EMessageID.fetchGameRecord}
	 */
	fetchGameRecord(data?: IReqGameRecord): Promise<IResGameRecord>;
	/**
	 ** 添加查看牌谱记录
	 ** req: {@link IReqGameRecord}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.readGameRecord}
	 */
	readGameRecord(data?: IReqGameRecord): Promise<IResCommon>;
	/**
	 ** 获取牌谱列表
	 ** 20240820更新之前的牌谱通过这个接口获取
	 ** req: {@link IReqGameRecordList}
	 ** res: {@link IResGameRecordList}
	 ** msgId: {@link EMessageID.fetchGameRecordList}
	 */
	fetchGameRecordList(data?: IReqGameRecordList): Promise<IResGameRecordList>;
	/**
	 ** 获取牌谱列表V2
	 ** 202408新版牌谱功能使用（基于迭代器）
	 ** 2024.08.20 06:33 停服  07:40 国服启动
	 ** 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 ** req: {@link IReqGameRecordListV2}
	 ** res: {@link IResGameRecordListV2}
	 ** msgId: {@link EMessageID.fetchGameRecordListV2}
	 */
	fetchGameRecordListV2(data?: IReqGameRecordListV2): Promise<IResGameRecordListV2>;
	/**
	 ** 获取后续牌谱列表内容
	 ** 基于 fetchGameRecordListV2 协议返回结果使用
	 ** 只有 2024.08.20 07:30 (1724110200) 停服维护之后的牌谱可以通过这个接口获取列表
	 ** req: {@link IReqNextGameRecordList}
	 ** res: {@link IResNextGameRecordList}
	 ** msgId: {@link EMessageID.fetchNextGameRecordList}
	 */
	fetchNextGameRecordList(data?: IReqNextGameRecordList): Promise<IResNextGameRecordList>;
	/**
	 ** 获得收藏的牌谱列表（简要信息）
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCollectedGameRecordList}
	 ** msgId: {@link EMessageID.fetchCollectedGameRecordList}
	 */
	fetchCollectedGameRecordList(data?: IReqCommon): Promise<IResCollectedGameRecordList>;
	/**
	 ** 获取牌谱列表的详细信息
	 ** req: {@link IReqGameRecordsDetail}
	 ** res: {@link IResGameRecordsDetail}
	 ** msgId: {@link EMessageID.fetchGameRecordsDetail}
	 */
	fetchGameRecordsDetail(data?: IReqGameRecordsDetail): Promise<IResGameRecordsDetail>;
	/**
	 ** 获取牌谱列表的详细信息 （新版）
	 ** req: {@link IReqGameRecordsDetailV2}
	 ** res: {@link IResGameRecordsDetailV2}
	 ** msgId: {@link EMessageID.fetchGameRecordsDetailV2}
	 */
	fetchGameRecordsDetailV2(data?: IReqGameRecordsDetailV2): Promise<IResGameRecordsDetailV2>;
	/**
	 ** 添加牌谱收藏
	 ** req: {@link IReqAddCollectedGameRecord}
	 ** res: {@link IResAddCollectedGameRecord}
	 ** msgId: {@link EMessageID.addCollectedGameRecord}
	 */
	addCollectedGameRecord(data?: IReqAddCollectedGameRecord): Promise<IResAddCollectedGameRecord>;
	/**
	 ** 移除牌谱收藏
	 ** req: {@link IReqRemoveCollectedGameRecord}
	 ** res: {@link IResRemoveCollectedGameRecord}
	 ** msgId: {@link EMessageID.removeCollectedGameRecord}
	 */
	removeCollectedGameRecord(data?: IReqRemoveCollectedGameRecord): Promise<IResRemoveCollectedGameRecord>;
	/**
	 ** 修改牌谱备注
	 ** req: {@link IReqChangeCollectedGameRecordRemarks}
	 ** res: {@link IResChangeCollectedGameRecordRemarks}
	 ** msgId: {@link EMessageID.changeCollectedGameRecordRemarks}
	 */
	changeCollectedGameRecordRemarks(data?: IReqChangeCollectedGameRecordRemarks): Promise<IResChangeCollectedGameRecordRemarks>;
	/**
	 ** 获取排行榜
	 ** req: {@link IReqLevelLeaderboard}
	 ** res: {@link IResLevelLeaderboard}
	 ** msgId: {@link EMessageID.fetchLevelLeaderboard}
	 */
	fetchLevelLeaderboard(data?: IReqLevelLeaderboard): Promise<IResLevelLeaderboard>;
	/**
	 ** 获取试炼赛排行榜
	 ** req: {@link IReqChallangeLeaderboard}
	 ** res: {@link IResChallengeLeaderboard}
	 ** msgId: {@link EMessageID.fetchChallengeLeaderboard}
	 */
	fetchChallengeLeaderboard(data?: IReqChallangeLeaderboard): Promise<IResChallengeLeaderboard>;
	/**
	 ** 获取多人试炼赛等级信息
	 ** req: {@link IReqMutiChallengeLevel}
	 ** res: {@link IResMutiChallengeLevel}
	 ** msgId: {@link EMessageID.fetchMutiChallengeLevel}
	 */
	fetchMutiChallengeLevel(data?: IReqMutiChallengeLevel): Promise<IResMutiChallengeLevel>;
	/**
	 ** 获取多人简要信息
	 ** req: {@link IReqMultiAccountId}
	 ** res: {@link IResMultiAccountBrief}
	 ** msgId: {@link EMessageID.fetchMultiAccountBrief}
	 */
	fetchMultiAccountBrief(data?: IReqMultiAccountId): Promise<IResMultiAccountBrief>;
	/**
	 ** 获取好友列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFriendList}
	 ** msgId: {@link EMessageID.fetchFriendList}
	 */
	fetchFriendList(data?: IReqCommon): Promise<IResFriendList>;
	/**
	 ** 获取好友申请列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFriendApplyList}
	 ** msgId: {@link EMessageID.fetchFriendApplyList}
	 */
	fetchFriendApplyList(data?: IReqCommon): Promise<IResFriendApplyList>;
	/**
	 ** 申请好友
	 ** req: {@link IReqApplyFriend}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.applyFriend}
	 */
	applyFriend(data?: IReqApplyFriend): Promise<IResCommon>;
	/**
	 ** 处理好友申请
	 ** req: {@link IReqHandleFriendApply}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.handleFriendApply}
	 */
	handleFriendApply(data?: IReqHandleFriendApply): Promise<IResCommon>;
	/**
	 ** 删除好友
	 ** req: {@link IReqRemoveFriend}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.removeFriend}
	 */
	removeFriend(data?: IReqRemoveFriend): Promise<IResCommon>;
	/**
	 ** 查询单个玩家
	 ** req: {@link IReqSearchAccountById}
	 ** res: {@link IResSearchAccountById}
	 ** msgId: {@link EMessageID.searchAccountById}
	 */
	searchAccountById(data?: IReqSearchAccountById): Promise<IResSearchAccountById>;
	/**
	 ** 模糊查询玩家
	 ** req: {@link IReqSearchAccountByPattern}
	 ** res: {@link IResSearchAccountByPattern}
	 ** msgId: {@link EMessageID.searchAccountByPattern}
	 */
	searchAccountByPattern(data?: IReqSearchAccountByPattern): Promise<IResSearchAccountByPattern>;
	/**
	 ** 查询玩家状态
	 ** req: {@link IReqAccountList}
	 ** res: {@link IResAccountStates}
	 ** msgId: {@link EMessageID.fetchAccountState}
	 */
	fetchAccountState(data?: IReqAccountList): Promise<IResAccountStates>;
	/**
	 ** 请求背包信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResBagInfo}
	 ** msgId: {@link EMessageID.fetchBagInfo}
	 */
	fetchBagInfo(data?: IReqCommon): Promise<IResBagInfo>;
	/**
	 ** 使用背包道具
	 ** req: {@link IReqUseBagItem}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.useBagItem}
	 */
	useBagItem(data?: IReqUseBagItem): Promise<IResCommon>;
	/**
	 ** 使用手选道具物品
	 ** req: {@link IReqOpenManualItem}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.openManualItem}
	 */
	openManualItem(data?: IReqOpenManualItem): Promise<IResCommon>;
	/**
	 ** 使用随机道具物品
	 ** req: {@link IReqOpenRandomRewardItem}
	 ** res: {@link IResOpenRandomRewardItem}
	 ** msgId: {@link EMessageID.openRandomRewardItem}
	 */
	openRandomRewardItem(data?: IReqOpenRandomRewardItem): Promise<IResOpenRandomRewardItem>;
	/**
	 ** 使用全领礼包物品
	 ** req: {@link IReqOpenAllRewardItem}
	 ** res: {@link IResOpenAllRewardItem}
	 ** msgId: {@link EMessageID.openAllRewardItem}
	 */
	openAllRewardItem(data?: IReqOpenAllRewardItem): Promise<IResOpenAllRewardItem>;
	/**
	 ** 合成碎片
	 ** req: {@link IReqComposeShard}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.composeShard}
	 */
	composeShard(data?: IReqComposeShard): Promise<IResCommon>;
	/**
	 ** 获取公告
	 ** req: {@link IReqFetchAnnouncement}
	 ** res: {@link IResAnnouncement}
	 ** msgId: {@link EMessageID.fetchAnnouncement}
	 */
	fetchAnnouncement(data?: IReqFetchAnnouncement): Promise<IResAnnouncement>;
	/**
	 ** 阅读公告
	 ** req: {@link IReqReadAnnouncement}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.readAnnouncement}
	 */
	readAnnouncement(data?: IReqReadAnnouncement): Promise<IResCommon>;
	/**
	 ** 获取邮件列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResMailInfo}
	 ** msgId: {@link EMessageID.fetchMailInfo}
	 */
	fetchMailInfo(data?: IReqCommon): Promise<IResMailInfo>;
	/**
	 ** 阅读邮件
	 ** req: {@link IReqReadMail}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.readMail}
	 */
	readMail(data?: IReqReadMail): Promise<IResCommon>;
	/**
	 ** 删除邮件
	 ** req: {@link IReqDeleteMail}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.deleteMail}
	 */
	deleteMail(data?: IReqDeleteMail): Promise<IResCommon>;
	/**
	 ** 拿取邮件附件
	 ** req: {@link IReqTakeAttachment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.takeAttachmentFromMail}
	 */
	takeAttachmentFromMail(data?: IReqTakeAttachment): Promise<IResCommon>;
	/**
	 ** 领取成就奖励
	 ** req: {@link IReqReceiveAchievementReward}
	 ** res: {@link IResReceiveAchievementReward}
	 ** msgId: {@link EMessageID.receiveAchievementReward}
	 */
	receiveAchievementReward(data?: IReqReceiveAchievementReward): Promise<IResReceiveAchievementReward>;
	/**
	 ** 领取成就大组奖励
	 ** req: {@link IReqReceiveAchievementGroupReward}
	 ** res: {@link IResReceiveAchievementGroupReward}
	 ** msgId: {@link EMessageID.receiveAchievementGroupReward}
	 */
	receiveAchievementGroupReward(data?: IReqReceiveAchievementGroupReward): Promise<IResReceiveAchievementGroupReward>;
	/**
	 ** 获取全服成就完成率
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchAchievementRate}
	 ** msgId: {@link EMessageID.fetchAchievementRate}
	 */
	fetchAchievementRate(data?: IReqCommon): Promise<IResFetchAchievementRate>;
	/**
	 ** 获取成就
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAchievement}
	 ** msgId: {@link EMessageID.fetchAchievement}
	 */
	fetchAchievement(data?: IReqCommon): Promise<IResAchievement>;
	/**
	 ** 购买试炼资格
	 ** req: {@link IReqBuyShiLian}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.buyShiLian}
	 */
	buyShiLian(data?: IReqBuyShiLian): Promise<IResCommon>;
	/**
	 ** 试炼匹配
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.matchShiLian}
	 */
	matchShiLian(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 继续下一阶段试炼
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.goNextShiLian}
	 */
	goNextShiLian(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 更新客户端数据
	 ** req: {@link IReqUpdateClientValue}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateClientValue}
	 */
	updateClientValue(data?: IReqUpdateClientValue): Promise<IResCommon>;
	/**
	 ** 获取客户端数据
	 ** req: {@link IReqCommon}
	 ** res: {@link IResClientValue}
	 ** msgId: {@link EMessageID.fetchClientValue}
	 */
	fetchClientValue(data?: IReqCommon): Promise<IResClientValue>;
	/**
	 ** 客户端信息
	 ** req: {@link IReqClientMessage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.clientMessage}
	 */
	clientMessage(data?: IReqClientMessage): Promise<IResCommon>;
	/**
	 ** 请求当前匹配模式信息
	 ** req: {@link IReqCurrentMatchInfo}
	 ** res: {@link IResCurrentMatchInfo}
	 ** msgId: {@link EMessageID.fetchCurrentMatchInfo}
	 */
	fetchCurrentMatchInfo(data?: IReqCurrentMatchInfo): Promise<IResCurrentMatchInfo>;
	/**
	 ** 用户举报
	 ** req: {@link IReqUserComplain}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.userComplain}
	 */
	userComplain(data?: IReqUserComplain): Promise<IResCommon>;
	/**
	 ** ------ 复活币 -------- //
	 ** 获取复活币信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResReviveCoinInfo}
	 ** msgId: {@link EMessageID.fetchReviveCoinInfo}
	 */
	fetchReviveCoinInfo(data?: IReqCommon): Promise<IResReviveCoinInfo>;
	/**
	 ** 领取复活币
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.gainReviveCoin}
	 */
	gainReviveCoin(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 获取每日任务
	 ** req: {@link IReqCommon}
	 ** res: {@link IResDailyTask}
	 ** msgId: {@link EMessageID.fetchDailyTask}
	 */
	fetchDailyTask(data?: IReqCommon): Promise<IResDailyTask>;
	/**
	 ** 刷新每日任务
	 ** req: {@link IReqRefreshDailyTask}
	 ** res: {@link IResRefreshDailyTask}
	 ** msgId: {@link EMessageID.refreshDailyTask}
	 */
	refreshDailyTask(data?: IReqRefreshDailyTask): Promise<IResRefreshDailyTask>;
	/**
	 ** 使用礼品码
	 ** req: {@link IReqUseGiftCode}
	 ** res: {@link IResUseGiftCode}
	 ** msgId: {@link EMessageID.useGiftCode}
	 */
	useGiftCode(data?: IReqUseGiftCode): Promise<IResUseGiftCode>;
	/**
	 ** 使用特殊礼品码
	 ** req: {@link IReqUseGiftCode}
	 ** res: {@link IResUseSpecialGiftCode}
	 ** msgId: {@link EMessageID.useSpecialGiftCode}
	 */
	useSpecialGiftCode(data?: IReqUseGiftCode): Promise<IResUseSpecialGiftCode>;
	/**
	 ** 获取称号列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResTitleList}
	 ** msgId: {@link EMessageID.fetchTitleList}
	 */
	fetchTitleList(data?: IReqCommon): Promise<IResTitleList>;
	/**
	 ** 使用称号
	 ** req: {@link IReqUseTitle}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.useTitle}
	 */
	useTitle(data?: IReqUseTitle): Promise<IResCommon>;
	/**
	 ** 发送给其他玩家自定义消息
	 ** req: {@link IReqSendClientMessage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.sendClientMessage}
	 */
	sendClientMessage(data?: IReqSendClientMessage): Promise<IResCommon>;
	/**
	 ** 获取游戏直播信息（全视角）
	 ** req: {@link IReqGameLiveInfo}
	 ** res: {@link IResGameLiveInfo}
	 ** msgId: {@link EMessageID.fetchGameLiveInfo}
	 */
	fetchGameLiveInfo(data?: IReqGameLiveInfo): Promise<IResGameLiveInfo>;
	/**
	 ** 获取游戏直播剩余分片信息（增量）
	 ** req: {@link IReqGameLiveLeftSegment}
	 ** res: {@link IResGameLiveLeftSegment}
	 ** msgId: {@link EMessageID.fetchGameLiveLeftSegment}
	 */
	fetchGameLiveLeftSegment(data?: IReqGameLiveLeftSegment): Promise<IResGameLiveLeftSegment>;
	/**
	 ** 获取正在直播的游戏列表
	 ** req: {@link IReqGameLiveList}
	 ** res: {@link IResGameLiveList}
	 ** msgId: {@link EMessageID.fetchGameLiveList}
	 */
	fetchGameLiveList(data?: IReqGameLiveList): Promise<IResGameLiveList>;
	/**
	 ** 留言板设置信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommentSetting}
	 ** msgId: {@link EMessageID.fetchCommentSetting}
	 */
	fetchCommentSetting(data?: IReqCommon): Promise<IResCommentSetting>;
	/**
	 ** 更新留言板设置
	 ** req: {@link IReqUpdateCommentSetting}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateCommentSetting}
	 */
	updateCommentSetting(data?: IReqUpdateCommentSetting): Promise<IResCommon>;
	/**
	 ** 获取留言板列表
	 ** req: {@link IReqFetchCommentList}
	 ** res: {@link IResFetchCommentList}
	 ** msgId: {@link EMessageID.fetchCommentList}
	 */
	fetchCommentList(data?: IReqFetchCommentList): Promise<IResFetchCommentList>;
	/**
	 ** 获取留言板内容
	 ** req: {@link IReqFetchCommentContent}
	 ** res: {@link IResFetchCommentContent}
	 ** msgId: {@link EMessageID.fetchCommentContent}
	 */
	fetchCommentContent(data?: IReqFetchCommentContent): Promise<IResFetchCommentContent>;
	/**
	 ** 发送留言
	 ** req: {@link IReqLeaveComment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.leaveComment}
	 */
	leaveComment(data?: IReqLeaveComment): Promise<IResCommon>;
	/**
	 ** 删除留言
	 ** req: {@link IReqDeleteComment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.deleteComment}
	 */
	deleteComment(data?: IReqDeleteComment): Promise<IResCommon>;
	/**
	 ** 更新留言阅读记录
	 ** req: {@link IReqUpdateReadComment}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateReadComment}
	 */
	updateReadComment(data?: IReqUpdateReadComment): Promise<IResCommon>;
	/**
	 ** 获取滚动公告
	 ** req: {@link IReqFetchRollingNotice}
	 ** res: {@link IResFetchRollingNotice}
	 ** msgId: {@link EMessageID.fetchRollingNotice}
	 */
	fetchRollingNotice(data?: IReqFetchRollingNotice): Promise<IResFetchRollingNotice>;
	/**
	 ** 获取维护公告
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchMaintainNotice}
	 ** msgId: {@link EMessageID.fetchMaintainNotice}
	 */
	fetchMaintainNotice(data?: IReqCommon): Promise<IResFetchMaintainNotice>;
	/**
	 ** 获取服务器时间
	 ** req: {@link IReqCommon}
	 ** res: {@link IResServerTime}
	 ** msgId: {@link EMessageID.fetchServerTime}
	 */
	fetchServerTime(data?: IReqCommon): Promise<IResServerTime>;
	/**
	 ** 获取对应平台的商品列表
	 ** req: {@link IReqPlatformBillingProducts}
	 ** res: {@link IResPlatformBillingProducts}
	 ** msgId: {@link EMessageID.fetchPlatformProducts}
	 */
	fetchPlatformProducts(data?: IReqPlatformBillingProducts): Promise<IResPlatformBillingProducts>;
	/**
	 ** 获取角色随机池信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResRandomCharacter}
	 ** msgId: {@link EMessageID.fetchRandomCharacter}
	 */
	fetchRandomCharacter(data?: IReqCommon): Promise<IResRandomCharacter>;
	/**
	 ** 设置随机角色池
	 ** req: {@link IReqRandomCharacter}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.setRandomCharacter}
	 */
	setRandomCharacter(data?: IReqRandomCharacter): Promise<IResCommon>;
	/**
	 ** 取消 Google Play 订单
	 ** req: {@link IReqCancelGooglePlayOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.cancelGooglePlayOrder}
	 */
	cancelGooglePlayOrder(data?: IReqCancelGooglePlayOrder): Promise<IResCommon>;
	/**
	 ** 抽宝箱
	 ** req: {@link IReqOpenChest}
	 ** res: {@link IResOpenChest}
	 ** msgId: {@link EMessageID.openChest}
	 */
	openChest(data?: IReqOpenChest): Promise<IResOpenChest>;
	/**
	 ** 宝箱商店购买商品
	 ** req: {@link IReqBuyFromChestShop}
	 ** res: {@link IResBuyFromChestShop}
	 ** msgId: {@link EMessageID.buyFromChestShop}
	 */
	buyFromChestShop(data?: IReqBuyFromChestShop): Promise<IResBuyFromChestShop>;
	/**
	 ** 获取每日签到信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResDailySignInInfo}
	 ** msgId: {@link EMessageID.fetchDailySignInInfo}
	 */
	fetchDailySignInInfo(data?: IReqCommon): Promise<IResDailySignInInfo>;
	/**
	 ** 签到
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.doDailySignIn}
	 */
	doDailySignIn(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqDoActivitySignIn}
	 ** res: {@link IResDoActivitySignIn}
	 ** msgId: {@link EMessageID.doActivitySignIn}
	 */
	doActivitySignIn(data?: IReqDoActivitySignIn): Promise<IResDoActivitySignIn>;
	/**
	 ** 获取角色信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCharacterInfo}
	 ** msgId: {@link EMessageID.fetchCharacterInfo}
	 */
	fetchCharacterInfo(data?: IReqCommon): Promise<IResCharacterInfo>;
	/**
	 ** 更新角色排序
	 ** req: {@link IReqUpdateCharacterSort}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateCharacterSort}
	 */
	updateCharacterSort(data?: IReqUpdateCharacterSort): Promise<IResCommon>;
	/**
	 ** 切换主角色
	 ** req: {@link IReqChangeMainCharacter}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.changeMainCharacter}
	 */
	changeMainCharacter(data?: IReqChangeMainCharacter): Promise<IResCommon>;
	/**
	 ** 切换角色皮肤
	 ** req: {@link IReqChangeCharacterSkin}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.changeCharacterSkin}
	 */
	changeCharacterSkin(data?: IReqChangeCharacterSkin): Promise<IResCommon>;
	/**
	 ** 设置角色外观
	 ** req: {@link IReqChangeCharacterView}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.changeCharacterView}
	 */
	changeCharacterView(data?: IReqChangeCharacterView): Promise<IResCommon>;
	/**
	 ** 设置隐藏角色
	 ** req: {@link IReqSetHiddenCharacter}
	 ** res: {@link IResSetHiddenCharacter}
	 ** msgId: {@link EMessageID.setHiddenCharacter}
	 */
	setHiddenCharacter(data?: IReqSetHiddenCharacter): Promise<IResSetHiddenCharacter>;
	/**
	 ** 赠送礼物给角色
	 ** req: {@link IReqSendGiftToCharacter}
	 ** res: {@link IResSendGiftToCharacter}
	 ** msgId: {@link EMessageID.sendGiftToCharacter}
	 */
	sendGiftToCharacter(data?: IReqSendGiftToCharacter): Promise<IResSendGiftToCharacter>;
	/**
	 ** 出售道具（目前只有礼物可以出售）
	 ** req: {@link IReqSellItem}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.sellItem}
	 */
	sellItem(data?: IReqSellItem): Promise<IResCommon>;
	/**
	 ** 获取通用外观
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommonView}
	 ** msgId: {@link EMessageID.fetchCommonView}
	 */
	fetchCommonView(data?: IReqCommon): Promise<IResCommonView>;
	/**
	 ** 切换通用外观（牌桌，牌背等）
	 ** req: {@link IReqChangeCommonView}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.changeCommonView}
	 */
	changeCommonView(data?: IReqChangeCommonView): Promise<IResCommon>;
	/**
	 ** 保存通用外观方案
	 ** req: {@link IReqSaveCommonViews}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.saveCommonViews}
	 */
	saveCommonViews(data?: IReqSaveCommonViews): Promise<IResCommon>;
	/**
	 ** 获取通用外观方案
	 ** req: {@link IReqCommonViews}
	 ** res: {@link IResCommonViews}
	 ** msgId: {@link EMessageID.fetchCommonViews}
	 */
	fetchCommonViews(data?: IReqCommonViews): Promise<IResCommonViews>;
	/**
	 ** 获取所有通用外观方案
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAllcommonViews}
	 ** msgId: {@link EMessageID.fetchAllCommonViews}
	 */
	fetchAllCommonViews(data?: IReqCommon): Promise<IResAllcommonViews>;
	/**
	 ** req: {@link IReqUseCommonView}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.useCommonView}
	 */
	useCommonView(data?: IReqUseCommonView): Promise<IResCommon>;
	/**
	 ** 突破角色
	 ** req: {@link IReqUpgradeCharacter}
	 ** res: {@link IResUpgradeCharacter}
	 ** msgId: {@link EMessageID.upgradeCharacter}
	 */
	upgradeCharacter(data?: IReqUpgradeCharacter): Promise<IResUpgradeCharacter>;
	/**
	 ** ====角色传记相关====
	 ** 完成结局
	 ** req: {@link IReqFinishedEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.addFinishedEnding}
	 */
	addFinishedEnding(data?: IReqFinishedEnding): Promise<IResCommon>;
	/**
	 ** 领取结局奖励
	 ** req: {@link IReqFinishedEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.receiveEndingReward}
	 */
	receiveEndingReward(data?: IReqFinishedEnding): Promise<IResCommon>;
	/**
	 ** GM指令
	 ** req: {@link IReqGMCommand}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.gameMasterCommand}
	 */
	gameMasterCommand(data?: IReqGMCommand): Promise<IResCommon>;
	/**
	 ** 获取商店信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResShopInfo}
	 ** msgId: {@link EMessageID.fetchShopInfo}
	 */
	fetchShopInfo(data?: IReqCommon): Promise<IResShopInfo>;
	/**
	 ** 普通商店购买
	 ** req: {@link IReqBuyFromShop}
	 ** res: {@link IResBuyFromShop}
	 ** msgId: {@link EMessageID.buyFromShop}
	 */
	buyFromShop(data?: IReqBuyFromShop): Promise<IResBuyFromShop>;
	/**
	 ** 杂货铺购买
	 ** req: {@link IReqBuyFromZHP}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.buyFromZHP}
	 */
	buyFromZHP(data?: IReqBuyFromZHP): Promise<IResCommon>;
	/**
	 ** 刷新杂货铺商店
	 ** req: {@link IReqReshZHPShop}
	 ** res: {@link IResRefreshZHPShop}
	 ** msgId: {@link EMessageID.refreshZHPShop}
	 */
	refreshZHPShop(data?: IReqReshZHPShop): Promise<IResRefreshZHPShop>;
	/**
	 ** 获取账号月卡信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResMonthTicketInfo}
	 ** msgId: {@link EMessageID.fetchMonthTicketInfo}
	 */
	fetchMonthTicketInfo(data?: IReqCommon): Promise<IResMonthTicketInfo>;
	/**
	 ** 领取月卡工资
	 ** req: {@link IReqCommon}
	 ** res: {@link IResPayMonthTicket}
	 ** msgId: {@link EMessageID.payMonthTicket}
	 */
	payMonthTicket(data?: IReqCommon): Promise<IResPayMonthTicket>;
	/**
	 ** 兑换货币
	 ** req: {@link IReqExchangeCurrency}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.exchangeCurrency}
	 */
	exchangeCurrency(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 兑换寻觅石头
	 ** req: {@link IReqExchangeCurrency}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.exchangeChestStone}
	 */
	exchangeChestStone(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 皮肤券兑换辉玉
	 ** req: {@link IReqExchangeCurrency}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.exchangeDiamond}
	 */
	exchangeDiamond(data?: IReqExchangeCurrency): Promise<IResCommon>;
	/**
	 ** 获取服务器设置
	 ** req: {@link IReqCommon}
	 ** res: {@link IResServerSettings}
	 ** msgId: {@link EMessageID.fetchServerSettings}
	 */
	fetchServerSettings(data?: IReqCommon): Promise<IResServerSettings>;
	/**
	 ** 账户设置
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAccountSettings}
	 ** msgId: {@link EMessageID.fetchAccountSettings}
	 */
	fetchAccountSettings(data?: IReqCommon): Promise<IResAccountSettings>;
	/**
	 ** 更新账号设置
	 ** req: {@link IReqUpdateAccountSettings}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateAccountSettings}
	 */
	updateAccountSettings(data?: IReqUpdateAccountSettings): Promise<IResCommon>;
	/**
	 ** 获取改名时间
	 ** req: {@link IReqCommon}
	 ** res: {@link IResModNicknameTime}
	 ** msgId: {@link EMessageID.fetchModNicknameTime}
	 */
	fetchModNicknameTime(data?: IReqCommon): Promise<IResModNicknameTime>;
	/**
	 ** 创建微信支付（扫码支付）订单
	 ** req: {@link IReqCreateWechatNativeOrder}
	 ** res: {@link IResCreateWechatNativeOrder}
	 ** msgId: {@link EMessageID.createWechatNativeOrder}
	 */
	createWechatNativeOrder(data?: IReqCreateWechatNativeOrder): Promise<IResCreateWechatNativeOrder>;
	/**
	 ** 创建微信支付（App支付）订单
	 ** req: {@link IReqCreateWechatAppOrder}
	 ** res: {@link IResCreateWechatAppOrder}
	 ** msgId: {@link EMessageID.createWechatAppOrder}
	 */
	createWechatAppOrder(data?: IReqCreateWechatAppOrder): Promise<IResCreateWechatAppOrder>;
	/**
	 ** 创建支付宝（链接地址）订单
	 ** req: {@link IReqCreateAlipayOrder}
	 ** res: {@link IResCreateAlipayOrder}
	 ** msgId: {@link EMessageID.createAlipayOrder}
	 */
	createAlipayOrder(data?: IReqCreateAlipayOrder): Promise<IResCreateAlipayOrder>;
	/**
	 ** 创建支付宝（扫码支付）订单
	 ** req: {@link IReqCreateAlipayScanOrder}
	 ** res: {@link IResCreateAlipayScanOrder}
	 ** msgId: {@link EMessageID.createAlipayScanOrder}
	 */
	createAlipayScanOrder(data?: IReqCreateAlipayScanOrder): Promise<IResCreateAlipayScanOrder>;
	/**
	 ** 创建支付宝（App支付）订单
	 ** req: {@link IReqCreateAlipayAppOrder}
	 ** res: {@link IResCreateAlipayAppOrder}
	 ** msgId: {@link EMessageID.createAlipayAppOrder}
	 */
	createAlipayAppOrder(data?: IReqCreateAlipayAppOrder): Promise<IResCreateAlipayAppOrder>;
	/**
	 ** 创建日服-CreditCard订单
	 ** req: {@link IReqCreateJPCreditCardOrder}
	 ** res: {@link IResCreateJPCreditCardOrder}
	 ** msgId: {@link EMessageID.createJPCreditCardOrder}
	 */
	createJPCreditCardOrder(data?: IReqCreateJPCreditCardOrder): Promise<IResCreateJPCreditCardOrder>;
	/**
	 ** 创建日服-Paypal订单
	 ** req: {@link IReqCreateJPPaypalOrder}
	 ** res: {@link IResCreateJPPaypalOrder}
	 ** msgId: {@link EMessageID.createJPPaypalOrder}
	 */
	createJPPaypalOrder(data?: IReqCreateJPPaypalOrder): Promise<IResCreateJPPaypalOrder>;
	/**
	 ** 创建日服-Au订单
	 ** req: {@link IReqCreateJPAuOrder}
	 ** res: {@link IResCreateJPAuOrder}
	 ** msgId: {@link EMessageID.createJPAuOrder}
	 */
	createJPAuOrder(data?: IReqCreateJPAuOrder): Promise<IResCreateJPAuOrder>;
	/**
	 ** 创建日服-Docomo订单
	 ** req: {@link IReqCreateJPDocomoOrder}
	 ** res: {@link IResCreateJPDocomoOrder}
	 ** msgId: {@link EMessageID.createJPDocomoOrder}
	 */
	createJPDocomoOrder(data?: IReqCreateJPDocomoOrder): Promise<IResCreateJPDocomoOrder>;
	/**
	 ** 创建日服-WebMoney订单
	 ** req: {@link IReqCreateJPWebMoneyOrder}
	 ** res: {@link IResCreateJPWebMoneyOrder}
	 ** msgId: {@link EMessageID.createJPWebMoneyOrder}
	 */
	createJPWebMoneyOrder(data?: IReqCreateJPWebMoneyOrder): Promise<IResCreateJPWebMoneyOrder>;
	/**
	 ** 创建日服-Softbank订单
	 ** req: {@link IReqCreateJPSoftbankOrder}
	 ** res: {@link IResCreateJPSoftbankOrder}
	 ** msgId: {@link EMessageID.createJPSoftbankOrder}
	 */
	createJPSoftbankOrder(data?: IReqCreateJPSoftbankOrder): Promise<IResCreateJPSoftbankOrder>;
	/**
	 ** 创建日服-Paypay订单
	 ** req: {@link IReqCreateJPPayPayOrder}
	 ** res: {@link IResCreateJPPayPayOrder}
	 ** msgId: {@link EMessageID.createJPPayPayOrder}
	 */
	createJPPayPayOrder(data?: IReqCreateJPPayPayOrder): Promise<IResCreateJPPayPayOrder>;
	/**
	 ** 获取日服信用卡订单信息
	 ** req: {@link IReqFetchJPCommonCreditCardOrder}
	 ** res: {@link IResFetchJPCommonCreditCardOrder}
	 ** msgId: {@link EMessageID.fetchJPCommonCreditCardOrder}
	 */
	fetchJPCommonCreditCardOrder(data?: IReqFetchJPCommonCreditCardOrder): Promise<IResFetchJPCommonCreditCardOrder>;
	/**
	 ** 创建日服-GMO订单
	 ** req: {@link IReqCreateJPGMOOrder}
	 ** res: {@link IResCreateJPGMOOrder}
	 ** msgId: {@link EMessageID.createJPGMOOrder}
	 */
	createJPGMOOrder(data?: IReqCreateJPGMOOrder): Promise<IResCreateJPGMOOrder>;
	/**
	 ** 创建美服-Paypal订单
	 ** req: {@link IReqCreateENPaypalOrder}
	 ** res: {@link IResCreateENPaypalOrder}
	 ** msgId: {@link EMessageID.createENPaypalOrder}
	 */
	createENPaypalOrder(data?: IReqCreateENPaypalOrder): Promise<IResCreateENPaypalOrder>;
	/**
	 ** 创建美服-MasterCard订单
	 ** req: {@link IReqCreateENMasterCardOrder}
	 ** res: {@link IResCreateENMasterCardOrder}
	 ** msgId: {@link EMessageID.createENMasterCardOrder}
	 */
	createENMasterCardOrder(data?: IReqCreateENMasterCardOrder): Promise<IResCreateENMasterCardOrder>;
	/**
	 ** 创建美服-Visa订单
	 ** req: {@link IReqCreateENVisaOrder}
	 ** res: {@link IResCreateENVisaOrder}
	 ** msgId: {@link EMessageID.createENVisaOrder}
	 */
	createENVisaOrder(data?: IReqCreateENVisaOrder): Promise<IResCreateENVisaOrder>;
	/**
	 ** 创建美服-JCB订单
	 ** req: {@link IReqCreateENJCBOrder}
	 ** res: {@link IResCreateENJCBOrder}
	 ** msgId: {@link EMessageID.createENJCBOrder}
	 */
	createENJCBOrder(data?: IReqCreateENJCBOrder): Promise<IResCreateENJCBOrder>;
	/**
	 ** 创建美服-Alipay订单
	 ** req: {@link IReqCreateENAlipayOrder}
	 ** res: {@link IResCreateENAlipayOrder}
	 ** msgId: {@link EMessageID.createENAlipayOrder}
	 */
	createENAlipayOrder(data?: IReqCreateENAlipayOrder): Promise<IResCreateENAlipayOrder>;
	/**
	 ** 创建韩服-Paypal订单
	 ** req: {@link IReqCreateKRPaypalOrder}
	 ** res: {@link IResCreateKRPaypalOrder}
	 ** msgId: {@link EMessageID.createKRPaypalOrder}
	 */
	createKRPaypalOrder(data?: IReqCreateKRPaypalOrder): Promise<IResCreateKRPaypalOrder>;
	/**
	 ** 创建韩服-MasterCard订单
	 ** req: {@link IReqCreateKRMasterCardOrder}
	 ** res: {@link IResCreateKRMasterCardOrder}
	 ** msgId: {@link EMessageID.createKRMasterCardOrder}
	 */
	createKRMasterCardOrder(data?: IReqCreateKRMasterCardOrder): Promise<IResCreateKRMasterCardOrder>;
	/**
	 ** 创建韩服-Visa订单
	 ** req: {@link IReqCreateKRVisaOrder}
	 ** res: {@link IResCreateKRVisaOrder}
	 ** msgId: {@link EMessageID.createKRVisaOrder}
	 */
	createKRVisaOrder(data?: IReqCreateKRVisaOrder): Promise<IResCreateKRVisaOrder>;
	/**
	 ** 创建韩服-JCB订单
	 ** req: {@link IReqCreateKRJCBOrder}
	 ** res: {@link IResCreateKRJCBOrder}
	 ** msgId: {@link EMessageID.createKRJCBOrder}
	 */
	createKRJCBOrder(data?: IReqCreateKRJCBOrder): Promise<IResCreateKRJCBOrder>;
	/**
	 ** 创建韩服-Alipay订单
	 ** req: {@link IReqCreateKRAlipayOrder}
	 ** res: {@link IResCreateKRAlipayOrder}
	 ** msgId: {@link EMessageID.createKRAlipayOrder}
	 */
	createKRAlipayOrder(data?: IReqCreateKRAlipayOrder): Promise<IResCreateKRAlipayOrder>;
	/**
	 ** 创建DMM订单
	 ** req: {@link IReqCreateDMMOrder}
	 ** res: {@link IResCreateDmmOrder}
	 ** msgId: {@link EMessageID.createDMMOrder}
	 */
	createDMMOrder(data?: IReqCreateDMMOrder): Promise<IResCreateDmmOrder>;
	/**
	 ** 创建苹果内购订单
	 ** req: {@link IReqCreateIAPOrder}
	 ** res: {@link IResCreateIAPOrder}
	 ** msgId: {@link EMessageID.createIAPOrder}
	 */
	createIAPOrder(data?: IReqCreateIAPOrder): Promise<IResCreateIAPOrder>;
	/**
	 ** 创建Steam订单
	 ** req: {@link IReqCreateSteamOrder}
	 ** res: {@link IResCreateSteamOrder}
	 ** msgId: {@link EMessageID.createSteamOrder}
	 */
	createSteamOrder(data?: IReqCreateSteamOrder): Promise<IResCreateSteamOrder>;
	/**
	 ** Steam验单
	 ** req: {@link IReqVerifySteamOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.verifySteamOrder}
	 */
	verifySteamOrder(data?: IReqVerifySteamOrder): Promise<IResCommon>;
	/**
	 ** 创建MyCard Android订单
	 ** req: {@link IReqCreateMyCardOrder}
	 ** res: {@link IResCreateMyCardOrder}
	 ** msgId: {@link EMessageID.createMyCardAndroidOrder}
	 */
	createMyCardAndroidOrder(data?: IReqCreateMyCardOrder): Promise<IResCreateMyCardOrder>;
	/**
	 ** 创建MyCard Web订单
	 ** req: {@link IReqCreateMyCardOrder}
	 ** res: {@link IResCreateMyCardOrder}
	 ** msgId: {@link EMessageID.createMyCardWebOrder}
	 */
	createMyCardWebOrder(data?: IReqCreateMyCardOrder): Promise<IResCreateMyCardOrder>;
	/**
	 ** 创建Paypal订单
	 ** req: {@link IReqCreatePaypalOrder}
	 ** res: {@link IResCreatePaypalOrder}
	 ** msgId: {@link EMessageID.createPaypalOrder}
	 */
	createPaypalOrder(data?: IReqCreatePaypalOrder): Promise<IResCreatePaypalOrder>;
	/**
	 ** 创建Xsolla订单
	 ** req: {@link IReqCreateXsollaOrder}
	 ** res: {@link IResCreateXsollaOrder}
	 ** msgId: {@link EMessageID.createXsollaOrder}
	 */
	createXsollaOrder(data?: IReqCreateXsollaOrder): Promise<IResCreateXsollaOrder>;
	/**
	 ** 创建XsollaV4订单
	 ** req: {@link IReqCreateXsollaOrder}
	 ** res: {@link IResCreateXsollaOrder}
	 ** msgId: {@link EMessageID.createXsollaV4Order}
	 */
	createXsollaV4Order(data?: IReqCreateXsollaOrder): Promise<IResCreateXsollaOrder>;
	/**
	 ** MyCard验单
	 ** req: {@link IReqVerifyMyCardOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.verifyMyCardOrder}
	 */
	verifyMyCardOrder(data?: IReqVerifyMyCardOrder): Promise<IResCommon>;
	/**
	 ** 验证苹果内购订单
	 ** req: {@link IReqVerificationIAPOrder}
	 ** res: {@link IResVerificationIAPOrder}
	 ** msgId: {@link EMessageID.verificationIAPOrder}
	 */
	verificationIAPOrder(data?: IReqVerificationIAPOrder): Promise<IResVerificationIAPOrder>;
	/**
	 ** 创建Yostar-SDK订单
	 ** req: {@link IReqCreateYostarOrder}
	 ** res: {@link IResCreateYostarOrder}
	 ** msgId: {@link EMessageID.createYostarSDKOrder}
	 */
	createYostarSDKOrder(data?: IReqCreateYostarOrder): Promise<IResCreateYostarOrder>;
	/**
	 ** 创建支付订单
	 ** req: {@link IReqCreateBillingOrder}
	 ** res: {@link IResCreateBillingOrder}
	 ** msgId: {@link EMessageID.createBillingOrder}
	 */
	createBillingOrder(data?: IReqCreateBillingOrder): Promise<IResCreateBillingOrder>;
	/**
	 ** 处理 Google Play 订单支付结果
	 ** req: {@link IReqSolveGooglePlayOrder}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.solveGooglePlayOrder}
	 */
	solveGooglePlayOrder(data?: IReqSolveGooglePlayOrder): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSolveGooglePlayOrderV3}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.solveGooglePayOrderV3}
	 */
	solveGooglePayOrderV3(data?: IReqSolveGooglePlayOrderV3): Promise<IResCommon>;
	/**
	 ** 处理 AA32 订单
	 ** req: {@link IReqDeliverAA32Order}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.deliverAA32Order}
	 */
	deliverAA32Order(data?: IReqDeliverAA32Order): Promise<IResCommon>;
	/**
	 ** 获取账号杂七杂八的数据
	 ** req: {@link IReqCommon}
	 ** res: {@link IResMisc}
	 ** msgId: {@link EMessageID.fetchMisc}
	 */
	fetchMisc(data?: IReqCommon): Promise<IResMisc>;
	/**
	 ** 修改签名
	 ** req: {@link IReqModifySignature}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.modifySignature}
	 */
	modifySignature(data?: IReqModifySignature): Promise<IResCommon>;
	/**
	 ** 获取实名认证信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResIDCardInfo}
	 ** msgId: {@link EMessageID.fetchIDCardInfo}
	 */
	fetchIDCardInfo(data?: IReqCommon): Promise<IResIDCardInfo>;
	/**
	 ** 进行实名认证
	 ** req: {@link IReqUpdateIDCardInfo}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateIDCardInfo}
	 */
	updateIDCardInfo(data?: IReqUpdateIDCardInfo): Promise<IResCommon>;
	/**
	 ** 获取vip奖励领取状态
	 ** req: {@link IReqCommon}
	 ** res: {@link IResVipReward}
	 ** msgId: {@link EMessageID.fetchVipReward}
	 */
	fetchVipReward(data?: IReqCommon): Promise<IResVipReward>;
	/**
	 ** 领取vip奖励
	 ** req: {@link IReqGainVipReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.gainVipReward}
	 */
	gainVipReward(data?: IReqGainVipReward): Promise<IResCommon>;
	/**
	 ** 获取需要补单的订单信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchRefundOrder}
	 ** msgId: {@link EMessageID.fetchRefundOrder}
	 */
	fetchRefundOrder(data?: IReqCommon): Promise<IResFetchRefundOrder>;
	/**
	 ** 获取赛事列表
	 ** req: {@link IReqFetchCustomizedContestList}
	 ** res: {@link IResFetchCustomizedContestList}
	 ** msgId: {@link EMessageID.fetchCustomizedContestList}
	 */
	fetchCustomizedContestList(data?: IReqFetchCustomizedContestList): Promise<IResFetchCustomizedContestList>;
	/**
	 ** 获取赛事权限相关信息
	 ** req: {@link IReqFetchCustomizedContestAuthInfo}
	 ** res: {@link IResFetchCustomizedContestAuthInfo}
	 ** msgId: {@link EMessageID.fetchCustomizedContestAuthInfo}
	 */
	fetchCustomizedContestAuthInfo(data?: IReqFetchCustomizedContestAuthInfo): Promise<IResFetchCustomizedContestAuthInfo>;
	/**
	 ** 进入赛事
	 ** req: {@link IReqEnterCustomizedContest}
	 ** res: {@link IResEnterCustomizedContest}
	 ** msgId: {@link EMessageID.enterCustomizedContest}
	 */
	enterCustomizedContest(data?: IReqEnterCustomizedContest): Promise<IResEnterCustomizedContest>;
	/**
	 ** 退出赛事
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.leaveCustomizedContest}
	 */
	leaveCustomizedContest(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 请求比赛在线信息
	 ** req: {@link IReqFetchCustomizedContestOnlineInfo}
	 ** res: {@link IResFetchCustomizedContestOnlineInfo}
	 ** msgId: {@link EMessageID.fetchCustomizedContestOnlineInfo}
	 */
	fetchCustomizedContestOnlineInfo(data?: IReqFetchCustomizedContestOnlineInfo): Promise<IResFetchCustomizedContestOnlineInfo>;
	/**
	 ** 获取赛事基本信息（通过赛事ID）
	 ** req: {@link IReqFetchCustomizedContestByContestId}
	 ** res: {@link IResFetchCustomizedContestByContestId}
	 ** msgId: {@link EMessageID.fetchCustomizedContestByContestId}
	 */
	fetchCustomizedContestByContestId(data?: IReqFetchCustomizedContestByContestId): Promise<IResFetchCustomizedContestByContestId>;
	/**
	 ** 报名比赛
	 ** req: {@link IReqSignupCustomizedContest}
	 ** res: {@link IResSignupCustomizedContest}
	 ** msgId: {@link EMessageID.signupCustomizedContest}
	 */
	signupCustomizedContest(data?: IReqSignupCustomizedContest): Promise<IResSignupCustomizedContest>;
	/**
	 ** 开始比赛匹配
	 ** req: {@link IReqStartCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.startCustomizedContest}
	 */
	startCustomizedContest(data?: IReqStartCustomizedContest): Promise<IResCommon>;
	/**
	 ** 停止比赛匹配
	 ** req: {@link IReqStopCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.stopCustomizedContest}
	 */
	stopCustomizedContest(data?: IReqStopCustomizedContest): Promise<IResCommon>;
	/**
	 ** 进入比赛聊天室
	 ** req: {@link IReqJoinCustomizedContestChatRoom}
	 ** res: {@link IResJoinCustomizedContestChatRoom}
	 ** msgId: {@link EMessageID.joinCustomizedContestChatRoom}
	 */
	joinCustomizedContestChatRoom(data?: IReqJoinCustomizedContestChatRoom): Promise<IResJoinCustomizedContestChatRoom>;
	/**
	 ** 退出比赛聊天室
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.leaveCustomizedContestChatRoom}
	 */
	leaveCustomizedContestChatRoom(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 发送聊天消息
	 ** req: {@link IReqSayChatMessage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.sayChatMessage}
	 */
	sayChatMessage(data?: IReqSayChatMessage): Promise<IResCommon>;
	/**
	 ** 查询赛事牌谱列表
	 ** req: {@link IReqFetchCustomizedContestGameRecords}
	 ** res: {@link IResFetchCustomizedContestGameRecords}
	 ** msgId: {@link EMessageID.fetchCustomizedContestGameRecords}
	 */
	fetchCustomizedContestGameRecords(data?: IReqFetchCustomizedContestGameRecords): Promise<IResFetchCustomizedContestGameRecords>;
	/**
	 ** 获取正在直播的比赛游戏列表
	 ** req: {@link IReqFetchCustomizedContestGameLiveList}
	 ** res: {@link IResFetchCustomizedContestGameLiveList}
	 ** msgId: {@link EMessageID.fetchCustomizedContestGameLiveList}
	 */
	fetchCustomizedContestGameLiveList(data?: IReqFetchCustomizedContestGameLiveList): Promise<IResFetchCustomizedContestGameLiveList>;
	/**
	 ** 关注自定义比赛
	 ** req: {@link IReqTargetCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.followCustomizedContest}
	 */
	followCustomizedContest(data?: IReqTargetCustomizedContest): Promise<IResCommon>;
	/**
	 ** 取消关注自定义比赛
	 ** req: {@link IReqTargetCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.unfollowCustomizedContest}
	 */
	unfollowCustomizedContest(data?: IReqTargetCustomizedContest): Promise<IResCommon>;
	/**
	 ** 获取大会室队伍排名
	 ** req: {@link IReqFetchContestTeamRank}
	 ** res: {@link IResFetchContestTeamRank}
	 ** msgId: {@link EMessageID.fetchContestTeamRank}
	 */
	fetchContestTeamRank(data?: IReqFetchContestTeamRank): Promise<IResFetchContestTeamRank>;
	/**
	 ** 获取大会室队伍成员
	 ** req: {@link IReqFetchContestTeamMember}
	 ** res: {@link IResFetchContestTeamMember}
	 ** msgId: {@link EMessageID.fetchContestTeamMember}
	 */
	fetchContestTeamMember(data?: IReqFetchContestTeamMember): Promise<IResFetchContestTeamMember>;
	/**
	 ** 获取大会室队伍成员排名
	 ** req: {@link IReqFetchContestTeamPlayerRank}
	 ** res: {@link IResFetchContestPlayerRank}
	 ** msgId: {@link EMessageID.fetchContestTeamPlayerRank}
	 */
	fetchContestTeamPlayerRank(data?: IReqFetchContestTeamPlayerRank): Promise<IResFetchContestPlayerRank>;
	/**
	 ** 获取大会室玩家排名
	 ** req: {@link IReqFetchContestPlayerRank}
	 ** res: {@link IResFetchContestPlayerRank}
	 ** msgId: {@link EMessageID.fetchContestPlayerRank}
	 */
	fetchContestPlayerRank(data?: IReqFetchContestPlayerRank): Promise<IResFetchContestPlayerRank>;
	/**
	 ** 获取活动列表
	 ** req: {@link IReqCommon}
	 ** res: {@link IResActivityList}
	 ** msgId: {@link EMessageID.fetchActivityList}
	 */
	fetchActivityList(data?: IReqCommon): Promise<IResActivityList>;
	/**
	 ** 获取玩家活动数据
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAccountActivityData}
	 ** msgId: {@link EMessageID.fetchAccountActivityData}
	 */
	fetchAccountActivityData(data?: IReqCommon): Promise<IResAccountActivityData>;
	/**
	 ** 兑换活动
	 ** req: {@link IReqExchangeActivityItem}
	 ** res: {@link IResExchangeActivityItem}
	 ** msgId: {@link EMessageID.exchangeActivityItem}
	 */
	exchangeActivityItem(data?: IReqExchangeActivityItem): Promise<IResExchangeActivityItem>;
	/**
	 ** 领取活动任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completeActivityTask}
	 */
	completeActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompleteActivityTaskBatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completeActivityTaskBatch}
	 */
	completeActivityTaskBatch(data?: IReqCompleteActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 领取翻牌牌任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completeActivityFlipTask}
	 */
	completeActivityFlipTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompleteActivityFlipTaskBatch}
	 ** res: {@link IResCompleteActivityFlipTaskBatch}
	 ** msgId: {@link EMessageID.completeActivityFlipTaskBatch}
	 */
	completeActivityFlipTaskBatch(data?: IReqCompleteActivityFlipTaskBatch): Promise<IResCompleteActivityFlipTaskBatch>;
	/**
	 ** 领取长期任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completePeriodActivityTask}
	 */
	completePeriodActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompletePeriodActivityTaskBatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completePeriodActivityTaskBatch}
	 */
	completePeriodActivityTaskBatch(data?: IReqCompletePeriodActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 领取随机任务奖励
	 ** req: {@link IReqCompleteActivityTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completeRandomActivityTask}
	 */
	completeRandomActivityTask(data?: IReqCompleteActivityTask): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCompleteActivityTaskBatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.completeRandomActivityTaskBatch}
	 */
	completeRandomActivityTaskBatch(data?: IReqCompleteActivityTaskBatch): Promise<IResCommon>;
	/**
	 ** 翻牌牌领任务
	 ** req: {@link IReqReceiveActivityFlipTask}
	 ** res: {@link IResReceiveActivityFlipTask}
	 ** msgId: {@link EMessageID.receiveActivityFlipTask}
	 */
	receiveActivityFlipTask(data?: IReqReceiveActivityFlipTask): Promise<IResReceiveActivityFlipTask>;
	/**
	 ** req: {@link IReqReceiveActivityFlipTaskBatch}
	 ** res: {@link IResReceiveActivityFlipTaskBatch}
	 ** msgId: {@link EMessageID.receiveActivityFlipTaskBatch}
	 */
	receiveActivityFlipTaskBatch(data?: IReqReceiveActivityFlipTaskBatch): Promise<IResReceiveActivityFlipTaskBatch>;
	/**
	 ** 领取分段任务奖励
	 ** req: {@link IReqCompleteSegmentTaskReward}
	 ** res: {@link IResCompleteSegmentTaskReward}
	 ** msgId: {@link EMessageID.completeSegmentTaskReward}
	 */
	completeSegmentTaskReward(data?: IReqCompleteSegmentTaskReward): Promise<IResCompleteSegmentTaskReward>;
	/**
	 ** 获取翻牌牌任务信息
	 ** req: {@link IReqFetchActivityFlipInfo}
	 ** res: {@link IResFetchActivityFlipInfo}
	 ** msgId: {@link EMessageID.fetchActivityFlipInfo}
	 */
	fetchActivityFlipInfo(data?: IReqFetchActivityFlipInfo): Promise<IResFetchActivityFlipInfo>;
	/**
	 ** 领取得点活动奖励
	 ** req: {@link IReqGainAccumulatedPointActivityReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.gainAccumulatedPointActivityReward}
	 */
	gainAccumulatedPointActivityReward(data?: IReqGainAccumulatedPointActivityReward): Promise<IResCommon>;
	/**
	 ** 批量领取得点活动奖励
	 ** req: {@link IReqGainMultiPointActivityReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.gainMultiPointActivityReward}
	 */
	gainMultiPointActivityReward(data?: IReqGainMultiPointActivityReward): Promise<IResCommon>;
	/**
	 ** 获取得分排行榜数据
	 ** req: {@link IReqFetchRankPointLeaderboard}
	 ** res: {@link IResFetchRankPointLeaderboard}
	 ** msgId: {@link EMessageID.fetchRankPointLeaderboard}
	 */
	fetchRankPointLeaderboard(data?: IReqFetchRankPointLeaderboard): Promise<IResFetchRankPointLeaderboard>;
	/**
	 ** 领取得分排行奖励
	 ** req: {@link IReqGainRankPointReward}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.gainRankPointReward}
	 */
	gainRankPointReward(data?: IReqGainRankPointReward): Promise<IResCommon>;
	/**
	 ** 大富翁投骰子
	 ** req: {@link IReqRichmanNextMove}
	 ** res: {@link IResRichmanNextMove}
	 ** msgId: {@link EMessageID.richmanActivityNextMove}
	 */
	richmanActivityNextMove(data?: IReqRichmanNextMove): Promise<IResRichmanNextMove>;
	/**
	 ** 大富翁遥控骰子
	 ** req: {@link IReqRichmanSpecialMove}
	 ** res: {@link IResRichmanNextMove}
	 ** msgId: {@link EMessageID.richmanAcitivitySpecialMove}
	 */
	richmanAcitivitySpecialMove(data?: IReqRichmanSpecialMove): Promise<IResRichmanNextMove>;
	/**
	 ** 大富翁宝箱信息
	 ** req: {@link IReqRichmanChestInfo}
	 ** res: {@link IResRichmanChestInfo}
	 ** msgId: {@link EMessageID.richmanActivityChestInfo}
	 */
	richmanActivityChestInfo(data?: IReqRichmanChestInfo): Promise<IResRichmanChestInfo>;
	/**
	 ** 创建实时OB权限
	 ** req: {@link IReqCreateGameObserveAuth}
	 ** res: {@link IResCreateGameObserveAuth}
	 ** msgId: {@link EMessageID.createGameObserveAuth}
	 */
	createGameObserveAuth(data?: IReqCreateGameObserveAuth): Promise<IResCreateGameObserveAuth>;
	/**
	 ** 刷新实时OB权限时长
	 ** req: {@link IReqRefreshGameObserveAuth}
	 ** res: {@link IResRefreshGameObserveAuth}
	 ** msgId: {@link EMessageID.refreshGameObserveAuth}
	 */
	refreshGameObserveAuth(data?: IReqRefreshGameObserveAuth): Promise<IResRefreshGameObserveAuth>;
	/**
	 ** 获取活动buff信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResActivityBuff}
	 ** msgId: {@link EMessageID.fetchActivityBuff}
	 */
	fetchActivityBuff(data?: IReqCommon): Promise<IResActivityBuff>;
	/**
	 ** 升级活动buff
	 ** req: {@link IReqUpgradeActivityBuff}
	 ** res: {@link IResActivityBuff}
	 ** msgId: {@link EMessageID.upgradeActivityBuff}
	 */
	upgradeActivityBuff(data?: IReqUpgradeActivityBuff): Promise<IResActivityBuff>;
	/**
	 ** 升级活动升级
	 ** req: {@link IReqUpgradeActivityLevel}
	 ** res: {@link IResUpgradeActivityLevel}
	 ** msgId: {@link EMessageID.upgradeActivityLevel}
	 */
	upgradeActivityLevel(data?: IReqUpgradeActivityLevel): Promise<IResUpgradeActivityLevel>;
	/**
	 ** 获取总等级奖励
	 ** req: {@link IReqReceiveUpgradeActivityReward}
	 ** res: {@link IResReceiveUpgradeActivityReward}
	 ** msgId: {@link EMessageID.receiveUpgradeActivityReward}
	 */
	receiveUpgradeActivityReward(data?: IReqReceiveUpgradeActivityReward): Promise<IResReceiveUpgradeActivityReward>;
	/**
	 ** 试炼赛升级
	 ** req: {@link IReqCommon}
	 ** res: {@link IResUpgradeChallenge}
	 ** msgId: {@link EMessageID.upgradeChallenge}
	 */
	upgradeChallenge(data?: IReqCommon): Promise<IResUpgradeChallenge>;
	/**
	 ** 再发行
	 ** req: {@link IReqCommon}
	 ** res: {@link IResRefreshChallenge}
	 ** msgId: {@link EMessageID.refreshChallenge}
	 */
	refreshChallenge(data?: IReqCommon): Promise<IResRefreshChallenge>;
	/**
	 ** 获取试炼赛信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchChallengeInfo}
	 ** msgId: {@link EMessageID.fetchChallengeInfo}
	 */
	fetchChallengeInfo(data?: IReqCommon): Promise<IResFetchChallengeInfo>;
	/**
	 ** 盖章完成试炼任务
	 ** req: {@link IReqForceCompleteChallengeTask}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.forceCompleteChallengeTask}
	 */
	forceCompleteChallengeTask(data?: IReqForceCompleteChallengeTask): Promise<IResCommon>;
	/**
	 ** 获取当前试炼赛信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResChallengeSeasonInfo}
	 ** msgId: {@link EMessageID.fetchChallengeSeason}
	 */
	fetchChallengeSeason(data?: IReqCommon): Promise<IResChallengeSeasonInfo>;
	/**
	 ** 获取试炼赛排名奖励
	 ** req: {@link IReqReceiveChallengeRankReward}
	 ** res: {@link IResReceiveChallengeRankReward}
	 ** msgId: {@link EMessageID.receiveChallengeRankReward}
	 */
	receiveChallengeRankReward(data?: IReqReceiveChallengeRankReward): Promise<IResReceiveChallengeRankReward>;
	/**
	 ** AB赛
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchABMatch}
	 ** msgId: {@link EMessageID.fetchABMatchInfo}
	 */
	fetchABMatchInfo(data?: IReqCommon): Promise<IResFetchABMatch>;
	/**
	 ** req: {@link IReqBuyInABMatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.buyInABMatch}
	 */
	buyInABMatch(data?: IReqBuyInABMatch): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.receiveABMatchReward}
	 */
	receiveABMatchReward(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.quitABMatch}
	 */
	quitABMatch(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqStartUnifiedMatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.startUnifiedMatch}
	 */
	startUnifiedMatch(data?: IReqStartUnifiedMatch): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCancelUnifiedMatch}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.cancelUnifiedMatch}
	 */
	cancelUnifiedMatch(data?: IReqCancelUnifiedMatch): Promise<IResCommon>;
	/**
	 ** req: {@link IReqGamePointRank}
	 ** res: {@link IResGamePointRank}
	 ** msgId: {@link EMessageID.fetchGamePointRank}
	 */
	fetchGamePointRank(data?: IReqGamePointRank): Promise<IResGamePointRank>;
	/**
	 ** req: {@link IReqGamePointRank}
	 ** res: {@link IResFetchSelfGamePointRank}
	 ** msgId: {@link EMessageID.fetchSelfGamePointRank}
	 */
	fetchSelfGamePointRank(data?: IReqGamePointRank): Promise<IResFetchSelfGamePointRank>;
	/**
	 ** SNS活动
	 ** req: {@link IReqReadSNS}
	 ** res: {@link IResReadSNS}
	 ** msgId: {@link EMessageID.readSNS}
	 */
	readSNS(data?: IReqReadSNS): Promise<IResReadSNS>;
	/**
	 ** req: {@link IReqReplySNS}
	 ** res: {@link IResReplySNS}
	 ** msgId: {@link EMessageID.replySNS}
	 */
	replySNS(data?: IReqReplySNS): Promise<IResReplySNS>;
	/**
	 ** req: {@link IReqLikeSNS}
	 ** res: {@link IResLikeSNS}
	 ** msgId: {@link EMessageID.likeSNS}
	 */
	likeSNS(data?: IReqLikeSNS): Promise<IResLikeSNS>;
	/**
	 ** 挖矿活动
	 ** req: {@link IReqDigMine}
	 ** res: {@link IResDigMine}
	 ** msgId: {@link EMessageID.digMine}
	 */
	digMine(data?: IReqDigMine): Promise<IResDigMine>;
	/**
	 ** 用户协议
	 ** req: {@link IReqFetchLastPrivacy}
	 ** res: {@link IResFetchLastPrivacy}
	 ** msgId: {@link EMessageID.fetchLastPrivacy}
	 */
	fetchLastPrivacy(data?: IReqFetchLastPrivacy): Promise<IResFetchLastPrivacy>;
	/**
	 ** req: {@link IReqCheckPrivacy}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.checkPrivacy}
	 */
	checkPrivacy(data?: IReqCheckPrivacy): Promise<IResCommon>;
	/**
	 ** rpg活动
	 ** req: {@link IReqFetchRPGBattleHistory}
	 ** res: {@link IResFetchRPGBattleHistory}
	 ** msgId: {@link EMessageID.fetchRPGBattleHistory}
	 */
	fetchRPGBattleHistory(data?: IReqFetchRPGBattleHistory): Promise<IResFetchRPGBattleHistory>;
	/**
	 ** req: {@link IReqFetchRPGBattleHistory}
	 ** res: {@link IResFetchRPGBattleHistoryV2}
	 ** msgId: {@link EMessageID.fetchRPGBattleHistoryV2}
	 */
	fetchRPGBattleHistoryV2(data?: IReqFetchRPGBattleHistory): Promise<IResFetchRPGBattleHistoryV2>;
	/**
	 ** req: {@link IReqReceiveRPGRewards}
	 ** res: {@link IResReceiveRPGRewards}
	 ** msgId: {@link EMessageID.receiveRPGRewards}
	 */
	receiveRPGRewards(data?: IReqReceiveRPGRewards): Promise<IResReceiveRPGRewards>;
	/**
	 ** req: {@link IReqReceiveRPGReward}
	 ** res: {@link IResReceiveRPGRewards}
	 ** msgId: {@link EMessageID.receiveRPGReward}
	 */
	receiveRPGReward(data?: IReqReceiveRPGReward): Promise<IResReceiveRPGRewards>;
	/**
	 ** 竞技场活动
	 ** req: {@link IReqBuyArenaTicket}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.buyArenaTicket}
	 */
	buyArenaTicket(data?: IReqBuyArenaTicket): Promise<IResCommon>;
	/**
	 ** req: {@link IReqEnterArena}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.enterArena}
	 */
	enterArena(data?: IReqEnterArena): Promise<IResCommon>;
	/**
	 ** req: {@link IReqArenaReward}
	 ** res: {@link IResArenaReward}
	 ** msgId: {@link EMessageID.receiveArenaReward}
	 */
	receiveArenaReward(data?: IReqArenaReward): Promise<IResArenaReward>;
	/**
	 ** 观战
	 ** req: {@link IReqFetchOBToken}
	 ** res: {@link IResFetchOBToken}
	 ** msgId: {@link EMessageID.fetchOBToken}
	 */
	fetchOBToken(data?: IReqFetchOBToken): Promise<IResFetchOBToken>;
	/**
	 ** 角色好感度
	 ** req: {@link IReqReceiveCharacterRewards}
	 ** res: {@link IResReceiveCharacterRewards}
	 ** msgId: {@link EMessageID.receiveCharacterRewards}
	 */
	receiveCharacterRewards(data?: IReqReceiveCharacterRewards): Promise<IResReceiveCharacterRewards>;
	/**
	 ** 喂年兽活动 -> 已经拆分成 friend-gift 与 upgrade 活动，这个协议不再使用
	 ** req: {@link IReqFeedActivityFeed}
	 ** res: {@link IResFeedActivityFeed}
	 ** msgId: {@link EMessageID.feedActivityFeed}
	 */
	feedActivityFeed(data?: IReqFeedActivityFeed): Promise<IResFeedActivityFeed>;
	/**
	 ** 送礼活动
	 ** req: {@link IReqSendActivityGiftToFriend}
	 ** res: {@link IResSendActivityGiftToFriend}
	 ** msgId: {@link EMessageID.sendActivityGiftToFriend}
	 */
	sendActivityGiftToFriend(data?: IReqSendActivityGiftToFriend): Promise<IResSendActivityGiftToFriend>;
	/**
	 ** req: {@link IReqReceiveActivityGift}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.receiveActivityGift}
	 */
	receiveActivityGift(data?: IReqReceiveActivityGift): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveAllActivityGift}
	 ** res: {@link IResReceiveAllActivityGift}
	 ** msgId: {@link EMessageID.receiveAllActivityGift}
	 */
	receiveAllActivityGift(data?: IReqReceiveAllActivityGift): Promise<IResReceiveAllActivityGift>;
	/**
	 ** req: {@link IReqFetchFriendGiftActivityData}
	 ** res: {@link IResFetchFriendGiftActivityData}
	 ** msgId: {@link EMessageID.fetchFriendGiftActivityData}
	 */
	fetchFriendGiftActivityData(data?: IReqFetchFriendGiftActivityData): Promise<IResFetchFriendGiftActivityData>;
	/**
	 ** 自选卡池
	 ** req: {@link IReqOpenPreChestItem}
	 ** res: {@link IResOpenPreChestItem}
	 ** msgId: {@link EMessageID.openPreChestItem}
	 */
	openPreChestItem(data?: IReqOpenPreChestItem): Promise<IResOpenPreChestItem>;
	/**
	 ** 投票活动
	 ** req: {@link IReqFetchVoteActivity}
	 ** res: {@link IResFetchVoteActivity}
	 ** msgId: {@link EMessageID.fetchVoteActivity}
	 */
	fetchVoteActivity(data?: IReqFetchVoteActivity): Promise<IResFetchVoteActivity>;
	/**
	 ** req: {@link IReqVoteActivity}
	 ** res: {@link IResVoteActivity}
	 ** msgId: {@link EMessageID.voteActivity}
	 */
	voteActivity(data?: IReqVoteActivity): Promise<IResVoteActivity>;
	/**
	 ** 剧情活动
	 ** req: {@link IReqUnlockActivitySpot}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.unlockActivitySpot}
	 */
	unlockActivitySpot(data?: IReqUnlockActivitySpot): Promise<IResCommon>;
	/**
	 ** req: {@link IReqUnlockActivitySpotEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.unlockActivitySpotEnding}
	 */
	unlockActivitySpotEnding(data?: IReqUnlockActivitySpotEnding): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveActivitySpotReward}
	 ** res: {@link IResReceiveActivitySpotReward}
	 ** msgId: {@link EMessageID.receiveActivitySpotReward}
	 */
	receiveActivitySpotReward(data?: IReqReceiveActivitySpotReward): Promise<IResReceiveActivitySpotReward>;
	/**
	 ** 删除账号接口
	 ** req: {@link IReqCommon}
	 ** res: {@link IResDeleteAccount}
	 ** msgId: {@link EMessageID.deleteAccount}
	 */
	deleteAccount(data?: IReqCommon): Promise<IResDeleteAccount>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.cancelDeleteAccount}
	 */
	cancelDeleteAccount(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** req: {@link IReqLogReport}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.logReport}
	 */
	logReport(data?: IReqLogReport): Promise<IResCommon>;
	/**
	 ** oauth2
	 ** req: {@link IReqBindOauth2}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.bindOauth2}
	 */
	bindOauth2(data?: IReqBindOauth2): Promise<IResCommon>;
	/**
	 ** req: {@link IReqFetchOauth2}
	 ** res: {@link IResFetchOauth2}
	 ** msgId: {@link EMessageID.fetchOauth2Info}
	 */
	fetchOauth2Info(data?: IReqFetchOauth2): Promise<IResFetchOauth2>;
	/**
	 ** loading图
	 ** req: {@link IReqSetLoadingImage}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.setLoadingImage}
	 */
	setLoadingImage(data?: IReqSetLoadingImage): Promise<IResCommon>;
	/**
	 ** 获取商店信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchShopInterval}
	 ** msgId: {@link EMessageID.fetchShopInterval}
	 */
	fetchShopInterval(data?: IReqCommon): Promise<IResFetchShopInterval>;
	/**
	 ** 获取活动轮换信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchActivityInterval}
	 ** msgId: {@link EMessageID.fetchActivityInterval}
	 */
	fetchActivityInterval(data?: IReqCommon): Promise<IResFetchActivityInterval>;
	/**
	 ** 获取最近对战玩家
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchrecentFriend}
	 ** msgId: {@link EMessageID.fetchRecentFriend}
	 */
	fetchRecentFriend(data?: IReqCommon): Promise<IResFetchrecentFriend>;
	/**
	 ** 扭蛋活动
	 ** req: {@link IReqOpenGacha}
	 ** res: {@link IResOpenGacha}
	 ** msgId: {@link EMessageID.openGacha}
	 */
	openGacha(data?: IReqOpenGacha): Promise<IResOpenGacha>;
	/**
	 ** 前端完成任务
	 ** req: {@link IReqTaskRequest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.taskRequest}
	 */
	taskRequest(data?: IReqTaskRequest): Promise<IResCommon>;
	/**
	 ** 养成活动
	 ** req: {@link IReqSimulationActivityTrain}
	 ** res: {@link IResSimulationActivityTrain}
	 ** msgId: {@link EMessageID.simulationActivityTrain}
	 */
	simulationActivityTrain(data?: IReqSimulationActivityTrain): Promise<IResSimulationActivityTrain>;
	/**
	 ** req: {@link IReqFetchSimulationGameRecord}
	 ** res: {@link IResFetchSimulationGameRecord}
	 ** msgId: {@link EMessageID.fetchSimulationGameRecord}
	 */
	fetchSimulationGameRecord(data?: IReqFetchSimulationGameRecord): Promise<IResFetchSimulationGameRecord>;
	/**
	 ** req: {@link IReqStartSimulationActivityGame}
	 ** res: {@link IResStartSimulationActivityGame}
	 ** msgId: {@link EMessageID.startSimulationActivityGame}
	 */
	startSimulationActivityGame(data?: IReqStartSimulationActivityGame): Promise<IResStartSimulationActivityGame>;
	/**
	 ** req: {@link IReqFetchSimulationGameRank}
	 ** res: {@link IResFetchSimulationGameRank}
	 ** msgId: {@link EMessageID.fetchSimulationGameRank}
	 */
	fetchSimulationGameRank(data?: IReqFetchSimulationGameRank): Promise<IResFetchSimulationGameRank>;
	/**
	 ** 合成活动
	 ** req: {@link IReqGenerateCombiningCraft}
	 ** res: {@link IResGenerateCombiningCraft}
	 ** msgId: {@link EMessageID.generateCombiningCraft}
	 */
	generateCombiningCraft(data?: IReqGenerateCombiningCraft): Promise<IResGenerateCombiningCraft>;
	/**
	 ** req: {@link IReqMoveCombiningCraft}
	 ** res: {@link IResMoveCombiningCraft}
	 ** msgId: {@link EMessageID.moveCombiningCraft}
	 */
	moveCombiningCraft(data?: IReqMoveCombiningCraft): Promise<IResMoveCombiningCraft>;
	/**
	 ** req: {@link IReqCombiningRecycleCraft}
	 ** res: {@link IResCombiningRecycleCraft}
	 ** msgId: {@link EMessageID.combiningRecycleCraft}
	 */
	combiningRecycleCraft(data?: IReqCombiningRecycleCraft): Promise<IResCombiningRecycleCraft>;
	/**
	 ** req: {@link IReqRecoverCombiningRecycle}
	 ** res: {@link IResRecoverCombiningRecycle}
	 ** msgId: {@link EMessageID.recoverCombiningRecycle}
	 */
	recoverCombiningRecycle(data?: IReqRecoverCombiningRecycle): Promise<IResRecoverCombiningRecycle>;
	/**
	 ** req: {@link IReqFinishCombiningOrder}
	 ** res: {@link IResFinishCombiningOrder}
	 ** msgId: {@link EMessageID.finishCombiningOrder}
	 */
	finishCombiningOrder(data?: IReqFinishCombiningOrder): Promise<IResFinishCombiningOrder>;
	/**
	 ** 小村活动
	 ** req: {@link IReqUpgradeVillageBuilding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.upgradeVillageBuilding}
	 */
	upgradeVillageBuilding(data?: IReqUpgradeVillageBuilding): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveVillageBuildingReward}
	 ** res: {@link IResReceiveVillageBuildingReward}
	 ** msgId: {@link EMessageID.receiveVillageBuildingReward}
	 */
	receiveVillageBuildingReward(data?: IReqReceiveVillageBuildingReward): Promise<IResReceiveVillageBuildingReward>;
	/**
	 ** req: {@link IReqStartVillageTrip}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.startVillageTrip}
	 */
	startVillageTrip(data?: IReqStartVillageTrip): Promise<IResCommon>;
	/**
	 ** req: {@link IReqReceiveVillageTripReward}
	 ** res: {@link IResReceiveVillageTripReward}
	 ** msgId: {@link EMessageID.receiveVillageTripReward}
	 */
	receiveVillageTripReward(data?: IReqReceiveVillageTripReward): Promise<IResReceiveVillageTripReward>;
	/**
	 ** req: {@link IReqCompleteVillageTask}
	 ** res: {@link IResCompleteVillageTask}
	 ** msgId: {@link EMessageID.completeVillageTask}
	 */
	completeVillageTask(data?: IReqCompleteVillageTask): Promise<IResCompleteVillageTask>;
	/**
	 ** req: {@link IReqGetFriendVillageData}
	 ** res: {@link IResGetFriendVillageData}
	 ** msgId: {@link EMessageID.getFriendVillageData}
	 */
	getFriendVillageData(data?: IReqGetFriendVillageData): Promise<IResGetFriendVillageData>;
	/**
	 ** req: {@link IReqSetVillageWorker}
	 ** res: {@link IResSetVillageWorker}
	 ** msgId: {@link EMessageID.setVillageWorker}
	 */
	setVillageWorker(data?: IReqSetVillageWorker): Promise<IResSetVillageWorker>;
	/**
	 ** 下一个丰收季
	 ** req: {@link IReqNextRoundVillage}
	 ** res: {@link IResNextRoundVillage}
	 ** msgId: {@link EMessageID.nextRoundVillage}
	 */
	nextRoundVillage(data?: IReqNextRoundVillage): Promise<IResNextRoundVillage>;
	/**
	 ** 射击活动
	 ** req: {@link IReqShootActivityAttackEnemies}
	 ** res: {@link IResShootActivityAttackEnemies}
	 ** msgId: {@link EMessageID.shootActivityAttackEnemies}
	 */
	shootActivityAttackEnemies(data?: IReqShootActivityAttackEnemies): Promise<IResShootActivityAttackEnemies>;
	/**
	 ** 庆典活动
	 ** req: {@link IReqResolveFestivalActivityProposal}
	 ** res: {@link IResResolveFestivalActivityProposal}
	 ** msgId: {@link EMessageID.resolveFestivalActivityProposal}
	 */
	resolveFestivalActivityProposal(data?: IReqResolveFestivalActivityProposal): Promise<IResResolveFestivalActivityProposal>;
	/**
	 ** req: {@link IReqResolveFestivalActivityEvent}
	 ** res: {@link IResResolveFestivalActivityEvent}
	 ** msgId: {@link EMessageID.resolveFestivalActivityEvent}
	 */
	resolveFestivalActivityEvent(data?: IReqResolveFestivalActivityEvent): Promise<IResResolveFestivalActivityEvent>;
	/**
	 ** req: {@link IReqBuyFestivalProposal}
	 ** res: {@link IResBuyFestivalProposal}
	 ** msgId: {@link EMessageID.buyFestivalProposal}
	 */
	buyFestivalProposal(data?: IReqBuyFestivalProposal): Promise<IResBuyFestivalProposal>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqFestivalFetchDebug}
	 ** res: {@link IResFestivalFetchDebug}
	 ** msgId: {@link EMessageID.festivalActivityFetchDebug}
	 */
	festivalActivityFetchDebug(data?: IReqFestivalFetchDebug): Promise<IResFestivalFetchDebug>;
	/**
	 ** req: {@link IReqFestivalDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.festivalActivityDebug}
	 */
	festivalActivityDebug(data?: IReqFestivalDebug): Promise<IResCommon>;
	/**
	 ** 海岛活动
	 ** req: {@link IReqIslandActivityMove}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.islandActivityMove}
	 */
	islandActivityMove(data?: IReqIslandActivityMove): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivityBuy}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.islandActivityBuy}
	 */
	islandActivityBuy(data?: IReqIslandActivityBuy): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivitySell}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.islandActivitySell}
	 */
	islandActivitySell(data?: IReqIslandActivitySell): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivityTidyBag}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.islandActivityTidyBag}
	 */
	islandActivityTidyBag(data?: IReqIslandActivityTidyBag): Promise<IResCommon>;
	/**
	 ** req: {@link IReqIslandActivityUnlockBagGrid}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.islandActivityUnlockBagGrid}
	 */
	islandActivityUnlockBagGrid(data?: IReqIslandActivityUnlockBagGrid): Promise<IResCommon>;
	/**
	 ** 大会室管理相关
	 ** req: {@link IReqCreateCustomizedContest}
	 ** res: {@link IResCreateCustomizedContest}
	 ** msgId: {@link EMessageID.createCustomizedContest}
	 */
	createCustomizedContest(data?: IReqCreateCustomizedContest): Promise<IResCreateCustomizedContest>;
	/**
	 ** req: {@link IReqFetchmanagerCustomizedContestList}
	 ** res: {@link IResFetchManagerCustomizedContestList}
	 ** msgId: {@link EMessageID.fetchManagerCustomizedContestList}
	 */
	fetchManagerCustomizedContestList(data?: IReqFetchmanagerCustomizedContestList): Promise<IResFetchManagerCustomizedContestList>;
	/**
	 ** req: {@link IReqFetchManagerCustomizedContest}
	 ** res: {@link IResFetchManagerCustomizedContest}
	 ** msgId: {@link EMessageID.fetchManagerCustomizedContest}
	 */
	fetchManagerCustomizedContest(data?: IReqFetchManagerCustomizedContest): Promise<IResFetchManagerCustomizedContest>;
	/**
	 ** req: {@link IReqUpdateManagerCustomizedContest}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.updateManagerCustomizedContest}
	 */
	updateManagerCustomizedContest(data?: IReqUpdateManagerCustomizedContest): Promise<IResCommon>;
	/**
	 ** req: {@link IReqFetchReadyPlayerList}
	 ** res: {@link IResFetchReadyPlayerList}
	 ** msgId: {@link EMessageID.fetchReadyPlayerList}
	 */
	fetchReadyPlayerList(data?: IReqFetchReadyPlayerList): Promise<IResFetchReadyPlayerList>;
	/**
	 ** req: {@link IReqCreateGamePlan}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.createGamePlan}
	 */
	createGamePlan(data?: IReqCreateGamePlan): Promise<IResCommon>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResGenerateContestManagerLoginCode}
	 ** msgId: {@link EMessageID.generateContestManagerLoginCode}
	 */
	generateContestManagerLoginCode(data?: IReqCommon): Promise<IResGenerateContestManagerLoginCode>;
	/**
	 ** 获取青云之志活动数据
	 ** req: {@link IReqFetchAmuletActivityData}
	 ** res: {@link IResFetchAmuletActivityData}
	 ** msgId: {@link EMessageID.fetchAmuletActivityData}
	 */
	fetchAmuletActivityData(data?: IReqFetchAmuletActivityData): Promise<IResFetchAmuletActivityData>;
	/**
	 ** 获取挑战任务与收藏数据
	 ** req: {@link IReqAmuletActivityFetchBrief}
	 ** res: {@link IResAmuletActivityFetchBrief}
	 ** msgId: {@link EMessageID.amuletActivityFetchBrief}
	 */
	amuletActivityFetchBrief(data?: IReqAmuletActivityFetchBrief): Promise<IResAmuletActivityFetchBrief>;
	/**
	 ** 开始游戏
	 ** req: {@link IReqAmuletActivityStartGame}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityStartGame}
	 */
	amuletActivityStartGame(data?: IReqAmuletActivityStartGame): Promise<IResAmuletEventResponse>;
	/**
	 ** 换牌/打牌/开杠/和牌/模切/结束换牌 操作
	 ** req: {@link IReqAmuletActivityOperate}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityOperate}
	 */
	amuletActivityOperate(data?: IReqAmuletActivityOperate): Promise<IResAmuletEventResponse>;
	/**
	 ** 下一关
	 ** req: {@link IReqAmuletActivityUpgrade}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityUpgrade}
	 */
	amuletActivityUpgrade(data?: IReqAmuletActivityUpgrade): Promise<IResAmuletEventResponse>;
	/**
	 ** 购买卡包
	 ** req: {@link IReqAmuletActivityBuy}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityBuy}
	 */
	amuletActivityBuy(data?: IReqAmuletActivityBuy): Promise<IResAmuletEventResponse>;
	/**
	 ** 选择卡包护身符
	 ** req: {@link IReqAmuletActivitySelectPack}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivitySelectPack}
	 */
	amuletActivitySelectPack(data?: IReqAmuletActivitySelectPack): Promise<IResAmuletEventResponse>;
	/**
	 ** 出售护身符
	 ** req: {@link IReqAmuletActivitySellEffect}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivitySellEffect}
	 */
	amuletActivitySellEffect(data?: IReqAmuletActivitySellEffect): Promise<IResAmuletEventResponse>;
	/**
	 ** 护身符排序
	 ** req: {@link IReqAmuletActivityEffectSort}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityEffectSort}
	 */
	amuletActivityEffectSort(data?: IReqAmuletActivityEffectSort): Promise<IResAmuletEventResponse>;
	/**
	 ** 放弃当前对局
	 ** req: {@link IReqAmuletActivityGiveup}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.amuletActivityGiveup}
	 */
	amuletActivityGiveup(data?: IReqAmuletActivityGiveup): Promise<IResCommon>;
	/**
	 ** 刷新商店
	 ** req: {@link IReqAmuletActivityRefreshShop}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityRefreshShop}
	 */
	amuletActivityRefreshShop(data?: IReqAmuletActivityRefreshShop): Promise<IResAmuletEventResponse>;
	/**
	 ** 选择开局免费护身符
	 ** req: {@link IReqAmuletActivitySelectFreeEffect}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivitySelectFreeEffect}
	 */
	amuletActivitySelectFreeEffect(data?: IReqAmuletActivitySelectFreeEffect): Promise<IResAmuletEventResponse>;
	/**
	 ** 商店升级buff
	 ** req: {@link IReqAmuletActivityUpgradeShopBuff}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityUpgradeShopBuff}
	 */
	amuletActivityUpgradeShopBuff(data?: IReqAmuletActivityUpgradeShopBuff): Promise<IResAmuletEventResponse>;
	/**
	 ** 退出商店，进入选关
	 ** req: {@link IReqAmuletActivityEndShopping}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivityEndShopping}
	 */
	amuletActivityEndShopping(data?: IReqAmuletActivityEndShopping): Promise<IResAmuletEventResponse>;
	/**
	 ** 设置场外增强
	 ** req: {@link IReqAmuletActivitySetSkillLevel}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.amuletActivitySetSkillLevel}
	 */
	amuletActivitySetSkillLevel(data?: IReqAmuletActivitySetSkillLevel): Promise<IResCommon>;
	/**
	 ** 获取青云之志维护信息
	 ** req: {@link IReqCommon}
	 ** res: {@link IResAmuletActivityMaintainInfo}
	 ** msgId: {@link EMessageID.amuletActivityMaintainInfo}
	 */
	amuletActivityMaintainInfo(data?: IReqCommon): Promise<IResAmuletActivityMaintainInfo>;
	/**
	 ** req: {@link IReqAmuletActivitySelectRewardPack}
	 ** res: {@link IResAmuletEventResponse}
	 ** msgId: {@link EMessageID.amuletActivitySelectRewardPack}
	 */
	amuletActivitySelectRewardPack(data?: IReqAmuletActivitySelectRewardPack): Promise<IResAmuletEventResponse>;
	/**
	 ** 设置青云之志钦定护身符
	 ** req: {@link IReqAmuletActivitySelectBookEffect}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.amuletActivitySelectBookEffect}
	 */
	amuletActivitySelectBookEffect(data?: IReqAmuletActivitySelectBookEffect): Promise<IResCommon>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqAmuletActivityDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.amuletActivityDebug}
	 */
	amuletActivityDebug(data?: IReqAmuletActivityDebug): Promise<IResCommon>;
	/**
	 ** req: {@link IReqAmuletActivityFetchDebug}
	 ** res: {@link IResFetchAmuletActivityDebug}
	 ** msgId: {@link EMessageID.amuletActivityFetchDebug}
	 */
	amuletActivityFetchDebug(data?: IReqAmuletActivityFetchDebug): Promise<IResFetchAmuletActivityDebug>;
	/**
	 ** 解锁剧情
	 ** req: {@link IReqStoryActivityUnlock}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.storyActivityUnlock}
	 */
	storyActivityUnlock(data?: IReqStoryActivityUnlock): Promise<IResCommon>;
	/**
	 ** 解锁结局
	 ** req: {@link IReqStoryActivityUnlockEnding}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.storyActivityUnlockEnding}
	 */
	storyActivityUnlockEnding(data?: IReqStoryActivityUnlockEnding): Promise<IResCommon>;
	/**
	 ** 领取结局奖励
	 ** req: {@link IReqStoryActivityReceiveEndingReward}
	 ** res: {@link IResStoryReward}
	 ** msgId: {@link EMessageID.storyActivityReceiveEndingReward}
	 */
	storyActivityReceiveEndingReward(data?: IReqStoryActivityReceiveEndingReward): Promise<IResStoryReward>;
	/**
	 ** 领取剧情通关奖励（完成剧情任一结局）
	 ** req: {@link IReqStoryActivityReceiveFinishReward}
	 ** res: {@link IResStoryReward}
	 ** msgId: {@link EMessageID.storyActivityReceiveFinishReward}
	 */
	storyActivityReceiveFinishReward(data?: IReqStoryActivityReceiveFinishReward): Promise<IResStoryReward>;
	/**
	 ** 领取剧情全通奖励（完成所有结局）
	 ** req: {@link IReqStoryActivityReceiveAllFinishReward}
	 ** res: {@link IResStoryReward}
	 ** msgId: {@link EMessageID.storyActivityReceiveAllFinishReward}
	 */
	storyActivityReceiveAllFinishReward(data?: IReqStoryActivityReceiveAllFinishReward): Promise<IResStoryReward>;
	/**
	 ** 解锁结局并领取结局奖励
	 ** req: {@link IReqStoryActivityUnlockEndingAndReceive}
	 ** res: {@link IResStoryActivityUnlockEndingAndReceive}
	 ** msgId: {@link EMessageID.storyActivityUnlockEndingAndReceive}
	 */
	storyActivityUnlockEndingAndReceive(data?: IReqStoryActivityUnlockEndingAndReceive): Promise<IResStoryActivityUnlockEndingAndReceive>;
	/**
	 ** 获取活动排名
	 ** req: {@link IReqFetchActivityRank}
	 ** res: {@link IResFetchActivityRank}
	 ** msgId: {@link EMessageID.fetchActivityRank}
	 */
	fetchActivityRank(data?: IReqFetchActivityRank): Promise<IResFetchActivityRank>;
	/**
	 ** 玩家职业/主播标识开关
	 ** req: {@link IReqSetVerifiedHidden}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.setVerifiedHidden}
	 */
	setVerifiedHidden(data?: IReqSetVerifiedHidden): Promise<IResCommon>;
	/**
	 ** 获取问卷列表
	 ** req: {@link IReqFetchQuestionnaireList}
	 ** res: {@link IResFetchQuestionnaireList}
	 ** msgId: {@link EMessageID.fetchQuestionnaireList}
	 */
	fetchQuestionnaireList(data?: IReqFetchQuestionnaireList): Promise<IResFetchQuestionnaireList>;
	/**
	 ** 获取问卷详情
	 ** req: {@link IReqFetchQuestionnaireDetail}
	 ** res: {@link IResFetchQuestionnaireDetail}
	 ** msgId: {@link EMessageID.fetchQuestionnaireDetail}
	 */
	fetchQuestionnaireDetail(data?: IReqFetchQuestionnaireDetail): Promise<IResFetchQuestionnaireDetail>;
	/**
	 ** 提交调查问卷结果
	 ** req: {@link IReqSubmitQuestionnaire}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.submitQuestionnaire}
	 */
	submitQuestionnaire(data?: IReqSubmitQuestionnaire): Promise<IResCommon>;
	/**
	 ** 好友房随机机器人角色开关
	 ** req: {@link IReqSetFriendRoomRandomBotChar}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.setFriendRoomRandomBotChar}
	 */
	setFriendRoomRandomBotChar(data?: IReqSetFriendRoomRandomBotChar): Promise<IResCommon>;
	/**
	 ** req: {@link IReqFetchAccountGameHuRecords}
	 ** res: {@link IResFetchAccountGameHuRecords}
	 ** msgId: {@link EMessageID.fetchAccountGameHuRecords}
	 */
	fetchAccountGameHuRecords(data?: IReqFetchAccountGameHuRecords): Promise<IResFetchAccountGameHuRecords>;
	/**
	 ** req: {@link IReqFetchAccountInfoExtra}
	 ** res: {@link IResFetchAccountInfoExtra}
	 ** msgId: {@link EMessageID.fetchAccountInfoExtra}
	 */
	fetchAccountInfoExtra(data?: IReqFetchAccountInfoExtra): Promise<IResFetchAccountInfoExtra>;
	/**
	 ** req: {@link IReqSetAccountFavoriteHu}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.setAccountFavoriteHu}
	 */
	setAccountFavoriteHu(data?: IReqSetAccountFavoriteHu): Promise<IResCommon>;
	/**
	 ** seer 报告
	 ** req: {@link IReqFetchSeerReport}
	 ** res: {@link IResFetchSeerReport}
	 ** msgId: {@link EMessageID.fetchSeerReport}
	 */
	fetchSeerReport(data?: IReqFetchSeerReport): Promise<IResFetchSeerReport>;
	/**
	 ** req: {@link IReqCreateSeerReport}
	 ** res: {@link IResCreateSeerReport}
	 ** msgId: {@link EMessageID.createSeerReport}
	 */
	createSeerReport(data?: IReqCreateSeerReport): Promise<IResCreateSeerReport>;
	/**
	 ** 获取当前 seer 报告状态（只返回分析中和未过期的）
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchSeerReportList}
	 ** msgId: {@link EMessageID.fetchSeerReportList}
	 */
	fetchSeerReportList(data?: IReqCommon): Promise<IResFetchSeerReportList>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchSeerInfo}
	 ** msgId: {@link EMessageID.fetchSeerInfo}
	 */
	fetchSeerInfo(data?: IReqCommon): Promise<IResFetchSeerInfo>;
	/**
	 ** 可选up卡池活动
	 ** req: {@link IReqSelectChestChooseUp}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.selectChestChooseUpActivity}
	 */
	selectChestChooseUpActivity(data?: IReqSelectChestChooseUp): Promise<IResCommon>;
	/**
	 ** 可选up组活动
	 ** req: {@link IReqSelectChestChooseGroupActivity}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.selectChestChooseGroupActivity}
	 */
	selectChestChooseGroupActivity(data?: IReqSelectChestChooseGroupActivity): Promise<IResCommon>;
	/**
	 ** 年度报告
	 ** req: {@link IReqGenerateAnnualReportToken}
	 ** res: {@link IResGenerateAnnualReportToken}
	 ** msgId: {@link EMessageID.generateAnnualReportToken}
	 */
	generateAnnualReportToken(data?: IReqGenerateAnnualReportToken): Promise<IResGenerateAnnualReportToken>;
	/**
	 ** req: {@link IReqCommon}
	 ** res: {@link IResFetchAnnualReportInfo}
	 ** msgId: {@link EMessageID.fetchAnnualReportInfo}
	 */
	fetchAnnualReportInfo(data?: IReqCommon): Promise<IResFetchAnnualReportInfo>;
	/**
	 ** 好友备注
	 ** req: {@link IReqRemarkFriend}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.remarkFriend}
	 */
	remarkFriend(data?: IReqRemarkFriend): Promise<IResCommon>;
	/**
	 ** 雀斗大会
	 ** req: {@link IReqSimV2ActivityFetchInfo}
	 ** res: {@link IResSimV2ActivityFetchInfo}
	 ** msgId: {@link EMessageID.simV2ActivityFetchInfo}
	 */
	simV2ActivityFetchInfo(data?: IReqSimV2ActivityFetchInfo): Promise<IResSimV2ActivityFetchInfo>;
	/**
	 ** req: {@link IReqSimV2ActivityStartSeason}
	 ** res: {@link IResSimV2ActivityStartSeason}
	 ** msgId: {@link EMessageID.simV2ActivityStartSeason}
	 */
	simV2ActivityStartSeason(data?: IReqSimV2ActivityStartSeason): Promise<IResSimV2ActivityStartSeason>;
	/**
	 ** req: {@link IReqSimV2ActivityTrain}
	 ** res: {@link IResSimV2ActivityTrain}
	 ** msgId: {@link EMessageID.simV2ActivityTrain}
	 */
	simV2ActivityTrain(data?: IReqSimV2ActivityTrain): Promise<IResSimV2ActivityTrain>;
	/**
	 ** req: {@link IReqSimV2ActivitySelectEvent}
	 ** res: {@link IResSimV2ActivitySelectEvent}
	 ** msgId: {@link EMessageID.simV2ActivitySelectEvent}
	 */
	simV2ActivitySelectEvent(data?: IReqSimV2ActivitySelectEvent): Promise<IResSimV2ActivitySelectEvent>;
	/**
	 ** req: {@link IReqSimV2ActivityStartMatch}
	 ** res: {@link IResSimV2ActivityStartMatch}
	 ** msgId: {@link EMessageID.simV2ActivityStartMatch}
	 */
	simV2ActivityStartMatch(data?: IReqSimV2ActivityStartMatch): Promise<IResSimV2ActivityStartMatch>;
	/**
	 ** req: {@link IReqSimV2ActivityEndMatch}
	 ** res: {@link IResSimV2ActivityEndMatch}
	 ** msgId: {@link EMessageID.simV2ActivityEndMatch}
	 */
	simV2ActivityEndMatch(data?: IReqSimV2ActivityEndMatch): Promise<IResSimV2ActivityEndMatch>;
	/**
	 ** req: {@link IReqSimV2ActivityGiveUp}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.simV2ActivityGiveUp}
	 */
	simV2ActivityGiveUp(data?: IReqSimV2ActivityGiveUp): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSimV2ActivitySetUpgrade}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.simV2ActivitySetUpgrade}
	 */
	simV2ActivitySetUpgrade(data?: IReqSimV2ActivitySetUpgrade): Promise<IResCommon>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqSimV2ActivityDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.simV2ActivityDebug}
	 */
	simV2ActivityDebug(data?: IReqSimV2ActivityDebug): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSimV2ActivityFetchDebug}
	 ** res: {@link IResSimV2ActivityFetchDebug}
	 ** msgId: {@link EMessageID.simV2ActivityFetchDebug}
	 */
	simV2ActivityFetchDebug(data?: IReqSimV2ActivityFetchDebug): Promise<IResSimV2ActivityFetchDebug>;
	/**
	 ** 进度奖励活动
	 ** req: {@link IReqProgressRewardActivityReceive}
	 ** res: {@link IResProgressRewardActivityReceive}
	 ** msgId: {@link EMessageID.progressRewardActivityReceive}
	 */
	progressRewardActivityReceive(data?: IReqProgressRewardActivityReceive): Promise<IResProgressRewardActivityReceive>;
	/**
	 ** req: {@link IReqFetchProgressRewardActivityInfo}
	 ** res: {@link IResFetchProgressRewardActivityInfo}
	 ** msgId: {@link EMessageID.fetchProgressRewardActivityInfo}
	 */
	fetchProgressRewardActivityInfo(data?: IReqFetchProgressRewardActivityInfo): Promise<IResFetchProgressRewardActivityInfo>;
	/**
	 ** 万事屋活动
	 ** req: {@link IReqQuestCrewActivityStartQuest}
	 ** res: {@link IResQuestCrewActivityStartQuest}
	 ** msgId: {@link EMessageID.questCrewActivityStartQuest}
	 */
	questCrewActivityStartQuest(data?: IReqQuestCrewActivityStartQuest): Promise<IResQuestCrewActivityStartQuest>;
	/**
	 ** req: {@link IReqQuestCrewActivityHire}
	 ** res: {@link IResQuestCrewActivityHire}
	 ** msgId: {@link EMessageID.questCrewActivityHire}
	 */
	questCrewActivityHire(data?: IReqQuestCrewActivityHire): Promise<IResQuestCrewActivityHire>;
	/**
	 ** req: {@link IReqQuestCrewActivityFeed}
	 ** res: {@link IResQuestCrewActivityFeed}
	 ** msgId: {@link EMessageID.questCrewActivityFeed}
	 */
	questCrewActivityFeed(data?: IReqQuestCrewActivityFeed): Promise<IResQuestCrewActivityFeed>;
	/**
	 ** req: {@link IReqQuestCrewActivityRefreshMarket}
	 ** res: {@link IResQuestCrewActivityRefreshMarket}
	 ** msgId: {@link EMessageID.questCrewActivityRefreshMarket}
	 */
	questCrewActivityRefreshMarket(data?: IReqQuestCrewActivityRefreshMarket): Promise<IResQuestCrewActivityRefreshMarket>;
	/**
	 ** 冰菓活动
	 ** req: {@link IReqBingoActivityReceiveReward}
	 ** res: {@link IResBingoActivityReceiveReward}
	 ** msgId: {@link EMessageID.bingoActivityReceiveReward}
	 */
	bingoActivityReceiveReward(data?: IReqBingoActivityReceiveReward): Promise<IResBingoActivityReceiveReward>;
	/**
	 ** req: {@link IReqFetchBingoActivityData}
	 ** res: {@link IResFetchBingoActivityData}
	 ** msgId: {@link EMessageID.fetchBingoActivityData}
	 */
	fetchBingoActivityData(data?: IReqFetchBingoActivityData): Promise<IResFetchBingoActivityData>;
	/**
	 ** 雪球活动
	 ** req: {@link IReqSnowballActivityStartBattle}
	 ** res: {@link IResSnowballActivityStartBattle}
	 ** msgId: {@link EMessageID.snowballActivityStartBattle}
	 */
	snowballActivityStartBattle(data?: IReqSnowballActivityStartBattle): Promise<IResSnowballActivityStartBattle>;
	/**
	 ** req: {@link IReqSnowballActivityFinishBattle}
	 ** res: {@link IResSnowballActivityFinishBattle}
	 ** msgId: {@link EMessageID.snowballActivityFinishBattle}
	 */
	snowballActivityFinishBattle(data?: IReqSnowballActivityFinishBattle): Promise<IResSnowballActivityFinishBattle>;
	/**
	 ** req: {@link IReqSnowballActivityUpgrade}
	 ** res: {@link IResSnowballActivityUpgrade}
	 ** msgId: {@link EMessageID.snowballActivityUpgrade}
	 */
	snowballActivityUpgrade(data?: IReqSnowballActivityUpgrade): Promise<IResSnowballActivityUpgrade>;
	/**
	 ** req: {@link IReqSnowballActivityReceiveReward}
	 ** res: {@link IResSnowballActivityReceiveReward}
	 ** msgId: {@link EMessageID.snowballActivityReceiveReward}
	 */
	snowballActivityReceiveReward(data?: IReqSnowballActivityReceiveReward): Promise<IResSnowballActivityReceiveReward>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqSnowballActivityDebug}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.snowballActivityDebug}
	 */
	snowballActivityDebug(data?: IReqSnowballActivityDebug): Promise<IResCommon>;
	/**
	 ** req: {@link IReqSnowballActivityFetchDebug}
	 ** res: {@link IResSnowballActivityFetchDebug}
	 ** msgId: {@link EMessageID.snowballActivityFetchDebug}
	 */
	snowballActivityFetchDebug(data?: IReqSnowballActivityFetchDebug): Promise<IResSnowballActivityFetchDebug>;
	/**
	 ** 马拉松活动
	 ** req: {@link IReqMarathonActivityStartRace}
	 ** res: {@link IResMarathonActivityStartRace}
	 ** msgId: {@link EMessageID.marathonActivityStartRace}
	 */
	marathonActivityStartRace(data?: IReqMarathonActivityStartRace): Promise<IResMarathonActivityStartRace>;
	/**
	 ** req: {@link IReqMarathonActivityFinishRace}
	 ** res: {@link IResMarathonActivityFinishRace}
	 ** msgId: {@link EMessageID.marathonActivityFinishRace}
	 */
	marathonActivityFinishRace(data?: IReqMarathonActivityFinishRace): Promise<IResMarathonActivityFinishRace>;
	/**
	 ** ==DevDebug Start==
	 ** debug 协议在正式版本删除
	 ** req: {@link IReqMarathonActivityTest}
	 ** res: {@link IResMarathonActivityTest}
	 ** msgId: {@link EMessageID.marathonActivityTest}
	 */
	marathonActivityTest(data?: IReqMarathonActivityTest): Promise<IResMarathonActivityTest>;
	/**
	 ** 验证游戏口令
	 ** req: {@link IReqAuthGame}
	 ** res: {@link IResAuthGame}
	 ** msgId: {@link EMessageID.authGame}
	 */
	authGame(data?: IReqAuthGame): Promise<IResAuthGame>;
	/**
	 ** 客户端资源加载完毕，可以进入游戏
	 ** req: {@link IReqCommon}
	 ** res: {@link IResEnterGame}
	 ** msgId: {@link EMessageID.enterGame}
	 */
	enterGame(data?: IReqCommon): Promise<IResEnterGame>;
	/**
	 ** 同步游戏
	 ** req: {@link IReqSyncGame}
	 ** res: {@link IResSyncGame}
	 ** msgId: {@link EMessageID.syncGame}
	 */
	syncGame(data?: IReqSyncGame): Promise<IResSyncGame>;
	/**
	 ** 完成同步游戏
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.finishSyncGame}
	 */
	finishSyncGame(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 中断游戏（仅1个人模式有效）
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.terminateGame}
	 */
	terminateGame(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 输入基本操作
	 ** req: {@link IReqSelfOperation}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.inputOperation}
	 */
	inputOperation(data?: IReqSelfOperation): Promise<IResCommon>;
	/**
	 ** 输入吃碰胡
	 ** req: {@link IReqChiPengGang}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.inputChiPengGang}
	 */
	inputChiPengGang(data?: IReqChiPengGang): Promise<IResCommon>;
	/**
	 ** 确认新的回合
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.confirmNewRound}
	 */
	confirmNewRound(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 玩家游戏内广播
	 ** req: {@link IReqBroadcastInGame}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.broadcastInGame}
	 */
	broadcastInGame(data?: IReqBroadcastInGame): Promise<IResCommon>;
	/**
	 ** 玩家游戏内Gm指令
	 ** deprecated
	 ** req: {@link IReqGMCommandInGaming}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.inputGameGMCommand}
	 */
	inputGameGMCommand(data?: IReqGMCommandInGaming): Promise<IResCommon>;
	/**
	 ** 获取对局玩家状态
	 ** req: {@link IReqCommon}
	 ** res: {@link IResGamePlayerState}
	 ** msgId: {@link EMessageID.fetchGamePlayerState}
	 */
	fetchGamePlayerState(data?: IReqCommon): Promise<IResGamePlayerState>;
	/**
	 ** 客户端定时刷新网络延迟
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.checkNetworkDelay}
	 */
	checkNetworkDelay(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 清除玩家自身的离开状态
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.clearLeaving}
	 */
	clearLeaving(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 开始投票退出游戏
	 ** req: {@link IReqVoteGameEnd}
	 ** res: {@link IResGameEndVote}
	 ** msgId: {@link EMessageID.voteGameEnd}
	 */
	voteGameEnd(data?: IReqVoteGameEnd): Promise<IResGameEndVote>;
	/**
	 ** 实时观战验证
	 ** req: {@link IReqAuthObserve}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.authObserve}
	 */
	authObserve(data?: IReqAuthObserve): Promise<IResCommon>;
	/**
	 ** 开始实时观战
	 ** req: {@link IReqCommon}
	 ** res: {@link IResStartObserve}
	 ** msgId: {@link EMessageID.startObserve}
	 */
	startObserve(data?: IReqCommon): Promise<IResStartObserve>;
	/**
	 ** 停止实时观战
	 ** req: {@link IReqCommon}
	 ** res: {@link IResCommon}
	 ** msgId: {@link EMessageID.stopObserve}
	 */
	stopObserve(data?: IReqCommon): Promise<IResCommon>;
	/**
	 ** 主备线路功能
	 ** req: {@link IReqRequestConnection}
	 ** res: {@link IResRequestConnection}
	 ** msgId: {@link EMessageID.requestConnection}
	 */
	requestConnection(data?: IReqRequestConnection): Promise<IResRequestConnection>;
	/**
	 ** req: {@link IReqRequestRouteChange}
	 ** res: {@link IResRequestRouteChange}
	 ** msgId: {@link EMessageID.requestRouteChange}
	 */
	requestRouteChange(data?: IReqRequestRouteChange): Promise<IResRequestRouteChange>;
	/**
	 ** req: {@link IReqHeartbeat}
	 ** res: {@link IResHeartbeat}
	 ** msgId: {@link EMessageID.heartbeat}
	 */
	heartbeat(data?: IReqHeartbeat): Promise<IResHeartbeat>;
}
