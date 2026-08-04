import { Observer } from "../mvc/provider/Observer";

@Singleton
export class LobbyBgManager extends Observer {
	static readonly Inst: LobbyBgManager;

	private _inLobby: boolean = false;
	private _bg: fgui.GLoader;
	private _indoor: fgui.GLoader;
	private _indoor1: fgui.GLoader;
	private _curBg: fgui.GLoader;
	private _bgId: number;

	init() {
		if (this._bg) return;
		this._bg = this.createLoader("bg", -9998, false);
		this._indoor = this.createLoader("indoor", -9999, false);
		this._indoor1 = this.createLoader("indoor1", -10000, false);
		$dynamicResMgr.setLoader(this._indoor, ResPath.EMainBgPath.Indoor);
		$dynamicResMgr.setLoader(this._indoor1, ResPath.EMainBgPath.Indoor_1);
	}

	private createLoader(name: string, order: number, visible: boolean) {
		const loader = new fgui.GLoader();
		loader.name = name;
		loader.sortingOrder = order;
		$uiMgr.addToLayer(loader, ELayer.Scene);
		loader.visible = visible;
		loader.touchable = false;
		loader.fill = fgui.LoaderFillType.ScaleFree;
		loader.setSize(Laya.stage.width, Laya.stage.height);
		// loader.setSize(Laya.stage.width / 0.9575, Laya.stage.height / 0.93);
		loader.addRelation(loader.parent, fgui.RelationType.Size);
		return loader;
	}

	@InjectGlobalEvent(EGlobalEvent.OnSceneEnterBegin)
	private onEnterSceneBegin(type: ESceneType) {
		this._inLobby = type == ESceneType.MainScene;
	}

	@InjectGlobalEvent(EGlobalEvent.OnSceneExitBegin)
	private onExitSceneBegin(type: ESceneType) {
		if (type != ESceneType.MainScene) return;
		this._curBg = null;
		this._inLobby = false;
		this._bg.visible = false;
		this._indoor.visible = false;
		this._indoor1.visible = false;
	}

	@InjectGlobalEvent(EGlobalEvent.OnViewOpenBegin)
	private onOpenViewBegin(viewId: EViewID) {
		if (!this._inLobby) return;
		let newBg: fgui.GLoader;
		switch (viewId) {
			case EViewID.UIMainView: newBg = this._bg; break;
			case EViewID.UIAchievementView:
			case EViewID.UIAchievementDetailView: newBg = this._indoor1; break;
			case EViewID.UILiaoSheView:
			case EViewID.UIBagView:
			case EViewID.UITreasureView:
			case EViewID.UIFriendView:
			case EViewID.UIObserverView:
			case EViewID.UIPaipuView:
			case EViewID.UIRechargeView:
			case EViewID.UIShopView:
				newBg = this._indoor; break;
		}
		if (!newBg) return;
		const curBg = this._curBg;
		if (curBg && newBg == curBg) return;

		fgui.GTween.kill(newBg, true);
		fgui.GTween.kill(curBg, true);
		newBg.alpha = 0;
		newBg.visible = true;
		newBg.tweenFade(1, 0.5);
		curBg && curBg.tweenFade(0, 0.5).onComplete(() => {
			curBg.visible = false;
		});
		this._curBg = newBg;
	}

	@InjectUserEvent(EUserEvent.OnLobbyBgChanged)
	private onLobbyBgChanged(id: number) {
		if (id == this._bgId) return;
		this._bgId = id;
		const cfgView = $cfgMgr.item_definition.view[id];
		const url = `res/main_bg/${ cfgView.res_name }.jpg`;
		$dynamicResMgr.setLoader(this._bg, url);
	}
}