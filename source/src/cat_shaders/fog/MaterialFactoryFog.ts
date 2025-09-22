import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialFog, ShaderFog } from "./MaterialFog";

export class MaterialFactoryFog implements MaterialFactory<MaterialFog> {
    public async create(item: any): Promise<MaterialFog> {
        const [cloudTex, cliffTex] = await MaterialTool.loadTexture2DList(
            "Tex/Cloud.png",
            "Tex/CliffHeight.png",
        );
        const shader: MaterialFog = new MaterialFog();
        shader.FogTex = cloudTex;
        shader.DecorativeTex = cliffTex;
        shader.UVTile = new Laya.Vector4(item.UVTile[0], item.UVTile[1], 0.0, 0.0);
        shader.AlphaController = 0.0;
        shader.CloudMove = new Laya.Vector4(item.CloudMove[0], item.CloudMove[1], 0.0, 0.0);

        return shader;
    }

    compile(): void {
        ShaderFog.initShader();
    }
}
