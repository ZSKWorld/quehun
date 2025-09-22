/* eslint-disable camelcase */
import fs from "./DifShadows.fs";
import vs from "./DifShadows.vs";

const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _ShadowsColor = Laya.Shader3D.propertyNameToID("_ShadowsColor");
const _AlphaScale = Laya.Shader3D.propertyNameToID("_AlphaScale");

export class MaterialDifShadows extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("DifShadows");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _ShadowsColor() {
        return this._shaderValues.getVector(_ShadowsColor);
    }

    public set _ShadowsColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_ShadowsColor, v);
    }

    public get _AlphaScale(): number {
        return this._shaderValues.getNumber(_AlphaScale);
    }

    public set _AlphaScale(v: number) {
        this._shaderValues.setNumber(_AlphaScale, v);
    }

    public clone() {
        const dest = new MaterialDifShadows();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._MainTex = this._MainTex;
        destMaterial._ShadowsColor = this._ShadowsColor;
        destMaterial._AlphaScale = this._AlphaScale;
    }
}

export class ShaderDifShadows {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _ShadowsColor: Laya.Shader3D.PERIOD_MATERIAL,
            _AlphaScale: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("DifShadows");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
