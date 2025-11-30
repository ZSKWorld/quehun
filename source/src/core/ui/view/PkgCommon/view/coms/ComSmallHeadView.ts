import ComSmallHead from "../../../../ui/PkgCommon/ComSmallHead";

export const enum EComHead1Msg {

}

export class ComSmallHeadView extends ExtensionClass<IView, ComSmallHead>(ComSmallHead) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refresh(data: { account_id: number, avatar_id: number, avatar_frame?: number }) {
		const { avatar_id, avatar_frame, account_id } = data;
		const { loader_head, loader_frame } = this;
		const skinCfg = $cfgMgr.item_definition.skin[avatar_id];
		const headPath = skinCfg ? $langRes(`${ skinCfg.path }/smallhead.png`) : "";
		$dynamicResMgr.setLoader(loader_head, headPath);

		let frameId = avatar_frame;
		const d_item = $cfgMgr.item_definition.item[frameId];
		if (!d_item || (!d_item.cross_view && !$gameUtil.isSameZone($userData.account.account_id, account_id)))
			frameId = 305501;

		const viewCfg = $cfgMgr.item_definition.view[frameId];
		const framePath = viewCfg ? $langRes(`extendRes/head_frame/${ viewCfg.res_name }.png`) : "";
		$dynamicResMgr.setLoader(loader_frame, framePath);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_head);
		$dynamicResMgr.clearLoader(this.loader_frame);
	}
}
