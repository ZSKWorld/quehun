import { UIUtil } from "../../../../tool/UIUtil";
import ComMatchMode from "../../../../ui/PkgMain/ComMatchMode";
import { EComMatchModeShowType } from "../../event/MainDefine";

export const enum EComMatchModeMsg {
	OnBtnBackClick = "ComMatchMode_OnBtnBackClick",
	OnBtnRankModeClick = "ComMatchMode_OnBtnRankModeClick",
	OnBtnMatchModeClick = "ComMatchMode_OnBtnMatchModeClick",
	OnBtnFriendModeClick = "ComMatchMode_OnBtnFriendModeClick",
}

export class ComMatchModeView extends ExtensionClass<IView, ComMatchMode>(ComMatchMode) implements IView {
	curMode: EComMatchModeShowType;
	lastMode: EComMatchModeShowType;

	override onCreate() {
		const { btn_rankMode, btn_matchMode, btn_friendMode, btn_back } = this;
		btn_rankMode.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnRankModeClick]);
		btn_matchMode.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnMatchModeClick]);
		btn_friendMode.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnFriendModeClick]);
		btn_back.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnBackClick]);
	}

	async setShowType(type: EComMatchModeShowType) {
		if (this.curMode == type) return;
		this.lastMode = EComMatchModeShowType.Mode;
		const lastMode = this.curMode || this.lastMode;
		this.curMode = type;
		this.touchable = false;
		const { ctrl_type, trans_modeIn, trans_modeOut, trans_titleIn, trans_titleOut, com_content1, com_content2 } = this;
		switch (type) {
			case EComMatchModeShowType.Mode:
				UIUtil.playTrans(this.trans_titleOut);
				await com_content1.transOut();
				this.ctrl_type.selectedIndex = 0;
				await UIUtil.playTrans(this.trans_modeIn);
				break;
			case EComMatchModeShowType.RankMode1:
			case EComMatchModeShowType.MatchMode1:
			case EComMatchModeShowType.FriendMode:
				if (lastMode == EComMatchModeShowType.Mode) {
					await UIUtil.playTrans(this.trans_modeOut);
					this.ctrl_type.selectedIndex = type;
					UIUtil.playTrans(this.trans_titleIn);
					await com_content1.transIn();
				} else {

				}
				break;
			case EComMatchModeShowType.RankMode2:
			case EComMatchModeShowType.MatchMode2:
				this.lastMode = lastMode;
				break;
		}
		this.touchable = true;
	}

}
