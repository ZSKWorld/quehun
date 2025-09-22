/* eslint-disable camelcase */
import fs from "./EarthSea.fs";
import vs from "./EarthSea.vs";
import fs1 from "./EarthSea1.fs";
import vs1 from "./EarthSea1.vs";

const _WaveSpeed = Laya.Shader3D.propertyNameToID("_WaveSpeed");
const _WaveScale = Laya.Shader3D.propertyNameToID("_WaveScale");
const _BumpMap = Laya.Shader3D.propertyNameToID("_BumpMap");
const _ReflectiveColor = Laya.Shader3D.propertyNameToID("_ReflectiveColor");
const _LightMap = Laya.Shader3D.propertyNameToID("_LightMap");
const _LightDir = Laya.Shader3D.propertyNameToID("_LightDir");
const _SpecPower = Laya.Shader3D.propertyNameToID("_SpecPower");
const _WaterSpecColor = Laya.Shader3D.propertyNameToID("_WaterSpecColor");
const _WaterColor = Laya.Shader3D.propertyNameToID("_WaterColor");
const _SpecSacle = Laya.Shader3D.propertyNameToID("_SpecSacle");
const _fresnel = Laya.Shader3D.propertyNameToID("_fresnel");
const _LightDir2 = Laya.Shader3D.propertyNameToID("_LightDir2");
const _EdgeAhpla = Laya.Shader3D.propertyNameToID("_EdgeAhpla");
const _GlowSize = Laya.Shader3D.propertyNameToID("_GlowSize");
const _GlowColor = Laya.Shader3D.propertyNameToID("_GlowColor");
const _GlowPow = Laya.Shader3D.propertyNameToID("_GlowPow");

export class MaterialEarthSea extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("EarthSea");
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

    public get _LightMap() {
        return this._shaderValues.getTexture(_LightMap);
    }

    public set _LightMap(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(_LightMap, v);
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

    public get _LightDir2() {
        return this._shaderValues.getVector(_LightDir2);
    }

    public set _LightDir2(v: Laya.Vector4) {
        this._shaderValues.setVector(_LightDir2, v);
    }

    public get _EdgeAhpla(): number {
        return this._shaderValues.getNumber(_EdgeAhpla);
    }

    public set _EdgeAhpla(v: number) {
        this._shaderValues.setNumber(_EdgeAhpla, v);
    }

    public get _GlowSize(): number {
        return this._shaderValues.getNumber(_GlowSize);
    }

    public set _GlowSize(v: number) {
        this._shaderValues.setNumber(_GlowSize, v);
    }

    public get _GlowColor() {
        return this._shaderValues.getVector(_GlowColor);
    }

    public set _GlowColor(v: Laya.Vector4) {
        this._shaderValues.setVector(_GlowColor, v);
    }

    public get _GlowPow(): number {
        return this._shaderValues.getNumber(_GlowPow);
    }

    public set _GlowPow(v: number) {
        this._shaderValues.setNumber(_GlowPow, v);
    }

    public clone() {
        const dest = new MaterialEarthSea();
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
        destMaterial._LightMap = this._LightMap;
        destMaterial._LightDir = this._LightDir;
        destMaterial._SpecPower = this._SpecPower;
        destMaterial._WaterSpecColor = this._WaterSpecColor;
        destMaterial._WaterColor = this._WaterColor;
        destMaterial._SpecSacle = this._SpecSacle;
        destMaterial._fresnel = this._fresnel;
        destMaterial._LightDir2 = this._LightDir2;
        destMaterial._EdgeAhpla = this._EdgeAhpla;
        destMaterial._GlowSize = this._GlowSize;
        destMaterial._GlowColor = this._GlowColor;
        destMaterial._GlowPow = this._GlowPow;
    }
}

export class ShaderEarthSea {
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
            _LightMap: Laya.Shader3D.PERIOD_MATERIAL,
            _LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            _SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            _WaterSpecColor: Laya.Shader3D.PERIOD_MATERIAL,
            _WaterColor: Laya.Shader3D.PERIOD_MATERIAL,
            _SpecSacle: Laya.Shader3D.PERIOD_MATERIAL,
            _fresnel: Laya.Shader3D.PERIOD_MATERIAL,
            _LightDir2: Laya.Shader3D.PERIOD_MATERIAL,
            _EdgeAhpla: Laya.Shader3D.PERIOD_MATERIAL,
            _GlowSize: Laya.Shader3D.PERIOD_MATERIAL,
            _GlowColor: Laya.Shader3D.PERIOD_MATERIAL,
            _GlowPow: Laya.Shader3D.PERIOD_MATERIAL,

        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("EarthSea");
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
        const { renderState } = subShader.addShaderPass(vs1, fs1);
        renderState.cull = Laya.RenderState.CULL_FRONT;
        renderState.depthWrite = false;
        renderState.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        renderState.srcBlend = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        renderState.dstBlend = Laya.RenderState.BLENDPARAM_ONE;
    }
}
