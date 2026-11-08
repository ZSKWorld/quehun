type LayaTarget = { layaTarget: Laya.Node; };
type VideoEvent = Event & { target: LayaTarget; };

/** Laya扩展 */
export class LayaExtend {
	static extends() {
		this.vector2Extend();
		this.scriptExtend();
		this.videoPlayerExtend();
		this.mouseEventExtend();
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

	private static mouseEventExtend() {
		const _tempPoint = new Laya.Point();
		const { Event, InputManager } = Laya;
		const prototype = InputManager.prototype;
		prototype.handleMouse = function (ev, type) {
			this._eventType = type;
			this._nativeEvent = ev;
			InputManager.lastTouchId = 0;
			let now = performance.now();
			if (this._lastTouchTime != null && now - this._lastTouchTime < 100)
				return;
			let touch = this._mouseTouch;
			_tempPoint.setTo(ev.pageX || ev.clientX, ev.pageY || ev.clientY);
			this._stage._canvasTransform.invertTransformPoint(_tempPoint);
			InputManager.mouseX = _tempPoint.x;
			InputManager.mouseY = _tempPoint.y;
			let x = _tempPoint.x / this._stage.clientScaleX;
			let y = _tempPoint.y / this._stage.clientScaleY;
			touch.event.nativeEvent = ev;
			if (type == 3 || !InputManager.mouseEventsEnabled)
				touch.target = this._touchTarget = null;
			else {
				touch.target = this._touchTarget = this.getNodeUnderPoint(x, y);
				let ix = Math.round(x);
				let iy = Math.round(y);
				if (ix != touch.pos.x || iy != touch.pos.y) {
					InputManager.lastMouseTime = now;
					touch.pos.setTo(ix, iy);
					touch.move();
					if (InputManager.mouseEventsEnabled) {
						touch.bubble(Event.MOUSE_MOVE);
						for (let t of touch.downTargets) {
							touch.event._stopped = false;
							t.event(Event.MOUSE_DRAG, touch.event);
							if (touch.event._stopped)
								break;
						}
					}
				}
			}
			if (touch.lastRollOver != touch.target)
				this.handleRollOver(touch);
			if (type == 0) {
				if (!touch.began) {
					touch.begin();
					this._touches[0] = touch;
					touch.event.button = ev.button;
					touch.downButton = ev.button;
					InputManager.onMouseDownCapture.invoke(touch.touchId);
					if (InputManager.mouseEventsEnabled) {
						//----------------------------------------------------------------
						// if (ev.button == 0)
						// 	touch.bubble(Event.MOUSE_DOWN);
						// else
						// 	touch.bubble(Event.RIGHT_MOUSE_DOWN);
						if (ev.button == 0) touch.bubble(Event.MOUSE_DOWN);
						else if (ev.button == 1) touch.bubble(EMouseEvent.WheelMouseDown);
						else if (ev.button == 3) touch.bubble(EMouseEvent.BackMouseDown);
						else if (ev.button == 4) touch.bubble(EMouseEvent.ForwardMouseDown);
						else touch.bubble(Event.RIGHT_MOUSE_DOWN);
						//----------------------------------------------------------------
					}
				}
			}
			else if (type == 1) {
				if (touch.began && ev.button == touch.downButton) {
					touch.end();
					this._touches.length = 0;
					touch.event.button = ev.button;
					if (InputManager.mouseEventsEnabled) {
						//----------------------------------------------------------------
						// if (ev.button == 0)
						// 	touch.bubble(Event.MOUSE_UP);
						// else
						// 	touch.bubble(Event.RIGHT_MOUSE_UP);
						if (ev.button == 0) touch.bubble(Event.MOUSE_UP);
						else if (ev.button == 1) touch.bubble(EMouseEvent.WheelMouseUp);
						else if (ev.button == 3) touch.bubble(EMouseEvent.BackMouseUp);
						else if (ev.button == 4) touch.bubble(EMouseEvent.ForwardMouseUp);
						else touch.bubble(Event.RIGHT_MOUSE_UP);
						//----------------------------------------------------------------
						if (touch.moved) {
							for (let t of touch.downTargets)
								t.event(Event.MOUSE_DRAG_END, touch.event);
						}
						let clickTarget = touch.clickTest();
						if (clickTarget) {
							//----------------------------------------------------------------
							// if (ev.button == 0) {
							// 	touch.event.isDblClick = touch.clickCount == 2;
							// 	touch.bubble(Event.CLICK, clickTarget);
							// 	if (touch.clickCount == 2)
							// 		touch.bubble(Event.DOUBLE_CLICK, clickTarget);
							// 	touch.event.isDblClick = false;
							// }
							// else {
							// 	touch.event.isDblClick = touch.clickCount == 2;
							// 	touch.bubble(Event.RIGHT_CLICK, clickTarget);
							// 	touch.event.isDblClick = false;
							// }
							touch.event.isDblClick = touch.clickCount == 2;
							if (ev.button == 0) {
								touch.bubble(Event.CLICK, clickTarget);
								if (touch.clickCount == 2)
									touch.bubble(Event.DOUBLE_CLICK, clickTarget);
							} else if (ev.button == 1) {
								touch.bubble(EMouseEvent.WheelMouseClick, clickTarget);
							} else if (ev.button == 3) {
								touch.bubble(EMouseEvent.BackMouseClick, clickTarget);
							} else if (ev.button == 4) {
								touch.bubble(EMouseEvent.ForwardMouseClick, clickTarget);
							} else {
								touch.bubble(Event.RIGHT_CLICK, clickTarget);
							}
							touch.event.isDblClick = false;
							//----------------------------------------------------------------
						}
					}
					touch.event.button = 0;
				}
			}
			else if (type == 4) {
				if (InputManager.mouseEventsEnabled) {
					touch.event.delta = (<WheelEvent>ev).deltaY * 0.025;
					touch.bubble(Event.MOUSE_WHEEL);
					touch.event.delta = 0;
				}
			}
		};
	}
}