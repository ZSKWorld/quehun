import fs from "./DifGlass.fs";
import vs from "./DifGlass.vs";

const mainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const shadowsColor = Laya.Shader3D.propertyNameToID("u_ShadowsColor");
const lightDir = Laya.Shader3D.propertyNameToID("u_LightDir");
const specColor = Laya.Shader3D.propertyNameToID("u_SpecColor");
const specSacle = Laya.Shader3D.propertyNameToID("u_SpecSacle");
const specPower = Laya.Shader3D.propertyNameToID("u_SpecPower");
const factorRange = Laya.Shader3D.propertyNameToID("u_FactorRange");

export class MaterialDifGlass extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("DifGlass");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public set mainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTex, v);
    }

    public set shadowsColor(v: Laya.Vector4) {
        this._shaderValues.setVector(shadowsColor, v);
    }

    public set lightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(lightDir, v);
    }

    public set specColor(v: Laya.Vector4) {
        this._shaderValues.setVector(specColor, v);
    }

    public set specSacle(v: number) {
        this._shaderValues.setNumber(specSacle, v);
    }

    public set specPower(v: number) {
        this._shaderValues.setNumber(specPower, v);
    }

    public set factorRange(v: number) {
        this._shaderValues.setNumber(factorRange, v);
    }
}

export class ShaderDifGlass {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
        };
        const uniformMap = {
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,

            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowsColor: Laya.Shader3D.PERIOD_MATERIAL,

            u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_SpecSacle: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            u_FactorRange: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("DifGlass", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
