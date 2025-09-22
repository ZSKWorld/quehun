import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialWave, ShaderWave } from "./MaterialWave";

interface MatWaveConfig {
    mainTex: string;
    speed: number;
    speed2: number;
    alphaController: number;
    waveFrequency: number;
    color: ColorArray;
    offsetX: number;
    offsetY: number;
}

export class MaterialFactoryWave implements MaterialFactory<MaterialWave> {
    public async create(item: MatWaveConfig): Promise<MaterialWave> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialWave = new MaterialWave();

        shader.MainTex = mainTex;
        shader.Speed = item.speed;
        shader.Speed2 = item.speed2;
        shader._AlphaController = item.alphaController;
        shader.WaveFrequency = item.waveFrequency;
        if (item.color) {
            shader.Color = new Laya.Vector4(...item.color);
        } else {
            shader.Color = new Laya.Vector4(1, 1, 1, 1);
        }
        shader._OffsetX = item.offsetX;
        shader.OffsetY = item.offsetY;

        return shader;
    }

    compile(): void {
        ShaderWave.initShader();
    }
}
