import { BaseDO } from "./BaseDO";


class FriendRoomDO extends BaseDO implements DO.IFriendRoomDO {
	private _inviteInfos: DO.IInviteInfo[] = [];
	private _inviteBanned: Record<AccountID, number> = {};
	private _joinedRoomId: ID = 0;

	private _room: IRoom;
	private get inRoom() { return this._room != null; }

	bannedInvite(accountId: AccountID) {
		this._inviteBanned[accountId] = $timeUtil.second;
		this.cancelInvite(accountId);
	}

	cancelInvite(accountId: AccountID) {
		const index = this._inviteInfos.findIndex(v => v.account_id == accountId);
		if (index == -1) return;
		this._inviteInfos.splice(index, 1);
	}

	joinInvite(accountId: AccountID) {
		const index = this._inviteInfos.findIndex(v => v.account_id == accountId);
		if (index == -1) return;
		const info = this._inviteInfos.splice(index, 1)[0];
		this.joinRoom(info.room_id);
	}

	createRoom() {
		if (this.inRoom) return;
		$netMgr.requests.createRoom();
	}

	joinRoom(roomId: number) {
		if (roomId == this._joinedRoomId) return;
		if (this._room && roomId == this._room.room_id) return;
		this._joinedRoomId = roomId;
		$netMgr.requests.joinRoom({
			room_id: roomId,
			client_version_string: $gameMgr.clientVersionStr,
		});
	}

	addRoomRobot() { }

	roomKickPlayer() { }

	readyPlay() { }

	startRoom() { }

	leaveRoom() {
		if (!this.inRoom) return;
		$netMgr.requests.leaveRoom();
	}

	@InjectNetEvent(ENetMessage.joinRoom)
	private onJoinRoom(res: IResJoinRoom, req: IReqJoinRoom) {
		this._joinedRoomId = 0;
		this._room = $decodeProtoData(res.room);
		this.dispatch(EGlobalEvent.OnJoinRoom);
	}

	@InjectNetEvent(ENetMessage.leaveRoom)
	@InjectNetEvent(ENetNotify.NotifyRoomKickOut)
	private onNotifyRoomKickOut() {
		this._room = null;
	}

	@InjectNetEvent(ENetNotify.NotifyRoomPlayerReady)
	private onNotifyRoomPlayerReady(res: INotifyRoomPlayerReady) {

	}
	@InjectNetEvent(ENetNotify.NotifyRoomPlayerUpdate)
	private onNotifyRoomPlayerUpdate(res: INotifyRoomPlayerUpdate) {

	}

	@InjectNetEvent(ENetNotify.NotifyClientMessage)
	private onNotifyClientMessage(res: INotifyClientMessage) {
		if (res.type == EClientMessageType.FriendInvite) {
			const info: DO.IInviteInfo = JSON.parse(res.content);
			const bannedTime = this._inviteBanned[info.account_id];
			if (bannedTime && ($timeUtil.second - bannedTime) < 300)
				return;

			if (info.room_id == this._joinedRoomId) return;
			//TODO 匹配中不弹
			//TODO 匹配成功不弹
			//TODO 在大会室里不弹

			info.time = $timeUtil.second;

			const index = this._inviteInfos.findIndex(v => v.account_id == info.account_id);
			if (index >= 0) this._inviteInfos.splice(index, 1);
			this._inviteInfos.push(info);

			this.dispatch(EGlobalEvent.OnFriendInvite, [info, res.sender]);
		}
	}
}

export class FriendDO extends BaseDO implements DO.IFriendDO {
	private _friends: ProtoObject<IFriend>[] = [];
	private _friendMaxCount: number = 0;
	private _friendCount: number = 0;
	private _applies: ProtoObject<IResFriendApplyList.IFriendApply>[] = [];
	private _applied = new Set<number>();
	private _room = new FriendRoomDO();

	get friends() { return this._friends; }
	get friendCount() { return this._friendCount; }
	get friendMaxCount() { return this._friendMaxCount; }
	get applies() { return this._applies; }
	get applied() { return this._applied; }

	get room() { return this._room; }

	isFriend(id: number) {
		return this._friends.find(v => v.base.account_id == id) != null;
	}

	@InjectNetEvent(ENetMessage.fetchFriendList)
	private onFetchFriendList(res: IResFriendList) {
		this._friends = res.friends.map($decodeProtoData);
		this._friendMaxCount = res.friend_max_count;
		this._friendCount = res.friend_count;
		this.sortFriend();
		this.dispatch(EUserEvent.OnFriendsChanged);
		this.dispatch(EUserEvent.OnFriendMaxCountChanged);
	}

	@InjectNetEvent(ENetMessage.fetchFriendApplyList)
	private onFetchFriendApplyList(res: IResFriendApplyList) {
		this._applies = res.applies.map($decodeProtoData);
		this.sortApply();
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}

	@InjectNetEvent(ENetMessage.handleFriendApply)
	private onHandleFriendApply(_, req: IReqHandleFriendApply) {
		const index = this._applies.findIndex(v => v.account_id == req.target_id);
		if (index < 0) return;
		this._applies.splice(index, 1);
		this.sortApply();
		this.dispatch(EUserEvent.OnFriendApplyChanged);
	}

	@InjectNetEvent(ENetMessage.applyFriend)
	private onApplyFriend(_, req: IReqApplyFriend) {
		this._applied.add(req.target_id);
	}

	@InjectNetEvent(ENetNotify.NotifyFriendViewChange)
	private onNotifyFriendViewChange(data: INotifyFriendViewChange) {
		const friend = this._friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.base = $decodeProtoData(data.base);
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InjectNetEvent(ENetNotify.NotifyFriendStateChange)
	private onNotifyFriendStateChange(data: INotifyFriendStateChange) {
		const friend = this._friends.find(v => v.base.account_id == data.target_id);
		if (!friend) return;
		friend.state = $decodeProtoData(data.active_state);
		this.sortFriend();
		this.dispatch(EUserEvent.OnFriendsChanged);
	}

	@InjectNetEvent(ENetNotify.NotifyFriendChange)
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

	@InjectNetEvent(ENetNotify.NotifyNewFriendApply)
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

	@InjectNetEvent(ENetNotify.NotifyVipLevelChange)
	private onNotifyVipLevelChange(data: INotifyVipLevelChange) {
		this._friendMaxCount = data.friend_max_count;
		this.dispatch(EUserEvent.OnFriendMaxCountChanged);
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