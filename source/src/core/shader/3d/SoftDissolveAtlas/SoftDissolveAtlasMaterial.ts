import fs from "./SoftDissolveAtlas.fs";
import vs from "./SoftDissolveAtlas.vs";

//#region 宏定义 & 属性ID
const ShaderName = "SoftDissolveAtlas";

const DEF_MainTex = Laya.Shader3D.getDefineByName("DEF_MainTex");
const DEF_DissolveTex = Laya.Shader3D.getDefineByName("DEF_DissolveTex");
const DEF_DistortionTex = Laya.Shader3D.getDefineByName("DEF_DistortionTex");
const DEF_AMBlightTex = Laya.Shader3D.getDefineByName("DEF_AMBlightTex");
const DEF_MaskTex = Laya.Shader3D.getDefineByName("DEF_MaskTex");

const u_Alpha = Laya.Shader3D.propertyNameToID("u_Alpha");
const u_MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
const u_MainTex_ST = Laya.Shader3D.propertyNameToID("u_MainTex_ST");
const u_MainAnim = Laya.Shader3D.propertyNameToID("u_MainAnim");
const u_MainColor = Laya.Shader3D.propertyNameToID("u_MainColor");
const u_MainColorMulti = Laya.Shader3D.propertyNameToID("u_MainColorMulti");
const u_DissolveTex = Laya.Shader3D.propertyNameToID("u_DissolveTex");
const u_DissolveTex_ST = Laya.Shader3D.propertyNameToID("u_DissolveTex_ST");
const u_DissolveAnim = Laya.Shader3D.propertyNameToID("u_DissolveAnim");
const u_DissMode = Laya.Shader3D.propertyNameToID("u_DissMode");
const u_Dissolve = Laya.Shader3D.propertyNameToID("u_Dissolve");
const u_EdgeColor = Laya.Shader3D.propertyNameToID("u_EdgeColor");
const u_EdgeColorMulti = Laya.Shader3D.propertyNameToID("u_EdgeColorMulti");
const u_EdgeWidth = Laya.Shader3D.propertyNameToID("u_EdgeWidth");
const u_OutsideEdge = Laya.Shader3D.propertyNameToID("u_OutsideEdge");
const u_InsideEdge = Laya.Shader3D.propertyNameToID("u_InsideEdge");
const u_DistortionTex = Laya.Shader3D.propertyNameToID("u_DistortionTex");
const u_DistortionTex_ST = Laya.Shader3D.propertyNameToID("u_DistortionTex_ST");
const u_DistortionAnim = Laya.Shader3D.propertyNameToID("u_DistortionAnim");
const u_MainTexDistortion = Laya.Shader3D.propertyNameToID("u_MainTexDistortion");
const u_EdgeDistortion = Laya.Shader3D.propertyNameToID("u_EdgeDistortion");
const u_AMBlightTexDistortion = Laya.Shader3D.propertyNameToID("u_AMBlightTexDistortion");
const u_MaskTexDistortion = Laya.Shader3D.propertyNameToID("u_MaskTexDistortion");
const u_AMBlightTex = Laya.Shader3D.propertyNameToID("u_AMBlightTex");
const u_AMBlightTex_ST = Laya.Shader3D.propertyNameToID("u_AMBlightTex_ST");
const u_AMBlightAnim = Laya.Shader3D.propertyNameToID("u_AMBlightAnim");
const u_AMBlightLerp = Laya.Shader3D.propertyNameToID("u_AMBlightLerp");
const u_MaskTex = Laya.Shader3D.propertyNameToID("u_MaskTex");
const u_MaskTex_ST = Laya.Shader3D.propertyNameToID("u_MaskTex_ST");
const u_MaskAnim = Laya.Shader3D.propertyNameToID("u_MaskAnim");
//#endregion

