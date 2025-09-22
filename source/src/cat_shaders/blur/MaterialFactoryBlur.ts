import { MaterialFactory } from "../../libs/MaterialFactory";
import { MaterialBlur, ShaderBlur } from "./MaterialBlur";

/*
 * @Author       : zsk
 * @Date         : 2021-08-21 18:03:16
 * @LastEditors  : zsk
 * @LastEditTime : 2021-08-21 18:13:48
 * @Description  : null
 */
export default class MaterialFactoryBlur implements MaterialFactory<MaterialBlur> {
    async create(item: MaterialBlur): Promise<MaterialBlur> {
        return null;
    }

    compile(): void {
        ShaderBlur.initShader();
    }
}
