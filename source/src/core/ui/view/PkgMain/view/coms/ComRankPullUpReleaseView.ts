import ComRankPullUpRelease from "../../../../ui/PkgMain/ComRankPullUpRelease";

export const enum EComRankPullUpReleaseMsg {

}

export class ComRankPullUpReleaseView extends ExtensionClass<IView, ComRankPullUpRelease>(ComRankPullUpRelease) implements IView {

	get readyToRefresh() { return this.ctrl_c1.selectedIndex == 1; }

	override onCreate() {
		this.on(fgui.Events.SIZE_CHANGED, this, this.onSizeChanged);
	}

	refreshStatus(status: 0 | 1 | 2 | 3) {
		this.ctrl_c1.selectedIndex = status;
	}

	private onSizeChanged() {
		const status = this.ctrl_c1.selectedIndex;
		if (status == 2) return;
		const halfH = this.height > this.sourceHeight;
		this.refreshStatus(halfH ? 1 : 0);
	}

}
