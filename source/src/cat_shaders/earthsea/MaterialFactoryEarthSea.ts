import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialEarthSea, ShaderEarthSea } from "./MaterialEarthSea";

interface MatEarthSeaConfig {
    waveSpeed: FixedLengthArray<number, 4>;
    waveScale: FixedLengthArray<number, 4>;
    bumpMap: string;
    reflectiveColor: string;
    lightMap: string;
    lightDir: FixedLengthArray<number, 4>;
    specPower: number;
    waterSpecColor: FixedLengthArray<number, 4>;
    waterColor: FixedLengthArray<number, 4>;
    specSacle: number;
    fresnel: FixedLengthArray<number, 4>;
    lightDir2: FixedLengthArray<number, 4>;
    edgeAhpla: number;
    glowSize: number;
    glowColor: FixedLengthArray<number, 4>;
    glowPow: number;

}

export class MaterialFactoryEarthSea implements MaterialFactory<MaterialEarthSea> {
    public async create(item: MatEarthSeaConfig): Promise<MaterialEarthSea> {
        const [bumpMap, reflectiveColor, lightMap] = await MaterialTool.loadTexture2DList(
            item.bumpMap,
            item.reflectiveColor,
            item.lightMap,

        );
        const shader = new MaterialEarthSea();
        shader._WaveSpeed = new Laya.Vector4(...item.waveSpeed);
        shader._WaveScale = new Laya.Vector4(...item.waveScale);
        shader._BumpMap = bumpMap;
        shader._ReflectiveColor = reflectiveColor;
        shader._LightMap = lightMap;
        shader._LightDir = new Laya.Vector4(...item.lightDir);
        shader._SpecPower = item.specPower;
        shader._WaterSpecColor = new Laya.Vector4(...item.waterSpecColor);
        shader._WaterColor = new Laya.Vector4(...item.waterColor);
        shader._SpecSacle = item.specSacle;
        shader._fresnel = new Laya.Vector4(...item.fresnel);
        shader._LightDir2 = new Laya.Vector4(...item.lightDir2);
        shader._EdgeAhpla = item.edgeAhpla;
        shader._GlowSize = item.glowSize;
        shader._GlowColor = new Laya.Vector4(...item.glowColor);
        shader._GlowPow = item.glowPow;

        return shader;
    }

    compile(): void {
        ShaderEarthSea.initShader();
    }
}
