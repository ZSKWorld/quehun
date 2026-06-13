(function (exports, Laya) {
    'use strict';

    class LayaXSetRendertarget2DCMD extends Laya.SetRendertarget2DCMD {
        constructor() {
            super();
            this._nativeObj = new window.conchLayaXSetRendertarget2DCMD();
            this.type = Laya.RenderCMDType.ChangeRenderTarget;
            this._clearColorValue = new Laya.Color();
        }
        get rt() { return this._rt; }
        set rt(value) {
            this._rt = value;
            this._nativeObj.setRT(value ? value._nativeObj : null, this.size.x, this.size.y);
        }
        get clearColor() { return this._clearColor; }
        set clearColor(value) {
            this._clearColor = value;
            this._nativeObj.setClearColor(value);
        }
        get clearColorValue() { return this._clearColorValue; }
        set clearColorValue(value) {
            value.cloneTo(this._clearColorValue);
            this._nativeObj.clearColorValue(value.r, value.g, value.b, value.a);
        }
        get invertY() { return this._invertY; }
        set invertY(value) {
            this._invertY = value;
            this._nativeObj.setinvertY(value);
        }
        get viewportX() { return this._viewportX; }
        set viewportX(value) {
            this._viewportX = value;
            this._nativeObj.setViewportX(value);
        }
        get viewportY() { return this._viewportY; }
        set viewportY(value) {
            this._viewportY = value;
            this._nativeObj.setViewportY(value);
        }
        apply(_context) {
        }
    }
    class LayaXDraw2DElementCMD extends Laya.Draw2DElementCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.DrawElement;
            this._nativeObj = new window.conchLayaXDraw2DElementCMD();
        }
        setRenderelements(value) {
            this._nativeObj.clearElement();
            for (let i = 0, n = value.length; i < n; i++) {
                this._nativeObj.addOneElement(value[i]._nativeObj);
            }
        }
        apply(_context) {
        }
    }
    class LayaXBlit2DQuadCMD extends Laya.Blit2DQuadCMD {
        constructor() {
            super();
            this._nativeObj = new window.conchLayaXBlit2DQuadCMD();
            this.type = Laya.RenderCMDType.Blit;
            this._offsetScale = new Laya.Vector4();
        }
        get element() { return this._element; }
        set element(value) {
            this._element = value;
            this._nativeObj.setRenderElement(value ? value._nativeObj : null);
        }
        get dest() { return this._dest; }
        set dest(value) {
            this._dest = value;
            this._nativeObj.setDest(value ? value._nativeObj : null);
        }
        get source() { return this._source; }
        set source(value) {
            this._source = value;
            this._nativeObj.setSource(value ? value._nativeObj : null);
        }
        get offsetScale() { return this._offsetScale; }
        set offsetScale(value) {
            value.cloneTo(this._offsetScale);
            this._nativeObj.setOffsetScale(this._offsetScale);
        }
        apply(_context) {
        }
    }

    class LayaXRenderElement2D {
        init() {
            this._nativeObj = new window.conchLayaXRenderElement2D();
        }
        constructor() {
            this._renderStateIsBySprite = true;
            this.init();
        }
        _onRenderStateChanged() {
            var _a, _b;
            if (!this._nativeObj || !this._subShader)
                return;
            this._registerRS();
            (_b = (_a = this._nativeObj).syncRenderState) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        _pickMaterialSD() {
            var _a;
            return (_a = this._materialShaderData) !== null && _a !== void 0 ? _a : null;
        }
        _registerRS() {
            var _a, _b, _c, _d;
            const sd = this._pickMaterialSD();
            if (!sd)
                return;
            const pass = (_b = (_a = this._subShader._passes) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
            const rs = (_c = pass === null || pass === void 0 ? void 0 : pass.renderState) !== null && _c !== void 0 ? _c : null;
            const statefirst = (_d = pass === null || pass === void 0 ? void 0 : pass.statefirst) !== null && _d !== void 0 ? _d : false;
            const D = Laya.RenderState.Default;
            const p = (passVal, sdKey, def) => {
                if (statefirst && passVal != null)
                    return passVal;
                const v = sd.getInt(sdKey);
                return (v != null && v !== undefined) ? v : def;
            };
            this._nativeObj.registerMaterialRenderState(p(rs === null || rs === void 0 ? void 0 : rs.blend, Laya.Shader3D.BLEND, D.blend), p(rs === null || rs === void 0 ? void 0 : rs.srcBlend, Laya.Shader3D.BLEND_SRC, D.srcBlend), p(rs === null || rs === void 0 ? void 0 : rs.dstBlend, Laya.Shader3D.BLEND_DST, D.dstBlend), p(rs === null || rs === void 0 ? void 0 : rs.blendEquation, Laya.Shader3D.BLEND_EQUATION, D.blendEquation), p(rs === null || rs === void 0 ? void 0 : rs.srcBlendRGB, Laya.Shader3D.BLEND_SRC_RGB, D.srcBlendRGB), p(rs === null || rs === void 0 ? void 0 : rs.dstBlendRGB, Laya.Shader3D.BLEND_DST_RGB, D.dstBlendRGB), p(rs === null || rs === void 0 ? void 0 : rs.srcBlendAlpha, Laya.Shader3D.BLEND_SRC_ALPHA, D.srcBlendAlpha), p(rs === null || rs === void 0 ? void 0 : rs.dstBlendAlpha, Laya.Shader3D.BLEND_DST_ALPHA, D.dstBlendAlpha), p(rs === null || rs === void 0 ? void 0 : rs.blendEquationRGB, Laya.Shader3D.BLEND_EQUATION_RGB, D.blendEquationRGB), p(rs === null || rs === void 0 ? void 0 : rs.blendEquationAlpha, Laya.Shader3D.BLEND_EQUATION_ALPHA, D.blendEquationAlpha));
        }
        set type(v) { this._nativeObj.type = v; }
        get type() { return this._nativeObj.type; }
        set geometry(d) {
            this._geometry = d;
            this._nativeObj.setGeometry(d ? d._nativeObj : null);
        }
        get geometry() { return this._geometry; }
        set materialShaderData(d) {
            if (this._materialShaderData)
                this._materialShaderData._removeRenderStateListener(this);
            this._materialShaderData = d;
            this._nativeObj.setMaterialShaderData(d ? d._nativeObj : null);
            if (this._materialShaderData) {
                this._materialShaderData._addRenderStateListener(this);
                this._onRenderStateChanged();
            }
        }
        get materialShaderData() { return this._materialShaderData; }
        set value2DShaderData(d) {
            if (this._value2DShaderData)
                this._value2DShaderData._removeRenderStateListener(this);
            this._value2DShaderData = d;
            this._nativeObj.setValue2DShaderData(d ? d._nativeObj : null);
            if (this._value2DShaderData) {
                this._value2DShaderData._addRenderStateListener(this);
            }
        }
        get value2DShaderData() { return this._value2DShaderData; }
        set globalShaderData(d) {
            this._globalShaderData = d;
            this._nativeObj.setGlobalShaderData(d ? d._nativeObj : null);
        }
        get globalShaderData() { return this._globalShaderData; }
        get subShader() { return this._subShader; }
        set subShader(v) {
            this._subShader = v;
            if (v)
                this._nativeObj.setSubShader(v.moduleData._nativeObj);
            this._onRenderStateChanged();
        }
        get owner() { return this._owner; }
        set owner(v) {
            this._owner = v;
            this._nativeObj.setOwner(v ? v._nativeObj : null);
        }
        get nodeCommonMap() { return this._nodeCommonMap; }
        set nodeCommonMap(v) {
            this._nodeCommonMap = v;
            this._nativeObj.setCommonUniformMap(v);
        }
        get renderStateIsBySprite() { return this._renderStateIsBySprite; }
        set renderStateIsBySprite(v) {
            if (this._renderStateIsBySprite === v)
                return;
            this._renderStateIsBySprite = v;
            this._nativeObj.renderStateIsBySprite = v;
        }
        destroy() {
            if (this._materialShaderData)
                this._materialShaderData._removeRenderStateListener(this);
            if (this._value2DShaderData)
                this._value2DShaderData._removeRenderStateListener(this);
            this._nativeObj.destroy();
        }
    }

    class LayaXPrimitiveRenderElement2D extends LayaXRenderElement2D {
        init() {
            this._nativeObj = new window.conchLayaXPrimitiveRenderElement2D();
        }
        set typeKey(value) {
            this._nativeObj.typeKey = value;
            this._typeKey = value;
        }
        get typeKey() {
            return this._typeKey;
        }
        set textureKey(value) {
            this._nativeObj.textureKey = value;
            this._textureKey = value;
        }
        get textureKey() {
            return this._textureKey;
        }
        _pickMaterialSD() {
            var _a, _b;
            return (_b = (_a = this._materialShaderData) !== null && _a !== void 0 ? _a : this._primitiveShaderData) !== null && _b !== void 0 ? _b : null;
        }
        get primitiveShaderData() { return this._primitiveShaderData; }
        set primitiveShaderData(data) {
            if (this._primitiveShaderData)
                this._primitiveShaderData._removeRenderStateListener(this);
            this._primitiveShaderData = data;
            this._nativeObj.setPrimitiveShaderData(data ? data._nativeObj : null);
            if (this._primitiveShaderData) {
                this._primitiveShaderData._addRenderStateListener(this);
                this._onRenderStateChanged();
            }
        }
        destroy() {
            if (this._primitiveShaderData)
                this._primitiveShaderData._removeRenderStateListener(this);
            super.destroy();
        }
    }

    class RTRender2DPass {
        get enable() {
            return this._enable;
        }
        set enable(value) {
            this._enable = value;
            this._nativeObj.enable = value;
        }
        get enableBatch() {
            return this._enableBatch;
        }
        set enableBatch(value) {
            this._enableBatch = value;
            this._nativeObj.enableBatch = value;
        }
        get isSupport() {
            return this._isSupport;
        }
        set isSupport(value) {
            this._isSupport = value;
            this._nativeObj.isSupport = value;
        }
        get root() {
            return this._root;
        }
        set root(value) {
            this._root = value;
            this._nativeObj.setRoot(value ? value._nativeObj : null);
        }
        set doClearColor(value) {
            this._doClearColor = value;
            this._nativeObj.doClearColor = value;
        }
        get doClearColor() {
            return this._doClearColor;
        }
        set mask(value) {
            this._mask = value;
            this._nativeObj.setMask(value ? value._nativeObj : null);
        }
        get mask() {
            return this._mask;
        }
        get repaint() {
            return this._repaint;
        }
        set repaint(value) {
            this._repaint = value;
            this._nativeObj.repaint = value;
        }
        get renderTexture() {
            return this._renderTexture;
        }
        set renderTexture(value) {
            this._renderTexture = value;
            if (value) {
                this._nativeObj.setRenderTexture(value._renderTarget._nativeObj, value.width, value.height, value._invertY);
            }
            else {
                this._nativeObj.setRenderTexture(null, 0, 0, false);
            }
        }
        get priority() {
            return this._priority;
        }
        set priority(value) {
            this._priority = value;
            this._nativeObj.priority = value;
        }
        set shaderData(value) {
            this._shaderData = value;
        }
        get shaderData() {
            return this._shaderData;
        }
        set offsetMatrix(value) {
            this._renderOffset = value;
            this._nativeObj.offsetMatrix = value;
        }
        get offsetMatrix() {
            return this._renderOffset;
        }
        needRender() {
            return (this._enable && !this._isSupport && (this._repaint || !this._renderTexture));
        }
        setClearColor(r, g, b, a) {
            this._nativeObj.setClearColor(r, g, b, a);
        }
        constructor(skipNative) {
            this._enable = false;
            this._enableBatch = false;
            this._isSupport = false;
            this._root = null;
            this.postProcess = null;
            this._enablePostProcess = false;
            this._shaderData = null;
            this._renderOffset = new Laya.Matrix();
            this._shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData(null);
            if (!skipNative) {
                this._nativeObj = new window.conchRTRender2DPass(this._shaderData._nativeObj);
                this.enable = true;
                this.enableBatch = true;
                this.isSupport = false;
                this.doClearColor = true;
                this.repaint = true;
                this.priority = 0;
                this.offsetMatrix = new Laya.Matrix();
            }
        }
        fowardRender(context, renderTime) {
            let rt = this.renderTexture;
            if (rt) {
                context.invertY = rt._invertY;
            }
            this._nativeObj.fowardRender(context._nativeObj, renderTime);
        }
        updatePostProcess() {
            let pp = this.postProcess;
            if (pp === null || pp === void 0 ? void 0 : pp._checkEnabled()) {
                let command = pp._context.command;
                this._nativeObj.setPostProcessShaderData(command.shaderData._nativeObj);
                this._nativeObj.setPostProcess(this._getRenderCMDArray(command._renderCMDs));
                this._nativeObj.setEnablePostProcess(true);
                this._enablePostProcess = true;
            }
            else if (this._enablePostProcess) {
                this._nativeObj.setEnablePostProcess(false);
                this._enablePostProcess = false;
            }
        }
        _getRenderCMDArray(cmds) {
            let nativeobCMDs = [];
            cmds.forEach(element => {
                nativeobCMDs.push(element._nativeObj);
            });
            return nativeobCMDs;
        }
        destroy() {
            this._nativeObj.destroy();
            this.root = null;
            this.renderTexture = null;
            this.postProcess = null;
            this.shaderData = null;
        }
    }
    class RTRender2DPassManager {
        constructor() {
            this._nativeObj = new window.conchRTRender2DPassManager();
        }
        removePass(pass) {
            this._nativeObj.removePass(pass._nativeObj);
        }
        apply(context, renderTime) {
            this._nativeObj.apply(context._nativeObj, renderTime);
        }
        clear() {
            this._nativeObj.clear();
        }
        addPass(pass) {
            this._nativeObj.addPass(pass._nativeObj);
        }
    }

    class RTRender2DDataHandle {
        constructor(nativeObj) {
            this._nativeObj = nativeObj;
            this.needUseMatrix = true;
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            this._owner = value;
            this._nativeObj.setOwner(value ? value._nativeObj : null);
        }
        get needUseMatrix() {
            return this._needUseMatrix;
        }
        set needUseMatrix(value) {
            this._needUseMatrix = value;
            this._nativeObj.needUseMatrix = value;
        }
        destroy() {
            this._nativeObj.destroy();
        }
        inheriteRenderData(context) {
            this._nativeObj.inheriteRenderData(context._nativeObj);
        }
    }
    class RTEmptyRender2DDataHandle extends RTRender2DDataHandle {
        constructor() {
            const nativeObj = new window.conchRTEmptyRender2DDataHandle();
            super(nativeObj);
        }
        inheriteRenderData(_context) {
        }
        destroy() {
        }
    }
    class RTGraphics2DBufferBlock {
        get vertexs() {
            return this._vertexs;
        }
        set vertexs(value) {
            this._vertexs = value;
            this._nativeObj.clearVertexs();
            for (var i = 0; i < value.length; i++) {
                this._nativeObj.addVetexBlock(value[i]._nativeObj);
            }
        }
        get indexView() {
            return this._indexView;
        }
        set indexView(value) {
            this._indexView = value;
            this._nativeObj.setindexView(value._nativeObj);
        }
        get vertexBuffer() {
            return this._vertexBuffer;
        }
        set vertexBuffer(value) {
            this._vertexBuffer = value;
            this._nativeObj.setVertexBuffer(value._nativeObj);
        }
        constructor() {
            this._nativeObj = new window.conchRTGraphics2DBufferBlock();
        }
    }
    class RTGraphics2DVertexBlock {
        get positions() {
            return this._positions;
        }
        set positions(value) {
            this._positions = value;
            this._nativeObj.setPositions(value);
        }
        get vertexViews() {
            return this._vertexViews;
        }
        set vertexViews(value) {
            this._vertexViews = value;
            this._nativeObj.clearVertexViews();
            for (var i = 0; i < value.length; i++) {
                this._nativeObj.addVertexView(value[i]._nativeObj);
            }
        }
        constructor() {
            this._nativeObj = new window.conchRTGraphics2DVertexBlock();
        }
    }
    class RTPrimitiveDataHandle extends RTRender2DDataHandle {
        constructor() {
            super(new window.conchRTPrimitiveDataHandle());
            this._mask = null;
            this._logicMatrix = null;
            this._blocks = null;
            this._blocksNative = null;
        }
        get mask() {
            return this._mask;
        }
        set mask(value) {
            this._mask = value;
            this._nativeObj.setMask(value ? value._nativeObj : null);
        }
        get logicMatrix() {
            return this._logicMatrix;
        }
        set logicMatrix(value) {
            if (value) {
                if (!this._logicMatrix) {
                    this._logicMatrix = new Laya.Matrix();
                }
                value.copyTo(this._logicMatrix);
            }
            this._nativeObj.setLogicMatrix(this._logicMatrix, !!value);
        }
        applyVertexBufferBlock(blocks) {
            this._blocks = blocks;
            let nativeBlocks = [];
            for (var i = 0; i < blocks.length; i++) {
                nativeBlocks.push(blocks[i]._nativeObj);
            }
            this._blocksNative = nativeBlocks;
            this._nativeObj.applyVertexBufferBlock(this._blocksNative);
        }
        skipBufferUpdate() {
            this._nativeObj.skipBufferUpdate();
        }
        inheriteRenderData(context) {
            this._nativeObj.inheriteRenderData(context._nativeObj);
        }
        destroy() {
            super.destroy();
            this._blocks = null;
            this._blocksNative = null;
        }
    }
    class RTBaseRenderDataHandle extends RTRender2DDataHandle {
        constructor(nativeObj) {
            super(nativeObj || new window.conchRTRender2DDataHandle());
            this._lightReceive = false;
        }
        get lightReceive() {
            return this._lightReceive;
        }
        set lightReceive(value) {
            this._lightReceive = value;
            if (value) {
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_ENABLE);
            }
            else {
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_ENABLE);
            }
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            if (value == this.owner)
                return;
            if (this._owner) {
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            }
            this._owner = value;
            this._nativeObj.setOwner(this._owner._nativeObj);
            if (this._owner) {
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            }
        }
    }
    class RTMesh2DRenderDataHandle extends RTBaseRenderDataHandle {
        constructor() {
            super(new window.conchRTMesh2DRenderDataHandle());
            this._baseColor = new Laya.Color(1, 1, 1, 1);
            this._tilingOffset = new Laya.Vector4();
            this.baseColor = new Laya.Color(1, 1, 1, 1);
        }
        get tilingOffset() {
            return this._tilingOffset;
        }
        set tilingOffset(value) {
            if (!value)
                return;
            this._owner.spriteShaderData.setVector(Laya.BaseRenderNode2D.TILINGOFFSET, value);
            value ? value.cloneTo(this._tilingOffset) : null;
        }
        get baseColor() {
            return this._baseColor;
        }
        set baseColor(value) {
            if (value != this._baseColor && this._baseColor.equal(value))
                return;
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._baseColor);
            this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._baseColor);
            this._nativeObj.setBaseColor(this._baseColor);
        }
        get baseTexture() {
            return this._baseTexture;
        }
        set baseTexture(value) {
            if (this._baseTexture != null && value == this._baseTexture)
                return;
            if (this._baseTexture)
                this._baseTexture._removeReference();
            this._baseTexture = value;
            value = value ? value : Laya.Texture2D.whiteTexture;
            this._owner.spriteShaderData.setTexture(Laya.BaseRenderNode2D.BASERENDER2DTEXTURE, value);
            if (value) {
                value._addReference();
                if (value.gammaCorrection != 1) {
                    this._owner.spriteShaderData.addDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
                else {
                    this._owner.spriteShaderData.removeDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
            }
        }
        get normal2DTexture() {
            return this._normal2DTexture;
        }
        set normal2DTexture(value) {
            if (value === this._normal2DTexture)
                return;
            if (this._normal2DTexture)
                this._normal2DTexture._removeReference(1);
            if (value)
                value._addReference();
            this._normal2DTexture = value;
            this._owner.spriteShaderData.setTexture(Laya.BaseRenderNode2D.NORMAL2DTEXTURE, value);
            if (this._normal2DStrength > 0 && this._normal2DTexture)
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
            else
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
        }
        get normal2DStrength() {
            return this._normal2DStrength;
        }
        set normal2DStrength(value) {
            value = Math.max(0, Math.min(1, value));
            if (this._normal2DStrength === value)
                return;
            this._normal2DStrength = value;
            this._owner.spriteShaderData.setNumber(Laya.BaseRenderNode2D.NORMAL2DSTRENGTH, value);
            if (value > 0 && this._normal2DTexture)
                this._owner.spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
            else
                this._owner.spriteShaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_LIGHT2D_NORMAL_PARAM);
        }
    }
    class RTSpineRenderDataHandle extends RTBaseRenderDataHandle {
        get baseColor() {
            return this._baseColor;
        }
        set baseColor(value) {
            if (value != this._baseColor && this._baseColor.equal(value))
                return;
            value = value ? value : Laya.Color.BLACK;
            value.cloneTo(this._baseColor);
            this._owner.spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, this._baseColor);
            this._nativeObj.setBaseColor(this._baseColor);
        }
        constructor() {
            super(new window.conchRTSpineRenderDataHandle());
            this._offset = new Laya.Vector2();
            this._baseColor = new Laya.Color(1, 1, 1, 1);
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            if (value == this.owner)
                return;
            if (this._owner) {
                let shaderData = this._owner.spriteShaderData;
                shaderData.removeDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
                shaderData.removeDefine(Laya.SpineShaderInit.SPINE_UV);
                shaderData.removeDefine(Laya.SpineShaderInit.SPINE_COLOR);
            }
            this._owner = value;
            this._nativeObj.setOwner(this._owner._nativeObj);
            if (this._owner) {
                let shaderData = this._owner.spriteShaderData;
                shaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
                shaderData.addDefine(Laya.SpineShaderInit.SPINE_UV);
                shaderData.addDefine(Laya.SpineShaderInit.SPINE_COLOR);
            }
        }
        get offset() {
            return this._offset;
        }
        set offset(value) {
            this._offset = value;
            this._nativeObj.setOffset(this._offset);
        }
    }

    class RTGlobalRenderData {
        constructor() {
            this._nativeObj = new window.conchRTGlobalRenderData();
        }
        get cullRect() {
            return this._cullRect;
        }
        set cullRect(value) {
            this._cullRect = value;
            this._nativeObj.setCullRect(value);
        }
        get renderLayerMask() {
            return this._renderLayerMask;
        }
        set renderLayerMask(value) {
            this._renderLayerMask = value;
            this._nativeObj.renderLayerMask = value;
        }
        get globalShaderData() {
            return this._globalShaderData;
        }
        set globalShaderData(value) {
            this._globalShaderData = value;
            this._nativeObj.setGlobalShaderData(value ? value._nativeObj : null);
        }
    }
    class RTRenderStruct2D {
        get manualRender() {
            return this._manualRender;
        }
        set manualRender(value) {
            this._manualRender = value;
            this._nativeObj.manualRender = value;
        }
        get globalAlpha() {
            return this._nativeObj.getGlobalAlpha();
        }
        get dcOptimize() {
            return this._dcOptimize;
        }
        set dcOptimize(value) {
            this._dcOptimize = value;
            this._nativeObj.setDcOptimize(value);
        }
        get inheritedDcOptimize() {
            var _a;
            if (this._nativeObj.getInheritedDcOptimize) {
                return this._nativeObj.getInheritedDcOptimize();
            }
            return this._dcOptimize || ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.dcOptimize);
        }
        set zIndex(value) {
            this._zIndex = value;
            this._nativeObj.zIndex = value;
        }
        get zIndex() {
            return this._zIndex;
        }
        set stackingRoot(value) {
            this._stackingRoot = value;
            this._nativeObj.stackingRoot = value;
        }
        get stackingRoot() {
            return this._stackingRoot;
        }
        get enableCulling() {
            return this._nativeObj.getEnableCulling();
        }
        set enableCulling(value) {
            this._nativeObj.setEnableCulling(value);
        }
        get inheritedEnableCulling() {
            return this._nativeObj.getInheritedEnableCulling();
        }
        set rect(value) {
            value.cloneTo(this._rect);
            this._nativeObj.rect = value;
        }
        get rect() {
            return this._rect;
        }
        set renderLayer(value) {
            this._renderLayer = value;
            this._nativeObj.renderLayer = value;
        }
        get renderLayer() {
            return this._renderLayer;
        }
        get subStruct() {
            return this._subStruct;
        }
        set subStruct(value) {
            if (value) {
                value._parent = this._parent;
                value._blendMode = this._blendMode;
            }
            this._subStruct = value;
            this._nativeObj.setSubStruct(value ? value._nativeObj : null);
        }
        set parent(value) {
            this._parent = value;
            if (this._subStruct) {
                this._subStruct._parent = value;
            }
            this._nativeObj.setParent(value ? value._nativeObj : null);
        }
        get parent() {
            return this._parent;
        }
        get children() {
            return this._children;
        }
        set children(value) {
            this._children = value;
            let nativeArray = [];
            for (var i = 0; i < value.length; i++) {
                nativeArray.push(value[i]._nativeObj);
            }
            this._nativeObj.setChildren(nativeArray);
        }
        set renderType(value) {
            this._renderType = value;
            this._nativeObj.renderType = value;
        }
        get renderType() {
            return this._renderType;
        }
        set renderUpdateMask(value) {
            this._renderUpdateMask = value;
            this._nativeObj.renderUpdateMask = value;
        }
        get renderUpdateMask() {
            return this._renderUpdateMask;
        }
        set renderMatrix(value) {
            value.cloneTo(this._renderMatrix);
            this._nativeObj.setRenderMatrix(value, Laya.Stat.loopCount);
        }
        get renderMatrix() {
            return this._renderMatrix;
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(value) {
            this._alpha = value;
            this._nativeObj.alpha = value;
        }
        get blendMode() {
            var _a;
            if (this._subStruct && this._subStruct.enabled) {
                return Laya.BlendMode.normal;
            }
            return this._blendMode || ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.blendMode) || Laya.BlendMode.normal;
        }
        set blendMode(value) {
            if (this._subStruct && this._subStruct.enabled) {
                this._subStruct._blendMode = value;
            }
            this._blendMode = value;
            this._nativeObj.blendMode = this._blendMode;
        }
        get enabled() {
            return this._enabled;
        }
        set enabled(value) {
            this._enabled = value;
            this._nativeObj.enable = value;
        }
        get isRenderStruct() {
            return this._isRenderStruct;
        }
        set isRenderStruct(value) {
            this._isRenderStruct = value;
            this._nativeObj.isRenderStruct = value;
        }
        set renderElements(value) {
            this._renderElements = value;
            let nativeArray = [];
            for (let i = 0; i < value.length; i++) {
                nativeArray.push(value[i]._nativeObj);
            }
            this._nativeObj.setRenderElements(nativeArray);
        }
        get renderElements() {
            return this._renderElements;
        }
        set spriteShaderData(value) {
            this._spriteShaderData = value;
            this._nativeObj.setSpriteShaderData(value ? value._nativeObj : null);
        }
        get spriteShaderData() {
            return this._spriteShaderData;
        }
        get renderDataHandler() {
            return this._renderDataHandler;
        }
        set renderDataHandler(value) {
            this._renderDataHandler = value;
            this._nativeObj.setRenderDataHandler(value ? value._nativeObj : null);
            if (value)
                this._renderDataHandler.owner = this;
        }
        set globalRenderData(value) {
            this._globalRenderData = value;
            this._nativeObj.setGlobalRenderData(value ? value._nativeObj : null);
        }
        get globalRenderData() {
            return this._globalRenderData;
        }
        get pass() {
            var _a;
            return this._pass || ((_a = this._parent) === null || _a === void 0 ? void 0 : _a.pass);
        }
        set pass(value) {
            this._pass = value;
            this._nativeObj.setPass(value ? value._nativeObj : null);
        }
        constructor() {
            this._manualRender = false;
            this._clipRect = new Laya.Rectangle(0, 0, 0, 0);
            this._dcOptimize = false;
            this._zIndex = 0;
            this._stackingRoot = false;
            this._rect = new Laya.Rectangle(0, 0, 0, 0);
            this._renderLayer = 1;
            this._parent = null;
            this._children = [];
            this._renderType = -1;
            this._renderMatrix = new Laya.Matrix();
            this._enabled = true;
            this._renderElements = [];
            this._spriteShaderData = null;
            this._nativeObj = new window.conchRTRenderStruct2D();
            this.zIndex = 0;
            this.rect = new Laya.Rectangle(0, 0, 0, 0);
            this.renderLayer = 1;
            this.renderType = -1;
            this.renderUpdateMask = 0;
            this.alpha = 1.0;
            this.blendMode = Laya.BlendMode.invalid;
            this.enabled = true;
            this.isRenderStruct = false;
        }
        setRenderUpdateCallback(func) {
            if (func)
                this._nativeObj.setRenderUpdate(func);
            else
                this._nativeObj.setRenderUpdate(null);
        }
        setClipRect(rect) {
            if (rect) {
                rect.cloneTo(this._clipRect);
                this._clipRect.width = Math.max(this._clipRect.width, 0.0001);
                this._clipRect.height = Math.max(this._clipRect.height, 0.0001);
                this._nativeObj.setClipRect(this._clipRect);
            }
            else {
                this._nativeObj.setClipRect(null);
            }
        }
        setRepaint() {
            this._nativeObj.setRepaint();
        }
        addChild(child, index) {
            child.parent = this;
            this._children.splice(index, 0, child);
            this._nativeObj.addChild(child._nativeObj, index);
            return;
        }
        updateChildIndex(child, oldIndex, index) {
            if (oldIndex === index)
                return;
            this.children.splice(oldIndex, 1);
            if (index >= this.children.length) {
                this.children.push(child);
            }
            else {
                this.children.splice(index, 0, child);
            }
            this._nativeObj.updateChildIndex(child._nativeObj, oldIndex, index);
        }
        removeChild(child) {
            const index = this.children.indexOf(child);
            if (index !== -1) {
                child.parent = null;
                this.children.splice(index, 1);
                this._nativeObj.removeChild(child._nativeObj);
            }
        }
        destroy() {
            this._nativeObj.destroy();
            this._renderElements.length = 0;
            this._renderElements = null;
            this._spriteShaderData = null;
            this._parent = null;
            this._children.length = 0;
            this._children = null;
            this._pass = null;
        }
    }

    class CommonMemoryAllocater {
        static creatBlock(size) {
            const buffer = new ArrayBuffer(size);
            return buffer;
        }
        static freeMemoryBlock(buffer) {
        }
    }

    class NativeMemory {
        constructor(size, shared) {
            if (shared) {
                if (size > NativeMemory._sharedBuffer.byteLength) {
                    throw new Error("NativeMemory:shared buffer not enough");
                }
                this._buffer = NativeMemory._sharedBuffer;
            }
            else {
                this._buffer = CommonMemoryAllocater.creatBlock(size);
            }
            this._byteLength = size;
        }
        get float32Array() {
            if (!this._fdata) {
                this._fdata = new Float32Array(this._buffer);
            }
            return this._fdata;
        }
        get uint8Array() {
            if (!this._byteArray) {
                this._byteArray = new Uint8Array(this._buffer);
            }
            return this._byteArray;
        }
        get int32Array() {
            if (!this._idata) {
                this._idata = new Int32Array(this._buffer);
            }
            return this._idata;
        }
        get Uint32Array() {
            if (!this._uidata) {
                this._uidata = new Uint32Array(this._buffer);
            }
            return this._uidata;
        }
        get Uint16Array() {
            if (!this._uint16data) {
                this._uint16data = new Uint16Array(this._buffer);
            }
            return this._uint16data;
        }
        destroy() {
            if (this._destroyed)
                return;
            this.clear();
            CommonMemoryAllocater.freeMemoryBlock(this._buffer);
            this._destroyed = true;
        }
        clear() {
            this._idata = null;
            this._fdata = null;
            this._uidata = null;
            this._uint16data = null;
            this._byteArray = null;
        }
    }
    NativeMemory.NativeSourceID = 0;
    NativeMemory._sharedBuffer = new ArrayBuffer(256);

    class RT2DGraphicVertexBuffer {
        get buffer() {
            return this._buffer;
        }
        set buffer(value) {
            this._buffer = value;
            this._nativeObj.setVertexBuffer(value ? value._nativeObj : null);
        }
        constructor() {
            this._views = new Set();
            this._nativeObj = new window.conchRT2DGraphicVertexBuffer();
        }
        _setData(data, view) {
            this._nativeMemory.float32Array.set(data, view.start);
        }
        _addDataView(dataView) {
            this._views.add(dataView);
        }
        removeDataView(dataView) {
            this._views.delete(dataView);
            this._nativeObj.removeDataView(dataView ? dataView._nativeObj : null);
        }
        destroy() {
            this._views.clear();
            this._nativeObj.destroy();
            this._nativeMemory.destroy();
        }
        resetData(byteLength) {
            if (!this._nativeMemory) {
                this._nativeMemory = new NativeMemory(byteLength, false);
                this._nativeObj.resetData(this._nativeMemory._buffer);
            }
            else if (this._nativeMemory._buffer.byteLength != byteLength) {
                let oldMemory = this._nativeMemory;
                this._nativeMemory = new NativeMemory(byteLength, false);
                this._nativeObj.resetData(this._nativeMemory._buffer);
                oldMemory && oldMemory.destroy();
            }
        }
    }
    class RT2DGraphicIndexBuffer {
        get buffer() {
            return this._buffer;
        }
        set buffer(value) {
            this._buffer = value;
            this._nativeObj.setIndexBuffer(value ? value._nativeObj : null);
        }
        constructor() {
            this._views = new Set();
            this._nativeObj = new window.conchRT2DGraphicIndexBuffer();
        }
        resetData(byteLength) {
            this._nativeObj.resetData(byteLength);
        }
        addDataView(dataView) {
            this._views.add(dataView);
            this._nativeObj.addDataView(dataView ? dataView._nativeObj : null);
        }
        removeDataView(dataView) {
            if (this._views.has(dataView)) {
                this._views.delete(dataView);
                dataView._owner = null;
            }
            this._nativeObj.removeDataView(dataView ? dataView._nativeObj : null);
        }
        destroy() {
            this._views.clear();
            this._nativeObj.destroy();
        }
    }
    class RT2DGraphic2DVertexDataView {
        get start() {
            return this._start;
        }
        get length() {
            return this._length;
        }
        get stride() {
            return this._stride;
        }
        constructor(owner, start, length, stride) {
            this._owner = owner;
            this._start = start;
            this._length = length;
            this._stride = stride;
            this._nativeObj = new window.conchRT2DGraphic2DVertexDataView(owner ? owner._nativeObj : null, start, length, stride);
            this._owner && this._owner._addDataView(this);
        }
        setData(data) {
            this._owner._setData(data, this);
            this._nativeObj.modify();
        }
    }
    class RT2DGraphic2DIndexDataView {
        get length() {
            return this._length;
        }
        constructor(owner, length) {
            this._owner = owner;
            this._length = length;
            this._nativeObj = new window.conchRT2DGraphic2DIndexDataView(owner ? owner._nativeObj : null, length);
            this._memoryData = new NativeMemory(this.length * 2, false);
            this._nativeObj.setIndexShareMemory(this._memoryData._buffer);
        }
        setData(data) {
            this._memoryData.Uint16Array.set(data);
            this._nativeObj.modify();
        }
        setGeometry(value) {
            this._geometry = value;
            this._nativeObj.setGeometry(value ? value._nativeObj : null);
        }
        destroy() {
            this._memoryData.destroy();
        }
    }

    class LayaXRenderContext2D {
        constructor() {
            this._offscreenX = 0;
            this._offscreenY = 0;
            this._offscreenWidth = 0;
            this._offscreenHeight = 0;
            this._nativeObj = new window.conchLayaXRenderContext2D();
            this._nativeObj.setGlobalConfigShaderData(Laya.Shader3D._configDefineValues._nativeObj);
            this._nativeObj.pipelineMode = "Forward";
        }
        get invertY() { return this._nativeObj.invertY; }
        set invertY(value) { this._nativeObj.invertY = value; }
        get pipelineMode() { return this._nativeObj.pipelineMode; }
        set pipelineMode(value) { this._nativeObj.pipelineMode = value; }
        get passData() { return this._passData; }
        set passData(value) {
            this._passData = value;
            this._nativeObj.passData = value ? value._nativeObj : null;
        }
        setRenderTarget(value, clear, clearColor) {
            this._dist = value;
            this._nativeObj.setRenderTarget(value ? value._nativeObj : null, clear, clearColor);
        }
        getRenderTarget() {
            return this._dist;
        }
        setOffscreenView(width, height, x = 0, y = 0) {
            this._offscreenWidth = width;
            this._offscreenHeight = height;
            this._offscreenX = x;
            this._offscreenY = y;
            this._nativeObj.setOffscreenView(width, height, x, y);
        }
        getOffscreenView(out) {
            out.setValue(this._offscreenX, this._offscreenY, this._offscreenWidth, this._offscreenHeight);
        }
        drawRenderElementOne(node) {
        }
        drawRenderElementList(list) {
            return list.length;
        }
        runOneCMD(cmd) {
            if (cmd) {
                this._nativeObj.runOneCMD(cmd._nativeObj);
            }
        }
        runCMDList(cmds) {
            if (!cmds || cmds.length === 0)
                return;
            let nativeobCMDs = [];
            for (let i = 0, n = cmds.length; i < n; i++) {
                nativeobCMDs.push(cmds[i]._nativeObj);
            }
            this._nativeObj.runCMDList(nativeobCMDs);
        }
    }

    class LayaXSetRenderData extends Laya.SetRenderDataCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeData;
            this._nativeObj = new window.conchLayaXSetRenderDataCMD();
        }
        get dataType() {
            return this._dataType;
        }
        set dataType(value) {
            this._dataType = value;
            this._nativeObj.setDataType(value);
        }
        get propertyID() {
            return this._propertyID;
        }
        set propertyID(value) {
            this._propertyID = value;
            this._nativeObj.setPropertyID(value);
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
            this._nativeObj.setDest(value ? value._nativeObj : null);
        }
        get value() {
            return this._value;
        }
        set value(value) {
            switch (this.dataType) {
                case Laya.ShaderDataType.Int:
                    this.data_number = value;
                    this._value = this.data_number;
                    this._nativeObj.setInt(this._value);
                    break;
                case Laya.ShaderDataType.Float:
                    this.data_number = value;
                    this._value = this.data_number;
                    this._nativeObj.setFloat(this._value);
                    break;
                case Laya.ShaderDataType.Bool:
                    this.data_number = value;
                    this._value = this.data_number;
                    this._nativeObj.setBool(this._value);
                    break;
                case Laya.ShaderDataType.Matrix4x4:
                    !this.data_mat && (this.data_mat = new Laya.Matrix4x4());
                    value.cloneTo(this.data_mat);
                    this._value = this.data_mat;
                    this._nativeObj.setMatrix4x4(this._value);
                    break;
                case Laya.ShaderDataType.Color:
                    !this.data_Color && (this.data_Color = new Laya.Color());
                    value.cloneTo(this.data_Color);
                    this._value = this.data_Color;
                    this._nativeObj.setColor(this._value);
                    break;
                case Laya.ShaderDataType.Texture2D:
                    this._value = this.data_texture = value;
                    this._nativeObj.setTexture2D(this.data_texture._texture._nativeObj);
                    break;
                case Laya.ShaderDataType.Vector4:
                    !this.data_v4 && (this.data_v4 = new Laya.Vector4());
                    value.cloneTo(this.data_v4);
                    this._value = this.data_v4;
                    this._nativeObj.setVector(this._value);
                    break;
                case Laya.ShaderDataType.Vector2:
                    !this.data_v2 && (this.data_v2 = new Laya.Vector2());
                    value.cloneTo(this.data_v2);
                    this._value = this.data_v2;
                    this._nativeObj.setVector2(this._value);
                    break;
                case Laya.ShaderDataType.Vector3:
                    !this.data_v3 && (this.data_v3 = new Laya.Vector3());
                    value.cloneTo(this.data_v3);
                    this._value = this.data_v3;
                    this._nativeObj.setVector3(this._value);
                    break;
                case Laya.ShaderDataType.Buffer:
                    this._value = this.data_Buffer = value;
                    this._nativeObj.setBufferValue(this.data_Buffer.buffer, this.data_Buffer.byteLength);
                    break;
            }
        }
        apply(_context) {
            this._nativeObj.execute();
        }
    }
    class LayaXSetShaderDefine extends Laya.SetShaderDefineCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeShaderDefine;
            this._nativeObj = new window.conchLayaXSetShaderDefineCMD();
        }
        get define() {
            return this._define;
        }
        set define(value) {
            this._define = value;
            this._nativeObj.setDefine(value);
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
            this._nativeObj.setDest(value ? value._nativeObj : null);
        }
        get add() {
            return this._add;
        }
        set add(value) {
            this._add = value;
            this._nativeObj.setAdd(value);
        }
        apply(_context) {
            this._nativeObj.execute();
        }
    }

    class LayaXRTRender2DPass extends RTRender2DPass {
        constructor() {
            super(true);
            this._nativeObj = new window.conchLayaXRender2DPass(this._shaderData._nativeObj);
            this.enable = true;
            this.enableBatch = true;
            this.isSupport = false;
            this.doClearColor = true;
            this.repaint = true;
            this.priority = 0;
            this.offsetMatrix = new Laya.Matrix();
        }
    }
    class LayaXRender2DProcess {
        createRenderElement2D() {
            return new LayaXRenderElement2D();
        }
        createPrimitiveRenderElement2D() {
            return new LayaXPrimitiveRenderElement2D();
        }
        createRenderContext2D() {
            return new LayaXRenderContext2D();
        }
        createBlit2DQuadCMDData() {
            return new LayaXBlit2DQuadCMD();
        }
        createDraw2DElementCMDData() {
            return new LayaXDraw2DElementCMD();
        }
        createSetRendertarget2DCMD() {
            return new LayaXSetRendertarget2DCMD();
        }
        createSetRenderDataCMD() {
            return new LayaXSetRenderData();
        }
        createSetShaderDefineCMD() {
            return new LayaXSetShaderDefine();
        }
        createRender2DPass() {
            return new LayaXRTRender2DPass();
        }
        createRenderStruct2D() {
            return new RTRenderStruct2D();
        }
        createRender2DPassManager() {
            return new RTRender2DPassManager();
        }
        create2DGlobalRenderDataHandle() {
            return new RTGlobalRenderData();
        }
        create2D2DPrimitiveDataHandle() {
            return new RTPrimitiveDataHandle();
        }
        create2DBaseRenderDataHandle() {
            return new RTBaseRenderDataHandle();
        }
        createMesh2DRenderDataHandle() {
            return new RTMesh2DRenderDataHandle();
        }
        createSpineRenderDataHandle() {
            return new RTSpineRenderDataHandle();
        }
        create2DGraphicVertexDataView(wholeBuffer, elementOffset, elementSize, stride) {
            return new RT2DGraphic2DVertexDataView(wholeBuffer, elementOffset, elementSize, stride);
        }
        create2DGraphicIndexDataView(wholeBuffer, elementSize) {
            return new RT2DGraphic2DIndexDataView(wholeBuffer, elementSize);
        }
        create2DGraphicVertexBuffer() {
            return new RT2DGraphicVertexBuffer();
        }
        create2DGraphicIndexBuffer() {
            return new RT2DGraphicIndexBuffer();
        }
        createGraphic2DBufferBlock() {
            return new RTGraphics2DBufferBlock();
        }
        createGraphic2DVertexBlock() {
            return new RTGraphics2DVertexBlock();
        }
        createEmptyRenderDataHandle() {
            return new RTEmptyRender2DDataHandle();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (window.conchLayaXRenderElement2D) {
            Laya.LayaGL.render2DRenderPassFactory = new LayaXRender2DProcess();
        }
    });

    exports.LayaXBindingInfoType = void 0;
    (function (LayaXBindingInfoType) {
        LayaXBindingInfoType[LayaXBindingInfoType["buffer"] = 0] = "buffer";
        LayaXBindingInfoType[LayaXBindingInfoType["texture"] = 1] = "texture";
        LayaXBindingInfoType[LayaXBindingInfoType["sampler"] = 2] = "sampler";
        LayaXBindingInfoType[LayaXBindingInfoType["storageBuffer"] = 3] = "storageBuffer";
        LayaXBindingInfoType[LayaXBindingInfoType["storageTexture"] = 4] = "storageTexture";
    })(exports.LayaXBindingInfoType || (exports.LayaXBindingInfoType = {}));
    class LayaXBindGroupHelper {
        static _getCacheKey(groupID, mapNames) {
            return `${groupID}_` + mapNames.join("_");
        }
        static _cloneBindingInfoArray(bindings) {
            return bindings.map(binding => (Object.assign(Object.assign({}, binding), { texture: binding.texture ? Object.assign({}, binding.texture) : undefined, sampler: binding.sampler ? Object.assign({}, binding.sampler) : undefined, buffer: binding.buffer ? Object.assign({}, binding.buffer) : undefined, storageTexture: binding.storageTexture ? Object.assign({}, binding.storageTexture) : undefined })));
        }
        static _getTextureViewDimension(uniformType) {
            switch (uniformType) {
                case Laya.ShaderDataType.Texture2D: return "2d";
                case Laya.ShaderDataType.Texture3D: return "3d";
                case Laya.ShaderDataType.TextureCube: return "cube";
                case Laya.ShaderDataType.Texture2DArray: return "2d-array";
                default: return "2d";
            }
        }
        static createBindingInfoArray(groupID, mapNames) {
            const cacheKey = this._getCacheKey(groupID, mapNames);
            const cached = this._cache.get(cacheKey);
            if (cached)
                return this._cloneBindingInfoArray(cached);
            let bindings = [];
            let bindingIndex = 0;
            for (let i = 0; i < mapNames.length; i++) {
                const commandName = mapNames[i];
                const propertyId = Laya.Shader3D.propertyNameToID(commandName);
                const uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(commandName);
                if (uniformMap._hasUniformBuffer) {
                    let info = {
                        id: 0,
                        name: commandName,
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propertyId,
                        sourceMapId: propertyId,
                        type: exports.LayaXBindingInfoType.buffer,
                        bindingType: "uniform",
                        dataType: 0,
                        buffer: { type: "uniform" },
                    };
                    if (commandName == "SkinSprite3D") {
                        info.buffer.hasDynamicOffset = true;
                    }
                    bindings.push(info);
                }
                if (uniformMap && uniformMap._idata) {
                    for (let [propID, prop] of uniformMap._idata) {
                        if (prop.uniformtype >= Laya.ShaderDataType.Texture2D) {
                            let viewDim = this._getTextureViewDimension(prop.uniformtype);
                            bindings.push({
                                id: 0,
                                name: prop.propertyName + "_Texture",
                                set: groupID,
                                binding: bindingIndex++,
                                propertyId: propID,
                                sourceMapId: propertyId,
                                type: exports.LayaXBindingInfoType.texture,
                                bindingType: "texture",
                                dataType: prop.uniformtype,
                                texture: {
                                    sampleType: "float",
                                    viewDimension: viewDim,
                                    multisampled: false,
                                },
                            });
                            bindings.push({
                                id: 0,
                                name: prop.propertyName + "_Sampler",
                                set: groupID,
                                binding: bindingIndex++,
                                propertyId: propID,
                                sourceMapId: propertyId,
                                type: exports.LayaXBindingInfoType.sampler,
                                bindingType: "sampler",
                                dataType: prop.uniformtype,
                                sampler: { type: "filtering" },
                                texture: {
                                    sampleType: "float",
                                    viewDimension: viewDim,
                                    multisampled: false,
                                },
                            });
                        }
                        if (prop.uniformtype == Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                            bindings.push({
                                id: 0,
                                name: prop.propertyName,
                                set: groupID,
                                binding: bindingIndex++,
                                propertyId: propID,
                                sourceMapId: propertyId,
                                type: exports.LayaXBindingInfoType.storageBuffer,
                                bindingType: "storageBufferReadOnly",
                                dataType: prop.uniformtype,
                                buffer: { type: "read-only-storage" },
                            });
                        }
                        if (prop.uniformtype == Laya.ShaderDataType.DeviceBuffer) {
                            bindings.push({
                                id: 0,
                                name: prop.propertyName,
                                set: groupID,
                                binding: bindingIndex++,
                                propertyId: propID,
                                sourceMapId: propertyId,
                                type: exports.LayaXBindingInfoType.storageBuffer,
                                bindingType: "storageBuffer",
                                dataType: prop.uniformtype,
                                buffer: { type: "storage" },
                            });
                        }
                        if (prop.uniformtype == Laya.ShaderDataType.StorageTexture2D) {
                            bindings.push({
                                id: 0,
                                name: prop.propertyName,
                                set: groupID,
                                binding: bindingIndex++,
                                propertyId: propID,
                                sourceMapId: propertyId,
                                type: exports.LayaXBindingInfoType.storageTexture,
                                bindingType: "storageTexture",
                                dataType: prop.uniformtype,
                                format: prop.format,
                                storageTexture: {
                                    access: prop.access || "write-only",
                                    format: prop.format || "rgba8unorm",
                                    viewDimension: "2d",
                                },
                            });
                        }
                    }
                }
            }
            this._cache.set(cacheKey, bindings);
            return this._cloneBindingInfoArray(bindings);
        }
        static createBindingInfosByUniformMap(groupID, name, cacheName, uniformMap) {
            const cacheKey = this._getCacheKey(groupID, [cacheName]);
            const cached = this._cache.get(cacheKey);
            if (cached)
                return this._cloneBindingInfoArray(cached);
            let bindings = [];
            let bindingIndex = 0;
            const propertyId = Laya.Shader3D.propertyNameToID(name);
            let hasBuffer = false;
            for (let [propID, prop] of uniformMap) {
                if (prop.uniformtype < Laya.ShaderDataType.Texture2D
                    && prop.uniformtype != Laya.ShaderDataType.DeviceBuffer
                    && prop.uniformtype != Laya.ShaderDataType.ReadOnlyDeviceBuffer
                    && prop.uniformtype != Laya.ShaderDataType.StorageTexture2D) {
                    hasBuffer = true;
                    break;
                }
            }
            if (hasBuffer) {
                bindings.push({
                    id: 0,
                    name: name,
                    set: groupID,
                    binding: bindingIndex++,
                    propertyId: propertyId,
                    sourceMapId: propertyId,
                    type: exports.LayaXBindingInfoType.buffer,
                    bindingType: "uniform",
                    dataType: 0,
                    buffer: { type: "uniform" },
                });
            }
            for (let [propID, prop] of uniformMap) {
                if (prop.uniformtype >= Laya.ShaderDataType.Texture2D) {
                    let viewDim = this._getTextureViewDimension(prop.uniformtype);
                    bindings.push({
                        id: 0,
                        name: prop.propertyName + "_Texture",
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propID,
                        sourceMapId: propertyId,
                        type: exports.LayaXBindingInfoType.texture,
                        bindingType: "texture",
                        dataType: prop.uniformtype,
                        texture: {
                            sampleType: "float",
                            viewDimension: viewDim,
                            multisampled: false,
                        },
                    });
                    bindings.push({
                        id: 0,
                        name: prop.propertyName + "_Sampler",
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propID,
                        sourceMapId: propertyId,
                        type: exports.LayaXBindingInfoType.sampler,
                        bindingType: "sampler",
                        dataType: prop.uniformtype,
                        sampler: { type: "filtering" },
                        texture: {
                            sampleType: "float",
                            viewDimension: viewDim,
                            multisampled: false,
                        },
                    });
                }
                if (prop.uniformtype == Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                    bindings.push({
                        id: 0,
                        name: prop.propertyName,
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propID,
                        sourceMapId: propertyId,
                        type: exports.LayaXBindingInfoType.storageBuffer,
                        bindingType: "storageBufferReadOnly",
                        dataType: prop.uniformtype,
                        buffer: { type: "read-only-storage" },
                    });
                }
                if (prop.uniformtype == Laya.ShaderDataType.DeviceBuffer) {
                    bindings.push({
                        id: 0,
                        name: prop.propertyName,
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propID,
                        sourceMapId: propertyId,
                        type: exports.LayaXBindingInfoType.storageBuffer,
                        bindingType: "storageBuffer",
                        dataType: prop.uniformtype,
                        buffer: { type: "storage" },
                    });
                }
                if (prop.uniformtype == Laya.ShaderDataType.StorageTexture2D) {
                    bindings.push({
                        id: 0,
                        name: prop.propertyName,
                        set: groupID,
                        binding: bindingIndex++,
                        propertyId: propID,
                        sourceMapId: propertyId,
                        type: exports.LayaXBindingInfoType.storageTexture,
                        bindingType: "storageTexture",
                        dataType: prop.uniformtype,
                        format: prop.format,
                        storageTexture: {
                            access: prop.access || "write-only",
                            format: prop.format || "rgba8unorm",
                            viewDimension: "2d",
                        },
                    });
                }
            }
            this._cache.set(cacheKey, bindings);
            return this._cloneBindingInfoArray(bindings);
        }
        static computeTextureExits(setIndex, mapNames, bindings) {
            let bitOffset = 0;
            let textureExits = 0;
            for (const name of mapNames) {
                let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
                for (const binding of bindings) {
                    let propertyID = binding.propertyId;
                    if (map.hasPtrID(propertyID)) {
                        if (binding.type === exports.LayaXBindingInfoType.sampler) {
                            let textureBitIndex = map._textureBits.get(propertyID);
                            if (textureBitIndex !== undefined) {
                                let textureBit = textureBitIndex + bitOffset;
                                textureExits |= (1 << textureBit);
                            }
                        }
                    }
                }
                bitOffset += map._textureCount;
            }
            return textureExits;
        }
    }
    LayaXBindGroupHelper._cache = new Map();

    class LayaXBufferState {
        constructor() {
            this._attriLocArray = new Set();
            this._nativeObj = new window.conchLayaXBufferState();
        }
        applyState(vertexBuffers, indexBuffer) {
            this._vertexBuffers = vertexBuffers;
            this._bindedIndexBuffer = indexBuffer;
            this._attriLocArray.clear();
            let tempVertexBuffers = [];
            vertexBuffers.forEach((element) => {
                tempVertexBuffers.push(element._nativeObj);
                let vb = element;
                if (vb.vertexDeclaration && vb.vertexDeclaration._VAElements) {
                    let attriArray = vb.vertexDeclaration._VAElements;
                    for (let j = 0; j < attriArray.length; j++) {
                        this._attriLocArray.add(attriArray[j].shaderLocation);
                    }
                }
            });
            this._nativeObj.applyState(tempVertexBuffers, indexBuffer ? indexBuffer._nativeObj : null);
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class LayaXCommandUniformMap extends Laya.CommandUniformMap {
        constructor(stateName) {
            super(stateName);
            this._idata = new Map();
            this._hasUniformBuffer = false;
            this._textureBits = new Map();
            this._textureCount = 0;
            this._stateName = stateName;
            this._stateID = Laya.Shader3D.propertyNameToID(stateName);
            this._nativeObj = new window.conchLayaXCommandUniformMap.create(stateName);
        }
        hasPtrID(propertyID) {
            return this._stateID == propertyID || this._idata.has(propertyID);
        }
        addShaderUniform(propertyID, propertyKey, uniformtype, options) {
            this._nativeObj.addShaderUniform(propertyID, propertyKey, uniformtype);
            let uniform = { id: propertyID, uniformtype: uniformtype, propertyName: propertyKey, arrayLength: 0, format: options === null || options === void 0 ? void 0 : options.format, access: options === null || options === void 0 ? void 0 : options.access };
            this._idata.set(propertyID, uniform);
            if (uniformtype < Laya.ShaderDataType.Texture2D
                && uniformtype != Laya.ShaderDataType.DeviceBuffer
                && uniformtype != Laya.ShaderDataType.ReadOnlyDeviceBuffer
                && uniformtype != Laya.ShaderDataType.StorageTexture2D) {
                this._hasUniformBuffer = true;
            }
            if (uniformtype >= Laya.ShaderDataType.Texture2D) {
                this._textureBits.set(propertyID, this._textureCount);
                this._textureCount++;
            }
        }
        addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength) {
            this._nativeObj.addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength);
            this._idata.set(propertyID, { id: propertyID, uniformtype: uniformtype, propertyName: propertyName, arrayLength: arrayLength });
            if (uniformtype < Laya.ShaderDataType.Texture2D
                && uniformtype != Laya.ShaderDataType.DeviceBuffer
                && uniformtype != Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                this._hasUniformBuffer = true;
            }
        }
        setDefaultTextureData(key, defaultTex) {
            let rtNative = null;
            if (defaultTex) {
                let rt = defaultTex._renderTarget;
                if (rt)
                    rtNative = rt._nativeObj;
            }
            this._nativeObj.setDefaultTextureData(key, rtNative);
        }
    }

    class LayaXReadbackDispatcher {
        static register(id, resolve, reject) {
            this._pending.set(id, { resolve, reject });
        }
        static pump(device) {
            if (!device || !device.pollDeviceEvent)
                return;
            while (device.pollDeviceEvent()) {
                const ty = device.lastEventType();
                const id = device.lastEventReadbackId();
                if (ty === 4 || ty === 5) {
                    const entry = this._pending.get(id);
                    if (!entry)
                        continue;
                    this._pending.delete(id);
                    if (ty === 4)
                        entry.resolve();
                    else
                        entry.reject(new Error("LayaX: GPU readback failed (id=" + id + ")"));
                }
                else if (ty === 0) {
                    this._rejectAll(new Error("LayaX: device lost"));
                }
            }
        }
        static _rejectAll(err) {
            for (const entry of this._pending.values()) {
                try {
                    entry.reject(err);
                }
                catch (_a) { }
            }
            this._pending.clear();
        }
    }
    LayaXReadbackDispatcher._pending = new Map();

    class LayaXVertexBuffer {
        constructor(bufferUsageType) {
            this._bufferRef = null;
            this._nativeObj = new window.conchLayaXVertexBuffer(bufferUsageType);
        }
        get vertexDeclaration() {
            return this._vertexDeclaration;
        }
        set vertexDeclaration(value) {
            this._vertexDeclaration = value;
            this._shaderValues = this._vertexDeclaration._shaderValues;
            this._nativeObj.clearVertexDeclaration();
            for (var k in this._shaderValues) {
                this._nativeObj.setVertexDeclaration(parseInt(k), this._shaderValues[k]);
            }
        }
        get instanceBuffer() {
            return this._nativeObj._instanceBuffer;
        }
        set instanceBuffer(value) {
            this._nativeObj.setInstanceBuffer(value);
        }
        getStorageBuffer() {
            throw new Error("Method not implemented.");
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            this._bufferRef = buffer;
            this._nativeObj.setData(buffer, bufferOffset, dataStartIndex, dataCount);
        }
        setDataLength(byteLength) {
            this._nativeObj.setDataLength(byteLength);
        }
        destroy() {
            this._nativeObj.destroy();
            this._bufferRef = null;
        }
    }

    class LayaXDeviceBuffer {
        constructor(usage) {
            this._size = 0;
            this._destroyed = false;
            this._usage = usage;
            this._nativeObj = new window.conchLayaXDeviceBuffer(LayaXDeviceBuffer._convertUsage(usage), LayaXDeviceBuffer._convertHeapType(usage));
        }
        static _convertUsage(usage) {
            let r = 0;
            if (usage & Laya.EDeviceBufferUsage.VERTEX)
                r |= 1 << 0;
            if (usage & Laya.EDeviceBufferUsage.STORAGE)
                r |= 1 << 3;
            if (usage & Laya.EDeviceBufferUsage.INDIRECT)
                r |= 1 << 4;
            if (usage & Laya.EDeviceBufferUsage.COPY_SRC)
                r |= 1 << 5;
            if (usage & Laya.EDeviceBufferUsage.COPY_DST)
                r |= 1 << 6;
            return r;
        }
        static _convertHeapType(usage) {
            if (usage & Laya.EDeviceBufferUsage.MAP_READ)
                return 2;
            if (usage & Laya.EDeviceBufferUsage.MAP_WRITE)
                return 1;
            return 0;
        }
        getNativeBuffer() {
            return this._nativeObj;
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            this._nativeObj.setData(buffer, bufferOffset, dataStartIndex, dataCount);
            const required = bufferOffset + dataCount;
            if (required > this._size)
                this._size = required;
        }
        setDataLength(byteLength) {
            if (byteLength !== this._size) {
                this._size = byteLength;
                this._nativeObj.setDataLength(byteLength);
            }
        }
        copyToBuffer(buffer, sourceOffset, destOffset, byteLength) {
            if (buffer instanceof LayaXVertexBuffer) {
                this._nativeObj.copyToVertexBuffer(buffer._nativeObj, sourceOffset, destOffset, byteLength);
            }
            else if (buffer instanceof LayaXDeviceBuffer) {
                this._nativeObj.copyToDeviceBuffer(buffer._nativeObj, sourceOffset, destOffset, byteLength);
            }
            else {
                throw new Error("LayaXDeviceBuffer.copyToBuffer() invalid buffer type");
            }
        }
        copyToTexture() {
        }
        readData(dest, destOffset, srcOffset, byteLength) {
            return new Promise((resolve, reject) => {
                if (this._destroyed) {
                    reject(new Error("LayaXDeviceBuffer.readData: buffer destroyed"));
                    return;
                }
                if (!dest) {
                    reject(new Error("LayaXDeviceBuffer.readData: dest is null"));
                    return;
                }
                if (!Number.isFinite(byteLength) || byteLength <= 0) {
                    reject(new Error("LayaXDeviceBuffer.readData: byteLength must be > 0"));
                    return;
                }
                if (!Number.isFinite(destOffset) || destOffset < 0 ||
                    !Number.isFinite(srcOffset) || srcOffset < 0) {
                    reject(new Error("LayaXDeviceBuffer.readData: offsets must be >= 0"));
                    return;
                }
                if (destOffset + byteLength > dest.byteLength) {
                    reject(new Error("LayaXDeviceBuffer.readData: destOffset + byteLength (" +
                        (destOffset + byteLength) + ") exceeds dest.byteLength (" +
                        dest.byteLength + ")"));
                    return;
                }
                if (this._size > 0 && srcOffset + byteLength > this._size) {
                    reject(new Error("LayaXDeviceBuffer.readData: srcOffset + byteLength (" +
                        (srcOffset + byteLength) + ") exceeds buffer size (" +
                        this._size + ")"));
                    return;
                }
                const id = this._nativeObj.readData(dest, destOffset, srcOffset, byteLength);
                if (!id || id <= 0) {
                    reject(new Error("LayaXDeviceBuffer.readData: submit failed"));
                    return;
                }
                LayaXReadbackDispatcher.register(id, () => { resolve(); }, (e) => { reject(e); });
            });
        }
        destroy() {
            if (this._destroyed)
                return;
            if (this._nativeObj)
                this._nativeObj.destroy();
            this._destroyed = true;
        }
        get destroyed() { return this._destroyed; }
        get size() { return this._size; }
        get usage() { return this._usage; }
    }

    class LayaXIndexBuffer {
        constructor(bufferUsageType) {
            this._bufferRef = null;
            this._nativeObj = new window.conchLayaXIndexBuffer(bufferUsageType);
        }
        get indexType() {
            return this._nativeObj._indexType;
        }
        set indexType(value) {
            this._nativeObj.setIndexType(value);
        }
        get indexCount() {
            return this._nativeObj._indexCount;
        }
        set indexCount(value) {
            this._nativeObj.setIndexCount(value);
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            this._bufferRef = buffer;
            this._nativeObj.setData(buffer, bufferOffset, dataStartIndex, dataCount);
        }
        _setIndexDataLength(data) {
            this._nativeObj._setIndexDataLength(data);
        }
        _setIndexData(data, bufferOffset) {
            this._nativeObj._setIndexData(data, bufferOffset);
        }
        destroy() {
            this._nativeObj.destroy();
            this._bufferRef = null;
        }
    }

    class LayaXInternalTex {
        constructor(nativeObj) {
            this._nativeObj = nativeObj;
        }
        get wrapU() {
            return this._nativeObj.wrapU;
        }
        set wrapU(value) {
            var _a, _b;
            this._nativeObj.wrapU = value;
            (_b = (_a = this._nativeObj).syncSamplerParams) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        get wrapV() {
            return this._nativeObj.wrapV;
        }
        set wrapV(value) {
            var _a, _b;
            this._nativeObj.wrapV = value;
            (_b = (_a = this._nativeObj).syncSamplerParams) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        get wrapW() {
            return this._nativeObj.wrapW;
        }
        set wrapW(value) {
            var _a, _b;
            this._nativeObj.wrapW = value;
            (_b = (_a = this._nativeObj).syncSamplerParams) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        set baseMipmapLevel(value) {
            this._nativeObj.baseMipmapLevel = value;
        }
        get baseMipmapLevel() {
            return this._nativeObj.baseMipmapLevel;
        }
        set maxMipmapLevel(value) {
            this._nativeObj.maxMipmapLevel = value;
        }
        get maxMipmapLevel() {
            return this._nativeObj.maxMipmapLevel;
        }
        get compareMode() {
            return this._nativeObj.compareMode;
        }
        set compareMode(value) {
            var _a, _b;
            this._nativeObj.compareMode = value;
            (_b = (_a = this._nativeObj).syncSamplerParams) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        get anisoLevel() {
            return this._nativeObj.anisoLevel;
        }
        set anisoLevel(value) {
            var _a, _b;
            this._nativeObj.anisoLevel = value;
            (_b = (_a = this._nativeObj).syncSamplerParams) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        get filterMode() {
            return this._nativeObj.filterMode;
        }
        set filterMode(value) {
            var _a, _b;
            this._nativeObj.filterMode = value;
            (_b = (_a = this._nativeObj).syncSamplerParams) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        get mipmapCount() {
            return this._nativeObj.mipmapCount;
        }
        get mipmap() {
            return this._nativeObj.mipmap;
        }
        get isPotSize() {
            return this._nativeObj.getIsPotSize();
        }
        get useSRGBLoad() {
            return this._nativeObj.useSRGBLoad;
        }
        get depth() {
            return this._nativeObj.getDepth();
        }
        get gammaCorrection() {
            return this._nativeObj.gammaCorrection;
        }
        set gammaCorrection(value) {
            this._nativeObj.gammaCorrection = value;
        }
        get resource() {
            return this._nativeObj;
        }
        get width() {
            return this._nativeObj.getWidth();
        }
        get height() {
            return this._nativeObj.getHeight();
        }
        get gpuMemory() {
            return this._nativeObj.getGPUMemory();
        }
        dispose() {
            this._nativeObj.dispose();
        }
    }

    class LayaXInternalRT {
        constructor(nativeObj) {
            this._nativeObj = nativeObj;
        }
        get _isCube() {
            return this._nativeObj._isCube;
        }
        set _isCube(value) {
            this._nativeObj._isCube = value;
        }
        get _samples() {
            return this._nativeObj._samples;
        }
        set _samples(value) {
            this._nativeObj._samples = value;
        }
        get _generateMipmap() {
            return this._nativeObj._generateMipmap;
        }
        set _generateMipmap(value) {
            this._nativeObj._generateMipmap = value;
        }
        get colorFormat() {
            return this._nativeObj.colorFormat;
        }
        set colorFormat(value) {
            this._nativeObj.colorFormat = value;
        }
        get depthStencilFormat() {
            return this._nativeObj.depthStencilFormat;
        }
        set depthStencilFormat(value) {
            this._nativeObj.depthStencilFormat = value;
        }
        get isSRGB() {
            return this._nativeObj.isSRGB;
        }
        set isSRGB(value) {
            this._nativeObj.isSRGB = value;
        }
        get gpuMemory() {
            return this._nativeObj.gpuMemory;
        }
        set gpuMemory(value) {
            this._nativeObj.gpuMemory = value;
        }
        get _textures() {
            if (this._texturesRef) {
                return this._texturesRef;
            }
            else {
                this._texturesRef = [];
                let textures = this._nativeObj.getTextures();
                textures.forEach((element) => {
                    this._texturesRef.push(new LayaXInternalTex(element));
                });
                return this._texturesRef;
            }
        }
        get _depthTexture() {
            if (this._depthTextureRef) {
                return this._depthTextureRef;
            }
            else {
                var nativeObj = this._nativeObj.getDepthTexture();
                if (nativeObj)
                    this._depthTextureRef = new LayaXInternalTex(nativeObj);
                return this._depthTextureRef;
            }
        }
        dispose() {
            this._nativeObj.dispose();
        }
    }

    class RTShaderDefine extends Laya.ShaderDefine {
        constructor(index, value) {
            super(index, value);
        }
    }

    class LayaXShaderCompiler {
        constructor() {
        }
        async init() {
            let glslInit;
            const NativeGlslang = globalThis.conchGlslangCompiler;
            this.glslang = new NativeGlslang();
            glslInit = Promise.resolve();
            let nagaInit;
            const NativeNaga = globalThis.conchNagaCompiler;
            this.naga = new NativeNaga();
            nagaInit = Promise.resolve();
            return Promise.all([glslInit, nagaInit]);
        }
        destroy() {
            this.glslang = null;
            this.naga = null;
        }
    }

    class LayaXTextureContext {
        constructor(native) {
            this._native = native;
            this.needBitmap = false;
        }
        createRenderTargetFromArrayLayer(arrayTex, layer, colorFormat, depthStencilFormat, sRGB) {
            throw new Error("Method not implemented.");
        }
        createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha) {
            var tex = new LayaXInternalTex(this._native.createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha));
            return tex;
        }
        setTextureImageData(texture, source, premultiplyAlpha, invertY) {
            if (source instanceof HTMLCanvasElement) {
                throw "native cant draw HTMLCanvasElement";
            }
            if (source.conchImgId !== undefined) {
                this._native.setTextureImageData(texture._nativeObj, source.conchImgId, premultiplyAlpha, invertY);
            }
            else {
                this._native.setTextureImageData(texture._nativeObj, source._nativeObj.conchImgId, premultiplyAlpha, invertY);
            }
        }
        setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
            this._native.setTexturePixelsData(texture._nativeObj, source, premultiplyAlpha, invertY);
        }
        initVideoTextureData(texture) {
            this._native.initVideoTextureData(texture._nativeObj);
        }
        setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
            this._native.setTextureSubPixelsData(texture._nativeObj, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
        }
        setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
            if (source instanceof HTMLCanvasElement) {
                throw "native cant draw HTMLCanvasElement";
            }
            throw "native not need this function";
        }
        setTexture3DImageData(texture, source, depth, premultiplyAlpha, invertY) {
            this._native.setTexture3DImageData(texture._nativeObj, source.map(function (s) { return s._nativeObj; }), depth, premultiplyAlpha, invertY);
        }
        createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha) {
            return new LayaXInternalTex(this._native.createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha));
        }
        setTexture3DPixelsData(texture, source, depth, premultiplyAlpha, invertY) {
            this._native.setTexture3DPixelsData(texture._nativeObj, source, depth, premultiplyAlpha, invertY);
        }
        setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
            this._native.setTexture3DSubPixelsData(texture._nativeObj, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY);
        }
        setTextureHDRData(texture, hdrInfo) {
            let sourceData = hdrInfo.readScanLine();
            this.setTexturePixelsData(texture, sourceData, false, false);
        }
        setTextureDDSData(texture, ddsInfo) {
            this._native.setTextureDDSData(texture._nativeObj, ddsInfo);
        }
        setTextureKTXData(texture, ktxInfo) {
            this._native.setTextureKTXData(texture._nativeObj, ktxInfo);
        }
        setCubeImageData(texture, sources, premultiplyAlpha, invertY) {
            var images = [];
            var length = sources.length;
            for (let index = 0; index < length; index++) {
                images.push(sources[index]._nativeObj);
            }
            this._native.setCubeImageData(texture._nativeObj, images, premultiplyAlpha, invertY);
        }
        setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
            this._native.setCubePixelsData(texture._nativeObj, source, premultiplyAlpha, invertY);
        }
        setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
            this._native.setCubeSubPixelData(texture._nativeObj, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
        }
        setCubeDDSData(texture, ddsInfo) {
            this._native.setCubeDDSData(texture._nativeObj, ddsInfo);
        }
        setCubeKTXData(texture, ktxInfo) {
            this._native.setCubeKTXData(texture._nativeObj, ktxInfo);
        }
        setTextureCompareMode(texture, compareMode) {
            return this._native.setTextureCompareMode(texture._nativeObj, compareMode);
        }
        bindRenderTarget(renderTarget, faceIndex = 0) {
            this._native.bindRenderTarget(renderTarget._nativeObj, faceIndex);
        }
        bindoutScreenTarget() {
            this._native.bindoutScreenTarget();
        }
        unbindRenderTarget(renderTarget) {
            this._native.unbindRenderTarget(renderTarget._nativeObj);
        }
        createRenderTargetInternal(width, height, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples, storage) {
            return new LayaXInternalRT(this._native.createRenderTargetInternal(width, height, colorFormat, depthStencilFormat ? depthStencilFormat : Laya.RenderTargetFormat.None, generateMipmap, sRGB, multiSamples));
        }
        createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            return new LayaXInternalRT(this._native.createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples));
        }
        createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB) {
            return new LayaXInternalTex(this._native.createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB));
        }
        createRenderTargetDepthTexture(renderTarget, dimension, width, height) {
            return new LayaXInternalTex(this._native.createRenderTargetDepthTexture(renderTarget._nativeObj, dimension, width, height));
        }
        readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
            return out;
        }
        readRenderTargetPixelDataAsync(renderTarget, xOffset, yOffset, width, height, out) {
            return new Promise((resolve, reject) => {
                if (!renderTarget || !renderTarget._nativeObj || width <= 0 || height <= 0) {
                    reject(new Error("readRenderTargetPixelDataAsync: invalid args"));
                    return;
                }
                const pixelCount = width * height;
                if (pixelCount <= 0 || out.byteLength % pixelCount !== 0) {
                    reject(new Error("readRenderTargetPixelDataAsync: out.byteLength not divisible by width*height"));
                    return;
                }
                const bpp = out.byteLength / pixelCount;
                const unpaddedRow = width * bpp;
                const paddedRow = (unpaddedRow + 255) & ~255;
                const padded = new Uint8Array(paddedRow * height);
                const id = this._native.readRenderTargetPixelData(renderTarget._nativeObj, xOffset, yOffset, width, height, paddedRow, padded.buffer);
                if (!id || id <= 0) {
                    reject(new Error("readRenderTargetPixelDataAsync: submit failed"));
                    return;
                }
                LayaXReadbackDispatcher.register(id, () => {
                    const dstU8 = new Uint8Array(out.buffer, out.byteOffset, out.byteLength);
                    if (paddedRow === unpaddedRow) {
                        dstU8.set(padded.subarray(0, unpaddedRow * height));
                    }
                    else {
                        for (let row = 0; row < height; row++) {
                            dstU8.set(padded.subarray(row * paddedRow, row * paddedRow + unpaddedRow), row * unpaddedRow);
                        }
                    }
                    resolve(out);
                }, (e) => reject(e));
            });
        }
        updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
            if (texture && video) {
                this._native.updateVideoTexture(texture._nativeObj, video._nativeObj.conchImgId, premultiplyAlpha, invertY);
            }
        }
    }

    class LayaXRenderEngine {
        constructor() {
            this._lastTextureMemory = 0;
            this._lastRenderTargetMemory = 0;
            this._lastDeviceBufferMemory = 0;
            this._lastGpuBufferMemory = 0;
            this._lastGpuMemory = 0;
            this._remapZ = false;
            this._screenInvertY = true;
            this._lodTextureSample = false;
            this._breakTextureSample = false;
            this._nativeObj = new window.conchLayaXDevice();
            this.shaderCompiler = new LayaXShaderCompiler();
            LayaXRenderEngine._instance = this;
        }
        get _framePassCount() {
            return this._nativeObj._framePassCount;
        }
        set _framePassCount(value) {
            this._nativeObj._framePassCount = value;
        }
        initRenderEngine(canvas) {
            this._nativeObj.initRenderEngine(canvas._nativeObj);
            this._textureContext = new LayaXTextureContext(this._nativeObj.getTextureContext());
            Laya.Config._uniformBlock = Laya.Config.enableUniformBufferObject && this.getCapable(Laya.RenderCapable.UnifromBufferObject);
            Laya.Config.matUseUBO = Laya.Config.matUseUBO && this.getCapable(Laya.RenderCapable.UnifromBufferObject);
            this._nativeObj.enableUniformBufferObject = Laya.Config._uniformBlock;
            this._nativeObj.matUseUBO = Laya.Config.matUseUBO;
        }
        resizeOffScreen(width, height) {
            this._nativeObj.resizeOffScreen(width, height);
        }
        getDefineByName(name) {
            let packed = this._nativeObj.getDefineByName(name);
            let index = Math.floor(packed / 4294967296);
            let value = packed - index * 4294967296;
            return new RTShaderDefine(index, value);
        }
        getNamesByDefineData(defineData, out) {
            out.length = 0;
            let names = this._nativeObj.getNamesByDefineData(defineData._nativeObj);
            if (names && names.length > 0) {
                let arr = names.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].length > 0)
                        out.push(arr[i]);
                }
            }
        }
        addTexGammaDefine(key, value) {
            this._nativeObj.addTexGammaDefine(key, value);
        }
        copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
            this._nativeObj.copySubFrameBuffertoTex(texture._nativeObj, level, xoffset, yoffset, x, y, width, height);
        }
        propertyNameToID(name) {
            return this._nativeObj.propertyNameToID(name);
        }
        propertyIDToName(id) {
            return this._nativeObj.propertyIDToName(id);
        }
        getParams(params) {
            return this._nativeObj.getParams(params);
        }
        getCapable(capatableType) {
            return this._nativeObj.getCapable(capatableType);
        }
        getTextureContext() {
            return this._textureContext;
        }
        startFrame() {
            this._syncStatistics();
            LayaXReadbackDispatcher.pump(this._nativeObj);
        }
        endFrame() {
        }
        _recordAbsoluteMemory(element, bytes, lastBytes) {
            let delta = bytes - lastBytes;
            if (delta !== 0) {
                Laya.LayaGL.statAgent.recordMemoryData(element, delta);
                return bytes;
            }
            return lastBytes;
        }
        _syncStatistics() {
            let nativeObj = this._nativeObj;
            if (!nativeObj || !nativeObj.frameOpaqueDrawCall)
                return;
            let opaque = nativeObj.frameOpaqueDrawCall();
            let transparent = nativeObj.frameTransparentDrawCall();
            let depth = nativeObj.frameDepthDrawCall();
            let shadow = nativeObj.frameShadowDrawCall();
            let triangle = nativeObj.frameTriangle();
            let cullMainTime = nativeObj.frameCullMainTime();
            let draw2D = nativeObj.consumeFrame2DDrawCall ? nativeObj.consumeFrame2DDrawCall() : 0;
            let draw3D = opaque + transparent;
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_OpaqueDrawCall, opaque);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_TransDrawCall, transparent);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_DepthCastDrawCall, depth);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_ShadowDrawCall, shadow);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_2DDrawCall, draw2D);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_3DDrawCall, draw3D);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_DrawCall, draw2D + draw3D + depth + shadow);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_Triangle, triangle);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_CullMain, cullMainTime);
            let textureMemory = nativeObj.gpuTextureTotalMemorySize();
            let renderTargetMemory = nativeObj.gpuRenderTargetTotalMemorySize();
            let deviceBufferMemory = nativeObj.gpuDeviceBufferTotalMemorySize();
            let gpuBufferMemory = nativeObj.gpuBufferTotalMemorySize ? nativeObj.gpuBufferTotalMemorySize() : deviceBufferMemory;
            let gpuMemory = textureMemory + renderTargetMemory + gpuBufferMemory;
            this._lastTextureMemory = this._recordAbsoluteMemory(Laya.StatElement.M_AllTexture, textureMemory, this._lastTextureMemory);
            this._lastRenderTargetMemory = this._recordAbsoluteMemory(Laya.StatElement.M_RenderTexture, renderTargetMemory, this._lastRenderTargetMemory);
            this._lastDeviceBufferMemory = this._recordAbsoluteMemory(Laya.StatElement.M_DeviceBuffer, deviceBufferMemory, this._lastDeviceBufferMemory);
            this._lastGpuBufferMemory = this._recordAbsoluteMemory(Laya.StatElement.M_GPUBuffer, gpuBufferMemory, this._lastGpuBufferMemory);
            this._lastGpuMemory = this._recordAbsoluteMemory(Laya.StatElement.M_GPUMemory, gpuMemory, this._lastGpuMemory);
        }
        viewport(x, y, width, height) {
            this._nativeObj.viewport(x, y, width, height);
        }
        scissor(x, y, width, height) {
            this._nativeObj.scissor(x, y, width, height);
        }
    }

    class LayaXRenderGeometry {
        constructor(mode, drawType) {
            this._nativeObj = new window.conchLayaXRenderGeometry();
            this.mode = mode;
            this.drawParams = new Laya.FastSinglelist();
            this.drawType = drawType;
        }
        getDrawDataParams(out) {
            out && this.drawParams.cloneTo(out);
        }
        setDrawArrayParams(first, count) {
            this.drawParams.add(first);
            this.drawParams.add(count);
            this._nativeObj.setDrawArrayParams(first, count);
        }
        setDrawElemenParams(count, offset) {
            this.drawParams.add(offset);
            this.drawParams.add(count);
            this._nativeObj.setDrawElementParams(count, offset);
        }
        destroy() {
            this._nativeObj.destroy();
        }
        clearRenderParams() {
            this.drawParams.length = 0;
            this._nativeObj.clearRenderParams();
        }
        setIndirectDrawBuffer(buffer, offset) {
            const nativeBuf = buffer ? buffer._nativeObj : null;
            this._nativeObj.setIndirectDrawBuffer(nativeBuf, offset >>> 0);
        }
        set bufferState(value) {
            this._bufferState = value;
            this._nativeObj.setBufferState(value ? value._nativeObj : null);
        }
        get bufferState() {
            return this._bufferState;
        }
        set mode(value) {
            this._nativeObj.setMode(value);
        }
        get mode() {
            return this._nativeObj.mode;
        }
        set drawType(value) {
            this._nativeObj.setDrawType(value);
        }
        get drawType() {
            return this._nativeObj.drawType;
        }
        set instanceCount(value) {
            this._nativeObj.setInstanceCount(value);
        }
        get instanceCount() {
            return this._nativeObj.instanceCount;
        }
        set indexFormat(value) {
            this._nativeObj.setIndexFormat(value);
        }
        get indexFormat() {
            return this._nativeObj.indexFormat;
        }
    }

    class LayaXDefineDatas {
        constructor() {
            this._nativeObj = new window.conchLayaXDefineDatas();
            this._nativeObj.create();
        }
        get _length() {
            return 0;
        }
        set _length(value) {
        }
        get _mask() {
            return [];
        }
        set _mask(value) {
        }
        _intersectionDefineDatas(define) {
        }
        add(define) {
            this._nativeObj.add(define._index, define._value);
        }
        remove(define) {
            this._nativeObj.remove(define._index, define._value);
        }
        addDefineDatas(define) {
            if (define._nativeObj) {
                this._nativeObj.addDefineDatas(define._nativeObj);
            }
        }
        removeDefineDatas(define) {
        }
        has(define) {
            return this._nativeObj.has(define._index, define._value);
        }
        clear() {
            this._nativeObj.clear();
        }
        cloneTo(destObject) {
            const dest = destObject;
            if (dest._nativeObj) {
                this._nativeObj.cloneTo(dest._nativeObj);
            }
        }
        clone() {
            let dest = new LayaXDefineDatas();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class LayaXShaderData extends Laya.ShaderData {
        constructor(ownerResource = null, createNativeObj = true) {
            super(ownerResource);
            this._defineDatas = new LayaXDefineDatas();
            this._renderStateListeners = new Set();
            if (createNativeObj) {
                this._nativeObj = new window.conchLayaXShaderData(this._defineDatas._nativeObj);
            }
            else {
                this._nativeObj = null;
            }
            this._textureData = {};
            this._bufferData = {};
            this._deviceBufferData = {};
        }
        getDefineData() {
            return this._defineDatas;
        }
        getData() {
        }
        clearData() {
            for (let index in this._textureData) {
                let tex = this._textureData[index];
                tex && tex._removeReference();
            }
            this._textureData = {};
            this._bufferData = {};
            this._deviceBufferData = {};
            this._nativeObj.clearData();
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
        static _isRenderStateProp(index) {
            return index === Laya.Shader3D.CULL
                || index === Laya.Shader3D.BLEND
                || index === Laya.Shader3D.BLEND_SRC
                || index === Laya.Shader3D.BLEND_DST
                || index === Laya.Shader3D.BLEND_SRC_RGB
                || index === Laya.Shader3D.BLEND_DST_RGB
                || index === Laya.Shader3D.BLEND_SRC_ALPHA
                || index === Laya.Shader3D.BLEND_DST_ALPHA
                || index === Laya.Shader3D.BLEND_EQUATION
                || index === Laya.Shader3D.BLEND_EQUATION_RGB
                || index === Laya.Shader3D.BLEND_EQUATION_ALPHA
                || index === Laya.Shader3D.DEPTH_TEST
                || index === Laya.Shader3D.DEPTH_WRITE
                || index === Laya.Shader3D.STENCIL_TEST
                || index === Laya.Shader3D.STENCIL_WRITE
                || index === Laya.Shader3D.STENCIL_WRITE_MASK
                || index === Laya.Shader3D.STENCIL_READ_MASK
                || index === Laya.Shader3D.STENCIL_Ref
                || index === Laya.Shader3D.STENCIL_Op
                || index === Laya.Shader3D.DEPTH_BIAS
                || index === Laya.Shader3D.DEPTH_BIAS_CONSTANT
                || index === Laya.Shader3D.DEPTH_BIAS_SLOPESCALE
                || index === Laya.Shader3D.DEPTH_BIAS_CLAMP;
        }
        _notifyRenderStateChanged() {
            if (this._renderStateListeners.size > 0) {
                this._renderStateListeners.forEach(l => l._onRenderStateChanged());
            }
        }
        _addRenderStateListener(listener) {
            this._renderStateListeners.add(listener);
        }
        _removeRenderStateListener(listener) {
            this._renderStateListeners.delete(listener);
        }
        getBool(index) {
            return this._nativeObj.getBool(index);
        }
        setBool(index, value) {
            this._nativeObj.setBool(index, value);
            if (LayaXShaderData._isRenderStateProp(index))
                this._notifyRenderStateChanged();
        }
        getInt(index) {
            return this._nativeObj.getInt(index);
        }
        setInt(index, value) {
            this._nativeObj.setInt(index, value);
            if (LayaXShaderData._isRenderStateProp(index))
                this._notifyRenderStateChanged();
        }
        getNumber(index) {
            return this._nativeObj.getNumber(index);
        }
        setNumber(index, value) {
            this._nativeObj.setNumber(index, value);
            if (LayaXShaderData._isRenderStateProp(index))
                this._notifyRenderStateChanged();
        }
        getVector2(index) {
            let value = this._nativeObj.getVector2(index);
            if (value == null) {
                return value;
            }
            else {
                let _tempVector2 = new Laya.Vector2();
                _tempVector2.x = value.x;
                _tempVector2.y = value.y;
                return _tempVector2;
            }
        }
        setVector2(index, value) {
            this._nativeObj.setVector2(index, value);
        }
        getVector3(index) {
            let value = this._nativeObj.getVector3(index);
            if (value == null) {
                return value;
            }
            else {
                let _tempVector3 = new Laya.Vector3();
                _tempVector3.x = value.x;
                _tempVector3.y = value.y;
                _tempVector3.z = value.z;
                return _tempVector3;
            }
        }
        setVector3(index, value) {
            this._nativeObj.setVector3(index, value);
            if (index === Laya.Shader3D.STENCIL_Op)
                this._notifyRenderStateChanged();
        }
        getVector(index) {
            let value = this._nativeObj.getVector(index);
            let _tempVector = new Laya.Vector4();
            _tempVector.x = value.x;
            _tempVector.y = value.y;
            _tempVector.z = value.z;
            _tempVector.w = value.w;
            return _tempVector;
        }
        setVector(index, value) {
            this._nativeObj.setVector(index, value);
        }
        getColor(index) {
            let value = this._nativeObj.getColor(index);
            if (value == null) {
                return value;
            }
            else {
                let _tempColor = new Laya.Color();
                _tempColor.r = value.r;
                _tempColor.g = value.g;
                _tempColor.b = value.b;
                _tempColor.a = value.a;
                return _tempColor;
            }
        }
        setColor(index, value) {
            if (!value)
                return;
            this._nativeObj.setColor(index, value);
        }
        getMatrix4x4(index) {
            let value = this._nativeObj.getMatrix4x4(index);
            if (value == null) {
                return value;
            }
            else {
                let _tempMatrix4x4 = new Laya.Matrix4x4();
                _tempMatrix4x4.elements.set(value.elements);
                return _tempMatrix4x4;
            }
        }
        setMatrix4x4(index, value) {
            this._nativeObj.setMatrix4x4(index, value);
        }
        getMatrix3x3(index) {
            let value = this._nativeObj.getMatrix3x3(index);
            if (value == null) {
                return value;
            }
            else {
                let _tempMatrix3x3 = new Laya.Matrix3x3();
                _tempMatrix3x3.elements.set(value.elements);
                return _tempMatrix3x3;
            }
        }
        setMatrix3x3(index, value) {
            this._nativeObj.setMatrix3x3(index, value);
        }
        getBuffer(index) {
            return null;
        }
        setBuffer(index, value) {
            this._bufferData[index] = value;
            this._nativeObj.setBuffer(index, value);
        }
        setDeviceBuffer(index, value) {
            this._deviceBufferData[index] = value;
            this._nativeObj.setDeviceBuffer(index, value._nativeObj);
        }
        setTexture(index, value) {
            var lastValue = this._textureData[index];
            if (value && value.bitmap)
                value = value.bitmap;
            this._textureData[index] = value;
            if (value && value._texture) {
                let tex = value._texture;
                if (tex instanceof LayaXInternalRT) {
                    let colorTex = tex._textures[0];
                    this._setInternalTexture(index, colorTex ? colorTex._nativeObj : null);
                }
                else {
                    this._setInternalTexture(index, tex._nativeObj);
                }
            }
            else {
                this._setInternalTexture(index, null);
            }
            lastValue && lastValue._removeReference();
            value && value._addReference();
        }
        _setInternalTexture(index, value) {
            let nativeVal = value ? value : null;
            this._nativeObj._setInternalTexture(index, nativeVal);
        }
        getTexture(index) {
            return this._textureData[index];
        }
        update(name) {
            this._nativeObj.update(name);
        }
        cloneTo(destObject) {
            this._nativeObj.cloneTo(destObject._nativeObj);
            var dest = destObject;
            var destData = dest._textureData;
            for (var k in this._textureData) {
                var value = this._textureData[k];
                if (value != null) {
                    if (value instanceof Laya.BaseTexture) {
                        destData[k] = value;
                        value._addReference();
                        dest.setTexture(parseInt(k), value);
                    }
                }
            }
        }
        clone() {
            var dest = new LayaXShaderData();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            this.clearData();
            this._nativeObj.destroy();
        }
    }

    function getTypeString(type) {
        switch (type) {
            case Laya.ShaderDataType.Int:
                return "int";
            case Laya.ShaderDataType.Bool:
                return "bool";
            case Laya.ShaderDataType.Float:
                return "float";
            case Laya.ShaderDataType.Vector2:
                return "vec2";
            case Laya.ShaderDataType.Vector3:
                return "vec3";
            case Laya.ShaderDataType.Vector4:
            case Laya.ShaderDataType.Color:
                return "vec4";
            case Laya.ShaderDataType.Vector4u:
                return "uvec4";
            case Laya.ShaderDataType.Matrix4x4:
                return "mat4";
            case Laya.ShaderDataType.Matrix3x3:
                return "mat3";
            case Laya.ShaderDataType.Texture2D:
                return "sampler2D";
            case Laya.ShaderDataType.TextureCube:
                return "samplerCube";
            case Laya.ShaderDataType.Texture2DArray:
                if (Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Texture3D)) {
                    return "sampler2DArray";
                }
                else {
                    return "";
                }
            case Laya.ShaderDataType.Texture3D:
                if (Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Texture3D)) {
                    return "sampler3D";
                }
                else {
                    return "";
                }
            default:
                return "";
        }
    }
    function getTypeDefaultString(type) {
        switch (type) {
            case Laya.ShaderDataType.Int:
                return "0";
            case Laya.ShaderDataType.Bool:
                return "false";
            case Laya.ShaderDataType.Float:
                return "0.0";
            case Laya.ShaderDataType.Vector2:
                return "vec2(0.0)";
            case Laya.ShaderDataType.Vector3:
                return "vec3(0.0)";
            case Laya.ShaderDataType.Vector4:
            case Laya.ShaderDataType.Color:
                return "vec4(0.0)";
            default:
                return "";
        }
    }
    function isSamplerType(type) {
        switch (type) {
            case Laya.ShaderDataType.Texture2D:
            case Laya.ShaderDataType.Texture3D:
            case Laya.ShaderDataType.TextureCube:
            case Laya.ShaderDataType.Texture2DArray:
                return true;
            case Laya.ShaderDataType.None:
            case Laya.ShaderDataType.Int:
            case Laya.ShaderDataType.Bool:
            case Laya.ShaderDataType.Float:
            case Laya.ShaderDataType.Vector2:
            case Laya.ShaderDataType.Vector3:
            case Laya.ShaderDataType.Vector4:
            case Laya.ShaderDataType.Color:
            case Laya.ShaderDataType.Buffer:
            case Laya.ShaderDataType.Matrix4x4:
            case Laya.ShaderDataType.Matrix3x3:
            default:
                return false;
        }
    }

    const uniformRegex = /(?:layout\s*\([^)]*\)\s*)?\buniform\s+(?:(lowp|mediump|highp)\s+)?(?:(?:readonly|writeonly|coherent|volatile|restrict)\s+)*(\w+)\s+(\w+)(\s*\[\s*(\d+)\s*\])?\s*;/gm;
    const uniformBlockRegex = /(?:layout\s*\([^)]*\)\s*)?uniform\s+(\w+)\s*\{([\s\S]*?)\}\s*;/g;
    class LayaX_GLSLForVulkanGenerator {
        static layax_process(defines, attributeMap, uniformMap, shaderPassName, materialMap, VS, FS, useTexArray, checkSetNumber, appendSet) {
            const engine = LayaXRenderEngine._instance;
            let defMap = {};
            for (const define of defines) {
                defMap[define] = true;
            }
            defMap["GRAPHICS_API_GLES3"] = true;
            defMap["COLORKEYCOUNT_8"] = true;
            defMap["COLOROVERLIFETIME_COLORKEY_8"] = true;
            defMap["GRADIENTKEYCOUNT_8"] = true;
            let vs = VS.toscript(defMap, []);
            let fs = FS.toscript(defMap, []);
            if (vs[0].indexOf("#version") == 0) {
                vs[0] + '\n';
            }
            if (fs[0].indexOf("#version") == 0) {
                fs[0] + '\n';
            }
            let vertexCode = vs.join('\n');
            let fragmentCode = fs.join('\n');
            const defineStrs = defineString(defMap);
            const additionDefineStrs = additionDefineString();
            const precision = `precision highp float;
        precision highp int;`;
            {
                let vs = `layout(std140, column_major) uniform;
#define attribute in
#define varying out
#define textureCube texture
#define texture2D texture

${defineStrs}

${additionDefineStrs}

${vertexCode}
`;
                let resVS = engine.shaderCompiler.glslang.glsl300es_preprocess(vs, "vertex");
                if (!resVS.success) {
                    console.error("vertex shader preprocess error", resVS.info_log);
                }
                vertexCode = resVS.preprocessed_code;
                vertexCode = renameMainFunction(vertexCode, "main_vs");
                let fs = `layout(std140, column_major) uniform;
#define varying in
out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad

${defineStrs}

${additionDefineStrs}

${fragmentCode}
`;
                let resFS = engine.shaderCompiler.glslang.glsl300es_preprocess(fs, "fragment");
                if (!resFS.success) {
                    console.error("fragment shader preprocess error", resFS.info_log);
                }
                fragmentCode = resFS.preprocessed_code;
            }
            const attributeStrs = attributeString(attributeMap[0], attributeMap[1]);
            const varyings = executeVaryings(fragmentCode, vertexCode);
            const vertexVaryingStrs = varyingString(varyings, "out");
            const fragmentVaryingStrs = varyingString(varyings, "in");
            const fragmentOutStrs = fragmentOutString();
            let collectionUniforms = new Map();
            const materialUniformNames = new Set();
            if (materialMap && materialMap.size > 0) {
                materialMap.forEach((uniform) => {
                    materialUniformNames.add(uniform.propertyName);
                    if (!collectionUniforms.has(uniform.propertyName)) {
                        collectionUniforms.set(uniform.propertyName, {
                            type: uniform.uniformtype,
                            arrayLength: uniform.arrayLength > 0 ? uniform.arrayLength : undefined,
                            registeredInMaterialMap: true,
                        });
                    }
                });
            }
            const uniformCollect = (match, precision, type, name, arrayDecl, arrayLength) => {
                const oldUniform = collectionUniforms.get(name);
                let u = {
                    type: getShaderDataType(type),
                    declaredInGlsl: true,
                    registeredInMaterialMap: (oldUniform === null || oldUniform === void 0 ? void 0 : oldUniform.registeredInMaterialMap) || materialUniformNames.has(name),
                };
                if (u.type != Laya.ShaderDataType.None) {
                    collectionUniforms.set(name, u);
                }
                if (type == "sampler2DShadow" || type == "samplerCubeShadow" || type == "sampler2DArrayShadow") {
                    u.samplerType = "depth";
                }
                if (type == "sampler2DArray") {
                    u.demision = "2d-array";
                }
                if (type == "samplerCube") {
                    u.demision = "cube";
                }
                if (arrayLength) {
                    let length = parseInt(arrayLength);
                    u.arrayLength = length;
                }
                return "\n";
            };
            vertexCode = vertexCode.replace(uniformRegex, uniformCollect);
            fragmentCode = fragmentCode.replace(uniformRegex, uniformCollect);
            const executeUniforms = (value, key) => {
                value.forEach(uniform => {
                    var _a;
                    if (uniform.type == exports.LayaXBindingInfoType.texture) {
                        let name = uniform.name.replace("_Texture", "");
                        let collect = collectionUniforms.get(name);
                        if (collect) {
                            collect.set = uniform.set;
                        }
                    }
                    if (uniform.type == exports.LayaXBindingInfoType.sampler) {
                        let name = uniform.name.replace("_Sampler", "");
                        let collect = collectionUniforms.get(name);
                        if (collect) {
                            collect.set = uniform.set;
                        }
                        else if (key < checkSetNumber) {
                            uniform.texture.sampleType;
                            if (((_a = uniform.sampler) === null || _a === void 0 ? void 0 : _a.type) == "comparison") ;
                            collectionUniforms.set(name, { type: Laya.ShaderDataType.Texture2D, set: uniform.set });
                        }
                    }
                    if (uniform.type == exports.LayaXBindingInfoType.storageBuffer) {
                        let collect = collectionUniforms.get(uniform.name);
                        if (collect) {
                            collect.set = uniform.set;
                        }
                    }
                    if (uniform.type == exports.LayaXBindingInfoType.buffer) {
                        let name = uniform.name;
                        let commandMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(name);
                        commandMap._idata.forEach((u, i) => {
                            let collect = collectionUniforms.get(u.propertyName);
                            if (collect) {
                                collect.set = uniform.set;
                            }
                        });
                    }
                });
            };
            uniformMap.forEach(executeUniforms);
            if (appendSet >= 0) {
                let wildUniforms = [];
                collectionUniforms.forEach((value, name) => {
                    if (value.set == undefined) {
                        if (value.declaredInGlsl && !value.registeredInMaterialMap) {
                            const arrayInfo = value.arrayLength ? `[${value.arrayLength}]` : "";
                            wildUniforms.push(`${name}${arrayInfo}:${Laya.ShaderDataType[value.type]}`);
                        }
                    }
                });
                if (wildUniforms.length > 0) {
                    console.error(`[LayaX] Shader "${shaderPassName}" declares uniforms in GLSL that are not registered in the material uniformMap. ` +
                        `LayaX does not auto-append wild uniforms. Missing: ${wildUniforms.join(", ")}`);
                }
            }
            vertexCode = vertexCode.replace(uniformBlockRegex, '\n');
            fragmentCode = fragmentCode.replace(uniformBlockRegex, '\n');
            vertexCode = vertexCode.replace(vertexVaryingRegex, '\n');
            fragmentCode = fragmentCode.replace(fragmentVaryingRegex, '\n');
            fragmentCode = fragmentCode.replace(vertexVaryingRegex, "");
            vertexCode = replaceTextureSampler(vertexCode, useTexArray);
            fragmentCode = replaceTextureSampler(fragmentCode, useTexArray);
            {
                let texturePropertyIds = [];
                for (const texName of useTexArray) {
                    if (texName.endsWith("_Texture")) {
                        texturePropertyIds.push(Laya.Shader3D.propertyNameToID(texName.substring(0, texName.length - 8)));
                    }
                }
                uniformMap.forEach((value, key) => {
                    if (key < checkSetNumber)
                        return;
                    let filtered = [];
                    for (const info of value) {
                        if (info.type === exports.LayaXBindingInfoType.texture || info.type === exports.LayaXBindingInfoType.sampler) {
                            if (texturePropertyIds.includes(info.propertyId)) {
                                filtered.push(info);
                            }
                        }
                        else {
                            filtered.push(info);
                        }
                    }
                    for (let i = 0; i < filtered.length; i++) {
                        filtered[i].binding = i;
                    }
                    uniformMap.set(key, filtered);
                });
            }
            vertexCode = vertexCode.replace(/gl_VertexID/g, "gl_VertexIndex");
            fragmentCode = fragmentCode.replace(/gl_VertexID/g, "gl_VertexIndex");
            const uniformStrs = uniformString2(uniformMap, materialMap, useTexArray, collectionUniforms, checkSetNumber, appendSet);
            const glslVersion = "#version 450\n";
            let vertex = `${glslVersion}
${precision}

${defineStrs}

${attributeStrs}

${uniformStrs}

${vertexVaryingStrs}

${vertexCode}
`;
            let fragment = `${glslVersion}
${precision}

${fragmentOutStrs}

${additionDefineStrs}

${defineStrs}

${uniformStrs}

${fragmentVaryingStrs}

${fragmentCode}
`;
            return {
                vertex,
                fragment,
                hasSampler: collectionUniforms.size > 0
            };
        }
        static proccessCompute(defines, uniformCommandMaps, uniformMaps, node, shaderName) {
            const engine = LayaXRenderEngine._instance;
            let defMap = {};
            for (const define of defines) {
                defMap[define] = true;
            }
            let code = node.toscript(defMap, []);
            let computeCode = code.join('\n');
            const defineStrs = defineString(defMap);
            const glslVersion = "#version 450\n";
            const ssboBindingMap = new Map();
            const getUniformDeclaration = (uniformMaps, usedTex) => {
                let res = "";
                uniformMaps.forEach((value, set) => {
                    for (let uniform of value) {
                        switch (uniform.type) {
                            case exports.LayaXBindingInfoType.storageBuffer: {
                                let setIndex = set;
                                let bindingIndex = uniform.binding;
                                ssboBindingMap.set(uniform.name, { set: setIndex, binding: bindingIndex });
                                break;
                            }
                            case exports.LayaXBindingInfoType.storageTexture:
                                {
                                    let access = wgslAccessToGlsl(uniform.storageTexture.access);
                                    res = `${res}layout(${uniform.format ? uniform.format : "rgba8"}, set=${set}, binding=${uniform.binding}) uniform ${access} image2D ${uniform.name};\n`;
                                    break;
                                }
                            case exports.LayaXBindingInfoType.buffer: {
                                let commandMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(uniform.name);
                                if (commandMap._hasUniformBuffer) {
                                    let uniformMap = commandMap._idata;
                                    res = `${res}${uniformMapString(uniformMap, uniform.name, uniform.set, uniform.binding, true, new Map()).code}\n`;
                                }
                                break;
                            }
                            case exports.LayaXBindingInfoType.texture: {
                                const textureName = uniform.name.slice(0, -"_Texture".length);
                                if (!usedTex || usedTex.has(textureName)) {
                                    const textureType = getSamplerTextureType(uniform.texture.sampleType, uniform.texture.viewDimension);
                                    res = `${res}layout(set=${set}, binding=${uniform.binding}) uniform ${textureType} ${textureName};\n`;
                                }
                                break;
                            }
                        }
                    }
                });
                return res;
            };
            const uniformStr = getUniformDeclaration(uniformMaps);
            let resCode = getComputeCode(glslVersion, defineStrs, uniformStr, computeCode);
            let preprocessRes = engine.shaderCompiler.glslang.preprocess_compute(resCode, 'compute');
            if (!preprocessRes.success) {
                console.error(`LayaXComputeShader ${shaderName} preprocess error:`, preprocessRes.info_log);
                return {};
            }
            computeCode = computeCode.replace(uniformRegex, "");
            if (preprocessRes.uniforms.size > 0 || preprocessRes.ssbos.size > 0) {
                const exists = new Map();
                uniformMaps.forEach(properties => {
                    for (let uniform of properties) {
                        exists.set(uniform.propertyId, uniform);
                    }
                });
                let additionMaps = uniformCommandMaps[0];
                let addNewUniform = false;
                let uniformNames = preprocessRes.uniforms.keys();
                for (let name of uniformNames) {
                    let propertyId = Laya.Shader3D.propertyNameToID(name);
                    if (!exists.has(propertyId)) {
                        let info = preprocessRes.uniforms.get(name);
                        let type = info.type;
                        info.access;
                        let arrayLength = getArrayLength(type);
                        if (arrayLength > 0) {
                            type = type.substring(0, type.lastIndexOf('['));
                            additionMaps.addShaderUniformArray(propertyId, name, getShaderDataType(type), arrayLength);
                        }
                        else {
                            additionMaps.addShaderUniform(propertyId, name, getShaderDataType(type), info);
                        }
                        addNewUniform = true;
                    }
                }
                let addNewSSBO = false;
                let ssboNames = preprocessRes.ssbos.keys();
                for (let name of ssboNames) {
                    let propertyId = Laya.Shader3D.propertyNameToID(name);
                    if (!exists.has(propertyId)) {
                        let shaderType = Laya.ShaderDataType.DeviceBuffer;
                        const access = preprocessRes.ssbos.get(name);
                        if (access == "readonly") {
                            shaderType = Laya.ShaderDataType.ReadOnlyDeviceBuffer;
                        }
                        additionMaps.addShaderUniform(propertyId, name, shaderType, { access });
                        addNewSSBO = true;
                    }
                    else {
                        let uniform = exists.get(propertyId);
                        const access = preprocessRes.ssbos.get(name);
                        switch (uniform.buffer.type) {
                            case "storage":
                                if (access == "readonly") {
                                    console.warn(`Shader ${shaderName} ssbo access type mismatch for ${name}`);
                                }
                                break;
                            case "read-only-storage":
                                if (access != "readonly") {
                                    console.warn(`Shader ${shaderName} ssbo access type mismatch for ${name}`);
                                }
                                break;
                        }
                    }
                }
                if (addNewUniform || addNewSSBO) {
                    uniformMaps.set(0, LayaXBindGroupHelper.createBindingInfoArray(0, [additionMaps._stateName]));
                }
                ssboBindingMap.clear();
                const newUniformStr = getUniformDeclaration(uniformMaps, preprocessRes.uniforms);
                computeCode = ssboStrings(ssboBindingMap, computeCode);
                resCode = getComputeCode(glslVersion, defineStrs, newUniformStr, computeCode);
                return {
                    code: resCode,
                    hasSampler: preprocessRes.samplers.size > 0
                };
            }
            computeCode = ssboStrings(ssboBindingMap, computeCode);
            resCode = getComputeCode(glslVersion, defineStrs, uniformStr, computeCode);
            return {
                code: resCode,
                hasSampler: preprocessRes.samplers.size > 0
            };
        }
    }
    function defineString(defines) {
        let res = "";
        for (const key in defines) {
            if (defines[key]) {
                res += `#define ${key}\n`;
            }
        }
        return res;
    }
    function attributeString(attributeMap, nouseAttributeMap) {
        let res = "";
        let location = 0;
        let attributeDefines = "";
        for (const key in attributeMap) {
            let type = getTypeString(attributeMap[key][1]);
            if (key == "a_BoneIndices") {
                type = "uvec4";
            }
            location = attributeMap[key][0];
            if (type != "") {
                if (type == "mat4") {
                    res = `${res}layout(location = ${location++}) in vec4 ${key}_0;\n`;
                    res = `${res}layout(location = ${location++}) in vec4 ${key}_1;\n`;
                    res = `${res}layout(location = ${location++}) in vec4 ${key}_2;\n`;
                    res = `${res}layout(location = ${location}) in vec4 ${key}_3;\n`;
                    attributeDefines = `${attributeDefines}#define ${key} mat4(${key}_0, ${key}_1, ${key}_2, ${key}_3)\n`;
                }
                else {
                    res = `${res}layout(location = ${location}) in ${type} ${key};\n`;
                }
            }
        }
        for (const key in nouseAttributeMap) {
            let type = getTypeString(nouseAttributeMap[key][1]);
            let defaultValue = getTypeDefaultString(nouseAttributeMap[key][1]);
            if (key == "a_BoneIndices") {
                type = "uvec4";
                defaultValue = "uvec4(0)";
            }
            nouseAttributeMap[key][0];
            if (type != "") {
                if (type == "mat4") {
                    res = `${res}const vec4 ${key}_0 = vec4(0.0);\n`;
                    res = `${res}const vec4 ${key}_1 = vec4(0.0);\n`;
                    res = `${res}const vec4 ${key}_2 = vec4(0.0);\n`;
                    res = `${res}const vec4 ${key}_3 = vec4(0.0);\n`;
                    attributeDefines = `${attributeDefines}#define ${key} mat4(${key}_0, ${key}_1, ${key}_2, ${key}_3)\n`;
                }
                else {
                    res = `${res}const ${type} ${key} =${defaultValue};\n`;
                }
            }
        }
        return `${res}
${attributeDefines}
`;
    }
    function uniformMapString(uniformMap, name, set, bindOffset, skipTexture, collectUniforms) {
        var _a;
        let textureUniforms = [];
        let blockUniforms = [];
        uniformMap.forEach(uniform => {
            if (isSamplerType(uniform.uniformtype)) {
                textureUniforms.push(uniform);
            }
            else {
                blockUniforms.push(uniform);
            }
        });
        let res = "";
        let binding = bindOffset;
        if (blockUniforms.length > 0) {
            res = `${res}layout(std140, set=${set}, binding=${binding++}) uniform ${name} {`;
            for (let uniform of blockUniforms) {
                let uniformName = uniform.propertyName;
                if (uniform.arrayLength > 0) {
                    let arrayLength = ((_a = collectUniforms.get(uniformName)) === null || _a === void 0 ? void 0 : _a.arrayLength) || uniform.arrayLength;
                    uniformName = `${uniformName}[${arrayLength}]`;
                }
                let typeStr = getTypeString(uniform.uniformtype);
                if (typeStr != "") {
                    res = `${res}
    ${typeStr} ${uniformName};`;
                }
            }
            res = `${res}
};
`;
        }
        if (!skipTexture && textureUniforms.length > 0) {
            for (let uniform of textureUniforms) {
                switch (uniform.uniformtype) {
                    case Laya.ShaderDataType.Texture2D:
                        res = `${res}layout(set=${set}, binding=${binding++}) uniform texture2D ${uniform.propertyName}_Texture;
 layout(set=${set}, binding=${binding++}) uniform sampler ${uniform.propertyName}_Sampler;
`;
                        break;
                    case Laya.ShaderDataType.TextureCube:
                        res = `${res}layout(set=${set}, binding=${binding++}) uniform texture2D ${uniform.propertyName}_Texture;
layout(set=${set}, binding=${binding++}) uniform sampler ${uniform.propertyName}_Sampler;
`;
                        break;
                    case Laya.ShaderDataType.Texture2DArray:
                    case Laya.ShaderDataType.Texture3D:
                }
            }
        }
        return {
            code: res,
            binding: binding
        };
    }
    function uniformString2(uniformSetMap, materialMap, usedTexSet, collectUniforms, checkSetNumber, appendSet) {
        let res = "";
        let samplerMap = new Map();
        uniformSetMap.forEach((value, key) => {
            var _a;
            if (value.length > 0) {
                for (let uniform of value) {
                    switch (uniform.type) {
                        case exports.LayaXBindingInfoType.storageBuffer:
                            break;
                        case exports.LayaXBindingInfoType.storageTexture:
                            break;
                        case exports.LayaXBindingInfoType.buffer:
                            {
                                let uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(uniform.name)._idata;
                                if (key == appendSet) {
                                    uniformMap = materialMap;
                                }
                                res = `${res}${uniformMapString(uniformMap, uniform.name, uniform.set, uniform.binding, true, collectUniforms).code}\n`;
                                break;
                            }
                        case exports.LayaXBindingInfoType.texture:
                            {
                                let textureName = uniform.name.replace("_Texture", "");
                                let collectUniform = collectUniforms.get(textureName);
                                if (collectUniform) {
                                    uniform.texture.sampleType = uniform.texture.sampleType;
                                    uniform.texture.viewDimension = collectUniform.demision || uniform.texture.viewDimension;
                                }
                                let textureType = getDimensionTextureType((_a = uniform.texture) === null || _a === void 0 ? void 0 : _a.viewDimension);
                                res = `${res}layout(set=${uniform.set}, binding=${uniform.binding}) uniform ${textureType} ${uniform.name};\n`;
                                let samplerName = uniform.name.replace("_Texture", "");
                                samplerMap.set(samplerName, uniform);
                            }
                            break;
                        case exports.LayaXBindingInfoType.sampler:
                            {
                                let sampler = "sampler";
                                let samplerName = uniform.name.replace("_Sampler", "");
                                let collectUniform = collectUniforms.get(samplerName);
                                if (collectUniform) {
                                    if (collectUniform.samplerType == "depth") {
                                        uniform.sampler.type = "comparison";
                                        sampler = "samplerShadow";
                                    }
                                }
                                res = `${res}layout(set=${uniform.set}, binding=${uniform.binding}) uniform ${sampler} ${uniform.name};\n`;
                            }
                            break;
                    }
                }
            }
        });
        let samplerDefStrs = "\n";
        samplerMap.forEach((uniform, key) => {
            var _a;
            let sampleType = ((_a = collectUniforms.get(key)) === null || _a === void 0 ? void 0 : _a.samplerType) || uniform.texture.sampleType;
            let sampler = getSamplerTextureType(sampleType, uniform.texture.viewDimension);
            samplerDefStrs += `#define ${key} ${sampler}(${uniform.name}, ${key}_Sampler)\n`;
            uniform.texture.sampleType = sampleType;
        });
        return res + samplerDefStrs;
    }
    function getVaryingRegex(ioType) {
        return new RegExp(`(?:(flat|smooth|noperspective)\\s+)?${ioType}\\s+(?:(lowp|mediump|highp)\\s+)?(\\w+)\\s+(\\w+)\\s*;`, 'g');
    }
    const vertexVaryingRegex = getVaryingRegex("out");
    const fragmentVaryingRegex = getVaryingRegex("in");
    function findVaryings(source, regex) {
        let varyings = [];
        let result;
        while ((result = regex.exec(source)) !== null) {
            const interpolation = result[1] ? `${result[1]} ` : '';
            const precision = result[2] ? `${result[2]} ` : '';
            const type = result[3].trim();
            const name = result[4].trim();
            varyings.push(`${interpolation} ${precision} ${type} ${name};`);
        }
        return varyings;
    }
    function varyingString(varyings, io) {
        let res = "";
        for (let i = 0; i < varyings.length; i++) {
            res += `layout(location = ${i}) ${io} ${varyings[i]}\n`;
        }
        return res;
    }
    function executeVaryings(fsSource, vsSource) {
        let vertexVaryings = findVaryings(vsSource, vertexVaryingRegex);
        let fragmentVaryings = findVaryings(fsSource, fragmentVaryingRegex);
        let varyings = vertexVaryings.filter(item => fragmentVaryings.includes(item));
        return varyings;
    }
    function fragmentOutString(source) {
        return "layout(location = 0) out vec4 pc_fragColor;";
    }
    function replaceTextureSampler(source, usedTexSet) {
        const textureRegx = /texture\s*\(\s*([\w_]+)\s*,\s*([^)]*)\s*\)/g;
        let newSource = source.replace(textureRegx, (match, textureName, uvName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureProjRegx = /textureProj\s*\(\s*([\w_]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureProjRegx, (match, textureName, uvName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureLodRegx = /textureLod\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureLodRegx, (match, textureName, uvName, lodName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureProjLodRegx = /textureProjLod\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureProjLodRegx, (match, textureName, uvName, lodName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureGradRegx = /textureGrad\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureGradRegx, (match, textureName, uvName, ddxName, ddyName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        const textureProjGradRegx = /textureProjGrad\s*\(\s*([\w_]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]*)\s*\)/g;
        newSource = newSource.replace(textureProjGradRegx, (match, textureName, uvName, ddxName, ddyName) => {
            usedTexSet.add(`${textureName}_Texture`);
            usedTexSet.add(`${textureName}_Sampler`);
            return match;
        });
        return newSource;
    }
    function additionDefineString() {
        return `
#define MAX_LIGHT_COUNT ${Laya.Config3D.maxLightCount}
#define MAX_LIGHT_COUNT_PER_CLUSTER ${Laya.Config3D._maxAreaLightCountPerClusterAverage}
#define CLUSTER_X_COUNT ${Laya.Config3D.lightClusterCount.x}
#define CLUSTER_Y_COUNT ${Laya.Config3D.lightClusterCount.y}
#define CLUSTER_Z_COUNT ${Laya.Config3D.lightClusterCount.z}
#define MORPH_MAX_COUNT ${Laya.Config3D.maxMorphTargetCount}
#define SHADER_CAPAILITY_LEVEL ${Laya.LayaGL.renderEngine.getParams(Laya.RenderParams.SHADER_CAPAILITY_LEVEL)}
`;
    }
    function getSamplerTextureType(type = "float", dimension = "2d") {
        if (dimension == "2d") {
            switch (type) {
                case "depth":
                    return "sampler2DShadow";
                case "float":
                case "unfilterable-float":
                case "sint":
                case "uint":
                default:
                    return "sampler2D";
            }
        }
        else if (dimension == "cube") {
            switch (type) {
                case "depth":
                    return "samplerCubeShadow";
                default:
                    return "samplerCube";
            }
        }
        else if (dimension == "2d-array") {
            switch (type) {
                case "depth":
                    return "sampler2DArrayShadow";
                default:
                    return "sampler2DArray";
            }
        }
        else if (dimension == "3d") {
            switch (type) {
                case "depth":
                    return "sampler3DShadow";
                default:
                    return "sampler3D";
            }
        }
        else if (dimension == "cube-array") {
            switch (type) {
                case "depth":
                    return "samplerCubeArrayShadow";
                default:
                    return "samplerCubeArray";
            }
        }
        else if (dimension == "1d") {
            switch (type) {
                case "depth":
                    return "sampler1DShadow";
                default:
                    return "sampler1D";
            }
        }
        else {
            return "sampler2D";
        }
    }
    function getDimensionTextureType(type) {
        switch (type) {
            case "1d":
                return "texture1D";
            case "2d":
                return "texture2D";
            case "2d-array":
                return "texture2DArray";
            case "cube":
                return "textureCube";
            case "cube-array":
                return "textureCubeArray";
            case "3d":
                return "texture3D";
            default:
                return "texture2D";
        }
    }
    function getShaderDataType(type) {
        switch (type) {
            case "float":
                return Laya.ShaderDataType.Float;
            case "int":
            case "uint":
                return Laya.ShaderDataType.Int;
            case "bool":
                return Laya.ShaderDataType.Bool;
            case "vec2":
                return Laya.ShaderDataType.Vector2;
            case "vec3":
                return Laya.ShaderDataType.Vector3;
            case "vec4":
                return Laya.ShaderDataType.Vector4;
            case "mat3":
                return Laya.ShaderDataType.Matrix3x3;
            case "mat4":
                return Laya.ShaderDataType.Matrix4x4;
            case "sampler2D":
            case "sampler2DShadow":
                return Laya.ShaderDataType.Texture2D;
            case "samplerCube":
            case "samplerCubeShadow":
                return Laya.ShaderDataType.TextureCube;
            case "sampler2DArray":
            case "sampler2DArrayShadow":
                return Laya.ShaderDataType.Texture2DArray;
            case "image2D":
                return Laya.ShaderDataType.StorageTexture2D;
            default:
                return Laya.ShaderDataType.None;
        }
    }
    function wgslAccessToGlsl(access) {
        switch (access) {
            case "read-only":
                return "readonly";
            case "read-write":
                return "";
            case "write-only":
            default:
                return "writeonly";
        }
    }
    function getArrayLength(name) {
        let endPos = name.lastIndexOf(']');
        let startPos = name.lastIndexOf('[');
        if (startPos != -1 && endPos == name.length - 1) {
            let arrayLengthStr = name.slice(startPos + 1, endPos);
            let arrayLength = parseInt(arrayLengthStr);
            if (!isNaN(arrayLength) && arrayLength > 0) {
                return arrayLength;
            }
        }
        return 0;
    }
    function getComputeCode(glslVersion, defineStrs, uniformStr, computeCode) {
        return `${glslVersion}

layout(std140, column_major) uniform;
layout(std430, column_major) buffer;

${defineStrs}

${uniformStr}

${computeCode}
`;
    }
    const mainFuncRegex = /\bvoid\s+main\s*\(\s*\)/;
    function renameMainFunction(source, newName) {
        const newCode = source.replace(mainFuncRegex, `void ${newName}()`);
        return newCode;
    }
    const ssboRegexCompat = /((?:layout\s*\([^)]*\)\s*)*)\s*((?:(?:readonly|writeonly|coherent|volatile|restrict)\s+)*)buffer\s+([A-Za-z_]\w*)\s*\{([\s\S]*?)\}\s*([A-Za-z_]\w*)?\s*;/g;
    function ssboStrings(ssboBindingMap, code) {
        code = code.replace(ssboRegexCompat, (match, layoutStr, readonlyStr, blockName, body, instanceName) => {
            let bindingInfo = ssboBindingMap.get(blockName);
            if (bindingInfo) {
                let newLayoutStr = `layout(std430, set = ${bindingInfo.set}, binding = ${bindingInfo.binding}) `;
                if (readonlyStr.startsWith("writeonly")) {
                    readonlyStr = " ";
                }
                return `${newLayoutStr}${readonlyStr}buffer ${blockName} {${body}} ${instanceName || ""};\n`;
            }
            else {
                return "";
            }
        });
        return code;
    }

    class LayaXShaderInstance {
        constructor() {
            this.bindingInfoMap = new Map();
            this._resourcesCacheKey = new Map();
            this.textureExitsMap = new Map();
        }
        _serializeShader() {
            throw new Laya.NotImplementedError();
        }
        _deserialize(buffer) {
            throw new Laya.NotImplementedError();
        }
        _create(shaderProcessInfo, shaderPass) {
            this._shaderPass = shaderPass;
            const moduleData = shaderPass.moduleData;
            const setMapNames = moduleData.compileSetMapNames;
            if (!setMapNames || setMapNames.size === 0) {
                console.warn("LayaXShaderInstance._create: no set→map names available");
            }
            if (setMapNames) {
                for (const [setIndex, mapNames] of setMapNames) {
                    for (const mapName of mapNames) {
                        this._ensureCommandMapPopulated(mapName, shaderPass);
                    }
                    const bindings = LayaXBindGroupHelper.createBindingInfoArray(setIndex, mapNames);
                    this.bindingInfoMap.set(setIndex, bindings);
                    this._resourcesCacheKey.set(setIndex, mapNames);
                }
            }
            let attriLocArray = shaderPass.moduleData.attributeLocations;
            let filteredAttributeMap = {};
            let noUseAttributeMap = {};
            for (const [key, value] of Object.entries(shaderProcessInfo.attributeMap)) {
                if (attriLocArray.has(value[0])) {
                    filteredAttributeMap[key] = value;
                }
                else {
                    noUseAttributeMap[key] = value;
                }
            }
            let useTexSet = new Set();
            let cullTextureSetLayer = shaderProcessInfo.is2D ? 3 : 2;
            let materialSetIndex = -1;
            if (setMapNames) {
                const passName = shaderPass.name;
                for (const [setIndex, mapNames] of setMapNames) {
                    if (mapNames.includes(passName)) {
                        materialSetIndex = setIndex;
                        break;
                    }
                }
            }
            let useMaterial = Laya.Config.matUseUBO;
            Laya.Config.matUseUBO = (!shaderProcessInfo.is2D) && Laya.Config.matUseUBO;
            const glslObj = LayaX_GLSLForVulkanGenerator.layax_process(shaderProcessInfo.defineString, [filteredAttributeMap, noUseAttributeMap], this.bindingInfoMap, shaderPass.name, shaderPass._owner._uniformMap, shaderProcessInfo.vs, shaderProcessInfo.ps, useTexSet, cullTextureSetLayer, materialSetIndex);
            Laya.Config.matUseUBO = useMaterial;
            const engine = LayaXRenderEngine._instance;
            let vs_wgsl = "";
            let fs_wgsl = "";
            {
                let vertexSpvRes = engine.shaderCompiler.glslang.glsl450_to_spirv(glslObj.vertex, "vertex");
                if (!vertexSpvRes.success) {
                    let subShader = this._shaderPass._owner;
                    let shader = subShader._owner;
                    let subIndex = shader._subShaders.indexOf(subShader);
                    let passIndex = subShader._passes.indexOf(this._shaderPass);
                    console.error(`${shader.name}_sub${subIndex}_pass${passIndex}`);
                    console.error(vertexSpvRes.info_log);
                }
                let vertexSpirv = new Uint8Array(vertexSpvRes.spirv.buffer, vertexSpvRes.spirv.byteOffset, vertexSpvRes.spirv.byteLength);
                let fragmentSpvRes = engine.shaderCompiler.glslang.glsl450_to_spirv(glslObj.fragment, "fragment");
                if (!fragmentSpvRes.success) {
                    let subShader = this._shaderPass._owner;
                    let shader = subShader._owner;
                    let subIndex = shader._subShaders.indexOf(subShader);
                    let passIndex = subShader._passes.indexOf(this._shaderPass);
                    console.error(`${shader.name}_sub${subIndex}_pass${passIndex}`);
                    console.error(fragmentSpvRes.info_log);
                }
                let fragmentSpv = new Uint8Array(fragmentSpvRes.spirv.buffer, fragmentSpvRes.spirv.byteOffset, fragmentSpvRes.spirv.byteLength);
                vs_wgsl = engine.shaderCompiler.naga.spirv_to_wgsl(vertexSpirv, false);
                fs_wgsl = engine.shaderCompiler.naga.spirv_to_wgsl(fragmentSpv, false);
                if (!vs_wgsl || !fs_wgsl) {
                    let subShader = this._shaderPass._owner;
                    let shader = subShader._owner;
                    console.error(`LayaXShaderInstance: SPIR-V→WGSL conversion failed for ${shader.name}, vs_wgsl=${vs_wgsl ? 'ok' : 'EMPTY'}, fs_wgsl=${fs_wgsl ? 'ok' : 'EMPTY'}`);
                }
            }
            {
                for (const [setIndex, mapNames] of this._resourcesCacheKey) {
                    const bindings = this.bindingInfoMap.get(setIndex);
                    if (!bindings)
                        continue;
                    const textureExits = LayaXBindGroupHelper.computeTextureExits(setIndex, mapNames, bindings);
                    this.textureExitsMap.set(setIndex, textureExits);
                }
            }
            const propertySetMapJson = this._serializeBindingInfoMap();
            const textureExitsJson = this._serializeTextureExits();
            this._nativeObj = new window.conchLayaXShaderInstance();
            let programHandle = this._nativeObj.create(vs_wgsl, fs_wgsl, propertySetMapJson, textureExitsJson);
            if (!programHandle) {
                console.error(`LayaXShaderInstance: create program FAILED! propertySetMap=${propertySetMapJson.substring(0, 200)}`);
            }
        }
        _ensureCommandMapPopulated(mapName, shaderPass) {
            let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(mapName);
            if (mapName === shaderPass.name) {
                for (const [key, value] of shaderPass._owner._uniformMap) {
                    if (!map._idata.has(key)) {
                        if (value.arrayLength > 0) {
                            map.addShaderUniformArray(value.id, value.propertyName, value.uniformtype, value.arrayLength);
                        }
                        else {
                            map.addShaderUniform(value.id, value.propertyName, value.uniformtype);
                        }
                    }
                }
            }
        }
        _serializeBindingInfoMap() {
            const obj = {};
            for (const [setIndex, bindings] of this.bindingInfoMap) {
                obj[setIndex.toString()] = bindings.map(b => {
                    var _a, _b;
                    return ({
                        id: b.id,
                        name: b.name,
                        set: b.set,
                        binding: b.binding,
                        bindingType: b.bindingType,
                        dataType: b.dataType,
                        propertyId: b.propertyId,
                        sourceMapId: b.sourceMapId,
                        hasDynamicOffset: (_b = (_a = b.buffer) === null || _a === void 0 ? void 0 : _a.hasDynamicOffset) !== null && _b !== void 0 ? _b : false,
                        sampler: b.sampler,
                    });
                });
            }
            return JSON.stringify(obj);
        }
        _serializeTextureExits() {
            const obj = {};
            for (const [setIndex, bitmask] of this.textureExitsMap) {
                obj[setIndex.toString()] = bitmask;
            }
            return JSON.stringify(obj);
        }
        _disposeResource() {
            if (this._nativeObj) {
                this._nativeObj.destroy();
            }
            this.bindingInfoMap.clear();
            this._resourcesCacheKey.clear();
            this.textureExitsMap.clear();
        }
    }

    const _defineStrings = [];
    class LayaXComputeShaderInstance {
        constructor(name) {
            this.uniformSetMap = new Map();
            this.compilete = false;
            this.name = name;
        }
        compile(info) {
            const engine = LayaXRenderEngine._instance;
            const node = info.node;
            const compileDefine = info.defineData;
            _defineStrings.length = 0;
            Laya.Shader3D._getNamesByDefineData(compileDefine, _defineStrings);
            const commandMaps = info.uniformMaps;
            for (let i = 0, n = commandMaps.length; i < n; i++) {
                this.uniformSetMap.set(i, LayaXBindGroupHelper.createBindingInfoArray(i, [commandMaps[i]._stateName]));
            }
            this.uniformCommandMap = commandMaps;
            const processResult = LayaX_GLSLForVulkanGenerator.proccessCompute(_defineStrings, this.uniformCommandMap, this.uniformSetMap, node, info.name);
            const glsl = processResult.code;
            const splitSampler = processResult.hasSampler;
            const spvRes = engine.shaderCompiler.glslang.glsl450_combine_to_spirv(glsl, 'compute', splitSampler);
            if (!spvRes.success) {
                console.error(`LayaXComputeShaderInstance '${info.name}' compile error:`, spvRes.info_log);
                return;
            }
            const spirv = new Uint8Array(spvRes.spirv.buffer, spvRes.spirv.byteOffset, spvRes.spirv.byteLength);
            const wgsl = engine.shaderCompiler.naga.spirv_to_wgsl(spirv, false);
            if (!wgsl) {
                console.error(`LayaXComputeShaderInstance '${info.name}': SPIR-V→WGSL conversion failed`);
                return;
            }
            const propertySetMapJson = this._serializeBindingInfoMap();
            this._nativeObj = new window.conchLayaXComputeShaderInstance(wgsl, propertySetMapJson);
            if (!this._nativeObj || !this._nativeObj.getHandle()) {
                console.error(`[LayaX-DBG] create compute program '${info.name}' FAILED!`);
                return;
            }
            console.log(`[LayaX-DBG] create compute program '${info.name}': wgsl_len=${wgsl.length} sets=${Array.from(this.uniformSetMap.keys())}`);
            this.compilete = true;
        }
        _serializeBindingInfoMap() {
            const obj = {};
            for (const [setIndex, bindings] of this.uniformSetMap) {
                obj[setIndex.toString()] = bindings.map(b => {
                    var _a, _b;
                    return ({
                        id: b.id,
                        name: b.name,
                        set: b.set,
                        binding: b.binding,
                        bindingType: b.bindingType,
                        dataType: b.dataType,
                        propertyId: b.propertyId,
                        sourceMapId: b.sourceMapId,
                        hasDynamicOffset: (_b = (_a = b.buffer) === null || _a === void 0 ? void 0 : _a.hasDynamicOffset) !== null && _b !== void 0 ? _b : false,
                        sampler: b.sampler,
                    });
                });
            }
            return JSON.stringify(obj);
        }
    }

    class LayaXComputeContext {
        constructor() {
            this._destroyed = false;
            this._nativeObj = new window.conchLayaXComputeContext();
        }
        clearCMDs() {
            if (this._destroyed)
                return;
            this._nativeObj.clear();
        }
        addDispatchCommand(cmd) {
            if (this._destroyed)
                return;
            const shader = cmd.shader;
            if (!shader || !shader.compilete || !shader._nativeObj)
                return;
            const cmdMaps = shader.uniformCommandMap
                ? shader.uniformCommandMap.map(m => m._nativeObj)
                : [];
            const sdObjs = cmd.shaderData
                ? cmd.shaderData.map(sd => sd._nativeObj)
                : [];
            const p = cmd.dispatchParams;
            this._nativeObj.dispatch(shader._nativeObj, cmdMaps, sdObjs, p.x | 0, (p.y | 0) || 1, (p.z | 0) || 1);
        }
        addDispatchIndirectCommand(cmd) {
            if (this._destroyed)
                return;
            const shader = cmd.shader;
            if (!shader || !shader.compilete || !shader._nativeObj)
                return;
            const cmdMaps = shader.uniformCommandMap
                ? shader.uniformCommandMap.map(m => m._nativeObj)
                : [];
            const sdObjs = cmd.shaderData
                ? cmd.shaderData.map(sd => sd._nativeObj)
                : [];
            const indirectBuf = cmd.indirectBuffer;
            if (!(indirectBuf === null || indirectBuf === void 0 ? void 0 : indirectBuf._nativeObj))
                return;
            this._nativeObj.dispatchIndirect(shader._nativeObj, cmdMaps, sdObjs, indirectBuf._nativeObj, cmd.indirectOffset >>> 0);
        }
        addSetShaderDataCommand(shaderData, propertyID, shaderDataType, value) {
            var _a;
            if (this._destroyed || !shaderData)
                return;
            const sdNative = shaderData._nativeObj;
            if (!sdNative)
                return;
            switch (shaderDataType) {
                case Laya.ShaderDataType.Int:
                    this._nativeObj.setShaderDataInt(sdNative, propertyID, value | 0);
                    break;
                case Laya.ShaderDataType.Float:
                    this._nativeObj.setShaderDataFloat(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Bool:
                    this._nativeObj.setShaderDataBool(sdNative, propertyID, !!value);
                    break;
                case Laya.ShaderDataType.Vector2:
                    this._nativeObj.setShaderDataVec2(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Vector3:
                    this._nativeObj.setShaderDataVec3(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Vector4:
                    this._nativeObj.setShaderDataVec4(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Color: {
                    const c = value;
                    const v4 = new Laya.Vector4(c.r, c.g, c.b, c.a);
                    this._nativeObj.setShaderDataVec4(sdNative, propertyID, v4);
                    break;
                }
                case Laya.ShaderDataType.Matrix3x3:
                    this._nativeObj.setShaderDataMat3(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Matrix4x4:
                    this._nativeObj.setShaderDataMat4(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Buffer:
                    this._nativeObj.setShaderDataBuffer(sdNative, propertyID, value);
                    break;
                case Laya.ShaderDataType.Texture2D:
                case Laya.ShaderDataType.StorageTexture2D: {
                    let tex = value;
                    if (tex && tex.bitmap)
                        tex = tex.bitmap;
                    let texNative = null;
                    if (tex && tex._texture) {
                        const t = tex._texture;
                        if (t instanceof LayaXInternalRT) {
                            const colorTex = (_a = t._textures) === null || _a === void 0 ? void 0 : _a[0];
                            texNative = colorTex ? colorTex._nativeObj : null;
                        }
                        else {
                            texNative = t._nativeObj;
                        }
                    }
                    this._nativeObj.setShaderDataTexture(sdNative, propertyID, texNative);
                    break;
                }
                case Laya.ShaderDataType.DeviceBuffer:
                case Laya.ShaderDataType.ReadOnlyDeviceBuffer:
                    shaderData.setDeviceBuffer(propertyID, value);
                    break;
            }
        }
        addBufferToBufferCommand(src, dest, sourceOffset = 0, destinationOffset = 0, size) {
            if (this._destroyed)
                return;
            const srcNative = src === null || src === void 0 ? void 0 : src._nativeObj;
            const dstNative = dest === null || dest === void 0 ? void 0 : dest._nativeObj;
            if (!srcNative || !dstNative || !size || size <= 0)
                return;
            this._nativeObj.copyBuffer(srcNative, sourceOffset >>> 0, dstNative, destinationOffset >>> 0, size >>> 0);
        }
        addBufferToTextureCommand(_src, _srcInfo, _dstInfo, _copySize) {
        }
        addTextureToBufferCommand(_srcInfo, _dst, _dstInfo, _copySize) {
        }
        addTextureToTextureCommand(srcTextureInfo, destTextureInfo, copySize) {
            if (this._destroyed)
                return;
            const srcTex = srcTextureInfo === null || srcTextureInfo === void 0 ? void 0 : srcTextureInfo.texture;
            const dstTex = destTextureInfo === null || destTextureInfo === void 0 ? void 0 : destTextureInfo.texture;
            if (!(srcTex === null || srcTex === void 0 ? void 0 : srcTex._nativeObj) || !(dstTex === null || dstTex === void 0 ? void 0 : dstTex._nativeObj))
                return;
            const so = srcTextureInfo.origin;
            const dco = destTextureInfo.origin;
            const ext = LayaXComputeContext._extentToTuple(copySize);
            this._nativeObj.copyTexture(srcTex._nativeObj, srcTextureInfo.mipLevel >>> 0, so.x | 0, so.y | 0, so.z | 0, dstTex._nativeObj, destTextureInfo.mipLevel >>> 0, dco.x | 0, dco.y | 0, dco.z | 0, ext[0], ext[1], ext[2]);
        }
        addClearBufferCommand(dest, destoffset, destCount) {
            if (this._destroyed)
                return;
            const dstNative = dest === null || dest === void 0 ? void 0 : dest._nativeObj;
            if (!dstNative)
                return;
            this._nativeObj.clearBuffer(dstNative, destoffset >>> 0, destCount >>> 0);
        }
        executeCMDs() {
            if (this._destroyed)
                return;
            this._nativeObj.execute();
        }
        destroy() {
            if (this._destroyed)
                return;
            this._destroyed = true;
            this._nativeObj = null;
        }
        static _extentToTuple(extent) {
            var _a;
            if (extent && typeof extent[Symbol.iterator] === "function") {
                const arr = [];
                for (const v of extent) {
                    arr.push(v >>> 0);
                    if (arr.length === 3)
                        break;
                }
                while (arr.length < 3)
                    arr.push(arr.length === 2 ? 1 : 0);
                return [arr[0], arr[1], arr[2]];
            }
            const e = extent;
            return [(e.width >>> 0) || 0, (e.height >>> 0) || 0, (((_a = e.depthOrArrayLayers) !== null && _a !== void 0 ? _a : 1) >>> 0) || 1];
        }
    }

    function isLayaXRuntime() {
        return Laya.LayaEnv.isLayaX || (typeof window !== "undefined" && window.conchLayaXDevice != null);
    }
    class LayaXRenderDeviceFactory {
        constructor() {
            this.globalBlockMap = {};
        }
        createShaderData(ownerResource) {
            return new LayaXShaderData(ownerResource);
        }
        createGlobalUniformMap(blockName) {
            let comMap = this.globalBlockMap[blockName];
            if (!comMap)
                comMap = this.globalBlockMap[blockName] = new LayaXCommandUniformMap(blockName);
            return comMap;
        }
        createComputeShader(info) {
            const shader = new LayaXComputeShaderInstance(info.name);
            shader.compile(info);
            return shader;
        }
        createComputeContext() {
            return new LayaXComputeContext();
        }
        createShaderInstance(shaderProcessInfo, shaderPass) {
            let shaderIns = new LayaXShaderInstance();
            shaderIns._create(shaderProcessInfo, shaderPass);
            if (Laya.Shader3D.debugMode) {
                let defineString = shaderProcessInfo.defineString;
                let is2D = shaderProcessInfo.is2D;
                Laya.ShaderVariantCollection.active.add(shaderPass, defineString, is2D);
            }
            return shaderIns;
        }
        createIndexBuffer(bufferUsage) {
            return new LayaXIndexBuffer(bufferUsage);
        }
        createVertexBuffer(bufferUsageType) {
            return new LayaXVertexBuffer(bufferUsageType);
        }
        createDeviceBuffer(type) {
            return new LayaXDeviceBuffer(type);
        }
        createBufferState() {
            return new LayaXBufferState();
        }
        createRenderGeometryElement(mode, drawType) {
            return new LayaXRenderGeometry(mode, drawType);
        }
        async createEngine(config, canvas) {
            Laya.TextRenderConfig.premultiplyAlpha = true;
            let engine = new LayaXRenderEngine();
            engine.initRenderEngine(canvas.source);
            new Laya.LayaGL();
            Laya.LayaGL.renderEngine = engine;
            Laya.LayaGL.textureContext = engine.getTextureContext();
            await engine.shaderCompiler.init();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (isLayaXRuntime()) {
            if (!Laya.LayaGL.renderDeviceFactory)
                Laya.LayaGL.renderDeviceFactory = new LayaXRenderDeviceFactory();
        }
    });

    class LayaXRenderState extends Laya.RenderState {
        createObj() {
            this._nativeObj = null;
        }
        constructor() {
            super();
        }
        cloneTo(dest) {
            super.cloneTo(dest);
        }
        clone() {
            let state = new LayaXRenderState();
            this.cloneTo(state);
            return state;
        }
    }

    class LayaXShaderPass {
        constructor(pass) {
            this._statefirst = false;
            this.is2D = false;
            this.name = "";
            this.nodeCommonMap = [];
            this.additionShaderData = [];
            this.attributeLocations = new Set();
            this.compileSetMapNames = null;
            this._pass = pass;
            this._nativeObj = new window.conchLayaXShaderPass();
            this._nativeObj.create();
            this._validDefine = new LayaXDefineDatas();
            this._renderState = new LayaXRenderState();
            this._renderState.setNull();
            this._compileCallbackBound = this._onCompileCallback.bind(this);
            this._nativeObj.setCompileCallback(this._compileCallbackBound);
        }
        get pipelineMode() {
            return this._nativeObj._pipelineMode || "";
        }
        set pipelineMode(value) {
            this._nativeObj.setPipelineMode(value);
        }
        get validDefine() {
            return this._validDefine;
        }
        set validDefine(value) {
            this._validDefine = value;
            this._nativeObj.setValidDefine(this._validDefine._nativeObj);
        }
        get renderState() {
            return this._renderState;
        }
        set renderState(value) {
            this._renderState = value;
        }
        get statefirst() {
            return this._statefirst;
        }
        set statefirst(value) {
            var _a, _b, _c, _d;
            this._statefirst = value;
            (_b = (_a = this._nativeObj) === null || _a === void 0 ? void 0 : _a.setStateFirst) === null || _b === void 0 ? void 0 : _b.call(_a, value);
            if (!value) {
                (_d = (_c = this._nativeObj) === null || _c === void 0 ? void 0 : _c.setRenderStateMask) === null || _d === void 0 ? void 0 : _d.call(_c, 0);
            }
        }
        syncOwnerUniformMap() {
            this._pass._owner.moduleData.setUniformMap(this._pass._owner._uniformMap);
        }
        _parseSetMapNames(str) {
            const result = new Map();
            if (!str)
                return result;
            const parts = str.split(';');
            for (const part of parts) {
                const colonIdx = part.indexOf(':');
                if (colonIdx < 0)
                    continue;
                const setIndex = parseInt(part.substring(0, colonIdx));
                const namesStr = part.substring(colonIdx + 1);
                const names = namesStr ? namesStr.split(',').filter(n => n.length > 0) : [];
                if (!isNaN(setIndex)) {
                    result.set(setIndex, names);
                }
            }
            return result;
        }
        _parseAttributeLocations(str) {
            const result = new Set();
            if (!str)
                return result;
            const parts = str.split(',');
            for (const part of parts) {
                const num = parseInt(part);
                if (!isNaN(num)) {
                    result.add(num);
                }
            }
            return result;
        }
        _syncRenderState() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
            const rs = this._renderState;
            if (!rs)
                return;
            const isSet = (value) => value !== null && value !== undefined;
            const mask = (isSet(rs.blend) ? 1 << 0 : 0) |
                (isSet(rs.srcBlend) ? 1 << 1 : 0) |
                (isSet(rs.dstBlend) ? 1 << 2 : 0) |
                (isSet(rs.blendEquation) ? 1 << 3 : 0) |
                (isSet(rs.srcBlendRGB) ? 1 << 4 : 0) |
                (isSet(rs.dstBlendRGB) ? 1 << 5 : 0) |
                (isSet(rs.srcBlendAlpha) ? 1 << 6 : 0) |
                (isSet(rs.dstBlendAlpha) ? 1 << 7 : 0) |
                (isSet(rs.blendEquationRGB) ? 1 << 8 : 0) |
                (isSet(rs.blendEquationAlpha) ? 1 << 9 : 0) |
                (isSet(rs.depthTest) ? 1 << 10 : 0) |
                (isSet(rs.depthWrite) ? 1 << 11 : 0) |
                (isSet(rs.stencilTest) ? 1 << 12 : 0) |
                (isSet(rs.stencilRef) ? 1 << 13 : 0) |
                (isSet(rs.stencilReadMask) ? 1 << 14 : 0) |
                (isSet(rs.stencilWriteMask) ? 1 << 15 : 0) |
                (isSet((_a = rs.stencilOp) === null || _a === void 0 ? void 0 : _a.x) ? 1 << 16 : 0) |
                (isSet((_b = rs.stencilOp) === null || _b === void 0 ? void 0 : _b.y) ? 1 << 17 : 0) |
                (isSet((_c = rs.stencilOp) === null || _c === void 0 ? void 0 : _c.z) ? 1 << 18 : 0) |
                (isSet(rs.cull) ? 1 << 19 : 0) |
                (isSet(rs.stencilWrite) ? 1 << 20 : 0) |
                (isSet(rs.depthBias) ? 1 << 21 : 0) |
                (isSet(rs.depthBiasConstant) ? 1 << 22 : 0) |
                (isSet(rs.depthBiasSlopeScale) ? 1 << 23 : 0) |
                (isSet(rs.depthBiasClamp) ? 1 << 24 : 0);
            if (mask === 0) {
                (_e = (_d = this._nativeObj) === null || _d === void 0 ? void 0 : _d.setRenderStateMask) === null || _e === void 0 ? void 0 : _e.call(_d, 0);
                return;
            }
            const D = Laya.RenderState.Default;
            const depthWrite = (_f = rs.depthWrite) !== null && _f !== void 0 ? _f : D.depthWrite;
            const rsHandle = this._nativeObj.registerRenderState((_g = rs.blend) !== null && _g !== void 0 ? _g : D.blend, (_h = rs.srcBlend) !== null && _h !== void 0 ? _h : D.srcBlend, (_j = rs.dstBlend) !== null && _j !== void 0 ? _j : D.dstBlend, (_k = rs.blendEquation) !== null && _k !== void 0 ? _k : D.blendEquation, (_l = rs.srcBlendRGB) !== null && _l !== void 0 ? _l : D.srcBlendRGB, (_m = rs.dstBlendRGB) !== null && _m !== void 0 ? _m : D.dstBlendRGB, (_o = rs.srcBlendAlpha) !== null && _o !== void 0 ? _o : D.srcBlendAlpha, (_p = rs.dstBlendAlpha) !== null && _p !== void 0 ? _p : D.dstBlendAlpha, (_q = rs.blendEquationRGB) !== null && _q !== void 0 ? _q : D.blendEquationRGB, (_r = rs.blendEquationAlpha) !== null && _r !== void 0 ? _r : D.blendEquationAlpha, (_s = rs.depthTest) !== null && _s !== void 0 ? _s : D.depthTest, depthWrite ? 1 : 0, (_t = rs.stencilTest) !== null && _t !== void 0 ? _t : D.stencilTest, ((_u = rs.stencilWrite) !== null && _u !== void 0 ? _u : D.stencilWrite) ? 1 : 0, (_v = rs.stencilRef) !== null && _v !== void 0 ? _v : D.stencilRef, (_w = rs.stencilReadMask) !== null && _w !== void 0 ? _w : 0xFF, (_x = rs.stencilWriteMask) !== null && _x !== void 0 ? _x : 0xFF, (_z = (_y = rs.stencilOp) === null || _y === void 0 ? void 0 : _y.x) !== null && _z !== void 0 ? _z : D.stencilOp.x, (_1 = (_0 = rs.stencilOp) === null || _0 === void 0 ? void 0 : _0.y) !== null && _1 !== void 0 ? _1 : D.stencilOp.y, (_3 = (_2 = rs.stencilOp) === null || _2 === void 0 ? void 0 : _2.z) !== null && _3 !== void 0 ? _3 : D.stencilOp.z, ((_4 = rs.depthBias) !== null && _4 !== void 0 ? _4 : D.depthBias) ? 1 : 0, (_5 = rs.depthBiasConstant) !== null && _5 !== void 0 ? _5 : D.depthBiasConstant, (_6 = rs.depthBiasSlopeScale) !== null && _6 !== void 0 ? _6 : D.depthBiasSlopeScale, (_7 = rs.depthBiasClamp) !== null && _7 !== void 0 ? _7 : D.depthBiasClamp, (_8 = rs.cull) !== null && _8 !== void 0 ? _8 : D.cull, 1);
            if (rsHandle) {
                (_10 = (_9 = this._nativeObj) === null || _9 === void 0 ? void 0 : _9.setRenderStateMask) === null || _10 === void 0 ? void 0 : _10.call(_9, mask);
                this._nativeObj.setRenderState(rsHandle);
            }
            else {
                (_12 = (_11 = this._nativeObj) === null || _11 === void 0 ? void 0 : _11.setRenderStateMask) === null || _12 === void 0 ? void 0 : _12.call(_11, 0);
            }
        }
        _onCompileCallback(defineNamesStr, setMapNamesStr, attributeLocationsStr) {
            var _a, _b, _c, _d, _e;
            this._syncRenderState();
            const defineStrings = defineNamesStr
                ? defineNamesStr.split('\n').filter(s => s.length > 0)
                : [];
            this.compileSetMapNames = this._parseSetMapNames(setMapNamesStr);
            this.attributeLocations = this._parseAttributeLocations(attributeLocationsStr);
            const shaderProcessInfo = {
                is2D: this.is2D,
                vs: this._pass._VS,
                ps: this._pass._PS,
                attributeMap: this._pass._owner._attributeMap,
                uniformMap: this._pass._owner._uniformMap,
                defineString: defineStrings,
            };
            try {
                const shaderInstance = Laya.LayaGL.renderDeviceFactory.createShaderInstance(shaderProcessInfo, this._pass);
                if (shaderInstance && shaderInstance._nativeObj) {
                    return shaderInstance._nativeObj;
                }
                console.error(`LayaXShaderPass compile callback: shaderInstance or _nativeObj is null`);
            }
            catch (e) {
                const shaderName = ((_b = (_a = this._pass._owner) === null || _a === void 0 ? void 0 : _a._owner) === null || _b === void 0 ? void 0 : _b.name) || "unknown";
                const passIdx = (_e = (_d = (_c = this._pass._owner) === null || _c === void 0 ? void 0 : _c._passes) === null || _d === void 0 ? void 0 : _d.indexOf(this._pass)) !== null && _e !== void 0 ? _e : -1;
                console.error(`LayaXShaderPass compile callback failed: ${shaderName}_pass${passIdx} defines=[${defineNamesStr === null || defineNamesStr === void 0 ? void 0 : defineNamesStr.replace(/\n/g, ',')}]`, e);
            }
            return null;
        }
        setCacheShader(defines, shaderInstance) {
        }
        getCacheShader(defines) {
            return null;
        }
        destroy() {
            if (this._nativeObj) {
                this._nativeObj.destroy();
            }
            if (this._validDefine) {
                this._validDefine.destroy();
            }
        }
    }

    class LayaXSubShader {
        constructor() {
            this._shaderName = "";
            this._pendingUniformMap = null;
            this._uniformPropertyIds = new Set();
            this._nativeObj = new window.conchLayaXSubShader();
            this._nativeObj.create();
        }
        get shaderName() {
            return this._shaderName;
        }
        set shaderName(value) {
            this._shaderName = value;
            this._nativeObj.setName(value);
            this._ensureMaterialMap();
        }
        get enableInstance() {
            return false;
        }
        set enableInstance(value) {
            this._nativeObj.setEnableInstance(value);
        }
        setUniformMap(_uniformMap) {
            this._syncUniformProperties(_uniformMap);
            this._pendingUniformMap = _uniformMap;
            this._ensureMaterialMap();
        }
        _syncUniformProperties(uniformMap) {
            uniformMap.forEach((value) => {
                if (this._uniformPropertyIds.has(value.id)) {
                    return;
                }
                this._nativeObj.addUniformProperty(value.id, value.propertyName, value.uniformtype, value.arrayLength);
                this._uniformPropertyIds.add(value.id);
            });
        }
        _ensureMaterialMap() {
            if (!this._pendingUniformMap || !this._shaderName)
                return;
            let map = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(this._shaderName);
            this._pendingUniformMap.forEach((value) => {
                if (map._idata.has(value.id)) {
                    return;
                }
                if (value.arrayLength > 0) {
                    map.addShaderUniformArray(value.id, value.propertyName, value.uniformtype, value.arrayLength);
                }
                else {
                    map.addShaderUniform(value.id, value.propertyName, value.uniformtype);
                }
            });
            this._pendingUniformMap = null;
        }
        addShaderPass(pass) {
            const layaxPass = pass;
            layaxPass.syncOwnerUniformMap();
            this._nativeObj.addShaderPass(layaxPass._nativeObj);
        }
        get handle() {
            return this._nativeObj.handle;
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class LayaXUnitRenderModuleDataFactory {
        createRenderState() {
            return new LayaXRenderState();
        }
        createDefineDatas() {
            return new LayaXDefineDatas();
        }
        createSubShader() {
            return new LayaXSubShader();
        }
        createShaderPass(pass) {
            return new LayaXShaderPass(pass);
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.unitRenderModuleDataFactory)
            Laya.LayaGL.unitRenderModuleDataFactory = new LayaXUnitRenderModuleDataFactory();
    });

    class LayaXShaderCompileCode {
        static processVS(vs, defineString) {
            return LayaXShaderCompileCode._injectDefines(vs, defineString);
        }
        static processFS(fs, defineString) {
            return LayaXShaderCompileCode._injectDefines(fs, defineString);
        }
        static _injectDefines(source, defineString) {
            if (!defineString || defineString.length === 0) {
                return source;
            }
            const versionIdx = source.indexOf("#version");
            if (versionIdx >= 0) {
                const lineEnd = source.indexOf("\n", versionIdx);
                if (lineEnd >= 0) {
                    return source.substring(0, lineEnd + 1) + defineString + "\n" + source.substring(lineEnd + 1);
                }
            }
            return defineString + "\n" + source;
        }
    }

    class LayaXShaderCompileUtil {
        static stripInlinePrecision(source) {
            return source.replace(/(?<!precision\s+)(lowp|mediump|highp)\s+/g, '');
        }
        static ensureVersion(source, version = "#version 300 es") {
            if (source.indexOf("#version") >= 0) {
                return source;
            }
            return version + "\n" + source;
        }
        static processVS(vs, defineString) {
            let result = LayaXShaderCompileCode.processVS(vs, defineString);
            result = LayaXShaderCompileUtil.ensureVersion(result);
            return result;
        }
        static processFS(fs, defineString) {
            let result = LayaXShaderCompileCode.processFS(fs, defineString);
            result = LayaXShaderCompileUtil.ensureVersion(result);
            return result;
        }
        static upgradeTextureCalls(source) {
            if (source.indexOf("#version 300 es") < 0 && source.indexOf("#version 310 es") < 0) {
                return source;
            }
            let result = source;
            result = result.replace(/\btexture2DLodEXT\b/g, 'textureLod');
            result = result.replace(/\btexture2DProjLodEXT\b/g, 'textureProjLod');
            result = result.replace(/\btextureCubeLodEXT\b/g, 'textureLod');
            result = result.replace(/\btexture2DGradEXT\b/g, 'textureGrad');
            result = result.replace(/\btexture2DProjGradEXT\b/g, 'textureProjGrad');
            result = result.replace(/\btextureCubeGradEXT\b/g, 'textureGrad');
            return result;
        }
        static removeUnsupportedExtensions(source) {
            return source.replace(/^\s*#\s*extension\s+(GL_EXT_shader_texture_lod|GL_OES_standard_derivatives)\s*:\s*\w+\s*$/gm, '');
        }
        static prepareForNative(source, isVertex) {
            let result = source;
            result = LayaXShaderCompileUtil.ensureVersion(result);
            result = LayaXShaderCompileUtil.removeUnsupportedExtensions(result);
            result = LayaXShaderCompileUtil.upgradeTextureCalls(result);
            return result;
        }
    }

    class RTDefineDatas {
        constructor() {
            this._nativeObj = new window.conchRTDefineDatas();
        }
        get _length() {
            return this._nativeObj._length;
        }
        set _length(value) {
            this._nativeObj._length = value;
        }
        get _mask() {
            return this._nativeObj._mask;
        }
        set _mask(value) {
            this._nativeObj._mask = value;
        }
        _intersectionDefineDatas(define) {
            this._nativeObj._intersectionDefineDatas(define);
        }
        add(define) {
            this._nativeObj.add(define);
        }
        remove(define) {
            this._nativeObj.remove(define);
        }
        addDefineDatas(define) {
            this._nativeObj.addDefineDatas(define._nativeObj);
        }
        removeDefineDatas(define) {
            this._nativeObj.removeDefineDatas(define._nativeObj);
        }
        has(define) {
            return this._nativeObj.has(define);
        }
        clear() {
            this._nativeObj.clear();
        }
        cloneTo(destObject) {
            this._nativeObj.cloneTo(destObject._nativeObj);
        }
        clone() {
            var dest = new RTDefineDatas();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class RTRenderState extends Laya.RenderState {
        set cull(value) {
            this._nativeObj.cull = value;
        }
        get cull() {
            return this._nativeObj.cull;
        }
        set blend(value) {
            this._nativeObj.blend = value;
        }
        get blend() {
            return this._nativeObj.blend;
        }
        set srcBlend(value) {
            this._nativeObj.srcBlend = value;
        }
        get srcBlend() {
            return this._nativeObj.srcBlend;
        }
        set dstBlend(value) {
            this._nativeObj.dstBlend = value;
        }
        get dstBlend() {
            return this._nativeObj.dstBlend;
        }
        set srcBlendRGB(value) {
            this._nativeObj.srcBlendRGB = value;
        }
        get srcBlendRGB() {
            return this._nativeObj.srcBlendRGB;
        }
        set dstBlendRGB(value) {
            this._nativeObj.dstBlendRGB = value;
        }
        get dstBlendRGB() {
            return this._nativeObj.dstBlendRGB;
        }
        set srcBlendAlpha(value) {
            this._nativeObj.srcBlendAlpha = value;
        }
        get srcBlendAlpha() {
            return this._nativeObj.srcBlendAlpha;
        }
        set dstBlendAlpha(value) {
            this._nativeObj.dstBlendAlpha = value;
        }
        get dstBlendAlpha() {
            return this._nativeObj.dstBlendAlpha;
        }
        set blendEquation(value) {
            this._nativeObj.blendEquation = value;
        }
        get blendEquation() {
            return this._nativeObj.blendEquation;
        }
        set blendEquationRGB(value) {
            this._nativeObj.blendEquationRGB = value;
        }
        get blendEquationRGB() {
            return this._nativeObj.blendEquationRGB;
        }
        set blendEquationAlpha(value) {
            this._nativeObj.blendEquationAlpha = value;
        }
        get blendEquationAlpha() {
            return this._nativeObj.blendEquationAlpha;
        }
        set depthTest(value) {
            this._nativeObj.depthTest = value;
        }
        get depthTest() {
            return this._nativeObj.depthTest;
        }
        set depthWrite(value) {
            this._nativeObj.depthWrite = value;
        }
        get depthWrite() {
            return this._nativeObj.depthWrite;
        }
        set stencilWrite(value) {
            this._nativeObj.stencilWrite = value;
        }
        get stencilWrite() {
            return this._nativeObj.stencilWrite;
        }
        set stencilTest(value) {
            this._nativeObj.stencilTest = value;
        }
        get stencilTest() {
            return this._nativeObj.stencilTest;
        }
        set stencilRef(value) {
            this._nativeObj.stencilRef = value;
        }
        get stencilRef() {
            return this._nativeObj.stencilRef;
        }
        set stencilOp(value) {
            this._nativeObj.setStencilOp(value);
        }
        get stencilOp() {
            let value = this._nativeObj.getStencilOp();
            let _tempVector3 = new Laya.Vector3();
            _tempVector3.x = value.x;
            _tempVector3.y = value.y;
            _tempVector3.z = value.z;
            return _tempVector3;
        }
        get stencilWriteMask() {
            return this._nativeObj.stencilWriteMask;
        }
        set stencilWriteMask(value) {
            this._nativeObj.stencilWriteMask = value;
        }
        get stencilReadMask() {
            return this._nativeObj.stencilReadMask;
        }
        set stencilReadMask(value) {
            this._nativeObj.stencilReadMask = value;
        }
        get depthBias() {
            return this._nativeObj.depthBias;
        }
        set depthBias(value) {
            this._nativeObj.depthBias = value;
        }
        get depthBiasConstant() {
            return this._nativeObj.depthBiasConstant;
        }
        set depthBiasConstant(value) {
            this._nativeObj.depthBiasConstant = value;
        }
        get depthBiasSlopeScale() {
            return this._nativeObj.depthBiasSlopeScale;
        }
        set depthBiasSlopeScale(value) {
            this._nativeObj.depthBiasSlopeScale = value;
        }
        get depthBiasClamp() {
            return this._nativeObj.depthBiasClamp;
        }
        set depthBiasClamp(value) {
            this._nativeObj.depthBiasClamp = value;
        }
        setNull() {
            this._nativeObj.setNull();
        }
        createObj() {
            this._nativeObj = new window.conchRenderState();
        }
        constructor() {
            super();
        }
        cloneTo(dest) {
            this._nativeObj.cloneTo(dest._nativeObj);
        }
        clone() {
            let state = new RTRenderState();
            this.cloneTo(state);
            return state;
        }
    }

    class RTShaderPass {
        constructor(pass) {
            this._validDefine = new RTDefineDatas();
            this.is2D = false;
            this._nativeObj = new window.conchRTShaderPass();
            this._createShaderInstanceFun = this.nativeCreateShaderInstance.bind(this);
            this._nativeObj.setCreateShaderInstanceFunction(this._createShaderInstanceFun);
            this.renderState = new RTRenderState();
            this.renderState.setNull();
            this._pass = pass;
        }
        get additionShaderData() {
            return this._additionShaderData;
        }
        set additionShaderData(value) {
            this._additionShaderData = value;
            this._nativeObj.setAdditionShaderData(value);
        }
        get nodeCommonMap() {
            return this._nodeCommonMap;
        }
        set nodeCommonMap(value) {
            this._nativeObj.setCommonUniformMap(value);
        }
        static getGlobalCompileDefine() {
            if (!RTShaderPass._globalCompileDefine) {
                RTShaderPass._globalCompileDefine = new RTDefineDatas();
            }
            return RTShaderPass._globalCompileDefine;
        }
        get statefirst() {
            return this._nativeObj._statefirst;
        }
        set statefirst(value) {
            this._nativeObj._statefirst = value;
        }
        get renderState() {
            return this._renderState;
        }
        set renderState(value) {
            this._renderState = value;
            this._nativeObj.setRenderState(value._nativeObj);
        }
        get pipelineMode() {
            return this._nativeObj._pipelineMode;
        }
        set pipelineMode(value) {
            this._nativeObj._pipelineMode = value;
        }
        get validDefine() {
            return this._validDefine;
        }
        set validDefine(value) {
            this._validDefine = value;
            this._nativeObj.setValidDefine(value._nativeObj);
        }
        nativeCreateShaderInstance() {
            var shaderIns = this._pass.withCompile(RTShaderPass.getGlobalCompileDefine(), this._nativeObj.is2D);
            return shaderIns._nativeObj;
        }
        destroy() {
            this._nativeObj.destroy();
        }
        setCacheShader(defines, shaderInstance) {
            this._nativeObj.setCacheShader(defines._nativeObj, shaderInstance._nativeObj, shaderInstance);
        }
        getCacheShader(defines) {
            return this._nativeObj.getCacheShader(defines._nativeObj);
        }
    }
    RTShaderPass._globalCompileDefine = null;

    class RTStatisContext extends Laya.DefaultStaticsContext {
        constructor() {
            super();
            this._nativeObj = new window.conchRTStatisContext();
            this._nativeObj.setStatShareBuffer(this._stateArrayMemory._buffer);
            this._nativeObj.setTimeShareBuffer(this._timeArrayMemory._buffer);
        }
        _createStatBuffer() {
            this._stateArrayMemory = new NativeMemory(Laya.StatElement.StatEnd * 4, false);
            this._statArray = this._stateArrayMemory.float32Array;
            this._timeArrayMemory = new NativeMemory(Laya.StatElement.StatEnd * 4, false);
            this._timeArray = this._timeArrayMemory.float32Array;
        }
    }

    class RTSubShader {
        constructor() {
            this._nativeObj = new window.conchRTSubShader();
        }
        get shaderName() {
            return this._shaderName;
        }
        set shaderName(value) {
            this._shaderName = value;
            this._nativeObj.shaderName = value;
        }
        setUniformMap(_uniformMap) {
            _uniformMap.forEach((value, key) => {
                this._nativeObj.addUnifromProperty(value.id, value.propertyName, value.uniformtype, value.arrayLength);
            });
        }
        get enableInstance() {
            return this._nativeObj.enableInstance;
        }
        set enableInstance(value) {
            this._nativeObj.enableInstance = value;
        }
        destroy() {
            this._nativeObj.destroy();
        }
        addShaderPass(pass) {
            this._nativeObj.addShaderPass(pass._nativeObj);
        }
    }

    class RTUintRenderModuleDataFactory {
        createSubShader() {
            return new RTSubShader();
        }
        createShaderPass(pass) {
            return new RTShaderPass(pass);
        }
        createRenderState() {
            return new RTRenderState();
        }
        createDefineDatas() {
            return new RTDefineDatas();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.unitRenderModuleDataFactory)
            Laya.LayaGL.unitRenderModuleDataFactory = new RTUintRenderModuleDataFactory();
    });

    exports.CommonMemoryAllocater = CommonMemoryAllocater;
    exports.LayaXBindGroupHelper = LayaXBindGroupHelper;
    exports.LayaXBlit2DQuadCMD = LayaXBlit2DQuadCMD;
    exports.LayaXBufferState = LayaXBufferState;
    exports.LayaXCommandUniformMap = LayaXCommandUniformMap;
    exports.LayaXComputeContext = LayaXComputeContext;
    exports.LayaXComputeShaderInstance = LayaXComputeShaderInstance;
    exports.LayaXDefineDatas = LayaXDefineDatas;
    exports.LayaXDeviceBuffer = LayaXDeviceBuffer;
    exports.LayaXDraw2DElementCMD = LayaXDraw2DElementCMD;
    exports.LayaXIndexBuffer = LayaXIndexBuffer;
    exports.LayaXInternalRT = LayaXInternalRT;
    exports.LayaXInternalTex = LayaXInternalTex;
    exports.LayaXPrimitiveRenderElement2D = LayaXPrimitiveRenderElement2D;
    exports.LayaXReadbackDispatcher = LayaXReadbackDispatcher;
    exports.LayaXRender2DProcess = LayaXRender2DProcess;
    exports.LayaXRenderContext2D = LayaXRenderContext2D;
    exports.LayaXRenderDeviceFactory = LayaXRenderDeviceFactory;
    exports.LayaXRenderElement2D = LayaXRenderElement2D;
    exports.LayaXRenderEngine = LayaXRenderEngine;
    exports.LayaXRenderGeometry = LayaXRenderGeometry;
    exports.LayaXRenderState = LayaXRenderState;
    exports.LayaXSetRenderData = LayaXSetRenderData;
    exports.LayaXSetRendertarget2DCMD = LayaXSetRendertarget2DCMD;
    exports.LayaXSetShaderDefine = LayaXSetShaderDefine;
    exports.LayaXShaderCompileCode = LayaXShaderCompileCode;
    exports.LayaXShaderCompileUtil = LayaXShaderCompileUtil;
    exports.LayaXShaderCompiler = LayaXShaderCompiler;
    exports.LayaXShaderData = LayaXShaderData;
    exports.LayaXShaderInstance = LayaXShaderInstance;
    exports.LayaXShaderPass = LayaXShaderPass;
    exports.LayaXSubShader = LayaXSubShader;
    exports.LayaXTextureContext = LayaXTextureContext;
    exports.LayaXUnitRenderModuleDataFactory = LayaXUnitRenderModuleDataFactory;
    exports.LayaXVertexBuffer = LayaXVertexBuffer;
    exports.LayaX_GLSLForVulkanGenerator = LayaX_GLSLForVulkanGenerator;
    exports.NativeMemory = NativeMemory;
    exports.RT2DGraphic2DIndexDataView = RT2DGraphic2DIndexDataView;
    exports.RT2DGraphic2DVertexDataView = RT2DGraphic2DVertexDataView;
    exports.RT2DGraphicIndexBuffer = RT2DGraphicIndexBuffer;
    exports.RT2DGraphicVertexBuffer = RT2DGraphicVertexBuffer;
    exports.RTBaseRenderDataHandle = RTBaseRenderDataHandle;
    exports.RTDefineDatas = RTDefineDatas;
    exports.RTEmptyRender2DDataHandle = RTEmptyRender2DDataHandle;
    exports.RTGlobalRenderData = RTGlobalRenderData;
    exports.RTGraphics2DBufferBlock = RTGraphics2DBufferBlock;
    exports.RTGraphics2DVertexBlock = RTGraphics2DVertexBlock;
    exports.RTMesh2DRenderDataHandle = RTMesh2DRenderDataHandle;
    exports.RTPrimitiveDataHandle = RTPrimitiveDataHandle;
    exports.RTRender2DDataHandle = RTRender2DDataHandle;
    exports.RTRender2DPass = RTRender2DPass;
    exports.RTRender2DPassManager = RTRender2DPassManager;
    exports.RTRenderState = RTRenderState;
    exports.RTRenderStruct2D = RTRenderStruct2D;
    exports.RTShaderDefine = RTShaderDefine;
    exports.RTShaderPass = RTShaderPass;
    exports.RTSpineRenderDataHandle = RTSpineRenderDataHandle;
    exports.RTStatisContext = RTStatisContext;
    exports.RTSubShader = RTSubShader;
    exports.RTUintRenderModuleDataFactory = RTUintRenderModuleDataFactory;
    exports.getTypeDefaultString = getTypeDefaultString;
    exports.getTypeString = getTypeString;
    exports.isSamplerType = isSamplerType;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.LayaX_2D.js.map
