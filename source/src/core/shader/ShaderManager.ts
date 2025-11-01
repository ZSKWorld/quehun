import { FxBRDFMaterial } from "./3d/FxBRDF/FxBRDFMaterial";
import { SoftDissolveAtlasMaterial } from "./3d/SoftDissolveAtlas/SoftDissolveAtlasMaterial";

export class ShaderManager {
    static init() {
        FxBRDFMaterial.init();
        SoftDissolveAtlasMaterial.init();
    }
}