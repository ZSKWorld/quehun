import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialSky, ShaderSky } from "./MaterialSky";

interface MatSkyConfig {
    mainTex: ResourcePath;
    cloudTex: ResourcePath;
    cloudSpeed: number;
    cloudPower: number;
}

export class MaterialFactorySky implements MaterialFactory<MaterialSky> {
    async create(item: MatSkyConfig): Promise<MaterialSky> {
        const [mainTex, cloudTex] = await MaterialTool.loadTexture2DList(
            item.mainTex,
            item.cloudTex,
        );
        const shader: MaterialSky = new MaterialSky();
        shader.mainTex = mainTex;
        shader.cloudTex = cloudTex;
        shader.cloudSpeed = item.cloudSpeed;
        shader.cloudPower = item.cloudPower;

        return shader;
    }

    compile(): void {
        ShaderSky.initShader();
    }
}
