import BtnEmailTab from "../../../../ui/PkgMain/BtnEmailTab";

export const enum EBtnEmailTabMsg {

}

export class BtnEmailTabView extends ExtensionClass<IView, BtnEmailTab>(BtnEmailTab) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<IMail>) {
		this.title = $gameUtil.getI18nContext(data.title_i18n, data.title);
		this.ctrl_open.selectedIndex = data.state ? 1 : 0;
	}

}
