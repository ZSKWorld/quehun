/* eslint-disable camelcase */
import fs from "./DifMove.fs";
import vs from "./DifMove.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _LightTex = Laya.Shader3D.propertyNameToID("_LightTex");
const _LightRange = Laya.Shader3D.propertyNameToID("_LightRange");
const _SpRange = Laya.Shader3D.propertyNameToID("_SpRange");
const _LightController = Laya.Shader3D.propertyNameToID("_LightController");
const _LightCol = Laya.Shader3D.propertyNameToID("_LightCol");
const _ShadowCol = Laya.Shader3D.propertyNameToID("_ShadowCol");
const _CastController = Laya.Shader3D.propertyNameToID("_CastController");
const _GlobalController = Laya.Shader3D.propertyNameToID("_GlobalController");
const _BloomRange = Laya.Shader3D.propertyNameToID("_BloomRange");
const _BloomPow = Laya.Shader3D.propertyNameToID("_BloomPow");
const _Saturation = Laya.Shader3D.propertyNameToID("_Saturation");
const _Alpha = Laya.Shader3D.propertyNameToID("_Alpha");
const _Rotation = Laya.Shader3D.propertyNameToID("_Rotation");

export class MaterialDifMove extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Dif_move");
        this.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        this.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
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

    public get _LightCol() {
        return this._shaderValues.getVector(_LightCol);
    }

    public set _LightCol(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightCol, v);
    }

    public get _ShadowCol() {
        return this._shaderValues.getVector(_ShadowCol);
    }

    public set _ShadowCol(v: Laya.Vector4) {
        this._shaderValues.setVector(_ShadowCol, v);
    }

    public get _LightRange() {
        return this._shaderValues.getNumber(_LightRange);
    }

    public set _LightRange(v: number) {
        this._shaderValues.setNumber(_LightRange, v);
    }

    public get _SpRange() {
        return this._shaderValues.getNumber(_SpRange);
    }

    public set _SpRange(v: number) {
        this._shaderValues.setNumber(_SpRange, v);
    }

    public get _LightController() {
        return this._shaderValues.getNumber(_LightController);
    }

    public set _LightController(v: number) {
        this._shaderValues.setNumber(_LightController, v);
    }

    public get _CastController() {
        return this._shaderValues.getNumber(_CastController);
    }

    public set _CastController(v: number) {
        this._shaderValues.setNumber(_CastController, v);
    }

    public get _GlobalController() {
        return this._shaderValues.getNumber(_GlobalController);
    }

    public set _GlobalController(v: number) {
        this._shaderValues.setNumber(_GlobalController, v);
    }

    public get _BloomRange() {
        return this._shaderValues.getNumber(_BloomRange);
    }

    public set _BloomRange(v: number) {
        this._shaderValues.setNumber(_BloomRange, v);
    }

    public get _BloomPow() {
        return this._shaderValues.getNumber(_BloomPow);
    }

    public set _BloomPow(v: number) {
        this._shaderValues.setNumber(_BloomPow, v);
    }

    public get _Saturation() {
        return this._shaderValues.getNumber(_Saturation);
    }

    public set _Saturation(v: number) {
        this._shaderValues.setNumber(_Saturation, v);
    }

    public get _Alpha() {
        return this._shaderValues.getNumber(_Alpha);
    }

    public set _Alpha(v: number) {
        this._shaderValues.setNumber(_Alpha, v);
    }

    public get _Rotation() {
        return this._shaderValues.getNumber(_Rotation);
    }

    public set _Rotation(v: number) {
        this._shaderValues.setNumber(_Rotation, v);
    }
}

export class ShaderDifMove {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
        };
        const uniformMap = {
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_Time: Laya.Shader3D.PERIOD_SCENE,

            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightRange: Laya.Shader3D.PERIOD_MATERIAL,
            _SpRange: Laya.Shader3D.PERIOD_MATERIAL,
            _LightController: Laya.Shader3D.PERIOD_MATERIAL,
            _LightCol: Laya.Shader3D.PERIOD_MATERIAL,
            _ShadowCol: Laya.Shader3D.PERIOD_MATERIAL,
            _CastController: Laya.Shader3D.PERIOD_MATERIAL,
            _GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            _BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            _BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            _Saturation: Laya.Shader3D.PERIOD_MATERIAL,
            _Alpha: Laya.Shader3D.PERIOD_MATERIAL,
            _Rotation: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Dif_move", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
