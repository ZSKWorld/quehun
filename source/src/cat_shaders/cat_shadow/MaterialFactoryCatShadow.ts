import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCatShadow, ShaderCatShadow } from "./MaterialCatShadow";

export class MaterialFactoryCatShadow implements MaterialFactory<MaterialCatShadow> {
    async create(item: any): Promise<MaterialCatShadow> {
        const [mainTex, aoTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.aoTex,
        );
        const shader: MaterialCatShadow = new MaterialCatShadow();
        shader.albedoTexture = mainTex;
        shader.ao = aoTex;

        return shader;
    }

    compile(): void {
        ShaderCatShadow.initShader();
    }
}
