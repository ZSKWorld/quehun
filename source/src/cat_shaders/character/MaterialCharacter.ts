import fs from "./Character.fs";
import vs from "./Character.vs";
import fs1 from "./CharacterShadow.fs";
import vs1 from "./CharacterShadow.vs";

const mainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const lightDir = Laya.Shader3D.propertyNameToID("u_LightDir");
const specTex = Laya.Shader3D.propertyNameToID("u_SpecTex");
const speculaCrolor = Laya.Shader3D.propertyNameToID("u_SpeculaCrolor");
const specPower = Laya.Shader3D.propertyNameToID("u_SpecPower");
const lightColor = Laya.Shader3D.propertyNameToID("u_LightColor");
const refColor = Laya.Shader3D.propertyNameToID("u_RefColor");
const gloss = Laya.Shader3D.propertyNameToID("u_Gloss");
const glossController = Laya.Shader3D.propertyNameToID("u_GlobalController");
const shadowCol = Laya.Shader3D.propertyNameToID("u_ShadowCol");
const shadowA = Laya.Shader3D.propertyNameToID("u_ShadowA");
const shadowPos = Laya.Shader3D.propertyNameToID("u_ShadowPos");
const rimColorController = Laya.Shader3D.propertyNameToID("u_RimColorController");
const rimColorRange = Laya.Shader3D.propertyNameToID("u_RimColorRange");
const rimColor = Laya.Shader3D.propertyNameToID("u_RimColor");
const bloomRange = Laya.Shader3D.propertyNameToID("u_BloomRange");
const bloomPow = Laya.Shader3D.propertyNameToID("u_BloomPow");
const angle = Laya.Shader3D.propertyNameToID("u_Angle");

export class MaterialCharacter extends Laya.UnlitMaterial {
    constructor() {
        super();
        this.setShaderName("Character");
        this.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        this.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
    }

    public get mainTex() {
        return this._shaderValues.getTexture(mainTex);
    }

    public set mainTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(mainTex, v);
    }

    public get lightDir(): Laya.Vector4 {
        return this._shaderValues.getVector(lightDir);
    }

    public set lightDir(v: Laya.Vector4) {
        this._shaderValues.setVector(lightDir, v);
    }

    public get specTex(): Laya.BaseTexture {
        return this._shaderValues.getTexture(specTex);
    }

    public set specTex(v: Laya.BaseTexture) {
        this._shaderValues.setTexture(specTex, v);
    }

    public get speculaCrolor(): Laya.Vector4 {
        return this._shaderValues.getVector(speculaCrolor);
    }

    public set speculaCrolor(v: Laya.Vector4) {
        this._shaderValues.setVector(speculaCrolor, v);
    }

    public get specPower(): number {
        return this._shaderValues.getNumber(specPower);
    }

    public set specPower(v: number) {
        this._shaderValues.setNumber(specPower, v);
    }

    public get lightColor(): Laya.Vector4 {
        return this._shaderValues.getVector(lightColor);
    }

    public set lightColor(v: Laya.Vector4) {
        this._shaderValues.setVector(lightColor, v);
    }

    public get refColor(): Laya.Vector4 {
        return this._shaderValues.getVector(refColor);
    }

    public set refColor(v: Laya.Vector4) {
        this._shaderValues.setVector(refColor, v);
    }

    public get gloss(): number {
        return this._shaderValues.getNumber(gloss);
    }

    public set gloss(v: number) {
        this._shaderValues.setNumber(gloss, v);
    }

    public get glossController(): number {
        return this._shaderValues.getNumber(glossController);
    }

    public set glossController(v: number) {
        this._shaderValues.setNumber(glossController, v);
    }

    public get shadowCol(): Laya.Vector4 {
        return this._shaderValues.getVector(shadowCol);
    }

    public set shadowCol(v: Laya.Vector4) {
        this._shaderValues.setVector(shadowCol, v);
    }

    public get shadowA(): Laya.Vector4 {
        return this._shaderValues.getVector(shadowA);
    }

    public set shadowA(v: Laya.Vector4) {
        this._shaderValues.setVector(shadowA, v);
    }

    public get shadowPos(): number {
        return this._shaderValues.getNumber(shadowPos);
    }

    public set shadowPos(v: number) {
        this._shaderValues.setNumber(shadowPos, v);
    }

    public get rimColorController(): number {
        return this._shaderValues.getNumber(rimColorController);
    }

    public set rimColorController(v: number) {
        this._shaderValues.setNumber(rimColorController, v);
    }

    public get rimColorRange(): number {
        return this._shaderValues.getNumber(rimColorRange);
    }

    public set rimColorRange(v: number) {
        this._shaderValues.setNumber(rimColorRange, v);
    }

    public get rimColor(): Laya.Vector4 {
        return this._shaderValues.getVector(rimColor);
    }

    public set rimColor(v: Laya.Vector4) {
        this._shaderValues.setVector(rimColor, v);
    }

    public get bloomRange(): number {
        return this._shaderValues.getNumber(bloomRange);
    }

    public set bloomRange(v: number) {
        this._shaderValues.setNumber(bloomRange, v);
    }

    public get bloomPow(): number {
        return this._shaderValues.getNumber(bloomPow);
    }

    public set bloomPow(v: number) {
        this._shaderValues.setNumber(bloomPow, v);
    }

    public get angle(): number {
        return this._shaderValues.getNumber(angle);
    }

    public set angle(v: number) {
        this._shaderValues.setNumber(angle, v);
    }

    public clone() {
        const dest = new MaterialCharacter();
        this.cloneTo(dest);
        return dest;
    }

    public cloneTo(destObject: MaterialCharacter) {
        super.cloneTo(destObject);
        const destMaterial = destObject;
        destMaterial.mainTex = this.mainTex;
        destMaterial.lightDir = this.lightDir;
        destMaterial.specTex = this.specTex;
        destMaterial.speculaCrolor = this.speculaCrolor;
        destMaterial.specPower = this.specPower;
        destMaterial.lightColor = this.lightColor;
        destMaterial.refColor = this.refColor;
        destMaterial.gloss = this.gloss;
        destMaterial.glossController = this.glossController;
        destMaterial.shadowCol = this.shadowCol;
        destMaterial.shadowA = this.shadowA;
        destMaterial.shadowPos = this.shadowPos;
        destMaterial.rimColorController = this.rimColorController;
        destMaterial.rimColorRange = this.rimColorRange;
        destMaterial.rimColor = this.rimColor;
        destMaterial.bloomRange = this.bloomRange;
        destMaterial.bloomPow = this.bloomPow;
        destMaterial.angle = this.angle;
    }
}

