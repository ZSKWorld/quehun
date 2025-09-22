import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifEarth, ShaderDifEarth } from "./MaterialDifEarth";

interface MatDifEarthConfig {
    lightDir: FixedLengthArray<number, 4>;
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
    specPower: number;
    speculaCrolor: FixedLengthArray<number, 4>;
    gloss: number;

}

export class MaterialFactoryDifEarth implements MaterialFactory<MaterialDifEarth> {
    public async create(item: MatDifEarthConfig): Promise<MaterialDifEarth> {
        const [mainTex, lightTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,

        );
        const shader = new MaterialDifEarth();
        shader._LightDir = new Laya.Vector4(...item.lightDir);
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
        shader._SpecPower = item.specPower;
        shader._SpeculaCrolor = new Laya.Vector4(...item.speculaCrolor);
        shader._Gloss = item.gloss;

        return shader;
    }

    compile(): void {
        ShaderDifEarth.initShader();
    }
}
