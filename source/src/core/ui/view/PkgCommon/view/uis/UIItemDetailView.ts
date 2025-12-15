import UIItemDetail from "../../../../ui/PkgCommon/UIItemDetail";

export const enum EUIItemDetailMsg {
	OnGraphBgClick = "UIItemDetail_OnGraphBgClick",
	OnBtnCloseClick = "UIItemDetail_OnBtnCloseClick",
	OnBtnConfirmClick = "UIItemDetail_OnBtnConfirmClick",
}

export class UIItemDetailView extends ExtensionClass<IView, UIItemDetail>(UIItemDetail) implements IView {

	override onCreate() {
		const { graph_bg, btn_close, btn_confirm } = this;
		graph_bg.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnGraphBgClick]);
		btn_close.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnCloseClick]);
		btn_confirm.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnConfirmClick]);
	}

	refresh(id: number) {
		const { txt_name, com_item, txt_desc1, txt_desc2 } = this;
		com_item.refresh(id);
	}

}
