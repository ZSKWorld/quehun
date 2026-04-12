import { BaseVO } from "./BaseVO";

export class FriendVO extends BaseVO implements VO.IFriendVO {
	private _friends: ProtoObject<IFriend>[] = [];
	private _friendMaxCount: number = 0;
	private _friendCount: number = 0;
	private _applies: ProtoObject<IResFriendApplyList_FriendApply>[] = [];
	private _applied = new Set<number>();

	get friends() { return this._friends; }
	get friendCount() { return this._friendCount; }
	get friendMaxCount() { return this._friendMaxCount; }
	get applies() { return this._applies; }
	get applied() { return this._applied; }

	isFriend(id: number) {
		return this._friends.find(v => v.base.account_id == id) != null;
	}

	@InterestMessage(ENetMessage.fetchFriendList)
	private onFetchFriendList(res: IResFriendList) {
		this._friends = res.friends.map($decodeProtoData);
		this._friendMaxCount = res.friend_max_count;
		this._friendCount = res.friend_count;
		this.sortFriend();
		this.dispatch(EUserEvent.OnFriendsChanged);
		this.dispatch(EUserEvent.OnFriendMaxCountChanged);
	}

	@InterestMessage(ENetMessage.fetchFriendApplyList)
	private onFetchFriendApplyList(res: IResFriendApplyList) {
		this._applies = res.applies.map($decodeProtoData);
		this.sortApply();
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}

	@InterestMessage(ENetMessage.handleFriendApply)
	private onHandleFriendApply(_, req: IReqHandleFriendApply) {
		const index = this._applies.findIndex(v => v.account_id == req.target_id);
		if (index < 0) return;
		this._applies.splice(index, 1);
		this.sortApply();
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}

	@InterestMessage(ENetMessage.applyFriend)
	private onApplyFriend(_, req: IReqApplyFriend) {
		this._applied.add(req.target_id);
	}

	@InterestMessage(ENetNotify.NotifyFriendViewChange)
	private onNotifyFriendViewChange(data: INotifyFriendViewChange) {
		const friend = this._friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.base = $decodeProtoData(data.base);
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InterestMessage(ENetNotify.NotifyFriendStateChange)
	private onNotifyFriendStateChange(data: INotifyFriendStateChange) {
		const friend = this._friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.state = $decodeProtoData(data.active_state);
		this.sortFriend();
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InterestMessage(ENetNotify.NotifyFriendChange)
	private onNotifyFriendChange(data: INotifyFriendChange) {
		const { _friends } = this;
		if (data.type == 1) {
			_friends.push($decodeProtoData(data.friend));
			this.sortFriend();
		} else if (data.type == 2) {
			const index = _friends.findIndex(v => v.base.account_id == data.account_id);
			if (index < 0) return;
			_friends.splice(index, 1);
		}
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InterestMessage(ENetNotify.NotifyNewFriendApply)
	private onNotifyNewFriendApply(data: INotifyNewFriendApply) {
		const { _applies } = this;
		const exists = _applies.find(v => v.account_id == data.account_id);
		if (exists) exists.apply_time = data.apply_time;
		else _applies.push({ account_id: data.account_id, apply_time: data.apply_time });
		if (data.removed_id) {
			const index = _applies.findIndex(v => v.account_id == data.removed_id);
			if (index >= 0) _applies.splice(index, 1);
		}
		this.sortApply();
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}

	private sortFriend() {
		this._friends.sort((a, b) => this.getSortNum(b) - this.getSortNum(a));
	}

	private sortApply() {
		this._applies.sort((a, b) => a.apply_time - b.apply_time);
	}

	private getSortNum(friend: IFriend) {
		if (!friend.state.is_online)
			return friend.state.logout_time;

		let num = 0;
		const inGaming = $gameUtil.getPlayerInGaming(friend.state.playing);
		if (inGaming) num += 60000000000;
		else num += 30000000000;

		if (friend.base.level)
			num += (friend.base.level.id % 1000) * 10000000;
		if (friend.base.level3)
			num += (friend.base.level3.id % 1000) * 10000;

		num += -Math.floor(friend.state.login_time / 10000000);
		return num;
	}
}