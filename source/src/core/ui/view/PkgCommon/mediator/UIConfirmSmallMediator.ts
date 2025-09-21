import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIConfirmSmallMsg, UIConfirmSmallView } from "../view/UIConfirmSmallView";

export interface UIConfirmSmallData {

}

export class UIConfirmSmallMediator extends MediatorBase<UIConfirmSmallView, UIConfirmSmallData> {

    override onAwake() {
        this.addEvent(UIConfirmSmallMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(UIConfirmSmallMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(UIConfirmSmallMsg.OnBtnCancelClick, this.closeSelf);
    }

	private onBtnConfirmClick() {

	}

}