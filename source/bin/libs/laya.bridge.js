(function (exports, Laya) {
    'use strict';

    class RTBridge3DRenderProcess {
        get render3DManager() { return this._render3DManager; }
        set render3DManager(value) {
            this._render3DManager = value;
            this._nativeObj.renderManager = value._nativeObj;
        }
        constructor() {
            this._bridgeElements = [];
            this._nativeObj = new window.conchGLESBridge3DRenderProcess();
            this._dirShadowRP = new Laya.RTDirCascadeShadowRP();
            this._spotShadowRP = new Laya.RTBaseSpotRP();
            this._nativeObj.setDirectLightShadowPass(this._dirShadowRP._nativeObj);
            this._nativeObj.setSpotLightShadowPass(this._spotShadowRP._nativeObj);
            this._defaultShadowMap = Laya.ShadowUtils.getTemporaryShadowTexture(1, 1, Laya.ShadowMapFormat.bit16);
            this._nativeObj.setDefaultShadowMap(this._defaultShadowMap._renderTarget._nativeObj);
        }
        addBridgeElement(element) {
            this._bridgeElements.push(element);
        }
        removeBridgeElement(element) {
            const idx = this._bridgeElements.indexOf(element);
            if (idx !== -1)
                this._bridgeElements.splice(idx, 1);
        }
        fowardRender(context3d, camera) {
            const scene = camera._scene;
            if (!scene)
                return;
            scene.bridge3DContext.prepareForRender(camera, context3d);
            const nativeCtx3d = context3d._nativeObj;
            for (const element of this._bridgeElements) {
                element._nativeObj.setContext3D(nativeCtx3d);
            }
            if (!scene.enableLight)
                return;
            if (this._bridgeElements.length === 0)
                return;
            scene._setCullCamera(camera);
            this.render3DManager = scene.sceneRenderableManager._sceneManagerOBJ;
            this.renderShadows(context3d, camera);
            scene.recaculateCullCamera();
        }
        renderShadows(context, camera) {
            const scene = camera._scene;
            if (!scene) {
                return;
            }
            if (Laya.Config3D._multiLighting) {
                Laya.Cluster.instance.update(camera, scene);
            }
            const enableShadow = (Laya.Scene3D._updateMark % scene._ShadowMapupdateFrequency === 0);
            this._nativeObj.shadowCastPass = enableShadow;
            if (!enableShadow) {
                window.conchRT3DRenderProcess._removePreDrawUniformMap("Shadow", context._nativeObj);
                context.preDrawUniformMaps = context.preDrawUniformMaps;
                return;
            }
            const mainDirLight = scene._mainDirectionLight;
            const needDirectionShadow = mainDirLight && mainDirLight.shadowMode !== Laya.ShadowMode.None;
            this._nativeObj.enableDirectLightShadow = needDirectionShadow;
            if (needDirectionShadow) {
                this._dirShadowRP.setRPData(mainDirLight._dataModule, camera._renderDataModule, context);
                this._dirShadowRP.setCameraCullInfo(this._render3DManager);
            }
            const mainSpotLight = scene._mainSpotLight;
            const needSpotShadow = mainSpotLight && mainSpotLight.shadowMode !== Laya.ShadowMode.None;
            this._nativeObj.enableSpotLightShadowPass = needSpotShadow;
            if (needSpotShadow) {
                this._spotShadowRP.setRPData(mainSpotLight._dataModule, context);
                this._spotShadowRP.setCameraCullInfo(this._render3DManager);
            }
            if (needDirectionShadow || needSpotShadow) {
                window.conchRT3DRenderProcess._addPreDrawUniformMap("Shadow", context._nativeObj);
            }
            else {
                window.conchRT3DRenderProcess._removePreDrawUniformMap("Shadow", context._nativeObj);
            }
            context.preDrawUniformMaps = context.preDrawUniformMaps;
            this._nativeObj.renderShadows(context._nativeObj);
        }
        render(element, context2d, context3d) {
            this._nativeObj.render(element._nativeObj, context2d._nativeObj, context3d._nativeObj);
        }
        destroy() {
            if (this._dirShadowRP) {
                this._dirShadowRP.destroy();
                this._dirShadowRP = null;
            }
            if (this._spotShadowRP) {
                this._spotShadowRP.destroy();
                this._spotShadowRP = null;
            }
            if (this._defaultShadowMap) {
                this._defaultShadowMap.destroy();
                this._defaultShadowMap = null;
            }
            this._render3DManager = null;
            if (this._nativeObj) {
                this._nativeObj.destroy();
                this._nativeObj = null;
            }
        }
    }

    class Bridge3DContext {
        constructor() {
            this._clearDepthBeforeRender = true;
            this._pipelineMode = "Forward";
            this._invertY = false;
            this._clearDepth = 1.0;
            this._clearStencil = 0;
            this._sceneModuleData = null;
            this._cameraModuleData = null;
            this._sceneData = null;
            this._cameraData = null;
            this._globalShaderData = null;
            this._color = null;
            this._renderTarget2D = null;
            this._invertMat0_a = 1;
            this._invertMat0_c = 0;
            this._invertMat0_tx = 0;
            this._invertMat1_b = 0;
            this._invertMat1_d = 1;
            this._invertMat1_ty = 0;
            this._clipInfo = null;
            this._hasClip = false;
            this._invertY2D = false;
            this._bridge3DLightTexture = null;
            this._bridge3DLightPixels = null;
            this._viewport = new Laya.Viewport(0, 0, 0, 0);
            this._scissor = new Laya.Vector4(0, 0, 0, 0);
            this._color = new Laya.Color(1, 1, 1, 1);
        }
        setSceneModuleData(data) {
            this._sceneModuleData = data;
        }
        setCameraModuleData(data) {
            this._cameraModuleData = data;
        }
        setSceneData(data) {
            this._sceneData = data;
        }
        setCameraData(data) {
            this._cameraData = data;
        }
        setGlobalShaderData(data) {
            this._globalShaderData = data;
        }
        setRenderTarget2D(rt) {
            this._renderTarget2D = rt;
        }
        getRenderTarget2D() {
            return this._renderTarget2D;
        }
        setInvertMatrix(a, b, c, d, tx, ty) {
            this._invertMat0_a = a;
            this._invertMat0_c = c;
            this._invertMat0_tx = tx;
            this._invertMat1_b = b;
            this._invertMat1_d = d;
            this._invertMat1_ty = ty;
        }
        setClipInfo(clipInfo, hasClip) {
            this._clipInfo = clipInfo;
            this._hasClip = hasClip;
        }
        getClipInfo() {
            return this._clipInfo;
        }
        get hasClip() {
            return this._hasClip;
        }
        set invertY2D(value) {
            this._invertY2D = value;
        }
        get invertY2D() {
            return this._invertY2D;
        }
        get needsProjectionCorrection() {
            return this._renderTarget2D != null;
        }
        computeCorrectionMatrix(vpW, vpH, rtW, rtH, out) {
            const a = this._invertMat0_a;
            const b = this._invertMat1_b;
            const c = this._invertMat0_c;
            const d = this._invertMat1_d;
            const tx = this._invertMat0_tx;
            const ty = this._invertMat1_ty;
            const A = a * vpW / rtW;
            const B = -c * vpH / rtW;
            const C = (a * vpW + c * vpH + 2 * tx) / rtW - 1;
            const D = -b * vpW / rtH;
            const E = d * vpH / rtH;
            const F = 1 - (b * vpW + d * vpH + 2 * ty) / rtH;
            const e = out.elements;
            e[0] = A;
            e[1] = D;
            e[2] = 0;
            e[3] = 0;
            e[4] = B;
            e[5] = E;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = 1;
            e[11] = 0;
            e[12] = C;
            e[13] = F;
            e[14] = 0;
            e[15] = 1;
        }
        updateFromCamera(camera) {
            if (!camera)
                return;
            const viewport = camera.viewport;
            this._viewport.x = viewport.x;
            this._viewport.y = viewport.y;
            this._viewport.width = viewport.width;
            this._viewport.height = viewport.height;
            this._scissor.setValue(viewport.x, viewport.y, viewport.width, viewport.height);
        }
        applyToContext(context3d) {
            context3d.preDrawUniformMaps.add("Scene3D");
            context3d.preDrawUniformMaps.add("Global");
            context3d.sceneData = this._sceneData;
            context3d.cameraData = this._cameraData;
            context3d.sceneModuleData = this._sceneModuleData;
            context3d.cameraModuleData = this._cameraModuleData;
            context3d.globalShaderData = this._globalShaderData;
            context3d.setViewPort(this._viewport);
            context3d.setScissor(this._scissor);
            const clearFlag = this._clearDepthBeforeRender ? Laya.RenderClearFlag.Depth : Laya.RenderClearFlag.Nothing;
            context3d.setClearData(clearFlag, this._color, this._clearDepth, this._clearStencil);
            context3d.pipelineMode = this._pipelineMode;
            context3d.invertY = this._invertY;
        }
        get clearDepthBeforeRender() {
            return this._clearDepthBeforeRender;
        }
        set clearDepthBeforeRender(value) {
            this._clearDepthBeforeRender = value;
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
        get clearDepth() {
            return this._clearDepth;
        }
        set clearDepth(value) {
            this._clearDepth = value;
        }
        get clearStencil() {
            return this._clearStencil;
        }
        set clearStencil(value) {
            this._clearStencil = value;
        }
        get viewport() {
            return this._viewport;
        }
        get scissor() {
            return this._scissor;
        }
        get sceneModuleData() {
            return this._sceneModuleData;
        }
        get cameraModuleData() {
            return this._cameraModuleData;
        }
        get sceneData() {
            return this._sceneData;
        }
        get cameraData() {
            return this._cameraData;
        }
        get globalShaderData() {
            return this._globalShaderData;
        }
        setBridge3DLightData(lightTexture, lightPixels) {
            this._bridge3DLightTexture = lightTexture;
            this._bridge3DLightPixels = lightPixels;
        }
        get bridge3DLightTexture() {
            return this._bridge3DLightTexture;
        }
        get bridge3DLightPixels() {
            return this._bridge3DLightPixels;
        }
    }
    Bridge3DContext._correctionMatrix = new Laya.Matrix4x4();
    Bridge3DContext._tempCorrectedProj = new Laya.Matrix4x4();
    Bridge3DContext._tempCorrectedProjView = new Laya.Matrix4x4();

    class WebBridge3DRenderProcess {
        constructor() {
            this._bridgeElements = [];
            this._rt2d = null;
            this._cachedInvertY = false;
            this._rtW = 0;
            this._rtH = 0;
            this._vpW = 0;
            this._vpH = 0;
            this._hasInvertMatrix = false;
            this._invA = 1;
            this._invB = 0;
            this._invC = 0;
            this._invD = 1;
            this._invTx = 0;
            this._invTy = 0;
            this._projCorrected = false;
            this._hasShaderClip = false;
            this._hasGammaCorrect = false;
            this._defaultShadowMap = Laya.ShadowUtils.getTemporaryShadowTexture(1, 1, Laya.ShadowMapFormat.bit16);
            this._dirShadowRP = new Laya.WebDirCascadeShadowRP();
            this._spotShadowRP = new Laya.WebBaseSpotRP();
        }
        addBridgeElement(element) {
            this._bridgeElements.push(element);
        }
        removeBridgeElement(element) {
            const idx = this._bridgeElements.indexOf(element);
            if (idx !== -1)
                this._bridgeElements.splice(idx, 1);
        }
        fowardRender(context3d, camera) {
            const scene = camera._scene;
            if (!scene)
                return;
            const bridge3DContext = scene.bridge3DContext;
            bridge3DContext.updateFromCamera(camera);
            bridge3DContext.applyToContext(context3d);
            context3d.preDrawUniformMaps.add("Scene3D");
            context3d.preDrawUniformMaps.add("Global");
            if (!scene.enableLight)
                return;
            if (this._bridgeElements.length === 0)
                return;
            scene._setCullCamera(camera);
            this.render3DManager = scene.sceneRenderableManager._sceneManagerOBJ;
            this.renderShadows(context3d, camera);
            scene.recaculateCullCamera();
        }
        renderShadows(context, camera) {
            const scene = camera._scene;
            if (!scene) {
                return;
            }
            if (Laya.Config3D._multiLighting) {
                Laya.Cluster.instance.update(camera, scene);
            }
            const enableShadow = (Laya.Scene3D._updateMark % scene._ShadowMapupdateFrequency === 0);
            if (!enableShadow) {
                return;
            }
            context.preDrawUniformMaps.add("Shadow");
            context.sceneData.setTexture(Laya.ShadowCasterPass.SHADOW_SPOTMAP, this._defaultShadowMap);
            const mainDirLight = scene._mainDirectionLight;
            const needDirectionShadow = mainDirLight && mainDirLight.shadowMode !== Laya.ShadowMode.None;
            if (needDirectionShadow) {
                this._dirShadowRP.setRPData(mainDirLight._dataModule, camera._renderDataModule, context);
                this._dirShadowRP.setCameraCullInfo(this.render3DManager);
                this._dirShadowRP.update(context);
                this._dirShadowRP.render(context, this.render3DManager);
                this._dirShadowRP.useRPResource(context);
            }
            else {
                this._dirShadowRP.unuseRPResource(context);
            }
            const mainSpotLight = scene._mainSpotLight;
            const needSpotShadow = mainSpotLight && mainSpotLight.shadowMode !== Laya.ShadowMode.None;
            if (needSpotShadow) {
                this._spotShadowRP.setRPData(mainSpotLight._dataModule, context);
                this._spotShadowRP.setCameraCullInfo(this.render3DManager);
                this._spotShadowRP.update(context);
                this._spotShadowRP.render(context, this.render3DManager);
                this._spotShadowRP.useRPResource(context);
            }
            else {
                this._spotShadowRP.unuseRPResource(context);
            }
            if (!needDirectionShadow && !needSpotShadow) {
                context.preDrawUniformMaps.delete("Shadow");
            }
            context.setRenderTarget(null, Laya.RenderClearFlag.Nothing);
        }
        initBridge3DRenderPass(element, context2d, context3d) {
            const bridge3DElement = element;
            const bridge3DContext = bridge3DElement.bridge3DContext;
            this._rt2d = context2d.getRenderTarget();
            this._cachedInvertY = context2d.invertY;
            this._vpW = Laya.RenderState2D.width;
            this._vpH = Laya.RenderState2D.height;
            if (this._rt2d) {
                this._rtW = this._rt2d._textures[0].width;
                this._rtH = this._rt2d._textures[0].height;
            }
            else {
                this._rtW = this._vpW;
                this._rtH = this._vpH;
            }
            this._hasInvertMatrix = false;
            this._invA = 1;
            this._invB = 0;
            this._invC = 0;
            this._invD = 1;
            this._invTx = 0;
            this._invTy = 0;
            if (this._rt2d) {
                const passData = context2d.passData;
                if (passData) {
                    const mat0 = passData.getVector3(Laya.ShaderDefines2D.UNIFORM_INVERTMAT_0);
                    const mat1 = passData.getVector3(Laya.ShaderDefines2D.UNIFORM_INVERTMAT_1);
                    if (mat0 && mat1) {
                        this._invA = mat0.x;
                        this._invC = mat0.y;
                        this._invTx = mat0.z;
                        this._invB = mat1.x;
                        this._invD = mat1.y;
                        this._invTy = mat1.z;
                        this._hasInvertMatrix = true;
                    }
                }
            }
            bridge3DContext.applyToContext(context3d);
            const clearFlag = bridge3DContext.clearDepthBeforeRender
                ? Laya.RenderClearFlag.Depth | Laya.RenderClearFlag.Stencil
                : Laya.RenderClearFlag.Nothing;
            context3d.setRenderTarget(this._rt2d, clearFlag);
            context3d.pipelineMode = context2d.pipelineMode;
            this._hasGammaCorrect = false;
            const cameraData = bridge3DContext.cameraData;
            if (!this._rt2d || this._rt2d._textures[0].gammaCorrection !== 1) {
                cameraData.addDefine(Laya.RenderContext3D.GammaCorrect);
                this._hasGammaCorrect = true;
            }
            else {
                cameraData.removeDefine(Laya.RenderContext3D.GammaCorrect);
            }
            if (this._rt2d) {
                const tempVP = WebBridge3DRenderProcess._tempViewport;
                tempVP.x = 0;
                tempVP.y = 0;
                tempVP.width = this._rtW;
                tempVP.height = this._rtH;
                context3d.setViewPort(tempVP);
                const tempSC = WebBridge3DRenderProcess._tempScissor;
                tempSC.setValue(0, 0, this._rtW, this._rtH);
                context3d.setScissor(tempSC);
            }
        }
        prepareProjectionCorrection(element, context2d, context3d) {
            const bridge3DElement = element;
            const bridge3DContext = bridge3DElement.bridge3DContext;
            this._projCorrected = false;
            if (this._hasInvertMatrix) {
                const cameraData = bridge3DContext.cameraData;
                const origProj = cameraData.getMatrix4x4(Laya.BaseCamera.PROJECTMATRIX);
                const origProjView = cameraData.getMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX);
                if (origProj && origProjView) {
                    origProj.cloneTo(WebBridge3DRenderProcess._savedProjMatrix);
                    origProjView.cloneTo(WebBridge3DRenderProcess._savedProjViewMatrix);
                    bridge3DContext.setInvertMatrix(this._invA, this._invB, this._invC, this._invD, this._invTx, this._invTy);
                    const corrMat = Bridge3DContext._correctionMatrix;
                    bridge3DContext.computeCorrectionMatrix(this._vpW, this._vpH, this._rtW, this._rtH, corrMat);
                    const correctedProj = Bridge3DContext._tempCorrectedProj;
                    Laya.Matrix4x4.multiply(corrMat, origProj, correctedProj);
                    const correctedProjView = Bridge3DContext._tempCorrectedProjView;
                    Laya.Matrix4x4.multiply(corrMat, origProjView, correctedProjView);
                    cameraData.setMatrix4x4(Laya.BaseCamera.PROJECTMATRIX, correctedProj);
                    cameraData.setMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX, correctedProjView);
                    this._projCorrected = true;
                }
            }
            this._hasShaderClip = false;
            const ownerStruct = bridge3DElement.owner;
            if (ownerStruct && typeof ownerStruct.getClipInfo === 'function') {
                if (ownerStruct.hasClip()) {
                    const info = ownerStruct.getClipInfo();
                    const clipReuse = bridge3DElement._clipCacheValid &&
                        bridge3DElement._cachedClipUpdateFrame === info._updateFrame &&
                        bridge3DElement._cachedRtH === this._rtH &&
                        bridge3DElement._cachedPassData === context2d.passData;
                    if (!clipReuse) {
                        const clipDir = info.clipMatDir;
                        const clipPos = info.clipMatPos;
                        bridge3DElement._cachedRtClipPos.x = this._invA * clipPos.x + this._invC * clipPos.y + this._invTx;
                        bridge3DElement._cachedRtClipPos.y = this._invB * clipPos.x + this._invD * clipPos.y + this._invTy;
                        bridge3DElement._cachedRtClipPos.z = this._rtH;
                        bridge3DElement._cachedRtClipPos.w = 0;
                        bridge3DElement._cachedRtClipDir.x = this._invA * clipDir.x + this._invC * clipDir.y;
                        bridge3DElement._cachedRtClipDir.y = this._invB * clipDir.x + this._invD * clipDir.y;
                        bridge3DElement._cachedRtClipDir.z = this._invA * clipDir.z + this._invC * clipDir.w;
                        bridge3DElement._cachedRtClipDir.w = this._invB * clipDir.z + this._invD * clipDir.w;
                        bridge3DElement._cachedClipUpdateFrame = info._updateFrame;
                        bridge3DElement._cachedRtH = this._rtH;
                        bridge3DElement._cachedPassData = context2d.passData;
                        bridge3DElement._clipCacheValid = true;
                    }
                    const cameraData = bridge3DContext.cameraData;
                    cameraData.addDefine(Bridge3DCamera.BRIDGE3D_CLIP);
                    cameraData.setVector(Bridge3DCamera.BRIDGE3D_CLIPDIR, bridge3DElement._cachedRtClipDir);
                    cameraData.setVector(Bridge3DCamera.BRIDGE3D_CLIPPOS, bridge3DElement._cachedRtClipPos);
                    this._hasShaderClip = true;
                }
                else {
                    bridge3DElement._clipCacheValid = false;
                }
            }
            else {
                bridge3DElement._clipCacheValid = false;
            }
        }
        renderBridge3DForward(element, context2d, context3d) {
            const bridge3DElement = element;
            const bridge3DContext = bridge3DElement.bridge3DContext;
            const opaqueList = bridge3DElement.getOpaqueList();
            const transparentList = bridge3DElement.getTransparentList();
            if (opaqueList.elements.length > 0) {
                opaqueList.renderQueueOnly(context3d);
            }
            if (transparentList.elements.length > 0) {
                transparentList.renderQueueOnly(context3d);
            }
            if (this._hasGammaCorrect) {
                bridge3DContext.cameraData.removeDefine(Laya.RenderContext3D.GammaCorrect);
            }
            if (this._hasShaderClip) {
                const cameraData = bridge3DContext.cameraData;
                cameraData.removeDefine(Bridge3DCamera.BRIDGE3D_CLIP);
            }
            if (this._projCorrected) {
                const cameraData = bridge3DContext.cameraData;
                cameraData.setMatrix4x4(Laya.BaseCamera.PROJECTMATRIX, WebBridge3DRenderProcess._savedProjMatrix);
                cameraData.setMatrix4x4(Laya.BaseCamera.VIEWPROJECTMATRIX, WebBridge3DRenderProcess._savedProjViewMatrix);
            }
            context2d.setRenderTarget(this._rt2d, false, Laya.Color.BLACK);
            context2d.invertY = this._cachedInvertY;
        }
        render(element, context2d, context3d) {
            this.initBridge3DRenderPass(element, context2d, context3d);
            const bridge3DElement = element;
            bridge3DElement.collectElements(context3d);
            if (bridge3DElement.getOpaqueList().elements.length === 0 && bridge3DElement.getTransparentList().elements.length === 0) {
                context2d.setRenderTarget(this._rt2d, false, Laya.Color.BLACK);
                context2d.invertY = this._cachedInvertY;
                return;
            }
            this.prepareProjectionCorrection(element, context2d, context3d);
            this.renderBridge3DForward(element, context2d, context3d);
        }
        destroy() {
            if (this._dirShadowRP) {
                this._dirShadowRP.destory();
                this._dirShadowRP = null;
            }
            if (this._spotShadowRP) {
                this._spotShadowRP.destory();
                this._spotShadowRP = null;
            }
            if (this._defaultShadowMap) {
                this._defaultShadowMap.destroy();
                this._defaultShadowMap = null;
            }
            this.render3DManager = null;
            this._rt2d = null;
        }
    }
    WebBridge3DRenderProcess._tempViewport = new Laya.Viewport(0, 0, 0, 0);
    WebBridge3DRenderProcess._tempScissor = new Laya.Vector4(0, 0, 0, 0);
    WebBridge3DRenderProcess._savedProjMatrix = new Laya.Matrix4x4();
    WebBridge3DRenderProcess._savedProjViewMatrix = new Laya.Matrix4x4();

    class Bridge3DCamera extends Laya.Camera {
        static __init__() {
            Bridge3DCamera.BRIDGE3D_CLIP = Laya.Shader3D.getDefineByName("BRIDGE3D_CLIP");
            Bridge3DCamera.BRIDGE3D_CLIPDIR = Laya.Shader3D.propertyNameToID("u_Bridge3DClipDir");
            Bridge3DCamera.BRIDGE3D_CLIPPOS = Laya.Shader3D.propertyNameToID("u_Bridge3DClipPos");
            let camerauniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(Laya.BaseCamera.cameraBlockName);
            camerauniformMap.addShaderUniform(Bridge3DCamera.BRIDGE3D_CLIPDIR, "u_Bridge3DClipDir", Laya.ShaderDataType.Vector4);
            camerauniformMap.addShaderUniform(Bridge3DCamera.BRIDGE3D_CLIPPOS, "u_Bridge3DClipPos", Laya.ShaderDataType.Vector4);
        }
        constructor() {
            super();
            if (Laya.LayaEnv.isConch && window.conchConfig.getGraphicsAPI() != 2) {
                this._bridge3DRenderProcess = new RTBridge3DRenderProcess();
            }
            else {
                this._bridge3DRenderProcess = new WebBridge3DRenderProcess();
            }
            this._setupBridge3DCameraDefaults();
        }
        _setupBridge3DCameraDefaults() {
            this.clearFlag = Laya.CameraClearFlags.DepthOnly;
            this.clearColor = new Laya.Color(1, 1, 1, 1);
            this.enableHDR = false;
            this.msaa = false;
            this.postProcess = null;
            this.enableRender = true;
            this.enableBuiltInRenderTexture = false;
        }
        get bridge3DRenderProcess() {
            return this._bridge3DRenderProcess;
        }
        render(scene) {
            if (!scene)
                return;
            const context = Laya.RenderContext3D._instance;
            context.scene = scene;
            context.camera = this;
            this._prepareCameraToRender();
            this._applyViewProject(this.viewMatrix, this.projectionMatrix, context.invertY);
            this._contextApply(context);
            this._bridge3DRenderProcess.fowardRender(context._contextOBJ, this);
        }
        clone() {
            const clonedCamera = super.clone();
            return clonedCamera;
        }
        destroy(destroyChild = true) {
            if (this._bridge3DRenderProcess) {
                this._bridge3DRenderProcess.destroy();
                this._bridge3DRenderProcess = null;
            }
            super.destroy(destroyChild);
        }
    }

    class Bridge3DData {
        constructor() {
            this._cameraZDistance = 100;
            this._cameraFarPlane = 1000;
            this._scene3dSettingsData = { skyRenderer: {} };
            this._cameraSettingsData = {};
        }
        get cameraZDistance() {
            return this._cameraZDistance;
        }
        set cameraZDistance(value) {
            this._cameraZDistance = value;
        }
        get cameraFarPlane() {
            return this._cameraFarPlane;
        }
        set cameraFarPlane(value) {
            this._cameraFarPlane = value;
        }
        get scene3dSettings() {
            return this._scene3dSettingsData;
        }
        get cameraSettings() {
            return this._cameraSettingsData;
        }
    }
    Laya.ClassUtils.regClass('Bridge3DData', Bridge3DData);

    class RTBridge3DContext {
        constructor() {
            this._nativeObj = new window.conchGLESBridge3DContext();
        }
        setSceneModuleData(data) {
            this._nativeObj.setSceneModuleData(data ? data._nativeObj : null);
        }
        setCameraModuleData(data) {
            this._nativeObj.setCameraModuleData(data ? data._nativeObj : null);
        }
        setSceneData(data) {
            this._nativeObj.setSceneData(data ? data._nativeObj : null);
        }
        setCameraData(data) {
            this._nativeObj.setCameraData(data ? data._nativeObj : null);
        }
        setGlobalShaderData(data) {
            this._nativeObj.setGlobalShaderData(data ? data._nativeObj : null);
        }
        setRenderTarget2D(rt) {
        }
        getRenderTarget2D() {
            return null;
        }
        setViewPort(vp) {
            this._nativeObj.setViewport(vp);
        }
        setScissor(sc) {
            this._nativeObj.setScissor(sc);
        }
        setClearData(flag, color, depthValue, stencilValue) {
            this._nativeObj.clearDepthBeforeRender = (flag & Laya.RenderClearFlag.Depth) !== 0;
            this._nativeObj.clearDepth = depthValue;
            this._nativeObj.clearStencil = stencilValue;
        }
        setInvertMatrix(a, b, c, d, tx, ty) {
        }
        applyToContext(context) {
            this._nativeObj.applyToContext(context._nativeObj);
        }
        computeCorrectionMatrix(vpW, vpH, rtW, rtH, out) {
        }
        get clearDepthBeforeRender() {
            return this._nativeObj.clearDepthBeforeRender;
        }
        set clearDepthBeforeRender(value) {
            this._nativeObj.clearDepthBeforeRender = value;
        }
        get clearDepth() {
            return this._nativeObj.clearDepth;
        }
        set clearDepth(value) {
            this._nativeObj.clearDepth = value;
        }
        get clearStencil() {
            return this._nativeObj.clearStencil;
        }
        set clearStencil(value) {
            this._nativeObj.clearStencil = value;
        }
        get pipelineMode() {
            return null;
        }
        set pipelineMode(value) {
        }
        get invertY() {
            return false;
        }
        set invertY(value) {
        }
        get sceneModuleData() {
            return null;
        }
        get cameraModuleData() {
            return null;
        }
        get sceneData() {
            return null;
        }
        get cameraData() {
            return null;
        }
        get globalShaderData() {
            return null;
        }
        setBridge3DLightData(lightTexture, lightPixels) {
        }
        get bridge3DLightTexture() {
            return null;
        }
        get bridge3DLightPixels() {
            return null;
        }
        updateFromCamera(camera) {
            if (!camera)
                return;
            const viewport = camera.viewport;
            const vp = new Laya.Viewport(viewport.x, viewport.y, viewport.width, viewport.height);
            this._nativeObj.setViewport(vp);
            const sc = new Laya.Vector4(viewport.x, viewport.y, viewport.width, viewport.height);
            this._nativeObj.setScissor(sc);
        }
        prepareForRender(camera, context3d) {
            this._nativeObj.prepareForRender(context3d._nativeObj, camera.viewport.x, camera.viewport.y, camera.viewport.width, camera.viewport.height, Laya.RenderState2D.width, Laya.RenderState2D.height);
        }
    }

    class Bridge3DScene3D extends Laya.Scene3D {
        _getLightTexture() {
            return this._bridge3DLightTexture;
        }
        get sharedCamera() {
            return this._sharedCamera;
        }
        get bridge3DContext() {
            return this._bridge3DContext;
        }
        constructor(holder) {
            super();
            this._renderToBridgeMap = new Map();
            this._cameraZDistance = 100;
            this._bridge3DLightTexture = null;
            this._holder = holder;
            if (Laya.Config3D._multiLighting) {
                const width = 4;
                const maxLightCount = Laya.Config3D.maxLightCount;
                this._bridge3DLightTexture = Laya.Utils3D._createFloatTextureBuffer(width, maxLightCount);
                this._bridge3DLightTexture.lock = true;
            }
            if (Laya.LayaEnv.isConch && window.conchConfig.getGraphicsAPI() != 2) {
                this._bridge3DContext = new RTBridge3DContext();
            }
            else {
                this._bridge3DContext = new Bridge3DContext();
            }
            this._bridge3DContext.setBridge3DLightData(this._bridge3DLightTexture, this._getLightPixels());
            this.ambientMode = Laya.AmbientMode.SolidColor;
            this._sharedCamera = new Bridge3DCamera();
            this._sharedCamera.orthographic = true;
            this.addChild(this._sharedCamera);
            this.updateContext();
            this.setupCamera();
            Laya.ILaya.stage.on(Laya.Event.RESIZE, this, this.onStageResize);
        }
        applyCameraZDistance(value) {
            if (this._cameraZDistance !== value) {
                this._cameraZDistance = value;
                this._updateCameraPosition();
            }
        }
        applyCameraFarPlane(value) {
            this._sharedCamera.farPlane = value;
        }
        updateContext() {
            this._bridge3DContext.setSceneData(this._shaderValues);
            this._bridge3DContext.setCameraData(this._sharedCamera._shaderValues);
            this._bridge3DContext.setSceneModuleData(this._sceneModuleData);
            this._bridge3DContext.setCameraModuleData(this._sharedCamera._renderDataModule);
            this._bridge3DContext.updateFromCamera(this._sharedCamera);
        }
        _addRenderObject(render) {
            super._addRenderObject(render);
            const bridge = this._findOwnerBridge3DSprite(render.owner);
            if (bridge) {
                bridge._addRenderObject(render);
                this._renderToBridgeMap.set(render, bridge);
            }
        }
        _findOwnerBridge3DSprite(node) {
            const list = this._holder.bridge3DList;
            while (node) {
                for (let i = 0, len = list.length; i < len; i++) {
                    const bridge = list[i];
                    if (node === bridge.containerSprite3D) {
                        return bridge;
                    }
                }
                node = node._parent;
            }
            return null;
        }
        _removeRenderObject(render) {
            super._removeRenderObject(render);
            const bridge = this._renderToBridgeMap.get(render);
            if (bridge) {
                bridge._removeRenderObject(render);
                this._renderToBridgeMap.delete(render);
            }
        }
        _updateCameraPosition() {
            const width = Laya.RenderState2D.width || Laya.ILaya.stage.width;
            const height = Laya.RenderState2D.height || Laya.ILaya.stage.height;
            const centerX = width / 2;
            const centerY = height / 2;
            let localPosition = this._sharedCamera.transform.localPosition;
            localPosition.x = centerX;
            localPosition.y = centerY;
            localPosition.z = this._cameraZDistance;
            this._sharedCamera.transform.localPosition = localPosition;
        }
        setupCamera() {
            const height = Laya.RenderState2D.height || Laya.ILaya.stage.height;
            this._sharedCamera.orthographic = true;
            this._sharedCamera.orthographicVerticalSize = height;
            this._sharedCamera.nearPlane = 0.1;
            this._updateCameraPosition();
            let rotationEuler = this._sharedCamera.transform.rotationEuler;
            rotationEuler.x = 0;
            rotationEuler.y = 0;
            rotationEuler.z = 0;
            this._sharedCamera.transform.rotationEuler = rotationEuler;
        }
        onStageResize() {
            Laya.RenderState2D.width || Laya.ILaya.stage.width;
            const height = Laya.RenderState2D.height || Laya.ILaya.stage.height;
            this._sharedCamera.orthographicVerticalSize = height;
            this._updateCameraPosition();
        }
        renderSubmit() {
            if (this._renderByEditor)
                return;
            Laya.Scene3D._updateMark++;
            this._prepareSceneToRender();
            this._sharedCamera.render(this);
        }
        _update() {
            var delta = this.timer.delta / 1000;
            this._time += delta;
            this._shaderValues.setNumber(Laya.Scene3D.TIME, this._time);
            this._componentDriver.callStart();
            this._componentDriver.callUpdate();
            this._componentDriver.callLateUpdate();
            this._componentDriver.callDestroy();
            if (this._volumeManager.needreCaculateAllRenderObjects())
                this._volumeManager.reCaculateAllRenderObjects(this._sceneRenderManager.list);
            else
                this._volumeManager.handleMotionlist();
            const bridge3DList = this._holder.bridge3DList;
            for (let i = 0, l = bridge3DList.length; i < l; i++) {
                bridge3DList[i]._renderUpdate();
            }
        }
        destroy(destroyChild = true) {
            Laya.ILaya.stage.off(Laya.Event.RESIZE, this, this.onStageResize);
            this._renderToBridgeMap.clear();
            if (this._bridge3DLightTexture) {
                this._bridge3DLightTexture.destroy();
                this._bridge3DLightTexture = null;
            }
            if (this._bridge3DContext) {
                this._bridge3DContext.setSceneData(null);
                this._bridge3DContext.setCameraData(null);
                this._bridge3DContext.setGlobalShaderData(null);
                this._bridge3DContext.setSceneModuleData(null);
                this._bridge3DContext.setCameraModuleData(null);
                this._bridge3DContext.setBridge3DLightData(null, null);
                this._bridge3DContext = null;
            }
            this._sharedCamera.destroy();
            this._sharedCamera = null;
            this._holder = null;
            super.destroy(destroyChild);
        }
    }

    class Bridge3DSceneInternal {
        constructor(scene) {
            this._scene3d = null;
            this._bridge3DList = [];
            this._isAddedToStage = false;
            this._scene2D = scene;
        }
        _onAdded() {
            if (!this._isAddedToStage && this._bridge3DList.length > 0) {
                Laya.ILaya.stage.addChild(this._scene3d);
                this._isAddedToStage = true;
            }
        }
        _onRemoved() {
            if (this._scene3d && this._isAddedToStage) {
                Laya.ILaya.stage.removeChild(this._scene3d);
                this._isAddedToStage = false;
            }
        }
        get scene3d() {
            return this._scene3d;
        }
        get sharedCamera() {
            return this._scene3d ? this._scene3d.sharedCamera : null;
        }
        get bridge3DList() {
            return this._bridge3DList;
        }
        initScene3D() {
            if (!this._scene3d) {
                this._scene3d = new Bridge3DScene3D(this);
                this._scene3d._scene2D = this._scene2D;
                const holder = this._scene2D.bridge3D;
                if (holder) {
                    this._applySettingsTo(this._scene3d, holder.scene3dSettings);
                    this._applySettingsTo(this._scene3d.sharedCamera, holder.cameraSettings);
                }
            }
            return this._scene3d;
        }
        _applySettingsTo(target, data) {
            if (!target || !data)
                return;
            for (const key in data) {
                const value = data[key];
                if (value == null)
                    continue;
                if (Bridge3DSceneInternal._readonlyKeys.has(key)) {
                    const existing = target[key];
                    if (existing != null && typeof value === 'object') {
                        this._applySettingsTo(existing, value);
                    }
                }
                else {
                    target[key] = value;
                }
            }
        }
        registerBridge3D(bridge) {
            if (this._bridge3DList.indexOf(bridge) !== -1) {
                return;
            }
            this._bridge3DList.push(bridge);
            const scene3d = this.initScene3D();
            if (bridge.containerSprite3D.parent !== scene3d) {
                bridge.containerSprite3D.removeSelf();
                scene3d.addChild(bridge.containerSprite3D);
                const element = bridge.bridge3DRenderElement;
                if (element) {
                    const process = scene3d.sharedCamera.bridge3DRenderProcess;
                    element.setBridge3DContext(scene3d.bridge3DContext);
                    element.setRenderProcess(process);
                    process.addBridgeElement(element);
                }
            }
            if (Laya.SerializeUtil.isDeserializing || !this._scene2D.displayedInStage)
                return;
            if (!this._isAddedToStage && this._bridge3DList.length > 0) {
                Laya.ILaya.stage.addChild(scene3d);
                this._isAddedToStage = true;
            }
        }
        unregisterBridge3D(bridge) {
            const index = this._bridge3DList.indexOf(bridge);
            if (index !== -1) {
                this._bridge3DList.splice(index, 1);
                if (this._scene3d) {
                    const element = bridge.bridge3DRenderElement;
                    if (element) {
                        this._scene3d.sharedCamera.bridge3DRenderProcess.removeBridgeElement(element);
                    }
                    this._scene3d.removeChild(bridge.containerSprite3D);
                }
            }
            if (this._isAddedToStage && this._bridge3DList.length === 0 && this._scene3d) {
                Laya.ILaya.stage.removeChild(this._scene3d);
                this._isAddedToStage = false;
            }
        }
        applyData(data) {
            if (!this._scene3d)
                return;
            if (data) {
                this._scene3d.applyCameraZDistance(data.cameraZDistance);
                this._scene3d.applyCameraFarPlane(data.cameraFarPlane);
                const s3d = data.scene3dSettings;
                if (s3d && !s3d._applyCache) {
                    this._applySettingsTo(this._scene3d, s3d);
                }
                const cam = data.cameraSettings;
                if (cam && !cam._applyCache) {
                    this._applySettingsTo(this._scene3d.sharedCamera, cam);
                }
            }
            else {
                this._scene3d.applyCameraZDistance(100);
                this._scene3d.applyCameraFarPlane(1000);
            }
        }
        finalizeSetup() {
            if (!this._scene3d)
                return;
            const holder = this._scene2D.bridge3D;
            if (holder) {
                this._applySettingsTo(this._scene3d, holder.scene3dSettings);
                this._applySettingsTo(this._scene3d.sharedCamera, holder.cameraSettings);
            }
        }
        destroy() {
            if (this._scene3d) {
                if (this._isAddedToStage) {
                    Laya.ILaya.stage.removeChild(this._scene3d);
                    this._isAddedToStage = false;
                }
                this._scene3d.destroy(false);
                this._scene3d = null;
            }
            this._bridge3DList.length = 0;
            this._scene2D = null;
        }
    }
    Bridge3DSceneInternal._readonlyKeys = new Set(["skyRenderer"]);

    class Bridge3DRenderElement {
        constructor() {
            this.type = 0;
            this.geometry = null;
            this.materialShaderData = null;
            this.value2DShaderData = null;
            this.globalShaderData = null;
            this.subShader = null;
            this.renderStateIsBySprite = true;
            this.nodeCommonMap = [];
            this.owner = null;
            this._baseRenderList = new Laya.SingletonList();
            this._renderProcess = null;
            this._bridge3DContext = null;
            this._cachedPassData = null;
            this._cachedRtClipDir = new Laya.Vector4();
            this._cachedRtClipPos = new Laya.Vector4();
            this._cachedRtH = -1;
            this._cachedClipUpdateFrame = -1;
            this._clipCacheValid = false;
            this._opaqueList = new Laya.RenderListQueue(false);
            this._transparentList = new Laya.RenderListQueue(true);
        }
        addBaseRenderNode(node) {
            this._baseRenderList.add(node);
        }
        removeBaseRenderNode(node) {
            this._baseRenderList.remove(node);
        }
        setBridge3DContext(context) {
            this._bridge3DContext = context;
        }
        setRenderProcess(process) {
            this._renderProcess = process;
        }
        getBaseRenderList() {
            return this._baseRenderList;
        }
        getOpaqueList() {
            return this._opaqueList;
        }
        getTransparentList() {
            return this._transparentList;
        }
        get clearDepthBeforeRender() {
            var _a, _b;
            return (_b = (_a = this._bridge3DContext) === null || _a === void 0 ? void 0 : _a.clearDepthBeforeRender) !== null && _b !== void 0 ? _b : true;
        }
        set clearDepthBeforeRender(value) {
            if (this._bridge3DContext) {
                this._bridge3DContext.clearDepthBeforeRender = value;
            }
        }
        get bridge3DContext() {
            return this._bridge3DContext;
        }
        collectElements(context3d) {
            this._opaqueList.clear();
            this._transparentList.clear();
            for (let i = 0, l = this._baseRenderList.length; i < l; i++) {
                let renderNode = this._baseRenderList.elements[i];
                renderNode._renderUpdatePre(context3d);
                const elements = renderNode.renderelements;
                if (elements) {
                    for (let j = 0; j < elements.length; j++) {
                        const el = elements[j];
                        if (!el || !el.isRender)
                            continue;
                        if (el.materialRenderQueue > 2500) {
                            this._transparentList.addRenderElement(el);
                        }
                        else {
                            this._opaqueList.addRenderElement(el);
                        }
                    }
                }
            }
            this._opaqueList.sort();
            this._transparentList.sort();
            return -1;
        }
        _prepare(context) {
        }
        _render(context) {
            if (!this._renderProcess || !this._bridge3DContext || !this._bridge3DContext.sceneData || !this._bridge3DContext.cameraData) {
                return;
            }
            let context3d = Laya.RenderContext3D._instance._contextOBJ;
            this._renderProcess.render(this, context, context3d);
        }
        destroy() {
            var _a, _b;
            (_a = this._opaqueList) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this._transparentList) === null || _b === void 0 ? void 0 : _b.destroy();
            this._opaqueList = null;
            this._transparentList = null;
            this._bridge3DContext = null;
            this._renderProcess = null;
            this._cachedPassData = null;
            this._clipCacheValid = false;
            this.owner = null;
            this.geometry = null;
            this.materialShaderData = null;
            this.value2DShaderData = null;
            this.globalShaderData = null;
            this.subShader = null;
        }
    }

    class RTBridge3DRenderElement {
        constructor() {
            this.type = 0;
            this.geometry = null;
            this.materialShaderData = null;
            this.value2DShaderData = null;
            this.globalShaderData = null;
            this.subShader = null;
            this.renderStateIsBySprite = true;
            this.nodeCommonMap = [];
            this._renderProcess = null;
            this._owner = null;
            this._baseRenderList = new Laya.SingletonList();
            this._bridge3DContext = null;
            this._nativeObj = new window.conchGLESBridge3DRenderElement2D();
            this._opaqueList = new Laya.RenderListQueue(false);
            this._transparentList = new Laya.RenderListQueue(true);
        }
        get owner() {
            return this._owner;
        }
        set owner(value) {
            this._owner = value;
            this._nativeObj.setOwner(value ? value._nativeObj : null);
        }
        addBaseRenderNode(node) {
            this._baseRenderList.add(node);
            this._nativeObj.addBaseRenderNode(node._nativeObj);
        }
        removeBaseRenderNode(node) {
            this._baseRenderList.remove(node);
            this._nativeObj.removeBaseRenderNode(node._nativeObj);
        }
        setBridge3DContext(context) {
            if (context instanceof RTBridge3DContext) {
                if (this._bridge3DContext !== context) {
                    this._bridge3DContext = context;
                    this._nativeObj.setBridge3DContext(context._nativeObj);
                }
            }
        }
        setRenderProcess(process) {
            this._renderProcess = process;
            this._nativeObj.setRenderProcess(process ? process._nativeObj : null);
        }
        getBaseRenderList() {
            return this._baseRenderList;
        }
        getOpaqueList() {
            return this._opaqueList;
        }
        getTransparentList() {
            return this._transparentList;
        }
        get bridge3DContext() {
            return this._bridge3DContext;
        }
        collectElements(context3d) {
            return this._nativeObj.collectFromNodes(context3d._nativeObj);
        }
        _prepare(context) {
        }
        _render(context) {
        }
        destroy() {
            var _a, _b, _c;
            (_a = this._opaqueList) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this._transparentList) === null || _b === void 0 ? void 0 : _b.destroy();
            this._opaqueList = null;
            this._transparentList = null;
            this._bridge3DContext = null;
            this._renderProcess = null;
            (_c = this._nativeObj) === null || _c === void 0 ? void 0 : _c.destroy();
            this._nativeObj = null;
            this._owner = null;
            this.geometry = null;
            this.materialShaderData = null;
            this.value2DShaderData = null;
            this.globalShaderData = null;
            this.subShader = null;
        }
    }

    class Bridge3DCoordinate {
        static logicTo3D(x, y, z = 0, out) {
            if (!out) {
                out = new Laya.Vector3();
            }
            const stage = Laya.ILaya.stage;
            const scaleX = stage.scaleX;
            const scaleY = stage.scaleY;
            out.x = x * scaleX;
            out.y = Laya.RenderState2D.height - y * scaleY;
            out.z = z;
            return out;
        }
        static worldTo2D(worldPos) {
            const stage = Laya.ILaya.stage;
            const scaleX = stage.scaleX;
            const scaleY = stage.scaleY;
            return {
                x: worldPos.x / scaleX,
                y: (Laya.RenderState2D.height - worldPos.y) / scaleY
            };
        }
        static getScale() {
            const stage = Laya.ILaya.stage;
            return {
                scaleX: stage.scaleX,
                scaleY: stage.scaleY
            };
        }
        static getRenderInfo() {
            const stage = Laya.ILaya.stage;
            return {
                logicWidth: stage.width,
                logicHeight: stage.height,
                renderWidth: Laya.RenderState2D.width,
                renderHeight: Laya.RenderState2D.height,
                scaleX: stage.scaleX,
                scaleY: stage.scaleY
            };
        }
        static screenTo3D(screenX, screenY, camera, depth = 0, out) {
            if (!out) {
                out = new Laya.Vector3();
            }
            const renderWidth = Laya.RenderState2D.width;
            const renderHeight = Laya.RenderState2D.height;
            const ndcX = (screenX / renderWidth) * 2 - 1;
            const ndcY = 1 - (screenY / renderHeight) * 2;
            if (camera.orthographic) {
                const halfHeight = camera.orthographicVerticalSize * 0.5;
                const halfWidth = halfHeight * camera.aspectRatio;
                const viewX = ndcX * halfWidth;
                const viewY = ndcY * halfHeight;
                const camPos = camera.transform.position;
                out.x = camPos.x + viewX;
                out.y = camPos.y + viewY;
                out.z = depth;
            }
            return out;
        }
        static debugInfo() {
            const info = Bridge3DCoordinate.getRenderInfo();
            console.log("=== Bridge3D Coordinate System Info ===");
            console.log(`Logic Size: ${info.logicWidth} × ${info.logicHeight}`);
            console.log(`Render Size: ${info.renderWidth} × ${info.renderHeight}`);
            console.log(`Scale: ${info.scaleX.toFixed(3)} × ${info.scaleY.toFixed(3)}`);
            console.log("=======================================");
        }
    }

    class Bridge3DSprite extends Laya.Sprite {
        static createBridge3DRenderElement() {
            if (Laya.LayaEnv.isConch && window.conchConfig.getGraphicsAPI() != 2) {
                return new RTBridge3DRenderElement();
            }
            else
                return new Bridge3DRenderElement();
        }
        constructor() {
            super();
            this._isRegistered = false;
            this._boundsDirty = true;
            this._list = new Laya.SingletonList();
            this._ppu = Bridge3DSprite.defaultPixelsPerUnit;
            this._bounds3D = new Laya.Bounds(new Laya.Vector3(), new Laya.Vector3());
            this._bounds2DRect = new Laya.Rectangle();
            this._containerSprite3D = new BridgeContainerSprite3D();
            this._containerSprite3D.name = "Bridge3DContainer";
            this._containerSprite3D._ownerBridge = this;
            this._setContainer(this._containerSprite3D);
            this._bridge3DRenderElement = Bridge3DSprite.createBridge3DRenderElement();
            this._bridge3DRenderElement.owner = this._struct;
            this._bridge3DRenderElement.geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(0, 0);
            this._struct.renderElements = [this._bridge3DRenderElement];
            this._initShaderData();
            const emptyHandle = Laya.LayaGL.render2DRenderPassFactory.createEmptyRenderDataHandle();
            if (emptyHandle) {
                this._struct.renderDataHandler = emptyHandle;
                emptyHandle.needUseMatrix = false;
            }
        }
        get containerSprite3D() {
            return this._containerSprite3D;
        }
        get transform3D() {
            return this._containerSprite3D.transform;
        }
        get pixelsPerUnit() {
            return this._ppu;
        }
        set pixelsPerUnit(value) {
            if (value <= 0) {
                throw new Error("scale3DToPixel must be greater than 0");
            }
            if (this._ppu !== value) {
                this._ppu = value;
                this._syncTransform2DTo3D();
            }
        }
        addChild(node) {
            if (!node) {
                throw new Error("node cannot be null or undefined");
            }
            if (!(node instanceof Laya.Sprite3D)) {
                throw new Error("Bridge3DSprite can only add Sprite3D children, not 2D nodes");
            }
            return super.addChild(node);
        }
        _setBelongScene(scene) {
            super._setBelongScene(scene);
            this._regsiterScene();
        }
        _setUnBelongScene() {
            this._removeRegister();
            super._setUnBelongScene();
        }
        _onAdded() {
            this.on(Laya.Event.TRANSFORM_CHANGED, this, this._syncTransform2DTo3D);
            super._onAdded();
        }
        _regsiterScene() {
            if (!this._scene)
                return;
            this._scene._bridge3DInternal.registerBridge3D(this);
            this._isRegistered = true;
        }
        _removeRegister() {
            if (!this._scene || !this._isRegistered)
                return;
            this._scene._bridge3DInternal.unregisterBridge3D(this);
            this._isRegistered = false;
        }
        _onRemoved() {
            this.off(Laya.Event.TRANSFORM_CHANGED, this, this._syncTransform2DTo3D);
            super._onRemoved();
        }
        _setParent(value, index) {
            super._setParent(value, index);
            if (value) {
                this._syncTransform2DTo3D();
            }
        }
        _transChanged(flag) {
            super._transChanged(flag);
            this._syncTransform2DTo3D();
        }
        _syncTransform2DTo3D() {
            const transform = this._containerSprite3D.transform;
            const globalMatrix = this.globalTrans.getMatrix();
            const a = globalMatrix.a;
            const b = globalMatrix.b;
            const c = globalMatrix.c;
            const d = globalMatrix.d;
            const tx = globalMatrix.tx;
            const ty = globalMatrix.ty;
            const scale = this._ppu;
            const pos3D = Laya.Vector3.TEMP;
            pos3D.x = tx;
            pos3D.y = Laya.RenderState2D.height - ty;
            pos3D.z = 0;
            const matrix = transform.localMatrix;
            const e = matrix.elements;
            e[0] = a * scale;
            e[1] = -b * scale;
            e[2] = 0;
            e[3] = 0;
            e[4] = -c * scale;
            e[5] = d * scale;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = scale;
            e[11] = 0;
            e[12] = pos3D.x;
            e[13] = pos3D.y;
            e[14] = pos3D.z;
            e[15] = 1;
            transform.localMatrix = matrix;
            this._markBoundsDirty();
        }
        _addRenderObject(render) {
            this._list.add(render);
            this._bridge3DRenderElement.addBaseRenderNode(render.renderNode);
            this._markBoundsDirty();
        }
        _removeRenderObject(render) {
            this._list.remove(render);
            this._bridge3DRenderElement.removeBaseRenderNode(render.renderNode);
            this._markBoundsDirty();
        }
        _renderUpdate() {
            let context = Laya.RenderContext3D._instance;
            let elements = this._list.elements;
            for (let i = 0, len = this._list.length; i < len; i++) {
                elements[i].renderUpdate(context);
            }
        }
        get3DBounds() {
            if (this._boundsDirty)
                this._updateBounds();
            return this._bounds3D;
        }
        _markBoundsDirty() {
            this._boundsDirty = true;
        }
        _updateBounds() {
            const elements = this._list.elements;
            const len = this._list.length;
            if (len === 0) {
                this._bounds3D.min = _boundsTemp0;
                this._bounds3D.max = _boundsTemp1;
            }
            else {
                elements[0].bounds.cloneTo(this._bounds3D);
                for (let i = 1; i < len; i++) {
                    Laya.Bounds.merge(this._bounds3D, elements[i].bounds, this._bounds3D);
                }
            }
            this._project3DTo2D();
            this._boundsDirty = false;
        }
        _project3DTo2D() {
            const min3D = this._bounds3D.min;
            const max3D = this._bounds3D.max;
            const min2D = Bridge3DCoordinate.worldTo2D(min3D);
            const max2D = Bridge3DCoordinate.worldTo2D(max3D);
            const p = _boundsPoint;
            let minX = Infinity, minY = Infinity;
            let maxX = -Infinity, maxY = -Infinity;
            p.setTo(min2D.x, min2D.y);
            this.globalToLocal(p);
            if (p.x < minX)
                minX = p.x;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.y > maxY)
                maxY = p.y;
            p.setTo(max2D.x, min2D.y);
            this.globalToLocal(p);
            if (p.x < minX)
                minX = p.x;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.y > maxY)
                maxY = p.y;
            p.setTo(min2D.x, max2D.y);
            this.globalToLocal(p);
            if (p.x < minX)
                minX = p.x;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.y > maxY)
                maxY = p.y;
            p.setTo(max2D.x, max2D.y);
            this.globalToLocal(p);
            if (p.x < minX)
                minX = p.x;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.y > maxY)
                maxY = p.y;
            this._bounds2DRect.setTo(minX, minY, maxX - minX, maxY - minY);
        }
        getGraphicBounds(realSize, out) {
            if (this._boundsDirty)
                this._updateBounds();
            return this._bounds2DRect.clone(out);
        }
        onDestroy() {
            this._removeRegister();
            this._list.length = 0;
            this._bounds3D = null;
            this._bounds2DRect = null;
            if (this._bridge3DRenderElement) {
                this._bridge3DRenderElement.destroy();
                this._bridge3DRenderElement = null;
            }
            if (this._containerSprite3D) {
                this._containerSprite3D.destroy();
                this._containerSprite3D = null;
            }
            super.onDestroy();
        }
        get bridge3DRenderElement() {
            return this._bridge3DRenderElement;
        }
        _child3dChanged(child) {
        }
    }
    Bridge3DSprite.defaultPixelsPerUnit = 10;
    class BridgeContainerSprite3D extends Laya.Sprite3D {
        _childChanged(child) {
            super._childChanged(child);
            this._ownerBridge._child3dChanged(child);
        }
    }
    const _boundsTemp0 = new Laya.Vector3();
    const _boundsTemp1 = new Laya.Vector3();
    const _boundsPoint = new Laya.Point();

    let c = Laya.ClassUtils.regClass;
    c('Bridge3DCamera', Bridge3DCamera);
    c('Bridge3DScene3D', Bridge3DScene3D);
    c('Bridge3DSprite', Bridge3DSprite);
    c('Bridge3DData', Bridge3DData);
    Laya.Scene.bridge3DInternalHandler = (scene) => new Bridge3DSceneInternal(scene);
    Laya.Config.isDepth = true;
    Laya.Laya.addInitCallback(() => {
        Bridge3DCamera.__init__();
    });

    exports.Bridge3DCamera = Bridge3DCamera;
    exports.Bridge3DContext = Bridge3DContext;
    exports.Bridge3DCoordinate = Bridge3DCoordinate;
    exports.Bridge3DData = Bridge3DData;
    exports.Bridge3DRenderElement = Bridge3DRenderElement;
    exports.Bridge3DScene3D = Bridge3DScene3D;
    exports.Bridge3DSceneInternal = Bridge3DSceneInternal;
    exports.Bridge3DSprite = Bridge3DSprite;
    exports.RTBridge3DContext = RTBridge3DContext;
    exports.RTBridge3DRenderElement = RTBridge3DRenderElement;
    exports.RTBridge3DRenderProcess = RTBridge3DRenderProcess;
    exports.WebBridge3DRenderProcess = WebBridge3DRenderProcess;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.bridge.js.map
