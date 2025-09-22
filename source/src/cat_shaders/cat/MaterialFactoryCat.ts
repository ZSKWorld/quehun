import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCat, ShaderCat } from "./MaterialCat";

export class MaterialFactoryAnimation implements MaterialFactory<MaterialCat> {
    async create(item: any): Promise<MaterialCat> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.param1);
        const shader: MaterialCat = new MaterialCat();
        shader.albedoTexture = mainTex;
        shader.color = new Laya.Vector4(
            +item.param2[0] / 255,
            +item.param2[1] / 255,
            +item.param2[2] / 255,
            +item.param2[3] / 255,
        );
        shader.plane = new Laya.Vector4(...item.param3.map(parseFloat));
        shader.lightDir = new Laya.Vector4(...item.param4.map(parseFloat));

        return shader;
    }

    compile(): void {
        ShaderCat.initShader();
    }
}
