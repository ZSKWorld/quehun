import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDif, ShaderDif } from "./MaterialDif";

/** Dif材质信息 */
interface MatDifConfig {
    mainTex: string;
    lightTex: string;
    lightController: number;
    castController: number;
    globalController: number;
    lightCol: ColorArray;
    shadowCol: ColorArray;
    bloomRange: number;
    bloomPow: number;
    saturation: number;
    lightRange: number;
    spRange: number;
    alpha: number;
}

export class MaterialFactoryDif implements MaterialFactory<MaterialDif> {
    async create(item: MatDifConfig): Promise<MaterialDif> {
        const [mainTex, lightMapTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,
        );
        const shader: MaterialDif = new MaterialDif();
        shader.MainTex = mainTex;
        shader.LightMapTex = lightMapTex;
        shader.LightColor = new Laya.Vector4(
            item.lightCol[0],
            item.lightCol[1],
            item.lightCol[2],
            item.lightCol[3]
        );
        shader.ShadowColor = new Laya.Vector4(
            item.shadowCol[0],
            item.shadowCol[1],
            item.shadowCol[2],
            item.shadowCol[3]
        );
        shader.LightController = item.lightController;
        shader.CastController = item.castController;
        shader.GlobalController = item.globalController;

        if (typeof item.bloomRange === "undefined") {
            shader.BloomRange = 1;
        } else {
            shader.BloomRange = item.bloomRange;
        }

        if (typeof item.bloomPow === "undefined") {
            shader.BloomPow = 1;
        } else {
            shader.BloomPow = item.bloomPow;
        }

        if (typeof item.saturation === "undefined") {
            shader.Saturation = 1;
        } else {
            shader.Saturation = item.saturation;
        }

        if (typeof item.lightRange === "undefined") {
            shader.LightRange = 0;
        } else {
            shader.LightRange = item.lightRange;
        }

        if (typeof item.spRange === "undefined") {
            shader.SpRange = 0;
        } else {
            shader.SpRange = item.spRange;
        }

        if (typeof item.alpha === "undefined") {
            shader.Alpha = 1;
        } else {
            shader.Alpha = item.alpha;
        }
        return shader;
    }

    compile(): void {
        ShaderDif.initShader();
    }
}
