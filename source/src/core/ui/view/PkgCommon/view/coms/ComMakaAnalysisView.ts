import ComMakaAnalysis from "../../../../ui/PkgCommon/ComMakaAnalysis";

export class ComMakaAnalysisView extends ComMakaAnalysis {
	override onCreate() {
		const { btn_info, com_content } = this;
		btn_info.onClick(this, this.onBtnInfoClick);
		com_content.onConfirmClick(this, this.onBtnConfirmClick);
	}

	refresh(uuid: string) {
		this.data = uuid;
		this.txt_count.text = $user.record.maka.remainCount.toString();
		this.com_content.refresh(uuid);

		const makaData = $user.record.maka.getAnalysisData(uuid);
		const analysising = makaData?.state == EMakaState.Analysising;
		if (analysising) {
			this.playTransRot();
		} else {
			if (this.com_circle.visible)
				this.playTransFinish();
		}
	}

	protected override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4141);
	}

	protected override onDisable() {
		this.com_circle.visible = false;
		this.com_content.visible = true;
		this.com_content.alpha = 1;
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	private onBtnInfoClick() {
		this.openView(EViewID.UIInfoView, $lang(20354));
	}

	private onBtnConfirmClick() {
		if ($user.record.maka.analysisRecord(this.data)) {
			this.playTransStart();
		}
	}

	private playTransStart() {
		this.com_circle.comRot.transRotate.stop();
		this.trans_start.play();
	}

	private playTransRot() {
		this.trans_rotate.play();
	}

	private playTransFinish() {
		this.com_circle.comRot.transRotate.stop();
		this.trans_finish.play();
	}
}
