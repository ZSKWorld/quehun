import RenderRecordItem2 from "../../../../ui/PkgMain/RenderRecordItem2";

export const enum ERenderRecordItem2Msg {

}

export class RenderRecordItem2View extends RenderRecordItem2 {

	refresh(uuid:string, data: IRecordPlayerResult, isSiMa:boolean) {
		if (!data) return;
		const {
			ctrl_my, loader_maka, loader_beilv, com_level, label_name, txt_rank,
			txt_score, txt_point, txt_lizhi, txt_ron, txt_zimo, txt_cong,
		} = this;
		const {
			rank, account_id, nickname, level, level3, seat, pt, point, max_hu_type, action_liqi, action_rong,
			action_zimo, action_chong, verified,
		} = data;

		const makaData = $user.record.maka.getAnalysisData(uuid);

		ctrl_my.selectedIndex = account_id == $user.account.accountId ? 1 : 0;
		label_name.refresh(data);
		com_level.refresh(isSiMa ? level : level3);
		txt_point.text = (pt > 0 ? "+" : "") + pt;
		txt_score.text = point.toString();

		const makaLevel = makaData && makaData.state == EMakaState.Analysised ? makaData.player_scores.find(v => v.seat == data.seat).rating : EMakaLevel.None;
		loader_maka.icon = $uiUtil.getMakaLevelTile(makaLevel);
		loader_beilv.icon = $uiUtil.getBigHuTile(max_hu_type < 3 ? EBigHuType.E_Dadian_Title_none : max_hu_type);

		txt_lizhi.text = action_liqi.toString();
		txt_ron.text = action_rong.toString();
		txt_zimo.text = action_zimo.toString();
		txt_cong.text = action_chong.toString();
	}

}
