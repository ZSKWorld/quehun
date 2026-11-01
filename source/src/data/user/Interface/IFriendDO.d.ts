declare namespace DO {
	interface IFriendDO {
		/** 好友列表 */
		get friends(): ProtoObject<IFriend>[];
		/** 好友数量上限 */
		get friendMaxCount(): number;
		/** 申请列表 */
		get applies(): ProtoObject<IResFriendApplyList.IFriendApply>[];
		/** 已申请的id */
		get applied(): Set<number>;

		isFriend(id: number): boolean;
	}
}