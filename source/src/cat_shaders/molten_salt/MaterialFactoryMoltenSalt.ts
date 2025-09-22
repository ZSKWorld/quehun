import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialMoltenSalt, ShaderMoltenSalt } from "./MaterialMoltenSalt";

interface MatMoltenSaltConfig {
    mainTex: string;
    colorController: number;
    saltContorller: number;

}

export class MaterialFactoryMoltenSalt implements MaterialFactory<MaterialMoltenSalt> {
    public async create(item: MatMoltenSaltConfig): Promise<MaterialMoltenSalt> {
        const [mainTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,

        );
        const shader = new MaterialMoltenSalt();
        shader._MainTex = mainTex;
        shader._ColorController = item.colorController;
        shader._SaltContorller = item.saltContorller;

        return shader;
    }

    compile(): void {
        ShaderMoltenSalt.initShader();
    }
}
