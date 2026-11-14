import UIPaipu from "../../../../ui/PkgMain/UIPaipu";

const Scroll_Threshold = 150; // 触底检查阈值

export const enum EUIPaipuMsg {
	OnListInfoScrollEnd = "EUILiaoSheMsg_OnListInfoScrollEnd",
}

export class UIPaipuView extends UIPaipu {

	override onCreate() {
		const { com_back , list_info} = this;
		com_back.onBackClick(this, this.closeSelf);

		list_info.on(fgui.Events.SCROLL, this, this.onListRankScroll);
	}

	private onListRankScroll() {
		const { contentHeight, viewHeight, posY } = this.list_info.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this.event(EUIPaipuMsg.OnListInfoScrollEnd);
		}
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}
}
