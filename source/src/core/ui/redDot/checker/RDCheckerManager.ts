import { Root_RDChecker } from "./Root_RDChecker";
import { UIMain_RDChecker } from "./UIMain_RDChecker";
import { UISevenDay_RDChecker } from "./UISevenDay_RDChecker";

export class RDCheckerManager {
	private static _checkers: IRDChecker[];

	static getCheckers(): IRDChecker[] {
		if (!this._checkers) {
			this._checkers = [...new Set([
				Root_RDChecker,
				UIMain_RDChecker,
				UISevenDay_RDChecker,
			])].map(cls => new cls());
		}
		return this._checkers;
	}
}