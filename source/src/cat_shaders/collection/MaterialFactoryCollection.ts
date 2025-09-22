import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCollection, ShaderCollection } from "./MaterialCollection";

export class MaterialFactoryCollection implements MaterialFactory<MaterialCollection> {
    public async create(item: any): Promise<MaterialCollection> {
        const [mainTex, aoTex] = await MaterialTool.loadTexture2DList(item.mainTex, item.aoTex);
        const shader: MaterialCollection = new MaterialCollection();
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
        shader.UAlphaScale = 1.0;
        shader.aoStrenth = +item.aoStrength;

        return shader;
    }

    compile(): void {
        ShaderCollection.initShader();
    }
}
