(function (exports, Laya) {
    'use strict';

    class ExternalSkin {
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
            var _a;
            let targetTemplet = (_a = this.target) === null || _a === void 0 ? void 0 : _a.templet;
            if (this._items
                && this._templet
                && targetTemplet
                && targetTemplet._textures) {
                let optimize = this._templet.optimize;
                if (!optimize)
                    return;
                for (let i = this._items.length - 1; i >= 0; i--) {
                    let o = this._items[i];
                    this.target.setTempletAttachment(this._templet, o.slot, o.skin, o.attachment);
                }
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

    var spineVertexCommon = "#if !defined(SpineVertexCommon_lib)\n#define SpineVertexCommon_lib\nuniform vec4 u_color;\n#ifdef SPINE_RB\nuniform vec4 u_sBone0;uniform vec4 u_sBone1;\n#endif\nvoid transfrom(vec2 pos,vec4 xDir,vec4 yDir,out vec2 outPos){outPos.x=xDir.x*pos.x+xDir.y*pos.y+xDir.z;outPos.y=yDir.x*pos.x+yDir.y*pos.y+yDir.z;}\n#ifdef SPINE_SIMPLE\nuniform vec4 u_SimpleAnimatorParams;uniform sampler2D u_SimpleAnimatorTexture;uniform float u_SimpleAnimatorTextureSize;vec4 getBonePosBake(float FramePos,float boneIndices,float weight,vec2 pos,float offset){vec2 uv=vec2(0.0,0.0);float PixelPos=FramePos+boneIndices*2.0;float halfOffset=offset*0.5;float uvoffset=PixelPos/u_SimpleAnimatorTextureSize;uv.y=floor(uvoffset)*offset+halfOffset;uv.x=mod(PixelPos,u_SimpleAnimatorTextureSize)*offset+halfOffset;vec4 up=texture2D(u_SimpleAnimatorTexture,uv);uv.x+=offset;vec4 down=texture2D(u_SimpleAnimatorTexture,uv);vec2 outPos;transfrom(pos,up,down,outPos);outPos=outPos*weight;return vec4(outPos,0.,1.0);}\n#endif\n#ifdef SPINE_FAST\nuniform vec4 u_sBone[200];vec4 getBonePos(float fboneId,float weight,vec2 pos){int boneId=int(fboneId);vec4 up=u_sBone[boneId*2];vec4 down=u_sBone[boneId*2+1];vec2 outPos;transfrom(pos,up,down,outPos);outPos=outPos*weight;return vec4(outPos,0.,1.0);}\n#endif\nvec4 getSpinePos(){\n#ifdef SPINE_SIMPLE\n#ifdef GPU_INSTANCE\nfloat currentPixelPos=a_SimpleTextureParams.x+a_SimpleTextureParams.y;\n#else\nfloat currentPixelPos=u_SimpleAnimatorParams.x+u_SimpleAnimatorParams.y;\n#endif\nfloat offset=1.0/u_SimpleAnimatorTextureSize;return getBonePosBake(currentPixelPos,a_BoneId,a_weight,a_position,offset)+getBonePosBake(currentPixelPos,a_PosWeightBoneID_2.w,a_PosWeightBoneID_2.z,a_PosWeightBoneID_2.xy,offset)+getBonePosBake(currentPixelPos,a_PosWeightBoneID_3.w,a_PosWeightBoneID_3.z,a_PosWeightBoneID_3.xy,offset)+getBonePosBake(currentPixelPos,a_PosWeightBoneID_4.w,a_PosWeightBoneID_4.z,a_PosWeightBoneID_4.xy,offset);\n#else\n#ifdef SPINE_FAST\nreturn getBonePos(a_BoneId,a_weight,a_position)+getBonePos(a_PosWeightBoneID_2.w,a_PosWeightBoneID_2.z,a_PosWeightBoneID_2.xy)+getBonePos(a_PosWeightBoneID_3.w,a_PosWeightBoneID_3.z,a_PosWeightBoneID_3.xy)+getBonePos(a_PosWeightBoneID_4.w,a_PosWeightBoneID_4.z,a_PosWeightBoneID_4.xy);\n#endif\n#ifdef SPINE_RB\nvec2 pos;transfrom(a_position,u_sBone0,u_sBone1,pos);return vec4(pos,0.,1.);\n#endif\n#endif\nreturn vec4(a_position.x,a_position.y,0.,1.);}\n#endif\n";

    var spineFragment = "#if !defined(SpineFragment_lib)\n#define SpineFragment_lib\n#include \"Sprite2DFrag.glsl\";\nvec4 getColor(){vec4 color=texture2D(u_spineTexture,v_texcoord.xy);\n#ifndef GAMMATEXTURE\n#ifdef GAMMASPACE\ncolor.xyz=linearToGamma(color.xyz);\n#endif\n#else\n#ifndef GAMMASPACE\ncolor.xyz=gammaToLinear(color.xyz);\n#endif\n#endif\nvec4 final;\n#ifdef TWOCOLORTINT\nfinal.a=color.a*v_color.a;final.xyz=((color.a-1.0)*v_color2.a+1.0-color.xyz)*v_color2.xyz+color.xyz*v_color.xyz;\n#else\nfinal=color*v_color;\n#endif\nreturn final;}\n#endif\n";

    var spine2DVertex = "#if !defined(SpineVertex_lib)\n#define SpineVertex_lib\nvoid transfrom_spine(vec2 pos,vec3 xDir,vec3 yDir,out vec2 outPos){outPos.x=xDir.x*pos.x-xDir.y*pos.y+xDir.z;outPos.y=yDir.x*pos.x-yDir.y*pos.y+yDir.z;}void getGlobalPos(vec4 pos,out vec2 globalPos){\n#ifdef GPU_INSTANCE\nvec3 down=a_NMatrix_1;vec3 up=a_NMatrix_0;\n#else\nvec3 down=u_NMatrix_1;vec3 up=u_NMatrix_0;\n#endif\n#ifdef SPINE_NORMAL_2D\nglobalPos.xy=pos.xy;\n#else\ntransfrom_spine(pos.xy,up,down,globalPos);\n#endif\n}vec4 getScreenPos(vec4 pos){vec2 globalPos;\n#ifdef GPU_INSTANCE\nvec3 down=a_NMatrix_1;vec3 up=a_NMatrix_0;\n#else\nvec3 down=u_NMatrix_1;vec3 up=u_NMatrix_0;\n#endif\n#ifdef SPINE_NORMAL_2D\nglobalPos.xy=pos.xy;\n#else\ntransfrom_spine(pos.xy,up,down,globalPos);\n#endif\nclip(globalPos);vec2 viewPos;getViewPos(globalPos,viewPos);vec4 outPos;getProjectPos(viewPos,outPos);return outPos;}void getVertexInfo(vec4 pos,inout vertexInfo info){info.pos=pos.xy;info.color=vec4(1.0);\n#ifdef COLOR\ninfo.color=a_color;\n#endif\ninfo.color*=u_baseRenderColor;\n#ifdef PREMULTIPLYALPHA\ninfo.color.rgb=info.color.rgb*info.color.a;\n#endif\n#ifdef UV\ninfo.uv=a_uv;\n#endif\n#ifdef LIGHT2D_ENABLE\nvec2 global;getGlobalPos(pos,global);info.lightUV.x=(global.x-u_LightAndShadow2DParam.x)/u_LightAndShadow2DParam.z;info.lightUV.y=1.0-(global.y-u_LightAndShadow2DParam.y)/u_LightAndShadow2DParam.w;\n#endif\n}\n#endif\n";

    var spineStandardVS = "#define SHADER_NAME SpineStandardVS\nvarying vec4 v_color2;\n#include \"Sprite2DVertex.glsl\";\n#include \"SpineVertexCommon.glsl\";\n#include \"Spine2DVertex.glsl\";\nvoid main(){vec4 pos=getSpinePos();vertexInfo info;getVertexInfo(pos,info);v_texcoord=info.uv;v_color=info.color;\n#ifdef COLOR2\nv_color2=a_color2;\n#else\nv_color2=vec4(0.0,0.0,0.0,1.0);\n#endif\n#ifdef PREMULTIPLYALPHA\nv_color2.xyz=v_color2.xyz*v_color.a;\n#endif\n#ifdef LIGHT2D_ENABLE\nlightAndShadow(info);\n#endif\ngl_Position=getScreenPos(pos);}";

    var spineStandardFS = "#define SHADER_NAME SpineStandardFS\nvarying vec4 v_color2;\n#include \"SpineFragment.glsl\";\nvoid main(){clip();gl_FragColor=getColor();\n#ifdef LIGHT2D_ENABLE\nlightAndShadow(gl_FragColor);\n#endif\n}";

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
        static init() {
            Laya.Shader3D.addInclude("SpineFragment.glsl", spineFragment);
            Laya.Shader3D.addInclude("Spine2DVertex.glsl", spine2DVertex);
            Laya.Shader3D.addInclude("SpineVertexCommon.glsl", spineVertexCommon);
            SpineShaderInit.BONEMAT = Laya.Shader3D.propertyNameToID("u_sBone");
            SpineShaderInit.BONEMAT_0 = Laya.Shader3D.propertyNameToID("u_sBone0");
            SpineShaderInit.BONEMAT_1 = Laya.Shader3D.propertyNameToID("u_sBone1");
            SpineShaderInit.SpineTexture = Laya.Shader3D.propertyNameToID("u_spineTexture");
            SpineShaderInit.SPINE_RENDER_SIZE = Laya.Shader3D.propertyNameToID("u_spineRenderSize");
            SpineShaderInit.SPINE_FAST = Laya.Shader3D.getDefineByName("SPINE_FAST");
            SpineShaderInit.SPINE_RB = Laya.Shader3D.getDefineByName("SPINE_RB");
            SpineShaderInit.SPINE_UV = Laya.Shader3D.getDefineByName("UV");
            SpineShaderInit.SPINE_COLOR = Laya.Shader3D.getDefineByName("COLOR");
            SpineShaderInit.SPINE_NORMAL_2D = Laya.Shader3D.getDefineByName("SPINE_NORMAL_2D");
            SpineShaderInit.SPINE_PREMULTIPLYALPHA = Laya.Shader3D.getDefineByName("PREMULTIPLYALPHA");
            SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS = Laya.Shader3D.propertyNameToID("u_SimpleAnimatorParams");
            SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE = Laya.Shader3D.propertyNameToID("u_SimpleAnimatorTexture");
            SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE = Laya.Shader3D.propertyNameToID("u_SimpleAnimatorTextureSize");
            SpineShaderInit.SPINE_SIMPLE = Laya.Shader3D.getDefineByName("SPINE_SIMPLE");
            SpineShaderInit.SPINE_GPU_INSTANCE = Laya.Shader3D.getDefineByName("GPU_INSTANCE");
            SpineShaderInit.SPINE_TWOCOLORTINT = Laya.Shader3D.getDefineByName("TWOCOLORTINT");
            SpineShaderInit.SPINE_COLOR2 = Laya.Shader3D.getDefineByName("COLOR2");
            const commandUniform = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Spine2D");
            commandUniform.addShaderUniformArray(SpineShaderInit.BONEMAT, "u_sBone", Laya.ShaderDataType.Vector4, 200);
            commandUniform.addShaderUniform(SpineShaderInit.BONEMAT_0, "u_sBone0", Laya.ShaderDataType.Vector3);
            commandUniform.addShaderUniform(SpineShaderInit.BONEMAT_1, "u_sBone1", Laya.ShaderDataType.Vector3);
            commandUniform.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS, "u_SimpleAnimatorParams", Laya.ShaderDataType.Vector4);
            commandUniform.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE, "u_SimpleAnimatorTexture", Laya.ShaderDataType.Texture2D);
            commandUniform.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE, "u_SimpleAnimatorTextureSize", Laya.ShaderDataType.Float);
            commandUniform.addShaderUniform(SpineShaderInit.SPINE_RENDER_SIZE, "u_spineRenderSize", Laya.ShaderDataType.Vector2);
            let shader = Laya.Shader3D.add("SpineStandard", true, false);
            shader.shaderType = Laya.ShaderFeatureType.D2_BaseRenderNode2D;
            let uniformMap = {
                "u_spineTexture": Laya.ShaderDataType.Texture2D
            };
            let subShader = new Laya.SubShader(SpineShaderInit.textureSpineAttribute, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(spineStandardVS, spineStandardFS);
            SpineShaderInit.SpineNormalVertexDeclaration = SpineShaderInit.getVertexDeclaration("UV,COLOR,POSITION,COLOR2");
            SpineShaderInit.instanceNMatrixDeclaration = new Laya.VertexDeclaration(24, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Vector3, 8),
                new Laya.VertexElement(12, Laya.VertexElementFormat.Vector3, 9),
            ]);
            SpineShaderInit.instanceSimpleAnimatorDeclaration = new Laya.VertexDeclaration(16, [
                new Laya.VertexElement(0, Laya.VertexElementFormat.Vector4, 10),
            ]);
        }
        static getVertexDeclaration(vertexFlag) {
            var verDec = SpineShaderInit._vertexDeclarationMap[vertexFlag];
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
                            throw new Error("unknown vertex flag.");
                    }
                    elements.push(element);
                }
                verDec = new Laya.VertexDeclaration(offset, elements);
                SpineShaderInit._vertexDeclarationMap[vertexFlag] = verDec;
            }
            return verDec;
        }
        static getAllVertexDeclarations() {
            if (this._declarations) {
                return this._declarations;
            }
            this._declarations = {};
            let vertexFlags = [
                "UV,COLOR,POSITION",
                "UV,COLOR,POSITION,COLOR2",
                "UV,COLOR,POSITION,BONE",
                "UV,COLOR,POSITION,BONE,COLOR2"
            ];
            for (const vertexFlag of vertexFlags) {
                this._declarations[vertexFlag] = SpineShaderInit.getVertexDeclaration(vertexFlag);
            }
            this._declarations["instanceMatrix"] = SpineShaderInit.instanceNMatrixDeclaration;
            this._declarations["simpleAnimation"] = SpineShaderInit.instanceSimpleAnimatorDeclaration;
            return this._declarations;
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
    SpineShaderInit._vertexDeclarationMap = {};
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

    class SpineTemplet extends Laya.Resource {
        constructor() {
            super();
            this.materialMap = new Map();
            this._spineMaterials2D = {};
            this._spineMaterials3D = {};
            this._spineMaterialTextures = {};
            this._spineMaterialTextureKeys = {};
            this.x = 0;
            this.y = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this._premultipliedAlpha = true;
        }
        get premultipliedAlpha() {
            return this._premultipliedAlpha;
        }
        get spineMaterials2D() {
            return this._spineMaterials2D;
        }
        set spineMaterials2D(value) {
            this._spineMaterials2D = value || {};
            this.onSpineMaterialsChanged();
        }
        get spineMaterials3D() {
            return this._spineMaterials3D;
        }
        set spineMaterials3D(value) {
            this._spineMaterials3D = value || {};
            this.onSpineMaterialsChanged();
        }
        get spineMaterialTextures() {
            return this._spineMaterialTextures;
        }
        set spineMaterialTextures(value) {
            this._spineMaterialTextures = value || {};
            this._refreshSpineMaterialTextureKeys();
            this.onSpineMaterialsChanged();
        }
        onSpineMaterialsChanged() {
            this.event(SpineTemplet.EVENT_SPINE_MATERIAL_CHANGE);
        }
        _getSpineMaterial(texture, blendMode, premultipliedAlpha, is3D) {
            if (!texture)
                return null;
            let dimension = is3D ? "3D" : "2D";
            let materials = is3D ? this._spineMaterials3D : this._spineMaterials2D;
            let material = this._getSpineMaterialByKey(materials, this._getSpineMaterialKey(texture, blendMode, premultipliedAlpha, dimension), is3D);
            if (material)
                return material;
            let keys = this._spineMaterialTextureKeys[texture.id];
            if (keys) {
                for (let key of keys) {
                    material = this._getSpineMaterialByKey(materials, `${key}_${blendMode}_${premultipliedAlpha}_${dimension}`, is3D);
                    if (material)
                        return material;
                }
            }
            return null;
        }
        _getSpineMaterialByKey(materials, key, is3D) {
            let material = materials[key];
            if (material instanceof Laya.Material && material.checkType(is3D ? Laya.ShaderFeatureType.D3 : Laya.ShaderFeatureType.D2_BaseRenderNode2D))
                return material;
            return null;
        }
        _getSpineMaterialKey(texture, blendMode, premultipliedAlpha, dimension) {
            return `${texture.id}_${blendMode}_${premultipliedAlpha}_${dimension}`;
        }
        getMaterial(texture, blendMode, premultipliedAlpha, is3D = false) {
            if (!texture) {
                console.warn("SpineError:cant Find Main Texture");
                texture = Laya.Texture2D.whiteTexture;
            }
            let remapMaterial = this._getSpineMaterial(texture, blendMode, premultipliedAlpha, is3D);
            if (remapMaterial)
                return remapMaterial;
            let key = this._getSpineMaterialKey(texture, blendMode, premultipliedAlpha, is3D ? "3D" : "2D");
            let mat = this.materialMap.get(key);
            if (!mat) {
                mat = new Laya.Material();
                mat.setShaderName(is3D ? "Spine3D" : "SpineStandard");
                mat.renderQueue = is3D ? 3000 : 2000;
                SpineShaderInit.initSpineMaterial(mat);
                mat.setTextureByIndex(SpineShaderInit.SpineTexture, texture);
                if (texture.gammaCorrection != 1) {
                    mat.addDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
                else {
                    mat.removeDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
                SpineShaderInit.SetSpineBlendMode(blendMode, mat, premultipliedAlpha);
                if (premultipliedAlpha) {
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
            if (!this._textures)
                this._textures = {};
            this._textures[name] = tex;
            this._registerSpineMaterialTexture(name, tex);
            this.onSpineMaterialsChanged();
        }
        registerTexture(texture) {
            if (!texture)
                return;
            let tex2d = texture.bitmap;
            if (!tex2d)
                return;
            this.setTexture(texture.url, tex2d);
        }
        _refreshSpineMaterialTextureKeys() {
            this._spineMaterialTextureKeys = {};
            if (!this._textures)
                return;
            for (let name in this._textures)
                this._registerSpineMaterialTexture(name, this._textures[name]);
        }
        _registerSpineMaterialTexture(name, texture) {
            if (!texture)
                return;
            let keys = this._spineMaterialTextureKeys[texture.id];
            if (!keys)
                keys = this._spineMaterialTextureKeys[texture.id] = [];
            this._addSpineMaterialTextureKey(keys, name);
            this._addSpineMaterialTextureKey(keys, texture.uuid);
            this._addSpineMaterialTextureKey(keys, texture.url);
            for (let id in this._spineMaterialTextures) {
                if (this._spineMaterialTextures[id] === name)
                    this._addSpineMaterialTextureKey(keys, id);
            }
        }
        _addSpineMaterialTextureKey(keys, key) {
            if (key && keys.indexOf(key) === -1)
                keys.push(key);
        }
        getAniNameByIndex(index) {
            return this.optimize.getAniNameByIndex(index);
        }
        getAnimationCount() {
            return this.optimize.getAnimationCount();
        }
        findAnimation(name) {
            return this.optimize.findAnimation(name);
        }
        hasAnimation(name) {
            return this.optimize.hasAnimation(name);
        }
        getSkinIndexByName(skinName) {
            return this.optimize.getSkinIndexByName(skinName);
        }
        checkPremultipliedAlpha() {
            let premultipliedAlpha = true;
            let textures = this._textures;
            for (const key in textures) {
                const texture2d = textures[key];
                premultipliedAlpha = texture2d._premultiplyAlpha && premultipliedAlpha;
            }
            return premultipliedAlpha;
        }
        _disposeResource() {
            this._parser.destroy();
            this.optimize.destroy();
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
            this._parser = null;
        }
    }
    SpineTemplet.EVENT_SPINE_MATERIAL_CHANGE = "spineMaterialChange";

    class SpineConst {
    }
    SpineConst.SPLIT_REGEX = /\r?\n/;
    SpineConst.PMA_REGEX = /^pma:\s*(true|false)$/i;
    SpineConst.PREMULTIPLIED_ALPHA_DEFAULT = false;
    SpineConst.VERSION = "3.8";
    SpineConst.VersionFirst = 3;
    SpineConst.VersionSecond = 8;
    SpineConst.normalRenderSwitch = false;
    SpineConst.MAX_BONES = 100;
    SpineConst.cacheSwitch = false;
    SpineConst.factory = null;
    SpineConst.VERTEXSIZE = 8;
    SpineConst.VERTEX_TWOCOLOR = 12;
    SpineConst.VERTEX_INITIAL_CAPACITY = 128;
    SpineConst.NORMAL_VERTEX_LENGTH = 1024;
    SpineConst.NORMAL_MAX_VERTEX = 10922;
    SpineConst.VERTEX_BONE = 22;
    SpineConst.VERTEX_RIGIDBODY = 9;
    SpineConst.SPINE_STEP = 1 / 30;
    SpineConst.NEED_SLOT = false;
    SpineConst.ENABLE_WEB_BATCH = false;
    exports.ESpineRenderMode = void 0;
    (function (ESpineRenderMode) {
        ESpineRenderMode[ESpineRenderMode["None"] = 0] = "None";
        ESpineRenderMode[ESpineRenderMode["Normal"] = 1] = "Normal";
        ESpineRenderMode[ESpineRenderMode["Optimize"] = 2] = "Optimize";
        ESpineRenderMode[ESpineRenderMode["Bake"] = 3] = "Bake";
    })(exports.ESpineRenderMode || (exports.ESpineRenderMode = {}));
    exports.ESpineRenderState = void 0;
    (function (ESpineRenderState) {
        ESpineRenderState[ESpineRenderState["Stopped"] = 0] = "Stopped";
        ESpineRenderState[ESpineRenderState["Paused"] = 1] = "Paused";
        ESpineRenderState[ESpineRenderState["Playing"] = 2] = "Playing";
    })(exports.ESpineRenderState || (exports.ESpineRenderState = {}));
    Laya.Laya.addAfterInitCallback(() => {
        let versionString = SpineConst.VERSION.split('.');
        let versionNumber = Math.floor(Number(versionString[0]));
        let versionNumber2 = Math.floor(Number(versionString[1]));
        SpineConst.VersionFirst = versionNumber;
        SpineConst.VersionSecond = versionNumber2;
        if (versionNumber >= 4 && versionNumber2 >= 1) {
            SpineConst.NEED_SLOT = true;
        }
        SpineConst.ENABLE_WEB_BATCH = window.Laya.BatchManager != null;
        SpineShaderInit.init();
    });

    class Spine2DRenderNode extends Laya.BaseRenderNode2D {
        get boneMap() {
            return this._boneMap;
        }
        constructor() {
            super();
            this._createBone = false;
            this.physicsUpdate = 0;
            this._maxDeltaTime = 0.1;
            this._pause = true;
            this._needUpdate = false;
            this._playbackRate = 1.0;
            this._playAudio = true;
            this._soundChannelArr = [];
            this.trackIndex = 0;
            this._skinName = "default";
            this._loop = true;
            this._renderOffset = new Laya.Vector2();
            this._offset = new Laya.Vector2();
            this._setPreAlphaFlag = false;
            this._premultipliedAlpha = true;
            this._useFastRender = true;
            this._autoAdjust = false;
            this._enableCache = false;
            this._renderElements = [];
            this._materials = [];
        }
        _isMaterialVaild(value) {
            return value.checkType(Laya.ShaderFeatureType.D2_BaseRenderNode2D);
        }
        _getcommonUniformMap() {
            return ["BaseRender2D", "Spine2D"];
        }
        _createRenderHandle() {
            let handle = Laya.LayaGL.render2DRenderPassFactory.createSpineRenderDataHandle();
            return handle;
        }
        get createBone() {
            return this._createBone;
        }
        set createBone(value) {
            if (this._createBone === value)
                return;
            this._createBone = value;
            if (value) {
                this._createBones();
            }
            else {
                this._rootBone.destroy();
                this._rootBone = null;
            }
        }
        _createBones() {
            if (this._rootBone || !this._templet)
                return;
            this._bones = [];
            let bones = this._spineRender.getBones();
            if (!bones || bones.length === 0)
                return;
            let map = new Map;
            this._rootBone = new Laya.Sprite();
            this._rootBone.name = "__bone_root__";
            this.owner.addChild(this._rootBone);
            let transform = this._spineRender.getSkeletonTransform();
            let offsetX = -transform.x + this._renderOffset.x;
            let offsetY = -transform.y + this._renderOffset.y;
            for (let i = 0; i < bones.length; i++) {
                let bone = bones[i];
                let boneSprite = new Laya.Sprite();
                boneSprite.name = bone.data.name;
                let attachSprite = new Laya.Sprite();
                attachSprite.name = bone.data.name + "__attach";
                attachSprite.scaleY = -1;
                boneSprite.x = bone.worldX + offsetX;
                boneSprite.y = -(bone.worldY + offsetY);
                boneSprite.addChild(attachSprite);
                this._rootBone.addChild(boneSprite);
                this._bones.push(boneSprite);
                map.set(bone.data.name, attachSprite);
            }
            this._boneMap = map;
        }
        getBone(boneName) {
            return this._boneMap.get(boneName);
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
        renderUpdate(context) {
            this._updateLight();
        }
        resetExternalSkin() {
            if (this._spineRender) {
                this._spineRender.resetExternalSkin();
                this._flushExtSkin();
            }
        }
        get premultipliedAlpha() {
            return !this._templet || this._setPreAlphaFlag ? this._premultipliedAlpha : this._templet.premultipliedAlpha;
        }
        set premultipliedAlpha(value) {
            this._premultipliedAlpha = value;
            if (!this._spineRender)
                return;
            if (this._setPreAlphaFlag || !this._templet) {
                this._spineRender.premultipliedAlpha = value;
            }
            else {
                this._spineRender.premultipliedAlpha = this._templet.premultipliedAlpha;
            }
        }
        setPremultipliedAlpha(value) {
            this._premultipliedAlpha = value;
            this._spineRender.premultipliedAlpha = value;
            this._setPreAlphaFlag = true;
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
            return this._maxDeltaTime;
        }
        set maxDetlaTime(value) {
            this._maxDeltaTime = value;
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
            this._spineRender.currentTime = value;
        }
        get currentTime() {
            if (!this._templet)
                return 0;
            return this._spineRender.currentTime;
        }
        get playState() {
            if (this._pause)
                if (this.currentTime)
                    return exports.ESpineRenderState.Paused;
                else
                    return exports.ESpineRenderState.Stopped;
            return exports.ESpineRenderState.Playing;
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
            this._spineRender.mode = !SpineConst.normalRenderSwitch && value ? exports.ESpineRenderMode.Optimize : exports.ESpineRenderMode.Normal;
        }
        get offset() {
            return this._offset;
        }
        set offset(value) {
            this._offset = value;
            if (this._templet) {
                if (value) {
                    this._renderOffset.x = value.x + this._templet.offsetX;
                    this._renderOffset.y = value.y - this._templet.offsetY;
                }
                else {
                    this._renderOffset.x = this._templet.offsetX;
                    this._renderOffset.y = -this._templet.offsetY;
                }
                this._renderHandle.offset = this._renderOffset;
            }
            this.boundsChange = true;
            if (this.playState !== Spine2DRenderNode.PLAYING) {
                this.owner.repaint(Laya.RepaintFlag.UpdateRT);
            }
        }
        get autoAdjust() {
            return this._autoAdjust;
        }
        set autoAdjust(value) {
            if (this._autoAdjust === value)
                return;
            this._autoAdjust = value;
            if (value) {
                this._doAutoAdjust();
            }
        }
        get enableCache() {
            return this._enableCache;
        }
        set enableCache(value) {
            if (this._enableCache === value)
                return;
            this._enableCache = value;
            if (this._spineRender) {
                if (value) {
                    this._spineRender.enableCache();
                }
                else {
                    this._spineRender.disableCache();
                }
            }
            if (this._animationName) {
                this.play(this._animationName, this._loop, true, this._playStart, this._playEnd, false, this._playAudio);
            }
        }
        _doAutoAdjust() {
            if (!this._templet)
                return;
            let width = this._templet.width;
            let height = this._templet.height;
            if (width === undefined || height === undefined) {
                console.warn('Spine.SkeletonData: width or height is undefined');
                this._autoAdjust = false;
                return;
            }
            if (width < 1)
                width = 100;
            if (height < 1)
                height = 100;
            this.owner.size(Math.round(width), Math.round(height));
            this.owner.pivot(Math.round(this._templet.offsetX), Math.round(-this._templet.offsetY));
        }
        onEnable() {
            this.owner.on(Laya.Event.TRANSFORM_CHANGED, this, this.onTransformChanged);
            if (this._spineRender && Laya.LayaEnv.isPlaying && this._animationName !== undefined)
                this.play(this._animationName, this._loop, true);
        }
        onDisable() {
            this.owner.off(Laya.Event.TRANSFORM_CHANGED, this, this.onTransformChanged);
        }
        init(templet) {
            if (this.destroyed)
                return;
            if (this._templet) {
                this.clear();
            }
            this._templet = templet;
            if (!this._templet)
                return;
            this._templet._addReference();
            this._templet.on(SpineTemplet.EVENT_SPINE_MATERIAL_CHANGE, this, this.onSpineMaterialChange);
            if (this._spineRender) {
                this._spineRender.destroy();
            }
            this._struct.renderElements = [];
            this._struct.setRepaint();
            this._spineRender = SpineConst.factory.createSpineRender2D(this);
            this._spineRender.init(templet);
            this._spineRender.mode = !SpineConst.normalRenderSwitch && this._useFastRender ? exports.ESpineRenderMode.Optimize : exports.ESpineRenderMode.Normal;
            this._spineRender.premultipliedAlpha = this._setPreAlphaFlag ? this._premultipliedAlpha : this._templet.premultipliedAlpha;
            if (this._enableCache) {
                this._spineRender.enableCache();
            }
            if (this._autoAdjust) {
                this._doAutoAdjust();
            }
            if (this._createBone) {
                this._createBones();
            }
            this.onTransformChanged();
            this.boundsChange = true;
            this._renderOffset.x = this._offset.x + this._templet.offsetX;
            this._renderOffset.y = this._offset.y - this._templet.offsetY;
            this._renderHandle.offset = this._renderOffset;
            let skinIndex = this._templet.getSkinIndexByName(this._skinName);
            if (skinIndex != -1)
                this.showSkinByIndex(skinIndex);
            this.onTransformChanged();
            this._spineRender.setEventListener({
                start: (entry) => {
                },
                interrupt: (entry) => {
                },
                end: (entry) => {
                },
                dispose: (entry) => {
                },
                complete: (entry) => {
                    this.owner.event(Laya.Event.END);
                    if (entry.loop) {
                        this._spineRender.complete();
                        this.owner.event(Laya.Event.COMPLETE);
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
                    this.owner.event(Laya.Event.LABEL, eventData);
                    if (this._playAudio && eventData.audioValue) {
                        let channel = Laya.SoundManager.playSound(eventData.audioValue, 1, Laya.Handler.create(this, this._onAniSoundStoped), null, (this._spineRender.currentTime * 1000 - eventData.time) / 1000);
                        Laya.SoundManager.playbackRate = this._playbackRate;
                        channel && this._soundChannelArr.push(channel);
                    }
                }
            });
            this._flushExtSkin();
            this.owner.event(Laya.Event.READY);
            if (Laya.LayaEnv.isPlaying
                && this.enabled
                && this._animationName !== undefined) {
                this.play(this._animationName, this._loop, true);
            }
        }
        play(nameOrIndex, loop, force = true, start = 0, end = 0, freshSkin = true, playAudio = true) {
            if (!this._templet) {
                console.warn("Spine2DRenderNode.play: templet is not ready, animation:", nameOrIndex);
                return;
            }
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
                if (!this.templet.hasAnimation(nameOrIndex))
                    return;
            }
            if (force || this._pause || this._animationName != nameOrIndex) {
                this._animationName = nameOrIndex;
                this._spineRender.play(nameOrIndex, loop, this.trackIndex, start, end);
                let duration = this._spineRender.trackEntry.animation.duration;
                this._duration = duration;
                this._playStart = start;
                this._playEnd = end <= duration ? end : duration;
                if (this._pause) {
                    this._pause = false;
                    this._needUpdate = true;
                }
                this._update();
                this.owner.event(Laya.Event.PLAYED);
            }
        }
        _update() {
            let timerDelta = Laya.Laya.timer.delta / 1000 * this._playbackRate;
            if (timerDelta > this._maxDeltaTime)
                timerDelta = this._maxDeltaTime;
            let delta = timerDelta * this._playbackRate;
            let currentPlayTime = this._spineRender.currentTime;
            this._spineRender.update(delta);
            if (this.destroyed) {
                return;
            }
            this._spineRender.render(currentPlayTime, this.physicsUpdate);
            this._updateBones();
            this.owner.repaint(Laya.RepaintFlag.UpdateRT);
        }
        _updateBones() {
            if (!this._createBone || !this._bones)
                return;
            let bones = this._spineRender.getBones();
            if (!bones || bones.length === 0)
                return;
            let transform = this._spineRender.getSkeletonTransform();
            let offset = this._renderOffset;
            let offsetX = -transform.x + offset.x;
            let offsetY = -transform.y + offset.y;
            for (let i = 0; i < bones.length && i < this._bones.length; i++) {
                let bone = bones[i];
                let boneSprite = this._bones[i];
                let matrix = boneSprite.transform;
                if (!matrix) {
                    matrix = new Laya.Matrix();
                    boneSprite.transform = matrix;
                }
                matrix.a = bone.a;
                matrix.b = bone.b;
                matrix.c = -bone.c;
                matrix.d = -bone.d;
                matrix.tx = bone.worldX + offsetX;
                matrix.ty = -(bone.worldY + offsetY);
                boneSprite.transform = matrix;
            }
        }
        _flushExtSkin() {
            let skins = this._externalSkins;
            if (skins) {
                for (let i = skins.length - 1; i >= 0; i--) {
                    skins[i].flush();
                }
                this.useFastRender = false;
            }
        }
        getAnimNum() {
            return this._templet.getAnimationCount();
        }
        getAniNameByIndex(index) {
            return this._templet.getAniNameByIndex(index);
        }
        getSlotByName(slotName) {
            return this._spineRender.findSlot(slotName);
        }
        playbackRate(value) {
            this._playbackRate = value;
        }
        showSkinByName(name) {
            this.showSkinByIndex(this._templet.getSkinIndexByName(name));
        }
        showSkinByIndex(skinIndex) {
            this._spineRender.showSkinByIndex(skinIndex);
        }
        stop() {
            if (!this._pause) {
                this._pause = true;
                this._needUpdate = false;
                this._spineRender.update(-this._spineRender.currentTime);
                this._spineRender.currentTime = 0;
                this.owner.event(Laya.Event.STOPPED);
                if (this._soundChannelArr.length > 0) {
                    this._onAniSoundStoped(true);
                }
            }
        }
        onUpdate() {
            this._needUpdate && this._update();
        }
        paused() {
            if (!this._pause) {
                this._pause = true;
                this._needUpdate = false;
                this.owner.event(Laya.Event.PAUSED);
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
                this._needUpdate = true;
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
        onSpineMaterialChange() {
            if (this._spineRender)
                this._spineRender.clearCacheMaterials();
        }
        reset() {
            this._spineRender.reset();
            this._templet.off(SpineTemplet.EVENT_SPINE_MATERIAL_CHANGE, this, this.onSpineMaterialChange);
            this._templet._removeReference(1);
            this._templet = null;
            this._pause = true;
            this._needUpdate = false;
            if (this._soundChannelArr.length > 0)
                this._onAniSoundStoped(true);
            this.owner.repaint();
        }
        addAnimation(nameOrIndex, loop = false, delay = 0) {
            delay /= 1000;
            let animationName = nameOrIndex;
            if (typeof animationName == "number") {
                animationName = this.getAniNameByIndex(animationName);
            }
            this._animationName = animationName;
            this._spineRender.addAnimation(animationName, loop, delay, this.trackIndex);
        }
        setSlotTexture(slotName, texture, createAttachment = true) {
            if (this._useFastRender) {
                console.log("setSlotTexture: useFastRender is true, return");
                return;
            }
            this._spineRender.setSlotTexture(slotName, texture, createAttachment);
        }
        setTempletAttachment(templet, targetSlotName, skinName, attachmentName) {
            if (this._useFastRender) {
                console.log("setTempletAttachment: useFastRender is true, return");
                return;
            }
            this._spineRender.setTempletAttachment(templet, targetSlotName, skinName, attachmentName);
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
            this._spineRender.setMix(fromName, toName, duration);
        }
        getBoneByName(boneName) {
            return this._spineRender.findBone(boneName);
        }
        getSkeleton() {
            return this._spineRender.getSkeleton();
        }
        physicsTranslate(x, y) {
            this._spineRender.physicsTranslate(x, y);
        }
        onTransformChanged() {
            if (this._spineRender) {
                let matrix = this.owner.globalTrans.getMatrix();
                this._spineRender.setSkeletonPosition(matrix.tx, matrix.ty);
            }
        }
        setSlotAttachment(slotName, attachmentName) {
            this.useFastRender = false;
            this._spineRender.setAttachment(slotName, attachmentName);
        }
        clear() {
            var _a;
            this.reset();
            (_a = this.owner) === null || _a === void 0 ? void 0 : _a.repaint();
            this._struct.renderElements = this._renderElements;
        }
        onDestroy() {
            if (this._templet) {
                this.clear();
            }
            if (this._spineRender) {
                this._spineRender.destroy();
                this._spineRender = null;
            }
            if (this._rootBone) {
                this._rootBone.destroy();
                this._rootBone = null;
                this._bones = null;
            }
        }
        get rect() {
            if (this._boundsChange) {
                if (this._templet) {
                    this._rect.z = this._templet.width + this._renderOffset.x;
                    this._rect.w = this._templet.height + this._renderOffset.y;
                }
                else {
                    this._rect.z = this.owner.width + this._renderOffset.x;
                    this._rect.w = this.owner.height + this._renderOffset.y;
                }
                this._rect.x = this._renderOffset.x;
                this._rect.y = this._renderOffset.y;
                this._boundsChange = false;
            }
            return this._rect;
        }
    }
    Spine2DRenderNode.STOPPED = 0;
    Spine2DRenderNode.PAUSED = 1;
    Spine2DRenderNode.PLAYING = 2;

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
                this._spineComponent.clear();
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

    let c = Laya.ClassUtils.regClass;
    c("SpineSkeleton", SpineSkeleton);
    c("ExternalSkin", ExternalSkin);
    c("ExternalSkinItem", ExternalSkinItem);
    c("Spine2DRenderNode", Spine2DRenderNode);
    Laya.Laya.addBeforeInitCallback(() => {
        if (Laya.PlayerConfig.spineVersion)
            SpineConst.VERSION = Laya.PlayerConfig.spineVersion;
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
            if (spine._spineRender) {
                spine._spineRender.initBake(null);
            }
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
            if (spine.templet) {
                spine._spineRender.initBake(data);
            }
            else {
                this.owner.on(Laya.Event.READY, this, () => {
                    spine._spineRender.initBake(data);
                });
            }
        }
    }
    Laya.ClassUtils.regClass("SpineBakeScript", SpineBakeScript);

    class SpineTempletLoader {
        load(task) {
            let ext = Laya.Utils.getFileExtension(task.url);
            if (ext === "json")
                return task.loader.fetch(task.url, "json", task.progress.createCallback()).then((data) => this.loadSpineSource(task, task.url, data));
            return this.loadSpineSource(task, task.url);
        }
        loadSpineSource(task, url, spineData) {
            return Laya.AssetDb.inst.resolveURL(url).then(resolvedUrl => this.loadSpineSourceResolved(task, resolvedUrl || url, spineData));
        }
        loadSpineSourceResolved(task, url, spineData) {
            let atlasUrl = Laya.Utils.replaceFileExtension(url, "atlas");
            let ext = Laya.Utils.getFileExtension(url);
            return Promise.all([
                spineData !== undefined ? Promise.resolve(spineData) : task.loader.fetch(url, ext == "skel" || ext == "bin" ? "arraybuffer" : "json", task.progress.createCallback()),
                task.loader.fetch(atlasUrl, "text", task.progress.createCallback())
            ]).then(res => {
                if (!res[0] || !res[1])
                    return null;
                let parser = SpineConst.factory.createSpineTempletParser();
                let sourceTask = url === task.url ? task : Object.assign(Object.create(task), { url });
                let urls = parser.collectTextures(res[1], sourceTask);
                return Laya.Laya.loader.load(urls, null, task.progress.createCallback()).then((textures) => {
                    let templet = parser.create(res[0], textures);
                    return this.loadRuntimeMeta(task, url).then(data => SpineTempletLoader.applyRuntimeData(templet, data, task));
                });
            });
        }
        async loadRuntimeMeta(task, resolvedUrl) {
            let data = Laya.AssetDb.inst.metaMap[task.url] || Laya.AssetDb.inst.metaMap[resolvedUrl];
            if (!data && task.uuid)
                data = await Laya.AssetDb.inst.getMeta(task.url, task.uuid);
            return data;
        }
        static async applyRuntimeData(templet, data, task) {
            if (!templet)
                return templet;
            if (!data) {
                templet.spineMaterialTextures = {};
                templet.spineMaterials2D = {};
                templet.spineMaterials3D = {};
                return templet;
            }
            templet.spineMaterialTextures = data.spineMaterialTextures || {};
            let [materials2D, materials3D] = await Promise.all([
                SpineTempletLoader.loadMaterialMap(data.spineMaterials2D, templet, task),
                SpineTempletLoader.loadMaterialMap(data.spineMaterials3D, templet, task)
            ]);
            templet.spineMaterials2D = materials2D || {};
            templet.spineMaterials3D = materials3D || {};
            return templet;
        }
        static async loadMaterialMap(data, templet, task) {
            var _a;
            if (!data)
                return null;
            let result = {};
            let promises = [];
            for (let key in data) {
                if (key.indexOf("_$") === 0)
                    continue;
                let runtimeKey = SpineTempletLoader.getRuntimeMaterialKey(key, templet);
                let url = SpineTempletLoader.getMaterialURL(data[key]);
                if (!url) {
                    result[runtimeKey] = null;
                    continue;
                }
                promises.push(Laya.Laya.loader.load(url, Laya.Loader.MATERIAL, (_a = task === null || task === void 0 ? void 0 : task.progress) === null || _a === void 0 ? void 0 : _a.createCallback()).then((material) => {
                    result[runtimeKey] = material || null;
                }));
            }
            await Promise.all(promises);
            return result;
        }
        static getRuntimeMaterialKey(key, templet) {
            let match = /^(.*)_([0-3])_(true|false)_(2D|3D)$/.exec(key);
            if (!match)
                return key;
            let texture = SpineTempletLoader.getTextureByStorageKey(match[1], templet);
            if (!texture)
                return key;
            return `${texture.id}_${match[2]}_${match[3]}_${match[4]}`;
        }
        static getTextureByStorageKey(key, templet) {
            var _a;
            let textures = templet === null || templet === void 0 ? void 0 : templet._textures;
            if (!textures)
                return null;
            let name = (_a = templet.spineMaterialTextures) === null || _a === void 0 ? void 0 : _a[key];
            if (name && textures[name])
                return textures[name];
            for (let name in textures) {
                let texture = textures[name];
                if (texture && (name === key || texture.url === key || texture.uuid === key || String(texture.id) === key))
                    return texture;
            }
            return null;
        }
        static getMaterialURL(ref) {
            if (!ref)
                return null;
            let url = typeof ref === "string" ? ref : ref._$uuid;
            if (!url)
                return null;
            if (url.indexOf("://") == -1 && url.indexOf("/") == -1 && url.indexOf(".") == -1)
                url = "res://" + url;
            return url;
        }
    }
    Laya.Loader.registerLoader(["skel", "json"], SpineTempletLoader, Laya.Loader.SPINE);

    class NativeSkeletonOptimise {
        static __init__() {
            let dec = SpineShaderInit.getAllVertexDeclarations();
            for (const vertexFlag in dec) {
                const vertexDeclaration = dec[vertexFlag];
                if (vertexDeclaration && vertexDeclaration._shaderValues) {
                    for (const shaderLocation of Object.keys(vertexDeclaration._shaderValues)) {
                        let location = parseInt(shaderLocation);
                        const vertexStateContext = vertexDeclaration._shaderValues[location];
                        if (vertexStateContext) {
                            NativeSkeletonOptimise.SetVertexDeclaration(vertexFlag, location, vertexStateContext);
                        }
                    }
                }
            }
        }
        static SetVertexDeclaration(vertexFlag, shaderLocation, context) {
            conchSkeletonOptimise.SetVertexDeclaration(vertexFlag, shaderLocation, context);
        }
        constructor() {
            this._registTextures = new Map();
            this.data = null;
            this._animationNames = [];
            this._skinNames = [];
            this._materials = [];
            this._nativeOptimise = new conchSkeletonOptimise();
            this._nativeOptimise.setMaterialTemplateInitializer(this.nativeCreateMaterialTemplet.bind(this));
        }
        init() {
            this._animationNames = this._nativeOptimise.getAllAnimationNames() || [];
            this._skinNames = this._nativeOptimise.getAllSkinNames() || [];
        }
        getAnimationCount() {
            return this._animationNames.length;
        }
        getAniNameByIndex(index) {
            if (index >= 0 && index < this._animationNames.length) {
                return this._animationNames[index];
            }
            return null;
        }
        getAllAnimationNames() {
            return this._animationNames;
        }
        findAnimation(name) {
            return null;
        }
        hasAnimation(name) {
            return this._animationNames.indexOf(name) !== -1;
        }
        getSkinIndexByName(skinName) {
            if (!skinName) {
                return -1;
            }
            return this._skinNames.indexOf(skinName);
        }
        getSkinCount() {
            return this._skinNames.length;
        }
        getSkinNameByIndex(index) {
            if (index >= 0 && index < this._skinNames.length) {
                return this._skinNames[index];
            }
            return null;
        }
        getAllSkinNames() {
            return this._skinNames;
        }
        checkMainAttach(skeleton, skeletonData) {
        }
        registerTexture(texture) {
            let isTexture = false;
            let texture2d;
            if (texture instanceof Laya.Texture) {
                texture2d = texture.bitmap;
                isTexture = true;
            }
            else
                texture2d = texture;
            if (!texture2d)
                return;
            let bitmapUrl = texture2d.url;
            let page = this._registTextures.get(bitmapUrl);
            if (!page) {
                page = new Set();
                this._registTextures.set(bitmapUrl, page);
            }
            let textureName = texture.url;
            if (!page.has(textureName)) {
                page.add(textureName);
                let width = texture.width;
                let height = texture.height;
                let originalWidth = texture.width;
                let originalHeight = texture.height;
                let offsetX = 0;
                let offsetY = 0;
                let u = 0;
                let v = 0;
                let u2 = 1.0;
                let v2 = 1.0;
                if (isTexture) {
                    originalWidth = texture.sourceWidth;
                    originalHeight = texture.sourceHeight;
                    offsetX = texture.offsetX;
                    offsetY = texture.offsetY;
                    if (texture.uv && texture.uv.length >= 8) {
                        u = texture.uv[0];
                        v = texture.uv[1];
                        u2 = texture.uv[4];
                        v2 = texture.uv[5];
                    }
                }
                this._nativeOptimise.registerTexture(texture2d.id, bitmapUrl, textureName, width, height, originalWidth, originalHeight, offsetX, offsetY, u, v, u2, v2);
            }
        }
        initMaterials(textureUrls, textures) {
            if (textureUrls.length === 0 || textures.length === 0) {
                return;
            }
            this._createMaterial(false, "", null);
            this._createMaterial(true, "", null);
            for (let i = 0, n = textureUrls.length; i < n; i++) {
                const textureUrl = textureUrls[i];
                const texture = textures[i];
                this._createMaterial(false, textureUrl, texture);
                this._createMaterial(true, textureUrl, texture);
            }
        }
        nativeCreateMaterialTemplet(textureUrl, is3D) {
            let texture = this._templet.getTexture(textureUrl);
            this._createMaterial(is3D, textureUrl, texture);
        }
        _createMaterial(is3D, textureUrl, texture) {
            const material = new Laya.Material();
            material.setShaderName(is3D ? "Spine3D" : "SpineStandard");
            SpineShaderInit.initSpineMaterial(material);
            if (texture) {
                const shaderData = material.shaderData;
                shaderData.setTexture(SpineShaderInit.SpineTexture, texture);
                if (texture.gammaCorrection !== 1) {
                    shaderData.addDefine(Laya.ShaderDefines2D.GAMMATEXTURE);
                }
            }
            material.lock = true;
            this._materials.push(material);
            this._nativeOptimise.setMaterialTemplate(is3D, textureUrl, texture ? texture._id : -1, material.shaderData._nativeObj, material.shader.getSubShaderAt(0).moduleData._nativeObj);
            return material;
        }
        destroy() {
            for (let i = 0; i < this._materials.length; i++) {
                const material = this._materials[i];
                if (material) {
                    material.destroy();
                }
            }
            this._materials.length = 0;
            if (this._nativeOptimise) {
                this._nativeOptimise.destroy();
                this._nativeOptimise = null;
            }
            this.data = null;
            this._animationNames = [];
            this._skinNames = [];
        }
        _getNativeOptimise() {
            return this._nativeOptimise;
        }
    }

    class NativeSpineTempletParser {
        constructor() {
            this._cachedTextureUrls = null;
            this._premultipliedAlpha = SpineConst.PREMULTIPLIED_ALPHA_DEFAULT;
            this._atlasTextContent = null;
            this._nativeParser = new conchNativeSpineTempletParser();
        }
        collectTextures(atlasText, task) {
            this._atlasTextContent = atlasText;
            const lines = atlasText.split(SpineConst.SPLIT_REGEX);
            const textureInfos = [];
            const urls = [];
            let currentPma = true;
            for (let i = 0; i < lines.length; i++) {
                const trimmed = lines[i].trim();
                if (!trimmed)
                    continue;
                const pmaMatch = trimmed.match(SpineConst.PMA_REGEX);
                if (pmaMatch) {
                    currentPma = pmaMatch[1].toLowerCase() === "true";
                    continue;
                }
                if (trimmed.indexOf(".png") !== -1 || trimmed.indexOf(".jpg") !== -1 ||
                    trimmed.indexOf(".jpeg") !== -1 || trimmed.indexOf(".webp") !== -1) {
                    const lastSlash = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
                    const texturePath = lastSlash !== -1
                        ? trimmed.substring(lastSlash + 1)
                        : trimmed;
                    textureInfos.push({
                        path: texturePath,
                        pma: currentPma
                    });
                    this._premultipliedAlpha = currentPma && this._premultipliedAlpha;
                    urls.push(texturePath);
                    currentPma = true;
                }
            }
            this._cachedTextureUrls = urls;
            const basePath = task.url.substring(0, task.url.lastIndexOf("/") + 1);
            return textureInfos.map((info) => ({
                url: basePath + info.path,
                type: "TEXTURE2D",
                propertyParams: {
                    premultiplyAlpha: info.pma
                },
                constructParams: [0, 0, Laya.TextureFormat.R8G8B8A8, false, false, true, info.pma]
            }));
        }
        create(desc, textures) {
            const isBinary = desc instanceof ArrayBuffer;
            let textureUrls = this._cachedTextureUrls;
            if (textureUrls.length > 0 && textures.length > 0) {
                const minLength = Math.min(textureUrls.length, textures.length);
                for (let i = 0; i < minLength; i++) {
                    const texture = textures[i];
                    if (texture) {
                        this._nativeParser.addTextureSizeInfo(textureUrls[i], texture.width, texture.height);
                    }
                }
            }
            const optimize = new NativeSkeletonOptimise();
            const rtSkeletonOptimize = optimize._getNativeOptimise();
            const templet = new SpineTemplet();
            templet.optimize = optimize;
            optimize._templet = templet;
            templet._textures = {};
            for (let i = 0; i < textureUrls.length; i++) {
                templet.setTexture(textureUrls[i], textures[i]);
            }
            const parseResultBuffer = new Float32Array(6);
            let parseSuccess;
            if (isBinary) {
                parseSuccess = this._nativeParser.parseBinary(rtSkeletonOptimize, desc, this._atlasTextContent, parseResultBuffer);
            }
            else {
                parseSuccess = this._nativeParser.parse(rtSkeletonOptimize, JSON.stringify(desc), this._atlasTextContent, parseResultBuffer);
            }
            if (!parseSuccess) {
                console.error("Failed to parse Spine skeleton data");
                return null;
            }
            const x = parseResultBuffer[0];
            const y = parseResultBuffer[1];
            const width = parseResultBuffer[2];
            const height = parseResultBuffer[3];
            const offsetX = parseResultBuffer[4];
            const offsetY = parseResultBuffer[5];
            templet.x = x;
            templet.y = y;
            templet.width = width;
            templet.height = height;
            templet.offsetX = offsetX;
            templet.offsetY = offsetY;
            optimize.init();
            templet._premultipliedAlpha = this._premultipliedAlpha;
            templet._parser = this;
            return templet;
        }
        destroy() {
            this._nativeParser.destroy();
            this._nativeParser = null;
        }
    }

    class NativeSpineOptimizeRenderBase {
        constructor(owner, nativeRender) {
            this._sharedBoneBuffer = null;
            this._sharedTrackEntryBuffer = new Float32Array(7);
            this._boneNames = [];
            this._skeletonVec2 = new Laya.Vector2();
            this._premultipliedAlpha = true;
            this._mode = exports.ESpineRenderMode.Optimize;
            this.state = exports.ESpineRenderState.Stopped;
            this.currentTime = 0;
            this.trackEntry = {
                animation: {
                    duration: 0
                },
                animationEnd: 0,
                animationStart: 0,
                loop: false,
                trackIndex: 0
            };
            this.bones = [];
            this._owner = owner;
            this._nativeRender = nativeRender;
        }
        setSlotTexture(slotName, texture, createAttachment) {
            if (!this._templet || !texture) {
                return;
            }
            this._templet.registerTexture(texture);
            let optimize = this._templet.optimize;
            optimize.registerTexture(texture);
            let tex2d = texture.bitmap;
            this._nativeRender.setSlotTexture(slotName, tex2d._id, createAttachment);
        }
        setTempletAttachment(templet, targetSlotName, skinName, attachmentName) {
            if (!this._templet || !templet || !targetSlotName || !skinName || !attachmentName) {
                return;
            }
            let optimize = this._templet.optimize;
            if (templet._textures) {
                for (let textureName in templet._textures) {
                    let texture2d = templet._textures[textureName];
                    if (texture2d && !this._templet._textures[textureName]) {
                        this._templet.setTexture(textureName, texture2d);
                    }
                }
            }
            this._nativeRender.setTempletAttachment(optimize._getNativeOptimise(), targetSlotName, skinName, attachmentName);
        }
        getSkeleton() {
            return null;
        }
        init(templet) {
            this._templet = templet;
            const optimize = templet.optimize;
            if (!optimize) {
                throw new Error("SpineTemplet.optimize is required for native rendering");
            }
            const nativeOptimize = optimize._getNativeOptimise ? optimize._getNativeOptimise() : optimize;
            this._nativeRender.init(nativeOptimize);
            this._initializeBoneData();
            if (this._nativeRender.bindTrackEntryBuffer) {
                this._nativeRender.bindTrackEntryBuffer(this._sharedTrackEntryBuffer);
            }
            this.premultipliedAlpha = templet.premultipliedAlpha;
            this._onInit();
        }
        _initializeBoneData() {
            if (this._nativeRender.getBoneNames) {
                this._boneNames = this._nativeRender.getBoneNames();
                const length = this._boneNames.length;
                if (length > 0) {
                    this._sharedBoneBuffer = new Float32Array(2 + length * 8);
                    this._nativeRender.bindBoneDataBuffer(this._sharedBoneBuffer);
                    this.bones = [];
                    for (let i = 0; i < length; i++) {
                        this.bones.push({
                            worldX: 0,
                            worldY: 0,
                            a: 1,
                            b: 0,
                            c: 0,
                            d: 1,
                            data: {
                                name: this._boneNames[i],
                                length: 0
                            }
                        });
                    }
                }
            }
        }
        _onInit() {
        }
        play(animationName, loop = true, trackIndex = 0, start = 0, end = 0) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.play(animationName, loop, trackIndex, start, end);
            this._updateTrackEntry();
        }
        addAnimation(animationName, loop = false, delay = 0, trackIndex = 0) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.addAnimation(animationName, loop, delay, trackIndex);
        }
        setMix(fromAnimation, toAnimation, duration) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.setMix(fromAnimation, toAnimation, duration);
        }
        update(delta) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.update(delta);
            this._updateTrackEntry();
        }
        _updateTrackEntry() {
            this.trackEntry.animationStart = this._sharedTrackEntryBuffer[0];
            this.trackEntry.animationEnd = this._sharedTrackEntryBuffer[1];
            this.trackEntry.trackIndex = this._sharedTrackEntryBuffer[2];
            this.trackEntry.loop = !!this._sharedTrackEntryBuffer[3];
            this.trackEntry.animation.duration = this._sharedTrackEntryBuffer[4];
            this.currentTime = this._sharedTrackEntryBuffer[5];
            this.state = this._sharedTrackEntryBuffer[6];
        }
        render(time, physicsUpdate = 2) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.render(time, physicsUpdate);
        }
        showSkinByIndex(skinIndex) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.showSkinByIndex(skinIndex);
        }
        setAttachment(slotName, attachmentName) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.setAttachment(slotName, attachmentName);
        }
        findBone(boneName) {
            if (!this._sharedBoneBuffer || !this._boneNames.length) {
                return null;
            }
            const boneIndex = this._boneNames.indexOf(boneName);
            if (boneIndex === -1) {
                return null;
            }
            const offset = 2 + boneIndex * 8;
            return {
                worldX: this._sharedBoneBuffer[offset + 0],
                worldY: this._sharedBoneBuffer[offset + 1],
                a: this._sharedBoneBuffer[offset + 2],
                b: this._sharedBoneBuffer[offset + 3],
                c: this._sharedBoneBuffer[offset + 4],
                d: this._sharedBoneBuffer[offset + 5],
                data: {
                    name: boneName,
                    length: this._sharedBoneBuffer[offset + 7]
                }
            };
        }
        findSlot(slotName) {
            return null;
        }
        setSkeletonPosition(x, y) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.setSkeletonPosition(x, y);
        }
        physicsTranslate(x, y) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.physicsTranslate(x, y);
        }
        getBones() {
            if (!this._sharedBoneBuffer || !this._boneNames.length) {
                return [];
            }
            const bones = [];
            for (let i = 0; i < this._boneNames.length; i++) {
                const offset = 2 + i * 8;
                bones.push({
                    worldX: this._sharedBoneBuffer[offset + 0],
                    worldY: this._sharedBoneBuffer[offset + 1],
                    a: this._sharedBoneBuffer[offset + 2],
                    b: this._sharedBoneBuffer[offset + 3],
                    c: this._sharedBoneBuffer[offset + 4],
                    d: this._sharedBoneBuffer[offset + 5],
                    data: {
                        name: this._boneNames[i],
                        length: this._sharedBoneBuffer[offset + 7]
                    }
                });
            }
            return bones;
        }
        getSkeletonTransform() {
            if (this._sharedBoneBuffer && this._sharedBoneBuffer.length >= 2) {
                return this._skeletonVec2.setValue(this._sharedBoneBuffer[0], this._sharedBoneBuffer[1]);
            }
            return this._skeletonVec2;
        }
        resetExternalSkin() {
            if (!this._nativeRender) {
                return;
            }
            if (this._nativeRender.resetExternalSkin) {
                this._nativeRender.resetExternalSkin();
            }
        }
        reset() {
            if (!this._nativeRender) {
                return;
            }
            if (this._nativeRender.reset) {
                this._nativeRender.reset();
            }
            this._updateTrackEntry();
        }
        getSpineColor() {
            if (!this._nativeRender) {
                return new Laya.Color(1, 1, 1, 1);
            }
            if (this._nativeRender.getSpineColor) {
                const color = this._nativeRender.getSpineColor();
                if (color) {
                    return new Laya.Color(color.r, color.g, color.b, color.a);
                }
            }
            return new Laya.Color(1, 1, 1, 1);
        }
        get premultipliedAlpha() {
            return this._premultipliedAlpha;
        }
        set premultipliedAlpha(value) {
            if (this._premultipliedAlpha === value)
                return;
            this._premultipliedAlpha = value;
            if (this._nativeRender) {
                this._nativeRender.setPremultipliedAlpha(value);
            }
        }
        get mode() {
            return this._mode;
        }
        set mode(value) {
            if (this._mode === value)
                return;
            this._mode = value;
            if (this._nativeRender && this._nativeRender.setMode) {
                this._nativeRender.setMode(value);
            }
        }
        complete() {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.complete();
        }
        initBake(obj) {
            if (!this._nativeRender) {
                return;
            }
            this._nativeRender.setBakeBonesNums(obj.bonesNums);
            let animationMap = obj.aniOffsetMap;
            for (const key in animationMap) {
                this._nativeRender.setBakeAniOffset(key, animationMap[key]);
            }
        }
        setEventListener(listeners) {
            if (!this._nativeRender) {
                return;
            }
            this._listeners = listeners;
            if (listeners.start && this._nativeRender.setOnStart) {
                this._nativeRender.setOnStart((nativeEntry) => {
                    listeners.start(this.trackEntry);
                });
            }
            if (listeners.interrupt && this._nativeRender.setOnInterrupt) {
                this._nativeRender.setOnInterrupt((nativeEntry) => {
                    listeners.interrupt(this.trackEntry);
                });
            }
            if (listeners.end && this._nativeRender.setOnEnd) {
                this._nativeRender.setOnEnd((nativeEntry) => {
                    listeners.end(this.trackEntry);
                });
            }
            if (listeners.dispose && this._nativeRender.setOnDispose) {
                this._nativeRender.setOnDispose((nativeEntry) => {
                    listeners.dispose(this.trackEntry);
                });
            }
            if (listeners.complete && this._nativeRender.setOnComplete) {
                this._nativeRender.setOnComplete((nativeEntry) => {
                    listeners.complete(this.trackEntry);
                });
            }
            if (listeners.event && this._nativeRender.setOnEvent) {
                this._nativeRender.setOnEvent((nativeEntry, nativeEvent) => {
                    listeners.event(this.trackEntry, nativeEvent);
                });
            }
        }
        destroy() {
            if (this._nativeRender) {
                if (this._listeners && this._nativeRender.removeEventListener) {
                    this._nativeRender.removeEventListener();
                }
                this._nativeRender.destroy();
                this._nativeRender = null;
            }
            this._listeners = null;
            this._templet = null;
            this._owner = null;
            this._sharedBoneBuffer = null;
            this.bones = [];
        }
        stop() {
            if (this._nativeRender && this._nativeRender.stop) {
                this._nativeRender.stop();
                this._updateTrackEntry();
            }
        }
        pause() {
            if (this._nativeRender && this._nativeRender.pause) {
                this._nativeRender.pause();
                this._updateTrackEntry();
            }
        }
        resume() {
            if (this._nativeRender && this._nativeRender.resume) {
                this._nativeRender.resume();
                this._updateTrackEntry();
            }
        }
        setPlaybackRate(rate) {
            if (this._nativeRender && this._nativeRender.setPlaybackRate) {
                this._nativeRender.setPlaybackRate(rate);
            }
        }
        getPlaybackRate() {
            if (this._nativeRender && this._nativeRender.getPlaybackRate) {
                return this._nativeRender.getPlaybackRate();
            }
            return 1.0;
        }
        enableCache() {
            if (this._nativeRender) {
                this._nativeRender.enableCache();
            }
        }
        disableCache() {
            if (this._nativeRender) {
                this._nativeRender.disableCache();
            }
        }
        clearCacheMaterials() {
            if (this._nativeRender && this._nativeRender.clearCacheMaterials) {
                this._nativeRender.clearCacheMaterials();
            }
        }
    }

    class NativeSpineOptimizeRender2D extends NativeSpineOptimizeRenderBase {
        constructor(owner, nativeRender) {
            super(owner, nativeRender);
            this._handle = null;
            this._handle = owner._getRenderHandle();
        }
        _onInit() {
        }
        initBake(obj) {
            if (!this._nativeRender) {
                return;
            }
            let shaderData = this._owner._spriteShaderData;
            let texture = obj.texture2d;
            shaderData.setTexture(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE, texture);
            shaderData.setNumber(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE, texture.width);
            super.initBake(obj);
        }
    }

    class NativeSpineOptimizeRender3D extends NativeSpineOptimizeRenderBase {
        constructor(owner, nativeRender) {
            super(owner, nativeRender);
        }
        initBake(obj) {
            if (!this._nativeRender) {
                return;
            }
            let shaderData = this._owner.shaderData;
            let texture = obj.texture2d;
            shaderData.setTexture(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE, texture);
            shaderData.setNumber(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE, texture.width);
            super.initBake(obj);
        }
    }

    class NativeSpineFactory {
        constructor() {
            this._nativeFactory = new conchNativeSpineFactory();
        }
        createSpineTempletParser() {
            return new NativeSpineTempletParser();
        }
        createSpineRender2D(owner) {
            const handle = owner._getRenderHandle();
            const struct = owner._struct;
            const nativeRender = this._nativeFactory.createSpineRender2D(handle._nativeObj, struct._nativeObj);
            return new NativeSpineOptimizeRender2D(owner, nativeRender);
        }
        createSpineRender3D(owner) {
            const nativeRender = this._nativeFactory.createSpineRender3D(owner._nativeObj);
            return new NativeSpineOptimizeRender3D(owner, nativeRender);
        }
    }

    Laya.Laya.addAfterInitCallback(() => {
        SpineConst.factory = new NativeSpineFactory();
        NativeSkeletonOptimise.__init__();
    });

    var spine3DVertex = "#if !defined(SpineVertex_lib)\n#define SpineVertex_lib\n#include \"SpineVertexCommon.glsl\";\nuniform mat4 u_WorldMat;uniform vec4 u_WorldInvertFront;struct Vertex{vec3 positionOS;vec3 normalOS;vec2 texCoord0;\n#ifdef UV1\nvec2 texCoord1;\n#endif\nvec4 vertexColor;\n#ifdef LIGHTMAP\nvec4 lightmapScaleOffset;\n#endif LIGHTMAP\n};\n#ifdef LIGHTMAP\n#ifndef GPU_INSTANCE\nuniform vec4 u_LightmapScaleOffset;\n#endif\nvec4 getLightmapScaleOffset(){\n#ifdef GPU_INSTANCE\nreturn a_LightmapScaleOffset;\n#else\nreturn u_LightmapScaleOffset;\n#endif\n}\n#endif\nvoid getVertexParams(inout Vertex vertex){vec4 spinePos2D=getSpinePos();vertex.positionOS=vec3(spinePos2D.xy,0.0);vertex.normalOS=vec3(0.0,0.0,1.0);vertex.vertexColor=vec4(1.0,1.0,1.0,1.0);vertex.vertexColor=a_color;vertex.vertexColor.rgb*=a_color.a;vertex.texCoord0=a_uv;\n#ifdef LIGHTMAP\nvertex.lightmapScaleOffset=getLightmapScaleOffset();\n#endif LIGHTMAP\n}\n#endif\n";

    var spine3DVS = "#define SHADER_NAME Spine3DVS\n#include \"Math.glsl\";\n#include \"Scene.glsl\";\n#include \"SceneFogInput.glsl\";\n#include \"Camera.glsl\";\n#include \"Spine3DVertex.glsl\";\n#ifdef SPINE_BILLBOARD\nuniform mat4 u_spineBillboardMatrix;\n#endif\nvarying vec2 v_texcoord;varying vec4 v_color;varying vec4 v_color2;mat4 getWorldMatrix(){\n#ifdef SPINE_BILLBOARD\nreturn u_spineBillboardMatrix;\n#else\n#ifdef GPU_INSTANCE\nmat4 worldMat=a_WorldMat;\n#else\nmat4 worldMat=u_WorldMat;\n#endif\nreturn worldMat;\n#endif\n}void main(){Vertex vertex;getVertexParams(vertex);v_texcoord=vertex.texCoord0;v_color=vertex.vertexColor;\n#ifdef COLOR2\nv_color2=a_color2;\n#else\nv_color2=vec4(0.0,0.0,0.0,1.0);\n#endif\n#ifdef PREMULTIPLYALPHA\nv_color2.xyz=v_color2.xyz*v_color.a;\n#endif\nmat4 worldMat=getWorldMatrix();vec4 pos=worldMat*vec4(vertex.positionOS,1.0);vec3 positionWS=pos.xyz/pos.w;gl_Position=getPositionCS(positionWS);gl_Position=remapPositionZ(gl_Position);\n#ifdef FOG\nFogHandle(gl_Position.z);\n#endif\n}";

    var spine3DFS = "#define SHADER_NAME Spine3DFS\n#include \"Color.glsl\";\n#include \"Scene.glsl\";\n#include \"SceneFog.glsl\";\n#include \"Camera.glsl\";\nvarying vec2 v_texcoord;varying vec4 v_color;varying vec4 v_color2;vec4 getColor(){vec4 color=texture2D(u_spineTexture,v_texcoord.xy);\n#ifdef Gamma_u_spineTexture\ncolor=gammaToLinear(color);\n#endif\nvec4 final;\n#ifdef TWOCOLORTINT\nfinal.a=color.a*v_color.a;final.xyz=((color.a-1.0)*v_color2.a+1.0-color.xyz)*v_color2.xyz+color.xyz*v_color.xyz;\n#else\nfinal=color*v_color;\n#endif\nreturn final;}void main(){gl_FragColor=getColor();gl_FragColor=outputTransform(gl_FragColor);\n#ifdef FOG\ngl_FragColor=sceneLitFog(gl_FragColor);\n#endif\n}";

    class Spine3DShaderInit {
        static init() {
            Laya.Shader3D.addInclude("Spine3DVertex.glsl", spine3DVertex);
            Spine3DShaderInit.SPINE_BILLBOARD = Laya.Shader3D.getDefineByName("SPINE_BILLBOARD");
            Spine3DShaderInit.SPINE_BILLBOARD_MATRIX = Laya.Shader3D.propertyNameToID("u_spineBillboardMatrix");
            const commandUniform3D = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Spine3D");
            commandUniform3D.addShaderUniformArray(SpineShaderInit.BONEMAT, "u_sBone", Laya.ShaderDataType.Vector4, 200);
            commandUniform3D.addShaderUniform(SpineShaderInit.BONEMAT_0, "u_sBone0", Laya.ShaderDataType.Vector3);
            commandUniform3D.addShaderUniform(SpineShaderInit.BONEMAT_1, "u_sBone1", Laya.ShaderDataType.Vector3);
            commandUniform3D.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORPARAMS, "u_SimpleAnimatorParams", Laya.ShaderDataType.Vector4);
            commandUniform3D.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURE, "u_SimpleAnimatorTexture", Laya.ShaderDataType.Texture2D);
            commandUniform3D.addShaderUniform(SpineShaderInit.SIMPLE_SIMPLEANIMATORTEXTURESIZE, "u_SimpleAnimatorTextureSize", Laya.ShaderDataType.Float);
            commandUniform3D.addShaderUniform(SpineShaderInit.SPINE_RENDER_SIZE, "u_spineRenderSize", Laya.ShaderDataType.Vector2);
            commandUniform3D.addShaderUniform(Spine3DShaderInit.SPINE_BILLBOARD_MATRIX, "u_spineBillboardMatrix", Laya.ShaderDataType.Matrix4x4);
            let shader3D = Laya.Shader3D.add("Spine3D", true, false);
            shader3D.shaderType = Laya.ShaderFeatureType.D3;
            let uniformMap3D = {
                "u_spineTexture": Laya.ShaderDataType.Texture2D
            };
            let subShader3D = new Laya.SubShader(SpineShaderInit.textureSpineAttribute, uniformMap3D);
            shader3D.addSubShader(subShader3D);
            subShader3D.addShaderPass(spine3DVS, spine3DFS);
        }
    }

    exports.ExternalSkin = ExternalSkin;
    exports.ExternalSkinItem = ExternalSkinItem;
    exports.NativeSkeletonOptimise = NativeSkeletonOptimise;
    exports.NativeSpineFactory = NativeSpineFactory;
    exports.NativeSpineOptimizeRender2D = NativeSpineOptimizeRender2D;
    exports.NativeSpineOptimizeRender3D = NativeSpineOptimizeRender3D;
    exports.NativeSpineOptimizeRenderBase = NativeSpineOptimizeRenderBase;
    exports.NativeSpineTempletParser = NativeSpineTempletParser;
    exports.Spine2DRenderNode = Spine2DRenderNode;
    exports.Spine3DShaderInit = Spine3DShaderInit;
    exports.SpineBakeScript = SpineBakeScript;
    exports.SpineConst = SpineConst;
    exports.SpineShaderInit = SpineShaderInit;
    exports.SpineSkeleton = SpineSkeleton;
    exports.SpineTemplet = SpineTemplet;
    exports.SpineTempletLoader = SpineTempletLoader;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.native-spine42.js.map
