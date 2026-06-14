import { MaterialFactoryAnimation } from "./animation/MaterialFactoryAnimation";
import { MaterialFactoryBasicRiver } from "./basic_river/MaterialFactoryBasicRiver";
import { MaterialFactoryBasicSea } from "./basic_sea/MaterialFactoryBasicSea";
import { MaterialFactoryBasicWater } from "./basic_water/MaterialFactoryBasicWater";
import MaterialFactoryBlur from "./blur/MaterialFactoryBlur";
import { MaterialFactoryBoatWave } from "./boatmove/MaterialFactoryBoatWave";
import { MaterialFactoryCatShadow } from "./cat_shadow/MaterialFactoryCatShadow";
import { MaterialFactoryCharacter } from "./character/MaterialFactoryCharacter";
import { MaterialFactoryCloud } from "./cloud/MaterialFactoryCloud";
import { MaterialFactoryCloud2 } from "./cloud2/MaterialFactoryCloud2";
import { MaterialFactoryCloudEarth } from "./cloud_earth/MaterialFactoryCloudEarth";
import { MaterialFactoryCloudop } from "./cloud_op/MaterialFactoryCloudop";
import { MaterialFactoryCollection } from "./collection/MaterialFactoryCollection";
import { MaterialFactoryColor } from "./color/MaterialFactoryColor";
import { MaterialFactoryDif } from "./dif/MaterialFactoryDif";
import { MaterialFactoryDifA } from "./dif_a/MaterialFactoryDifA";
import { MaterialFactoryDifCollection } from "./dif_collection/MaterialFactoryDifCollection";
import { MaterialFactoryDifEarth } from "./dif_earth/MaterialFactoryDifEarth";
import { MaterialFactoryDifEarthGlow } from "./dif_earth_glow/MaterialFactoryDifEarthGlow";
import { MaterialFactoryDiffish } from "./dif_fish/MaterialFactoryDiffish";
import { MaterialFactoryDifGlass } from "./dif_glass/MaterialFactoryDifGlass";
import { MaterialFactoryDifGround } from "./dif_ground/MaterialFactoryDifGround";
import { MaterialFactoryDifLight } from "./dif_light/MaterialFactoryDifLight";
import { MaterialFactoryDifMove } from "./dif_move/MaterialFactoryDifMove";
import { MaterialFactoryDifNolight } from "./dif_nolight/MaterialFactoryDifNolight";
import { MaterialFactoryDifNolightA } from "./dif_nolight_A/MaterialFactoryDifNolightA";
import { MaterialFactoryDifOpdoor } from "./dif_Opdoor/MaterialFactoryDifOpdoor";
import { MaterialFactoryDifReflection } from "./dif_reflection/MaterialFactoryDifReflection";
import { MaterialFactoryDifShadows } from "./dif_shadows/MaterialFactoryDifShadows";
import { MaterialFactoryEarthSea } from "./earthsea/MaterialFactoryEarthSea";
import { MaterialFactoryFishShadow } from "./fish_shadow/MaterialFactoryFishShadow";
import { MaterialFactoryFlag } from "./flag/MaterialFactoryFlag";
import { MaterialFactoryFog } from "./fog/MaterialFactoryFog";
import { MaterialFactoryFxFlash } from "./fx_flash/MaterialFactoryFxFlash";
import { MaterialFactoryIslandBasic } from "./island_basic/MaterialFactoryIslandBasic";
import { MaterialFactoryIslandLeaf } from "./island_leaf/MaterialFactoryIslandLeaf";
import { MaterialFactoryIslandRiver } from "./island_river/MaterialFactoryIslandRiver";
import { MaterialFactoryIslandSea } from "./island_sea/MaterialFactoryIslandSea";
import { MaterialFactoryIslandWaterfall } from "./island_waterfall/MaterialFactoryIslandWaterfall";
import { MaterialFactoryLightWave } from "./lightwave/MaterialFactoryLightWave";
import { MaterialFactoryMoltenSalt } from "./molten_salt/MaterialFactoryMoltenSalt";
import { MaterialFactoryOpSea } from "./opSea/MaterialFactoryOpSea";
import ShaderTool from "./ShaderTool/ShaderTool.glsl";
import { MaterialFactoryShadow } from "./shadow/MaterialFactoryShadow";
import { MaterialFactorySky } from "./sky/MaterialFactorySky";
import { MaterialFactorySunLight } from "./sun_light/MaterialFactorySunLight";
import { MaterialFactoryUishader } from "./ui_shader/MaterialFactoryUishader";
import { MaterialFactoryUishaderlight } from "./ui_shader_light/MaterialFactoryUishaderlight";
import { MaterialFactoryUvMove } from "./uv_move/MaterialFactoryUvMove";
import { MaterialFactoryWave } from "./wave/MaterialFactoryWave";
import MaterialFactoryWaveWarp from "./WaveWarp/MaterialFactoryWaveWarp";

