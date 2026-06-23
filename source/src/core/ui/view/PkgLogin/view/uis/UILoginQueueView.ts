import UILoginQueue from "../../../../ui/PkgLogin/UILoginQueue";

export const enum EUILoginQueueMsg {

}

export class UILoginQueueView extends ExtendClass<IView, UILoginQueue>(UILoginQueue) implements IView {

	override onCreate() {
		const { btn_quit } = this;
		btn_quit.onClick(this, this.closeSelf);
	}

	refresh(data?: IResFetchQueueInfo) {
		if (!data) {
			this.txt_pos.text = "--";
			this.txt_time.text = "--";
		} else {
			const { rank, remain } = data;
			this.txt_pos.text = rank > 999 ? "999+" : rank.toString();
			this.txt_time.text = remain > 3600 ? "60+" : Math.floor(remain / 60).toString();
		}
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
