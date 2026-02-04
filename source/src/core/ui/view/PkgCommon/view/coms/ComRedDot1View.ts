import ComRedDot1 from "../../../../ui/PkgCommon/ComRedDot1";

export const enum EComRedDotMsg {

}

export class ComRedDot1View extends ExtensionClass<IView, ComRedDot1>(ComRedDot1) implements IView {

	override onCreate() {

	}

	override onAwake() {
		this.dispatch(ENotifyConst.RedDotCompAwake, this);
	}

	override onDestroy() {
		this.dispatch(ENotifyConst.RedDotCompDestroy, this);
	}
}
