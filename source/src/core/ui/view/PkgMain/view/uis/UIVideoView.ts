import UIVideo from "../../../../ui/PkgMain/UIVideo";

export const enum EUIVideoMsg {
}

export class UIVideoView extends UIVideo {
	get transShow() { return this.trans_show; }
	get transHide() { return this.trans_hide; }
	get videoRoot() { return this.com_videoRoot; }

	override onCreate() {
		const { btn_jump } = this;
		btn_jump.onClick(this, this.closeSelf);
	}

	override onOpenAni() {
		return $uiUtil.playTrans(this.trans_show);
	}

	protected override onEnable() {
		$dynamicResMgr.setLoader(this.loader_aniItem1, ResPath.ETexturePath.PNG_Img_4024);
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_aniItem1);
		const anis = [this.trans_show];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
	}
}
