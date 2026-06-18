import { Base_RDChecker } from "./Base_RDChecker";

export class Root_RDChecker extends Base_RDChecker {
	override get rdInfos(): IRDCheckInfo[] {
		return [
			[ERDName.Root]
		];
	}
}