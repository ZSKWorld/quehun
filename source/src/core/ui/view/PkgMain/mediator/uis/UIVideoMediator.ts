import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIVideoMsg, UIVideoView } from "../../view/uis/UIVideoView";

export interface IUIVideoData {

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