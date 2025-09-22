import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDiffish, ShaderDiffish } from "./MaterialDiffish";

interface MatDiffishConfig {
    mainTex: string;
    lightTex: string;
    lightDir: FixedLengthArray<number, 4>;
    lightColor: FixedLengthArray<number, 4>;
    lightController: number;
    color: FixedLengthArray<number, 4>;
    colorController: number;

}

export class MaterialFactoryDiffish implements MaterialFactory<MaterialDiffish> {
    public async create(item: MatDiffishConfig): Promise<MaterialDiffish> {
        const [mainTex, lightTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,

        );
        const shader = new MaterialDiffish();
        shader._MainTex = mainTex;
        shader._LightTex = lightTex;
        shader._LightDir = new Laya.Vector4(...item.lightDir);
        shader._LightColor = new Laya.Vector4(...item.lightColor);
        shader._LightController = item.lightController;
        shader._Color = new Laya.Vector4(...item.color);
        shader._ColorController = item.colorController;

        return shader;
    }

    compile(): void {
        ShaderDiffish.initShader();
    }
}
