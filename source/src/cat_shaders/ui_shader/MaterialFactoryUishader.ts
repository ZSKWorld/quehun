import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialUishader, ShaderUishader } from "./MaterialUishader";

interface MatUishaderConfig {
    mainTex: string;
    maskTex: string;
    maskTexY: string;
    alpha: number;
    maskXmove: number;
    luminanceRange: number;
    vagueRange: number;
    vaguePow: number;
    maskYmove: number;
    disturb: FixedLengthArray<number, 4>;

}

export class MaterialFactoryUishader implements MaterialFactory<MaterialUishader> {
    public async create(item: MatUishaderConfig): Promise<MaterialUishader> {
        const [mainTex, maskTex, maskTexY] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.maskTex,
            item.maskTexY,

        );
        const shader = new MaterialUishader();
        shader._MainTex = mainTex;
        shader._MaskTex = maskTex;
        shader._MaskTexY = maskTexY;
        shader._Alpha = item.alpha;
        shader._MaskXmove = item.maskXmove;
        shader._LuminanceRange = item.luminanceRange;
        shader._VagueRange = item.vagueRange;
        shader._VaguePow = item.vaguePow;
        shader._MaskYmove = item.maskYmove;
        shader._Disturb = new Laya.Vector4(...item.disturb);

        return shader;
    }

    compile(): void {
        ShaderUishader.initShader();
    }
}
