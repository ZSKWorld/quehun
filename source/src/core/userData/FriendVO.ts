import { BaseVO } from "./BaseVO";
import { EUserEvent } from "./UserDefine";

export class FriendVO extends BaseVO implements VO.IFriendVO {
	private _friends: ProtoObject<IFriend>[] = [];
	private _friendMaxCount: number = 0;
	private _friendCount: number = 0;
	private _applies: ProtoObject<IResFriendApplyList_FriendApply>[] = [];
	private _recentPlayers: ProtoObject<IPlayerBaseView>[] = [];

	get friends() { return this._friends; }
	get friendMaxCount() { return this._friendMaxCount; }
	get applies() { return this._applies; }
	get recentPlayers() { return this._recentPlayers; }


	@InterestMessage(EMessageID.fetchFriendList)
	private onFetchFriendList(res: IResFriendList) {
		this._friends = res.friends.map($decodeProtoData);
		this._friendMaxCount = res.friend_max_count;
		this._friendCount = res.friend_count;
		this.dispatch(EUserEvent.OnFriendsChanged);
		this.dispatch(EUserEvent.OnFriendMaxCountChanged);
	}

	@InterestMessage(EMessageID.fetchFriendApplyList)
	private onFetchFriendApplyList(res: IResFriendApplyList) {
		this._applies = res.applies.map($decodeProtoData);
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}

	@InterestMessage(EMessageID.fetchRecentFriend)
	private onFetchRecentFriend(res: IResFetchrecentFriend) {
		$netMgr.requests.fetchMultiAccountBrief({ account_id_list: res.account_list })
			.then(res2 => {
				if (res2.error) return;
				this._recentPlayers = res2.players.map($decodeProtoData);
				this.dispatch(EUserEvent.OnFriendRecentChanged);
			});
	}

	@InterestMessage(ENotify.NotifyFriendViewChange)
	private onNotifyFriendViewChange(data: INotifyFriendViewChange) {
		const friend = this._friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.base = $decodeProtoData(data.base);
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InterestMessage(ENotify.NotifyFriendStateChange)
	private onNotifyFriendStateChange(data: INotifyFriendStateChange) {
		const friend = this._friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.state = $decodeProtoData(data.active_state);
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InterestMessage(ENotify.NotifyFriendChange)
	private onNotifyFriendChange(data: INotifyFriendChange) {
		const { _friends: friends } = this;
		if (data.type == 1) {
			friends.push($decodeProtoData(data.friend));
		} else if (data.type == 2) {
			const index = friends.findIndex(v => v.base.account_id == data.account_id);
			if (index < 0) return;
			friends.splice(index, 1);
		}
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InterestMessage(ENotify.NotifyNewFriendApply)
	private onNotifyNewFriendApply(data: INotifyNewFriendApply) {
		const { _applies: applies } = this;
		const exists = applies.find(v => v.account_id == data.account_id);
		if (exists) exists.apply_time = data.apply_time;
		else applies.push({ account_id: data.account_id, apply_time: data.apply_time });
		if (data.removed_id) {
			const index = applies.findIndex(v => v.account_id == data.removed_id);
			if (index >= 0) applies.splice(index, 1);
		}
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}
}