import { LoadingBgLoader } from "../core/game/LoadingBgLoader";

/** 逻辑场景管理类 */
@SingletonClass
export class SceneManager implements ISceneManager {
	private _currentType: ESceneType;
	private _sceneMap = new Map<ESceneType, IScene>();
	private _isSwitching = false;
	private _switchLockMask: fgui.GGraph;

	private get isSwitching() { return this._isSwitching; }
	private set isSwitching(v) {
		this._isSwitching = v;
		if (!this._switchLockMask) {
			const mask = this._switchLockMask = new fgui.GGraph();
			mask.visible = false;
			mask.sortingOrder = 9999;
			mask.name = "SceneManager_Mask";
			$uiMgr.addToLayer(mask, ELayer.UITop);
			mask.drawRect(0, "", EColorString._00000000);
			mask.makeFullScreen();
			mask.addRelation(mask.parent, fgui.RelationType.Size);
		}
		this._switchLockMask.visible = v;
	}

	registerScene(type: ESceneType, sceneCls: Class<IScene>) {
		if (this._sceneMap.has(type))
			Logger.error("重复注册scene:", sceneCls, type);
		else {
			sceneCls.prototype.type = type;
			this._sceneMap.set(type, new sceneCls());
		}
	}

	registerView(type: ESceneType, view: EUIViewID) {
		const scene = this._sceneMap.get(type);
		if (scene) scene.views.add(view);
	}

	async enterScene(type: ESceneType, data?: any) {
		if (this.isSwitching) return;
		if (type == this._currentType) return;

		const newScene = this._sceneMap.get(type);
		if (!newScene) return;

		this.isSwitching = true;
		await LoadingBgLoader.Inst.randomLoad();

		try {
			$facade.dispatch(EGlobalEvent.OnSceneLoadBegin, type);
			await newScene.load();
			$facade.dispatch(EGlobalEvent.OnSceneLoadEnd, type);

			$facade.dispatch(EGlobalEvent.OnSceneExitBegin, this._currentType);
			await this._sceneMap.get(this._currentType)?.exit();
			$facade.dispatch(EGlobalEvent.OnSceneExitEnd, this._currentType);

			this._currentType = type;
			$facade.dispatch(EGlobalEvent.OnSceneEnterBegin, type);
			await newScene.enter(data);
			$facade.dispatch(EGlobalEvent.OnSceneEnterEnd, type);
			
			this.isSwitching = false;
		} catch (e) {
			const retry = await $confirmSma(0, `${ type } 场景加载失败，是否重试?`, "提示");
			if (retry) {
				this.isSwitching = false;
				this.enterScene(type, data);
			} else {
				await newScene.exit();
				this.isSwitching = false;
			}
		} finally {
			LoadingBgLoader.Inst.clear();
		}
	}
}