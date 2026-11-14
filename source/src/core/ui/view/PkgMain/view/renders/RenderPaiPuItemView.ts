import RenderPaiPuItem from "../../../../ui/PkgMain/RenderPaiPuItem";

export const enum ERenderPaiPuItemMsg {
	OnBtnRenameClick = "RenderPaiPuItem_OnBtnRenameClick",
	OnBtnCollectClick = "RenderPaiPuItem_OnBtnCollectClick",
	OnBtnShareClick = "RenderPaiPuItem_OnBtnShareClick",
	OnBtnMakaClick = "RenderPaiPuItem_OnBtnMakaClick",
	OnBtnLookClick = "RenderPaiPuItem_OnBtnLookClick",
}

export class RenderPaiPuItemView extends RenderPaiPuItem {

	override onCreate() {
		const { btn_rename, btn_collect, btn_share, btn_maka, btn_look } = this;
		btn_rename.onClick(this, this.event, [ERenderPaiPuItemMsg.OnBtnRenameClick]);
		btn_collect.onClick(this, this.event, [ERenderPaiPuItemMsg.OnBtnCollectClick]);
		btn_share.onClick(this, this.event, [ERenderPaiPuItemMsg.OnBtnShareClick]);
		btn_maka.onClick(this, this.event, [ERenderPaiPuItemMsg.OnBtnMakaClick]);
		btn_look.onClick(this, this.event, [ERenderPaiPuItemMsg.OnBtnLookClick]);
	}

}
