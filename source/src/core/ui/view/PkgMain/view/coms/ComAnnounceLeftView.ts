import ComAnnounceLeft from "../../../../ui/PkgMain/ComAnnounceLeft";
import { EUIAnnounceEvent } from "../../Definition";

export const enum EComAnnounceLeftMsg {

}

export class ComAnnounceLeftView extends ExtensionClass<IView, ComAnnounceLeft>(ComAnnounceLeft) implements IView {
	private _data: [string, boolean][];

	override onCreate() {
		$uiUtil.setList(this.list_tab, true, this, this.onListTabRender, this.onListTabClick);
	}

	refresh(data: [string, boolean][], index:number) {
		this._data = data;
		this.list_tab.numItems = data.length;
		this.list_tab.selectedIndex = index;
		this.onListTabClick(null, null, index);
	}

	private onListTabRender(index: number, item: fgui.GButton) {
		item.title = this._data[index][0];
		item.getChild("icon").visible = !this._data[index][1];
	}

	private onListTabClick(_, __, index: number) {
		this.event(EUIAnnounceEvent.OnTabSelectChanged, index);
	}
}
