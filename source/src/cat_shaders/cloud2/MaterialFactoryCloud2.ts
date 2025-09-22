import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCloud2, ShaderCloud2 } from "./MaterialCloud2";

interface MatCloud2Config {
    mainTex: string;
    decorativeTex: string;
    maskTex: string;
    ahplaController: number;
    texScale: number;
    cloudMove: FixedLengthArray<number, 4>;
    cloudController: number;
    cloudColor: FixedLengthArray<number, 4>;
    offsetX: number;
    offsetY: number;
    disturbScale: number;
    distanceAhpla: number;

}

export class MaterialFactoryCloud2 implements MaterialFactory<MaterialCloud2> {
    public async create(item: MatCloud2Config): Promise<MaterialCloud2> {
        const [mainTex, decorativeTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.decorativeTex,
            item.maskTex,
        );
        const shader = new MaterialCloud2();
        shader._MainTex = mainTex;
        shader._DecorativeTex = decorativeTex;
        shader._MaskTex = maskTex;
        shader._AhplaController = item.ahplaController;
        shader._TexScale = item.texScale;
        shader._CloudMove = new Laya.Vector4(...item.cloudMove);
        shader._CloudController = item.cloudController;
        !item.cloudColor && (item.cloudColor = [1, 1, 1, 1]);
        shader._CloudColor = new Laya.Vector4(...item.cloudColor);
        shader._OffsetX = item.offsetX;
        shader._OffsetY = item.offsetY;
        shader._DisturbScale = item.disturbScale;
        shader._DistanceAhpla = item.distanceAhpla;

        return shader;
    }

    compile(): void {
        ShaderCloud2.initShader();
    }
}
