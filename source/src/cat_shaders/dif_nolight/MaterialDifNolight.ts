/* eslint-disable camelcase */
import fs from "./DifNolight.fs";
import vs from "./DifNolight.vs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");

export class MaterialDifNolight extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Dif_nolight");
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }
}

export class ShaderDifNolight {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
        };
        const uniformMap = {
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightMapTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightController: Laya.Shader3D.PERIOD_MATERIAL,
            u_CastController: Laya.Shader3D.PERIOD_MATERIAL,
            u_GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowColor: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("Dif_nolight", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
