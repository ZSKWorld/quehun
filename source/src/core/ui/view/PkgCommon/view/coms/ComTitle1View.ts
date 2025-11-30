import ComTitle1 from "../../../../ui/PkgCommon/ComTitle1";

export const enum EComTitle1Msg {

}

export class ComTitle1View extends ExtensionClass<IView, ComTitle1>(ComTitle1) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refresh(data: { account_id: number, title: number }) {
		const cfgTitle = $cfgMgr.item_definition.title[data.title];

		const titlePath = cfgTitle ? cfgTitle.icon : "extendRes/title/notitle.png";
		$dynamicResMgr.setLoader(this.loader_icon, $langRes(titlePath));
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
