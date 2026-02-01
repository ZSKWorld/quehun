import ComHeadFrame from "../../../../ui/PkgCommon/ComHeadFrame";

export const enum EComHeadFrameMsg {

}

export class ComHeadFrameView extends ExtensionClass<IView, ComHeadFrame>(ComHeadFrame) implements IView {

	override onCreate() {

	}

	refreshIcon(id: number) {
		const d_item = $cfgMgr.item_definition.item[id];
		if (!d_item) id = 305501;

		const framePath = $itemUtil.getItemInfo(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, framePath);
	}


	refreshItemIcon(id: number) {
		const d_item = $cfgMgr.item_definition.item[id];
		if (!d_item) id = 305501;

		const framePath = $itemUtil.getItemInfo(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, framePath);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
