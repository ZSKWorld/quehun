import { LogicSceneBase } from "../SceneBase";
import { ESceneType } from "../SceneDefine";

export interface ISceneMainData {

}

/** 主页逻辑场景 */
export class SceneMain extends LogicSceneBase<ISceneMainData> {
	override readonly type = ESceneType.MainScene;
	protected override loadViewId = EViewID.UILoading4View;
	protected override getNormalResArray() {
		return [
			ResPath.EPkgPath.PkgMain,
			ResPath.EPkgPath.PkgTest,
		];
	}

	protected override onEnter() {
		this.openView(EViewID.UIMainView);
	}

}