import ComLevel1 from "../../../../ui/PkgCommon/ComLevel1";

export const enum EComLevel1Msg {

}

export class ComLevel1View extends ExtensionClass<IView, ComLevel1>(ComLevel1) implements IView {

	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refresh(data: IAccountLevel) {
		const { ctrl_ht, ctrl_star, loader_icon, txt_htLevel, txt_htScore } = this;
		$uiUtil.refreshLevel({ ctrl_ht, ctrl_star, loader_icon, txt_htLevel, txt_htScore }, data);
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
