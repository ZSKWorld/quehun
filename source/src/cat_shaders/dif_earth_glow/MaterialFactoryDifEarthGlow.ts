import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifEarthGlow, ShaderDifEarthGlow } from "./MaterialDifEarthGlow";

interface MatDifEarthGlowConfig {
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
    glowSize: number;
    glowColor: FixedLengthArray<number, 4>;
    glowPow: number;

}

export class MaterialFactoryDifEarthGlow implements MaterialFactory<MaterialDifEarthGlow> {
    public async create(item: MatDifEarthGlowConfig): Promise<MaterialDifEarthGlow> {
        const [mainTex, lightTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,

        );
        const shader = new MaterialDifEarthGlow();
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
        shader._GlowSize = item.glowSize;
        shader._GlowColor = new Laya.Vector4(...item.glowColor);
        shader._GlowPow = item.glowPow;

        return shader;
    }

    compile(): void {
        ShaderDifEarthGlow.initShader();
    }
}
