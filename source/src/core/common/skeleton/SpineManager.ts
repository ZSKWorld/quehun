import { SpineController } from "./SpineController";

const enum ESpineAnimation {
	Celebrate_idle = "celebrate_idle",
	Click = "click",
	Click2 = "click2",
	Greeting = "greeting",
	Idle = "idle",
	IdleCelebrate = "idle+celebrate",
}

export class SpineManager extends Singleton<SpineManager>() implements ISpineManager {
	private _templetMap = new Map<string, Laya.SpineTemplet>();
	private _unusedPool = new Map<string, ISpineController[]>();
	private _usingPool = new Map<string, ISpineController[]>();
	async loadById(ids: number[], progress?: Laya.Handler) {
		if (!ids) return null;
		if (!ids.length) return (progress?.runWith(1), []);

		const loadUrls = ids.map(v => this.getSpineUrls(v)).flat();
		await this.loadByUrl(loadUrls, progress);

		return ids.map(id => {
			const urls = this.getSpineUrls(id);
			return urls.map(u => this._templetMap.get(u));
		});
	}

	async loadByUrl(urls: string[], progress?: Laya.Handler) {
		if (!urls) return null;
		if (!urls.length) return (progress?.runWith(1), []);

		const templetMap = this._templetMap;
		const loadUrls = [...new Set(urls)].filter(v => !templetMap.get(v));

		if (loadUrls.length > 0) {
			const data = await $loadMgr.load<Laya.SpineTemplet, string[]>(loadUrls, null, progress, Laya.Loader.SPINE);
			data?.forEach(v => v && templetMap.set(v.url, v));
		} else {
			progress?.runWith(1);
		}

		return urls.map(v => templetMap.get(v));
	}

	createById(id: number, parent?: fgui.GComponent) {
		let spine: ISpineController;
		const unusedArr = this._unusedPool.get(id);
		if (unusedArr && unusedArr.length) {
			spine = unusedArr.pop();
		}
		else {
			const templetMap = this._templetMap;
			const urls = this.getSpineUrls(id);
			if (urls.length && urls.every(v => !!templetMap.get(v))) {
				const holder = new fgui.GComponent();
				for (let i = 0; i < urls.length; i++) {
					const child = holder.addChild(new fgui.GObject());
					const spineNode = child.addComponent(Laya.Spine2DRenderNode);
					spineNode.useFastRender = false;
					spineNode.source = urls[i];
				}
				const spineCtrl = holder.addComponent(SpineController);
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

	createByUrl(url: string, parent?: fgui.GComponent) {
		return null;
	}
	clearById(id: number) {
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

	clearByUrl(url: string) {

	}

	disposeById(id: number) {
		this.clearById(id);
		const urls = this.getSpineUrls(id);
		for (let i = 0; i < urls.length; i++) {
			const templet = this._templetMap.get(urls[i]);
			if (!templet) continue;
			this._templetMap.delete(urls[i]);
			Laya.timer.frameOnce(0, this, () => templet.destroy());
		}
	}

	disposeByUrl(url: string) {

	}

	recover(spine: ISpineController) {
		if (!spine) return;
		const id = spine.url;
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


	private getSpineUrls(id: number) {
		const urls: string[] = [];
		const config = $cfgMgr.spot.skin_spot[id] || $cfgMgr.item_definition.skin[id];
		if (!config) return urls;

		const cfgSkin = $cfgMgr.character.skin[id];
		const layer = cfgSkin ? cfgSkin.spine_layers : 1;

		if (layer == 1)
			urls.push($langRes(config.path + "/spine/spine.skel"));
		else {
			for (let i = 0; i < layer; i++) {
				urls.push($langRes(config.path + "/spine/spine_" + i + ".skel"));
			}
		}
		return urls;
	}
}