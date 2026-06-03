import { SceneBase } from "../SceneBase";

export interface ISceneMainData {

}

/** 主页逻辑场景 */
export class SceneMain extends SceneBase<ISceneMainData> {
	protected override loadViewId: EUIViewID = EViewID.UILoadingView;
	protected override getNormalResArray() {
		return [
			ResPath.EPkgPath.PkgMain,
		];
	}

	protected override onEnter() {
		$uiMgr.openView(EViewID.UIMainView);
	}

}