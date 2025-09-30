import { ProxyBase } from "../../../../mvc/model/ProxyBase";

export class LoginProxy extends ProxyBase {

    @InterestMessage(EMessageID.login)
    private login(res: IResLogin) {
        this.checkError({ error: { code: 156 } });
    }

    @InterestMessage(EMessageID.oauth2Signup)
    private oauth2Signup(res: IResOauth2Signup) {

    }

    @InterestMessage(EMessageID.oauth2Check)
    private oauth2Check(res: IResOauth2Check) {

    }

    @InterestMessage(EMessageID.oauth2Login)
    private oauth2Login(res: IResLogin) {

    }
}