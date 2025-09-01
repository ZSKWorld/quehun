import { Observer } from "../core/mvc/provider/Observer";
import { SceneType } from "./SceneDefine";

/** 逻辑场景管理类 */
export class SceneManager extends Observer implements ISceneManager {
	private _currentType: SceneType;
	private _sceneMap: Map<SceneType, IScene>;

	init(sceneMap: IScene[]) {
		if (!this._sceneMap) this._sceneMap = new Map();
		sceneMap.forEach(v => this._sceneMap.set(v.type, v));
	}

	registerSceneView(type: SceneType, view: string) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	enterScene(type: SceneType, data?: any) {
		if (this._currentType != type) {
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				const curScene = this._sceneMap.get(this._currentType);
				curScene?.exit();
				this._currentType = type;
				newScene.enter(data);
			}, () => {
				$confirm("提示", `${ type } 场景加载失败，是否重试?`).then(result => {
					if (result) this.enterScene(type, data);
					else newScene.exit();
				});
			});
		}
	}
}