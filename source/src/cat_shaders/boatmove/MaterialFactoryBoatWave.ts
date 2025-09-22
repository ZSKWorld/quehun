import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialBoatWave, ShaderBoatWave } from "./MaterialBoatWave";

interface MatBoatWaveConfig {
    mainTex: string;
    speedX: number;
    speedY: number;
    alpha: number;
    waveFrequency: number;
    color: ColorArray;
}

export class MaterialFactoryBoatWave implements MaterialFactory<MaterialBoatWave> {
    async create(item: MatBoatWaveConfig): Promise<MaterialBoatWave> {
        const [mainTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
        );
        const shader = new MaterialBoatWave();
        shader._MainTex = mainTex;
        shader._SpeedX = item.speedX;
        shader._SpeedY = item.speedY;
        shader._Alpha = item.alpha;
        shader._WaveFrequency = item.waveFrequency;
        shader._Color = new Laya.Vector4(...item.color);

        return shader;
    }

    compile(): void {
        ShaderBoatWave.initShader();
    }
}
