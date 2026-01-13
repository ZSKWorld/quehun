import RenderFriendRecent from "../../../../ui/PkgMain/RenderFriendRecent";


export class RenderFriendRecentView extends ExtensionClass<IView, RenderFriendRecent>(RenderFriendRecent) implements IView {

	private _playerData: IPlayerBaseView;

	override onCreate() {
		const { btn_add } = this;
		btn_add.onClick(this, this.onBtnAddClick);
	}

	refresh(data: IPlayerBaseView) {
		this._playerData = data;
		const { com_head, com_title, com_name, btn_add, txt_added } = this;
		com_head.refresh(data.avatar_id, data.avatar_frame);
		com_title.refreshIcon(data.title);
		com_name.refresh(data);
		btn_add.visible = true;
		txt_added.visible = false;
	}

	override onDisable() {
		this._playerData = null;
	}

	private onBtnAddClick() {
		const data = this._playerData;
		if (!data) return;
		this.btn_add.visible = false;
		this.txt_added.visible = true;
		$netMgr.requests.applyFriend({ target_id: data.account_id });
	}
}
