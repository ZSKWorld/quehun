/* eslint-disable camelcase */
import fs from "./IslandSea.fs";
import vs from "./IslandSea.vs";

const WaveTex2 = Laya.Shader3D.propertyNameToID("u_wave2");
const WaterNormalTex = Laya.Shader3D.propertyNameToID("u_waterNormal");
const WaveColor = Laya.Shader3D.propertyNameToID("u_waterColor");
const USpeed = Laya.Shader3D.propertyNameToID("u_speed");
const OpacityMin = Laya.Shader3D.propertyNameToID("u_opacityMin");
const OpacityMax = Laya.Shader3D.propertyNameToID("u_opacityMax");
const WaveUSpeed = Laya.Shader3D.propertyNameToID("u_wuSpeed");
const WaveVSpeed = Laya.Shader3D.propertyNameToID("u_wvSpeed");
const UFrequency = Laya.Shader3D.propertyNameToID("u_frequency");
const UIntencity = Laya.Shader3D.propertyNameToID("u_intencity");
const USide = Laya.Shader3D.propertyNameToID("u_side");
const UGloss = Laya.Shader3D.propertyNameToID("u_gloss");
const UWaveFrequency = Laya.Shader3D.propertyNameToID("u_waveFrequency");
const UWaveTime = Laya.Shader3D.propertyNameToID("u_waveTime");
const LightDir = Laya.Shader3D.propertyNameToID("u_lightDir");
const TO1 = Laya.Shader3D.propertyNameToID("u_to1");
const TO2 = Laya.Shader3D.propertyNameToID("u_to2");

export class MaterialIslandSea extends Laya.UnlitMaterial {
    //public static WaveTex = Laya.Shader3D.propertyNameToID( "u_wave" );
    constructor() {
        super();
        this.setShaderName("IslandSea");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    /*
    public get wave()
    {
        return this._shaderValues.getTexture( WaveTex );
    }
    public set wave( v: Laya.BaseTexture )
    {
        this._shaderValues.setTexture( WaveTex, v );
    }
    */
    public get wave2() {
        return this._shaderValues.getTexture(WaveTex2);
    }

    public set wave2(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(WaveTex2, v);
    }

    public get water() {
        return this._shaderValues.getTexture(WaterNormalTex);
    }

    public set water(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(WaterNormalTex, v);
    }

    public get WaveColor() {
        return this._shaderValues.getVector(WaveColor);
    }

    public set WaveColor(v: Laya.Vector4) {
        this._shaderValues.setVector(WaveColor, v);
    }

    public get UFrequency() {
        return this._shaderValues.getNumber(UFrequency);
    }

    public set UFrequency(v: number) {
        this._shaderValues.setNumber(UFrequency, v);
    }

    public get UIntencity() {
        return this._shaderValues.getNumber(UIntencity);
    }

    public set UIntencity(v: number) {
        this._shaderValues.setNumber(UIntencity, v);
    }

    public get UOpacityMin() {
        return this._shaderValues.getNumber(OpacityMin);
    }

    public set UOpacityMin(v: number) {
        this._shaderValues.setNumber(OpacityMin, v);
    }

    public get UOpacityMax() {
        return this._shaderValues.getNumber(OpacityMax);
    }

    public set UOpacityMax(v: number) {
        this._shaderValues.setNumber(OpacityMax, v);
    }

    public get USide() {
        return this._shaderValues.getNumber(USide);
    }

    public set USide(v: number) {
        this._shaderValues.setNumber(USide, v);
    }

    public get fSpeed() {
        return this._shaderValues.getNumber(USpeed);
    }

    public set fSpeed(v: number) {
        this._shaderValues.setNumber(USpeed, v);
    }

    public get wuSpeed() {
        return this._shaderValues.getNumber(WaveUSpeed);
    }

    public set wuSpeed(v: number) {
        this._shaderValues.setNumber(WaveUSpeed, v);
    }

    public get wvSpeed() {
        return this._shaderValues.getNumber(WaveVSpeed);
    }

    public set wvSpeed(v: number) {
        this._shaderValues.setNumber(WaveVSpeed, v);
    }

    public get fGloss() {
        return this._shaderValues.getNumber(UGloss);
    }

    public set fGloss(v: number) {
        this._shaderValues.setNumber(UGloss, v);
    }

    public get fWaveFrequency() {
        return this._shaderValues.getNumber(UWaveFrequency);
    }

    public set fWaveFrequency(v: number) {
        this._shaderValues.setNumber(UWaveFrequency, v);
    }

    public get fWaveTime() {
        return this._shaderValues.getNumber(UWaveTime);
    }

    public set fWaveTime(v: number) {
        this._shaderValues.setNumber(UWaveTime, v);
    }

    public get LightDir() {
        return this._shaderValues.getVector(LightDir);
    }

    public set LightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(LightDir, v);
    }

    public get TO1() {
        return this._shaderValues.getVector(TO1);
    }

    public set TO1(v: Laya.Vector4) {
        this._shaderValues.setVector(TO1, v);
    }

    public get TO2() {
        return this._shaderValues.getVector(TO2);
    }

    public set TO2(v: Laya.Vector4) {
        this._shaderValues.setVector(TO2, v);
    }
}

export class ShaderIslandSea {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_AlbedoTexture: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlbedoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_to1: Laya.Shader3D.PERIOD_MATERIAL,
            u_to2: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            //'u_wave': Laya.Shader3D.PERIOD_MATERIAL,
            u_wave2: Laya.Shader3D.PERIOD_MATERIAL,
            u_waterNormal: Laya.Shader3D.PERIOD_MATERIAL,
            u_waterColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_speed: Laya.Shader3D.PERIOD_MATERIAL,
            u_wuSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_wvSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_frequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_intencity: Laya.Shader3D.PERIOD_MATERIAL,
            u_opacityMin: Laya.Shader3D.PERIOD_MATERIAL,
            u_opacityMax: Laya.Shader3D.PERIOD_MATERIAL,
            //'u_blend': Laya.Shader3D.PERIOD_MATERIAL,
            u_side: Laya.Shader3D.PERIOD_MATERIAL,
            u_gloss: Laya.Shader3D.PERIOD_MATERIAL,
            u_lightDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_waveFrequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_waveTime: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("IslandSea", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
