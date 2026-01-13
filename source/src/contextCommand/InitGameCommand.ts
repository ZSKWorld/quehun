import { ENotifyConst } from "../core/common/NotifyConst";
import { Command } from "../core/mvc/controller/Command";
import { ShaderManager } from "../core/shader/ShaderManager";


export class InitGameCommand extends Command {
	override async execute(notifyName: string, data?: any) {
		$uiMgr.init();
		$redDotMgr.init();
		ShaderManager.init();

		await $loadMgr.loadPackage(ResPath.EPkgPath.PkgEntrance);
		$uiMgr.openView(EViewID.UIEntranceView);

		await Promise.all([
			$gameMgr.init(),
			$pbMgr.init(),
			$cfgMgr.init(),
			$netMgr.init(),
		]);

		$netMgr.connectLobby();

		$facade.dispatch(ENotifyConst.OnInitGameCompleted);
	}
}