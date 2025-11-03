import { BaseVO } from "./BaseVO";

export class FriendVO extends BaseVO implements VO.IFriendVO {
	friends: ProtoObject<IFriend>[] = [];
	/** 好友数量上限 */
	friend_max_count: number = 0;
	friend_count: number = 0;
	/** 申请列表 */
	applies: ProtoObject<IResFriendApplyList_FriendApply>[] = [];
	account_list: number[] = [];


	@InterestMessage(EMessageID.fetchFriendList)
	private onFetchFriendList(res: IResFriendList) {
		if (res.error) return;
		this.friends = res.friends.map(this.decodeProtoData);
		this.friend_max_count = res.friend_max_count;
		this.friend_count = res.friend_count;
	}
	@InterestMessage(EMessageID.fetchFriendApplyList)
	private onFetchFriendApplyList(res: IResFriendApplyList) {
		if (res.error) return;
		this.applies = res.applies.map(this.decodeProtoData);
	}
	@InterestMessage(EMessageID.fetchRecentFriend)
	private onFetchRecentFriend(res: IResFetchrecentFriend) {
		if (res.error) return;
		this.account_list = [...res.account_list];
	}

	@InterestMessage(ENotify.NotifyFriendViewChange)
	private onNotifyFriendViewChange(data: INotifyFriendViewChange) {
		const friend = this.friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.base = this.decodeProtoData(data.base);
	}
	@InterestMessage(ENotify.NotifyFriendStateChange)
	private onNotifyFriendStateChange(data: INotifyFriendStateChange) {
		const friend = this.friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.state = this.decodeProtoData(data.active_state);
	}
	@InterestMessage(ENotify.NotifyFriendChange)
	private onNotifyFriendChange(data: INotifyFriendChange) {
		if (data.type == 1) {
			this.friends.push(this.decodeProtoData(data.friend));
		} else if (data.type == 2) {
			const index = this.friends.findIndex(v => v.base.account_id == data.account_id);
			if (index < 0) return;
			this.friends.splice(index, 1);
		}
	}
	@InterestMessage(ENotify.NotifyNewFriendApply)
	private onNotifyNewFriendApply(data: INotifyNewFriendApply) {

	}
}