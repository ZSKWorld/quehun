import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialWater, ShaderWater } from "./MaterialWater";

export class MaterialFactoryWater implements MaterialFactory<MaterialWater> {
    public async create(item: any): Promise<MaterialWater> {
        const shader: MaterialWater = new MaterialWater();
        shader.vSpeed = item.param2;
        shader.uSpeed = item.param3;
        shader.v1 = item.param5;
        const [mainTex, noiseTex] = await MaterialTool.loadTexture2DList(item.param1, item.param4);
        shader.albedoTexture = mainTex;
        shader.noise = noiseTex;

        return shader;
    }

    compile(): void {
        ShaderWater.initShader();
    }
}
