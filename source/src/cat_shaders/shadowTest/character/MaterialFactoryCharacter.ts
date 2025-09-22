import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialCharacter, ShaderCharacter } from "./MaterialCharacter";

interface MatCharacterConfig {
    mainTex: ResourcePath;
    lightDir: FixedLengthArray<number, 4>;
    specTex: ResourcePath;
    speculaCrolor: ColorArray;
    specPower: number;
    lightColor: ColorArray;
    refColor: ColorArray;
    gloss: number;
    globalController: number;
    shadowCol: ColorArray;
    shadowA: ColorArray;
    shadowPos: number;
    rimColorController: number;
    rimColorRange: number;
    rimColor: ColorArray;
    bloomRange: number;
    bloomPow: number;
    angle: number;
}

export class MaterialFactoryCharacter implements MaterialFactory<MaterialCharacter> {
    public async create(item: MatCharacterConfig): Promise<MaterialCharacter> {
        const [mainTex, specTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.specTex,
        );

        const shader: MaterialCharacter = new MaterialCharacter();
        shader.mainTex = mainTex;
        shader.lightDir = new Laya.Vector4(
            item.lightDir[0],
            item.lightDir[1],
            item.lightDir[2],
            item.lightDir[3],
        );
        shader.specTex = specTex;
        shader.speculaCrolor = new Laya.Vector4(
            item.speculaCrolor[0],
            item.speculaCrolor[1],
            item.speculaCrolor[2],
            item.speculaCrolor[3],
        );
        shader.specPower = item.specPower;
        shader.lightColor = new Laya.Vector4(
            item.lightColor[0],
            item.lightColor[1],
            item.lightColor[2],
            item.lightColor[3],
        );
        shader.refColor = new Laya.Vector4(
            item.refColor[0],
            item.refColor[1],
            item.refColor[2],
            item.refColor[3],
        );
        shader.gloss = item.gloss;
        shader.glossController = item.globalController;
        shader.shadowCol = new Laya.Vector4(
            item.shadowCol[0],
            item.shadowCol[1],
            item.shadowCol[2],
            item.shadowCol[3],
        );
        shader.shadowA = new Laya.Vector4(
            item.shadowA[0],
            item.shadowA[1],
            item.shadowA[2],
            item.shadowA[3],
        );
        shader.shadowPos = item.shadowPos;
        shader.rimColorController = item.rimColorController;
        shader.rimColorRange = item.rimColorRange;
        shader.rimColor = new Laya.Vector4(
            item.rimColor[0],
            item.rimColor[1],
            item.rimColor[2],
            item.rimColor[3],
        );
        shader.bloomRange = item.bloomRange;
        shader.bloomPow = item.bloomPow;
        shader.angle = item.angle;

        return shader;
    }

    compile(): void {
        new ShaderCharacter().initShader();
    }
}
