/* eslint-disable camelcase */
import fs from "./OpSea.fs";
import vs from "./OpSea.vs";

const RefTex = Laya.Shader3D.propertyNameToID("u_RefTex");
const BumpTex = Laya.Shader3D.propertyNameToID("u_BumpTex");
const NoiseTex = Laya.Shader3D.propertyNameToID("u_NoiseTex");
const MoveWaveTex = Laya.Shader3D.propertyNameToID("u_MoveWaveTex");
const WaveScale = Laya.Shader3D.propertyNameToID("u_WaveScale");
const WaveSpeed = Laya.Shader3D.propertyNameToID("u_WaveSpeed");
const LightDir = Laya.Shader3D.propertyNameToID("u_LightDir");
const WaterSpecColor = Laya.Shader3D.propertyNameToID("u_WaterSpecColor");
const WaterColor = Laya.Shader3D.propertyNameToID("u_WaterColor");
const SpecPower = Laya.Shader3D.propertyNameToID("u_SpecPower");
const SpecScale = Laya.Shader3D.propertyNameToID("u_SpecScale");
const NoiseScale = Laya.Shader3D.propertyNameToID("u_NoiseScale");
const WaveLen = Laya.Shader3D.propertyNameToID("u_WaveLen");
const Frequency = Laya.Shader3D.propertyNameToID("u_Frequency");
const Strength = Laya.Shader3D.propertyNameToID("u_Strength");
const Fresnel = Laya.Shader3D.propertyNameToID("u_Fresnel");
const MwController = Laya.Shader3D.propertyNameToID("u_MwController");

export class MaterialOpSea extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("OpSea");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get RefTex() {
        return this._shaderValues.getTexture(RefTex);
    }

    public set RefTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(RefTex, v);
    }

    public get BumpTex() {
        return this._shaderValues.getTexture(BumpTex);
    }

    public set BumpTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(BumpTex, v);
    }

    public get NoiseTex() {
        return this._shaderValues.getTexture(NoiseTex);
    }

    public set NoiseTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(NoiseTex, v);
    }

    public get MoveWaveTex() {
        return this._shaderValues.getTexture(MoveWaveTex);
    }

    public set MoveWaveTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MoveWaveTex, v);
    }

    public get WaveScale() {
        return this._shaderValues.getVector(WaveScale);
    }

    public set WaveScale(v: Laya.Vector4) {
        this._shaderValues.setVector(WaveScale, v);
    }

    public get Fresnel() {
        return this._shaderValues.getVector(Fresnel);
    }

    public set Fresnel(v: Laya.Vector4) {
        this._shaderValues.setVector(Fresnel, v);
    }

    public get WaveSpeed() {
        return this._shaderValues.getVector(WaveSpeed);
    }

    public set WaveSpeed(v: Laya.Vector4) {
        this._shaderValues.setVector(WaveSpeed, v);
    }

    public get LightDir() {
        return this._shaderValues.getVector(LightDir);
    }

    public set LightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(LightDir, v);
    }

    public get WaterSpecColor() {
        return this._shaderValues.getVector(WaterSpecColor);
    }

    public set WaterSpecColor(v: Laya.Vector4) {
        this._shaderValues.setVector(WaterSpecColor, v);
    }

    public get WaterColor() {
        return this._shaderValues.getVector(WaterColor);
    }

    public set WaterColor(v: Laya.Vector4) {
        this._shaderValues.setVector(WaterColor, v);
    }

    public get SpecPower() {
        return this._shaderValues.getNumber(SpecPower);
    }

    public set SpecPower(v: number) {
        this._shaderValues.setNumber(SpecPower, v);
    }

    public get SpecScale() {
        return this._shaderValues.getNumber(SpecScale);
    }

    public set SpecScale(v: number) {
        this._shaderValues.setNumber(SpecScale, v);
    }

    public get NoiseScale() {
        return this._shaderValues.getNumber(NoiseScale);
    }

    public set NoiseScale(v: number) {
        this._shaderValues.setNumber(NoiseScale, v);
    }

    public get WaveLen() {
        return this._shaderValues.getNumber(WaveLen);
    }

    public set WaveLen(v: number) {
        this._shaderValues.setNumber(WaveLen, v);
    }

    public get Frequency() {
        return this._shaderValues.getNumber(Frequency);
    }

    public set Frequency(v: number) {
        this._shaderValues.setNumber(Frequency, v);
    }

    public get Strength() {
        return this._shaderValues.getNumber(Strength);
    }

    public set Strength(v: number) {
        this._shaderValues.setNumber(Strength, v);
    }

    public get MwController() {
        return this._shaderValues.getNumber(MwController);
    }

    public set MwController(v: number) {
        this._shaderValues.setNumber(MwController, v);
    }
}

export class ShaderOpSea {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        };
        const uniformMap = {
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_RefTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_BumpTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_NoiseTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_MoveWaveTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaveScale: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaveSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecScale: Laya.Shader3D.PERIOD_MATERIAL,
            u_Global: Laya.Shader3D.PERIOD_MATERIAL,
            u_NoiseScale: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaveLen: Laya.Shader3D.PERIOD_MATERIAL,
            u_Frequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_Strength: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaterColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaterSpecColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_Fresnel: Laya.Shader3D.PERIOD_MATERIAL,
            u_MwController: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("OpSea", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
