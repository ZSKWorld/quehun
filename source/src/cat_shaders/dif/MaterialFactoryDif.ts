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
        shader.LightColor = new Laya.Vector4(...item.lightCol);
        shader.ShadowColor = new Laya.Vector4(...item.shadowCol);
        shader.LightController = item.lightController;
        shader.CastController = item.castController;
        shader.GlobalController = item.globalController;
        shader.BloomRange = item.bloomRange ?? 1;
        shader.BloomPow = item.bloomPow ?? 1;
        shader.Saturation = item.saturation ?? 1;
        shader.LightRange = item.lightRange ?? 0;
        shader.SpRange = item.spRange ?? 0;
        shader.Alpha = item.alpha ?? 1;
        return shader;
    }

    compile(): void {
        ShaderDif.initShader();
    }
}
