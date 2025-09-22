import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialTree, ShaderTree } from "./MaterialTree";

export class MaterialFactoryTree implements MaterialFactory<MaterialTree> {
    public async create(item: any): Promise<MaterialTree> {
        const [mainTex, aoTex] = await MaterialTool.loadTexture2DList(item.param1, item.param2);
        const shader: MaterialTree = new MaterialTree();
        shader.c1 = new Laya.Vector3(
            +item.param3[0] / 255,
            +item.param3[1] / 255,
            +item.param3[2] / 255,
        );
        shader.albedoTexture = mainTex;
        shader.ao = aoTex;
        shader.frequency = item.param4;
        shader.intensity = item.param5;

        return shader;
    }

    compile(): void {
        ShaderTree.initShader();
    }
}
