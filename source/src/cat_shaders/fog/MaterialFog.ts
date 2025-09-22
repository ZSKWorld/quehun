/* eslint-disable camelcase */
import vs from "./Fog.vs";
import fs from "./Fog.fs";

const FogTex = Laya.Shader3D.propertyNameToID("u_FogTex");
const DecorativeTex = Laya.Shader3D.propertyNameToID("u_DecorativeTex");
const BlockTex = Laya.Shader3D.propertyNameToID("u_BlockTex");
const AlphaController = Laya.Shader3D.propertyNameToID("u_AlphaController");
const UVTile = Laya.Shader3D.propertyNameToID("u_UVTile");
const TexScale = Laya.Shader3D.propertyNameToID("u_TexScale");
const CloudMove = Laya.Shader3D.propertyNameToID("u_CloudMove");
const CloudController = Laya.Shader3D.propertyNameToID("u_CloudController");
const Fresnelrange = Laya.Shader3D.propertyNameToID("u_Fresnelrange");
const ScaleController = Laya.Shader3D.propertyNameToID("u_ScaleController");

export class MaterialFog extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Fog");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get FogTex() {
        return this._shaderValues.getTexture(FogTex);
    }

    public set FogTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(FogTex, v);
    }

    public get BlockTex() {
        return this._shaderValues.getTexture(BlockTex);
    }

    public set BlockTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(BlockTex, v);
    }

    public get DecorativeTex() {
        return this._shaderValues.getTexture(DecorativeTex);
    }

    public set DecorativeTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(DecorativeTex, v);
    }

    public get AlphaController() {
        return this._shaderValues.getNumber(AlphaController);
    }

    public set AlphaController(v: number) {
        this._shaderValues.setNumber(AlphaController, v);
    }

    public get ScaleController() {
        return this._shaderValues.getNumber(ScaleController);
    }

    public set ScaleController(v: number) {
        this._shaderValues.setNumber(ScaleController, v);
    }

    public get TexScale() {
        return this._shaderValues.getNumber(TexScale);
    }

    public set TexScale(v: number) {
        this._shaderValues.setNumber(TexScale, v);
    }

    public get UVTile() {
        return this._shaderValues.getVector(UVTile);
    }

    public set UVTile(v: Laya.Vector4) {
        this._shaderValues.setVector(UVTile, v);
    }

    public get CloudMove() {
        return this._shaderValues.getVector(CloudMove);
    }

    public set CloudMove(v: Laya.Vector4) {
        this._shaderValues.setVector(CloudMove, v);
    }

    public get CloudController() {
        return this._shaderValues.getNumber(CloudController);
    }

    public set CloudController(v: number) {
        this._shaderValues.setNumber(CloudController, v);
    }

    public get Fresnelrange() {
        return this._shaderValues.getNumber(Fresnelrange);
    }

    public set Fresnelrange(v: number) {
        this._shaderValues.setNumber(Fresnelrange, v);
    }
}

export class ShaderFog {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
        };
        const uniformMap = {
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_BlockTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_DecorativeTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaController: Laya.Shader3D.PERIOD_MATERIAL,
            u_UVTile: Laya.Shader3D.PERIOD_MATERIAL,
            u_TexScale: Laya.Shader3D.PERIOD_MATERIAL,
            u_CloudMove: Laya.Shader3D.PERIOD_MATERIAL,
            u_CloudController: Laya.Shader3D.PERIOD_MATERIAL,
            u_ScaleController: Laya.Shader3D.PERIOD_MATERIAL,
            u_Fresnelrange: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("Fog", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
