import UIRegister from "../../../ui/PkgLogin/UIRegister";

export const enum UIRegisterMsg {
	OnBtnCloseClick = "UIRegister_OnBtnCloseClick",
	OnBtnBackClick = "UIRegister_OnBtnBackClick",
	OnBtnAgreementClick = "UIRegister_OnBtnAgreementClick",
	OnTxtProcotolLink = "UIRegister_OnTxtProcotolLink",
}

export class UIRegisterView extends ExtensionClass<IView, UIRegister>(UIRegister) implements IView {

	override onCreate() {
        const { btn_close, btn_back, btn_agreement, txt_protocol} = this;
		btn_close.onClick(this, this.sendEvent, [UIRegisterMsg.OnBtnCloseClick]);
		btn_back.onClick(this, this.sendEvent, [UIRegisterMsg.OnBtnBackClick]);
		btn_agreement.onClick(this, this.sendEvent, [UIRegisterMsg.OnBtnAgreementClick]);
		txt_protocol.on(Laya.Event.LINK, this, this.sendEvent, [UIRegisterMsg.OnTxtProcotolLink]);
    }

}
