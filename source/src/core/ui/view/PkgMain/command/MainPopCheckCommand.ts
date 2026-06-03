import { Command } from "../../../../mvc/controller/Command";

/** 主页弹窗检测命令 */
export class MainPopCheckCommand extends Command {
	override execute(notifyName: string, viewId: EUIViewID): void {
		if (viewId != EViewID.UIMainView) return;
	}
}
