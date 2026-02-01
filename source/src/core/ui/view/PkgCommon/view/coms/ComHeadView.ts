import ComHead from "../../../../ui/PkgCommon/ComHead";

export const enum EComBigHeadMsg {

}

export class ComHeadView extends ExtensionClass<IView, ComHead>(ComHead) implements IView {

	override onCreate() {

	}

	refreshFull(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.full);
	}

	refreshHalf(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.half);
	}

	refreshBigHead(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.bighead);
	}

	refreshSmallHead(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.smallhead);
	}

	refreshSmallHead1(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.smallhead1);
	}

	refreshSmallHead2(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.smallhead2);
	}

	refreshSmallHead3(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.smallhead3);
	}

	refreshX(skinId: number) {
		this.refresh($itemUtil.getItemInfo(skinId).skinInfo.x);
	}

	private refresh(skinPath: string) {
		$dynamicResMgr.setLoader(this.loader_icon, skinPath);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
