import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIVideoMsg, UIVideoView } from "../../view/uis/UIVideoView";


export class UIVideoMediator extends MediatorBase<UIVideoView, IUIVideoData> {

	private _video: Laya.VideoNode;

	override onAwake() {
		this.addEvent(EUIVideoMsg.OnBtnJumpClick, this.onBtnJumpClick);
	}

	override onAfterOpenAni() {
		const { skinId, characterId } = this.data;
		let targetSkinId = skinId;
		if (!skinId) {
			const cfgChar = $cfgMgr.item_definition.character[characterId];
			targetSkinId = cfgChar?.init_skin + 1;
		}

		const cfgSkin = $cfgMgr.item_definition.skin[targetSkinId];
		if (!cfgSkin) {
			Logger.error("皮肤配置不存在，id:", targetSkinId);
			this.closeSelf();
			return;
		}
		if (!cfgSkin.spine_type) {
			Logger.error("皮肤配置错误，id:", targetSkinId);
			this.closeSelf();
			return;
		}
		const video = this._video = new Laya.VideoNode();
		this.view.videoRoot.displayObject.addChild(video);
		video.autoPlay = false;
		video.loop = false;
		video.allowBackground = true;
		video.options.objectFit = "fill";
		video.size(Laya.stage.width, Laya.stage.height);
		video.source = ResPath.ESpineVideoPath[targetSkinId];
		video.once(EVideoLoadEvent.CanPlay, this, this.onCanPlay);
		video.once(EVideoLoadEvent.CanPlayThrough, this, this.onCanPlay);
		video.once(EVideoPlaybackEvent.Ended, this, this.closeSelf);
		video.once(EVideoErrorEvent.Error, this, this.closeSelf);
		video.once(EVideoErrorEvent.Abort, this, this.closeSelf);
		Laya.timer.once(250, this, this.openView, [EViewID.UILoading2View]);
	}

	private onCanPlay() {
		this._video.off(EVideoLoadEvent.CanPlay, this, this.onCanPlay);
		this._video.off(EVideoLoadEvent.CanPlayThrough, this, this.onCanPlay);
		this.view.transHide.play();
		this._video.play();
		this.closeView(EViewID.UILoading2View);
		Laya.timer.clear(this, this.openView);
	}

	override onDisable() {
		this._video.destroy();
		this._video = null;
		Laya.timer.clear(this, this.openView);
	}

	private onBtnJumpClick() {
		this.closeSelf();
	}

}