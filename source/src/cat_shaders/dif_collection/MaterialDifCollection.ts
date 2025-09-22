/* eslint-disable camelcase */
import fs from "./DifCollection.fs";
import vs from "./DifCollection.vs";
import fs1 from "./DifCollection1.fs";
import vs1 from "./DifCollection1.vs";

const _GlowSize = Laya.Shader3D.propertyNameToID("_GlowSize");
const _GlowColor = Laya.Shader3D.propertyNameToID("_GlowColor");
const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _LightTex = Laya.Shader3D.propertyNameToID("_LightTex");
const _MaskTex = Laya.Shader3D.propertyNameToID("_MaskTex");
const _LightController = Laya.Shader3D.propertyNameToID("_LightController");
const _CastController = Laya.Shader3D.propertyNameToID("_CastController");
const _GlobalController = Laya.Shader3D.propertyNameToID("_GlobalController");
const _LightCol = Laya.Shader3D.propertyNameToID("_LightCol");
const _ShadowCol = Laya.Shader3D.propertyNameToID("_ShadowCol");
const _Saturation = Laya.Shader3D.propertyNameToID("_Saturation");
const _BloomRange = Laya.Shader3D.propertyNameToID("_BloomRange");
const _BloomPow = Laya.Shader3D.propertyNameToID("_BloomPow");
const _LightRange = Laya.Shader3D.propertyNameToID("_LightRange");
const _SpRange = Laya.Shader3D.propertyNameToID("_SpRange");
const _Alpha = Laya.Shader3D.propertyNameToID("_Alpha");

export class MaterialDifCollection extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("DifCollection");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get _GlowSize(): number {
        return this._shaderValues.getNumber(_GlowSize);
    }

    public set _GlowSize(v: number) {
        this._shaderValues.setNumber(_GlowSize, v);
    }

    public get _GlowColor() {
        return this._shaderValues.getVector(_GlowColor);
    }

    public set _GlowColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_GlowColor, v);
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

    public get _MaskTex() {
        return this._shaderValues.getTexture(_MaskTex);
    }

    public set _MaskTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MaskTex, v);
    }

    public get _LightController(): number {
        return this._shaderValues.getNumber(_LightController);
    }

    public set _LightController(v: number) {
        this._shaderValues.setNumber(_LightController, v);
    }

    public get _CastController(): number {
        return this._shaderValues.getNumber(_CastController);
    }

    public set _CastController(v: number) {
        this._shaderValues.setNumber(_CastController, v);
    }

    public get _GlobalController(): number {
        return this._shaderValues.getNumber(_GlobalController);
    }

    public set _GlobalController(v: number) {
        this._shaderValues.setNumber(_GlobalController, v);
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

    public get _Saturation(): number {
        return this._shaderValues.getNumber(_Saturation);
    }

    public set _Saturation(v: number) {
        this._shaderValues.setNumber(_Saturation, v);
    }

    public get _BloomRange(): number {
        return this._shaderValues.getNumber(_BloomRange);
    }

    public set _BloomRange(v: number) {
        this._shaderValues.setNumber(_BloomRange, v);
    }

    public get _BloomPow(): number {
        return this._shaderValues.getNumber(_BloomPow);
    }

    public set _BloomPow(v: number) {
        this._shaderValues.setNumber(_BloomPow, v);
    }

    public get _LightRange(): number {
        return this._shaderValues.getNumber(_LightRange);
    }

    public set _LightRange(v: number) {
        this._shaderValues.setNumber(_LightRange, v);
    }

    public get _SpRange(): number {
        return this._shaderValues.getNumber(_SpRange);
    }

    public set _SpRange(v: number) {
        this._shaderValues.setNumber(_SpRange, v);
    }

    public get _Alpha(): number {
        return this._shaderValues.getNumber(_Alpha);
    }

    public set _Alpha(v: number) {
        this._shaderValues.setNumber(_Alpha, v);
    }

    public clone() {
        const dest = new MaterialDifCollection();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._GlowSize = this._GlowSize;
        destMaterial._GlowColor = this._GlowColor;
        destMaterial._MainTex = this._MainTex;
        destMaterial._LightTex = this._LightTex;
        destMaterial._MaskTex = this._MaskTex;
        destMaterial._LightController = this._LightController;
        destMaterial._CastController = this._CastController;
        destMaterial._GlobalController = this._GlobalController;
        destMaterial._LightCol = this._LightCol;
        destMaterial._ShadowCol = this._ShadowCol;
        destMaterial._Saturation = this._Saturation;
        destMaterial._BloomRange = this._BloomRange;
        destMaterial._BloomPow = this._BloomPow;
        destMaterial._LightRange = this._LightRange;
        destMaterial._SpRange = this._SpRange;
        destMaterial._Alpha = this._Alpha;
    }
}

export class ShaderDifCollection {
    public static initShader(): void {
        const attributeMap = {
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            _GlowSize: Laya.Shader3D.PERIOD_MATERIAL,
            _GlowColor: Laya.Shader3D.PERIOD_MATERIAL,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightTex: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightController: Laya.Shader3D.PERIOD_MATERIAL,
            _CastController: Laya.Shader3D.PERIOD_MATERIAL,
            _GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            _LightCol: Laya.Shader3D.PERIOD_MATERIAL,
            _ShadowCol: Laya.Shader3D.PERIOD_MATERIAL,
            _Saturation: Laya.Shader3D.PERIOD_MATERIAL,
            _BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            _BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            _LightRange: Laya.Shader3D.PERIOD_MATERIAL,
            _SpRange: Laya.Shader3D.PERIOD_MATERIAL,
            _Alpha: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("DifCollection");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        const shadowPass = subShader.addShaderPass(vs, fs);
        shadowPass.renderState.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        shadowPass.renderState.srcBlend = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        shadowPass.renderState.dstBlend = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        shadowPass.renderState.depthWrite = false;
        shadowPass.renderState.cull = Laya.RenderState.CULL_FRONT;
        (shadowPass.renderState as any).stencilTest = true;

        subShader.addShaderPass(vs1, fs1, stateMap);
    }
}
