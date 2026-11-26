import ComMakaAnalysisContent from "../../../../ui/PkgCommon/ComMakaAnalysisContent";

export class ComMakaAnalysisContentView extends ComMakaAnalysisContent {

	override onCreate() {
	}

	onConfirmClick(thisObj: any, listener: Function, args?: any[]) {
		this.btn_confirm.onClick(thisObj, listener, args);
	}

	refresh(uuid: string) {
		this.data = uuid;
		const {
			ctrl_self, ctrl_siMa, btn_confirm, btn_toGame, txt_name, txt_time,
			loader_maka0, loader_maka1, loader_maka2, loader_maka3,
			loader_beilv0, loader_beilv1, loader_beilv2, loader_beilv3,
			label_name0, label_name1, label_name2, label_name3,
			txt_score0, txt_score1, txt_score2, txt_score3,
		} = this;
		const { end_time, tag, subtag, players } = $user.record.getRecordDetail(uuid);

		const defaultRemarks = $uiUtil.getRecordTitle(tag, subtag);
		const collectBrief = $user.record.getCollectBrief(uuid);
		txt_name.text = collectBrief && collectBrief.remarks || defaultRemarks;
		txt_time.text = $timeUtil.timeFormat1(end_time * 1000, false);

		const isSiMa = players.length == 4;
		ctrl_siMa.selectedIndex = isSiMa ? 1 : 0;
		const selfIndex = players.findIndex(v => v.account_id == $user.account.accountId);
		ctrl_self.selectedIndex = selfIndex;
		loader_maka3.visible = loader_beilv3.visible = label_name3.visible = txt_score3.visible = isSiMa;

		const makaData = $user.record.maka.getAnalysisData(uuid);

		btn_confirm.visible = !makaData || makaData.state == EMakaState.UnAnalysis || makaData.state == EMakaState.Expired;
		btn_toGame.visible = makaData?.state == EMakaState.Analysised;

		const [p0, p1, p2, p3] = players;
		label_name0.refresh(p0);
		label_name1.refresh(p1);
		label_name2.refresh(p2);
		p3 && label_name3.refresh(p3);

		txt_score0.text = p0.point.toString();
		txt_score1.text = p1.point.toString();
		txt_score2.text = p2.point.toString();
		p3 && (txt_score3.text = p3.point.toString());

		const playerScores = makaData?.state == EMakaState.Analysised ? makaData.player_scores : null;
		loader_maka0.icon = $uiUtil.getMakaLevelTile(playerScores ? playerScores.find(v => v.seat == p0.seat).rating : EMakaLevel.None);
		loader_maka1.icon = $uiUtil.getMakaLevelTile(playerScores ? playerScores.find(v => v.seat == p1.seat).rating : EMakaLevel.None);
		loader_maka2.icon = $uiUtil.getMakaLevelTile(playerScores ? playerScores.find(v => v.seat == p2.seat).rating : EMakaLevel.None);
		p3 && (loader_maka3.icon = $uiUtil.getMakaLevelTile(playerScores ? playerScores.find(v => v.seat == p3.seat).rating : EMakaLevel.None));

		loader_beilv0.icon = $uiUtil.getBigHuTile(p0.max_hu_type < 3 ? EBigHuType.E_Dadian_Title_none : p0.max_hu_type);
		loader_beilv1.icon = $uiUtil.getBigHuTile(p1.max_hu_type < 3 ? EBigHuType.E_Dadian_Title_none : p1.max_hu_type);
		loader_beilv2.icon = $uiUtil.getBigHuTile(p2.max_hu_type < 3 ? EBigHuType.E_Dadian_Title_none : p2.max_hu_type);
		p3 && (loader_beilv3.icon = $uiUtil.getBigHuTile(p3.max_hu_type < 3 ? EBigHuType.E_Dadian_Title_none : p3.max_hu_type));
	}

	protected override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_3930);
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}
}
