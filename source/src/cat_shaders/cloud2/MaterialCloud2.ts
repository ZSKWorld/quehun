/* eslint-disable camelcase */
import fs from "./Cloud2.fs";
import vs from "./Cloud2.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _DecorativeTex = Laya.Shader3D.propertyNameToID("_DecorativeTex");
const _MaskTex = Laya.Shader3D.propertyNameToID("_MaskTex");
const _AhplaController = Laya.Shader3D.propertyNameToID("_AhplaController");
const _TexScale = Laya.Shader3D.propertyNameToID("_TexScale");
const _CloudMove = Laya.Shader3D.propertyNameToID("_CloudMove");
const _CloudController = Laya.Shader3D.propertyNameToID("_CloudController");
const _CloudColor = Laya.Shader3D.propertyNameToID("_CloudColor");
const _OffsetX = Laya.Shader3D.propertyNameToID("_OffsetX");
const _OffsetY = Laya.Shader3D.propertyNameToID("_OffsetY");
const _DisturbScale = Laya.Shader3D.propertyNameToID("_DisturbScale");
const _DistanceAhpla = Laya.Shader3D.propertyNameToID("_DistanceAhpla");

export class MaterialCloud2 extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Cloud2");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _DecorativeTex() {
        return this._shaderValues.getTexture(_DecorativeTex);
    }

    public set _DecorativeTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_DecorativeTex, v);
    }

    public get _MaskTex() {
        return this._shaderValues.getTexture(_MaskTex);
    }

    public set _MaskTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MaskTex, v);
    }

    public get _AhplaController(): number {
        return this._shaderValues.getNumber(_AhplaController);
    }

    public set _AhplaController(v: number) {
        this._shaderValues.setNumber(_AhplaController, v);
    }

    public get _TexScale(): number {
        return this._shaderValues.getNumber(_TexScale);
    }

    public set _TexScale(v: number) {
        this._shaderValues.setNumber(_TexScale, v);
    }

    public get _CloudMove() {
        return this._shaderValues.getVector(_CloudMove);
    }

    public set _CloudMove(v: Laya.Vector4) {
        this._shaderValues.setVector(_CloudMove, v);
    }

    public get _CloudController(): number {
        return this._shaderValues.getNumber(_CloudController);
    }

    public set _CloudController(v: number) {
        this._shaderValues.setNumber(_CloudController, v);
    }

    public get _CloudColor() {
        return this._shaderValues.getVector(_CloudColor);
    }

    public set _CloudColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_CloudColor, v);
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

    public get _DisturbScale(): number {
        return this._shaderValues.getNumber(_DisturbScale);
    }

    public set _DisturbScale(v: number) {
        this._shaderValues.setNumber(_DisturbScale, v);
    }

    public get _DistanceAhpla(): number {
        return this._shaderValues.getNumber(_DistanceAhpla);
    }

    public set _DistanceAhpla(v: number) {
        this._shaderValues.setNumber(_DistanceAhpla, v);
    }

    public clone() {
        const dest = new MaterialCloud2();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._DecorativeTex = this._DecorativeTex;
        destMaterial._MaskTex = this._MaskTex;
        destMaterial._AhplaController = this._AhplaController;
        destMaterial._TexScale = this._TexScale;
        destMaterial._CloudMove = this._CloudMove;
        destMaterial._CloudController = this._CloudController;
        destMaterial._CloudColor = this._CloudColor;
        destMaterial._OffsetX = this._OffsetX;
        destMaterial._OffsetY = this._OffsetY;
        destMaterial._DisturbScale = this._DisturbScale;
        destMaterial._DistanceAhpla = this._DistanceAhpla;
    }
}

export class ShaderCloud2 {
    public static initShader(): void {
        const attributeMap = {
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _DecorativeTex: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskTex: Laya.Shader3D.PERIOD_MATERIAL,
            _AhplaController: Laya.Shader3D.PERIOD_MATERIAL,
            _TexScale: Laya.Shader3D.PERIOD_MATERIAL,
            _CloudMove: Laya.Shader3D.PERIOD_MATERIAL,
            _CloudController: Laya.Shader3D.PERIOD_MATERIAL,
            _CloudColor: Laya.Shader3D.PERIOD_MATERIAL,
            _OffsetX: Laya.Shader3D.PERIOD_MATERIAL,
            _OffsetY: Laya.Shader3D.PERIOD_MATERIAL,
            _DisturbScale: Laya.Shader3D.PERIOD_MATERIAL,
            _DistanceAhpla: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Cloud2");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
