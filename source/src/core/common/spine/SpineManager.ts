import { SpineController } from "./SpineController";

const enum ESpineAnimation {
	Celebrate_idle = "celebrate_idle",
	Click = "click",
	Click2 = "click2",
	Greeting = "greeting",
	Idle = "idle",
	IdleCelebrate = "idle+celebrate",
}

@SingletonClass
export class SpineManager implements ISpineManager {
	private _templetMap = new Map<string, Laya.SpineTemplet>();
	private _unusedPool = new Map<number, ISpineController[]>();
	private _usingPool = new Map<number, ISpineController[]>();

	private _default: ISpineIllustDefaultData;
	private _illustDataMap = new Map<number, ISpineIllustSkinData>();

	async init() {
		const data = await $loadMgr.fetch<{ default: ISpineIllustDefaultData; }>($langRes("extendRes/illust_data/default.json"), Laya.Loader.JSON);
		this._default = data?.default;
	}

	async loadIllustData(id: number) {
		if (this._illustDataMap.has(id))
			return this._illustDataMap.get(id);

		const cfgSkin = $cfgMgr.item_definition.skin[id];
		if (!cfgSkin) return;

		const data = await $loadMgr.fetch<ISpineIllustSkinData>($langRes(`extendRes/illust_data/${ cfgSkin.illust_data }.json`), Laya.Loader.JSON);
		if (!data) return;
		this._illustDataMap.set(id, data);
		return data;
	}

	async load(ids: number[], progress?: Laya.Handler) {
		if (!ids || ids.length == 0) {
			progress?.runWith(1);
			return [];
		}

		const templetMap = this._templetMap;

		const loadUrls: string[] = [];
		ids.forEach(id => {
			const urls = this.getSpineUrls(id);
			if (!urls.length) return;
			for (let i = 0; i < urls.length; i++) {
				if (templetMap.get(urls[i])) continue;
				loadUrls.push(urls[i]);
			}
		});

		if (loadUrls.length > 0) {
			const data = await $loadMgr.load<Laya.SpineTemplet, string[]>(loadUrls, null, progress, Laya.Loader.SPINE);
			data?.forEach(v => v && templetMap.set(v.url, v));
		} else {
			progress?.runWith(1);
		}

		return ids.map(id => {
			const urls = this.getSpineUrls(id);
			return urls.map(u => templetMap.get(u));
		});
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
				const holder = new fgui.GComponent();
				for (let i = 0; i < urls.length; i++) {
					const child = holder.addChild(new fgui.GObject());
					const spineNode = child.addComponent(Laya.Spine2DRenderNode);
					spineNode.useFastRender = false;
					spineNode.autoAdjust = true;
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
			if (!templet) continue;
			this._templetMap.delete(urls[i]);
			Laya.timer.frameOnce(0, this, () => templet.destroy());
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