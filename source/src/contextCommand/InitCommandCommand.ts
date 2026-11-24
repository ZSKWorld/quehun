import { CommandQueue } from "../core/mvc/controller/CommandQueue";
import { PkgActivityOverviewCommand } from "../core/ui/view/PkgActivityOverview/command/PkgActivityOverviewCommand";
import { PkgCommonCommand } from "../core/ui/view/PkgCommon/command/PkgCommonCommand";
import { PkgMainCommand } from "../core/ui/view/PkgMain/command/PkgMainCommand";

export class InitCommandCommand extends CommandQueue {
	protected override initialize() {
		this.addSubCommand(PkgCommonCommand);
		this.addSubCommand(PkgMainCommand);
		this.addSubCommand(PkgActivityOverviewCommand);
	}
}