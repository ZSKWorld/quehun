import { SpineController } from "./SpineController";

const enum ESpineAnimation {
	Celebrate_idle = "celebrate_idle",
	Click = "click",
	Click2 = "click2",
	Greeting = "greeting",
	Idle = "idle",
	IdleCelebrate = "idle+celebrate",
}

export class SpineManager implements ISpineManager {
	private _templetMap = new Map<string, Laya.SpineTemplet>();
	private _unusedPool = new Map<number, ISpineController[]>();
	private _usingPool = new Map<number, ISpineController[]>();
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
		const unusedArr = this._unusedPool.get(id);
		if (unusedArr && unusedArr.length) {
			spine = unusedArr.pop();
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
				spine = spineCtrl;
			}
		}
		if (spine) {
			parent && parent.addChild(spine.gowner);
			const usingArr = this._usingPool.get(id);
			if (usingArr) usingArr.push(spine);
			else this._usingPool.set(id, [spine]);
			spine.play(ESpineAnimation.Idle, true);
		}
		return spine;
	}

	recover(spine: ISpineController) {
		if (!spine) return;
		const id = spine.spineId;
		const usingArr = this._usingPool.get(id);
		usingArr && usingArr.remove(spine);
		const unusedArr = this._unusedPool.get(id);
		if (spine.destroyed)
			unusedArr && unusedArr.remove(spine);
		else {
			if (unusedArr) unusedArr.pushUnique(spine);
			else this._unusedPool.set(id, [spine]);
			spine.gowner.removeFromParent();
		}
	}

	clear(id: number) {
		const unusedArr = this._unusedPool.get(id);
		const usingArr = this._usingPool.get(id);
		if (unusedArr) {
			unusedArr.forEach(v => v.gowner.dispose());
			unusedArr.length = 0;
		}
		if (usingArr) {
			usingArr.forEach(v => v.gowner.dispose());
			usingArr.length = 0;
		}
	}

	dispose(id: number) {
		this.clear(id);
		const urls = this.getSpineUrls(id);
		for (let i = 0; i < urls.length; i++) {
			const templet = this._templetMap.get(urls[i]);
			this._templetMap.delete(urls[i]);
			if (!templet) continue;
			Laya.timer.frameOnce(0, this, () => templet.destroy());
		}
	}

	private getSpineUrls(id: number) {
		const urls: string[] = [];
		const t1 = $cfgMgr.spot.skin_spot[id] || $cfgMgr.item_definition.skin[id];
		if (!t1) return urls;
		const t2 = $cfgMgr.character.skin[id];
		const layer = t2 ? t2.spine_layers : 1;
		if (layer == 1)
			urls.push($langRes(t1.path + "/spine/spine.skel"));
		else {
			for (let i = 0; i < layer; i++) {
				urls.push($langRes(t1.path + "/spine/spine_" + i + ".skel"));
			}
		}
		return urls;
	}
}