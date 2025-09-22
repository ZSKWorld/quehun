/* eslint-disable camelcase */
import vs from "./Water.vs";
import fs from "./Water.fs";

const NoiseTex = Laya.Shader3D.propertyNameToID("u_noise");
const V1 = Laya.Shader3D.propertyNameToID("u_v1");
const USpeed = Laya.Shader3D.propertyNameToID("u_uSpeed");
const VSpeed = Laya.Shader3D.propertyNameToID("u_vSpeed");

export class MaterialWater extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Water");
    }

    public get noise() {
        return this._shaderValues.getTexture(NoiseTex);
    }

    public set noise(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(NoiseTex, v);
    }

    public get v1() {
        return this._shaderValues.getNumber(V1);
    }

    public set v1(v: number) {
        this._shaderValues.setNumber(V1, v);
    }

    public get uSpeed() {
        return this._shaderValues.getNumber(USpeed);
    }

    public set uSpeed(v: number) {
        this._shaderValues.setNumber(USpeed, v);
    }

    public get vSpeed() {
        return this._shaderValues.getNumber(VSpeed);
    }

    public set vSpeed(v: number) {
        this._shaderValues.setNumber(VSpeed, v);
    }
}

export class ShaderWater {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
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
            u_noise: Laya.Shader3D.PERIOD_MATERIAL,
            u_uSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_vSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_v1: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("Water", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
