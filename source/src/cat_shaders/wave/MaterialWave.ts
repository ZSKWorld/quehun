import fs from "./Wave.fs";
import vs from "./Wave.vs";

const MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const Speed = Laya.Shader3D.propertyNameToID("_Speed");
const Speed2 = Laya.Shader3D.propertyNameToID("_Speed2");
const AlphaController = Laya.Shader3D.propertyNameToID("_AlphaController");
const WaveFrequency = Laya.Shader3D.propertyNameToID("_WaveFrequency");
const Color = Laya.Shader3D.propertyNameToID("_Color");
const OffsetX = Laya.Shader3D.propertyNameToID("_OffsetX");
const OffsetY = Laya.Shader3D.propertyNameToID("_OffsetY");

export class MaterialWave extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Wave");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }

    public get Speed() {
        return this._shaderValues.getNumber(Speed);
    }

    public set Speed(v: number) {
        this._shaderValues.setNumber(Speed, v);
    }

    public get Speed2() {
        return this._shaderValues.getNumber(Speed2);
    }

    public set Speed2(v: number) {
        this._shaderValues.setNumber(Speed2, v);
    }

    public get _AlphaController() {
        return this._shaderValues.getNumber(AlphaController);
    }

    public set _AlphaController(v: number) {
        this._shaderValues.setNumber(AlphaController, v);
    }

    public get WaveFrequency() {
        return this._shaderValues.getNumber(WaveFrequency);
    }

    public set WaveFrequency(v: number) {
        this._shaderValues.setNumber(WaveFrequency, v);
    }

    public get Color() {
        return this._shaderValues.getVector(Color);
    }

    public set Color(v: Laya.Vector4) {
        this._shaderValues.setVector(Color, v);
    }

    public get _OffsetX() {
        return this._shaderValues.getNumber(OffsetX);
    }

    public set _OffsetX(v: number) {
        this._shaderValues.setNumber(OffsetX, v);
    }

    public get OffsetY() {
        return this._shaderValues.getNumber(OffsetY);
    }

    public set OffsetY(v: number) {
        this._shaderValues.setNumber(OffsetY, v);
    }

    public clone() {
        const dest = new MaterialWave();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.MainTex = this.MainTex;
        destMaterial.Speed = this.Speed;
        destMaterial.Speed2 = this.Speed2;
        destMaterial._AlphaController = this._AlphaController;
        destMaterial.WaveFrequency = this.WaveFrequency;
        destMaterial.Color = this.Color;
        destMaterial._OffsetX = this._OffsetX;
        destMaterial.OffsetY = this.OffsetY;
    }
}

export class ShaderWave {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_Time: Laya.Shader3D.PERIOD_SCENE,

            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _Speed: Laya.Shader3D.PERIOD_MATERIAL,
            _Speed2: Laya.Shader3D.PERIOD_MATERIAL,
            _AlphaController: Laya.Shader3D.PERIOD_MATERIAL,
            _WaveFrequency: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("Wave", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
