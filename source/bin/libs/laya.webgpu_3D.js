(function (exports, Laya) {
    'use strict';

    class RenderCullUtil {
        static cullByCameraCullInfo(cameraCullInfo, list, count, opaqueList, transparent, context) {
            const boundFrustum = cameraCullInfo.boundFrustum;
            const cullMask = cameraCullInfo.cullingMask;
            const staticMask = cameraCullInfo.staticMask;
            let render;
            let canPass;
            for (let i = 0; i < count; i++) {
                render = list[i];
                canPass = ((1 << render.layer) & cullMask) != 0 && (render.renderbitFlag == 0);
                canPass = canPass && ((render.staticMask & staticMask) != 0);
                if (canPass) {
                    if (!cameraCullInfo.useOcclusionCulling || render._needRender(boundFrustum)) {
                        render.distanceForSort = Laya.Vector3.distanceSquared(render.bounds._imp.getCenter(), cameraCullInfo.position);
                        render._renderUpdatePre(context);
                        let element;
                        const elements = render.renderelements;
                        for (let j = 0, len = elements.length; j < len; j++) {
                            element = elements[j];
                            if (element.materialRenderQueue > 2500)
                                transparent.addRenderElement(element);
                            else
                                opaqueList.addRenderElement(element);
                        }
                    }
                }
            }
        }
        static cullDirectLightShadow(shadowCullInfo, list, count, opaqueList, context) {
            opaqueList.clear();
            for (let i = 0; i < count; i++) {
                const render = list[i];
                if (render.shadowCullPass()) {
                    if (Laya.FrustumCulling.cullingRenderBounds(render.bounds, shadowCullInfo)) {
                        render.distanceForSort = Laya.Vector3.distanceSquared(render.bounds._imp.getCenter(), shadowCullInfo.position);
                        render._renderUpdatePre(context);
                        let element;
                        const elements = render.renderelements;
                        for (let j = 0, len = elements.length; j < len; j++) {
                            element = elements[j];
                            if (element.materialRenderQueue < 2500)
                                opaqueList.addRenderElement(element);
                        }
                    }
                }
            }
        }
        static cullSpotShadow(cameraCullInfo, list, count, opaqueList, context) {
            opaqueList.clear();
            const boundFrustum = cameraCullInfo.boundFrustum;
            for (let i = 0; i < count; i++) {
                const render = list[i];
                render._renderUpdatePre(context);
                if (render.shadowCullPass()) {
                    render.distanceForSort = Laya.Vector3.distanceSquared(render.bounds._imp.getCenter(), cameraCullInfo.position);
                    if (render._needRender(boundFrustum)) {
                        let element;
                        const elements = render.renderelements;
                        for (let j = 0, len = elements.length; j < len; j++) {
                            element = elements[j];
                            if (element.materialRenderQueue < 2500)
                                opaqueList.addRenderElement(element);
                        }
                    }
                }
            }
        }
    }

    class RenderPassUtil {
        static renderCmd(cmds, context) {
            if (cmds && cmds.length > 0)
                cmds.forEach(value => context.runCMDList(value._renderCMDs));
        }
        static recoverRenderContext3D(context, renderTarget) {
            context.setViewPort(this.contextViewPortCache);
            context.setScissor(this.contextScissorCache);
            context.setRenderTarget(renderTarget, Laya.RenderClearFlag.Nothing);
        }
    }
    RenderPassUtil.contextViewPortCache = new Laya.Viewport();
    RenderPassUtil.contextScissorCache = new Laya.Vector4();

    class RenderQuickSort {
        sort(elements, isTransparent, left, right) {
            this.elementArray = elements;
            this.isTransparent = isTransparent;
            this._quickSort(left, right);
        }
        _quickSort(left, right) {
            if (this.elementArray.length > 1) {
                const index = this._partitionRenderObject(left, right);
                const leftIndex = index - 1;
                if (left < leftIndex)
                    this._quickSort(left, leftIndex);
                if (index < right)
                    this._quickSort(index, right);
            }
        }
        _partitionRenderObject(left, right) {
            const elements = this.elementArray.elements;
            const pivot = elements[Math.floor((right + left) / 2)];
            while (left <= right) {
                while (this._compare(elements[left], pivot) < 0)
                    left++;
                while (this._compare(elements[right], pivot) > 0)
                    right--;
                if (left < right) {
                    const temp = elements[left];
                    elements[left] = elements[right];
                    elements[right] = temp;
                    left++;
                    right--;
                }
                else if (left === right) {
                    left++;
                    break;
                }
            }
            return left;
        }
        _compare(left, right) {
            const renderQueue = left.materialRenderQueue - right.materialRenderQueue;
            if (renderQueue === 0) {
                const sort = this.isTransparent ? right.owner.distanceForSort - left.owner.distanceForSort : left.owner.distanceForSort - right.owner.distanceForSort;
                return sort + right.owner.sortingFudge - left.owner.sortingFudge;
            }
            else
                return renderQueue;
        }
    }

    class RenderListQueue {
        get elements() { return this._elements; }
        constructor(isTransParent) {
            this._elements = new Laya.FastSinglelist();
            this._isTransparent = isTransParent;
            this._quickSort = new RenderQuickSort();
            this._batch = Laya.Laya3DRender.Render3DPassFactory.createInstanceBatch();
        }
        addRenderElement(renderelement) {
            renderelement.materialShaderData && this._elements.add(renderelement);
        }
        _batchQueue() {
            if (!this._isTransparent) {
                let time = performance.now();
                this._batch.batch(this._elements);
                Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_3DBatchTime, performance.now() - time);
            }
        }
        renderQueue(context) {
            this._batchQueue();
            const count = this._elements.length;
            this._quickSort.sort(this._elements, this._isTransparent, 0, count - 1);
            context.drawRenderElementList(this._elements);
            Laya.LayaGL.statAgent.recordCTData(this._isTransparent ? Laya.StatElement.CT_TransDrawCall : Laya.StatElement.CT_OpaqueDrawCall, this.elements.length);
            this._batch.clearRenderData();
        }
        clear() {
            this._elements.elements.fill(null);
            this._elements.length = 0;
        }
        destroy() {
            this.clear();
            this._elements = null;
        }
    }

    class ForwardAddClusterRP {
        setViewPort(value) {
            value.cloneTo(this._viewPort);
        }
        setScissor(value) {
            value.cloneTo(this._scissor);
        }
        constructor() {
            this._opaqueList = new RenderListQueue(false);
            this._transparent = new RenderListQueue(true);
            this.cameraCullInfo = new Laya.CameraCullInfo();
            this._zBufferParams = new Laya.Vector4();
            this._scissor = new Laya.Vector4();
            this._viewPort = new Laya.Viewport();
            this._defaultNormalDepthColor = new Laya.Color(0.5, 0.5, 1, 0);
            this.clearColor = new Laya.Color();
            this.depthPipelineMode = "ShadowCaster";
            this.depthNormalPipelineMode = "DepthNormal";
        }
        setCameraCullInfo(camera) {
            this.cameraCullInfo.position = camera._transform.position;
            this.cameraCullInfo.cullingMask = camera.cullingMask;
            this.cameraCullInfo.staticMask = camera.staticMask;
            this.cameraCullInfo.boundFrustum = camera.boundFrustum;
            this.cameraCullInfo.useOcclusionCulling = camera.useOcclusionCulling;
        }
        setBeforeForwardCmds(value) {
            if (value && value.length > 0) {
                this.beforeForwardCmds = value;
                value.forEach(element => element._apply(false));
            }
        }
        setBeforeSkyboxCmds(value) {
            if (value && value.length > 0) {
                this.beforeSkyboxCmds = value;
                value.forEach(element => element._apply(false));
            }
        }
        setBeforeTransparentCmds(value) {
            if (value && value.length > 0) {
                this.beforeTransparentCmds = value;
                value.forEach(element => element._apply(false));
            }
        }
        render(context, list, count) {
            context.cameraUpdateMask++;
            this._clearRenderList();
            var time = performance.now();
            RenderCullUtil.cullByCameraCullInfo(this.cameraCullInfo, list, count, this._opaqueList, this._transparent, context);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_CullMain, performance.now() - time);
            time = performance.now();
            if ((this.depthTextureMode & Laya.DepthTextureMode.Depth) != 0)
                this._renderDepthPass(context);
            if ((this.depthTextureMode & Laya.DepthTextureMode.DepthNormals) != 0)
                this._renderDepthNormalPass(context);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_DepthPass, performance.now() - time);
            this._cacheViewPortAndScissor();
            time = performance.now();
            this._mainPass(context);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_3DMainPass, performance.now() - time);
            this._opaqueList._batch.recoverData();
        }
        _clearRenderList() {
            this._opaqueList.clear();
            this._transparent.clear();
        }
        _cacheViewPortAndScissor() {
            this._viewPort.cloneTo(RenderPassUtil.contextViewPortCache);
            this._scissor.cloneTo(RenderPassUtil.contextScissorCache);
        }
        _renderDepthPass(context) {
            context.pipelineMode = this.depthPipelineMode;
            const viewport = this._viewPort;
            const shadervalue = context.sceneData;
            shadervalue.addDefine(Laya.DepthPass.DEPTHPASS);
            shadervalue.setVector(Laya.DepthPass.DEFINE_SHADOW_BIAS, Laya.Vector4.ZERO);
            Laya.Viewport.TEMP.set(viewport.x, viewport.y, viewport.width, viewport.height);
            Laya.Vector4.TEMP.setValue(viewport.x, viewport.y, viewport.width, viewport.height);
            context.setViewPort(Laya.Viewport.TEMP);
            context.setScissor(Laya.Vector4.TEMP);
            context.setRenderTarget(this.depthTarget, Laya.RenderClearFlag.Depth);
            context.setClearData(Laya.RenderClearFlag.Depth, Laya.Color.BLACK, 1, 0);
            this._opaqueList.renderQueue(context);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_DepthCastDrawCall, this._opaqueList.elements.length);
            const far = this.camera.farPlane;
            const near = this.camera.nearPlane;
            this._zBufferParams.setValue(1.0 - far / near, far / near, (near - far) / (near * far), 1 / near);
            context.cameraData.setVector(Laya.DepthPass.DEFINE_SHADOW_BIAS, Laya.DepthPass.SHADOW_BIAS);
            context.cameraData.setVector(Laya.DepthPass.DEPTHZBUFFERPARAMS, this._zBufferParams);
            Laya.Camera.depthPass._setupDepthModeShaderValue(Laya.DepthTextureMode.Depth, this.camera);
            shadervalue.removeDefine(Laya.DepthPass.DEPTHPASS);
        }
        _renderDepthNormalPass(context) {
            context.pipelineMode = this.depthNormalPipelineMode;
            this.camera._shaderValues.setTexture(Laya.DepthPass.DEPTHNORMALSTEXTURE, Laya.Texture2D.blackTexture);
            const viewport = this._viewPort;
            Laya.Viewport.TEMP.set(viewport.x, viewport.y, viewport.width, viewport.height);
            Laya.Vector4.TEMP.setValue(viewport.x, viewport.y, viewport.width, viewport.height);
            context.setViewPort(Laya.Viewport.TEMP);
            context.setScissor(Laya.Vector4.TEMP);
            context.setClearData(Laya.RenderClearFlag.Color | Laya.RenderClearFlag.Depth, this._defaultNormalDepthColor, 1, 0);
            context.setRenderTarget(this.depthNormalTarget, Laya.RenderClearFlag.Color | Laya.RenderClearFlag.Depth);
            this._opaqueList.renderQueue(context);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_DepthCastDrawCall, this._opaqueList.elements.length);
            Laya.Camera.depthPass._setupDepthModeShaderValue(Laya.DepthTextureMode.DepthNormals, this.camera);
        }
        _mainPass(context) {
            context.pipelineMode = this.pipelineMode;
            RenderPassUtil.renderCmd(this.beforeForwardCmds, context);
            RenderPassUtil.recoverRenderContext3D(context, this.destTarget);
            context.setClearData(this.clearFlag, this.clearColor, 1, 0);
            var time = performance.now();
            this._opaqueList.renderQueue(context);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_3DMainPass_Opaque, performance.now() - time);
            RenderPassUtil.renderCmd(this.beforeSkyboxCmds, context);
            if (this.skyRenderNode) {
                const skyRenderElement = this.skyRenderNode.renderelements[0];
                if (skyRenderElement.subShader)
                    context.drawRenderElementOne(skyRenderElement);
            }
            if (this.enableOpaque)
                this._opaqueTexturePass();
            RenderPassUtil.renderCmd(this.beforeTransparentCmds, context);
            RenderPassUtil.recoverRenderContext3D(context, this.destTarget);
            time = performance.now();
            this._transparent.renderQueue(context);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_3DMainPass_Trans, performance.now() - time);
        }
        _opaqueTexturePass() {
        }
    }

    class WebBaseRenderNode {
        get shaderData() {
            return this._shaderData;
        }
        set shaderData(value) {
            this._shaderData = value;
        }
        _renderUpdatePre(context3D) {
            if (this._updateMark == context3D.cameraUpdateMask)
                return;
            this._renderUpdatePreFun.call(this._renderUpdatePreCall, context3D);
            this._updateMark = context3D.cameraUpdateMask;
        }
        _calculateBoundingBox() {
            this._caculateBoundingBoxFun.call(this._caculateBoundingBoxCall);
        }
        get bounds() {
            if (this.boundsChange) {
                this._calculateBoundingBox();
                this.boundsChange = false;
            }
            return this._bounds;
        }
        set bounds(value) {
            this._bounds = value;
        }
        get additionShaderData() {
            return this._additionShaderData;
        }
        set additionShaderData(value) {
            this._additionShaderData = value;
            if (value) {
                this._additionShaderDataKeys = Array.from(this._additionShaderData.keys());
            }
            else {
                this._additionShaderDataKeys = [];
            }
        }
        constructor() {
            this.ismoved = new Laya.Vector2();
            this.renderelements = [];
            this._commonUniformMap = [];
            this._worldParams = new Laya.Vector4(1, 0, 0, 0);
            this.lightmapDirtyFlag = -1;
            this.lightmapScaleOffset = new Laya.Vector4(1, 1, 0, 0);
            this.set_caculateBoundingBox(this, this._ownerCalculateBoundingBox);
            this._additionShaderData = new Map();
        }
        setNodeCustomData(dataSlot, data) {
            switch (dataSlot) {
                case 0:
                    this._worldParams.y = data;
                    break;
                case 1:
                    this._worldParams.z = data;
                    break;
                case 2:
                    this._worldParams.w = data;
                    break;
            }
        }
        set_renderUpdatePreCall(call, fun) {
            this._renderUpdatePreCall = call;
            this._renderUpdatePreFun = fun;
        }
        set_caculateBoundingBox(call, fun) {
            this._caculateBoundingBoxCall = call;
            this._caculateBoundingBoxFun = fun;
        }
        _needRender(boundFrustum) {
            if (boundFrustum)
                return boundFrustum.intersects(this.bounds);
            else
                return true;
        }
        setRenderelements(value) {
            this.renderelements.length = 0;
            for (var i = 0; i < value.length; i++) {
                this.renderelements.push(value[i]);
                value[i].owner = this;
            }
        }
        setOneMaterial(index, mat) {
            if (!this.renderelements[index])
                return;
            this.renderelements[index].materialShaderData = mat.shaderData;
            this.renderelements[index].materialRenderQueue = mat.renderQueue;
            this.renderelements[index].subShader = mat.shader.getSubShaderAt(0);
            this.renderelements[index].materialId = mat._id;
        }
        setLightmapScaleOffset(value) {
            value && value.cloneTo(this.lightmapScaleOffset);
        }
        setCommonUniformMap(value) {
            this._commonUniformMap.length = 0;
            value.forEach(element => {
                this._commonUniformMap.push(element);
            });
        }
        shadowCullPass() {
            return this.castShadow && this.enable && (this.renderbitFlag == 0);
        }
        _ownerCalculateBoundingBox() {
            this.baseGeometryBounds._tranform(this.transform.worldMatrix, this._bounds);
        }
        _applyLightMapParams() {
            let shaderValues = this.shaderData;
            if (this.lightmap) {
                let lightMap = this.lightmap;
                shaderValues.setVector(Laya.RenderableSprite3D.LIGHTMAPSCALEOFFSET, this.lightmapScaleOffset);
                shaderValues._setInternalTexture(Laya.RenderableSprite3D.LIGHTMAP, lightMap.lightmapColor);
                shaderValues.addDefine(Laya.RenderableSprite3D.SAHDERDEFINE_LIGHTMAP);
                if (lightMap.lightmapDirection) {
                    shaderValues._setInternalTexture(Laya.RenderableSprite3D.LIGHTMAP_DIRECTION, lightMap.lightmapDirection);
                    shaderValues.addDefine(Laya.RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL);
                }
                else {
                    shaderValues.removeDefine(Laya.RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL);
                }
            }
            else {
                shaderValues.removeDefine(Laya.RenderableSprite3D.SAHDERDEFINE_LIGHTMAP);
                shaderValues.removeDefine(Laya.RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL);
            }
        }
        _applyLightProb() {
            if (this.lightmapIndex >= 0 || !this.volumetricGI)
                return;
            if (this.volumetricGI.updateMark != this.lightProbUpdateMark) {
                this.lightProbUpdateMark = this.volumetricGI.updateMark;
                this.volumetricGI.applyRenderData();
            }
        }
        _applyReflection() {
            if (!this.probeReflection || this.reflectionMode == Laya.ReflectionProbeMode.off)
                return;
            if (this.probeReflection.needUpdate()) {
                this.probeReflection.applyRenderData();
            }
        }
        destroy() {
            this.renderelements.forEach(element => {
                element.destroy();
            });
            this.baseGeometryBounds = null;
            this.transform = null;
            this.lightmapScaleOffset = null;
            this.lightmap = null;
            this.probeReflection = null;
            this.volumetricGI = null;
            this.renderelements.length = 0;
            this.renderelements = null;
            this.shaderData && this.shaderData.destroy();
            this.shaderData = null;
            this._commonUniformMap.length = 0;
            this._commonUniformMap = null;
            this.additionShaderData.clear();
            this.additionShaderData = null;
            this._additionShaderDataKeys.length = 0;
            this._additionShaderDataKeys = null;
        }
    }

    class WebDirectLight {
        constructor() {
            this._shadowFourCascadeSplits = new Laya.Vector3();
            this._direction = new Laya.Vector3();
        }
        setShadowFourCascadeSplits(value) {
            value && value.cloneTo(this._shadowFourCascadeSplits);
        }
        setDirection(value) {
            value && value.cloneTo(this._direction);
        }
    }

    class WebLightmap {
        destroy() {
            this.lightmapColor = null;
            this.lightmapDirection = null;
        }
    }

    var CLS = null;
    function WebMeshRenderNode() {
        if (!CLS)
            CLS = class extends WebBaseRenderNode.BaseRenderNodeClass {
                constructor() {
                    super();
                    this._cacheMoved = new Laya.Vector2(-1, -1);
                    this.set_renderUpdatePreCall(this, this._renderUpdate);
                }
                _renderUpdate(context) {
                    if (context.sceneModuleData.lightmapDirtyFlag != this.lightmapDirtyFlag) {
                        this._applyLightMapParams();
                        this.lightmapDirtyFlag = context.sceneModuleData.lightmapDirtyFlag;
                    }
                    this._applyReflection();
                    this._applyLightProb();
                    if (this.ismoved.x > this._cacheMoved.x || (this.ismoved.x == this._cacheMoved.x && this.ismoved.y > this._cacheMoved.y)) {
                        let trans = this.transform;
                        this.shaderData.setMatrix4x4(Laya.Sprite3D.WORLDMATRIX, trans.worldMatrix);
                        this._worldParams.x = trans.getFrontFaceValue();
                        this.shaderData.setVector(Laya.Sprite3D.WORLDINVERTFRONT, this._worldParams);
                        this.ismoved.cloneTo(this._cacheMoved);
                    }
                }
            };
        return CLS;
    }

    class WebCameraNodeData {
        constructor() {
            this._projectViewMatrix = new Laya.Matrix4x4();
        }
        setProjectionViewMatrix(value) {
            value && value.cloneTo(this._projectViewMatrix);
        }
    }
    class WebSceneNodeData {
    }

    class WebPointLight {
    }

    class WebReflectionProbe {
        constructor() {
            this._id = ++WebReflectionProbe._idCounter;
            this._updateMaskFlag = -1;
            this._shCoefficients = [];
            this._probePosition = new Laya.Vector3();
            this._ambientColor = new Laya.Color();
            this.shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData();
        }
        needUpdate() {
            return this.updateMark != this._updateMaskFlag;
        }
        destroy() {
            this.bound = null;
            delete this._shCoefficients;
            delete this._ambientSH;
            this.shaderData.destroy();
            this.shaderData = null;
        }
        setAmbientSH(value) {
            this._ambientSH = value;
        }
        setShCoefficients(value) {
            this._shCoefficients.length = 0;
            value.forEach(element => {
                var v4 = new Laya.Vector4();
                element.cloneTo(v4);
                this._shCoefficients.push(v4);
            });
        }
        setProbePosition(value) {
            value && value.cloneTo(this._probePosition);
        }
        setreflectionHDRParams(value) {
            value && value.cloneTo(this._reflectionHDRParams);
        }
        setAmbientColor(value) {
            value && value.cloneTo(this._ambientColor);
        }
        applyRenderData() {
            this._updateMaskFlag = this.updateMark;
            let data = this.shaderData;
            if (!this.boxProjection) {
                data.removeDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_SPECCUBE_BOX_PROJECTION);
            }
            else {
                data.addDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_SPECCUBE_BOX_PROJECTION);
                data.setVector3(Laya.ReflectionProbe.REFLECTIONCUBE_PROBEPOSITION, this._probePosition);
                data.setVector3(Laya.ReflectionProbe.REFLECTIONCUBE_PROBEBOXMAX, this.bound.getMax());
                data.setVector3(Laya.ReflectionProbe.REFLECTIONCUBE_PROBEBOXMIN, this.bound.getMin());
            }
            if (this.ambientMode == Laya.AmbientMode.SolidColor) {
                data.removeDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL);
                data.removeDefine(Laya.ReflectionProbe.SHADERDEFINE_GI_IBL);
                data.setColor(Laya.ReflectionProbe.AMBIENTCOLOR, this._ambientColor);
            }
            else if (this.iblTex && this._ambientSH) {
                data.addDefine(Laya.ReflectionProbe.SHADERDEFINE_GI_IBL);
                data.removeDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL);
                if (this.iblTex) {
                    data._setInternalTexture(Laya.ReflectionProbe.IBLTEX, this.iblTex);
                    data.setNumber(Laya.ReflectionProbe.IBLROUGHNESSLEVEL, this.iblTex.maxMipmapLevel);
                }
                this.iblTexRGBD ? data.addDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_IBL_RGBD) : data.removeDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_IBL_RGBD);
                this._ambientSH && data.setBuffer(Laya.ReflectionProbe.AMBIENTSH, this._ambientSH);
            }
            else {
                data.removeDefine(Laya.Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL);
                data.removeDefine(Laya.ReflectionProbe.SHADERDEFINE_GI_IBL);
            }
            data.setNumber(Laya.ReflectionProbe.AMBIENTINTENSITY, this.ambientIntensity);
            data.setNumber(Laya.ReflectionProbe.REFLECTIONINTENSITY, this.reflectionIntensity);
        }
    }
    WebReflectionProbe._idCounter = 0;

    var CLSSK = null;
    function WebSkinRenderNode() {
        if (!CLSSK)
            CLSSK = class extends WebBaseRenderNode.BaseRenderNodeClass {
                constructor() {
                    super();
                    this._bones = [];
                    this.set_renderUpdatePreCall(this, this._renderUpdate);
                }
                setRootBoneTransfom(value) {
                    this._cacheRootBone = value.transform;
                }
                setOwnerTransform(value) {
                    this._owner = value.transform;
                }
                setCacheMesh(cacheMesh) {
                    this._cacheMesh = cacheMesh;
                    this._skinnedDataLoopMarks = new Uint32Array(cacheMesh._inverseBindPoses.length);
                }
                setBones(value) {
                    this._bones = value;
                }
                setSkinnedData(value) {
                    this._skinnedData = value;
                }
                computeSkinnedData() {
                    var bindPoses = this._cacheMesh._inverseBindPoses;
                    var pathMarks = this._cacheMesh._skinnedMatrixCaches;
                    for (var i = 0, n = this._cacheMesh.subMeshCount; i < n; i++) {
                        var subMeshBoneIndices = ((this._cacheMesh.getSubMesh(i)))._boneIndicesList;
                        var subData = this._skinnedData[i];
                        for (var j = 0, m = subMeshBoneIndices.length; j < m; j++) {
                            var boneIndices = subMeshBoneIndices[j];
                            this._computeSubSkinnedData(bindPoses, boneIndices, subData[j], pathMarks);
                        }
                    }
                }
                _computeSubSkinnedData(bindPoses, boneIndices, data, matrixCaches) {
                    for (let k = 0, q = boneIndices.length; k < q; k++) {
                        let index = boneIndices[k];
                        if (this._skinnedDataLoopMarks[index] === Laya.Stat.loopCount) {
                            let c = matrixCaches[index];
                            let preData = this._skinnedData[c.subMeshIndex][c.batchIndex];
                            let srcIndex = c.batchBoneIndex * 16;
                            let dstIndex = k * 16;
                            for (let d = 0; d < 16; d++)
                                data[dstIndex + d] = preData[srcIndex + d];
                        }
                        else {
                            let bone = this._bones[index];
                            if (bone)
                                Laya.Utils3D._mulMatrixArray(bone.transform.worldMatrix.elements, bindPoses[index].elements, 0, data, k * 16);
                            this._skinnedDataLoopMarks[index] = Laya.Stat.loopCount;
                        }
                    }
                }
                _renderUpdate(context3D) {
                    let mat = this._owner.worldMatrix;
                    let worldParams = this._worldParams;
                    worldParams.x = this._owner.getFrontFaceValue();
                    if (this._cacheRootBone) {
                        mat = Laya.Matrix4x4.DEFAULT;
                        worldParams.x = 1;
                    }
                    this._applyLightProb();
                    this._applyReflection();
                    this.shaderData.setMatrix4x4(Laya.Sprite3D.WORLDMATRIX, mat);
                    this.shaderData.setVector(Laya.Sprite3D.WORLDINVERTFRONT, worldParams);
                }
            };
        return CLSSK;
    }

    class WebSpotLight {
        setDirection(value) {
            value.cloneTo(this._direction);
        }
        getWorldMatrix(out) {
            var position = this.transform.position;
            var quaterian = this.transform.rotation;
            Laya.Matrix4x4.createAffineTransformation(position, quaterian, Laya.Vector3.ONE, out);
            return out;
        }
    }

    class WebVolumetricGI {
        constructor() {
            this._id = ++WebVolumetricGI._idCounter;
            this._probeCounts = new Laya.Vector3();
            this._probeStep = new Laya.Vector3();
            this._params = new Laya.Vector4();
            this._params = new Laya.Vector4();
            this.bound = new Laya.Bounds();
            this.shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData();
        }
        setParams(value) {
            value.cloneTo(this._params);
        }
        setProbeCounts(value) {
            value.cloneTo(this._probeCounts);
        }
        setProbeStep(value) {
            value.cloneTo(this._probeStep);
        }
        applyRenderData() {
            let data = this.shaderData;
            data.addDefine(Laya.VolumetricGI.SHADERDEFINE_VOLUMETRICGI);
            data.setVector3(Laya.VolumetricGI.VOLUMETRICGI_PROBECOUNTS, this._probeCounts);
            data.setVector3(Laya.VolumetricGI.VOLUMETRICGI_PROBESTEPS, this._probeStep);
            data.setVector3(Laya.VolumetricGI.VOLUMETRICGI_PROBESTARTPOS, this.bound.getMin());
            data.setVector(Laya.VolumetricGI.VOLUMETRICGI_PROBEPARAMS, this._params);
            data._setInternalTexture(Laya.VolumetricGI.VOLUMETRICGI_IRRADIANCE, this.irradiance);
            data._setInternalTexture(Laya.VolumetricGI.VOLUMETRICGI_DISTANCE, this.distance);
            data.setNumber(Laya.ReflectionProbe.AMBIENTINTENSITY, this.intensity);
        }
        destroy() {
            this.shaderData.destroy();
            this.shaderData = null;
            this.irradiance = null;
            this.distance = null;
            this.bound = null;
        }
    }
    WebVolumetricGI._idCounter = 0;

    var CLASSIMPLESKIN = null;
    function WebSimpleSkinRenderNode() {
        if (!CLASSIMPLESKIN)
            CLASSIMPLESKIN = class extends WebBaseRenderNode.BaseRenderNodeClass {
                constructor() {
                    super();
                    this.set_renderUpdatePreCall(this, this._renderUpdate);
                    this._simpleAnimatorParams = new Laya.Vector4();
                }
                setSimpleAnimatorParams(value) {
                    value.cloneTo(this._simpleAnimatorParams);
                    this.shaderData.setVector(Laya.SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORPARAMS, this._simpleAnimatorParams);
                }
                _renderUpdate(context3D) {
                    let shaderData = this.shaderData;
                    let worldMat = this.transform.worldMatrix;
                    let worldParams = this._worldParams;
                    worldParams.x = this.transform.getFrontFaceValue();
                    shaderData.setMatrix4x4(Laya.Sprite3D.WORLDMATRIX, worldMat);
                    shaderData.setVector(Laya.Sprite3D.WORLDINVERTFRONT, worldParams);
                    this._applyLightProb();
                    this._applyReflection();
                    shaderData.setVector(Laya.SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORPARAMS, this._simpleAnimatorParams);
                }
            };
        return CLASSIMPLESKIN;
    }

    class Web3DRenderModuleFactory {
        createSimpleSkinRenderNode() {
            return new (WebSimpleSkinRenderNode())();
        }
        createTransform(owner) {
            return new Laya.Transform3D(owner);
        }
        createBounds(min, max) {
            return new Laya.BoundsImpl(min, max);
        }
        createVolumetricGI() {
            return new WebVolumetricGI();
        }
        createReflectionProbe() {
            return new WebReflectionProbe();
        }
        createLightmapData() {
            return new WebLightmap();
        }
        createDirectLight() {
            return new WebDirectLight();
        }
        createSpotLight() {
            return new WebSpotLight();
        }
        createPointLight() {
            return new WebPointLight();
        }
        createCameraModuleData() {
            return new WebCameraNodeData();
        }
        createSceneModuleData() {
            return new WebSceneNodeData();
        }
        createBaseRenderNode() {
            let renderNode = new WebBaseRenderNode();
            return renderNode;
        }
        createMeshRenderNode() {
            return new (WebMeshRenderNode())();
        }
        createSkinRenderNode() {
            return new (WebSkinRenderNode())();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.Laya3DRender.Render3DModuleDataFactory) {
            Laya.Laya3DRender.Render3DModuleDataFactory = new Web3DRenderModuleFactory();
        }
    });

    class WebSceneRenderManager {
        constructor() {
            this._list = new Laya.SingletonList();
            this.baseRenderList = new Laya.SingletonList();
        }
        get list() {
            return this._list;
        }
        set list(value) {
            this._list = value;
            let elemnt = this._list.elements;
            this.baseRenderList.clear();
            for (let i = 0; i < this._list.length; i++) {
                this.baseRenderList.add(elemnt[i]._baseRenderNode);
            }
        }
        addRenderObject(object) {
            this._list.add(object);
            this.baseRenderList.add(object._baseRenderNode);
        }
        removeRenderObject(object) {
            this._list.remove(object);
            this.baseRenderList.remove(object._baseRenderNode);
        }
        removeMotionObject(object) {
        }
        updateMotionObjects() {
        }
        addMotionObject(object) {
        }
        destroy() {
            this._list.destroy();
            this.baseRenderList.destroy();
            this._list = null;
            this.baseRenderList = null;
        }
    }

    class WebGPURenderContext3D {
        get sceneData() {
            return this._sceneData;
        }
        set sceneData(value) {
            if (value == this._sceneData)
                return;
            this._sceneData = value;
            if (value) {
                for (let key of this._preDrawUniformMaps) {
                    let uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(key);
                    if (uniformMap._idata.size > 0) {
                        this.sceneData.createSubUniformBuffer(key, key, uniformMap._idata);
                    }
                }
            }
        }
        get cameraData() {
            return this._cameraData;
        }
        set cameraData(value) {
            if (value == this._cameraData)
                return;
            if (value) {
                this._cameraData = value;
                let cameraMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("BaseCamera");
                this.cameraData.createUniformBuffer("BaseCamera", cameraMap);
            }
        }
        get sceneModuleData() {
            return this._sceneModuleData;
        }
        set sceneModuleData(value) {
            this._sceneModuleData = value;
        }
        get cameraModuleData() {
            return this._cameraModuleData;
        }
        set cameraModuleData(value) {
            this._cameraModuleData = value;
        }
        get globalShaderData() {
            return this._globalShaderData;
        }
        set globalShaderData(value) {
            this._globalShaderData = value;
        }
        get sceneUpdataMask() {
            return this._sceneUpdataMask;
        }
        set sceneUpdataMask(value) {
            this._sceneUpdataMask = value;
        }
        get cameraUpdateMask() {
            return this._cameraUpdateMask;
        }
        set cameraUpdateMask(value) {
            this._cameraUpdateMask = value;
        }
        get pipelineMode() {
            return this._pipelineMode;
        }
        set pipelineMode(value) {
            this._pipelineMode = value;
        }
        get invertY() {
            return this._invertY;
        }
        set invertY(value) {
            this._invertY = value;
        }
        constructor() {
            this._globalComkeyCounter = 0;
            this._globalComkeyNameMap = {};
            this._globalRendercacheInfoMap = new Map();
            this._sceneUpdataMask = 0;
            this._cameraUpdateMask = 0;
            this._clearColor = Laya.Color.BLACK.clone();
            this._needStart = true;
            this._blitFrameCount = 0;
            this._blitScreen = false;
            this._viewScissorSaved = false;
            this._viewPortSave = new Laya.Viewport();
            this._scissorSave = new Laya.Vector4();
            this._renderCommand = new Laya.WebGPURenderCommandEncoder();
            this._cacheGlobalDefines = new Laya.WebDefineDatas();
            this.rtNeedClear = false;
            this.device = Laya.WebGPURenderEngine._instance.getDevice();
            this._preDrawUniformMaps = new Set();
            WebGPURenderContext3D._instance = this;
        }
        globalComkeyToID(name) {
            if (this._globalComkeyNameMap[name] !== undefined) {
                return this._globalComkeyNameMap[name];
            }
            else {
                const id = this._globalComkeyCounter++;
                this._globalComkeyNameMap[name] = id;
                return id;
            }
        }
        _getRenderPipeLine() {
            const engine = Laya.WebGPURenderEngine._instance;
            let sceneCommands = Array.from(this._preDrawUniformMaps);
            let sceneResources = Laya.WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, sceneCommands);
            let sceneLayoutInfo = engine.bindGroupCache.getLayoutInfo(sceneCommands, this._sceneData, null, sceneResources, ~0);
            let cameraCommands = ["BaseCamera"];
            let cameraResources = Laya.WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(1, cameraCommands);
            let cameraLayoutInfo = engine.bindGroupCache.getLayoutInfo(cameraCommands, this.cameraData, null, cameraResources, ~0);
            return `${this.destRT.stateCacheID},${this.invertY ? 1 : 0},(${sceneLayoutInfo.id},${cameraLayoutInfo.id})`;
        }
        _getSceneCameraCacheKey() {
            let key = `${this.sceneData._id ? this.sceneData._id : -1} + ${this.cameraData ? this.cameraData._id : -1}+${this._pipelineMode}+${this.destRT == Laya.WebGPURenderEngine._instance._screenRT ? 0 : 1}`;
            this._curRenderGlobalKey = this.globalComkeyToID(key);
            let pipelineLayout = this._getRenderPipeLine();
            if (!this._globalRendercacheInfoMap.has(this._curRenderGlobalKey)) {
                let cacheInfo = new Laya.WebGPUGlobalPipeLineCacheInfo();
                this._curRenderCacheInfo = cacheInfo;
                this._cacheGlobalDefines.cloneTo(cacheInfo.globalDefineData);
                this._curRenderCacheInfo.globalDefineChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                cacheInfo.pipeLineChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                cacheInfo.globalPipelineCacheKey = pipelineLayout;
                this._globalRendercacheInfoMap.set(this._curRenderGlobalKey, cacheInfo);
                this._pipelineChange = this._curRenderCacheInfo.pipeLineChangeFlag;
            }
            else {
                this._curRenderCacheInfo = this._globalRendercacheInfoMap.get(this._curRenderGlobalKey);
                if (this._curRenderCacheInfo.globalPipelineCacheKey == pipelineLayout) {
                    this._pipelineChange = this._curRenderCacheInfo.pipeLineChangeFlag;
                }
                else {
                    this._pipelineChange = this._curRenderCacheInfo.pipeLineChangeFlag;
                    this._curRenderCacheInfo.globalPipelineCacheKey = pipelineLayout;
                    this._curRenderCacheInfo.pipeLineChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                }
                if (!this._curRenderCacheInfo.globalDefineData.isEual(this._cacheGlobalDefines)) {
                    this._cacheGlobalDefines.cloneTo(this._curRenderCacheInfo.globalDefineData);
                    this._curRenderCacheInfo.globalDefineChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                }
            }
            this._curDefineChangeFlag = this._curRenderCacheInfo.globalDefineChangeFlag;
        }
        _prepareContext() {
            let contextDef = this._cacheGlobalDefines;
            if (this._sceneData) {
                this._sceneData._defineDatas.cloneTo(contextDef);
                for (let key of this._preDrawUniformMaps) {
                    let uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(key);
                    if (uniformMap._idata.size > 0) {
                        let buffer = this.sceneData.createSubUniformBuffer(key, key, uniformMap._idata);
                        buffer.upload();
                    }
                }
                let commandArray = Array.from(this._preDrawUniformMaps);
                let resource = Laya.WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(0, commandArray);
                this._sceneBindGroup = Laya.LayaGL.renderEngine.bindGroupCache.getBindGroup(commandArray, this._sceneData, null, resource, ~0);
            }
            else {
                this._globalConfigShaderData.cloneTo(contextDef);
            }
            if (this.cameraData) {
                contextDef.addDefineDatas(this.cameraData._defineDatas);
                let cameraMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("BaseCamera");
                let cameraBuffer = this.cameraData.createUniformBuffer("BaseCamera", cameraMap);
                if (cameraBuffer) {
                    cameraBuffer.upload();
                }
                let commandArray = ["BaseCamera"];
                let resource = Laya.WebGPUBindGroupHelper.createBindPropertyInfoArrayByCommandMap(1, commandArray);
                this._cameraBindGroup = Laya.LayaGL.renderEngine.bindGroupCache.getBindGroup(commandArray, this.cameraData, null, resource, ~0);
            }
            this._getSceneCameraCacheKey();
        }
        _setScreenRT() {
            if (!this.destRT) {
                const engine = Laya.WebGPURenderEngine._instance;
                engine._screenResized = false;
                if (this._blitFrameCount === Laya.Laya.timer.currFrame) {
                    this.setRenderTarget(engine._screenRT, Laya.RenderClearFlag.Nothing);
                }
                else {
                    this.setRenderTarget(engine._screenRT, Laya.RenderClearFlag.Color | Laya.RenderClearFlag.Depth);
                    engine.hasScreenCleared = true;
                }
                Laya.Color.BLACK.cloneTo(this._clearColor);
                this._blitFrameCount = Laya.Laya.timer.currFrame;
                this._blitScreen = true;
            }
            else
                this._blitScreen = false;
        }
        _start(viewPortAndScissor = true) {
            const renderPassDesc = Laya.WebGPURenderPassHelper.getDescriptor(this.destRT, this._clearFlag, this._clearColor, this._clearDepth, this._clearStencil);
            this._renderCommand.startRender(renderPassDesc);
            this._clearFlag = Laya.RenderClearFlag.Nothing;
            if (viewPortAndScissor) {
                if (this._viewPort) {
                    this._viewPort.y = this._viewPort.y | 0;
                    this._viewPort.width = this._viewPort.width | 0;
                    this._viewPort.height = this._viewPort.height | 0;
                    this._renderCommand.setViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height, 0, 1);
                }
                if (this._scissor) {
                    this._scissor.y = this._scissor.y | 0;
                    this._renderCommand.setScissorRect(this._scissor.x, this._scissor.y, this._scissor.z, this._scissor.w);
                }
            }
        }
        _submit() {
            const engine = Laya.WebGPURenderEngine._instance;
            if (this._blitScreen && engine._screenResized)
                return;
            this._renderCommand.end();
            engine.upload();
            this.device.queue.submit([this._renderCommand.finish()]);
            this._needStart = true;
        }
        setRenderTarget(rt, clearFlag) {
            if (rt !== this.destRT) {
                this._clearFlag = clearFlag;
                this.destRT = rt;
                this._needStart = true;
            }
            else {
                if (!this.rtNeedClear) {
                    this._clearFlag = clearFlag;
                }
                else {
                    if (clearFlag != Laya.RenderClearFlag.Nothing) {
                        this._clearFlag |= clearFlag;
                    }
                }
            }
        }
        setViewPort(value) {
            this._viewPort = value;
        }
        setScissor(value) {
            this._scissor = value;
        }
        saveViewPortAndScissor() {
            if (this._viewPort && this._scissor) {
                this._viewPort.cloneTo(this._viewPortSave);
                this._scissor.cloneTo(this._scissorSave);
                this._viewScissorSaved = true;
            }
        }
        restoreViewPortAndScissor() {
            if (this._viewScissorSaved) {
                this._viewPortSave.cloneTo(this._viewPort);
                this._scissorSave.cloneTo(this._scissor);
                this._viewScissorSaved = false;
            }
        }
        setClearData(flag, color, depth, stencil) {
            if (this.rtNeedClear) {
                if (flag & Laya.RenderClearFlag.Color) {
                    this._clearFlag |= Laya.RenderClearFlag.Color;
                    color.cloneTo(this._clearColor);
                }
                if (flag & Laya.RenderClearFlag.Depth) {
                    this._clearFlag |= Laya.RenderClearFlag.Depth;
                    this._clearDepth = depth;
                }
                if (flag & Laya.RenderClearFlag.Stencil) {
                    this._clearFlag |= Laya.RenderClearFlag.Stencil;
                    this._clearStencil = stencil;
                }
            }
            else {
                this._clearFlag = flag;
                this._clearDepth = depth;
                this._clearStencil = stencil;
                color.cloneTo(this._clearColor);
            }
            if (flag != Laya.RenderClearFlag.Nothing) {
                this.rtNeedClear = true;
            }
            return 0;
        }
        drawRenderElementList(list) {
            const len = list.length;
            if (len === 0)
                return 0;
            this._setScreenRT();
            let time = Laya.Browser.now();
            this._prepareContext();
            const elements = list.elements;
            let element;
            for (let i = 0; i < len; i++) {
                element = elements[i];
                element._preUpdatePre(this);
            }
            Laya.WebGPURenderEngine._instance.gpuBufferMgr.upload();
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_3DContextPre, Laya.Browser.now() - time);
            time = Laya.Browser.now();
            if (this._needStart) {
                this._start();
                this._needStart = false;
            }
            let cmd = this._renderCommand;
            cmd.setBindGroup(0, this._sceneBindGroup);
            cmd.setBindGroup(1, this._cameraBindGroup);
            for (let i = 0; i < len; i++)
                elements[i]._render(this, cmd);
            this._submit();
            this.rtNeedClear = false;
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_3DContextRender, Laya.Browser.now() - time);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_3DDrawCall, list.length);
            Laya.WebGPURenderEngine._instance._framePassCount++;
            return 0;
        }
        drawRenderElementOne(node) {
            this._setScreenRT();
            this._prepareContext();
            node._preUpdatePre(this);
            Laya.WebGPURenderEngine._instance.gpuBufferMgr.upload();
            if (this._needStart) {
                this._start();
                this._needStart = false;
            }
            this._renderCommand.setBindGroup(0, this._sceneBindGroup);
            this._renderCommand.setBindGroup(1, this._cameraBindGroup);
            node._render(this, this._renderCommand);
            this._submit();
            this.rtNeedClear = false;
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_3DDrawCall, 1);
            Laya.WebGPURenderEngine._instance._framePassCount++;
            return 0;
        }
        runCMDList(cmds) {
            cmds.forEach((cmd, index) => {
                cmd.apply(this);
            });
        }
        runOneCMD(cmd) {
            cmd.apply(this);
        }
        clearRenderTarget() {
            this._start(false);
            this._submit();
        }
        destroy() {
            this._renderCommand.destroy();
            this.destRT = null;
        }
    }

    class WebGPUForwardAddClusterRP extends ForwardAddClusterRP {
        constructor() {
            super();
            let context = WebGPURenderContext3D._instance;
            context._preDrawUniformMaps.add("Scene3D");
            context._preDrawUniformMaps.add("Global");
            context._preDrawUniformMaps.add("Shadow");
        }
        _mainPass(context) {
            context.pipelineMode = this.pipelineMode;
            context.setRenderTarget(this.destTarget, this.clearFlag);
            context.setClearData(this.clearFlag, this.clearColor, 1, 0);
            RenderPassUtil.renderCmd(this.beforeForwardCmds, context);
            RenderPassUtil.recoverRenderContext3D(context, this.destTarget);
            context.setClearData(this.clearFlag, this.clearColor, 1, 0);
            this._opaqueList.renderQueue(context);
            RenderPassUtil.renderCmd(this.beforeSkyboxCmds, context);
            RenderPassUtil.recoverRenderContext3D(context, this.destTarget);
            let skyClear = this.skyRenderNode && this.skyRenderNode.renderelements[0].subShader;
            if (skyClear) {
                const skyRenderElement = this.skyRenderNode.renderelements[0];
                context.drawRenderElementOne(skyRenderElement);
            }
            else {
                if (this._opaqueList.elements.length == 0) {
                    context.clearRenderTarget();
                }
            }
            this.enableOpaque && this._opaqueTexturePass();
            RenderPassUtil.renderCmd(this.beforeTransparentCmds, context);
            RenderPassUtil.recoverRenderContext3D(context, this.destTarget);
            context.setClearData(Laya.RenderClearFlag.Nothing, this.clearColor, 1, 0);
            this._transparent.renderQueue(context);
        }
    }

    class WebGPUDirectLightShadowRP {
        get shadowCasterCommanBuffer() {
            return this._shadowCasterCommanBuffer;
        }
        set shadowCasterCommanBuffer(value) {
            this._shadowCasterCommanBuffer = value;
        }
        set light(value) {
            this._light = value;
            const lightWorld = Laya.Matrix4x4.TEMP;
            const lightWorldE = lightWorld.elements;
            const lightUp = this._lightUp;
            const lightSide = this._lightSide;
            const lightForward = this._lightForward;
            Laya.Matrix4x4.createFromQuaternion(this._light.transform.rotation, lightWorld);
            lightSide.setValue(lightWorldE[0], lightWorldE[1], lightWorldE[2]);
            lightUp.setValue(lightWorldE[4], lightWorldE[5], lightWorldE[6]);
            lightForward.setValue(-lightWorldE[8], -lightWorldE[9], -lightWorldE[10]);
            const atlasResolution = this._light.shadowResolution;
            const cascadesMode = this.shadowCastMode = this._light.shadowCascadesMode;
            if (cascadesMode === Laya.ShadowCascadesMode.NoCascades) {
                this._cascadeCount = 1;
                this._shadowTileResolution = atlasResolution;
                this._shadowMapWidth = atlasResolution;
                this._shadowMapHeight = atlasResolution;
            }
            else {
                this._cascadeCount = cascadesMode === Laya.ShadowCascadesMode.TwoCascades ? 2 : 4;
                let shadowTileResolution = Laya.ShadowUtils.getMaxTileResolutionInAtlas(atlasResolution, atlasResolution, this._cascadeCount);
                this._shadowTileResolution = shadowTileResolution;
                this._shadowMapWidth = shadowTileResolution * 2;
                this._shadowMapHeight = cascadesMode === Laya.ShadowCascadesMode.TwoCascades ? shadowTileResolution : shadowTileResolution * 2;
            }
        }
        get light() {
            return this._light;
        }
        constructor() {
            this._cascadesSplitDistance = new Array(WebGPUDirectLightShadowRP._maxCascades + 1);
            this._frustumPlanes = [];
            this._shadowMatrices = new Float32Array(WebGPUDirectLightShadowRP._maxCascades * 16);
            this._splitBoundSpheres = new Float32Array(WebGPUDirectLightShadowRP._maxCascades * 4);
            this._shadowSliceDatas = [new Laya.ShadowSliceData(), new Laya.ShadowSliceData(), new Laya.ShadowSliceData(), new Laya.ShadowSliceData()];
            this._shadowMapSize = new Laya.Vector4();
            this._shadowBias = new Laya.Vector4();
            this._cascadeCount = 0;
            this._shadowMapWidth = 0;
            this._shadowMapHeight = 0;
            this._shadowTileResolution = 0;
            this._lightUp = new Laya.Vector3();
            this._lightSide = new Laya.Vector3();
            this._lightForward = new Laya.Vector3();
            this._renderQueue = new RenderListQueue(false);
            for (let i = 0; i < 6; i++)
                this._frustumPlanes.push(new Laya.Plane(new Laya.Vector3(), 0));
            this._shadowCullInfo = new Laya.ShadowCullInfo();
        }
        update(context) {
            const light = this._light;
            const camera = this.camera;
            const splitDistance = this._cascadesSplitDistance;
            const frustumPlanes = this._frustumPlanes;
            const cameraNear = camera.nearplane;
            const shadowFar = Math.min(camera.farplane, light.shadowDistance);
            const shadowMatrices = this._shadowMatrices;
            const boundSpheres = this._splitBoundSpheres;
            Laya.ShadowUtils.getCascadesSplitDistance(light.shadowTwoCascadeSplits, light._shadowFourCascadeSplits, cameraNear, shadowFar, camera.fieldOfView * Laya.MathUtils3D.Deg2Rad, camera.aspectRatio, this.shadowCastMode, splitDistance);
            Laya.ShadowUtils.getCameraFrustumPlanes(camera._projectViewMatrix, frustumPlanes);
            const forward = Laya.Vector3.TEMP;
            camera.transform.getForward(forward);
            Laya.Vector3.normalize(forward, forward);
            let sliceData;
            for (let i = 0; i < this._cascadeCount; i++) {
                sliceData = this._shadowSliceDatas[i];
                sliceData.sphereCenterZ = Laya.ShadowUtils.getBoundSphereByFrustum(splitDistance[i], splitDistance[i + 1], camera.fieldOfView * Laya.MathUtils3D.Deg2Rad, camera.aspectRatio, camera.transform.position, forward, sliceData.splitBoundSphere);
                Laya.ShadowUtils.getDirectionLightShadowCullPlanes(frustumPlanes, i, splitDistance, cameraNear, this._lightForward, sliceData);
                Laya.ShadowUtils.getDirectionalLightMatrices(this._lightUp, this._lightSide, this._lightForward, i, light.shadowNearPlane, this._shadowTileResolution, sliceData, shadowMatrices);
                if (this._cascadeCount > 1)
                    Laya.ShadowUtils.applySliceTransform(sliceData, this._shadowMapWidth, this._shadowMapHeight, i, shadowMatrices);
            }
            Laya.ShadowUtils.prepareShadowReceiverShaderValues(this._shadowMapWidth, this._shadowMapHeight, this._shadowSliceDatas, this._cascadeCount, this._shadowMapSize, shadowMatrices, boundSpheres);
        }
        render(context, list, count) {
            const sceneData = context.sceneData;
            const originCameraData = context.cameraData;
            const originInvertY = context.invertY;
            const shadowMap = this.destTarget;
            context.pipelineMode = 'ShadowCaster';
            context.setRenderTarget(shadowMap, Laya.RenderClearFlag.Depth);
            context.saveViewPortAndScissor();
            Laya.Viewport.TEMP.set(0, 0, this._shadowMapWidth, this._shadowMapHeight);
            Laya.Vector4.TEMP.setValue(0, 0, this._shadowMapWidth, this._shadowMapHeight);
            context.setViewPort(Laya.Viewport.TEMP);
            context.setScissor(Laya.Vector4.TEMP);
            context.setClearData(Laya.RenderClearFlag.Depth, Laya.Color.BLACK, 1, 0);
            for (let i = 0, n = this._cascadeCount; i < n; i++) {
                const sliceData = this._shadowSliceDatas[i];
                this._getShadowBias(sliceData.projectionMatrix, sliceData.resolution, this._shadowBias);
                this._setupShadowCasterShaderValues(sceneData, sliceData, this._lightForward, this._shadowBias);
                const shadowCullInfo = this._shadowCullInfo;
                shadowCullInfo.position = sliceData.position;
                shadowCullInfo.cullPlanes = sliceData.cullPlanes;
                shadowCullInfo.cullPlaneCount = sliceData.cullPlaneCount;
                shadowCullInfo.cullSphere = sliceData.splitBoundSphere;
                shadowCullInfo.direction = this._lightForward;
                var time = Laya.Browser.now();
                RenderCullUtil.cullDirectLightShadow(shadowCullInfo, list, count, this._renderQueue, context);
                Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_CullShadow, Laya.Browser.now() - time);
                let cameraDephtTex = context.cameraData.getTexture(Laya.DepthPass.DEPTHTEXTURE);
                sliceData.cameraShaderValue.setTexture(Laya.DepthPass.DEPTHTEXTURE, cameraDephtTex);
                context.cameraData = sliceData.cameraShaderValue;
                context.invertY = false;
                context.cameraUpdateMask++;
                const resolution = sliceData.resolution;
                const offsetX = sliceData.offsetX;
                const offsetY = sliceData.offsetY;
                if (this._renderQueue.elements.length > 0) {
                    Laya.Viewport.TEMP.set(offsetX, offsetY, resolution, resolution);
                    Laya.Vector4.TEMP.setValue(offsetX + 1, offsetY + 1, resolution - 2, resolution - 2);
                    context.setViewPort(Laya.Viewport.TEMP);
                    context.setScissor(Laya.Vector4.TEMP);
                }
                else {
                    Laya.Viewport.TEMP.set(offsetX, offsetY, resolution, resolution);
                    Laya.Vector4.TEMP.setValue(offsetX, offsetY, resolution, resolution);
                    context.setViewPort(Laya.Viewport.TEMP);
                    context.setScissor(Laya.Vector4.TEMP);
                }
                if (this._renderQueue.elements.length > 0) {
                    this._renderQueue.renderQueue(context);
                }
                else {
                    context.clearRenderTarget();
                }
                Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_ShadowDrawCall, this._renderQueue.elements.length);
                this._applyCasterPassCommandBuffer(context);
                context.setClearData(Laya.RenderClearFlag.Nothing, Laya.Color.BLACK, 1, 0);
            }
            this._applyRenderData(context.sceneData, context.cameraData);
            this._renderQueue._batch.recoverData();
            context.restoreViewPortAndScissor();
            context.cameraData = originCameraData;
            context.invertY = originInvertY;
            context.cameraUpdateMask++;
        }
        _applyRenderData(sceneData, cameraData) {
            const light = this._light;
            if (light.shadowCascadesMode !== Laya.ShadowCascadesMode.NoCascades)
                sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE);
            else
                sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE);
            switch (light.shadowMode) {
                case Laya.ShadowMode.Hard:
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                    break;
                case Laya.ShadowMode.SoftLow:
                    sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                    break;
                case Laya.ShadowMode.SoftHigh:
                    sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                    break;
            }
            sceneData.setBuffer(Laya.ShadowCasterPass.SHADOW_MATRICES, this._shadowMatrices);
            sceneData.setVector(Laya.ShadowCasterPass.SHADOW_MAP_SIZE, this._shadowMapSize);
            sceneData.setBuffer(Laya.ShadowCasterPass.SHADOW_SPLIT_SPHERES, this._splitBoundSpheres);
        }
        _applyCasterPassCommandBuffer(context) {
            if (this.shadowCasterCommanBuffer && this.shadowCasterCommanBuffer.length > 0)
                this.shadowCasterCommanBuffer.forEach(value => value._apply());
        }
        _getShadowBias(shadowProjectionMatrix, shadowResolution, out) {
            const frustumSize = 2 / shadowProjectionMatrix.elements[0];
            const texelSize = frustumSize / shadowResolution;
            let depthBias = -this._light.shadowDepthBias * texelSize;
            let normalBias = -this._light.shadowNormalBias * texelSize;
            if (this._light.shadowMode === Laya.ShadowMode.SoftHigh) {
                const kernelRadius = 2.5;
                depthBias *= kernelRadius;
                normalBias *= kernelRadius;
            }
            out.setValue(depthBias, normalBias, 0, 0);
        }
        _setupShadowCasterShaderValues(shaderData, shadowSliceData, lightParam, shadowBias) {
            shaderData.setVector(Laya.ShadowCasterPass.SHADOW_BIAS, shadowBias);
            shaderData.setVector3(Laya.ShadowCasterPass.SHADOW_LIGHT_DIRECTION, lightParam);
            shaderData.setMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
            const cameraShaderData = shadowSliceData.cameraShaderValue;
            cameraShaderData.setMatrix4x4(Laya.BaseCamera.VIEWMATRIX, shadowSliceData.viewMatrix);
            cameraShaderData.setMatrix4x4(Laya.BaseCamera.PROJECTMATRIX, shadowSliceData.projectionMatrix);
            cameraShaderData.setMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
        }
    }
    WebGPUDirectLightShadowRP._maxCascades = 4;

    class WebGPUSpotLightShadowRP {
        set light(value) {
            this._light = value;
            this._shadowResolution = this._light.shadowResolution;
            this._lightWorldMatrix = this._light.getWorldMatrix(this._lightWorldMatrix);
            this._lightPos = this._light.transform.position;
            this._spotAngle = this._light.spotAngle;
            this._spotRange = this._light.spotRange;
            this._shadowStrength = this._light.shadowStrength;
        }
        get light() {
            return this._light;
        }
        constructor() {
            this._shadowSpotMapSize = new Laya.Vector4();
            this._shadowSpotMatrices = new Laya.Matrix4x4();
            this._renderQueue = new RenderListQueue(false);
            this._shadowSpotData = new Laya.ShadowSpotData();
            this._lightWorldMatrix = new Laya.Matrix4x4();
            this._shadowBias = new Laya.Vector4();
        }
        update(context) {
            const shadowSpotData = this._shadowSpotData;
            this._getSpotLightShadowData(shadowSpotData, this._shadowResolution, this._shadowSpotMatrices, this._shadowSpotMapSize);
        }
        render(context, list, count) {
            const originCameraData = context.cameraData;
            const shadowSpotData = this._shadowSpotData;
            const shaderData = context.sceneData;
            context.pipelineMode = 'ShadowCaster';
            context.setRenderTarget(this.destTarget, Laya.RenderClearFlag.Depth);
            context.saveViewPortAndScissor();
            this._getShadowBias(shadowSpotData.resolution, this._shadowBias);
            this._setupShadowCasterShaderValues(shaderData, shadowSpotData, this._shadowBias);
            var time = Laya.Browser.now();
            RenderCullUtil.cullSpotShadow(shadowSpotData.cameraCullInfo, list, count, this._renderQueue, context);
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_CullShadow, Laya.Browser.now() - time);
            let cameraDepthTex = context.cameraData.getTexture(Laya.DepthPass.DEPTHTEXTURE);
            shadowSpotData.cameraShaderValue.setTexture(Laya.DepthPass.DEPTHTEXTURE, cameraDepthTex);
            context.cameraData = shadowSpotData.cameraShaderValue;
            context.cameraUpdateMask++;
            Laya.Viewport.TEMP.set(shadowSpotData.offsetX, shadowSpotData.offsetY, shadowSpotData.resolution, shadowSpotData.resolution);
            Laya.Vector4.TEMP.setValue(shadowSpotData.offsetX, shadowSpotData.offsetY, shadowSpotData.resolution, shadowSpotData.resolution);
            context.setViewPort(Laya.Viewport.TEMP);
            context.setScissor(Laya.Vector4.TEMP);
            context.setClearData(Laya.RenderClearFlag.Depth, Laya.Color.BLACK, 1, 0);
            this._renderQueue.renderQueue(context);
            Laya.LayaGL.statAgent.recordCTData(Laya.StatElement.CT_ShadowDrawCall, this._renderQueue.elements.length);
            this._applyCasterPassCommandBuffer(context);
            this._applyRenderData(context.sceneData, context.cameraData);
            context.restoreViewPortAndScissor();
            context.cameraData = originCameraData;
            context.cameraUpdateMask++;
        }
        _getSpotLightShadowData(shadowSpotData, resolution, shadowSpotMatrices, shadowMapSize) {
            const out = shadowSpotData.position = this._lightPos;
            shadowSpotData.resolution = resolution;
            shadowMapSize.setValue(1 / resolution, 1 / resolution, resolution, resolution);
            shadowSpotData.offsetX = 0;
            shadowSpotData.offsetY = 0;
            const spotWorldMatrix = this._lightWorldMatrix;
            const viewMatrix = shadowSpotData.viewMatrix;
            const projectMatrix = shadowSpotData.projectionMatrix;
            const viewProjectMatrix = shadowSpotData.viewProjectMatrix;
            const BoundFrustum = shadowSpotData.cameraCullInfo.boundFrustum;
            spotWorldMatrix.invert(viewMatrix);
            Laya.Matrix4x4.createPerspective(3.14159 * this._spotAngle / 180, 1, 0.1, this._spotRange, projectMatrix);
            Laya.Matrix4x4.multiply(projectMatrix, viewMatrix, viewProjectMatrix);
            BoundFrustum.matrix = viewProjectMatrix;
            viewProjectMatrix.cloneTo(shadowSpotMatrices);
            shadowSpotData.cameraCullInfo.position = out;
        }
        _getShadowBias(shadowResolution, out) {
            const frustumSize = Math.tan(this._spotAngle * 0.5 * Laya.MathUtils3D.Deg2Rad) * this._spotRange;
            const texelSize = frustumSize / shadowResolution;
            let depthBias = -this._light.shadowDepthBias * texelSize;
            let normalBias = -this._light.shadowNormalBias * texelSize;
            if (this._shadowMode == Laya.ShadowMode.SoftHigh) {
                const kernelRadius = 2.5;
                depthBias *= kernelRadius;
                normalBias *= kernelRadius;
            }
            out.setValue(depthBias, normalBias, 0, 0);
        }
        _setupShadowCasterShaderValues(shaderData, shadowSliceData, shadowBias) {
            shaderData.setVector(Laya.ShadowCasterPass.SHADOW_BIAS, shadowBias);
            shaderData.setMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
            const cameraData = shadowSliceData.cameraShaderValue;
            cameraData.setMatrix4x4(Laya.BaseCamera.VIEWMATRIX, shadowSliceData.viewMatrix);
            cameraData.setMatrix4x4(Laya.BaseCamera.PROJECTMATRIX, shadowSliceData.projectionMatrix);
            cameraData.setMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
        }
        _applyCasterPassCommandBuffer(context) {
            if (this.shadowCasterCommanBuffer && this.shadowCasterCommanBuffer.length > 0)
                this.shadowCasterCommanBuffer.forEach(value => value._apply());
        }
        _applyRenderData(sceneData, cameraData) {
            const spotLight = this._light;
            switch (spotLight.shadowMode) {
                case Laya.ShadowMode.Hard:
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH);
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW);
                    break;
                case Laya.ShadowMode.SoftLow:
                    sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW);
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH);
                    break;
                case Laya.ShadowMode.SoftHigh:
                    sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH);
                    sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW);
                    break;
            }
            sceneData.setMatrix4x4(Laya.ShadowCasterPass.SHADOW_SPOTMATRICES, this._shadowSpotMatrices);
            sceneData.setVector(Laya.ShadowCasterPass.SHADOW_SPOTMAP_SIZE, this._shadowSpotMapSize);
        }
    }
    WebGPUSpotLightShadowRP._invertYScaleMatrix = new Laya.Matrix4x4(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    class WebGPUForwardAddRP {
        constructor() {
            this.shadowCastPass = false;
            this.enablePostProcess = true;
            this.enableDirectLightShadow = false;
            this.enableSpotLightShadowPass = false;
            this.directLightShadowPass = new WebGPUDirectLightShadowRP();
            this.spotLightShadowPass = new WebGPUSpotLightShadowRP();
            this.renderPass = new WebGPUForwardAddClusterRP();
            this.shadowParams = new Laya.Vector4();
            this.finalize = new Laya.CommandBuffer();
        }
        setBeforeImageEffect(value) {
            if (value && value.length > 0) {
                this._beforeImageEffectCMDS = value;
                value.forEach(element => element._apply(false));
            }
        }
        setAfterEventCmd(value) {
            if (value && value.length > 0) {
                this._afterAllRenderCMDS = value;
                value.forEach(element => element._apply(false));
            }
        }
    }

    const viewport$1 = new Laya.Viewport(0, 0, 0, 0);
    const offsetScale = new Laya.Vector4();
    class WebGPU3DRenderPass {
        constructor() {
            this._renderPass = new WebGPUForwardAddRP();
            this._defaultShadowMap = Laya.ShadowUtils.getTemporaryShadowTexture(1, 1, Laya.ShadowMapFormat.bit16);
            this._defaultDepthTex = Laya.RenderTexture.createFromPool(1, 1, Laya.RenderTargetFormat.DEPTH_32, Laya.RenderTargetFormat.None, false, 1);
            let shadowMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Shadow");
            shadowMap._defaultData.set(Laya.ShadowCasterPass.SHADOW_MAP, this._defaultShadowMap);
            shadowMap._defaultData.set(Laya.ShadowCasterPass.SHADOW_SPOTMAP, this._defaultShadowMap);
        }
        _initRenderPass(camera, context) {
            const renderPass = this._renderPass.renderPass;
            const renderRT = camera._getRenderTexture();
            let clearConst = 0;
            const clearFlag = camera.clearFlag;
            const hasStencil = renderRT.depthStencilFormat === Laya.RenderTargetFormat.DEPTHSTENCIL_24_8;
            const stencilFlag = hasStencil ? Laya.RenderClearFlag.Stencil : 0;
            switch (clearFlag) {
                case Laya.CameraClearFlags.DepthOnly:
                    clearConst = Laya.RenderClearFlag.Depth | stencilFlag;
                    break;
                case Laya.CameraClearFlags.Nothing:
                    clearConst = Laya.RenderClearFlag.Nothing;
                    break;
                case Laya.CameraClearFlags.ColorOnly:
                    clearConst = Laya.RenderClearFlag.Color;
                    break;
                case Laya.CameraClearFlags.Sky:
                case Laya.CameraClearFlags.SolidColor:
                default:
                    clearConst = Laya.RenderClearFlag.Color | Laya.RenderClearFlag.Depth | stencilFlag;
                    break;
            }
            const clearValue = renderRT._texture.gammaCorrection !== 1 ? camera.clearColor : camera._linearClearColor;
            renderPass.camera = camera;
            renderPass.destTarget = renderRT._renderTarget;
            renderPass.clearFlag = clearConst;
            renderPass.clearColor = clearValue;
            let needInternalRT = camera._needInternalRenderTexture();
            if (needInternalRT) {
                viewport$1.set(0, 0, renderRT.width, renderRT.height);
            }
            else {
                camera.viewport.cloneTo(viewport$1);
            }
            renderPass.setViewPort(viewport$1);
            const scissor = Laya.Vector4.TEMP;
            scissor.setValue(viewport$1.x, viewport$1.y, viewport$1.width, viewport$1.height);
            renderPass.setScissor(scissor);
            renderPass.enableOpaque = Laya.Stat.enableOpaque;
            renderPass.enableTransparent = Laya.Stat.enableTransparent;
            renderPass.enableCMD = Laya.Stat.enableCameraCMD;
            renderPass.setBeforeSkyboxCmds(camera._cameraEventCommandBuffer[Laya.CameraEventFlags.BeforeSkyBox]);
            renderPass.setBeforeForwardCmds(camera._cameraEventCommandBuffer[Laya.CameraEventFlags.BeforeForwardOpaque]);
            renderPass.setBeforeTransparentCmds(camera._cameraEventCommandBuffer[Laya.CameraEventFlags.BeforeTransparent]);
            this._renderPass.setBeforeImageEffect(camera._cameraEventCommandBuffer[Laya.CameraEventFlags.BeforeImageEffect]);
            this._renderPass.setAfterEventCmd(camera._cameraEventCommandBuffer[Laya.CameraEventFlags.AfterEveryThing]);
            renderPass.setCameraCullInfo(camera);
            if (camera.clearFlag === Laya.CameraClearFlags.Sky)
                renderPass.skyRenderNode = camera.scene.skyRenderer._baseRenderNode;
            else
                renderPass.skyRenderNode = null;
            renderPass.pipelineMode = Laya.RenderContext3D._instance.configPipeLineMode;
            camera._shaderValues.setTexture(Laya.DepthPass.DEPTHTEXTURE, this._defaultDepthTex);
            const enableShadow = (Laya.Scene3D._updateMark % camera.scene._ShadowMapupdateFrequency === 0) && Laya.Stat.enableShadow;
            this._renderPass.shadowCastPass = enableShadow;
            camera.scene._shaderValues.setTexture(Laya.ShadowCasterPass.SHADOW_MAP, this._defaultShadowMap);
            camera.scene._shaderValues.setTexture(Laya.ShadowCasterPass.SHADOW_SPOTMAP, this._defaultShadowMap);
            if (enableShadow) {
                const shadowParams = this._renderPass.shadowParams;
                shadowParams.setValue(0, 0, 0, 0);
                const mainDirectionLight = camera.scene._mainDirectionLight;
                const needDirectionShadow = mainDirectionLight && mainDirectionLight.shadowMode !== Laya.ShadowMode.None;
                this._renderPass.enableDirectLightShadow = needDirectionShadow;
                if (needDirectionShadow) {
                    this._renderPass.directLightShadowPass.camera = camera._renderDataModule;
                    this._renderPass.directLightShadowPass.light = mainDirectionLight._dataModule;
                    const directionShadowMap = Laya.ILaya.Scene3D._shadowCasterPass.getDirectLightShadowMap(mainDirectionLight);
                    this._renderPass.directLightShadowPass.destTarget = directionShadowMap._renderTarget;
                    this._renderPass.shadowMap = directionShadowMap;
                    shadowParams.x = this._renderPass.directLightShadowPass.light.shadowStrength;
                }
                const mainSpotLight = camera.scene._mainSpotLight;
                const needSpotShadow = mainSpotLight && mainSpotLight.shadowMode !== Laya.ShadowMode.None;
                this._renderPass.enableSpotLightShadowPass = needSpotShadow;
                if (needSpotShadow) {
                    this._renderPass.spotLightShadowPass.light = mainSpotLight._dataModule;
                    const spotShadowMap = Laya.ILaya.Scene3D._shadowCasterPass.getSpotLightShadowPassData(mainSpotLight);
                    this._renderPass.spotLightShadowPass.destTarget = spotShadowMap._renderTarget;
                    this._renderPass.spotShadowMap = spotShadowMap;
                    shadowParams.y = this._renderPass.spotLightShadowPass.light.shadowStrength;
                }
                camera.scene._shaderValues.setVector(Laya.ShadowCasterPass.SHADOW_PARAMS, shadowParams);
            }
            if (Laya.Stat.enablePostprocess && camera.postProcess && camera.postProcess.enable && camera.postProcess.effects.length > 0) {
                this._renderPass.enablePostProcess = Laya.Stat.enablePostprocess;
                this._renderPass.postProcess = camera.postProcess._context.command;
                camera.postProcess._render(camera);
                this._renderPass.postProcess._apply(false);
            }
            else
                this._renderPass.enablePostProcess = false;
            this._renderPass.finalize.clear();
            if (!this._renderPass.enablePostProcess && needInternalRT && camera._offScreenRenderTexture) {
                let dst = camera._offScreenRenderTexture;
                offsetScale.setValue(camera.normalizedViewport.x, 1.0 - camera.normalizedViewport.y, renderRT.width / dst.width, -renderRT.height / dst.height);
                offsetScale.setValue(camera.normalizedViewport.x, camera.normalizedViewport.y, renderRT.width / dst.width, renderRT.height / dst.height);
                this._renderPass.finalize.blitScreenQuad(renderRT, camera._offScreenRenderTexture, offsetScale);
            }
            if (this._renderPass.enableDirectLightShadow || this._renderPass.enableSpotLightShadowPass) {
                let sceneShaderData = context.sceneData;
                context._preDrawUniformMaps.add("Shadow");
                let shadowUniformMap = Laya.ShadowCasterPass.ShadowUniformMap;
                sceneShaderData.createSubUniformBuffer("Shadow", "Shadow", shadowUniformMap._idata);
            }
        }
        _renderDepth(camera) {
            let depthMode = camera.depthTextureMode;
            if (camera.postProcess && camera.postProcess.enable)
                depthMode |= camera.postProcess.cameraDepthTextureMode;
            if ((depthMode & Laya.DepthTextureMode.Depth) != 0) {
                Laya.Camera.depthPass.getTarget(camera, Laya.DepthTextureMode.Depth, camera.depthTextureFormat);
                this._renderPass.renderPass.depthTarget = camera.depthTexture._renderTarget;
            }
            if ((depthMode & Laya.DepthTextureMode.DepthNormals) != 0) {
                Laya.Camera.depthPass.getTarget(camera, Laya.DepthTextureMode.DepthNormals, camera.depthTextureFormat);
                this._renderPass.renderPass.depthNormalTarget = camera.depthNormalTexture._renderTarget;
            }
            this._renderPass.renderPass.depthTextureMode = depthMode;
        }
        _renderForwardAddCameraPass(context, renderPass, list, count) {
            var time = Laya.Browser.now();
            if (renderPass.shadowCastPass) {
                if (renderPass.enableDirectLightShadow) {
                    context.sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
                    context.sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
                    renderPass.directLightShadowPass.update(context);
                    renderPass.directLightShadowPass.render(context, list, count);
                }
                if (renderPass.enableSpotLightShadowPass) {
                    context.sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
                    context.sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
                    renderPass.spotLightShadowPass.update(context);
                    renderPass.spotLightShadowPass.render(context, list, count);
                }
            }
            if (renderPass.enableDirectLightShadow) {
                context.sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
                context.sceneData.setTexture(Laya.ShadowCasterPass.SHADOW_MAP, this._renderPass.shadowMap);
            }
            else {
                context.sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
            }
            if (renderPass.enableSpotLightShadowPass) {
                context.sceneData.addDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
                context.sceneData.setTexture(Laya.ShadowCasterPass.SHADOW_SPOTMAP, this._renderPass.spotShadowMap);
            }
            else {
                context.sceneData.removeDefine(Laya.Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
            }
            Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_ShadowPass, Laya.Browser.now() - time);
            renderPass.renderPass.render(context, list, count);
            renderPass._beforeImageEffectCMDS && this._renderCmd(renderPass._beforeImageEffectCMDS, context);
            if (renderPass.enablePostProcess && renderPass.postProcess) {
                time = Laya.Browser.now();
                this._renderPostProcess(renderPass.postProcess, context);
                Laya.LayaGL.statAgent.recordTimeData(Laya.StatElement.T_Render_PostProcess, Laya.Browser.now() - time);
            }
            renderPass._afterAllRenderCMDS && this._renderCmd(renderPass._afterAllRenderCMDS, context);
            renderPass.finalize._apply(false);
            context.runCMDList(renderPass.finalize._renderCMDs);
        }
        _renderCmd(cmds, context) {
            if (cmds && cmds.length > 0)
                cmds.forEach(value => context.runCMDList(value._renderCMDs));
        }
        _renderPostProcess(postprocessCMD, context) {
            context.runCMDList(postprocessCMD._renderCMDs);
        }
        fowardRender(context, camera) {
            Laya.Camera.depthPass.cleanUp(camera);
            this._renderDepth(camera);
            this._initRenderPass(camera, context);
            let renderList = this.render3DManager.baseRenderList.elements;
            let count = this.render3DManager.baseRenderList.length;
            this._renderForwardAddCameraPass(context, this._renderPass, renderList, count);
        }
        destroy() {
            this._defaultShadowMap.destroy();
            this._defaultShadowMap = null;
            this._defaultDepthTex.destroy();
            this._defaultDepthTex = null;
        }
    }

    class WebGPUBaseRenderNode extends WebBaseRenderNode {
        constructor() {
            super(...arguments);
            this.bindGroupChangeFlag = new Laya.Vector2();
            this.bindGroupLayoutChangeFlag = new Laya.Vector2();
            this.defineDataChangeFlag = new Laya.Vector2();
            this.spriteUBOs = [];
            this.additionalUBOs = [];
        }
        get shaderData() {
            return this._shaderData;
        }
        set shaderData(value) {
            if (this._shaderData != value) {
                let oldCommandMap = this._commonUniformMap.slice();
                if (this._shaderData) {
                    this.setCommonUniformMap([]);
                }
                this._shaderData = value;
                this.setCommonUniformMap(oldCommandMap);
            }
        }
        set additionShaderData(value) {
            if (this._additionShaderData && this._additionShaderData.size > 0) {
                if (!value)
                    for (var [key, date] of this._additionShaderData) {
                        date.removeBindGroupChangeFlag(key, this.bindGroupChangeFlag, this.bindGroupLayoutChangeFlag);
                        date._defineDatas.removeChangeFlagInfo(this.defineDataChangeFlag);
                    }
                else {
                    for (var [key, date] of this._additionShaderData) {
                        if (!value.has(key)) {
                            date.removeBindGroupChangeFlag(key, this.bindGroupChangeFlag, this.bindGroupLayoutChangeFlag);
                            date._defineDatas.removeChangeFlagInfo(this.defineDataChangeFlag);
                        }
                    }
                }
            }
            this._additionShaderData = value;
            if (value && value.size > 0) {
                this._additionShaderDataKeys = Array.from(this._additionShaderData.keys());
                this.additionalUBOs.length = 0;
                for (var [key, shaderdate] of value) {
                    let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(key);
                    let uniformBuffer = shaderdate.createSubUniformBuffer(key, key, unifomrMap._idata);
                    uniformBuffer && this.additionalUBOs.push(uniformBuffer);
                    shaderdate.addBindGroupChangeLink(key, unifomrMap._idata);
                    shaderdate.addBindGroupChangeFlag(key, this.bindGroupChangeFlag, this.bindGroupLayoutChangeFlag);
                    shaderdate._defineDatas.addChangeFlagInfo(this.defineDataChangeFlag);
                }
            }
            else {
                this._additionShaderDataKeys = [];
                this.additionalUBOs.length = 0;
            }
            if (this.additionalUBOs.length == 1) {
                this.additionalUBO0 = this.additionalUBOs[0];
            }
            else {
                this.additionalUBO0 = null;
            }
        }
        get additionShaderData() {
            return this._additionShaderData;
        }
        setCommonUniformMap(value) {
            this._commonUniformMap.forEach(element => {
                if (value.indexOf(element) == -1) {
                    let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(element);
                    this._shaderData.removeBindGroupChangeLink(element, unifomrMap._idata);
                }
            });
            this._commonUniformMap.length = 0;
            this.spriteUBOs.length = 0;
            value.forEach(element => {
                this._commonUniformMap.push(element);
                if (this.shaderData) {
                    let unifomrMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(element);
                    let uniformBuffer = this.shaderData.createSubUniformBuffer(element, element, unifomrMap._idata);
                    uniformBuffer && this.spriteUBOs.push(uniformBuffer);
                    this._shaderData.addBindGroupChangeLink(element, unifomrMap._idata);
                    this._shaderData.addBindGroupChangeFlag(element, this.bindGroupChangeFlag, this.bindGroupLayoutChangeFlag);
                    this._shaderData._defineDatas.addChangeFlagInfo(this.defineDataChangeFlag);
                }
            });
            if (this.spriteUBOs.length == 1) {
                this.spriteUBO0 = this.spriteUBOs[0];
            }
            else {
                this.spriteUBO0 = null;
            }
        }
    }

    class WebGPUInstanceRenderBatch {
        constructor() {
            this._batchOpaqueMarks = [];
            this._updateCountMark = 0;
            this._recoverList = new Laya.FastSinglelist();
        }
        getBatchMark(element) {
            const renderNode = element.owner;
            const geometry = element.geometry;
            const invertFrontFace = element.transform ? element.transform._isFrontFaceInvert : false;
            const invertFrontFaceFlag = invertFrontFace ? 1 : 0;
            const receiveShadowFlag = renderNode.receiveShadow ? 1 : 0;
            const geometryFlag = geometry._id;
            const materialFlag = element.materialId;
            const renderId = (materialFlag << 17) + (geometryFlag << 2) + (invertFrontFaceFlag << 1) + (receiveShadowFlag);
            const reflectFlag = (renderNode.probeReflection ? renderNode.probeReflection._id : -1) + 1;
            const lightmapFlag = renderNode.lightmapIndex + 1;
            const lightProbeFlag = (renderNode.volumetricGI ? renderNode.volumetricGI._id : -1) + 1;
            const giId = (reflectFlag << 10) + (lightmapFlag << 20) + lightProbeFlag;
            const data = this._batchOpaqueMarks[renderId] || (this._batchOpaqueMarks[renderId] = []);
            let batch = data[giId] || (data[giId] = new Laya.BatchMark());
            return batch;
        }
        batch(elements) {
            if (!Laya.Config3D.enableDynamicBatch
                || !Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.DrawElement_Instance))
                return;
            const elementCount = elements.length;
            const elementArray = elements.elements;
            const maxInstanceCount = WebGPUInstanceRenderBatch.MAX_INSTANCE_COUNT;
            elements.length = 0;
            this._updateCountMark++;
            for (let i = 0; i < elementCount; i++) {
                const element = elementArray[i];
                if (element.canDynamicBatch && element.subShader._owner._enableInstancing) {
                    const instanceMark = this.getBatchMark(element);
                    if (this._updateCountMark === instanceMark.updateMark) {
                        const instanceIndex = instanceMark.indexInList;
                        if (instanceMark.batched) {
                            const originElement = elementArray[instanceIndex];
                            const instanceElements = originElement.instanceElementList;
                            if (instanceElements.length === maxInstanceCount) {
                                instanceMark.indexInList = elements.length;
                                instanceMark.batched = false;
                                instanceMark._curBindElementIndex++;
                                elements.add(element);
                            }
                            else {
                                instanceElements.add(element);
                            }
                        }
                        else {
                            const originElement = elementArray[instanceIndex];
                            let instanceRenderElement = instanceMark._cacheRenderElement[instanceMark._curBindElementIndex];
                            if (!instanceRenderElement) {
                                instanceMark._cacheRenderElement[instanceMark._curBindElementIndex] = instanceRenderElement = Laya.Laya3DRender.Render3DPassFactory.createInstanceRenderElement3D();
                                instanceRenderElement.owner = element.owner;
                                instanceRenderElement.renderShaderData = element.renderShaderData;
                                instanceRenderElement.setGeometry(element.geometry);
                            }
                            instanceRenderElement.subShader = element.subShader;
                            instanceRenderElement.materialShaderData = element.materialShaderData;
                            instanceRenderElement.materialRenderQueue = element.materialRenderQueue;
                            instanceRenderElement.renderShaderData = element.renderShaderData;
                            instanceRenderElement.owner = element.owner;
                            let instanceStateID = instanceRenderElement.oriBufferStateCacheID;
                            let elementStateID = element.geometry._bufferState.stateCacheID;
                            if (instanceStateID != elementStateID) {
                                instanceRenderElement.setGeometry(element.geometry);
                            }
                            const list = instanceRenderElement.instanceElementList;
                            list.length = 0;
                            list.add(originElement);
                            list.add(element);
                            elementArray[instanceIndex] = instanceRenderElement;
                            instanceMark.batched = true;
                            instanceRenderElement._invertFrontFace = element.transform ? element.transform._isFrontFaceInvert : false;
                        }
                    }
                    else {
                        instanceMark.updateMark = this._updateCountMark;
                        instanceMark.indexInList = elements.length;
                        instanceMark.batched = false;
                        instanceMark._curBindElementIndex = 0;
                        elements.add(element);
                    }
                }
                else {
                    elements.add(element);
                }
            }
        }
        clearRenderData() {
        }
        recoverData() {
            for (let i = this._recoverList.length - 1; i > -1; i--)
                this._recoverList.elements[i].recover();
            this._recoverList.length = 0;
        }
    }
    WebGPUInstanceRenderBatch.MAX_INSTANCE_COUNT = 1024;

    class WebGPURenderElement3D {
        get materialShaderData() {
            return this._materialShaderData;
        }
        set materialShaderData(value) {
            if (this._materialShaderData != value) {
                this._materialShaderData = value;
                this._matChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
            }
        }
        get renderShaderData() {
            return this._renderShaderData;
        }
        set renderShaderData(value) {
            if (this._renderShaderData != value) {
                this._renderShaderData = value;
                this._renderNodeChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
            }
        }
        get subShader() {
            return this._subShader;
        }
        set subShader(value) {
            if (this._subShader != value) {
                this._subShader = value;
                this._matChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
            }
        }
        constructor() {
            this._materialRenderDataChange = false;
            this._spriteRenderDataChange = false;
            this._bindGroupMap = new Map();
            this.depthStencilParam = new Laya.DepthStencilParam();
            this._passRenderInfo = new Map();
            this._matChangeFlag = new Laya.Vector2();
            this._renderNodeChangeFlag = new Laya.Vector2();
            this._pipelineChangeFlag = new Laya.Vector2();
            this._cacheGeometryStateID = -1;
        }
        _needUpdatePipeline() {
            this._pipelineChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
        }
        _getInvertFront() {
            var _a;
            const transform = (_a = this.owner) === null || _a === void 0 ? void 0 : _a.transform;
            return transform ? transform._isFrontFaceInvert : false;
        }
        _getShaderInstanceDefines(context) {
            let comDef = WebGPURenderElement3D._compileDefine;
            const globalShaderDefines = context._cacheGlobalDefines;
            globalShaderDefines.cloneTo(comDef);
            if (this._renderShaderData) {
                comDef.addDefineDatas(this._renderShaderData.getDefineData());
            }
            if (this._materialShaderData) {
                comDef.addDefineDatas(this._materialShaderData._defineDatas);
            }
            if (this.owner) {
                let additionShaderData = this.owner.additionShaderData;
                if (additionShaderData.size > 0) {
                    for (let [key, value] of additionShaderData.entries()) {
                        comDef.addDefineDatas(value.getDefineData());
                    }
                }
            }
            return comDef;
        }
        _compileShader(context) {
            let comDef = this._getShaderInstanceDefines(context);
            var passes = this.subShader._passes;
            let renderCount = 0;
            for (var j = 0, m = passes.length; j < m; j++) {
                let pass = passes[j];
                let passdata = pass.moduleData;
                if (passdata.pipelineMode !== context.pipelineMode)
                    continue;
                if (this._renderShaderData) {
                    passdata.nodeCommonMap = this.owner._commonUniformMap;
                }
                else {
                    passdata.nodeCommonMap = null;
                }
                passdata.additionShaderData = null;
                if (this.owner) {
                    passdata.additionShaderData = this.owner._additionShaderDataKeys;
                }
                let attributeLocations = this.geometry.bufferState._attriLocArray;
                pass.moduleData.attributeLocations = attributeLocations;
                var shaderIns = pass.withCompile(comDef, false);
                if (this._drawCacheArray[renderCount]) {
                    let oneInfo = this._drawCacheArray[renderCount];
                    if (oneInfo.shaderInstance != shaderIns) {
                        oneInfo.shaderChange = true;
                        oneInfo.shaderInstance = shaderIns;
                    }
                }
                else {
                    let oneInfo = new Laya.OneDrawCacheInfo();
                    oneInfo.shaderChange = true;
                    oneInfo.shaderInstance = shaderIns;
                    this._drawCacheArray[renderCount] = oneInfo;
                }
                renderCount++;
            }
            this._drawCacheArray.length = renderCount;
        }
        _updateMatChangeFlag() {
            this._materialRenderDataChange = Laya.compareCahceFlag(this._matChangeFlag, this._drawPassInfo.matCacheFlag);
            if (this._renderShaderData && Laya.compareCahceFlag(this._renderNodeChangeFlag, this._drawPassInfo.nodeCacheFlag)) {
                this._drawPassInfo.nodeCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                this._spriteRenderDataChange = true;
            }
            else {
                this._spriteRenderDataChange = false;
            }
        }
        _handleMaterialChange() {
            this._drawPassInfo.matCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
            let shadername = this._subShader._owner.name;
            if (!WebGPURenderElement3D._matChangeFlagMap.has(shadername))
                WebGPURenderElement3D._matChangeFlagMap.set(shadername, new Map());
            let shadermap = WebGPURenderElement3D._matChangeFlagMap.get(shadername);
            if (!shadermap.has(this._materialShaderData._id)) {
                let flagArray = [new Laya.Vector2(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount), new Laya.Vector2(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount), new Laya.Vector2(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount)];
                shadermap.set(this._materialShaderData._id, flagArray);
                this._materialShaderData.addBindGroupChangeLink(this._subShader._owner.name, this._subShader._uniformMap);
                this._materialShaderData.addBindGroupChangeFlag(this._subShader._owner.name, flagArray[0], flagArray[1]);
                this._materialShaderData._defineDatas.addChangeFlagInfo(flagArray[2]);
            }
            let flagArray = shadermap.get(this._materialShaderData._id);
            this._matBindGroupChangeFlag = flagArray[0];
            this._matBindGroupLayoutFlag = flagArray[1];
            this._matDefChangeFlag = flagArray[2];
            let subShader = this._subShader;
            this._materialUBO = this._materialShaderData.createSubUniformBuffer("Material", subShader._owner.name, subShader._uniformMap);
        }
        _updateNodeUBO() {
            let owner = this.owner;
            if (owner) {
                if (owner.spriteUBO0) {
                    owner.spriteUBO0.upload();
                }
                else {
                    owner.spriteUBOs.forEach(ubo => {
                        ubo.upload();
                    });
                }
                if (owner.additionalUBO0) {
                    owner.additionalUBO0.upload();
                }
                else {
                    owner.additionalUBOs.forEach(ubo => {
                        ubo.upload();
                    });
                }
            }
        }
        _preUpdatePre(context) {
            if (!this._passRenderInfo.has(context._curRenderGlobalKey)) {
                this._drawPassInfo = new Laya.OneDrawPassCacheInfo();
                this._passRenderInfo.set(context._curRenderGlobalKey, this._drawPassInfo);
            }
            else {
                this._drawPassInfo = this._passRenderInfo.get(context._curRenderGlobalKey);
            }
            this._drawCacheArray = this._drawPassInfo.drawInfos;
            this._updateMatChangeFlag();
            if (this.geometry.getStateCacheID() != this._cacheGeometryStateID) {
                this._needUpdatePipeline();
                this._cacheGeometryStateID = this.geometry.getStateCacheID();
            }
            let passDefineChangeFlag = this._drawPassInfo.passDefineCacheFlag;
            if (this._materialRenderDataChange ||
                !this._matDefChangeFlag ||
                Laya.compareCahceFlag(this._matDefChangeFlag, passDefineChangeFlag) ||
                (this.owner && Laya.compareCahceFlag(this.owner.defineDataChangeFlag, passDefineChangeFlag)) ||
                Laya.compareCahceFlag(context._curDefineChangeFlag, passDefineChangeFlag) ||
                this._drawPassInfo.geometryStateID != this._cacheGeometryStateID) {
                passDefineChangeFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                this._compileShader(context);
                this._drawPassInfo.geometryStateID = this._cacheGeometryStateID;
            }
            if (this._materialRenderDataChange) {
                this._handleMaterialChange();
            }
            let cullmode = this._materialShaderData.getInt(Laya.Shader3D.CULL);
            cullmode = cullmode ? cullmode : Laya.RenderState.CULL_NONE;
            let depthStencilID = this._materialShaderData.depthStencilStateKey;
            let blendid = this._materialShaderData.blendStateCache ? this._materialShaderData.blendStateCache.id : -1;
            if (this._cacheMatCullMode != cullmode ||
                this._cacheMatDepthStencilID != depthStencilID ||
                this._cacheMatBlendStateID != blendid) {
                this._cacheMatBlendStateID = blendid;
                this._cacheMatDepthStencilID = depthStencilID;
                this._cacheMatCullMode = cullmode;
                this._needUpdatePipeline();
            }
            this._updateNodeUBO();
            this._materialUBO && this._materialUBO.upload();
            this._invertFrontFace = this._getInvertFront();
            return;
        }
        _render(context, command) {
            if (!this.isRender) {
                return 0;
            }
            if (!this._drawCacheArray || this._drawCacheArray.length == 0)
                return 0;
            for (let j = 0, m = this._drawCacheArray.length; j < m; j++) {
                let drawInfo = this._drawCacheArray[j];
                let shaderInstance = drawInfo.shaderInstance;
                if (!shaderInstance.complete)
                    return 0;
                this._bindGroup(context, drawInfo, command);
                let pipelineCache = drawInfo.pipeLineCacheFlag;
                if (drawInfo.shaderChange ||
                    Laya.compareCahceFlag(context._pipelineChange, pipelineCache) ||
                    Laya.compareCahceFlag(this._pipelineChangeFlag, pipelineCache)) {
                    this._bindGroupMap.clear();
                    this._bindGroupMap.set(0, context._sceneBindGroup);
                    this._bindGroupMap.set(1, context._cameraBindGroup);
                    this._bindGroupMap.set(2, drawInfo.nodeBindGroup);
                    this._bindGroupMap.set(3, drawInfo.matBindGroup);
                    drawInfo.shaderChange = false;
                    drawInfo.pipeline = this._getWebGPURenderPipeline(drawInfo.shaderInstance, context.destRT, context);
                    drawInfo.pipeLineCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                }
                command.setPipeline(drawInfo.pipeline);
                if (!command.isBundle && this.depthStencilParam.stencilEnable) {
                    command.setStencilReference(this.depthStencilParam.stencilRef);
                }
                this.geometry.applyToEncoder(command.encoder);
            }
            return 1;
        }
        _getWebGPURenderPipeline(shaderInstance, dest, context) {
            if (this._materialShaderData) {
                this._getBlendState(shaderInstance);
                this._getDepthStencilState(shaderInstance, dest);
                this._getCullFrontMode(this._materialShaderData, shaderInstance, this._invertFrontFace, context.invertY);
            }
            let pipeline = Laya.WebGPURenderEngine._instance.pipelineCache.getPipeline(this._bindGroupMap, this, shaderInstance, context.destRT);
            return pipeline;
        }
        _getBlendState(shaderInstance) {
            if (shaderInstance._shaderPass.statefirst)
                this.blendState = this._getRenderStateBlendByShader(this._materialShaderData, shaderInstance);
            else {
                this.blendState = this._materialShaderData.blendStateCache;
            }
        }
        _getRenderStateBlendByShader(shaderData, shaderInstance) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            const data = shaderData.getData();
            const renderState = shaderInstance._shaderPass.renderState;
            const blend = (_b = ((_a = renderState.blend) !== null && _a !== void 0 ? _a : data[Laya.Shader3D.BLEND])) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.blend;
            let blendState;
            switch (blend) {
                case Laya.RenderState.BLEND_DISABLE:
                    blendState = Laya.WebGPUBlendState.getBlendState(blend, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO, Laya.RenderState.BLENDEQUATION_ADD, Laya.RenderState.BLENDPARAM_ONE, Laya.RenderState.BLENDPARAM_ZERO);
                    break;
                case Laya.RenderState.BLEND_ENABLE_ALL:
                    const blendEquation = (_d = ((_c = renderState.blendEquation) !== null && _c !== void 0 ? _c : data[Laya.Shader3D.BLEND_EQUATION])) !== null && _d !== void 0 ? _d : Laya.RenderState.Default.blendEquation;
                    const srcBlend = (_f = ((_e = renderState.srcBlend) !== null && _e !== void 0 ? _e : data[Laya.Shader3D.BLEND_SRC])) !== null && _f !== void 0 ? _f : Laya.RenderState.Default.srcBlend;
                    const dstBlend = (_h = ((_g = renderState.dstBlend) !== null && _g !== void 0 ? _g : data[Laya.Shader3D.BLEND_DST])) !== null && _h !== void 0 ? _h : Laya.RenderState.Default.dstBlend;
                    blendState = Laya.WebGPUBlendState.getBlendState(blend, blendEquation, srcBlend, dstBlend, blendEquation, srcBlend, dstBlend);
                    break;
                case Laya.RenderState.BLEND_ENABLE_SEPERATE:
                    const blendEquationRGB = (_k = ((_j = renderState.blendEquationRGB) !== null && _j !== void 0 ? _j : data[Laya.Shader3D.BLEND_EQUATION_RGB])) !== null && _k !== void 0 ? _k : Laya.RenderState.Default.blendEquationRGB;
                    const blendEquationAlpha = (_m = ((_l = renderState.blendEquationAlpha) !== null && _l !== void 0 ? _l : data[Laya.Shader3D.BLEND_EQUATION_ALPHA])) !== null && _m !== void 0 ? _m : Laya.RenderState.Default.blendEquationAlpha;
                    const srcRGB = (_p = ((_o = renderState.srcBlendRGB) !== null && _o !== void 0 ? _o : data[Laya.Shader3D.BLEND_SRC_RGB])) !== null && _p !== void 0 ? _p : Laya.RenderState.Default.srcBlendRGB;
                    const dstRGB = (_r = ((_q = renderState.dstBlendRGB) !== null && _q !== void 0 ? _q : data[Laya.Shader3D.BLEND_DST_RGB])) !== null && _r !== void 0 ? _r : Laya.RenderState.Default.dstBlendRGB;
                    const srcAlpha = (_t = ((_s = renderState.srcBlendAlpha) !== null && _s !== void 0 ? _s : data[Laya.Shader3D.BLEND_SRC_ALPHA])) !== null && _t !== void 0 ? _t : Laya.RenderState.Default.srcBlendAlpha;
                    const dstAlpha = (_v = ((_u = renderState.dstBlendAlpha) !== null && _u !== void 0 ? _u : data[Laya.Shader3D.BLEND_DST_ALPHA])) !== null && _v !== void 0 ? _v : Laya.RenderState.Default.dstBlendAlpha;
                    blendState = Laya.WebGPUBlendState.getBlendState(blend, blendEquationRGB, srcRGB, dstRGB, blendEquationAlpha, srcAlpha, dstAlpha);
                    break;
                default:
                    throw 'blendState set error';
            }
            return blendState;
        }
        _getDepthStencilState(shaderInstance, dest) {
            if (dest._depthTexture) {
                if (shaderInstance._shaderPass.statefirst)
                    this.depthStencilState = this._getRenderStateDepthByShader(this._materialShaderData, shaderInstance, dest);
                else
                    this.depthStencilState = this._getRenderStateDepthByMaterial(this._materialShaderData, dest);
            }
            else
                this.depthStencilState = null;
        }
        _getRenderStateDepthByShader(shaderData, shaderInstance, dest) {
            Laya.getDepthStencilParamFromShader(shaderData, shaderInstance, dest, this.depthStencilParam);
            return Laya.WebGPUDepthStencilState.getDepthStencilState(dest.depthStencilFormat, this.depthStencilParam);
        }
        _getRenderStateDepthByMaterial(shaderData, dest) {
            Laya.getDepthStencilParamFromMaterial(shaderData, dest, this.depthStencilParam);
            return Laya.WebGPUDepthStencilState.getDepthStencilState(dest.depthStencilFormat, this.depthStencilParam);
        }
        _getCullFrontMode(shaderData, shaderInstance, isTarget, invertFront) {
            var _a;
            const renderState = shaderInstance._shaderPass.renderState;
            const data = shaderData.getData();
            let cull = data[Laya.Shader3D.CULL];
            if (shaderInstance._shaderPass.statefirst)
                cull = (_a = renderState.cull) !== null && _a !== void 0 ? _a : cull;
            cull = cull !== null && cull !== void 0 ? cull : Laya.RenderState.Default.cull;
            switch (cull) {
                case Laya.RenderState.CULL_NONE:
                    this.cullMode = Laya.CullMode.Off;
                    if (isTarget !== invertFront)
                        this.frontFace = Laya.FrontFace.CW;
                    else
                        this.frontFace = Laya.FrontFace.CCW;
                    break;
                case Laya.RenderState.CULL_FRONT:
                    this.cullMode = Laya.CullMode.Front;
                    if (isTarget !== invertFront)
                        this.frontFace = Laya.FrontFace.CW;
                    else
                        this.frontFace = Laya.FrontFace.CCW;
                    break;
                case Laya.RenderState.CULL_BACK:
                default:
                    this.cullMode = Laya.CullMode.Back;
                    if (isTarget !== invertFront)
                        this.frontFace = Laya.FrontFace.CW;
                    else
                        this.frontFace = Laya.FrontFace.CCW;
                    break;
            }
        }
        _bindGroup(context, info, command) {
            var _a, _b, _c;
            let shaderInstance = info.shaderInstance;
            {
                if (this.owner) {
                    let bindgroupChangeFlag = this.owner.bindGroupChangeFlag;
                    if (info.shaderChange || this._spriteRenderDataChange || Laya.compareCahceFlag(bindgroupChangeFlag, info.renderNodeBindGroupCacheFlag)) {
                        info.renderNodeBindGroupCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                        let shaderResource = shaderInstance.uniformSetMap.get(2);
                        let textureExitsMask = shaderInstance.uniformTextureExits.get(2);
                        let commands = (_a = this.owner) === null || _a === void 0 ? void 0 : _a._commonUniformMap;
                        let shaderData = (_b = this.owner) === null || _b === void 0 ? void 0 : _b.shaderData;
                        let addition = (_c = this.owner) === null || _c === void 0 ? void 0 : _c.additionShaderData;
                        info.nodeBindGroup = Laya.WebGPURenderEngine._instance.bindGroupCache.getBindGroup(commands, shaderData, addition, shaderResource, textureExitsMask);
                        Laya.coverCahceFlag(this.owner.bindGroupLayoutChangeFlag, this._pipelineChangeFlag);
                    }
                }
                else {
                    info.nodeBindGroup = Laya.WebGPUBindGroupCache.emptyBindGroup;
                }
                command.setBindGroup(2, info.nodeBindGroup);
            }
            {
                if (this._materialShaderData) {
                    if (info.shaderChange || this._materialRenderDataChange || Laya.compareCahceFlag(this._matBindGroupChangeFlag, info.matBindGroupCacheFlag)) {
                        info.matBindGroupCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                        let shaderResource = shaderInstance.uniformSetMap.get(3);
                        let textureExitsMask = shaderInstance.uniformTextureExits.get(3);
                        info.matBindGroup = Laya.WebGPURenderEngine._instance.bindGroupCache.getBindGroup([this._subShader._owner.name], this._materialShaderData, null, shaderResource, textureExitsMask);
                        Laya.coverCahceFlag(this._matBindGroupLayoutFlag, this._pipelineChangeFlag);
                    }
                }
                else {
                    info.matBindGroup = Laya.WebGPUBindGroupCache.emptyBindGroup;
                }
                command.setBindGroup(3, info.matBindGroup);
            }
        }
        _uploadGeometry(command) {
            let triangles = 0;
            if (command) {
                triangles += command.applyGeometry(this.geometry);
            }
            return triangles;
        }
        _uploadGeometryIndex(command, index) {
            let triangles = 0;
            if (command) {
                triangles += command.applyGeometryIndex(this.geometry, index);
            }
            return triangles;
        }
        destroy() {
            this._materialUBO = null;
            this._passRenderInfo.clear();
        }
    }
    WebGPURenderElement3D._matChangeFlagMap = new Map();
    WebGPURenderElement3D._compileDefine = new Laya.WebDefineDatas();

    class WebGPUInstanceRenderElement3D extends WebGPURenderElement3D {
        static getInstanceBufferState(stateinfo, geometry, renderType, spriteDefine) {
            const _initStateInfo = (stateinfo) => {
                const oriBufferState = geometry.bufferState;
                const vertexArray = oriBufferState._vertexBuffers.slice();
                let worldMatVertex = stateinfo.worldInstanceVB;
                let declaration = Laya.VertexMesh.instanceWorldMatrixDeclaration;
                const size = this.MaxInstanceCount * declaration.vertexStride;
                if (!worldMatVertex || worldMatVertex.source._size < size) {
                    if (worldMatVertex) {
                        worldMatVertex.destroy();
                        worldMatVertex.source._source.destroy();
                    }
                    stateinfo.worldInstanceVB = worldMatVertex = new Laya.WebGPUVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, Laya.BufferUsage.Dynamic);
                    worldMatVertex.instanceBuffer = true;
                    worldMatVertex.setDataLength(size);
                    worldMatVertex.vertexDeclaration = declaration;
                }
                vertexArray.push(worldMatVertex);
                switch (renderType) {
                    case Laya.BaseRenderType.MeshRender:
                        if (spriteDefine.has(Laya.MeshSprite3DShaderDeclaration.SHADERDEFINE_UV1)) {
                            let instanceLightMapVertexBuffer = stateinfo.lightmapScaleOffsetVB;
                            const size = this.MaxInstanceCount * 4 * 4;
                            if (!instanceLightMapVertexBuffer || instanceLightMapVertexBuffer.source._size < size) {
                                if (instanceLightMapVertexBuffer) {
                                    instanceLightMapVertexBuffer.destroy();
                                    instanceLightMapVertexBuffer.source._source.destroy();
                                }
                                stateinfo.lightmapScaleOffsetVB = instanceLightMapVertexBuffer = new Laya.WebGPUVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, Laya.BufferUsage.Dynamic);
                                instanceLightMapVertexBuffer.instanceBuffer = true;
                                instanceLightMapVertexBuffer.setDataLength(this.MaxInstanceCount * 4 * 4);
                                instanceLightMapVertexBuffer.vertexDeclaration = Laya.VertexMesh.instanceLightMapScaleOffsetDeclaration;
                            }
                            vertexArray.push(instanceLightMapVertexBuffer);
                        }
                        break;
                    case Laya.BaseRenderType.SimpleSkinRender:
                        let instanceSimpleAnimatorBuffer = stateinfo.simpleAnimatorVB;
                        const size = this.MaxInstanceCount * 4 * 4;
                        if (!instanceSimpleAnimatorBuffer || instanceSimpleAnimatorBuffer.source._size < size) {
                            if (instanceSimpleAnimatorBuffer) {
                                instanceSimpleAnimatorBuffer.destroy();
                                instanceSimpleAnimatorBuffer.source._source.destroy();
                            }
                            stateinfo.simpleAnimatorVB = instanceSimpleAnimatorBuffer = new Laya.WebGPUVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, Laya.BufferUsage.Dynamic);
                            instanceSimpleAnimatorBuffer.instanceBuffer = true;
                            instanceSimpleAnimatorBuffer.setDataLength(this.MaxInstanceCount * 4 * 4);
                            instanceSimpleAnimatorBuffer.vertexDeclaration = Laya.VertexMesh.instanceSimpleAnimatorDeclaration;
                        }
                        vertexArray.push(instanceSimpleAnimatorBuffer);
                        break;
                }
                stateinfo.state.applyState(vertexArray, geometry.bufferState._bindedIndexBuffer);
            };
            if (!stateinfo)
                stateinfo = { state: new Laya.WebGPUBufferState() };
            _initStateInfo(stateinfo);
            return stateinfo;
        }
        static create() {
            var _a;
            const obj = (_a = this._pool.pop()) !== null && _a !== void 0 ? _a : new WebGPUInstanceRenderElement3D();
            return obj;
        }
        static _instanceBufferCreate(length) {
            var _a;
            let array = this._bufferPool.get(length);
            if (!array) {
                this._bufferPool.set(length, []);
                array = this._bufferPool.get(length);
            }
            return (_a = array.pop()) !== null && _a !== void 0 ? _a : new Float32Array(length);
        }
        constructor() {
            super();
            this._vertexBuffers = [];
            this._updateData = [];
            this._updateDataNum = [];
            this.instanceElementList = new Laya.SingletonList();
            this.drawCount = 0;
            this.updateNums = 0;
            this.isRender = true;
        }
        addUpdateBuffer(vb, length) {
            this._vertexBuffers[this.updateNums] = vb;
            this._updateDataNum[this.updateNums] = length;
            this.updateNums++;
        }
        getUpdateData(index, length) {
            this._updateData[index] = WebGPUInstanceRenderElement3D._instanceBufferCreate(length);
            return this._updateData[index];
        }
        _isShaderDataChange(context) {
            return true;
        }
        _compileShader(context) {
            this.renderShaderData.addDefine(Laya.MeshSprite3DShaderDeclaration.SHADERDEFINE_GPU_INSTANCE);
            super._compileShader(context);
            if (this._drawCacheArray.length > 0) {
                this._updateInstanceData();
            }
        }
        _preUpdatePre(context) {
            var _a;
            super._preUpdatePre(context);
            this._updateInstanceData();
            for (let i = 0; i < this.updateNums; i++) {
                (_a = this._vertexBuffers[i]) === null || _a === void 0 ? void 0 : _a.setData(this._updateData[i].buffer, 0, 0, this.drawCount * this._updateDataNum[i] * 4);
            }
        }
        _updateInstanceData() {
            if (this.updateNums != 0)
                this.clearRenderData();
            let worldDeclaration = Laya.VertexMesh.instanceWorldMatrixDeclaration;
            let worldMatFloatStride = worldDeclaration.vertexStride / 4;
            const worldMatrixData = this.getUpdateData(0, worldMatFloatStride * WebGPUInstanceRenderElement3D.MaxInstanceCount);
            this.addUpdateBuffer(this._instanceStateInfo.worldInstanceVB, worldMatFloatStride);
            const insBatches = this.instanceElementList;
            const elements = insBatches.elements;
            const count = insBatches.length;
            this.drawCount = count;
            this.geometry.instanceCount = this.drawCount;
            for (let i = 0; i < count; i++) {
                let element = elements[i];
                worldMatrixData.set(element.transform.worldMatrix.elements, i * worldMatFloatStride);
                element.owner._worldParams.writeTo(worldMatrixData, i * worldMatFloatStride + 16);
            }
            switch (this.owner.renderNodeType) {
                case Laya.BaseRenderType.MeshRender:
                    {
                        const haveLightMap = this.renderShaderData.hasDefine(Laya.RenderableSprite3D.SAHDERDEFINE_LIGHTMAP) && this.renderShaderData.hasDefine(Laya.MeshSprite3DShaderDeclaration.SHADERDEFINE_UV1);
                        if (haveLightMap) {
                            const lightMapData = this.getUpdateData(1, 4 * WebGPUInstanceRenderElement3D.MaxInstanceCount);
                            for (let i = 0; i < count; i++) {
                                const lightmapScaleOffset = elements[i].owner.lightmapScaleOffset;
                                const offset = i * 4;
                                lightMapData[offset] = lightmapScaleOffset.x;
                                lightMapData[offset + 1] = lightmapScaleOffset.y;
                                lightMapData[offset + 2] = lightmapScaleOffset.z;
                                lightMapData[offset + 3] = lightmapScaleOffset.w;
                            }
                            this.addUpdateBuffer(this._instanceStateInfo.lightmapScaleOffsetVB, 4);
                        }
                        break;
                    }
                case Laya.BaseRenderType.SimpleSkinRender:
                    {
                        const simpleAnimatorData = this.getUpdateData(1, 4 * WebGPUInstanceRenderElement3D.MaxInstanceCount);
                        for (let i = 0; i < count; i++) {
                            const simpleAnimatorParams = elements[i].renderShaderData.getVector(Laya.SimpleSkinnedMeshSprite3D.SIMPLE_SIMPLEANIMATORPARAMS);
                            const offset = i * 4;
                            simpleAnimatorData[offset] = simpleAnimatorParams.x;
                            simpleAnimatorData[offset + 1] = simpleAnimatorParams.y;
                            simpleAnimatorData[offset + 2] = simpleAnimatorParams.z;
                            simpleAnimatorData[offset + 3] = simpleAnimatorParams.w;
                        }
                        this.addUpdateBuffer(this._instanceStateInfo.simpleAnimatorVB, 4);
                        break;
                    }
            }
        }
        setGeometry(value) {
            this.oriBufferStateCacheID = value._bufferState.stateCacheID;
            let geometry = this.geometry;
            if (!geometry) {
                this.geometry = geometry = new Laya.WebGPURenderGeometry(value.mode, value.drawType);
            }
            value.cloneTo(geometry);
            geometry.drawType = Laya.DrawType.DrawElementInstance;
            this._instanceStateInfo = WebGPUInstanceRenderElement3D.getInstanceBufferState(this._instanceStateInfo, value, this.owner.renderNodeType, this.renderShaderData._defineDatas);
            geometry.bufferState = this._instanceStateInfo.state;
        }
        _uploadGeometry(command) {
            var _a;
            for (let i = 0; i < this.updateNums; i++)
                (_a = this._vertexBuffers[i]) === null || _a === void 0 ? void 0 : _a.setData(this._updateData[i].buffer, 0, 0, this.drawCount * this._updateDataNum[i] * 4);
            return super._uploadGeometry(command);
        }
        clearRenderData() {
            this.drawCount = 0;
            this.updateNums = 0;
            this._vertexBuffers.length = 0;
            this._updateData.forEach(data => {
                WebGPUInstanceRenderElement3D._bufferPool.get(data.length).push(data);
            });
            this._updateData.length = 0;
            this._updateDataNum.length = 0;
            this.renderShaderData.removeDefine(Laya.MeshSprite3DShaderDeclaration.SHADERDEFINE_GPU_INSTANCE);
        }
        recover() {
            this.instanceElementList.clear();
            WebGPUInstanceRenderElement3D._pool.push(this);
        }
    }
    WebGPUInstanceRenderElement3D.MaxInstanceCount = 1024;
    WebGPUInstanceRenderElement3D._pool = [];
    WebGPUInstanceRenderElement3D._bufferPool = new Map();

    class WebGPUBlitQuadCMDData extends Laya.BlitQuadCMDData {
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
            if (this._source)
                this._sourceTexelSize.setValue(1 / this._source.width, 1 / this._source.height, this._source.width, this._source.height);
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
            this.element.materialShaderData._setInternalTexture(Laya.Command.SCREENTEXTURE_ID, this._source);
            this.element.materialShaderData.setVector(Laya.Command.SCREENTEXTUREOFFSETSCALE_ID, this._offsetScale);
            this.element.materialShaderData.setVector(Laya.Command.MAINTEXTURE_TEXELSIZE_ID, this._sourceTexelSize);
            context.setViewPort(this._viewport);
            context.setScissor(this._scissor);
            context.setRenderTarget(this.dest, Laya.RenderClearFlag.Nothing);
            context.drawRenderElementOne(this.element);
        }
    }

    class WebGPUDrawElementCMDData extends Laya.DrawElementCMDData {
        constructor() {
            super();
            this.type = Laya.RenderCMDType.DrawElement;
        }
        setRenderelements(value) {
            this._elemets = value;
        }
        apply(context) {
            if (this._elemets.length == 1) {
                context.drawRenderElementOne(this._elemets[0]);
            }
            else {
                this._elemets.forEach(element => {
                    context.drawRenderElementOne(element);
                });
            }
        }
    }

    class WebGPUDrawNodeCMDData extends Laya.DrawNodeCMDData {
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
            this.node._renderUpdatePre(context);
            if (this.subMeshIndex == -1) {
                this.node.renderelements.forEach(element => {
                    const oriSubShader = element.subShader;
                    const oriMatShaderData = element.materialShaderData;
                    element.subShader = this._destSubShader;
                    element.materialShaderData = this._destShaderData;
                    context.drawRenderElementOne(element);
                    element.subShader = oriSubShader;
                    element.materialShaderData = oriMatShaderData;
                });
            }
            else {
                const element = this.node.renderelements[this.subMeshIndex];
                const oriSubShader = element.subShader;
                const oriMatShaderData = element.materialShaderData;
                element.subShader = this._destSubShader;
                element.materialShaderData = this._destShaderData;
                context.drawRenderElementOne(element);
                element.subShader = oriSubShader;
                element.materialShaderData = oriMatShaderData;
            }
        }
    }

    const viewport = new Laya.Viewport();
    const scissor = new Laya.Vector4();
    class WebGPUSetRenderTargetCMD extends Laya.SetRenderTargetCMD {
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
            context.setRenderTarget(this.rt, Laya.RenderClearFlag.Nothing);
            context.setClearData(this.clearFlag, this.clearColorValue, this.clearDepthValue, this.clearStencilValue);
            if (this.rt) {
                viewport.set(0, 0, this.rt._textures[0].width, this.rt._textures[0].height);
                scissor.setValue(0, 0, this.rt._textures[0].width, this.rt._textures[0].height);
                context.setViewPort(viewport);
                context.setScissor(scissor);
            }
        }
    }

    class WebGPUSetViewportCMD extends Laya.SetViewportCMD {
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
            context.setViewPort(this.viewport);
            context.setScissor(this.scissor);
        }
    }

    const dynamicOffsetsData = new Uint32Array(1);
    class WebGPUSkinRenderElement3D extends WebGPURenderElement3D {
        constructor() {
            super();
            this.objectName = 'WebGPUSkinRenderElement3D';
            this._skinnedDataSize = 0;
            this._skinnedBufferOffsetAlignment = 0;
            this.skinnedUniformMap = new Map();
            this.skinnedUniformMap.set(Laya.SkinnedMeshRenderer.BONES, {
                id: Laya.SkinnedMeshRenderer.BONES,
                uniformtype: Laya.ShaderDataType.Matrix4x4,
                propertyName: "u_bones",
                arrayLength: 1,
            });
            const boneCount = 24;
            let bufferLength = boneCount * 16 * Float32Array.BYTES_PER_ELEMENT;
            const engine = Laya.WebGPURenderEngine._instance;
            const alignment = engine.getDevice().limits.minUniformBufferOffsetAlignment;
            this._skinnedBufferOffsetAlignment = Math.ceil(bufferLength / alignment) * alignment;
            this._skinnedDataSize = this._skinnedBufferOffsetAlignment / Float32Array.BYTES_PER_ELEMENT;
        }
        _updateNodeUBO() {
            let owner = this.owner;
            if (owner) {
                if (owner.spriteUBO0) {
                    owner.spriteUBO0.upload();
                }
                else {
                    owner.spriteUBOs.forEach(ubo => {
                        ubo.upload();
                    });
                }
                if (owner.additionalUBO0) {
                    owner.additionalUBO0.upload();
                }
                else {
                    owner.additionalUBOs.forEach(ubo => {
                        ubo.upload();
                    });
                }
            }
        }
        _preUpdatePre(context) {
            var _a;
            super._preUpdatePre(context);
            if (this._renderShaderData && this.owner._commonUniformMap.length > 0) {
                if (this.skinnedData) {
                    let uniform = this.skinnedUniformMap.get(Laya.SkinnedMeshRenderer.BONES);
                    let arrayLength = 24 * (this.skinnedData.length);
                    if (arrayLength != uniform.arrayLength) {
                        uniform.arrayLength = arrayLength;
                        (_a = this.skinnedBuffer) === null || _a === void 0 ? void 0 : _a.destroy();
                        this.skinnedBuffer = new Laya.WebGPUSubUniformBuffer("SkinSprite3D", this.skinnedUniformMap, null);
                        this._spriteRenderDataChange = true;
                    }
                    for (let i = 0; i < this.skinnedData.length; i++) {
                        let data = this.skinnedData[i];
                        this.skinnedBuffer.descriptor.uniforms.get(Laya.SkinnedMeshRenderer.BONES).view.set(data, this._skinnedDataSize * i);
                        this.skinnedBuffer.needUpload = true;
                    }
                    this.skinnedBuffer.upload();
                }
            }
            return;
        }
        _bindGroup(context, info, command) {
            var _a, _b, _c;
            let shaderInstance = info.shaderInstance;
            {
                command.setBindGroup(0, context._sceneBindGroup);
            }
            {
                command.setBindGroup(1, context._cameraBindGroup);
            }
            {
                if (this.owner) {
                    let bindgroupChangeFlag = this.owner.bindGroupChangeFlag;
                    if (info.shaderChange || this._spriteRenderDataChange || Laya.compareCahceFlag(bindgroupChangeFlag, info.renderNodeBindGroupCacheFlag)) {
                        info.renderNodeBindGroupCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                        let shaderResource = shaderInstance.uniformSetMap.get(2);
                        let textureExitsMask = shaderInstance.uniformTextureExits.get(2);
                        let commands = (_a = this.owner) === null || _a === void 0 ? void 0 : _a._commonUniformMap;
                        let shaderData = (_b = this.owner) === null || _b === void 0 ? void 0 : _b.shaderData;
                        let addition = (_c = this.owner) === null || _c === void 0 ? void 0 : _c.additionShaderData;
                        shaderData._cacheSubUniformBuffer(this.skinnedBuffer, "SkinSprite3D", "SkinSprite3D", this.skinnedUniformMap);
                        info.nodeBindGroup = Laya.WebGPURenderEngine._instance.bindGroupCache.getBindGroup(commands, shaderData, addition, shaderResource, textureExitsMask);
                        Laya.coverCahceFlag(this.owner.bindGroupLayoutChangeFlag, this._pipelineChangeFlag);
                    }
                }
                else {
                    info.nodeBindGroup = Laya.WebGPUBindGroupCache.emptyBindGroup;
                }
            }
            {
                if (this._materialShaderData) {
                    if (info.shaderChange || this._materialRenderDataChange || Laya.compareCahceFlag(this._matBindGroupChangeFlag, info.matBindGroupCacheFlag)) {
                        info.matBindGroupCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                        let shaderResource = shaderInstance.uniformSetMap.get(3);
                        let textureExitsMask = shaderInstance.uniformTextureExits.get(3);
                        info.matBindGroup = Laya.WebGPURenderEngine._instance.bindGroupCache.getBindGroup([this._subShader._owner.name], this._materialShaderData, null, shaderResource, textureExitsMask);
                        Laya.coverCahceFlag(this._matBindGroupLayoutFlag, this._pipelineChangeFlag);
                    }
                }
                else {
                    info.matBindGroup = Laya.WebGPUBindGroupCache.emptyBindGroup;
                }
                command.setBindGroup(3, info.matBindGroup);
            }
        }
        _render(context, command) {
            if (!this.isRender) {
                return 0;
            }
            if (this._drawCacheArray && this._drawCacheArray.length == 0)
                return 0;
            for (let j = 0, m = this._drawCacheArray.length; j < m; j++) {
                let drawInfo = this._drawCacheArray[j];
                let shaderInstance = drawInfo.shaderInstance;
                if (!shaderInstance.complete)
                    return 0;
                this._bindGroup(context, drawInfo, command);
                let pipelineCache = drawInfo.pipeLineCacheFlag;
                if (drawInfo.shaderChange ||
                    Laya.compareCahceFlag(context._pipelineChange, pipelineCache) ||
                    Laya.compareCahceFlag(this._pipelineChangeFlag, pipelineCache)) {
                    this._bindGroupMap.clear();
                    this._bindGroupMap.set(0, context._sceneBindGroup);
                    this._bindGroupMap.set(1, context._cameraBindGroup);
                    this._bindGroupMap.set(2, drawInfo.nodeBindGroup);
                    this._bindGroupMap.set(3, drawInfo.matBindGroup);
                    drawInfo.shaderChange = false;
                    drawInfo.pipeline = this._getWebGPURenderPipeline(drawInfo.shaderInstance, context.destRT, context);
                    drawInfo.pipeLineCacheFlag.setValue(Laya.Stat.loopCount, Laya.WebGPURenderEngine._instance._framePassCount);
                }
                command.setPipeline(drawInfo.pipeline);
                if (!command.isBundle && this.depthStencilParam.stencilEnable) {
                    command.setStencilReference(this.depthStencilParam.stencilRef);
                }
                {
                    let bindgroup = drawInfo.nodeBindGroup;
                    for (let i = 0; i < this.skinnedData.length; i++) {
                        dynamicOffsetsData[0] = i * this._skinnedBufferOffsetAlignment;
                        command.setBindGroupByDataOffaset(2, bindgroup, dynamicOffsetsData, 0, 1);
                        this._uploadGeometryIndex(command, i);
                    }
                }
            }
            return 1;
        }
        destroy() {
            super.destroy();
            this.skinnedData = null;
        }
    }

    WebBaseRenderNode.BaseRenderNodeClass = WebGPUBaseRenderNode;
    class WebGPU3DRenderPassFactory {
        createInstanceBatch() {
            return new WebGPUInstanceRenderBatch();
        }
        createRender3DProcess() {
            return new WebGPU3DRenderPass();
        }
        createRenderContext3D() {
            return new WebGPURenderContext3D();
        }
        createRenderElement3D() {
            return new WebGPURenderElement3D();
        }
        createInstanceRenderElement3D() {
            return WebGPUInstanceRenderElement3D.create();
        }
        createSkinRenderElement() {
            return new WebGPUSkinRenderElement3D();
        }
        createSceneRenderManager() {
            return new WebSceneRenderManager();
        }
        createDrawNodeCMDData() {
            return new WebGPUDrawNodeCMDData();
        }
        createBlitQuadCMDData() {
            return new WebGPUBlitQuadCMDData();
        }
        createDrawElementCMDData() {
            return new WebGPUDrawElementCMDData();
        }
        createSetViewportCMD() {
            return new WebGPUSetViewportCMD();
        }
        createSetRenderTargetCMD() {
            return new WebGPUSetRenderTargetCMD();
        }
        createSetRenderDataCMD() {
            return new Laya.WebGPUSetRenderData();
        }
        createSetShaderDefineCMD() {
            return new Laya.WebGPUSetShaderDefine();
        }
        createComputeCommandAppatchCMD() {
            return new Laya.WebGPUComputeCommandAppatchCMD();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.Laya3DRender.Render3DPassFactory) {
            Laya.Laya3DRender.Render3DPassFactory = new WebGPU3DRenderPassFactory();
            Laya.LayaGL.statAgent = new Laya.DefaultStaticsContext();
        }
    });
    Laya.Laya.addAfterInitCallback(() => {
        Laya.Laya3DRender.Render3DModuleDataFactory.createBaseRenderNode = () => {
            return new WebGPUBaseRenderNode();
        };
    });

    class WebGPUShaderDefine {
        static findNumberDefine(code, map) {
            const pattern = /^\s*#define\s+(\w+)\s+([1-9]\d*)(?=\s*($|\/\/))/gm;
            if (!map)
                map = new Map();
            let match;
            while ((match = pattern.exec(code)) !== null) {
                map.set(match[1], match[2]);
            }
            return map;
        }
    }

    class WebGPUShaderCompileUtil {
        static checkDef(node, _defs) {
            if (null == _defs)
                return;
            let arr = node.defParam;
            if (arr) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    let str = arr[i];
                    if ("#ifdef" == node.name || '#ifndef' == node.name) {
                        _defs.add(str);
                    }
                    else {
                        while (true) {
                            let ofs = str.indexOf("defined");
                            if (0 <= ofs) {
                                ofs = str.indexOf("(");
                                if (0 < ofs) {
                                    let ofs2 = str.indexOf(")");
                                    _defs.add(str.substring(ofs + 1, ofs2).trim());
                                    str = str.substring(ofs2 + 1);
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            }
        }
        static extractMacros(code) {
            const regex = /^\s*#\s*define\s+/;
            const lines = code.split('\n');
            const macros = [];
            let currentMacro = '';
            for (let i = 0, len = lines.length; i < len; i++) {
                const line = lines[i].trim();
                if (line.length === 0)
                    continue;
                if (currentMacro.length > 0 || regex.test(line)) {
                    if (line.endsWith('\\')) {
                        currentMacro += line.slice(0, -1) + ' ';
                    }
                    else {
                        currentMacro += line;
                        macros.push(new Laya.WebGPU_GLSLMacro(currentMacro));
                        currentMacro = '';
                    }
                }
            }
            return macros;
        }
        static macrosToVariable(macros) {
            const regex = /^([_a-zA-Z][_a-zA-Z0-9]*)$/;
            const variable = new Set();
            for (let i = macros.length - 1; i > -1; i--) {
                let name = macros[i].replace;
                if (name) {
                    const ofs = name.indexOf('.');
                    if (ofs >= 0) {
                        name = name.substring(0, ofs).trim();
                        if (name.match(regex))
                            variable.add(name);
                    }
                    else if (name.match(regex))
                        variable.add(name);
                }
            }
            return variable;
        }
        static toScript(root, def, outData) {
            if (null == def)
                def = {};
            let out = this._parseChilds(root, def);
            const macros = this.extractMacros(out);
            const mvariable = this.macrosToVariable(macros);
            if (outData) {
                let st = WebGPUShaderCompileCode.compile(out);
                let uniform = st.uniform;
                let varying = st.varying;
                let attribute = st.attribute;
                let variable = st.variable;
                if (variable) {
                    if (uniform) {
                        for (let k in uniform) {
                            if (variable.has(k) || mvariable.has(k)) {
                                if (null == outData.uniform)
                                    outData.uniform = {};
                                outData.uniform[k] = uniform[k];
                            }
                        }
                    }
                    if (varying) {
                        for (let k in varying) {
                            if (variable.has(k) || mvariable.has(k)) {
                                if (null == outData.varying)
                                    outData.varying = {};
                                outData.varying[k] = varying[k];
                            }
                        }
                    }
                    if (attribute) {
                        for (let k in attribute) {
                            if (variable.has(k) || mvariable.has(k)) {
                                if (null == outData.attribute)
                                    outData.attribute = {};
                                outData.attribute[k] = attribute[k];
                            }
                        }
                    }
                }
                outData.variable = variable;
            }
            out = this.removeUniform(out);
            out = this.removeVarying(out);
            return out;
        }
        static removeUniform(code) {
            let arr = code.split("\n");
            let isParentRemove = false;
            let isUniformStruct = false;
            let isModify = false;
            for (let i = 0, len = arr.length; i < len; i++) {
                let cstr = arr[i].trim();
                if ('' == cstr) {
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                }
                else if (0 == cstr.indexOf("uniform ")) {
                    isParentRemove = true;
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                    isModify = true;
                    if (0 < cstr.indexOf("{")) {
                        isUniformStruct = true;
                    }
                }
                else {
                    if (isParentRemove && !isUniformStruct) {
                        if (0 == cstr.indexOf("{")) {
                            isUniformStruct = true;
                            arr.splice(i, 1);
                            len -= 1;
                            i -= 1;
                        }
                    }
                    else if (isUniformStruct) {
                        if (0 <= cstr.indexOf("}")) {
                            isUniformStruct = false;
                        }
                        arr.splice(i, 1);
                        len -= 1;
                        i -= 1;
                    }
                    isParentRemove = false;
                }
            }
            if (isModify)
                code = arr.join('\n');
            return code;
        }
        static removeVarying(code) {
            let arr = code.split("\n");
            let isModify = false;
            for (let i = 0, len = arr.length; i < len; i++) {
                let cstr = arr[i].trim();
                if ('' == cstr) {
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                }
                else if (0 == cstr.indexOf("varying ")) {
                    arr.splice(i, 1);
                    len -= 1;
                    i -= 1;
                    isModify = true;
                }
            }
            if (isModify)
                code = arr.join('\n');
            return code;
        }
        static checkCondition(st, def) {
            let childs = st.childs;
            let ret = false;
            if (null == childs) {
                return ret;
            }
            for (let i = 0, len = childs.length; i < len; i++) {
                let o = childs[i];
                if (exports.enumOperator["&&"] == o.operator) {
                    if (!ret) {
                        continue;
                    }
                }
                else if (exports.enumOperator["||"] == o.operator) {
                    if (ret) {
                        continue;
                    }
                }
                if ('defined' == o.name) {
                    try {
                        let defName = o.parameter.childs[0].name;
                        let b = !!def[defName];
                        if (o.operator == exports.enumOperator["!"])
                            b = !b;
                        ret = b;
                    }
                    catch (err) { }
                }
                else {
                    if (null != o.name || null == o.operator || null != o.parameter) {
                        if (('' == o.name || null == o.name) && null != o.parameter) {
                            ret = this.checkCondition(o.parameter, def);
                        }
                        else {
                            console.log("TODO:待处理判断", o);
                        }
                    }
                }
            }
            return ret;
        }
        static _parseChilds(parent, def) {
            let childs = parent.childs;
            let checkConditionType = 0;
            let out = '';
            if (null == childs)
                return out;
            for (let i = 0, len = childs.length; i < len; i++) {
                let t = childs[i];
                if ("#ifdef" == t.name || "#ifndef" == t.name || "#if" == t.name || "#elif" == t.name || "#else" == t.name) {
                    if (1 == checkConditionType && ("#elif" == t.name || "#else" == t.name)) {
                        continue;
                    }
                    if (t.condition(def)) {
                        if ("#else" != t.name) {
                            checkConditionType = 1;
                        }
                        else {
                            checkConditionType = 0;
                        }
                        out += this._parseChilds(t, def);
                    }
                    else {
                        checkConditionType = 0;
                    }
                }
                else if (null != t.defParam) {
                    if ('#define' == t.name) {
                        if (Array.isArray(t.defParam)) {
                            let arr = t.defParam;
                            if (1 == arr.length) {
                                def[arr[0]] = true;
                            }
                        }
                        else {
                            console.log('TODO');
                        }
                    }
                    else if ('#undefine' == t.name) {
                        if (Array.isArray(t.defParam)) {
                            let arr = t.defParam;
                            if (1 == arr.length) {
                                delete def[arr[0]];
                            }
                        }
                        else {
                            console.log('TODO');
                        }
                    }
                    if (t.code)
                        out += t.code + "\n";
                }
                else {
                    if (t.code && null == t.root) {
                        out += t.code + "\n";
                    }
                }
            }
            return out;
        }
    }

    class WebGPUShaderToken {
        constructor(includefiles) {
            this.z = 0;
            if (includefiles) {
                this.includefiles = includefiles;
            }
            else {
                this.includefiles = [];
            }
        }
        condition(def) {
            if ('#else' == this.name)
                return true;
            if (null != def) {
                if ("#ifdef" == this.name || "#ifndef" == this.name) {
                    try {
                        let check = this.defParam[0];
                        return ("#ifdef" == this.name) == !!def[check];
                    }
                    catch (err) { }
                }
                else {
                    if (!(this.defParam instanceof WebGPUShaderToken)) {
                        let defParm = this.defParam.join(" ");
                        let parmRoot = WebGPUShaderCompileCode.compile(defParm);
                        this.defParam = parmRoot;
                    }
                    return WebGPUShaderCompileUtil.checkCondition(this.defParam, def);
                }
            }
            else if ("#ifndef" == this.name) {
                return true;
            }
            return false;
        }
        addParameterArr(param, parent) {
            if (null == this.parameterArr) {
                this.parameterArr = [];
            }
            this.parameterArr.push(param);
            param.owner = this;
            if (parent) {
                param.parent = parent;
            }
        }
        setParameter(param, parent) {
            this.parameter = param;
            param.owner = this;
            if (parent)
                param.parent = parent;
        }
        addBody(body) {
            body.setParent(this);
        }
        setParent(parent) {
            if (null == parent.childs) {
                parent.childs = [];
            }
            parent.childs.push(this);
            this.z = parent.z + 1;
            this.parent = parent;
        }
        _parseShaderNode(sn) {
            let ret = '';
            let operator = null;
            if (null != sn.operator) {
                operator = exports.enumOperator[sn.operator];
                if (!sn.operatorRight) {
                    ret += operator;
                    operator = null;
                }
            }
            if (sn.type) {
                if (null != sn.describe) {
                    ret += exports.enumDescribe[sn.describe] + " ";
                }
                if (null != sn.inOrOut) {
                    ret += exports.enumInOut[sn.inOrOut] + " ";
                }
                if (null != sn.type) {
                    ret += sn.type + " ";
                }
                if (null != sn.name) {
                    ret += sn.name;
                }
                if (null != sn.parameter) {
                    let childs = sn.parameter.childs;
                    if (childs) {
                        ret += '(';
                        for (let i = 0, len = childs.length; i < len; i++) {
                            ret += this._parseShaderNode(childs[i]);
                        }
                        ret += ')';
                    }
                }
            }
            else if (sn.parameter) {
                if (null != sn.name) {
                    ret += sn.name;
                }
                if (null != operator) {
                    ret += operator;
                    operator = null;
                }
                ret += '(' + this._getParameter(sn.parameter) + ")";
            }
            else if (sn.parameterArr) {
                ret += this._getParameterArr(sn, '');
            }
            else if (sn.name) {
                ret += sn.name;
            }
            if (null != operator) {
                ret += operator;
            }
            if (null != sn.childs) {
                for (let i = 0, len = sn.childs.length; i < len; i++) {
                    ret += this._parseShaderNode(sn.childs[i]);
                }
            }
            return ret;
        }
        _getParameter(param, isFor = false) {
            let ret = '';
            if (null == param) {
                param = this.parameter;
            }
            if (param) {
                if (param.childs) {
                    let arr = param.childs;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let sn = arr[i];
                        ret += this._parseShaderNode(sn);
                        if (isFor && i < len - 1) {
                            ret += ';';
                        }
                    }
                }
                else {
                    ret += this._parseShaderNode(param);
                }
            }
            return ret;
        }
        _getParameterArr(st, end = ';') {
            let outStr = '';
            if (null != st.type) {
                outStr += st.type + " ";
            }
            let operator;
            if (null != st.operator && '' != end) {
                operator = exports.enumOperator[st.operator];
                if (!st.operatorRight) {
                    outStr += operator;
                    operator = null;
                }
            }
            let arr = st.parameterArr;
            if (null != st.name) {
                outStr += st.name;
            }
            for (let i = 0, len = arr.length; i < len; i++) {
                outStr += "[" + st._getParameter(arr[i]) + "]";
            }
            if (null != operator) {
                outStr += operator;
            }
            if (st.assign) {
                if (null != st.assignLeft) {
                    outStr += exports.enumOperator[st.assignLeft];
                }
                outStr += "=";
            }
            if (st.childs) {
                outStr += st._getParameter(st);
            }
            return outStr + end;
        }
        toscript(def, out) {
            if (null == out) {
                out = [];
            }
            if (this.type) {
                if ("return" == this.type) {
                    let outStr = this.type + " ";
                    if (this.name) {
                        outStr += this.name;
                    }
                    if (this.parameter) {
                        outStr += "(" + this._getParameter() + ")";
                    }
                    if (null != this.childs) {
                        outStr += this._getParameter(this);
                    }
                    outStr += ";";
                    out.push(outStr);
                }
                else if (this.parameter) {
                    let outStr = this.type + " " + this.name + "(" + this._getParameter() + "){";
                    if (null != this.describe) {
                        outStr = exports.enumDescribe[this.describe] + " " + outStr;
                    }
                    out.push(outStr);
                    if (this.childs) {
                        for (let i = 0, len = this.childs.length; i < len; i++) {
                            this.childs[i].toscript(def, out);
                        }
                    }
                    out.push('}');
                }
                else if (this.parameterArr) {
                    out.push(this._getParameterArr(this));
                }
                else if (this.assign) {
                    let outStr = this.type + " " + this.name;
                    if (null != this.assignLeft) {
                        outStr += exports.enumOperator[this.assignLeft];
                    }
                    outStr += '=';
                    if (this.childs) {
                        outStr += this._getParameter(this);
                        outStr += ';';
                        out.push(outStr);
                    }
                    else {
                        console.log("理论上不存在这种情况！");
                    }
                }
                else if (null != this.name) {
                    let outStr = '';
                    if (null != this.describe) {
                        outStr += exports.enumDescribe[this.describe] + " ";
                    }
                    outStr += this.type + " " + this.name;
                    if (null != this.operator) {
                        outStr += exports.enumOperator[this.operator];
                    }
                    if ('struct' == this.type) {
                        outStr += '{';
                        out.push(outStr);
                        outStr = '';
                        if (null != this.childs) {
                            let arr = this.childs;
                            for (let i = 0, len = arr.length; i < len; i++) {
                                let sn = arr[i];
                                let outStr = this._parseShaderNode(sn);
                                if ('' != outStr) {
                                    out.push(outStr + ";");
                                }
                            }
                        }
                        outStr += '}';
                        if (this.varNames) {
                            outStr += " " + this.varNames.join(",");
                        }
                    }
                    else {
                        if (null != this.childs)
                            outStr += this._getParameter(this);
                    }
                    outStr += ';';
                    out.push(outStr);
                }
                else {
                    out.push(this.type + ";");
                }
            }
            else if (this.parameterArr) {
                out.push(this._getParameterArr(this));
            }
            else if (this.parameter) {
                if (null != this.name) {
                    let outStr = '';
                    if (null != this.operator) {
                        outStr += exports.enumOperator[this.operator];
                    }
                    outStr += this.name + "(" + this._getParameter(null, 'for' == this.name) + ")";
                    if ("layout" == this.name) {
                        if (this.childs) {
                            for (let i = 0, len = this.childs.length; i < len; i++) {
                                let sn = this.childs[i];
                                if (sn.describe == exports.enumDescribe.uniform) {
                                    outStr += ' uniform';
                                }
                                else {
                                    console.log("TODO待处理:", sn);
                                }
                            }
                        }
                        outStr += ';';
                        out.push(outStr);
                    }
                    else {
                        out.push(outStr);
                        if (this.childs) {
                            out.push("{");
                            for (let i = 0, len = this.childs.length; i < len; i++) {
                                let sn = this.childs[i];
                                sn.toscript(def, out);
                            }
                            out.push("}");
                        }
                    }
                }
            }
            else if (this.name) {
                if (this.describe == exports.enumDescribe.uniform) {
                    out.push("uniform " + this.name + "{");
                    for (let i = 0, len = this.childs.length; i < len; i++) {
                        let sn = this.childs[i];
                        sn.toscript(def, out);
                    }
                    let outstr = '}';
                    if (this.varNames) {
                        outstr += " " + this.varNames.join(",");
                    }
                    outstr += ';';
                    out.push(outstr);
                }
                else if (this.assign) {
                    let outStr = this.name;
                    if (null != this.assignLeft) {
                        outStr += exports.enumOperator[this.assignLeft];
                    }
                    outStr += '=';
                    if (this.childs) {
                        outStr += this._getParameter(this);
                        outStr += ';';
                        out.push(outStr);
                    }
                    else {
                        console.log("理论上不存在这种情况！");
                    }
                }
                else {
                    if (this.childs) {
                        out.push(this.name + "{");
                        for (let i = 0, len = this.childs.length; i < len; i++) {
                            let sn = this.childs[i];
                            sn.toscript(def, out);
                        }
                        out.push("}");
                    }
                    else {
                        if (0 > this.name.indexOf("#")) {
                            out.push(this.name + ";");
                        }
                        else {
                            out.push(this.name);
                        }
                    }
                }
            }
            else if (null != this.operator) ;
            else if (this.childs) {
                if (null != this.parent) {
                    out.push("{");
                    for (let i = 0, len = this.childs.length; i < len; i++) {
                        let sn = this.childs[i];
                        sn.toscript(def, out);
                    }
                    out.push("}");
                }
                else {
                    for (let i = 0, len = this.childs.length; i < len; i++) {
                        let sn = this.childs[i];
                        sn.toscript(def, out);
                    }
                }
            }
            else ;
            return out;
        }
    }

    exports.enumInOut = void 0;
    (function (enumInOut) {
        enumInOut[enumInOut["in"] = 0] = "in";
        enumInOut[enumInOut["out"] = 1] = "out";
        enumInOut[enumInOut["inout"] = 2] = "inout";
    })(exports.enumInOut || (exports.enumInOut = {}));
    exports.enumDescribe = void 0;
    (function (enumDescribe) {
        enumDescribe[enumDescribe["uniform"] = 0] = "uniform";
        enumDescribe[enumDescribe["varying"] = 1] = "varying";
        enumDescribe[enumDescribe["const"] = 2] = "const";
        enumDescribe[enumDescribe["mediump"] = 3] = "mediump";
        enumDescribe[enumDescribe["highp"] = 4] = "highp";
        enumDescribe[enumDescribe["lowp"] = 5] = "lowp";
        enumDescribe[enumDescribe["attribute"] = 6] = "attribute";
    })(exports.enumDescribe || (exports.enumDescribe = {}));
    exports.enumOperator = void 0;
    (function (enumOperator) {
        enumOperator[enumOperator["!="] = 0] = "!=";
        enumOperator[enumOperator["=="] = 1] = "==";
        enumOperator[enumOperator["<="] = 2] = "<=";
        enumOperator[enumOperator[">="] = 3] = ">=";
        enumOperator[enumOperator["||"] = 4] = "||";
        enumOperator[enumOperator["&&"] = 5] = "&&";
        enumOperator[enumOperator[">>"] = 6] = ">>";
        enumOperator[enumOperator["<<"] = 7] = "<<";
        enumOperator[enumOperator["++"] = 8] = "++";
        enumOperator[enumOperator["^^"] = 9] = "^^";
        enumOperator[enumOperator["--"] = 10] = "--";
        enumOperator[enumOperator["!"] = 11] = "!";
        enumOperator[enumOperator["+"] = 12] = "+";
        enumOperator[enumOperator["-"] = 13] = "-";
        enumOperator[enumOperator["*"] = 14] = "*";
        enumOperator[enumOperator["/"] = 15] = "/";
        enumOperator[enumOperator["="] = 16] = "=";
        enumOperator[enumOperator["<"] = 17] = "<";
        enumOperator[enumOperator[">"] = 18] = ">";
        enumOperator[enumOperator["&"] = 19] = "&";
        enumOperator[enumOperator["|"] = 20] = "|";
        enumOperator[enumOperator["^"] = 21] = "^";
        enumOperator[enumOperator["%"] = 22] = "%";
    })(exports.enumOperator || (exports.enumOperator = {}));
    const boolCheck = ['<=', '>=', '!=', '==', "&&", "||", '>', '<', '!'];
    const checkBodyName = ['if', 'for', 'while', 'layout'];
    const _clearCR = new RegExp("\r", "g");
    class WebGPUShaderCompileCode {
        static compile(code) {
            let ret = new WebGPUShaderToken();
            code = code.replace(_clearCR, "");
            code = this.removeAnnotation(code).trim();
            this._define.clear();
            WebGPUShaderDefine.findNumberDefine(code, this._define);
            this._compileToTree(ret, code);
            this._parameterNode = null;
            this._parentNode = null;
            this._currNode = null;
            this._currNameNode = null;
            this._currParame = null;
            this._isCheckType = false;
            this._currTmpBody = null;
            ret.uniform = this._uniform;
            ret.variable = this._variable;
            ret.structs = this._struct;
            ret.varying = this._varying;
            ret.attribute = this._attribute;
            if (this._struct) {
                if (this._uniform) {
                    for (let k in this._uniform) {
                        if (this._struct[this._uniform[k].type]) {
                            this._uniform[k].struct = this._struct[this._uniform[k].type];
                        }
                    }
                }
                if (this._varying) {
                    for (let k in this._varying) {
                        if (this._struct[this._varying[k].type]) {
                            this._varying[k].struct = this._struct[this._varying[k].type];
                        }
                    }
                }
                if (this._attribute) {
                    for (let k in this._attribute) {
                        if (this._struct[this._attribute[k].type]) {
                            this._attribute[k].struct = this._struct[this._attribute[k].type];
                        }
                    }
                }
            }
            this._uniform = null;
            this._variable = null;
            this._struct = null;
            this._varying = null;
            this._attribute = null;
            this._varUniform = null;
            return ret;
        }
        static get _currNode() {
            return this.__currNode;
        }
        static set _currNode(value) {
            if (value == this.__currNode)
                return;
            if (null != this.__currNode) {
                if (null != this.__currNode.name && (null == this.__currNode.type || 'return' == this.__currNode.type)) {
                    if (null == this.__currNode.parameter && this.__currNode.describe != exports.enumDescribe.uniform) {
                        let name = this.__currNode.name;
                        if ('' != name && isNaN(Number(name))) {
                            let ofs = name.indexOf(".");
                            if (0 <= ofs) {
                                name = name.substring(0, ofs).trim();
                                if (this._varUniform && this._varUniform[name]) {
                                    name = this.__currNode.name.substring(ofs + 1).trim();
                                }
                            }
                            if ('' != name) {
                                if (null == this._variable)
                                    this._variable = new Set();
                                this._variable.add(name);
                            }
                        }
                    }
                }
            }
            this.__currNode = value;
        }
        static get isCheckType() {
            return this._isCheckType;
        }
        static set isCheckType(value) {
            if (value != this._isCheckType) {
                if (null == this._parameterNode && value) {
                    if (this._parentNode.assign) {
                        this._parentNode = this._parentNode.parent;
                    }
                    if ('return' == this._parentNode.type) {
                        this._parentNode = this._parentNode.parent;
                    }
                }
                this._isCheckType = value;
            }
        }
        static get currNode() {
            if (null == this._currNode) {
                if (null == this._parentNode) {
                    console.log("异常啦！！！");
                }
                this._currNode = new WebGPUShaderToken(this._parentNode.includefiles);
                if (this._parameterNode) {
                    this._currNode.owner = this._parameterNode.owner;
                    this._parameterNode.addBody(this._currNode);
                }
                else {
                    this._parentNode.addBody(this._currNode);
                }
            }
            return this._currNode;
        }
        static updateCurrNode() {
            if (this._parameterNode) {
                if (this._parameterNode.childs) {
                    this._currNode = this._parameterNode.childs[this._parameterNode.childs.length - 1];
                }
                else
                    this._currNode = null;
            }
            else {
                if (this._parentNode.childs) {
                    this._currNode = this._parentNode.childs[this._parentNode.childs.length - 1];
                }
                else {
                    console.log("这里应该有点问题！");
                    this._currNode = null;
                }
            }
        }
        static newParameterNode(parameterType = 0) {
            let sn = new WebGPUShaderToken(this._parentNode.includefiles);
            if (null == this._currNameNode) {
                if (1 == parameterType) {
                    let childs = this._parentNode.childs;
                    let pNode = childs[childs.length - 1];
                    if (pNode.parameterArr) {
                        this._currNameNode = pNode;
                    }
                }
                if (null == this._currNameNode) {
                    this._currNameNode = this.nextCurrNode(true);
                    this._currNameNode.name = '';
                }
            }
            if (1 == parameterType) {
                this._currNameNode.addParameterArr(sn, this._parameterNode);
            }
            else {
                this._currNameNode.setParameter(sn, this._parameterNode);
            }
            this._currNameNode = null;
            this._parameterNode = sn;
            this.updateCurrNode();
        }
        static isEmptyNode(node, isCheckParent = false) {
            for (let name in node) {
                if ('includefiles' == name || 'owner' == name || 'z' == name) {
                    continue;
                }
                if (isCheckParent && 'parent' == name) {
                    continue;
                }
                return false;
            }
            return true;
        }
        static nextCurrNode(isForceCreate = false) {
            if (isForceCreate) {
                this._currNode = null;
                return this.currNode;
            }
            else {
                if (null != this._currNode) {
                    if (this.isEmptyNode(this._currNode)) {
                        return null;
                    }
                    this._currNode = null;
                }
                return null;
            }
        }
        static _compileToTree(root, script) {
            let lines = script.split(";");
            this._parentNode = root;
            for (let i = 0, len = lines.length; i < len; i++) {
                let text = lines[i].trim();
                if (text.length < 1)
                    continue;
                this._parseNode(text);
                this._checkStructDef();
                if (null != this._currParame) {
                    this._parseParameter();
                }
                this._body3Fin();
            }
        }
        static _checkStructDef() {
            let childs = this._parentNode.childs;
            if (childs) {
                let len = childs.length;
                if (2 <= len) {
                    let index = len - 1;
                    let o1 = childs[index];
                    let o2 = childs[len - 2];
                    if (('struct' == o2.type || (o2.describe == exports.enumDescribe.uniform && o2.childs)) && null == o1.name && null != o1.type) {
                        let arr = o1.type.split(',');
                        o2.varNames = arr;
                        childs.splice(index, 1);
                        if (o2.describe == exports.enumDescribe.uniform) {
                            if (null == this._varUniform)
                                this._varUniform = {};
                            for (let i = arr.length - 1; i >= 0; i--) {
                                this._varUniform[arr[i]] = o2.name;
                            }
                        }
                    }
                }
            }
        }
        static _checkTypeByString(text) {
            let sn = this.nextCurrNode(true);
            this.isCheckType = true;
            let arr = text.split(" ");
            for (let i = 0, len = arr.length; i < len; i++) {
                if (this.isCheckType) {
                    this._checkType(arr[i]);
                }
                else {
                    sn.name = arr[i];
                }
            }
            this.isCheckType = false;
        }
        static get _isFor() {
            if (this._parameterNode) {
                let node = this._parameterNode.owner;
                if ("for" == node.name) {
                    return true;
                }
            }
            return false;
        }
        static _parseParameter() {
            if (null != this._currParame) {
                let node = this._parameterNode.owner;
                if (this._isFor) {
                    let _parentNode = this._parentNode;
                    let _parameterNode = this._parameterNode;
                    if (null == _parameterNode.childs || 0 == _parameterNode.childs.length) {
                        this.isCheckType = true;
                    }
                    let sn = this.nextCurrNode(true);
                    this._parameterNode = null;
                    this._parentNode = sn;
                    this._currNode = null;
                    let arr = this._currParame.split(" ");
                    for (let i = 0, len = arr.length; i < len; i++) {
                        this._checkBody(arr[i]);
                    }
                    this._parameterNode = _parameterNode;
                    this._parentNode = _parentNode;
                }
                else {
                    let isFun = false;
                    if (null != node.type && 'return' != node.type && 'else' != node.type)
                        isFun = true;
                    let arr = this._currParame.split(',');
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let str = arr[i];
                        if (isFun) {
                            this._checkTypeByString(str);
                        }
                        else {
                            this._checkBody2(str, false);
                        }
                        if (i < len - 1) {
                            let sn = this.nextCurrNode(true);
                            sn.type = ',';
                            this._currNode = null;
                        }
                    }
                }
            }
            this._currParame = null;
        }
        static _addParam(text) {
            if (null == this._currParame) {
                this._currParame = text;
            }
            else {
                this._currParame += ' ' + text;
            }
        }
        static _checkParameter(text) {
            text = text.trim();
            if ('' == text) {
                if (this._isFor)
                    this._addParam(text);
                return;
            }
            if (this.isCheckType) {
                this._checkType(text);
                return;
            }
            let ofs = text.indexOf("(");
            if (0 <= ofs) {
                this._checkParameter(text.substring(0, ofs));
                this._parseParameter();
                this.newParameterNode();
                text = text.substring(ofs + 1);
                this._checkParameter(text);
            }
            else {
                let ofs = text.indexOf("[");
                if (0 <= ofs) {
                    this._checkParameter(text.substring(0, ofs));
                    this._parseParameter();
                    this.newParameterNode(1);
                    text = text.substring(ofs + 1);
                    this._checkParameter(text);
                }
                else {
                    ofs = text.indexOf(")");
                    if (0 > ofs) {
                        ofs = text.indexOf("]");
                    }
                    if (0 <= ofs) {
                        this._checkParameter(text.substring(0, ofs));
                        this._parseParameter();
                        let owner = this._parameterNode.owner;
                        if (owner) {
                            let obj = null;
                            if (owner.describe == exports.enumDescribe.uniform) {
                                obj = this._uniform;
                            }
                            else if (owner.describe == exports.enumDescribe.attribute) {
                                obj = this._attribute;
                            }
                            else if (owner.describe == exports.enumDescribe.varying) {
                                obj = this._varying;
                            }
                            if (null != obj) {
                                try {
                                    let str = this._parameterNode.childs[0].type;
                                    if (this._define.has(str))
                                        str = this._define.get(str);
                                    const num = Number(str);
                                    if (!isNaN(num) && obj[owner.name]) {
                                        if (null == obj[owner.name].length)
                                            obj[owner.name].length = [];
                                        obj[owner.name].length.push(num);
                                    }
                                }
                                catch (err) { }
                            }
                        }
                        this._parameterNode = this._parameterNode.parent;
                        this.updateCurrNode();
                        text = text.substring(ofs + 1);
                        this._currNameNode = null;
                        if (this.currNode && null != this.currNode.parameter && null == this._parameterNode && 0 <= checkBodyName.indexOf(this.currNode.name)) {
                            this._isCheckBody3 = true;
                        }
                        this._checkBody(text);
                    }
                    else {
                        this._addParam(text);
                    }
                }
            }
        }
        static _body3Fin() {
            let arr = this._currTmpBody;
            this._currTmpBody = null;
            this._isCheckBody3 = false;
            if (arr) {
                if (this._currNode && 0 <= checkBodyName.indexOf(this._currNode.name)) {
                    this._parentNode = this._currNode;
                    this._currNode = null;
                }
                else if (this._parentNode && 0 <= checkBodyName.indexOf(this._parentNode.name)) {
                    this._currNode = null;
                }
                else {
                    console.log("理论上不应该进入这里，待查！");
                    this._currNode = null;
                    this._parentNode = this.currNode;
                    this._currNode = null;
                }
                this.isCheckType = true;
                for (let i = 0, len = arr.length; i < len; i++) {
                    this._checkBody(arr[i]);
                }
                this._parentNode = this._parentNode.parent;
                this.nextCurrNode();
                this.isCheckType = true;
            }
        }
        static _checkBody3(text) {
            if (this._isCheckBody3) {
                if (0 > text.indexOf("{")) {
                    if (null == this._currTmpBody) {
                        this._currTmpBody = [];
                    }
                    this._currTmpBody.push(text);
                    return true;
                }
                else if (null != this._currTmpBody) {
                    console.log("理论上不应该会走到这里，如果到这里，待检查！", this._currTmpBody);
                    this._isCheckBody3 = false;
                    let arr = this._currTmpBody;
                    this._currTmpBody = null;
                    for (let i = 0, len = arr.length; i < len; i++) {
                        this._checkBody(arr[i]);
                    }
                }
                else {
                    this._isCheckBody3 = false;
                }
            }
            return false;
        }
        static _checkBody(text) {
            text = text.trim();
            if ('' == text)
                return;
            if (this._checkBody3(text)) {
                return;
            }
            if (this.isCheckType) {
                this._checkType(text);
                return;
            }
            if (null != this._parameterNode) {
                this._checkParameter(text);
                return;
            }
            if (this._checkOperator(text))
                return;
            let ofs = text.indexOf("=");
            if (0 > ofs) {
                ofs = text.indexOf("(");
                if (0 > ofs) {
                    ofs = text.indexOf("[");
                    if (0 > ofs) {
                        ofs = text.indexOf("{");
                        if (0 <= ofs) {
                            let cstr = text.substring(0, ofs);
                            if ('' != cstr) {
                                this._setNodeName(cstr);
                            }
                            else if (null != this._currNode.type && null == this._currNode.name) {
                                this._currNode.name = this._currNode.type;
                                delete this._currNode.type;
                            }
                            this._parentNode = this.currNode;
                            text = text.substring(ofs + 1);
                            this.isCheckType = true;
                            this._currNode = null;
                            this._checkBody(text);
                        }
                        else {
                            ofs = text.indexOf("}");
                            if (0 <= ofs) {
                                this._childFin(ofs, text);
                            }
                            else {
                                ofs = text.indexOf(",");
                                if (0 <= ofs) {
                                    this._checkBody(text.substring(0, ofs));
                                    this.isCheckType = true;
                                    this.updateCurrNode();
                                    let typeNode = this._currNode;
                                    if (null == typeNode.type) {
                                        console.log("理论上不应该出现这个情况！", text);
                                    }
                                    else {
                                        let sn = this.nextCurrNode(true);
                                        sn.type = typeNode.type;
                                        if (null != typeNode.describe) {
                                            sn.describe = typeNode.describe;
                                        }
                                    }
                                    this.isCheckType = false;
                                    this._checkBody(text.substring(ofs + 1));
                                }
                                else {
                                    if (!this._splitTextCheck(text, "?")) {
                                        if (!this._splitTextCheck(text, ":")) {
                                            this._checkBody2(text);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        let cstr = text.substring(0, ofs);
                        this._setNodeName(cstr);
                        this.newParameterNode(1);
                        this._checkParameter(text.substring(ofs + 1));
                    }
                }
                else {
                    let cstr = text.substring(0, ofs).trim();
                    if (null == this._currNode || null == this._currNode.name || '' != cstr) {
                        this._setNodeName(cstr);
                    }
                    else if (null != this._currNode && this._currNode.assign) {
                        this._setNodeName(cstr);
                    }
                    this.newParameterNode();
                    this._checkParameter(text.substring(ofs + 1));
                    return;
                }
            }
            else {
                this._checkEqual(text, ofs);
            }
        }
        static _splitTextCheck(text, cstr, fun) {
            if (null == fun)
                fun = this._checkBody;
            let ofs = text.indexOf(cstr);
            if (0 <= ofs) {
                fun.call(this, text.substring(0, ofs));
                let sn = this.nextCurrNode(true);
                sn.type = cstr;
                this._currNameNode = sn;
                this._currNode = null;
                fun.call(this, text.substring(ofs + cstr.length));
                return true;
            }
            return false;
        }
        static _childFin(ofs, text) {
            let cstr = text.substring(0, ofs);
            this._checkBody(cstr);
            if ("struct" == this._parentNode.type) {
                if (!this._struct)
                    this._struct = {};
                this._struct[this._parentNode.name] = this._parentNode;
            }
            let childs = this._parentNode.childs;
            if (childs) {
                for (let i = childs.length - 1; i >= 0; i--) {
                    let o = childs[i];
                    if (this.isEmptyNode(o, true)) {
                        childs.splice(i, 1);
                    }
                }
            }
            this._parentNode = this._parentNode.parent;
            this.nextCurrNode();
            text = text.substring(ofs + 1);
            this.isCheckType = true;
            if ('' != text) {
                this.nextCurrNode();
                this._checkBody(text);
            }
        }
        static _checkType(text) {
            if ('' == text)
                return;
            let node = this.currNode;
            let inout = exports.enumInOut[text];
            if (undefined != inout && isNaN(Number(text))) {
                node.inOrOut = inout;
            }
            else {
                let describe = exports.enumDescribe[text];
                if (undefined != describe && isNaN(Number(text))) {
                    node.describe = describe;
                }
                else {
                    let ofs = text.indexOf("}");
                    if (0 <= ofs) {
                        this._childFin(ofs, text);
                        return;
                    }
                    ofs = text.indexOf("(");
                    if (0 > ofs) {
                        ofs = text.indexOf("[");
                    }
                    if (0 <= ofs) {
                        this.isCheckType = false;
                        this._checkBody(text);
                    }
                    else {
                        ofs = text.indexOf("=");
                        if (0 <= ofs) {
                            this._checkEqual(text, ofs);
                        }
                        else {
                            ofs = text.indexOf("{");
                            if (0 <= ofs) {
                                this.isCheckType = false;
                                this._checkBody(text);
                            }
                            else {
                                node.type = text;
                                if ('return' == text) {
                                    this._parentNode = node;
                                    this.nextCurrNode();
                                }
                                this.isCheckType = false;
                            }
                        }
                    }
                }
            }
        }
        static _checkEqual(text, ofs) {
            this.isCheckType = false;
            if (0 == ofs) {
                let cstr = text.substring(0, 2);
                if (this._checkOperator(cstr)) {
                    this._checkBody(text.substring(2));
                    return;
                }
            }
            let cstr = text.substring(0, ofs);
            let len = cstr.length;
            if (0 < len) {
                let cstr2 = cstr.substring(len - 2);
                let operator = exports.enumOperator[cstr2];
                if (null != operator && isNaN(Number(cstr2))) {
                    cstr2 = cstr.substring(0, cstr.length - 2).trim();
                    if ('' != cstr2) {
                        this._setNodeName(cstr2);
                    }
                    this._checkOperator("=");
                    this.currNode.assignLeft = operator;
                    this._checkBody(text.substring(ofs + 1));
                    return;
                }
                cstr2 = cstr.substring(len - 1);
                let cstr3 = cstr2 + "=";
                operator = exports.enumOperator[cstr3];
                if (null != operator && isNaN(Number(cstr3))) {
                    this._checkBody(cstr.substring(0, cstr.length - 1).trim());
                    this._checkBody(cstr3);
                    this._checkBody(text.substring(ofs + 1));
                    return;
                }
                operator = exports.enumOperator[cstr2];
                if (null != operator && isNaN(Number(cstr2))) {
                    cstr2 = cstr.substring(0, cstr.length - 1).trim();
                    if ('' != cstr2) {
                        this._setNodeName(cstr2);
                    }
                    this._checkOperator("=");
                    this.currNode.assignLeft = operator;
                    this._checkBody(text.substring(ofs + 1));
                    return;
                }
            }
            this._setNodeName(cstr);
            cstr = text.substring(ofs, ofs + 2);
            if (this._checkOperator(cstr)) {
                ofs += 1;
            }
            else {
                this._checkOperator("=");
            }
            this._checkBody(text.substring(ofs + 1));
        }
        static _setNodeName(value) {
            value = value.trim();
            let node = this.currNode;
            if (null != node.name) {
                this._checkBody2(value, false);
                return;
            }
            if ('' == value && null != node.type) {
                this._checkBody2(node.type, false);
                delete node.type;
            }
            else {
                this._checkBody2(value);
            }
        }
        static _checkBody2(text, isCheckEmpty = true) {
            text = text.trim();
            if ('' == text && isCheckEmpty)
                return;
            let ofs;
            let pstr;
            if ('' != text) {
                for (let k in exports.enumOperator) {
                    if (isNaN(Number(k))) {
                        let num = text.indexOf(k);
                        if (0 <= num) {
                            if (null == ofs || ofs > num) {
                                ofs = num;
                                pstr = k;
                            }
                        }
                    }
                }
            }
            if (null != ofs) {
                this._checkBody2(text.substring(0, ofs));
                this._checkOperator(text.substring(ofs, ofs + pstr.length));
                this._checkBody2(text.substring(ofs + pstr.length));
            }
            else {
                if (!this._splitTextCheck(text, "?", this._checkBody2)) {
                    if (!this._splitTextCheck(text, ":", this._checkBody2)) {
                        let sn = this.currNode;
                        if (null != sn.name) {
                            sn = this.nextCurrNode(true);
                        }
                        sn.name = text;
                        this._currNameNode = sn;
                        if (this._parentNode) {
                            let obj = null;
                            if (this._parentNode.describe == exports.enumDescribe.uniform) {
                                if (null == this._uniform)
                                    this._uniform = {};
                                obj = this._uniform;
                            }
                            else if (this._parentNode.describe == exports.enumDescribe.varying) {
                                if (null == this._varying)
                                    this._varying = {};
                                obj = this._varying;
                            }
                            else if (this._parentNode.describe == exports.enumDescribe.attribute) {
                                if (null == this._attribute)
                                    this._attribute = {};
                                obj = this._attribute;
                            }
                            if (null != obj) {
                                obj[sn.name] = {
                                    type: sn.type,
                                    struct: this._parentNode,
                                    blockName: this._parentNode.name
                                };
                            }
                        }
                        if (sn.describe == exports.enumDescribe.uniform) {
                            if (null == this._uniform)
                                this._uniform = {};
                            this._uniform[sn.name] = { type: sn.type };
                        }
                        else if (sn.describe == exports.enumDescribe.attribute) {
                            if (null == this._attribute)
                                this._attribute = {};
                            this._attribute[sn.name] = { type: sn.type };
                        }
                        else if (sn.describe == exports.enumDescribe.varying) {
                            if (null == this._varying)
                                this._varying = {};
                            this._varying[sn.name] = { type: sn.type };
                        }
                    }
                }
            }
        }
        static _checkOperator(text) {
            let operator = exports.enumOperator[text];
            if (undefined != operator && isNaN(Number(text))) {
                let sn = this.currNode;
                if ('=' == text) {
                    sn.assign = true;
                    if (null == sn.name && null != sn.type) {
                        this._checkBody2(sn.type, false);
                        delete sn.type;
                    }
                    this._parentNode = sn;
                }
                else {
                    if (null != sn.name || null != sn.operator) {
                        sn = this.nextCurrNode(true);
                    }
                    sn.operator = operator;
                    this._currNameNode = sn;
                    if (null != sn.name) {
                        sn.operatorRight = true;
                    }
                }
                return true;
            }
            return false;
        }
        static _parseNode(text) {
            if ('' == text)
                return;
            let ofs = text.indexOf("#");
            if (0 > ofs) {
                text = text.split("\n").join(" ").split("\t").join(" ");
                if (0 == text.indexOf('precision')) {
                    let sn = new WebGPUShaderToken(this._parentNode.includefiles);
                    sn.name = text;
                    this._parentNode.addBody(sn);
                    return;
                }
                let arr = text.split(" ");
                if (!this._isFor)
                    this.isCheckType = true;
                this.nextCurrNode();
                for (let i = 0, len = arr.length; i < len; i++) {
                    text = arr[i];
                    if ('' == text)
                        continue;
                    this._checkBody(text);
                }
            }
            else {
                this._parseNode(text.substring(0, ofs));
                let def = text.substring(ofs);
                ofs = def.indexOf("\n");
                text = null;
                if (0 < ofs) {
                    text = def.substring(ofs + 1);
                    def = def.substring(0, ofs);
                }
                let sn = new WebGPUShaderToken(this._parentNode.includefiles);
                sn.name = def;
                this._parentNode.addBody(sn);
                if (null != text) {
                    this._parseNode(text);
                }
            }
        }
        static removeAnnotation(text) {
            while (true) {
                let i = text.indexOf("//");
                if (0 > i) {
                    break;
                }
                else {
                    let num = text.indexOf('\n', i);
                    if (0 < num) {
                        text = text.substring(0, i) + text.substring(num);
                    }
                    else {
                        text = text.substring(0, i);
                    }
                }
            }
            while (true) {
                let i = text.indexOf("/*");
                if (0 > i) {
                    break;
                }
                else {
                    let num = text.indexOf("*/", i);
                    if (0 < num) {
                        text = text.substring(0, i) + text.substring(num + 2);
                    }
                    else {
                        text = text.substring(0, i);
                    }
                }
            }
            return text;
        }
    }
    WebGPUShaderCompileCode._isCheckType = false;
    WebGPUShaderCompileCode._define = new Map();

    class WebGPUShaderCompileDef {
        static compile(code, defs) {
            code = code.replace(_clearCR, "");
            this._defs = defs;
            let st = new WebGPUShaderToken();
            this._compileToTree(st, code);
            this._parentNode = null;
            this._defs = null;
            this._currNode = null;
            return st;
        }
        static isEmptyNode(node) {
            for (let name in node) {
                if ('includefiles' == name || 'owner' == name || 'z' == name) {
                    continue;
                }
                return false;
            }
            return true;
        }
        static nextCurrNode(isForceCreate = false) {
            if (isForceCreate) {
                this._currNode = null;
                return this.currNode;
            }
            else {
                if (null != this._currNode) {
                    if (this.isEmptyNode(this._currNode)) {
                        return null;
                    }
                    this._currNode = null;
                }
                return null;
            }
        }
        static get currNode() {
            if (null == this._currNode) {
                this._currNode = new WebGPUShaderToken(this._parentNode.includefiles);
                this._parentNode.addBody(this._currNode);
            }
            return this._currNode;
        }
        static _compileToTree(parent, code) {
            this._parentNode = parent;
            let lines = code.split("\n");
            for (let i = 0, len = lines.length; i < len; i++) {
                let text = lines[i];
                if (text.length < 1)
                    continue;
                let ofs = text.indexOf("//");
                if (0 < ofs) {
                    this._parseNode(text.substring(0, ofs));
                    this._parseNode(text.substring(ofs));
                }
                else {
                    this._parseNode(text);
                }
            }
        }
        static _parseNode(text) {
            text = text.split("\t").join(" ").trim();
            if (text.indexOf("#") != 0) {
                if (null == this.currNode.code) {
                    this.currNode.code = text;
                }
                else {
                    this.currNode.code += '\n' + text;
                }
            }
            else {
                let arr = text.split(" ");
                let name = arr.shift();
                if ("#endif" == name) {
                    this._parentNode = this._parentNode.parent;
                    this._currNode = null;
                    return;
                }
                let node;
                switch (name) {
                    case '#ifdef':
                    case "#ifndef":
                    case "#if":
                        node = this.nextCurrNode(true);
                        node.code = text;
                        node.name = name;
                        node.defParam = arr;
                        this._parentNode = node;
                        this._currNode = null;
                        WebGPUShaderCompileUtil.checkDef(node, this._defs);
                        break;
                    case "#elif":
                    case "#else":
                        this._parentNode = this._parentNode.parent;
                        node = this.nextCurrNode(true);
                        node.code = text;
                        node.name = name;
                        node.defParam = arr;
                        this._parentNode = node;
                        this._currNode = null;
                        if ('#elif' == name)
                            WebGPUShaderCompileUtil.checkDef(node, this._defs);
                        break;
                    case "#include":
                        break;
                    default:
                        node = this.nextCurrNode(true);
                        node.code = text;
                        node.name = name;
                        node.defParam = arr;
                        this._currNode = null;
                        break;
                }
            }
        }
    }

    exports.ForwardAddClusterRP = ForwardAddClusterRP;
    exports.RenderCullUtil = RenderCullUtil;
    exports.RenderListQueue = RenderListQueue;
    exports.RenderPassUtil = RenderPassUtil;
    exports.RenderQuickSort = RenderQuickSort;
    exports.Web3DRenderModuleFactory = Web3DRenderModuleFactory;
    exports.WebBaseRenderNode = WebBaseRenderNode;
    exports.WebCameraNodeData = WebCameraNodeData;
    exports.WebDirectLight = WebDirectLight;
    exports.WebGPU3DRenderPass = WebGPU3DRenderPass;
    exports.WebGPU3DRenderPassFactory = WebGPU3DRenderPassFactory;
    exports.WebGPUBaseRenderNode = WebGPUBaseRenderNode;
    exports.WebGPUBlitQuadCMDData = WebGPUBlitQuadCMDData;
    exports.WebGPUDirectLightShadowRP = WebGPUDirectLightShadowRP;
    exports.WebGPUDrawElementCMDData = WebGPUDrawElementCMDData;
    exports.WebGPUDrawNodeCMDData = WebGPUDrawNodeCMDData;
    exports.WebGPUForwardAddClusterRP = WebGPUForwardAddClusterRP;
    exports.WebGPUForwardAddRP = WebGPUForwardAddRP;
    exports.WebGPUInstanceRenderBatch = WebGPUInstanceRenderBatch;
    exports.WebGPUInstanceRenderElement3D = WebGPUInstanceRenderElement3D;
    exports.WebGPURenderContext3D = WebGPURenderContext3D;
    exports.WebGPURenderElement3D = WebGPURenderElement3D;
    exports.WebGPUSetRenderTargetCMD = WebGPUSetRenderTargetCMD;
    exports.WebGPUSetViewportCMD = WebGPUSetViewportCMD;
    exports.WebGPUShaderCompileCode = WebGPUShaderCompileCode;
    exports.WebGPUShaderCompileDef = WebGPUShaderCompileDef;
    exports.WebGPUShaderCompileUtil = WebGPUShaderCompileUtil;
    exports.WebGPUShaderDefine = WebGPUShaderDefine;
    exports.WebGPUShaderToken = WebGPUShaderToken;
    exports.WebGPUSkinRenderElement3D = WebGPUSkinRenderElement3D;
    exports.WebGPUSpotLightShadowRP = WebGPUSpotLightShadowRP;
    exports.WebLightmap = WebLightmap;
    exports.WebMeshRenderNode = WebMeshRenderNode;
    exports.WebPointLight = WebPointLight;
    exports.WebReflectionProbe = WebReflectionProbe;
    exports.WebSceneNodeData = WebSceneNodeData;
    exports.WebSceneRenderManager = WebSceneRenderManager;
    exports.WebSimpleSkinRenderNode = WebSimpleSkinRenderNode;
    exports.WebSkinRenderNode = WebSkinRenderNode;
    exports.WebSpotLight = WebSpotLight;
    exports.WebVolumetricGI = WebVolumetricGI;
    exports._clearCR = _clearCR;
    exports.boolCheck = boolCheck;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.webgpu_3D.js.map
