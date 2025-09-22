/* eslint-disable camelcase */
import fs from "./Tree.fs";
import vs from "./Tree.vs";

const AO = Laya.Shader3D.propertyNameToID("u_AO");
const COLOR = Laya.Shader3D.propertyNameToID("u_color");
const FREQUENCY = Laya.Shader3D.propertyNameToID("u_frequency");
const INTENSITY = Laya.Shader3D.propertyNameToID("u_intensity");

export class MaterialTree extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Tree");
    }

    public get ao() {
        return this._shaderValues.getTexture(AO);
    }

    public set ao(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(AO, v);
    }

    public get c1() {
        return this._shaderValues.getVector3(COLOR);
    }

    public set c1(v: Laya.Vector3) {
        this._shaderValues.setVector3(COLOR, v);
    }

    public get frequency() {
        return this._shaderValues.getNumber(FREQUENCY);
    }

    public set frequency(v: number) {
        this._shaderValues.setNumber(FREQUENCY, v);
    }

    public get intensity() {
        return this._shaderValues.getNumber(INTENSITY);
    }

    public set intensity(v: number) {
        this._shaderValues.setNumber(INTENSITY, v);
    }
}

export class ShaderTree {
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
            u_frequency: Laya.Shader3D.PERIOD_MATERIAL,
            u_intensity: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("Tree", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
