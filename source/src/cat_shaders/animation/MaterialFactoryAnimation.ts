import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialTool } from "../../libs/MaterialTool";
import { MaterialAnimation, ShaderAnimation } from "./MaterialAnimation";

interface MatAnimationConfig {
    mainTex: string;
    horizontal: number;
    vertical: number;
    speed: number;
}
export class MaterialFactoryAnimation implements MaterialFactory<MaterialAnimation> {
    async create(item: MatAnimationConfig): Promise<MaterialAnimation> {
        const [mainTex] = await MaterialTool.loadTexture2DList(item.mainTex);
        const shader: MaterialAnimation = new MaterialAnimation();
        shader.UMainTex = mainTex;
        shader.hAmount = item.horizontal;
        shader.vAmount = item.vertical;
        shader.USpeed = item.speed;

        return shader;
    }

    compile(): void {
        ShaderAnimation.initShader();
    }
}
