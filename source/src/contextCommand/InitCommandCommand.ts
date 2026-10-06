import { CommandQueue } from "../core/mvc/controller/CommandQueue";
import { PkgActivityOverviewCommand } from "../core/ui/view/PkgActivityOverview/command/PkgActivityOverviewCommand";
import { PkgMainCommand } from "../core/ui/view/PkgMain/command/PkgMainCommand";

export class InitCommandCommand extends CommandQueue {
	protected override initialize() {
		this.addSubCommand(PkgMainCommand);
		this.addSubCommand(PkgActivityOverviewCommand);
	}
}