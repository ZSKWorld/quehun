declare namespace VO {
	declare interface IFriendVO {
		/** 好友列表 */
		get friends(): ProtoObject<IFriend>[];
		/** 好友数量上限 */
		get friendMaxCount(): number;
		/** 申请列表 */
		get applies(): ProtoObject<IResFriendApplyList_FriendApply>[];
		/** 已申请的id */
		get applied(): Set<number>;

		isFriend(id: number): boolean;
	}
}