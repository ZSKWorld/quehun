import fs from "./Character.fs";
import vs from "./Character.vs";
import fs1 from "./CharacterShadow.fs";
import vs1 from "./CharacterShadow.vs";

const mainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const lightDir = Laya.Shader3D.propertyNameToID("u_LightDir");
const specTex = Laya.Shader3D.propertyNameToID("u_SpecTex");
const speculaCrolor = Laya.Shader3D.propertyNameToID("u_SpeculaCrolor");
const specPower = Laya.Shader3D.propertyNameToID("u_SpecPower");
const lightColor = Laya.Shader3D.propertyNameToID("u_LightColor");
const refColor = Laya.Shader3D.propertyNameToID("u_RefColor");
const gloss = Laya.Shader3D.propertyNameToID("u_Gloss");
const glossController = Laya.Shader3D.propertyNameToID("u_GlobalController");
const shadowCol = Laya.Shader3D.propertyNameToID("u_ShadowCol");
const shadowA = Laya.Shader3D.propertyNameToID("u_ShadowA");
const shadowPos = Laya.Shader3D.propertyNameToID("u_ShadowPos");
const rimColorController = Laya.Shader3D.propertyNameToID("u_RimColorController");
const rimColorRange = Laya.Shader3D.propertyNameToID("u_RimColorRange");
const rimColor = Laya.Shader3D.propertyNameToID("u_RimColor");
const bloomRange = Laya.Shader3D.propertyNameToID("u_BloomRange");
const bloomPow = Laya.Shader3D.propertyNameToID("u_BloomPow");
const angle = Laya.Shader3D.propertyNameToID("u_Angle");

export class MaterialCharacter extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Character");
        // this.renderQueue = Laya.UnlitMaterial.RENDERQUEUE_OPAQUE;
        // this.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        // this.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        // this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;

        this.renderMode = Laya.UnlitMaterial.RENDERMODE_OPAQUE;
    }

    public get mainTex() {
        return this._shaderValues.getTexture(mainTex);
    }

    public set mainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTex, v);
    }

    public set lightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(lightDir, v);
    }

    public get specTex(): Laya.BaseTexture {
        return this._shaderValues.getTexture(specTex);
    }

    public set specTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(specTex, v);
    }

    public get speculaCrolor(): Laya.Vector4 {
        return this._shaderValues.getVector(speculaCrolor);
    }

    public set speculaCrolor(v: Laya.Vector4) {
        this._shaderValues.setVector(speculaCrolor, v);
    }

    public get specPower(): number {
        return this._shaderValues.getNumber(specPower);
    }

    public set specPower(v: number) {
        this._shaderValues.setNumber(specPower, v);
    }

    public set lightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(lightColor, v);
    }

    public set refColor(v: Laya.Vector4) {
        this._shaderValues.setVector(refColor, v);
    }

    public set gloss(v: number) {
        this._shaderValues.setNumber(gloss, v);
    }

    public set glossController(v: number) {
        this._shaderValues.setNumber(glossController, v);
    }

    public set shadowCol(v: Laya.Vector4) {
        this._shaderValues.setVector(shadowCol, v);
    }

    public set shadowA(v: Laya.Vector4) {
        this._shaderValues.setVector(shadowA, v);
    }

    public set shadowPos(v: number) {
        this._shaderValues.setNumber(shadowPos, v);
    }

    public set rimColorController(v: number) {
        this._shaderValues.setNumber(rimColorController, v);
    }

    public set rimColorRange(v: number) {
        this._shaderValues.setNumber(rimColorRange, v);
    }

    public set rimColor(v: Laya.Vector4) {
        this._shaderValues.setVector(rimColor, v);
    }

    public set bloomRange(v: number) {
        this._shaderValues.setNumber(bloomRange, v);
    }

    public set bloomPow(v: number) {
        this._shaderValues.setNumber(bloomPow, v);
    }

    public set angle(v: number) {
        this._shaderValues.setNumber(angle, v);
    }
}

export class ShaderCharacter {
    public initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_Tangent0: Laya.VertexMesh.MESH_TANGENT0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
            a_WorldMat: Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpeculaCrolor: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_RefColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_Gloss: Laya.Shader3D.PERIOD_MATERIAL,
            u_GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowCol: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowA: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowPos: Laya.Shader3D.PERIOD_MATERIAL,
            u_RimColorController: Laya.Shader3D.PERIOD_MATERIAL,
            u_RimColorRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_RimColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            u_Angle: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_View: Laya.Shader3D.PERIOD_CAMERA,

            u_Viewport: Laya.Shader3D.PERIOD_CAMERA,
            u_ProjectionParams: Laya.Shader3D.PERIOD_CAMERA,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_DirationLightCount: Laya.Shader3D.PERIOD_SCENE,
            u_LightBuffer: Laya.Shader3D.PERIOD_SCENE,
            u_LightClusterBuffer: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowBias: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowLightDirection: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowMap: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowParams: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowSplitSpheres: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowMatrices: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowMapSize: Laya.Shader3D.PERIOD_SCENE,
            u_ShadowLightPosition: Laya.Shader3D.PERIOD_SCENE,
            "u_DirectionLight.color": Laya.Shader3D.PERIOD_SCENE,
            "u_DirectionLight.direction": Laya.Shader3D.PERIOD_SCENE,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        //     this.alphaTest = false;
        //     this.renderQueue = Material.RENDERQUEUE_OPAQUE;
        //     this.depthWrite = true;
        //     this.cull = RenderState.CULL_BACK;
        //     this.blend = RenderState.BLEND_DISABLE;
        //     this.depthTest = RenderState.DEPTHTEST_LESS;
        //     break;
        // case BlinnPhongMaterial.RENDERMODE_CUTOUT:
        //     this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
        //     this.alphaTest = true;
        //     this.depthWrite = true;
        //     this.cull = RenderState.CULL_BACK;
        //     this.blend = RenderState.BLEND_DISABLE;
        //     this.depthTest = RenderState.DEPTHTEST_LESS;
        //     break;
        // case BlinnPhongMaterial.RENDERMODE_TRANSPARENT:
        //     this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
        //     this.alphaTest = false;
        //     this.depthWrite = false;
        //     this.cull = RenderState.CULL_BACK;
        //     this.blend = RenderState.BLEND_ENABLE_ALL;
        //     this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
        //     this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        //     this.depthTest = RenderState.DEPTHTEST_LESS;

        const shader = Laya.Shader3D.add("Character", null, null, true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap, "Forward");
        const shadowPass = subShader.addShaderPass(vs1, fs1, stateMap, "ShadowCaster");
        // shadowPass.renderState.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        // shadowPass.renderState.srcBlend = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        // shadowPass.renderState.dstBlend = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        // shadowPass.renderState.depthWrite = false;
        // (shadowPass.renderState as any).stencilTest = true;
    }
}