(function init() {
	const uniformMap = {
		u_Alpha: Laya.ShaderDataType.Float,
		u_MainTex: Laya.ShaderDataType.Texture2D,
		u_MainTex_ST: Laya.ShaderDataType.Vector4,
		u_MainAnim: Laya.ShaderDataType.Vector4,
		u_MainColor: Laya.ShaderDataType.Color,
		u_MainColorMulti: Laya.ShaderDataType.Float,
		u_DissolveTex: Laya.ShaderDataType.Texture2D,
		u_DissolveTex_ST: Laya.ShaderDataType.Vector4,
		u_DissolveAnim: Laya.ShaderDataType.Vector4,
		u_DissMode: Laya.ShaderDataType.Float,
		u_Dissolve: Laya.ShaderDataType.Float,
		u_EdgeColor: Laya.ShaderDataType.Color,
		u_EdgeColorMulti: Laya.ShaderDataType.Float,
		u_EdgeWidth: Laya.ShaderDataType.Float,
		u_OutsideEdge: Laya.ShaderDataType.Float,
		u_InsideEdge: Laya.ShaderDataType.Float,
		u_DistortionTex: Laya.ShaderDataType.Texture2D,
		u_DistortionTex_ST: Laya.ShaderDataType.Vector4,
		u_DistortionAnim: Laya.ShaderDataType.Vector4,
		u_MainTexDistortion: Laya.ShaderDataType.Float,
		u_EdgeDistortion: Laya.ShaderDataType.Float,
		u_AMBlightTexDistortion: Laya.ShaderDataType.Float,
		u_MaskTexDistortion: Laya.ShaderDataType.Float,
		u_AMBlightTex: Laya.ShaderDataType.Texture2D,
		u_AMBlightTex_ST: Laya.ShaderDataType.Vector4,
		u_AMBlightAnim: Laya.ShaderDataType.Vector4,
		u_AMBlightLerp: Laya.ShaderDataType.Float,
		u_MaskTex: Laya.ShaderDataType.Texture2D,
		u_MaskTex_ST: Laya.ShaderDataType.Vector4,
		u_MaskAnim: Laya.ShaderDataType.Vector4,
	};
	const defaultValue = {
		u_Alpha: 1,
		u_MainTex_ST: new Laya.Vector4(1, 1, 0, 0),
		u_MainAnim: new Laya.Vector4(),
		u_MainColor: new Laya.Color(),
		u_MainColorMulti: 1,
		u_DissolveTex_ST: new Laya.Vector4(1, 1, 0, 0),
		u_DissolveAnim: new Laya.Vector4(),
		u_DissMode: 0,
		u_Dissolve: 0,
		u_EdgeColor: new Laya.Color(),
		u_EdgeColorMulti: 1,
		u_EdgeWidth: 0,
		u_OutsideEdge: 0,
		u_InsideEdge: 0,
		u_DistortionTex_ST: new Laya.Vector4(1, 1, 0, 0),
		u_DistortionAnim: new Laya.Vector4(),
		u_MainTexDistortion: 0,
		u_EdgeDistortion: 0,
		u_AMBlightTexDistortion: 0,
		u_MaskTexDistortion: 0,
		u_AMBlightTex_ST: new Laya.Vector4(1, 1, 0, 0),
		u_AMBlightAnim: new Laya.Vector4(),
		u_AMBlightLerp: 0,
		u_MaskTex_ST: new Laya.Vector4(1, 1, 0, 0),
		u_MaskAnim: new Laya.Vector4(),
	};
	const shader = Laya.Shader3D.add(ShaderName);
	shader.shaderType = Laya.ShaderFeatureType.D3;
	const subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);
	shader.addSubShader(subShader);
	subShader.addShaderPass(vs, fs);
})();

export class SoftDissolveAtlasMaterial extends Laya.Material {

	constructor() {
		super();
		this.setShaderName(ShaderName);
		this.materialRenderMode = Laya.MaterialRenderMode.RENDERMODE_TRANSPARENT;
	}

