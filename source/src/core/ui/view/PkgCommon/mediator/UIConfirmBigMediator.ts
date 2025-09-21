import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIConfirmBigMsg, UIConfirmBigView } from "../view/UIConfirmBigView";

export interface UIConfirmBigData {

}

export class UIConfirmBigMediator extends MediatorBase<UIConfirmBigView, UIConfirmBigData> {

    override onAwake() {
        this.addEvent(UIConfirmBigMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(UIConfirmBigMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(UIConfirmBigMsg.OnBtnCancelClick, this.closeSelf);
    }

	private onBtnConfirmClick() {

	}

}