import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialShadow, ShaderShadow } from "./MaterialShadow";

export class MaterialFactoryShadow implements MaterialFactory<MaterialShadow> {
    public async create(item: any): Promise<MaterialShadow> {
        const [mainTex, aoTex] = await MaterialTool.loadTexture2DList(
            "picture/fish_test.png",
            "picture/fish_test.png",
        );
        const shader: MaterialShadow = new MaterialShadow();
        shader.albedoTexture = mainTex;
        shader.ao = aoTex;
        shader.shadowPlane = new Laya.Vector4(
            +item.shadowPlane[0],
            +item.shadowPlane[1],
            +item.shadowPlane[2],
            +item.shadowPlane[3],
        );
        shader.shadowColor = new Laya.Vector4(
            +item.shadowColor[0] / 255,
            +item.shadowColor[1] / 255,
            +item.shadowColor[2] / 255,
            +item.shadowColor[3] / 255,
        );
        shader.shadowParam = new Laya.Vector4(
            +item.shadowParam[0],
            +item.shadowParam[1],
            +item.shadowParam[2],
            +item.shadowParam[3],
        );
        shader.lightDir = new Laya.Vector3(+item.lightDir[0], +item.lightDir[1], +item.lightDir[2]);

        return shader;
    }

    compile(): void {
        ShaderShadow.initShader();
    }
}
