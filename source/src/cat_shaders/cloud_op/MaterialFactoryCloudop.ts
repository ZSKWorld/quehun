import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCloudop, ShaderCloudop } from "./MaterialCloudop";

interface MatCloudopConfig {
    mainTex: string;
    decorativeTex: string;
    maskTex: string;
    ahplaController: number;
    texScale: number;
    cloudMove: FixedLengthArray<number, 4>;
    cloudController: number;
    fresnelrange: number;
    offsetX: number;
    offsetY: number;
    disturbScale: number;

}

export class MaterialFactoryCloudop implements MaterialFactory<MaterialCloudop> {
    public async create(item: MatCloudopConfig): Promise<MaterialCloudop> {
        const [mainTex, decorativeTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.decorativeTex,
            item.maskTex,

        );
        const shader = new MaterialCloudop();
        shader._MainTex = mainTex;
        shader._DecorativeTex = decorativeTex;
        shader._MaskTex = maskTex;
        shader._AhplaController = item.ahplaController;
        shader._TexScale = item.texScale;
        shader._CloudMove = new Laya.Vector4(...item.cloudMove);
        shader._CloudController = item.cloudController;
        shader._Fresnelrange = item.fresnelrange;
        shader._OffsetX = item.offsetX;
        shader._OffsetY = item.offsetY;
        shader._DisturbScale = item.disturbScale;

        return shader;
    }

    compile(): void {
        ShaderCloudop.initShader();
    }
}
