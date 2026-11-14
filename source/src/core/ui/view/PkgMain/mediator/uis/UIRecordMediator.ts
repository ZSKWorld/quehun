import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIRecordMsg, UIRecordView } from "../../view/uis/UIRecordView";

export class UIRecordMediator extends MediatorBase<UIRecordView, IUIRecordData> {

	override onAwake() {
		this.addEvent(EUIRecordMsg.OnListInfoScrollEnd, this.onListInfoScrollEnd);
	}

	private onListInfoScrollEnd() {

	}

}