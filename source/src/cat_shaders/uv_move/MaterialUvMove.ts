/* eslint-disable camelcase */
import fs from "./UvMove.fs";
import vs from "./UvMove.vs";

const MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const HorAmount = Laya.Shader3D.propertyNameToID("u_HorAmount");
const VerAmount = Laya.Shader3D.propertyNameToID("u_VerAmount");
const Speed = Laya.Shader3D.propertyNameToID("u_Speed");
const Alpha = Laya.Shader3D.propertyNameToID("u_Alpha");

export class MaterialUvMove extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("UvMove");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get MainTex() {
        return this._shaderValues.getTexture(MainTex);
    }

    public set MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(MainTex, v);
    }

    public get HorAmount() {
        return this._shaderValues.getNumber(HorAmount);
    }

    public set HorAmount(v: number) {
        this._shaderValues.setNumber(HorAmount, v);
    }

    public get VerAmount() {
        return this._shaderValues.getNumber(VerAmount);
    }

    public set VerAmount(v: number) {
        this._shaderValues.setNumber(VerAmount, v);
    }

    public get _Speed() {
        return this._shaderValues.getNumber(Speed);
    }

    public set _Speed(v: number) {
        this._shaderValues.setNumber(Speed, v);
    }//10 -30 -20 78

    public get _Alpha() {
        return this._shaderValues.getNumber(Alpha);
    }

    public set _Alpha(v: number) {
        this._shaderValues.setNumber(Alpha, v);
    }

    public clone() {
        const dest = new MaterialUvMove();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.HorAmount = this.HorAmount;
        destMaterial.VerAmount = this.VerAmount;
        destMaterial.Speed = this._Speed;
        destMaterial.Alpha = this._Alpha;
        destMaterial.renderQueue = this.renderQueue;
        destMaterial.depthWrite = this.depthWrite;
        destMaterial.depthTest = this.depthTest;
        destMaterial.blend = this.blend;
        destMaterial.blendSrc = this.blendSrc;
        destMaterial.blendDst = this.blendDst;
    }
}

export class ShaderUvMove {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        };
        const uniformMap = {
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_HorAmount: Laya.Shader3D.PERIOD_MATERIAL,
            u_VerAmount: Laya.Shader3D.PERIOD_MATERIAL,
            u_Speed: Laya.Shader3D.PERIOD_MATERIAL,
            u_Alpha: Laya.Shader3D.PERIOD_MATERIAL,
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

        const shader = Laya.Shader3D.add("UvMove", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
