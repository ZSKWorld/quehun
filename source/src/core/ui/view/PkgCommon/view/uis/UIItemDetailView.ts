import UIItemDetail from "../../../../ui/PkgCommon/UIItemDetail";

export const enum EUIItemDetailMsg {
	OnGraphBgClick = "UIItemDetail_OnGraphBgClick",
	OnBtnCloseClick = "UIItemDetail_OnBtnCloseClick",
	OnBtnOpen1Click = "UIItemDetail_OnBtnOpen1Click",
}

export class UIItemDetailView extends ExtensionClass<IView, UIItemDetail>(UIItemDetail) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		const { graph_bg, btn_close, btn_open1 } = this;
		graph_bg.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnGraphBgClick]);
		btn_close.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnCloseClick]);
		btn_open1.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnOpen1Click]);
	}

	refresh(id: number, from?: 1 | 2 | 3) {
		const { ctrl_desc, txt_name, com_item, txt_desc1, txt_desc2 } = this;
		const itemView = $itemUtil.getItemView(id);
		const hasFunc = itemView.desc && itemView.func;
		ctrl_desc.selectedIndex = hasFunc ? 0 : 1;
		txt_name.text = itemView.name;
		com_item.refresh(id);
		txt_desc1.text = hasFunc ? itemView.func : (itemView.desc || itemView.func);
		txt_desc2.text = itemView.desc;
	}

}
