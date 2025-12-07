/** FGUI扩展 */
export class FGUIExtend {
	static extends() {
		this.gobjectExtension();
		this.addGTextLangText();
		this.glistItemClick();
		this.gbuttonDownEffect();
	}

	/** GObject扩展 */
	private static gobjectExtension() {
		const prototype = fgui.GObject.prototype;
		prototype.tweenMove = function (endX: number, endY: number, duration: number) {
			return fgui.GTween.to2(this.x, this.y, endX, endY, duration).setTarget(this, this.setXY);
		};
		prototype.tweenMoveX = function (endX: number, duration: number) {
			return fgui.GTween.to(this.x, endX, duration).setTarget(this, "x");
		};
		prototype.tweenMoveY = function (endY: number, duration: number) {
			return fgui.GTween.to(this.y, endY, duration).setTarget(this, "y");
		};
		prototype.tweenScale = function (endX: number, endY: number, duration: number) {
			return fgui.GTween.to2(this.scaleX, this.scaleY, endX, endY, duration).setTarget(this, this.setScale);
		};
		prototype.tweenScaleX = function (endX: number, duration: number) {
			return fgui.GTween.to(this.scaleX, endX, duration).setTarget(this, "scaleX");
		};
		prototype.tweenScaleY = function (endY: number, duration: number) {
			return fgui.GTween.to(this.scaleY, endY, duration).setTarget(this, "scaleY");
		};
		prototype.tweenResize = function (endW: number, endH: number, duration: number) {
			return fgui.GTween.to2(this.width, this.height, endW, endH, duration).setTarget(this, this.setSize);
		};
		prototype.tweenFade = function (endValue: number, duration: number) {
			return fgui.GTween.to(this.alpha, endValue, duration).setTarget(this, "alpha");
		};
		prototype.tweenRotate = function (endValue: number, duration: number) {
			return fgui.GTween.to(this.rotation, endValue, duration).setTarget(this, "rotation");
		};
		prototype.addComponentIntance = function (component) {
			return this._displayObject.addComponentIntance(component);
		};
		prototype.addComponent = function (componentType) {
			return this._displayObject.addComponent(componentType);
		};
		prototype.getComponent = function (componentType) {
			return this._displayObject.getComponent(componentType);
		};
		prototype.getComponents = function (componentType) {
			return this._displayObject.getComponents(componentType);
		};
		prototype.event = function (type: string, data?: any) {
			return this._displayObject.event(type, data);
		};
		prototype.once = function (type: string, caller: any, listener: Function, args?: any[]) {
			return this._displayObject.once(type, caller, listener, args);
		};
		prototype.offAll = function (type?: string) {
			return this._displayObject.offAll(type);
		};
		prototype.offAllCaller = function (caller: any) {
			return this._displayObject.offAllCaller(caller);
		};
	}

	private static addGTextLangText() {
		const objPrototype = fgui.GObject.prototype;
		objPrototype.langText = function (id: number, ...args: any[]) {
			this.text = $lang(id, ...args);
		};

		const inputPrototype = fgui.GTextInput.prototype;
		inputPrototype.langPrompt = function (id: number, ...args: any[]) {
			this.promptText = $lang(id, ...args);
		};
	}

	private static glistItemClick() {
		const prototype = fgui.GList.prototype;
		prototype["dispatchItemEvent"] = function (item, evt) {
			const _this = this as fgui.GList;
			const index = _this.childIndexToItemIndex(_this.getChildIndex(item));
			_this.displayObject.event(fgui.Events.CLICK_ITEM, [index, item, evt]);
		}
	}

	private static gbuttonDownEffect() {
		const prototype = fgui.GButton.prototype;
		Object.defineProperties(prototype, {
			downEffect: {
				get() { return this._downEffect; },
				set(v) { this._downEffect = v; },
			},
			downEffectValue: {
				get() { return this._downEffectValue; },
				set(v) { this._downEffectValue = v; },
			},
		});
	}
}