import ComHead1 from "../../../../ui/PkgCommon/ComHead1";

export const enum EComBigHead1Msg {

}

export class ComHead1View extends ComHead1 {

	override onCreate() {

	}

	refresh(skinId: number, type: 0 | 1 | 2 | 3) {
		this.com_head.refreshBigHead(skinId);
		this.ctrl_type.selectedIndex = type;
	}
}
