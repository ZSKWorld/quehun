import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialBasicSea, ShaderBasicSea } from "./MaterialBasicSea";

interface MatBasicSeaConfig {
    waveSpeed: FixedLengthArray<number, 4>;
    waveScale: FixedLengthArray<number, 4>;
    bumpMap: string;
    reflectiveColor: string;
    lightDir: FixedLengthArray<number, 4>;
    specPower: number;
    waterSpecColor: FixedLengthArray<number, 4>;
    waterColor: FixedLengthArray<number, 4>;
    specSacle: number;
    fresnel: FixedLengthArray<number, 4>;
    mwController: number;

}

export class MaterialFactoryBasicSea implements MaterialFactory<MaterialBasicSea> {
    public async create(item: MatBasicSeaConfig): Promise<MaterialBasicSea> {
        const [bumpMap, reflectiveColor] = await MaterialTool.loadTexture2DList(
            item.bumpMap,
            item.reflectiveColor,

        );
        const shader = new MaterialBasicSea();
        shader._WaveSpeed = new Laya.Vector4(...item.waveSpeed);
        shader._WaveScale = new Laya.Vector4(...item.waveScale);
        shader._BumpMap = bumpMap;
        shader._ReflectiveColor = reflectiveColor;
        shader._LightDir = new Laya.Vector4(...item.lightDir);
        shader._SpecPower = item.specPower;
        shader._WaterSpecColor = new Laya.Vector4(...item.waterSpecColor);
        shader._WaterColor = new Laya.Vector4(...item.waterColor);
        shader._SpecSacle = item.specSacle;
        shader._fresnel = new Laya.Vector4(...item.fresnel);
        shader._MwController = item.mwController;

        return shader;
    }

    compile(): void {
        ShaderBasicSea.initShader();
    }
}
