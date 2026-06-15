import ComItem from "../../../../ui/PkgCommon/ComItem";

export const enum EComItemMsg {

}

export class ComItemView extends ExtendClass<IView, ComItem>(ComItem) implements IView {

	/** 刷新指定路径icon */
	refreshSkin(url: string) {
		$dynamicResMgr.setLoader(this.loader_icon, url);
	}

	/** 刷新半透明icon */
	refreshIcon(id: number) {
		const iconPath = $itemUtil.getItemInfo(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, iconPath);
	}

	/** 刷新不透明icon */
	refreshItemIcon(id: number) {
		const iconPath = $itemUtil.getItemInfo(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, iconPath);
	}

	/** 刷新loading图 */
	refreshLoadingImage(id: number) {
		const cfgCg = $cfgMgr.item_definition.loading_image[id];
		const iconPath = cfgCg ? cfgCg.thumb_path : "";
		$dynamicResMgr.setLoader(this.loader_icon, $langRes(iconPath));
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
