import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIVideoMsg, UIVideoView } from "../../view/uis/UIVideoView";


export class UIVideoMediator extends MediatorBase<UIVideoView, IUIVideoData> {

	private _video: Laya.VideoNode;

	override onAwake() {
		this.addEvent(EUIVideoMsg.OnBtnJumpClick, this.onBtnJumpClick);
	}

	override onEnable() {
		const video = this._video = new Laya.VideoNode();
		this.view.displayObject.addChild(video);
		video.autoPlay = false;
		video.loop = false;
		video.allowBackground = true;
		video.options.objectFit = "fill";
		video.size(Laya.stage.width, Laya.stage.height);
		video.source = ResPath.EUnclassifiedPath[400107];
		// video.play();
		video.on(EVideoLoadEvent.LoadStart, this, () => Logger.error("LoadStart"))
		video.on(EVideoLoadEvent.LoadedMetadata, this, () => Logger.error("LoadedMetadata"))
		video.on(EVideoLoadEvent.LoadedData, this, () => Logger.error("LoadedData"))
		video.on(EVideoLoadEvent.Progress, this, () => Logger.error("Progress"))
		video.on(EVideoLoadEvent.CanPlay, this, () => Logger.error("CanPlay"))
		video.on(EVideoLoadEvent.CanPlayThrough, this, () => Logger.error("CanPlayThrough"))
		video.on(EVideoPlaybackEvent.Play, this, () => Logger.error("Play"))
		video.on(EVideoPlaybackEvent.Playing, this, () => Logger.error("Playing"))
		video.on(EVideoPlaybackEvent.Pause, this, () => Logger.error("Pause"))
		video.on(EVideoPlaybackEvent.Ended, this, () => Logger.error("Ended"))
		video.on(EVideoPlaybackEvent.Waiting, this, () => Logger.error("Waiting"))
		video.on(EVideoPlaybackEvent.Stalled, this, () => Logger.error("Stalled"))
		video.on(EVideoProgressAndInteractionEvent.TimeUpdate, this, () => Logger.error("TimeUpdate"))
		video.on(EVideoProgressAndInteractionEvent.Seeking, this, () => Logger.error("Seeking"))
		video.on(EVideoProgressAndInteractionEvent.Seeked, this, () => Logger.error("Seeked"))
		video.on(EVideoProgressAndInteractionEvent.VolumeChange, this, () => Logger.error("VolumeChange"))
		video.on(EVideoProgressAndInteractionEvent.RateChange, this, () => Logger.error("RateChange"))
		video.on(EVideoErrorEvent.Error, this, () => Logger.error("Error"))
		video.on(EVideoErrorEvent.Abort, this, () => Logger.error("Abort"))
	}


	override onDisable() {
		this._video.destroy();
		this._video = null;
	}

	private onBtnJumpClick() {
		this.closeSelf();
	}

}