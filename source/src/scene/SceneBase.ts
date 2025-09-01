import { Observer } from "../core/mvc/provider/Observer";
import { SceneEvent, SceneType } from "./SceneDefine";

const enum ResGroupType {
	Normal,
	Const,
	All,
}

/** 逻辑场景基类 */
export abstract class LogicSceneBase<T> extends Observer implements IScene<T> {
	readonly type: SceneType;
	data: T;
	readonly views = new Set<ViewID>();
	/** 加载时显示的load页面id */
	protected loadViewId: ViewID;
	/** 资源加载进度更新回调 */
	private _progressHandlers: Laya.Handler[] = [];
	/** 资源加载进度 */
	private _progresses: number[] = [];

	load() {
		this.dispatch(SceneEvent.OnLoadBegin, this.type);
		const resArr = this.getResGroup(ResGroupType.All);
		const [uiRes, skeletonRes, otherRes] = resArr;
		let loadCnt = this.setLoadProgres(resArr.length);
		return Promise.all([
			loadMgr.loadPackage(uiRes, this._progressHandlers[--loadCnt]),
			skeletonMgr.load(skeletonRes, this._progressHandlers[--loadCnt]),
			loadMgr.load(otherRes, null, this._progressHandlers[--loadCnt]),
			//加个最短加载时间，避免loading页一闪而过
			this.loadViewId ? new Promise(resolve => {
				const prop = --loadCnt;
				const handler = this._progressHandlers[prop];
				Laya.Tween.create(this._progresses).duration(500).to(prop.toString(), 1).onUpdate(tweener => {
					handler.runWith(tweener.value.getAt(0));
				}).then(tweener => {
					tweener.owner.recover();
					resolve(null);
				});
			}) : null,
		]).then(
			() => {
				uiMgr.closeAllView();
			},
			() => {
				return Promise.reject<void>();
			}
		).finally(() => {
			Laya.Tween.killAll(this);
			this._progressHandlers.forEach(v => v.recover());
			this._progressHandlers.length = 0;
			this.dispatch(SceneEvent.OnLoadEnd, this.type);
		});
	}

	enter(data: T) {
		this.data = data;
		this.onEnter();
		this.dispatch(SceneEvent.OnEnterScene, this.type);
	}

	exit() {
		this.onExit();
		if (this.loadViewId) {
			uiMgr.closeView(this.loadViewId);
		}
		this.views.forEach(v => uiMgr.destroyView(v));
		this.clearRes(ResGroupType.Normal);
		this.dispatch(SceneEvent.OnExitScene, this.type);
	}

	protected openView(viewId: ViewID, data?: any) {
		return uiMgr.openView(viewId, data);
	}

	/**
	 * 清理场景资源
	 * @param type 要清理的资源类型
	 */
	protected clearRes(type: ResGroupType) {
		const [uiRes, skeletonRes, otherRes] = this.getResGroup(type);
		uiRes.forEach(v => {
			const res = fgui.UIPackage.getById(v);
			res && res.unloadAssets();
		});
		skeletonRes.forEach(v => skeletonMgr.dispose(v));
		otherRes.forEach(v => Laya.loader.clearRes(v));
	}

	/** 可卸载资源，场景退出时卸载 */
	protected getNormalResArray() { return [] as string[]; }

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray() { return [] as string[]; }

	protected onEnter() { }

	protected onExit() { }

	private setLoadProgres(count: number) {
		if (this.loadViewId) {
			count++;
			this.openView(this.loadViewId);
		}
		this._progresses.length = 0;
		this._progressHandlers.forEach(v => v.recover());
		this._progressHandlers.length = 0;
		for (let i = 0; i < count; i++) {
			this._progresses.push(0);
			this._progressHandlers.push(Laya.Handler.create(this, this.onProgress, [i], false));
		}
		this.onProgress(0, 0);
		return count;
	}

	private onProgress(index: number, progress: number) {
		const _progresses = this._progresses;
		progress != null && (_progresses[index] = progress);
		let loadPro = _progresses.reduce((pv, cv, i) => pv + cv, 0);
		if (this.loadViewId) loadPro *= _progresses[0] / (_progresses.length - 1);
		else loadPro /= _progresses.length;
		this.dispatch(SceneEvent.OnLoadProgress, loadPro);
	}

	/** 获取资源数组 */
	private getResGroup(groupType: ResGroupType): [string[], string[], string[]] {
		const uiRes: string[] = [];
		const skeletonRes: string[] = [];
		const otherRes: string[] = [];
		let resArr: string[];
		switch (groupType) {
			case ResGroupType.Normal: resArr = this.getNormalResArray(); break;
			case ResGroupType.Const: resArr = this.getConstResArray(); break;
			case ResGroupType.All: resArr = this.getNormalResArray().concat(this.getConstResArray()); break;
			default: return [[], [], []];
		}
		resArr.forEach(res => {
			if (res.startsWith("res/ui/")) uiRes.push(res);
			else if (res.endsWith(".sk")) skeletonRes.push(res);
			else otherRes.push(res);
		});
		return [uiRes, skeletonRes, otherRes];
	}
}