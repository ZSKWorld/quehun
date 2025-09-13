import { NotifyConst } from "../../../../common/NotifyConst";
import { ProxyBase } from "../../../../mvc/model/ProxyBase";

export class LoginProxy extends ProxyBase {

    private login(input: ILoginInput, output: ILoginOutput) {
        facade.dispatch(NotifyConst.LoginSuccess);
        uiMgr.openView(ViewID.UIEnterGameView);
    }

    private loginError(input: ILoginInput, output: ILoginOutput) {
        facade.dispatch(NotifyConst.LoginFail);
    }

    private register(input: IRegisterInput, output: IRegisterOutput) {

    }
}