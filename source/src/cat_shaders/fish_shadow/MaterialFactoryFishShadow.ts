import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialFishShadow, ShaderFishShadow } from "./MaterialFishShadow";

export class MaterialFactoryFishShadow implements MaterialFactory<MaterialFishShadow> {
    public async create(item: any): Promise<MaterialFishShadow> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialFishShadow = new MaterialFishShadow();
        shader.albedoTexture = mainTex;
        shader.shadowColor = new Laya.Vector4(
            +item.shadowColor[0] / 255,
            +item.shadowColor[1] / 255,
            +item.shadowColor[2] / 255,
            +item.shadowColor[3] / 255,
        );
        shader.shadowParam = item.silhouette;

        return shader;
    }

    compile(): void {
        ShaderFishShadow.initShader();
    }
}
