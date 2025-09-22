/* eslint-disable camelcase */
import vs from "./IslandLeaf.vs";
import fs from "./IslandLeaf.fs";

const AO = Laya.Shader3D.propertyNameToID("u_AO");
const AO_COLOR = Laya.Shader3D.propertyNameToID("u_aoColor");
const AO_STRENTH = Laya.Shader3D.propertyNameToID("u_aoStrenth");
const LIGHT_COLOR = Laya.Shader3D.propertyNameToID("u_lightColor");
const ALPHATex = Laya.Shader3D.propertyNameToID("u_alpha");
const FREQUENCY = Laya.Shader3D.propertyNameToID("u_frequency");
const INTENCITY = Laya.Shader3D.propertyNameToID("u_intensity");

export class MaterialIslandLeaf extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("IslandLeaf");
        this.alphaTest = true;
        this.alphaTestValue = 0.5;
    }

    public get ao() {
        return this._shaderValues.getTexture(AO);
    }

    public set ao(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(AO, v);
    }

    public get aoColor() {
        return this._shaderValues.getVector(AO_COLOR);
    }

    public set aoColor(v: Laya.Vector4) {
        this._shaderValues.setVector(AO_COLOR, v);
    }

    public get aoStrenth() {
        return this._shaderValues.getNumber(AO_STRENTH);
    }

    public set aoStrenth(v: number) {
        this._shaderValues.setNumber(AO_STRENTH, v);
    }

    public get lightColor() {
        return this._shaderValues.getVector(LIGHT_COLOR);
    }

    public set lightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(LIGHT_COLOR, v);
    }

    public get alphaText() {
        return this._shaderValues.getTexture(ALPHATex);
    }

    public set alphaText(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(ALPHATex, v);
    }

    public get frequency() {
        return this._shaderValues.getNumber(FREQUENCY);
    }

    public set frequency(v: number) {
        this._shaderValues.setNumber(FREQUENCY, v);
    }

    public get intencity() {
        return this._shaderValues.getNumber(INTENCITY);
    }

    public set intencity(v: number) {
        this._shaderValues.setNumber(INTENCITY, v);
    }
}

export class ShaderIslandLeaf {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
            a_WorldMat: Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_AlbedoTexture: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlbedoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_AO: Laya.Shader3D.PERIOD_MATERIAL,
            u_aoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_lightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_aoStrenth: Laya.Shader3D.PERIOD_MATERIAL,
            u_frequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_intensity: Laya.Shader3D.PERIOD_MATERIAL,
            u_alpha: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("IslandLeaf", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
