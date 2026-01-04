import ComTitle from "../../../../ui/PkgCommon/ComTitle";

export const enum EComTitle1Msg {

}

export class ComTitleView extends ExtensionClass<IView, ComTitle>(ComTitle) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refreshIcon(id:number) {
		const titlePath = $itemUtil.getItemView(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, titlePath || $langRes("extendRes/title/notitle.png"));
	}

	refreshItemIcon(id:number) {
		const titlePath = $itemUtil.getItemView(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, titlePath);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
