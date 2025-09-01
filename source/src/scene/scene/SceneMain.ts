import { LogicSceneBase } from "../SceneBase";
import { SceneType } from "../SceneDefine";

export interface SceneMainData {

}

/** 主页逻辑场景 */
export class SceneMain extends LogicSceneBase<SceneMainData> {
	override readonly type = SceneType.MainScene;
	protected override loadViewId = ViewID.UILoading4View;
	protected override getNormalResArray() {
		return [
			ResPath.PkgPath.PkgMain,
			ResPath.PkgPath.PkgTest,
		];
	}

	protected override onEnter() {
		this.openView(ViewID.UIMainView);
	}

}