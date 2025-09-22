import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifShadows, ShaderDifShadows } from "./MaterialDifShadows";

interface MatDifShadowsConfig {
    mainTex: string;
    shadowsColor: FixedLengthArray<number, 4>;
    alphaScale: number;

}

export class MaterialFactoryDifShadows implements MaterialFactory<MaterialDifShadows> {
    public async create(item: MatDifShadowsConfig): Promise<MaterialDifShadows> {
        const [mainTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
        );
        const shader = new MaterialDifShadows();
        shader._MainTex = mainTex;
        shader._ShadowsColor = new Laya.Vector4(...item.shadowsColor);
        shader._AlphaScale = item.alphaScale ?? 0.5;

        return shader;
    }

    compile(): void {
        ShaderDifShadows.initShader();
    }
}
