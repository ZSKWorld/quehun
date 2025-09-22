import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialUvMove, ShaderUvMove } from "./MaterialUvMove";

interface MatUvMoveConfig {
    mainTex: string;
    horAmount: number;
    verAmount: number;
    speed: number;
    alpha: number;
}

export class MaterialFactoryUvMove implements MaterialFactory<MaterialUvMove> {
    public async create(item: MatUvMoveConfig): Promise<MaterialUvMove> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader = new MaterialUvMove();
        shader.MainTex = mainTex;

        shader.HorAmount = item.horAmount;
        shader.VerAmount = item.verAmount;
        shader._Speed = item.speed;
        shader._Alpha = item.alpha;

        return shader;
    }

    compile(): void {
        ShaderUvMove.initShader();
    }
}
