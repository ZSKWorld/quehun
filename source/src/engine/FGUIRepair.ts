/** FGUI修复 */
export class FGUIRepair {
	static repair() {
		this.fixPlayTransitionAction();
		this.fixGTextInput();
		this.fixGTextField();
		this.fixGImage();
		this.fixGComponent();
	}


	/** 修改控制器动效播放机制为每次都从头播放 */
	private static fixPlayTransitionAction() {
		const prototype = fgui.PlayTransitionAction.prototype;
		prototype["enter"] = function (controller: fgui.Controller) {
			if (!this._currentTransition) {
				this._currentTransition = controller.parent.getTransition(this.transitionName);
			}
			this._currentTransition.play(null, this.playTimes, this.delay);
		}
	}

	/** 修复gui 输入框自动换行 */
	private static fixGTextInput() {
		// const prototype = fgui.GTextInput.prototype;
		// Object.defineProperty(prototype, "singleLine", {
		// 	get() {
		// 		return !this._displayObject.multiline;
		// 	},
		// 	set(v) {
		// 		this._displayObject.multiline = !v;
		// 		this._displayObject.wordWrap = !v;
		// 	}
		// });
	}

	private static fixGTextField() {
		const prototype = fgui.GTextField.prototype;
		Object.defineProperties(prototype, {
			"text": {
				get() {
					return this._displayObject.text;
				},
				set(value) {
					this._displayObject.text = value;
					this.ensureSizeCorrect();
				},
			}
		})
	}

	private static fixGImage() {
		const prototype = fgui.Image.prototype;
		prototype.size = function (width, height) {
			Laya.Sprite.prototype.size.call(this, width, height);
			this.markChanged(1);
			return this;
		}
	}

	private static fixGComponent() {
		const prototype = fgui.GComponent.prototype;
		prototype["updateBounds"] = function () {
			var ax = 0, ay = 0, aw = 0, ah = 0;
			var len = this._children.length;
			if (len > 0) {
				ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
				var ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
				var tmp = 0;
				var i1 = 0;
				for (i1 = 0; i1 < len; i1++) {
					var child = this._children[i1];
					tmp = child.x;
					if (tmp < ax)
						ax = tmp;
					tmp = child.y;
					if (tmp < ay)
						ay = tmp;
					tmp = child.x + child.actualWidth * (1 - child.pivotX);
					if (tmp > ar)
						ar = tmp;
					tmp = child.y + child.actualHeight * (1 - child.pivotY);
					if (tmp > ab)
						ab = tmp;
				}
				aw = ar - ax;
				ah = ab - ay;
			}
			this.setBounds(ax, ay, aw, ah);
		}
	}
}