import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIVideoView } from "../../view/uis/UIVideoView";


export class UIVideoMediator extends MediatorBase<UIVideoView, IUIVideoData> {

	private _video: Laya.VideoNode;
	private _onAniEnd = false;
	private _onAniEndHandler: Laya.Handler;
	private _onVideoLoaded = false;

	override onEnable() {
		const { skinId, characterId } = this.data;
		let targetSkinId = skinId;
		if (!skinId) {
			const cfgChar = $cfgMgr.item_definition.character[characterId];
			targetSkinId = cfgChar?.init_skin + 1;
		}

		if (!ResPath.ESpineVideoPath[targetSkinId]) {
			$logger.error("视频路径不存在:", targetSkinId);
			this.closeSelf();
			return;
		}

		const video = this._video = new Laya.VideoNode();
		const videoRoot = this.view.videoRoot;
		videoRoot.displayObject.addChild(video);
		videoRoot.alpha = 0;

		video.autoPlay = false;
		video.loop = false;
		video.allowBackground = true;
		video.options.objectFit = "fill";
		video.size(Laya.stage.width, Laya.stage.height);
		video.once(EVideoLoadEvent.CanPlay, this, this.onVideoCanPlay);
		video.once(EVideoLoadEvent.CanPlayThrough, this, this.onVideoCanPlay);
		video.once(EVideoPlaybackEvent.Ended, this, this.closeSelf);
		video.once(EVideoErrorEvent.Error, this, this.closeSelf);
		video.source = ResPath.ESpineVideoPath[targetSkinId];

		this._onAniEndHandler = Laya.Handler.create(this, this.onShowAniEnd);
		this.view.transShow.setHook("end", this._onAniEndHandler);
	}

	private onShowAniEnd() {
		this._onAniEnd = true;
		if (!this._onVideoLoaded)
			Laya.timer.once(250, this, this.openView, [EViewID.UILoading2View]);
		this.tryPlayVideo();
	}

	private onVideoCanPlay() {
		this._onVideoLoaded = true;
		this.tryPlayVideo();
	}

	private tryPlayVideo() {
		if (!this._onVideoLoaded || !this._onAniEnd) return;
		Laya.timer.clear(this, this.openView);
		this.closeView(EViewID.UILoading2View);
		this._video.off(EVideoLoadEvent.CanPlay, this, this.onVideoCanPlay);
		this._video.off(EVideoLoadEvent.CanPlayThrough, this, this.onVideoCanPlay);
		this.view.transHide.play();
		this._video.play();
		this.view.videoRoot.alpha = 1;
	}

	override onDisable() {
		this._video?.destroy();
		this._video = null;
		this._onAniEnd = false;
		this._onAniEndHandler?.recover();
		this._onAniEndHandler = null;
		this._onVideoLoaded = false;
		this.view.transShow.setHook("end", null);
		Laya.timer.clear(this, this.openView);
		this.closeView(EViewID.UILoading2View);
	}

}