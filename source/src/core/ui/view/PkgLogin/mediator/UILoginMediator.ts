import { LocalData, LocalDataKey } from "../../../../common/LocalData";
import { NotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UILoginMsg, UILoginView } from "../view/UILoginView";

export interface UILoginData {

}

export class UILoginMediator extends MediatorBase<UILoginView, UILoginData> {

    override onAwake() {
        this.addEvent(UILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
        this.addEvent(UILoginMsg.OnBtnToRegisterClick, this.onBtnToRegisterClick);
    }

    override onEnable() {
        const autoLogin = LocalData.get<boolean>(LocalDataKey.AutoLogin);
        const remeber = !!LocalData.get<boolean>(LocalDataKey.LoginRemeber);
        const data = remeber ? LocalData.get<ILoginInput>(LocalDataKey.LastLoginAccount) : null;
        this.view.refreshLoginInfo(data?.account, data?.password, remeber);
        autoLogin && data && this.login(data);
    }

    private login(data: ILoginInput) {
        this.view.refreshLoginInfo(data?.account, data?.password, this.view.btn_remeber.selected);
        this.onBtnLoginClick();
    }

    private onBtnLoginClick() {
        const { input_account, input_password, btn_remeber } = this.view;
        if (!input_account.text.trim()) tipMgr.showTip("请输入账号");
        else if (!input_password.text.trim()) tipMgr.showTip("请输入密码");
        else {
            LocalData.set(LocalDataKey.AutoLogin, true);
            LocalData.set(LocalDataKey.LoginRemeber, btn_remeber.selected);
            const param = { account: input_account.text, password: input_password.text };
            if (btn_remeber.selected)
                LocalData.set(LocalDataKey.LastLoginAccount, param);
            else {
                
                LocalData.remove(LocalDataKey.LastLoginAccount);
            }
            this.closeSelf();
            this.openView(ViewID.UILoginWaittingView, param);

        }
    }

    private onBtnToRegisterClick() {
        this.openView(ViewID.UIRegisterView);
    }
}