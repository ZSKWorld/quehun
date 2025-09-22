import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialFurniture, ShaderFurniture } from "./MaterialFurniture";

export class MaterialFactoryFurniture implements MaterialFactory<MaterialFurniture> {
    public async create(item: any): Promise<MaterialFurniture> {
        const [mainTex, aoTex] = await MaterialTool.loadTexture2DList(item.mainTex, item.aoTex);
        const shader: MaterialFurniture = new MaterialFurniture();
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
        shader.sunColor = new Laya.Vector4(
            +item.sunColor[0] / 255,
            +item.sunColor[1] / 255,
            +item.sunColor[2] / 255,
            +item.sunColor[3] / 255
        );
        shader.aoStrenth = +item.aoStrength;

        return shader;
    }

    compile(): void {
        ShaderFurniture.initShader();
    }
}
