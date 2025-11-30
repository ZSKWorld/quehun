import ComBack from "../../../../ui/PkgCommon/ComBack";

export const enum EComBackMsg {
	
}

export class ComBackView extends ExtensionClass<IView, ComBack>(ComBack) implements IView {

	override onCreate() {
		const { btn_back } = this;
	}

	onBackClick(thisObj: any, listener: Function, args?: any[]) {
		this.btn_back.onClick(thisObj, listener, args);
	}

}
