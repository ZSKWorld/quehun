import UIEntrance from "../../../../ui/PkgEntrance/UIEntrance";

export const enum EUIEntranceMsg {

}

export class UIEntranceView extends UIEntrance {

	get transT0Duration() {
		return this.trans_t0.totalDuration * 1000;
	}

	override onCreate() {

	}

}
