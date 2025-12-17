import ComTitle from "../../../../ui/PkgCommon/ComTitle";

export const enum EComTitle1Msg {

}

export class ComTitleView extends ExtensionClass<IView, ComTitle>(ComTitle) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refreshIcon(data: { account_id: number, title: number }) {
		const titlePath = $itemUtil.getItemView(data.title).icon;
		$dynamicResMgr.setLoader(this.loader_icon, titlePath || $langRes("extendRes/title/notitle.png"));
	}

	refreshItemIcon(data: { account_id: number, title: number }) {
		const titlePath = $itemUtil.getItemView(data.title).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, titlePath);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
