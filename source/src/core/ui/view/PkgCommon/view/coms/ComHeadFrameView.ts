import ComHeadFrame from "../../../../ui/PkgCommon/ComHeadFrame";

export const enum EComHeadFrameMsg {

}

export class ComHeadFrameView extends ExtensionClass<IView, ComHeadFrame>(ComHeadFrame) implements IView {

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
