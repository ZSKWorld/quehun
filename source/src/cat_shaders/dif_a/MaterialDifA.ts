/* eslint-disable camelcase */
import fs from "./DifA.fs";
import vs from "./DifA.vs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const LightMapTex = Laya.Shader3D.propertyNameToID("u_LightMapTex");
const MaskTex = Laya.Shader3D.propertyNameToID("u_MaskTex");
const LightController = Laya.Shader3D.propertyNameToID("u_LightController");
const CastController = Laya.Shader3D.propertyNameToID("u_CastController");
const GlobalController = Laya.Shader3D.propertyNameToID("u_GlobalController");
const OffsetSpeed = Laya.Shader3D.propertyNameToID("u_OffsetSpeed");
const OffsetDir = Laya.Shader3D.propertyNameToID("u_OffsetDir");
const OffsetAmp = Laya.Shader3D.propertyNameToID("u_OffsetAmp");
const LightColor = Laya.Shader3D.propertyNameToID("u_LightColor");
const ShadowColor = Laya.Shader3D.propertyNameToID("u_ShadowColor");
const BloomRange = Laya.Shader3D.propertyNameToID("u_BloomRange");
const SpRange = Laya.Shader3D.propertyNameToID("u_SpRange");
const Alpha = Laya.Shader3D.propertyNameToID("u_Alpha");
const LightRange = Laya.Shader3D.propertyNameToID("u_LightRange");
const BloomPow = Laya.Shader3D.propertyNameToID("u_BloomPow");
const Saturation = Laya.Shader3D.propertyNameToID("u_Saturation");
const Movetape = Laya.Shader3D.propertyNameToID("u_Movetape");

export class MaterialDifA extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Dif_A");
        this.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        this.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
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

    public get MaskTex() {
        return this._shaderValues.getTexture(MaskTex);
    }

    public set MaskTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MaskTex, v);
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

    public get OffsetSpeed() {
        return this._shaderValues.getNumber(OffsetSpeed);
    }

    public set OffsetSpeed(v: number) {
        this._shaderValues.setNumber(OffsetSpeed, v);
    }

    public get OffsetDir() {
        return this._shaderValues.getNumber(OffsetDir);
    }

    public set OffsetDir(v: number) {
        this._shaderValues.setNumber(OffsetDir, v);
    }

    public get OffsetAmp() {
        return this._shaderValues.getNumber(OffsetAmp);
    }

    public set OffsetAmp(v: number) {
        this._shaderValues.setNumber(OffsetAmp, v);
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

    public set SpRange(v: number) {
        this._shaderValues.setNumber(SpRange, v);
    }

    public set Alpha(v: number) {
        this._shaderValues.setNumber(Alpha, v);
    }

    public set LightRange(v: number) {
        this._shaderValues.setNumber(LightRange, v);
    }

    public set BloomPow(v: number) {
        this._shaderValues.setNumber(BloomPow, v);
    }

    public set Saturation(v: number) {
        this._shaderValues.setNumber(Saturation, v);
    }

    public set Movetape(v: number) {
        this._shaderValues.setNumber(Movetape, v);
    }

    public clone() {
        const dest = new MaterialDifA();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.LightController = this.LightController;
        destMaterial.CastController = this.CastController;
        destMaterial.GlobalController = this.GlobalController;
        destMaterial.LightColor = this.LightColor;
        destMaterial.ShadowColor = this.ShadowColor;
        destMaterial.BloomRange = this.BloomRange;
        destMaterial.BloomPow = this.BloomPow;
        destMaterial.Saturation = this.Saturation;
        destMaterial.LightRange = this.LightRange;
        destMaterial.OffsetDir = this.OffsetDir;
        destMaterial.OffsetAmp = this.OffsetAmp;
        destMaterial.SpRange = this.SpRange;
        destMaterial.Alpha = this.Alpha;
    }
}

export class ShaderDifA {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
        };
        const uniformMap = {
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightMapTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_MaskTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightController: Laya.Shader3D.PERIOD_MATERIAL,
            u_CastController: Laya.Shader3D.PERIOD_MATERIAL,
            u_GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_OffsetSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_OffsetDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_OffsetAmp: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_Alpha: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            u_Saturation: Laya.Shader3D.PERIOD_MATERIAL,
            u_Movetape: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Dif_A", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
