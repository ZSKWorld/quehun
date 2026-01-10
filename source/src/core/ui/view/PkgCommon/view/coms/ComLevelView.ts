import ComLevel from "../../../../ui/PkgCommon/ComLevel";

export const enum EComLevelMsg {

}

export class ComLevelView extends ExtensionClass<IView, ComLevel>(ComLevel) implements IView {

	override onCreate() {

	}

	refresh(data: IAccountLevel) {
		const { ctrl_ht, ctrl_star, loader_icon, txt_htLevel } = this;
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, loader_icon, txt_htLevel }, data);
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
