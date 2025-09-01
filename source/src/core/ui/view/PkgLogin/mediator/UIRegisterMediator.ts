import { NotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIRegisterMsg, UIRegisterView } from "../view/UIRegisterView";

export interface UIRegisterData {

}

export class UIRegisterMediator extends MediatorBase<UIRegisterView, UIRegisterData> {

    override onAwake() {
        this.addEvent(UIRegisterMsg.OnBtnCloseClick, this.closeSelf);
        this.addEvent(UIRegisterMsg.OnBtnBackClick, this.closeSelf);
        this.addEvent(UIRegisterMsg.OnBtnAgreementClick, this.onBtnAgreementClick);
        this.addEvent(UIRegisterMsg.OnTxtProcotolLink, this.onTxtProcotolLink);
    }

    private onBtnAgreementClick() {

    }

    private onTxtProcotolLink(type: string) {
    }

}