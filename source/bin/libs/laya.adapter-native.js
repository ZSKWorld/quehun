(function (exports, Laya) {
    'use strict';

    class NativeBrowserAdapter extends Laya.BrowserAdapter {
        init() {
            Laya.Config.fixedFrames = false;
            Laya.Browser.onLayaRuntime = true;
            Laya.Browser.isDomSupported = false;
            Laya.PAL.g = window.conch;
            Laya.WasmAdapter.instantiateWasm = (wasmFile, imports) => {
                return Laya.Laya.loader.fetch("libs/" + wasmFile, "arraybuffer").then(data => {
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
            Laya.Laya.addAfterInitCallback(() => {
                Laya.PAL.g.setGlobalRepaint(Laya.Render.setGlobalRepaint);
            });
            super.init();
        }
        createMainCanvas() {
            let canvas = this.createElement("canvas");
            Laya.Browser.document.body.appendChild(canvas);
            return canvas;
        }
        get supportArrayBufferURL() {
            return true;
        }
        createBufferURL(data) {
            return window.wx.createBufferURL(data);
        }
        revokeBufferURL(url) {
            return window.wx.revokeBufferURL(url);
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
            return Promise.resolve();
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
                return Promise.resolve();
            }
        }
        syncTransform() {
            let t = this.getTargetTransform();
            if (t != null) {
                this._visEle.setScale(t.scaleX, t.scaleY);
                this._visEle.setSize(t.width, t.height);
                this._visEle.setPos(t.x, t.y);
            }
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
    exports.NativeTextInputAdapter = NativeTextInputAdapter;

})(window.Laya = window.Laya || {}, Laya);
