import ComHeadFrame from "../../../../ui/PkgCommon/ComHeadFrame";

export const enum EComHeadFrameMsg {

}

export class ComHeadFrameView extends ExtensionClass<IView, ComHeadFrame>(ComHeadFrame) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refreshIcon(id: number) {
		// const d_item = $cfgMgr.item_definition.item[frameId];
		// if (!d_item || (!d_item.cross_view && !$gameUtil.isSameZone($userData.account.account_id, account_id)))
		// 	frameId = 305501;
		const framePath = $itemUtil.getItemView(id).icon;
		$dynamicResMgr.setLoader(this.loader_icon, framePath);
	}


	refreshItemIcon(id: number) {
		const framePath = $itemUtil.getItemView(id).itemIcon;
		$dynamicResMgr.setLoader(this.loader_icon, framePath);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
