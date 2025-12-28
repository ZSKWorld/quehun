import ComLevel from "../../../../ui/PkgCommon/ComLevel";

export const enum EComLevelMsg {

}

export class ComLevelView extends ExtensionClass<IView, ComLevel>(ComLevel) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refresh(data: IAccountLevel) {
		const { ctrl_ht, ctrl_star, loader_icon, txt_htLevel } = this;
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, loader_icon, txt_htLevel }, data);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
