import ComRedDot1 from "../../../../ui/PkgCommon/ComRedDot1";

export const enum EComRedDotMsg {

}

export class ComRedDot1View extends ExtensionClass<IView, ComRedDot1>(ComRedDot1) implements IView {

	override onCreate() {

	}

	override onAwake() {
		this.dispatch(EGlobalEvent.RedDotCompAwake, this);
	}

	override onDestroy() {
		this.dispatch(EGlobalEvent.RedDotCompDestroy, this);
	}
}
