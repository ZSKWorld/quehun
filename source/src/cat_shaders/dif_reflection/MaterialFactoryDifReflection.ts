import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifReflection, ShaderDifReflection } from "./MaterialDifReflection";

interface MatDifReflectionConfig {
    p: FixedLengthArray<number, 3>;
    mainTex: string;
    lightTex: string;
    lightController: number;
    castController: number;
    globalController: number;
    lightCol: FixedLengthArray<number, 4>;
    shadowCol: FixedLengthArray<number, 4>;
    bloomRange: number;
    bloomPow: number;
    lightRange: number;
    saturation: number;
    spRange: number;
    alpha: number;
    n: FixedLengthArray<number, 3>;
    pose: number;
    range: number;
    reflectionAlpha: number;
    reflectionColor: FixedLengthArray<number, 4>;

}

export class MaterialFactoryDifReflection implements MaterialFactory<MaterialDifReflection> {
    public async create(item: MatDifReflectionConfig): Promise<MaterialDifReflection> {
        const [mainTex, lightTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.lightTex,

        );
        const shader = new MaterialDifReflection();
        shader.p = new Laya.Vector3(...item.p);
        shader._MainTex = mainTex;
        shader._LightTex = lightTex;
        shader._LightController = item.lightController;
        shader._CastController = item.castController;
        shader._GlobalController = item.globalController;
        shader._LightCol = new Laya.Vector4(...item.lightCol);
        shader._ShadowCol = new Laya.Vector4(...item.shadowCol);
        shader._BloomRange = item.bloomRange;
        shader._BloomPow = item.bloomPow;
        shader._LightRange = item.lightRange;
        shader._Saturation = item.saturation;
        shader._SpRange = item.spRange;
        shader._Alpha = item.alpha;
        shader.n = new Laya.Vector3(...item.n);
        shader._Pose = item.pose || 1;
        shader._Range = item.range || 1;
        shader._ReflectionAlpha = item.reflectionAlpha;
        shader._ReflectionColor = new Laya.Vector4(...item.reflectionColor);

        return shader;
    }

    compile(): void {
        ShaderDifReflection.initShader();
    }
}
