import BtnEmailTab from "../../../../ui/PkgMain/BtnEmailTab";

export const enum EBtnEmailTabMsg {

}

export class BtnEmailTabView extends ExtensionClass<IView, BtnEmailTab>(BtnEmailTab) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<IMail>) {
		
	}

}
