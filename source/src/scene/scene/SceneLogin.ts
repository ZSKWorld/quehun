import { LogicSceneBase } from "../SceneBase";
import { ESceneType } from "../SceneDefine";

export interface ISceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends LogicSceneBase<ISceneLoginData> {
    override readonly type = ESceneType.LoginScene;
    protected override getNormalResArray() {
        return [
            ResPath.EPkgPath.PkgLogin,
        ];
    }

    protected override getConstResArray() {
        return [
            ResPath.EFontPath.HYWH,
            ResPath.EPkgPath.PkgCommon,
        ];
    }

    protected override onEnter() {
        this.openView(EViewID.UILoginView);
    }
}