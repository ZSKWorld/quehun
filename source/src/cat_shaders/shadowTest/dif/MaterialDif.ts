/* eslint-disable camelcase */
import fs from "./Dif.fs";
import vs from "./Dif.vs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const LightMapTex = Laya.Shader3D.propertyNameToID("u_LightMapTex");
const LightController = Laya.Shader3D.propertyNameToID("u_LightController");
const CastController = Laya.Shader3D.propertyNameToID("u_CastController");
const GlobalController = Laya.Shader3D.propertyNameToID("u_GlobalController");
const LightColor = Laya.Shader3D.propertyNameToID("u_LightColor");
const ShadowColor = Laya.Shader3D.propertyNameToID("u_ShadowColor");
const BloomRange = Laya.Shader3D.propertyNameToID("u_BloomRange");
const BloomPow = Laya.Shader3D.propertyNameToID("u_BloomPow");
const Saturation = Laya.Shader3D.propertyNameToID("u_Saturation");
const LightRange = Laya.Shader3D.propertyNameToID("u_LightRange");
const SpRange = Laya.Shader3D.propertyNameToID("u_SpRange");
const Alpha = Laya.Shader3D.propertyNameToID("u_Alpha");

export class MaterialDif extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Dif");
        // this.renderQueue = Laya.UnlitMaterial.RENDERQUEUE_OPAQUE;
        // this.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        // this.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        // this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_OPAQUE;
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }

    public get LightMapTex() {
        return this._shaderValues.getTexture(LightMapTex);
    }

    public set LightMapTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(LightMapTex, v);
    }

    public get LightColor() {
        return this._shaderValues.getVector(LightColor);
    }

    public set LightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(LightColor, v);
    }

    public get ShadowColor() {
        return this._shaderValues.getVector(ShadowColor);
    }

    public set ShadowColor(v: Laya.Vector4) {
        this._shaderValues.setVector(ShadowColor, v);
    }

    public get LightController() {
        return this._shaderValues.getNumber(LightController);
    }

    public set LightController(v: number) {
        this._shaderValues.setNumber(LightController, v);
    }

    public get CastController() {
        return this._shaderValues.getNumber(CastController);
    }

    public set CastController(v: number) {
        this._shaderValues.setNumber(CastController, v);
    }

    public get GlobalController() {
        return this._shaderValues.getNumber(GlobalController);
    }

    public set GlobalController(v: number) {
        this._shaderValues.setNumber(GlobalController, v);
    }

    public set BloomRange(v: number) {
        this._shaderValues.setNumber(BloomRange, v);
    }

    public set BloomPow(v: number) {
        this._shaderValues.setNumber(BloomPow, v);
    }

    public set Saturation(v: number) {
        this._shaderValues.setNumber(Saturation, v);
    }

    public set LightRange(v: number) {
        this._shaderValues.setNumber(LightRange, v);
    }

    public set SpRange(v: number) {
        this._shaderValues.setNumber(SpRange, v);
    }

    public set Alpha(v: number) {
        this._shaderValues.setNumber(Alpha, v);
    }

    public clone() {
        const dest = new MaterialDif();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.LightController = this.LightController;
        destMaterial.CastController = this.CastController;
        destMaterial.GlobalController = this.GlobalController;
        this.LightColor.cloneTo(destMaterial.LightColor);
        this.ShadowColor.cloneTo(destMaterial.ShadowColor);
        destMaterial.BloomRange = this.BloomRange;
        destMaterial.BloomPow = this.BloomPow;
        destMaterial.Saturation = this.Saturation;
        destMaterial.LightRange = this.LightRange;
        destMaterial.SpRange = this.SpRange;
        destMaterial.Alpha = this.Alpha;
    }
}

export class ShaderDif {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
        };
        const uniformMap = {
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightMapTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightController: Laya.Shader3D.PERIOD_MATERIAL,
            u_CastController: Laya.Shader3D.PERIOD_MATERIAL,
            u_GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            u_Saturation: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_Alpha: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,

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

        const shader = Laya.Shader3D.add("Dif", null, null, true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap, "Forward");
    }
}
