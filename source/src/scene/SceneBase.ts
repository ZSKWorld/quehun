import { ENotifyConst } from "../core/common/NotifyConst";
import { LoadingBgLoader } from "../core/game/LoadingBgLoader";
import { Observer } from "../core/mvc/provider/Observer";
import { ESceneType } from "./SceneDefine";

const enum EResGroupType {
	Normal,
	Const,
	All,
}

/** 资源组结构定义 */
interface IResGroup {
	ui: string[];
	skeleton: string[];
	others: string[];
}

/** 逻辑场景基类 */
export abstract class SceneBase<T> extends Observer implements IScene<T> {
	readonly type: ESceneType;
	data: T;
	readonly views = new Set<EViewID>();
	/** 加载时显示的load页面id */
	protected loadViewId: EViewID;
	/** 资源加载进度更新回调 */
	private _progressHandlers: Laya.Handler[] = [];
	/** 资源加载进度 */
	private _progresses: number[] = [];

	async load() {
		try {
			this.dispatch(ENotifyConst.OnSceneLoadBegin, this.type);

			await LoadingBgLoader.Inst.randomLoad();

			this.initLoadingTrackers();

			const resGroup = this.getResGroup(EResGroupType.All);
			const tasks: Promise<any>[] = [
				$loadMgr.loadPackage(resGroup.ui, this._progressHandlers[0]),
				$skeletonMgr.load(resGroup.skeleton, this._progressHandlers[1]),
				$loadMgr.load(resGroup.others, null, this._progressHandlers[2]),
			];

			if (this.loadViewId) {
				$uiMgr.openView(this.loadViewId);
				//加个最短时间，避免一闪而过
				tasks.push(new Promise(resolve => {
					Laya.Tween.create(this._progresses).duration(500).to("3", 1).onUpdate(tweener => {
						this._progressHandlers[3].runWith(tweener.value.getAt(0));
					}).then(tweener => {
						tweener.owner.recover();
						resolve(null);
					});
				}));
			}

			await Promise.all(tasks);
			await $timeUtil.wait(250);
		} catch (e) {
			throw e;
		} finally {
			this._progressHandlers.forEach(v => v.recover());
			this._progressHandlers.length = 0;
			this._progresses.length = 0;
			this.dispatch(ENotifyConst.OnSceneLoadEnd, this.type);
			$uiMgr.closeAllView();
			LoadingBgLoader.Inst.clear();
		}
	}

	enter(data: T) {
		this.data = data;
		this.onEnter();
		this.dispatch(ENotifyConst.OnEnterScene, this.type);
	}

	exit() {
		this.views.forEach(v => $uiMgr.destroyView(v));
		this.clearRes(EResGroupType.Normal);
		this.onExit();
		this.dispatch(ENotifyConst.OnExitScene, this.type);
	}

	/** 可卸载资源，场景退出时卸载 */
	protected getNormalResArray() { return [] as string[]; }

	/** 不可卸载资源，加载后不会卸载，只能手动卸载 */
	protected getConstResArray() { return [] as string[]; }

	protected onEnter() { }

	protected onExit() { }

	private initLoadingTrackers() {
		const count = this.loadViewId ? 4 : 3;
		for (let i = 0; i < count; i++) {
			this._progresses.push(0);
			this._progressHandlers.push(Laya.Handler.create(this, this.updateProgress, [i], false));
		}
		this.updateProgress(0, 0);
	}

	private updateProgress(index: number, progress: number) {
		const _progresses = this._progresses;
		progress != null && (_progresses[index] = progress);
		const totalProgress = _progresses.reduce((sum, cur) => sum + cur, 0);
		const average = totalProgress / _progresses.length;
		this.dispatch(ENotifyConst.OnSceneLoadProgress, average);
	}

	/** 获取资源数组 */
	private getResGroup(groupType: EResGroupType): IResGroup {
		const result: IResGroup = { ui: [], skeleton: [], others: [] };
		let source: string[];

		switch (groupType) {
			case EResGroupType.Normal: source = this.getNormalResArray(); break;
			case EResGroupType.Const: source = this.getConstResArray(); break;
			case EResGroupType.All: source = this.getNormalResArray().concat(this.getConstResArray()); break;
			default: return result;
		}

		source.forEach(res => {
			if (res.startsWith("res/ui/")) result.ui.push(res);
			else if (res.endsWith(".sk")) result.skeleton.push(res);
			else result.others.push(res);
		});
		return result;
	}

	/**
	 * 清理场景资源
	 * @param type 要清理的资源类型
	 */
	private clearRes(type: EResGroupType) {
		const resGroup = this.getResGroup(type);
		resGroup.ui.forEach(v => {
			const res = fgui.UIPackage.getById(v);
			res && fgui.UIPackage.removePackage(v);
		});
		resGroup.skeleton.forEach(v => $skeletonMgr.dispose(v));
		resGroup.others.forEach(v => Laya.loader.clearRes(v));
	}
}