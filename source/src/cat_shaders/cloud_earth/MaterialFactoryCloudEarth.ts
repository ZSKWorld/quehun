import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCloudEarth, ShaderCloudEarth } from "./MaterialCloudEarth";

interface MatCloudEarthConfig {
    mainTex: string;
    decorativeTex: string;
    maskTex: string;
    ahplaController: number;
    texScale: number;
    cloudMove: FixedLengthArray<number, 4>;
    cloudController: number;
    cloudColor: FixedLengthArray<number, 4>;
    fresnelrange: number;
    offsetX: number;
    offsetY: number;
    disturbScale: number;
    edgeAhpla: number;

}

export class MaterialFactoryCloudEarth implements MaterialFactory<MaterialCloudEarth> {
    public async create(item: MatCloudEarthConfig): Promise<MaterialCloudEarth> {
        const [mainTex, decorativeTex, maskTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.decorativeTex,
            item.maskTex,

        );
        const shader = new MaterialCloudEarth();
        shader._MainTex = mainTex;
        shader._DecorativeTex = decorativeTex;
        shader._MaskTex = maskTex;
        shader._AhplaController = item.ahplaController;
        shader._TexScale = item.texScale;
        shader._CloudMove = new Laya.Vector4(...item.cloudMove);
        shader._CloudController = item.cloudController;
        shader._CloudColor = new Laya.Vector4(...item.cloudColor);
        shader._Fresnelrange = item.fresnelrange;
        shader._OffsetX = item.offsetX;
        shader._OffsetY = item.offsetY;
        shader._DisturbScale = item.disturbScale;
        shader._EdgeAhpla = item.edgeAhpla;

        return shader;
    }

    compile(): void {
        ShaderCloudEarth.initShader();
    }
}
