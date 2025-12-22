import ComItem from "../../../../ui/PkgCommon/ComItem";

export const enum EComItemMsg {

}

export class ComItemView extends ExtensionClass<IView, ComItem>(ComItem) implements IView {
	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refreshIcon(id: number) {
		const iconPath = $itemUtil.getItemView(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, iconPath);
	}

	refreshItemIcon(id: number) {
		const iconPath = $itemUtil.getItemView(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, iconPath);
	}

	refreshLoadingImage(id: number) {
		const cfgCg = $cfgMgr.item_definition.loading_image[id];
		const iconPath = cfgCg ? cfgCg.thumb_path : "";
		$dynamicResMgr.setLoader(this.loader_icon, $langRes(iconPath));
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
