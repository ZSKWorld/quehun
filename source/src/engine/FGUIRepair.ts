/** FGUI修复 */
export class FGUIRepair {
	static repair() {
		this.fixGTextField();
		this.fixGImage();
		this.fixGComponent();
		this.fixUIPackageUnload();
		this.fixLoadPackage();
		this.fixGTextInputOverflow();
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
		});
		labelPadding.length = 0;
		labelPadding.push(0, 0, 0, 0);
	}

	private static fixGImage() {
		const prototype = fgui.Image.prototype;
		prototype.size = function (width, height) {
			Laya.Sprite.prototype.size.call(this, width, height);
			this.markChanged(1);
			return this;
		};
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
		};
	}

	private static fixUIPackageUnload() {
		const prototype = fgui.UIPackage.prototype;
		prototype.unloadAssets = function () {
			var cnt = this._items.length;
			for (var i = 0; i < cnt; i++) {
				var pi = this._items[i];
				if (pi.type == fgui.PackageItemType.Atlas) {
					if (pi.texture)
						$loadMgr.clearTextureRes(pi.texture.url);
					else
						$loadMgr.clearTextureRes(pi.file);
				}
			}
		};
		prototype.dispose = function () {
			var cnt = this._items.length;
			for (var i = 0; i < cnt; i++) {
				var pi = this._items[i];
				if (pi.type == fgui.PackageItemType.Atlas) {
					if (pi.texture) {
						pi.texture.destroy();
						pi.texture = null;
					} else
						$loadMgr.clearRes(pi.file);
				}
				else if (pi.type == fgui.PackageItemType.Sound) {
					// Laya.SoundManager.destroySound(pi.file);
					Laya.SoundManager.stopSound(pi.file);
				}
				else if (pi.templet)
					pi.templet.destroy();
			}
			$loadMgr.clearRes(this._resKey + "." + fgui.UIConfig.packageFileExtension);
		};
	}

	private static fixLoadPackage() {
		fgui.UIPackage.loadPackage = function (resKey, completeHandler, progressHandler) {
			let loadKeyArr = [];
			let keys = [];
			let i;
			if (Array.isArray(resKey)) {
				for (i = 0; i < resKey.length; i++) {
					loadKeyArr.push({ url: resKey[i] + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER });
					keys.push(resKey[i]);
				}
			}
			else {
				loadKeyArr = [{ url: resKey + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER }];
				keys = [resKey];
			}
			let pkgArr = [];
			let pkg;
			for (i = 0; i < loadKeyArr.length; i++) {
				pkg = fgui.UIPackage["_instById"][keys[i]];
				if (pkg) {
					pkgArr.push(pkg);
					loadKeyArr.splice(i, 1);
					keys.splice(i, 1);
					i--;
				}
			}
			//zsk start
			// if (loadKeyArr.length == 0 && completeHandler) {
			//     typeof completeHandler === 'function' ? completeHandler(pkgArr) : completeHandler.runWith([pkgArr]);
			//     return;
			// }
			if (loadKeyArr.length == 0) {
				if (progressHandler)
					typeof progressHandler === 'function' ? progressHandler(1) : progressHandler.runWith(1);
				if (completeHandler)
					typeof completeHandler === 'function' ? completeHandler(pkgArr) : completeHandler.runWith([pkgArr]);
				return;
			}
			//zsk end
			fgui.AssetProxy.inst.load(loadKeyArr, Laya.Loader.BUFFER).then((resArr) => {
				let pkg;
				let urls = [];
				for (i = 0; i < loadKeyArr.length; i++) {
					let asset = resArr[i];
					if (asset) {
						pkg = new fgui.UIPackage();
						pkgArr.push(pkg);
						pkg._resKey = keys[i];
						pkg.loadPackage(new fgui.ByteBuffer(asset.data));
						let cnt = pkg._items.length;
						for (let j = 0; j < cnt; j++) {
							let pi = pkg._items[j];
							if (pi.type == fgui.PackageItemType.Atlas) {
								urls.push({ url: pi.file, type: Laya.Loader.IMAGE });
							}
							else if (pi.type == fgui.PackageItemType.Sound) {
								urls.push({ url: pi.file, type: Laya.Loader.SOUND });
							}
						}
					}
				}
				if (urls.length > 0) {
					fgui.AssetProxy.inst.load(urls, null, (progress) => {
						if (progressHandler)
							typeof progressHandler === 'function' ? progressHandler(progress) : progressHandler.runWith(progress);
					}).then(() => {
						for (i = 0; i < pkgArr.length; i++) {
							pkg = pkgArr[i];
							if (!fgui.UIPackage["_instById"][pkg.id]) {
								fgui.UIPackage["_instById"][pkg.id] = pkg;
								fgui.UIPackage["_instByName"][pkg.name] = pkg;
								fgui.UIPackage["_instById"][pkg._resKey] = pkg;
							}
						}
						//zsk start
						// typeof completeHandler === 'function' ? completeHandler(pkgArr) : completeHandler.runWith([pkgArr]);
						if (completeHandler)
							typeof completeHandler === 'function' ? completeHandler(pkgArr) : completeHandler.runWith([pkgArr]);
						//zsk end
					});
				}
				else {
					for (i = 0; i < pkgArr.length; i++) {
						pkg = pkgArr[i];
						if (!fgui.UIPackage["_instById"][pkg.id]) {
							fgui.UIPackage["_instById"][pkg.id] = pkg;
							fgui.UIPackage["_instByName"][pkg.name] = pkg;
							fgui.UIPackage["_instById"][pkg._resKey] = pkg;
						}
					}
					//zsk start
					if (progressHandler)
						typeof progressHandler === 'function' ? progressHandler(1) : progressHandler.runWith(1);
					//zsk end
					if (completeHandler)
						typeof completeHandler === 'function' ? completeHandler(pkgArr) : completeHandler.runWith([pkgArr]);
				}
			});
		};
	}

	private static fixGTextInputOverflow() {
		const prototype = fgui.GTextInput.prototype;

		prototype["updateAutoSize"] = function () {
			this._displayObject.wordWrap = !this._widthAutoSize && !this._singleLine;
			this._displayObject.overflow = this._autoSize == fgui.AutoSizeType.Shrink ? "shrink" : (this._autoSize == fgui.AutoSizeType.Ellipsis ? "ellipsis" : "scroll");
			if (!this._underConstruct) {
				if (!this._heightAutoSize)
					this._displayObject.size(this.width, this.height);
				else if (!this._widthAutoSize)
					this._displayObject.width = this.width;
			}
		};
	}
}