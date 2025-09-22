import vs from "./Sky.vs";
import fs from "./Sky.fs";

const mainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const cloudTex = Laya.Shader3D.propertyNameToID("u_CloudTex");
const cloudSpeed = Laya.Shader3D.propertyNameToID("u_CloudSpeed");
const cloudPower = Laya.Shader3D.propertyNameToID("u_CloudPower");

export class MaterialSky extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Sky");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
        this.blend = Laya.RenderState.BLEND_ENABLE_SEPERATE;
        this.blendSrc = Laya.RenderState.BLENDPARAM_ONE_MINUS_DST_COLOR;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
    }

    set mainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTex, v);
    }

    set cloudTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(cloudTex, v);
    }

    set cloudSpeed(v: number) {
        this._shaderValues.setNumber(cloudSpeed, v);
    }

    set cloudPower(v: number) {
        this._shaderValues.setNumber(cloudPower, v);
    }
}

export class ShaderSky {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_AlbedoTexture: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlbedoColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_CloudTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_CloudSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            u_CloudPower: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Sky", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
