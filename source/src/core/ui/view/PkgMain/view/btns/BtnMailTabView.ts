import BtnMailTab from "../../../../ui/PkgMain/BtnMailTab";

export const enum EBtnMailTabMsg {

}

export class BtnMailTabView extends ExtensionClass<IView, BtnMailTab>(BtnMailTab) implements IView {

	override onCreate() {

	}

	refresh(data: ProtoObject<IMail>) {
		this.title = $gameUtil.getI18nContext(data.title_i18n, data.title);
		this.ctrl_open.selectedIndex = data.state ? 1 : 0;
	}

}
