import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialFxFlash, ShaderFxFlash } from "./MaterialFxFlash";

interface MatFXFlashConfig {
    mainTex: string;
    maskTex: string;
    maskScale: number;
    alphaController: number;
    moveController: number;
    color: FixedLengthArray<number, 4>;
}

export class MaterialFactoryFxFlash implements MaterialFactory<MaterialFxFlash> {
    public async create(item: MatFXFlashConfig): Promise<MaterialFxFlash> {
        const [mainTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.maskTex,
        );
        const shader: MaterialFxFlash = new MaterialFxFlash();
        shader.mainTex = mainTex;
        shader.maskTex = maskTex;
        shader._AlphaController = item.alphaController;
        shader.moveController = item.moveController;
        shader.maskScale = item.maskScale;

        shader.color = new Laya.Vector4(...item.color);

        return shader;
    }

    compile(): void {
        ShaderFxFlash.initShader();
    }
}
