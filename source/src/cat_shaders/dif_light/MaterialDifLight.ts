/* eslint-disable camelcase */
import fs from "./DifLight.fs";
import vs from "./DifLight.vs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const LightController = Laya.Shader3D.propertyNameToID("u_LightController");
const LightDir = Laya.Shader3D.propertyNameToID("u_LightDir");
const LightColor = Laya.Shader3D.propertyNameToID("u_LightColor");

export class MaterialDifLight extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Dif_light");
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }

    public get LightColor() {
        return this._shaderValues.getVector(LightColor);
    }

    public set LightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(LightColor, v);
    }

    public get LightDir() {
        return this._shaderValues.getVector(LightDir);
    }

    public set LightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(LightDir, v);
    }

    public get LightController() {
        return this._shaderValues.getNumber(LightController);
    }

    public set LightController(v: number) {
        this._shaderValues.setNumber(LightController, v);
    }

    public clone() {
        const dest = new MaterialDifLight();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.LightController = this.LightController;
        this.LightDir.cloneTo(destMaterial.LightDir);
        this.LightColor.cloneTo(destMaterial.LightColor);
        destMaterial.renderQueue = this.renderQueue;
        destMaterial.depthWrite = this.depthWrite;
        destMaterial.depthTest = this.depthTest;
        destMaterial.blend = this.blend;
        destMaterial.blendSrc = this.blendSrc;
        destMaterial.blendDst = this.blendDst;
    }
}

export class ShaderDifLight {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_FogStart: Laya.Shader3D.PERIOD_SCENE,
            u_FogRange: Laya.Shader3D.PERIOD_SCENE,
            u_FogColor: Laya.Shader3D.PERIOD_SCENE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightController: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("Dif_light", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
