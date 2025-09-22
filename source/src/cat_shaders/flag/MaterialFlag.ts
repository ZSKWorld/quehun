/* eslint-disable camelcase */
import vs from "./Flag.vs";
import fs from "./Flag.fs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const Frequency = Laya.Shader3D.propertyNameToID("u_Frequency");
const AmplitudeStrength = Laya.Shader3D.propertyNameToID("u_AmplitudeStrength");
const InvWaveLength = Laya.Shader3D.propertyNameToID("u_InvWaveLength");
const Fold = Laya.Shader3D.propertyNameToID("u_Fold");

export class MaterialFlag extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Flag");
        this.cull = Laya.RenderState.CULL_NONE;
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }

    public get Frequency() {
        return this._shaderValues.getNumber(Frequency);
    }

    public set Frequency(v: number) {
        this._shaderValues.setNumber(Frequency, v);
    }

    public get AmplitudeStrength() {
        return this._shaderValues.getNumber(AmplitudeStrength);
    }

    public set AmplitudeStrength(v: number) {
        this._shaderValues.setNumber(AmplitudeStrength, v);
    }

    public get InvWaveLength() {
        return this._shaderValues.getNumber(InvWaveLength);
    }

    public set InvWaveLength(v: number) {
        this._shaderValues.setNumber(InvWaveLength, v);
    }

    public get Fold() {
        return this._shaderValues.getNumber(Fold);
    }

    public set Fold(v: number) {
        this._shaderValues.setNumber(Fold, v);
    }
}

export class ShaderFlag {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
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
            u_Frequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_AmplitudeStrength: Laya.Shader3D.PERIOD_MATERIAL,
            u_InvWaveLength: Laya.Shader3D.PERIOD_MATERIAL,
            u_Fold: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Flag", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
