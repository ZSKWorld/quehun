import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialSunLight, ShaderSunLight } from "./MaterialSunLight";

interface MatSunLightConfig {
    mainTex: string;
    maskTex: string;
    colorController: number;
    lightColor: FixedLengthArray<number, 4>;
    viewController: number;
    alphaController: number;

}

export class MaterialFactorySunLight implements MaterialFactory<MaterialSunLight> {
    public async create(item: MatSunLightConfig): Promise<MaterialSunLight> {
        const [mainTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.maskTex,

        );
        const shader = new MaterialSunLight();
        shader._MainTex = mainTex;
        shader._MaskTex = maskTex;
        shader._ColorController = item.colorController;
        shader._LightColor = new Laya.Vector4(...item.lightColor);
        shader._ViewController = item.viewController;
        shader._AlphaController = item.alphaController;

        return shader;
    }

    compile(): void {
        ShaderSunLight.initShader();
    }
}
