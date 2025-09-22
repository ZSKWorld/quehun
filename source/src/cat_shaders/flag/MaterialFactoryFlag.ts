import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialFlag, ShaderFlag } from "./MaterialFlag";

interface MatFlagConfig {
    mainTex: string;
    frequency: number;
    amplitudeStrength: number;
    invWaveLength: number;
    fold: number;
}

export class MaterialFactoryFlag implements MaterialFactory<MaterialFlag> {
    public async create(item: MatFlagConfig): Promise<MaterialFlag> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialFlag = new MaterialFlag();
        shader.MainTex = mainTex;

        shader.Frequency = item.frequency;
        shader.AmplitudeStrength = item.amplitudeStrength;
        shader.InvWaveLength = item.invWaveLength;
        shader.Fold = item.fold;

        return shader;
    }

    compile(): void {
        ShaderFlag.initShader();
    }
}
