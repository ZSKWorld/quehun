import { GradientColor_FS as fs, GradientColor_VS as vs } from "../Shader2DDefine";

const ShaderName = "GradientColor";

const DEF_xture = Laya.Shader3D.getDefineByName("DEF_xture");
const DEF_NoiseTex = Laya.Shader3D.getDefineByName("DEF_NoiseTex");

export class GradientColorMaterial extends Laya.Material {
	static init() {
		const uniformMap = {
			u_LightWidth: Laya.ShaderDataType.Float,
			texture: Laya.ShaderDataType.Texture2D,
			u_NoiseTex: Laya.ShaderDataType.Texture2D,
		};
		const defaultValue = {
			u_LightWidth: 0,
		};
		const shader = Laya.Shader3D.add(ShaderName);
		shader.shaderType = Laya.ShaderFeatureType.D3;
		const subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);
		shader.addSubShader(subShader);
		subShader.addShaderPass(vs, fs);
	}

	constructor() {
		super();
		this.setShaderName(ShaderName);
	}

	//#region 字段
	get u_LightWidth() { return this.getFloat("u_LightWidth"); }
	set u_LightWidth(value) { this.setFloat("u_LightWidth", value); }
	get texture() { return this.getTexture("texture"); }
	set texture(value) {
		this.setDefine(DEF_xture, !!value);
		this.setTexture("texture", value);
	}
	get u_NoiseTex() { return this.getTexture("u_NoiseTex"); }
	set u_NoiseTex(value) {
		this.setDefine(DEF_NoiseTex, !!value);
		this.setTexture("u_NoiseTex", value);
	}
	//#endregion
}