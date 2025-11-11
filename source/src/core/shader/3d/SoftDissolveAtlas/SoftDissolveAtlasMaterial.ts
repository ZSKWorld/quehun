import { SoftDissolveAtlas_FS as fs, SoftDissolveAtlas_VS as vs } from "../Shader3DDefine";

export class SoftDissolveAtlasMaterial extends Laya.Material {
	private static readonly ShaderName = "SoftDissolveAtlas";
	private static DEF_MainTex: Laya.ShaderDefine;
	private static DEF_DissolveTex: Laya.ShaderDefine;
	private static DEF_DistortionTex: Laya.ShaderDefine;
	private static DEF_AMBlightTex: Laya.ShaderDefine;
	private static DEF_MaskTex: Laya.ShaderDefine;

	static init() {
		SoftDissolveAtlasMaterial.DEF_MainTex = Laya.Shader3D.getDefineByName("DEF_MainTex");
		SoftDissolveAtlasMaterial.DEF_DissolveTex = Laya.Shader3D.getDefineByName("DEF_DissolveTex");
		SoftDissolveAtlasMaterial.DEF_DistortionTex = Laya.Shader3D.getDefineByName("DEF_DistortionTex");
		SoftDissolveAtlasMaterial.DEF_AMBlightTex = Laya.Shader3D.getDefineByName("DEF_AMBlightTex");
		SoftDissolveAtlasMaterial.DEF_MaskTex = Laya.Shader3D.getDefineByName("DEF_MaskTex");

		const uniformMap = {
			u_MainColor: Laya.ShaderDataType.Vector4,
			u_MainColorMulti: Laya.ShaderDataType.Float,
			u_Alpha: Laya.ShaderDataType.Float,
			u_MainTex: Laya.ShaderDataType.Texture2D,
			u_MainTex_ST: Laya.ShaderDataType.Vector4,
			u_MainAnim: Laya.ShaderDataType.Vector4,
			u_DissolveTex: Laya.ShaderDataType.Texture2D,
			u_DissolveTex_ST: Laya.ShaderDataType.Vector4,
			u_DissolveAnim: Laya.ShaderDataType.Vector4,
			u_DissMode: Laya.ShaderDataType.Float,
			u_Dissolve: Laya.ShaderDataType.Float,
			u_EdgeColor: Laya.ShaderDataType.Vector4,
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
			u_MainColor: new Laya.Vector4(0, 0, 0, 0),
			u_MainColorMulti: 0,
			u_Alpha: 0,
			u_MainTex_ST: new Laya.Vector4(0, 0, 0, 0),
			u_MainAnim: new Laya.Vector4(0, 0, 0, 0),
			u_DissolveTex_ST: new Laya.Vector4(0, 0, 0, 0),
			u_DissolveAnim: new Laya.Vector4(0, 0, 0, 0),
			u_DissMode: 0,
			u_Dissolve: 0,
			u_EdgeColor: new Laya.Vector4(0, 0, 0, 0),
			u_EdgeColorMulti: 0,
			u_EdgeWidth: 0,
			u_OutsideEdge: 0,
			u_InsideEdge: 0,
			u_DistortionTex_ST: new Laya.Vector4(0, 0, 0, 0),
			u_DistortionAnim: new Laya.Vector4(0, 0, 0, 0),
			u_MainTexDistortion: 0,
			u_EdgeDistortion: 0,
			u_AMBlightTexDistortion: 0,
			u_MaskTexDistortion: 0,
			u_AMBlightTex_ST: new Laya.Vector4(0, 0, 0, 0),
			u_AMBlightAnim: new Laya.Vector4(0, 0, 0, 0),
			u_AMBlightLerp: 0,
			u_MaskTex_ST: new Laya.Vector4(0, 0, 0, 0),
			u_MaskAnim: new Laya.Vector4(0, 0, 0, 0),
		};
		const shader = Laya.Shader3D.add(SoftDissolveAtlasMaterial.ShaderName);
		shader.shaderType = Laya.ShaderFeatureType.D3;
		const subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);
		shader.addSubShader(subShader);
		subShader.addShaderPass(vs, fs);
	}

	constructor() {
		super();
		this.setShaderName(SoftDissolveAtlasMaterial.ShaderName);
	}

	//#region 字段
	get u_MainColor() { return this.getVector4("u_MainColor"); }
	set u_MainColor(value) { this.setVector4("u_MainColor", value); }
	get u_MainColorMulti() { return this.getFloat("u_MainColorMulti"); }
	set u_MainColorMulti(value) { this.setFloat("u_MainColorMulti", value); }
	get u_Alpha() { return this.getFloat("u_Alpha"); }
	set u_Alpha(value) { this.setFloat("u_Alpha", value); }
	get u_MainTex() { return this.getTexture("u_MainTex"); }
	set u_MainTex(value) {
		this.setDefine(SoftDissolveAtlasMaterial.DEF_MainTex, !!value);
		this.setTexture("u_MainTex", value);
	}
	get u_MainTex_ST() { return this.getVector4("u_MainTex_ST"); }
	set u_MainTex_ST(value) { this.setVector4("u_MainTex_ST", value); }
	get u_MainAnim() { return this.getVector4("u_MainAnim"); }
	set u_MainAnim(value) { this.setVector4("u_MainAnim", value); }
	get u_DissolveTex() { return this.getTexture("u_DissolveTex"); }
	set u_DissolveTex(value) {
		this.setDefine(SoftDissolveAtlasMaterial.DEF_DissolveTex, !!value);
		this.setTexture("u_DissolveTex", value);
	}
	get u_DissolveTex_ST() { return this.getVector4("u_DissolveTex_ST"); }
	set u_DissolveTex_ST(value) { this.setVector4("u_DissolveTex_ST", value); }
	get u_DissolveAnim() { return this.getVector4("u_DissolveAnim"); }
	set u_DissolveAnim(value) { this.setVector4("u_DissolveAnim", value); }
	get u_DissMode() { return this.getFloat("u_DissMode"); }
	set u_DissMode(value) { this.setFloat("u_DissMode", value); }
	get u_Dissolve() { return this.getFloat("u_Dissolve"); }
	set u_Dissolve(value) { this.setFloat("u_Dissolve", value); }
	get u_EdgeColor() { return this.getVector4("u_EdgeColor"); }
	set u_EdgeColor(value) { this.setVector4("u_EdgeColor", value); }
	get u_EdgeColorMulti() { return this.getFloat("u_EdgeColorMulti"); }
	set u_EdgeColorMulti(value) { this.setFloat("u_EdgeColorMulti", value); }
	get u_EdgeWidth() { return this.getFloat("u_EdgeWidth"); }
	set u_EdgeWidth(value) { this.setFloat("u_EdgeWidth", value); }
	get u_OutsideEdge() { return this.getFloat("u_OutsideEdge"); }
	set u_OutsideEdge(value) { this.setFloat("u_OutsideEdge", value); }
	get u_InsideEdge() { return this.getFloat("u_InsideEdge"); }
	set u_InsideEdge(value) { this.setFloat("u_InsideEdge", value); }
	get u_DistortionTex() { return this.getTexture("u_DistortionTex"); }
	set u_DistortionTex(value) {
		this.setDefine(SoftDissolveAtlasMaterial.DEF_DistortionTex, !!value);
		this.setTexture("u_DistortionTex", value);
	}
	get u_DistortionTex_ST() { return this.getVector4("u_DistortionTex_ST"); }
	set u_DistortionTex_ST(value) { this.setVector4("u_DistortionTex_ST", value); }
	get u_DistortionAnim() { return this.getVector4("u_DistortionAnim"); }
	set u_DistortionAnim(value) { this.setVector4("u_DistortionAnim", value); }
	get u_MainTexDistortion() { return this.getFloat("u_MainTexDistortion"); }
	set u_MainTexDistortion(value) { this.setFloat("u_MainTexDistortion", value); }
	get u_EdgeDistortion() { return this.getFloat("u_EdgeDistortion"); }
	set u_EdgeDistortion(value) { this.setFloat("u_EdgeDistortion", value); }
	get u_AMBlightTexDistortion() { return this.getFloat("u_AMBlightTexDistortion"); }
	set u_AMBlightTexDistortion(value) { this.setFloat("u_AMBlightTexDistortion", value); }
	get u_MaskTexDistortion() { return this.getFloat("u_MaskTexDistortion"); }
	set u_MaskTexDistortion(value) { this.setFloat("u_MaskTexDistortion", value); }
	get u_AMBlightTex() { return this.getTexture("u_AMBlightTex"); }
	set u_AMBlightTex(value) {
		this.setDefine(SoftDissolveAtlasMaterial.DEF_AMBlightTex, !!value);
		this.setTexture("u_AMBlightTex", value);
	}
	get u_AMBlightTex_ST() { return this.getVector4("u_AMBlightTex_ST"); }
	set u_AMBlightTex_ST(value) { this.setVector4("u_AMBlightTex_ST", value); }
	get u_AMBlightAnim() { return this.getVector4("u_AMBlightAnim"); }
	set u_AMBlightAnim(value) { this.setVector4("u_AMBlightAnim", value); }
	get u_AMBlightLerp() { return this.getFloat("u_AMBlightLerp"); }
	set u_AMBlightLerp(value) { this.setFloat("u_AMBlightLerp", value); }
	get u_MaskTex() { return this.getTexture("u_MaskTex"); }
	set u_MaskTex(value) {
		this.setDefine(SoftDissolveAtlasMaterial.DEF_MaskTex, !!value);
		this.setTexture("u_MaskTex", value);
	}
	get u_MaskTex_ST() { return this.getVector4("u_MaskTex_ST"); }
	set u_MaskTex_ST(value) { this.setVector4("u_MaskTex_ST", value); }
	get u_MaskAnim() { return this.getVector4("u_MaskAnim"); }
	set u_MaskAnim(value) { this.setVector4("u_MaskAnim", value); }
	//#endregion
}