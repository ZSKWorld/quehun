/* eslint-disable camelcase */
import fs from "./FxFlash.fs";
import vs from "./FxFlash.vs";

const mainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const maskTex = Laya.Shader3D.propertyNameToID("_MaskTex");
const alphaController = Laya.Shader3D.propertyNameToID("_AlphaController");
const moveController = Laya.Shader3D.propertyNameToID("_MoveController");
const maskScale = Laya.Shader3D.propertyNameToID("_MaskScale");
const color = Laya.Shader3D.propertyNameToID("_Color");

export class MaterialFxFlash extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("FxFlash");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public set mainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTex, v);
    }

    public get mainTex() {
        return this._shaderValues.getTexture(mainTex);
    }

    public set maskTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(maskTex, v);
    }

    public get maskTex() {
        return this._shaderValues.getTexture(maskTex);
    }

    public set _AlphaController(v: number) {
        this._shaderValues.setNumber(alphaController, v);
    }

    public get _AlphaController() {
        return this._shaderValues.getNumber(alphaController);
    }

    public set moveController(v: number) {
        this._shaderValues.setNumber(moveController, v);
    }

    public get moveController() {
        return this._shaderValues.getNumber(moveController);
    }

    public set maskScale(v: number) {
        this._shaderValues.setNumber(maskScale, v);
    }

    public get maskScale() {
        return this._shaderValues.getNumber(maskScale);
    }

    public set color(v: Laya.Vector4) {
        this._shaderValues.setVector(color, v);
    }

    public get color() {
        return this._shaderValues.getVector(color);
    }

    public clone() {
        const dest = new MaterialFxFlash();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: MaterialFxFlash) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.mainTex = this.mainTex;
        destMaterial.maskTex = this.maskTex;
        destMaterial._AlphaController = this._AlphaController;
        destMaterial.moveController = this.moveController;
        destMaterial.maskScale = this.maskScale;
        destMaterial.color = this.color;
    }
}

export class ShaderFxFlash {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Color: Laya.VertexMesh.MESH_COLOR0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_WorldMat: Laya.VertexMesh.MESH_WORLDMATRIX_ROW0,
        };
        const uniformMap = {
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskTex: Laya.Shader3D.PERIOD_MATERIAL,
            _AlphaController: Laya.Shader3D.PERIOD_MATERIAL,
            _MoveController: Laya.Shader3D.PERIOD_MATERIAL,
            _MaskScale: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            _Color: Laya.Shader3D.PERIOD_MATERIAL,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("FxFlash", true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
