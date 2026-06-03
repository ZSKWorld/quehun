import { SceneBase } from "../SceneBase";

export interface ISceneLoginData {

}

/** 登录逻辑场景 */
export class SceneLogin extends SceneBase<ISceneLoginData> {
	protected override getNormalResArray() {
		return [
			ResPath.EPkgPath.PkgLogin,
		];
	}

	protected override getConstResArray() {
		return [
		];
	}

	protected override onEnter() {
		return $uiMgr.openView(EViewID.UILoginView);
	}

	protected override onExit() {
		const res = fgui.UIPackage.getById(ResPath.EPkgPath.PkgEntrance);
		res && fgui.UIPackage.removePackage(ResPath.EPkgPath.PkgEntrance);
		return null;
	}
}