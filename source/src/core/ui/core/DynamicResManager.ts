/** 动态资源管理，负责引用计数和卸载 */
export class DynamicResManager extends Singleton<DynamicResManager>() implements IDynamicResManager {
	private _resMap: Map<string, number> = new Map();

	protected constructor() {
		super();
		Laya.timer.loop(30 * 1000, this, this.checkUnload);
	}

	add(path: string) {
		if (!path) return;
		if (!path.startsWith(EConstDefine.LangResDir)) return;
		const count = this._resMap.get(path) || 0;
		this._resMap.set(path, count + 1);
	}

	remove(path: string) {
		if (!path) return;
		if (!path.startsWith(EConstDefine.LangResDir)) return;
		const count = this._resMap.get(path);
		if (count) {
			this._resMap.set(path, count - 1);
		}
	}

	setLoader(loader: fgui.GLoader, path: string) {
		if (!loader) return;
		this.remove(loader.icon);
		loader.icon = "";
		loader.icon = path;
		this.add(path);
	}

	clearLoader(loader: fgui.GLoader) {
		if (!loader) return;
		this.remove(loader.icon);
		loader.icon = "";
	}

	private checkUnload() {
		this._resMap.forEach((count, path) => {
			if (count <= 0) {
				Laya.loader.cancelLoadByUrl(path);
				Laya.loader.clearRes(path);
				this._resMap.delete(path);
			}
		});
	}
}
