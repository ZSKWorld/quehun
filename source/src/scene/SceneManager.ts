import { Observer } from "../core/mvc/provider/Observer";
import { ESceneType } from "./SceneDefine";

/** 逻辑场景管理类 */
export class SceneManager extends Observer implements ISceneManager {
	private _currentType: ESceneType;
	private _sceneMap = new Map<ESceneType, IScene>();

	registerScene(type: ESceneType, sceneCls: Class<IScene>) {
		if (this._sceneMap.has(type))
			Logger.error("重复注册scene:", sceneCls, type);
		else {
			sceneCls.prototype.type = type;
			this._sceneMap.set(type, new sceneCls());
		}
	}

	registerView(type: ESceneType, view: string) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	enterScene(type: ESceneType, data?: any) {
		if (this._currentType != type) {
			const newScene = this._sceneMap.get(type);
			newScene.load().then(() => {
				const curScene = this._sceneMap.get(this._currentType);
				curScene?.exit();
				this._currentType = type;
				newScene.enter(data);
			}, () => {
				$confirmSma(0, "提示", `${ type } 场景加载失败，是否重试?`).then(result => {
					if (result) this.enterScene(type, data);
					else newScene.exit();
				});
			});
		}
	}
}