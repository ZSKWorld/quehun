import ComHeadFrame from "../../../../ui/PkgCommon/ComHeadFrame";

export const enum EComHeadFrameMsg {

}

export class ComHeadFrameView extends ExtensionClass<IView, ComHeadFrame>(ComHeadFrame) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refresh(frameId: number) {
		// const d_item = $cfgMgr.item_definition.item[frameId];
		// if (!d_item || (!d_item.cross_view && !$gameUtil.isSameZone($userData.account.account_id, account_id)))
		// 	frameId = 305501;
		const viewCfg = $cfgMgr.item_definition.view[frameId];
		const framePath = viewCfg ? $langRes(`extendRes/head_frame/${ viewCfg.res_name }.png`) : "";
		$dynamicResMgr.setLoader(this.loader_icon, framePath);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