/**
 * shader控制
 * 生成项目使用到的shader
 */
export class ShaderControl {

	private __registerShader: { [name: string]: new () => MaterialFactory<any> };

	private _shaderCache: { [name: string]: Laya.UnlitMaterial } = {};

	private _materialFactorys: { [shaderName: string]: MaterialFactory<Laya.UnlitMaterial> } = {};

	private registerMaterialFactory(name: string, klass: new () => MaterialFactory<any>) {
		const obj = this._materialFactorys[name];
		if (obj) {
			return console.warn(`shader重复注册=>${ name }`);
		}
		/* eslint-disable-next-line */
		this._materialFactorys[name] = new klass();
	}

	public init() {
		// Laya.Shader3D.debugMode = true;
		Laya.Shader3D.addInclude("ShaderTool.glsl", ShaderTool);
		this.registerMaterialFactory("basic", MaterialFactoryIslandBasic);
		this.registerMaterialFactory("testLeaf", MaterialFactoryIslandLeaf);
		this.registerMaterialFactory("sea", MaterialFactoryIslandSea);
		this.registerMaterialFactory("waterfall", MaterialFactoryIslandWaterfall);
		this.registerMaterialFactory("river", MaterialFactoryIslandRiver);
		this.registerMaterialFactory("collection", MaterialFactoryCollection);
		this.registerMaterialFactory("shadow", MaterialFactoryShadow);
		this.registerMaterialFactory("fishShadow", MaterialFactoryFishShadow);
		this.registerMaterialFactory("Animation", MaterialFactoryAnimation);
		this.registerMaterialFactory("BasicWater", MaterialFactoryBasicWater);
		this.registerMaterialFactory("BasicRiver", MaterialFactoryBasicRiver);
		this.registerMaterialFactory("BasicSea", MaterialFactoryBasicSea);
		this.registerMaterialFactory("Wave", MaterialFactoryWave);
		this.registerMaterialFactory("Fog", MaterialFactoryFog);
		this.registerMaterialFactory("Dif", MaterialFactoryDif);
		this.registerMaterialFactory("DifA", MaterialFactoryDifA);
		this.registerMaterialFactory("Flag", MaterialFactoryFlag);
		this.registerMaterialFactory("Dif_noLight", MaterialFactoryDifNolight);
		this.registerMaterialFactory("Dif_noLightA", MaterialFactoryDifNolightA);
		this.registerMaterialFactory("UvMove", MaterialFactoryUvMove);
		this.registerMaterialFactory("DifLight", MaterialFactoryDifLight);
		this.registerMaterialFactory("FXFlash", MaterialFactoryFxFlash);
		this.registerMaterialFactory("EarthSea", MaterialFactoryEarthSea);
		this.registerMaterialFactory("Cloud", MaterialFactoryCloud);
		this.registerMaterialFactory("Cloud2", MaterialFactoryCloud2);
		this.registerMaterialFactory("Color", MaterialFactoryColor);
		this.registerMaterialFactory("Character", MaterialFactoryCharacter);
		this.registerMaterialFactory("catShadow", MaterialFactoryCatShadow);
		this.registerMaterialFactory("DifShadows", MaterialFactoryDifShadows);
		this.registerMaterialFactory("Sky", MaterialFactorySky);
		this.registerMaterialFactory("WaveWarp", MaterialFactoryWaveWarp);
		this.registerMaterialFactory("DifGlass", MaterialFactoryDifGlass);
		this.registerMaterialFactory("DifGround", MaterialFactoryDifGround);
		this.registerMaterialFactory("OpSea", MaterialFactoryOpSea);
		this.registerMaterialFactory("BoatWave", MaterialFactoryBoatWave);
		this.registerMaterialFactory("Dif_move", MaterialFactoryDifMove);
		this.registerMaterialFactory("Dif_Opdoor", MaterialFactoryDifOpdoor);
		this.registerMaterialFactory("DifReflection", MaterialFactoryDifReflection);
		this.registerMaterialFactory("Cloudop", MaterialFactoryCloudop);
		this.registerMaterialFactory("SunLight", MaterialFactorySunLight);
		this.registerMaterialFactory("CloudEarth", MaterialFactoryCloudEarth);
		this.registerMaterialFactory("DifEarth", MaterialFactoryDifEarth);
		this.registerMaterialFactory("DifEarthGlow", MaterialFactoryDifEarthGlow);
		this.registerMaterialFactory("blurEffect", MaterialFactoryBlur);
		this.registerMaterialFactory("MoltenSalt", MaterialFactoryMoltenSalt);
		this.registerMaterialFactory("DifCollection", MaterialFactoryDifCollection);
		this.registerMaterialFactory("Diffish", MaterialFactoryDiffish);
		this.registerMaterialFactory("DifOpdoor", MaterialFactoryDifOpdoor);
		this.registerMaterialFactory("LightWave", MaterialFactoryLightWave);
		this.registerMaterialFactory("Uishader", MaterialFactoryUishader);
		this.registerMaterialFactory("Uishaderlight", MaterialFactoryUishaderlight);
		//### 该行为批量转换shader定位行，不可进行任何删除或修改 ###//

		for (const name of Object.keys(this._materialFactorys)) {
			const factory = this._materialFactorys[name];
			factory.compile();
		}
		//shader预编译信息
		const shaderInfos = {
			Dif_nolight: [
				{
					defineNames: [
						"TILINGOFFSET"
					],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Cloud: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Animation: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			DifGround: [
				{
					defineNames: [
						"TILINGOFFSET"
					],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Dif_A: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Sky: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Dif: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			BasicRiver: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Wave: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Character: [
				{
					defineNames: [
						"BONE"
					],
					passIndex: 0,
					subShaderIndex: 0
				},
				{
					defineNames: [
						"BONE"
					],
					passIndex: 1,
					subShaderIndex: 0
				}
			],
			DifShadow: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			BasicWater: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			DifGlass: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Dif_light: [
				{
					defineNames: [
						"BONE"
					],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Unlit: [
				{
					defineNames: [
						"ALBEDOTEXTURE"
					],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			FxFlash: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			DifOpdoor: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			SunLight: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			DifCollection: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				},
				{
					defineNames: [],
					passIndex: 1,
					subShaderIndex: 0
				}
			],
			BoatWave: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			Cloud2: [
				{
					defineNames: [
						"TILINGOFFSET"
					],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			UvMove: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			MoltenSalt: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			DifEarth: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			EarthSea: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				},
				{
					defineNames: [],
					passIndex: 1,
					subShaderIndex: 0
				}
			],
			CloudEarth: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			LineShader: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			],
			BasicSea: [
				{
					defineNames: [],
					passIndex: 0,
					subShaderIndex: 0
				}
			]
		};
		// shader预编译
		// for (const key in shaderInfos) {
		//     if (Object.prototype.hasOwnProperty.call(shaderInfos, key)) {
		//         const element: any[] = shaderInfos[key];
		//         for (let i = 0; i < element.length; i++) {
		//             const shader = element[i];
		//             Laya.Shader3D.compileShaderByDefineNames(
		//                 key,
		//                 shader.subShaderIndex,
		//                 shader.passIndex,
		//                 shader.defineNames
		//             );
		//         }
		//     }
		// }
	}

	public getShaderNoLoad(name: string) {
		return this._shaderCache[name];
	}

	public async getShader(name: string, folder: string): Promise<Laya.UnlitMaterial> {
		if (this._shaderCache[name]) {
			if (!this._shaderCache[name].destroyed) {
				return this._shaderCache[name];
			} else {
				this._shaderCache[name] = null;
			}
		}
		if (!folder) {
			console.error("folder error:", name, folder);
			return null;
		}
		//先把promise赋值给_shaderCache，加载完成后再把shader赋值给_shaderCache，避免未加载完又获取时重复创建，造成不能动态合并
		const result = ModelLoader.inst.loadShaderJosn(folder).then((sceneObjectMaterial) => {
			// 获取材质配置信息
			const objectMaterial = sceneObjectMaterial[name];
			if (!objectMaterial) {
				this._shaderCache[name] = null;
				console.error(`not find shader name = ${ name }, folder = ${ folder }`);
				return null;
			}

			const factory = this._materialFactorys[objectMaterial.shader];
			if (!factory) {
				this._shaderCache[name] = null;
				console.error("not find shader factory");
				return null;
			}
			return factory.create(objectMaterial).then((res) => {
				this._shaderCache[name] = res;
				return this._shaderCache[name];
			}).catch((reject) => {
				this._shaderCache[name] = null;
			});
		}).catch((reject) => {
			this._shaderCache[name] = null;
		});
		this._shaderCache[name] = result as any;
		return this._shaderCache[name];
	}
}
