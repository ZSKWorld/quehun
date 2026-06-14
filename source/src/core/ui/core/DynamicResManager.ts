/** 动态资源管理，负责引用计数和卸载 */
@SingletonClass
export class DynamicResManager implements IDynamicResManager {
	private _resMap: Map<string, number> = new Map();

	constructor() {
		Laya.timer.loop(30 * 1000, this, this.checkUnload);
	}

	add(path: string) {
		if (!path) return;
		const count = this._resMap.get(path) || 0;
		this._resMap.set(path, count + 1);
	}

	remove(path: string) {
		if (!path) return;
		const count = this._resMap.get(path);
		if (count) {
			this._resMap.set(path, count - 1);
		}
	}

	setLoader(loader: fgui.GLoader, path: string) {
		if (!loader) return;
		path = path || "";
		this.remove(loader.icon);
		loader.icon = "";
		loader.icon = path;
		this.add(path);
	}

	setLoaders(loaders: fgui.GLoader[], pathes: string[]) {
		loaders.forEach((loader, index) => {
			this.setLoader(loader, pathes[index]);
		});
	}

	clearLoader(loader: fgui.GLoader) {
		if (!loader) return;
		this.remove(loader.icon);
		loader.icon = "";
	}

	clearLoaders(...loaders: fgui.GLoader[]) {
		loaders.forEach(v => this.clearLoader(v));
	}

	private checkUnload() {
		this._resMap.forEach((count, path) => {
			if (count <= 0) {
				$loadMgr.cancelLoadByUrl(path);
				$loadMgr.clearRes(path);
				this._resMap.delete(path);
			}
		});
	}
}
