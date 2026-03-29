import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIVideoMsg, UIVideoView } from "../../view/uis/UIVideoView";


export class UIVideoMediator extends MediatorBase<UIVideoView, IUIVideoData> {

	private _video: Laya.VideoNode;

	override onAwake() {
		this.addEvent(EUIVideoMsg.OnBtnJumpClick, this.onBtnJumpClick);
	}

	override onEnable() {
		const { skinId, characterId} = this.data;
		let targetSkinId = skinId;
		if (!skinId) {
			const cfgChar = $cfgMgr.item_definition.character[characterId];
			targetSkinId = cfgChar?.init_skin + 1;
		}

		const cfgSkin = $cfgMgr.item_definition.skin[targetSkinId];
		if (!cfgSkin) {
			Logger.error("皮肤配置不存在，id:", targetSkinId);
			return this.closeSelf();
		}
		if (!cfgSkin.spine_type) {
			Logger.error("皮肤配置错误，id:", targetSkinId);
			return this.closeSelf();
		}
		const video = this._video = new Laya.VideoNode();
		this.view.displayObject.addChild(video);
		video.autoPlay = false;
		video.loop = false;
		video.allowBackground = true;
		video.options.objectFit = "fill";
		video.size(Laya.stage.width, Laya.stage.height);
		video.source = ResPath.EUnclassifiedPath[targetSkinId];
		// video.play();
		video.on(EVideoLoadEvent.CanPlay, this, this.onCanPlay);
		video.on(EVideoErrorEvent.Error, this, this.closeSelf);
		video.on(EVideoErrorEvent.Abort, this, this.closeSelf);
	}

	private onCanPlay() {
		
	}


	override onDisable() {
		this._video.destroy();
		this._video = null;
	}

	private onBtnJumpClick() {
		this.closeSelf();
	}

}