/* eslint-disable camelcase */
import fs from "./DifReflection.fs";
import vs from "./DifReflection.vs";
import fs1 from "./DifReflection1.fs";
import vs1 from "./DifReflection1.vs";

const p = Laya.Shader3D.propertyNameToID("p");
const _MainTex = Laya.Shader3D.propertyNameToID("_MainTex");
const _LightTex = Laya.Shader3D.propertyNameToID("_LightTex");
const _LightController = Laya.Shader3D.propertyNameToID("_LightController");
const _CastController = Laya.Shader3D.propertyNameToID("_CastController");
const _GlobalController = Laya.Shader3D.propertyNameToID("_GlobalController");
const _LightCol = Laya.Shader3D.propertyNameToID("_LightCol");
const _ShadowCol = Laya.Shader3D.propertyNameToID("_ShadowCol");
const _BloomRange = Laya.Shader3D.propertyNameToID("_BloomRange");
const _BloomPow = Laya.Shader3D.propertyNameToID("_BloomPow");
const _LightRange = Laya.Shader3D.propertyNameToID("_LightRange");
const _Saturation = Laya.Shader3D.propertyNameToID("_Saturation");
const _SpRange = Laya.Shader3D.propertyNameToID("_SpRange");
const _Alpha = Laya.Shader3D.propertyNameToID("_Alpha");
const n = Laya.Shader3D.propertyNameToID("n");
const _Pose = Laya.Shader3D.propertyNameToID("_Pose");
const _Range = Laya.Shader3D.propertyNameToID("_Range");
const _ReflectionAlpha = Laya.Shader3D.propertyNameToID("_ReflectionAlpha");
const _ReflectionColor = Laya.Shader3D.propertyNameToID("_ReflectionColor");

