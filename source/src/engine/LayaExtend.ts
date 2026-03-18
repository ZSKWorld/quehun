
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
		const prototype = Laya.VideoPlayer.prototype;
		const oldFunc: Function = prototype["_load"];
		Object.defineProperty(prototype, "_load", {
			value: function () {
				const _this:Laya.VideoPlayer = this;
				oldFunc.call(_this);
				const owner = _this.owner;
				if (!owner) return;
				const ele = (_this.player as Laya.HTMLVideoTexture).element;
				ele.addEventListener(EVideoLoadEvent.LoadStart, () => owner.event(EVideoLoadEvent.LoadStart));
				ele.addEventListener(EVideoLoadEvent.LoadedMetadata, () => owner.event(EVideoLoadEvent.LoadedMetadata));
				ele.addEventListener(EVideoLoadEvent.LoadedData, () => owner.event(EVideoLoadEvent.LoadedData));
				ele.addEventListener(EVideoLoadEvent.Progress, () => owner.event(EVideoLoadEvent.Progress));
				ele.addEventListener(EVideoLoadEvent.CanPlay, () => owner.event(EVideoLoadEvent.CanPlay));
				ele.addEventListener(EVideoLoadEvent.CanPlayThrough, () => owner.event(EVideoLoadEvent.CanPlayThrough));
				ele.addEventListener(EVideoPlaybackEvent.Play, () => owner.event(EVideoPlaybackEvent.Play));
				ele.addEventListener(EVideoPlaybackEvent.Playing, () => owner.event(EVideoPlaybackEvent.Playing));
				ele.addEventListener(EVideoPlaybackEvent.Pause, () => owner.event(EVideoPlaybackEvent.Pause));
				ele.addEventListener(EVideoPlaybackEvent.Ended, () => owner.event(EVideoPlaybackEvent.Ended));
				ele.addEventListener(EVideoPlaybackEvent.Waiting, () => owner.event(EVideoPlaybackEvent.Waiting));
				ele.addEventListener(EVideoPlaybackEvent.Stalled, () => owner.event(EVideoPlaybackEvent.Stalled));
				ele.addEventListener(EVideoProgressAndInteractionEvent.TimeUpdate, () => owner.event(EVideoProgressAndInteractionEvent.TimeUpdate));
				ele.addEventListener(EVideoProgressAndInteractionEvent.Seeking, () => owner.event(EVideoProgressAndInteractionEvent.Seeking));
				ele.addEventListener(EVideoProgressAndInteractionEvent.Seeked, () => owner.event(EVideoProgressAndInteractionEvent.Seeked));
				ele.addEventListener(EVideoProgressAndInteractionEvent.VolumeChange, () => owner.event(EVideoProgressAndInteractionEvent.VolumeChange));
				ele.addEventListener(EVideoProgressAndInteractionEvent.RateChange, () => owner.event(EVideoProgressAndInteractionEvent.RateChange));
				ele.addEventListener(EVideoErrorEvent.Error, () => owner.event(EVideoErrorEvent.Error));
				ele.addEventListener(EVideoErrorEvent.Abort, () => owner.event(EVideoErrorEvent.Abort));
			}
		});
	}
}