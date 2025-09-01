export class SkeletonManager implements ISkeletonManager {
    /** 动画模板 */
    private _templetMap = new Map<string, Laya.Templet>();
    /** 动画对象池 */
    private _skeletonPool = new Map<string, Laya.Skeleton[]>();

    load(url: string[], progress?: Laya.Handler) {
        if (!url) {
            if (progress) progress.runWith(1);
            return Promise.resolve<Laya.Templet[]>(null);
        }
        if (!url.length) {
            if (progress) progress.runWith(1);
            return Promise.resolve<Laya.Templet[]>([]);
        }
        const loadUrl = url.filter(v => !this._templetMap.get(v));
        const promise = loadMgr.load<Laya.Templet, string[]>(loadUrl, null, progress).then(data => {
            data.forEach(v => this._templetMap[v.url] = v);
            return url.map(v => this._templetMap.get(v));
        });
        return promise;
    }

    create(url: string, aniMode: 0 | 1 | 2 = 0) {
        let ske: Laya.Skeleton;
        const templet = this._templetMap.get(url);
        const skeletonPool = this._skeletonPool.get(url);
        if (skeletonPool && skeletonPool.length) {
            ske = skeletonPool.pop();
            ske.aniMode = aniMode;
            ske.templet = templet;
        }
        else {
            if (templet) {
                ske = templet.buildArmature(aniMode);
            }
        }
        return ske;
    }

    recover(skeleton: Laya.Skeleton) {
        if (!skeleton) return;
        const url = skeleton.templet.url;
        const poolArr = this._skeletonPool.get(url);
        if (poolArr && poolArr.includes(skeleton)) return;
        skeleton.removeSelf();
        if (poolArr) poolArr.push(skeleton);
        else this._skeletonPool.set(url, [skeleton]);
    }

    clear(url: string) {
        const poolArr = this._skeletonPool.get(url);
        if (!poolArr) return;
        poolArr.forEach(v => v.destroy());
        poolArr.length = 0;
    }

    dispose(url: string) {
        this.clear(url);
        const templet = this._templetMap.get(url);
        if (!templet) return;
        templet.destroy();
        this._templetMap.delete(url);
    }
}