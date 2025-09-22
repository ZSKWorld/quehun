/* eslint-disable camelcase */
import fs from "./Diffish.fs";
import vs from "./Diffish.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _LightTex = Laya.Shader3D.propertyNameToID("_LightTex");
const _LightDir = Laya.Shader3D.propertyNameToID("_LightDir");
const _LightColor = Laya.Shader3D.propertyNameToID("_LightColor");
const _LightController = Laya.Shader3D.propertyNameToID("_LightController");
const _Color = Laya.Shader3D.propertyNameToID("_Color");
const _ColorController = Laya.Shader3D.propertyNameToID("_ColorController");

export class MaterialDiffish extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Diffish");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_OPAQUE;
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _LightTex() {
        return this._shaderValues.getTexture(_LightTex);
    }

    public set _LightTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_LightTex, v);
    }

    public get _LightDir() {
        return this._shaderValues.getVector(_LightDir);
    }

    public set _LightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightDir, v);
    }

    public get _LightColor() {
        return this._shaderValues.getVector(_LightColor);
    }

    public set _LightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightColor, v);
    }

    public get _LightController(): number {
        return this._shaderValues.getNumber(_LightController);
    }

    public set _LightController(v: number) {
        this._shaderValues.setNumber(_LightController, v);
    }

    public get _Color() {
        return this._shaderValues.getVector(_Color);
    }

    public set _Color(v: Laya.Vector4) {
        this._shaderValues.setVector(_Color, v);
    }

    public get _ColorController(): number {
        return this._shaderValues.getNumber(_ColorController);
    }

    public set _ColorController(v: number) {
        this._shaderValues.setNumber(_ColorController, v);
    }

    public clone() {
        const dest = new MaterialDiffish();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._LightTex = this._LightTex;
        destMaterial._LightDir = this._LightDir;
        destMaterial._LightColor = this._LightColor;
        destMaterial._LightController = this._LightController;
        destMaterial._Color = this._Color;
        destMaterial._ColorController = this._ColorController;
    }
}

export class ShaderDiffish {
    public static initShader(): void {
        const attributeMap = {
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            _LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            _LightController: Laya.Shader3D.PERIOD_MATERIAL,
            _Color: Laya.Shader3D.PERIOD_MATERIAL,
            _ColorController: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Diffish");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
