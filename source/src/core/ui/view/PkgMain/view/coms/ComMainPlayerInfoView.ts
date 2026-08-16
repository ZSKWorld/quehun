import ComMainPlayerInfo from "../../../../ui/PkgMain/ComMainPlayerInfo";


const enum EUIMainPlayerInfoLevelShowType {
	SiMa = 1,
	SanMa = 2,
}

export class ComMainPlayerInfoView extends ComMainPlayerInfo {

	override onCreate() {
		const { btn_level, btn_info } = this;
		btn_level.onClick(this, this.refreshPlayerLevel, [true]);
		btn_info.onClick(this, this.onBtnInfoClick);
	}

	refresh() {
		const { title, nickName: nickname, verified } = $user.account;
		this.com_title.refreshIcon(title);
		this.label_name.refresh({ nickname, verified });
		this.refreshPlayerLevel(false);
	}

	private refreshPlayerLevel(change: boolean) {
		let rankShowType = $localDataMgr.getNum(ELocalDataKey.PlayerInfoLevelShowType, EUIMainPlayerInfoLevelShowType.SiMa);
		if (change) {
			rankShowType = rankShowType == EUIMainPlayerInfoLevelShowType.SiMa ? EUIMainPlayerInfoLevelShowType.SanMa : EUIMainPlayerInfoLevelShowType.SiMa;
			$localDataMgr.setNum(ELocalDataKey.PlayerInfoLevelShowType, rankShowType);
		}
		const { level, level3 } = $user.account;
		const data = rankShowType == EUIMainPlayerInfoLevelShowType.SiMa ? level : level3;
		const data2 = rankShowType == EUIMainPlayerInfoLevelShowType.SiMa ? level3 : level;

		const { ctrl_ht, ctrl_star, txt_htLevel, loader_icon, btn_level } = this;
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, loader_icon, txt_htLevel }, data);
		$uiUtil.refreshLevel({ loader_icon: btn_level.iconObject as fgui.GLoader }, data2);
	}

	private onBtnInfoClick() {

	}
}
