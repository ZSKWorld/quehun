import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifMove, ShaderDifMove } from "./MaterialDifMove";

interface MatDifmoveConfig {
    mainTex: string;
    lightTex: string;
    lightRange: number;
    spRange: number;
    lightController: number;
    lightCol: ColorArray;
    shadowCol: ColorArray;
    castController: number;
    globalController: number;
    bloomRange: number;
    bloomPow: number;
    saturation: number;
    alpha: number;
    rotation: number;
}

export class MaterialFactoryDifMove implements MaterialFactory<MaterialDifMove> {
    async create(item: MatDifmoveConfig): Promise<MaterialDifMove> {
        const [mainTex, lightTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex
        );
        const shader = new MaterialDifMove();
        shader._MainTex = mainTex;
        shader._LightTex = lightTex;
        shader._LightRange = item.lightRange;
        shader._SpRange = item.spRange;
        shader._LightController = item.lightController;
        shader._LightCol = new Laya.Vector4(...item.lightCol);
        shader._ShadowCol = new Laya.Vector4(...item.shadowCol);
        shader._CastController = item.castController;
        shader._GlobalController = item.globalController;
        shader._BloomRange = item.bloomRange;
        shader._BloomPow = item.bloomPow;
        shader._Saturation = item.saturation;
        shader._Alpha = item.alpha;
        shader._Rotation = item.rotation;

        return shader;
    }

    compile(): void {
        ShaderDifMove.initShader();
    }
}
