import { GridSize_FS as fs, GridSize_VS as vs } from "../Shader2DDefine";

export class GridSizeMaterial extends Laya.Material {
	private static readonly ShaderName = "GridSize";
	private static DEF_texture: Laya.ShaderDefine;

	static init() {
		GridSizeMaterial.DEF_texture = Laya.Shader3D.getDefineByName("DEF_texture");

		const uniformMap = {
			texture: Laya.ShaderDataType.Texture2D,
			u_size: Laya.ShaderDataType.Vector2,
			u_GridSize: Laya.ShaderDataType.Float,
			u_Speed: Laya.ShaderDataType.Float,
		};
		const defaultValue = {
			u_size: new Laya.Vector2(0, 0),
			u_GridSize: 0,
			u_Speed: 0,
		};
		const shader = Laya.Shader3D.add(GridSizeMaterial.ShaderName);
		shader.shaderType = Laya.ShaderFeatureType.D2_TextureSV;
		const subShader = new Laya.SubShader(Laya.SubShader.DefaultAttributeMap, uniformMap, defaultValue);
		shader.addSubShader(subShader);
		subShader.addShaderPass(vs, fs);
	}

	constructor() {
		super();
		this.setShaderName(GridSizeMaterial.ShaderName);
	}

	//#region 字段
	get texture() { return this.getTexture("texture"); }
	set texture(value) {
		this.setDefine(GridSizeMaterial.DEF_texture, !!value);
		this.setTexture("texture", value);
	}
	get u_size() { return this.getVector2("u_size"); }
	set u_size(value) { this.setVector2("u_size", value); }
	get u_GridSize() { return this.getFloat("u_GridSize"); }
	set u_GridSize(value) { this.setFloat("u_GridSize", value); }
	get u_Speed() { return this.getFloat("u_Speed"); }
	set u_Speed(value) { this.setFloat("u_Speed", value); }
	//#endregion
}