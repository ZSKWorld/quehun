/* eslint-disable camelcase */
import fs from "./Animation.fs";
import vs from "./Animation.vs";

const UHAmount = Laya.Shader3D.propertyNameToID("u_HAmount");
const UVAmount = Laya.Shader3D.propertyNameToID("u_VAmount");
const USpeed = Laya.Shader3D.propertyNameToID("u_Speed");
const UMainTex = Laya.Shader3D.propertyNameToID("u_MainTex");

export class MaterialAnimation extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Animation");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get UMainTex(): Laya.BaseTexture {
        return this._shaderValues.getTexture(UMainTex);
    }

    public set UMainTex(value: Laya.BaseTexture) {
        this._shaderValues.setTexture(UMainTex, value);
    }

    public get hAmount() {
        return this._shaderValues.getNumber(UHAmount);
    }

    public set hAmount(v: number) {
        this._shaderValues.setNumber(UHAmount, v);
    }

    public get vAmount() {
        return this._shaderValues.getNumber(UVAmount);
    }

    public set vAmount(v: number) {
        this._shaderValues.setNumber(UVAmount, v);
    }

    public get USpeed() {
        return this._shaderValues.getNumber(USpeed);
    }

    public set USpeed(v: number) {
        this._shaderValues.setNumber(USpeed, v);
    }
}

export class ShaderAnimation {
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
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_HAmount: Laya.Shader3D.PERIOD_MATERIAL,
            u_VAmount: Laya.Shader3D.PERIOD_MATERIAL,
            u_Speed: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Animation", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
