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
			ResPath.EFontPath.HYWH,
			ResPath.EFontPath.Fengyu,
			ResPath.EFontPath.HYYANKAIW,
			ResPath.EPkgPath.PkgCommon,
		];
	}

	protected override onEnter() {
		$uiMgr.openView(EViewID.UILoginView);
	}

	protected override onExit() {
		const res = fgui.UIPackage.getById(ResPath.EPkgPath.PkgEntrance);
		res && fgui.UIPackage.removePackage(ResPath.EPkgPath.PkgEntrance);
	}
}