	//#region 字段
	get alpha() { return this.getFloatByIndex(u_Alpha); }
	set alpha(value) { this.setFloatByIndex(u_Alpha, value); }
	get mainTex() { return this.getTextureByIndex(u_MainTex); }
	set mainTex(value) {
		this.setDefine(DEF_MainTex, !!value);
		this.setTextureByIndex(u_MainTex, value);
	}
	get mainTex_ST() { return this.getVector4ByIndex(u_MainTex_ST); }
	set mainTex_ST(value) { this.setVector4ByIndex(u_MainTex_ST, value); }
	get mainAnim() { return this.getFloatByIndex(u_MainAnim); }
	set mainAnim(value) { this.setFloatByIndex(u_MainAnim, value); }
	get mainColor() { return this.getColorByIndex(u_MainColor); }
	set mainColor(value) { this.setColorByIndex(u_MainColor, value); }
	get mainColorMulti() { return this.getFloatByIndex(u_MainColorMulti); }
	set mainColorMulti(value) { this.setFloatByIndex(u_MainColorMulti, value); }
	get dissolveTex() { return this.getTextureByIndex(u_DissolveTex); }
	set dissolveTex(value) {
		this.setDefine(DEF_DissolveTex, !!value);
		this.setTextureByIndex(u_DissolveTex, value);
	}
	get dissolveTex_ST() { return this.getVector4ByIndex(u_DissolveTex_ST); }
	set dissolveTex_ST(value) { this.setVector4ByIndex(u_DissolveTex_ST, value); }
	get dissolveAnim() { return this.getFloatByIndex(u_DissolveAnim); }
	set dissolveAnim(value) { this.setFloatByIndex(u_DissolveAnim, value); }
	get dissMode() { return this.getFloatByIndex(u_DissMode); }
	set dissMode(value) { this.setFloatByIndex(u_DissMode, value); }
	get dissolve() { return this.getFloatByIndex(u_Dissolve); }
	set dissolve(value) { this.setFloatByIndex(u_Dissolve, value); }
	get edgeColor() { return this.getColorByIndex(u_EdgeColor); }
	set edgeColor(value) { this.setColorByIndex(u_EdgeColor, value); }
	get edgeColorMulti() { return this.getFloatByIndex(u_EdgeColorMulti); }
	set edgeColorMulti(value) { this.setFloatByIndex(u_EdgeColorMulti, value); }
	get edgeWidth() { return this.getFloatByIndex(u_EdgeWidth); }
	set edgeWidth(value) { this.setFloatByIndex(u_EdgeWidth, value); }
	get outsideEdge() { return this.getFloatByIndex(u_OutsideEdge); }
	set outsideEdge(value) { this.setFloatByIndex(u_OutsideEdge, value); }
	get insideEdge() { return this.getFloatByIndex(u_InsideEdge); }
	set insideEdge(value) { this.setFloatByIndex(u_InsideEdge, value); }
	get distortionTex() { return this.getTextureByIndex(u_DistortionTex); }
	set distortionTex(value) {
		this.setDefine(DEF_DistortionTex, !!value);
		this.setTextureByIndex(u_DistortionTex, value);
	}
	get distortionTex_ST() { return this.getVector4ByIndex(u_DistortionTex_ST); }
	set distortionTex_ST(value) { this.setVector4ByIndex(u_DistortionTex_ST, value); }
	get distortionAnim() { return this.getFloatByIndex(u_DistortionAnim); }
	set distortionAnim(value) { this.setFloatByIndex(u_DistortionAnim, value); }
	get mainTexDistortion() { return this.getFloatByIndex(u_MainTexDistortion); }
	set mainTexDistortion(value) { this.setFloatByIndex(u_MainTexDistortion, value); }
	get edgeDistortion() { return this.getFloatByIndex(u_EdgeDistortion); }
	set edgeDistortion(value) { this.setFloatByIndex(u_EdgeDistortion, value); }
	get AMBlightTexDistortion() { return this.getFloatByIndex(u_AMBlightTexDistortion); }
	set AMBlightTexDistortion(value) { this.setFloatByIndex(u_AMBlightTexDistortion, value); }
	get maskTexDistortion() { return this.getFloatByIndex(u_MaskTexDistortion); }
	set maskTexDistortion(value) { this.setFloatByIndex(u_MaskTexDistortion, value); }
	get AMBlightTex() { return this.getTextureByIndex(u_AMBlightTex); }
	set AMBlightTex(value) {
		this.setDefine(DEF_AMBlightTex, !!value);
		this.setTextureByIndex(u_AMBlightTex, value);
	}
	get AMBlightTex_ST() { return this.getColorByIndex(u_AMBlightTex_ST); }
	set AMBlightTex_ST(value) { this.setColorByIndex(u_AMBlightTex_ST, value); }
	get AMBlightAnim() { return this.getFloatByIndex(u_AMBlightAnim); }
	set AMBlightAnim(value) { this.setFloatByIndex(u_AMBlightAnim, value); }
	get AMBlightLerp() { return this.getFloatByIndex(u_AMBlightLerp); }
	set AMBlightLerp(value) { this.setFloatByIndex(u_AMBlightLerp, value); }
	get maskTex() { return this.getTextureByIndex(u_MaskTex); }
	set maskTex(value) {
		this.setDefine(DEF_MaskTex, !!value);
		this.setTextureByIndex(u_MaskTex, value);
	}
	get maskTex_ST() { return this.getVector4ByIndex(u_MaskTex_ST); }
	set maskTex_ST(value) { this.setVector4ByIndex(u_MaskTex_ST, value); }
	get maskAnim() { return this.getFloatByIndex(u_MaskAnim); }
	set maskAnim(value) { this.setFloatByIndex(u_MaskAnim, value); }
	//#endregion
}