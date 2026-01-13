import ComTipInfo from "../../../../ui/PkgCommon/ComTipInfo";

export const enum EComTipInfoMsg {

}

export class ComTipInfoView extends ExtensionClass<IView, ComTipInfo>(ComTipInfo) implements IView {

	override onCreate() {

	}

	setContent(text: string) {
		this.rtxt_content.text = text;
	}
}
