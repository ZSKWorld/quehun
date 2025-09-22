import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialIslandCollection, ShaderIslandCollection } from "./MaterialIslandCollection";

export class MaterialFactoryIslandCollection implements MaterialFactory<MaterialIslandCollection> {
    public async create(item: any): Promise<MaterialIslandCollection> {
        const [mainTex, aoTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.aoTex,
        );
        const shader: MaterialIslandCollection = new MaterialIslandCollection();
        shader.albedoTexture = mainTex;
        shader.ao = aoTex;
        shader.aoColor = new Laya.Vector4(
            +item.aoColor[0] / 255,
            +item.aoColor[1] / 255,
            +item.aoColor[2] / 255,
            +item.aoColor[3] / 255
        );
        shader.lightColor = new Laya.Vector4(
            +item.lightColor[0] / 255,
            +item.lightColor[1] / 255,
            +item.lightColor[2] / 255,
            +item.lightColor[3] / 255
        );
        shader.aoStrenth = item.aoStrength;
        shader.UAlphaScale = item.alphaScale;
        shader.UColor = new Laya.Vector4(
            +item.colorTint[0] / 255,
            +item.colorTint[1] / 255,
            +item.colorTint[2] / 255,
            +item.colorTint[3] / 255
        );

        return shader;
    }

    compile(): void {
        ShaderIslandCollection.initShader();
    }
}
