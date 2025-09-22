import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifNolight, ShaderDifNolight } from "./MaterialDifNolight";

interface MatDifnoLightConfig {
    mainTex: string;
}

export class MaterialFactoryDifNolight implements MaterialFactory<MaterialDifNolight> {
    async create(item: MatDifnoLightConfig): Promise<MaterialDifNolight> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialDifNolight = new MaterialDifNolight();
        shader.MainTex = mainTex;

        return shader;
    }

    compile(): void {
        ShaderDifNolight.initShader();
    }
}
