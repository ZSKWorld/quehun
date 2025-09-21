import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIConfirmMiddleMsg, UIConfirmMiddleView } from "../view/UIConfirmMiddleView";

export interface UIConfirmMiddleData {

}

export class UIConfirmMiddleMediator extends MediatorBase<UIConfirmMiddleView, UIConfirmMiddleData> {

    override onAwake() {
        this.addEvent(UIConfirmMiddleMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(UIConfirmMiddleMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
		this.addEvent(UIConfirmMiddleMsg.OnBtnCancelClick, this.closeSelf);
    }

	private onBtnConfirmClick() {

	}

}