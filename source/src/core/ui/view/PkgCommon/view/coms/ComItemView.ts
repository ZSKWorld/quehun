import ComItem from "../../../../ui/PkgCommon/ComItem";

export const enum EComItemMsg {

}

export class ComItemView extends ExtensionClass<IView, ComItem>(ComItem) implements IView {
	override onCreate() {
		this.displayObject.onDisable = this.onDisable.bind(this);
	}

	refresh(id: number) {
		const cfgItem = $cfgMgr.item_definition.item[id];
		$dynamicResMgr.setLoader(this.loader_icon, $langRes(cfgItem.icon));
	}

	private onDisable() {
		$dynamicResMgr.clearLoader(this.loader_icon);
	}
}
