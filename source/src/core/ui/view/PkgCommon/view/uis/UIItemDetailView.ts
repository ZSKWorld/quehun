import UIItemDetail from "../../../../ui/PkgCommon/UIItemDetail";

export interface IItemOpenJumpInfo {
	open: 0 | 1 | 2;
	go: 0 | 1;
	goTitle: string;
	goDesc: string;
	goBtn: boolean;
	goViewID: EViewID,
}

export const enum EUIItemDetailMsg {
	OnBtnOpen1Click = "UIItemDetail_OnBtnOpen1Click",
	OnBtnOpen10Click = "UIItemDetail_OnBtnOpen10Click",
	OnBtnGoToClick = "UIItemDetail_OnBtnGoToClick",
}

export class UIItemDetailView extends ExtensionClass<IView, UIItemDetail>(UIItemDetail) implements IView {

	override onCreate() {
		const { graph_bg, btn_close, btn_open1, btn_open10, btn_goto } = this;
		graph_bg.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		btn_open1.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnOpen1Click]);
		btn_open10.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnOpen10Click]);
		btn_goto.onClick(this, this.sendEvent, [EUIItemDetailMsg.OnBtnGoToClick]);

	}

	refresh(id: number, info: IItemOpenJumpInfo) {
		const { ctrl_desc, ctrl_open, ctrl_go, btn_goto, txt_name, com_item, txt_desc1, txt_desc2, txt_goTitle, txt_goDesc } = this;
		const itemView = $itemUtil.getItemInfo(id);
		const hasFunc = itemView.desc && itemView.func;
		ctrl_desc.selectedIndex = hasFunc ? 0 : 1;
		txt_name.text = itemView.name;
		com_item.refresh(id);
		txt_desc1.text = hasFunc ? itemView.func : (itemView.desc || itemView.func);
		txt_desc2.text = itemView.desc;

		ctrl_open.selectedIndex = info.open;
		ctrl_go.selectedIndex = info.go;
		txt_goTitle.text = info.goTitle;
		txt_goDesc.text = info.goDesc;
		btn_goto.visible = info.goBtn;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
