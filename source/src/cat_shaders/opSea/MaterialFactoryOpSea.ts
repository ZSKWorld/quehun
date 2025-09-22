import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialOpSea, ShaderOpSea } from "./MaterialOpSea";

interface MatOpSeaConfig {
    reflectiveColor: string;
    bumpMap: string;
    waveScale: FixedLengthArray<number, 4>;
    waveSpeed: FixedLengthArray<number, 4>;
    lightDir: FixedLengthArray<number, 4>;
    specPower: number;
    specSacle: number;
    waterSpecColor: ColorArray;
    waterColor: ColorArray;
    fresnel: FixedLengthArray<number, 4>;
    moveWave: string;
    mwController: number;
}
export class MaterialFactoryOpSea implements MaterialFactory<MaterialOpSea> {
    async create(item: MatOpSeaConfig): Promise<MaterialOpSea> {
        const [reflectiveColor, bumpMap, moveWave] = await MaterialTool.loadTexture2DList(
            item.reflectiveColor,
            item.bumpMap,
            item.moveWave,
        );
        const shader: MaterialOpSea = new MaterialOpSea();
        shader.RefTex = reflectiveColor;
        shader.BumpTex = bumpMap;
        shader.MoveWaveTex = moveWave;

        shader.WaveScale = new Laya.Vector4(...item.waveScale);
        shader.WaveSpeed = new Laya.Vector4(...item.waveSpeed);
        shader.LightDir = new Laya.Vector4(...item.lightDir);
        shader.SpecPower = item.specPower;
        shader.SpecScale = item.specSacle;
        shader.WaterSpecColor = new Laya.Vector4(...item.waterSpecColor);
        shader.WaterColor = new Laya.Vector4(...item.waterColor);
        shader.Fresnel = new Laya.Vector4(...item.fresnel);
        shader.MwController = item.mwController;

        return shader;
    }

    compile(): void {
        ShaderOpSea.initShader();
    }
}
