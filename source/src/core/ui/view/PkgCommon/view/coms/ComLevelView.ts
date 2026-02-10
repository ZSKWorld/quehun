import ComLevel from "../../../../ui/PkgCommon/ComLevel";

export const enum EComLevelMsg {

}

export class ComLevelView extends ExtensionClass<IView, ComLevel>(ComLevel) implements IView {

	refresh(data: IAccountLevel) {
		const { ctrl_ht, ctrl_star, loader_icon, txt_htLevel } = this;
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, loader_icon, txt_htLevel }, data);
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
