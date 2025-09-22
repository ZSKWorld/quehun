import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import MaterialWaveWarp, { ShaderWaveWarp } from "./MaterialWaveWarp";

interface MatWaveWarpConfig {
    mainTex: ResourcePath;
    GrayRange: number;
    FogRangeMax: number;
    FogRangePow: number;
    FogtCol: ColorArray;
}

export default class MaterialFactoryWaveWarp implements MaterialFactory<MaterialWaveWarp> {
    async create(item: MatWaveWarpConfig): Promise<MaterialWaveWarp> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialWaveWarp = new MaterialWaveWarp();
        shader.MainTex = mainTex;

        shader.GrayRange = item.GrayRange;
        shader.FogRangeMax = item.FogRangeMax;
        shader.FogRangePow = item.FogRangePow;

        shader.FogtCol = new Laya.Vector4(...item.FogtCol);

        return shader;
    }

    compile(): void {
        ShaderWaveWarp.initShader();
    }
}
