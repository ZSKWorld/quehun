import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifLight, ShaderDifLight } from "./MaterialDifLight";

interface MatDifLightConfig {
    mainTex: ResourcePath;
    lightController: number;
    lightDir: FixedLengthArray<number, 4>;
    lightColor: ColorArray;
}

export class MaterialFactoryDifLight implements MaterialFactory<MaterialDifLight> {
    async create(item: MatDifLightConfig): Promise<MaterialDifLight> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialDifLight = new MaterialDifLight();
        shader.MainTex = mainTex;

        shader.LightColor = new Laya.Vector4(...item.lightColor);
        shader.LightDir = new Laya.Vector4(...item.lightDir);
        shader.LightController = item.lightController;

        return shader;
    }

    compile(): void {
        ShaderDifLight.initShader();
    }
}
