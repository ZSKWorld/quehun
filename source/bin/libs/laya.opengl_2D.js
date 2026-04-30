(function (exports, Laya) {
    'use strict';

    class GLESSetRendertarget2DCMD extends Laya.SetRendertarget2DCMD {
        constructor() {
            super();
            this._nativeObj = new window.conchGLESSetRendertarget2DCMD();
            this.type = Laya.RenderCMDType.ChangeRenderTarget;
            this._clearColorValue = new Laya.Color();
        }
        get invertY() {
            return this._invertY;
        }
        set invertY(value) {
            this._invertY = value;
            this._nativeObj.setinvertY(value);
        }
        get clearColorValue() {
            return this._clearColorValue;
        }
        set clearColorValue(value) {
            value.cloneTo(this._clearColorValue);
            this._nativeObj.clearColorValue(value);
        }
        get rt() {
            return this._rt;
        }
        set rt(value) {
            this._rt = value;
            if (value) {
                this._nativeObj.setRT(value._nativeObj, this.size.x, this.size.y);
            }
            else {
                this._nativeObj.setRT(null, this.size.x, this.size.y);
            }
        }
        get clearColor() {
            return this._clearColor;
        }
        set clearColor(value) {
            this._clearColor = value;
            this._nativeObj.setClearColor(value);
        }
        get viewportX() {
            return this._viewportX;
        }
        set viewportX(value) {
            this._viewportX = value;
            this._nativeObj.setViewportX(value);
        }
        get viewportY() {
            return this._viewportY;
        }
        set viewportY(value) {
            this._viewportY = value;
            this._nativeObj.setViewportY(value);
        }
    }
    class GLESDraw2DElementCMD extends Laya.Draw2DElementCMD {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.DrawElement;
            this._nativeObj = new window.conchGLESDraw2DElementCMD();
        }
        setRenderelements(value) {
            this._elemets = value;
            this._nativeObj.clearElement();
            if (value.length == 1) {
                this._nativeObj.addOneElement(value[0]._nativeObj);
            }
            else {
                value.forEach(element => {
                    this._nativeObj.addOneElement(element._nativeObj);
                });
            }
        }
    }
    class GLESBlit2DQuadCMD extends Laya.Blit2DQuadCMD {
        constructor() {
            super();
            this._nativeObj = new window.conchGLESBlit2DQuadCMD();
            this.type = Laya.RenderCMDType.Blit;
            this._offsetScale = new Laya.Vector4();
        }
        set source(value) {
            this._source = value;
            this._nativeObj.setSource(value._nativeObj);
        }
        get source() {
            return this._source;
        }
        get element() {
            return this._element;
        }
        set element(value) {
            this._element = value;
            this._nativeObj.setRenderElement(value._nativeObj);
        }
        get dest() {
            return this._dest;
        }
        set dest(value) {
            this._dest = value;
            this._nativeObj.setDest(value ? value._nativeObj : null);
        }
        get offsetScale() {
            return this._offsetScale;
        }
        set offsetScale(value) {
            value.cloneTo(this._offsetScale);
            this._nativeObj.setOffsetScale(this._offsetScale);
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

    class GLESRenderElement2D {
        set type(value) {
            this._nativeObj.type = value;
        }
        get type() {
            return this._nativeObj.type;
        }
        set geometry(data) {
            this._geometry = data;
            this._nativeObj.setGeometry(data ? data._nativeObj : null);
        }
        get geometry() {
            return this._geometry;
        }
        set materialShaderData(data) {
            this._materialShaderData = data;
            this._nativeObj.setMaterialShaderData(data ? data._nativeObj : null);
        }
        get materialShaderData() {
            return this._materialShaderData;
        }
        set value2DShaderData(data) {
            this._value2DShaderData = data;
            this._nativeObj.setValue2DShaderData(data ? data._nativeObj : null);
        }
        get value2DShaderData() {
            return this._value2DShaderData;
        }
        set globalShaderData(data) {
            this._globalShaderData = data;
            this._nativeObj.setGlobalShaderData(data ? data._nativeObj : null);
        }
        get globalShaderData() {
            return this._globalShaderData;
        }
        get subShader() {
            return this._subShader;
        }
        set subShader(value) {
            this._subShader = value;
            if (value) {
                this._nativeObj.setSubShader(value.moduleData._nativeObj);
            }
        }
        init() {
            this._nativeObj = new window.conchGLESRenderElement2D();
            window.conchGLESRenderElement2D.setCompileDefine(RTShaderPass.getGlobalCompileDefine()._nativeObj);
        }
        constructor() {
            this._renderStateIsBySprite = true;
            this.init();
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            this._owner = value;
            this._nativeObj.setOwner(value ? value._nativeObj : null);
        }
        get nodeCommonMap() {
            return this._nodeCommonMap;
        }
        set nodeCommonMap(value) {
            this._nodeCommonMap = value;
            this._nativeObj.setCommonUniformMap(value);
        }
        get renderStateIsBySprite() {
            return this._renderStateIsBySprite;
        }
        set renderStateIsBySprite(value) {
            this._renderStateIsBySprite = value;
            this._nativeObj.renderStateIsBySprite = value;
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class GLESPrimitiveRenderElement2D extends GLESRenderElement2D {
        set typeKey(value) {
            this._nativeObj.type = value;
        }
        get typeKey() {
            return this._nativeObj.type;
        }
        set textureKey(value) {
            this._nativeObj.textureKey = value;
        }
        get textureKey() {
            return this._nativeObj.textureKey;
        }
        init() {
            this._nativeObj = new window.conchGLESPrimitiveRenderElement2D();
            window.conchGLESRenderElement2D.setCompileDefine(RTShaderPass.getGlobalCompileDefine()._nativeObj);
        }
        get primitiveShaderData() {
            return this._primitiveShaderData;
        }
        set primitiveShaderData(data) {
            this._primitiveShaderData = data;
            this._nativeObj.setPrimitiveShaderData(data ? data._nativeObj : null);
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
        constructor() {
            this._enable = false;
            this._enableBatch = false;
            this._isSupport = false;
            this._root = null;
            this.postProcess = null;
            this._enablePostProcess = false;
            this._shaderData = null;
            this._renderOffset = new Laya.Matrix();
            this._shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData(null);
            this._nativeObj = new window.conchRTRender2DPass(this._shaderData._nativeObj);
            this.enable = true;
            this.enableBatch = true;
            this.isSupport = false;
            this.doClearColor = true;
            this.repaint = true;
            this.priority = 0;
            this.offsetMatrix = new Laya.Matrix();
        }
        fowardRender(context) {
            let rt = this.renderTexture;
            if (rt) {
                context.invertY = rt._invertY;
            }
            this._nativeObj.fowardRender(context._nativeObj);
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
        apply(context) {
            this._nativeObj.apply(context._nativeObj);
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
            const nativeObj = (typeof window.conchRTEmptyRender2DDataHandle === 'function')
                ? new window.conchRTEmptyRender2DDataHandle()
                : { setOwner: () => { }, needUseMatrix: false, inheriteRenderData: () => { }, destroy: () => { } };
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

    class GLESSetRenderData extends Laya.SetRenderDataCMD {
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
            this._nativeObj.setDest(value._nativeObj);
        }
        get value() {
            return this._value;
        }
        set value(value) {
            switch (this.dataType) {
                case Laya.ShaderDataType.Int:
                    this.data_number = value;
                    this._value = this.data_number;
                    this._nativeObj.setInt(this.value);
                    break;
                case Laya.ShaderDataType.Float:
                    this.data_number = value;
                    this._value = this.data_number;
                    this._nativeObj.setFloat(this.value);
                    break;
                case Laya.ShaderDataType.Bool:
                    this.data_number = value;
                    this._value = this.data_number;
                    this._nativeObj.setBool(this.value);
                    break;
                case Laya.ShaderDataType.Matrix4x4:
                    !this.data_mat && (this.data_mat = new Laya.Matrix4x4());
                    value.cloneTo(this.data_mat);
                    this._value = this.data_mat;
                    this._nativeObj.setMatrix4x4(this.value);
                    break;
                case Laya.ShaderDataType.Color:
                    !this.data_Color && (this.data_Color = new Laya.Color());
                    value.cloneTo(this.data_Color);
                    this._value = this.data_Color;
                    this._nativeObj.setColor(this.value);
                    break;
                case Laya.ShaderDataType.Texture2D:
                    this._value = this.data_texture = value;
                    this._nativeObj.setTexture2D(this.data_texture._texture._nativeObj);
                    break;
                case Laya.ShaderDataType.Vector4:
                    !this.data_v4 && (this.data_v4 = new Laya.Vector4());
                    value.cloneTo(this.data_v4);
                    this._value = this.data_v4;
                    this._nativeObj.setVector(this.value);
                    break;
                case Laya.ShaderDataType.Vector2:
                    !this.data_v2 && (this.data_v2 = new Laya.Vector2());
                    value.cloneTo(this.data_v2);
                    this._value = this.data_v2;
                    this._nativeObj.setVector2(this.value);
                    break;
                case Laya.ShaderDataType.Vector3:
                    !this.data_v3 && (this.data_v3 = new Laya.Vector3());
                    value.cloneTo(this.data_v3);
                    this._value = this.data_v3;
                    this._nativeObj.setVector3(this.value);
                    break;
                case Laya.ShaderDataType.Buffer:
                    this._value = this.data_Buffer = value;
                    this._nativeObj.setBufferValue(this.data_Buffer.buffer, this.data_Buffer.byteLength);
                    break;
            }
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeData;
            this._nativeObj = new window.conchGLESSetRenderData();
        }
    }
    class GLESSetShaderDefine extends Laya.SetShaderDefineCMD {
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
            this._nativeObj.setDest(value._nativeObj);
        }
        get add() {
            return this._add;
        }
        set add(value) {
            this._add = value;
            this._nativeObj.setAdd(value);
        }
        constructor() {
            super();
            this.type = Laya.RenderCMDType.ChangeShaderDefine;
            this._nativeObj = new window.conchGLESSetShaderDefine();
        }
    }

    class GLESShaderData extends Laya.ShaderData {
        constructor(ownerResource = null, createNativeObj = true) {
            super(ownerResource);
            this._defineDatas = new RTDefineDatas();
            if (createNativeObj) {
                this._nativeObj = new window.conchGLESShaderData(this._defineDatas._nativeObj);
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
        getBool(index) {
            return this._nativeObj.getBool(index);
        }
        setBool(index, value) {
            this._nativeObj.setBool(index, value);
        }
        getInt(index) {
            return this._nativeObj.getInt(index);
        }
        setInt(index, value) {
            this._nativeObj.setInt(index, value);
        }
        getNumber(index) {
            return this._nativeObj.getNumber(index);
        }
        setNumber(index, value) {
            this._nativeObj.setNumber(index, value);
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
                this._setInternalTexture(index, value._texture._nativeObj);
            }
            else {
                this._setInternalTexture(index, null);
            }
            lastValue && lastValue._removeReference();
            value && value._addReference();
        }
        _setInternalTexture(index, value) {
            this._nativeObj._setInternalTexture(index, value);
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
                    }
                }
            }
        }
        clone() {
            var dest = new GLESShaderData();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class GLESRenderContext2D {
        get invertY() {
            return this._nativeObj.invertY;
        }
        set invertY(value) {
            this._nativeObj.invertY = value;
        }
        get pipelineMode() {
            return this._nativeObj.pipelineMode;
        }
        set pipelineMode(value) {
            this._nativeObj.pipelineMode = value;
        }
        constructor() {
            this._tempList = [];
            this._offscreenX = 0;
            this._offscreenY = 0;
            this._offscreenWidth = 0;
            this._offscreenHeight = 0;
            this._passData = null;
            this._passDataShell = new GLESShaderData(null, false);
            this._nativeObj = new window.conchGLESRenderContext2D();
            this._nativeObj.setGlobalConfigShaderData(Laya.Shader3D._configDefineValues._nativeObj);
            this._nativeObj.pipelineMode = "Forward";
        }
        get passData() {
            this._passDataShell._nativeObj = this._nativeObj.passData;
            return this._passDataShell;
        }
        set passData(value) {
            this._passData = value;
            this._nativeObj.passData = value ? value._nativeObj : null;
        }
        drawRenderElementList(list) {
            this._tempList.length = 0;
            let listelement = list.elements;
            listelement.forEach((element) => {
                this._tempList.push(element._nativeObj);
            });
            return this._nativeObj.drawRenderElementList(this._tempList, list.length);
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
            this._nativeObj.drawRenderElementOne(node._nativeObj);
        }
        runOneCMD(cmd) {
            this._nativeObj.runOneCMD(cmd._nativeObj);
        }
        runCMDList(cmds) {
            let nativeobCMDs = [];
            cmds.forEach(element => {
                nativeobCMDs.push(element._nativeObj);
            });
            this._nativeObj.runCMDList(nativeobCMDs);
        }
    }
    GLESRenderContext2D.isCreateBlitScreenELement = false;

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

    class GLESRender2DProcess {
        createGraphic2DBufferBlock() {
            return new RTGraphics2DBufferBlock();
        }
        createGraphic2DVertexBlock() {
            return new RTGraphics2DVertexBlock();
        }
        create2DGraphicVertexDataView(wholeBuffer, elementOffset, elementSize, stride) {
            return new RT2DGraphic2DVertexDataView(wholeBuffer, elementOffset, elementSize, stride);
        }
        create2DGraphicIndexDataView(wholeBuffer, elementSize) {
            return new RT2DGraphic2DIndexDataView(wholeBuffer, elementSize);
        }
        create2DGraphicIndexBuffer() {
            return new RT2DGraphicIndexBuffer();
        }
        create2DGraphicVertexBuffer() {
            return new RT2DGraphicVertexBuffer();
        }
        createPrimitiveRenderElement2D() {
            return new GLESPrimitiveRenderElement2D();
        }
        createRender2DPassManager() {
            return new RTRender2DPassManager();
        }
        create2DGlobalRenderDataHandle() {
            return new RTGlobalRenderData();
        }
        createSpineRenderDataHandle() {
            return new RTSpineRenderDataHandle();
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
        createSetRenderDataCMD() {
            return new GLESSetRenderData();
        }
        createSetShaderDefineCMD() {
            return new GLESSetShaderDefine();
        }
        createBlit2DQuadCMDData() {
            return new GLESBlit2DQuadCMD();
        }
        createDraw2DElementCMDData() {
            return new GLESDraw2DElementCMD();
        }
        createSetRendertarget2DCMD() {
            return new GLESSetRendertarget2DCMD;
        }
        createRenderElement2D() {
            return new GLESRenderElement2D();
        }
        createRenderContext2D() {
            return new GLESRenderContext2D();
        }
        createRender2DPass() {
            return new RTRender2DPass();
        }
        createRenderStruct2D() {
            return new RTRenderStruct2D();
        }
        createEmptyRenderDataHandle() {
            return new RTEmptyRender2DDataHandle();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.render2DRenderPassFactory)
            Laya.LayaGL.render2DRenderPassFactory = new GLESRender2DProcess();
    });

    class GLESMeshRenderBatchAgent {
        constructor() {
            this._nativeObj = new window.conchGLESMeshRenderBatchAgent();
        }
        create() {
            this._nativeObj.create();
        }
        addRenderNode(object) {
            return this._nativeObj.addRenderNode(object._baseRenderNode._nativeObj);
        }
        removeRenderNode(object) {
            return this._nativeObj.removeRenderNode(object._baseRenderNode._nativeObj);
        }
        updateProperty(object, property) {
            this._nativeObj.updateProperty(object._baseRenderNode._nativeObj, property);
        }
        release() {
            this._nativeObj.release();
        }
    }

    class GLESBufferState {
        constructor() {
            this._nativeObj = new window.conchGLESBufferState();
        }
        applyState(vertexBuffers, indexBuffer) {
            this._vertexBuffers = vertexBuffers;
            this._bindedIndexBuffer = indexBuffer;
            let tempVertexBuffers = [];
            vertexBuffers.forEach((element) => {
                tempVertexBuffers.push(element._nativeObj);
            });
            this._nativeObj.applyState(tempVertexBuffers, indexBuffer ? indexBuffer._nativeObj : null);
        }
        destroy() {
            this._nativeObj.destroy();
        }
    }

    class GLESCommandUniformMap extends Laya.CommandUniformMap {
        constructor(stateName) {
            super(stateName);
            this._idata = new Map();
            this._stateName = stateName;
            this._nativeObj = new window.conchGLESCommandUniformMap.create(stateName);
        }
        addShaderUniform(propertyID, propertyKey, uniformtype, options) {
            this._nativeObj.addShaderUniform(propertyID, propertyKey, uniformtype);
            let uniform = { id: propertyID, uniformtype: uniformtype, propertyName: propertyKey, arrayLength: 0, format: options === null || options === void 0 ? void 0 : options.format, access: options === null || options === void 0 ? void 0 : options.access };
            this._idata.set(propertyID, uniform);
        }
        addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength) {
            this._nativeObj.addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength);
            this._idata.set(propertyID, { id: propertyID, uniformtype: uniformtype, propertyName: propertyName, arrayLength: arrayLength });
        }
        setDefaultTextureData(key, defaultTex) {
        }
    }

    class RTShaderDefine extends Laya.ShaderDefine {
        constructor(index, value) {
            super(index, value);
        }
    }

    class GLESInternalTex {
        constructor(nativeObj) {
            this._nativeObj = nativeObj;
        }
        get wrapU() {
            return this._nativeObj.wrapU;
        }
        set wrapU(value) {
            this._nativeObj.wrapU = value;
        }
        get wrapV() {
            return this._nativeObj.wrapV;
        }
        set wrapV(value) {
            this._nativeObj.wrapV = value;
        }
        get wrapW() {
            return this._nativeObj.wrapW;
        }
        set wrapW(value) {
            this._nativeObj.wrapW = value;
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
            this._nativeObj.compareMode = value;
        }
        get anisoLevel() {
            return this._nativeObj.anisoLevel;
        }
        set anisoLevel(value) {
            this._nativeObj.anisoLevel = value;
        }
        get filterMode() {
            return this._nativeObj.filterMode;
        }
        set filterMode(value) {
            this._nativeObj.filterMode = value;
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

    class GLESInternalRT {
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
                    this._texturesRef.push(new GLESInternalTex(element));
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
                    this._depthTextureRef = new GLESInternalTex(nativeObj);
                return this._depthTextureRef;
            }
        }
        dispose() {
            this._nativeObj.dispose();
        }
    }

    class GLESTextureContext {
        constructor(native) {
            this._native = native;
            this.needBitmap = false;
        }
        createRenderTargetFromArrayLayer(arrayTex, layer, colorFormat, depthStencilFormat, sRGB) {
            throw new Error("Method not implemented.");
        }
        createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha) {
            var tex = new GLESInternalTex(this._native.createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha));
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
            return new GLESInternalTex(this._native.createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha));
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
            return new GLESInternalRT(this._native.createRenderTargetInternal(width, height, colorFormat, depthStencilFormat ? depthStencilFormat : Laya.RenderTargetFormat.None, generateMipmap, sRGB, multiSamples));
        }
        createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            return new GLESInternalRT(this._native.createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples));
        }
        createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB) {
            return new GLESInternalTex(this._native.createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB));
        }
        createRenderTargetDepthTexture(renderTarget, dimension, width, height) {
            return new GLESInternalTex(this._native.createRenderTargetDepthTexture(renderTarget._nativeObj, dimension, width, height));
        }
        readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
            return this._native.readRenderTargetPixelData(renderTarget._nativeObj, xOffset, yOffset, width, height, out);
        }
        readRenderTargetPixelDataAsync(renderTarget, xOffset, yOffset, width, height, out) {
            return Promise.resolve(this.readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out));
        }
        updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
            if (texture && video) {
                this._native.updateVideoTexture(texture._nativeObj, video._nativeObj.conchImgId, premultiplyAlpha, invertY);
            }
        }
    }

    exports.GLESMode = void 0;
    (function (GLESMode) {
        GLESMode[GLESMode["Auto"] = 0] = "Auto";
        GLESMode[GLESMode["WebGL2"] = 1] = "WebGL2";
        GLESMode[GLESMode["WebGL1"] = 2] = "WebGL1";
    })(exports.GLESMode || (exports.GLESMode = {}));
    class GLESEngine {
        constructor(config, webglMode = exports.GLESMode.Auto) {
            this._remapZ = true;
            this._screenInvertY = false;
            this._lodTextureSample = true;
            this._breakTextureSample = true;
            this._nativeObj = new window.conchGLESEngine(config, webglMode);
        }
        get _framePassCount() {
            return this._nativeObj._framePassCount;
        }
        set _framePassCount(value) {
            this._nativeObj._framePassCount = value;
        }
        endFrame() {
            this._nativeObj.endFrame();
        }
        startFrame() {
            this._nativeObj.loopCount = Laya.Stat.loopCount;
            this._nativeObj.startFrame();
        }
        resizeOffScreen(width, height) {
            this._nativeObj.resizeOffScreen(width, height);
        }
        getDefineByName(name) {
            let nativeRet = this._nativeObj.getDefineByName(name);
            let ret = new RTShaderDefine(nativeRet._index, nativeRet._value);
            return ret;
        }
        getNamesByDefineData(defineData, out) {
            out.length = 0;
            this._nativeObj.getNamesByDefineData(defineData._nativeObj, out);
        }
        addTexGammaDefine(key, value) {
            this._nativeObj.addTexGammaDefine(key, value);
        }
        initRenderEngine(canvas) {
            this._nativeObj.initRenderEngine(canvas._nativeObj);
            this._GLTextureContext = new GLESTextureContext(this._nativeObj.getTextureContext());
            Laya.Config._uniformBlock = Laya.Config.enableUniformBufferObject && this.getCapable(Laya.RenderCapable.UnifromBufferObject);
            Laya.Config.matUseUBO = Laya.Config.matUseUBO && this.getCapable(Laya.RenderCapable.UnifromBufferObject);
            this._nativeObj.enableUniformBufferObject = Laya.Config._uniformBlock;
            this._nativeObj.matUseUBO = Laya.Config.matUseUBO;
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
            return this._GLTextureContext;
        }
        viewport(x, y, width, height) {
            this._nativeObj.viewport(x, y, width, height);
        }
        scissor(x, y, width, height) {
            this._nativeObj.scissor(x, y, width, height);
        }
    }

    class GLESIndexBuffer {
        destroy() {
            this._nativeObj.destroy();
        }
        _setIndexDataLength(data) {
            this._nativeObj._setIndexDataLength(data);
        }
        _setIndexData(data, bufferOffset) {
            this._nativeObj._setIndexData(data, bufferOffset);
        }
        get indexType() {
            return this._nativeObj._indexType;
        }
        set indexType(value) {
            this._nativeObj._indexType = value;
        }
        get indexCount() {
            return this._nativeObj._indexCount;
        }
        set indexCount(value) {
            this._nativeObj._indexCount = value;
        }
        constructor(targetType, bufferUsageType) {
            this._bufferRef = null;
            this._nativeObj = new window.conchGLESIndexBuffer(targetType, bufferUsageType);
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            this._bufferRef = buffer;
            this._nativeObj.setData(buffer, bufferOffset, dataStartIndex, dataCount);
        }
    }

    class GLESShaderInstance {
        constructor() {
            this._attributeMapTemp = new Map();
        }
        _serializeShader() {
            throw new Laya.NotImplementedError();
        }
        _deserialize(buffer) {
            throw new Laya.NotImplementedError();
        }
        _create(shaderProcessInfo, shaderPass) {
            this._shaderPass = shaderPass;
            let useMaterial = Laya.Config.matUseUBO;
            Laya.Config.matUseUBO = (!shaderProcessInfo.is2D) && Laya.Config.matUseUBO;
            let shaderObj = Laya.GLSLCodeGenerator.GLShaderLanguageProcess3D(shaderProcessInfo.defineString, shaderProcessInfo.attributeMap, shaderProcessInfo.uniformMap, shaderProcessInfo.vs, shaderProcessInfo.ps);
            Laya.Config.matUseUBO = useMaterial;
            this._attributeMapTemp.clear();
            for (var k in shaderProcessInfo.attributeMap) {
                this._attributeMapTemp.set(k, shaderProcessInfo.attributeMap[k][0]);
            }
            this._nativeObj = new window.conchGLESShaderInstance(shaderProcessInfo.is2D, shaderObj.vs, shaderObj.fs, this._attributeMapTemp, shaderPass.moduleData._nativeObj);
        }
        _disposeResource() {
            this._nativeObj.destroy();
        }
    }

    class GLESRenderGeometryElement {
        constructor(mode, drawType) {
            this._nativeObj = new window.conchGLESRenderGeometryElement();
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
        set bufferState(value) {
            this._bufferState = value;
            this._nativeObj.setBufferState(value ? value._nativeObj : null);
        }
        get bufferState() {
            return this._bufferState;
        }
        set mode(value) {
            this._nativeObj.mode = value;
        }
        get mode() {
            return this._nativeObj.mode;
        }
        set drawType(value) {
            this._nativeObj.drawType = value;
        }
        get drawType() {
            return this._nativeObj.drawType;
        }
        set instanceCount(value) {
            this._nativeObj.instanceCount = value;
        }
        get instanceCount() {
            return this._nativeObj.instanceCount;
        }
        set indexFormat(value) {
            this._nativeObj.indexFormat = value;
        }
        get indexFormat() {
            return this._nativeObj.indexFormat;
        }
    }

    class GLESVertexBuffer {
        constructor(targetType, bufferUsageType) {
            this._attributeMapTemp = new Map();
            this._bufferRef = null;
            this._nativeObj = new window.conchGLESVertexBuffer(targetType, bufferUsageType);
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
            this._nativeObj._instanceBuffer = value;
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

    const _defineStrings = [];
    function _getTextureType(uniformType) {
        switch (uniformType) {
            case Laya.ShaderDataType.Texture2D:
                return '2d';
            case Laya.ShaderDataType.Texture3D:
                return '3d';
            case Laya.ShaderDataType.TextureCube:
                return 'cube';
            case Laya.ShaderDataType.Texture2DArray:
                return '2d-array';
            default:
                return '2d';
        }
    }
    function getSamplerTextureType(dimension) {
        if (dimension == "2d") {
            return "sampler2D";
        }
        else if (dimension == "cube") {
            return "samplerCube";
        }
        else if (dimension == "2d-array") {
            return "sampler2DArray";
        }
        else if (dimension == "3d") {
            return "sampler3D";
        }
        else if (dimension == "cube-array") {
            return "samplerCubeArray";
        }
        else if (dimension == "1d") {
            return "sampler1D";
        }
        else {
            return "sampler2D";
        }
    }
    const ssboRegexCompat = /((?:layout\s*\([^)]*\)\s*)*)\s*((?:(?:readonly|writeonly|coherent|volatile|restrict)\s+)*)buffer\s+([A-Za-z_]\w*)\s*\{([\s\S]*?)\}\s*([A-Za-z_]\w*)?\s*;/g;
    function ssboStrings(ssboBindingMap, code) {
        code = code.replace(ssboRegexCompat, (match, layoutStr, readonlyStr, blockName, body, instanceName) => {
            let binding = instanceName ? ssboBindingMap.get(instanceName) : undefined;
            if (binding === undefined) {
                binding = ssboBindingMap.get(blockName);
            }
            if (binding !== undefined) {
                let newLayoutStr = `layout(std430, binding=${binding}) `;
                if (readonlyStr && readonlyStr.trim().startsWith("writeonly")) {
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
    class GLESComputeShaderInstance {
        constructor(name) {
            this.compilete = false;
            this.uniformMap = new Map();
            this.name = name;
            this._nativeObj = new window.conchGLESComputeShaderInstance();
        }
        glslUniformString(uniformsMap, useUniformBlock, blockName, binding, ssboBindingMap) {
            if (uniformsMap.size == 0) {
                return { code: "", binding: binding };
            }
            if (useUniformBlock) {
                return { code: "", binding: binding };
            }
            else {
                let uniformsStr = "";
                let currentBinding = binding;
                uniformsMap.forEach((uniform, id) => {
                    if (uniform.uniformtype == Laya.ShaderDataType.DeviceBuffer) {
                        if (ssboBindingMap) {
                            ssboBindingMap.set(uniform.propertyName, currentBinding++);
                        }
                    }
                    else if (uniform.uniformtype == Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                        if (ssboBindingMap) {
                            ssboBindingMap.set(uniform.propertyName, currentBinding++);
                        }
                    }
                    else if (uniform.uniformtype == Laya.ShaderDataType.StorageTexture2D) {
                        let access = uniform.access;
                        uniformsStr = `${uniformsStr}layout(${uniform.format ? uniform.format : "rgba8"}, binding=${currentBinding++}) uniform ${access} image2D ${uniform.propertyName};\n`;
                    }
                    else if (uniform.uniformtype == Laya.ShaderDataType.Buffer) ;
                    else if (uniform.uniformtype >= Laya.ShaderDataType.Texture2D) {
                        const viewDimension = _getTextureType(uniform.uniformtype);
                        const textureType = getSamplerTextureType(viewDimension);
                        uniformsStr = `${uniformsStr}layout(binding=${currentBinding++}) uniform ${textureType} ${uniform.propertyName};\n`;
                    }
                    else {
                        let typeStr = Laya.GLSLCodeGenerator.getAttributeType(uniform.uniformtype);
                        if (typeStr != "") {
                            uniformsStr += `layout(binding=${currentBinding++}) uniform ${typeStr} ${uniform.propertyName};\n`;
                        }
                    }
                });
                return { code: uniformsStr, binding: currentBinding };
            }
        }
        proccessComputeShader(defineString, uniformMaps, CS) {
            var computeHead;
            var defMap = {};
            var defineStr = "";
            let useUniformBlock = false;
            let materialUniformGlsl = "";
            let binding = 0;
            const ssboBindingMap = new Map();
            for (const uniformMap of uniformMaps) {
                let result = this.glslUniformString(uniformMap._idata, useUniformBlock, uniformMap._stateName, binding, ssboBindingMap);
                materialUniformGlsl += result.code;
                binding = result.binding;
                materialUniformGlsl += "\n";
            }
            if (defineString.indexOf("GRAPHICS_API_GLES3") === -1) {
                defineString.push("GRAPHICS_API_GLES3");
            }
            computeHead =
                `#version 310 es
             #if defined(GL_FRAGMENT_PRECISION_HIGH)
                precision highp float;
                precision highp int;
                precision highp sampler2DArray;
                precision highp sampler3D;
                precision highp image2D;
            #else
                precision mediump float;
                precision mediump int;
                precision mediump sampler2DArray;
                precision mediump sampler3D;
                precision mediump image2D;
            #endif
            layout(std140, column_major) uniform;
            layout(std430, column_major) buffer;
            ${materialUniformGlsl}
        `;
            for (var i = 0, n = defineString.length; i < n; i++) {
                var def = defineString[i];
                defineStr += "#define " + def + "\n";
                defMap[def] = true;
            }
            var vs = CS.toscript(defMap, []);
            var vsVersion = '';
            if (vs[0].indexOf('#version') == 0) {
                vsVersion = vs[0] + '\n';
                vs.shift();
            }
            let computeCode = vs.join('\n');
            let dstCS = vsVersion + computeHead + defineStr + computeCode;
            debugger;
            let preprocessRes = this._nativeObj.preprocess(dstCS, 'compute');
            if (!preprocessRes.success) {
                console.error(`GLESComputeShaderInstance ${this.name} preprocess error:`, preprocessRes.info_log);
                return {};
            }
            if (preprocessRes.ssbos && preprocessRes.ssbos.length > 0) {
                const exists = new Map();
                for (const uniformMap of uniformMaps) {
                    uniformMap._idata.forEach((uniform, id) => {
                        exists.set(id, uniform);
                    });
                }
                if (uniformMaps.length === 0) {
                    console.error(`GLESComputeShaderInstance ${this.name} uniformMaps is empty`);
                    return {};
                }
                let additionMaps = uniformMaps[0];
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
                        if (uniform.uniformtype == Laya.ShaderDataType.DeviceBuffer) {
                            if (access == "readonly") {
                                console.warn(`Shader ${this.name} ssbo access type mismatch for ${name}`);
                            }
                        }
                        else if (uniform.uniformtype == Laya.ShaderDataType.ReadOnlyDeviceBuffer) {
                            if (access != "readonly") {
                                console.warn(`Shader ${this.name} ssbo access type mismatch for ${name}`);
                            }
                        }
                    }
                }
                if (addNewSSBO) {
                    materialUniformGlsl = "";
                    binding = 0;
                    ssboBindingMap.clear();
                    for (const uniformMap of uniformMaps) {
                        let result = this.glslUniformString(uniformMap._idata, useUniformBlock, uniformMap._stateName, binding, ssboBindingMap);
                        materialUniformGlsl += result.code;
                        binding = result.binding;
                        materialUniformGlsl += "\n";
                    }
                    computeHead =
                        `#version 310 es
                     #if defined(GL_FRAGMENT_PRECISION_HIGH)
                        precision highp float;
                        precision highp int;
                        precision highp sampler2DArray;
                        precision highp sampler3D;
                        precision highp image2D;
                    #else
                        precision mediump float;
                        precision mediump int;
                        precision mediump sampler2DArray;
                        precision mediump sampler3D;
                        precision mediump image2D;
                    #endif
                    layout(std140, column_major) uniform;
                    layout(std430, column_major) buffer;
                    ${materialUniformGlsl}
                `;
                    dstCS = vsVersion + computeHead + defineStr + computeCode;
                }
            }
            computeCode = ssboStrings(ssboBindingMap, computeCode);
            dstCS = vsVersion + computeHead + defineStr + computeCode;
            return dstCS;
        }
        compile(info) {
            let compileDefine = info.defineData;
            _defineStrings.length = 0;
            Laya.Shader3D._getNamesByDefineData(compileDefine, _defineStrings);
            const code = this.proccessComputeShader(_defineStrings, info.uniformMaps, info.node);
            let uniformMaps = [];
            for (const uniformMap of info.uniformMaps) {
                uniformMaps.push(uniformMap._nativeObj);
            }
            const success = this._nativeObj.compile(code, uniformMaps);
            if (success) {
                this.compilete = true;
            }
            else {
                throw new Error(`Failed to compile compute shader: ${this.name}`);
            }
        }
        _disposeResource() {
            this._nativeObj.destroy();
        }
    }

    class GLESDeviceBuffer {
        constructor(usage) {
            this._size = 0;
            this._cacheShaderData = new Map();
            this._destroyed = false;
            this._usage = usage;
            this._nativeObj = new window.conchGLESDeviceBuffer(this._convertUsage(usage));
        }
        _convertUsage(usage) {
            let glUsage = 0;
            if (usage & Laya.EDeviceBufferUsage.MAP_READ) {
                glUsage |= 1;
            }
            if (usage & Laya.EDeviceBufferUsage.MAP_WRITE) {
                glUsage |= 2;
            }
            if (usage & Laya.EDeviceBufferUsage.COPY_SRC) {
                glUsage |= 4;
            }
            if (usage & Laya.EDeviceBufferUsage.COPY_DST) {
                glUsage |= 8;
            }
            if (usage & Laya.EDeviceBufferUsage.STORAGE) {
                glUsage |= 16;
            }
            if (usage & Laya.EDeviceBufferUsage.INDIRECT) {
                glUsage |= 32;
            }
            return glUsage;
        }
        getNativeBuffer() {
            return this._nativeObj;
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            this._nativeObj.setData(buffer, bufferOffset, dataStartIndex, dataCount);
        }
        setDataLength(byteLength) {
            if (byteLength !== this._size) {
                this._size = byteLength;
                this._nativeObj.setDataLength(byteLength);
            }
        }
        copyToBuffer(buffer, sourceOffset, destOffset, byteLength) {
            if (buffer instanceof GLESVertexBuffer) {
                buffer = buffer;
                this._nativeObj.copyToVertexBuffer(buffer._nativeObj, sourceOffset, destOffset, byteLength);
            }
            else if (buffer instanceof GLESDeviceBuffer) {
                buffer = buffer;
                this._nativeObj.copyToDeviceBuffer(buffer._nativeObj, sourceOffset, destOffset, byteLength);
            }
            else {
                throw new Error("GLESDeviceBuffer.copyToBuffer() invalid buffer type");
            }
        }
        copyToTexture() {
            console.warn("GLESDeviceBuffer.copyToTexture() is not implemented yet");
        }
        readData(dest, destOffset, srcOffset, byteLength) {
            return new Promise((resolve, reject) => {
                const result = this._nativeObj.readData(dest, destOffset, srcOffset, byteLength);
                if (result) {
                    resolve();
                }
                else {
                    reject(new Error("GLESDeviceBuffer.readData failed: native readData returned false."));
                }
            });
        }
        destroy() {
            var _a;
            if (!this._destroyed) {
                if (this._nativeObj) {
                    this._nativeObj.destroy();
                }
                (_a = this._cacheShaderData) === null || _a === void 0 ? void 0 : _a.clear();
                this._cacheShaderData = null;
                this._destroyed = true;
            }
        }
        get destroyed() {
            return this._destroyed;
        }
        get size() {
            return this._size;
        }
        get usage() {
            return this._usage;
        }
    }

    var CommandType;
    (function (CommandType) {
        CommandType[CommandType["Dispatch"] = 0] = "Dispatch";
        CommandType[CommandType["SetShaderData"] = 1] = "SetShaderData";
        CommandType[CommandType["ClearBuffer"] = 2] = "ClearBuffer";
        CommandType[CommandType["BufferToBuffer"] = 3] = "BufferToBuffer";
        CommandType[CommandType["BufferToTexture"] = 4] = "BufferToTexture";
        CommandType[CommandType["TextureToBuffer"] = 5] = "TextureToBuffer";
        CommandType[CommandType["TextureToTexture"] = 6] = "TextureToTexture";
    })(CommandType || (CommandType = {}));
    class IDispatchCommand {
        set shader(value) {
            this._shader = value;
            this._nativeObj.setShader(value._nativeObj);
        }
        set shaderData(value) {
            this._shaderData = value;
            let shaderData = this._shaderData.map(item => item._nativeObj);
            this._nativeObj.setShaderData(shaderData);
        }
        set dispatchParams(value) {
            this._nativeObj.setDispatchParams(value);
        }
        constructor() {
            this._nativeObj = new window.conchGLESComputeDispatchCommand();
        }
    }
    class ISetShaderDataCommand {
        set shaderData(value) {
            this._shaderData = value;
            this._nativeObj.setShaderData(value._nativeObj);
        }
        set propertyID(value) {
            this._nativeObj.setPropertyID(value);
        }
        set shaderDataType(value) {
            this._nativeObj.setShaderDataType(value);
        }
        set value(value) {
            this._shaderDataItem = value;
            this._nativeObj.setShaderDataItem(value);
        }
        constructor() {
            this._nativeObj = new window.conchGLESComputeSetShaderDataCommand();
        }
    }
    class IBufferToBufferCommand {
        set src(value) {
            this._src = value;
            this._nativeObj.setSrc(value._nativeObj);
        }
        set dest(value) {
            this._dest = value;
            this._nativeObj.setDest(value._nativeObj);
        }
        set sourceOffset(value) {
            this._nativeObj.setSourceOffset(value);
        }
        set destinationOffset(value) {
            this._nativeObj.setDestinationOffset(value);
        }
        set size(value) {
            this._nativeObj.setSize(value);
        }
        constructor() {
            this._nativeObj = new window.conchGLESComputeBufferToBufferCommand();
        }
    }
    class IBufferClearCommand {
        set dest(value) {
            this._dest = value;
            this._nativeObj.setDest(value._nativeObj);
        }
        set destinationOffset(value) {
            this._nativeObj.setDestinationOffset(value);
        }
        set size(value) {
            this._nativeObj.setSize(value);
        }
        constructor() {
            this._nativeObj = new window.conchGLESComputeClearBufferCommand();
        }
    }
    class ITextureToTextureCommand {
        set srcTextureInfo(value) {
            this._nativeObj.setSrcTextureInfo(value);
        }
        set destTextureInfo(value) {
            this._nativeObj.setDestTextureInfo(value);
        }
        set copySize(value) {
            this._nativeObj.setCopySize(value);
        }
        constructor() {
            this._nativeObj = new window.conchGLESComputeTextureToTextureCommand();
        }
    }
    class GLESComputeContext {
        constructor() {
            this.commands = [];
            this._nativeObj = new window.conchGLESComputeContext();
        }
        clearCMDs() {
            this.commands = [];
            this._nativeObj.clearCMDs();
        }
        addDispatchCommand(cmd) {
            let cmdInfo = new IDispatchCommand();
            cmdInfo.shader = cmd.shader;
            cmdInfo.shaderData = cmd.shaderData;
            cmdInfo.dispatchParams = cmd.dispatchParams;
            this.commands.push(cmdInfo);
            this._nativeObj.addCMD(cmdInfo._nativeObj);
        }
        addDispatchIndirectCommand(cmd) {
        }
        addSetShaderDataCommand(shaderData, propertyID, shaderDataType, value) {
            let cmdInfo = new ISetShaderDataCommand();
            cmdInfo.shaderData = shaderData;
            cmdInfo.propertyID = propertyID;
            cmdInfo.shaderDataType = shaderDataType;
            cmdInfo.value = value;
            this.commands.push(cmdInfo);
            this._nativeObj.addCMD(cmdInfo._nativeObj);
        }
        addBufferToBufferCommand(src, dest, sourceOffset = 0, destinationOffset = 0, size) {
            let cmdInfo = new IBufferToBufferCommand();
            cmdInfo.src = src;
            cmdInfo.dest = dest;
            cmdInfo.sourceOffset = sourceOffset;
            cmdInfo.destinationOffset = destinationOffset;
            cmdInfo.size = size || 0;
            this.commands.push(cmdInfo);
            this._nativeObj.addCMD(cmdInfo._nativeObj);
        }
        addBufferToTextureCommand(src, srcTextureInfo, destTextureInfo, copySize) {
        }
        addTextureToBufferCommand(srcTextureInfo, dest, destTextureInfo, copySize) {
        }
        addTextureToTextureCommand(srcTextureInfo, destTextureInfo, copySize) {
            let cmdInfo = new ITextureToTextureCommand();
            cmdInfo.srcTextureInfo = srcTextureInfo;
            cmdInfo.destTextureInfo = destTextureInfo;
            cmdInfo.copySize = copySize;
            this.commands.push(cmdInfo);
            this._nativeObj.addCMD(cmdInfo._nativeObj);
        }
        addClearBufferCommand(dest, destOffset, destCount) {
            let cmdInfo = new IBufferClearCommand();
            cmdInfo.dest = dest;
            cmdInfo.destinationOffset = destOffset;
            cmdInfo.size = destCount;
            this.commands.push(cmdInfo);
            this._nativeObj.addCMD(cmdInfo._nativeObj);
        }
        executeCMDs() {
            this._nativeObj.executeCMDs();
        }
        destroy() {
            this.clearCMDs();
            if (this._nativeObj) {
                this._nativeObj.destroy();
            }
        }
    }

    class GLESRenderDeviceFactory {
        constructor() {
            this.globalBlockMap = {};
        }
        createShaderData(ownerResource) {
            return new GLESShaderData(ownerResource);
        }
        createGlobalUniformMap(blockName) {
            let comMap = this.globalBlockMap[blockName];
            if (!comMap)
                comMap = this.globalBlockMap[blockName] = new GLESCommandUniformMap(blockName);
            return comMap;
        }
        createShaderInstance(shaderProcessInfo, shaderPass) {
            let shaderIns = new GLESShaderInstance();
            shaderIns._create(shaderProcessInfo, shaderPass);
            if (Laya.Shader3D.debugMode) {
                let defineString = shaderProcessInfo.defineString;
                let is2D = shaderProcessInfo.is2D;
                Laya.ShaderVariantCollection.active.add(shaderPass, defineString, is2D);
            }
            return shaderIns;
        }
        createIndexBuffer(bufferUsage) {
            return new GLESIndexBuffer(Laya.BufferTargetType.ELEMENT_ARRAY_BUFFER, bufferUsage);
        }
        createVertexBuffer(bufferUsageType) {
            return new GLESVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, bufferUsageType);
        }
        createBufferState() {
            return new GLESBufferState();
        }
        createRenderGeometryElement(mode, drawType) {
            return new GLESRenderGeometryElement(mode, drawType);
        }
        createComputeContext() {
            return new GLESComputeContext();
        }
        createComputeShader(info) {
            let shader = new GLESComputeShaderInstance(info.name);
            shader.compile(info);
            return shader;
        }
        createDeviceBuffer(type) {
            return new GLESDeviceBuffer(type);
        }
        createEngine(config, canvas) {
            let engine;
            let glConfig = { stencil: Laya.Config.isStencil, alpha: Laya.Config.isAlpha, antialias: Laya.Config.isAntialias, premultipliedAlpha: Laya.Config.premultipliedAlpha, preserveDrawingBuffer: Laya.Config.preserveDrawingBuffer, depth: Laya.Config.isDepth, failIfMajorPerformanceCaveat: Laya.Config.isfailIfMajorPerformanceCaveat, powerPreference: Laya.Config.powerPreference };
            const webglMode = Laya.Config.useWebGL2 ? exports.GLESMode.Auto : exports.GLESMode.WebGL1;
            engine = new GLESEngine(glConfig, webglMode);
            engine.initRenderEngine(canvas.source);
            new Laya.LayaGL();
            Laya.LayaGL.renderEngine = engine;
            Laya.LayaGL.textureContext = engine.getTextureContext();
            Laya.Laya.addAfterInitCallback(this.afterInit);
            return Promise.resolve();
        }
        afterInit() {
            GLESRenderDeviceFactory._setVertexDec(Laya.VertexMesh.instanceWorldMatrixDeclaration, "instanceWorldMatrixDeclaration");
            GLESRenderDeviceFactory._setVertexDec(Laya.VertexMesh.instanceLightMapScaleOffsetDeclaration, "instanceLightMapScaleOffsetDeclaration");
            GLESRenderDeviceFactory._setVertexDec(Laya.VertexMesh.instanceSimpleAnimatorDeclaration, "instanceSimpleAnimatorDeclaration");
        }
        static _setVertexDec(value, regName) {
            let shaderValues = value._shaderValues;
            for (var k in shaderValues) {
                Laya.LayaGL.renderEngine._nativeObj.regGlobalVertexDeclaration(regName, parseInt(k), shaderValues[k]);
            }
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        var _a;
        if (!Laya.LayaGL.renderDeviceFactory) {
            Laya.LayaGL.renderDeviceFactory = new GLESRenderDeviceFactory();
            let statisticsContext = new RTStatisContext();
            (_a = Laya.LayaGL.statAgent) === null || _a === void 0 ? void 0 : _a.cloneTo(statisticsContext);
            Laya.LayaGL.statAgent = statisticsContext;
        }
    });

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
    exports.GLESBlit2DQuadCMD = GLESBlit2DQuadCMD;
    exports.GLESBufferState = GLESBufferState;
    exports.GLESCommandUniformMap = GLESCommandUniformMap;
    exports.GLESComputeContext = GLESComputeContext;
    exports.GLESComputeShaderInstance = GLESComputeShaderInstance;
    exports.GLESDeviceBuffer = GLESDeviceBuffer;
    exports.GLESDraw2DElementCMD = GLESDraw2DElementCMD;
    exports.GLESEngine = GLESEngine;
    exports.GLESIndexBuffer = GLESIndexBuffer;
    exports.GLESInternalRT = GLESInternalRT;
    exports.GLESInternalTex = GLESInternalTex;
    exports.GLESMeshRenderBatchAgent = GLESMeshRenderBatchAgent;
    exports.GLESPrimitiveRenderElement2D = GLESPrimitiveRenderElement2D;
    exports.GLESRender2DProcess = GLESRender2DProcess;
    exports.GLESRenderContext2D = GLESRenderContext2D;
    exports.GLESRenderDeviceFactory = GLESRenderDeviceFactory;
    exports.GLESRenderElement2D = GLESRenderElement2D;
    exports.GLESRenderGeometryElement = GLESRenderGeometryElement;
    exports.GLESSetRenderData = GLESSetRenderData;
    exports.GLESSetRendertarget2DCMD = GLESSetRendertarget2DCMD;
    exports.GLESSetShaderDefine = GLESSetShaderDefine;
    exports.GLESShaderData = GLESShaderData;
    exports.GLESShaderInstance = GLESShaderInstance;
    exports.GLESTextureContext = GLESTextureContext;
    exports.GLESVertexBuffer = GLESVertexBuffer;
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

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.opengl_2D.js.map
