import ComTitle from "../../../../ui/PkgCommon/ComTitle";

export const enum EComTitle1Msg {

}

export class ComTitleView extends ExtensionClass<IView, ComTitle>(ComTitle) implements IView {

	refreshIcon(id: number) {
		const icon = $itemUtil.getItemInfo(id).icon || $langRes("extendRes/title/notitle.png");
		$dynamicResMgr.setLoader(this.loader_icon, icon);
	}

	refreshItemIcon(id: number) {
		const icon = $itemUtil.getItemInfo(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, icon);
	}

	override onEnable() {
		Laya.timer.clear(this, this.clearLoader);
	}

	override onDisable() {
		Laya.timer.frameOnce(1, this, this.clearLoader);
	}

	private clearLoader() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
