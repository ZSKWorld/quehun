import ComHead from "../../../../ui/PkgCommon/ComHead";

export const enum EComBigHeadMsg {

}

export class ComHeadView extends ExtendClass<IView, ComHead>(ComHead) implements IView {

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

	override onEnable() {
		Laya.timer.clear(this, this.clearLoader);
	}

	override onDisable() {
		Laya.timer.frameOnce(1, this, this.clearLoader);
	}

	private clearLoader() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}

	private refresh(skinPath: string) {
		$dynamicResMgr.setLoader(this.loader_icon, skinPath);
	}
}
