import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialIslandLeaf, ShaderIslandLeaf } from "./MaterialIslandLeaf";

export class MaterialFactoryIslandLeaf implements MaterialFactory<MaterialIslandLeaf> {
    public async create(item: any): Promise<MaterialIslandLeaf> {
        const [mainTex, aoTex, alphaTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.aoTex,
            item.alphaTex,
        );
        const shader: MaterialIslandLeaf = new MaterialIslandLeaf();
        shader.albedoTexture = mainTex;
        shader.ao = aoTex;
        shader.alphaText = alphaTex;
        shader.aoColor = new Laya.Vector4(
            +item.aoColor[0] / 255,
            +item.aoColor[1] / 255,
            +item.aoColor[2] / 255,
            +item.aoColor[3] / 255,
        );
        shader.lightColor = new Laya.Vector4(
            +item.lightColor[0] / 255,
            +item.lightColor[1] / 255,
            +item.lightColor[2] / 255,
            +item.lightColor[3] / 255,
        );
        shader.aoStrenth = item.aoStrength;
        shader.frequency = item.frequency;
        shader.intencity = item.intensity;

        return shader;
    }

    compile(): void {
        ShaderIslandLeaf.initShader();
    }
}
