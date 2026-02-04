import { Observer } from "../core/mvc/provider/Observer";

/** 逻辑场景管理类 */
export class SceneManager extends Observer implements ISceneManager {
	private _currentType: ESceneType;
	private _sceneMap = new Map<ESceneType, IScene>();
	private _isTransitioning = false;

	registerScene(type: ESceneType, sceneCls: Class<IScene>) {
		if (this._sceneMap.has(type))
			Logger.error("重复注册scene:", sceneCls, type);
		else {
			sceneCls.prototype.type = type;
			this._sceneMap.set(type, new sceneCls());
		}
	}

	registerView(type: ESceneType, view: EViewID) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	async enterScene(type: ESceneType, data?: any) {
		if (this._isTransitioning) return;
		if (type == this._currentType) return;

		const newScene = this._sceneMap.get(type);
		if (!newScene) return;

		this._isTransitioning = true;

		try {
			await newScene.load();

			const curScene = this._sceneMap.get(this._currentType);
			curScene?.exit();

			this._currentType = type;
			newScene.enter(data);

		} catch (e) {
			const retry = await $confirmSma(0, `${ type } 场景加载失败，是否重试?`, "提示");
			if (retry) {
				this._isTransitioning = false;
				return this.enterScene(type, data);
			} else
				newScene.exit();
		} finally {
			this._isTransitioning = false;
		}
	}
}