export class ShaderCharacter {
    public initShader(): void {
        const attributeMap = {
            a_Position: Laya.VertexMesh.MESH_POSITION0,
            a_Texcoord0: Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            a_Texcoord1: Laya.VertexMesh.MESH_TEXTURECOORDINATE1,
            a_Normal: Laya.VertexMesh.MESH_NORMAL0,
            a_BoneWeights: Laya.VertexMesh.MESH_BLENDWEIGHT0,
            a_BoneIndices: Laya.VertexMesh.MESH_BLENDINDICES0,
            a_MvpMatrix: Laya.VertexMesh.MESH_MVPMATRIX_ROW0,
        };
        const uniformMap = {
            u_Bones: Laya.Shader3D.PERIOD_CUSTOM,
            u_TilingOffset: Laya.Shader3D.PERIOD_MATERIAL,
            u_AlphaTestValue: Laya.Shader3D.PERIOD_MATERIAL,
            u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE,
            u_WorldMat: Laya.Shader3D.PERIOD_SPRITE,
            u_MainTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightDir: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecTex: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpeculaCrolor: Laya.Shader3D.PERIOD_MATERIAL,
            u_SpecPower: Laya.Shader3D.PERIOD_MATERIAL,
            u_LightColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_RefColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_Gloss: Laya.Shader3D.PERIOD_MATERIAL,
            u_GlobalController: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowCol: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowA: Laya.Shader3D.PERIOD_MATERIAL,
            u_ShadowPos: Laya.Shader3D.PERIOD_MATERIAL,
            u_RimColorController: Laya.Shader3D.PERIOD_MATERIAL,
            u_RimColorRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_RimColor: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomRange: Laya.Shader3D.PERIOD_MATERIAL,
            u_BloomPow: Laya.Shader3D.PERIOD_MATERIAL,
            u_Angle: Laya.Shader3D.PERIOD_MATERIAL,
            u_Time: Laya.Shader3D.PERIOD_SCENE,
            u_CameraPos: Laya.Shader3D.PERIOD_CAMERA,
            u_View: Laya.Shader3D.PERIOD_CAMERA,
        };
        const stateMap = {
            s_Cull: Laya.Shader3D.RENDER_STATE_CULL,
            s_Blend: Laya.Shader3D.RENDER_STATE_BLEND,
            s_BlendSrc: Laya.Shader3D.RENDER_STATE_BLEND_SRC,
            s_BlendDst: Laya.Shader3D.RENDER_STATE_BLEND_DST,
            s_DepthTest: Laya.Shader3D.RENDER_STATE_DEPTH_TEST,
            s_DepthWrite: Laya.Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        const shader = Laya.Shader3D.add("Character", null, null, true);
        const subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(vs, fs, stateMap);
        const shadowPass = subShader.addShaderPass(vs1, fs1);
        shadowPass.renderState.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        shadowPass.renderState.srcBlend = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        shadowPass.renderState.dstBlend = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        shadowPass.renderState.depthWrite = false;
        (shadowPass.renderState as any).stencilTest = true;
    }
}
