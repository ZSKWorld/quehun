export class SkeletonManager implements ISkeletonManager {
	private _templetMap = new Map<string, Laya.Templet>();
	private _skeletonPool = new Map<string, Laya.Skeleton[]>();

	async load(urls: string[], progress?: Laya.Handler) {
		if (!urls || urls.length == 0) {
			progress?.runWith(1);
			return [];
		}

		const templetMap = this._templetMap;

		const neededUrls = urls.filter(v => !templetMap.get(v));
		if (neededUrls.length > 0) {
			const loadedData = await $loadMgr.load<Laya.Templet, string[]>(neededUrls, null, progress);
			loadedData?.forEach(v => v && templetMap.set(v.url, v));
		} else {
			progress?.runWith(1);
		}

		return urls.map(v => templetMap.get(v));
	}

	create(url: string, aniMode: 0 | 1 | 2 = 0) {
		const skeletonPool = this._skeletonPool.get(url);
		if (skeletonPool && skeletonPool.length) {
			const ske = skeletonPool.pop();
			ske.aniMode = aniMode;
			return ske;
		}
		const templet = this._templetMap.get(url);
		if (!templet) return;

		return templet.buildArmature(aniMode);
	}

	recover(skeleton: Laya.Skeleton) {
		if (!skeleton || skeleton.destroyed) return;

		const url = skeleton.templet.url;
		const poolArr = this._skeletonPool.get(url);
		if (poolArr && poolArr.includes(skeleton)) return;

		skeleton.stop();
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