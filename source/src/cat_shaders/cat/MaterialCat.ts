/* eslint-disable camelcase */
import vs from "./Cat.vs";
import fs from "./Cat.fs";

const Color = Laya.Shader3D.propertyNameToID("u_Color");
const Plane = Laya.Shader3D.propertyNameToID("u_Plane");
const LightDir = Laya.Shader3D.propertyNameToID("u_LightDir");

export class MaterialCat extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("cat");
    }

    public get color() {
        return this._shaderValues.getVector(Color);
    }

    public set color(v: Laya.Vector4) {
        this._shaderValues.setVector(Color, v);
    }

    public get plane() {
        return this._shaderValues.getVector(Plane);
    }

    public set plane(v: Laya.Vector4) {
        this._shaderValues.setVector(Plane, v);
    }

    public get lightDir() {
        return this._shaderValues.getVector(LightDir);
    }

    public set lightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(LightDir, v);
    }
}

export class ShaderCat {
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
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_AO: Laya.Shader3D.PERIOD_MATERIAL,
            u_color: Laya.Shader3D.PERIOD_MATERIAL,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };
        const stateMap1 = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_EQUATION_ALPHA,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("cat", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
