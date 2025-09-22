import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialLightWave, ShaderLightWave } from "./MaterialLightWave";

interface MatLightWaveConfig {
    mainTex: string;
    speed: number;
    alphaController: number;
    waveFrequency: number;
    speed2: number;
    color: FixedLengthArray<number, 4>;
    offsetX: number;
    offsetY: number;

}

export class MaterialFactoryLightWave implements MaterialFactory<MaterialLightWave> {
    public async create(item: MatLightWaveConfig): Promise<MaterialLightWave> {
        const [mainTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,

        );
        const shader = new MaterialLightWave();
        shader._MainTex = mainTex;
        shader._Speed = item.speed;
        shader._AlphaController = item.alphaController;
        shader._WaveFrequency = item.waveFrequency;
        shader._Speed2 = item.speed2;
        shader._Color = new Laya.Vector4(...item.color);
        shader._OffsetX = item.offsetX;
        shader._OffsetY = item.offsetY;

        return shader;
    }

    compile(): void {
        ShaderLightWave.initShader();
    }
}
