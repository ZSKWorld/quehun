import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialUishaderlight, ShaderUishaderlight } from "./MaterialUishaderlight";

interface MatUishaderlightConfig {
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

export class MaterialFactoryUishaderlight implements MaterialFactory<MaterialUishaderlight> {
    public async create(item: MatUishaderlightConfig): Promise<MaterialUishaderlight> {
        const [mainTex, maskTex, maskTexY] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.maskTex,
            item.maskTexY,

        );
        const shader = new MaterialUishaderlight();
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
        ShaderUishaderlight.initShader();
    }
}
