/* eslint-disable camelcase */
import fs from "./LightWave.fs";
import vs from "./LightWave.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _Speed = Laya.Shader3D.propertyNameToID("_Speed");
const _AlphaController = Laya.Shader3D.propertyNameToID("_AlphaController");
const _WaveFrequency = Laya.Shader3D.propertyNameToID("_WaveFrequency");
const _Speed2 = Laya.Shader3D.propertyNameToID("_Speed2");
const _Color = Laya.Shader3D.propertyNameToID("_Color");
const _OffsetX = Laya.Shader3D.propertyNameToID("_OffsetX");
const _OffsetY = Laya.Shader3D.propertyNameToID("_OffsetY");

export class MaterialLightWave extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("LightWave");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE;
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _Speed(): number {
        return this._shaderValues.getNumber(_Speed);
    }

    public set _Speed(v: number) {
        this._shaderValues.setNumber(_Speed, v);
    }

    public get _AlphaController(): number {
        return this._shaderValues.getNumber(_AlphaController);
    }

    public set _AlphaController(v: number) {
        this._shaderValues.setNumber(_AlphaController, v);
    }

    public get _WaveFrequency(): number {
        return this._shaderValues.getNumber(_WaveFrequency);
    }

    public set _WaveFrequency(v: number) {
        this._shaderValues.setNumber(_WaveFrequency, v);
    }

    public get _Speed2(): number {
        return this._shaderValues.getNumber(_Speed2);
    }

    public set _Speed2(v: number) {
        this._shaderValues.setNumber(_Speed2, v);
    }

    public get _Color() {
        return this._shaderValues.getVector(_Color);
    }

    public set _Color(v: Laya.Vector4) {
        this._shaderValues.setVector(_Color, v);
    }

    public get _OffsetX(): number {
        return this._shaderValues.getNumber(_OffsetX);
    }

    public set _OffsetX(v: number) {
        this._shaderValues.setNumber(_OffsetX, v);
    }

    public get _OffsetY(): number {
        return this._shaderValues.getNumber(_OffsetY);
    }

    public set _OffsetY(v: number) {
        this._shaderValues.setNumber(_OffsetY, v);
    }

    public clone() {
        const dest = new MaterialLightWave();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._Speed = this._Speed;
        destMaterial._AlphaController = this._AlphaController;
        destMaterial._WaveFrequency = this._WaveFrequency;
        destMaterial._Speed2 = this._Speed2;
        destMaterial._Color = this._Color;
        destMaterial._OffsetX = this._OffsetX;
        destMaterial._OffsetY = this._OffsetY;
    }
}

export class ShaderLightWave {
    public static initShader(): void {
        const attributeMap = {
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _Speed: Laya.Shader3D.PERIOD_MATERIAL,
            _AlphaController: Laya.Shader3D.PERIOD_MATERIAL,
            _WaveFrequency: Laya.Shader3D.PERIOD_MATERIAL,
            _Speed2: Laya.Shader3D.PERIOD_MATERIAL,
            _Color: Laya.Shader3D.PERIOD_MATERIAL,
            _OffsetX: Laya.Shader3D.PERIOD_MATERIAL,
            _OffsetY: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("LightWave");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
