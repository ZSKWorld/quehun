import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifNolightA, ShaderDifNolightA } from "./MaterialDifNolightA";

interface MatDifnoLightConfig {
    mainTex: string;
}

export class MaterialFactoryDifNolightA implements MaterialFactory<MaterialDifNolightA> {
    async create(item: MatDifnoLightConfig): Promise<MaterialDifNolightA> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialDifNolightA = new MaterialDifNolightA();
        shader.MainTex = mainTex;

        return shader;
    }

    compile(): void {
        ShaderDifNolightA.initShader();
    }
}
