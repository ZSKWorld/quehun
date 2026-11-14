import ComAnnounceLeft from "../../../../ui/PkgMain/ComAnnounceLeft";
import { EUIAnnounceEvent } from "../../Definition";

export const enum EComAnnounceLeftMsg {

}

export class ComAnnounceLeftView extends ComAnnounceLeft {
	private _announcements: [number, string, boolean][];

	override onCreate() {
		$uiUtil.initList<fgui.GButton>(
			this.list_tab, true, this,
			(index, item) => {
				const data = this._announcements[index];
				item.title = data[1];
				item.iconObject.visible = !data[2];
			},
			(item, e, index) => {
				this.event(EUIAnnounceEvent.OnTabSelectChanged, index);
			}
		);
	}

	refresh(announcements: [number, string, boolean][], selectAnnounceId: number) {
		this._announcements = announcements;
		this.list_tab.numItems = announcements.length;

		const index = Math.max(announcements.findIndex(v => v[0] == selectAnnounceId), 0);
		this.list_tab.selectedIndex = index;
		this.event(EUIAnnounceEvent.OnTabSelectChanged, index);
	}
}
