/* eslint-disable camelcase */
import vs from "./IslandWaterfall.vs";
import fs from "./IslandWaterfall.fs";

const NoiseTex = Laya.Shader3D.propertyNameToID("u_noise");
const WaveTex = Laya.Shader3D.propertyNameToID("u_wave");
const WaterfallTex = Laya.Shader3D.propertyNameToID("u_waterfall");
const WaterColor = Laya.Shader3D.propertyNameToID("u_waterColor");
const FlowUSpeed = Laya.Shader3D.propertyNameToID("u_fuSpeed");
const FlowVSpeed = Laya.Shader3D.propertyNameToID("u_fvSpeed");
const WaveUSpeed = Laya.Shader3D.propertyNameToID("u_wuSpeed");
const WaveVSpeed = Laya.Shader3D.propertyNameToID("u_wvSpeed");
const UBlend = Laya.Shader3D.propertyNameToID("u_blend");
const UFrequency = Laya.Shader3D.propertyNameToID("u_frequency");
const UIntencity = Laya.Shader3D.propertyNameToID("u_intencity");
const USide = Laya.Shader3D.propertyNameToID("u_side");
const URange = Laya.Shader3D.propertyNameToID("u_range");
const UBright = Laya.Shader3D.propertyNameToID("u_bright");
const TO1 = Laya.Shader3D.propertyNameToID("u_to1");
const TO2 = Laya.Shader3D.propertyNameToID("u_to2");
const TO3 = Laya.Shader3D.propertyNameToID("u_to3");
const TO4 = Laya.Shader3D.propertyNameToID("u_to4");
const TO5 = Laya.Shader3D.propertyNameToID("u_to5");
const AO = Laya.Shader3D.propertyNameToID("u_AO");
const AO_COLOR = Laya.Shader3D.propertyNameToID("u_aoColor");
const AO_STRENTH = Laya.Shader3D.propertyNameToID("u_aoStrenth");
const LIGHT_COLOR = Laya.Shader3D.propertyNameToID("u_lightColor");

export class MaterialIslandWaterfall extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("IslandWaterfall");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get ao() {
        return this._shaderValues.getTexture(AO);
    }

    public set ao(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(AO, v);
    }

    public get aoColor() {
        return this._shaderValues.getVector(AO_COLOR);
    }

    public set aoColor(v: Laya.Vector4) {
        this._shaderValues.setVector(AO_COLOR, v);
    }

    public get aoStrenth() {
        return this._shaderValues.getNumber(AO_STRENTH);
    }

    public set aoStrenth(v: number) {
        this._shaderValues.setNumber(AO_STRENTH, v);
    }

    public get lightColor() {
        return this._shaderValues.getVector(LIGHT_COLOR);
    }

    public set lightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(LIGHT_COLOR, v);
    }

    public get noise() {
        return this._shaderValues.getTexture(NoiseTex);
    }

    public set noise(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(NoiseTex, v);
    }

    public get wave() {
        return this._shaderValues.getTexture(WaveTex);
    }

    public set wave(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(WaveTex, v);
    }

    public get waterfallTex() {
        return this._shaderValues.getTexture(WaterfallTex);
    }

    public set waterfallTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(WaterfallTex, v);
    }

    public get WaterColor() {
        return this._shaderValues.getVector(WaterColor);
    }

    public set WaterColor(v: Laya.Vector4) {
        this._shaderValues.setVector(WaterColor, v);
    }

    public get UBlend() {
        return this._shaderValues.getNumber(UBlend);
    }

    public set UBlend(v: number) {
        this._shaderValues.setNumber(UBlend, v);
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

    public get USide() {
        return this._shaderValues.getNumber(USide);
    }

    public set USide(v: number) {
        this._shaderValues.setNumber(USide, v);
    }

    public get URange() {
        return this._shaderValues.getNumber(URange);
    }

    public set URange(v: number) {
        this._shaderValues.setNumber(URange, v);
    }

    public get UBright() {
        return this._shaderValues.getNumber(UBright);
    }

    public set UBright(v: number) {
        this._shaderValues.setNumber(UBright, v);
    }

    public get fuSpeed() {
        return this._shaderValues.getNumber(FlowUSpeed);
    }

    public set fuSpeed(v: number) {
        this._shaderValues.setNumber(FlowUSpeed, v);
    }

    public get fvSpeed() {
        return this._shaderValues.getNumber(FlowVSpeed);
    }

    public set fvSpeed(v: number) {
        this._shaderValues.setNumber(FlowVSpeed, v);
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

    public get TO3() {
        return this._shaderValues.getVector(TO3);
    }

    public set TO3(v: Laya.Vector4) {
        this._shaderValues.setVector(TO3, v);
    }

    public get TO4() {
        return this._shaderValues.getVector(TO4);
    }

    public set TO4(v: Laya.Vector4) {
        this._shaderValues.setVector(TO4, v);
    }

    public get TO5() {
        return this._shaderValues.getVector(TO5);
    }

    public set TO5(v: Laya.Vector4) {
        this._shaderValues.setVector(TO5, v);
    }
}

export class ShaderIslandWaterfall {
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
            u_to3: Laya.Shader3D.PERIOD_MATERIAL,
            u_to4: Laya.Shader3D.PERIOD_MATERIAL,
            u_to5: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_noise: Laya.Shader3D.PERIOD_MATERIAL,
            u_wave: Laya.Shader3D.PERIOD_MATERIAL,
            u_fuSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_fvSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_wuSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_wvSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_frequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_intencity: Laya.Shader3D.PERIOD_MATERIAL,
            u_blend: Laya.Shader3D.PERIOD_MATERIAL,
            u_side: Laya.Shader3D.PERIOD_MATERIAL,
            u_range: Laya.Shader3D.PERIOD_MATERIAL,
            u_bright: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_AO: Laya.Shader3D.PERIOD_MATERIAL,
            u_aoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_lightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_aoStrenth: Laya.Shader3D.PERIOD_MATERIAL,
            u_waterfall: Laya.Shader3D.PERIOD_MATERIAL,
            u_waterColor: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("IslandWaterfall", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
