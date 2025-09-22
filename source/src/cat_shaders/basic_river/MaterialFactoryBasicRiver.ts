import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialBasicRiver, ShaderBasicRiver } from "./MaterialBasicRiver";

interface MatBasicRiverConfig {
    reflectiveColor: string;
    bumpMap: string;
    lightMap: string;
    waveScale: FixedLengthArray<number, 4>;
    waveSpeed: FixedLengthArray<number, 4>;
    lightDir: FixedLengthArray<number, 4>;
    specPower: number;
    specSacle: number;
    waterSpecColor: ColorArray;
    waterColor: ColorArray;
    waveTex: string;
    fresnel: FixedLengthArray<number, 4>;
}

export class MaterialFactoryBasicRiver implements MaterialFactory<MaterialBasicRiver> {
    async create(item: MatBasicRiverConfig): Promise<MaterialBasicRiver> {
        const [
            reflectiveColor,
            bumpMap,
            lightMap,
            waveTex,
        ] = await MaterialTool.loadTexture2DList(
            item.reflectiveColor,
            item.bumpMap,
            item.lightMap,
            item.waveTex,
        );
        const shader: MaterialBasicRiver = new MaterialBasicRiver();

        shader.reflectiveColor = reflectiveColor;
        shader.bumpMap = bumpMap;
        shader.lightMap = lightMap;
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
        ShaderBasicRiver.initShader();
    }
}
