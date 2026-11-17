import UIMakaAnalysis from "../../../../ui/PkgCommon/UIMakaAnalysis";

export class UIMakaAnalysisView extends UIMakaAnalysis {

	override onCreate() {
		const { btn_mask, btn_close } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
	}

	refresh(uuid: string) {
		this.com_content.refresh(uuid);
	}

	override onOpenAni() { return $uiUtil.playTrans(this.trans_show, false); }

	override onCloseAni() { return $uiUtil.playTrans(this.trans_show, true, 0.3); }
}
