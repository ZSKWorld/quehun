/* eslint-disable camelcase */
import vs from "./WaveWarp.vs";
import fs from "./WaveWarp.fs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const ComTex = Laya.Shader3D.propertyNameToID("u_ComTex");
const GrayRange = Laya.Shader3D.propertyNameToID("u_GrayRange");
const FogRangeMax = Laya.Shader3D.propertyNameToID("u_FogRangeMax");
const FogRangePow = Laya.Shader3D.propertyNameToID("u_FogRangePow");
const FogtCol = Laya.Shader3D.propertyNameToID("u_FogtCol");

export default class MaterialWaveWarp extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("WaveWarp");
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }

    public get ComTex() {
        return this._shaderValues.getTexture(ComTex);
    }

    public set ComTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(ComTex, v);
    }

    public get GrayRange() {
        return this._shaderValues.getNumber(GrayRange);
    }

    public set GrayRange(v: number) {
        this._shaderValues.setNumber(GrayRange, v);
    }

    public get FogRangeMax() {
        return this._shaderValues.getNumber(FogRangeMax);
    }

    public set FogRangeMax(v: number) {
        this._shaderValues.setNumber(FogRangeMax, v);
    }

    public get FogRangePow() {
        return this._shaderValues.getNumber(FogRangePow);
    }

    public set FogRangePow(v: number) {
        this._shaderValues.setNumber(FogRangePow, v);
    }

    public get FogtCol() {
        return this._shaderValues.getVector(FogtCol);
    }

    public set FogtCol(v: Laya.Vector4) {
        this._shaderValues.setVector(FogtCol, v);
    }
}

export class ShaderWaveWarp {
    public static initShader(): void {
        const attributeMap = {
            a_PositionTexcoord: Laya.VertexMesh.MESH_POSITION0,
        };

        const uniformMap = {
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_ComTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_GrayRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_FogRangeMax: Laya.Shader3D.PERIOD_MATERIAL,
            u_FogRangePow: Laya.Shader3D.PERIOD_MATERIAL,
            u_FogtCol: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("WaveWarp", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
