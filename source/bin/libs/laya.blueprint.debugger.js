(function (exports, BP) {
    'use strict';

    const mainScope = Symbol("mainScope");
    class BlueprintDebuggerRuntime extends BP.BlueprintRuntime {
        constructor() {
            super();
            this.mainBlock = new BluePrintDebuggerMainBlock(mainScope);
        }
    }
    class BluePrintDebuggerMainBlock extends BP.BluePrintMainBlock {
        _onEventParse(...args) {
            const eventName = args.shift();
            const originFunc = args.shift();
            const caller = args.shift();
            const funcContext = caller[BP.BlueprintFactory.contextSymbol];
            if (funcContext.debuggerManager.debugging)
                return;
            super._onEventParse(eventName, originFunc, caller, ...args);
        }
    }

    var InputManager = Laya.InputManager;
    class DebuggerUtils {
        static get inst() {
            if (!this._instance) {
                this._instance = new DebuggerUtils();
            }
            return this._instance;
        }
        startDebugger() {
            if (this.debugging)
                return;
            this.debugging = true;
            this._originalfun = requestAnimationFrame;
            this._ohandleKeys = InputManager.inst.handleKeys.bind(InputManager.inst);
            this._ohandleMouse = InputManager.inst.handleMouse.bind(InputManager.inst);
            this._ohandleTouch = InputManager.inst.handleTouch.bind(InputManager.inst);
            InputManager.inst.handleKeys = this.handleKeys.bind(this);
            InputManager.inst.handleMouse = this.handleMouse.bind(this);
            InputManager.inst.handleTouch = this.handleTouch.bind(this);
            window.requestAnimationFrame = this._requestAnimationFrame.bind(this);
        }
        stopDebugger() {
            this.debugging = false;
            if (this._originalfun) {
                window.requestAnimationFrame = this._originalfun;
                if (this._loop) {
                    window.requestAnimationFrame(this._loop);
                }
                InputManager.inst.handleKeys = this._ohandleKeys;
                InputManager.inst.handleMouse = this._ohandleMouse;
                InputManager.inst.handleTouch = this._ohandleTouch;
            }
            this._originalfun = null;
            this._ohandleKeys = null;
            this._ohandleMouse = null;
            this._ohandleTouch = null;
        }
        _requestAnimationFrame(callback) {
            if (this.debugging) {
                this._loop = callback;
                return null;
            }
            return this._originalfun(callback);
        }
        handleKeys(ev) {
            if (this.debugging)
                return;
            this._ohandleKeys(ev);
        }
        handleMouse(ev, type) {
            if (this.debugging)
                return;
            this._ohandleMouse(ev, type);
        }
        handleTouch(ev, type) {
            if (this.debugging)
                return;
            this._ohandleTouch(ev, type);
        }
    }

    class BlueprintDebuggerManager {
        constructor() {
            this.stackList = [];
            this.executedlist = [];
            if (!this._cacheDebugData) {
                this._cacheDebugData = {};
            }
        }
        pause(context, listInfo, parmsArray, runTimeData) {
            this.debugging = true;
            this.context = context;
            this.listInfo = listInfo;
            this._notClearStack = true;
            this.context.debuggerPause = true;
            this.runTimeData = runTimeData.getDataManagerByID(context);
            this.puaseing = true;
            let _parmsArray = [];
            parmsArray.forEach(value => _parmsArray.push(typeof (value) == 'object' || typeof (value) == 'function' ? value === null || value === void 0 ? void 0 : value.toString() : value));
            const other = {};
            other.parmsArray = _parmsArray;
            other.stackList = this.stackList;
            other.executedlist = this.executedlist;
            const params = JSON.stringify([listInfo.nid, runTimeData.bpId, other]);
            console.debug('Parameters on breakpoint', parmsArray);
            EditorClient.port.send("bpDebugMessage", "blueprintPause", params);
        }
        resume() {
            this.puaseing = false;
            this.debugging = false;
            this.context.debuggerPause = false;
            this.context.next();
        }
        stepOut() {
            this.runTimeData.debuggerPause = exports.BpDebuggerRunType.stepOut;
            this.resume();
        }
        stepInto() {
            this.puaseing = false;
            this.context.debuggerPause = false;
            this.runTimeData.debuggerPause = exports.BpDebuggerRunType.stepInfo;
            this.context.next();
        }
        stepOver() {
            this.runTimeData.debuggerPause = exports.BpDebuggerRunType.stepOver;
            this.resume();
        }
        clear() {
            if (this.debugging && (!this.runTimeData || this.runTimeData.debuggerPause !== exports.BpDebuggerRunType.stepInfo)) {
                return;
            }
            if (this.runTimeData) {
                this.runTimeData.debuggerPause = exports.BpDebuggerRunType.none;
            }
            this.listInfo = null;
            this.context = null;
            this.debugging = false;
            this.runTimeData = null;
            this._notClearStack = false;
            EditorClient.port.send("bpDebugMessage", "blueprintPauseEnd");
        }
        cacheDebuggData(data) {
            this._cacheDebugData = data;
        }
        initItemHasDebugger(target) {
            if (this._cacheDebugData[target]) {
                this.updateItemHasDebugger(this._cacheDebugData);
                delete this._cacheDebugData[target];
            }
        }
        updateItemHasDebugger(config) {
            for (let key in config) {
                const data = config[key];
                const cls = BP.BlueprintUtil.getClass(key);
                if (!cls)
                    continue;
                const item = cls.prototype[BP.BlueprintFactory.bpSymbol];
                for (let index in data) {
                    index = Number(index);
                    const value = data[index];
                    let node = item.mainBlock.nodeMap.get(index);
                    if (!node) {
                        const funBlockMap = item.funBlockMap;
                        for (let [key, value] of funBlockMap) {
                            node = value.nodeMap.get(index);
                            if (node) {
                                break;
                            }
                        }
                    }
                    node && (node.hasDebugger = !!value.debugType);
                }
            }
        }
        get debugging() {
            return this._debugging;
        }
        set debugging(value) {
            if (this._debugging == value)
                return;
            this._debugging = value;
            if (value) {
                DebuggerUtils.inst.startDebugger();
            }
            else {
                DebuggerUtils.inst.stopDebugger();
            }
        }
        recordStack(runner, currentId) {
            let child = this.stackList[this.stackList.length - 1];
            if (runner.blockSourceType === BP.EBlockSource.Main) {
                if (child && child.isChild) {
                    child.file = runner.bpId;
                    child.currentId = currentId;
                    delete child.isChild;
                }
                else {
                    this.stackList.push({ file: runner.bpId, currentId });
                }
            }
            else {
                if (!(child === null || child === void 0 ? void 0 : child.isChild)) {
                    this.stackList.push({ file: runner.bpId, currentId, isChild: true });
                }
                else {
                    child.file = runner.bpId;
                    child.currentId = currentId;
                }
            }
            Laya.timer.callLater(this, this.clearStackList);
        }
        clearStackList() {
            if (this._notClearStack) {
                return;
            }
            this.stackList.length = 0;
            this.executedlist.length = 0;
        }
        recordExecuted(file, preId, currentId) {
            const isDuplicate = this.executedlist.some(item => item.file === file && item.preId === preId && item.currentId === currentId);
            if (!isDuplicate) {
                this.executedlist.push({ file, preId, currentId });
            }
            Laya.timer.callLater(this, this.clearStackList);
        }
    }
    BlueprintDebuggerManager._ins = new BlueprintDebuggerManager();
    window['BlueprintDebuggerManager'] = BlueprintDebuggerManager;
    exports.BpDebuggerRunType = void 0;
    (function (BpDebuggerRunType) {
        BpDebuggerRunType[BpDebuggerRunType["none"] = 0] = "none";
        BpDebuggerRunType[BpDebuggerRunType["stepOver"] = 1] = "stepOver";
        BpDebuggerRunType[BpDebuggerRunType["stepOut"] = 2] = "stepOut";
        BpDebuggerRunType[BpDebuggerRunType["stepInfo"] = 3] = "stepInfo";
    })(exports.BpDebuggerRunType || (exports.BpDebuggerRunType = {}));

    class BlueprintExecuteDebuggerNode extends BP.BlueprintExecuteNode {
        constructor(data) {
            super(data);
            this.needClear = true;
            this._nodeList = [];
            this.debuggerManager = BlueprintDebuggerManager._ins;
        }
        pushBack(executeNode, callback) {
            this._nodeList.push(executeNode, callback);
        }
        next() {
            let fun = this._doNext;
            if (fun) {
                this._doNext = null;
                fun(false);
            }
        }
        beginExecute(runtimeNode, runner, enableDebugPause, fromPin, parmsArray, prePin) {
            if (enableDebugPause) {
                this.debuggerManager.recordStack(runner, runtimeNode.nid + '');
                this.debuggerManager.recordExecuted(runner.bpId, fromPin === null || fromPin === void 0 ? void 0 : fromPin.id, prePin === null || prePin === void 0 ? void 0 : prePin.id);
                let b = runtimeNode.hasDebugger || (this.debuggerManager.debugging && !this.debuggerManager.puaseing);
                if (!b) {
                    const runtimeDataMgr = runner.getDataManagerByID(this);
                    b = runtimeDataMgr.debuggerPause == exports.BpDebuggerRunType.stepOver;
                    if (b)
                        runtimeDataMgr.debuggerPause = exports.BpDebuggerRunType.none;
                }
                if (b) {
                    console.debug(runtimeNode.name + " break", this);
                    this.debuggerManager.pause(this, runtimeNode, parmsArray, runner);
                    return this.getDebuggerPromise(runtimeNode, fromPin);
                }
                else {
                    return null;
                }
            }
            if (this.listNode.indexOf(runtimeNode) == -1) {
                this.listNode.push(runtimeNode);
                return null;
            }
            else {
                return null;
            }
        }
        finish(runtime) {
            if (this.needClear) {
                this.debuggerManager.clear();
            }
        }
        executeFun(nativeFun, returnResult, runtimeDataMgr, caller, parmsArray, runId) {
            return super.executeFun(nativeFun, returnResult, runtimeDataMgr, caller, parmsArray, runId);
        }
        getDebuggerPromise(runtimeNode, fromPin) {
            let promise = BP.BlueprintPromise.create();
            this.next = (runType) => {
                this.readCache = true;
                promise.nid = runtimeNode.nid;
                promise.pin = fromPin;
                promise.enableDebugPause = false;
                promise.complete();
                promise.recover();
                if (this._nodeList.length) {
                    for (let index = 0; index < this._nodeList.length; index += 2) {
                        const element = this._nodeList[index];
                        const callback = this._nodeList[index + 1];
                        Laya.timer.callLater(this, callback, [element]);
                    }
                    this._nodeList.length = 0;
                }
            };
            return promise;
        }
    }

    class BlueprintCustomFunDebuggerNode extends BP.BlueprintCustomFunNode {
        _executeFun(context, cb, parmsArray, runner) {
            const _runTimeData = context.getDataManagerByID(this.functionID);
            if (_runTimeData.debuggerPause == exports.BpDebuggerRunType.stepOut) {
                _runTimeData.debuggerPause = exports.BpDebuggerRunType.none;
                if (this.staticNext) {
                    context.debuggerManager.pause(context, this, parmsArray, runner);
                }
            }
            super._executeFun(context, cb, parmsArray, runner);
        }
    }

    class BlueprintGetTempVarDebuggerNode extends BP.BlueprintGetTempVarNode {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, runtimeDataMgr, "runtimeDataMgr");
            context.parmFromCustom(_parmsArray, runId, "runId");
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }

    class BlueprintGetVarDebuggerNode extends BP.BlueprintGetVarNode {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, context, "context");
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }

    class BlueprintSetTempVarDebuggerNode extends BP.BlueprintSetTempVarNode {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, runtimeDataMgr, "runtimeDataMgr");
            context.parmFromCustom(_parmsArray, runId, "runId");
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }

    class BlueprintSetVarDebuggerNode extends BP.BlueprintSetVarNode {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, context, "context");
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }

    class BlueprintEventDebuggerNode extends BP.BlueprintEventNode {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, [], prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }

    class BlueprintCustomFunDebuggerReturn extends BP.BlueprintCustomFunReturn {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }
    class BlueprintCustomFunDebuggerReturnContext extends BP.BlueprintCustomFunReturnContext {
        runExecute(runId, index, context) {
            let outExecutes = this.outExecutesMap.get(runId);
            if (outExecutes) {
                let outExecute = outExecutes[index];
                if (outExecute) {
                    let nextPin = outExecute.linkTo[0];
                    if (nextPin) {
                        let runner = this.runnerMap.get(runId);
                        let mb = runner[0];
                        context.needClear = false;
                        mb.runByContext(context, runner[1], nextPin.owner, true, null, runId, nextPin, outExecute);
                        context.needClear = true;
                    }
                }
            }
        }
    }

    class DebuggerMain {
        static __init__() {
            EditorClient.addStartCallback(() => {
                return EditorClient.port.invoke("blueprintReady").then(ret => {
                    if (ret === null || ret === void 0 ? void 0 : ret.isDebug) {
                        DebuggerMain.init(ret.data);
                    }
                });
            });
        }
        static init(data) {
            BP.BlueprintFactory.BPRuntimeCls = BlueprintDebuggerRuntime;
            BP.BlueprintFactory.BPExecuteCls = BlueprintExecuteDebuggerNode;
            DebuggerMain.reg();
            DebuggerMain.initHandle();
            let _createNew = BP.BlueprintFactory.instance.createNew;
            BP.BlueprintFactory.instance.createNew = (config, item) => {
                const node = _createNew(config, item);
                return node;
            };
            BP.BlueprintFactory.initClassHook = (parent, cls) => {
                BlueprintDebuggerManager._ins.initItemHasDebugger(parent);
            };
            BlueprintDebuggerManager._ins.cacheDebuggData(data);
        }
        static initHandle() {
            const port = EditorClient.port;
            port.handle('message', (type, data) => {
                switch (type) {
                    case 'blueprintResume':
                        BlueprintDebuggerManager._ins.resume();
                        break;
                    case 'blueprintStepOut':
                        BlueprintDebuggerManager._ins.stepOut();
                        break;
                    case 'blueprintStepInto':
                        BlueprintDebuggerManager._ins.stepInto();
                        break;
                    case 'blueprintStepOver':
                        BlueprintDebuggerManager._ins.stepOver();
                        break;
                    case 'blueprintUpdateDebugData':
                        BlueprintDebuggerManager._ins.updateItemHasDebugger(data);
                        break;
                }
            });
            port.handle('blueprintReady', (data) => {
                BlueprintDebuggerManager._ins.cacheDebuggData(data);
            });
            port.handle('blueprintResume', () => {
                BlueprintDebuggerManager._ins.resume();
            });
            port.handle('blueprintStepOut', () => {
                BlueprintDebuggerManager._ins.stepOut();
            });
            port.handle('blueprintStepInto', () => {
                BlueprintDebuggerManager._ins.stepInto();
            });
            port.handle('blueprintStepOver', () => {
                BlueprintDebuggerManager._ins.stepOver();
            });
            port.handle('blueprintUpdateDebugData', (data) => {
                BlueprintDebuggerManager._ins.updateItemHasDebugger(data);
            });
        }
        static reg() {
            const rc = BP.BlueprintFactory.regBPClass.bind(BP.BlueprintFactory);
            rc(BP.BPType.Event, BlueprintEventDebuggerNode);
            rc(BP.BPType.GetValue, BlueprintGetVarDebuggerNode);
            rc(BP.BPType.SetValue, BlueprintSetVarDebuggerNode);
            rc(BP.BPType.CustomFun, BlueprintCustomFunDebuggerNode);
            rc(BP.BPType.CustomFunReturn, BlueprintCustomFunDebuggerReturn);
            rc(BP.BPType.GetTmpValue, BlueprintGetTempVarDebuggerNode);
            rc(BP.BPType.SetTmpValue, BlueprintSetTempVarDebuggerNode);
            BP.BlueprintFactory.regBPContextData(BP.BPType.CustomFunReturn, BlueprintCustomFunDebuggerReturnContext);
        }
    }
    Laya.addInitCallback(DebuggerMain.__init__);

    class BlueprintNewTargetDebuggerNode extends BP.BlueprintNewTargetNode {
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            let result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            return super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
        }
    }

    exports.BluePrintDebuggerMainBlock = BluePrintDebuggerMainBlock;
    exports.BlueprintCustomFunDebuggerNode = BlueprintCustomFunDebuggerNode;
    exports.BlueprintCustomFunDebuggerReturn = BlueprintCustomFunDebuggerReturn;
    exports.BlueprintCustomFunDebuggerReturnContext = BlueprintCustomFunDebuggerReturnContext;
    exports.BlueprintDebuggerManager = BlueprintDebuggerManager;
    exports.BlueprintDebuggerRuntime = BlueprintDebuggerRuntime;
    exports.BlueprintEventDebuggerNode = BlueprintEventDebuggerNode;
    exports.BlueprintExecuteDebuggerNode = BlueprintExecuteDebuggerNode;
    exports.BlueprintGetTempVarDebuggerNode = BlueprintGetTempVarDebuggerNode;
    exports.BlueprintGetVarDebuggerNode = BlueprintGetVarDebuggerNode;
    exports.BlueprintNewTargetDebuggerNode = BlueprintNewTargetDebuggerNode;
    exports.BlueprintSetTempVarDebuggerNode = BlueprintSetTempVarDebuggerNode;
    exports.BlueprintSetVarDebuggerNode = BlueprintSetVarDebuggerNode;
    exports.DebuggerMain = DebuggerMain;
    exports.DebuggerUtils = DebuggerUtils;

})(window.BP = window.BP || {}, BP);
