import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialColor, ShaderColor } from "./MaterialColor";

interface MatColorConfig {
    color: ColorArray;
}

export class MaterialFactoryColor implements MaterialFactory<MaterialColor> {
    public async create(item: MatColorConfig): Promise<MaterialColor> {
        const shader: MaterialColor = new MaterialColor();
        shader.Color = new Laya.Vector4(...item.color);

        return shader;
    }

    compile(): void {
        ShaderColor.initShader();
    }
}
