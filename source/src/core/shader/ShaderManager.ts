import { FxBRDFMaterial } from "./3d/FxBRDF/FxBRDFMaterial";
import { SoftDissolveAtlasMaterial } from "./3d/SoftDissolveAtlas/SoftDissolveAtlasMaterial";

@Singleton
export class ShaderManager {
	static readonly Inst: ShaderManager;

	init() {
		FxBRDFMaterial.init();
		SoftDissolveAtlasMaterial.init();
	}
}