export class MaterialDifReflection extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("DifReflection");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
        this.depthWrite = true;
    }

    public get p() {
        return this._shaderValues.getVector3(p);
    }

    public set p(v: Laya.Vector3) {
        this._shaderValues.setVector3(p, v);
    }

    public get _MainTex() {
        return this._shaderValues.getTexture(_MainTex);
    }

    public set _MainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_MainTex, v);
    }

    public get _LightTex() {
        return this._shaderValues.getTexture(_LightTex);
    }

    public set _LightTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_LightTex, v);
    }

    public get _LightController(): number {
        return this._shaderValues.getNumber(_LightController);
    }

    public set _LightController(v: number) {
        this._shaderValues.setNumber(_LightController, v);
    }

    public get _CastController(): number {
        return this._shaderValues.getNumber(_CastController);
    }

    public set _CastController(v: number) {
        this._shaderValues.setNumber(_CastController, v);
    }

    public get _GlobalController(): number {
        return this._shaderValues.getNumber(_GlobalController);
    }

    public set _GlobalController(v: number) {
        this._shaderValues.setNumber(_GlobalController, v);
    }

    public get _LightCol() {
        return this._shaderValues.getVector(_LightCol);
    }

    public set _LightCol(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightCol, v);
    }

    public get _ShadowCol() {
        return this._shaderValues.getVector(_ShadowCol);
    }

    public set _ShadowCol(v: Laya.Vector4) {
        this._shaderValues.setVector(_ShadowCol, v);
    }

    public get _BloomRange(): number {
        return this._shaderValues.getNumber(_BloomRange);
    }

    public set _BloomRange(v: number) {
        this._shaderValues.setNumber(_BloomRange, v);
    }

    public get _BloomPow(): number {
        return this._shaderValues.getNumber(_BloomPow);
    }

    public set _BloomPow(v: number) {
        this._shaderValues.setNumber(_BloomPow, v);
    }

    public get _LightRange(): number {
        return this._shaderValues.getNumber(_LightRange);
    }

    public set _LightRange(v: number) {
        this._shaderValues.setNumber(_LightRange, v);
    }

    public get _Saturation(): number {
        return this._shaderValues.getNumber(_Saturation);
    }

    public set _Saturation(v: number) {
        this._shaderValues.setNumber(_Saturation, v);
    }

    public get _SpRange(): number {
        return this._shaderValues.getNumber(_SpRange);
    }

    public set _SpRange(v: number) {
        this._shaderValues.setNumber(_SpRange, v);
    }

    public get _Alpha(): number {
        return this._shaderValues.getNumber(_Alpha);
    }

    public set _Alpha(v: number) {
        this._shaderValues.setNumber(_Alpha, v);
    }

    public get n() {
        return this._shaderValues.getVector3(n);
    }

    public set n(v: Laya.Vector3) {
        this._shaderValues.setVector3(n, v);
    }

    public get _Pose(): number {
        return this._shaderValues.getNumber(_Pose);
    }

    public set _Pose(v: number) {
        this._shaderValues.setNumber(_Pose, v);
    }

    public get _Range(): number {
        return this._shaderValues.getNumber(_Range);
    }

    public set _Range(v: number) {
        this._shaderValues.setNumber(_Range, v);
    }

    public get _ReflectionAlpha(): number {
        return this._shaderValues.getNumber(_ReflectionAlpha);
    }

    public set _ReflectionAlpha(v: number) {
        this._shaderValues.setNumber(_ReflectionAlpha, v);
    }

    public get _ReflectionColor() {
        return this._shaderValues.getVector(_ReflectionColor);
    }

    public set _ReflectionColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_ReflectionColor, v);
    }

    public clone() {
        const dest = new MaterialDifReflection();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.p = this.p;
        destMaterial._MainTex = this._MainTex;
        destMaterial._LightTex = this._LightTex;
        destMaterial._LightController = this._LightController;
        destMaterial._CastController = this._CastController;
        destMaterial._GlobalController = this._GlobalController;
        destMaterial._LightCol = this._LightCol;
        destMaterial._ShadowCol = this._ShadowCol;
        destMaterial._BloomRange = this._BloomRange;
        destMaterial._BloomPow = this._BloomPow;
        destMaterial._LightRange = this._LightRange;
        destMaterial._Saturation = this._Saturation;
        destMaterial._SpRange = this._SpRange;
        destMaterial._Alpha = this._Alpha;
        destMaterial.n = this.n;
        destMaterial._Pose = this._Pose;
        destMaterial._Range = this._Range;
        destMaterial._ReflectionAlpha = this._ReflectionAlpha;
        destMaterial._ReflectionColor = this._ReflectionColor;
    }
}

export class ShaderDifReflection {
    public static initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            p: Laya.Shader3D.PERIOD_MATERIAL,
            _MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightTex: Laya.Shader3D.PERIOD_MATERIAL,
            _LightController: Laya.Shader3D.PERIOD_MATERIAL,
            _CastController: Laya.Shader3D.PERIOD_MATERIAL,
            _GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            _LightCol: Laya.Shader3D.PERIOD_MATERIAL,
            _ShadowCol: Laya.Shader3D.PERIOD_MATERIAL,
            _BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            _BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            _LightRange: Laya.Shader3D.PERIOD_MATERIAL,
            _Saturation: Laya.Shader3D.PERIOD_MATERIAL,
            _SpRange: Laya.Shader3D.PERIOD_MATERIAL,
            _Alpha: Laya.Shader3D.PERIOD_MATERIAL,
            n: Laya.Shader3D.PERIOD_MATERIAL,
            _Pose: Laya.Shader3D.PERIOD_MATERIAL,
            _Range: Laya.Shader3D.PERIOD_MATERIAL,
            _ReflectionAlpha: Laya.Shader3D.PERIOD_MATERIAL,
            _ReflectionColor: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("DifReflection");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
        const pass2 = subShader.addShaderPass(vs1, fs1);
        const { renderState } = pass2;
        renderState.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        renderState.srcBlend = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        renderState.dstBlend = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        renderState.cull = Laya.RenderState.CULL_FRONT;
        renderState.depthWrite = false;
        renderState.depthTest = Laya.RenderState.DEPTHTEST_LESS;
    }
}
