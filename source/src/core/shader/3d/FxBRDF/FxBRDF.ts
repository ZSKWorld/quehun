import fs from "./FxBRDF.fs";
import vs from "./FxBRDF.vs";

export class FxBRDF extends Laya.Material {
	private static readonly ShaderName = "FxBRDF";
	//#region 宏定义 & 属性ID
	private static DEF_MainTex: Laya.ShaderDefine;
	private static DEF_DissolveTex: Laya.ShaderDefine;
	private static DEF_DistortionTex: Laya.ShaderDefine;
	private static DEF_AMBlightTex: Laya.ShaderDefine;
	private static DEF_MaskTex: Laya.ShaderDefine;

	private static u_Alpha: number;
	private static u_MainTex: number;
	private static u_MainTex_ST: number;
	private static u_MainAnim: number;
	private static u_MainColor: number;
	private static u_MainColorMulti: number;
	private static u_DissolveTex: number;
	private static u_DissolveTex_ST: number;
	private static u_DissolveAnim: number;
	private static u_DissMode: number;
	private static u_Dissolve: number;
	private static u_EdgeColor: number;
	private static u_EdgeColorMulti: number;
	private static u_EdgeWidth: number;
	private static u_OutsideEdge: number;
	private static u_InsideEdge: number;
	private static u_DistortionTex: number;
	private static u_DistortionTex_ST: number;
	private static u_DistortionAnim: number;
	private static u_MainTexDistortion: number;
	private static u_EdgeDistortion: number;
	private static u_AMBlightTexDistortion: number;
	private static u_MaskTexDistortion: number;
	private static u_AMBlightTex: number;
	private static u_AMBlightTex_ST: number;
	private static u_AMBlightAnim: number;
	private static u_AMBlightLerp: number;
	private static u_MaskTex: number;
	private static u_MaskTex_ST: number;
	private static u_MaskAnim: number;
	//#endregion
	@ExcuteAfterEngineInit
	static init() {
		this.DEF_MainTex = Laya.Shader3D.getDefineByName("DEF_MainTex");
		this.DEF_DissolveTex = Laya.Shader3D.getDefineByName("DEF_DissolveTex");
		this.DEF_DistortionTex = Laya.Shader3D.getDefineByName("DEF_DistortionTex");
		this.DEF_AMBlightTex = Laya.Shader3D.getDefineByName("DEF_AMBlightTex");
		this.DEF_MaskTex = Laya.Shader3D.getDefineByName("DEF_MaskTex");

		this.u_Alpha = Laya.Shader3D.propertyNameToID("u_Alpha");
		this.u_MainTex = Laya.Shader3D.propertyNameToID("u_MainTex");
		this.u_MainTex_ST = Laya.Shader3D.propertyNameToID("u_MainTex_ST");
		this.u_MainAnim = Laya.Shader3D.propertyNameToID("u_MainAnim");
		this.u_MainColor = Laya.Shader3D.propertyNameToID("u_MainColor");
		this.u_MainColorMulti = Laya.Shader3D.propertyNameToID("u_MainColorMulti");
		this.u_DissolveTex = Laya.Shader3D.propertyNameToID("u_DissolveTex");
		this.u_DissolveTex_ST = Laya.Shader3D.propertyNameToID("u_DissolveTex_ST");
		this.u_DissolveAnim = Laya.Shader3D.propertyNameToID("u_DissolveAnim");
		this.u_DissMode = Laya.Shader3D.propertyNameToID("u_DissMode");
		this.u_Dissolve = Laya.Shader3D.propertyNameToID("u_Dissolve");
		this.u_EdgeColor = Laya.Shader3D.propertyNameToID("u_EdgeColor");
		this.u_EdgeColorMulti = Laya.Shader3D.propertyNameToID("u_EdgeColorMulti");
		this.u_EdgeWidth = Laya.Shader3D.propertyNameToID("u_EdgeWidth");
		this.u_OutsideEdge = Laya.Shader3D.propertyNameToID("u_OutsideEdge");
		this.u_InsideEdge = Laya.Shader3D.propertyNameToID("u_InsideEdge");
		this.u_DistortionTex = Laya.Shader3D.propertyNameToID("u_DistortionTex");
		this.u_DistortionTex_ST = Laya.Shader3D.propertyNameToID("u_DistortionTex_ST");
		this.u_DistortionAnim = Laya.Shader3D.propertyNameToID("u_DistortionAnim");
		this.u_MainTexDistortion = Laya.Shader3D.propertyNameToID("u_MainTexDistortion");
		this.u_EdgeDistortion = Laya.Shader3D.propertyNameToID("u_EdgeDistortion");
		this.u_AMBlightTexDistortion = Laya.Shader3D.propertyNameToID("u_AMBlightTexDistortion");
		this.u_MaskTexDistortion = Laya.Shader3D.propertyNameToID("u_MaskTexDistortion");
		this.u_AMBlightTex = Laya.Shader3D.propertyNameToID("u_AMBlightTex");
		this.u_AMBlightTex_ST = Laya.Shader3D.propertyNameToID("u_AMBlightTex_ST");
		this.u_AMBlightAnim = Laya.Shader3D.propertyNameToID("u_AMBlightAnim");
		this.u_AMBlightLerp = Laya.Shader3D.propertyNameToID("u_AMBlightLerp");
		this.u_MaskTex = Laya.Shader3D.propertyNameToID("u_MaskTex");
		this.u_MaskTex_ST = Laya.Shader3D.propertyNameToID("u_MaskTex_ST");
		this.u_MaskAnim = Laya.Shader3D.propertyNameToID("u_MaskAnim");

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
		const shader = Laya.Shader3D.add(this.ShaderName);
		shader.shaderType = Laya.ShaderFeatureType.D3;
		const subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);
		shader.addSubShader(subShader);
		subShader.addShaderPass(vs, fs);
	}
	constructor() {
		super();
		this.setShaderName(FxBRDF.ShaderName);
		this.materialRenderMode = Laya.MaterialRenderMode.RENDERMODE_TRANSPARENT;
	}

	//#region 字段
	get alpha() { return this.getFloatByIndex(FxBRDF.u_Alpha); }
	set alpha(value) { this.setFloatByIndex(FxBRDF.u_Alpha, value); }
	get mainTex() { return this.getTextureByIndex(FxBRDF.u_MainTex); }
	set mainTex(value) {
		this.setDefine(FxBRDF.DEF_MainTex, !!value);
		this.setTextureByIndex(FxBRDF.u_MainTex, value);
	}
	get mainTex_ST() { return this.getVector4ByIndex(FxBRDF.u_MainTex_ST); }
	set mainTex_ST(value) { this.setVector4ByIndex(FxBRDF.u_MainTex_ST, value); }
	get mainAnim() { return this.getFloatByIndex(FxBRDF.u_MainAnim); }
	set mainAnim(value) { this.setFloatByIndex(FxBRDF.u_MainAnim, value); }
	get mainColor() { return this.getColorByIndex(FxBRDF.u_MainColor); }
	set mainColor(value) { this.setColorByIndex(FxBRDF.u_MainColor, value); }
	get mainColorMulti() { return this.getFloatByIndex(FxBRDF.u_MainColorMulti); }
	set mainColorMulti(value) { this.setFloatByIndex(FxBRDF.u_MainColorMulti, value); }
	get dissolveTex() { return this.getTextureByIndex(FxBRDF.u_DissolveTex); }
	set dissolveTex(value) {
		this.setDefine(FxBRDF.DEF_DissolveTex, !!value);
		this.setTextureByIndex(FxBRDF.u_DissolveTex, value);
	}
	get dissolveTex_ST() { return this.getVector4ByIndex(FxBRDF.u_DissolveTex_ST); }
	set dissolveTex_ST(value) { this.setVector4ByIndex(FxBRDF.u_DissolveTex_ST, value); }
	get dissolveAnim() { return this.getFloatByIndex(FxBRDF.u_DissolveAnim); }
	set dissolveAnim(value) { this.setFloatByIndex(FxBRDF.u_DissolveAnim, value); }
	get dissMode() { return this.getFloatByIndex(FxBRDF.u_DissMode); }
	set dissMode(value) { this.setFloatByIndex(FxBRDF.u_DissMode, value); }
	get dissolve() { return this.getFloatByIndex(FxBRDF.u_Dissolve); }
	set dissolve(value) { this.setFloatByIndex(FxBRDF.u_Dissolve, value); }
	get edgeColor() { return this.getColorByIndex(FxBRDF.u_EdgeColor); }
	set edgeColor(value) { this.setColorByIndex(FxBRDF.u_EdgeColor, value); }
	get edgeColorMulti() { return this.getFloatByIndex(FxBRDF.u_EdgeColorMulti); }
	set edgeColorMulti(value) { this.setFloatByIndex(FxBRDF.u_EdgeColorMulti, value); }
	get edgeWidth() { return this.getFloatByIndex(FxBRDF.u_EdgeWidth); }
	set edgeWidth(value) { this.setFloatByIndex(FxBRDF.u_EdgeWidth, value); }
	get outsideEdge() { return this.getFloatByIndex(FxBRDF.u_OutsideEdge); }
	set outsideEdge(value) { this.setFloatByIndex(FxBRDF.u_OutsideEdge, value); }
	get insideEdge() { return this.getFloatByIndex(FxBRDF.u_InsideEdge); }
	set insideEdge(value) { this.setFloatByIndex(FxBRDF.u_InsideEdge, value); }
	get distortionTex() { return this.getTextureByIndex(FxBRDF.u_DistortionTex); }
	set distortionTex(value) {
		this.setDefine(FxBRDF.DEF_DistortionTex, !!value);
		this.setTextureByIndex(FxBRDF.u_DistortionTex, value);
	}
	get distortionTex_ST() { return this.getVector4ByIndex(FxBRDF.u_DistortionTex_ST); }
	set distortionTex_ST(value) { this.setVector4ByIndex(FxBRDF.u_DistortionTex_ST, value); }
	get distortionAnim() { return this.getFloatByIndex(FxBRDF.u_DistortionAnim); }
	set distortionAnim(value) { this.setFloatByIndex(FxBRDF.u_DistortionAnim, value); }
	get mainTexDistortion() { return this.getFloatByIndex(FxBRDF.u_MainTexDistortion); }
	set mainTexDistortion(value) { this.setFloatByIndex(FxBRDF.u_MainTexDistortion, value); }
	get edgeDistortion() { return this.getFloatByIndex(FxBRDF.u_EdgeDistortion); }
	set edgeDistortion(value) { this.setFloatByIndex(FxBRDF.u_EdgeDistortion, value); }
	get AMBlightTexDistortion() { return this.getFloatByIndex(FxBRDF.u_AMBlightTexDistortion); }
	set AMBlightTexDistortion(value) { this.setFloatByIndex(FxBRDF.u_AMBlightTexDistortion, value); }
	get maskTexDistortion() { return this.getFloatByIndex(FxBRDF.u_MaskTexDistortion); }
	set maskTexDistortion(value) { this.setFloatByIndex(FxBRDF.u_MaskTexDistortion, value); }
	get AMBlightTex() { return this.getTextureByIndex(FxBRDF.u_AMBlightTex); }
	set AMBlightTex(value) {
		this.setDefine(FxBRDF.DEF_AMBlightTex, !!value);
		this.setTextureByIndex(FxBRDF.u_AMBlightTex, value);
	}
	get AMBlightTex_ST() { return this.getColorByIndex(FxBRDF.u_AMBlightTex_ST); }
	set AMBlightTex_ST(value) { this.setColorByIndex(FxBRDF.u_AMBlightTex_ST, value); }
	get AMBlightAnim() { return this.getFloatByIndex(FxBRDF.u_AMBlightAnim); }
	set AMBlightAnim(value) { this.setFloatByIndex(FxBRDF.u_AMBlightAnim, value); }
	get AMBlightLerp() { return this.getFloatByIndex(FxBRDF.u_AMBlightLerp); }
	set AMBlightLerp(value) { this.setFloatByIndex(FxBRDF.u_AMBlightLerp, value); }
	get maskTex() { return this.getTextureByIndex(FxBRDF.u_MaskTex); }
	set maskTex(value) {
		this.setDefine(FxBRDF.DEF_MaskTex, !!value);
		this.setTextureByIndex(FxBRDF.u_MaskTex, value);
	}
	get maskTex_ST() { return this.getVector4ByIndex(FxBRDF.u_MaskTex_ST); }
	set maskTex_ST(value) { this.setVector4ByIndex(FxBRDF.u_MaskTex_ST, value); }
	get maskAnim() { return this.getFloatByIndex(FxBRDF.u_MaskAnim); }
	set maskAnim(value) { this.setFloatByIndex(FxBRDF.u_MaskAnim, value); }
	//#endregion
}