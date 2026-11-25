declare namespace DO {

	interface IInviteInfo {
		time: TimeStamp;
		nickname: Name;
		mode: { mode: ID; };
		room_id: ID;
		account_id: AccountID;
	}

	interface IFriendRoomDO {
		get room(): IRoom;
		get inRoom(): boolean;
		get getOpeningFriendModes(): ISheetData_Desktop_FriendRoom[];
		bannedInvite(accountId: AccountID): void;
		cancelInvite(accountId: AccountID): void;
		joinInvite(accountId: AccountID): void;
		joinRoom(roomId: number): void;
	}

	interface IFriendDO {
		/** 好友列表 */
		get friends(): ProtoObject<IFriend>[];
		/** 好友数量上限 */
		get friendMaxCount(): number;
		/** 申请列表 */
		get applies(): ProtoObject<IResFriendApplyList.IFriendApply>[];
		/** 已申请的id */
		get applied(): Set<number>;

		/** 好友邀请数据 */
		get room(): IFriendRoomDO;

		isFriend(id: number): boolean;
	}
}