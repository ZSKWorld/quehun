/* eslint-disable camelcase */
import vs from "./BasicRiver.vs";
import fs from "./BasicRiver.fs";

const reflectiveColor = Laya.Shader3D.propertyNameToID("u_ReflectiveColor");
const bumpMap = Laya.Shader3D.propertyNameToID("u_BumpMap");
const lightMap = Laya.Shader3D.propertyNameToID("u_LightMap");
const waveScale = Laya.Shader3D.propertyNameToID("u_WaveScale");
const waveSpeed = Laya.Shader3D.propertyNameToID("u_WaveSpeed");
const lightDir = Laya.Shader3D.propertyNameToID("u_LightDir");
const specPower = Laya.Shader3D.propertyNameToID("u_SpecPower");
const specSacle = Laya.Shader3D.propertyNameToID("u_SpecSacle");
const waterSpecColor = Laya.Shader3D.propertyNameToID("u_WaterSpecColor");
const waterColor = Laya.Shader3D.propertyNameToID("u_WaterColor");
const waveTex = Laya.Shader3D.propertyNameToID("u_WaveTex");
const fresnel = Laya.Shader3D.propertyNameToID("u_Fresnel");

export class MaterialBasicRiver extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("BasicRiver");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public set reflectiveColor(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(reflectiveColor, v);
    }

    public set bumpMap(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(bumpMap, v);
    }

    public set lightMap(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(lightMap, v);
    }

    public set waveScale(v: Laya.Vector4) {
        this._shaderValues.setVector(waveScale, v);
    }

    public set waveSpeed(v: Laya.Vector4) {
        this._shaderValues.setVector(waveSpeed, v);
    }

    public set lightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(lightDir, v);
    }

    public set specPower(v: number) {
        this._shaderValues.setNumber(specPower, v);
    }

    public set specSacle(v: number) {
        this._shaderValues.setNumber(specSacle, v);
    }

    public set waterSpecColor(v: Laya.Vector4) {
        this._shaderValues.setVector(waterSpecColor, v);
    }

    public set waterColor(v: Laya.Vector4) {
        this._shaderValues.setVector(waterColor, v);
    }

    public set waveTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(waveTex, v);
    }

    public set fresnel(v: Laya.Vector4) {
        this._shaderValues.setVector(fresnel, v);
    }
}

export class ShaderBasicRiver {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
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
            //u_RefTex: Laya.Shader3D.PERIOD_MATERIAL,
            //u_BumpTex: Laya.Shader3D.PERIOD_MATERIAL,
            //u_WaveTex: Laya.Shader3D.PERIOD_MATERIAL,
            //u_Wave2Tex: Laya.Shader3D.PERIOD_MATERIAL,
            //u_NoiseTex: Laya.Shader3D.PERIOD_MATERIAL,
            //u_LightTex: Laya.Shader3D.PERIOD_MATERIAL,
            //u_WaveScale: Laya.Shader3D.PERIOD_MATERIAL,
            //u_WaveSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            //u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            //u_SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            //u_SpecScale: Laya.Shader3D.PERIOD_MATERIAL,
            //u_Global: Laya.Shader3D.PERIOD_MATERIAL,
            //u_NoiseScale: Laya.Shader3D.PERIOD_MATERIAL,
            //u_WaveLen: Laya.Shader3D.PERIOD_MATERIAL,
            //u_Frequency: Laya.Shader3D.PERIOD_MATERIAL,
            //u_Strength: Laya.Shader3D.PERIOD_MATERIAL,
            //u_WaterColor: Laya.Shader3D.PERIOD_MATERIAL,
            //u_WaterSpecColor: Laya.Shader3D.PERIOD_MATERIAL,
            //u_NoiseTexTrans: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_ReflectiveColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_BumpMap: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightMap: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaveScale: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaveSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecSacle: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaterSpecColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaterColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_WaveTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_Fresnel: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("BasicRiver", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
