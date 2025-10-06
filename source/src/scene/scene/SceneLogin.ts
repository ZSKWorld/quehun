import { LogicSceneBase } from "../SceneBase";

export interface ISceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends LogicSceneBase<ISceneLoginData> {
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

    protected override onExit() {
        const res = fgui.UIPackage.getById(ResPath.EPkgPath.PkgEntrance);
        res && fgui.UIPackage.removePackage(ResPath.EPkgPath.PkgEntrance);
    }
}