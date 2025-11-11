import ComBack from "../../../../ui/PkgCommon/ComBack";

export const enum EComBackMsg {
	
}

export class ComBackView extends ExtensionClass<IView, ComBack>(ComBack) implements IView {

	override onCreate() {
		const { btn_back } = this;
	}

}
