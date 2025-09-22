/* eslint-disable camelcase */
import fs from "./SunLight.fs";
import vs from "./SunLight.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _MaskTex = Laya.Shader3D.propertyNameToID("_MaskTex");
const _ColorController = Laya.Shader3D.propertyNameToID("_ColorController");
const _LightColor = Laya.Shader3D.propertyNameToID("_LightColor");
const _ViewController = Laya.Shader3D.propertyNameToID("_ViewController");
const _AlphaController = Laya.Shader3D.propertyNameToID("_AlphaController");

export class MaterialSunLight extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("SunLight");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE;
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _MaskTex() {
        return this._shaderValues.getTexture(_MaskTex);
    }

    public set _MaskTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MaskTex, v);
    }

    public get _ColorController(): number {
        return this._shaderValues.getNumber(_ColorController);
    }

    public set _ColorController(v: number) {
        this._shaderValues.setNumber(_ColorController, v);
    }

    public get _LightColor() {
        return this._shaderValues.getVector(_LightColor);
    }

    public set _LightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightColor, v);
    }

    public get _ViewController(): number {
        return this._shaderValues.getNumber(_ViewController);
    }

    public set _ViewController(v: number) {
        this._shaderValues.setNumber(_ViewController, v);
    }

    public get _AlphaController(): number {
        return this._shaderValues.getNumber(_AlphaController);
    }

    public set _AlphaController(v: number) {
        this._shaderValues.setNumber(_AlphaController, v);
    }

    public clone() {
        const dest = new MaterialSunLight();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._MaskTex = this._MaskTex;
        destMaterial._ColorController = this._ColorController;
        destMaterial._LightColor = this._LightColor;
        destMaterial._ViewController = this._ViewController;
        destMaterial._AlphaController = this._AlphaController;
    }
}

export class ShaderSunLight {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskTex: Laya.Shader3D.PERIOD_MATERIAL,
            _ColorController: Laya.Shader3D.PERIOD_MATERIAL,
            _LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            _ViewController: Laya.Shader3D.PERIOD_MATERIAL,
            _AlphaController: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("SunLight");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
