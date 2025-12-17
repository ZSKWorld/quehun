import ComHead from "../../../../ui/PkgCommon/ComHead";

export const enum EComBigHeadMsg {

}

export class ComHeadView extends ExtensionClass<IView, ComHead>(ComHead) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refreshBigHead(skinId: number) {
		const headPath = $itemUtil.getItemView(skinId).icon;
		$dynamicResMgr.setLoader(this.loader_icon, headPath);
	}

	refreshSmallHead(skinId: number) {
		const headPath = $itemUtil.getItemView(skinId).icon;
		$dynamicResMgr.setLoader(this.loader_icon, headPath.replace("bighead", "smallhead"));
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
