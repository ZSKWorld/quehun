import { SocketEvent } from "../../core/net/WebSocket";
import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface ISceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends LogicSceneBase<ISceneLoginData> {
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
}