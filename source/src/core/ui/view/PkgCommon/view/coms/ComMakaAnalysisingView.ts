import ComMakaAnalysising from "../../../../ui/PkgCommon/ComMakaAnalysising";

export const enum EComMakaAnalysisingMsg {

}

export class ComMakaAnalysisingView extends ComMakaAnalysising {

	get comRot() { return this.com_rot; }
	get transShow() { return this.trans_show; }
	get transRotate() { return this.trans_rotate; }
	get transFinish() { return this.trans_finish; }

	override onCreate() {

	}

}
