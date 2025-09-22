import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifA, ShaderDifA } from "./MaterialDifA";

interface MatDifAConfig {
    mainTex: string;
    maskTex: string;
    lightTex: string;
    lightController: number;
    lightCol: ColorArray;
    shadowCol: ColorArray;
    castController: number;
    globalController: number;
    offsetSpeed: number;
    offsetDir: number;
    offsetAmp: number;
    saturation: number;
    bloomRange: number;
    bloomPow: number;
    lightRange: number;
    spRange: number;
    alpha: number;
    movetape: number;
}

export class MaterialFactoryDifA implements MaterialFactory<MaterialDifA> {
    async create(item: MatDifAConfig): Promise<MaterialDifA> {
        const [mainTex, lightMapTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,
            item.maskTex,
        );
        const shader: MaterialDifA = new MaterialDifA();
        shader.MainTex = mainTex;
        shader.MaskTex = maskTex;
        shader.LightMapTex = lightMapTex;

        shader.LightController = item.lightController;
        shader.LightColor = new Laya.Vector4(...item.lightCol);
        shader.ShadowColor = new Laya.Vector4(...item.shadowCol);

        shader.CastController = item.castController;
        shader.GlobalController = item.globalController;

        shader.OffsetSpeed = item.offsetSpeed;
        shader.OffsetDir = item.offsetDir;
        shader.OffsetAmp = item.offsetAmp;
        shader.Saturation = item.saturation;

        shader.BloomRange = item.bloomRange;
        shader.BloomPow = item.bloomPow;
        shader.LightRange = item.lightRange;
        shader.SpRange = item.spRange;
        shader.Alpha = item.alpha;
        shader.Movetape = item.movetape;

        return shader;
    }

    compile(): void {
        ShaderDifA.initShader();
    }
}
