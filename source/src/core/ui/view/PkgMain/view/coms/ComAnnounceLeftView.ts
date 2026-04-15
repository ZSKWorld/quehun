import ComAnnounceLeft from "../../../../ui/PkgMain/ComAnnounceLeft";
import { EUIAnnounceEvent } from "../../Definition";

export const enum EComAnnounceLeftMsg {

}

export class ComAnnounceLeftView extends ExtensionClass<IView, ComAnnounceLeft>(ComAnnounceLeft) implements IView {
	private _announcements: [number, string, boolean][];

	override onCreate() {
		$uiUtil.setList(this.list_tab, true, this, this.onListTabRender, this.onListTabClick);
	}

	refresh(announcements: [number, string, boolean][], selectAnnounceId: number) {
		this._announcements = announcements;
		this.list_tab.numItems = announcements.length;

		const index = Math.max(announcements.findIndex(v => v[0] == selectAnnounceId), 0);
		this.list_tab.selectedIndex = index;
		this.onListTabClick(null, null, index);
	}

	private onListTabRender(index: number, item: fgui.GButton) {
		const data = this._announcements[index];
		item.title = data[1];
		item.iconObject.visible = !data[2];
	}

	private onListTabClick(_, __, index: number) {
		this.event(EUIAnnounceEvent.OnTabSelectChanged, index);
	}
}
