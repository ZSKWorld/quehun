/* eslint-disable camelcase */
import fs from "./Uishaderlight.fs";
import vs from "./Uishaderlight.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _MaskTex = Laya.Shader3D.propertyNameToID("_MaskTex");
const _MaskTexY = Laya.Shader3D.propertyNameToID("_MaskTexY");
const _Alpha = Laya.Shader3D.propertyNameToID("_Alpha");
const _MaskXmove = Laya.Shader3D.propertyNameToID("_MaskXmove");
const _LuminanceRange = Laya.Shader3D.propertyNameToID("_LuminanceRange");
const _VagueRange = Laya.Shader3D.propertyNameToID("_VagueRange");
const _VaguePow = Laya.Shader3D.propertyNameToID("_VaguePow");
const _MaskYmove = Laya.Shader3D.propertyNameToID("_MaskYmove");
const _Disturb = Laya.Shader3D.propertyNameToID("_Disturb");

export class MaterialUishaderlight extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Uishaderlight");
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

    public get _MaskTexY() {
        return this._shaderValues.getTexture(_MaskTexY);
    }

    public set _MaskTexY(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MaskTexY, v);
    }

    public get _Alpha(): number {
        return this._shaderValues.getNumber(_Alpha);
    }

    public set _Alpha(v: number) {
        this._shaderValues.setNumber(_Alpha, v);
    }

    public get _MaskXmove(): number {
        return this._shaderValues.getNumber(_MaskXmove);
    }

    public set _MaskXmove(v: number) {
        this._shaderValues.setNumber(_MaskXmove, v);
    }

    public get _LuminanceRange(): number {
        return this._shaderValues.getNumber(_LuminanceRange);
    }

    public set _LuminanceRange(v: number) {
        this._shaderValues.setNumber(_LuminanceRange, v);
    }

    public get _VagueRange(): number {
        return this._shaderValues.getNumber(_VagueRange);
    }

    public set _VagueRange(v: number) {
        this._shaderValues.setNumber(_VagueRange, v);
    }

    public get _VaguePow(): number {
        return this._shaderValues.getNumber(_VaguePow);
    }

    public set _VaguePow(v: number) {
        this._shaderValues.setNumber(_VaguePow, v);
    }

    public get _MaskYmove(): number {
        return this._shaderValues.getNumber(_MaskYmove);
    }

    public set _MaskYmove(v: number) {
        this._shaderValues.setNumber(_MaskYmove, v);
    }

    public get _Disturb() {
        return this._shaderValues.getVector(_Disturb);
    }

    public set _Disturb(v: Laya.Vector4) {
        this._shaderValues.setVector(_Disturb, v);
    }

    public clone() {
        const dest = new MaterialUishaderlight();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._MaskTex = this._MaskTex;
        destMaterial._MaskTexY = this._MaskTexY;
        destMaterial._Alpha = this._Alpha;
        destMaterial._MaskXmove = this._MaskXmove;
        destMaterial._LuminanceRange = this._LuminanceRange;
        destMaterial._VagueRange = this._VagueRange;
        destMaterial._VaguePow = this._VaguePow;
        destMaterial._MaskYmove = this._MaskYmove;
        destMaterial._Disturb = this._Disturb;
    }
}

export class ShaderUishaderlight {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskTex: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskTexY: Laya.Shader3D.PERIOD_MATERIAL,
            _Alpha: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskXmove: Laya.Shader3D.PERIOD_MATERIAL,
            _LuminanceRange: Laya.Shader3D.PERIOD_MATERIAL,
            _VagueRange: Laya.Shader3D.PERIOD_MATERIAL,
            _VaguePow: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskYmove: Laya.Shader3D.PERIOD_MATERIAL,
            _Disturb: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Uishaderlight");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
