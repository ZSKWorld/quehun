import ComSmallHead from "../../../../ui/PkgCommon/ComSmallHead";

export const enum EComHead1Msg {

}

export class ComSmallHeadView extends ExtensionClass<IView, ComSmallHead>(ComSmallHead) implements IView {

	set skinId(value: number) {

	}

	set frameId(value: number) {

	}

	override onCreate() {

	}

	refresh(data: { account_id: number, avatar_id: number, avatar_frame?: number }) {
		const { avatar_id, avatar_frame, account_id } = data;
		const { loader_head, loader_frame } = this;
		const skinCfg = $cfgMgr.item_definition.skin[avatar_id];
		const headPath = skinCfg ? $langRes(`${ skinCfg.path }/smallhead.png`) : "";
		loader_head.icon = headPath;

		let frameId = avatar_frame;
		const d_item = $cfgMgr.item_definition.item[frameId];
		if (!d_item || (!d_item.cross_view && !$gameUtil.isSameZone($userData.account.account_id, account_id)))
			frameId = 305501;

		const viewCfg = $cfgMgr.item_definition.view[frameId];
		const framePath = viewCfg ? $langRes(`extendRes/head_frame/${ viewCfg.res_name }.png`) : "";
		loader_frame.icon = framePath;
		Logger.error(headPath, framePath);
	}
}
