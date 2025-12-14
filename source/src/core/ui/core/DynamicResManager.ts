import { ConstDefine } from "../../common/ConstDefine";

/** 动态资源管理，负责引用计数和卸载 */
export class DynamicResManager implements IDynamicResManager {
    private _resMap: Map<string, number> = new Map();

    constructor() {
        Laya.timer.loop(30 * 1000, this, this.checkUnload);
    }

    add(path: string) {
        if (!path) return;
        if (!path.startsWith(ConstDefine.LangResDir)) return;
        const count = this._resMap.get(path) || 0;
        this._resMap.set(path, count + 1);
    }

    remove(path: string) {
        if (!path) return;
        if (!path.startsWith(ConstDefine.LangResDir)) return;
        const count = this._resMap.get(path);
        if (count) {
            this._resMap.set(path, count - 1);
        }
    }

    setLoader(loader: fgui.GLoader, path: string) {
        this.remove(loader.icon);
        loader.icon = path;
        this.add(path);
    }

    clearLoader(loader: fgui.GLoader) {
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
		Logger.error("清理动态资源");
    }
}
