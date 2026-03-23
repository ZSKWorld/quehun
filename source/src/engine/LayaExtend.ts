type LayaTarget = { layaTarget: Laya.Node };
type VideoEvent = Event & { target: LayaTarget };

/** Laya扩展 */
export class LayaExtend {
	static extends() {
		this.vector2Extend();
		this.scriptExtend();
		this.videoPlayerExtend();
	}

	/** Laya.Vector2扩展 */
	private static vector2Extend() {
		const prototype = Laya.Vector2.prototype;
		Object.defineProperties(prototype, {
			length: {
				get() { return Math.sqrt(this.lengthSquared); },
			},
			lengthSquared: {
				get() {
					const { x, y } = this;
					return x * x + y * y;
				},
			},
			add: {
				value: function (v1: number | Laya.Vector2, v2: number | Laya.Vector2) {
					const { x, y } = this;
					if (typeof v1 == "number") this.setValue(x + v1, y + v2);
					else this.setValue(x + v1.x, y + v1.y);
					return this;
				}
			},
			sub: {
				value: function (v2: Laya.Vector2) {
					this.setValue(this.x - v2.x, this.y - v2.y);
					return this;
				}
			},
			scale: {
				value: function (scale: number) {
					this.setValue(this.x * scale, this.y * scale);
					return this;
				}
			},
			normalize: {
				value: function () {
					Laya.Vector2.normalize(this, this);
					return this;
				}
			},
			rotate: {
				value: function (angle: number) {
					const radian = angle * Math.PI / 180;
					const cos = Math.cos(radian);
					const sin = Math.sin(radian);
					const { x, y } = this;
					this.setValue(x * cos - y * sin, x * sin + y * cos);
					return this;
				}
			},
			copyTo: {
				value: function (v2: Laya.Vector2) {
					v2.setValue(this.x, this.y);
					return v2;
				}
			},
			copyFrom: {
				value: function (x: number, y: number) {
					this.setValue(x, y);
					return this;
				}
			},
			dot: {
				value: function (v2: Laya.Vector2) {
					return Laya.Vector2.dot(this, v2);
				}
			},
			lerp: {
				value: function (b: Laya.Vector2, t: number) {
					const { x, y } = this;
					this.x = x + t * (b.x - x);
					this.y = y + t * (b.y - y);
					return this;
				}
			},
			slerp: {
				value: function (end: Laya.Vector2, t: number) {
					const dot = Math.min(Math.max(this.dot(end), -1), 1);
					const theta = Math.acos(dot) * t;
					const relativeVec = end.clone().sub(this.clone().scale(dot));
					relativeVec.normalize();
					return this.scale(Math.cos(theta)).add(relativeVec.scale(Math.sin(theta)));
				}
			}
		});
	}

	private static scriptExtend() {
		const prototype = Laya.Script.prototype;
		Object.defineProperties(prototype, {
			gowner: {
				get() {
					if (this.owner)
						return this.owner.$owner;
					return null;
				},
			},
		});
	}

	private static videoPlayerExtend() {
		const loadStart = (e: VideoEvent) => e.target.layaTarget.event(EVideoLoadEvent.LoadStart);
		const loadedMetadata = (e: VideoEvent) => e.target.layaTarget.event(EVideoLoadEvent.LoadedMetadata);
		const loadedData = (e: VideoEvent) => e.target.layaTarget.event(EVideoLoadEvent.LoadedData);
		const progress = (e: VideoEvent) => e.target.layaTarget.event(EVideoLoadEvent.Progress);
		const canplay = (e: VideoEvent) => e.target.layaTarget.event(EVideoLoadEvent.CanPlay);
		const canplaythrough = (e: VideoEvent) => e.target.layaTarget.event(EVideoLoadEvent.CanPlayThrough);
		const play = (e: VideoEvent) => e.target.layaTarget.event(EVideoPlaybackEvent.Play);
		const playing = (e: VideoEvent) => e.target.layaTarget.event(EVideoPlaybackEvent.Playing);
		const pause = (e: VideoEvent) => e.target.layaTarget.event(EVideoPlaybackEvent.Pause);
		const ended = (e: VideoEvent) => e.target.layaTarget.event(EVideoPlaybackEvent.Ended);
		const waiting = (e: VideoEvent) => e.target.layaTarget.event(EVideoPlaybackEvent.Waiting);
		const stalled = (e: VideoEvent) => e.target.layaTarget.event(EVideoPlaybackEvent.Stalled);
		const timeUpdate = (e: VideoEvent) => e.target.layaTarget.event(EVideoProgressAndInteractionEvent.TimeUpdate);
		const seeking = (e: VideoEvent) => e.target.layaTarget.event(EVideoProgressAndInteractionEvent.Seeking);
		const seeked = (e: VideoEvent) => e.target.layaTarget.event(EVideoProgressAndInteractionEvent.Seeked);
		const volumeChange = (e: VideoEvent) => e.target.layaTarget.event(EVideoProgressAndInteractionEvent.VolumeChange);
		const rateChange = (e: VideoEvent) => e.target.layaTarget.event(EVideoProgressAndInteractionEvent.RateChange);
		const error = (e: VideoEvent) => e.target.layaTarget.event(EVideoErrorEvent.Error);
		const abort = (e: VideoEvent) => e.target.layaTarget.event(EVideoErrorEvent.Abort);

		const prototype = Laya.VideoPlayer.prototype;
		const oldFunc: Function = prototype["_load"];
		Object.defineProperty(prototype, "_load", {
			value: function () {
				const _this: Laya.VideoPlayer = this;
				oldFunc.call(_this);
				const owner = _this.owner;
				if (!owner) return;
				const ele = (_this.player as Laya.HTMLVideoTexture).element as HTMLVideoElement & LayaTarget;
				ele.layaTarget = owner;
				ele.addEventListener(EVideoLoadEvent.LoadStart, loadStart);
				ele.addEventListener(EVideoLoadEvent.LoadedMetadata, loadedMetadata);
				ele.addEventListener(EVideoLoadEvent.LoadedData, loadedData);
				ele.addEventListener(EVideoLoadEvent.Progress, progress);
				ele.addEventListener(EVideoLoadEvent.CanPlay, canplay);
				ele.addEventListener(EVideoLoadEvent.CanPlayThrough, canplaythrough);
				ele.addEventListener(EVideoPlaybackEvent.Play, play);
				ele.addEventListener(EVideoPlaybackEvent.Playing, playing);
				ele.addEventListener(EVideoPlaybackEvent.Pause, pause);
				ele.addEventListener(EVideoPlaybackEvent.Ended, ended);
				ele.addEventListener(EVideoPlaybackEvent.Waiting, waiting);
				ele.addEventListener(EVideoPlaybackEvent.Stalled, stalled);
				ele.addEventListener(EVideoProgressAndInteractionEvent.TimeUpdate, timeUpdate);
				ele.addEventListener(EVideoProgressAndInteractionEvent.Seeking, seeking);
				ele.addEventListener(EVideoProgressAndInteractionEvent.Seeked, seeked);
				ele.addEventListener(EVideoProgressAndInteractionEvent.VolumeChange, volumeChange);
				ele.addEventListener(EVideoProgressAndInteractionEvent.RateChange, rateChange);
				ele.addEventListener(EVideoErrorEvent.Error, error);
				ele.addEventListener(EVideoErrorEvent.Abort, abort);
			}
		});
	}
}