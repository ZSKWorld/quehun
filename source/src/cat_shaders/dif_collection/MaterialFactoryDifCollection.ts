import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifCollection, ShaderDifCollection } from "./MaterialDifCollection";

interface MatDifCollectionConfig {
    glowSize: number;
    glowColor: FixedLengthArray<number, 4>;
    mainTex: string;
    lightTex: string;
    maskTex: string;
    lightController: number;
    castController: number;
    globalController: number;
    lightCol: FixedLengthArray<number, 4>;
    shadowCol: FixedLengthArray<number, 4>;
    saturation: number;
    bloomRange: number;
    bloomPow: number;
    lightRange: number;
    spRange: number;
    alpha: number;

}

export class MaterialFactoryDifCollection implements MaterialFactory<MaterialDifCollection> {
    public async create(item: MatDifCollectionConfig): Promise<MaterialDifCollection> {
        const [mainTex, lightTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,
            item.maskTex,

        );
        const shader = new MaterialDifCollection();
        shader._GlowSize = item.glowSize;
        shader._GlowColor = new Laya.Vector4(...item.glowColor);
        shader._MainTex = mainTex;
        shader._LightTex = lightTex;
        shader._MaskTex = maskTex;
        shader._LightController = item.lightController;
        shader._CastController = item.castController;
        shader._GlobalController = item.globalController;
        shader._LightCol = new Laya.Vector4(...item.lightCol);
        shader._ShadowCol = new Laya.Vector4(...item.shadowCol);
        shader._Saturation = item.saturation;
        shader._BloomRange = item.bloomRange;
        shader._BloomPow = item.bloomPow;
        shader._LightRange = item.lightRange;
        shader._SpRange = item.spRange;
        shader._Alpha = item.alpha;

        return shader;
    }

    compile(): void {
        ShaderDifCollection.initShader();
    }
}
