/* eslint-disable camelcase */
import fs from "./BoatWave.fs";
import vs from "./BoatWave.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _SpeedX = Laya.Shader3D.propertyNameToID("_SpeedX");
const _Alpha = Laya.Shader3D.propertyNameToID("_Alpha");
const _WaveFrequency = Laya.Shader3D.propertyNameToID("_WaveFrequency");
const _SpeedY = Laya.Shader3D.propertyNameToID("_SpeedY");
const _Color = Laya.Shader3D.propertyNameToID("_Color");

export class MaterialBoatWave extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("BoatWave");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get _MainTex(): Laya.BaseTexture {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _SpeedX(): number {
        return this._shaderValues.getNumber(_SpeedX);
    }

    public set _SpeedX(v: number) {
        this._shaderValues.setNumber(_SpeedX, v);
    }

    public get _Alpha(): number {
        return this._shaderValues.getNumber(_Alpha);
    }

    public set _Alpha(v: number) {
        this._shaderValues.setNumber(_Alpha, v);
    }

    public get _WaveFrequency(): number {
        return this._shaderValues.getNumber(_WaveFrequency);
    }

    public set _WaveFrequency(v: number) {
        this._shaderValues.setNumber(_WaveFrequency, v);
    }

    public get _SpeedY(): number {
        return this._shaderValues.getNumber(_SpeedY);
    }

    public set _SpeedY(v: number) {
        this._shaderValues.setNumber(_SpeedY, v);
    }

    public get _Color(): Laya.Vector4 {
        return this._shaderValues.getVector(_Color);
    }

    public set _Color(v: Laya.Vector4) {
        this._shaderValues.setVector(_Color, v);
    }

    public clone() {
        const dest = new MaterialBoatWave();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._SpeedX = this._SpeedX;
        destMaterial._Alpha = this._Alpha;
        destMaterial._WaveFrequency = this._WaveFrequency;
        destMaterial._SpeedY = this._SpeedY;
        destMaterial._Color = this._Color;
    }
}

export class ShaderBoatWave {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        };
        const uniformMap = {
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_Time: Laya.Shader3D.PERIOD_SCENE,

            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _SpeedX: Laya.Shader3D.PERIOD_MATERIAL,
            _Alpha: Laya.Shader3D.PERIOD_MATERIAL,
            _WaveFrequency: Laya.Shader3D.PERIOD_MATERIAL,
            _SpeedY: Laya.Shader3D.PERIOD_MATERIAL,
            _Color: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("BoatWave", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
