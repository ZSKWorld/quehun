import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifOpdoor, ShaderDifOpdoor } from "./MaterialDifOpdoor";

interface MatDifOpdoorConfig {
    mainTex: string;
    lightTex: string;
    lightController: number;
    castController: number;
    globalController: number;
    lightCol: FixedLengthArray<number, 4>;
    shadowCol: FixedLengthArray<number, 4>;
    bloomRange: number;
    bloomPow: number;
    lightRange: number;
    saturation: number;
    spRange: number;
    alpha: number;
    rimColorController: number;
    rimColorRange: number;
    rimColor: FixedLengthArray<number, 4>;

}

export class MaterialFactoryDifOpdoor implements MaterialFactory<MaterialDifOpdoor> {
    public async create(item: MatDifOpdoorConfig): Promise<MaterialDifOpdoor> {
        const [mainTex, lightTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,

        );
        const shader = new MaterialDifOpdoor();
        shader._MainTex = mainTex;
        shader._LightTex = lightTex;
        shader._LightController = item.lightController;
        shader._CastController = item.castController;
        shader._GlobalController = item.globalController;
        shader._LightCol = new Laya.Vector4(...item.lightCol);
        shader._ShadowCol = new Laya.Vector4(...item.shadowCol);
        shader._BloomRange = item.bloomRange;
        shader._BloomPow = item.bloomPow;
        shader._LightRange = item.lightRange;
        shader._Saturation = item.saturation;
        shader._SpRange = item.spRange;
        shader._Alpha = item.alpha;
        shader._RimColorController = item.rimColorController;
        shader._RimColorRange = item.rimColorRange;
        shader._RimColor = new Laya.Vector4(...item.rimColor);

        return shader;
    }

    compile(): void {
        ShaderDifOpdoor.initShader();
    }
}
