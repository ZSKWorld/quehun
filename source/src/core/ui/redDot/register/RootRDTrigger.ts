import { RDTriggerBase } from "./RDTriggerBase";

export class RootRDTrigger extends RDTriggerBase {
	override get rdInfos(): IRDTriggerInfo[] {
		return [
			[ERDName.Root]
		];
	}
}