import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialIslandWaterfall, ShaderIslandWaterfall } from "./MaterialIslandWaterfall";

export class MaterialFactoryIslandWaterfall implements MaterialFactory<MaterialIslandWaterfall> {
    public async create(item: any): Promise<MaterialIslandWaterfall> {
        const [
            mainTex,
            noiseTex,
            waveTex,
            waterfullTex,
            aoTex
        ] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.noiseTex,
            item.waveTex,
            item.waterfullTex,
            item.aoTex,
        );
        const shader: MaterialIslandWaterfall = new MaterialIslandWaterfall();
        shader.albedoTexture = mainTex;
        shader.noise = noiseTex;
        shader.wave = waveTex;
        shader.waterfallTex = waterfullTex;
        shader.ao = aoTex;
        shader.TO1 = new Laya.Vector4(item.mainT[0], item.mainT[1], item.mainO[0], item.mainO[1]);
        shader.TO2 = new Laya.Vector4(
            item.noiseT[0],
            item.noiseT[1],
            item.noiseO[0],
            item.noiseO[1],
        );
        shader.TO3 = new Laya.Vector4(item.waveT[0], item.waveT[1], item.waveO[0], item.waveO[1]);
        shader.TO4 = new Laya.Vector4(
            item.waterT[0],
            item.waterT[1],
            item.waterO[0],
            item.waterO[1],
        );
        shader.TO5 = new Laya.Vector4(item.aoT[0], item.aoT[1], item.aoO[0], item.aoO[1]);
        shader.fvSpeed = item.flowVSpeed;
        shader.fuSpeed = item.flowUSpeed;
        shader.wvSpeed = item.waveVSpeed;
        shader.wuSpeed = item.waveUSpeed;
        shader.UFrequency = item.frequency;
        shader.UIntencity = item.intencity;
        shader.UBlend = item.blend;
        shader.USide = item.side;
        shader.URange = item.range;
        shader.UBright = item.bright;
        shader.aoColor = new Laya.Vector4(
            +item.aoColor[0] / 255,
            +item.aoColor[1] / 255,
            +item.aoColor[2] / 255,
            +item.aoColor[3] / 255,
        );
        shader.WaterColor = new Laya.Vector4(
            +item.waterColor[0] / 255,
            +item.waterColor[1] / 255,
            +item.waterColor[2] / 255,
            +item.waterColor[3] / 255,
        );
        shader.lightColor = new Laya.Vector4(
            +item.lightColor[0] / 255,
            +item.lightColor[1] / 255,
            +item.lightColor[2] / 255,
            +item.lightColor[3] / 255,
        );
        shader.aoStrenth = item.aoStrength;

        return shader;
    }

    compile(): void {
        ShaderIslandWaterfall.initShader();
    }
}
