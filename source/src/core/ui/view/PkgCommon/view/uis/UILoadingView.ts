import { LoadingBgLoader } from "../../../../../game/LoadingBgLoader";
import UILoading from "../../../../ui/PkgCommon/UILoading";

export const enum EUILoadingMsg {

}

export class UILoadingView extends ExtensionClass<IView, UILoading>(UILoading) implements IView {

	override onCreate() {

	}

	refreshContent() {
		const { cg, left, mid, right, desk } = LoadingBgLoader.Inst;
		this.ctrl_state.selectedIndex = cg ? 1 : 0;
		if (cg) {
			this.loader_cg.icon = cg;
		} else {
			this.loader_left.icon = left;
			this.loader_mid.icon = mid;
			this.loader_right.icon = right;
			this.loader_desk.icon = desk;
		}
		this.refreshProgress(0);
		this.updateBlockPos();
	}

	updateBlockPos() {
		const cg = LoadingBgLoader.Inst.cg;
		const pb = cg ? this.pb_progress2 : this.pb_progress;
		const x = pb.value / pb.max * pb.width;
		pb.img_block.x = x;
	}

	refreshProgress(pro: number) {
		const cg = LoadingBgLoader.Inst.cg;
		const pb = cg ? this.pb_progress2 : this.pb_progress;
		pb.value = pro * pb.max;
	}

}
