/** 资源加载管理 */
@Singleton
export class LoadManager implements ILoadManager {
	fetch<K extends keyof Laya.ContentTypeMap>(url: string, contentType: K, onProgress?: Laya.ProgressCallback, options?: Readonly<Laya.ILoadOptions>) {
		return Laya.loader.fetch(url, contentType, onProgress, options);
	}

	load(url: LoadURL, type?: string, onProgress?: Laya.ProgressCallback): any;
	load(url: LoadURL, options?: Readonly<Laya.ILoadOptions>, onProgress?: Laya.ProgressCallback): any;
	load(url: LoadURL, complete?: Laya.Handler, progress?: Laya.Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean): any;
	load(url: LoadURL, arg1?: any, arg2?: any, arg3?: any, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean) {
		const isArray = Array.isArray(url);
		const invalidUrl = isArray ? !url.length : !url;
		if (invalidUrl) {
			$gameUtil.safeCall(arg2, 1);
			$gameUtil.safeCall(arg1, isArray ? [] : null);
			return Promise.resolve(isArray ? [] : null);
		}

		return Laya.loader.load(url, arg1, arg2, arg3, priority, cache, group, ignoreCache, useWorkerLoader);
	}

	loadPackage(resKey: string | string[], progressHandler?: Laya.Handler | ((progress: number) => void)) {
		const invalidUrl = Array.isArray(resKey) ? !resKey.length : !resKey;
		if (invalidUrl) {
			$gameUtil.safeCall(progressHandler, 1);
			return Promise.resolve([]);
		}
		return new Promise<any>((resolve) => {
			fgui.UIPackage.loadPackage(resKey, resolve, progressHandler);
		});
	}

	getRes<T = any>(url: string, type?: string) {
		return Laya.loader.getRes(url, type) as T;
	}

	cancelLoadByUrl(url: string) {
		Laya.loader.cancelLoadByUrl(url);
	}

	clearRes(url: string, checkObj?: any) {
		Laya.loader.clearRes(url, checkObj);
	}

	clearTextureRes(url: string) {
		Laya.loader.clearTextureRes(url);
	}
}