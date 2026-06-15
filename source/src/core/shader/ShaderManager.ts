import { FxBRDFMaterial } from "./3d/FxBRDF/FxBRDFMaterial";
import { SoftDissolveAtlasMaterial } from "./3d/SoftDissolveAtlas/SoftDissolveAtlasMaterial";

@SingletonClass
export class ShaderManager {
	static readonly Inst: ShaderManager;

	init() {
		FxBRDFMaterial.init();
		SoftDissolveAtlasMaterial.init();
	}
}