import { RootRDRegister } from "./RootRDRegister";
import { UIMainRDRegister } from "./UIMainRDRegister";
import { UISevenDayRDRegister } from "./UISevenDayRDRegister";

export class RDRegisterManager {
	private static _registers: IRDRegister[];

	static getRDRegisters(): IRDRegister[] {
		if (!this._registers) {
			this._registers = [...new Set([
				RootRDRegister,
				UIMainRDRegister,
				UISevenDayRDRegister,
			])].map(cls => new cls());
		}
		return this._registers;
	}
}