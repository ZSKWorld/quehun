import { RDRegisterBase } from "./RDRegisterBase";

export class RootRDRegister extends RDRegisterBase {
	override get rdInfos(): IRDRegisterInfo[] {
		return [
			[ERDName.Root]
		];
	}
}