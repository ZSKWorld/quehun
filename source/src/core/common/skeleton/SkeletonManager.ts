export class SkeletonManager implements ISkeletonManager {
    private _templetMap = new Map<string, Laya.Templet>();
    private _skeletonPool = new Map<string, Laya.Skeleton[]>();

    load(urls: string[], progress?: Laya.Handler) {
        if (!urls) {
            if (progress) progress.runWith(1);
            return Promise.resolve<Laya.Templet[]>(null);
        }
        const loadUrl = urls.filter(v => !this._templetMap.get(v));
        if (!loadUrl.length) {
            if (progress) progress.runWith(1);
            const templets = urls.map(v => this._templetMap.get(v));
            return Promise.resolve<Laya.Templet[]>(templets);
        }
        const promise = $loadMgr.load<Laya.Templet, string[]>(loadUrl, null, progress).then(data => {
            data.forEach(v => this._templetMap.set(v.url, v));
            return urls.map(v => this._templetMap.get(v));
        });
        return promise;
    }

    create(url: string, aniMode: 0 | 1 | 2 = 0) {
        let ske: Laya.Skeleton;
        const skeletonPool = this._skeletonPool.get(url);
        if (skeletonPool && skeletonPool.length) {
            ske = skeletonPool.pop();
            ske.aniMode = aniMode;
        }
        else {
            const templet = this._templetMap.get(url);
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