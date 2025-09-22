import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCloud, ShaderCloud } from "./MaterialCloud";

interface MatCloudConfig {
    mainTex: string;
    decorativeTex: string;
    maskTex: string;
    ahplaController: number;
    texScale: number;
    cloudMove: ColorArray;
    cloudController: number;
    fresnelrange: number;
    scaleController: number;
}

export class MaterialFactoryCloud implements MaterialFactory<MaterialCloud> {
    public async create(item: MatCloudConfig): Promise<MaterialCloud> {
        const [mainTex, decorativeTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.decorativeTex,
            item.maskTex,
        );
        const shader: MaterialCloud = new MaterialCloud();
        shader.FogTex = mainTex;
        shader.DecorativeTex = decorativeTex;
        shader.BlockTex = maskTex;

        shader._AhplaController = item.ahplaController;
        shader.CloudMove = new Laya.Vector4(...item.cloudMove);
        shader._TexScale = item.texScale;
        shader.Fresnelrange = item.fresnelrange;
        shader.CloudController = item.cloudController;
        shader.ScaleController = item.scaleController;

        return shader;
    }

    compile(): void {
        ShaderCloud.initShader();
    }
}
