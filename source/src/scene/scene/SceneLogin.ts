import { ErrorCode } from "../../core/net/enum/ErrorCode";
import { SocketEvent } from "../../core/net/WebSocket";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends LogicSceneBase<SceneLoginData> {
	override readonly type = SceneType.LoginScene;
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgLogin,
		];
	}

	protected override getConstResArray() {
		return [
			ResPath.FontPath.HYWH,
			ResPath.PkgPath.PkgCommon,
		];
	}

	protected override onEnter() {
		this.openView(ViewID.UILoginView);
	}

    @InterestNotify(SocketEvent.ConnectSuccess, false, [true, SocketEvent.ConnectSuccess])
    @InterestNotify(SocketEvent.ReconnectSuccess, false, [true, SocketEvent.ReconnectSuccess])
    @InterestNotify(SocketEvent.Close, false, [false, SocketEvent.Close])
    private socketConnectChanged(open: boolean, eventName: string) {
        if (open) {
            uiMgr.closeView(ViewID.UIWaitingView);
            if (eventName == SocketEvent.ReconnectSuccess && userData.account.account)
                netService.login({ account: userData.account.account, password: userData.account.password });
        }
        else this.openView(ViewID.UIWaitingView, "网络已断开");
    }

    @InterestNotify(SocketEvent.MsgError)
    private netMsgError(msg: IUserOutput) {
        // tipMgr.showTip(cfgMgr.Error[msg.error].text);
        // if (msg.error == ErrorCode.NOT_LOGIN)
        //     sceneMgr.enterScene(SceneType.LoginScene);
    }
}