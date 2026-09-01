/** This script is generated automatically, Please do not any modify! */

import { GradientColorMaterial } from "./2d/GradientColor/GradientColorMaterial";
import { GridSizeMaterial } from "./2d/GridSize/GridSizeMaterial";
import { FxBRDFMaterial } from "./3d/FxBRDF/FxBRDFMaterial";
import { SoftDissolveAtlasMaterial } from "./3d/SoftDissolveAtlas/SoftDissolveAtlasMaterial";

@Singleton
export class ShaderManager {
	static readonly Inst: ShaderManager;

	init() {
		GradientColorMaterial.init();
		GridSizeMaterial.init();
		FxBRDFMaterial.init();
		SoftDissolveAtlasMaterial.init();
	}
}