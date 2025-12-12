import ComHead from "../../../../ui/PkgCommon/ComHead";

export const enum EComBigHeadMsg {

}

export class ComHeadView extends ExtensionClass<IView, ComHead>(ComHead) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refreshBigHead(skinId: number) {
		const skinCfg = $cfgMgr.item_definition.skin[skinId];
		const headPath = skinCfg ? $langRes(`${ skinCfg.path }/bighead.png`) : "";
		$dynamicResMgr.setLoader(this.loader_icon, headPath);
	}

	refreshSmallHead(skinId: number) {
		const skinCfg = $cfgMgr.item_definition.skin[skinId];
		const headPath = skinCfg ? $langRes(`${ skinCfg.path }/smallhead.png`) : "";
		$dynamicResMgr.setLoader(this.loader_icon, headPath);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
