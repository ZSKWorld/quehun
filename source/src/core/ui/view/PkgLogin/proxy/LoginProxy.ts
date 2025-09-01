import { NotifyConst } from "../../../../common/NotifyConst";
import { ProxyBase } from "../../../../mvc/model/ProxyBase";

export class LoginProxy extends ProxyBase {

    @InterestMessage(MessageID.Login)
    private login(input: ILoginInput, output: ILoginOutput) {
        facade.dispatch(NotifyConst.LoginSuccess);
        uiMgr.openView(ViewID.UIEnterGameView);
    }

    @InterestMessage(MessageID.LoginError)
    private loginError(input: ILoginInput, output: ILoginOutput) {
        facade.dispatch(NotifyConst.LoginFail);
    }

    @InterestMessage(MessageID.Register)
    private register(input: IRegisterInput, output: IRegisterOutput) {

    }
}