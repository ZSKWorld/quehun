import BtnSevenDayAnswer from "../../../../ui/PkgMain/BtnSevenDayAnswer";

export const enum EBtnSevenDayAnswerMsg {

}

export class BtnSevenDayAnswerView extends ExtensionClass<IView, BtnSevenDayAnswer>(BtnSevenDayAnswer) implements IView {

	override onCreate() {

	}

	refresh(value: 0 | 1 | 2) {
		this.ctrl_type.selectedIndex = value;
	}
}
