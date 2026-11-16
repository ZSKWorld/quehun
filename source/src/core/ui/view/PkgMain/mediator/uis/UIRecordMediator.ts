import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIRecordMsg, UIRecordView } from "../../view/uis/UIRecordView";

export class UIRecordMediator extends MediatorBase<UIRecordView, IUIRecordData> {
	private _curTag: ERecordTag = ERecordTag.All;

	override onAwake() {
		this.addEvent(EUIRecordMsg.OnTabSelectedChanged, this.onTabSelectedChanged);
		this.addEvent(EUIRecordMsg.OnListInfoScrollEnd, this.onListInfoScrollEnd);
	}

	override onEnable() {
		this._curTag = ERecordTag.None;
		this.onTabSelectedChanged(ERecordTag.All);
	}

	private onTabSelectedChanged(tag: ERecordTag) {
		if (tag == this._curTag) return;
		this._curTag = tag;
		if (tag == ERecordTag.Collect)
			$user.record.resetLoader(tag);
		this.tryToRefreshView(true);
	}

	private onListInfoScrollEnd() {
		if ($netMgr.lobbyConnected)
			$user.record.loadRecord(this._curTag);
	}

	@InjectUserEvent(EUserEvent.OnRecordChanged)
	private tryToRefreshView(resetPos: boolean = false) {
		const ids = $user.record.getRecordIds(this._curTag);
		if (ids.length == 0) $user.record.loadRecord(this._curTag);
		this.view.refresh(this._curTag, ids, resetPos);
	}
}