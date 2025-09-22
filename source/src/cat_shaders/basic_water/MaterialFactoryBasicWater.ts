import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialBasicWater, ShaderBasicWater } from "./MaterialBasicWater";

interface MatBasicWaterConfig {
    reflectiveColor: ResourcePath;
    bumpMap: ResourcePath;
    waveScale: FixedLengthArray<number, 4>;
    waveSpeed: FixedLengthArray<number, 4>;
    lightDir: FixedLengthArray<number, 4>;
    specPower: number;
    specSacle: number;
    waterSpecColor: ColorArray;
    waterColor: ColorArray;
    waveTex: ResourcePath;
    fresnel: FixedLengthArray<number, 4>;
}

export class MaterialFactoryBasicWater implements MaterialFactory<MaterialBasicWater> {
    async create(item: MatBasicWaterConfig): Promise<MaterialBasicWater> {
        const [reflectiveColor, bumpMap, waveTex] = await MaterialTool.loadTexture2DList(
            item.reflectiveColor,
            item.bumpMap,
            item.waveTex,
        );
        const shader: MaterialBasicWater = new MaterialBasicWater();
        shader.reflectiveColor = reflectiveColor;
        shader.bumpMap = bumpMap;
        shader.waveScale = new Laya.Vector4(...item.waveScale);
        shader.waveSpeed = new Laya.Vector4(...item.waveSpeed);
        shader.lightDir = new Laya.Vector4(...item.lightDir);
        shader.specPower = item.specPower;
        shader.specSacle = item.specSacle;
        shader.waterSpecColor = new Laya.Vector4(...item.waterSpecColor);
        shader.waterColor = new Laya.Vector4(...item.waterColor);
        shader.waveTex = waveTex;
        shader.fresnel = new Laya.Vector4(...item.fresnel);

        return shader;
    }

    compile(): void {
        ShaderBasicWater.initShader();
    }
}
