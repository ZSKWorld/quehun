import ComMatchMode from "../../../../ui/PkgMain/ComMatchMode";
import { EComMatchModeShowType } from "../../event/MainDefine";

const TitleLang = {
	[EComMatchModeShowType.RankMode1]: 2079,
	[EComMatchModeShowType.MatchMode1]: 2025,
	[EComMatchModeShowType.FriendMode]: 2023,
};

export const enum EComMatchModeMsg {
	OnBtnBackClick = "ComMatchMode_OnBtnBackClick",
	OnBtnRankModeClick = "ComMatchMode_OnBtnRankModeClick",
	OnBtnMatchModeClick = "ComMatchMode_OnBtnMatchModeClick",
	OnBtnFriendModeClick = "ComMatchMode_OnBtnFriendModeClick",
}

export class ComMatchModeView extends ExtensionClass<IView, ComMatchMode>(ComMatchMode) implements IView {

	override onCreate() {
		const { btn_rankMode, btn_matchMode, btn_friendMode, btn_back } = this;
		btn_rankMode.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnRankModeClick]);
		btn_matchMode.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnMatchModeClick]);
		btn_friendMode.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnFriendModeClick]);
		btn_back.onClick(this, this.sendEvent, [EComMatchModeMsg.OnBtnBackClick]);
	}

	async setShowType(type: EComMatchModeShowType, lastType: EComMatchModeShowType) {
		this.touchable = false;
		const { txt_title, ctrl_type, trans_modeIn, trans_modeOut, trans_titleIn, trans_titleOut, com_content1, com_content2 } = this;
		switch (type) {
			case EComMatchModeShowType.Mode:
				$uiUtil.playTrans(trans_titleOut);
				await com_content1.transOut();
				ctrl_type.selectedIndex = 0;
				await $uiUtil.playTrans(trans_modeIn);
				break;
			case EComMatchModeShowType.RankMode1:
			case EComMatchModeShowType.MatchMode1:
			case EComMatchModeShowType.FriendMode:
				txt_title.langText(TitleLang[type]);
				if (lastType == EComMatchModeShowType.Mode) {
					await $uiUtil.playTrans(trans_modeOut);
					$uiUtil.playTrans(trans_titleIn);
					com_content1.mediator.data = type;
				} else {
					await com_content2.transOut();
				}
				ctrl_type.selectedIndex = type;
				await com_content1.transIn();
				break;
			case EComMatchModeShowType.RankMode2:
			case EComMatchModeShowType.MatchMode2:
				break;
		}
		this.touchable = true;
	}

}
