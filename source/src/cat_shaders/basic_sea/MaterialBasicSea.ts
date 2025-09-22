/* eslint-disable camelcase */
import fs from "./BasicSea.fs";
import vs from "./BasicSea.vs";

const _WaveSpeed = Laya.Shader3D.propertyNameToID("_WaveSpeed");
const _WaveScale = Laya.Shader3D.propertyNameToID("_WaveScale");
const _BumpMap = Laya.Shader3D.propertyNameToID("_BumpMap");
const _ReflectiveColor = Laya.Shader3D.propertyNameToID("_ReflectiveColor");
const _LightDir = Laya.Shader3D.propertyNameToID("_LightDir");
const _SpecPower = Laya.Shader3D.propertyNameToID("_SpecPower");
const _WaterSpecColor = Laya.Shader3D.propertyNameToID("_WaterSpecColor");
const _WaterColor = Laya.Shader3D.propertyNameToID("_WaterColor");
const _SpecSacle = Laya.Shader3D.propertyNameToID("_SpecSacle");
const _fresnel = Laya.Shader3D.propertyNameToID("_fresnel");
const _MwController = Laya.Shader3D.propertyNameToID("_MwController");

export class MaterialBasicSea extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("BasicSea");
        this.renderMode = Laya.UnlitMaterial.RENDERMODE_TRANSPARENT;
    }

    public get _WaveSpeed() {
        return this._shaderValues.getVector(_WaveSpeed);
    }

    public set _WaveSpeed(v: Laya.Vector4) {
        this._shaderValues.setVector(_WaveSpeed, v);
    }

    public get _WaveScale() {
        return this._shaderValues.getVector(_WaveScale);
    }

    public set _WaveScale(v: Laya.Vector4) {
        this._shaderValues.setVector(_WaveScale, v);
    }

    public get _BumpMap() {
        return this._shaderValues.getTexture(_BumpMap);
    }

    public set _BumpMap(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_BumpMap, v);
    }

    public get _ReflectiveColor() {
        return this._shaderValues.getTexture(_ReflectiveColor);
    }

    public set _ReflectiveColor(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_ReflectiveColor, v);
    }

    public get _LightDir() {
        return this._shaderValues.getVector(_LightDir);
    }

    public set _LightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightDir, v);
    }

    public get _SpecPower(): number {
        return this._shaderValues.getNumber(_SpecPower);
    }

    public set _SpecPower(v: number) {
        this._shaderValues.setNumber(_SpecPower, v);
    }

    public get _WaterSpecColor() {
        return this._shaderValues.getVector(_WaterSpecColor);
    }

    public set _WaterSpecColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_WaterSpecColor, v);
    }

    public get _WaterColor() {
        return this._shaderValues.getVector(_WaterColor);
    }

    public set _WaterColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_WaterColor, v);
    }

    public get _SpecSacle(): number {
        return this._shaderValues.getNumber(_SpecSacle);
    }

    public set _SpecSacle(v: number) {
        this._shaderValues.setNumber(_SpecSacle, v);
    }

    public get _fresnel() {
        return this._shaderValues.getVector(_fresnel);
    }

    public set _fresnel(v: Laya.Vector4) {
        this._shaderValues.setVector(_fresnel, v);
    }

    public get _MwController(): number {
        return this._shaderValues.getNumber(_MwController);
    }

    public set _MwController(v: number) {
        this._shaderValues.setNumber(_MwController, v);
    }

    public clone() {
        const dest = new MaterialBasicSea();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: any) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial._WaveSpeed = this._WaveSpeed;
        destMaterial._WaveScale = this._WaveScale;
        destMaterial._BumpMap = this._BumpMap;
        destMaterial._ReflectiveColor = this._ReflectiveColor;
        destMaterial._LightDir = this._LightDir;
        destMaterial._SpecPower = this._SpecPower;
        destMaterial._WaterSpecColor = this._WaterSpecColor;
        destMaterial._WaterColor = this._WaterColor;
        destMaterial._SpecSacle = this._SpecSacle;
        destMaterial._fresnel = this._fresnel;
        destMaterial._MwController = this._MwController;
    }
}

export class ShaderBasicSea {
    public static initShader(): void {
        const attributeMap = {
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

        };
        const uniformMap = {
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_ViewProjection: Laya.Shader3D.PERIOD_CAMERA,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            _WaveSpeed: Laya.Shader3D.PERIOD_MATERIAL,
            _WaveScale: Laya.Shader3D.PERIOD_MATERIAL,
            _BumpMap: Laya.Shader3D.PERIOD_MATERIAL,
            _ReflectiveColor: Laya.Shader3D.PERIOD_MATERIAL,
            _LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            _SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            _WaterSpecColor: Laya.Shader3D.PERIOD_MATERIAL,
            _WaterColor: Laya.Shader3D.PERIOD_MATERIAL,
            _SpecSacle: Laya.Shader3D.PERIOD_MATERIAL,
            _fresnel: Laya.Shader3D.PERIOD_MATERIAL,
            _MwController: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("BasicSea");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
    }
}
