import ComMakaAnalysis from "../../../../ui/PkgCommon/ComMakaAnalysis";

export class ComMakaAnalysisView extends ComMakaAnalysis {

	override onCreate() {
		const { btn_info } = this;
		btn_info.onClick(this, this.onBtnInfoClick);
	}

	refresh(uuid: string) {
		this.data = uuid;
		this.txt_count.text = $user.record.maka.remainCount.toString();
		this.com_content.refresh(uuid);
	}

	protected override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, ResPath.ETexturePath.PNG_Img_4141);
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}

	private onBtnInfoClick() {
		$confirmMid(1, $lang(20354));
	}
}
