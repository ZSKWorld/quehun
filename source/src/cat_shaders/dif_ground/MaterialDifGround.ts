import fs from "./DifGround.fs";
import vs from "./DifGround.vs";

const mainTexR = Laya.Shader3D.propertyNameToID("u_MainTexR");
const mainTexG = Laya.Shader3D.propertyNameToID("u_MainTexG");
const mainTexB = Laya.Shader3D.propertyNameToID("u_MainTexB");
const mainTexA = Laya.Shader3D.propertyNameToID("u_MainTexA");
const rGBAaisle = Laya.Shader3D.propertyNameToID("u_RGBAaisle");
const lightTex = Laya.Shader3D.propertyNameToID("u_LightTex");
const lightRange = Laya.Shader3D.propertyNameToID("u_LightRange");
const spRange = Laya.Shader3D.propertyNameToID("u_SpRange");
const lightController = Laya.Shader3D.propertyNameToID("u_LightController");
const lightCol = Laya.Shader3D.propertyNameToID("u_LightCol");
const shadowCol = Laya.Shader3D.propertyNameToID("u_ShadowCol");
const castController = Laya.Shader3D.propertyNameToID("u_CastController");
const globalController = Laya.Shader3D.propertyNameToID("u_GlobalController");
const bloomRange = Laya.Shader3D.propertyNameToID("u_BloomRange");
const bloomPow = Laya.Shader3D.propertyNameToID("u_BloomPow");
const saturation = Laya.Shader3D.propertyNameToID("u_Saturation");

export class MaterialDifGround extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("DifGround");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_OPAQUE;
    }

    public set mainTexR(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTexR, v);
    }

    public set mainTexG(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTexG, v);
    }

    public set mainTexB(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTexB, v);
    }

    public set mainTexA(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTexA, v);
    }

    public set rGBAaisle(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(rGBAaisle, v);
    }

    public set lightTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(lightTex, v);
    }

    public set lightRange(v: number) {
        this._shaderValues.setNumber(lightRange, v);
    }

    public set spRange(v: number) {
        this._shaderValues.setNumber(spRange, v);
    }

    public set lightController(v: number) {
        this._shaderValues.setNumber(lightController, v);
    }

    public set lightCol(v: Laya.Vector4) {
        this._shaderValues.setVector(lightCol, v);
    }

    public set shadowCol(v: Laya.Vector4) {
        this._shaderValues.setVector(shadowCol, v);
    }

    public set castController(v: number) {
        this._shaderValues.setNumber(castController, v);
    }

    public set globalController(v: number) {
        this._shaderValues.setNumber(globalController, v);
    }

    public set bloomRange(v: number) {
        this._shaderValues.setNumber(bloomRange, v);
    }

    public set bloomPow(v: number) {
        this._shaderValues.setNumber(bloomPow, v);
    }

    public set saturation(v: number) {
        this._shaderValues.setNumber(saturation, v);
    }
}

export class ShaderDifGround {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
        };
        const uniformMap = {
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,

            u_MainTexR: Laya.Shader3D.PERIOD_MATERIAL,
            u_MainTexG: Laya.Shader3D.PERIOD_MATERIAL,
            u_MainTexB: Laya.Shader3D.PERIOD_MATERIAL,
            u_MainTexA: Laya.Shader3D.PERIOD_MATERIAL,
            u_RGBAaisle: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightTex: Laya.Shader3D.PERIOD_MATERIAL,

            u_LightCol: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowCol: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightController: Laya.Shader3D.PERIOD_MATERIAL,
            u_CastController: Laya.Shader3D.PERIOD_MATERIAL,
            u_GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_Saturation: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpRange: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("DifGround", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
