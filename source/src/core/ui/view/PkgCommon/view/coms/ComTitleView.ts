import ComTitle from "../../../../ui/PkgCommon/ComTitle";

export const enum EComTitle1Msg {

}

export class ComTitleView extends ExtensionClass<IView, ComTitle>(ComTitle) implements IView {

	override onCreate() {

	}

	refreshIcon(id: number) {
		const titlePath = $itemUtil.getItemInfo(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, titlePath || $langRes("extendRes/title/notitle.png"));
	}

	refreshItemIcon(id: number) {
		const titlePath = $itemUtil.getItemInfo(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, titlePath);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
