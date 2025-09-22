import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialGrass, ShaderGrass } from "./MaterialGrass";

export class MaterialFactoryGrass implements MaterialFactory<MaterialGrass> {
    public async create(item: any): Promise<MaterialGrass> {
        const [mainTex, aoTex, alphaTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.aoTex,
            item.alphaTex,
        );
        const shader: MaterialGrass = new MaterialGrass();
        shader.albedoTexture = mainTex;
        shader.ao = aoTex;
        shader.alphaText = alphaTex;
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
        shader.frequency = item.frequency;
        shader.intencity = item.intensity;

        return shader;
    }

    compile(): void {
        ShaderGrass.initShader();
    }
}
