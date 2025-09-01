(function (exports, Laya) {
    'use strict';

    const GROUP_COUNT = 5;
    class MgCacheManager {
        constructor(cacheRoot) {
            this.minClearSpace = (5 * 1024 * 1024);
            this.spaceLimit = (200 * 1024 * 1024);
            this.processInterval = 2000;
            this.totalFileSize = 0;
            this.running = false;
            this.lastGroup = -1;
            this.lastGroupUsed = 0;
            this.toClearAll = false;
            this.cacheRoot = cacheRoot;
            this.fileCache = new Map();
            this.cacheGroups = new Array(GROUP_COUNT);
            this.cacheGroups.fill(0);
            this.cacheRequest = [];
            this.toSaveManifestFlags = new Array(GROUP_COUNT);
        }
        start() {
            this.checkAndDeleteOldCacheDir();
            return this.createCacheDirs().then(() => this.loadAllManifests()).then(() => {
                Laya.ILaya.systemTimer.loop(this.processInterval, this, this.process);
            });
        }
        getFile(url) {
            let info = this.fileCache.get(url);
            if (!info)
                return Promise.resolve(null);
            info.accessTime = this.toSaveManifestRequest = Laya.Browser.now();
            this.toSaveManifestFlags[info.group] = true;
            let cacheFilePath = `${this.cacheRoot}/${info.group}/${info.fileName}`;
            return Laya.PAL.fs.exists(cacheFilePath).then(exists => exists ? cacheFilePath : null);
        }
        addFile(url, tempFilePath) {
            Laya.PAL.fs.getFileSize(tempFilePath).then(size => this.cacheRequest.push({ url, tempFilePath, size }))
                .catch(err => {
                console.warn("[Cache]get file size error", Laya.getErrorMsg(err));
            });
        }
        clearAllCache() {
            this.toClearAll = true;
        }
        process() {
            if (this.running)
                return;
            if (this.toClearAll) {
                this.running = true;
                this.doClearAllCache().then(() => {
                    this.running = false;
                    this.toClearAll = false;
                });
                return;
            }
            if (this.cacheRequest.length === 0) {
                if (this.toSaveManifestRequest != null && Laya.Browser.now() - this.toSaveManifestRequest > 5000) {
                    this.toSaveManifestRequest = null;
                    this.running = true;
                    this.saveDirtyManifests().then(() => {
                        this.running = false;
                    });
                }
                return;
            }
            this.running = true;
            let files = this.cacheRequest.concat();
            this.cacheRequest.length = 0;
            let group = this.selectGroup(files.length);
            let needSpace = 0;
            for (let info of files)
                needSpace += info.size;
            let toClearSpace = this.totalFileSize + needSpace - this.spaceLimit;
            (toClearSpace >= 0 ? this.clearSpace(toClearSpace) : Promise.resolve())
                .then(() => this.addFilesToCache(files, group))
                .then(() => this.saveDirtyManifests())
                .then(() => this.running = false);
        }
        selectGroup(fileCount) {
            if (this.lastGroup >= 0 && this.lastGroupUsed < 50) {
                this.lastGroupUsed += fileCount;
                return this.lastGroup;
            }
            let min = Number.MAX_VALUE;
            let j;
            for (let i = 0; i < GROUP_COUNT; i++) {
                if (this.cacheGroups[i] < min - 50) {
                    min = this.cacheGroups[i];
                    j = i;
                }
            }
            this.lastGroup = j;
            this.lastGroupUsed = fileCount;
            return j;
        }
        deleteFile(info) {
            this.fileCache.delete(info.url);
            this.totalFileSize -= info.size;
            this.cacheGroups[info.group]--;
            let fielName = `${this.cacheRoot}/${info.group}/${info.fileName}`;
            return Laya.PAL.fs.unlink(fielName).catch(err => {
                console.error("[Cache]delete cache file", Laya.getErrorMsg(err));
            });
        }
        addFilesToCache(files, group) {
            for (let { url, tempFilePath, size } of files) {
                let info = this.fileCache.get(url);
                if (info) {
                    this.cacheGroups[info.group]--;
                    this.totalFileSize -= info.size;
                    this.fileCache.delete(url);
                    info.accessTime = Laya.Browser.now();
                    info.size = size;
                }
                else {
                    info = {
                        group,
                        url,
                        size,
                        fileName: Laya.Utils.getBaseName(tempFilePath),
                        accessTime: Laya.Browser.now()
                    };
                }
                this.fileCache.set(url, info);
                this.cacheGroups[info.group]++;
                this.totalFileSize += size;
            }
            return this.saveManifest(group).then(() => {
                return Laya.Utils.runTasks(files, 5, ({ url, tempFilePath }) => {
                    let info = this.fileCache.get(url);
                    let saveFilePath = `${this.cacheRoot}/${group}/${info.fileName}`;
                    return Laya.PAL.fs.copyFile(tempFilePath, saveFilePath)
                        .catch(err => {
                        console.warn("[Cache]create cache file", Laya.getErrorMsg(err));
                    });
                });
            });
        }
        clearSpace(sizeToClear) {
            let t = Laya.Browser.now();
            sizeToClear += this.minClearSpace;
            let totalSize = 0;
            let arr = Array.from(this.fileCache.values());
            arr.sort((a, b) => a.accessTime - b.accessTime);
            let i = 0;
            for (let n = arr.length; i < n; i++) {
                let info = arr[i];
                totalSize += info.size;
                this.toSaveManifestFlags[info.group] = true;
                if (totalSize >= sizeToClear)
                    break;
            }
            return Laya.Utils.runTasks(arr.slice(0, i + 1), 20, (info) => this.deleteFile(info)).then(() => {
                console.log(`[Cache]cleared ${arr.length} files/${totalSize} bytes in ${Laya.Browser.now() - t}ms`);
            });
        }
        doClearAllCache() {
            return Laya.PAL.fs.rmdir(this.cacheRoot, { recursive: true }).catch(err => {
                console.warn("[Cache]failed to delete cache folder", Laya.getErrorMsg(err));
            }).then(() => this.createCacheDirs()).then(() => {
                this.fileCache.clear();
                this.cacheGroups.fill(0);
                this.totalFileSize = 0;
                this.toSaveManifestFlags.fill(false);
            });
        }
        loadAllManifests() {
            return Laya.PAL.fs.readdir(this.cacheRoot).then(files => {
                return Promise.all(files.map(fileName => {
                    if (fileName.startsWith("manifest-")) {
                        let group = parseInt(fileName.substring(9, fileName.length - 4));
                        if (!isNaN(group) && group >= 0 && group < GROUP_COUNT) {
                            return this.loadManifest(group);
                        }
                    }
                    return Promise.resolve();
                }));
            });
        }
        loadManifest(group) {
            return Laya.PAL.fs.readFile(`${this.cacheRoot}/manifest-${group}.bin`).then((data) => {
                let bytes = new Laya.Byte(data);
                bytes.readInt16();
                let url;
                let fileName;
                let accessTime;
                let size;
                let fileCnt = 0;
                let bytesTotal = 0;
                while (bytes.bytesAvailable > 0) {
                    let pos = bytes.pos;
                    let len = bytes.readUint32();
                    url = bytes.readUTFString();
                    fileName = bytes.readUTFString();
                    accessTime = bytes.readUint32();
                    size = bytes.readUint32();
                    bytes.pos = pos + len;
                    let info = {
                        group,
                        url,
                        fileName,
                        accessTime,
                        size
                    };
                    this.fileCache.set(url, info);
                    bytesTotal += size;
                    fileCnt++;
                }
                this.cacheGroups[group] = fileCnt;
                this.totalFileSize += bytesTotal;
                console.log(`[Cache]load manifest-${group} ${fileCnt}(files)/${bytesTotal}(bytes)`);
            }).catch(err => {
                console.error(`[Cache]load manifest-${group}`, Laya.getErrorMsg(err));
            });
        }
        saveDirtyManifests() {
            return Promise.all(this.toSaveManifestFlags.filter(needSave => needSave)
                .map((_, index) => this.saveManifest(index)));
        }
        saveManifest(group) {
            let bytes = new Laya.Byte();
            bytes.writeInt16(1);
            let fileCnt = 0;
            let bytesTotal = 0;
            for (let info of this.fileCache.values()) {
                if (info.group === group) {
                    let pos = bytes.pos;
                    bytes.writeUint32(0);
                    bytes.writeUTFString(info.url);
                    bytes.writeUTFString(info.fileName);
                    bytes.writeUint32(info.accessTime);
                    bytes.writeUint32(info.size);
                    let writePos = pos;
                    pos = bytes.pos;
                    bytes.pos = writePos;
                    bytes.writeUint32(pos - writePos);
                    bytes.pos = pos;
                    fileCnt++;
                    bytesTotal += info.size;
                }
            }
            return Laya.PAL.fs.writeFile(`${this.cacheRoot}/manifest-${group}.bin`, bytes.buffer).then(() => {
                this.toSaveManifestFlags[group] = false;
                console.log(`[Cache]save manifest-${group} ${fileCnt}(files)/${bytesTotal}(bytes)`);
            }).catch(err => {
                console.error(`[Cache]save manifest-${group}`, Laya.getErrorMsg(err));
            });
        }
        createCacheDirs() {
            return Promise.all(this.cacheGroups.map((_, index) => {
                let path = `${this.cacheRoot}/${index}`;
                return Laya.PAL.fs.exists(path).then(exists => {
                    if (!exists)
                        return Laya.PAL.fs.mkdir(path, { recursive: true }).catch(err => {
                            console.error("[Cache]failed to create cache dir", Laya.getErrorMsg(err));
                        });
                    else
                        return Promise.resolve();
                });
            }));
        }
        checkAndDeleteOldCacheDir() {
            let oldCacheDir = this.cacheRoot.substring(0, this.cacheRoot.lastIndexOf("/")) + "/layaairGame";
            return Laya.PAL.fs.exists(oldCacheDir).then(oldExists => {
                if (oldExists) {
                    console.log("[Cache]delete old cache folder");
                    return Laya.PAL.fs.rmdir(oldCacheDir, { recursive: true }).catch(err => {
                        console.warn("[Cache]failed to delete old cache folder", Laya.getErrorMsg(err));
                    });
                }
                else
                    return Promise.resolve();
            });
        }
    }

    class MgDownloader extends Laya.Downloader {
        constructor() {
            super();
            this.escapeZhCharsInURL = true;
            this.supportSubPackageMultiLevelFolders = true;
            let old = Laya.URL.postFormatURL;
            Laya.URL.postFormatURL = url => {
                url = this.checkSubpackagePrefix(url);
                return old.call(this, url);
            };
            if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame)
                this.supportSubPackageMultiLevelFolders = false;
            if (Laya.Browser.onWXMiniGame)
                this.escapeZhCharsInURL = false;
            let cacheRoot;
            if (Laya.Browser.onVVMiniGame)
                cacheRoot = "internal://files/layaCache";
            else
                cacheRoot = Laya.PAL.g.env.USER_DATA_PATH + "/layaCache";
            this.cacheManager = new MgCacheManager(cacheRoot);
        }
        common(owner, url, originalUrl, contentType, onProgress, onComplete) {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                if (contentType === "filePath")
                    onComplete(url);
                this.readFile(url, contentType, onComplete);
                return;
            }
            Promise.resolve().then(() => {
                if (this.cacheManager)
                    return this.cacheManager.getFile(url);
                else
                    return Promise.resolve(null);
            }).then(cacheFilePath => {
                if (cacheFilePath) {
                    if (contentType === "filePath")
                        onComplete(cacheFilePath);
                    else
                        this.readFile(cacheFilePath, contentType, onComplete);
                }
                else {
                    this.downloadFile(url, onProgress, (filePath, error) => {
                        if (filePath) {
                            if (contentType === "filePath")
                                onComplete(filePath);
                            else
                                this.readFile(filePath, contentType, onComplete);
                        }
                        else
                            onComplete(null, error);
                    });
                }
            });
        }
        image(owner, url, originalUrl, onProgress, onComplete) {
            if (!url.startsWith("http://") && !url.startsWith("https://") || !this.cacheManager) {
                super.image(owner, url, originalUrl, onProgress, onComplete);
                return;
            }
            this.cacheManager.getFile(url).then(cacheFilePath => {
                if (cacheFilePath)
                    super.image(owner, cacheFilePath, originalUrl, onProgress, onComplete);
                else {
                    this.downloadFile(url, onProgress, (filePath, error) => {
                        if (filePath)
                            super.image(owner, filePath, originalUrl, onProgress, onComplete);
                        else
                            onComplete(null, error);
                    });
                }
            });
        }
        package(path, onProgress, onComplete) {
            let packageName = path;
            if (!this.supportSubPackageMultiLevelFolders) {
                packageName = path.replace(/\//g, ".");
                if (packageName !== path) {
                    if (!this.subPackages)
                        this.subPackages = {};
                    this.subPackages[path] = packageName;
                }
            }
            let loadTask = Laya.PAL.g.loadSubpackage({
                name: packageName,
                success: () => {
                    onComplete(null);
                },
                fail: err => {
                    onComplete(null, Laya.getErrorMsg(err));
                },
                complete: null
            });
            onProgress && loadTask.onProgressUpdate && loadTask.onProgressUpdate(res => onProgress(res.progress));
        }
        downloadFile(url, onProgress, onComplete) {
            let task = Laya.PAL.g.downloadFile({
                url: this.escapeURL(url),
                success: (res) => {
                    if (res.statusCode == null || res.statusCode === 200) {
                        let filePath = res.tempFilePath || res.apFilePath;
                        if (this.cacheManager)
                            this.cacheManager.addFile(url, filePath);
                        onComplete(filePath);
                    }
                    else {
                        onComplete(null, Laya.getErrorMsg(res));
                    }
                },
                fail: (err) => onComplete(null, Laya.getErrorMsg(err))
            });
            if (onProgress && task && task.onProgressUpdate) {
                task.onProgressUpdate((res) => {
                    onProgress(res.progress);
                });
            }
        }
        readFile(url, contentType, onComplete) {
            let filePath = this.urlToFilePath(url);
            Laya.PAL.fs.readFile(filePath, contentType === "arraybuffer" ? "" : "utf8").then(data => {
                switch (contentType) {
                    case "json":
                        onComplete(JSON.parse(data));
                        break;
                    case "xml":
                        onComplete(new Laya.XML(data));
                        break;
                    default:
                        onComplete(data);
                        break;
                }
            }).catch(err => onComplete(null, Laya.getErrorMsg(err)));
        }
        urlToFilePath(url) {
            let i = url.lastIndexOf("?");
            if (i != -1)
                return url.substring(0, i);
            else
                return url;
        }
        checkSubpackagePrefix(url) {
            if (!this.supportSubPackageMultiLevelFolders && this.subPackages) {
                for (let k in this.subPackages) {
                    if (url.startsWith(k)) {
                        url = this.subPackages[k] + url.substring(k.length);
                        break;
                    }
                }
            }
            return url;
        }
        escapeURL(url) {
            if (!this.escapeZhCharsInURL)
                return url;
            let str = "";
            let len = url.length;
            for (let i = 0; i < len; i++) {
                let word = url[i];
                if (IGNORE.test(word)) {
                    str += word;
                }
                else {
                    try {
                        str += encodeURI(word);
                    }
                    catch (e) {
                        console.warn("errorInfo", ">>>" + word);
                    }
                }
            }
            return str;
        }
    }
    const IGNORE = new RegExp("[-_.!~*'();/?:@&=+$,#%]|[0-9|A-Z|a-z]");

    class MgWebSocket {
        open(url, options) {
            let failed = false;
            this.ws = Laya.PAL.g.connectSocket(Object.assign({
                url,
                multiple: true,
                fail: (err) => {
                    failed = true;
                    this.onError(err);
                }
            }, options));
            if (this.ws == null || failed) {
                this.ws = null;
                return;
            }
            this.ws.onOpen(res => this.onOpen(res));
            this.ws.onClose(() => this.onClose());
            this.ws.onError(err => this.onError(err));
            this.ws.onMessage(msg => {
                if (msg.data)
                    this.onMessage(msg.data);
            });
        }
        close() {
            if (this.ws)
                this.ws.close({});
        }
        send(data) {
            if (this.ws == null)
                return Promise.reject("WebSocket is not open");
            return new Promise((resolve, reject) => {
                this.ws.send({
                    data,
                    success: () => resolve(),
                    fail: (e) => reject(e)
                });
            });
        }
    }

    class MgBrowserAdapter extends Laya.BrowserAdapter {
        constructor() {
            super(...arguments);
            this.webSocketClass = MgWebSocket;
        }
        init() {
            var _a;
            if (!console.time) {
                console.time = function (name) {
                };
                console.timeEnd = function (name) {
                    console.log(name);
                };
            }
            Laya.Browser.isDomSupported = false;
            (_a = MgBrowserAdapter.beforeInit) === null || _a === void 0 ? void 0 : _a.call(MgBrowserAdapter);
            let platform = "";
            if (Laya.PAL.g.getSystemInfoSync) {
                let systemInfo = Laya.PAL.g.getSystemInfoSync();
                this._pixelRatio = systemInfo.pixelRatio;
                this._orientation = systemInfo.deviceOrientation === "landscape" ? "landscape-primary" : "portrait-primary";
                platform = systemInfo.platform || "";
            }
            else if (Laya.PAL.g.getWindowInfo) {
                let windowInfo = Laya.PAL.g.getWindowInfo();
                this._pixelRatio = windowInfo.pixelRatio;
                if (Laya.PAL.g.getDeviceInfo) {
                    let deviceInfo = Laya.PAL.g.getDeviceInfo();
                    platform = deviceInfo.platform || "";
                }
            }
            if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
                this._pixelRatio = window.devicePixelRatio;
            }
            this.setPlatform("", platform);
            const { SDKVersion } = Laya.PAL.g.getAppBaseInfo ? Laya.PAL.g.getAppBaseInfo() : Laya.PAL.g.getSystemInfoSync();
            Laya.Browser.SDKVersion = SDKVersion || "";
            const { system } = Laya.PAL.g.getDeviceInfo ? Laya.PAL.g.getDeviceInfo() : Laya.PAL.g.getSystemInfoSync();
            const systemVersionArr = system ? system.split(' ') : [];
            Laya.Browser.systemVersion = systemVersionArr.length ? systemVersionArr[systemVersionArr.length - 1] : '';
            Laya.TextRenderConfig.useImageData = false;
            if (Laya.Browser.platform === Laya.Browser.PLATFORM_IOS && Laya.Utils.compareVersion(Laya.Browser.systemVersion, "10.1.1") === 0)
                Laya.TextRenderConfig.useImageData = true;
            this._visible = true;
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
            if (Laya.PAL.g.onWindowResize) {
                Laya.PAL.g.onWindowResize(result => {
                    this.event(Laya.Event.RESIZE);
                });
            }
        }
        start() {
            var _a;
            let downloader = Laya.Loader.downloader = new MgDownloader();
            this.setupWasmSupport();
            (_a = MgBrowserAdapter.afterInit) === null || _a === void 0 ? void 0 : _a.call(MgBrowserAdapter);
            return downloader.cacheManager.start();
        }
        onInitRender() {
            if (Laya.Browser.onAlipayMiniGame || Laya.Browser.onTBMiniGame) {
                Laya.LayaGL.renderEngine._supportCapatable.turnOffSRGB();
            }
            if (Laya.Browser.onTBMiniGame) {
                if (!Laya.PAL.g.isIDE) {
                    let gl = Laya.LayaGL.renderEngine._context;
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                }
            }
        }
        setupWasmSupport() {
            let wasmGlobal;
            if (Laya.Browser.onWXMiniGame)
                wasmGlobal = window.WXWebAssembly;
            else if (Laya.Browser.onAlipayMiniGame)
                wasmGlobal = window.MYWebAssembly;
            else if (Laya.Browser.onTTMiniGame)
                wasmGlobal = window.TTWebAssembly;
            if (wasmGlobal) {
                if (!window.WebAssembly)
                    window.WebAssembly = {};
                Laya.WasmAdapter.Memory = wasmGlobal.Memory;
                Laya.WasmAdapter.instantiateWasm = (wasmFile, imports) => {
                    return wasmGlobal.instantiate((Laya.PlayerConfig.wasmSubpackage || "libs") + "/" + wasmFile, imports);
                };
            }
            else if (window.WebAssembly) {
                let shouldInit = Laya.PAL.g.setWasmTaskCompile != null;
                Laya.WasmAdapter.instantiateWasm = (wasmFile, imports) => {
                    return Laya.Laya.loader.fetch((Laya.PlayerConfig.wasmSubpackage || "libs") + "/" + wasmFile, "arraybuffer").then(data => {
                        if (data) {
                            if (shouldInit) {
                                shouldInit = false;
                                Laya.PAL.g.setWasmTaskCompile(true);
                            }
                            return window.WebAssembly.instantiate(data, imports);
                        }
                        else {
                            console.error("WASM file not found: " + wasmFile);
                            return null;
                        }
                    });
                };
            }
        }
        getVisibility() {
            return this._visible;
        }
        getScreenOrientation() {
            return this._orientation;
        }
        createMainCanvas() {
            if (Laya.Browser.onTBMiniGame) {
                return window.screencanvas
                    || window.canvas.getRealCanvas();
            }
            else
                return window.canvas || window.__canvas;
        }
        createElement(tagName) {
            var _a;
            let ele;
            if (tagName === "canvas" && typeof (Laya.PAL.g.createCanvas) === "function")
                ele = Laya.PAL.g.createCanvas();
            else
                ele = super.createElement(tagName);
            if (!ele.style)
                ele.style = {};
            else if (ele.style === ((_a = window.canvas) === null || _a === void 0 ? void 0 : _a.style))
                ele.style = {};
            return ele;
        }
        setCursor(cursor) {
            if (!Laya.PAL.g.setCursor)
                return;
            let arr = cursor.split(" ");
            let x = arr[1] ? parseInt(arr[1].trim()) : 0;
            let y = arr[2] ? parseInt(arr[2].trim()) : 0;
            let i = arr[0].indexOf("url(");
            if (i != -1) {
                let j = arr[0].indexOf(")");
                if (j != -1)
                    arr[0] = arr[0].substring(i + 4, j);
            }
            if (isNaN(x) || isNaN(y))
                x = y = undefined;
            Laya.PAL.g.setCursor(arr[0], x, y);
        }
        get supportArrayBufferURL() {
            return Laya.PAL.g.createBufferURL != null && Laya.PAL.g.revokeBufferURL != null;
        }
        createBufferURL(data) {
            return Laya.PAL.g.createBufferURL(data);
        }
        revokeBufferURL(url) {
            return Laya.PAL.g.revokeBufferURL(url);
        }
        getOpenDataContextCanvas() {
            return window.sharedCanvas;
        }
        postMessageToOpenDataContext(msg) {
            if (Laya.PAL.g.getOpenDataContext)
                Laya.PAL.g.getOpenDataContext().postMessage(msg);
        }
        onCaptureGlobalError(enabled, func) {
            if (enabled) {
                if (Laya.PAL.g.onError)
                    Laya.PAL.g.onError(func);
                if (Laya.PAL.g.onUnhandledRejection)
                    Laya.PAL.g.onUnhandledRejection(func);
            }
            else {
                if (Laya.PAL.g.offError)
                    Laya.PAL.g.offError(func);
                if (Laya.PAL.g.offUnhandledRejection)
                    Laya.PAL.g.offUnhandledRejection(func);
            }
        }
        alert(msg) {
            if (typeof (window.alert) === "function") {
                window.alert.call(null, msg);
            }
            else {
                console.warn("alert is not a function");
            }
        }
    }
    Laya.PAL.register("browser", MgBrowserAdapter);

    MgBrowserAdapter.beforeInit = function () {
        Laya.Browser.onAlipayMiniGame = true;
        Laya.PAL.g = window.my;
    };

    function ImageDataPolyfill() {
        let width, height, data;
        if (arguments.length == 3) {
            if (arguments[0] instanceof Uint8ClampedArray) {
                if (arguments[0].length % 4 !== 0) {
                    throw new Error("Failed to construct 'ImageData': The input data length is not a multiple of 4.");
                }
                if (arguments[0].length !== arguments[1] * arguments[2] * 4) {
                    throw new Error("Failed to construct 'ImageData': The input data length is not equal to (4 * width * height).");
                }
                else {
                    data = arguments[0];
                    width = arguments[1];
                    height = arguments[2];
                }
            }
            else {
                throw new Error("Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.");
            }
        }
        else if (arguments.length == 2) {
            width = arguments[0];
            height = arguments[1];
            data = new Uint8ClampedArray(arguments[0] * arguments[1] * 4);
        }
        else if (arguments.length < 2) {
            throw new Error("Failed to construct 'ImageData': 2 arguments required, but only " + arguments.length + " present.");
        }
        let imgdata = Laya.Browser.canvas.getContext("2d").getImageData(0, 0, width, height);
        for (let i = 0; i < data.length; i += 4) {
            imgdata.data[i] = data[i];
            imgdata.data[i + 1] = data[i + 1];
            imgdata.data[i + 2] = data[i + 2];
            imgdata.data[i + 3] = data[i + 3];
        }
        return imgdata;
    }
    if (!window.ImageData) {
        window.ImageData = ImageDataPolyfill;
    }

    class MgDeviceAdapter extends Laya.DeviceAdapter {
        constructor() {
            super();
            this._watchId = 1;
            this._watchDic = new Map();
            this._accInfo = { x: 0, y: 0, z: 0 };
            this._rotInfo = { alpha: 0, beta: 0, gamma: 0, absolute: false, compassAccuracy: 0 };
        }
        get supportedLocation() {
            return !!(Laya.PAL.g.getFuzzyLocation || Laya.PAL.g.getLocation);
        }
        getCurrentPosition(successCallback, errorCallback, options) {
            if (Laya.PAL.g.getFuzzyLocation)
                Laya.PAL.g.getFuzzyLocation({
                    type: 'gcj02',
                    success: (res) => {
                        successCallback({
                            latitude: res.latitude,
                            longitude: res.longitude,
                            timestamp: Date.now()
                        });
                    },
                    fail: (err) => {
                        errorCallback === null || errorCallback === void 0 ? void 0 : errorCallback({ code: 1, message: err.errMsg });
                    }
                });
            else {
                Laya.PAL.g.getLocation({
                    type: 'gcj02',
                    success: (res) => {
                        successCallback({
                            latitude: res.latitude,
                            longitude: res.longitude,
                            speed: res.speed,
                            altitude: res.altitude,
                            accuracy: res.accuracy,
                            timestamp: Date.now()
                        });
                    },
                    fail: (err) => {
                        errorCallback === null || errorCallback === void 0 ? void 0 : errorCallback({ code: 1, message: err.errMsg });
                    }
                });
            }
        }
        watchPosition(successCallback, errorCallback, options) {
            if (this._watchDic.size === 0) {
                Laya.ILaya.systemTimer.loop(1000, this, this.onUpdate);
                this._watchOptions = options;
            }
            this._watchId++;
            this._watchDic.set(this._watchId, { successCallback, errorCallback });
            return this._watchId;
        }
        clearWatchPosition(id) {
            this._watchDic.delete(id);
            if (this._watchDic.size === 0) {
                Laya.ILaya.systemTimer.clear(this, this.onUpdate);
                this._watchOptions = null;
            }
        }
        onUpdate() {
            let callbacks = Array.from(this._watchDic.values());
            this.getCurrentPosition(info => callbacks.forEach(callback => callback.successCallback(info)), err => callbacks.forEach(callback => { var _a; return (_a = callback.errorCallback) === null || _a === void 0 ? void 0 : _a.call(callback, err); }), this._watchOptions);
        }
        startListeningDeviceMotion() {
            Laya.PAL.g.startAccelerometer({ interval: "game" });
            Laya.PAL.g.onAccelerometerChange(res => {
                Object.assign(this._accInfo, res);
                this.event("devicemotion", [this._accInfo, this._accInfo, {}, 0]);
            });
        }
        startListeningDeviceOrientation() {
            Laya.PAL.g.startGyroscope({ interval: "game" });
            Laya.PAL.g.onGyroscopeChange(res => {
                this._rotInfo.alpha = res.z;
                this._rotInfo.beta = res.x;
                this._rotInfo.gamma = res.y;
                this.event("deviceorientation", [true, this._rotInfo]);
            });
        }
    }
    Laya.PAL.register("device", MgDeviceAdapter);

    class MgFileSystemAdapter extends Laya.FileSystemAdapter {
        constructor() {
            super();
            this.hasAccess = false;
            this.fs = Laya.PAL.g.getFileSystemManager();
            this.hasAccess = typeof (this.fs.access) === "function";
        }
        readFile(path, encoding) {
            return new Promise((resolve, reject) => {
                var _a;
                this.fs.readFile({
                    filePath: path,
                    encoding: (_a = encoding) !== null && _a !== void 0 ? _a : "",
                    success: (res) => resolve(res.data),
                    fail: (err) => reject(err)
                });
            });
        }
        writeFile(path, data, encoding) {
            return new Promise((resolve, reject) => {
                this.fs.writeFile({
                    filePath: path,
                    data: data,
                    encoding: encoding,
                    success: () => resolve(),
                    fail: (err) => reject(err)
                });
            });
        }
        unlink(path) {
            return new Promise((resolve, reject) => {
                this.fs.unlink({
                    filePath: path,
                    success: () => resolve(),
                    fail: (err) => reject(err)
                });
            });
        }
        copyFile(srcPath, destPath) {
            return new Promise((resolve, reject) => {
                this.fs.copyFile({
                    srcPath,
                    destPath,
                    success: () => resolve(),
                    fail: (err) => reject(err)
                });
            });
        }
        exists(path) {
            return new Promise(resolve => {
                if (this.hasAccess) {
                    this.fs.access({
                        path,
                        success: () => resolve(true),
                        fail: (err) => resolve(false)
                    });
                }
                else {
                    this.fs.getFileInfo({
                        filePath: path,
                        success: (res) => resolve(true),
                        fail: (err) => resolve(false)
                    });
                }
            });
        }
        getFileSize(path) {
            return new Promise((resolve, reject) => {
                this.fs.getFileInfo({
                    filePath: path,
                    success: (res) => resolve(res.size),
                    fail: (err) => reject(err)
                });
            });
        }
        mkdir(path, options) {
            return new Promise((resolve, reject) => {
                this.fs.mkdir({
                    dirPath: path,
                    recursive: options === null || options === void 0 ? void 0 : options.recursive,
                    success: () => resolve(),
                    fail: (err) => reject(err)
                });
            });
        }
        rmdir(path, options) {
            try {
                this.fs.rmdirSync(path, options === null || options === void 0 ? void 0 : options.recursive);
                return Promise.resolve();
            }
            catch (e) {
                return Promise.reject(e);
            }
        }
        readdir(path) {
            return new Promise((resolve, reject) => {
                this.fs.readdir({
                    dirPath: path,
                    success: (res) => resolve(res.files),
                    fail: (err) => reject(err)
                });
            });
        }
        unzip(zipFilePath, targetPath) {
            return new Promise((resolve, reject) => {
                this.fs.unzip({
                    zipFilePath,
                    targetPath,
                    success: () => resolve(),
                    fail: (err) => reject(err)
                });
            });
        }
    }
    Laya.PAL.register("fs", MgFileSystemAdapter);

    class MgFontAdapter extends Laya.FontAdapter {
        loadFont(task) {
            if (!Laya.PAL.g.loadFont) {
                Laya.PAL.warnIncompatibility("TTFont");
                return Promise.resolve(null);
            }
            return task.loader.fetch(task.url, "filePath", task.progress.createCallback(), task.options).then((filePath) => {
                if (filePath) {
                    let fontFamily = Laya.PAL.g.loadFont(filePath);
                    return fontFamily ? { family: fontFamily } : null;
                }
                else
                    return null;
            });
        }
    }
    Laya.PAL.register("font", MgFontAdapter);

    class MgInnerAudioChannel extends Laya.SoundChannel {
        get position() {
            if (this._ctx)
                return this._ctx.currentTime;
            else
                return 0;
        }
        get duration() {
            if (this._ctx)
                return this._ctx.duration;
            else
                return 0;
        }
        onPlay(url) {
            Laya.Laya.loader.fetch(url, "filePath").then((filePath) => this.onLoaded(filePath));
        }
        onLoaded(filePath) {
            if (!this._started || filePath == null)
                return;
            this._loaded = true;
            let ctx = this._ctx = this.createContext();
            ctx.onError(err => {
                console.error("MgInnerAudioChannel: " + Laya.getErrorMsg(err));
                this.stop();
            });
            ctx.onEnded(() => this.onPlayEnd());
            let playSound = () => {
                if (this._ctx && !this._paused) {
                    if (this.startTime != 0)
                        ctx.seek(this.startTime);
                    ctx.play();
                }
                ctx.offCanplay(playSound);
            };
            ctx.onCanplay(playSound);
            ctx.src = filePath;
            ctx.playbackRate = this.playbackRate;
            ctx.loop = this.loops === 0;
            ctx.volume = this._muted ? 0 : this._volume;
        }
        onPlayAgain() {
            if (this.startTime != 0)
                this._ctx.seek(this.startTime);
            this._ctx.play();
        }
        onStop() {
            this.releaseContext();
        }
        onPause() {
            this._ctx.pause();
        }
        onResume() {
            this._ctx.play();
        }
        onVolumeChanged() {
            this._ctx.volume = this._muted ? 0 : this._volume;
        }
        onMuted() {
            if (this._muted)
                this._ctx.pause();
            else
                this._ctx.play();
        }
        createContext() {
            return Laya.PAL.g.createInnerAudioContext();
        }
        releaseContext() {
            this._ctx.destroy();
            this._ctx = null;
        }
    }

    class MgVideoPlayer extends Laya.VideoPlayer {
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
            return this._currentTime;
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
                console.error("MgVideoPlayer: " + Laya.getErrorMsg(err));
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
            if (this.video.paintTo) {
                this.video.paintTo(Laya.Browser.mainCanvas.source, x, y, 0, 0, width, height);
            }
            else {
                this.video.x = x;
                this.video.y = y;
                this.video.width = width;
                this.video.height = height;
            }
        }
        onDestroy() {
            this.video.destroy();
        }
    }

    class MgWebAudioChannel extends MgInnerAudioChannel {
        constructor(url) {
            super(url);
        }
        createContext() {
            return Laya.PAL.g.createInnerAudioContext({ useWebAudioImplement: true });
        }
    }

    class MgMediaAdapter extends Laya.MediaAdapter {
        init() {
            if (Laya.PAL.g.createWebAudioContext)
                this.audioCtx = Laya.PAL.g.createWebAudioContext();
            else if (Laya.PAL.g.getAudioContext)
                this.audioCtx = Laya.PAL.g.getAudioContext();
            this.longAudioClass = MgInnerAudioChannel;
            this.shortAudioClass = MgWebAudioChannel;
            this.videoPlayerClass = Laya.PAL.g.createVideo ? MgVideoPlayer : null;
            this.videoTextureClass = null;
        }
    }
    Laya.PAL.register("media", MgMediaAdapter);

    class MgTextInputAdapter extends Laya.TextInputAdapter {
        constructor() {
            super();
            this._editInline = false;
            Laya.PAL.g.onKeyboardInput(this.onKeyboardInput.bind(this));
            Laya.PAL.g.onKeyboardConfirm(this.onKeyboardConfirm.bind(this));
            Laya.PAL.g.onKeyboardComplete(this.onKeyboardComplete.bind(this));
        }
        setText(value) {
            Laya.PAL.g.updateKeyboard({ value });
        }
        onBegin() {
            return Promise.resolve();
        }
        onCanShowKeyboard() {
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
            if (complete || switching)
                return Promise.resolve();
            return new Promise((resolve, reject) => {
                Laya.PAL.g.hideKeyboard({ success: resolve, fail: reject });
            });
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
    Laya.PAL.register("textInput", MgTextInputAdapter);

    exports.MgBrowserAdapter = MgBrowserAdapter;
    exports.MgCacheManager = MgCacheManager;
    exports.MgDeviceAdapter = MgDeviceAdapter;
    exports.MgDownloader = MgDownloader;
    exports.MgFileSystemAdapter = MgFileSystemAdapter;
    exports.MgFontAdapter = MgFontAdapter;
    exports.MgInnerAudioChannel = MgInnerAudioChannel;
    exports.MgMediaAdapter = MgMediaAdapter;
    exports.MgTextInputAdapter = MgTextInputAdapter;
    exports.MgVideoPlayer = MgVideoPlayer;
    exports.MgWebAudioChannel = MgWebAudioChannel;
    exports.MgWebSocket = MgWebSocket;

})(window.Laya = window.Laya || {}, Laya);
