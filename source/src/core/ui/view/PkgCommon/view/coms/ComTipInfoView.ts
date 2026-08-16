import ComTipInfo from "../../../../ui/PkgCommon/ComTipInfo";

export const enum EComTipInfoMsg {

}

export class ComTipInfoView extends ComTipInfo {

	override onCreate() {

	}

	setContent(text: string) {
		this.rtxt_content.text = text;
	}
}
