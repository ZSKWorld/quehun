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

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
