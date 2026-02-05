(function (exports, Laya) {
    'use strict';

    class NativeBrowserAdapter extends Laya.BrowserAdapter {
        constructor() {
            super(...arguments);
            this._visible = true;
        }
        init() {
            Laya.Config.fixedFrames = false;
            Laya.Browser.onLayaRuntime = true;
            Laya.Browser.isDomSupported = false;
            Laya.PAL.g = window.conch;
            Laya.PAL.g.setPreferredFramesPerSecond(Laya.Config.FPS);
            if (window.conchConfig.getOS() == "Conch-ios") {
                Laya.Config.enableUniformBufferObject = false;
                Laya.Config.matUseUBO = false;
            }
            Laya.WasmAdapter.instantiateWasm = (wasmFile, imports) => {
                wasmFile = Laya.WasmAdapter.locateFileDefault(wasmFile);
                return Laya.Laya.loader.fetch(wasmFile, "arraybuffer").then(data => {
                    if (data) {
                        let module = new window.WebAssembly.Module(data);
                        let instance = new window.WebAssembly.Instance(module, imports);
                        let ret = {};
                        ret["instance"] = instance;
                        return ret;
                    }
                    else {
                        console.error("WASM file not found: " + wasmFile);
                        return null;
                    }
                });
            };
            let windowInfo = Laya.PAL.g.getWindowInfo();
            this._pixelRatio = windowInfo.pixelRatio;
            let deviceInfo = Laya.PAL.g.getDeviceInfo();
            let platform = deviceInfo.platform || "";
            this.setPlatform("", platform);
            Laya.PAL.g.onShow(() => {
                this._visible = true;
                this.event(Laya.Event.VISIBILITY_CHANGE, true);
                this.event(Laya.Event.FOCUS);
            });
            Laya.PAL.g.onHide(() => {
                this._visible = false;
                this.event(Laya.Event.VISIBILITY_CHANGE, false);
                this.event(Laya.Event.BLUR);
            });
            if (Laya.PAL.hasAPI("onWindowResize")) {
                Laya.PAL.g.onWindowResize(result => {
                    this.event(Laya.Event.RESIZE);
                });
            }
        }
        getVisibility() {
            return this._visible;
        }
        createMainCanvas() {
            this._canvas = Laya.PAL.g.createCanvas();
            this._canvas.id = "layaCanvas";
            return this._canvas;
        }
        createElement(tagName) {
            let ele;
            if (tagName === "canvas" && typeof (Laya.PAL.g.createCanvas) === "function")
                ele = Laya.PAL.g.createCanvas();
            else
                ele = super.createElement(tagName);
            return ele;
        }
        getElementById(id) {
            if (id === this._canvas.id) {
                return this._canvas;
            }
            return null;
        }
        removeElement(ele) {
        }
        get supportArrayBufferURL() {
            return true;
        }
        createBufferURL(data) {
            return Laya.PAL.g.createBufferURL(data);
        }
        revokeBufferURL(url) {
            return Laya.PAL.g.revokeBufferURL(url);
        }
        onCaptureGlobalError(enabled, func) {
            if (enabled) {
                if (Laya.PAL.hasAPI("onError"))
                    Laya.PAL.g.onError(func);
                if (Laya.PAL.g.onUnhandledRejection)
                    Laya.PAL.g.onUnhandledRejection(func);
            }
            else {
                if (Laya.PAL.hasAPI("offError"))
                    Laya.PAL.g.offError(func);
                if (Laya.PAL.g.offUnhandledRejection)
                    Laya.PAL.g.offUnhandledRejection(func);
            }
        }
    }
    Laya.PAL.register("browser", NativeBrowserAdapter);

    class NativeFontAdapter extends Laya.FontAdapter {
        loadFont(task) {
            let fontName = Laya.Utils.replaceFileExtension(Laya.Utils.getBaseName(task.url), "");
            return task.loader.fetch(task.url, "arraybuffer").then(data => {
                if (data)
                    Laya.PAL.g.registerFont(fontName, data);
                return { family: fontName };
            });
        }
    }
    Laya.PAL.register("font", NativeFontAdapter);

    class NativeVideoPlayer extends Laya.VideoPlayerBackend {
        constructor() {
            super(...arguments);
            this._loop = false;
            this._ended = false;
            this._muted = false;
            this._playbackRate = 1;
        }
        get loop() {
            return this._loop;
        }
        set loop(value) {
            this._loop = value;
            if (this.video)
                this.video.loop = value;
        }
        get ended() {
            return this._ended;
        }
        get currentTime() {
            if (this.video)
                return this.video.tell();
            return 0.0;
        }
        set currentTime(value) {
            if (this.video)
                this.video.seek(value * 1000);
        }
        get muted() {
            return this._muted;
        }
        set muted(value) {
            this._muted = value;
            if (this.video)
                this.video.muted = value;
        }
        get playbackRate() {
            return this._playbackRate;
        }
        set playbackRate(value) {
            this._playbackRate = value;
            if (this.video)
                this.video.playbackRate = value;
        }
        onLoad(url) {
            this._ended = false;
            if (this._loaded)
                this.video.destroy();
            this.video = Laya.PAL.g.createVideo(Object.assign({}, this.options, this.getNodeTransform(), {
                src: Laya.URL.postFormatURL(Laya.URL.formatURL(url)),
                autoplay: this._playing,
                loop: this._loop,
                muted: this._muted,
                playbackRate: this._playbackRate,
            }));
            this.video.onEnded(() => this._ended = true);
            this.video.onError((err) => {
                console.error("NativeVideoPlayer: " + Laya.getErrorMsg(err));
            });
            this.setLoaded();
        }
        onPlay() {
            this.video.play();
        }
        onPause() {
            this.video.pause();
        }
        onTransformChanged() {
            if (!this.video)
                return;
            let { x, y, width, height } = this.getNodeTransform();
            this.video.x = x;
            this.video.y = y;
            this.video.width = width;
            this.video.height = height;
        }
        onDestroy() {
            this.video.destroy();
        }
    }

    class NativeVideoTexture extends Laya.VideoTexture {
        constructor() {
            super();
            this._ended = false;
            this._waitFirstFrame = false;
            this.decoder = Laya.PAL.g.createVideoDecoder({
                type: "wemedia"
            });
            this.decoder.on("frame", (res) => {
                this._currentTime = res.pts / 1000;
                if (this._waitFirstFrame) {
                    this._waitFirstFrame = false;
                    if (!this._playing) {
                        this.render(true);
                        this.decoder.wait(true);
                    }
                }
            });
            this.decoder.on("ended", () => {
                if (this._loop)
                    this.decoder.stop().then(() => this.decoder.start(this._startOption));
                else {
                    this._ended = true;
                    this.event("ended");
                }
            });
        }
        get readyState() {
            return this._loaded ? 1 : 0;
        }
        get ended() {
            return this._ended;
        }
        get currentTime() {
            return this._currentTime;
        }
        set currentTime(value) {
            this.decoder.seek(value * 1000);
        }
        onLoad(url) {
            let src = this._source;
            this._ended = false;
            this._waitFirstFrame = false;
            if (this._loaded)
                this.decoder.stop();
            this._loaded = false;
            if (this._source !== src)
                return;
            this._startOption = {};
            this._startOption.source = Laya.URL.postFormatURL(Laya.URL.formatURL(url));
            if (Laya.Browser.isIOSHighPerformanceModePlus)
                this._startOption.videoDataType = 2;
            this.decoder.start(this._startOption).then((res) => {
                this.setLoaded(res.width, res.height, true);
                if (!this._playing)
                    this._waitFirstFrame = true;
            }).catch((err) => {
                console.warn("MgVideoTexture: " + err.message);
            });
        }
        onPlay() {
            this.decoder.wait(false);
        }
        onPause() {
            this.decoder.wait(true);
        }
        onStop() {
            this.decoder.stop();
        }
        onRender() {
            Laya.LayaGL.textureContext.setTextureImageData(this._texture, this.decoder, false, false);
            return true;
        }
        onDestroy() {
            this.decoder.remove();
        }
    }

    class NativeMediaAdapter extends Laya.MediaAdapter {
        init() {
            this.shortAudioClass = Laya.HTMLAudioChannel;
            this.longAudioClass = Laya.HTMLAudioChannel;
            this.videoPlayerClass = NativeVideoPlayer;
            this.videoTextureClass = NativeVideoTexture;
        }
    }
    Laya.PAL.register("media", NativeMediaAdapter);

    class NativeTextInputAdapter extends Laya.TextInputAdapter {
        constructor() {
            super();
            this._editInline = window.conchConfig.getOS() === "Conch-window";
            if (!this._editInline) {
                Laya.PAL.g.onKeyboardInput(this.onKeyboardInput.bind(this));
                Laya.PAL.g.onKeyboardConfirm(this.onKeyboardConfirm.bind(this));
                Laya.PAL.g.onKeyboardComplete(this.onKeyboardComplete.bind(this));
            }
        }
        setText(value) {
            Laya.PAL.g.updateKeyboard({ value });
        }
        onBegin() {
            if (!this._editInline)
                return Promise.resolve();
            this.showInputElement();
            let ele = this._visEle;
            let target = this.target;
            ele.setType(this.target.type);
            ele.setForbidEdit(!this.target.editable);
            ele.setMultiAble(target.multiline);
            if (target.bgColor)
                ele.setBgColor(target.bgColor);
            ele.maxLength = target.maxChars <= 0 ? 1E5 : target.maxChars;
            ele.value = target.text;
            ele.placeholder = target.prompt;
            let style = ele.style;
            style.fontFamily = target.realFont;
            style.color = target.color;
            style.fontSize = target.fontSize + 'px';
            style.whiteSpace = (target.wordWrap ? "pre-wrap" : "nowrap");
            style.lineHeight = (target.leading + target.fontSize) + "px";
            style.fontStyle = (target.italic ? "italic" : "normal");
            style.fontWeight = (target.bold ? "bold" : "normal");
            style.textAlign = target.align;
            style.padding = "0 0";
            style.direction = Laya.Text.RightToLeft ? "rtl" : "";
            this.setPromptColor();
            this.syncTransform();
            Laya.PAL.browser.on(Laya.Event.RESIZE, this, this._onResize);
            Laya.ILaya.stage.on(Laya.Event.RESIZE, this, this.syncTransform);
            return Promise.resolve();
        }
        _onResize() {
            if (Laya.ILaya.stage.screenAdaptationEnabled) {
                Laya.ILaya.stage.event(Laya.Event.WILL_RESIZE);
                Laya.ILaya.stage.updateCanvasSize(true);
            }
        }
        onCanShowKeyboard() {
            if (this._editInline)
                return super.onCanShowKeyboard();
            let target = this.target;
            if (!target.editable)
                return Promise.resolve();
            return new Promise((resolve, reject) => {
                Laya.PAL.g.showKeyboard({
                    defaultValue: target.text,
                    maxLength: target.maxChars <= 0 ? 1E5 : target.maxChars,
                    multiple: target.multiline,
                    confirmHold: true,
                    confirmType: target.confirmType,
                    keyboardType: 'text',
                    success: resolve,
                    fail: reject
                });
            });
        }
        onEnd(target, complete, switching) {
            if (!this._editInline) {
                if (complete || switching)
                    return Promise.resolve();
                return new Promise((resolve, reject) => {
                    Laya.PAL.g.hideKeyboard({ success: resolve, fail: reject });
                });
            }
            else {
                target.text = this._visEle.value;
                this._visEle.blur();
                this.hideInputElement();
                this._visEle = null;
                Laya.PAL.browser.off(Laya.Event.RESIZE, this, this._onResize);
                Laya.ILaya.stage.off(Laya.Event.RESIZE, this, this.syncTransform);
                return Promise.resolve();
            }
        }
        syncTransform() {
            let padding = this.target.padding;
            let { x, y, scaleX, scaleY } = Laya.SpriteUtils.getTransformRelativeToWindow(this.target, padding[3], padding[0]);
            let w = this.target.width - padding[1] - padding[3];
            let h = this.target.height - padding[0] - padding[2];
            this._visEle.setScale(scaleX, scaleY);
            this._visEle.setSize(w, h);
            this._visEle.setPos(x, y);
        }
        hideInputElement() {
            if (this._editInline)
                this._visEle.setPos(-10000, -10000);
        }
        onKeyboardInput(ev) {
            let str = this.validateText(ev.value);
            if (this.updateTargetText(str))
                this.target.event(Laya.Event.INPUT);
        }
        onKeyboardConfirm(ev) {
            if (!this.target)
                return;
            this.onKeyboardInput(ev);
            this.target.event(Laya.Event.ENTER);
            this.end();
        }
        onKeyboardComplete(ev) {
            this.end(true);
        }
    }
    Laya.PAL.register("textInput", NativeTextInputAdapter);

    exports.NativeBrowserAdapter = NativeBrowserAdapter;
    exports.NativeFontAdapter = NativeFontAdapter;
    exports.NativeMediaAdapter = NativeMediaAdapter;
    exports.NativeTextInputAdapter = NativeTextInputAdapter;
    exports.NativeVideoPlayer = NativeVideoPlayer;
    exports.NativeVideoTexture = NativeVideoTexture;

})(window.Laya = window.Laya || {}, Laya);
