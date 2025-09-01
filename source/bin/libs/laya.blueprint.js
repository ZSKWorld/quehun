(function (exports) {
    'use strict';

    class BlueprintConst {
    }
    BlueprintConst.MAX_CODELINE = Number.MAX_VALUE;
    BlueprintConst.NULL_NODE = -100;
    BlueprintConst.VERSION = 1;
    BlueprintConst.EXT = "bp";
    BlueprintConst.TYPE = "blueprint";
    BlueprintConst.configPath = "internal/blueprint.bin";

    const customData = {};
    const extendsData = {};

    class RuntimeNodeData {
        constructor() {
            this.map = new Map();
            this.callFunMap = new Map();
        }
        getCallFun(runId) {
            return this.callFunMap.get(runId);
        }
        setCallFun(runId, fun) {
            this.callFunMap.set(runId, fun);
        }
        getParamsArray(runId) {
            let result = this.map.get(runId);
            if (!result) {
                result = [];
                this.map.set(runId, result);
            }
            return result;
        }
    }
    class RuntimePinData {
        constructor() {
            this.valueMap = new Map();
        }
        copyValue(runId, toRunId) {
            let value = this.valueMap.get(runId);
            if (value != undefined) {
                this.valueMap.set(toRunId, value);
            }
        }
        initValue(value) {
            this.value = value;
            this.getValue = this.getValueOnly;
        }
        setValue(runId, value) {
            this.valueMap.set(runId, value);
        }
        getValueOnly(runId) {
            return this.value;
        }
        getValue(runId) {
            return this.valueMap.get(runId);
        }
    }

    exports.EPinDirection = void 0;
    (function (EPinDirection) {
        EPinDirection[EPinDirection["Input"] = 0] = "Input";
        EPinDirection[EPinDirection["Output"] = 1] = "Output";
        EPinDirection[EPinDirection["All"] = 2] = "All";
    })(exports.EPinDirection || (exports.EPinDirection = {}));
    exports.EBlueNodeType = void 0;
    (function (EBlueNodeType) {
        EBlueNodeType["Unknow"] = "unkown";
        EBlueNodeType["Event"] = "event";
        EBlueNodeType["Fun"] = "fun";
        EBlueNodeType["Pure"] = "pure";
        EBlueNodeType["GetVariable"] = "var";
        EBlueNodeType["SetVarialbe"] = "setVar";
        EBlueNodeType["Branch"] = "branch";
        EBlueNodeType["Sequnece"] = "sequnece";
    })(exports.EBlueNodeType || (exports.EBlueNodeType = {}));
    exports.EPinType = void 0;
    (function (EPinType) {
        EPinType[EPinType["Exec"] = 0] = "Exec";
        EPinType[EPinType["BPFun"] = 1] = "BPFun";
        EPinType[EPinType["Other"] = 2] = "Other";
    })(exports.EPinType || (exports.EPinType = {}));

    exports.BPType = void 0;
    (function (BPType) {
        BPType["Event"] = "event";
        BPType["Function"] = "function";
        BPType["BPEvent"] = "bpEvent";
        BPType["Pure"] = "pure";
        BPType["Class"] = "class";
        BPType["Operator"] = "operator";
        BPType["GetValue"] = "getvalue";
        BPType["SetValue"] = "setvalue";
        BPType["GetTmpValue"] = "getTmpValue";
        BPType["SetTmpValue"] = "setTmpValue";
        BPType["Branch"] = "branch";
        BPType["Block"] = "Block";
        BPType["Sequence"] = "sequence";
        BPType["NewTarget"] = "newtarget";
        BPType["CustomFun"] = "customFun";
        BPType["CustomFunStart"] = "customFunStart";
        BPType["CustomFunReturn"] = "customFunReturn";
        BPType["Expression"] = "expression";
        BPType["Assertion"] = "Assertion";
    })(exports.BPType || (exports.BPType = {}));

    const BlueprintDataList = [
        {
            name: "static_get",
            menuPath: "none",
            type: exports.BPType.GetValue,
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: 'target',
                    type: 'class',
                }
            ],
            output: [
                {
                    type: "any",
                },
            ],
        },
        {
            name: "get_self",
            caption: "GetSelf",
            bpType: 'prop',
            type: exports.BPType.GetValue,
            isSelf: true,
            modifiers: {
                isStatic: true,
                isReadonly: true,
            },
            properties: [],
            output: [
                {
                    name: 'self',
                    type: "any",
                },
            ]
        },
        {
            id: "_$bpOnSet",
            name: "onPropertyChanged_EM",
            type: "event",
            bpType: "function",
            menuPath: "none",
            modifiers: {
                isPublic: true,
            },
            properties: [],
            output: [
                {
                    name: "then",
                    type: "exec"
                }
            ],
        },
        {
            name: "static_set",
            menuPath: "none",
            type: exports.BPType.SetValue,
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: 'target',
                    type: 'class',
                },
                {
                    name: 'set',
                    type: "any",
                },
            ],
            output: [
                {
                    name: "then",
                    type: "exec"
                },
                {
                    name: "return",
                    type: "any",
                }
            ],
        },
        {
            name: "tmp_get",
            menuPath: "none",
            type: exports.BPType.GetTmpValue,
            properties: [],
            output: [
                {
                    type: "any",
                },
            ],
        },
        {
            name: "get",
            menuPath: "none",
            type: exports.BPType.GetValue,
            properties: [
                {
                    name: 'target',
                    type: 'any',
                }
            ],
            output: [
                {
                    type: "any",
                },
            ],
        },
        {
            name: "set",
            menuPath: "none",
            type: exports.BPType.SetValue,
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: 'target',
                    type: 'any',
                },
                {
                    name: 'set',
                    type: "any",
                },
            ],
            output: [
                {
                    name: "then",
                    type: "exec"
                },
                {
                    name: "return",
                    type: "any",
                }
            ],
        },
        {
            name: "tmp_set",
            menuPath: "none",
            type: exports.BPType.SetTmpValue,
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: 'set',
                    type: "any",
                },
            ],
            output: [
                {
                    name: "then",
                    type: "exec"
                },
                {
                    name: "return",
                    type: "any",
                }
            ],
        },
        {
            name: "branch",
            type: exports.BPType.Branch,
            menuPath: "system",
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: "condition",
                    type: "boolean",
                },
            ],
            output: [
                {
                    name: "true",
                    type: "exec",
                },
                {
                    name: "false",
                    type: "exec",
                },
            ]
        },
        {
            name: "sequence",
            type: exports.BPType.Sequence,
            menuPath: "system",
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec",
                }
            ],
            output: [
                {
                    name: "then0",
                    type: "exec",
                },
                {
                    name: "then1",
                    type: "exec",
                },
            ]
        },
        {
            name: "event_event",
            menuPath: "none",
            type: exports.BPType.Event,
            properties: [],
            output: [
                {
                    name: "",
                    type: "bpFun"
                },
                {
                    name: "then",
                    type: "exec"
                },
            ]
        },
        {
            name: "event_on",
            menuPath: "none",
            type: exports.BPType.Function,
            properties: [
                {
                    name: "",
                    type: "bpFun"
                }
            ]
        },
        {
            name: "event_off",
            menuPath: "none",
            type: exports.BPType.Function,
            properties: [
                {
                    name: "",
                    type: "bpFun"
                }
            ]
        },
        {
            name: "event_offAll",
            menuPath: "none",
            type: exports.BPType.Function,
            properties: []
        },
        {
            name: "event_call",
            menuPath: "none",
            type: exports.BPType.Function,
            properties: [],
        },
        {
            name: "custom_fun_start",
            menuPath: "none",
            type: exports.BPType.CustomFunStart,
            properties: [],
            output: [
                {
                    name: "then",
                    type: "exec"
                },
            ]
        },
        {
            name: "custom_fun_return",
            menuPath: "none",
            type: exports.BPType.CustomFunReturn,
            properties: [
                {
                    name: "execute",
                    type: "exec",
                }
            ]
        },
        {
            name: "custom_static_fun",
            menuPath: "none",
            type: exports.BPType.CustomFun,
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
            ],
            output: [
                {
                    name: "then",
                    type: "exec"
                },
            ]
        },
        {
            name: "custom_fun",
            menuPath: "none",
            type: exports.BPType.CustomFun,
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: "target",
                    type: "object",
                },
            ],
            output: [
                {
                    name: "then",
                    type: "exec"
                },
            ]
        },
        {
            name: "expression",
            menuPath: "system",
            type: exports.BPType.Pure,
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: 'caller',
                    type: 'any',
                },
                {
                    name: "str",
                    type: "string",
                }
            ],
            output: [
                {
                    type: "any",
                },
            ],
        },
        {
            name: "as",
            menuPath: "system",
            type: exports.BPType.Assertion,
            modifiers: {
                isStatic: true,
            },
            typeParameters: {
                T: {}
            },
            properties: [
                {
                    name: 'target',
                    type: 'any',
                },
                {
                    name: "type",
                    type: "new()=>T",
                }
            ],
            output: [
                {
                    name: "then",
                    type: "T",
                },
            ],
        },
        {
            name: "instanceof",
            menuPath: "system",
            type: exports.BPType.Branch,
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: 'target',
                    type: 'any',
                },
                {
                    name: "type",
                    type: "new()=>T",
                },
            ],
            output: [
                {
                    name: "true",
                    type: "exec",
                },
                {
                    name: "false",
                    type: "exec",
                },
            ]
        },
        {
            name: "forEach",
            type: exports.BPType.Block,
            menuPath: "system",
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: "array",
                    type: "array",
                },
            ],
            output: [
                {
                    name: "loopBody",
                    type: "exec",
                },
                {
                    name: "element",
                    type: "any",
                },
                {
                    name: "index",
                    type: "number",
                },
                {
                    name: "completed",
                    type: "exec",
                }
            ]
        },
        {
            name: "forEachWithBreak",
            type: exports.BPType.Block,
            menuPath: "system",
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec",
                },
                {
                    name: "array",
                    type: "array",
                },
                {
                    name: "break",
                    type: "exec",
                }
            ],
            output: [
                {
                    name: "loopBody",
                    type: "exec",
                },
                {
                    name: "element",
                    type: "any",
                },
                {
                    name: "index",
                    type: "number",
                },
                {
                    name: "completed",
                    type: "exec",
                }
            ]
        },
        {
            name: "forLoop",
            type: exports.BPType.Block,
            menuPath: "system",
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec"
                },
                {
                    name: "firstIndex",
                    type: "number"
                },
                {
                    name: "lastIndex",
                    type: "number"
                },
                {
                    name: "step",
                    type: "number"
                }
            ],
            output: [
                {
                    name: "loopBody",
                    type: "exec",
                },
                {
                    name: "index",
                    type: "number",
                },
                {
                    name: "completed",
                    type: "exec",
                }
            ]
        },
        {
            name: "forLoopWithBreak",
            type: exports.BPType.Block,
            menuPath: "system",
            modifiers: {
                isStatic: true,
            },
            properties: [
                {
                    name: "execute",
                    type: "exec"
                },
                {
                    name: "firstIndex",
                    type: "number"
                },
                {
                    name: "lastIndex",
                    type: "number"
                },
                {
                    name: "step",
                    type: "number"
                },
                {
                    name: "break",
                    type: "exec"
                }
            ],
            output: [
                {
                    name: "loopBody",
                    type: "exec",
                },
                {
                    name: "index",
                    type: "number",
                },
                {
                    name: "completed",
                    type: "exec",
                }
            ]
        },
    ];

    var _a;
    const EXECID = '-1';
    const TARGETID = "-2";
    class BlueprintData {
        static formatName(param) {
            let name = param.name;
            if (param.dotdotdot) {
                if (!name.startsWith("...")) {
                    name = "..." + name;
                }
            }
            return name;
        }
        static formatType(type) {
            if (type && 'string' == typeof type) {
                if ('array' == type)
                    return ['any'];
                let index = type.indexOf("<");
                if (0 < index) {
                    let key = type.substring(0, index);
                    let value = type.substring(index + 1, type.lastIndexOf(">"));
                    if ("Array" == key.trim()) {
                        return [this.formatType(value)];
                    }
                    else if ("Record" == key.trim()) {
                        return ["Record", this.formatType(value)];
                    }
                }
                index = type.indexOf("[]");
                if (0 <= index) {
                    return [type.substring(0, index)];
                }
            }
            return type;
        }
        constructor(extendsData, regFunction = null, getClass = null) {
            this.constData = {};
            this.autoCreateData = {};
            this.isStartCatch = true;
            this.isResetData = false;
            this._extendsData = extendsData;
            this._regFunction = regFunction;
            this._getClass = getClass;
            let list = BlueprintDataList;
            for (let i = list.length - 1; i >= 0; i--) {
                let o = list[i];
                if (null == o.id)
                    o.id = o.name;
                if (null == o.bpType)
                    o.bpType = 'function';
                if (null == o.target)
                    o.target = 'system';
                if (null == this.constData[o.target])
                    this.constData[o.target] = { data: {} };
                this.constData[o.target].data[o.id] = o;
                let input = o.properties;
                if (input) {
                    for (let i = input.length - 1; i >= 0; i--) {
                        let o = input[i];
                        o.type = _a.formatType(o.type);
                        if (null == o.name) {
                            o.name = String.fromCharCode(97 + i);
                        }
                        else if ('execute' == o.name && 'exec' == o.type && null == o.id) {
                            o.id = EXECID;
                            o.caption = "execute";
                            o.name = EXECID;
                        }
                        else if ('target' == o.name && null == o.id) {
                            o.caption = "target";
                            o.name = TARGETID;
                            o.id = TARGETID;
                        }
                    }
                }
                if (exports.BPType.Function == o.type) {
                    if (input) {
                        if (null == o.modifiers || !o.modifiers.isStatic) {
                            input.unshift(_a.defTarget);
                        }
                        input.unshift(_a.defFunIn);
                    }
                    else {
                        input = [_a.defFunIn];
                        if (null == o.modifiers || !o.modifiers.isStatic) {
                            input.push(_a.defTarget);
                        }
                        o.properties = input;
                    }
                }
                let output = o.output;
                if (output) {
                    for (let i = output.length - 1; i >= 0; i--) {
                        let o = output[i];
                        o.type = _a.formatType(o.type);
                        if ('then' == o.name && 'exec' == o.type && null == o.id) {
                            o.id = "out_" + EXECID;
                        }
                        else if (null == o.name) {
                            if (0 == i) {
                                o.name = 'return';
                            }
                            else {
                                throw "output插槽必须要有name！";
                            }
                        }
                    }
                }
                if (exports.BPType.Function == o.type) {
                    if (output) {
                        output.unshift(_a.defFunOut);
                    }
                    else {
                        output = [_a.defFunOut];
                        o.output = output;
                    }
                }
            }
            this.initData(extendsData);
        }
        get extendsData() {
            return this._extendsData;
        }
        getExtends(ext, arr) {
            if (null == ext)
                return null;
            if (null == arr)
                arr = [ext];
            else {
                arr.push(ext);
            }
            let o = this._extendsData[ext];
            if (null != o)
                this.getExtends(o.extends, arr);
            return arr;
        }
        getConstDataById(target, dataId) {
            if (null != this.getConstDataExt) {
                let ret = this.getConstDataExt(target, dataId);
                if (null != ret)
                    return ret;
            }
            let targetData = this.constData[target];
            if (targetData) {
                return targetData.data[dataId];
            }
            return null;
        }
        _getConstData(cid, target) {
            if (null == cid)
                return null;
            if (null == target)
                target = 'system';
            let targetData = this.constData[target];
            if (targetData) {
                let ret = targetData.data[cid];
                if (null == ret && 'system' != target) {
                    return this._getConstData(cid);
                }
                return ret;
            }
            else if ('system' != target) {
                return this._getConstData(cid);
            }
            return null;
        }
        static clone(obj) {
            if (null == obj)
                return obj;
            return JSON.parse(JSON.stringify(obj));
        }
        _getConstByNode(node) {
            if (null != node.dataId) {
                let id = node.cid + "_" + node.dataId + "_" + node.target;
                if (this.isStartCatch && null != this.autoCreateData[id])
                    return this.autoCreateData[id];
                let cdata = this._getConstData(node.cid, node.target);
                if ("static_get" == node.cid || "static_set" == node.cid || 'get' == node.cid || 'set' == node.cid || 'tmp_get' == node.cid || 'tmp_set' == node.cid)
                    return cdata;
                let data = null;
                if (null == data) {
                    let obj = _a.allDataMap.get(node.target);
                    if (obj) {
                        data = obj[node.dataId];
                    }
                }
                if (null == data) {
                    data = this.getConstDataById(node.target, node.dataId);
                }
                if (data) {
                    cdata = _a.clone(cdata);
                    cdata._isClone = true;
                    let arr = data.properties;
                    if (exports.BPType.CustomFunReturn != cdata.type) {
                        if (arr) {
                            for (let i = 0, len = arr.length; i < len; i++) {
                                if (null == arr[i].name || "" == arr[i].name.trim()) {
                                    if (null != arr[i].caption && '' != arr[i].caption.trim()) {
                                        console.log("数据异常，应该是属性面板增加了这个属性，但是没有自动创建数据的id号，出现原因不明，有可能是数据回退造成的，待查！");
                                    }
                                    continue;
                                }
                                if (exports.BPType.Event == cdata.type || exports.BPType.CustomFunStart == cdata.type) {
                                    if (null == cdata.output)
                                        cdata.output = [];
                                    this._checkAndPush(cdata.output, arr[i]);
                                }
                                else {
                                    if (null == cdata.properties)
                                        cdata.properties = [];
                                    this._checkAndPush(cdata.properties, arr[i]);
                                }
                            }
                        }
                    }
                    if (exports.BPType.CustomFunStart != cdata.type && exports.BPType.Event != cdata.type && 'event_call' != cdata.name) {
                        let arr = data.output;
                        if (arr) {
                            for (let i = 0, len = arr.length; i < len; i++) {
                                if (null == arr[i].name || "" == arr[i].name.trim())
                                    continue;
                                if (exports.BPType.CustomFunReturn == cdata.type) {
                                    if (null == cdata.properties)
                                        cdata.properties = [];
                                    this._checkAndPush(cdata.properties, arr[i]);
                                }
                                else {
                                    if (null == cdata.output)
                                        cdata.output = [];
                                    this._checkAndPush(cdata.output, arr[i]);
                                }
                            }
                        }
                    }
                    this.autoCreateData[id] = cdata;
                    return cdata;
                }
            }
            else {
                return this._getConstData(node.cid, node.target);
            }
            return null;
        }
        getConstNode(node) {
            let ret = this._getConstByNode(node);
            if (ret && node.properties || node.outputs) {
                if (!ret._isClone) {
                    ret = _a.clone(ret);
                    ret._isClone = true;
                }
                if (node.properties) {
                    let last = ret.properties.pop();
                    let name = last.name.substring(3);
                    for (let i = 0, len = node.properties.length; i < len; i++) {
                        let o = node.properties[i];
                        o.caption = name + "_" + (i + 1);
                    }
                    ret.properties.push(...node.properties);
                    ret.properties.push(last);
                }
                if (node.outputs) {
                    let last = ret.output.pop();
                    ret.output.push(...node.outputs);
                    ret.output.push(last);
                }
            }
            return ret;
        }
        _checkAndPush(arr, obj) {
            for (let i = arr.length - 1; i >= 0; i--) {
                if (arr[i].name == obj.name)
                    return;
            }
            arr.push(obj);
        }
        _createExtData(data, ext, cls) {
            if (this._getClass) {
                cls = this._getClass(ext);
            }
            let co = this.constData[ext];
            if (null != co)
                return co;
            let o = data[ext];
            if (null == o) {
                let eo = this._extendsData[ext];
                if (null != eo && null != eo.extends) {
                    let ret = this._createExtData(data, eo.extends, cls);
                    co = { data: Object.create(ret.data) };
                    co.extends = eo.extends;
                    this.constData[ext] = co;
                }
                else {
                    this.constData[ext] = { data: {} };
                }
                return this.constData[ext];
            }
            let exts = o.extends;
            if (exts) {
                let ret = this._createExtData(data, exts, cls);
                co = { data: Object.create(ret.data) };
                co.extends = exts;
                this._createConstData(o, co, ext, cls);
            }
            else {
                co = { data: {} };
                this._createConstData(o, co, ext, cls);
            }
            if (o.name != ext)
                co.caption = o.name;
            if (null != o.caption)
                co.caption = o.caption;
            this.constData[ext] = co;
            return co;
        }
        _createConstData(o, cdata, ext, cls) {
            if (o === null || o === void 0 ? void 0 : o.props) {
                o.props.forEach((po) => {
                    po.id = "var_" + po.name;
                    if (null != po.customId) {
                        po.id = po.customId;
                    }
                    else if (po.modifiers && po.modifiers.isStatic) {
                        po.id += "_static";
                    }
                    po.const = true;
                    po.target = ext;
                    po.bpType = 'prop';
                    cdata.data[po.id] = po;
                });
            }
            if (o && "Interface" === o.type && (!o.funcs || 0 === o.funcs.length)) {
                o.construct = {
                    params: o.props
                };
            }
            if (o === null || o === void 0 ? void 0 : o.construct) {
                let po = {
                    name: ext,
                    target: ext,
                    menuPath: "createNew",
                    id: "construct_" + ext,
                    bpType: "construct",
                    type: exports.BPType.NewTarget,
                    properties: [],
                    output: [{ name: "return", type: ext }]
                };
                cdata.data[po.id] = po;
                if (o.construct.params) {
                    po.properties = o.construct.params.map(param => ({ name: _a.formatName(param), type: _a.formatType(param.type) }));
                }
                for (let k in o.construct) {
                    if ('params' != k && null == po[k]) {
                        po[k] = o.construct[k];
                    }
                }
            }
            if (o === null || o === void 0 ? void 0 : o.events) {
                o.events.forEach((eve) => {
                    if (null == eve.id) {
                        eve.id = "event_" + eve.name;
                    }
                    if (null != eve.customId) {
                        eve.id = eve.customId;
                    }
                    eve.bpType = 'event';
                    eve.target = ext;
                    if (null == eve.properties && null != eve.params) {
                        eve.properties = eve.params;
                    }
                    cdata.data[eve.id] = eve;
                });
            }
            if (o === null || o === void 0 ? void 0 : o.funcs) {
                o.funcs.forEach((fun) => {
                    let modifiers = fun.modifiers;
                    if (!modifiers)
                        modifiers = fun.modifiers = {};
                    if (modifiers.isPublic == null || modifiers.isPublic || modifiers.isProtected) {
                        let po = _a.createCData(fun);
                        po.target = ext;
                        if (this._regFunction && cls) {
                            let func = modifiers.isStatic ? cls[fun.name] : cls.prototype[fun.name];
                            this._regFunction(po.id, func, !modifiers.isStatic, cls, po.target);
                        }
                        if (fun.params && fun.params.length > 0) {
                            let params = fun.params;
                            for (let i = params.length - 1; i >= 0; i--) {
                                params[i].name = _a.formatName(params[i]);
                            }
                            if (exports.BPType.Event == po.type) {
                                po.output.push(...fun.params);
                            }
                            else {
                                po.properties = [...fun.params];
                            }
                        }
                        _a.handleCDataTypes(po, fun, ext);
                        for (let k in fun) {
                            if (null == po[k]) {
                                po[k] = fun[k];
                            }
                        }
                        cdata.data[po.id] = po;
                        cdata.data[po.oldId] = po;
                    }
                });
            }
            const system = this.constData['system'];
            if (system && system !== cdata) {
                for (const k in system.data) {
                    const obj = system.data[k];
                    if ('event' === obj.type && 'function' === obj.bpType && undefined !== obj.modifiers) {
                        cdata.data[obj.id] = Object.assign(Object.assign({}, obj), { target: ext });
                    }
                }
            }
        }
        removeData(ext) {
            this.isResetData = true;
            delete this.constData[ext];
            delete this._extendsData[ext];
        }
        resetData(data, ext) {
            this.isResetData = true;
            if (null == data.caption)
                data.caption = data.name;
            data.name = ext;
            delete this.constData[ext];
            delete this._extendsData[ext];
            this._extendsData[ext] = data;
            this._createExtData({ [ext]: data }, ext, null);
        }
        initData(data) {
            for (let ext in data) {
                delete this.constData[ext];
            }
            for (let ext in data) {
                const setData = data[ext];
                this._extendsData[ext] = setData;
                let cls = null;
                let isGetClass = true;
                if (setData && "Interface" === setData.type && (!setData.funcs || 0 === setData.funcs.length)) {
                    isGetClass = false;
                }
                if (this._getClass && isGetClass) {
                    cls = this._getClass(ext);
                    if (!cls)
                        continue;
                }
                this._createExtData(data, ext, null);
            }
        }
        static handleCDataTypes(cdata, fun, ext) {
            if (this.funlike.includes(cdata.type)) {
                cdata.properties = cdata.properties || [];
                if (!fun.modifiers || !fun.modifiers.isStatic) {
                    cdata.properties.unshift({ name: TARGETID, caption: "target", type: ext, id: TARGETID });
                }
                if (cdata.type == exports.BPType.Pure) {
                    cdata.output.shift();
                }
                else {
                    cdata.properties.unshift(this.defFunIn);
                }
                if ('void' != fun.returnType) {
                    if (fun.returnType instanceof Array) {
                        cdata.output.push(...fun.returnType);
                    }
                    else {
                        cdata.output.push({ name: "return", type: fun.returnType });
                    }
                }
            }
        }
        static createCData(fun) {
            const parms = fun.params;
            let parmsId = "_";
            if (parms) {
                for (let i = 0, len = parms.length; i < len; i++) {
                    const p = parms[i];
                    parmsId += "_" + p.name;
                }
            }
            let cdata = {
                bpType: "function",
                modifiers: fun.modifiers,
                name: fun.name,
                id: "fun_" + fun.name + parmsId,
                oldId: "fun_" + fun.name,
                type: exports.BPType.Function,
                output: [this.defEventOut],
                properties: [],
            };
            if (null != fun.customId) {
                cdata.id = fun.customId;
                cdata.oldId = fun.customId;
            }
            else {
                cdata.id = fun.modifiers.isStatic ? cdata.id + "_static" : cdata.id;
                cdata.oldId = fun.modifiers.isStatic ? cdata.oldId + "_static" : cdata.oldId;
            }
            cdata.menuPath = fun.menuPath;
            cdata.type = _a.checklike.includes(fun.type) ? fun.type : cdata.type;
            cdata.type = fun.customId ? exports.BPType.CustomFun : cdata.type;
            cdata.customId = fun.customId || cdata.customId;
            cdata.typeParameters = fun.typeParameters || cdata.typeParameters;
            return cdata;
        }
        static formatData(data, assetId, dataMap, varMap) {
            let map = data.blueprintArr;
            let dec = {
                name: assetId,
                props: [],
                funcs: [],
                events: [],
                extends: data.extends,
            };
            for (const key in map) {
                let item = map[key];
                this._initTarget(item.arr, assetId);
            }
            if (data.variable) {
                let decProps = dec.props;
                data.variable.forEach((ele) => {
                    dataMap && (dataMap[ele.id] = ele);
                    varMap && (varMap[ele.id] = ele);
                    let decProp = {
                        name: ele.name,
                        tips: ele.tips,
                        caption: ele.caption,
                        type: ele.type,
                        customId: String(ele.id),
                        modifiers: ele.modifiers,
                        value: ele.value,
                    };
                    if (null == decProp.modifiers)
                        decProp.modifiers = {};
                    decProps.push(decProp);
                });
            }
            if (data.events)
                data.events.forEach((ele) => {
                    dataMap && (dataMap[ele.id] = ele);
                    dec.events.push(ele);
                });
            if (data.functions) {
                let funcs = dec.funcs;
                data.functions.forEach((ele) => {
                    dataMap && (dataMap[ele.id] = ele);
                    if (dataMap && ele.variable) {
                        ele.variable.forEach((ele) => {
                            dataMap[ele.id] = ele;
                        });
                    }
                    this._initTarget(ele.arr, assetId);
                    let func = {
                        name: ele.name,
                        tips: ele.tips,
                        type: "function",
                        customId: ele.id,
                        caption: ele.caption,
                        params: [],
                        modifiers: ele.modifiers,
                        returnType: "void"
                    };
                    if (null == func.modifiers)
                        func.modifiers = {};
                    let inputs = ele.properties;
                    if (inputs) {
                        let params = func.params;
                        for (let j = 0, len = inputs.length; j < len; j++) {
                            let input = inputs[j];
                            let param = {
                                name: input.name,
                                tips: input.tips,
                                caption: input.caption,
                                type: input.type,
                                id: input.id,
                            };
                            params.push(param);
                        }
                    }
                    let outputs = ele.output;
                    if (outputs) {
                        let returnType = [];
                        for (let j = 0, len = outputs.length; j < len; j++) {
                            let output = outputs[j];
                            returnType.push({ name: output.name, tips: output.tips, caption: output.caption, type: output.type, id: output.id });
                        }
                        func.returnType = returnType;
                    }
                    funcs.push(func);
                });
            }
            return dec;
        }
        static _initTarget(arr, target) {
            for (let i = arr.length - 1; i >= 0; i--) {
                if (null != arr[i].dataId && null == arr[i].target) {
                    arr[i].target = target;
                }
            }
        }
    }
    _a = BlueprintData;
    BlueprintData.allDataMap = new Map();
    BlueprintData.defFunOut = {
        name: "then",
        type: "exec",
        id: "out_" + EXECID
    };
    BlueprintData.defFunIn = {
        name: EXECID,
        caption: "execute",
        type: "exec",
        id: EXECID
    };
    BlueprintData.defTarget = {
        name: TARGETID,
        caption: "target",
        type: "any",
        id: TARGETID
    };
    BlueprintData.defEventOut = _a.defFunOut;
    BlueprintData.funlike = [exports.BPType.Function, exports.BPType.CustomFun, exports.BPType.Pure];
    BlueprintData.checklike = [exports.BPType.Pure, exports.BPType.Function, exports.BPType.Event];

    class BlueprintNode {
        constructor() {
            this.pins = [];
        }
        addPin(pin) {
            this.pins.push(pin);
        }
        parse(def) {
            this.def = def;
            this.name = def.name;
            this.setType(def.type);
            let arr = BlueprintFactory.getFunction(def.id || def.name, def.target);
            this.setFunction(arr ? arr[0] : null, arr ? arr[1] : false);
            if (def.properties) {
                this.addInput(def.properties);
            }
            if (def.output) {
                this.addOutput(def.output);
            }
        }
        getPropertyItem(key) {
            const arr = this.def.properties;
            for (let i = 0, len = arr.length; i < len; i++) {
                const item = arr[i];
                if (item.name == key || item.id == key) {
                    return item;
                }
            }
            return null;
        }
        getValueType(key) {
            let arr = this.def.properties;
            for (let i = 0, len = arr.length; i < len; i++) {
                let item = arr[i];
                if (item.name == key || item.id == key) {
                    if (null == item.valueType) {
                        let type = item.type;
                        if ("string" == typeof type) {
                            if (0 == type.indexOf("new()=>") || "class" == type || TARGETID == item.id) {
                                return "class";
                            }
                            else if (0 == type.indexOf("resource:")) {
                                return 'resource';
                            }
                        }
                        if (item.isAsset) {
                            return "resource";
                        }
                    }
                    return item.valueType;
                }
            }
            return null;
        }
        isEmptyObj(o) {
            for (let k in o) {
                return false;
            }
            return true;
        }
        _checkTarget(node) {
            if ((this.def.name && 0 == this.def.name.indexOf("static_")) && (null == node.inputValue || null == node.inputValue[TARGETID] && node.target)) {
                let properties = this.def.properties;
                if (properties) {
                    for (let i = 0, len = properties.length; i < len; i++) {
                        let item = properties[i];
                        if (TARGETID == item.id) {
                            if (null == node.inputValue) {
                                node.inputValue = {};
                            }
                            node.inputValue[TARGETID] = node.target;
                            return;
                        }
                    }
                }
            }
        }
        parseLinkData(node, manager) {
            this.onParseLinkData(node, manager);
            this._checkTarget(node);
            if (node.inputValue) {
                for (const key in node.inputValue) {
                    let pin = this.getPinByName(key);
                    if (!pin) {
                        console.error("not find pin " + key);
                        continue;
                    }
                    if (pin.linkTo.length == 0) {
                        let value = node.inputValue && node.inputValue[key];
                        let valueType = this.getValueType(key);
                        switch (valueType) {
                            case "class":
                                pin.value = BlueprintUtil.getClass(value);
                                break;
                            case "resource":
                                pin.value = BlueprintUtil.getResByUUID(value);
                                break;
                            default:
                                let result = Laya.SerializeUtil.decodeObj(value);
                                if (null == result) {
                                    const item = this.getPropertyItem(key);
                                    if (item && "string" === typeof item.type) {
                                        const cls = Laya.ClassUtils.getClass(item.type);
                                        if (cls) {
                                            result = Laya.SerializeUtil.decodeObj(value, new cls());
                                        }
                                    }
                                    if (null == result)
                                        result = value;
                                }
                                pin.value = result;
                                break;
                        }
                    }
                }
            }
            if (node.output) {
                for (const key in node.output) {
                    let pin = this.getPinByName(key);
                    if (!pin) {
                        console.error("not find pin " + key);
                        continue;
                    }
                    let item = node.output[key];
                    let infoArr = item.infoArr;
                    for (let i = 0, len = infoArr.length; i < len; i++) {
                        let info = infoArr[i];
                        let nextNode = manager.getNodeById(info.nodeId);
                        if (nextNode) {
                            let pinnext = nextNode.getPinByName(info.id);
                            if (!pinnext) {
                                console.error("not find to pin " + key);
                                continue;
                            }
                            pin.startLinkTo(pinnext);
                        }
                        else {
                            console.error("can't find node ");
                        }
                    }
                }
            }
        }
        onParseLinkData(node, manager) {
        }
        setFunction(fun, isMember) {
        }
        setType(type) {
            this.type = type;
        }
        addInput(input) {
            input.forEach(item => {
                let pin = this.createPin(item);
                pin.direction = exports.EPinDirection.Input;
                this.addPin(pin);
                pin.id = this.nid + "_" + (this.pins.length - 1);
            });
        }
        addOutput(output) {
            output.forEach(item => {
                let pin = this.createPin(item);
                pin.direction = exports.EPinDirection.Output;
                this.addPin(pin);
                pin.id = this.nid + "_" + (this.pins.length - 1);
            });
        }
        getPinByName(id) {
            return this.pins.find((pin) => { return pin.nid == id; });
        }
    }

    class BlueprintPin {
        get direction() {
            return this._direction;
        }
        set direction(value) {
            if (value == exports.EPinDirection.Input && this.type == exports.EPinType.BPFun) {
                this.type = exports.EPinType.Other;
            }
            this._direction = value;
        }
        constructor() {
            this.linkTo = [];
        }
        parse(def) {
            this.name = def.name;
            this.nid = def.id || def.name;
            this.otype = def.type;
            switch (def.type) {
                case "exec":
                    this.type = exports.EPinType.Exec;
                    break;
                case "bpFun":
                    this.type = exports.EPinType.BPFun;
                    break;
                default:
                    this.type = exports.EPinType.Other;
            }
        }
        startLinkTo(e) {
            this.linkTo.push(e);
            if (e.linkTo.indexOf(this) == -1) {
                e.linkTo.push(this);
            }
        }
    }

    class BlueprintPinRuntime extends BlueprintPin {
        step(context, runtimeDataMgr, runner, runId, prePin) {
            return this.owner.tryExecute(context, runtimeDataMgr, false, runner, true, runId, this, prePin);
        }
        execute(context, runtimeDataMgr, runner, runId) {
            const nextPin = this.linkTo[0];
            const index = nextPin === null || nextPin === void 0 ? void 0 : nextPin.owner.step(context, runtimeDataMgr, true, runner, true, runId, nextPin, this);
            return index;
        }
        getValueCode() {
            return typeof this.value == "string" ? ('"' + this.value + '"') : this.value;
        }
    }

    class BlueprintPromise {
        static create() {
            return new BlueprintPromise();
        }
        wait(callback) {
            this._callback = callback;
            if (this._completed) {
                callback(this);
            }
        }
        hasCallBack() {
            return this._callback != null;
        }
        complete() {
            this._completed = true;
            this._callback && this._callback(this);
        }
        recover() {
            this.clear();
        }
        clear() {
            this._callback = null;
            this._completed = false;
            this.pin = null;
            this.nid = null;
            this.prePin = null;
        }
    }

    class BlueprintRuntimeBaseNode extends BlueprintNode {
        constructor() {
            super();
            this.inPutParmPins = BlueprintRuntimeBaseNode._EMPTY;
            this.outPutParmPins = BlueprintRuntimeBaseNode._EMPTY;
            this.tryExecute = this.step;
        }
        addRef() {
            if (this._refNumber == undefined) {
                this._refNumber = 0;
            }
            this._refNumber++;
        }
        getRef() {
            return this._refNumber;
        }
        emptyExecute(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin) {
            return null;
        }
        createPin(def) {
            let pin = new BlueprintPinRuntime();
            pin.parse(def);
            return pin;
        }
        executeFun(context, runtimeDataMgr, runner, caller, parmsArray, runId, fromPin) {
            return context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, caller, parmsArray, runId);
        }
        collectParam(context, runtimeDataMgr, inputPins, runner, runId, prePin) {
            let _parmsArray = runtimeDataMgr.getDataById(this.nid).getParamsArray(runId);
            _parmsArray.length = 0;
            for (let i = 0, n = inputPins.length; i < n; i++) {
                const curInput = inputPins[i];
                let from = curInput.linkTo[0];
                if (from) {
                    if (!context.readCache) {
                        from.step(context, runtimeDataMgr, runner, runId, prePin);
                    }
                    context.parmFromOtherPin(curInput, runtimeDataMgr, from, _parmsArray, runId);
                }
                else {
                    context.parmFromSelf(curInput, runtimeDataMgr, _parmsArray, runId);
                }
            }
            context.readCache = false;
            return _parmsArray;
        }
        _checkRun(parmsArray) {
            let promiseList;
            parmsArray.forEach((parm) => {
                if (parm instanceof Promise) {
                    if (!promiseList)
                        promiseList = [];
                    promiseList.push(parm);
                }
            });
            if (promiseList) {
                return Promise.all(promiseList);
            }
            else {
                return null;
            }
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            if (this.outPutParmPins.length > 1) {
                context.parmFromOutPut(this.outPutParmPins, runtimeDataMgr, _parmsArray);
                context.parmFromCustom(_parmsArray, runId, "runId");
            }
            let promise = this._checkRun(_parmsArray);
            if (promise) {
                let bPromise = BlueprintPromise.create();
                this.returnValue && runtimeDataMgr.setPinData(this.returnValue, promise, runId);
                promise.then((value) => {
                    if (bPromise.hasCallBack()) {
                        bPromise.nid = this.nid;
                        bPromise.pin = fromPin;
                        bPromise.prePin = prePin;
                        context.readCache = true;
                        bPromise.complete();
                    }
                    else {
                        context.readCache = true;
                        this.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
                    }
                    bPromise.recover();
                });
                return bPromise;
            }
            const result = fromExecute && context.beginExecute(this, runner, enableDebugPause, fromPin, _parmsArray, prePin);
            if (result) {
                return result;
            }
            if (this.nativeFun) {
                let caller = null;
                if (this.isMember) {
                    let temp = _parmsArray.shift();
                    caller = temp === undefined ? context.getSelf() : temp;
                }
                let result = this.executeFun(context, runtimeDataMgr, runner, caller, _parmsArray, runId, fromPin);
                if (result instanceof Promise) {
                    let promise = BlueprintPromise.create();
                    result.then((value) => {
                        this.returnValue && runtimeDataMgr.setPinData(this.returnValue, value, runId);
                        let pin = this.next(context, runtimeDataMgr, _parmsArray, runner, enableDebugPause, runId, fromPin);
                        if (pin) {
                            pin = pin.linkTo[0];
                            promise.nid = pin ? pin.owner.nid : BlueprintConst.NULL_NODE;
                        }
                        promise.pin = pin;
                        promise.prePin = prePin;
                        promise.complete();
                        promise.recover();
                    });
                    return promise;
                }
            }
            if (fromExecute) {
                context.endExecute(this);
            }
            return this.next(context, runtimeDataMgr, _parmsArray, runner, true, runId, fromPin);
        }
        next(context, runtimeDataMgr, parmsArray, runner, enableDebugPause, runId, fromPin) {
            return null;
        }
        addPin(pin) {
            pin.owner = this;
            super.addPin(pin);
            if (pin.type == exports.EPinType.Other) {
                switch (pin.direction) {
                    case exports.EPinDirection.Input:
                        if (this.inPutParmPins == BlueprintRuntimeBaseNode._EMPTY) {
                            this.inPutParmPins = [];
                        }
                        this.inPutParmPins.push(pin);
                        break;
                    case exports.EPinDirection.Output:
                        if (this.outPutParmPins == BlueprintRuntimeBaseNode._EMPTY) {
                            this.outPutParmPins = [];
                        }
                        this.outPutParmPins.push(pin);
                        if (this.outPutParmPins.length == 1) {
                            this.returnValue = pin;
                        }
                        else {
                            this.returnValue = null;
                        }
                        break;
                }
            }
        }
        optimize() {
        }
        setFunction(fun, isMember) {
            this.nativeFun = fun;
            this.isMember = isMember;
            this.funcode = fun === null || fun === void 0 ? void 0 : fun.name;
        }
        addNextPIn() {
        }
    }
    BlueprintRuntimeBaseNode._EMPTY = [];

    class BlueprintAutoRun extends BlueprintRuntimeBaseNode {
        collectParam(context, runtimeDataMgr, inputPins, runner, runId, prePin) {
            let _parmsArray = runtimeDataMgr.getDataById(this.nid).getParamsArray(runId);
            _parmsArray.length = 0;
            for (let i = 0, n = inputPins.length; i < n; i++) {
                const curInput = inputPins[i];
                let from = curInput.linkTo[0];
                if (from) {
                    let fowner = from.owner;
                    if (!context.getCacheAble(fowner, runId)) {
                        from.step(context, runtimeDataMgr, runner, runId, prePin);
                        context.setCacheAble(fowner, runId, true);
                    }
                    context.parmFromOtherPin(curInput, runtimeDataMgr, from, _parmsArray, runId);
                }
                else {
                    context.parmFromSelf(curInput, runtimeDataMgr, _parmsArray, runId);
                }
            }
            context.readCache = false;
            return _parmsArray;
        }
    }

    class BlueprintFactory {
        static regBPClass(type, cls) {
            this._bpMap.set(type, cls);
        }
        static regFunction(fname, fun, isMember = false, cls = null, target = "system") {
            if (isMember == false && cls && fun) {
                fun = fun.bind(cls);
            }
            this._funMap.set(fname + "_" + target, [fun, isMember]);
        }
        static getFunction(fname, target) {
            return this._funMap.get(fname + "_" + target);
        }
        static regBPContextData(type, cls) {
            this._bpContextMap.set(type, cls);
        }
        static getBPContextData(type) {
            return this._bpContextMap.get(type) || RuntimeNodeData;
        }
        static createCls(name, cls) {
            function classFactory(className, SuperClass) {
                return {
                    [className]: class extends SuperClass {
                        constructor(...args) {
                            var _a;
                            super(...args);
                            let ctx = new BlueprintFactory.BPExecuteCls(this);
                            this[BlueprintFactory.contextSymbol] = ctx;
                            this._bp_data = {};
                            let varMap = this[BlueprintFactory.bpSymbol].varMap;
                            if (this[BlueprintFactory.bpSymbol].isRunningInIDE) {
                                this.runInEditor = true;
                            }
                            if (varMap) {
                                for (let key in varMap) {
                                    let v = varMap[key];
                                    if (!((_a = v.modifiers) === null || _a === void 0 ? void 0 : _a.isStatic)) {
                                        ctx.initVar(v.name, v.value);
                                        let _this = this;
                                        Object.defineProperty(this._bp_data, v.name, {
                                            enumerable: true,
                                            configurable: false,
                                            get: function () {
                                                return ctx.getVar(v.name);
                                            },
                                            set: function (value) {
                                                ctx.setVar(v.name, value);
                                                BlueprintFactory.onPropertyChanged_EM(_this);
                                            }
                                        });
                                    }
                                }
                            }
                            this._bp_init_();
                        }
                        onPropertyChanged_EM() { }
                        _bp_init_() {
                            let autoRegs = this[BlueprintFactory.bpSymbol].mainBlock.autoAnonymousfuns;
                            if (autoRegs) {
                                let _this = this;
                                autoRegs.forEach(value => {
                                    this.on(value.eventName, this, function () {
                                        _this[BlueprintFactory.bpSymbol].run(_this[BlueprintFactory.contextSymbol], value, Array.from(arguments), null);
                                    });
                                });
                            }
                        }
                        [(BlueprintFactory.contextSymbol, BlueprintFactory.bpSymbol, BlueprintFactory.contextSymbol, BlueprintFactory.onChangeSymbol, BlueprintFactory.autoRunSymbol)]() {
                            this[BlueprintFactory.bpSymbol].mainBlock.runAuto(this[BlueprintFactory.contextSymbol]);
                        }
                    }
                }[className];
            }
            let newClass = classFactory(name, cls);
            Object.defineProperty(newClass, 'name', { value: name });
            newClass[BlueprintFactory.contextSymbol] = new BlueprintFactory.BPExecuteCls(newClass);
            newClass._$loadable = true;
            newClass.prototype[BlueprintFactory.bpSymbol] = new BlueprintFactory.BPRuntimeCls();
            return newClass;
        }
        static parseCls(name, saveData, newClass, data, funs, varMap, preload) {
            var _a, _b;
            let staticContext = newClass[BlueprintFactory.contextSymbol];
            if (varMap) {
                for (let str in varMap) {
                    if ((_a = varMap[str].modifiers) === null || _a === void 0 ? void 0 : _a.isStatic) {
                        staticContext.initVar(varMap[str].name, varMap[str].value);
                    }
                }
            }
            let bp = newClass.prototype[BlueprintFactory.bpSymbol];
            bp.dataMap = data.dataMap;
            let c = function (node) {
                let ret = BlueprintUtil.getConstNode(node);
                if (null == ret && preload && node.target && !preload.includes(node.target)) {
                    console.warn(`Missing blueprint data: ${node.target}`);
                }
                return ret;
            };
            bp.varMap = varMap;
            bp.isRunningInIDE = (_b = saveData.globalInfo) === null || _b === void 0 ? void 0 : _b.isRunningInIDE;
            bp.parse(data, c, varMap, newClass);
            funs.forEach(fun => {
                bp.parseFunction(fun, c);
            });
            this.initClassHook(name, newClass);
        }
        static createClsNew(name, saveData, cls, data, funs, varMap) {
            let newClass = this.createCls(name, cls);
            this.parseCls(name, saveData, newClass, data, funs, varMap, null);
            return newClass;
        }
        static initClassHook(parent, cls) {
        }
        static onPropertyChanged_EM(bp) {
        }
        static get instance() {
            if (!this._instance) {
                this._instance = new BlueprintFactory();
            }
            return this._instance;
        }
        createNew(config, item) {
            var _a;
            let isAutoRun = (_a = config.modifiers) === null || _a === void 0 ? void 0 : _a.isAutoRun;
            let cls = BlueprintFactory._bpMap.get(config.type) || BlueprintFactory._bpMap.get(exports.BPType.Pure);
            if (isAutoRun) {
                cls = BlueprintAutoRun;
            }
            let result = new cls();
            result.nid = item.id;
            if (item.autoReg) {
                result.autoReg = item.autoReg;
            }
            result.parse(config);
            result._testItem = item;
            result._testConfig = config;
            return result;
        }
    }
    BlueprintFactory.bpSymbol = Symbol("bpruntime");
    BlueprintFactory.contextSymbol = Symbol("context");
    BlueprintFactory.onChangeSymbol = Symbol("onChange");
    BlueprintFactory.autoRunSymbol = Symbol("autoRun");
    BlueprintFactory._funMap = new Map();
    BlueprintFactory._bpMap = new Map();
    BlueprintFactory._bpContextMap = new Map();
    BlueprintFactory.bpNewMap = new Map();

    class BlueprintUtil {
        static clone(obj) {
            if (null == obj)
                return obj;
            return JSON.parse(JSON.stringify(obj));
        }
        static getConstNode(node) {
            this.initConstNode();
            return this.bpData.getConstNode(node);
        }
        static getConstDataById(target, dataId) {
            return this.bpData.getConstDataById(target, dataId);
        }
        static addCustomData(name, data) {
            customData[name] = data;
            BlueprintUtil.customModify = true;
            for (let key in this.onfinishCallbacks) {
                let [fun, caller, args] = this.onfinishCallbacks[key];
                let realArgs = args ? [name, ...args] : [name];
                fun.apply(caller, realArgs);
            }
        }
        static getDeclaration(name) {
            return extendsData[name] ? extendsData[name] : customData[name];
        }
        static initConstNode() {
            if (null == this.bpData) {
                this.bpData = new BlueprintData(extendsData, BlueprintFactory.regFunction.bind(BlueprintFactory), BlueprintUtil.getClass.bind(BlueprintUtil));
            }
            if (this.customModify) {
                this.bpData.initData(customData);
                this.customModify = false;
            }
        }
        static getClass(ext) {
            return this.classMap[ext];
        }
        static regClass(name, cls) {
            this.classMap[name] = cls;
        }
        static regResByUUID(uuid, res) {
            this.resouceMap.set(uuid, res);
        }
        static getResByUUID(uuid) {
            return this.resouceMap.get(uuid);
        }
        static getNameByUUID(uuid) {
            return null;
        }
    }
    BlueprintUtil.classMap = {};
    BlueprintUtil.onfinishCallbacks = {};
    BlueprintUtil.resouceMap = new Map();
    BlueprintUtil.CustomClassFinish = "CustomClassFinish";
    BlueprintUtil.customModify = false;

    const Precedence = {
        "=": 0,
        "+=": 0,
        '|': 0,
        '||': 0,
        '&': 1,
        '&&': 1,
        '+': 2,
        '-': 2,
        '*': 3,
        '/': 3,
        '>=': 4,
        '<=': 4,
        '==': 4,
        '!=': 4,
        '>': 4,
        '<': 4,
        '!': 5,
        '++': 6,
        '--': 6,
    };

    class ExpressTree {
        call(context) {
            return null;
        }
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
        static autoFormat(value) {
            let str;
            if (ExpressTree.realMap.hasOwnProperty(value)) {
                return ExpressTree.realMap[value];
            }
            else if (ExpressTree.isNumber(value)) {
                return parseFloat(value);
            }
            else if (str = ExpressTree.isString(value)) {
                return str;
            }
            else {
                try {
                    return JSON.parse(value);
                }
                catch (e) {
                    return value;
                }
            }
        }
        equal(value, context) {
            debugger;
        }
        static isNumber(token) {
            return !isNaN(token) && !isNaN(+token);
        }
        static isString(token) {
            let result = ExpressTree.strReg.exec(token);
            if (result) {
                return result[2];
            }
            return false;
        }
        static isExpress(token) {
            const regex = /[&|.!+\-*/]/;
            return regex.test(token);
        }
        static splitExpress(express) {
            const parts = [];
            let currentPart = '';
            let parenthesesDepth = 0;
            for (const char of express) {
                if (char === '(') {
                    parenthesesDepth++;
                    currentPart += char;
                }
                else if (char === ')') {
                    parenthesesDepth--;
                    currentPart += char;
                }
                else if (char === '.' && parenthesesDepth === 0) {
                    parts.push(currentPart);
                    currentPart = '';
                }
                else {
                    currentPart += char;
                }
            }
            if (currentPart) {
                parts.push(currentPart);
            }
            return parts;
        }
        clone() {
            let node = new ExpressTree(this.value);
            if (this.left) {
                node.left = this.left.clone();
            }
            if (this.right) {
                node.right = this.right.clone();
            }
            node.call = this.call;
            return node;
        }
        static parseProperty(express) {
            let op;
            const parts = ExpressTree.splitExpress(express);
            let operators = [];
            let isFun;
            let params = [];
            for (const part of parts) {
                if (part.includes('(')) {
                    let ind = part.indexOf('(');
                    let funName = part.slice(0, ind);
                    let funPara = part.slice(ind + 1, part.length - 1);
                    let tparams = funPara.split(",");
                    for (let i = 0; i < tparams.length; i++) {
                        let param = tparams[i];
                        if (!ExpressTree.isNumber(param)) {
                            let str = ExpressTree.isString(param);
                            if (str === false) {
                                if (this.realMap.hasOwnProperty(param)) {
                                    params[i] = new ExpressOrgin(this.realMap[param]);
                                }
                                else if (this.isExpress(param)) {
                                    params[i] = ExpressParse.instance.parse(param);
                                }
                                else {
                                    params[i] = this.parseProperty(param);
                                }
                            }
                            else {
                                params[i] = new ExpressString(str);
                            }
                        }
                        else {
                            params[i] = new ExpressOrgin(Number(param));
                        }
                    }
                    operators.push(funName);
                    isFun = true;
                }
                else {
                    operators.push(part);
                }
            }
            if (isFun) {
                op = new ExpressFunction(operators);
                op.params = params;
            }
            else {
                op = new ExpressProperty(operators);
            }
            return op;
        }
        static creatreExpressTree(express) {
            let op = this.operatorPriority[express];
            if (op == null) {
                if (this.isNumber(express)) {
                    op = new ExpressOrgin(Number(express));
                }
                else {
                    let str = this.isString(express);
                    if (str === false) {
                        if (this.realMap.hasOwnProperty(express)) {
                            op = new ExpressOrgin(this.realMap[express]);
                        }
                        else {
                            op = this.parseProperty(express);
                        }
                    }
                    else {
                        op = new ExpressString(str);
                    }
                }
                return op;
            }
            return op.clone();
        }
        static init() {
            if (!this._inited) {
                var allPrioritys = [];
                for (let key in Precedence) {
                    let treeNode = new ExpressTree(key);
                    allPrioritys.push(treeNode);
                    switch (key) {
                        case '=':
                            treeNode.call = function (context) {
                                return this.left.equal(this.right.call(context), context);
                            };
                            break;
                        case '+=':
                            treeNode.call = function (context) {
                                return this.left.equal(this.left.call(context) + this.right.call(context), context);
                            };
                            break;
                        case '&':
                            treeNode.call = function (context) {
                                return this.left.call(context) & this.right.call(context);
                            };
                            break;
                        case '|':
                            treeNode.call = function (context) {
                                return this.left.call(context) | this.right.call(context);
                            };
                            break;
                        case '&&':
                            treeNode.call = function (context) {
                                return this.left.call(context) && this.right.call(context);
                            };
                            break;
                        case '||':
                            treeNode.call = function (context) {
                                return this.left.call(context) || this.right.call(context);
                            };
                            break;
                        case '+':
                            treeNode.call = function (context) {
                                return this.left.call(context) + this.right.call(context);
                            };
                            break;
                        case '-':
                            treeNode.call = function (context) {
                                return this.left.call(context) - this.right.call(context);
                            };
                            break;
                        case '*':
                            treeNode.call = function (context) {
                                return this.left.call(context) * this.right.call(context);
                            };
                            break;
                        case '/':
                            treeNode.call = function (context) {
                                return this.left.call(context) / this.right.call(context);
                            };
                            break;
                        case '>=':
                            treeNode.call = function (context) {
                                return this.left.call(context) >= this.right.call(context);
                            };
                            break;
                        case '<=':
                            treeNode.call = function (context) {
                                return this.left.call(context) <= this.right.call(context);
                            };
                            break;
                        case '==':
                            treeNode.call = function (context) {
                                return this.left.call(context) == this.right.call(context);
                            };
                            break;
                        case '!=':
                            treeNode.call = function (context) {
                                return this.left.call(context) != this.right.call(context);
                            };
                            break;
                        case '>':
                            treeNode.call = function (context) {
                                return this.left.call(context) > this.right.call(context);
                            };
                            break;
                        case '<':
                            treeNode.call = function (context) {
                                return this.left.call(context) < this.right.call(context);
                            };
                            break;
                        case '!':
                            treeNode.call = function (context) {
                                return !this.right.call(context);
                            };
                            break;
                        case '++':
                            treeNode.call = function (context) {
                                if (this.right) {
                                    return this.right.equal(this.right.call(context) + 1, context);
                                }
                                else {
                                    let result = this.left.call(context);
                                    this.left.equal(result + 1, context);
                                    return result;
                                }
                            };
                            break;
                        case "--":
                            treeNode.call = function (context) {
                                if (this.right) {
                                    return this.right.equal(this.right.call(context) - 1, context);
                                }
                                else {
                                    let result = this.left.call(context);
                                    this.left.equal(result - 1, context);
                                    return result;
                                }
                            };
                            break;
                    }
                    allPrioritys.forEach((item, index) => {
                        this.operatorPriority[item.value] = item;
                    });
                }
                this._inited = true;
            }
        }
    }
    ExpressTree.strReg = new RegExp("^(\"|')(.*)\\1$");
    ExpressTree.realMap = {
        "true": true,
        "false": false,
        "null": null,
        "undefined": undefined
    };
    ExpressTree.operatorPriority = {};
    ExpressTree._inited = false;
    class ExpressOrgin extends ExpressTree {
        constructor(value) {
            super(value);
        }
        call(context) {
            return this.value;
        }
    }
    class ExpressString extends ExpressTree {
        constructor(value) {
            super(value);
        }
        call(context) {
            return this.value;
        }
    }
    class ExpressProperty extends ExpressTree {
        constructor(value) {
            super(value);
            this.propertys = value;
        }
        equal(value, context) {
            if (this.realObj) {
                this.realObj[this.realKey] = value;
            }
            else {
                context[this.propertys[0]] = value;
            }
            return value;
        }
        call(context) {
            let result = context;
            this.propertys.forEach((item, index) => {
                if (result) {
                    this.realObj = result;
                    if (result[BlueprintFactory.contextSymbol]) {
                        result = result[BlueprintFactory.contextSymbol].getVar(item);
                    }
                    else {
                        result = result[item];
                    }
                    this.realKey = item;
                }
                else {
                    console.warn(this.propertys, item + "属性不存在");
                }
            });
            return result;
        }
    }
    class ExpressFunction extends ExpressProperty {
        call(context) {
            let result = super.call(context);
            if (!result) {
                console.warn(this.propertys, "函数不存在");
                return null;
            }
            let tparams = [];
            this.params.forEach((item, index) => {
                tparams.push(item.call(context));
            });
            return result.apply(this.realObj, tparams);
        }
    }
    class ExpressDict extends ExpressTree {
        call(context) {
            return this.left.call(context)[this.right.call(context)];
        }
        equal(value, context) {
            this.left.call(context)[this.right.call(context)] = value;
        }
    }

    class ExpressParse {
        constructor() {
            this._catch = new Map();
        }
        static get instance() {
            if (!this._instance) {
                ExpressTree.init();
                this._instance = new ExpressParse();
            }
            return this._instance;
        }
        isOperator(token) {
            return Object.keys(Precedence).indexOf(token) != -1;
        }
        tokenize(expression) {
            let exp = new RegExp("/\\*([\\s\\S]*?)\\*/|//.*|'(.*?)'|\"(.*?)\"|\\`([\\s\\S]*?)\\`|\\.{3}|[$\\w.]+|(\\+\\+|--|\\|\\||&&|>>>|>>|<<|==|!=)(=){0,1}|=>|\\*\\*(=){0,1}|[+*-/%=><!\\|&~^](=){0,1}|[?;:()\\[\\]\{\\}]", "g");
            let tokens = expression.match(exp);
            if (!tokens) {
                return null;
            }
            let result1 = [];
            let flag = 0;
            let isSingle = (str) => {
                return !isNaN(str) || this.isOperator(str) || ExpressParse.brackets.indexOf(str) != -1;
            };
            for (let i = 0; i < tokens.length; i++) {
                let str1 = tokens[i];
                let str2 = tokens[i + 1];
                if (flag) {
                    result1[result1.length - 1] += str1;
                    if (str2) {
                        if (str2 == ")") {
                            flag--;
                            if (!flag) {
                                result1[result1.length - 1] += str2;
                                i++;
                            }
                        }
                        else if (str2 == "(") {
                            flag++;
                        }
                    }
                }
                else {
                    result1.push(str1);
                    flag = (!isSingle(str1) && str2 == "(") ? 1 : 0;
                }
            }
            let result2 = [];
            for (let i = 0; i < result1.length; i++) {
                let str1 = result1[i];
                let str2 = result1[i + 1];
                result2.push(str1);
                if (str2 && !isSingle(str1) && !isSingle(str2)) {
                    i++;
                    result2[result2.length - 1] += str2;
                }
            }
            return result2;
        }
        parse(expression) {
            if (this._catch.has(expression)) {
                return this._catch.get(expression);
            }
            const tokens = this.tokenize(expression);
            const operationsStack = [];
            const valuesStack = [];
            const applyOperator = () => {
                const operator = operationsStack.pop();
                const right = valuesStack.pop();
                const left = valuesStack.pop();
                const node = ExpressTree.creatreExpressTree(operator);
                node.left = left;
                node.right = right;
                valuesStack.push(node);
            };
            tokens === null || tokens === void 0 ? void 0 : tokens.forEach(token => {
                if (token === '(' || token === '[') {
                    operationsStack.push(token);
                }
                else if (token === ')' || token === ']') {
                    while (operationsStack[operationsStack.length - 1] !== ExpressParse.brackmap[token]) {
                        applyOperator();
                    }
                    if (token == "]") {
                        const node = new ExpressDict(null);
                        node.right = valuesStack.pop();
                        node.left = valuesStack.pop();
                        valuesStack.push(node);
                    }
                    operationsStack.pop();
                }
                else if (!this.isOperator(token)) {
                    valuesStack.push(ExpressTree.creatreExpressTree(token));
                }
                else {
                    while (operationsStack.length &&
                        Precedence[token] <= Precedence[operationsStack[operationsStack.length - 1]]) {
                        applyOperator();
                    }
                    if (token == "++" || token == "--") {
                        valuesStack.push(null);
                    }
                    operationsStack.push(token);
                }
            });
            while (operationsStack.length) {
                applyOperator();
            }
            let result = valuesStack.pop();
            this._catch.set(expression, result);
            return result;
        }
    }
    ExpressParse.brackets = ['(', ')', '[', ']'];
    ExpressParse.brackmap = {
        ')': '(',
        ']': '[',
    };

    class BlueprintStaticFun {
        static branch(outExecutes, input) {
            return input ? outExecutes[0] : outExecutes[1];
        }
        static switchFun(outExecutes, input) {
            return outExecutes.find((item) => item.nid == input) || outExecutes.find((item) => item.nid == "default");
        }
        static print(str) {
            console.log(str);
        }
        static getTempVar(name, runtimeDataMgr, runId) {
            return runtimeDataMgr.getVar(name, runId);
        }
        static setTempVar(value, name, runtimeDataMgr, runId) {
            return runtimeDataMgr.setVar(name, value, runId);
        }
        static getVariable(target, name, context) {
            if (!target) {
                return context.getVar(name);
            }
            else {
                let realContext = target[BlueprintFactory.contextSymbol];
                if (realContext) {
                    return realContext.getVar(name);
                }
                else {
                    return target[name];
                }
            }
        }
        static getSelf(name, context) {
            return context.getSelf();
        }
        static setVariable(target, value, name, context) {
            if (!target) {
                context.setVar(name, value);
            }
            else {
                let realContext = target[BlueprintFactory.contextSymbol];
                if (realContext) {
                    realContext.setVar(name, value);
                }
                else {
                    target[name] = value;
                }
            }
            return value;
        }
        static waitTime(second) {
            return new Promise((resolve, rejects) => {
                setTimeout(() => {
                    resolve(true);
                }, second * 1000);
            });
        }
        static add(a, b) {
            return a + b;
        }
        static expression() {
            return true;
        }
        static typeInstanceof(outExecutes, target, type) {
            let b;
            if (typeof (type) == 'string') {
                b = typeof (target) == type;
            }
            else {
                b = target instanceof type;
            }
            return b ? outExecutes[0] : outExecutes[1];
        }
        static runBranch(nextExec, outPutParmPins, parms, context, runner, runtimeDataMgr, prePin, runId) {
            let curRunId = runner.getRunID();
            parms.forEach((item, index) => {
                runtimeDataMgr.setPinData(outPutParmPins[index], item, curRunId);
            });
            runtimeDataMgr.saveContextData(runId, curRunId);
            runner.runByContext(context, runtimeDataMgr, nextExec.owner, true, null, curRunId, nextExec, prePin);
        }
        static forEach(inputExecute, inputExecutes, outExecutes, outPutParmPins, context, runner, runtimeDataMgr, runId, array) {
            let nextPin = outExecutes[0].linkTo[0];
            if (nextPin) {
                array.forEach((item, index) => {
                    BlueprintStaticFun.runBranch(nextPin, outPutParmPins, [item, index], context, runner, runtimeDataMgr, outExecutes[0], runId);
                });
            }
            return outExecutes[1].execute(context, runtimeDataMgr, runner, runId);
        }
        static forEachWithBreak(inputExecute, inputExecutes, outExecutes, outPutParmPins, context, runner, runtimeDataMgr, runId, array) {
            let breakNode;
            if (inputExecute == inputExecutes[1]) {
                breakNode = runtimeDataMgr.getRuntimePinById(inputExecute.id);
                if (breakNode.getValue(runId) == ERunStat.running) {
                    breakNode.initValue(ERunStat.break);
                }
                return null;
            }
            breakNode = runtimeDataMgr.getRuntimePinById(inputExecutes[1].id);
            breakNode.initValue(ERunStat.running);
            let nextPin = outExecutes[0].linkTo[0];
            if (nextPin) {
                for (let i = 0; i < array.length; i++) {
                    BlueprintStaticFun.runBranch(nextPin, outPutParmPins, [array[i], i], context, runner, runtimeDataMgr, outExecutes[0], runId);
                    if (breakNode.getValue(runId) == ERunStat.break) {
                        break;
                    }
                }
            }
            breakNode.initValue(ERunStat.end);
            return outExecutes[1].execute(context, runtimeDataMgr, runner, runId);
        }
        static forLoop(inputExecute, inputExecutes, outExecutes, outPutParmPins, context, runner, runtimeDataMgr, runId, firstIndex, lastIndex, step = 1) {
            if (step <= 0)
                step = 1;
            let nextPin = outExecutes[0].linkTo[0];
            if (nextPin) {
                for (let i = firstIndex; i < lastIndex; i += step) {
                    BlueprintStaticFun.runBranch(nextPin, outPutParmPins, [i], context, runner, runtimeDataMgr, outExecutes[0], runId);
                }
            }
            return outExecutes[1].execute(context, runtimeDataMgr, runner, runId);
        }
        static forLoopWithBreak(inputExecute, inputExecutes, outExecutes, outPutParmPins, context, runner, runtimeDataMgr, runId, firstIndex, lastIndex, step = 1) {
            let breakNode;
            if (inputExecute == inputExecutes[1]) {
                breakNode = runtimeDataMgr.getRuntimePinById(inputExecute.id);
                if (breakNode.getValue(runId) == ERunStat.running) {
                    breakNode.initValue(ERunStat.break);
                }
                return null;
            }
            else {
                breakNode = runtimeDataMgr.getRuntimePinById(inputExecutes[1].id);
                breakNode.initValue(ERunStat.running);
                if (step <= 0)
                    step = 1;
                let nextPin = outExecutes[0].linkTo[0];
                if (nextPin) {
                    for (let i = firstIndex; i < lastIndex; i += step) {
                        BlueprintStaticFun.runBranch(nextPin, outPutParmPins, [i], context, runner, runtimeDataMgr, outExecutes[0], runId);
                        if (breakNode.getValue(runId) == ERunStat.break) {
                            break;
                        }
                    }
                }
                breakNode.initValue(ERunStat.end);
                return outExecutes[1].execute(context, runtimeDataMgr, runner, runId);
            }
        }
        static runExpress(express, a, b, c) {
            let expressTree = ExpressParse.instance.parse(express);
            let context = { a: a, b: b, c: c, Math: Math };
            return expressTree.call(context);
        }
    }
    var ERunStat;
    (function (ERunStat) {
        ERunStat[ERunStat["running"] = 1] = "running";
        ERunStat[ERunStat["break"] = 2] = "break";
        ERunStat[ERunStat["end"] = 0] = "end";
    })(ERunStat || (ERunStat = {}));

    class BluePrintAsNode extends BlueprintRuntimeBaseNode {
        optimize() {
            let out = this.outPutParmPins[0];
            let insert = this.inPutParmPins[0];
            let pre = insert.linkTo[0];
            if (pre) {
                out.linkTo.forEach(value => {
                    let index = value.linkTo.indexOf(out);
                    value.linkTo[index] = pre;
                    let indexnew = pre.linkTo.indexOf(value);
                    if (indexnew != -1) {
                        pre.linkTo[indexnew] = value;
                    }
                    else {
                        pre.linkTo.push(value);
                    }
                });
                let index = pre.linkTo.indexOf(insert);
                pre.linkTo.splice(index, 1);
            }
        }
    }

    class BlueprintComplexNode extends BlueprintRuntimeBaseNode {
        constructor() {
            super();
            this.inExecutes = [];
            this.outExecutes = [];
            this.tryExecute = this.emptyExecute;
        }
        next(context, runtimeDataMgr, parmsArray, runner, enableDebugPause, runId, fromPin) {
            let result = this.find(this.outExecutes, ...parmsArray);
            if (result.linkTo.length) {
                return result;
            }
            return null;
        }
        addPin(pin) {
            super.addPin(pin);
            if (pin.type == exports.EPinType.Exec) {
                if (pin.direction == exports.EPinDirection.Input) {
                    this.inExecutes.push(pin);
                }
                else if (pin.direction == exports.EPinDirection.Output) {
                    this.outExecutes.push(pin);
                }
            }
        }
        setFunction(fun) {
            this.nativeFun = null;
            this.funcode = fun === null || fun === void 0 ? void 0 : fun.name;
            this.find = fun;
        }
    }

    class BluePrintBlockNode extends BlueprintComplexNode {
        next(context, runtimeDataMgr, parmsArray, runner, enableDebugPause, runId, fromPin) {
            let result = this.deal(fromPin, this.inExecutes, this.outExecutes, this.outPutParmPins, context, runner, runtimeDataMgr, runId, ...parmsArray);
            return result;
        }
        setFunction(fun) {
            this.nativeFun = null;
            this.funcode = fun === null || fun === void 0 ? void 0 : fun.name;
            this.deal = fun;
        }
    }

    class BlueprintFunNode extends BlueprintRuntimeBaseNode {
        constructor() {
            super();
            this.tryExecute = this.emptyExecute;
        }
        onParseLinkData(node, manager) {
            if (node.dataId) {
                this.eventName = BlueprintUtil.getConstDataById(node.target, String(node.dataId)).name;
                this.executeFun = this.executeHookFun;
            }
        }
        executeHookFun(context, runtimeDataMgr, runner, caller, parmsArray, runId, fromPin) {
            parmsArray.unshift(this.eventName);
            return context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, caller, parmsArray, runId);
        }
        executeFun(context, runtimeDataMgr, runner, caller, parmsArray, runId, fromPin) {
            if (caller && this.type == exports.BPType.Function) {
                this.nativeFun = caller[this.name];
            }
            return context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, caller, parmsArray, runId);
        }
        next() {
            return this.staticNext;
        }
        addPin(pin) {
            super.addPin(pin);
            if (pin.type == exports.EPinType.Exec) {
                if (pin.direction == exports.EPinDirection.Input) {
                    this.inExecute = pin;
                }
                else if (pin.direction == exports.EPinDirection.Output) {
                    this.outExecute = pin;
                    if (!this.outExecutes) {
                        this.outExecutes = [];
                    }
                    this.outExecutes.push(pin);
                }
            }
        }
        optimize() {
            this.staticNext = this.outExecute;
        }
    }

    class BlueprintCustomFunNode extends BlueprintFunNode {
        constructor() {
            super();
            this.inExecutes = [];
        }
        collectParam(context, runtimeDataMgr, inputPins, runner, runId, prePin) {
            this._checkFun();
            let parmsArray = super.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromOutPut(this.outPutParmPins, runtimeDataMgr, parmsArray);
            return parmsArray;
        }
        _checkFun() {
            if (!this._isCheck) {
                this._isCheck = true;
                if (this.bpruntime) {
                    let fun = this.bpruntime.funBlockMap.get(this.functionID);
                    if (fun && fun.isStatic) {
                        this.isMember = false;
                    }
                    else {
                        this.staticContext = null;
                    }
                }
            }
        }
        onParseLinkData(node, manager) {
            let id = String(node.dataId);
            if (id) {
                this.functionID = id;
                this.isMember = true;
                let cls = BlueprintUtil.getClass(node.target);
                if (cls) {
                    this.bpruntime = cls.prototype[BlueprintFactory.bpSymbol];
                    this.staticContext = cls[BlueprintFactory.contextSymbol];
                }
            }
        }
        executeFun(context, runtimeDataMgr, runner, caller, parmsArray, runId, fromPin) {
            let bpRuntime;
            let _funcContext;
            if (!this.isMember) {
                bpRuntime = this.bpruntime;
                _funcContext = this.staticContext;
            }
            else if (caller && caller[BlueprintFactory.contextSymbol]) {
                bpRuntime = caller[BlueprintFactory.bpSymbol];
                _funcContext = caller[BlueprintFactory.contextSymbol];
            }
            else {
                return null;
            }
            let primise;
            let cb;
            let result;
            result = bpRuntime.runCustomFun(_funcContext, this.functionID, parmsArray, () => {
                this._executeFun(_funcContext, cb, parmsArray, runner);
            }, runId, this.inExecutes.indexOf(fromPin), this.outExecutes, runner, runtimeDataMgr);
            if (result === false) {
                primise = new Promise((resolve, reject) => {
                    cb = resolve;
                });
                return primise;
            }
            return null;
        }
        _executeFun(context, cb, parmsArray, runner) {
            if (cb) {
                cb();
            }
        }
        addPin(pin) {
            super.addPin(pin);
            if (pin.type == exports.EPinType.Exec) {
                if (pin.direction == exports.EPinDirection.Input) {
                    this.inExecutes.push(pin);
                }
            }
        }
        optimize() {
            this.staticNext = this.outExecutes[0];
        }
        setFunction(fun, isMember) {
            this.nativeFun = this.customFun;
            this.isMember = isMember;
            this.funcode = fun === null || fun === void 0 ? void 0 : fun.name;
        }
        customFun(parms) {
        }
    }

    class BlueprintCustomFunReturn extends BlueprintRuntimeBaseNode {
        constructor() {
            super();
            this.inExecutes = [];
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            super.step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin);
            let nodeContext = runtimeDataMgr.getDataById(this.nid);
            let index = this.inExecutes.indexOf(fromPin);
            if (index == 0) {
                let curRunId = nodeContext.runIdMap.get(runId);
                nodeContext.returnResult(runId, curRunId);
            }
            else {
                nodeContext.returnResult(runId, runId);
                nodeContext.runExecute(runId, index, context);
                return 1;
            }
            return null;
        }
        initData(runtimeDataMgr, curRunId, runId, parms, offset, outExecutes, runner, oldRuntimeDataMgr) {
            let data = runtimeDataMgr.getDataById(this.nid);
            data.initData(curRunId, runId, parms, offset, outExecutes, runner, oldRuntimeDataMgr);
        }
        addPin(pin) {
            super.addPin(pin);
            if (pin.type == exports.EPinType.Exec) {
                if (pin.direction == exports.EPinDirection.Input) {
                    this.inExecutes.push(pin);
                }
            }
        }
    }
    class BlueprintCustomFunReturnContext extends RuntimeNodeData {
        constructor() {
            super();
            this.returnMap = new Map();
            this.runIdMap = new Map();
            this.outExecutesMap = new Map();
            this.runnerMap = new Map();
        }
        initData(curRunId, runId, parms, offset, outExecutes, runner, runtimeDataMgr) {
            let result = [];
            this.returnMap.set(curRunId, result);
            this.runIdMap.set(curRunId, runId);
            this.outExecutesMap.set(curRunId, outExecutes);
            this.runnerMap.set(curRunId, [runner, runtimeDataMgr]);
            for (let i = offset; i < parms.length; i++) {
                result.push(parms[i]);
            }
        }
        runExecute(runId, index, context) {
            let outExecutes = this.outExecutesMap.get(runId);
            if (outExecutes) {
                let outExecute = outExecutes[index];
                if (outExecute) {
                    let nextPin = outExecute.linkTo[0];
                    if (nextPin) {
                        let runner = this.runnerMap.get(runId);
                        runner[0].runByContext(context, runner[1], nextPin.owner, true, null, runId, nextPin, outExecute);
                    }
                }
            }
        }
        returnResult(runId, curRunId) {
            let result = this.returnMap.get(runId);
            if (result) {
                result.forEach((parm, index) => {
                    parm.setValue(curRunId, this.getParamsArray(runId)[index]);
                });
            }
        }
    }

    class BlueprintEventNode extends BlueprintRuntimeBaseNode {
        constructor() {
            super();
            this.tryExecute = this.emptyExecute;
        }
        onParseLinkData(node, manager) {
            if (node.dataId) {
                this.isAnonymous = true;
                this.eventName = BlueprintUtil.getConstDataById(node.target, String(node.dataId)).name;
            }
            else {
                this.eventName = node.name;
            }
        }
        setFunction(fun, isMember) {
            this.nativeFun = null;
            this.isMember = isMember;
            this.funcode = fun === null || fun === void 0 ? void 0 : fun.name;
        }
        emptyExecute(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin) {
            if (fromPin && fromPin.otype == "bpFun") {
                let data = runtimeDataMgr.getDataById(this.nid);
                let _this = this;
                data.eventName = this.eventName;
                let callFun = data.getCallFun(runId);
                if (!callFun) {
                    callFun = function () {
                        let parms = Array.from(arguments);
                        let nextPin = _this.outExecute.linkTo[0];
                        if (nextPin) {
                            runner.runAnonymous(context, _this, parms, null, runId, 0, runner.getRunID(), runtimeDataMgr);
                        }
                    };
                    data.setCallFun(runId, callFun);
                }
                runtimeDataMgr.setPinData(fromPin, callFun, runId);
            }
            return null;
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            if (fromExecute) {
                context.endExecute(this);
            }
            return fromPin ? fromPin : this.staticNext;
        }
        addPin(pin) {
            super.addPin(pin);
            if (pin.type == exports.EPinType.Exec && pin.direction == exports.EPinDirection.Output) {
                this.outExecute = pin;
                if (!this.outExecutes) {
                    this.outExecutes = [];
                }
                this.outExecutes.push(pin);
            }
        }
        optimize() {
            this.staticNext = this.outExecute;
        }
        initData(runtimeDataMgr, parms, curRunId) {
            this.outPutParmPins.forEach((value, index) => {
                runtimeDataMgr.setPinData(value, parms[index], curRunId);
            });
        }
    }

    class BlueprintCustomFunStart extends BlueprintEventNode {
        onParseLinkData(node, manager) {
            if (node.dataId) {
                this.eventName = manager.dataMap[String(node.dataId)].name;
            }
            else {
                this.eventName = node.name;
            }
        }
    }

    class BlueprintGetTempVarNode extends BlueprintRuntimeBaseNode {
        constructor() {
            super();
        }
        onParseLinkData(node, manager) {
            let cfg = manager.dataMap[String(node.dataId)];
            this._varKey = cfg ? cfg.name : BlueprintUtil.getConstDataById(node.target, String(node.dataId)).name;
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, runtimeDataMgr, "runtimeDataMgr");
            context.parmFromCustom(_parmsArray, runId, "runId");
            if (this.nativeFun) {
                let result = context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, BlueprintStaticFun, _parmsArray, runId);
                if (result == undefined) {
                    runtimeDataMgr.setPinData(this.outPutParmPins[0], result, runId);
                }
            }
            return null;
        }
    }

    class BlueprintGetVarNode extends BlueprintRuntimeBaseNode {
        constructor() {
            super();
        }
        onParseLinkData(node, manager) {
            let cfg = BlueprintUtil.getConstDataById(node.target, String(node.dataId));
            if (cfg) {
                this._varKey = cfg.name;
            }
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, context, "context");
            if (this.nativeFun) {
                let result = context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, BlueprintStaticFun, _parmsArray, runId);
                if (result == undefined) {
                    runtimeDataMgr.setPinData(this.outPutParmPins[0], result, runId);
                }
            }
            return null;
        }
    }

    class BlueprintNewTargetNode extends BlueprintRuntimeBaseNode {
        parse(def) {
            super.parse(def);
            this.cls = BlueprintUtil.getClass(def.target);
            if (!this.cls) {
                console.warn("regclass not find " + def.target);
            }
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            let result = this.cls ? Reflect.construct(this.cls, _parmsArray) : {};
            if (!this.cls) {
                for (let i = 0; i < this.inPutParmPins.length; i++) {
                    let pin = this.inPutParmPins[i];
                    if (pin.value !== undefined) {
                        result[pin.name] = pin.value;
                    }
                }
            }
            runtimeDataMgr.setPinData(this.outPutParmPins[0], result, runId);
            if (fromExecute) {
                context.endExecute(this);
            }
            return this.next(context, runtimeDataMgr, _parmsArray, runner, enableDebugPause, runId, fromPin);
        }
    }

    class BlueprintSequenceNode extends BlueprintComplexNode {
        next(context, runtimeDataMgr, parmsArray, runner, enableDebugPause, runId) {
            let arr = [];
            for (let i = 0, n = this.outExecutes.length; i < n; i++) {
                let item = this.outExecutes[i];
                let pin = item.linkTo[0];
                if (pin) {
                    let cb;
                    let result;
                    if (context.debuggerPause) {
                        result = false;
                        let callback = (owner) => {
                            if (context.debuggerPause) {
                                context.pushBack(owner, callback);
                            }
                            else {
                                result = runner.runByContext(context, runtimeDataMgr, owner, enableDebugPause, () => {
                                    if (result === false && cb) {
                                        cb();
                                    }
                                }, runId, pin, item, true);
                                if (result && cb) {
                                    cb();
                                }
                            }
                        };
                        context.pushBack(pin.owner, callback);
                    }
                    else {
                        result = runner.runByContext(context, runtimeDataMgr, pin.owner, enableDebugPause, () => {
                            if (result === false && cb) {
                                cb();
                            }
                        }, runId, pin, item, true);
                    }
                    if (result === false) {
                        let promise = new Promise((resolve) => {
                            cb = resolve;
                        });
                        arr.push(promise);
                    }
                }
            }
            if (arr.length > 0) {
                let promise = BlueprintPromise.create();
                Promise.all(arr).then((value) => {
                    promise.nid = BlueprintConst.NULL_NODE;
                    promise.complete();
                    promise.recover();
                });
                return promise;
            }
            else {
                return null;
            }
        }
        setFunction(fun) {
        }
    }

    class BlueprintSetTempVarNode extends BlueprintFunNode {
        constructor() {
            super();
        }
        onParseLinkData(node, manager) {
            let cfg = manager.dataMap[String(node.dataId)];
            this._varKey = cfg ? cfg.name : BlueprintUtil.getConstDataById(node.target, String(node.dataId)).name;
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, runtimeDataMgr, "runtimeDataMgr");
            context.parmFromCustom(_parmsArray, runId, "runId");
            if (this.nativeFun) {
                context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, BlueprintFunNode, _parmsArray, runId);
            }
            return this.next();
        }
    }

    class BlueprintSetVarNode extends BlueprintFunNode {
        constructor() {
            super();
        }
        onParseLinkData(node, manager) {
            let cfg = manager.dataMap[String(node.dataId)];
            this._varKey = cfg ? cfg.name : BlueprintUtil.getConstDataById(node.target, String(node.dataId)).name;
        }
        step(context, runtimeDataMgr, fromExecute, runner, enableDebugPause, runId, fromPin, prePin) {
            let _parmsArray = this.collectParam(context, runtimeDataMgr, this.inPutParmPins, runner, runId, prePin);
            context.parmFromCustom(_parmsArray, this._varKey, '"' + this._varKey + '"');
            context.parmFromCustom(_parmsArray, context, "context");
            if (this.nativeFun) {
                context.executeFun(this.nativeFun, this.returnValue, runtimeDataMgr, BlueprintFunNode, _parmsArray, runId);
            }
            return this.next();
        }
    }

    class BlueprintRunBase {
        constructor() {
            this.listNode = [];
        }
    }

    class BlueprintExecuteNode extends BlueprintRunBase {
        setCacheAble(node, runId, value) {
            let map = this._cacheMap.get(node.nid);
            if (!map) {
                map = new Map();
                this._cacheMap.set(node.nid, map);
            }
            map.set(runId, value);
        }
        getCacheAble(node, runId) {
            var _a;
            return (_a = this._cacheMap.get(node.nid)) === null || _a === void 0 ? void 0 : _a.get(runId);
        }
        constructor(data) {
            super();
            this._cacheMap = new Map();
            this.vars = {};
            this.owner = data;
            this.varDefineMap = new Map;
            this.runtimeDataMgrMap = new Map;
        }
        finish(runtime) {
        }
        getDataManagerByID(id) {
            return this.runtimeDataMgrMap.get(id);
        }
        initData(key, nodeMap, localVarMap, parentId) {
            let runtimeDataMgr = this.runtimeDataMgrMap.get(key);
            if (!runtimeDataMgr) {
                let parent = this.runtimeDataMgrMap.get(parentId);
                if (parent) {
                    runtimeDataMgr = parent;
                }
                else {
                    runtimeDataMgr = new RuntimeDataManager(key);
                    runtimeDataMgr.initData(nodeMap, localVarMap);
                }
                this.runtimeDataMgrMap.set(key, runtimeDataMgr);
            }
        }
        pushBack(executeNode, callback) {
            debugger;
        }
        getSelf() {
            return this.owner;
        }
        initVar(name, value) {
            this.vars[name] = value;
            this.varDefineMap.set(name, true);
        }
        setVar(name, value) {
            let obj = this.varDefineMap.get(name) ? this.vars : this.owner;
            obj[name] = value;
        }
        getVar(name) {
            let obj = this.varDefineMap.get(name) ? this.vars : this.owner;
            return obj[name];
        }
        getCode() {
            return "";
        }
        beginExecute(runtimeNode, runner, enableDebugPause, fromPin, parmsArray, prePin) {
            if (this.listNode.indexOf(runtimeNode) == -1) {
                this.listNode.push(runtimeNode);
                return null;
            }
            else {
                return null;
            }
        }
        endExecute(runtimeNode) {
        }
        parmFromCustom(parmsArray, parm, parmname) {
            parmsArray.push(parm);
        }
        parmFromOtherPin(current, runtimeDataMgr, from, parmsArray, runId) {
            parmsArray.push(runtimeDataMgr.getPinData(from, runId));
        }
        parmFromSelf(current, runtimeDataMgr, parmsArray, runId) {
            parmsArray.push(runtimeDataMgr.getPinData(current, runId));
        }
        parmFromOutPut(outPutParmPins, runtimeDataMgr, parmsArray) {
            for (let i = 0, n = outPutParmPins.length; i < n; i++) {
                let out = outPutParmPins[i];
                parmsArray.push(runtimeDataMgr.getRuntimePinById(out.id));
            }
        }
        executeFun(nativeFun, returnResult, runtimeDataMgr, caller, parmsArray, runId) {
            let result = nativeFun.apply(caller, parmsArray);
            returnResult && runtimeDataMgr.setPinData(returnResult, result, runId);
            return result;
        }
        reCall(index) {
        }
    }
    class RuntimeDataManager {
        constructor(id) {
            this.id = id;
            this.localVarObj = {};
            this.localVarMap = new Map();
            this.parmsArray = [];
        }
        saveContextData(from, to) {
            this.parmsArray.forEach((value) => {
                value.copyValue(from, to);
            });
            let a = this.localVarMap.get(from);
            if (a) {
                this.localVarMap.set(to, Object.create(a));
            }
        }
        _initGetVarObj(runId) {
            let a = this.localVarMap.get(runId);
            if (!a) {
                a = Object.create(this.localVarObj);
                this.localVarMap.set(runId, a);
            }
            return a;
        }
        clearVar(runId) {
            this.localVarMap.delete(runId);
        }
        getVar(name, runId) {
            let varObj = this._initGetVarObj(runId);
            return varObj[name];
        }
        setVar(name, value, runId) {
            let varObj = this._initGetVarObj(runId);
            return varObj[name] = value;
        }
        getDataById(nid) {
            return this.nodeMap.get(nid);
        }
        getRuntimePinById(id) {
            return this.pinMap.get(id);
        }
        setPinData(pin, value, runId) {
            this.pinMap.get(pin.id).setValue(runId, value);
        }
        getPinData(pin, runId) {
            return this.pinMap.get(pin.id).getValue(runId);
        }
        initData(nodeMap, localVarMap) {
            if (!this.isInit) {
                if (!this.nodeMap) {
                    this.nodeMap = new Map();
                }
                if (!this.pinMap) {
                    this.pinMap = new Map();
                }
                let dataMap = this.nodeMap;
                let pinMap = this.pinMap;
                nodeMap.forEach((value, key) => {
                    if (dataMap.get(key)) {
                        return;
                    }
                    let cls = BlueprintFactory.getBPContextData(value.type);
                    let rdata = new cls();
                    dataMap.set(key, rdata);
                    value.pins.forEach(pin => {
                        let pinData = new RuntimePinData();
                        pinData.name = pin.name;
                        if (pin.value != undefined && pin.linkTo.length == 0) {
                            pinData.initValue(pin.value);
                        }
                        if (pinMap.get(pin.id)) {
                            debugger;
                        }
                        pinMap.set(pin.id, pinData);
                        if (pin.type != exports.EPinType.Exec) {
                            this.parmsArray.push(pinData);
                        }
                    });
                });
                if (localVarMap) {
                    for (let key in localVarMap) {
                        this.localVarObj[localVarMap[key].name] = localVarMap[key].value;
                    }
                }
                this.isInit = true;
            }
        }
    }

    class BluePrintBlock {
        get blockSourceType() {
            return exports.EBlockSource.Unknown;
        }
        constructor(id) {
            this.id = id;
            this._maxID = 0;
            this.executeList = [];
            this.idToIndex = new Map();
            this.idToIndex.set(BlueprintConst.NULL_NODE, BlueprintConst.MAX_CODELINE);
            this.nodeMap = new Map();
            this.poolIds = [];
            this.anonymousfunMap = new Map();
            this.anonymousBlockMap = new Map();
        }
        getDataManagerByID(context) {
            return context.getDataManagerByID(this.id);
        }
        get bpId() {
            return this.name;
        }
        getNodeById(id) {
            return this.nodeMap.get(id);
        }
        _addNode(value, executeAbleList) {
            if (executeAbleList.indexOf(value) == -1) {
                this.idToIndex.set(value.nid, executeAbleList.length);
                executeAbleList.push(value);
                return true;
            }
            else {
                return false;
            }
        }
        optimizeByStart(value, executeAbleList) {
            let stack = [value];
            while (stack.length > 0) {
                const node = stack.pop();
                if (this._addNode(node, executeAbleList) && node.outExecutes) {
                    node.optimize();
                    node.outExecutes.forEach(item => {
                        if (item.linkTo && item.linkTo[0]) {
                            stack.push(item.linkTo[0].owner);
                        }
                    });
                }
            }
        }
        clear() {
            this.executeList.length = 0;
        }
        optimize() {
        }
        onParse(bpjson) {
        }
        append(node, item) {
            this.nodeMap.set(node.nid, node);
        }
        getRunID() {
            if (this.poolIds.length > 0) {
                return this.poolIds.pop();
            }
            else {
                return ++this._maxID;
            }
        }
        _recoverRunID(id, runtimeDataMgr) {
            this.poolIds.push(id);
            runtimeDataMgr.clearVar(id);
        }
        recoverRunID(id, runtimeDataMgr) {
            if (this.hasRefAnony) {
                this.poolIds.push(id);
                runtimeDataMgr.clearVar(id);
            }
        }
        runAnonymous(context, event, parms, cb, runId, execId, newRunId, oldRuntimeDataMgr) {
            let anonymousBlock = this.anonymousBlockMap.get(String(event.nid));
            if (anonymousBlock.haRef)
                oldRuntimeDataMgr.saveContextData(runId, newRunId);
            return anonymousBlock.run(context, event, parms, cb, newRunId, execId);
        }
        runByContext(context, runtimeDataMgr, node, enableDebugPause, cb, runId, fromPin, prePin, notRecover = false) {
            if (runId == -1) {
                runId = this.getRunID();
            }
            let idToIndex = this.idToIndex;
            const currentIndex = idToIndex.get(node.nid);
            const executeAbleList = this.executeList;
            let brecover = true;
            for (let i = currentIndex, n = executeAbleList.length; i < n;) {
                const bpNode = executeAbleList[i];
                let index = bpNode.step(context, runtimeDataMgr, true, this, enableDebugPause, runId, fromPin, prePin);
                enableDebugPause = true;
                if (index instanceof BlueprintPinRuntime) {
                    prePin = index;
                    fromPin = index.linkTo[0];
                    if (fromPin == null) {
                        break;
                    }
                    else {
                        i = idToIndex.get(fromPin.owner.nid);
                    }
                }
                else if (index instanceof BlueprintPromise) {
                    index.wait((mis) => {
                        this.runByContext(context, runtimeDataMgr, mis, mis.enableDebugPause != undefined ? mis.enableDebugPause : enableDebugPause, cb, runId, mis.pin, mis.prePin);
                    });
                    return false;
                }
                else if (index == null) {
                    break;
                }
                else {
                    brecover = false;
                    break;
                }
            }
            cb && cb();
            if (!notRecover && brecover) {
                this.recoverRunID(runId, runtimeDataMgr);
                this.finish(context);
            }
            return true;
        }
        finish(context) {
        }
    }
    exports.EBlockSource = void 0;
    (function (EBlockSource) {
        EBlockSource[EBlockSource["Unknown"] = 0] = "Unknown";
        EBlockSource[EBlockSource["Main"] = 1] = "Main";
        EBlockSource[EBlockSource["Function"] = 2] = "Function";
    })(exports.EBlockSource || (exports.EBlockSource = {}));

    class BluePrintEventBlock extends BluePrintBlock {
        constructor() {
            super(...arguments);
            this.haRef = false;
        }
        static findParamPin(node, nodeMap, anonymousfunMap, executeList, bluePrintEventBlock) {
            let nodeData = nodeMap.get(node.nid);
            if (nodeData) {
                return;
            }
            else {
                nodeMap.set(node.nid, node);
                node.inPutParmPins.forEach(value => {
                    var _a;
                    let linkPin = value.linkTo[0];
                    if (linkPin) {
                        let linkNode = linkPin.owner;
                        if (((_a = linkNode.outExecutes) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            if (linkNode.type == exports.BPType.Event && linkNode.isAnonymous) {
                                anonymousfunMap.set(linkNode.nid, linkNode);
                            }
                            if (!nodeMap.has(linkNode.nid)) {
                                if (executeList.indexOf(linkNode) == -1) {
                                    bluePrintEventBlock.haRef = true;
                                }
                                nodeMap.set(linkNode.nid, linkNode);
                            }
                        }
                        else {
                            BluePrintEventBlock.findParamPin(linkNode, nodeMap, anonymousfunMap, executeList, bluePrintEventBlock);
                        }
                    }
                });
            }
        }
        init(event) {
            this.name = event.eventName || event.name;
            this.optimizeByStart(event, this.executeList);
            this.executeList.forEach(value => {
                BluePrintEventBlock.findParamPin(value, this.nodeMap, this.anonymousfunMap, this.executeList, this);
            });
        }
        _checkRef() {
            for (let key of this.nodeMap.keys()) {
                let node = this.nodeMap.get(key);
                if (node.getRef() > 1) {
                    return true;
                }
            }
            return false;
        }
        optimizeByBlockMap(parent) {
            this.parentId = parent.id;
            this.parent = parent;
            let hasRefAnony = false;
            this.anonymousfunMap.forEach(value => {
                let block = parent.anonymousBlockMap.get(String(value.nid));
                if (block.haRef) {
                    hasRefAnony = true;
                }
                this.anonymousBlockMap.set(String(value.nid), block);
            });
            this.hasRefAnony = hasRefAnony;
        }
        getRunID() {
            return this.parent.getRunID();
        }
        recoverRunID(id, runtimeDataMgr) {
            if (!this.hasRefAnony) {
                this.parent._recoverRunID(id, runtimeDataMgr);
            }
        }
        run(context, event, parms, cb, runId, execId) {
            let runtimeDataMgr = context.getDataManagerByID(this.parentId);
            if (parms) {
                event.initData(runtimeDataMgr, parms, runId);
            }
            return this.runByContext(context, runtimeDataMgr, event, true, cb, runId, event.outExecutes[execId], null);
        }
        getDataManagerByID(context) {
            return context.getDataManagerByID(this.parentId);
        }
        get bpId() {
            return this.parent.bpId;
        }
        get blockSourceType() {
            return this.parent.blockSourceType;
        }
        finish(context) {
            this.parent.finishChild(context, this);
        }
    }

    class BluePrintComplexBlock extends BluePrintBlock {
        constructor(id) {
            super(id);
            this._asList = [];
            this._pendingClass = new Map();
            this._eventId = BluePrintComplexBlock.EventId++;
        }
        initEventBlockMap(map, eventMap) {
            map.forEach(value => {
                let eventBlock = eventMap.get(String(value.nid));
                if (!eventBlock) {
                    eventBlock = new BluePrintEventBlock(String(value.nid));
                    eventMap.set(String(value.nid), eventBlock);
                }
                eventBlock.init(value);
                eventBlock.dataMap = this.dataMap;
                eventBlock.optimize();
            });
        }
        optimize() {
            super.optimize();
            this._asList.forEach(value => {
                value.optimize();
            });
            this.initEventBlockMap(this.anonymousfunMap, this.anonymousBlockMap);
            this.anonymousBlockMap.forEach(value => {
                value.optimizeByBlockMap(this);
            });
        }
        parse(bpjson, getCNodeByNode, varMap) {
            this.localVarMap = varMap;
            if (!this._checkReady(bpjson, getCNodeByNode, varMap))
                return;
            bpjson.forEach(item => {
                let node = BlueprintFactory.instance.createNew(getCNodeByNode(item), item);
                this.append(node, item);
            });
            bpjson.forEach(item => {
                this.getNodeById(item.id).parseLinkData(item, this);
            });
            this.onParse(bpjson);
            this.optimize();
        }
        _onReParse(bpjson, getCNodeByNode, varMap, name) {
            let result = this._pendingClass.get(name);
            if (result) {
                this._pendingClass.delete(name);
            }
            if (this._pendingClass.size == 0) {
                delete BlueprintUtil.onfinishCallbacks[this._eventId];
                this.parse(bpjson, getCNodeByNode, varMap);
            }
        }
        onEventParse(eventName) {
        }
        _checkReady(bpjson, getCNodeByNode, varMap) {
            bpjson.forEach(item => {
                let itemdef = getCNodeByNode(item);
                if (!itemdef) {
                    let classID = item.target;
                    if (!classID) {
                        console.error("It's old style:" + item.name);
                    }
                    let pcls = this._pendingClass.get(classID);
                    if (pcls) {
                        pcls.push(item.id);
                    }
                    else {
                        this._pendingClass.set(classID, [item.id]);
                    }
                }
                else {
                    if (itemdef.type == exports.BPType.Event && item.output && item.output["out_" + EXECID]) {
                        this.onEventParse(itemdef.name);
                    }
                }
            });
            if (this._pendingClass.size > 0) {
                BlueprintUtil.onfinishCallbacks[this._eventId] = [this._onReParse, this, [bpjson, getCNodeByNode, varMap]];
                return false;
            }
            return true;
        }
        append(node, item) {
            super.append(node, item);
            switch (node.type) {
                case exports.BPType.Assertion:
                    this._asList.push(node);
                    break;
                case exports.BPType.Event:
                    if (item.dataId) {
                        this.anonymousfunMap.set(node.nid, node);
                    }
                    break;
            }
        }
        finishChild(context, runtime) {
        }
    }
    BluePrintComplexBlock.EventId = 0;

    class BluePrintFunStartBlock extends BluePrintEventBlock {
        constructor() {
            super(...arguments);
            this.funEnds = [];
        }
        init(event) {
            this.funStart = event;
            super.init(event);
            this.executeList.forEach(value => {
                if (value.type == exports.BPType.CustomFunReturn) {
                    this.funEnds.push(value);
                }
            });
        }
        runFun(context, eventName, parms, cb, runId, execId, outExecutes, runner, oldRuntimeDataMgr) {
            let fun = this.funStart;
            if (fun) {
                let runtimeDataMgr = context.getDataManagerByID(this.parentId);
                let curRunId = this.getRunID();
                if (parms) {
                    this.funEnds.forEach(value => {
                        value.initData(runtimeDataMgr, curRunId, runId, parms, fun.outPutParmPins.length, outExecutes, runner, oldRuntimeDataMgr);
                    });
                    fun.initData(runtimeDataMgr, parms, curRunId);
                }
                return this.runByContext(context, runtimeDataMgr, fun, true, cb, curRunId, fun.outExecutes[execId], null);
            }
            return null;
        }
    }

    class BluePrintFunBlock extends BluePrintComplexBlock {
        get bpId() {
            return this.mainBlock.name;
        }
        get blockSourceType() {
            return exports.EBlockSource.Function;
        }
        optimize() {
            super.optimize();
            this.funBlock = new BluePrintFunStartBlock(this.id);
            this.funBlock.init(this.funStart);
            this.funBlock.optimizeByBlockMap(this);
        }
        onParse(bpjson) {
            this.funStart = this.getNodeById(bpjson[0].id);
        }
        parse(bpjson, getCNodeByNode, varMap) {
            super.parse(bpjson, getCNodeByNode, varMap);
            this.funStart = this.getNodeById(bpjson[0].id);
        }
        run(context, eventName, parms, cb, runId, execId, outExecutes, runner, oldRuntimeDataMgr) {
            context.initData(this.id, this.nodeMap, this.localVarMap);
            return this.funBlock.runFun(context, eventName, parms, cb, runId, execId, outExecutes, runner, oldRuntimeDataMgr);
        }
    }

    class BluePrintMainBlock extends BluePrintComplexBlock {
        constructor(id) {
            super(id);
            this.eventMap = new Map();
            this.autoAnonymousfuns = [];
            this.autoRunNodes = [];
            this.eventBlockMap = new Map();
        }
        get bpName() {
            return BlueprintUtil.getNameByUUID(this.name);
        }
        get blockSourceType() {
            return exports.EBlockSource.Main;
        }
        optimize() {
            super.optimize();
            this.initEventBlockMap(this.eventMap, this.eventBlockMap);
            this.eventBlockMap.forEach(value => {
                value.optimizeByBlockMap(this);
            });
            this.anonymousBlockMap.forEach(value => {
                this.eventBlockMap.set(value.id, value);
            });
            for (let i = 0, n = this.autoRunNodes.length; i < n; i++) {
                let item = this.autoRunNodes[i];
                let hasLink = false;
                for (let j = 0, m = item.outPutParmPins.length; j < m; j++) {
                    let pin = item.outPutParmPins[j];
                    if (pin.linkTo.length > 0) {
                        hasLink = true;
                        break;
                    }
                }
                if (hasLink) {
                    this.autoRunNodes.splice(i, 1);
                    i--;
                    n--;
                }
            }
        }
        onEventParse(eventName) {
            let cls = this.cls;
            let originFunc = cls.prototype[eventName];
            let _this = this;
            cls.prototype[eventName] = function (...args) {
                _this._onEventParse(eventName, originFunc, this, ...args);
            };
        }
        _onEventParse(...args) {
            const eventName = args.shift();
            const originFunc = args.shift();
            const caller = args.shift();
            const funcContext = caller[BlueprintFactory.contextSymbol];
            originFunc && originFunc.apply(caller, args);
            caller[BlueprintFactory.bpSymbol].run(funcContext, this.eventMap.get(eventName), args, null);
        }
        append(node, item) {
            super.append(node, item);
            switch (node.type) {
                case exports.BPType.Pure:
                    if (node instanceof BlueprintAutoRun) {
                        this.autoRunNodes.push(node);
                    }
                    break;
                case exports.BPType.Event:
                    if (!item.dataId) {
                        this.eventMap.set(node.name, node);
                    }
                    else if (item.dataId && item.autoReg) {
                        this.autoAnonymousfuns.push(node);
                    }
                    break;
            }
        }
        runAuto(context) {
            context.initData(this.id, this.nodeMap, this.localVarMap);
            let id = this.getRunID();
            for (let i = 0, n = this.autoRunNodes.length; i < n; i++) {
                let item = this.autoRunNodes[i];
                item.step(context, context.getDataManagerByID(this.id), true, this, true, id, null, null);
            }
        }
        run(context, event, parms, cb, runId, execId) {
            context.initData(this.id, this.nodeMap, this.localVarMap);
            return this.eventBlockMap.get(String(event.nid)).run(context, event, parms, cb, runId, execId);
        }
        finishChild(context, runtime) {
            context.finish(runtime);
        }
    }

    const mainScope = Symbol("mainScope");
    class BlueprintRuntime {
        constructor() {
            this.isRunningInIDE = false;
            this.mainBlock = new BluePrintMainBlock(mainScope);
            this.funBlockMap = new Map();
        }
        run(context, event, parms, cb) {
            this.mainBlock.run(context, event, parms, cb, this.mainBlock.getRunID(), -1);
        }
        runCustomFun(context, funId, parms, cb, runId, execId, outExecutes, runner, oldRuntimeDataMgr) {
            let fun = this.funBlockMap.get(funId);
            if (fun) {
                return fun.run(context, null, parms, cb, runId, execId, outExecutes, runner, oldRuntimeDataMgr);
            }
            return null;
        }
        parse(mainBlockData, getCNodeByNode, varMap, newCls) {
            let bpjson = mainBlockData.arr;
            this.mainBlock.name = mainBlockData.name;
            this.mainBlock.dataMap = this.dataMap;
            this.mainBlock.cls = newCls;
            this.mainBlock.parse(bpjson, getCNodeByNode, {});
        }
        parseFunction(funData, getCNodeByNode) {
            var _a;
            let funId = String(funData.id), bpjson = funData.arr;
            let fun = new BluePrintFunBlock(funId);
            fun.isStatic = (_a = funData.modifiers) === null || _a === void 0 ? void 0 : _a.isStatic;
            fun.mainBlock = this.mainBlock;
            fun.name = funData.name;
            fun.dataMap = this.dataMap;
            let varMap = {};
            if (funData.variable) {
                funData.variable.forEach(item => {
                    varMap[item.name] = item;
                });
            }
            fun.parse(bpjson, getCNodeByNode, varMap);
            this.funBlockMap.set(funId, fun);
        }
        toCode(context) {
        }
    }

    class BPMathLib {
        static add(a, b) {
            return a + b;
        }
        static subtract(a, b) {
            return a - b;
        }
        static multiply(a, b) {
            return a * b;
        }
        static divide(a, b) {
            if (b === 0) {
                throw new Error('不允许除以0。');
            }
            return a / b;
        }
        static power(base, exponent) {
            return Math.pow(base, exponent);
        }
        static sqrt(value) {
            if (value < 0) {
                throw new Error('无法计算负数的平方根。');
            }
            return Math.sqrt(value);
        }
        static abs(value) {
            return Math.abs(value);
        }
        static sin(angle) {
            return Math.sin(angle);
        }
        static cos(angle) {
            return Math.cos(angle);
        }
        static tan(angle) {
            return Math.tan(angle);
        }
        static asin(value) {
            return Math.asin(value);
        }
        static acos(value) {
            return Math.acos(value);
        }
        static atan(value) {
            return Math.atan(value);
        }
        static atan2(y, x) {
            return Math.atan2(y, x);
        }
        static distance(x1, y1, x2, y2) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        }
        static round(value, decimals = 0) {
            const factor = Math.pow(10, decimals);
            return Math.round(value * factor) / factor;
        }
        static floor(value) {
            return Math.floor(value);
        }
        static ceil(value) {
            return Math.ceil(value);
        }
        static mod(dividend, divisor) {
            return dividend % divisor;
        }
        static min(a, b) {
            return Math.min(a, b);
        }
        static max(a, b) {
            return Math.max(a, b);
        }
        static random() {
            return Math.random();
        }
        static greater(a, b) {
            return a > b;
        }
        static less(a, b) {
            return a < b;
        }
        static equal(a, b) {
            return a == b;
        }
        static greaterEqual(a, b) {
            return a >= b;
        }
        static lessEqual(a, b) {
            return a <= b;
        }
    }

    class BPArray {
        static getItem(arr, index) {
            return arr[index];
        }
        static setItem(arr, index, value) {
            arr[index] = value;
        }
        push(item) {
            return 0;
        }
        pop() {
            return null;
        }
        splice(start, deleteCount) {
            return null;
        }
        shift() {
            return null;
        }
        unshift(item) {
            return null;
        }
        join(separator) {
            return "";
        }
        concat(item) {
            return null;
        }
    }
    BPArray.prototype.push = Array.prototype.push;
    BPArray.prototype.pop = Array.prototype.pop;
    BPArray.prototype.splice = Array.prototype.splice;
    BPArray.prototype.shift = Array.prototype.shift;
    BPArray.prototype.unshift = Array.prototype.unshift;
    BPArray.prototype.join = Array.prototype.join;
    BPArray.prototype.concat = Array.prototype.concat;

    var ClassUtils = Laya.ClassUtils;
    var Browser = Laya.Browser;
    var URL = Laya.URL;
    var AssetDb = Laya.AssetDb;
    class BlueprintCreateUtil {
        static __init__() {
            let strs = BlueprintConst.configPath.split(".");
            let ext = strs[strs.length - 1];
            let isJson = ext == "json";
            BlueprintUtil.getClass = function (ext) {
                return ClassUtils.getClass(ext) || Browser.window.Laya[ext] || Browser.window.BP[ext];
            };
            BlueprintUtil.regClass = ClassUtils.regClass;
            BlueprintUtil.getResByUUID = function (uuid) {
                return Laya.loader.getRes(URL.getResURLByUUID(uuid)).create();
            };
            BlueprintUtil.getNameByUUID = function (uuid) {
                return AssetDb.inst.uuidMap[uuid];
            };
            return Laya.loader.fetch(Laya.PlayerConfig.bpConfigPath || BlueprintConst.configPath, isJson ? "json" : "arraybuffer").then((result) => {
                if (!result) {
                    console.error("Blueprint init fail");
                    return Promise.resolve();
                }
                let json = result;
                if (!isJson) {
                    json = Laya.JsonBinRead.instance.read(result);
                }
                for (const key in json) {
                    extendsData[key] = json[key];
                }
                BlueprintFactory.BPRuntimeCls = BlueprintRuntime;
                BlueprintFactory.BPExecuteCls = BlueprintExecuteNode;
                BlueprintCreateUtil.reg();
                BlueprintUtil.initConstNode();
                Laya.URL.overrideExtension(["bp"], "bp.json", true);
                return Promise.resolve();
            });
        }
        static reg() {
            const rc = BlueprintFactory.regBPClass.bind(BlueprintFactory);
            rc(exports.BPType.Event, BlueprintEventNode);
            rc(exports.BPType.Pure, BlueprintRuntimeBaseNode);
            rc(exports.BPType.Operator, BlueprintRuntimeBaseNode);
            rc(exports.BPType.Function, BlueprintFunNode);
            rc(exports.BPType.GetValue, BlueprintGetVarNode);
            rc(exports.BPType.SetValue, BlueprintSetVarNode);
            rc(exports.BPType.GetTmpValue, BlueprintGetTempVarNode);
            rc(exports.BPType.SetTmpValue, BlueprintSetTempVarNode);
            rc(exports.BPType.Branch, BlueprintComplexNode);
            rc(exports.BPType.Sequence, BlueprintSequenceNode);
            rc(exports.BPType.NewTarget, BlueprintNewTargetNode);
            rc(exports.BPType.CustomFun, BlueprintCustomFunNode);
            rc(exports.BPType.CustomFunStart, BlueprintCustomFunStart);
            rc(exports.BPType.CustomFunReturn, BlueprintCustomFunReturn);
            rc(exports.BPType.Block, BluePrintBlockNode);
            rc(exports.BPType.Assertion, BluePrintAsNode);
            BlueprintFactory.regBPContextData(exports.BPType.CustomFunReturn, BlueprintCustomFunReturnContext);
            const rf = BlueprintFactory.regFunction.bind(BlueprintFactory);
            rf("branch", BlueprintStaticFun.branch);
            rf("forEach", BlueprintStaticFun.forEach);
            rf("forEachWithBreak", BlueprintStaticFun.forEachWithBreak);
            rf("forLoop", BlueprintStaticFun.forLoop);
            rf("forLoopWithBreak", BlueprintStaticFun.forLoopWithBreak);
            rf("event_on", function (eventName, cb) {
                this.on(eventName, this, cb);
            }, true);
            rf("event_call", function (eventName, ...args) {
                this.event(eventName, args);
            }, true);
            rf("event_off", function (eventName, cb) {
                this.off(eventName, this, cb);
            }, true);
            rf("event_offAll", function (eventName, cb) {
                this.offAll(eventName);
            }, true);
            rf("get", BlueprintStaticFun.getVariable);
            rf("static_get", BlueprintStaticFun.getVariable);
            rf("get_self", BlueprintStaticFun.getSelf);
            rf("set", BlueprintStaticFun.setVariable);
            rf("tmp_get", BlueprintStaticFun.getTempVar);
            rf("tmp_set", BlueprintStaticFun.setTempVar);
            rf("static_set", BlueprintStaticFun.setVariable);
            rf("expression", BlueprintStaticFun.expression);
            rf("instanceof", BlueprintStaticFun.typeInstanceof);
        }
    }
    Laya.addInitCallback(BlueprintCreateUtil.__init__);

    var Component = Laya.Component;
    class BlueprintDecorator {
        static initDeclaration(name, cls) {
            let type = "Others";
            if (cls instanceof Laya.Node) {
                type = "Node";
            }
            else if (cls instanceof Component) {
                type = "Component";
            }
            let declare = {
                name,
                type,
            };
            BlueprintDecorator.bpUserMap.set(cls, declare);
            return declare;
        }
        static bpClass(target, options) {
            if (options.propertyType && options.propertyType != "class") {
                console.error("BP:Reg class Fail :", options.name, " , propertType is not class!");
                return null;
            }
            let propertType = target.prototype;
            let declare = BlueprintDecorator.bpUserMap.get(propertType);
            if (!declare) {
                declare = BlueprintDecorator.initDeclaration(options.name, propertType);
            }
            else {
                declare.name = options.name;
            }
            if (options.extends) {
                declare.extends = options.extends;
            }
            if (options.canInherited) {
                declare.canInherited = options.canInherited;
            }
            if (options.construct) {
                declare.construct = options.construct;
            }
            if (options.events) {
                declare.events = options.events;
            }
            BlueprintDecorator.bpUserMap.delete(propertType);
            return declare;
        }
        static bpProperty(target, propertyKey, options) {
            if (options.propertyType && options.propertyType != "property") {
                console.error("BP:Reg Property Fail :", propertyKey, " , propertType is not property!");
                return;
            }
            let isStatic = options.modifiers ? !!options.modifiers.isStatic : false;
            let mapkey = isStatic ? target.prototype : target;
            let declare = BlueprintDecorator.bpUserMap.get(mapkey);
            if (!declare) {
                declare = BlueprintDecorator.initDeclaration("", mapkey);
            }
            let prop = {
                name: propertyKey,
                type: options.type,
                caption: options.caption,
                catalog: options.catalog,
                modifiers: options.modifiers,
                tips: options.tips
            };
            if (!prop.modifiers) {
                prop.modifiers = {};
                prop.modifiers.isPublic = true;
            }
            if (!declare.props) {
                declare.props = [];
            }
            declare.props.push(prop);
        }
        static bpFunction(target, propertyKey, descriptor, options) {
            var _a, _b;
            if (options.propertyType && options.propertyType != "function") {
                console.error("BP:Reg Function Fail :", propertyKey, " , propertType is not function!");
                return;
            }
            let isStatic = options.modifiers ? !!options.modifiers.isStatic : false;
            let mapkey = isStatic ? target.prototype : target;
            let declare = BlueprintDecorator.bpUserMap.get(mapkey);
            if (!declare) {
                declare = BlueprintDecorator.initDeclaration("", mapkey);
            }
            let func = {
                name: propertyKey,
                type: options.type || exports.BPType.Function,
                returnType: (_a = options.returnType) !== null && _a !== void 0 ? _a : "void",
                caption: options.caption,
                catalog: options.catalog,
                modifiers: options.modifiers,
                tips: options.tips,
                params: (_b = options.params) !== null && _b !== void 0 ? _b : []
            };
            if (!func.modifiers) {
                func.modifiers = {};
                func.modifiers.isPublic = true;
            }
            if (!declare.funcs) {
                declare.funcs = [];
            }
            declare.funcs.push(func);
        }
        static bpAccessor(target, propertyKey, descriptor, options) {
            if (options.propertyType && options.propertyType != "property") {
                console.error("BP:Reg Accessor Fail :", propertyKey, " , propertType is not property!");
                return;
            }
            let isStatic = options.modifiers ? !!options.modifiers.isStatic : false;
            let mapkey = isStatic ? target.prototype : target;
            let declare = BlueprintDecorator.bpUserMap.get(mapkey);
            if (!declare) {
                declare = BlueprintDecorator.initDeclaration("", mapkey);
            }
            let prop = {
                name: propertyKey,
                type: options.type,
                caption: options.caption,
                catalog: options.catalog,
                modifiers: options.modifiers,
                tips: options.tips,
            };
            if (!prop.modifiers) {
                prop.modifiers = {};
                prop.modifiers.isPublic = true;
            }
            if (descriptor.get && !descriptor.set) {
                prop.modifiers.isReadonly = true;
            }
            if (!declare.props) {
                declare.props = [];
            }
            declare.props.push(prop);
        }
        static createBPEnum(name, members) {
            let declare = {
                name,
                type: "Enum",
                members
            };
            BlueprintUtil.addCustomData(name, declare);
        }
    }
    BlueprintDecorator.bpUserMap = new Map;
    function bpClass(options) {
        return function (target) {
            let decl = BlueprintDecorator.bpClass(target, options);
            Laya.ClassUtils._classMap[options.uuid] = target;
            BlueprintUtil.addCustomData(options.uuid, decl);
        };
    }
    function bpProperty(options) {
        return function (target, propertyKey) {
            BlueprintDecorator.bpProperty(target, propertyKey, options);
        };
    }
    function bpFunction(options) {
        return function (target, propertyKey, descriptor) {
            BlueprintDecorator.bpFunction(target, propertyKey, descriptor, options !== null && options !== void 0 ? options : {});
        };
    }
    function bpAccessor(options) {
        return function (target, propertyKey, descriptor) {
            BlueprintDecorator.bpAccessor(target, propertyKey, descriptor, options);
        };
    }
    function createBPEnum(name, members) {
        BlueprintDecorator.createBPEnum(name, members);
    }

    class BPObject {
        static getItem(obj, key) {
            return obj[key];
        }
        static setItem(obj, key, value) {
            obj[key] = value;
        }
    }

    class TestBluePrint {
        regBPNode() {
        }
        testBPNode() {
        }
        constructor() {
        }
    }
    TestBluePrint.BPMap = new Map();

    class BlueprintResource extends Laya.Resource {
        constructor(bid) {
            super();
            this._bid = bid;
            this._traceDeps = true;
        }
        get cls() {
            return this._cls;
        }
        _initTarget(arr, bid) {
            for (let i = arr.length - 1; i >= 0; i--) {
                if (null != arr[i].dataId && null == arr[i].target) {
                    arr[i].target = bid;
                }
            }
        }
        initClass(data) {
            this.data = data;
            this._cls = null;
            let extendClass = data.extends;
            let runtime = BlueprintUtil.getClass(extendClass);
            if (!runtime)
                return;
            this._cls = BlueprintFactory.createCls(this._bid, runtime);
            Laya.ClassUtils.regClass(this._bid, this.cls);
            let map = data.blueprintArr;
            let arr = this.allNode = [];
            for (const key in map) {
                let item = map[key];
                arr.push.apply(arr, item.arr);
                this._initTarget(item.arr, this._bid);
            }
            let dataMap = {};
            var varMap = this.varMap = {};
            let dec = BlueprintData.formatData(data, this.name, dataMap, varMap);
            if (this.cls.prototype instanceof Laya.Component) {
                dec.type = "Component";
            }
            this.dec = dec;
            BlueprintUtil.addCustomData(this._bid, dec);
            this.allData = dataMap;
            BlueprintData.allDataMap.set(this._bid, dataMap);
        }
        parse() {
            if (this.allData == null)
                return;
            BlueprintFactory.parseCls(this._bid, this.data, this._cls, {
                id: 0,
                name: this._bid,
                dataMap: this.allData,
                arr: this.allNode
            }, this.data.functions, this.varMap, this.data.preload);
            this.allNode = null;
            this.varMap = null;
        }
        _disposeResource() {
            super._disposeResource();
            delete Laya.ClassUtils._classMap[this._bid];
        }
    }

    class BlueprintLoader {
        load(task) {
            return task.loader.fetch(task.url, "json", task.progress.createCallback(0.8), task.options).then(data => {
                if (!data)
                    return null;
                if (data._$ver == null) {
                    console.error("Unknow Version!");
                    return null;
                }
                let bp = new BlueprintResource(task.uuid || task.url);
                bp.name = Laya.URL.getFileName(task.url);
                bp.initClass(data);
                return bp;
            });
        }
        postLoad(task, bp) {
            if (bp.data.preload) {
                let basePath = Laya.URL.getPath(task.url);
                let urls = bp.data.preload.map((s) => Laya.Utils.isUUID(s) ? ("res://" + s) : Laya.URL.join(basePath, s));
                return task.loader.load(urls).then((resArray) => {
                    bp.addDeps(resArray);
                    bp.parse();
                });
            }
            else
                return Promise.resolve();
        }
    }
    Laya.Loader.registerLoader([BlueprintConst.EXT], BlueprintLoader, BlueprintConst.TYPE);

    class BlueprintGenCodeNode extends BlueprintRunBase {
        constructor() {
            super(...arguments);
            this.codes = [];
            this.vars = {};
            this.blockMap = new Map();
        }
        finish(runtime) {
            throw new Laya.NotImplementedError();
        }
        setCacheAble(node, runId, value) {
            throw new Laya.NotImplementedError();
        }
        getCacheAble(node, runId) {
            throw new Laya.NotImplementedError();
        }
        getDataManagerByID(id) {
            throw new Laya.NotImplementedError();
        }
        initData(key, nodeMap) {
            throw new Laya.NotImplementedError();
        }
        pushBack(executeNode) {
            throw new Laya.NotImplementedError();
        }
        getSelf() {
            throw new Laya.NotImplementedError();
        }
        reCall(index) {
            throw new Laya.NotImplementedError();
        }
        getVar(name) {
            throw new Laya.NotImplementedError();
        }
        initVar(name, value) {
        }
        setVar(name, value) {
            throw new Laya.NotImplementedError();
        }
        find(input, outExecutes) {
            throw new Laya.NotImplementedError();
        }
        beginExecute(runtimeNode) {
            let index = this.listNode.indexOf(runtimeNode);
            if (index == -1) {
                this.listNode.push(runtimeNode);
                this.currentFun = [];
                return null;
            }
            else {
                let code = "while(true){\n";
                for (let i = index; i < this.codes.length; i++) {
                    code += this.codes[i].join('\n') + "\n";
                }
                code += "}\n";
                this.blockMap.set(index, { end: this.codes.length - 1, code: code });
                return null;
            }
        }
        endExecute(runtimeNode) {
            if (this.currentFun) {
                this.codes.push(this.currentFun);
                this.currentFun = null;
            }
        }
        parmFromOtherPin(current, runtimeDataMgr, from, parmsArray, runId) {
            let last = this.currentFun.pop();
            last = "let " + current.name + current.owner.id + " = " + last;
            this.currentFun.push(last);
            parmsArray.push(current.name + current.owner.id);
        }
        parmFromSelf(current, runtimeDataMgr, parmsArray, runId) {
            parmsArray.push(current.getValueCode());
        }
        parmFromOutPut(outPutParmPins, runtimeDataMgr, parmsArray) {
        }
        parmFromCustom(parmsArray, parm, parmname) {
            parmsArray.push(parmname);
        }
        executeFun(nativeFun, returnResult, runtimeDataMgr, caller, parmsArray, runId) {
            let a = (nativeFun.name + "(" + parmsArray.join(",") + ");");
            this.currentFun.push(a);
        }
        toString() {
            return "context";
        }
        getCode() {
            let code = "";
            for (let i = 0, n = this.codes.length; i < n; i++) {
                let m = this.blockMap.get(i);
                if (m) {
                    code += m.code;
                    i = m.end;
                }
                else {
                    code += this.codes[i].join("\n") + "\n";
                }
            }
            return code;
        }
    }

    exports.BPArray = BPArray;
    exports.BPMathLib = BPMathLib;
    exports.BPObject = BPObject;
    exports.BluePrintAsNode = BluePrintAsNode;
    exports.BluePrintBlock = BluePrintBlock;
    exports.BluePrintBlockNode = BluePrintBlockNode;
    exports.BluePrintComplexBlock = BluePrintComplexBlock;
    exports.BluePrintEventBlock = BluePrintEventBlock;
    exports.BluePrintFunBlock = BluePrintFunBlock;
    exports.BluePrintFunStartBlock = BluePrintFunStartBlock;
    exports.BluePrintMainBlock = BluePrintMainBlock;
    exports.BlueprintAutoRun = BlueprintAutoRun;
    exports.BlueprintComplexNode = BlueprintComplexNode;
    exports.BlueprintConst = BlueprintConst;
    exports.BlueprintCreateUtil = BlueprintCreateUtil;
    exports.BlueprintCustomFunNode = BlueprintCustomFunNode;
    exports.BlueprintCustomFunReturn = BlueprintCustomFunReturn;
    exports.BlueprintCustomFunReturnContext = BlueprintCustomFunReturnContext;
    exports.BlueprintCustomFunStart = BlueprintCustomFunStart;
    exports.BlueprintData = BlueprintData;
    exports.BlueprintDataList = BlueprintDataList;
    exports.BlueprintDecorator = BlueprintDecorator;
    exports.BlueprintEventNode = BlueprintEventNode;
    exports.BlueprintExecuteNode = BlueprintExecuteNode;
    exports.BlueprintFactory = BlueprintFactory;
    exports.BlueprintFunNode = BlueprintFunNode;
    exports.BlueprintGenCodeNode = BlueprintGenCodeNode;
    exports.BlueprintGetTempVarNode = BlueprintGetTempVarNode;
    exports.BlueprintGetVarNode = BlueprintGetVarNode;
    exports.BlueprintLoader = BlueprintLoader;
    exports.BlueprintNewTargetNode = BlueprintNewTargetNode;
    exports.BlueprintNode = BlueprintNode;
    exports.BlueprintPin = BlueprintPin;
    exports.BlueprintPinRuntime = BlueprintPinRuntime;
    exports.BlueprintPromise = BlueprintPromise;
    exports.BlueprintResource = BlueprintResource;
    exports.BlueprintRunBase = BlueprintRunBase;
    exports.BlueprintRuntime = BlueprintRuntime;
    exports.BlueprintRuntimeBaseNode = BlueprintRuntimeBaseNode;
    exports.BlueprintSequenceNode = BlueprintSequenceNode;
    exports.BlueprintSetTempVarNode = BlueprintSetTempVarNode;
    exports.BlueprintSetVarNode = BlueprintSetVarNode;
    exports.BlueprintStaticFun = BlueprintStaticFun;
    exports.BlueprintUtil = BlueprintUtil;
    exports.EXECID = EXECID;
    exports.ExpressDict = ExpressDict;
    exports.ExpressFunction = ExpressFunction;
    exports.ExpressOrgin = ExpressOrgin;
    exports.ExpressParse = ExpressParse;
    exports.ExpressProperty = ExpressProperty;
    exports.ExpressString = ExpressString;
    exports.ExpressTree = ExpressTree;
    exports.Precedence = Precedence;
    exports.RuntimeNodeData = RuntimeNodeData;
    exports.RuntimePinData = RuntimePinData;
    exports.TARGETID = TARGETID;
    exports.TestBluePrint = TestBluePrint;
    exports.bpAccessor = bpAccessor;
    exports.bpClass = bpClass;
    exports.bpFunction = bpFunction;
    exports.bpProperty = bpProperty;
    exports.createBPEnum = createBPEnum;
    exports.customData = customData;
    exports.extendsData = extendsData;

})(window.BP = window.BP || {});
