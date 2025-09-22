/* eslint-disable camelcase */
import vs from "./FishShadow.vs";
import fs from "./FishShadow.fs";

const _shadowColorId = Laya.Shader3D.propertyNameToID("u_shadowColor");
const _shadowParamId = Laya.Shader3D.propertyNameToID("u_shadowParam");

export class MaterialFishShadow extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Shadow");
    }

    public get shadowParam():number {
        return this._shaderValues.getNumber(_shadowParamId);
    }

    public set shadowParam(v: number) {
        this._shaderValues.setNumber(_shadowParamId, v);
    }

    public get shadowColor():Laya.Vector4 {
        return this._shaderValues.getVector(_shadowColorId);
    }

    public set shadowColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_shadowColorId, v);
    }
}

export class ShaderFishShadow {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_AlbedoTexture: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlbedoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_shadowColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_shadowParam: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Shadow", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
