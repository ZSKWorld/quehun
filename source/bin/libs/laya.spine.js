(function (exports, Laya) {
    'use strict';

    class ExternalSkin {
        constructor() {
            this.normal = false;
        }
        get source() {
            return this._source;
        }
        set source(value) {
            this._source = value;
            if (value) {
                Laya.ILaya.loader.load(value, Laya.Loader.SPINE).then((templet) => {
                    if (!this._source || templet && !templet.isCreateFromURL(this._source))
                        return;
                    this.templet = templet;
                });
            }
            else
                this.templet = null;
        }
        get items() {
            return this._items;
        }
        set items(value) {
            this._items = value;
        }
        get templet() {
            return this._templet;
        }
        set templet(value) {
            this.init(value);
        }
        init(templet) {
            this._templet = templet;
            if (!this._templet) {
                return;
            }
            this.flush();
        }
        flush() {
            var _a, _b, _c;
            let targetTemplet = (_a = this.target) === null || _a === void 0 ? void 0 : _a.templet;
            let skeletonData = (_b = this._templet) === null || _b === void 0 ? void 0 : _b.skeletonData;
            if (this._items && skeletonData
                && targetTemplet
                && targetTemplet._textures) {
                for (let i = this._items.length - 1; i >= 0; i--) {
                    let o = this._items[i];
                    let attachmentStr = o.attachment;
                    let slot = o.slot;
                    let skinStr = o.skin;
                    if (attachmentStr && slot && skinStr) {
                        let attachment = null;
                        let skins = skeletonData.skins;
                        for (let j = skins.length - 1; j >= 0; j--) {
                            if (skins[j].name == skinStr) {
                                let skin = skins[j];
                                let attachments = skin.attachments;
                                for (let j = attachments.length - 1; j >= 0; j--) {
                                    attachment = (_c = attachments[j]) === null || _c === void 0 ? void 0 : _c[attachmentStr];
                                    if (attachment) {
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        if (attachment) {
                            let regionPage = attachment.region.page;
                            targetTemplet.setTexture(regionPage.name, regionPage.texture.realTexture);
                            let slotObj = this.target.getSkeleton().findSlot(slot);
                            if (slotObj) {
                                slotObj.setAttachment(attachment);
                            }
                        }
                    }
                }
                this.normal = this._templet !== targetTemplet;
            }
            else {
                this.normal = false;
            }
        }
    }

    class ExternalSkinItem {
        get skin() {
            return this._skin;
        }
        set skin(value) {
            this._skin = value;
        }
        get slot() {
            return this._slot;
        }
        set slot(value) {
            this._slot = value;
        }
        get attachment() {
            return this._attachment;
        }
        set attachment(value) {
            this._attachment = value;
        }
    }

    var spineVertex = "#if !defined(SpineVertex_lib)\n#define SpineVertex_lib\n#ifdef SPINE_SIMPLE\nuniform vec4 u_SimpleAnimatorParams;uniform sampler2D u_SimpleAnimatorTexture;uniform float u_SimpleAnimatorTextureSize;vec4 getBonePosBake(float FramePos,float boneIndices,float weight,vec2 pos,float offset){vec2 uv=vec2(0.0,0.0);float PixelPos=FramePos+boneIndices*2.0;float halfOffset=offset*0.5;float uvoffset=PixelPos/u_SimpleAnimatorTextureSize;uv.y=floor(uvoffset)*offset+halfOffset;uv.x=mod(PixelPos,u_SimpleAnimatorTextureSize)*offset+halfOffset;vec4 up=texture2D(u_SimpleAnimatorTexture,uv);uv.x+=offset;vec4 down=texture2D(u_SimpleAnimatorTexture,uv);float x=pos.x*up.x+pos.y*up.y+up.z;float y=pos.x*down.x+pos.y*down.y+down.z;pos.x=x*weight;pos.y=y*weight;return vec4(pos,0.,1.0);}\n#endif\n#if defined(SPINE_FAST) || defined(SPINE_RB)\nuniform vec4 u_sBone[200];vec4 getBonePos(float fboneId,float weight,vec2 pos){int boneId=int(fboneId);vec4 up=u_sBone[boneId*2];vec4 down=u_sBone[boneId*2+1];float x=pos.x*up.x+pos.y*up.y+up.z;float y=pos.x*down.x+pos.y*down.y+down.z;pos.x=x*weight;pos.y=y*weight;return vec4(pos,0.,1.0);}\n#endif\nuniform vec2 u_size;uniform vec4 u_color;vec4 getSpinePos(){\n#ifdef SPINE_SIMPLE\n#ifdef GPU_INSTANCE\nfloat currentPixelPos=a_SimpleTextureParams.x+a_SimpleTextureParams.y;\n#else\nfloat currentPixelPos=u_SimpleAnimatorParams.x+u_SimpleAnimatorParams.y;\n#endif\nfloat offset=1.0/u_SimpleAnimatorTextureSize;return getBonePosBake(currentPixelPos,a_BoneId,a_weight,a_position,offset)+getBonePosBake(currentPixelPos,a_PosWeightBoneID_2.w,a_PosWeightBoneID_2.z,a_PosWeightBoneID_2.xy,offset)+getBonePosBake(currentPixelPos,a_PosWeightBoneID_3.w,a_PosWeightBoneID_3.z,a_PosWeightBoneID_3.xy,offset)+getBonePosBake(currentPixelPos,a_PosWeightBoneID_4.w,a_PosWeightBoneID_4.z,a_PosWeightBoneID_4.xy,offset);\n#else\n#ifdef SPINE_FAST\nreturn getBonePos(a_BoneId,a_weight,a_position)+getBonePos(a_PosWeightBoneID_2.w,a_PosWeightBoneID_2.z,a_PosWeightBoneID_2.xy)+getBonePos(a_PosWeightBoneID_3.w,a_PosWeightBoneID_3.z,a_PosWeightBoneID_3.xy)+getBonePos(a_PosWeightBoneID_4.w,a_PosWeightBoneID_4.z,a_PosWeightBoneID_4.xy);\n#endif\n#ifdef SPINE_RB\nreturn getBonePos(a_BoneId,1.0,a_position);\n#endif\n#endif\nreturn vec4(a_position.x,a_position.y,0.,1.);}void getGlobalPos(vec4 pos,out vec2 globalPos){\n#ifdef GPU_INSTANCE\nvec3 down=a_NMatrix_1;vec3 up=a_NMatrix_0;\n#else\nvec3 down=u_NMatrix_1;vec3 up=u_NMatrix_0;\n#endif\nfloat x=up.x*pos.x+up.y*pos.y+up.z;float y=down.x*pos.x+down.y*pos.y-down.z;globalPos=vec2(x,-y);}vec4 getScreenPos(vec4 pos){\n#ifdef GPU_INSTANCE\nvec3 down=a_NMatrix_1;vec3 up=a_NMatrix_0;\n#else\nvec3 down=u_NMatrix_1;vec3 up=u_NMatrix_0;\n#endif\nfloat x=up.x*pos.x+up.y*pos.y+up.z;float y=-1.0*(down.x*pos.x+down.y*pos.y-down.z);\n#ifdef CAMERA2D\nvec2 posT=(u_view2D*vec3(x,y,1.0)).xy+u_baseRenderSize2D/2.;x=posT.x;y=posT.y;\n#endif\nv_cliped=getClipedInfo(vec2(x,y));return vec4((x/u_baseRenderSize2D.x-0.5)*2.0,(0.5-y/u_baseRenderSize2D.y)*2.0,pos.z,1.0);}void getVertexInfo(vec4 pos,inout vertexInfo info){info.pos=pos.xy;info.color=vec4(1.0);\n#ifdef COLOR\ninfo.color=a_color;\n#endif\ninfo.color*=u_baseRenderColor;\n#ifdef PREMULTIPLYALPHA\ninfo.color.rgb=info.color.rgb*info.color.a;\n#endif\n#ifdef UV\ninfo.uv=a_uv;\n#endif\n#ifdef LIGHT2D_ENABLE\nvec2 global;vec3 stageInv0=vec3(u_LightAndShadow2DStageMat0.x,u_LightAndShadow2DStageMat0.y,u_LightAndShadow2DStageMat0.z);vec3 stageInv1=vec3(u_LightAndShadow2DStageMat1.x,u_LightAndShadow2DStageMat1.y,u_LightAndShadow2DStageMat1.z);invertMat(stageInv0,stageInv1);getGlobalPos(pos,global);transfrom(global,stageInv0,stageInv1,global);transfrom(global,u_LightAndShadow2DSceneInv0,u_LightAndShadow2DSceneInv1,global);transfrom(global,u_LightAndShadow2DStageMat0,u_LightAndShadow2DStageMat1,global);info.lightUV.x=(global.x-u_LightAndShadow2DParam.x)/u_LightAndShadow2DParam.z;info.lightUV.y=1.0-(global.y-u_LightAndShadow2DParam.y)/u_LightAndShadow2DParam.w;\n#endif\n}\n#endif\n";

    var spineFragment = "#if !defined(SpineFragment_lib)\n#define SpineFragment_lib\n#include \"Sprite2DFrag.glsl\";\nvec4 getColor(){vec4 color=texture2D(u_spineTexture,v_texcoord.xy);\n#ifndef GAMMATEXTURE\n#ifdef GAMMASPACE\ncolor.xyz=linearToGamma(color.xyz);\n#endif\n#else\n#ifndef GAMMASPACE\ncolor.xyz=gammaToLinear(color.xyz);\n#endif\n#endif\nvec4 final;\n#ifdef TWOCOLORTINT\nfinal.a=color.a*v_color.a;final.xyz=((color.a-1.0)*v_color2.a+1.0-color.xyz)*v_color2.xyz+color.xyz*v_color.xyz;\n#else\nfinal=color*v_color;\n#endif\nreturn final;}\n#endif\n";

    var spineStandardVS = "#define SHADER_NAME SpineStandardVS\n#include \"Sprite2DVertex.glsl\";\n#include \"SpineVertex.glsl\";\nvarying vec4 v_color2;void main(){vec4 pos=getSpinePos();vertexInfo info;getVertexInfo(pos,info);v_texcoord=info.uv;v_color=info.color;\n#ifdef COLOR2\nv_color2=a_color2;\n#else\nv_color2=vec4(0.0,0.0,0.0,1.0);\n#endif\n#ifdef PREMULTIPLYALPHA\nv_color2.xyz=v_color2.xyz*v_color.a;\n#endif\n#ifdef LIGHT2D_ENABLE\nlightAndShadow(info);\n#endif\ngl_Position=getScreenPos(pos);}";

    var spineStandardFS = "#define SHADER_NAME SpineStandardFS\nvarying vec4 v_color2;\n#include \"SpineFragment.glsl\";\n#ifdef COLOR_FILTER\nuniform vec4 u_colorAlpha;uniform mat4 u_colorMat;\n#endif\nvoid main(){clip();gl_FragColor=getColor();\n#ifdef COLOR_FILTER\nmat4 alphaMat=u_colorMat;alphaMat[0][3]*=gl_FragColor.a;alphaMat[1][3]*=gl_FragColor.a;alphaMat[2][3]*=gl_FragColor.a;gl_FragColor=gl_FragColor*alphaMat;gl_FragColor+=u_colorAlpha/255.0*gl_FragColor.a;\n#endif\n#ifdef LIGHT2D_ENABLE\nlightAndShadow(gl_FragColor);\n#endif\n}";

    class SpineMeshUtils {
        static createMesh(type, vbCreator, ibCreator, isDynamic = false, uploadBuffer = true) {
            let mesh = new Laya.Mesh2D;
            let vertexBuffers = [];
            let usage = isDynamic ? Laya.BufferUsage.Dynamic : Laya.BufferUsage.Static;
            let vertexBuffer = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(usage);
            let vertexDeclaration = vbCreator.vertexDeclaration;
            let vertexStride = vertexDeclaration.vertexStride;
            vertexBuffer.vertexDeclaration = vertexDeclaration;
            let vbByteLength = vbCreator.maxVertexCount * vertexStride;
            let vbUploadLength = vbCreator.vbLength * Float32Array.BYTES_PER_ELEMENT;
            vertexBuffer.setDataLength(vbByteLength);
            if (uploadBuffer) {
                vertexBuffer.setData(vbCreator.vb.buffer, 0, 0, vbUploadLength);
            }
            vertexBuffers.push(vertexBuffer);
            mesh._vertexCount = vbByteLength / vertexStride;
            mesh._vertexBuffers = vertexBuffers;
            let ibByteLength = ibCreator.maxIndexCount * ibCreator.size;
            ibCreator.ibLength;
            let indexbuffer = Laya.LayaGL.renderDeviceFactory.createIndexBuffer(usage);
            indexbuffer.indexType = ibCreator.type;
            indexbuffer.indexCount = ibCreator.maxIndexCount;
            indexbuffer._setIndexDataLength(ibByteLength);
            if (uploadBuffer) {
                indexbuffer._setIndexData(ibCreator.ib, 0);
            }
            mesh._indexBuffer = indexbuffer;
            let state = mesh._bufferState;
            state.applyState(vertexBuffers, indexbuffer);
            let subMeshes = [];
            let multi = ibCreator.outRenderData;
            for (let i = 0, len = multi.renderData.length; i < len; i++) {
                let data = multi.renderData[i];
                let geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElement);
                geometry.bufferState = state;
                geometry.setDrawElemenParams(data.length, data.offset * ibCreator.size);
                geometry.indexFormat = ibCreator.type;
                subMeshes.push(geometry);
            }
            mesh._setSubMeshes(subMeshes);
            var memorySize = vbByteLength + ibByteLength;
            mesh._setCPUMemory(memorySize);
            mesh._setGPUMemory(memorySize);
            return mesh;
        }
        static createMeshDynamic(vertexDeclaration) {
            let mesh = new Laya.Mesh2D;
            let vertexBuffers = [];
            let usage = Laya.BufferUsage.Dynamic;
            let vertexBuffer = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(usage);
            vertexBuffer.vertexDeclaration = vertexDeclaration;
            vertexBuffers.push(vertexBuffer);
            mesh._vertexBuffers = vertexBuffers;
            let indexbuffer = Laya.LayaGL.renderDeviceFactory.createIndexBuffer(usage);
            mesh._indexBuffer = indexbuffer;
            let state = mesh._bufferState;
            state.applyState(vertexBuffers, indexbuffer);
            return mesh;
        }
        static _updateSpineSubMesh(mesh, frameData) {
            let subMeshCount = mesh.subMeshCount;
            let mulitRenderData = frameData.mulitRenderData;
            if (!mulitRenderData)
                return false;
            let renderdata = mulitRenderData.renderData;
            let rdLength = renderdata.length;
            let needUpdate = subMeshCount != rdLength;
            let subMeshes = mesh._subMeshes;
            if (needUpdate) {
                let flen = Math.max(rdLength, subMeshCount);
                let state = mesh._bufferState;
                for (let i = 0; i < flen; i++) {
                    let submesh = subMeshes[i];
                    let data = renderdata[i];
                    if (data) {
                        if (!submesh) {
                            submesh = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElement);
                            submesh.bufferState = state;
                            subMeshes[i] = submesh;
                        }
                        submesh.indexFormat = frameData.type;
                        submesh.clearRenderParams();
                        submesh.setDrawElemenParams(data.length, data.offset * frameData.size);
                    }
                    else {
                        submesh.destroy();
                    }
                }
                subMeshes.length = rdLength;
            }
            else {
                for (let i = 0; i < subMeshCount; i++) {
                    let submesh = subMeshes[i];
                    let data = renderdata[i];
                    submesh.indexFormat = frameData.type;
                    submesh.clearRenderParams();
                    submesh.setDrawElemenParams(data.length, data.offset * frameData.size);
                }
            }
            return needUpdate;
        }
        static getVertexDeclaration(vertexFlag) {
            var verDec = SpineMeshUtils._vertexDeclarationMap[vertexFlag];
            if (!verDec) {
                var subFlags = vertexFlag.split(",");
                var elements = [];
                var offset = 0;
                for (var i = 0, n = subFlags.length; i < n; i++) {
                    var element;
                    switch (subFlags[i]) {
                        case "COLOR2":
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector4, 11);
                            offset += 16;
                            break;
                        case "BONE":
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Single, 3);
                            elements.push(element);
                            offset += 4;
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Single, 4);
                            elements.push(element);
                            offset += 4;
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector4, 5);
                            elements.push(element);
                            offset += 16;
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector4, 6);
                            elements.push(element);
                            offset += 16;
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector4, 7);
                            offset += 16;
                            break;
                        case "RIGIDBODY":
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Single, 4);
                            offset += 4;
                            break;
                        case "UV":
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector2, 0);
                            offset += 8;
                            break;
                        case "COLOR":
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector4, 1);
                            offset += 16;
                            break;
                        case "POSITION":
                            element = new Laya.VertexElement(offset, Laya.VertexElementFormat.Vector2, 2);
                            offset += 8;
                            break;
                        default:
                            throw "VertexMesh: unknown vertex flag.";
                    }
                    elements.push(element);
                }
                verDec = new Laya.VertexDeclaration(offset, elements);
                SpineMeshUtils._vertexDeclarationMap[vertexFlag] = verDec;
            }
            return verDec;
        }
        static getIndexFormat(vertexCount) {
            let type = Laya.IndexFormat.UInt32;
            if (vertexCount < 256 && Laya.LayaGL.renderEngine.getCapable(Laya.RenderCapable.Element_Index_Uint8)) {
                type = Laya.IndexFormat.UInt8;
            }
            else if (vertexCount < 65536) {
                type = Laya.IndexFormat.UInt16;
            }
            return type;
        }
    }
    SpineMeshUtils._vertexDeclarationMap = {};

    class SpineShaderInit {
        static SetSpineBlendMode(value, mat, premultipliedAlpha = true) {
            switch (value) {
                case 1:
                    mat.blend = Laya.RenderState.BLEND_ENABLE_ALL;
                    mat.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
                    mat.blendDst = Laya.RenderState.BLENDPARAM_ONE;
                    break;
                case 3:
                    mat.blend = Laya.RenderState.BLEND_ENABLE_SEPERATE;
                    mat.blendSrcRGB = Laya.RenderState.BLENDPARAM_ONE;
                    mat.blendSrcAlpha = Laya.RenderState.BLENDPARAM_ONE;
                    mat.blendDstRGB = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_COLOR;
                    mat.blendDstAlpha = Laya.RenderState.BLENDPARAM_ONE;
                    break;
                case 2:
                    mat.blend = Laya.RenderState.BLEND_ENABLE_ALL;
                    mat.blendSrc = Laya.RenderState.BLENDPARAM_DST_COLOR;
                    mat.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                    break;
                default:
                    mat.blend = Laya.RenderState.BLEND_ENABLE_ALL;
                    mat.blendSrc = premultipliedAlpha ? Laya.RenderState.BLENDPARAM_ONE : Laya.RenderState.BLENDPARAM_SRC_ALPHA;
                    mat.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
            }
        }
        static initSpineMaterial(mat) {
            mat.alphaTest = false;
            mat.depthWrite = false;
            mat.cull = Laya.RenderState.CULL_NONE;
            mat.blend = Laya.RenderState.BLEND_ENABLE_ALL;
            mat.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
            mat.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
            mat.depthTest = Laya.RenderState.DEPTHTEST_OFF;
        }
        static changeVertexDefine(shaderData, mesh) {
            let hasTwoColor = false;
            let vertexBuffers = mesh.vertexBuffers;
            for (let i = 0; i < vertexBuffers.length; i++) {
                let vertexBuffer = vertexBuffers[i];
                let vertexDeclaration = vertexBuffer.vertexDeclaration;
                let vertexElement = vertexDeclaration.getVertexElementByUsage(11);
                if (vertexElement) {
                    hasTwoColor = true;
                    break;
                }
            }
            if (hasTwoColor) {
                shaderData.addDefine(SpineShaderInit.SPINE_COLOR2);
            }
            else {
                shaderData.removeDefine(SpineShaderInit.SPINE_COLOR2);
            }
        }
        static init() {
            Laya.Shader3D.addInclude("SpineVertex.glsl", spineVertex);
            Laya.Shader3D.addInclude("SpineFragment.glsl", spineFragment);
            SpineShaderInit.BONEMAT = Laya.Shader3D.propertyNameToID("u_sBone");
            SpineShaderInit.SpineTexture = Laya.Shader3D.propertyNameToID("u_spineTexture");
            SpineShaderInit.SPINE_FAST = Laya.Shader3D.getDefineByName("SPINE_FAST");
            SpineShaderInit.SPINE_RB = Laya.Shader3D.getDefineByName("SPINE_RB");
            SpineShaderInit.SPINE_UV = Laya.Shader3D.getDefineByName("UV");
            SpineShaderInit.SPINE_COLOR = Laya.Shader3D.getDefineByName("COLOR");
            SpineShaderInit.SPINE_PREMULTIPLYALPHA = Laya.Shader3D.getDefineByName("PREMULTIPLYALPHA");
            SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS = Laya.Shader3D.propertyNameToID("u_SimpleAnimatorParams");
            SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE = Laya.Shader3D.propertyNameToID("u_SimpleAnimatorTexture");
            SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE = Laya.Shader3D.propertyNameToID("u_SimpleAnimatorTextureSize");
            SpineShaderInit.SPINE_SIMPLE = Laya.Shader3D.getDefineByName("SPINE_SIMPLE");
            SpineShaderInit.SPINE_GPU_INSTANCE = Laya.Shader3D.getDefineByName("GPU_INSTANCE");
            SpineShaderInit.SPINE_TWOCOLORTINT = Laya.Shader3D.getDefineByName("TWOCOLORTINT");
            SpineShaderInit.SPINE_COLOR2 = Laya.Shader3D.getDefineByName("COLOR2");
            const commandUniform = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Spine2D");
            commandUniform.addShaderUniform(SpineShaderInit.BONEMAT, "u_sBone", Laya.ShaderDataType.Buffer);
            commandUniform.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS, "u_SimpleAnimatorParams", Laya.ShaderDataType.Vector4);
            commandUniform.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE, "u_SimpleAnimatorTexture", Laya.ShaderDataType.Texture2D);
            commandUniform.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE, "u_SimpleAnimatorTextureSize", Laya.ShaderDataType.Float);
            let shader = Laya.Shader3D.add("SpineStandard", true, false);
            shader.shaderType = Laya.ShaderFeatureType.D2_BaseRednerNode2D;
            let uniformMap = {
                "u_spineTexture": Laya.ShaderDataType.Texture2D
            };
            let subShader = new Laya.SubShader(SpineShaderInit.textureSpineAttribute, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(spineStandardVS, spineStandardFS);
            SpineShaderInit.SpineNormalVertexDeclaration = SpineMeshUtils.getVertexDeclaration("UV,COLOR,POSITION,COLOR2");
            SpineShaderInit.instanceNMatrixDeclaration = new Laya.VertexDeclaration(24, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Vector3, 8),
                new Laya.VertexElement(12, Laya.VertexElementFormat.Vector3, 9),
            ]);
            SpineShaderInit.instanceSimpleAnimatorDeclaration = new Laya.VertexDeclaration(16, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Vector4, 10),
            ]);
        }
    }
    SpineShaderInit.textureSpineAttribute = {
        'a_uv': [0, Laya.ShaderDataType.Vector2],
        'a_color': [1, Laya.ShaderDataType.Vector4],
        'a_position': [2, Laya.ShaderDataType.Vector2],
        "a_weight": [3, Laya.ShaderDataType.Float],
        "a_BoneId": [4, Laya.ShaderDataType.Float],
        'a_PosWeightBoneID_2': [5, Laya.ShaderDataType.Vector4],
        'a_PosWeightBoneID_3': [6, Laya.ShaderDataType.Vector4],
        'a_PosWeightBoneID_4': [7, Laya.ShaderDataType.Vector4],
        'a_NMatrix_0': [8, Laya.ShaderDataType.Vector3],
        'a_NMatrix_1': [9, Laya.ShaderDataType.Vector3],
        'a_SimpleTextureParams': [10, Laya.ShaderDataType.Vector4],
        "a_color2": [11, Laya.ShaderDataType.Vector4],
    };
    Laya.Laya.addAfterInitCallback(SpineShaderInit.init);

    class SpineMeshBase {
        get material() {
            return this._material;
        }
        set material(value) {
            this._material = value;
            this.element.materialShaderData = this._material._shaderValues;
            this.element.subShader = this._material._shader.getSubShaderAt(0);
        }
        constructor(material) {
            this.verticesLength = 0;
            this.indicesLength = 0;
            this.vertexBufferLength = 0;
            this.indexBufferLength = 0;
            this.init();
            this.material = material;
        }
        init() {
            let geo = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElement);
            let mesh = Laya.LayaGL.renderDeviceFactory.createBufferState();
            geo.bufferState = mesh;
            let vb = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            let ib = Laya.LayaGL.renderDeviceFactory.createIndexBuffer(Laya.BufferUsage.Dynamic);
            vb.vertexDeclaration = this.vertexDeclarition;
            mesh.applyState([vb], ib);
            geo.indexFormat = Laya.IndexFormat.UInt16;
            this.geo = geo;
            this.vb = vb;
            this.ib = ib;
            this.element = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            this.element.nodeCommonMap = ["BaseRender2D", "spine2D"];
            this.element.canotPool = true;
            this.element.geometry = geo;
            this.element.renderStateIsBySprite = false;
        }
        get vertexDeclarition() {
            return SpineShaderInit.SpineNormalVertexDeclaration;
        }
        draw() {
            let vb = this.vb;
            let ib = this.ib;
            let vblen = this.verticesLength * 4;
            let iblen = this.indicesLength * 2;
            if (vblen > this.vertexBufferLength) {
                vb.setDataLength(vblen);
                this.vertexBufferLength = vblen;
            }
            if (iblen > this.indexBufferLength) {
                ib._setIndexDataLength(iblen);
                this.indexBufferLength = iblen;
            }
            vb.setData(this.vertexArray.buffer, 0, this.vertexArray.byteOffset, vblen);
            ib._setIndexData(new Uint16Array(this.indexArray.buffer, this.indexArray.byteOffset, iblen / 2), 0);
            this.geo.clearRenderParams();
            this.geo.setDrawElemenParams(iblen / 2, 0);
            this.element.geometry = this.geo;
        }
        drawByData(vertices, vblength, indices, iblength) {
            this.vertexArray = vertices;
            this.indexArray = indices;
            this.verticesLength = vblength;
            this.indicesLength = iblength;
            this.draw();
        }
        clear() {
            this.verticesLength = 0;
            this.indicesLength = 0;
        }
        destroy() {
            this.clear();
            this.vb.destroy();
            this.ib.destroy();
            this.geo.destroy();
            this.element.destroy();
        }
        _cloneTo(target) {
            target.verticesLength = this.verticesLength;
            target.indicesLength = this.indicesLength;
            target.vertexArray = new Float32Array(this.vertexArray);
            target.indexArray = new Uint16Array(this.indexArray);
        }
    }
    SpineMeshBase.maxVertex = 10922;

    class SpineVirtualMesh extends SpineMeshBase {
        constructor(material) {
            super(material);
            if (SpineVirtualMesh.vertexArray == null) {
                SpineVirtualMesh.vertexArray = new Float32Array(SpineMeshBase.maxVertex * SpineVirtualMesh.vertexSize_TwoColor);
                SpineVirtualMesh.indexArray = new Uint16Array(SpineMeshBase.maxVertex * 3);
            }
            this.vertexArray = SpineVirtualMesh.vertexArray;
            this.indexArray = SpineVirtualMesh.indexArray;
        }
        appendVerticesClip(vertices, indices) {
            let indicesLength = indices.length;
            let verticesLength = vertices.length;
            let vertexSize = SpineVirtualMesh.vertexSize_TwoColor;
            let vertexBuffer = this.vertexArray;
            let before = this.verticesLength;
            let indexStart = before / vertexSize;
            let vlen = before;
            for (let j = 0; j < verticesLength; vlen += vertexSize, j += vertexSize) {
                vertexBuffer[vlen] = vertices[j + 6];
                vertexBuffer[vlen + 1] = vertices[j + 7];
                vertexBuffer[vlen + 2] = vertices[j + 2];
                vertexBuffer[vlen + 3] = vertices[j + 3];
                vertexBuffer[vlen + 4] = vertices[j + 4];
                vertexBuffer[vlen + 5] = vertices[j + 5];
                vertexBuffer[vlen + 6] = vertices[j];
                vertexBuffer[vlen + 7] = vertices[j + 1];
                vertexBuffer[vlen + 8] = vertices[j + 8];
                vertexBuffer[vlen + 9] = vertices[j + 9];
                vertexBuffer[vlen + 10] = vertices[j + 10];
                vertexBuffer[vlen + 11] = vertices[j + 11];
            }
            this.verticesLength = before + verticesLength;
            let indicesArray = this.indexArray;
            for (let i = this.indicesLength, j = 0; j < indicesLength; i++, j++)
                indicesArray[i] = indices[j] + indexStart;
            this.indicesLength += indicesLength;
        }
        canAppend(verticesLength, indicesLength) {
            return this.verticesLength + verticesLength < SpineVirtualMesh.maxVertex * SpineVirtualMesh.vertexSize_TwoColor && this.indicesLength + indicesLength < SpineVirtualMesh.maxVertex * 3;
        }
        appendVertices(vertices, verticesLength, indices, indicesLength, finalColor, darkColor, uvs) {
            let vertexSize = SpineVirtualMesh.vertexSize_TwoColor;
            let indexStart = this.verticesLength / vertexSize;
            let vertexBuffer = this.vertexArray;
            let before = this.verticesLength;
            for (let u = 0, v = 0, n = verticesLength; v < n; v += vertexSize, u += 2) {
                let size = before + v;
                vertexBuffer[size] = uvs[u];
                vertexBuffer[size + 1] = uvs[u + 1];
                vertexBuffer[size + 2] = finalColor.r;
                vertexBuffer[size + 3] = finalColor.g;
                vertexBuffer[size + 4] = finalColor.b;
                vertexBuffer[size + 5] = finalColor.a;
                vertexBuffer[size + 6] = vertices[v];
                vertexBuffer[size + 7] = vertices[v + 1];
                vertexBuffer[size + 8] = darkColor.r;
                vertexBuffer[size + 9] = darkColor.g;
                vertexBuffer[size + 10] = darkColor.b;
                vertexBuffer[size + 11] = darkColor.a;
            }
            this.verticesLength = before + verticesLength;
            let indicesArray = this.indexArray;
            for (let i = this.indicesLength, j = 0; j < indicesLength; i++, j++)
                indicesArray[i] = indices[j] + indexStart;
            this.indicesLength += indicesLength;
        }
    }
    SpineVirtualMesh.vertexSize = 8;
    SpineVirtualMesh.vertexSize_TwoColor = 12;

    class SpineNormalRenderBase {
        constructor() {
            this.vmeshs = [];
            this.nextBatchIndex = 0;
        }
        clearBatch() {
            for (var i = 0; i < this.vmeshs.length; i++) {
                this.vmeshs[i].clear();
            }
            this.nextBatchIndex = 0;
        }
        nextBatch(material, spineRenderNode) {
            if (this.vmeshs.length == this.nextBatchIndex) {
                let vmesh = this.createMesh(material);
                this.vmeshs.push(vmesh);
                spineRenderNode._renderElements[this.nextBatchIndex++] = vmesh.element;
                vmesh.element.value2DShaderData = spineRenderNode._spriteShaderData;
                return vmesh;
            }
            let vmesh = this.vmeshs[this.nextBatchIndex];
            spineRenderNode._renderElements[this.nextBatchIndex++] = vmesh.element;
            vmesh.material = material;
            return vmesh;
        }
        destroy() {
            for (var i = 0; i < this.vmeshs.length; i++) {
                this.vmeshs[i].destroy();
            }
            this.vmeshs.length = 0;
        }
    }

    const QUAD_TRIANGLES$1 = [0, 1, 2, 2, 3, 0];
    class SpineSkeletonRenderer extends SpineNormalRenderBase {
        createMesh(material) {
            return new SpineVirtualMesh(material);
        }
        constructor(templet) {
            super();
            this.templet = templet;
            if (SpineSkeletonRenderer.vertices == null) {
                SpineSkeletonRenderer.vertices = spine.Utils.newFloatArray(12 * 1024);
            }
            this.renderable = { vertices: null, numVertices: 0, numFloats: 0 };
            this.clipper = new spine.SkeletonClipping();
            this.tempColor = new spine.Color();
            this.tempColor2 = new spine.Color();
        }
        draw(skeleton, renderNode, slotRangeStart, slotRangeEnd) {
            let clipper = this.clipper;
            this.clearBatch();
            let twoColorTint = true;
            let blendMode = null;
            let renderable = this.renderable;
            let uvs;
            let triangles;
            let drawOrder = skeleton.drawOrder;
            let attachmentColor;
            let skeletonColor = skeleton.color;
            let vertexSize = SpineVirtualMesh.vertexSize_TwoColor;
            let inRange = false;
            if (slotRangeStart == -1)
                inRange = true;
            let virtualMesh;
            let spineTex;
            let staticVetices = SpineSkeletonRenderer.vertices;
            for (let i = 0, n = drawOrder.length; i < n; i++) {
                let clippedVertexSize = clipper.isClipping() ? 2 : vertexSize;
                let slot = drawOrder[i];
                if (!slot.bone.active) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (slotRangeStart >= 0 && slotRangeStart == slot.data.index) {
                    inRange = true;
                }
                if (!inRange) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (slotRangeEnd >= 0 && slotRangeEnd == slot.data.index) {
                    inRange = false;
                }
                let attachment = slot.getAttachment();
                let texture;
                if (attachment instanceof window.spine.RegionAttachment) {
                    let region = attachment;
                    renderable.vertices = staticVetices;
                    renderable.numVertices = 4;
                    renderable.numFloats = clippedVertexSize << 2;
                    if (attachment.sequence != null)
                        attachment.sequence.apply(slot, attachment);
                    this.computeWorldVertices_RegionAttachment(region, slot.bone, renderable.vertices, 0, clippedVertexSize, -skeleton.x, -skeleton.y);
                    triangles = QUAD_TRIANGLES$1;
                    uvs = region.uvs;
                    texture = region.region.page.texture;
                    attachmentColor = region.color;
                }
                else if (attachment instanceof window.spine.MeshAttachment) {
                    let mesh = attachment;
                    renderable.vertices = staticVetices;
                    renderable.numVertices = (mesh.worldVerticesLength >> 1);
                    renderable.numFloats = renderable.numVertices * clippedVertexSize;
                    if (renderable.numFloats > renderable.vertices.length) {
                        renderable.vertices = staticVetices = window.spine.Utils.newFloatArray(renderable.numFloats);
                    }
                    if (attachment.sequence != null)
                        attachment.sequence.apply(slot, attachment);
                    this.computeWorldVertices_MeshAttachment(mesh, slot, 0, mesh.worldVerticesLength, renderable.vertices, 0, clippedVertexSize, -skeleton.x, -skeleton.y);
                    triangles = mesh.triangles;
                    texture = mesh.region.page.texture;
                    uvs = mesh.uvs;
                    attachmentColor = mesh.color;
                }
                else if (attachment instanceof window.spine.ClippingAttachment) {
                    let clip = (attachment);
                    this.clipStart(this.clipper, slot, clip, -skeleton.x, -skeleton.y);
                    continue;
                }
                else {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (texture) {
                    let slotColor = slot.color;
                    let finalColor = this.tempColor;
                    finalColor.r = skeletonColor.r * slotColor.r * attachmentColor.r;
                    finalColor.g = skeletonColor.g * slotColor.g * attachmentColor.g;
                    finalColor.b = skeletonColor.b * slotColor.b * attachmentColor.b;
                    finalColor.a = skeletonColor.a * slotColor.a * attachmentColor.a;
                    let darkColor = this.tempColor2;
                    if (!slot.darkColor)
                        darkColor.set(0, 0, 0, 1.0);
                    else {
                        darkColor.setFromColor(slot.darkColor);
                    }
                    let slotBlendMode = slot.data.blendMode;
                    let needNewMat = false;
                    if (slotBlendMode != blendMode) {
                        blendMode = slotBlendMode;
                        needNewMat = true;
                    }
                    if (spineTex != texture) {
                        spineTex = texture;
                        needNewMat = true;
                    }
                    if (needNewMat) {
                        virtualMesh && virtualMesh.draw();
                        let mat = renderNode.templet.getMaterial(texture.realTexture, blendMode);
                        virtualMesh = this.nextBatch(mat, renderNode);
                        virtualMesh.clear();
                    }
                    if (clipper.isClipping()) {
                        clipper.clipTriangles(renderable.vertices, renderable.numFloats, triangles, triangles.length, uvs, finalColor, darkColor, twoColorTint);
                        if (!virtualMesh.canAppend(clipper.clippedVertices.length, clipper.clippedTriangles.length)) {
                            virtualMesh.draw();
                            virtualMesh = this.nextBatch(virtualMesh.material, renderNode);
                            virtualMesh.clear();
                        }
                        virtualMesh.appendVerticesClip(clipper.clippedVertices, clipper.clippedTriangles);
                    }
                    else {
                        if (!virtualMesh.canAppend(renderable.numFloats, triangles.length)) {
                            virtualMesh.draw();
                            virtualMesh = this.nextBatch(virtualMesh.material, renderNode);
                            virtualMesh.clear();
                        }
                        if (finalColor.a != 0) {
                            virtualMesh.appendVertices(renderable.vertices, renderable.numFloats, triangles, triangles.length, finalColor, darkColor, uvs);
                        }
                    }
                }
                clipper.clipEndWithSlot(slot);
            }
            clipper.clipEnd();
            virtualMesh && virtualMesh.draw();
        }
        clipStart(clipper, slot, clip, ofx, ofy) {
            if (clipper.clipAttachment)
                return 0;
            clipper.clipAttachment = clip;
            let n = clip.worldVerticesLength;
            let vertices = spine.Utils.setArraySize(clipper.clippingPolygon, n);
            this.computeWorldVertices_MeshAttachment(clip, slot, 0, n, vertices, 0, 2, ofx, ofy);
            let clippingPolygon = clipper.clippingPolygon;
            spine.SkeletonClipping.makeClockwise(clippingPolygon);
            let clippingPolygons = clipper.clippingPolygons = clipper.triangulator.decompose(clippingPolygon, clipper.triangulator.triangulate(clippingPolygon));
            for (let i = 0, n = clippingPolygons.length; i < n; i++) {
                let polygon = clippingPolygons[i];
                spine.SkeletonClipping.makeClockwise(polygon);
                polygon.push(polygon[0]);
                polygon.push(polygon[1]);
            }
            return clippingPolygons.length;
        }
        computeWorldVertices_RegionAttachment(attachment, bone, worldVertices, offset, stride, ofx, ofy) {
            let vertexOffset = attachment.offset;
            let x = bone.worldX + ofx, y = bone.worldY + ofy;
            let a = bone.a, b = bone.b, c = bone.c, d = bone.d;
            let offsetX = 0, offsetY = 0;
            offsetX = vertexOffset[0];
            offsetY = vertexOffset[1];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[2];
            offsetY = vertexOffset[3];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[4];
            offsetY = vertexOffset[5];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[6];
            offsetY = vertexOffset[7];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
        }
        computeWorldVertices_MeshAttachment(attachment, slot, start, count, worldVertices, offset, stride, ofx, ofy) {
            count = offset + (count >> 1) * stride;
            let skeleton = slot.bone.skeleton;
            let deformArray = slot.deform;
            let vertices = attachment.vertices;
            let bones = attachment.bones;
            if (bones == null) {
                if (deformArray.length > 0)
                    vertices = deformArray;
                let bone = slot.bone;
                let x = bone.worldX + ofx;
                let y = bone.worldY + ofy;
                let a = bone.a, b = bone.b, c = bone.c, d = bone.d;
                for (let v = start, w = offset; w < count; v += 2, w += stride) {
                    let vx = vertices[v], vy = vertices[v + 1];
                    worldVertices[w] = vx * a + vy * b + x;
                    worldVertices[w + 1] = vx * c + vy * d + y;
                }
                return;
            }
            let v = 0, skip = 0;
            for (let i = 0; i < start; i += 2) {
                let n = bones[v];
                v += n + 1;
                skip += n;
            }
            let skeletonBones = skeleton.bones;
            if (deformArray.length == 0) {
                for (let w = offset, b = skip * 3; w < count; w += stride) {
                    let wx = 0, wy = 0;
                    let n = bones[v++];
                    n += v;
                    for (; v < n; v++, b += 3) {
                        let bone = skeletonBones[bones[v]];
                        let vx = vertices[b], vy = vertices[b + 1], weight = vertices[b + 2];
                        wx += (vx * bone.a + vy * bone.b + bone.worldX + ofx) * weight;
                        wy += (vx * bone.c + vy * bone.d + bone.worldY + ofy) * weight;
                    }
                    worldVertices[w] = wx;
                    worldVertices[w + 1] = wy;
                }
            }
            else {
                let deform = deformArray;
                for (let w = offset, b = skip * 3, f = skip << 1; w < count; w += stride) {
                    let wx = 0, wy = 0;
                    let n = bones[v++];
                    n += v;
                    for (; v < n; v++, b += 3, f += 2) {
                        let bone = skeletonBones[bones[v]];
                        let vx = vertices[b] + deform[f], vy = vertices[b + 1] + deform[f + 1], weight = vertices[b + 2];
                        wx += (vx * bone.a + vy * bone.b + bone.worldX + ofx) * weight;
                        wy += (vx * bone.c + vy * bone.d + bone.worldY + ofy) * weight;
                    }
                    worldVertices[w] = wx;
                    worldVertices[w + 1] = wy;
                }
            }
        }
    }

    class SpineWasmVirturalMesh extends SpineMeshBase {
        constructor(material) {
            super(material);
            this._renderElement2D = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            this._renderElement2D.geometry = this.geo;
            this._renderElement2D.nodeCommonMap = ["BaseRender2D", "spine2D"];
        }
        destroy() {
            super.destroy();
            this._renderElement2D.destroy();
        }
    }

    class SpineWasmRender extends SpineNormalRenderBase {
        constructor(templet) {
            super();
            this.vmeshs = [];
            this.nextBatchIndex = 0;
            this.templet = templet;
        }
        createMesh(material) {
            return new SpineWasmVirturalMesh(material);
        }
        draw(skeleton, renderNode, slotRangeStart, slotRangeEnd) {
            this.nextBatchIndex = 0;
            SpineAdapter.drawSkeleton((vbLen, ibLen, texturePath, blendMode) => {
                let mat = renderNode.templet.getMaterial(this.templet.getTexture(texturePath), blendMode.value);
                let mesh = this.nextBatch(mat, renderNode);
                mesh.drawByData(SpineAdapter._vbArray, vbLen, SpineAdapter._ibArray, ibLen);
            }, skeleton, true, slotRangeStart, slotRangeEnd);
        }
    }

    class SpineAdapter {
        static initialize() {
            if (window.Spine) {
                SpineAdapter.isWasm = true;
                return window.Spine().then((spine) => {
                    SpineAdapter._spine = spine;
                    window.spine = spine;
                    SpineAdapter.initClass();
                    SpineAdapter.bindBuffer(10922 * 12, 10922 * 3);
                    SpineAdapter.allAdpat();
                    return Promise.resolve();
                });
            }
            else if (window.spine) {
                SpineAdapter.isWasm = false;
                SpineAdapter.adaptJS();
                SpineAdapter.allAdpat();
            }
        }
        static createNormalRender(templet) {
            return SpineAdapter.isWasm ? new SpineWasmRender(templet) : new SpineSkeletonRenderer(templet);
        }
        static allAdpat() {
            let ns = window.spine;
            let stateProto = ns.AnimationState.prototype;
            stateProto.oldApply = stateProto.apply;
            stateProto.applyCache = function (skeleton) {
            };
            stateProto.getCurrentPlayTimeOld = function (trackIndex) {
                return this.getCurrentOld(trackIndex).getAnimationTime();
            };
            stateProto.getCurrentPlayTime = stateProto.getCurrentPlayTimeOld;
            stateProto.getCurrentPlayTimeByCache = function (trackIndex) {
                let entry = this.getCurrent(trackIndex);
                let animationStart = entry.animationStart, animationEnd = entry.animationEnd;
                let duration = animationEnd - animationStart;
                entry.trackLast = entry.nextTrackLast;
                let trackLastWrapped = entry.trackLast % duration;
                let animationTime = entry.getAnimationTime();
                let complete = false;
                if (entry.loop)
                    complete = duration == 0 || trackLastWrapped > entry.trackTime % duration;
                else
                    complete = animationTime >= animationEnd && entry.animationLast < animationEnd;
                if (complete) {
                    this.dispatchEvent(entry, "complete", null);
                    entry.nextAnimationLast = -1;
                    entry.nextTrackLast = -1;
                    return 0;
                }
                entry.nextAnimationLast = animationTime;
                entry.nextTrackLast = entry.trackTime;
                let animationLast = entry.animationLast;
                return Math.max(animationLast, 0);
            };
            let skeletonProto = ns.Skeleton.prototype;
            skeletonProto.oldUpdateWorldTransform = skeletonProto.updateWorldTransform;
            skeletonProto.updateWorldTransformCache = function () {
            };
            ns.AnimationState.prototype.dispatchEvent = function (entry, type, event) {
                this.eventsObject[type](entry, event);
            };
        }
        static adaptJS() {
            let ns = window.spine;
            if (ns) {
                ns.AnimationState.prototype.oldAddListener = ns.AnimationState.prototype.addListener;
                ns.AnimationState.prototype.addListener = function (data) {
                    this.eventsObject = data;
                    this.oldAddListener(data);
                };
                let sketonDataProto = ns.SkeletonData.prototype;
                sketonDataProto.getAnimationsSize = function () { return this.animations.length; };
                sketonDataProto.getAnimationByIndex = function (index) { return this.animations[index]; };
                sketonDataProto.getSkinIndexByName = function (name) {
                    let skins = this.skins;
                    for (let i = 0, n = skins.length; i < n; i++) {
                        if (skins[i].name == name) {
                            return i;
                        }
                    }
                    return -1;
                };
                let skeletonProto = ns.Skeleton.prototype;
                skeletonProto.showSkinByIndex = function (index) {
                    this.setSkin(this.data.skins[index]);
                };
                let stateProto = ns.AnimationState.prototype;
                stateProto.getCurrentOld = stateProto.getCurrent;
                stateProto.getCurrent = function (trackIndex) {
                    let result = this.getCurrentOld(trackIndex);
                    this.currentTrack = result;
                    return result;
                };
            }
        }
        static initClass() {
            let ns = window.spine;
            let stateProto = ns.AnimationState.prototype;
            stateProto.addListener = function (data) {
                this.eventsObject = data;
                this.setListener(SpineAdapter._spine.AnimationStateListenerObject.implement({
                    callback: (state, type, entry, event) => {
                        data[SpineAdapter.stateMap[type.value]](entry, event);
                    }
                }));
            };
            stateProto.getCurrentOld = stateProto.getCurrent;
            stateProto.setAnimationOld = stateProto.setAnimation;
            stateProto.setAnimation = function (trackIndex, animationName, loop) {
                if (this.__tracks) {
                    this.__tracks.length = 0;
                }
                return this.setAnimationOld(trackIndex, animationName, loop);
            };
            stateProto.getCurrent = function (trackIndex) {
                let result;
                let __tracks = this.__tracks;
                if (!__tracks) {
                    __tracks = this.__tracks = [];
                    result = this.getCurrentOld(trackIndex);
                    __tracks[trackIndex] = result;
                }
                else {
                    result = __tracks[trackIndex];
                }
                if (!result) {
                    result = this.getCurrentOld(trackIndex);
                    __tracks[trackIndex] = result;
                }
                this.currentTrack = result;
                return result;
            };
            ns.TextureAtlas = TextureAtlas;
            Object.defineProperty(ns.Skin.prototype, "attachments", {
                get: function () {
                    return this.getAttachments();
                }
            });
            let skeletonProto = ns.Skeleton.prototype;
            Object.defineProperty(skeletonProto, "slots", {
                get: function () {
                    return this.getSlots();
                }
            });
            Object.defineProperty(skeletonProto, "data", {
                get: function () {
                    return this.getData();
                }
            });
            Object.defineProperty(skeletonProto, "bones", {
                get: function () {
                    return this.getBones();
                }
            });
            Object.defineProperty(skeletonProto, "color", {
                get: function () {
                    return this.getColor();
                }
            });
            let skeletonDataProto = ns.SkeletonData.prototype;
            Object.defineProperty(skeletonDataProto, "name", {
                get: function () {
                    return this.getName();
                }
            });
            Object.defineProperty(skeletonDataProto, "skins", {
                get: function () {
                    return this.getSkins();
                }
            });
            Object.defineProperty(skeletonDataProto, "slots", {
                get: function () {
                    return this.getSlots();
                }
            });
            let animationProto = ns.Animation.prototype;
            Object.defineProperty(animationProto, "name", {
                get: function () {
                    return this.getName();
                }
            });
            Object.defineProperty(animationProto, "duration", {
                get: function () {
                    return this.getDuration();
                }
            });
            Object.defineProperty(animationProto, "timelines", {
                get: function () {
                    return this.getTimelines();
                }
            });
            Object.defineProperty(skeletonDataProto, "animations", {
                get: function () {
                    return this.getAnimations();
                }
            });
            Object.defineProperty(ns.Skin.prototype, "name", {
                get: function () {
                    return this.getName();
                }
            });
            let slotDataProto = ns.SlotData.prototype;
            Object.defineProperty(slotDataProto, "boneData", {
                get: function () {
                    return this.getBoneData();
                }
            });
            Object.defineProperty(slotDataProto, "color", {
                get: function () {
                    return this.getColor();
                }
            });
            Object.defineProperty(slotDataProto, "index", {
                get: function () {
                    return this.getIndex();
                }
            });
            Object.defineProperty(slotDataProto, "attachmentName", {
                get: function () {
                    return this.getAttachmentName();
                }
            });
            Object.defineProperty(slotDataProto, "blendMode", {
                get: function () {
                    return this.getBlendMode().value;
                }
            });
            Object.defineProperty(ns.BoneData.prototype, "index", {
                get: function () {
                    return this.getIndex();
                }
            });
            let regionAttachMentProto = ns.RegionAttachment.prototype;
            Object.defineProperty(regionAttachMentProto, "color", {
                get: function () {
                    return this.getColor();
                }
            });
            Object.defineProperty(regionAttachMentProto, "name", {
                get: function () {
                    return this.getName();
                }
            });
            Object.defineProperty(regionAttachMentProto, "offset", {
                get: function () {
                    let from = this.getOffset();
                    return from;
                }
            });
            Object.defineProperty(regionAttachMentProto, "uvs", {
                get: function () {
                    return this.getRotateUVs();
                }
            });
            Object.defineProperty(regionAttachMentProto, "region", {
                get: function () {
                    return this;
                }
            });
            Object.defineProperty(regionAttachMentProto, "page", {
                get: function () {
                    return this.getPage();
                }
            });
            Object.defineProperty(ns.AtlasPage.prototype, "name", {
                get: function () {
                    return this.getName();
                }
            });
            let meshAttachmentProto = ns.MeshAttachment.prototype;
            Object.defineProperty(meshAttachmentProto, "bones", {
                get: function () {
                    return this.getBones();
                }
            });
            Object.defineProperty(meshAttachmentProto, "uvs", {
                get: function () {
                    return this.getUVs();
                }
            });
            Object.defineProperty(meshAttachmentProto, "triangles", {
                get: function () {
                    return this.getTriangles();
                }
            });
            Object.defineProperty(meshAttachmentProto, "vertices", {
                get: function () {
                    let from = this.getVertices();
                    return from;
                }
            });
            Object.defineProperty(meshAttachmentProto, "color", {
                get: function () {
                    return this.getColor();
                }
            });
            Object.defineProperty(meshAttachmentProto, "region", {
                get: function () {
                    return this;
                }
            });
            Object.defineProperty(meshAttachmentProto, "page", {
                get: function () {
                    return this.getPage();
                }
            });
            Object.defineProperty(meshAttachmentProto, "name", {
                get: function () {
                    return this.getName();
                }
            });
            let eventTimelineProto = ns.EventTimeline.prototype;
            Object.defineProperty(eventTimelineProto, "frames", {
                get: function () {
                    return this.getFrames();
                }
            });
            Object.defineProperty(eventTimelineProto, "events", {
                get: function () {
                    return this.getEvents();
                }
            });
            let attachmentTimelineProto = ns.AttachmentTimeline.prototype;
            Object.defineProperty(attachmentTimelineProto, "frames", {
                get: function () {
                    return this.getFrames();
                }
            });
            Object.defineProperty(attachmentTimelineProto, "slotIndex", {
                get: function () {
                    return this.getSlotIndex();
                }
            });
            Object.defineProperty(attachmentTimelineProto, "attachmentNames", {
                get: function () {
                    return this.getAttachmentNames();
                }
            });
            let drawOrderTimelineProto = ns.DrawOrderTimeline.prototype;
            Object.defineProperty(drawOrderTimelineProto, "frames", {
                get: function () {
                    return this.getFrames();
                }
            });
            Object.defineProperty(drawOrderTimelineProto, "drawOrders", {
                get: function () {
                    return this.getDrawOrders();
                }
            });
            let colorTimelineProto = ns.ColorTimeline.prototype;
            Object.defineProperty(colorTimelineProto, "frames", {
                get: function () {
                    return this.getFrames();
                }
            });
            Object.defineProperty(colorTimelineProto, "slotIndex", {
                get: function () {
                    return this.getSlotIndex();
                }
            });
            let trackEntryProto = ns.TrackEntry.prototype;
            Object.defineProperty(trackEntryProto, "loop", {
                get: function () {
                    return this.getLoop();
                }
            });
            Object.defineProperty(trackEntryProto, "animationStart", {
                get: function () {
                    return this.getAnimationStart();
                },
                set: function (value) {
                }
            });
            Object.defineProperty(trackEntryProto, "animationEnd", {
                get: function () {
                    return this.getAnimationEnd();
                }
            });
            Object.defineProperty(trackEntryProto, "animationLast", {
                get: function () {
                    return this.getAnimationLast();
                }
            });
            Object.defineProperty(trackEntryProto, "nextAnimationLast", {
                get: function () {
                    return this.getAnimationLast();
                },
                set: function (value) {
                    this.setNextAnimationLast(value);
                }
            });
            Object.defineProperty(trackEntryProto, "trackTime", {
                get: function () {
                    return this.getTrackTime();
                }
            });
            Object.defineProperty(trackEntryProto, "animation", {
                get: function () {
                    return this.getAnimation();
                }
            });
            let boneProto = ns.Bone.prototype;
            Object.defineProperty(boneProto, "a", {
                get: function () {
                    return this.getA();
                }
            });
            Object.defineProperty(boneProto, "b", {
                get: function () {
                    return this.getB();
                }
            });
            Object.defineProperty(boneProto, "c", {
                get: function () {
                    return this.getC();
                }
            });
            Object.defineProperty(boneProto, "d", {
                get: function () {
                    return this.getD();
                }
            });
            Object.defineProperty(boneProto, "worldX", {
                get: function () {
                    return this.getWorldX();
                }
            });
            Object.defineProperty(boneProto, "worldY", {
                get: function () {
                    return this.getWorldY();
                }
            });
            let eventProto = ns.Event.prototype;
            Object.defineProperty(eventProto, "volume", {
                get: function () {
                    return this.getVolume();
                }
            });
            Object.defineProperty(eventProto, "balance", {
                get: function () {
                    return this.getBalance();
                }
            });
            Object.defineProperty(eventProto, "time", {
                get: function () {
                    return this.getTime();
                }
            });
            Object.defineProperty(eventProto, "data", {
                get: function () {
                    return this.getData();
                }
            });
            Object.defineProperty(eventProto, "floatValue", {
                get: function () {
                    return this.getFloatValue();
                }
            });
            Object.defineProperty(eventProto, "intValue", {
                get: function () {
                    return this.getIntValue();
                }
            });
            Object.defineProperty(eventProto, "stringValue", {
                get: function () {
                    return this.getStringValue();
                }
            });
            let eventDataProto = ns.EventData.prototype;
            Object.defineProperty(eventDataProto, "name", {
                get: function () {
                    return this.getName();
                }
            });
            Object.defineProperty(eventDataProto, "audioPath", {
                get: function () {
                    return this.getAudioPath();
                }
            });
        }
        static bindBuffer(maxNumVertices, maxNumIndices) {
            SpineAdapter._spine.createBuffer(maxNumVertices, maxNumIndices);
            SpineAdapter._vbArray = SpineAdapter._spine.getVertexsBuffer();
            SpineAdapter._ibArray = SpineAdapter._spine.getIndexsBuffer();
        }
        static drawSkeleton(fun, skeleton, twoColorTint, slotRangeStart, slotRangeEnd) {
            SpineAdapter._spine.drawSkeleton(fun, skeleton, twoColorTint, slotRangeStart, slotRangeEnd);
        }
    }
    SpineAdapter.stateMap = { 0: "start", 1: "interrupt", 2: "end", 3: "complete", 4: "dispose", 5: "event" };
    class TextureAtlas {
        constructor(atlasText, textureLoader) {
            return new SpineAdapter._spine.Atlas(atlasText, "", SpineAdapter._spine.TextureLoader.implement({
                load: (page, url) => {
                    let texture = textureLoader(url);
                    page.texture = texture;
                },
                unload: function (s) {
                }
            }), true);
        }
    }
    Laya.Laya.addBeforeInitCallback(SpineAdapter.initialize);

    class SpineNormalRender {
        constructor() {
            this._skinIndex = 0;
        }
        getSpineColor() {
            return this._spineColor;
        }
        destroy() {
            this._renderer.destroy();
            this._renderer = null;
            this._owner._renderElements.length = 0;
        }
        initBake(obj) {
        }
        init(skeleton, templet, renderNode, state) {
            this._renderer = SpineAdapter.createNormalRender(templet);
            this._skeleton = skeleton;
            this._owner = renderNode;
            let scolor = skeleton.color;
            this._spineColor = new Laya.Color(scolor.r, scolor.g, scolor.b, scolor.a);
            let color = renderNode._spriteShaderData.getColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR) || new Laya.Color();
            color.setValue(scolor.r, scolor.g, scolor.b, scolor.a);
            if (renderNode._renderAlpha !== undefined) {
                color.a *= renderNode._renderAlpha;
            }
            else
                color.a *= renderNode.owner.alpha;
            renderNode._spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, color);
            renderNode._spriteShaderData.removeDefine(SpineShaderInit.SPINE_FAST);
            renderNode._spriteShaderData.removeDefine(SpineShaderInit.SPINE_RB);
            renderNode._spriteShaderData.addDefine(SpineShaderInit.SPINE_COLOR2);
        }
        play(animationName) {
        }
        setSkinIndex(index) {
            this._skinIndex = index;
        }
        changeSkeleton(skeleton) {
            this._skeleton = skeleton;
            skeleton.showSkinByIndex(this._skinIndex);
            this._skeleton.setSlotsToSetupPose();
        }
        render(time) {
            this._owner.clear();
            this._renderer.draw(this._skeleton, this._owner, -1, -1);
        }
    }

    class ChangeDeform {
        constructor() {
        }
        apply(frame, vb, slots) {
            if (frame >= this.startFrame) {
                if (this._lastFrame >= this.endFrame && frame >= this.endFrame)
                    return false;
                this._lastFrame = frame;
                return this.updateVB(vb, slots);
            }
            else
                return false;
        }
        initChange(vb) {
            this.sizeMap = vb.slotVBMap.get(this.slotId);
            return true;
        }
        updateVB(vb, slots) {
            if (!this.sizeMap) {
                this.sizeMap = vb.slotVBMap.get(this.slotId);
                if (!this.sizeMap) {
                    return false;
                }
            }
            let slot = slots[this.slotId];
            if (slot.attachment) {
                let deform = slot.deform;
                if (!deform || !deform.length) {
                    return false;
                }
                let vertexSize = vb.vertexSize;
                let attachmentPos = this.sizeMap.get(slot.attachment.name);
                let offset = attachmentPos.offset * vertexSize;
                let vbData = vb.vb;
                let attachmentParse = attachmentPos.attachment;
                vb.appendDeform(attachmentParse, deform, offset, vbData);
            }
            return true;
        }
        clone() {
            let out = new ChangeDeform;
            out.slotId = this.slotId;
            out.startFrame = this.startFrame;
            out.endFrame = this.endFrame;
            return out;
        }
    }

    class ChangeDrawOrder {
        changeOrder(attachMap) {
            return this.order;
        }
        change(vb, slotAttachMap) {
            return true;
        }
    }

    class ChangeRGBA {
        constructor(slotId) {
            this.slotId = slotId;
        }
        apply(frame, vb, slots) {
            this.updateVB(vb, slots);
            return frame >= this.startFrame;
        }
        initChange(vb) {
            this.sizeMap = vb.slotVBMap.get(this.slotId);
            return true;
        }
        updateVB(vb, slots) {
            if (!this.sizeMap) {
                this.sizeMap = vb.slotVBMap.get(this.slotId);
                if (!this.sizeMap) {
                    return false;
                }
            }
            let slot = slots[this.slotId];
            let color = slot.color;
            if (slot.attachment) {
                let vertexSize = vb.vertexSize;
                let attachmentPos = this.sizeMap.get(slot.attachment.name);
                let vbData = vb.vb;
                let offset = attachmentPos.offset * vertexSize;
                let attachment = attachmentPos.attachment;
                let r, g, b, a;
                let attachmentColor = attachment.lightColor;
                let twoColorTint = vb.twoColorTint;
                let colorElement = vb.vertexDeclaration.getVertexElementByUsage(1);
                let cOffset = colorElement.offset / 4;
                let c2Offset = 0;
                if (twoColorTint) {
                    let color2Element = vb.vertexDeclaration.getVertexElementByUsage(11);
                    c2Offset = color2Element.offset / 4;
                }
                if (!attachmentColor) {
                    r = color.r;
                    g = color.g;
                    b = color.b;
                    a = color.a;
                }
                else {
                    r = color.r * attachmentColor.r;
                    g = color.g * attachmentColor.g;
                    b = color.b * attachmentColor.b;
                    a = color.a * attachmentColor.a;
                }
                let darkColor = slot.darkColor;
                let darkColorR = 0, darkColorG = 0, darkColorB = 0, darkColorA = 1;
                if (darkColor) {
                    darkColorR = darkColor.r;
                    darkColorG = darkColor.g;
                    darkColorB = darkColor.b;
                    darkColorA = darkColor.a;
                }
                let n = attachment.vertexCount;
                for (let i = 0; i < n; i++) {
                    let co = offset + i * vertexSize + cOffset;
                    vbData[co] = r;
                    vbData[co + 1] = g;
                    vbData[co + 2] = b;
                    vbData[co + 3] = a;
                    if (twoColorTint) {
                        let c2o = offset + i * vertexSize + c2Offset;
                        vbData[c2o] = darkColorR;
                        vbData[c2o + 1] = darkColorG;
                        vbData[c2o + 2] = darkColorB;
                        vbData[c2o + 3] = darkColorA;
                    }
                }
            }
            return true;
        }
        clone() {
            let out = new ChangeRGBA(this.slotId);
            out.startFrame = this.startFrame;
            out.endFrame = this.endFrame;
            return out;
        }
    }

    class ChangeSlot {
        change(vb, slotAttachMap) {
            let map = slotAttachMap.get(this.slotId);
            let attachmentParse = map.get(this.attachment);
            if (attachmentParse) {
                vb.appendVB(attachmentParse);
            }
            else {
                attachmentParse = map.get(null);
            }
            this.attachmentParse = attachmentParse;
            return !this.attachmentParse.isClip;
        }
        changeOrder(attachMap) {
            attachMap[this.slotId] = this.attachmentParse;
            return null;
        }
    }

    const step = 1 / 30;
    class AnimationRender {
        static getFloat32Array(bone) {
            let rs = new Float32Array(8);
            rs[0] = bone.a;
            rs[1] = bone.b;
            rs[2] = bone.worldX;
            rs[3] = 0;
            rs[4] = bone.c;
            rs[5] = bone.d;
            rs[6] = bone.worldY;
            rs[7] = 0;
            return rs;
        }
        constructor() {
            this.isDynamic = false;
            this.changeMap = new Map();
            this.frames = [];
            this.skinDataArray = [];
            this.boneFrames = [];
            this.eventsFrames = [];
        }
        getFrameIndex(time, frameIndex) {
            let frames = this.frames;
            let n = frames.length;
            for (let i = 1; i < n; i++)
                if (frames[i] > time)
                    return i - 1;
            return n - 1;
        }
        cacheBones(preRender) {
            let duration = preRender._play(this.name);
            let totalFrame = Math.round(duration / step) || 1;
            for (let i = 0; i <= totalFrame; i++) {
                let bones = preRender._updateState(i == 0 ? 0 : step);
                let frame = [];
                this.boneFrames.push(frame);
                for (let j = 0; j < bones.length; j++) {
                    let bone = bones[j];
                    let rs = AnimationRender.getFloat32Array(bone);
                    frame.push(rs);
                }
            }
        }
        check(animation, preRender) {
            this.name = animation.name;
            let timeline = animation.timelines;
            let changeMap = this.changeMap;
            let renderFrames = this.frames;
            let hasClip = false;
            renderFrames.push(0);
            changeMap.set(0, {});
            for (let i = 0, n = timeline.length; i < n; i++) {
                let time = timeline[i];
                let frames = time.frames;
                if (time instanceof spine.AttachmentTimeline) {
                    let attachmentNames = time.attachmentNames;
                    let slotIndex = time.slotIndex;
                    for (let j = 0, m = frames.length; j < m; j++) {
                        let frame = frames[j];
                        let change = new ChangeSlot();
                        change.slotId = slotIndex;
                        change.attachment = attachmentNames[j] || null;
                        let changeItem = changeMap.get(frame);
                        if (!changeItem) {
                            this.frames.indexOf(frame) == -1 && this.frames.push(frame);
                            changeItem = {
                                iChanges: []
                            };
                            changeMap.set(frame, changeItem);
                        }
                        let arr = changeItem.iChanges = changeItem.iChanges || [];
                        arr.push(change);
                    }
                }
                else if (time instanceof spine.DrawOrderTimeline) {
                    let orders = time.drawOrders;
                    for (let j = 0, m = frames.length; j < m; j++) {
                        let frame = frames[j];
                        let change = new ChangeDrawOrder();
                        change.order = orders[j];
                        let changeItem = changeMap.get(frame);
                        if (!changeItem) {
                            this.frames.indexOf(frame) == -1 && this.frames.push(frame);
                            changeItem = {
                                iChanges: []
                            };
                            changeMap.set(frame, changeItem);
                        }
                        let arr = changeItem.iChanges = changeItem.iChanges || [];
                        arr.push(change);
                    }
                }
                else if (time instanceof (spine.ColorTimeline || spine.RGBATimeline) || (spine.TwoColorTimeline && time instanceof spine.TwoColorTimeline)) {
                    let rgba = time;
                    let slotIndex = rgba.slotIndex;
                    if (frames.length == 5 && frames[0] == 0 && frames[4] == 0) {
                        let change = new ChangeSlot();
                        change.slotId = slotIndex;
                        change.attachment = null;
                        let frame = 0;
                        let changeItem = changeMap.get(frame);
                        if (!changeItem) {
                            this.frames.indexOf(frame) == -1 && this.frames.push(frame);
                            changeItem = {
                                iChanges: []
                            };
                            changeMap.set(frame, changeItem);
                        }
                        let arr = changeItem.iChanges = changeItem.iChanges || [];
                        arr.push(change);
                    }
                    else {
                        let changeRGBA = new ChangeRGBA(slotIndex);
                        let startFrame = frames[0];
                        let num = frames.length / 5 | 0;
                        let endFrame = frames[(num - 1) * 5];
                        changeRGBA.startFrame = startFrame;
                        changeRGBA.endFrame = endFrame;
                        let changeItem = changeMap.get(startFrame);
                        if (!changeItem) {
                            this.frames.indexOf(startFrame) == -1 && this.frames.push(startFrame);
                            changeItem = {
                                vChanges: []
                            };
                            changeMap.set(startFrame, changeItem);
                        }
                        this.frames.indexOf(endFrame) == -1 && this.frames.push(endFrame);
                        let arr = changeItem.vChanges = changeItem.vChanges || [];
                        arr.push(changeRGBA);
                    }
                }
                else if (time instanceof window.spine.ClippingAttachment) {
                    hasClip = true;
                }
                else if (time instanceof window.spine.EventTimeline) {
                    if (preRender.canCache) {
                        let eventTime = time;
                        let events = eventTime.events;
                        for (let j = 0, m = frames.length; j < m; j++) {
                            let frame = frames[j];
                            let event = events[j];
                            let arr = this.eventsFrames[Math.round(frame / step)] = this.eventsFrames[frame] || [];
                            arr.push(event);
                        }
                    }
                }
                else if (time instanceof spine.DeformTimeline) {
                    let slotIndex = time.slotIndex;
                    let change = new ChangeDeform();
                    change.slotId = slotIndex;
                    let startFrame = frames[0];
                    let endFrame = frames[frames.length - 1];
                    change.startFrame = startFrame;
                    change.endFrame = endFrame;
                    let changeItem = changeMap.get(startFrame);
                    if (!changeItem) {
                        this.frames.indexOf(startFrame) == -1 && this.frames.push(startFrame);
                        changeItem = {
                            vChanges: []
                        };
                        changeMap.set(startFrame, changeItem);
                    }
                    this.frames.indexOf(endFrame) == -1 && this.frames.push(endFrame);
                    let arr = changeItem.vChanges = changeItem.vChanges || [];
                    arr.push(change);
                }
                else ;
            }
            this.isDynamic = !!changeMap.size;
            renderFrames.sort();
            if (!hasClip) {
                if (preRender.canCache) {
                    this.cacheBones(preRender);
                    this.isCache = true;
                }
            }
            this.frameNumber = renderFrames.length;
        }
        createSkinData(mainVB, mainIB, tempIbCreate, slotAttachMap, attachMap, type) {
            let skinData = new SkinAniRenderData();
            skinData.type = type;
            let frames = this.frames;
            skinData.init(this.changeMap, mainVB, mainIB, tempIbCreate, frames, slotAttachMap, attachMap, this.isDynamic);
            skinData.updateBoneMat = this.isCache ? (this.eventsFrames.length == 0 ? skinData.updateBoneMatCache : skinData.updateBoneMatCacheEvent) : skinData.updateBoneMatByBone;
            this.skinDataArray.push(skinData);
            return skinData;
        }
        destroy() {
            for (let i = 0, n = this.skinDataArray.length; i < n; i++)
                this.skinDataArray[i].destroy();
            this.skinDataArray.length = 0;
            this.frames.length = 0;
            this.changeMap.clear();
        }
    }
    class SkinAniRenderData {
        constructor() {
            this.maxVertexCount = 0;
            this.maxIndexCount = 0;
            this.isDynamic = false;
            this.renderDatas = [];
        }
        getMesh() {
            return this._defaultMesh;
        }
        getFrameData(frameIndex) {
            return this.renderDatas[frameIndex] || this._defaultFrameData;
        }
        updateBoneMatCache(delta, animation, bones, state, boneMat, ofx = 0, ofy = 0) {
            this.vb.updateBoneCache(animation.boneFrames, delta / step, boneMat, ofx, ofy);
        }
        updateBoneMatCacheEvent(delta, animation, bones, state, boneMat) {
            let f = delta / step;
            this.vb.updateBoneCache(animation.boneFrames, f, boneMat);
            let currFrame = Math.round(f);
            let curentTrack = state.currentTrack;
            let lastEventFrame = curentTrack.lastEventFrame;
            if (lastEventFrame == currFrame) {
                return;
            }
            if (lastEventFrame > currFrame || lastEventFrame == undefined) {
                lastEventFrame = -1;
            }
            if (currFrame - lastEventFrame <= 1) {
                let events = animation.eventsFrames[currFrame];
                if (events) {
                    for (let i = 0, n = events.length; i < n; i++) {
                        state.dispatchEvent(null, "event", events[i]);
                    }
                }
            }
            else {
                for (let i = lastEventFrame + 1; i <= currFrame; i++) {
                    let events = animation.eventsFrames[i];
                    if (events) {
                        for (let j = 0, m = events.length; j < m; j++) {
                            state.dispatchEvent(null, "event", events[j]);
                        }
                    }
                }
            }
            curentTrack.lastEventFrame = currFrame;
        }
        updateBoneMatByBone(delta, animation, bones, state, boneMat, ofx = 0, ofy = 0) {
            this.vb.updateBone(bones, boneMat, ofx, ofy);
        }
        init(changeMap, mainVB, ibCreator, tempCreator, frames, slotAttachMap, attachMap, isDynamic) {
            this.mainIB = ibCreator;
            this.isDynamic = isDynamic;
            this.canInstance = !this.isDynamic;
            if (isDynamic) {
                this.vb = mainVB.clone();
                this.vb.initBoneMat();
                let tAttachMap = attachMap.slice();
                let framesLength = frames.length;
                let order;
                for (let i = 0; i < framesLength; i++) {
                    let frame = frames[i];
                    let fcs = changeMap.get(frame);
                    if (!fcs)
                        continue;
                    let iChanges = fcs.iChanges;
                    let data = {};
                    if (iChanges) {
                        for (let j = 0, m = iChanges.length; j < m; j++) {
                            let ichange = iChanges[j];
                            if (!ichange.change(this.vb, slotAttachMap)) {
                                this.isNormalRender = true;
                            }
                            let newOrder = ichange.changeOrder(tAttachMap);
                            if (newOrder) {
                                order = newOrder;
                            }
                        }
                        tempCreator.createIB(tAttachMap, this.vb, order);
                        data.ib = tempCreator.ib.slice(0, tempCreator.ibLength);
                        data.mulitRenderData = tempCreator.outRenderData;
                        data.type = tempCreator.type;
                        data.size = tempCreator.size;
                    }
                    let vChanges = fcs.vChanges;
                    if (vChanges) {
                        let myChangeVB = [];
                        for (let j = 0, m = vChanges.length; j < m; j++) {
                            let changeVBItem = vChanges[j].clone();
                            if (changeVBItem.initChange(this.vb)) {
                                changeVBItem.startFrame = i;
                                changeVBItem.endFrame = frames.indexOf(changeVBItem.endFrame);
                                myChangeVB.push(changeVBItem);
                            }
                        }
                        data.vChanges = myChangeVB;
                    }
                    this.renderDatas.push(data);
                    if (!frame) {
                        if (!data.ib) {
                            data.mulitRenderData = ibCreator.outRenderData;
                            data.ib = ibCreator.ib.slice(0, this.mainIB.ibLength);
                            data.type = ibCreator.type;
                            data.size = ibCreator.size;
                        }
                        this._defaultFrameData = data;
                    }
                }
                this.maxIndexCount = Math.max(tempCreator.maxIndexCount, this.mainIB.maxIndexCount);
            }
            else {
                this.vb = mainVB;
                this._defaultMesh = SpineMeshUtils.createMesh(this.type, this.vb, ibCreator, this.isDynamic);
                this._defaultMesh._addReference();
                this.maxIndexCount = ibCreator.maxIndexCount;
            }
            this.maxVertexCount = this.vb.maxVertexCount;
            if (!this._defaultFrameData) {
                this._defaultFrameData = {
                    mulitRenderData: ibCreator.outRenderData,
                    ib: ibCreator.ib.slice(0, this.mainIB.ibLength),
                    type: ibCreator.type,
                    size: ibCreator.size
                };
            }
        }
        destroy() {
            this._defaultMesh && this._defaultMesh.destroy();
            this._defaultMesh = null;
            this._defaultFrameData = null;
            this.renderDatas = null;
        }
    }

    class SpineOptimizeConst {
    }
    SpineOptimizeConst.BONEVERTEX = 22;
    SpineOptimizeConst.RIGIDBODYVERTEX = 9;

    const QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
    class AttachmentParse {
        constructor() {
            this.vertexCount = 0;
            this.indexCount = 0;
            this.isNormalRender = false;
            this.vertexBones = 0;
        }
        init(attachment, boneIndex, slotId, deform, slot) {
            this.slotId = slotId;
            this.sourceData = attachment;
            this.attachment = attachment.name;
            this.boneIndex = boneIndex;
            let slotColor = slot.color;
            this.blendMode = slot.blendMode;
            let color = this.color = new Laya.Color();
            let attchmentColor;
            let darkColor = slot.darkColor;
            if (attachment instanceof spine.RegionAttachment) {
                attchmentColor = attachment.color;
                let region = attachment;
                this.vertexArray = region.offset;
                this.stride = 2;
                this.indexArray = QUAD_TRIANGLES;
                this.uvs = region.uvs;
                this.textureName = region.region.page.name;
            }
            else if (attachment instanceof spine.MeshAttachment) {
                attchmentColor = attachment.color;
                let vside = SpineOptimizeConst.BONEVERTEX;
                let mesh = attachment;
                this.textureName = mesh.region.page.name;
                if (!mesh.bones || mesh.bones.length == 0) {
                    if (deform && deform.length > 1) {
                        this.vertexArray = new Float32Array(deform);
                    }
                    else {
                        this.vertexArray = mesh.vertices;
                    }
                    this.stride = 2;
                    this.indexArray = mesh.triangles;
                    this.uvs = mesh.uvs;
                }
                else {
                    if (deform && deform.length > 1) {
                        debugger;
                    }
                    this.stride = vside - 6;
                    let vertexSize = mesh.uvs.length / 2;
                    let vertexArray = this.vertexArray = new Float32Array(vertexSize * this.stride);
                    this.indexArray = mesh.triangles;
                    this.uvs = mesh.uvs;
                    let vertices = mesh.vertices;
                    let bones = mesh.bones;
                    let v = 0;
                    let needPoint = (vside - 6) / 4;
                    this.vertexBones = needPoint;
                    for (let w = 0, b = 0; w < vertexSize; w++) {
                        let n = bones[v++];
                        n += v;
                        let result = [];
                        let offset = w * this.stride;
                        let nid = 0;
                        for (; v < n; v++, b += 3, nid++) {
                            result.push([vertices[b], vertices[b + 1], vertices[b + 2], bones[v]]);
                        }
                        if (result.length > needPoint) {
                            this.vertexBones = Math.max(this.vertexBones, result.length);
                            result.length = needPoint;
                            this.isNormalRender = true;
                        }
                        for (let i = 0; i < needPoint; i++) {
                            let v = result[i];
                            if (!v)
                                continue;
                            vertexArray[offset + i * 4] = v[0];
                            vertexArray[offset + i * 4 + 1] = v[1];
                            vertexArray[offset + i * 4 + 2] = v[2];
                            vertexArray[offset + i * 4 + 3] = v[3];
                        }
                    }
                }
            }
            else if (attachment instanceof spine.ClippingAttachment) {
                this.attachment = null;
                this.isClip = true;
            }
            else if (attachment instanceof spine.PathAttachment) {
                this.attachment = attachment.name;
                this.vertexArray = new Float32Array(attachment.vertices);
                this.isPath = true;
            }
            else {
                this.attachment = null;
            }
            if (this.textureName) {
                this.vertexCount = this.vertexArray.length / this.stride;
                this.indexCount = this.indexArray.length;
            }
            if (attchmentColor) {
                this.lightColor = attchmentColor;
                color.r = slotColor.r * attchmentColor.r;
                color.g = slotColor.g * attchmentColor.g;
                color.b = slotColor.b * attchmentColor.b;
                color.a = slotColor.a * attchmentColor.a;
            }
            this.darkColor = darkColor;
            return true;
        }
    }

    class MultiRenderData {
        constructor() {
            this.renderData = [];
            this.id = MultiRenderData.ID++;
        }
        addData(textureName, blendMode, offset, length, attachment) {
            this.currentData = { textureName: textureName, blendMode, offset, length, attachment };
            this.renderData.push(this.currentData);
        }
        endData(length) {
            this.currentData.length = length - this.currentData.offset;
        }
    }
    MultiRenderData.ID = 0;

    class IBCreator {
        constructor() {
            this.ibLength = 0;
            this.maxIndexCount = 0;
        }
        updateFormat(vertexCount) {
            let ntype = SpineMeshUtils.getIndexFormat(vertexCount);
            if (this.type === ntype)
                return;
            this.type = ntype;
            this._updateBuffer();
        }
        setBufferLength(maxIndexCount) {
            if (maxIndexCount <= this.maxIndexCount)
                return;
            this.maxIndexCount = maxIndexCount;
            this._updateBuffer();
        }
        _updateBuffer() {
            let oldbuffer = this.ib;
            switch (this.type) {
                case Laya.IndexFormat.UInt16:
                    this.size = 2;
                    this.ib = new Uint16Array(this.maxIndexCount);
                    break;
                case Laya.IndexFormat.UInt8:
                    this.size = 1;
                    this.ib = new Uint8Array(this.maxIndexCount);
                    break;
                case Laya.IndexFormat.UInt32:
                    this.size = 4;
                    this.ib = new Uint32Array(this.maxIndexCount);
                    break;
            }
            if (oldbuffer)
                this.ib.set(oldbuffer);
        }
        createIB(attachs, vbCreator, order) {
            let offset = 0;
            let slotVBMap = vbCreator.slotVBMap;
            let drawOrder;
            let getAttach;
            if (order) {
                drawOrder = order;
                getAttach = function (value) {
                    return attachs[value];
                };
            }
            else {
                drawOrder = attachs;
                getAttach = function (value) {
                    return value;
                };
            }
            let outRenderData = new MultiRenderData();
            let texture;
            let blend;
            let uploadData = [];
            let end = -1;
            for (let i = 0, n = drawOrder.length; i < n; i++) {
                let attach = getAttach(drawOrder[i]);
                if (attach.attachment && !attach.isPath) {
                    let needAdd = false;
                    if (texture != attach.textureName) {
                        texture = attach.textureName;
                        needAdd = true;
                    }
                    if (blend != attach.blendMode) {
                        blend = attach.blendMode;
                        needAdd = true;
                    }
                    if (needAdd) {
                        if (outRenderData.currentData) {
                            outRenderData.endData(offset);
                        }
                        outRenderData.addData(attach.textureName, attach.blendMode, offset, 0, attach.attachment);
                    }
                    let attachPos = slotVBMap.get(attach.slotId).get(attach.attachment);
                    if (attach.attachment && attach.indexArray) {
                        uploadData.push({
                            data: attach.indexArray,
                            offset: attachPos.offset,
                            start: offset
                        });
                        offset += attach.indexArray.length;
                        end = Math.max(end, offset);
                    }
                }
            }
            let vertexCount = vbCreator.maxVertexCount;
            let ntype = SpineMeshUtils.getIndexFormat(vertexCount);
            let needUpdateBuffer = false;
            if (ntype !== this.type) {
                this.type = ntype;
                needUpdateBuffer = true;
            }
            if (end > this.maxIndexCount) {
                this.maxIndexCount = end;
                needUpdateBuffer = true;
            }
            needUpdateBuffer && this._updateBuffer();
            let ib = this.ib;
            for (let i = 0, len = uploadData.length; i < len; i++) {
                let upload = uploadData[i];
                let offset = upload.offset;
                let start = upload.start;
                for (let j = 0, n = upload.data.length; j < n; j++) {
                    ib[start + j] = upload.data[j] + offset;
                }
            }
            if (texture) {
                outRenderData.endData(offset);
            }
            this.outRenderData = outRenderData;
            this.ibLength = offset;
        }
    }

    class SlotUtils {
        static checkAttachment(attachment) {
            if (attachment == null)
                return exports.ESpineRenderType.rigidBody;
            if (attachment instanceof window.spine.RegionAttachment) {
                return exports.ESpineRenderType.rigidBody;
            }
            else if (attachment instanceof window.spine.MeshAttachment) {
                let mesh = attachment;
                if (!mesh.bones) {
                    return exports.ESpineRenderType.rigidBody;
                }
                else {
                    return exports.ESpineRenderType.boneGPU;
                }
            }
            else {
                return exports.ESpineRenderType.normal;
            }
        }
        static appendIndexArray(attachmentParse, indexArray, size, offset) {
            if (!attachmentParse.attachment || !attachmentParse.indexArray)
                return offset;
            let slotindexArray = attachmentParse.indexArray;
            for (let j = 0, n = slotindexArray.length; j < n; j++) {
                indexArray[offset] = slotindexArray[j] + size;
                offset++;
            }
            return offset;
        }
    }

    class AnimationRenderProxy {
        constructor(animator) {
            this.animator = animator;
            this.reset();
        }
        set skinIndex(value) {
            this.currentSKin = this.animator.skinDataArray[value];
        }
        get name() {
            return this.animator.name;
        }
        reset() {
            this.currentTime = -1;
            this.currentFrameIndex = -1;
        }
        renderWithOutMat(slots, updator, curTime) {
            let beforeFrame = this.currentFrameIndex;
            let nowFrame = this.animator.getFrameIndex(curTime, beforeFrame);
            updator.renderUpdate(this.currentSKin, nowFrame, beforeFrame);
            this.currentTime = curTime;
            this.currentFrameIndex = nowFrame;
        }
        render(bones, slots, updator, curTime, boneMat, ofx, ofy) {
            this.renderWithOutMat(slots, updator, curTime);
            this.currentSKin.updateBoneMat(curTime, this.animator, bones, this.state, boneMat, ofx, ofy);
        }
    }

    class SkinRenderUpdate {
        constructor(owner, skinAttach) {
            this.currentMaterials = [];
            this.cacheMaterials = [];
            this.vChanges = [];
            this.vertexBones = 0;
            this.owner = owner;
            this.name = skinAttach.name;
            this.hasNormalRender = skinAttach.hasNormalRender;
            this.vertexBones = skinAttach.vertexBones;
            this.skinAttachType = skinAttach.type;
        }
        getMaterialByName(name, blendMode) {
            return this.templet.getMaterial(this.templet.getTexture(name), blendMode);
        }
        renderUpdate(skindata, frame, lastFrame) {
            const renderNode = this.owner._nodeOwner;
            let needUpdate = false;
            if (skindata.isDynamic) {
                needUpdate = this.updateDynamicRender(skindata, frame, lastFrame, renderNode);
            }
            else {
                needUpdate = this.handleRender(skindata, frame, renderNode, skindata.getMesh());
            }
            if (needUpdate)
                renderNode._updateRenderElements();
        }
        updateDynamicRender(skindata, frame, lastFrame, renderNode) {
            let mesh = this.owner.getDynamicMesh(skindata.vb.vertexDeclaration);
            let currentChanges = this.vChanges;
            let frameData = skindata.getFrameData(frame);
            let isFirst = frame < 0;
            let needUpload = false;
            if (isFirst) {
                this._resetVertexBuffset(skindata);
                currentChanges.length = 0;
            }
            for (let f = lastFrame + 1; f <= frame; f++) {
                let frameData = skindata.getFrameData(f);
                let frameChanges = frameData.vChanges;
                if (frameChanges) {
                    for (const change of frameChanges) {
                        if (!currentChanges.includes(change)) {
                            currentChanges.push(change);
                        }
                    }
                }
            }
            for (let i = currentChanges.length - 1; i >= 0; i--) {
                let change = currentChanges[i];
                if (change.apply(frame, skindata.vb, this.owner._skeleton.slots)) {
                    needUpload = true;
                }
                else {
                    currentChanges.splice(i, 1);
                }
            }
            if (needUpload || isFirst) {
                this.uploadVertexBuffer(skindata.vb, mesh);
            }
            if (frameData.ib || isFirst) {
                this.uploadIndexBuffer(frameData, mesh);
            }
            let needUpdateMesh = SpineMeshUtils._updateSpineSubMesh(mesh, frameData);
            return this.handleRender(skindata, frame, renderNode, mesh, needUpdateMesh);
        }
        handleRender(skindata, frame, renderNode, mesh, forceUpdateMesh = false) {
            let frameData = skindata.getFrameData(frame);
            let needUpdate = false;
            let mulitRenderData = frameData.mulitRenderData;
            if (mulitRenderData) {
                let mats = this.cacheMaterials[mulitRenderData.id] || this.createMaterials(mulitRenderData);
                if (this.currentMaterials !== mats) {
                    renderNode._updateMaterials(mats);
                    needUpdate = true;
                    this.currentMaterials = mats;
                }
            }
            return !renderNode._onMeshChange(mesh, forceUpdateMesh) || needUpdate;
        }
        createMaterials(mulitRenderData) {
            let mats = mulitRenderData.renderData.map(data => this.getMaterialByName(data.textureName, data.blendMode));
            this.cacheMaterials[mulitRenderData.id] = mats;
            return mats;
        }
        uploadIndexBuffer(frameData, mesh) {
            let indexData = frameData.ib;
            let indexbuffer = mesh._indexBuffer;
            indexbuffer.indexType = frameData.type;
            indexbuffer.indexCount = indexData.length;
            indexbuffer._setIndexDataLength(indexData.byteLength);
            indexbuffer._setIndexData(indexData, 0);
        }
        uploadVertexBuffer(vbCreator, mesh) {
            let vertexBuffer = mesh.vertexBuffers[0];
            let vblen = vbCreator.vbLength * 4;
            vertexBuffer.setDataLength(vbCreator.maxVertexCount * vbCreator.vertexSize * 4);
            vertexBuffer.setData(vbCreator.vb.buffer, 0, 0, vblen);
        }
        init(skeleton, templet, renderNode) {
            this.templet = templet;
            if (this.hasNormalRender) {
                this._renderer = SpineAdapter.createNormalRender(templet);
            }
        }
        render(time) {
        }
        _resetVertexBuffset(skindata) {
            let slots = this.owner._skeleton.slots;
            let map = skindata.vb.slotVBMap;
            let renderDatas = skindata.renderDatas;
            let resetSlots = new Set();
            renderDatas.forEach(data => {
                if (data.vChanges) {
                    for (const change of data.vChanges) {
                        resetSlots.add(change.slotId);
                    }
                }
            });
            resetSlots.forEach(slotId => {
                var _a;
                let slot = slots[slotId];
                if (slot && slot.attachment) {
                    let attach = (_a = map.get(slotId)) === null || _a === void 0 ? void 0 : _a.get(slot.attachment.name);
                    if (attach) {
                        skindata.vb.resetVB(attach.attachment);
                    }
                }
            });
        }
        destroy() {
            if (this.hasNormalRender) {
                this._renderer.destroy();
            }
        }
    }

    class SpineOptimizeRender {
        constructor(spineOptimize) {
            this._skinIndex = 0;
            this.renderProxyMap = new Map();
            this._dynamicMap = new Map;
            this.animatorMap = new Map();
            this.skinRenderArray = [];
            this.boneMat = new Float32Array(spineOptimize.maxBoneNumber * 8);
            spineOptimize.skinAttachArray.forEach((value) => {
                this.skinRenderArray.push(new SkinRenderUpdate(this, value));
            });
            let animators = spineOptimize.animators;
            for (let i = 0, n = animators.length; i < n; i++) {
                let animator = animators[i];
                this.animatorMap.set(animator.name, new AnimationRenderProxy(animator));
            }
            this.currentRender = this.skinRenderArray[this._skinIndex];
        }
        getSpineColor() {
            return this.spineColor;
        }
        destroy() {
            this.skinRenderArray.forEach(skin => skin.destroy());
            this._dynamicMap.forEach(mesh => mesh.destroy());
            this._dynamicMap.clear();
            this._nodeOwner._onMeshChange(null);
        }
        initBake(obj) {
            this.bakeData = obj;
            if (obj) {
                let render = this.renderProxyMap.get(ERenderProxyType.RenderBake) || new RenderBake(this._nodeOwner);
                render.simpleAnimatorTexture = obj.texture2d;
                render._bonesNums = obj.bonesNums;
                render.aniOffsetMap = obj.aniOffsetMap;
                this.renderProxyMap.set(ERenderProxyType.RenderBake, render);
            }
            this.isBake = !!obj;
            if (this._curAnimationName) {
                this._clear();
                this.play(this._curAnimationName);
            }
        }
        changeSkeleton(skeleton) {
            this._skeleton = skeleton;
            this.renderProxyMap.forEach(render => {
                render.changeSkeleton(skeleton);
            });
            skeleton.showSkinByIndex(this._skinIndex);
            this._skeleton.setSlotsToSetupPose();
        }
        init(skeleton, templet, renderNode, state) {
            this._skeleton = skeleton;
            this._nodeOwner = renderNode;
            let scolor = skeleton.color;
            this.spineColor = new Laya.Color(scolor.r, scolor.g, scolor.b, scolor.a);
            let color = renderNode._spriteShaderData.getColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR) || new Laya.Color();
            color.setValue(scolor.r, scolor.g, scolor.b, scolor.a);
            if (renderNode._renderAlpha !== undefined) {
                color.a *= renderNode._renderAlpha;
            }
            else
                color.a *= renderNode.owner.alpha;
            renderNode._spriteShaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, color);
            this.skinRenderArray.forEach((value) => {
                value.init(skeleton, templet, renderNode);
            });
            this._state = state;
            this.animatorMap.forEach((value, key) => {
                value.state = state;
            });
            let renderOptimize = new RenderOptimize(this._nodeOwner);
            let renderNormal = new RenderNormal(this._nodeOwner);
            this.renderProxyMap.set(ERenderProxyType.RenderNormal, renderNormal);
            this.renderProxyMap.set(ERenderProxyType.RenderOptimize, renderOptimize);
        }
        get renderProxytype() {
            return this._renderProxytype;
        }
        set renderProxytype(value) {
            if (this.isBake && value == ERenderProxyType.RenderOptimize) {
                if (this.bakeData.aniOffsetMap[this._curAnimationName] != undefined) {
                    value = ERenderProxyType.RenderBake;
                }
            }
            this.renderProxy = this.renderProxyMap.get(value);
            if (value == ERenderProxyType.RenderNormal) {
                this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_FAST);
                this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_RB);
            }
            this._renderProxytype = value;
        }
        beginCache() {
            this._state.apply = this._state.applyCache;
            this._state.getCurrentPlayTime = this._state.getCurrentPlayTimeByCache;
            this._skeleton.updateWorldTransform = this._skeleton.updateWorldTransformCache;
        }
        endCache() {
            this._state.apply = this._state.oldApply;
            this._state.getCurrentPlayTime = this._state.getCurrentPlayTimeOld;
            this._skeleton.updateWorldTransform = this._skeleton.oldUpdateWorldTransform;
        }
        setSkinIndex(index) {
            this._skinIndex = index;
            this.currentRender = this.skinRenderArray[index];
            switch (this.currentRender.skinAttachType) {
                case exports.ESpineRenderType.boneGPU:
                    this._nodeOwner._spriteShaderData.addDefine(SpineShaderInit.SPINE_FAST);
                    this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_RB);
                    break;
                case exports.ESpineRenderType.rigidBody:
                    this._nodeOwner._spriteShaderData.addDefine(SpineShaderInit.SPINE_RB);
                    this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_FAST);
                    break;
                case exports.ESpineRenderType.normal:
                    this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_FAST);
                    this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_RB);
                    break;
            }
            if (this.currentAnimation) {
                this._clear();
                this.play(this._curAnimationName);
            }
        }
        getDynamicMesh(vertexDeclaration, create = true) {
            let id = vertexDeclaration.id;
            let mesh = this._dynamicMap.get(id);
            if (!mesh && create) {
                mesh = SpineMeshUtils.createMeshDynamic(vertexDeclaration);
                mesh._addReference();
                this._dynamicMap.set(id, mesh);
            }
            return mesh;
        }
        _clear() {
            this._nodeOwner.clear();
            this._isRender = false;
        }
        play(animationName) {
            this._curAnimationName = animationName;
            let currentRender = this.currentRender;
            let oldRenderProxy = this.renderProxy;
            let old = this.currentAnimation;
            let oldSkinData = old ? old.currentSKin : null;
            let currentAnimation = this.currentAnimation = this.animatorMap.get(animationName);
            currentAnimation.skinIndex = this._skinIndex;
            let currentSKin = currentAnimation.currentSKin;
            if (old) {
                old.reset();
            }
            if (currentSKin.isNormalRender) {
                this.renderProxytype = ERenderProxyType.RenderNormal;
            }
            else {
                if (currentRender.vertexBones > 4) {
                    console.warn(`In FastRender mode - Current skin: ${currentRender.name} has ${currentRender.vertexBones} bones influencing each vertex. This exceeds the recommended limit of 4 bones per vertex.`);
                }
                switch (this.currentRender.skinAttachType) {
                    case exports.ESpineRenderType.boneGPU:
                        this._nodeOwner._spriteShaderData.addDefine(SpineShaderInit.SPINE_FAST);
                        this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_RB);
                        break;
                    case exports.ESpineRenderType.rigidBody:
                        this._nodeOwner._spriteShaderData.addDefine(SpineShaderInit.SPINE_RB);
                        this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_FAST);
                        break;
                    case exports.ESpineRenderType.normal:
                        this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_FAST);
                        this._nodeOwner._spriteShaderData.removeDefine(SpineShaderInit.SPINE_RB);
                        break;
                }
                if (old && oldSkinData.isNormalRender) {
                    this._clear();
                }
                if (oldSkinData != currentSKin || !this._nodeOwner._mesh) {
                    currentRender.renderUpdate(currentSKin, -1, 0);
                }
                if (this._isRender) ;
                else {
                    this.renderProxytype = ERenderProxyType.RenderOptimize;
                    this._isRender = true;
                }
            }
            if (oldRenderProxy) {
                oldRenderProxy.leave();
            }
            this.renderProxy.change(currentRender, currentAnimation);
            if ((currentAnimation.animator.isCache || this.renderProxytype == ERenderProxyType.RenderBake) && !currentSKin.isNormalRender) {
                this.beginCache();
            }
            else {
                this.endCache();
            }
        }
        render(time) {
            this.renderProxy.render(time, this.boneMat);
        }
    }
    var ERenderProxyType;
    (function (ERenderProxyType) {
        ERenderProxyType[ERenderProxyType["RenderNormal"] = 0] = "RenderNormal";
        ERenderProxyType[ERenderProxyType["RenderOptimize"] = 1] = "RenderOptimize";
        ERenderProxyType[ERenderProxyType["RenderBake"] = 2] = "RenderBake";
    })(ERenderProxyType || (ERenderProxyType = {}));
    class RenderOptimize {
        constructor(renderNode) {
            this._renderNode = renderNode;
            this.changeSkeleton(renderNode.getSkeleton());
        }
        changeSkeleton(skeleton) {
            this._skeleton = skeleton;
            this.bones = skeleton.bones;
            this.slots = skeleton.slots;
        }
        change(currentRender, currentAnimation) {
            this.skinUpdate = currentRender;
            this.currentAnimation = currentAnimation;
        }
        leave() {
        }
        render(curTime, boneMat) {
            this.currentAnimation.render(this.bones, this.slots, this.skinUpdate, curTime, boneMat, -this._skeleton.x, -this._skeleton.y);
            this._renderNode._spriteShaderData.setBuffer(SpineShaderInit.BONEMAT, boneMat);
        }
    }
    class RenderNormal {
        constructor(renderNode) {
            this._renderNode = renderNode;
            this.changeSkeleton(renderNode.getSkeleton());
        }
        changeSkeleton(skeleton) {
            this._skeleton = skeleton;
        }
        leave() {
            this._renderNode._spriteShaderData.removeDefine(SpineShaderInit.SPINE_COLOR2);
        }
        change(currentRender, currentAnimation) {
            this._renderer = currentRender._renderer;
            this._renderNode._spriteShaderData.addDefine(SpineShaderInit.SPINE_COLOR2);
        }
        render(curTime, boneMat) {
            this._renderNode.clear();
            this._renderer.draw(this._skeleton, this._renderNode, -1, -1);
        }
    }
    class RenderBake {
        get simpleAnimatorTexture() {
            return this._simpleAnimatorTexture;
        }
        set simpleAnimatorTexture(value) {
            if (this._simpleAnimatorTexture) {
                this._simpleAnimatorTexture._removeReference();
            }
            this._simpleAnimatorTexture = value;
            this._simpleAnimatorTextureSize = value.width;
            this._renderNode._spriteShaderData.setTexture(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE, value);
            value._addReference();
            this._renderNode._spriteShaderData.setNumber(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE, this._simpleAnimatorTextureSize);
        }
        get simpleAnimatorOffset() {
            return this._simpleAnimatorOffset;
        }
        set simpleAnimatorOffset(value) {
            value.cloneTo(this._simpleAnimatorOffset);
        }
        constructor(renderNode) {
            this.step = 1 / 60;
            this._simpleAnimatorParams = new Laya.Vector4();
            this._renderNode = renderNode;
            this._simpleAnimatorOffset = new Laya.Vector2();
            this.changeSkeleton(renderNode.getSkeleton());
        }
        changeSkeleton(skeleton) {
            this._skeleton = skeleton;
            this.bones = skeleton.bones;
            this.slots = skeleton.slots;
        }
        leave() {
            this._renderNode._spriteShaderData.removeDefine(SpineShaderInit.SPINE_SIMPLE);
            this._renderNode._renderType = Laya.BaseRender2DType.spine;
        }
        change(currentRender, currentAnimation) {
            this.skinRender = currentRender;
            this.currentAnimation = currentAnimation;
            this._renderNode._spriteShaderData.addDefine(SpineShaderInit.SPINE_SIMPLE);
            this._simpleAnimatorOffset.x = this.aniOffsetMap[currentAnimation.name];
            if (currentAnimation.currentSKin.canInstance) {
                this._renderNode._renderType = Laya.BaseRender2DType.spineSimple;
            }
        }
        _computeAnimatorParamsData() {
            this._simpleAnimatorParams.x = this._simpleAnimatorOffset.x;
            this._simpleAnimatorParams.y = Math.round(this._simpleAnimatorOffset.y) * this._bonesNums * 2;
        }
        setCustomData(value1, value2 = 0) {
            this._simpleAnimatorParams.z = value1;
            this._simpleAnimatorParams.w = value2;
        }
        render(curTime, boneMat) {
            this.currentAnimation.renderWithOutMat(this.slots, this.skinRender, curTime);
            this._simpleAnimatorOffset.y = curTime / this.step;
            this._computeAnimatorParamsData();
            this._renderNode._spriteShaderData.setVector(SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS, this._simpleAnimatorParams);
        }
    }

    class VBCreator {
        constructor(vertexFlag, maxVertexCount = 0, auto = true) {
            this._vertexSize = 0;
            this._baseVtxCount = 6;
            this._boneVtxCount = 4;
            this.twoColorTint = false;
            this.boneMaxId = 0;
            this.maxVertexCount = maxVertexCount;
            this.vertexFlag = vertexFlag;
            this.mapIndex = new Map();
            this.slotVBMap = new Map();
            this.boneArray = [];
            this.vbLength = 0;
            if (auto) {
                this._vertexDeclaration = SpineMeshUtils.getVertexDeclaration(this.vertexFlag);
                this.twoColorTint = vertexFlag.indexOf("COLOR2") != -1;
                if (this.twoColorTint)
                    this._baseVtxCount += 4;
                this._vertexSize = this._vertexDeclaration.vertexStride / 4;
                this._boneVtxCount = this._vertexSize - this._baseVtxCount;
                this._updateBuffer();
            }
        }
        setBufferLength(maxVertexCount) {
            if (maxVertexCount <= this.maxVertexCount)
                return;
            this.maxVertexCount = maxVertexCount;
            this._updateBuffer();
        }
        _updateBuffer() {
            let oldbuffer = this.vb;
            this.vb = new Float32Array(this.maxVertexCount * this.vertexSize);
            if (oldbuffer)
                this.vb.set(oldbuffer);
        }
        get vertexSize() {
            return this._vertexSize;
        }
        get vertexDeclaration() {
            return this._vertexDeclaration;
        }
        appendAndCreateIB(attach) {
            this.appendVB(attach);
        }
        getBoneId(boneIndex) {
            let id = this.mapIndex.get(boneIndex);
            if (id == undefined) {
                id = this.boneMaxId;
                this.mapIndex.set(boneIndex, id);
                this.boneArray.push(id, boneIndex);
                this.boneMaxId++;
            }
            return id;
        }
        initBoneMat() {
            this.boneMat = new Float32Array(8 * this.mapIndex.size);
        }
        appendVB(attach) {
            let offset;
            let map = this.slotVBMap.get(attach.slotId);
            if (map) {
                let offset = map.get(attach.attachment);
                if (offset != undefined) {
                    return offset;
                }
            }
            else {
                map = new Map();
                this.slotVBMap.set(attach.slotId, map);
            }
            offset = this.vbLength / this.vertexSize;
            map.set(attach.attachment, { offset: offset, attachment: attach });
            if (!attach.vertexCount)
                return offset;
            if (offset + attach.vertexCount >= this.maxVertexCount) {
                this.setBufferLength(offset + attach.vertexCount);
            }
            this.vbLength = this.appendVertexArray(attach, this.vb, this.vbLength, this);
            return offset;
        }
        resetVB(attach) {
            var _a;
            if (attach.isPath) {
                return;
            }
            let pos = (_a = this.slotVBMap.get(attach.slotId)) === null || _a === void 0 ? void 0 : _a.get(attach.attachment);
            if (pos) {
                this.appendVertexArray(attach, this.vb, pos.offset * this.vertexSize, this);
            }
        }
        updateBone(bones, boneMat, ofx = 0, ofy = 0) {
            let boneArray = this.boneArray;
            for (let i = 0, n = boneArray.length; i < n; i += 2) {
                let offset = boneArray[i] * 8;
                let bone = bones[boneArray[i + 1]];
                boneMat[offset] = bone.a;
                boneMat[offset + 1] = bone.b;
                boneMat[offset + 2] = bone.worldX + ofx;
                boneMat[offset + 3] = 0;
                boneMat[offset + 4] = bone.c;
                boneMat[offset + 5] = bone.d;
                boneMat[offset + 6] = bone.worldY + ofy;
                boneMat[offset + 7] = 0;
            }
        }
        updateBoneCache(boneFrames, frames, boneMat, ofx = 0, ofy = 0) {
            let boneArray = this.boneArray;
            let floor = Math.floor(frames);
            let detal;
            if (floor == boneFrames.length - 1) {
                detal = 0;
            }
            else {
                detal = frames - floor;
            }
            let boneFrames1 = boneFrames[floor];
            let boneFrames2 = boneFrames[floor + 1];
            if (detal > 0.0001) {
                for (let i = 0, n = boneArray.length; i < n; i += 2) {
                    let offset = boneArray[i] * 8;
                    let boneFloatArray = boneFrames1[boneArray[i + 1]];
                    let boneFloatArray2 = boneFrames2[boneArray[i + 1]];
                    boneMat[offset] = boneFloatArray[0] + (boneFloatArray2[0] - boneFloatArray[0]) * detal;
                    boneMat[offset + 1] = boneFloatArray[1] + (boneFloatArray2[1] - boneFloatArray[1]) * detal;
                    boneMat[offset + 2] = boneFloatArray[2] + (boneFloatArray2[2] - boneFloatArray[2]) * detal;
                    boneMat[offset + 3] = 0;
                    boneMat[offset + 4] = boneFloatArray[4] + (boneFloatArray2[4] - boneFloatArray[4]) * detal;
                    boneMat[offset + 5] = boneFloatArray[5] + (boneFloatArray2[5] - boneFloatArray[5]) * detal;
                    boneMat[offset + 6] = boneFloatArray[6] + (boneFloatArray2[6] - boneFloatArray[6]) * detal;
                    boneMat[offset + 7] = 0;
                }
            }
            else {
                for (let i = 0, n = boneArray.length; i < n; i += 2) {
                    let offset = boneArray[i] * 8;
                    let bone = boneFrames1[boneArray[i + 1]];
                    boneMat.set(bone, offset);
                }
            }
        }
        _cloneTo(target) {
            target.vb = new Float32Array(this.vb);
            target.vbLength = this.vbLength;
            target.mapIndex = new Map(this.mapIndex);
            target.boneMaxId = this.boneMaxId;
            target.boneArray = this.boneArray.slice();
            target._vertexDeclaration = this._vertexDeclaration;
            target._vertexSize = this._vertexSize;
            target.twoColorTint = this.twoColorTint;
            target._baseVtxCount = this._baseVtxCount;
            target._boneVtxCount = this._boneVtxCount;
            target.vertexFlag = this.vertexFlag;
            this.slotVBMap.forEach((value, key) => {
                target.slotVBMap.set(key, new Map(value));
            });
        }
        clone() {
            let rs = this._create();
            this._cloneTo(rs);
            return rs;
        }
    }
    class VBBoneCreator extends VBCreator {
        _create() {
            return new VBBoneCreator(this.vertexFlag, this.maxVertexCount, false);
        }
        appendVertexArray(attachmentParse, vertexArray, offset, boneGet) {
            if (!attachmentParse.attachment) {
                boneGet.getBoneId(attachmentParse.boneIndex);
                return offset;
            }
            let vside = this.vertexSize;
            let slotVertex = attachmentParse.vertexArray;
            let uvs = attachmentParse.uvs;
            let color = attachmentParse.color;
            let c1r = color.r, c1g = color.g, c1b = color.b, c1a = color.a;
            let boneNum = this._boneVtxCount / 4;
            let color2 = attachmentParse.darkColor;
            let c2r = 0, c2g = 0, c2b = 0, c2a = 1;
            if (color2) {
                c2r = color2.r;
                c2g = color2.g;
                c2b = color2.b;
                c2a = color2.a;
            }
            if (attachmentParse.stride == 2) {
                let boneid = boneGet.getBoneId(attachmentParse.boneIndex);
                for (let j = 0, n = slotVertex.length; j < n; j += attachmentParse.stride) {
                    vertexArray[offset] = uvs[j];
                    vertexArray[offset + 1] = uvs[j + 1];
                    vertexArray[offset + 2] = c1r;
                    vertexArray[offset + 3] = c1g;
                    vertexArray[offset + 4] = c1b;
                    vertexArray[offset + 5] = c1a;
                    vertexArray[offset + 6] = slotVertex[j];
                    vertexArray[offset + 7] = slotVertex[j + 1];
                    vertexArray[offset + 8] = 1;
                    vertexArray[offset + 9] = boneid;
                    let ox = offset + 10;
                    for (let z = 0, len = boneNum - 1; z < len; z++) {
                        let vOffset = ox + z * 4;
                        vertexArray[vOffset] = 0;
                        vertexArray[vOffset + 1] = 0;
                        vertexArray[vOffset + 2] = 0;
                        vertexArray[vOffset + 3] = 0;
                    }
                    if (this.twoColorTint) {
                        let tColorOffset = offset + 6 + this._boneVtxCount;
                        vertexArray[tColorOffset] = c2r;
                        vertexArray[tColorOffset + 1] = c2g;
                        vertexArray[tColorOffset + 2] = c2b;
                        vertexArray[tColorOffset + 3] = c2a;
                    }
                    offset += vside;
                }
            }
            else {
                for (let j = 0, uvid = 0, n = slotVertex.length; j < n; j += attachmentParse.stride, uvid += 2) {
                    vertexArray[offset] = uvs[uvid];
                    vertexArray[offset + 1] = uvs[uvid + 1];
                    vertexArray[offset + 2] = c1r;
                    vertexArray[offset + 3] = c1g;
                    vertexArray[offset + 4] = c1b;
                    vertexArray[offset + 5] = c1a;
                    let ox = offset + 6;
                    for (let z = 0; z < boneNum; z++) {
                        let vOffset = ox + z * 4;
                        let oOffset = j + z * 4;
                        vertexArray[vOffset] = slotVertex[oOffset];
                        vertexArray[vOffset + 1] = slotVertex[oOffset + 1];
                        vertexArray[vOffset + 2] = slotVertex[oOffset + 2];
                        vertexArray[vOffset + 3] = boneGet.getBoneId(slotVertex[oOffset + 3]);
                    }
                    if (this.twoColorTint) {
                        let tColorOffset = ox + this._boneVtxCount;
                        vertexArray[tColorOffset] = c2r;
                        vertexArray[tColorOffset + 1] = c2g;
                        vertexArray[tColorOffset + 2] = c2b;
                        vertexArray[tColorOffset + 3] = c2a;
                    }
                    offset += vside;
                }
            }
            return offset;
        }
        appendDeform(attachmentParse, deform, offset, out) {
            if (!attachmentParse.attachment) {
                return;
            }
            let vside = this.vertexSize;
            let slotVertex = attachmentParse.vertexArray;
            if (attachmentParse.stride == 2) {
                for (let j = 0, n = slotVertex.length; j < n; j += attachmentParse.stride) {
                    out[offset + 6] = deform[j];
                    out[offset + 7] = deform[j + 1];
                    offset += vside;
                }
            }
            else {
                let attchment = attachmentParse.sourceData;
                let bones = attchment.bones;
                let vertexCount = attachmentParse.vertexCount;
                let boneNum = this._boneVtxCount / 4;
                let f = 0, v = 0;
                for (let w = 0; w < vertexCount; w++) {
                    let len = bones[v++];
                    let slotOffset = w * this._boneVtxCount;
                    let vertexOffset = offset + w * vside + 6;
                    for (let i = 0; i < len; i++) {
                        if (i >= boneNum)
                            break;
                        let deformOffset = f + i * 2;
                        let slotIndex = slotOffset + i * 4;
                        let boneOffset = vertexOffset + i * 4;
                        out[boneOffset] = slotVertex[slotIndex] + deform[deformOffset];
                        out[boneOffset + 1] = slotVertex[slotIndex + 1] + deform[deformOffset + 1];
                    }
                    v += len;
                    f += 2 * len;
                }
            }
        }
    }
    class VBRigBodyCreator extends VBCreator {
        _create() {
            return new VBRigBodyCreator(this.vertexFlag, this.maxVertexCount, false);
        }
        appendVertexArray(attachmentParse, vertexArray, offset, boneGet) {
            let slotVertex = attachmentParse.vertexArray;
            let uvs = attachmentParse.uvs;
            let color = attachmentParse.color;
            let color2 = attachmentParse.darkColor;
            let vside = this.vertexSize;
            let c1r = color.r, c1g = color.g, c1b = color.b, c1a = color.a;
            let c2r = 0, c2g = 0, c2b = 0, c2a = 1;
            if (color2) {
                c2r = color2.r;
                c2g = color2.g;
                c2b = color2.b;
                c2a = color2.a;
            }
            if (attachmentParse.stride == 2) {
                let boneid = boneGet.getBoneId(attachmentParse.boneIndex);
                for (let j = 0, n = slotVertex.length; j < n; j += attachmentParse.stride) {
                    vertexArray[offset + 0] = uvs[j];
                    vertexArray[offset + 1] = uvs[j + 1];
                    vertexArray[offset + 2] = c1r;
                    vertexArray[offset + 3] = c1g;
                    vertexArray[offset + 4] = c1b;
                    vertexArray[offset + 5] = c1a;
                    vertexArray[offset + 6] = slotVertex[j];
                    vertexArray[offset + 7] = slotVertex[j + 1];
                    vertexArray[offset + 8] = boneid;
                    if (this.twoColorTint) {
                        let tColorOffset = offset + 9;
                        vertexArray[tColorOffset] = c2r;
                        vertexArray[tColorOffset + 1] = c2g;
                        vertexArray[tColorOffset + 2] = c2b;
                        vertexArray[tColorOffset + 3] = c2a;
                    }
                    offset += vside;
                }
            }
            return offset;
        }
        appendDeform(attachmentParse, deform, offset, out) {
            if (!attachmentParse.attachment) {
                return;
            }
            let vside = this.vertexSize;
            let slotVertex = attachmentParse.vertexArray;
            if (attachmentParse.stride == 2) {
                for (let j = 0, n = slotVertex.length; j < n; j += attachmentParse.stride) {
                    out[offset + 6] = deform[j];
                    out[offset + 7] = deform[j + 1];
                    offset += vside;
                }
            }
        }
    }

    class SketonOptimise {
        constructor() {
            this.blendModeMap = new Map();
            this.skinAttachArray = [];
            this.animators = [];
            this.canCache = SketonOptimise.cacheSwitch;
        }
        _initSpineRender(skeleton, templet, renderNode, state) {
            let sp;
            if (SketonOptimise.normalRenderSwitch) {
                sp = new SpineNormalRender();
            }
            else if (this.maxBoneNumber > SketonOptimise.MAX_BONES) {
                console.warn("The number of Bones :", this.maxBoneNumber, " > ", SketonOptimise.MAX_BONES, ", use CPU caculation");
                sp = new SpineNormalRender();
            }
            else {
                sp = new SpineOptimizeRender(this);
            }
            sp.init(skeleton, templet, renderNode, state);
            return sp;
        }
        _updateState(delta) {
            this._state.update(delta);
            this._state.getCurrent(0);
            this._state.apply(this.sketon);
            this.sketon.updateWorldTransform(2);
            return this.sketon.bones;
        }
        _play(animationName) {
            let trackEntry = this._state.setAnimation(0, animationName, true);
            trackEntry.animationStart = 0;
            let animationDuration = trackEntry.animation.duration;
            return animationDuration;
        }
        checkMainAttach(skeletonData) {
            this.sketon = new spine.Skeleton(skeletonData);
            this._stateData = new spine.AnimationStateData(this.sketon.data);
            this._state = new spine.AnimationState(this._stateData);
            this.attachMentParse(skeletonData);
            this.initAnimation(skeletonData.animations);
        }
        attachMentParse(skeletonData) {
            let skins = skeletonData.skins;
            let slots = skeletonData.slots;
            let defaultSkinAttach;
            this._tempIbCreate = new IBCreator();
            for (let i = 0, n = skins.length; i < n; i++) {
                let skin = skins[i];
                let skinAttach = new SkinAttach();
                skinAttach.name = skin.name;
                skinAttach._tempIbCreate = this._tempIbCreate;
                if (i != 0) {
                    skinAttach.copyFrom(defaultSkinAttach);
                }
                skinAttach.attachMentParse(skin, slots);
                this.skinAttachArray.push(skinAttach);
                skinAttach.init(slots);
                if (i == 0) {
                    defaultSkinAttach = skinAttach;
                }
            }
        }
        initAnimation(animations) {
            let maxBoneNumber = 0;
            for (let i = 0, n = animations.length; i < n; i++) {
                let animation = animations[i];
                let animator = new AnimationRender();
                animator.check(animation, this);
                this.animators.push(animator);
                this.skinAttachArray.forEach((value) => {
                    value.initAnimator(animator);
                });
                animator.skinDataArray.forEach((skinData) => {
                    if (!skinData.isNormalRender) {
                        let boneNumber = skinData.vb.boneArray.length / 2;
                        if (boneNumber > maxBoneNumber) {
                            maxBoneNumber = boneNumber;
                        }
                    }
                });
            }
            this.maxBoneNumber = maxBoneNumber;
        }
        cacheBone() {
            if (!SketonOptimise.cacheSwitch) {
                for (let i = 0, n = this.animators.length; i < n; i++) {
                    let animator = this.animators[i];
                    if (animator.boneFrames.length == 0) {
                        animator.cacheBones(this);
                    }
                }
            }
        }
        destroy() {
            for (let i = 0, n = this.animators.length; i < n; i++)
                this.animators[i].destroy();
            this.animators.length = 0;
        }
        init(slots) {
        }
    }
    SketonOptimise.normalRenderSwitch = false;
    SketonOptimise.MAX_BONES = 100;
    SketonOptimise.cacheSwitch = false;
    class SkinAttach {
        constructor() {
            this.vertexBones = 0;
            this.slotAttachMap = new Map();
            this.mainAttachMentOrder = [];
        }
        copyFrom(other) {
            other.slotAttachMap.forEach((value, key) => {
                this.slotAttachMap.set(key, new Map(value));
            });
        }
        attachMentParse(skinData, slots) {
            let type = exports.ESpineRenderType.rigidBody;
            let vertexBones = 0;
            let attachments = skinData.attachments;
            let vertexCount = 0;
            let indexCount = 0;
            let twoColorTint = false;
            for (let i = 0, n = slots.length; i < n; i++) {
                let attachment = attachments[i];
                let slot = slots[i];
                let boneIndex = slot.boneData.index;
                let map = this.slotAttachMap.get(i);
                let slotAttachName = slot.attachmentName;
                if (!map) {
                    map = new Map();
                    this.slotAttachMap.set(i, map);
                }
                if (attachment) {
                    for (let key in attachment) {
                        let attach = attachment[key];
                        let deform = null;
                        let parse = new AttachmentParse();
                        parse.init(attach, boneIndex, i, deform, slot);
                        vertexBones = Math.max(vertexBones, parse.vertexBones);
                        let tempType = SlotUtils.checkAttachment(parse ? parse.sourceData : null);
                        if (tempType < type) {
                            type = tempType;
                        }
                        indexCount += parse.indexCount;
                        vertexCount += parse.vertexCount;
                        twoColorTint = twoColorTint || !!parse.darkColor;
                        map.set(key, parse);
                    }
                }
                else if (slotAttachName) {
                    let parse = map.get(slotAttachName);
                    if (parse) {
                        indexCount += parse.indexCount;
                        vertexCount += parse.vertexCount;
                        vertexBones = Math.max(vertexBones, parse.vertexBones);
                        let tempType = SlotUtils.checkAttachment(parse ? parse.sourceData : null);
                        if (tempType < type) {
                            type = tempType;
                        }
                        twoColorTint = twoColorTint || !!parse.darkColor;
                    }
                }
                if (!map.get(null)) {
                    let nullAttachment = new AttachmentParse();
                    nullAttachment.slotId = i;
                    nullAttachment.color = slot.color;
                    nullAttachment.boneIndex = boneIndex;
                    nullAttachment.attachment = null;
                    map.set(nullAttachment.attachment, nullAttachment);
                }
            }
            this.type = type;
            this.vertexBones = vertexBones;
            let flag;
            switch (this.type) {
                case exports.ESpineRenderType.normal:
                    flag = "UV,COLOR,POSITION,BONE";
                    if (twoColorTint)
                        flag += ",COLOR2";
                    this.mainVB = new VBBoneCreator(flag, vertexCount);
                    break;
                case exports.ESpineRenderType.boneGPU:
                    flag = "UV,COLOR,POSITION,BONE";
                    if (twoColorTint)
                        flag += ",COLOR2";
                    this.mainVB = new VBBoneCreator(flag, vertexCount);
                    break;
                case exports.ESpineRenderType.rigidBody:
                    flag = "UV,COLOR,POSITION,RIGIDBODY";
                    if (twoColorTint)
                        flag += ",COLOR2";
                    this.mainVB = new VBRigBodyCreator(flag, vertexCount);
                    break;
            }
            this.mainIB = new IBCreator();
            this.mainIB.updateFormat(vertexCount);
            this.mainIB.setBufferLength(indexCount);
        }
        init(slots) {
            let mainAttachMentOrder = this.mainAttachMentOrder;
            slots.forEach((slot, index) => {
                let attchment = slot.attachmentName;
                if (attchment) {
                    let attach = this.slotAttachMap.get(index).get(attchment);
                    if (attach) {
                        this.mainVB.appendVB(attach);
                    }
                    else {
                        attach = this.slotAttachMap.get(index).get(null);
                    }
                    if (attach.isClip)
                        this.isNormalRender = true;
                    mainAttachMentOrder.push(attach);
                }
                else {
                    let attach = this.slotAttachMap.get(index).get(null);
                    mainAttachMentOrder.push(attach);
                }
            });
            this.mainVB.initBoneMat();
            this.mainIB.createIB(mainAttachMentOrder, this.mainVB);
        }
        initAnimator(animator) {
            let skinData = animator.createSkinData(this.mainVB, this.mainIB, this._tempIbCreate, this.slotAttachMap, this.mainAttachMentOrder, this.type);
            skinData.name = this.name;
            if (this.isNormalRender) {
                skinData.isNormalRender = true;
            }
            if (skinData.isNormalRender) {
                this.hasNormalRender = true;
            }
        }
    }

    class SpineEmptyRender {
        getSpineColor() {
            return Laya.Color.WHITE;
        }
        changeSkeleton(skeleton) {
        }
        init(skeleton, templet, renderNode, state) {
        }
        play(animationName) {
        }
        render(time) {
        }
        setSkinIndex(index) {
        }
        initBake(obj) {
        }
        destroy() {
        }
    }
    SpineEmptyRender.instance = new SpineEmptyRender();

    class Spine2DRenderNode extends Laya.BaseRenderNode2D {
        static createRenderElement2D() {
            if (this._pool.length > 0) {
                return this._pool.pop();
            }
            let element = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            element.renderStateIsBySprite = false;
            element.nodeCommonMap = ["spine2D"];
            return element;
        }
        static recoverRenderElement2D(value) {
            if (!value.canotPool) {
                this._pool.push(value);
            }
        }
        constructor() {
            super();
            this._currentPlayTime = 0;
            this._pause = true;
            this._playbackRate = 1.0;
            this._playAudio = true;
            this._soundChannelArr = [];
            this.trackIndex = 0;
            this._skinName = "default";
            this._loop = true;
            this._nMatrix_0 = new Laya.Vector3;
            this._nMatrix_1 = new Laya.Vector3;
            this.physicsUpdate = 2;
            this._useFastRender = true;
            this._needUpdate = false;
            this._renderElements = [];
            this._materials = [];
            this.spineItem = SpineEmptyRender.instance;
            this._spriteShaderData.addDefine(Laya.BaseRenderNode2D.SHADERDEFINE_BASERENDER2D);
            this._spriteShaderData.addDefine(SpineShaderInit.SPINE_UV);
            this._spriteShaderData.addDefine(SpineShaderInit.SPINE_COLOR);
        }
        _getcommonUniformMap() {
            return ["BaseRender2D", "Spine2D"];
        }
        get externalSkins() {
            return this._externalSkins;
        }
        set externalSkins(value) {
            if (value) {
                for (let i = value.length - 1; i >= 0; i--) {
                    value[i].target = this;
                }
            }
            this._externalSkins = value;
        }
        addCMDCall(context, px, py) {
            let shaderData = this._spriteShaderData;
            let mat = context._curMat;
            this._nMatrix_0.setValue(mat.a, mat.b, mat.tx + mat.a * px + mat.c * py);
            this._nMatrix_1.setValue(mat.c, mat.d, mat.ty + mat.b * px + mat.d * py);
            shaderData.setVector3(Laya.BaseRenderNode2D.NMATRIX_0, this._nMatrix_0);
            shaderData.setVector3(Laya.BaseRenderNode2D.NMATRIX_1, this._nMatrix_1);
            Laya.Vector2.TEMP.setValue(context.width, context.height);
            shaderData.setVector2(Laya.BaseRenderNode2D.BASERENDERSIZE, Laya.Vector2.TEMP);
            if (this._renderAlpha !== context.globalAlpha) {
                let scolor = this.spineItem.getSpineColor();
                let a = scolor.a * context.globalAlpha;
                let color = shaderData.getColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR) || new Laya.Color();
                color.setValue(scolor.r, scolor.g, scolor.b, a);
                shaderData.setColor(Laya.BaseRenderNode2D.BASERENDER2DCOLOR, color);
                this._renderAlpha = context.globalAlpha;
            }
            let filter = context._colorFiler;
            if (filter) {
                this._spriteShaderData.addDefine(Laya.ShaderDefines2D.FILTERCOLOR);
                Laya.Matrix4x4.TEMP.cloneByArray(filter._mat);
                shaderData.setMatrix4x4(Laya.ShaderDefines2D.UNIFORM_COLORMAT, Laya.Matrix4x4.TEMP);
                Laya.Vector4.TEMP.setValue(filter._alpha[0], filter._alpha[1], filter._alpha[2], filter._alpha[3]);
                shaderData.setVector(Laya.ShaderDefines2D.UNIFORM_COLORALPHA, Laya.Vector4.TEMP);
            }
            else {
                this._spriteShaderData.removeDefine(Laya.ShaderDefines2D.FILTERCOLOR);
            }
            context._copyClipInfoToShaderData(shaderData);
            this._lightReceive && this._updateLight();
        }
        resetExternalSkin() {
            if (this._skeleton) {
                this._skeleton = new spine.Skeleton(this._templet.skeletonData);
                this.spineItem.changeSkeleton(this._skeleton);
                this._flushExtSkin();
            }
        }
        get source() {
            return this._source;
        }
        set source(value) {
            this._source = value;
            if (value) {
                let template = Laya.ILaya.loader.getRes(value, Laya.Loader.SPINE);
                if (template) {
                    this.templet = template;
                }
                else {
                    Laya.ILaya.loader.load(value, Laya.Loader.SPINE).then((templet) => {
                        if (!this._source || templet && !templet.isCreateFromURL(this._source))
                            return;
                        if (this.destroyed)
                            return;
                        this.templet = templet;
                    });
                }
            }
            else
                this.templet = null;
        }
        get skinName() {
            return this._skinName;
        }
        set skinName(value) {
            this._skinName = value;
            if (this._templet)
                this.showSkinByName(value);
        }
        get animationName() {
            return this._animationName;
        }
        set animationName(value) {
            this._animationName = value;
            if (this._templet)
                this.play(value, this._loop, true);
        }
        get maxDetlaTime() {
            return this._timeKeeper.maxDelta;
        }
        set maxDetlaTime(value) {
            this._timeKeeper.maxDelta = value;
        }
        get loop() {
            return this._loop;
        }
        set loop(value) {
            this._loop = value;
            if (this._templet)
                this.play(this._animationName, this._loop, true);
        }
        get url() {
            return this._skin;
        }
        set url(value) {
            if (this._skin != value) {
                this._skin = value;
                Laya.Laya.loader.load(value, Laya.Loader.SPINE).then((templet) => {
                    this.init(templet);
                });
            }
        }
        get twoColorTint() {
            return this._spriteShaderData.hasDefine(SpineShaderInit.SPINE_TWOCOLORTINT);
        }
        set twoColorTint(value) {
            if (value) {
                this._spriteShaderData.addDefine(SpineShaderInit.SPINE_TWOCOLORTINT);
            }
            else {
                this._spriteShaderData.removeDefine(SpineShaderInit.SPINE_TWOCOLORTINT);
            }
        }
        get templet() {
            return this._templet;
        }
        set templet(value) {
            this.init(value);
        }
        set currentTime(value) {
            if (!this._templet)
                return;
            value /= 1000;
            if (value < this._playStart || (!!this._playEnd && value > this._playEnd) || value > this._duration)
                throw new Error("AnimationPlayer: value must large than playStartTime,small than playEndTime.");
            this._state.update(value - this._currentPlayTime);
            this._currentPlayTime = value;
        }
        get playState() {
            if (this._pause)
                if (this._currentPlayTime)
                    return Spine2DRenderNode.PAUSED;
                else
                    return Spine2DRenderNode.STOPPED;
            return Spine2DRenderNode.PLAYING;
        }
        get useFastRender() {
            return this._useFastRender;
        }
        set useFastRender(value) {
            if (this._useFastRender === value)
                return;
            this._useFastRender = value;
            if (!this._templet)
                return;
            if (value) {
                this.changeFast();
            }
            else {
                this.changeNormal();
            }
            this.play(this._animationName, this._loop, true, this._currentPlayTime);
        }
        onAwake() {
            if (this._skeleton) {
                if (Laya.LayaEnv.isPlaying && this._animationName !== undefined)
                    this.play(this._animationName, this._loop, true);
            }
        }
        onEnable() {
            this.owner.on(Laya.Event.TRANSFORM_CHANGED, this, this.onTransformChanged);
        }
        onDisable() {
            this.owner.off(Laya.Event.TRANSFORM_CHANGED, this, this.onTransformChanged);
        }
        init(templet) {
            if (this.destroyed)
                return;
            if (this._templet) {
                this.clear();
                this.reset();
            }
            this._templet = templet;
            if (!this._templet)
                return;
            this._templet._addReference();
            this._skeleton = new spine.Skeleton(this._templet.skeletonData);
            this._stateData = new spine.AnimationStateData(this._skeleton.data);
            this._state = new spine.AnimationState(this._stateData);
            this._timeKeeper = new TimeKeeper(Laya.Laya.timer);
            if (!this._useFastRender) {
                let before = SketonOptimise.normalRenderSwitch;
                SketonOptimise.normalRenderSwitch = true;
                this.spineItem = this._templet.sketonOptimise._initSpineRender(this._skeleton, this._templet, this, this._state);
                SketonOptimise.normalRenderSwitch = before;
            }
            else
                this.spineItem = this._templet.sketonOptimise._initSpineRender(this._skeleton, this._templet, this, this._state);
            let skinIndex = this._templet.getSkinIndexByName(this._skinName);
            if (skinIndex != -1)
                this.showSkinByIndex(skinIndex);
            this._state.addListener({
                start: (entry) => {
                },
                interrupt: (entry) => {
                },
                end: (entry) => {
                },
                dispose: (entry) => {
                },
                complete: (entry) => {
                    this.event(Laya.Event.END);
                    if (entry.loop) {
                        this.event(Laya.Event.COMPLETE);
                    }
                    else {
                        this.stop();
                    }
                },
                event: (entry, event) => {
                    let eventData = {
                        audioValue: event.data.audioPath,
                        audioPath: event.data.audioPath,
                        floatValue: event.floatValue,
                        intValue: event.intValue,
                        name: event.data.name,
                        stringValue: event.stringValue,
                        time: event.time * 1000,
                        balance: event.balance,
                        volume: event.volume
                    };
                    this.event(Laya.Event.LABEL, eventData);
                    if (this._playAudio && eventData.audioValue) {
                        let channel = Laya.SoundManager.playSound(templet.basePath + eventData.audioValue, 1, Laya.Handler.create(this, this._onAniSoundStoped), null, (this._currentPlayTime * 1000 - eventData.time) / 1000);
                        Laya.SoundManager.playbackRate = this._playbackRate;
                        channel && this._soundChannelArr.push(channel);
                    }
                },
            });
            this._flushExtSkin();
            this.event(Laya.Event.READY);
            if (Laya.LayaEnv.isPlaying && this._animationName !== undefined) {
                this.play(this._animationName, this._loop, true);
            }
        }
        play(nameOrIndex, loop, force = true, start = 0, end = 0, freshSkin = true, playAudio = true) {
            this._playAudio = playAudio;
            start /= 1000;
            end /= 1000;
            this._loop = loop;
            if (start < 0 || end < 0)
                throw new Error("SpineSkeleton: start and end must large than zero.");
            if ((end !== 0) && (start > end))
                throw new Error("SpineSkeleton: start must less than end.");
            if (typeof nameOrIndex == "number") {
                nameOrIndex = this.getAniNameByIndex(nameOrIndex);
            }
            else {
                let hasAni = !!this.templet.findAnimation(nameOrIndex);
                if (!hasAni)
                    return;
            }
            if (force || this._pause || this._currentPlayTime || this._animationName != nameOrIndex) {
                this._animationName = nameOrIndex;
                this.spineItem.play(nameOrIndex);
                let trackEntry = this._state.setAnimation(this.trackIndex, nameOrIndex, loop);
                trackEntry.animationStart = start;
                if (!!end && end < trackEntry.animationEnd)
                    trackEntry.animationEnd = end;
                let animationDuration = trackEntry.animation.duration;
                this._duration = animationDuration;
                this._playStart = start;
                this._playEnd = end <= animationDuration ? end : animationDuration;
                if (this._pause) {
                    this._pause = false;
                    this._beginUpdate();
                }
                this._update();
                this.event(Laya.Event.PLAYED);
            }
        }
        _update() {
            this._timeKeeper.update();
            let state = this._state;
            let delta = this._timeKeeper.delta * this._playbackRate;
            state.update(delta);
            let currentPlayTime = this._currentPlayTime = state.getCurrentPlayTime(this.trackIndex);
            state.apply(this._skeleton);
            if (!this._state || !this._skeleton) {
                return;
            }
            this._skeleton.update && this._skeleton.update(delta);
            this._skeleton.updateWorldTransform(this.physicsUpdate);
            this.spineItem.render(currentPlayTime);
            this.owner.repaint();
        }
        _flushExtSkin() {
            if (null == this._skeleton)
                return;
            let skins = this._externalSkins;
            if (skins) {
                for (let i = skins.length - 1; i >= 0; i--) {
                    skins[i].flush();
                }
                this.useFastRender = false;
            }
        }
        getAnimNum() {
            return this._templet.skeletonData.getAnimationsSize();
        }
        getAniNameByIndex(index) {
            return this._templet.getAniNameByIndex(index);
        }
        getSlotByName(slotName) {
            return this._skeleton.findSlot(slotName);
        }
        playbackRate(value) {
            this._playbackRate = value;
        }
        showSkinByName(name) {
            this.showSkinByIndex(this._templet.getSkinIndexByName(name));
        }
        showSkinByIndex(skinIndex) {
            this.spineItem.setSkinIndex(skinIndex);
            this._skeleton.showSkinByIndex(skinIndex);
            this._skeleton.setSlotsToSetupPose();
        }
        event(type, data) {
            this.owner.event(type, data);
        }
        stop() {
            if (!this._pause) {
                this._pause = true;
                this._clearUpdate();
                this._state.update(-this._currentPlayTime);
                this._currentPlayTime = 0;
                this.event(Laya.Event.STOPPED);
                if (this._soundChannelArr.length > 0) {
                    this._onAniSoundStoped(true);
                }
            }
        }
        _clearUpdate() {
            this._needUpdate = false;
        }
        _beginUpdate() {
            this._needUpdate = true;
        }
        onUpdate() {
            this._needUpdate && this._update();
        }
        paused() {
            if (!this._pause) {
                this._pause = true;
                this._clearUpdate();
                this.event(Laya.Event.PAUSED);
                if (this._soundChannelArr.length > 0) {
                    for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                        let channel = this._soundChannelArr[i];
                        if (!channel.isStopped) {
                            channel.pause();
                        }
                    }
                }
            }
        }
        resume() {
            if (this._pause) {
                this._pause = false;
                this._beginUpdate();
                if (this._soundChannelArr.length > 0) {
                    for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                        let channel = this._soundChannelArr[i];
                        if (channel.audioBuffer) {
                            channel.resume();
                        }
                    }
                }
            }
        }
        _onAniSoundStoped(force) {
            for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                let channel = this._soundChannelArr[i];
                if (channel.isStopped || force) {
                    !channel.isStopped && channel.stop();
                    this._soundChannelArr.splice(i, 1);
                    len--;
                    i--;
                }
            }
        }
        reset() {
            this._templet._removeReference(1);
            this._templet = null;
            this._timeKeeper = null;
            this._skeleton = null;
            this._state.clearListeners();
            this._state = null;
            this._pause = true;
            this._clearUpdate();
            if (this._soundChannelArr.length > 0)
                this._onAniSoundStoped(true);
        }
        addAnimation(nameOrIndex, loop = false, delay = 0) {
            delay /= 1000;
            let animationName = nameOrIndex;
            if (typeof animationName == "number") {
                animationName = this.getAniNameByIndex(animationName);
            }
            this._animationName = animationName;
            this._state.addAnimation(this.trackIndex, animationName, loop, delay);
        }
        setMix(fromNameOrIndex, toNameOrIndex, duration) {
            duration /= 1000;
            let fromName = fromNameOrIndex;
            if (typeof fromName == "number") {
                fromName = this.getAniNameByIndex(fromName);
            }
            let toName = toNameOrIndex;
            if (typeof toName == "number") {
                toName = this.getAniNameByIndex(toName);
            }
            this._stateData.setMix(fromName, toName, duration);
        }
        getBoneByName(boneName) {
            return this._skeleton.findBone(boneName);
        }
        getSkeleton() {
            return this._skeleton;
        }
        physicsTranslate(x, y) {
            this._templet.hasPhysics && this._skeleton.physicsTranslate(x, y);
        }
        onTransformChanged() {
            if (this._skeleton) {
                let trans = this.owner.globalTrans;
                this._skeleton.x = trans.x;
                this._skeleton.y = trans.y;
            }
        }
        setSlotAttachment(slotName, attachmentName) {
            this.useFastRender = false;
            this._skeleton.setAttachment(slotName, attachmentName);
        }
        clear() {
            this._mesh = null;
            this._renderElements.forEach(element => {
                Spine2DRenderNode.recoverRenderElement2D(element);
            });
            super.clear();
        }
        changeFast() {
            if (!(this.spineItem instanceof SpineOptimizeRender)) {
                this.spineItem.destroy();
                let before = SketonOptimise.normalRenderSwitch;
                SketonOptimise.normalRenderSwitch = false;
                this.spineItem = this._templet.sketonOptimise._initSpineRender(this._skeleton, this._templet, this, this._state);
                this.spineItem.setSkinIndex(this._templet.getSkinIndexByName(this._skinName));
                SketonOptimise.normalRenderSwitch = before;
            }
        }
        changeNormal() {
            if (!(this.spineItem instanceof SpineNormalRender)) {
                this.spineItem.destroy();
                let before = SketonOptimise.normalRenderSwitch;
                SketonOptimise.normalRenderSwitch = true;
                this.spineItem = this._templet.sketonOptimise._initSpineRender(this._skeleton, this._templet, this, this._state);
                this.spineItem.setSkinIndex(this._templet.getSkinIndexByName(this._skinName));
                SketonOptimise.normalRenderSwitch = before;
            }
        }
        onDestroy() {
            if (this._templet) {
                this.reset();
            }
            this.spineItem.destroy();
        }
        _updateMaterials(elements) {
            for (let i = 0, len = elements.length; i < len; i++) {
                this._materials[i] = elements[i];
            }
        }
        _updateRenderElements() {
            let elementLength = this._renderElements.length;
            for (let i = 0; i < elementLength; i++) {
                let element = this._renderElements[i];
                let material = this._materials[i];
                element.materialShaderData = material.shaderData;
                element.subShader = material._shader.getSubShaderAt(0);
                element.value2DShaderData = this._spriteShaderData;
            }
        }
        _onMeshChange(mesh, force = false) {
            let hasChange = false;
            if (this._mesh != mesh || force) {
                hasChange = true;
                if (mesh) {
                    let subMeshes = mesh._subMeshes;
                    let elementLength = this._renderElements.length;
                    let flength = Math.max(elementLength, mesh.subMeshCount);
                    for (let i = 0; i < flength; i++) {
                        let element = this._renderElements[i];
                        let subMesh = subMeshes[i];
                        if (subMesh) {
                            if (!element) {
                                element = Spine2DRenderNode.createRenderElement2D();
                                this._renderElements[i] = element;
                            }
                            let material = this._materials[i];
                            element.geometry = subMesh;
                            element.materialShaderData = material.shaderData;
                            element.subShader = material._shader.getSubShaderAt(0);
                            element.value2DShaderData = this._spriteShaderData;
                            element.nodeCommonMap = this._getcommonUniformMap();
                        }
                        else {
                            Spine2DRenderNode.recoverRenderElement2D(element);
                        }
                    }
                    this._renderElements.length = mesh.subMeshCount;
                    SpineShaderInit.changeVertexDefine(this._spriteShaderData, mesh);
                }
                else {
                    for (let i = 0, len = this._renderElements.length; i < len; i++)
                        Spine2DRenderNode.recoverRenderElement2D(this._renderElements[i]);
                    this._renderElements.length = 0;
                }
            }
            this._mesh = mesh;
            return hasChange;
        }
    }
    Spine2DRenderNode._pool = [];
    Spine2DRenderNode.STOPPED = 0;
    Spine2DRenderNode.PAUSED = 1;
    Spine2DRenderNode.PLAYING = 2;
    class TimeKeeper {
        constructor(timer) {
            this.maxDelta = 0.064;
            this.timer = timer;
        }
        update() {
            this.delta = this.timer.delta / 1000;
            if (this.delta > this.maxDelta)
                this.delta = this.maxDelta;
        }
    }
    Laya.ClassUtils.regClass("Spine2DRenderNode", Spine2DRenderNode);

    class SpineSkeleton extends Laya.Sprite {
        constructor() {
            super();
            this._spineComponent = this.addComponent(Spine2DRenderNode);
        }
        get externalSkins() {
            return this._spineComponent.externalSkins;
        }
        set externalSkins(value) {
            this._spineComponent.externalSkins = value;
        }
        resetExternalSkin() {
            this._spineComponent.resetExternalSkin();
        }
        get source() {
            return this._spineComponent.source;
        }
        set source(value) {
            this._spineComponent.source = value;
        }
        get skinName() {
            return this._spineComponent.skinName;
        }
        set skinName(value) {
            this._spineComponent.skinName = value;
        }
        get animationName() {
            return this._spineComponent.animationName;
        }
        set animationName(value) {
            this._spineComponent.animationName = value;
        }
        get loop() {
            return this._spineComponent.loop;
        }
        set loop(value) {
            this._spineComponent.loop = value;
        }
        get templet() {
            return this._spineComponent.templet;
        }
        set templet(value) {
            this._spineComponent.templet = value;
        }
        set currentTime(value) {
            this._spineComponent.currentTime = value;
        }
        get playState() {
            return this._spineComponent.playState;
        }
        get spineItem() {
            return this._spineComponent.spineItem;
        }
        set spineItem(value) {
            this._spineComponent.spineItem = value;
        }
        play(nameOrIndex, loop, force = true, start = 0, end = 0, freshSkin = true, playAudio = true) {
            this._spineComponent.play(nameOrIndex, loop, force, start, end, freshSkin, playAudio);
        }
        getAnimNum() {
            return this._spineComponent.getAnimNum();
        }
        getAniNameByIndex(index) {
            return this._spineComponent.getAniNameByIndex(index);
        }
        getSlotByName(slotName) {
            return this._spineComponent.getSlotByName(slotName);
        }
        playbackRate(value) {
            this._spineComponent.playbackRate(value);
        }
        showSkinByName(name) {
            this._spineComponent.showSkinByName(name);
        }
        showSkinByIndex(skinIndex) {
            this._spineComponent.showSkinByIndex(skinIndex);
        }
        stop() {
            this._spineComponent.stop();
        }
        paused() {
            this._spineComponent.paused();
        }
        resume() {
            this._spineComponent.resume();
        }
        destroy(destroyChild = true) {
            if (this._spineComponent.templet) {
                this._spineComponent.reset();
            }
            super.destroy(destroyChild);
        }
        addAnimation(nameOrIndex, loop = false, delay = 0) {
            this._spineComponent.addAnimation(nameOrIndex, loop, delay);
        }
        setMix(fromNameOrIndex, toNameOrIndex, duration) {
            this._spineComponent.setMix(fromNameOrIndex, toNameOrIndex, duration);
        }
        getBoneByName(boneName) {
            return this._spineComponent.getBoneByName(boneName);
        }
        getSkeleton() {
            return this._spineComponent.getSkeleton();
        }
        setSlotAttachment(slotName, attachmentName) {
            this._spineComponent.setSlotAttachment(slotName, attachmentName);
        }
    }
    exports.ESpineRenderType = void 0;
    (function (ESpineRenderType) {
        ESpineRenderType[ESpineRenderType["boneGPU"] = 0] = "boneGPU";
        ESpineRenderType[ESpineRenderType["normal"] = 1] = "normal";
        ESpineRenderType[ESpineRenderType["rigidBody"] = 2] = "rigidBody";
    })(exports.ESpineRenderType || (exports.ESpineRenderType = {}));

    class SpineTemplet extends Laya.Resource {
        constructor() {
            super();
            this.materialMap = new Map();
            this.hasPhysics = false;
            this.mainBlendMode = 0;
            this._premultipliedAlpha = true;
            this._textures = {};
            this.sketonOptimise = new SketonOptimise();
        }
        get _mainTexture() {
            let i = 0;
            let tex;
            for (let k in this._textures) {
                tex = this._textures[k];
                if (tex) {
                    i++;
                    if (i > 1) {
                        return null;
                    }
                }
            }
            return tex;
        }
        get premultipliedAlpha() {
            return this._premultipliedAlpha;
        }
        get basePath() {
            return this._basePath;
        }
        getMaterial(texture, blendMode) {
            if (!texture) {
                console.error("SpineError:cant Find Main Texture");
                texture = Laya.Texture2D.whiteTexture;
            }
            let key = texture.id + "_" + blendMode;
            let mat = this.materialMap.get(key);
            if (!mat) {
                mat = new Laya.Material();
                mat.setShaderName("SpineStandard");
                SpineShaderInit.initSpineMaterial(mat);
                mat.setTextureByIndex(SpineShaderInit.SpineTexture, texture);
                if (texture.gammaCorrection != 1) {
                    mat.addDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
                else {
                    mat.removeDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
                SpineShaderInit.SetSpineBlendMode(blendMode, mat, this._premultipliedAlpha);
                if (this._premultipliedAlpha) {
                    mat.addDefine(SpineShaderInit.SPINE_PREMULTIPLYALPHA);
                }
                else {
                    mat.removeDefine(SpineShaderInit.SPINE_PREMULTIPLYALPHA);
                }
                mat._addReference();
                this.materialMap.set(key, mat);
            }
            return mat;
        }
        getTexture(name) {
            return this._textures[name];
        }
        setTexture(name, tex) {
            this._textures[name] = tex;
        }
        _parse(desc, atlas, textures, premultipliedAlpha = true) {
            var _a;
            let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
            if (desc instanceof ArrayBuffer) {
                let skeletonBinary = new spine.SkeletonBinary(atlasLoader, false);
                this.skeletonData = skeletonBinary.readSkeletonData(new Uint8Array(desc));
            }
            else {
                let skeletonJson = new spine.SkeletonJson(atlasLoader, false);
                this.skeletonData = skeletonJson.readSkeletonData(desc);
            }
            this._textures = textures;
            this._atlas = atlas;
            this.mainBlendMode = ((_a = this.skeletonData.slots[0]) === null || _a === void 0 ? void 0 : _a.blendMode) || 0;
            this.mainTexture = this._mainTexture;
            this.width = this.skeletonData.width;
            this.height = this.skeletonData.height;
            this.offsetX = this.skeletonData.x;
            this.offsetY = this.skeletonData.y;
            this._premultipliedAlpha = premultipliedAlpha;
            this.hasPhysics = this.skeletonData.physicsConstraints && this.skeletonData.physicsConstraints.length > 0;
            this.sketonOptimise.canCache = this.sketonOptimise.canCache && !this.hasPhysics;
            this.sketonOptimise.checkMainAttach(this.skeletonData);
        }
        getAniNameByIndex(index) {
            let tAni = this.skeletonData.getAnimationByIndex(index);
            if (tAni)
                return tAni.name;
            return null;
        }
        findAnimation(name) {
            return this.skeletonData.findAnimation(name);
        }
        getSkinIndexByName(skinName) {
            return this.skeletonData.getSkinIndexByName(skinName);
        }
        _disposeResource() {
            this.sketonOptimise.destroy();
            for (let k in this._textures) {
                let tex = this._textures[k];
                if (tex) {
                    tex._removeReference();
                }
            }
            if (this._referenceCount <= 0) {
                this.materialMap.forEach(value => {
                    value._removeReference();
                });
                this.materialMap.clear();
            }
            else {
                console.error("SpineTemplet is using");
            }
            this.skeletonData = null;
            this.sketonOptimise = null;
        }
    }
    SpineTemplet.RuntimeVersion = "3.8";

    class SpineTexture {
        constructor(tex) {
            this.realTexture = tex;
        }
        getImage() {
            var _a, _b, _c, _d;
            return {
                width: (_b = ((_a = this.realTexture) === null || _a === void 0 ? void 0 : _a.width)) !== null && _b !== void 0 ? _b : 16,
                height: (_d = ((_c = this.realTexture) === null || _c === void 0 ? void 0 : _c.height)) !== null && _d !== void 0 ? _d : 16,
            };
        }
        setFilters(minFilter, magFilter) {
            if (!this.realTexture)
                return;
            let filterMode;
            if (magFilter === window.spine.TextureFilter.Nearest)
                filterMode = Laya.FilterMode.Point;
            else
                filterMode = Laya.FilterMode.Bilinear;
            this.realTexture.filterMode = filterMode;
        }
        convertWrapMode(mode) {
            return mode == spine.TextureWrap.ClampToEdge ? Laya.WrapMode.Clamp : (mode == spine.TextureWrap.MirroredRepeat ? Laya.WrapMode.Mirrored : Laya.WrapMode.Repeat);
        }
        setWraps(uWrap, vWrap) {
            if (!this.realTexture)
                return;
            this.realTexture.wrapModeU = this.convertWrapMode(uWrap);
            this.realTexture.wrapModeV = this.convertWrapMode(vWrap);
        }
    }

    const _premultipliedAlpha = true;
    const _srgb = true;
    class SpineTempletLoader {
        load(task) {
            let atlasUrl = Laya.Utils.replaceFileExtension(task.url, "atlas");
            return Promise.all([
                task.loader.fetch(task.url, task.ext == "skel" ? "arraybuffer" : "json", task.progress.createCallback()),
                task.loader.fetch(atlasUrl, "text", task.progress.createCallback())
            ]).then(res => {
                if (!res[0] || !res[1])
                    return null;
                let templet = new SpineTemplet();
                let version = SpineTemplet.RuntimeVersion;
                if (version == "4.1") {
                    templet.needSlot = true;
                }
                if (version.startsWith('4.'))
                    return this.parseAtlas4(res[0], res[1], task, templet);
                else
                    return this.parseAtlas3(res[0], res[1], task, templet);
            });
        }
        parseAtlas3(desc, atlasText, task, templet) {
            var _a;
            let atlasPages = [];
            let basePath = Laya.URL.getPath(task.url);
            let atlas = new spine.TextureAtlas(atlasText, (path) => {
                let url = basePath + path;
                atlasPages.push({
                    url, type: Laya.Loader.TEXTURE2D,
                    propertyParams: {
                        premultiplyAlpha: _premultipliedAlpha
                    },
                    constructParams: [0, 0, Laya.TextureFormat.R8G8B8A8, false, false, _srgb, _premultipliedAlpha]
                });
                return new SpineTexture(null);
            });
            return Laya.Laya.loader.load(atlasPages, null, (_a = task.progress) === null || _a === void 0 ? void 0 : _a.createCallback()).then((res) => {
                let textures = {};
                let premultipliedAlpha = true;
                for (var i = 0; i < res.length; i++) {
                    let tex = res[i];
                    if (tex)
                        tex._addReference();
                    let pages = atlas.pages;
                    let page = pages[i];
                    premultipliedAlpha = page.pma || (tex && tex._premultiplyAlpha && premultipliedAlpha);
                    page.texture.realTexture = tex;
                    page.texture.setFilters(page.minFilter, page.magFilter);
                    page.texture.setWraps(page.uWrap, page.vWrap);
                    page.width = page.texture.getImage().width;
                    page.height = page.texture.getImage().height;
                    textures[page.name] = tex;
                }
                let regions = atlas.regions;
                for (const region of regions) {
                    let page = region.page;
                    region.u = region.x / page.width;
                    region.v = region.y / page.height;
                    if (region.rotate) {
                        region.u2 = (region.x + region.height) / page.width;
                        region.v2 = (region.y + region.width) / page.height;
                    }
                    else {
                        region.u2 = (region.x + region.width) / page.width;
                        region.v2 = (region.y + region.height) / page.height;
                    }
                }
                templet._parse(desc, atlas, textures, premultipliedAlpha);
                return templet;
            });
        }
        parseAtlas4(desc, atlasText, task, templet) {
            var _a;
            let atlas = new spine.TextureAtlas(atlasText);
            let basePath = Laya.URL.getPath(task.url);
            return Laya.Laya.loader.load(atlas.pages.map((page) => {
                return {
                    url: basePath + page.name,
                    type: Laya.Loader.TEXTURE2D,
                    propertyParams: {
                        premultiplyAlpha: _premultipliedAlpha
                    },
                    constructParams: [0, 0, Laya.TextureFormat.R8G8B8A8, false, false, _srgb, _premultipliedAlpha]
                };
            }), null, (_a = task.progress) === null || _a === void 0 ? void 0 : _a.createCallback()).then((res) => {
                let textures = {};
                let pages = atlas.pages;
                let premultipliedAlpha = true;
                for (let i = 0, len = res.length; i < len; i++) {
                    let tex = res[i];
                    if (tex)
                        tex._addReference();
                    let page = pages[i];
                    premultipliedAlpha = page.pma || (tex._premultiplyAlpha && premultipliedAlpha);
                    textures[page.name] = tex;
                    page.setTexture(new SpineTexture(tex));
                }
                templet._parse(desc, atlas, textures, premultipliedAlpha);
                return templet;
            });
        }
    }
    Laya.Loader.registerLoader(["skel"], SpineTempletLoader, Laya.Loader.SPINE);

    let c = Laya.ClassUtils.regClass;
    c("SpineSkeleton", SpineSkeleton);
    c("ExternalSkin", ExternalSkin);
    c("ExternalSkinItem", ExternalSkinItem);
    Laya.Laya.addBeforeInitCallback(() => {
        if (Laya.PlayerConfig.spineVersion)
            SpineTemplet.RuntimeVersion = Laya.PlayerConfig.spineVersion;
    });

    class SpineBakeScript extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            if (this.bakeData)
                this.initBake(JSON.parse(this.bakeData));
        }
        onDisable() {
            let spine = this.owner.getComponent(Spine2DRenderNode);
            if (spine.spineItem)
                spine.spineItem.initBake(null);
        }
        async attach(spine) {
            let texture = await Laya.Laya.loader.load({
                url: this.url,
                type: Laya.Loader.TEXTURE2D,
                constructParams: [
                    256, 256, Laya.TextureFormat.R32G32B32A32, false, false, false, false
                ]
            });
            spine.initBake({
                bonesNums: 60,
                aniOffsetMap: {
                    "idle": 0,
                    "skill": 179 * 60 * 2
                },
                texture2d: texture
            });
        }
        async initBake(data) {
            const textureWidth = data.aniOffsetMap.textureWidth || 256;
            let texture = await Laya.Laya.loader.load({
                url: data.simpPath,
                type: Laya.Loader.TEXTURE2D,
                constructParams: [
                    textureWidth, textureWidth, Laya.TextureFormat.R32G32B32A32, false, false, false, false
                ]
            });
            data.texture2d = texture;
            let spine = this.owner.getComponent(Spine2DRenderNode);
            if (spine.spineItem && !(spine.spineItem instanceof SpineEmptyRender)) {
                spine.spineItem.initBake(data);
            }
            else {
                this.owner.on(Laya.Event.READY, this, () => {
                    spine.spineItem.initBake(data);
                });
            }
        }
    }
    Laya.ClassUtils.regClass("SpineBakeScript", SpineBakeScript);

    class SpineInstanceBatch {
        constructor() {
            this._recoverList = new Laya.FastSinglelist();
        }
        check(left, right) {
            if (left.materialShaderData != right.materialShaderData
                || left.geometry.instanceCount
                || right.geometry.instanceCount)
                return false;
            return true;
        }
        batchRenderElement(list, start, length) {
            let elementArray = list.elements;
            let batchStart = -1;
            for (let i = 0; i < length - 1; i++) {
                let index = start + i;
                let cElement = elementArray[index];
                let nElement = elementArray[index + 1];
                if (this.check(cElement, nElement)) {
                    if (batchStart == -1) {
                        batchStart = i;
                    }
                }
                else {
                    if (batchStart != -1) {
                        this.batch(list, batchStart + start, i - batchStart);
                    }
                    batchStart = 0;
                }
            }
            if (batchStart != -1) {
                this.batch(list, batchStart + start, length - batchStart);
            }
        }
        updateBuffer(info, nMatrixData, simpleAnimatorData, instanceCount) {
            let nMatrixInstanceVB = info.nMatrixInstanceVB;
            let simpleAnimatorVB = info.simpleAnimatorVB;
            nMatrixInstanceVB.setData(nMatrixData.buffer, 0, 0, instanceCount * 6 * 4);
            simpleAnimatorVB.setData(simpleAnimatorData.buffer, 0, 0, instanceCount * 4 * 4);
        }
        batch(list, start, length) {
            let instanceElement, geometry;
            let elementArray = list.elements;
            let nMatrixData = SpineInstanceElement2DTool._instanceBufferCreate(6 * SpineInstanceElement2DTool.MaxInstanceCount);
            let simpleAnimatorData = SpineInstanceElement2DTool._instanceBufferCreate(4 * SpineInstanceElement2DTool.MaxInstanceCount);
            let info;
            let instanceCount = 0;
            for (let i = 0; i < length; i++) {
                let element = elementArray[start + i];
                let shaderData = element.value2DShaderData;
                if (!instanceElement) {
                    let originGeo = element.geometry;
                    info = SpineInstanceElement2DTool.getInstanceInfo(originGeo);
                    instanceElement = info.element;
                    this._recoverList.add(info);
                    geometry = instanceElement.geometry;
                    instanceCount = geometry.instanceCount = 0;
                    instanceElement.subShader = element.subShader;
                    instanceElement.materialShaderData = element.materialShaderData;
                    instanceElement.value2DShaderData = element.value2DShaderData;
                    instanceElement.renderStateIsBySprite = element.renderStateIsBySprite;
                    instanceElement.nodeCommonMap = element.nodeCommonMap;
                    instanceElement.value2DShaderData.addDefine(SpineShaderInit.SPINE_GPU_INSTANCE);
                }
                let nMatrix_0 = shaderData.getVector3(Laya.BaseRenderNode2D.NMATRIX_0);
                let nMatrix_1 = shaderData.getVector3(Laya.BaseRenderNode2D.NMATRIX_1);
                let nMatrixOffset = instanceCount * 6;
                nMatrixData[nMatrixOffset] = nMatrix_0.x;
                nMatrixData[nMatrixOffset + 1] = nMatrix_0.y;
                nMatrixData[nMatrixOffset + 2] = nMatrix_0.z;
                nMatrixData[nMatrixOffset + 3] = nMatrix_1.x;
                nMatrixData[nMatrixOffset + 4] = nMatrix_1.y;
                nMatrixData[nMatrixOffset + 5] = nMatrix_1.z;
                let simpleAnimatorParams = shaderData.getVector(SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS);
                let offset = instanceCount * 4;
                simpleAnimatorData[offset] = simpleAnimatorParams.x;
                simpleAnimatorData[offset + 1] = simpleAnimatorParams.y;
                simpleAnimatorData[offset + 2] = simpleAnimatorParams.z;
                simpleAnimatorData[offset + 3] = simpleAnimatorParams.w;
                instanceCount++;
                geometry.instanceCount = instanceCount;
                if (geometry.instanceCount == SpineInstanceElement2DTool.MaxInstanceCount) {
                    this.updateBuffer(info, nMatrixData, simpleAnimatorData, geometry.instanceCount);
                    list.add(instanceElement);
                    instanceElement = null;
                }
            }
            if (instanceElement) {
                this.updateBuffer(info, nMatrixData, simpleAnimatorData, geometry.instanceCount);
                list.add(instanceElement);
            }
            SpineInstanceElement2DTool._instanceBufferRecover(nMatrixData);
            SpineInstanceElement2DTool._instanceBufferRecover(simpleAnimatorData);
        }
        recover() {
            let length = this._recoverList.length;
            let recoverArray = this._recoverList.elements;
            for (let i = 0; i < length; i++) {
                let info = recoverArray[i];
                SpineInstanceElement2DTool.recover(info);
            }
            this._recoverList.length = 0;
        }
    }
    Laya.Laya.addAfterInitCallback(function () {
        SpineInstanceBatch.instance = new SpineInstanceBatch;
        Laya.RenderManager2D.regisBatch(Laya.BaseRender2DType.spineSimple, SpineInstanceBatch.instance);
    });
    class SpineInstanceElement2DTool {
        static getInstanceInfo(geometry) {
            let infos = SpineInstanceElement2DTool._instanceBufferInfoMap.get(geometry);
            if (!infos) {
                infos = [];
                SpineInstanceElement2DTool._instanceBufferInfoMap.set(geometry, infos);
            }
            let info = infos.pop() || SpineInstanceElement2DTool.createInstanceInfo(geometry);
            return info;
        }
        static createInstanceInfo(geometry) {
            let element = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            let instanceGeometry = element.geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElementInstance);
            let state = Laya.LayaGL.renderDeviceFactory.createBufferState();
            let info = { state, element, source: geometry };
            let oriBufferState = geometry.bufferState;
            let vertexArray = oriBufferState._vertexBuffers.slice();
            let nMatrixInstanceVB = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            nMatrixInstanceVB.setDataLength(SpineInstanceElement2DTool.MaxInstanceCount * 16 * 4);
            nMatrixInstanceVB.vertexDeclaration = SpineShaderInit.instanceNMatrixDeclaration;
            nMatrixInstanceVB.instanceBuffer = true;
            vertexArray.push(nMatrixInstanceVB);
            info.nMatrixInstanceVB = nMatrixInstanceVB;
            let simpleAnimatorVB = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
            simpleAnimatorVB.setDataLength(SpineInstanceElement2DTool.MaxInstanceCount * 4 * 4);
            simpleAnimatorVB.vertexDeclaration = SpineShaderInit.instanceSimpleAnimatorDeclaration;
            simpleAnimatorVB.instanceBuffer = true;
            vertexArray.push(simpleAnimatorVB);
            info.simpleAnimatorVB = simpleAnimatorVB;
            state.applyState(vertexArray, geometry.bufferState._bindedIndexBuffer);
            instanceGeometry.drawParams.elements = geometry.drawParams.elements.slice();
            instanceGeometry.drawParams.length = geometry.drawParams.length;
            instanceGeometry.indexFormat = geometry.indexFormat;
            instanceGeometry.bufferState = state;
            return info;
        }
        static recover(info) {
            let element = info.element;
            element.value2DShaderData.removeDefine(SpineShaderInit.SPINE_GPU_INSTANCE);
            element.value2DShaderData = null;
            element.materialShaderData = null;
            element.subShader = null;
            element.nodeCommonMap = null;
            let infos = SpineInstanceElement2DTool._instanceBufferInfoMap.get(info.source);
            infos.push(info);
        }
        static _instanceBufferCreate(length) {
            let array = SpineInstanceElement2DTool._bufferPool[length];
            if (!array) {
                array = SpineInstanceElement2DTool._bufferPool[length] = [];
            }
            let element = array.pop() || new Float32Array(length);
            return element;
        }
        static _instanceBufferRecover(float32) {
            let length = float32.length;
            let array = SpineInstanceElement2DTool._bufferPool[length];
            if (!array) {
                array = SpineInstanceElement2DTool._bufferPool[length] = [];
            }
            array.push(float32);
        }
    }
    SpineInstanceElement2DTool.MaxInstanceCount = 2048;
    SpineInstanceElement2DTool._instanceBufferInfoMap = new Map;
    SpineInstanceElement2DTool._pool = [];
    SpineInstanceElement2DTool._bufferPool = [];

    exports.AnimationRender = AnimationRender;
    exports.AnimationRenderProxy = AnimationRenderProxy;
    exports.AttachmentParse = AttachmentParse;
    exports.ChangeDeform = ChangeDeform;
    exports.ChangeDrawOrder = ChangeDrawOrder;
    exports.ChangeRGBA = ChangeRGBA;
    exports.ChangeSlot = ChangeSlot;
    exports.ExternalSkin = ExternalSkin;
    exports.ExternalSkinItem = ExternalSkinItem;
    exports.IBCreator = IBCreator;
    exports.MultiRenderData = MultiRenderData;
    exports.SketonOptimise = SketonOptimise;
    exports.SkinAniRenderData = SkinAniRenderData;
    exports.SkinAttach = SkinAttach;
    exports.SkinRenderUpdate = SkinRenderUpdate;
    exports.SlotUtils = SlotUtils;
    exports.Spine2DRenderNode = Spine2DRenderNode;
    exports.SpineAdapter = SpineAdapter;
    exports.SpineBakeScript = SpineBakeScript;
    exports.SpineEmptyRender = SpineEmptyRender;
    exports.SpineInstanceBatch = SpineInstanceBatch;
    exports.SpineInstanceElement2DTool = SpineInstanceElement2DTool;
    exports.SpineMeshBase = SpineMeshBase;
    exports.SpineMeshUtils = SpineMeshUtils;
    exports.SpineNormalRender = SpineNormalRender;
    exports.SpineNormalRenderBase = SpineNormalRenderBase;
    exports.SpineOptimizeConst = SpineOptimizeConst;
    exports.SpineOptimizeRender = SpineOptimizeRender;
    exports.SpineShaderInit = SpineShaderInit;
    exports.SpineSkeleton = SpineSkeleton;
    exports.SpineSkeletonRenderer = SpineSkeletonRenderer;
    exports.SpineTemplet = SpineTemplet;
    exports.SpineTexture = SpineTexture;
    exports.SpineVirtualMesh = SpineVirtualMesh;
    exports.SpineWasmRender = SpineWasmRender;
    exports.SpineWasmVirturalMesh = SpineWasmVirturalMesh;
    exports.VBBoneCreator = VBBoneCreator;
    exports.VBCreator = VBCreator;
    exports.VBRigBodyCreator = VBRigBodyCreator;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.spine.js.map
