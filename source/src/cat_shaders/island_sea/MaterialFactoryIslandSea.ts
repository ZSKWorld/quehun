import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialIslandSea, ShaderIslandSea } from "./MaterialIslandSea";

export class MaterialFactoryIslandSea implements MaterialFactory<MaterialIslandSea> {
    public async create(item: any): Promise<MaterialIslandSea> {
        const [waveTex, waveTex2, waterTex] = await MaterialTool.loadTexture2DList(
            item.waveTex, item.waveTex2, item.waterNormalTex
        );
        const shader: MaterialIslandSea = new MaterialIslandSea();
        shader.albedoTexture = waveTex;
        shader.wave2 = waveTex2;
        shader.water = waterTex;
        shader.WaveColor = new Laya.Vector4(
            item.waveColor[0],
            item.waveColor[1],
            item.waveColor[2],
            0,
        );
        shader.tilingOffset = new Laya.Vector4(
            item.waveTxT[0],
            item.waveTxT[1],
            item.waveTxT[0],
            item.waveTxT[1],
        );
        shader.TO1 = new Laya.Vector4(
            item.waveTx2T[0],
            item.waveTx2T[1],
            item.waveTx2T[0],
            item.waveTx2T[1],
        );
        shader.TO2 = new Laya.Vector4(
            item.waterNormal2T[0],
            item.waterNormal2T[1],
            item.waterNormal2T[0],
            item.waterNormal2T[1],
        );
        shader.fSpeed = item.speed;
        shader.wvSpeed = item.waveVSpeed;
        shader.wuSpeed = item.waveUSpeed;
        shader.fWaveFrequency = item.waveFrequency;
        shader.fWaveTime = item.waveTime;
        shader.UFrequency = item.frequency;
        shader.UIntencity = item.intencity;
        shader.UOpacityMin = item.opacityMin;
        shader.UOpacityMax = item.opacityMax;
        shader.USide = item.side;
        shader.fGloss = item.gloss;
        shader.LightDir = new Laya.Vector4(item.lightDir[0], item.lightDir[1], item.lightDir[2], 0);

        return shader;
    }

    compile(): void {
        ShaderIslandSea.initShader();
    }
}
