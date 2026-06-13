(function (exports, Laya) {
    'use strict';

    class NoRenderGlobalRenderData {
    }
    class NoRenderGraphics2DBufferBlock {
    }
    class NoRenderGraphics2DVertexBlock {
    }
    class NoRenderBufferDataView {
    }
    class NoRenderVertexDataView extends NoRenderBufferDataView {
        constructor(owner, start, length, stride = 1) {
            super();
            this.stride = 1;
            this.owner = owner;
            this.start = start;
            this.length = length;
            this.stride = stride;
            this._updateView(owner._dataView);
            owner.addDataView(this);
        }
        _getData() { return this._view; }
        _updateView(wholeData) {
            if (!this._view || this._view.buffer !== wholeData.buffer) {
                this._view = new Float32Array(wholeData.buffer, this.start * 4, this.length);
            }
        }
        _modify() {
            this.owner._modifyOneView(this);
        }
        setData(data) {
            this._view.set(data);
            this._modify();
        }
    }
    class NoRenderIndexDataView extends NoRenderBufferDataView {
        constructor(owner, length, create = true) {
            super();
            this.owner = owner;
            this.length = length;
            if (create) {
                this._view = new Uint16Array(length);
            }
        }
        setGeometry(value) {
            this._geometry = value;
        }
        setData(data) {
            this._view.set(data);
            this.owner._modifyOneView(this);
        }
        _updateView(wholeData) {
            wholeData.set(this._view, this.start);
        }
        destroy() {
            this._view = null;
            this._geometry = null;
            this.owner = null;
            this._next = null;
            this._prev = null;
        }
    }
    class NoRenderWholeBuffer {
        constructor() {
            this._num = 0;
        }
        _modifyOneView(view) {
        }
        addDataView(view) {
            view._next = null;
            view._prev = null;
            if (!this._first) {
                this._first = view;
            }
            if (this._last) {
                this._last._next = view;
                view._prev = this._last;
            }
            view.owner = this;
            this._last = view;
            this._num++;
        }
        removeDataView(view) {
            view.owner = null;
            if (view._prev)
                view._prev._next = view._next;
            if (view._next)
                view._next._prev = view._prev;
            if (view === this._first)
                this._first = view._next;
            if (view === this._last)
                this._last = view._prev;
            view._next = null;
            view._prev = null;
            this._num--;
        }
        destroy() {
            this._first = null;
            this._last = null;
            this._dataView = null;
            this.arrayBuffer = null;
        }
    }
    class NoRenderGraphicVertexBuffer extends NoRenderWholeBuffer {
        resetData(byteLength) {
            this.arrayBuffer = new ArrayBuffer(byteLength);
            let newData = new Float32Array(this.arrayBuffer);
            if (this._dataView) {
                newData.set(this._dataView);
            }
            this._dataView = newData;
            this._needResetData = true;
        }
        _upload() {
            if (this._needResetData) {
                let view = this._first;
                while (view) {
                    view._updateView(this._dataView);
                    view = view._next;
                }
                this.buffer.setData(this.arrayBuffer, 0, 0, this.arrayBuffer.byteLength);
                this._needResetData = false;
            }
        }
    }
    class NoRenderGraphicIndexBuffer extends NoRenderWholeBuffer {
        resetData(byteLength) {
            this.arrayBuffer = new ArrayBuffer(byteLength);
            let newData = new Uint16Array(this.arrayBuffer);
            if (this._dataView) {
                newData.set(this._dataView);
            }
            this._dataView = newData;
            this._needResetData = true;
        }
        _upload() {
            if (!this._num)
                return;
            let view = this._first;
            let start = 0;
            let length = 0;
            let geometry = view._geometry;
            let needUpdate = false;
            let uploadStart = this._needResetData ? 0 : 0;
            while (view) {
                if (geometry !== view._geometry) {
                    if (needUpdate) {
                        geometry.clearRenderParams();
                        geometry.setDrawElemenParams(length, start * 2);
                    }
                    geometry = view._geometry;
                    start = start + length;
                    length = 0;
                }
                start = start + length;
                needUpdate = this._needResetData || start >= uploadStart;
                if (needUpdate) {
                    view.start = start;
                    view._updateView(this._dataView);
                }
                length += view.length;
                view = view._next;
            }
            if (needUpdate) {
                geometry.clearRenderParams();
                geometry.setDrawElemenParams(length, start * 2);
            }
            this._needResetData = false;
        }
    }
    class NoRenderDataHandleBase {
        constructor() {
            this._nMatrix_0 = new Laya.Vector3();
            this._nMatrix_1 = new Laya.Vector3();
            this.needUseMatrix = true;
        }
        get owner() { return this._owner; }
        set owner(value) { this._owner = value; }
        destroy() { }
        inheriteRenderData(context) {
            var _a;
            let data = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData;
            if (!data)
                return;
            if (this.needUseMatrix) {
                let mat = this._owner.renderMatrix;
                this._nMatrix_0.setValue(mat.a, mat.c, mat.tx);
                this._nMatrix_1.setValue(mat.b, mat.d, mat.ty);
                data.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
                data.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
            }
        }
    }
    class NoRenderEmptyDataHandle extends NoRenderDataHandleBase {
        inheriteRenderData(_context) { }
        destroy() { }
    }
    class NoRenderPrimitiveDataHandle extends NoRenderDataHandleBase {
        constructor() {
            super(...arguments);
            this.logicMatrix = null;
            this.mask = null;
            this._bufferBlocks = null;
            this._modifiedFrame = -1;
            this._globalAlpha = 1;
        }
        applyVertexBufferBlock(blocks) {
            this._bufferBlocks = blocks;
            this._globalAlpha = this._owner.globalAlpha;
            if (this._owner.trans) {
                this._modifiedFrame = this._owner.trans.modifiedFrame;
            }
        }
        skipBufferUpdate() {
            if (this._owner.trans) {
                this._modifiedFrame = this._owner.trans.modifiedFrame;
            }
        }
        inheriteRenderData(context) {
            let data = this._owner.spriteShaderData;
            if (!data)
                return;
            let trans = this._owner.trans;
            let mat = trans.matrix;
            if (this._modifiedFrame < trans.modifiedFrame) {
                if (!this._bufferBlocks || !this._bufferBlocks.length) {
                    if (this.logicMatrix) {
                        let temp = Laya.Matrix.TEMP;
                        Laya.Matrix.mul(this.logicMatrix, mat.copyTo(temp), temp);
                        this._nMatrix_0.setValue(temp.a, temp.c, temp.tx);
                        this._nMatrix_1.setValue(temp.b, temp.d, temp.ty);
                    }
                    else {
                        this._nMatrix_0.setValue(mat.a, mat.c, mat.tx);
                        this._nMatrix_1.setValue(mat.b, mat.d, mat.ty);
                    }
                    data.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
                    data.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
                }
                this._modifiedFrame = trans.modifiedFrame;
            }
            else if (this._globalAlpha !== this._owner.globalAlpha) {
                this._globalAlpha = this._owner.globalAlpha;
            }
        }
        destroy() {
            super.destroy();
            this._bufferBlocks = null;
        }
    }
    class NoRenderBaseDataHandle extends NoRenderDataHandleBase {
        constructor() {
            super(...arguments);
            this._lightReceive = false;
        }
        get lightReceive() { return this._lightReceive; }
        set lightReceive(value) {
            var _a;
            this._lightReceive = value;
            if ((_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) {
                if (value) {
                    this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_ENABLE);
                }
                else {
                    this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_ENABLE);
                }
            }
        }
        get owner() { return this._owner; }
        set owner(value) {
            var _a, _b;
            if (value === this._owner)
                return;
            if ((_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) {
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            }
            this._owner = value;
            if ((_b = this._owner) === null || _b === void 0 ? void 0 : _b.spriteShaderData) {
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            }
        }
    }
    const _setRenderColor = new Laya.Color(1, 1, 1, 1);
    class NoRenderMeshDataHandle extends NoRenderBaseDataHandle {
        constructor() {
            super(...arguments);
            this._baseColor = new Laya.Color(1, 1, 1, 1);
            this._tilingOffset = new Laya.Vector4();
            this._renderAlpha = -1;
        }
        get baseColor() { return this._baseColor; }
        set baseColor(value) {
            var _a, _b;
            if (value !== this._baseColor && this._baseColor.equal(value))
                return;
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._baseColor);
            this._renderAlpha = -1;
            (_b = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) === null || _b === void 0 ? void 0 : _b.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._baseColor);
        }
        get baseTexture() { return this._baseTexture; }
        set baseTexture(value) {
            var _a, _b;
            if (this._baseTexture != null && value === this._baseTexture)
                return;
            if (this._baseTexture)
                this._baseTexture._removeReference();
            this._baseTexture = value;
            (_b = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) === null || _b === void 0 ? void 0 : _b.setTexture(Laya.BaseRenderNode2D.BASERENDER2DTEXTURE, value);
            if (value)
                value._addReference();
        }
        get tilingOffset() { return this._tilingOffset; }
        set tilingOffset(value) {
            var _a, _b;
            if (!value)
                return;
            (_b = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) === null || _b === void 0 ? void 0 : _b.setVector(Laya.BaseRenderNode2D.TILINGOFFSET, value);
            value.cloneTo(this._tilingOffset);
        }
        get normal2DTexture() { return this._normal2DTexture; }
        set normal2DTexture(value) {
            var _a, _b;
            if (value === this._normal2DTexture)
                return;
            if (this._normal2DTexture)
                this._normal2DTexture._removeReference(1);
            if (value)
                value._addReference();
            this._normal2DTexture = value;
            (_b = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) === null || _b === void 0 ? void 0 : _b.setTexture(Laya.BaseRenderNode2D.NORMAL2DTEXTURE, value);
        }
        get normal2DStrength() { return this._normal2DStrength; }
        set normal2DStrength(value) {
            var _a, _b;
            value = Math.max(0, Math.min(1, value));
            if (this._normal2DStrength === value)
                return;
            this._normal2DStrength = value;
            (_b = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) === null || _b === void 0 ? void 0 : _b.setNumber(Laya.BaseRenderNode2D.NORMAL2DSTRENGTH, value);
        }
        inheriteRenderData(context) {
            super.inheriteRenderData(context);
            if (this._owner && this._renderAlpha !== this._owner.globalAlpha) {
                let a = this._owner.globalAlpha * this._baseColor.a;
                _setRenderColor.setValue(this._baseColor.r, this._baseColor.g, this._baseColor.b, a);
                this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, _setRenderColor);
                this._renderAlpha = this._owner.globalAlpha;
            }
        }
    }
    class NoRenderSpineDataHandle extends NoRenderBaseDataHandle {
        constructor() {
            super(...arguments);
            this._renderAlpha = -1;
            this._baseColor = new Laya.Color(1, 1, 1, 1);
        }
        get baseColor() { return this._baseColor; }
        set baseColor(value) {
            var _a, _b;
            if (value !== this._baseColor && this._baseColor.equal(value))
                return;
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._baseColor);
            this._renderAlpha = -1;
            (_b = (_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) === null || _b === void 0 ? void 0 : _b.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._baseColor);
        }
        get offset() { return this._offset; }
        set offset(value) { this._offset = value; }
        get owner() { return this._owner; }
        set owner(value) {
            var _a, _b;
            if (value === this._owner)
                return;
            if ((_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) {
                let sd = this._owner.spriteShaderData;
                sd.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
                sd.removeDefine(Laya.SpineShaderInit.SPINE_UV);
                sd.removeDefine(Laya.SpineShaderInit.SPINE_COLOR);
            }
            this._owner = value;
            if ((_b = this._owner) === null || _b === void 0 ? void 0 : _b.spriteShaderData) {
                let sd = this._owner.spriteShaderData;
                sd.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
                sd.addDefine(Laya.SpineShaderInit.SPINE_UV);
                sd.addDefine(Laya.SpineShaderInit.SPINE_COLOR);
            }
        }
        inheriteRenderData(context) {
            var _a;
            if (!((_a = this._owner) === null || _a === void 0 ? void 0 : _a.spriteShaderData) || !this.skeleton)
                return;
            let shaderData = this._owner.spriteShaderData;
            let mat = this._owner.renderMatrix;
            if (this._offset) {
                let ofx = this._offset.x, ofy = this._offset.y;
                this._nMatrix_0.setValue(mat.a, mat.c, mat.tx + mat.a * ofx + mat.c * ofy);
                this._nMatrix_1.setValue(mat.b, mat.d, mat.ty + mat.b * ofx + mat.d * ofy);
            }
            else {
                this._nMatrix_0.setValue(mat.a, mat.c, mat.tx);
                this._nMatrix_1.setValue(mat.b, mat.d, mat.ty);
            }
            shaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_0, this._nMatrix_0);
            shaderData.setVector3(Laya.ShaderDefines2D.UNIFORM_NMATRIX_1, this._nMatrix_1);
            if (this._renderAlpha !== this._owner.globalAlpha) {
                let a = this._owner.globalAlpha * this._baseColor.a;
                _setRenderColor.setValue(this._baseColor.r, this._baseColor.g, this._baseColor.b, a);
                this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, _setRenderColor);
                this._renderAlpha = this._owner.globalAlpha;
            }
        }
    }
    const _DefaultClipInfo = {
        clipMatrix: new Laya.Matrix(),
        clipMatDir: new Laya.Vector4(Laya.Const.MAX_CLIP_SIZE, 0, 0, Laya.Const.MAX_CLIP_SIZE),
        clipMatPos: new Laya.Vector4(0, 0, 0, 0),
        _updateFrame: 0
    };
    const _DefaultParentData = {
        clipInfo: _DefaultClipInfo,
        blendMode: Laya.BlendMode.invalid,
        globalRenderData: null,
        pass: null,
        enableCulling: false,
        dcOptimize: false,
        globalAlpha: 1,
    };
    var ChildrenUpdateType;
    (function (ChildrenUpdateType) {
        ChildrenUpdateType[ChildrenUpdateType["All"] = -1] = "All";
        ChildrenUpdateType[ChildrenUpdateType["None"] = 0] = "None";
        ChildrenUpdateType[ChildrenUpdateType["Clip"] = 1] = "Clip";
        ChildrenUpdateType[ChildrenUpdateType["Blend"] = 2] = "Blend";
        ChildrenUpdateType[ChildrenUpdateType["Alpha"] = 4] = "Alpha";
        ChildrenUpdateType[ChildrenUpdateType["Pass"] = 8] = "Pass";
        ChildrenUpdateType[ChildrenUpdateType["Global"] = 16] = "Global";
        ChildrenUpdateType[ChildrenUpdateType["Culling"] = 32] = "Culling";
        ChildrenUpdateType[ChildrenUpdateType["DcOptimize"] = 64] = "DcOptimize";
    })(ChildrenUpdateType || (ChildrenUpdateType = {}));
    class NoRenderStruct2D {
        get enableCulling() { return this._enableCulling; }
        set enableCulling(value) {
            this._enableCulling = value;
            this.updateChildren(ChildrenUpdateType.Culling);
        }
        get inheritedEnableCulling() { return this._enableCulling || this._parentData.enableCulling; }
        get dcOptimize() { return this._dcOptimize; }
        set dcOptimize(value) {
            this._dcOptimize = value;
            this.updateChildren(ChildrenUpdateType.DcOptimize);
        }
        get inheritedDcOptimize() { return this._dcOptimize || this._parentData.dcOptimize; }
        get renderMatrix() { return this.trans.matrix; }
        set renderMatrix(value) {
            if (this.trans) {
                this.trans.matrix = value;
                this.trans.modifiedFrame = Laya.Stat.loopCount;
            }
            else {
                this.trans = { matrix: value, modifiedFrame: Laya.Stat.loopCount };
            }
        }
        get globalAlpha() { return this._currentData.globalAlpha; }
        set globalAlpha(value) { this._parentData.globalAlpha = value; }
        get alpha() { return this._alpha; }
        set alpha(value) {
            this._alpha = value;
            this._updateGlobalAlpha(value, this.parent ? this.parent.globalAlpha : 1);
            this.updateChildren(ChildrenUpdateType.Alpha);
        }
        get blendMode() { return this._blendMode || this._currentData.blendMode || Laya.BlendMode.normal; }
        set blendMode(value) {
            this._updateBlendMode(value);
            this._setBlendMode();
            this.updateChildren(ChildrenUpdateType.Blend);
        }
        get renderDataHandler() { return this._renderDataHandler; }
        set renderDataHandler(value) {
            if (this._renderDataHandler)
                this._renderDataHandler.owner = null;
            this._renderDataHandler = value;
            if (value)
                this._renderDataHandler.owner = this;
        }
        get globalRenderData() { return this._globalRenderData || this._currentData.globalRenderData; }
        set globalRenderData(value) {
            this._globalRenderData = value;
            this._updateGlobalShaderData();
            this.updateChildren(ChildrenUpdateType.Global);
        }
        _updateGlobalShaderData() {
            let renderData = this.globalRenderData;
            this._globalShaderData = renderData ? renderData.globalShaderData : null;
            if (this._subStruct)
                this._subStruct._updateGlobalShaderData();
        }
        _updatePriority() {
            if (this._pass) {
                if (this._maskParentPass) {
                    this._pass.priority = this._maskParentPass.priority + 1;
                }
                else if (this._parentData.pass) {
                    this._pass.priority = this._parentData.pass.priority + 1;
                }
                else {
                    this._pass.priority = 0;
                }
            }
        }
        setMaskParentPass(pass) {
            this._maskParentPass = pass;
            this._updatePriority();
            if (this._pass)
                this.updateChildren(ChildrenUpdateType.Pass);
        }
        get pass() { return this._pass || this._currentData.pass; }
        set pass(value) {
            if (value !== this._pass) {
                this._pass = value;
                this._updatePriority();
                this.updateChildren(ChildrenUpdateType.Pass);
            }
        }
        get subStruct() { return this._subStruct; }
        set subStruct(value) {
            if (value === this._subStruct)
                return;
            let updateFlag = 0;
            if (value) {
                let parentData = this._parentData;
                value._blendMode = this._blendMode;
                value._currentData = parentData;
                value._maskParentPass = this._maskParentPass;
                if (parentData.globalAlpha !== 1)
                    updateFlag |= ChildrenUpdateType.Alpha;
                if (!this._globalRenderData && parentData.globalRenderData)
                    updateFlag |= ChildrenUpdateType.Global;
                if (!this._clipInfo && parentData.clipInfo)
                    updateFlag |= ChildrenUpdateType.Clip;
                if (this._blendMode !== Laya.BlendMode.invalid || parentData.blendMode !== Laya.BlendMode.invalid)
                    updateFlag |= ChildrenUpdateType.Blend;
                this._blendMode = Laya.BlendMode.invalid;
                this._currentData = _DefaultParentData;
                value.needUploadAlpha = true;
            }
            else if (this._subStruct) {
                let parentData = this._parentData;
                this._subStruct._currentData = this._subStruct._parentData;
                this._blendMode = this._subStruct._blendMode;
                if (parentData.globalAlpha !== 1)
                    updateFlag |= ChildrenUpdateType.Alpha;
                if (!this._clipInfo && parentData.clipInfo)
                    updateFlag |= ChildrenUpdateType.Clip;
                if (!this._globalRenderData && parentData.globalRenderData)
                    updateFlag |= ChildrenUpdateType.Global;
                if (this._blendMode !== Laya.BlendMode.invalid || parentData.blendMode !== Laya.BlendMode.invalid)
                    updateFlag |= ChildrenUpdateType.Blend;
                this._subStruct._blendMode = Laya.BlendMode.invalid;
                this._subStruct._maskParentPass = null;
                this._currentData = parentData;
            }
            this._subStruct = value;
            this._updateGlobalShaderData();
            this.updateChildren(updateFlag);
            this._setBlendMode();
        }
        constructor() {
            this.manualRender = false;
            this._parentData = Object.assign({}, _DefaultParentData);
            this._currentData = this._parentData;
            this.zIndex = 0;
            this._effectZ = 0;
            this.stackingRoot = false;
            this.rect = new Laya.Rectangle();
            this._enableCulling = false;
            this.renderLayer = 1;
            this.children = [];
            this.renderType = -1;
            this.renderUpdateMask = 0;
            this._alpha = 1.0;
            this._blendMode = Laya.BlendMode.invalid;
            this.needUploadClip = -1;
            this.needUploadAlpha = true;
            this.enabled = true;
            this.isRenderStruct = false;
            this.renderElements = null;
            this.spriteShaderData = null;
            this._globalShaderData = null;
            this._globalRenderData = null;
            this._clipRect = null;
            this._clipInfo = null;
            this._uniformClip = false;
            this._rnUpdateFun = null;
        }
        setRenderUpdateCallback(func) { this._rnUpdateFun = func; }
        _handleInterData() {
            let rect = this._clipRect;
            if (rect) {
                let info = this._clipInfo;
                let trans = this.trans;
                let clipInfo = this._currentData.clipInfo;
                let parentClipUpdateFrame = clipInfo && clipInfo !== _DefaultClipInfo ? clipInfo._updateFrame : -1;
                if (trans) {
                    if (info._updateFrame < trans.modifiedFrame || info._updateFrame < parentClipUpdateFrame) {
                        let mat = trans.matrix;
                        let cm = info.clipMatrix;
                        let { x, y, width, height } = rect;
                        width = Math.max(width, 0.0001);
                        height = Math.max(height, 0.0001);
                        let tx = mat.tx, ty = mat.ty;
                        cm.tx = x * mat.a + y * mat.c + tx;
                        cm.ty = x * mat.b + y * mat.d + ty;
                        cm.a = width * mat.a;
                        cm.b = width * mat.b;
                        cm.c = height * mat.c;
                        cm.d = height * mat.d;
                        if (parentClipUpdateFrame !== -1) {
                            let parentClipPos = clipInfo.clipMatPos;
                            let offsetx = parentClipPos.z - parentClipPos.x;
                            let offsety = parentClipPos.w - parentClipPos.y;
                            if (cm.a > 0 && cm.d > 0) {
                                let parentMat = clipInfo.clipMatrix;
                                let parentMinX = parentMat.tx;
                                let parentMinY = parentMat.ty;
                                let parentMaxX = parentMinX + parentMat.a;
                                let parentMaxY = parentMinY + parentMat.d;
                                let cmaxx = tx + cm.a;
                                let cmaxy = ty + cm.d;
                                if (cmaxx <= parentMinX || cmaxy <= parentMinY || tx >= parentMaxX || ty >= parentMaxY) {
                                    cm.a = -0.1;
                                    cm.d = -0.1;
                                }
                                else {
                                    if (tx < parentMinX) {
                                        cm.a -= (parentMinX - tx);
                                        tx = parentMinX;
                                    }
                                    if (cmaxx > parentMaxX) {
                                        cm.a -= (cmaxx - parentMaxX);
                                    }
                                    if (ty < parentMinY) {
                                        cm.d -= (parentMinY - ty);
                                        ty = parentMinY;
                                    }
                                    if (cmaxy > parentMaxY) {
                                        cm.d -= (cmaxy - parentMaxY);
                                    }
                                    if (cm.a <= 0)
                                        cm.a = -0.1;
                                    if (cm.d <= 0)
                                        cm.d = -0.1;
                                    if (cm.tx < parentMinX)
                                        cm.tx = parentMinX;
                                    if (cm.ty < parentMinY)
                                        cm.ty = parentMinY;
                                }
                            }
                            tx += offsetx;
                            ty += offsety;
                        }
                        info.clipMatDir.setValue(cm.a, cm.b, cm.c, cm.d);
                        info.clipMatPos.setValue(cm.tx, cm.ty, tx, ty);
                        info._updateFrame = Math.max(trans.modifiedFrame, parentClipUpdateFrame);
                    }
                }
            }
            if (this._renderDataHandler) {
                let data = this.spriteShaderData;
                let info = this.getClipInfo();
                if (info !== _DefaultClipInfo) {
                    if (this.needUploadClip < info._updateFrame) {
                        data.setVector(Laya.ShaderDefines2D.UNIFORM_CLIPMATDIR, info.clipMatDir);
                        data.setVector(Laya.ShaderDefines2D.UNIFORM_CLIPMATPOS, info.clipMatPos);
                        this.needUploadClip = info._updateFrame;
                    }
                    if (!this._uniformClip) {
                        this._uniformClip = true;
                        data.addDefine(Laya.ShaderDefines2D.UNIFORMCLIP);
                    }
                }
                else if (this._uniformClip) {
                    data.removeDefine(Laya.ShaderDefines2D.UNIFORMCLIP);
                    this._uniformClip = false;
                }
                if (this.needUploadAlpha) {
                    data.setNumber(Laya.ShaderDefines2D.UNIFORM_VERTALPHA, this.globalAlpha);
                    this.needUploadAlpha = false;
                }
            }
        }
        _setBlendMode() {
            if (!this.spriteShaderData)
                return;
            Laya.BlendModeHandler.setShaderData(this.blendMode, this.spriteShaderData);
            if (this._subStruct)
                this._subStruct._setBlendMode();
        }
        setClipRect(rect) {
            this._clipRect = rect;
            rect ? this._initClipInfo() : this._clipInfo = null;
            this.updateChildren(ChildrenUpdateType.Clip);
        }
        _initClipInfo() {
            if (!this._clipInfo) {
                this._clipInfo = { clipMatDir: new Laya.Vector4, clipMatPos: new Laya.Vector4, clipMatrix: new Laya.Matrix, _updateFrame: -1 };
            }
            else {
                this._clipInfo._updateFrame = -1;
            }
        }
        _updateGlobalAlpha(value, parentAlpha = 1) {
            this._parentData.globalAlpha = parentAlpha * value;
        }
        _updateBlendMode(blendMode) {
            var _a;
            if ((_a = this._subStruct) === null || _a === void 0 ? void 0 : _a.enabled) {
                this._subStruct._blendMode = blendMode;
            }
            else {
                this._blendMode = blendMode;
            }
        }
        getClipInfo() { return this._clipInfo || this._currentData.clipInfo || _DefaultClipInfo; }
        hasClip() { return this.getClipInfo() !== _DefaultClipInfo; }
        updateChildren(type) {
            if (type === ChildrenUpdateType.None)
                return;
            let info, blendMode, alpha;
            let pass = null, enableCulling = false, dcOptimize = false;
            let globalRenderData = null;
            let updateClip = false, updateBlend = false, updateAlpha = false, updatePass = false, updateGlobal = false, updateCulling = false, updateDcOptimize = false;
            if (type & ChildrenUpdateType.Clip) {
                info = this.getClipInfo();
                this.needUploadClip = -1;
                if (this._subStruct)
                    this._subStruct.needUploadClip = -1;
                updateClip = true;
            }
            if (type & ChildrenUpdateType.Blend) {
                blendMode = this.blendMode;
                updateBlend = true;
            }
            if (type & ChildrenUpdateType.Alpha) {
                alpha = this.globalAlpha;
                this.needUploadAlpha = true;
                if (this._subStruct)
                    this._subStruct.needUploadAlpha = true;
                updateAlpha = true;
            }
            if (type & ChildrenUpdateType.Pass) {
                pass = this.pass;
                updatePass = true;
            }
            if (type & ChildrenUpdateType.Global) {
                updateGlobal = true;
                globalRenderData = this.globalRenderData;
            }
            if (type & ChildrenUpdateType.Culling) {
                updateCulling = true;
                enableCulling = this.inheritedEnableCulling;
            }
            if (type & ChildrenUpdateType.DcOptimize) {
                updateDcOptimize = true;
                dcOptimize = this.inheritedDcOptimize;
            }
            for (const child of this.children) {
                let updateChild = false;
                let cpd = child._parentData;
                if (updateClip) {
                    cpd.clipInfo = info;
                    if (!child._clipInfo)
                        updateChild = true;
                }
                if (updateBlend) {
                    if (child._blendMode === Laya.BlendMode.invalid) {
                        cpd.blendMode = blendMode;
                        child._setBlendMode();
                        updateChild = true;
                    }
                }
                if (updateAlpha) {
                    child._updateGlobalAlpha(child.alpha, alpha);
                    updateChild = true;
                }
                if (updatePass) {
                    cpd.pass = pass;
                    updateChild = true;
                }
                if (updateGlobal) {
                    cpd.globalRenderData = globalRenderData;
                    child._updateGlobalShaderData();
                    if (!child._globalRenderData)
                        updateChild = true;
                }
                if (updateCulling) {
                    cpd.enableCulling = enableCulling;
                    updateChild = true;
                }
                if (updateDcOptimize) {
                    cpd.dcOptimize = dcOptimize;
                    updateChild = true;
                }
                if (updateChild)
                    child.updateChildren(type);
            }
        }
        setRepaint() { if (this.pass)
            this.pass.repaint = true; }
        addChild(child, index) {
            child.parent = this;
            this.children.splice(index, 0, child);
            let cpd = child._parentData;
            cpd.clipInfo = this.getClipInfo();
            cpd.blendMode = this.blendMode;
            child._setBlendMode();
            child._updateGlobalAlpha(child.alpha, this.globalAlpha);
            cpd.pass = this.pass;
            child._updatePriority();
            cpd.globalRenderData = this.globalRenderData;
            child._updateGlobalShaderData();
            cpd.enableCulling = this.inheritedEnableCulling;
            cpd.dcOptimize = this.inheritedDcOptimize;
            child.updateChildren(ChildrenUpdateType.All);
        }
        updateChildIndex(child, oldIndex, index) {
            if (oldIndex === index)
                return;
            this.children.splice(oldIndex, 1);
            if (index >= this.children.length)
                this.children.push(child);
            else
                this.children.splice(index, 0, child);
        }
        removeChild(child) {
            const index = this.children.indexOf(child);
            if (index !== -1) {
                child.parent = null;
                this.children.splice(index, 1);
                let cpd = child._parentData;
                cpd.pass = null;
                child._updatePriority();
                cpd.clipInfo = null;
                cpd.blendMode = Laya.BlendMode.invalid;
                child._updateGlobalAlpha(child._alpha);
                cpd.globalRenderData = null;
                child._updateGlobalShaderData();
                cpd.enableCulling = false;
                cpd.dcOptimize = false;
                child.updateChildren(ChildrenUpdateType.All);
            }
        }
        renderUpdate(context) {
            if (this.renderDataHandler)
                this.renderDataHandler.inheriteRenderData(context);
            if (this._rnUpdateFun)
                this._rnUpdateFun(context);
        }
        destroy() {
            this._clipInfo = null;
            this._currentData = null;
            this._parentData = null;
            this._clipRect = null;
            this.renderElements = null;
            this.spriteShaderData = null;
            this.parent = null;
            this.children.length = 0;
            this.children = null;
            this._pass = null;
        }
    }
    class NoRender2DPass {
        get priority() { return this._priority; }
        set priority(value) { this._priority = value; }
        get mask() { return this._mask; }
        set mask(value) {
            if (this._mask)
                this._mask.setMaskParentPass(null);
            this._mask = value;
            if (value)
                value.setMaskParentPass(this);
        }
        get enableBatch() { return this._enableBatch; }
        set enableBatch(value) { this.repaint = true; this._enableBatch = value; }
        constructor() {
            this._priority = 0;
            this.enable = true;
            this.isSupport = false;
            this.postProcess = null;
            this.repaint = true;
            this.doClearColor = true;
            this.root = null;
            this.offsetMatrix = new Laya.Matrix();
            this.shaderData = null;
            this._enableBatch = true;
            this.shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData(null);
        }
        setClearColor(r, g, b, a) { }
        needRender() {
            return this.enable && !this.isSupport && (this.repaint || !this.renderTexture);
        }
        fowardRender(context, renderTime) {
            if (!this.root || this.root.globalAlpha < 0.01)
                return;
            if (this.renderTexture) {
                if (this.renderTexture.width === 0 || this.renderTexture.height === 0)
                    return;
                context.setRenderTarget(this.renderTexture._renderTarget, this.doClearColor, null);
            }
            else {
                let sizeX = Laya.RenderState2D.width, sizeY = Laya.RenderState2D.height;
                if (sizeX === 0 || sizeY === 0)
                    return;
                context.setOffscreenView(sizeX, sizeY);
                context.setRenderTarget(null, this.doClearColor, null);
            }
            context.passData = this.shaderData;
            if (this.repaint && this.root) {
                this._walkAndRenderUpdate(context, this.root);
            }
            this.repaint = false;
        }
        _walkAndRenderUpdate(context, struct) {
            if (!struct.enabled || struct.globalAlpha < 0.01 || this._mask === struct)
                return;
            let renderStruct = (struct.subStruct && struct !== this.root) ? struct.subStruct : struct;
            if (renderStruct.manualRender)
                return;
            renderStruct._handleInterData();
            renderStruct.renderUpdate(context);
            for (let i = 0, n = renderStruct.children.length; i < n; i++) {
                let child = renderStruct.children[i];
                child._effectZ = child.zIndex + struct._effectZ;
                this._walkAndRenderUpdate(context, child);
            }
        }
        updatePostProcess() { }
        destroy() {
            this.root = null;
            this.renderTexture = null;
            this.postProcess = null;
            if (this.shaderData) {
                this.shaderData.destroy();
                this.shaderData = null;
            }
        }
    }
    class NoRender2DPassManager {
        constructor() {
            this._modify = false;
            this._passes = [];
        }
        addPass(pass) {
            if (this._passes.indexOf(pass) !== -1)
                return;
            this._passes.push(pass);
            this._modify = true;
        }
        removePass(pass) {
            let index = this._passes.indexOf(pass);
            if (index === -1)
                return;
            this._passes.splice(index, 1);
            this._modify = true;
        }
        apply(context, renderTime) {
            if (this._modify) {
                this._modify = false;
                this._passes.sort((a, b) => b._priority - a._priority);
            }
            for (const pass of this._passes) {
                if (pass.needRender())
                    pass.fowardRender(context, renderTime);
            }
        }
        clear() { this._passes.length = 0; }
    }

    class NoRenderEngine {
        constructor() {
            this._framePassCount = 0;
            this._propertyNameMap = {};
            this._propertyNameCounter = 0;
        }
        initRenderEngine(canvas) {
        }
        copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
        }
        resizeOffScreen(width, height) {
        }
        endFrame() {
        }
        startFrame() {
        }
        propertyNameToID(name) {
            if (this._propertyNameMap[name] != null) {
                return this._propertyNameMap[name];
            }
            else {
                var id = this._propertyNameCounter++;
                this._propertyNameMap[name] = id;
                this._propertyNameMap[id] = name;
                return id;
            }
        }
        propertyIDToName(id) {
            return this._propertyNameMap[id];
        }
        getDefineByName(name) {
            var define = NoRenderEngine._defineMap[name];
            if (!define) {
                var maskMap = NoRenderEngine._maskMap;
                var counter = NoRenderEngine._defineCounter;
                var index = Math.floor(counter / 32);
                var value = 1 << counter % 32;
                define = new Laya.ShaderDefine(index, value);
                NoRenderEngine._defineMap[name] = define;
                if (index == maskMap.length) {
                    maskMap.length++;
                    maskMap[index] = {};
                }
                maskMap[index][value] = name;
                NoRenderEngine._defineCounter++;
            }
            return define;
        }
        getNamesByDefineData(defineData, out) {
            var maskMap = NoRenderEngine._maskMap;
            var mask = defineData._mask;
            out.length = 0;
            for (var i = 0, n = defineData._length; i < n; i++) {
                var subMaskMap = maskMap[i];
                var subMask = mask[i];
                for (var j = 0; j < 32; j++) {
                    var d = 1 << j;
                    if (subMask > 0 && d > subMask)
                        break;
                    if (subMask & d)
                        out.push(subMaskMap[d]);
                }
            }
        }
        addTexGammaDefine(key, value) {
        }
        getParams(params) {
            return 0;
        }
        getCapable(capatableType) {
            return false;
        }
        getTextureContext() {
            return new NoTextureContext();
        }
    }
    NoRenderEngine._defineMap = {};
    NoRenderEngine._defineCounter = 0;
    NoRenderEngine._maskMap = [];
    class NoInternalTexture {
        dispose() {
        }
    }
    class NoInternalRT {
        constructor() {
            this._textures = [];
        }
        dispose() {
        }
    }
    class NoTextureContext {
        createRenderTargetFromArrayLayer(arrayTex, layer, colorFormat, depthStencilFormat, sRGB) {
            const rt = new NoInternalRT();
            rt._textures = [arrayTex];
            rt.colorFormat = colorFormat;
            rt.depthStencilFormat = depthStencilFormat;
            rt.isSRGB = sRGB;
            rt._arrayLayerIndex = layer;
            return rt;
        }
        createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha) {
            let internalTex = new NoInternalTexture();
            internalTex.width = width;
            internalTex.height = height;
            internalTex.depth = 1;
            internalTex.mipmapCount = 1;
            internalTex.mipmap = false;
            internalTex.isPotSize = true;
            return internalTex;
        }
        setTextureImageData(texture, source, premultiplyAlpha, invertY) {
        }
        setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
        }
        setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
        }
        initVideoTextureData(texture) {
        }
        setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
        }
        setTextureDDSData(texture, ddsInfo) {
        }
        setTextureKTXData(texture, ktxInfo) {
        }
        setTextureHDRData(texture, hdrInfo) {
        }
        setCubeImageData(texture, sources, premultiplyAlpha, invertY) {
        }
        setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
        }
        setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
        }
        setCubeDDSData(texture, ddsInfo) {
        }
        setCubeKTXData(texture, ktxInfo) {
        }
        setTextureCompareMode(texture, compareMode) {
            return Laya.TextureCompareMode.None;
        }
        createRenderTargetInternal(width, height, format, depthStencilFormat, generateMipmap, sRGB, multiSamples, storage) {
            let texture = this.createTextureInternal(Laya.TextureDimension.Tex2D, width, height, Laya.TextureFormat.R8G8B8A8, generateMipmap, sRGB, false);
            let renderTarget = new NoInternalRT();
            renderTarget._textures.push(texture);
            return renderTarget;
        }
        createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            let texture = this.createTextureInternal(Laya.TextureDimension.Cube, size, size, Laya.TextureFormat.R8G8B8A8, generateMipmap, sRGB, false);
            let renderTarget = new NoInternalRT();
            renderTarget._textures.push(texture);
            return renderTarget;
        }
        createRenderTargetDepthTexture(renderTarget, dimension, width, height) {
            let internalTex = new NoInternalTexture();
            internalTex.width = width;
            internalTex.height = height;
            internalTex.depth = 1;
            internalTex.mipmapCount = 1;
            internalTex.mipmap = false;
            internalTex.isPotSize = true;
            return internalTex;
        }
        bindRenderTarget(renderTarget, faceIndex) {
        }
        bindoutScreenTarget() {
        }
        unbindRenderTarget(renderTarget) {
        }
        readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
            return new Float32Array();
        }
        readRenderTargetPixelDataAsync(renderTarget, xOffset, yOffset, width, height, out) {
            return Promise.resolve(new Float32Array());
        }
        updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
        }
        createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha) {
            let internalTex = new NoInternalTexture();
            internalTex.width = width;
            internalTex.height = height;
            internalTex.depth = 1;
            internalTex.mipmapCount = 1;
            internalTex.mipmap = false;
            internalTex.isPotSize = true;
            return internalTex;
        }
        setTexture3DImageData(texture, source, depth, premultiplyAlpha, invertY) {
        }
        setTexture3DPixelsData(texture, source, depth, premultiplyAlpha, invertY) {
        }
        setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
        }
    }

    class NoRenderDefineDatas {
        constructor() {
            this._mask = [];
            this._length = 0;
        }
        _intersectionDefineDatas(define) {
            var unionMask = define._mask;
            var mask = this._mask;
            for (var i = this._length - 1; i >= 0; i--) {
                var value = mask[i] & unionMask[i];
                if (value === 0 && i === this._length - 1)
                    this._length--;
                else
                    mask[i] = value;
            }
        }
        add(define) {
            var index = define._index;
            var size = index + 1;
            var mask = this._mask;
            var maskStart = this._length;
            if (maskStart < size) {
                (mask.length < size) && (mask.length = size);
                for (; maskStart < index; maskStart++)
                    mask[maskStart] = 0;
                mask[index] = define._value;
                this._length = size;
                return true;
            }
            let last = mask[index];
            mask[index] |= define._value;
            return last !== mask[index];
        }
        remove(define) {
            var index = define._index;
            var mask = this._mask;
            var endIndex = this._length - 1;
            if (index > endIndex)
                return false;
            let lastValue = mask[index];
            var newValue = mask[index] & ~define._value;
            if (index == endIndex && newValue === 0)
                this._length--;
            else
                mask[index] = newValue;
            return lastValue !== newValue;
        }
        addDefineDatas(define) {
            var addMask = define._mask;
            var size = define._length;
            var mask = this._mask;
            var maskStart = this._length;
            if (maskStart < size) {
                mask.length = size;
                for (var i = 0; i < maskStart; i++)
                    mask[i] |= addMask[i];
                for (; i < size; i++)
                    mask[i] = addMask[i];
                this._length = size;
            }
            else {
                for (var i = 0; i < size; i++)
                    mask[i] |= addMask[i];
            }
        }
        removeDefineDatas(define) {
            var removeMask = define._mask;
            var mask = this._mask;
            var endIndex = this._length - 1;
            var i = Math.min(define._length, endIndex);
            for (; i >= 0; i--) {
                var newValue = mask[i] & ~removeMask[i];
                if (i == endIndex && newValue === 0) {
                    endIndex--;
                    this._length--;
                }
                else {
                    mask[i] = newValue;
                }
            }
        }
        has(define) {
            var index = define._index;
            if (index >= this._length)
                return false;
            return (this._mask[index] & define._value) !== 0;
        }
        clear() {
            this._length = 0;
        }
        cloneTo(destObject) {
            var destMask = destObject._mask;
            var mask = this._mask;
            var count = this._length;
            destMask.length = count;
            for (var i = 0; i < count; i++)
                destMask[i] = mask[i];
            destObject._length = count;
        }
        clone() {
            var dest = new NoRenderDefineDatas();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            delete this._mask;
        }
    }
    class NoRenderDeviceFactory {
        createShaderInstance(shaderProcessInfo, shaderPass) {
            return new NoRenderShaderInstance();
        }
        createIndexBuffer(bufferUsage) {
            return new NoRenderIndexBuffer();
        }
        createVertexBuffer(bufferUsageType) {
            return new NoRenderVertexBuffer();
        }
        createBufferState() {
            return new NoRenderBufferState();
        }
        createRenderGeometryElement(mode, drawType) {
            return new NoRenderGeometryElement();
        }
        createEngine(config, canvas) {
            let engine = new NoRenderEngine();
            engine.initRenderEngine(null);
            Laya.LayaGL.renderEngine = engine;
            Laya.LayaGL.textureContext = engine.getTextureContext();
            return Promise.resolve();
        }
        createGlobalUniformMap(blockName) {
            return new NoRenderCommandUnifojrmMap(blockName);
        }
        createShaderData(ownerResource) {
            return new NoRenderShaderData();
        }
    }
    class NoRenderCommandUnifojrmMap extends Laya.CommandUniformMap {
        constructor(stateName) {
            super(stateName);
        }
        addShaderUniform(propertyID, propertyKey, uniformtype, options) {
        }
        addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength, block = "") {
        }
    }
    class NoRenderShaderInstance {
        _serializeShader() {
            return null;
        }
        _deserialize(buffer) {
            return false;
        }
        _create(shaderProcessInfo, shaderPass) {
        }
        _disposeResource() {
        }
    }
    class NoRenderIndexBuffer {
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
        }
        destroy() {
        }
        _setIndexDataLength(data) {
        }
        _setIndexData(data, bufferOffset) {
        }
    }
    class NoRenderVertexBuffer {
        getStorageBuffer() {
            return null;
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
        }
        setDataLength(byteLength) {
        }
        destroy() {
        }
    }
    class NoRenderBufferState {
        constructor() {
            this._vertexBuffers = [];
        }
        applyState(vertexBuffers, indexBuffer) {
            this._vertexBuffers = vertexBuffers.slice();
            this._bindedIndexBuffer = indexBuffer;
        }
        destroy() {
        }
    }
    class NoRenderGeometryElement {
        getDrawDataParams(out) {
        }
        setDrawArrayParams(first, count) {
        }
        setDrawElemenParams(count, offset) {
        }
        clearRenderParams() {
        }
        destroy() {
        }
    }
    class NoRenderShaderData extends Laya.ShaderData {
        constructor() {
            super(...arguments);
            this._data = {};
            this._defineDatas = new NoRenderDefineDatas();
        }
        getDefineData() {
            return this._defineDatas;
        }
        getData() {
            return this._data;
        }
        addDefine(define) {
            this._defineDatas.add(define);
        }
        addDefines(define) {
            this._defineDatas.addDefineDatas(define);
        }
        removeDefine(define) {
            this._defineDatas.remove(define);
        }
        hasDefine(define) {
            return this._defineDatas.has(define);
        }
        clearDefine() {
            this._defineDatas.clear();
        }
        clearData() {
            for (const k in this._data) {
                const value = this._data[k];
                if (value instanceof Laya.Resource) {
                    value._removeReference();
                }
            }
            this._data = {};
        }
        getBool(index) {
            return this._data[index];
        }
        setBool(index, value) {
            this._data[index] = value;
        }
        getInt(index) {
            return this._data[index];
        }
        setInt(index, value) {
            this._data[index] = value;
        }
        getNumber(index) {
            return this._data[index];
        }
        setNumber(index, value) {
            this._data[index] = value;
        }
        getVector2(index) {
            return this._data[index];
        }
        setVector2(index, value) {
            this._data[index] = value;
        }
        getVector3(index) {
            return this._data[index];
        }
        setVector3(index, value) {
            this._data[index] = value;
        }
        getVector(index) {
            return this._data[index];
        }
        setVector(index, value) {
            this._data[index] = value;
        }
        getColor(index) {
            return this._data[index];
        }
        setColor(index, value) {
            this._data[index] = value;
        }
        getMatrix4x4(index) {
            return this._data[index];
        }
        setMatrix4x4(index, value) {
            this._data[index] = value;
        }
        getMatrix3x3(index) {
            return this._data[index];
        }
        setMatrix3x3(index, value) {
            this._data[index] = value;
        }
        getBuffer(index) {
            return this._data[index];
        }
        setBuffer(index, value) {
            this._data[index] = value;
        }
        setTexture(index, value) {
            this._data[index] = value;
        }
        getTexture(index) {
            return this._data[index];
        }
        setShaderData(uniformIndex, type, value) {
            switch (type) {
                case Laya.ShaderDataType.Int:
                    this.setInt(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Bool:
                    this.setBool(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Float:
                    this.setNumber(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Vector2:
                    this.setVector2(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Vector3:
                    this.setVector3(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Vector4:
                    this.setVector(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Color:
                    this.setColor(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Matrix4x4:
                    this.setMatrix4x4(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Matrix3x3:
                    this.setMatrix3x3(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Texture2D:
                case Laya.ShaderDataType.TextureCube:
                case Laya.ShaderDataType.Texture2DArray:
                case Laya.ShaderDataType.Texture3D:
                    this.setTexture(uniformIndex, value);
                    break;
                case Laya.ShaderDataType.Buffer:
                    this.setBuffer(uniformIndex, value);
                    break;
                default:
                    throw new Error(`unkown shader data type: ${type}`);
            }
        }
        getShaderData(uniformIndex, type) {
            switch (type) {
                case Laya.ShaderDataType.Int:
                    return this.getInt(uniformIndex);
                case Laya.ShaderDataType.Bool:
                    return this.getBool(uniformIndex);
                case Laya.ShaderDataType.Float:
                    return this.getNumber(uniformIndex);
                case Laya.ShaderDataType.Vector2:
                    return this.getVector2(uniformIndex);
                case Laya.ShaderDataType.Vector3:
                    return this.getVector3(uniformIndex);
                case Laya.ShaderDataType.Vector4:
                    return this.getVector(uniformIndex);
                case Laya.ShaderDataType.Color:
                    return this.getColor(uniformIndex);
                case Laya.ShaderDataType.Matrix4x4:
                    return this.getMatrix4x4(uniformIndex);
                case Laya.ShaderDataType.Texture2D:
                case Laya.ShaderDataType.TextureCube:
                case Laya.ShaderDataType.Texture2DArray:
                case Laya.ShaderDataType.Texture3D:
                    return this.getTexture(uniformIndex);
                case Laya.ShaderDataType.Buffer:
                    return this.getBuffer(uniformIndex);
                case Laya.ShaderDataType.Matrix3x3:
                    return this.getMatrix3x3(uniformIndex);
                case Laya.ShaderDataType.Matrix4x4:
                    return this.getMatrix4x4(uniformIndex);
                default:
                    throw "unknown shader data type.";
            }
        }
        _setInternalTexture(index, value) {
        }
        cloneTo(destObject) {
            let destData = destObject._data;
            for (let k in this._data) {
                let value = this._data[k];
                if (value != null) {
                    if (typeof value == "number") {
                        destData[k] = value;
                    }
                    else if (typeof value == "boolean") {
                        destData[k] = value;
                    }
                    else if (value instanceof Laya.Vector2) {
                        let v2 = destData[k] || (destData[k] = new Laya.Vector2());
                        value.cloneTo(v2);
                    }
                    else if (value instanceof Laya.Vector3) {
                        let v3 = destData[k] || (destData[k] = new Laya.Vector3());
                        value.cloneTo(v3);
                    }
                    else if (value instanceof Laya.Vector4) {
                        let color = this.getColor(parseInt(k));
                        if (color) {
                            let clonecolor = color.clone();
                            destObject.setColor(parseInt(k), clonecolor);
                        }
                        else {
                            let v4 = destData[k] || (destData[k] = new Laya.Vector4());
                            value.cloneTo(v4);
                        }
                    }
                    else if (value instanceof Laya.Matrix3x3) {
                        let mat = destData[k] || (destData[k] = new Laya.Matrix3x3());
                        value.cloneTo(mat);
                    }
                    else if (value instanceof Laya.Matrix4x4) {
                        let mat = destData[k] || (destData[k] = new Laya.Matrix4x4());
                        value.cloneTo(mat);
                    }
                    else if (value instanceof Laya.Resource) {
                        destData[k] = value;
                        value._addReference();
                    }
                }
            }
            this._defineDatas.cloneTo(destObject._defineDatas);
        }
        clone() {
            var dest = new NoRenderShaderData();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            this._defineDatas.destroy();
            this._defineDatas = null;
            for (var k in this._data) {
                var value = this._data[k];
                if (value instanceof Laya.Resource) {
                    value._removeReference();
                }
            }
            this._data = null;
        }
    }
    class NoRenderSetRenderData extends Laya.SetRenderDataCMD {
        get dataType() {
            return this._dataType;
        }
        set dataType(value) {
            this._dataType = value;
        }
        get propertyID() {
            return this._propertyID;
        }
        set propertyID(value) {
            this._propertyID = value;
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeData;
        }
        apply(context) {
        }
    }
    class NoRenderSetShaderDefine extends Laya.SetShaderDefineCMD {
        get define() {
            return this._define;
        }
        set define(value) {
            this._define = value;
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
        }
        get add() {
            return this._add;
        }
        set add(value) {
            this._add = value;
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeShaderDefine;
        }
        apply(context) {
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.renderDeviceFactory)
            Laya.LayaGL.renderDeviceFactory = new NoRenderDeviceFactory();
    });

    class NoRender2DProcess {
        createGraphic2DBufferBlock() {
            return new NoRenderGraphics2DBufferBlock();
        }
        createGraphic2DVertexBlock() {
            return new NoRenderGraphics2DVertexBlock();
        }
        create2DGraphicVertexDataView(wholeBuffer, elementOffset, elementSize, stride) {
            return new NoRenderVertexDataView(wholeBuffer, elementOffset, elementSize, stride);
        }
        create2DGraphicIndexDataView(wholeBuffer, elementSize) {
            return new NoRenderIndexDataView(wholeBuffer, elementSize);
        }
        create2DGraphicIndexBuffer() {
            return new NoRenderGraphicIndexBuffer();
        }
        create2DGraphicVertexBuffer() {
            return new NoRenderGraphicVertexBuffer();
        }
        createRender2DPassManager() {
            return new NoRender2DPassManager();
        }
        create2DGlobalRenderDataHandle() {
            return new NoRenderGlobalRenderData();
        }
        createSpineRenderDataHandle() {
            return new NoRenderSpineDataHandle();
        }
        createRender2DPass() {
            return new NoRender2DPass();
        }
        createRenderStruct2D() {
            return new NoRenderStruct2D();
        }
        create2D2DPrimitiveDataHandle() {
            return new NoRenderPrimitiveDataHandle();
        }
        create2DBaseRenderDataHandle() {
            return new NoRenderBaseDataHandle();
        }
        createMesh2DRenderDataHandle() {
            return new NoRenderMeshDataHandle();
        }
        createSetRenderDataCMD() {
            return new NoRenderSetRenderData();
        }
        createSetShaderDefineCMD() {
            return new NoRenderSetShaderDefine();
        }
        createBlit2DQuadCMDData() {
            return new NoRenderBlit2DquadCMD();
        }
        createDraw2DElementCMDData() {
            return new NoRenderDraw2DElementCMD();
        }
        createSetRendertarget2DCMD() {
            return new NoRenderSetRendertarget2DCMD();
        }
        createRenderElement2D() {
            return new NoRenderElement2D();
        }
        createPrimitiveRenderElement2D() {
            return new NoRenderPrimitiveRenderElement2D();
        }
        createRenderContext2D() {
            return new NoRenderContext2D();
        }
        createEmptyRenderDataHandle() {
            return new NoRenderEmptyDataHandle();
        }
    }
    class NoRenderElement2D {
        constructor() {
            this.typeKey = 0;
            this.textureKey = 0;
        }
        destroy() {
        }
    }
    class NoRenderPrimitiveRenderElement2D extends NoRenderElement2D {
        constructor() {
            super(...arguments);
            this.typeKey = 0;
            this.textureKey = 0;
            this.primitiveShaderData = null;
        }
    }
    class NoRenderContext2D {
        getRenderTarget() {
            return null;
        }
        setRenderTarget(value, clear, clearColor) {
        }
        setOffscreenView(width, height, x, y) {
        }
        getOffscreenView(out) {
        }
        drawRenderElementOne(node) {
        }
        drawRenderElementList(list) {
            return 0;
        }
        runOneCMD(cmd) {
        }
        runCMDList(cmds) {
        }
    }
    class NoRenderBlit2DquadCMD extends Laya.Blit2DQuadCMD {
        apply(context) {
        }
    }
    class NoRenderDraw2DElementCMD extends Laya.Draw2DElementCMD {
        setRenderelements(value) {
        }
        apply(context) {
        }
    }
    class NoRenderSetRendertarget2DCMD extends Laya.SetRendertarget2DCMD {
        apply(context) {
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.render2DRenderPassFactory)
            Laya.LayaGL.render2DRenderPassFactory = new NoRender2DProcess();
    });

    class NoRenderDirectLight {
        setShadowFourCascadeSplits(value) { }
        setDirection(value) { }
    }
    class NoRenderSpotLight {
        setDirection(value) { }
    }
    class NoRenderPointLight {
    }
    class NoRenderLightmapData {
        destroy() { }
    }
    class NoRenderReflectionProbe {
        setProbePosition(value) { }
        setAmbientColor(value) { }
        setAmbientSH(value) { }
        destroy() { }
    }
    class NoRenderVolumetricGI {
        constructor() {
            this.bound = new Laya.Bounds();
        }
        setProbeCounts(value) { }
        setProbeStep(value) { }
        setParams(value) { }
        destroy() { }
    }
    class NoRenderCameraNodeData {
        setProjectionViewMatrix(value) { }
    }
    class NoRenderSceneNodeData {
    }
    class NoRenderBaseRenderNode {
        constructor() {
            this.additionShaderData = new Map();
            this.ismoved = new Laya.Vector2();
            this.perCameraUpdate = false;
        }
        set_renderUpdatePreCall(call, fun) { }
        set_caculateBoundingBox(call, fun) { }
        setRenderelements(value) { }
        setLightmapScaleOffset(value) { }
        setCommonUniformMap(value) { }
        setNodeCustomData(dataSlot, data) { }
        _applyLightProb() { }
        _applyReflection() { }
        destroy() { this.additionShaderData = null; }
    }
    class NoRenderMeshRenderNode extends NoRenderBaseRenderNode {
    }
    class NoRenderSkinRenderNode extends NoRenderMeshRenderNode {
        computeSkinnedData() { }
        setRootBoneTransfom(value) { }
        setOwnerTransform(value) { }
        setCacheMesh(cacheMesh) { }
        setBones(value) { }
        setSkinnedData(value) { }
    }
    class NoRenderSimpleSkinRenderNode extends NoRenderBaseRenderNode {
        setSimpleAnimatorParams(value) { }
    }
    class NoRender3DModuleFactory {
        createTransform(owner) {
            return new Laya.Transform3D(owner);
        }
        createBounds(min, max) {
            return new Laya.BoundsImpl(min, max);
        }
        createVolumetricGI() {
            return new NoRenderVolumetricGI();
        }
        createReflectionProbe() {
            return new NoRenderReflectionProbe();
        }
        createLightmapData() {
            return new NoRenderLightmapData();
        }
        createDirectLight() {
            return new NoRenderDirectLight();
        }
        createSpotLight() {
            return new NoRenderSpotLight();
        }
        createPointLight() {
            return new NoRenderPointLight();
        }
        createCameraModuleData() {
            return new NoRenderCameraNodeData();
        }
        createSceneModuleData() {
            return new NoRenderSceneNodeData();
        }
        createBaseRenderNode() {
            return new NoRenderBaseRenderNode();
        }
        createMeshRenderNode() {
            return new NoRenderMeshRenderNode();
        }
        createSkinRenderNode() {
            return new NoRenderSkinRenderNode();
        }
        createSimpleSkinRenderNode() {
            return new NoRenderSimpleSkinRenderNode();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.Laya3DRender.Render3DModuleDataFactory) {
            Laya.Laya3DRender.Render3DModuleDataFactory = new NoRender3DModuleFactory();
        }
    });

    class NoRender3DRenderPassFactory {
        createComputeCommandAppatchCMD() {
            return new NoRenderComputeCommandAppatchCMD();
        }
        createRender3DProcess() {
            return new NoRenderRender3DProcess();
        }
        createRenderContext3D() {
            return new NoRenderRenderContext3D();
        }
        createRenderElement3D() {
            return new NoRenderRenderElement3D();
        }
        createSkinRenderElement() {
            return new NoRenderSkinRenderElement3D();
        }
        createSceneRenderManager() {
            return new NoRenderSceneRenderManager();
        }
        createDrawNodeCMDData() {
            return new NoRenderDrawNodeCMDData();
        }
        createBlitQuadCMDData() {
            return new NoRenderBlitQuadCMDData();
        }
        createDrawElementCMDData() {
            return new NoRenderDrawElementCMDData();
        }
        createSetViewportCMD() {
            return new NoRenderSetViewportCMD();
        }
        createSetRenderTargetCMD() {
            return new NoRenderSetRenderTargetCMD();
        }
        createSetRenderDataCMD() {
            return new NoRenderSetRenderData();
        }
        createSetShaderDefineCMD() {
            return new NoRenderSetShaderDefine();
        }
    }
    class NoRenderComputeCommandAppatchCMD extends Laya.ComputeCommandAppatchCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ComputeCommandAppatch;
        }
        apply(_context) {
        }
    }
    class NoRenderRender3DProcess {
        destroy() {
        }
        fowardRender(context, camera) {
        }
    }
    class NoRenderSceneRenderManager {
        constructor() {
            this.list = new Laya.SingletonList();
            this.baseRenderList = new Laya.SingletonList();
        }
        registerBatchModuleAgent(renderNodeType, agent) {
        }
        updateProperty(object, property) {
        }
        addRenderObject(object) {
        }
        removeRenderObject(object) {
        }
        removeMotionObject(object) {
        }
        addMotionObject(object) {
        }
        updateMotionObjects() {
        }
        destroy() {
            this.list.clear();
            this.baseRenderList.clear();
            this.list = null;
            this.baseRenderList = null;
        }
    }
    class NoRenderRenderContext3D {
        setRenderTarget(value, clearFlag) {
        }
        setViewPort(value) {
        }
        setScissor(value) {
        }
        setClearData(clearFlag, clolor, depth, stencil) {
            return 0;
        }
        drawRenderElementList(list) {
            return 0;
        }
        drawRenderElementOne(node) {
            return 0;
        }
        runOneCMD(cmd) {
        }
        runCMDList(cmds) {
        }
        clearRenderTarget() {
        }
    }
    class NoRenderRenderElement3D {
        destroy() {
        }
    }
    class NoRenderSkinRenderElement3D {
        constructor() {
            this.skinnedData = [];
        }
    }
    class NoRenderDrawNodeCMDData extends Laya.DrawNodeCMDData {
        get node() {
            return this._node;
        }
        set node(value) {
            this._node = value;
        }
        get destShaderData() {
            return this._destShaderData;
        }
        set destShaderData(value) {
            this._destShaderData = value;
        }
        get destSubShader() {
            return this._destSubShader;
        }
        set destSubShader(value) {
            this._destSubShader = value;
        }
        get subMeshIndex() {
            return this._subMeshIndex;
        }
        set subMeshIndex(value) {
            this._subMeshIndex = value;
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.DrawNode;
        }
        apply(context) {
        }
    }
    class NoRenderBlitQuadCMDData extends Laya.BlitQuadCMDData {
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
        }
        get viewport() {
            return this._viewport;
        }
        set viewport(value) {
            value.cloneTo(this._viewport);
        }
        get scissor() {
            return this._scissor;
        }
        set scissor(value) {
            value.cloneTo(this._scissor);
        }
        get source() {
            return this._source;
        }
        set source(value) {
            this._source = value;
            if (this._source) {
                this._sourceTexelSize.setValue(1.0 / this._source.width, 1.0 / this._source.height, this._source.width, this._source.height);
            }
        }
        get offsetScale() {
            return this._offsetScale;
        }
        set offsetScale(value) {
            value.cloneTo(this._offsetScale);
        }
        get element() {
            return this._element;
        }
        set element(value) {
            this._element = value;
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.Blit;
            this._viewport = new Laya.Viewport();
            this._scissor = new Laya.Vector4();
            this._offsetScale = new Laya.Vector4();
            this._sourceTexelSize = new Laya.Vector4();
        }
        apply(context) {
        }
    }
    class NoRenderDrawElementCMDData extends Laya.DrawElementCMDData {
        constructor() {
            super();
            this._elemets = [];
            this.type = Laya.RenderCMDType.DrawElement;
        }
        setRenderelements(value) {
            this._elemets = value;
        }
        apply(context) {
        }
    }
    class NoRenderSetViewportCMD extends Laya.SetViewportCMD {
        get viewport() {
            return this._viewport;
        }
        set viewport(value) {
            this._viewport = value;
        }
        get scissor() {
            return this._scissor;
        }
        set scissor(value) {
            this._scissor = value;
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeViewPort;
            this.scissor = new Laya.Vector4();
            this.viewport = new Laya.Viewport();
        }
        apply(context) {
        }
    }
    new Laya.Viewport();
    new Laya.Vector4();
    class NoRenderSetRenderTargetCMD extends Laya.SetRenderTargetCMD {
        get rt() {
            return this._rt;
        }
        set rt(value) {
            this._rt = value;
        }
        get clearFlag() {
            return this._clearFlag;
        }
        set clearFlag(value) {
            this._clearFlag = value;
        }
        get clearColorValue() {
            return this._clearColorValue;
        }
        set clearColorValue(value) {
            value.cloneTo(this._clearColorValue);
        }
        get clearDepthValue() {
            return this._clearDepthValue;
        }
        set clearDepthValue(value) {
            this._clearDepthValue = value;
        }
        get clearStencilValue() {
            return this._clearStencilValue;
        }
        set clearStencilValue(value) {
            this._clearStencilValue = value;
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeRenderTarget;
            this._clearColorValue = new Laya.Color();
        }
        apply(context) {
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.Laya3DRender.Render3DPassFactory)
            Laya.Laya3DRender.Render3DPassFactory = new NoRender3DRenderPassFactory();
    });

    class NoRenderShaderPass {
        get validDefine() { return this._validDefine; }
        set validDefine(value) { this._validDefine = value; }
        get renderState() { return this._renderState; }
        set renderState(value) { this._renderState = value; }
        constructor(pass) {
            this._validDefine = new NoRenderDefineDatas();
            this._renderState = new Laya.RenderState();
            this._renderState.setNull();
        }
        setCacheShader(compileDefine, shader) {
        }
        getCacheShader(compileDefine) {
            return null;
        }
        destroy() {
        }
    }
    class NoRenderSubShader {
        addShaderPass(pass) { }
        setUniformMap(_uniformMap) { }
        destroy() { }
    }
    class NoRenderUnitModuleDataFactory {
        createSubShader() {
            return new NoRenderSubShader();
        }
        createShaderPass(pass) {
            return new NoRenderShaderPass(pass);
        }
        createRenderState() {
            return new Laya.RenderState();
        }
        createDefineDatas() {
            return new NoRenderDefineDatas();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.unitRenderModuleDataFactory)
            Laya.LayaGL.unitRenderModuleDataFactory = new NoRenderUnitModuleDataFactory();
    });

    exports.NoInternalRT = NoInternalRT;
    exports.NoInternalTexture = NoInternalTexture;
    exports.NoRender2DPass = NoRender2DPass;
    exports.NoRender2DPassManager = NoRender2DPassManager;
    exports.NoRender2DProcess = NoRender2DProcess;
    exports.NoRender3DModuleFactory = NoRender3DModuleFactory;
    exports.NoRender3DRenderPassFactory = NoRender3DRenderPassFactory;
    exports.NoRenderBaseDataHandle = NoRenderBaseDataHandle;
    exports.NoRenderBlit2DquadCMD = NoRenderBlit2DquadCMD;
    exports.NoRenderBlitQuadCMDData = NoRenderBlitQuadCMDData;
    exports.NoRenderBufferState = NoRenderBufferState;
    exports.NoRenderCommandUnifojrmMap = NoRenderCommandUnifojrmMap;
    exports.NoRenderContext2D = NoRenderContext2D;
    exports.NoRenderDefineDatas = NoRenderDefineDatas;
    exports.NoRenderDeviceFactory = NoRenderDeviceFactory;
    exports.NoRenderDraw2DElementCMD = NoRenderDraw2DElementCMD;
    exports.NoRenderDrawElementCMDData = NoRenderDrawElementCMDData;
    exports.NoRenderDrawNodeCMDData = NoRenderDrawNodeCMDData;
    exports.NoRenderElement2D = NoRenderElement2D;
    exports.NoRenderEmptyDataHandle = NoRenderEmptyDataHandle;
    exports.NoRenderEngine = NoRenderEngine;
    exports.NoRenderGeometryElement = NoRenderGeometryElement;
    exports.NoRenderGlobalRenderData = NoRenderGlobalRenderData;
    exports.NoRenderGraphicIndexBuffer = NoRenderGraphicIndexBuffer;
    exports.NoRenderGraphicVertexBuffer = NoRenderGraphicVertexBuffer;
    exports.NoRenderGraphics2DBufferBlock = NoRenderGraphics2DBufferBlock;
    exports.NoRenderGraphics2DVertexBlock = NoRenderGraphics2DVertexBlock;
    exports.NoRenderIndexBuffer = NoRenderIndexBuffer;
    exports.NoRenderIndexDataView = NoRenderIndexDataView;
    exports.NoRenderMeshDataHandle = NoRenderMeshDataHandle;
    exports.NoRenderPrimitiveDataHandle = NoRenderPrimitiveDataHandle;
    exports.NoRenderPrimitiveRenderElement2D = NoRenderPrimitiveRenderElement2D;
    exports.NoRenderRender3DProcess = NoRenderRender3DProcess;
    exports.NoRenderRenderContext3D = NoRenderRenderContext3D;
    exports.NoRenderRenderElement3D = NoRenderRenderElement3D;
    exports.NoRenderSceneRenderManager = NoRenderSceneRenderManager;
    exports.NoRenderSetRenderData = NoRenderSetRenderData;
    exports.NoRenderSetRenderTargetCMD = NoRenderSetRenderTargetCMD;
    exports.NoRenderSetRendertarget2DCMD = NoRenderSetRendertarget2DCMD;
    exports.NoRenderSetShaderDefine = NoRenderSetShaderDefine;
    exports.NoRenderSetViewportCMD = NoRenderSetViewportCMD;
    exports.NoRenderShaderData = NoRenderShaderData;
    exports.NoRenderShaderInstance = NoRenderShaderInstance;
    exports.NoRenderSkinRenderElement3D = NoRenderSkinRenderElement3D;
    exports.NoRenderSpineDataHandle = NoRenderSpineDataHandle;
    exports.NoRenderStruct2D = NoRenderStruct2D;
    exports.NoRenderUnitModuleDataFactory = NoRenderUnitModuleDataFactory;
    exports.NoRenderVertexBuffer = NoRenderVertexBuffer;
    exports.NoRenderVertexDataView = NoRenderVertexDataView;
    exports.NoTextureContext = NoTextureContext;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.no-render.js.map
