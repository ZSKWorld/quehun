import { ProxyBase } from "../../../../mvc/model/ProxyBase";

export class LoginProxy extends ProxyBase {

    @InterestMessage(EMessageID.login)
    private login(res: IResLogin) {
        userData.loginUpdate(res);
    }
}