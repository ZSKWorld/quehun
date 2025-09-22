import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifGlass, ShaderDifGlass } from "./MaterialDifGlass";

interface MatDifGlassConfig {
    mainTex: string;
    shadowsColor: ColorArray;
    alphaContorller: number;
    lightDir: FixedLengthArray<number, 4>;
    specPower: number;
    specSacle: number;
    specColor: ColorArray;
    factorRange: number;
}

export class MaterialFactoryDifGlass implements MaterialFactory<MaterialDifGlass> {
    async create(item: MatDifGlassConfig): Promise<MaterialDifGlass> {
        const [mainTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
        );
        const shader: MaterialDifGlass = new MaterialDifGlass();
        shader.mainTex = mainTex;
        shader.shadowsColor = new Laya.Vector4(...item.shadowsColor);
        shader.lightDir = new Laya.Vector4(...item.lightDir);
        shader.specPower = item.specPower;
        shader.specSacle = item.specSacle;
        shader.specColor = new Laya.Vector4(...item.specColor);
        shader.factorRange = item.factorRange;
        return shader;
    }

    compile(): void {
        ShaderDifGlass.initShader();
    }
}
