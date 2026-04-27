import { RootRDTrigger } from "./RootRDTrigger";
import { UIMain_RDTrigger } from "./UIMain_RDTrigger";
import { UISevenDay_RDTrigger } from "./UISevenDay_RDTrigger";

export class RDTriggerManager {
	private static _registers: IRDTrigger[];

	static getTriggers(): IRDTrigger[] {
		if (!this._registers) {
			this._registers = [...new Set([
				RootRDTrigger,
				UIMain_RDTrigger,
				UISevenDay_RDTrigger,
			])].map(cls => new cls());
		}
		return this._registers;
	}
}