import { SpineController } from "./SpineController";

export class SpineManager implements ISpineManager {
    private _templetMap = new Map<string, Laya.SpineTemplet>();
    private _spinePool = new Map<number, ISpineController[]>();
    load(ids: number[], progress?: Laya.Handler) {
        if (!ids) {
            if (progress) progress.runWith(1);
            return Promise.resolve<Laya.SpineTemplet[][]>(null);
        }
        const loadUrls: string[] = [];
        const templetMap = this._templetMap;
        ids.forEach(v => {
            const urls = this.getSpineUrls(v);
            if (!urls.length) return;
            for (let i = 0; i < urls.length; i++) {
                if (templetMap.get(urls[i])) continue;
                loadUrls.push(urls[i]);
            }
        });
        if (!loadUrls.length) {
            if (progress) progress.runWith(1);
            const templets = ids.map(v => {
                const urls = this.getSpineUrls(v);
                if (!urls.length) return null;
                return urls.map(v1 => templetMap.get(v1));
            });
            return Promise.resolve<Laya.SpineTemplet[][]>(templets);
        }
        const promise = $loadMgr.load<Laya.SpineTemplet, string[]>(loadUrls, null, progress, Laya.Loader.SPINE).then(data => {
            data.forEach(v => templetMap.set(v.url, v));
            return ids.map(v => {
                const urls = this.getSpineUrls(v);
                if (!urls.length) return null;
                return urls.map(v1 => templetMap.get(v1));
            });
        });
        return promise;
    }
    create(id: number, parent?: fgui.GComponent) {
        let spine: ISpineController;
        const skeletonPool = this._spinePool.get(id);
        if (skeletonPool && skeletonPool.length) {
            spine = skeletonPool.pop();
        }
        else {
            const templetMap = this._templetMap;
            const urls = this.getSpineUrls(id);
            if (urls.length && urls.every(v => !!templetMap.get(v))) {
                const sp = new fgui.GComponent();
                for (let i = 0; i < urls.length; i++) {
                    const child = sp.addChild(new fgui.GObject());
                    const spineNode = child.addComponent(Laya.Spine2DRenderNode);
                    spineNode.useFastRender = false;
                    spineNode.source = urls[i];
                }
                const spineCtrl = sp.addComponent(SpineController);
                spineCtrl.init(id);
                parent && parent.addChild(sp);
                spine = spineCtrl;
            }
        }
        spine && spine.play("idle", true);
        return spine;
    }
    recover(spine: ISpineController) {
        if (!spine) return;
        const id = spine.spineId;
        const poolArr = this._spinePool.get(id);
        if (poolArr && poolArr.includes(spine)) return;
        spine.gowner.removeFromParent();
        if (poolArr) poolArr.push(spine);
        else this._spinePool.set(id, [spine]);
    }
    clear(id: number) {
        const poolArr = this._spinePool.get(id);
        if (!poolArr) return;
        poolArr.forEach(v => v.gowner.dispose());
        poolArr.length = 0;
    }
    dispose(id: number) {
        this.clear(id);
        const urls = this.getSpineUrls(id);
        if (!urls.length) return;
        for (let i = 0; i < urls.length; i++) {
            const templet = this._templetMap.get(urls[i]);
            if (!templet) continue;
            Laya.timer.frameOnce(0, this, () => templet.destroy());
            this._templetMap.delete(urls[i]);
        }
    }

    private getSpineUrls(v: number) {
        const urls: string[] = [];
        const t1 = $cfgMgr.spot.skin_spot[v] || $cfgMgr.item_definition.skin[v];
        if (!t1) return urls;
        const t2 = $cfgMgr.character.skin[v];
        const layer = t2 ? t2.spine_layers : 1;
        if (layer == 1) urls.push(t1.path + "/spine/spine.skel");
        else {
            for (let i = 0; i < layer; i++) {
                urls.push($langRes(t1.path + "/spine/spine_" + i + ".skel"));
            }
        }
        return urls;
    }
}