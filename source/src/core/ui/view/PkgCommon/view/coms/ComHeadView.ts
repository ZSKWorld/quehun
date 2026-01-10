import ComHead from "../../../../ui/PkgCommon/ComHead";

export const enum EComBigHeadMsg {

}

export class ComHeadView extends ExtensionClass<IView, ComHead>(ComHead) implements IView {

	override onCreate() {

	}

	refreshBigHead(skinId: number) {
		const headPath = $itemUtil.getItemView(skinId).icon;
		$dynamicResMgr.setLoader(this.loader_icon, headPath);
	}

	refreshSmallHead(skinId: number) {
		const headPath = $itemUtil.getItemView(skinId).icon;
		$dynamicResMgr.setLoader(this.loader_icon, headPath.replace("bighead", "smallhead"));
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
