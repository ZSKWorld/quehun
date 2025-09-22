import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialDifGround, ShaderDifGround } from "./MaterialDifGround";

interface MatDifGroundConfig {
    mainTexR: string;
    mainTexG: string;
    mainTexB: string;
    mainTexA: string;
    rGBAaisle: string;
    lightTex: string;
    lightRange: number;
    spRange: number;
    lightController: number;
    lightCol: ColorArray;
    shadowCol: ColorArray;
    castController: number;
    globalController: number;
    bloomRange: number;
    bloomPow: number;
    saturation: number;
}

export class MaterialFactoryDifGround implements MaterialFactory<MaterialDifGround> {
    async create(item: MatDifGroundConfig): Promise<MaterialDifGround> {
        const [mainTexR, mainTexG, mainTexB,
            mainTexA, rGBAaisle, lightTex
        ] = await MaterialTool.loadTexture2DList(
            item.mainTexR,
            item.mainTexG,
            item.mainTexB,
            item.mainTexA,
            item.rGBAaisle,
            item.lightTex,
        );
        const shader: MaterialDifGround = new MaterialDifGround();
        shader.mainTexR = mainTexR;
        shader.mainTexG = mainTexG;
        shader.mainTexB = mainTexB;
        shader.mainTexA = mainTexA;
        shader.rGBAaisle = rGBAaisle;
        shader.lightTex = lightTex;
        shader.lightRange = item.lightRange;
        shader.spRange = item.spRange;
        shader.lightController = item.lightController;
        shader.lightCol = new Laya.Vector4(...item.lightCol);
        shader.shadowCol = new Laya.Vector4(...item.shadowCol);
        shader.castController = item.castController;
        shader.globalController = item.globalController;
        shader.bloomRange = item.bloomRange;
        shader.bloomPow = item.bloomPow;
        shader.saturation = item.saturation;
        return shader;
    }

    compile(): void {
        ShaderDifGround.initShader();
    }
}
