import ComItem from "../../../../ui/PkgCommon/ComItem";

export const enum EComItemMsg {

}

export class ComItemView extends ExtensionClass<IView, ComItem>(ComItem) implements IView {
	override onCreate() {

	}

	/** 刷新指定路径icon */
	refreshSkin(url: string) {
		this.loader_icon.icon = url;
	}

	/** 刷新半透明icon */
	refreshIcon(id: number) {
		const iconPath = $itemUtil.getItemView(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, iconPath);
	}

	/** 刷新不透明icon */
	refreshItemIcon(id: number) {
		const iconPath = $itemUtil.getItemView(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, iconPath);
	}

	/** 刷新loading图 */
	refreshLoadingImage(id: number) {
		const cfgCg = $cfgMgr.item_definition.loading_image[id];
		const iconPath = cfgCg ? cfgCg.thumb_path : "";
		$dynamicResMgr.setLoader(this.loader_icon, $langRes(iconPath));
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
