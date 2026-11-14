import RenderRecordItem from "../../../../ui/PkgMain/RenderRecordItem";

export const enum ERenderRecordItemMsg {
	OnBtnRenameClick = "RenderRecordItem_OnBtnRenameClick",
	OnBtnCollectClick = "RenderRecordItem_OnBtnCollectClick",
	OnBtnShareClick = "RenderRecordItem_OnBtnShareClick",
	OnBtnMakaClick = "RenderRecordItem_OnBtnMakaClick",
	OnBtnLookClick = "RenderRecordItem_OnBtnLookClick",
}

export class RenderRecordItemView extends RenderRecordItem {

	override onCreate() {
		const { btn_rename, btn_collect, btn_share, btn_maka, btn_look } = this;
		btn_rename.onClick(this, this.event, [ERenderRecordItemMsg.OnBtnRenameClick]);
		btn_collect.onClick(this, this.event, [ERenderRecordItemMsg.OnBtnCollectClick]);
		btn_share.onClick(this, this.event, [ERenderRecordItemMsg.OnBtnShareClick]);
		btn_maka.onClick(this, this.event, [ERenderRecordItemMsg.OnBtnMakaClick]);
		btn_look.onClick(this, this.event, [ERenderRecordItemMsg.OnBtnLookClick]);
	}

}
