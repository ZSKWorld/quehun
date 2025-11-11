import { GradientColor_FS as fs, GradientColor_VS as vs } from "../Shader2DDefine";

export class GradientColorMaterial extends Laya.Material {
	private static readonly ShaderName = "GradientColor";
	private static DEF_xture: Laya.ShaderDefine;
	private static DEF_NoiseTex: Laya.ShaderDefine;

	static init() {
		GradientColorMaterial.DEF_xture = Laya.Shader3D.getDefineByName("DEF_xture");
		GradientColorMaterial.DEF_NoiseTex = Laya.Shader3D.getDefineByName("DEF_NoiseTex");

		const uniformMap = {
			u_LightWidth: Laya.ShaderDataType.Float,
			texture: Laya.ShaderDataType.Texture2D,
			u_NoiseTex: Laya.ShaderDataType.Texture2D,
		};
		const defaultValue = {
			u_LightWidth: 0,
		};
		const shader = Laya.Shader3D.add(GradientColorMaterial.ShaderName);
		shader.shaderType = Laya.ShaderFeatureType.D3;
		const subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);
		shader.addSubShader(subShader);
		subShader.addShaderPass(vs, fs);
	}

	constructor() {
		super();
		this.setShaderName(GradientColorMaterial.ShaderName);
	}

	//#region 字段
	get u_LightWidth() { return this.getFloat("u_LightWidth"); }
	set u_LightWidth(value) { this.setFloat("u_LightWidth", value); }
	get texture() { return this.getTexture("texture"); }
	set texture(value) {
		this.setDefine(GradientColorMaterial.DEF_xture, !!value);
		this.setTexture("texture", value);
	}
	get u_NoiseTex() { return this.getTexture("u_NoiseTex"); }
	set u_NoiseTex(value) {
		this.setDefine(GradientColorMaterial.DEF_NoiseTex, !!value);
		this.setTexture("u_NoiseTex", value);
	}
	//#endregion
}