import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIVideoMsg, UIVideoView } from "../../view/uis/UIVideoView";

const enum EVideoTextureEvent {
	LoadStart = "loadstart", //浏览器开始寻找媒体数据时。
	LoadedMetadata = "loadedmetadata", //视频的时长、尺寸、字幕等元数据加载完成。
	LoadedData = "loadeddata", //当前帧的数据加载完成（视频首帧已就绪）。
	Progress = "progress", //浏览器正在下载视频数据。
	CanPlay = "canplay", //浏览器认为已经加载了足够的数据，可以开始播放。
	CanPlayThrough = "canplaythrough", //预计在不断网的情况下可以顺畅播放直至结束。
	Error = "error", //发生错误（如视频格式不支持、404）。可通过 video.error 获取详情。
	Abort = "abort", //视频加载被中止（非错误原因，通常是用户操作）。
}

export class UIVideoMediator extends MediatorBase<UIVideoView, IUIVideoData> {

	private _video: Laya.VideoNode;

	override onAwake() {
		this.addEvent(EUIVideoMsg.OnBtnJumpClick, this.onBtnJumpClick);
	}

	override onEnable() {
		this._video = new Laya.VideoNode();
		this.view.displayObject.addChild(this._video);
		this._video.autoPlay = false;
		this._video.loop = true;
		this._video.allowBackground = true;
		this._video.options.objectFit = "fill";
		this._video.size(Laya.stage.width, Laya.stage.height);
		this._video.source = ResPath.EUnclassifiedPath[400107];
		const player = this._video.player as Laya.VideoTexture;
		player.on(Laya.Event.READY, this, () => {
			Logger.error("ready", Laya.timer.currFrame);
		});
		player.on("canplay", this, () => {
			Logger.error("canplay", Laya.timer.currFrame);
		});
		player.on("ended", this, () => {
			Logger.error("ended", Laya.timer.currFrame);
		});
		this._video.play();
		Logger.error("play", Laya.timer.currFrame);
	}

	// override onUpdate() {
	// 	if (this._video.readyState == 4) return;
	// 	Logger.error(this._video.readyState);
	// }

	override onDisable() {
		this._video.destroy();
		this._video = null;
	}

	private onBtnJumpClick() {
		this.closeSelf();
	}

}