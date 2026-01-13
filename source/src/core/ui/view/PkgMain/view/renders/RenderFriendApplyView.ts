import RenderFriendApply from "../../../../ui/PkgMain/RenderFriendApply";

export class RenderFriendApplyView extends ExtensionClass<IView, RenderFriendApply>(RenderFriendApply) implements IView {

	private _playerData: IPlayerBaseView;

	override onCreate() {
		const { btn_look, btn_agree, btn_reject } = this;
		btn_look.onClick(this, this.onBtnLookClick);
		btn_agree.onClick(this, this.onBtnAgreeClick);
		btn_reject.onClick(this, this.onBtnRejectClick);
	}

	refresh(applyTime: number, data: ProtoObject<IPlayerBaseView>) {
		this._playerData = data;
		const {
			txt_offlineTime, com_head, com_title, com_name, com_level4, com_level3
		} = this;

		txt_offlineTime.text = $timeUtil.timeFormat5(applyTime);

		com_head.refresh(data.avatar_id, data.avatar_frame);
		com_title.refreshIcon(data.title);
		com_name.refresh(data);
		com_level4.refresh(data.level);
		com_level3.refresh(data.level3);
	}

	override onDisable() {
		this._playerData = null;
	}

	private onBtnLookClick() {
		const data = this._playerData;
		if (!data) return;
	}

	private onBtnAgreeClick() {
		const data = this._playerData;
		if (!data) return;
		$netMgr.requests.handleFriendApply({ target_id: data.account_id, method: 1 });
	}

	private onBtnRejectClick() {
		const data = this._playerData;
		if (!data) return;
		$netMgr.requests.handleFriendApply({ target_id: data.account_id, method: 2 });
	}
}
